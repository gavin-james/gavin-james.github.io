---
date: 2022-04-06
category:
  - Java 新特性
tag:
  - Java 新特性
---
# Java 8 - 重复注解

> 重复注解（Repeatable Annotation, JEP 120）回答了「同一个注解能否在一个位置上写多次」。JDK 8 之前要靠手工维护一个「容器注解」，JDK 8 引入 `@Repeatable` 把这个模式标准化，并让编译器自动完成包装。

## 1. 什么是重复注解

重复注解指**同一个注解类型可以连续标注在同一处声明上**（类、字段、方法、参数等）：

```java
@Schedule(dayOfWeek = "MON")
@Schedule(dayOfWeek = "WED")
@Schedule(dayOfWeek = "FRI")
public void backup() { }
```

如果 `@Schedule` 不是可重复的，上面这段代码无法编译——同一个注解在同一个元素上只能出现一次（编译错误：duplicate annotation）。JDK 8 之前，很多人只能用一个「注解数组」成员绕开，可读性很差。

注解本身的知识（定义、元注解、反射读取）见 [Java 注解](../basic/java-basic-x-annotation.md)。

::: details 没有 `@Repeatable` 时的编译错误
如果重复注解类型忘了标 `@Repeatable`，在同一处写两次会直接编译失败，提示信息大意是「重复的注解类型」（duplicate annotation）。这类错误发生在编译期、定位明确，不会悄悄带到运行时，因此不必担心它静默失效。
:::

## 2. JDK 8 之前的做法：手工容器注解

在 JDK 8 之前，一个常见的替代方案是**再定义一个「容器」注解**，把它要重复的那个注解数组装起来：

```java
public @interface Authority {
    String role();
}

public @interface Authorities {
    Authority[] value();
}

public class RepeatUseOldVersion {
    @Authorities({
        @Authority(role = "Admin"),
        @Authority(role = "Manager")
    })
    public void doSomething() { }
}
```

缺点很明显：**多了一层无意义的语法噪音**。写的人要记住先写 `@Authorities`，再写一对大括号；读的人也要在脑内把数组「拆开」。注解越多、嵌套越深，可读性越差。而且一旦某个位置只想配一条，你还得纠结到底用 `@Authority` 还是 `@Authorities({@Authority(...)})`。

## 3. JDK 8 的 `@Repeatable`

JDK 8 的做法是给重复注解打上 `@Repeatable`，指向它的容器注解：

```java
@Repeatable(Authorities.class)
public @interface Authority {
    String role();
}

public @interface Authorities {
    Authority[] value();
}

public class RepeatUseNewVersion {
    @Authority(role = "Admin")
    @Authority(role = "Manager")
    public void doSomething() { }
}
```

写起来自然，读起来也直接。关键在于：**这只是编译期的语法糖**。编译器会把上面多个 `@Authority` 自动「脱糖」成一个 `@Authorities({@Authority(...), @Authority(...)})` 写进 class 文件。也就是说，运行时的字节码结构和 JDK 8 之前的手工写法完全一致——`@Repeatable` 改的是书写体验，不是运行时语义。

::: important 一次「一」的边界
只有当同一个元素的重复注解**多于一个**时，编译器才会生成容器注解。如果只有一个 `@Authority`，它是直接存在、不被包装的。这一点会直接影响下面的反射读取结果。
:::

## 4. 容器注解的三条硬约束

容器注解不是随便写写就能用的，编译器会校验：

1. 容器注解必须有一个 `value()` 成员，且其返回类型是**重复注解的数组**（如 `Authority[]`）。
2. 重复注解类型上必须标注 `@Repeatable(容器.class)`，且容器必须是「匹配」它的那一个。
3. 容器注解的 `@Retention` 不能短于重复注解，`@Target` 不能比重复注解更窄——否则重复注解在运行时可能读不到，编译期就会报错。

第 3 条常被忽略。举个例子：如果重复注解标了 `@Retention(RUNTIME)` 并允许放在方法上，而容器只标了 `@Retention(SOURCE)`，那么编译出的 class 文件里只剩容器、且被丢弃，运行时就无论如何都读不到那些重复注解了。因此容器的保留策略必须**至少一样长**，作用范围必须**至少一样宽**。

此外，容器注解**仍然可以像普通注解那样被直接使用**（手动写出 `@Authorities({...})`），它并不被禁用，只是通常没必要。容器注解的命名通常取重复注解的复数形式（`Authority`/`Authorities`、`Permission`/`Permissions`），这是一种约定，并非语法强制要求。

## 5. 反射读取：`getAnnotationsByType` 是关键

这是使用重复注解时最容易踩坑的地方。先看一张对照表：

| 方法 | 对重复注解的行为 |
|------|------------------|
| `getAnnotation(Authority.class)` | 只有一个时不包装，能拿到；**有多个时返回 `null`** |
| `getAnnotations()` | 返回的是**容器注解** `@Authorities`，不是一个个 `@Authority` |
| `getAnnotationsByType(Authority.class)` | **推荐**：自动「看穿」容器，返回 `Authority[]` |
| `getDeclaredAnnotationsByType(Authority.class)` | 同上，但只查本元素声明，不考虑 `@Inherited` 继承 |

结论很明确：**读取可重复注解，一律用 `getAnnotationsByType` / `getDeclaredAnnotationsByType`**。用 `getAnnotation` 会在「多于一个」时静默返回 `null`，很可能直到线上才暴露。

```java
Method method = RepeatedDemo.class.getMethod("doSomething");
Authority[] authorities = method.getAnnotationsByType(Authority.class);
for (Authority a : authorities) {
    System.out.println(a.role()); // Admin、Manager
}
```

`getAnnotationsByType` 的语义由《Java 语言规范》与 `AnnotatedElement` 的文档共同定义：当入参是**可重复注解类型**时，它会尝试「透过（look through）」容器注解，把里面的元素摊开返回；如果目标元素上直接写了单条重复注解，也能正确返回。这也是为什么推荐的读取方式是它、而不是 `getAnnotation`。

## 6. 被 `@Inherited` 影响的那一档

`getAnnotationsByType` 与 `getDeclaredAnnotationsByType` 的唯一差别在于**是否沿继承链查找**：若重复注解类型本身标了 `@Inherited`，则 `getAnnotationsByType` 会把父类上的重复注解也一并返回，而 `getDeclaredAnnotationsByType` 只返回当前元素显式声明的那些。在没有继承语义需求的场景，两者结果一致；一旦牵涉抽象基类统一配置权限/扩展，就必须想清楚要哪一种。

## 7. 实践：自定义一个 `@Permission`

一个贴近业务的例子是给接口方法标注多个所需权限：

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Repeatable(Permissions.class)
public @interface Permission {
    String value();
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Permissions {
    Permission[] value();
}

// 使用
public class OrderController {

    @Permission("order:read")
    @Permission("order:export")
    public void exportOrders() { }
}
```

鉴权拦截器里只需一行 `getAnnotationsByType(Permission.class)` 就能拿到全部所需权限，无需再解析容器注解。若把它抽成一个通用工具方法，可读性更好：

```java
public final class Annotations {
    private Annotations() { }

    public static String[] permissionValues(Method method) {
        return Arrays.stream(method.getAnnotationsByType(Permission.class))
                .map(Permission::value)
                .toArray(String[]::new);
    }
}
```

JDK 标准库之外，JUnit 5 的 `@ExtendWith`（容器 `@Extensions`）也是可重复注解的典型用例——多个扩展可以逐条声明，而不必塞进一个 `@Extensions({...})`。

需要与另一种常见手法区分开：「组合注解」（meta-annotation）是把若干注解组合到**一个新的注解**上（例如把多个注解揉成一个 `@MyService`），它减少的是注解的**种类与数量**；而重复注解解决的是同一个注解能否出现**多次**，两者不是一回事，但可以并存——组合注解本身也可以被设计成可重复的。

## 8. 常见坑

- **用 `getAnnotation` 读取**：多个时返回 `null`，且不报错，属于静默失败。
- **只用 `getAnnotations` 遍历**：你只会看到容器注解，看不到单个注解，需要自己判断并展开数组。
- **`@Target` / `@Retention` 不一致**：容器比重复注解更窄或更短，编译直接失败，容易让人以为是 `@Repeatable` 写错了。
- **忘了给重复注解加 `@Repeatable`**：那就退化成普通注解，同一处写两次会编译报错。
- **误以为有性能开销**：脱糖发生在编译期，运行时和手工容器写法等价。
- **只写了一个却按数组读**：单条时不会被包装，此时 `getAnnotations()` 拿到的是 `@Authority` 本身而非容器，遍历逻辑要能兼容两种情况——这也正是不要手写遍历容器、而用 `getAnnotationsByType` 的原因。

## 9. 与类型注解的区别

JDK 8 对注解做了两处相互独立地改进：JEP 104 引入**类型注解**（`@Target(ElementType.TYPE_USE)`，让注解能出现在泛型、强制转换、`implements` 等类型位置上），JEP 120 引入**重复注解**。二者常被一起提到，但解决的是不同问题：类型注解扩展了注解「能放在哪」，重复注解扩展了注解「能放几次」。类型注解详见 [Java 8 - 类型注解](./java8-type-anno.md)。

## 10. 运行时读取实战：类、方法、字段通用

`AnnotatedElement` 是 `Class`、`Method`、`Field`、`Constructor`、`Parameter` 等的共同父接口，因此 `getAnnotationsByType` 对它们都适用：

```java
Class<?> clazz = OrderController.class;
Permission[] classLevel = clazz.getAnnotationsByType(Permission.class);

for (Method m : clazz.getDeclaredMethods()) {
    Permission[] perms = m.getAnnotationsByType(Permission.class);
    // 分别处理每个方法上的权限声明
}
```

只要重复注解标了 `@Retention(RetentionPolicy.RUNTIME)`，上面这段在任何运行期框架里都成立；若只想在编译期使用（例如注解处理器在编译期生成代码），用 `SOURCE` 保留策略即可，运行时读不到也无妨——这就要求框架作者想清楚「谁是注解的消费者」。

还有一点常被忽略：`@Repeatable` 与 `@Inherited` 是两回事，重复注解默认**不会**被子类继承；需要继承语义时，要显式给**重复注解**（而非容器）加上 `@Inherited`。

## 11. 小结

- `@Repeatable` 是**编译期语法糖**，字节码里仍是「容器注解 + 数组」，运行时语义没变。
- 容器注解必须提供「重复注解数组」类型的 `value()`，且 `@Target`/`@Retention` 不能更窄更短。
- 反射读取一律用 `getAnnotationsByType`；`getAnnotation` 在多个时会返回 `null`。
- 单条与多条在字节码里形态不同，不要手写「遍历容器再展开」的逻辑。
- 它的价值在于**可读性**：让「同一处多次配置」贴近直觉，而不是绕一层数组大括号。
