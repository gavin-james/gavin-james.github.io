---
date: 2019-04-28
category:
  - 开发
tag:
  - 随手记
---
# Java 创建对象的方式

> 创建对象是 Java 里最基本的操作，但除了最常见的 `new`，还有反射、克隆、反序列化等多种途径。理解它们的差异，有助于在框架开发、对象拷贝、缓存等场景做出正确选择。

## 1. 概览

| 方式 | 是否调用构造器 | 典型用途 |
| --- | --- | --- |
| `new` | 是 | 普通对象创建 |
| 反射（`newInstance` / `Constructor`） | 是 | 框架、IoC 容器、动态加载 |
| 克隆（`clone`） | 否 | 复制已有对象的副本 |
| 反序列化 | 否 | 对象持久化 / 网络传输后还原 |
| `Unsafe.allocateInstance` | 否 | 绕过构造器分配实例（序列化框架内部用） |
| 工厂 / 建造者 / 单例 | 视实现 | 封装创建逻辑、控制实例数量 |

下面统一以 `Worker` 类为例（含无参与有参构造器、实现 `Cloneable` 与 `Serializable`）。

## 2. 使用 new

最直接的方式，编译期即确定类型，可读性与性能最好。绝大多数业务对象都应当用它创建。

```java
public class WorkerFactory {
    public static Worker createWorker() {
        return new Worker();
    }

    public static Worker createWorker(String name, int age) {
        return new Worker(name, age);
    }
}
```

## 3. 使用反射

反射在**运行时**根据类名创建对象，是各种框架（IoC、ORM、RPC）的基础。

### 3.1 Class.newInstance()

```java
public static Worker createByNewInstance() throws Exception {
    Class<?> clazz = Class.forName("com.example.creation.Worker");
    // 仅能调用无参构造器，且要求构造器可访问
    return (Worker) clazz.newInstance();
}
```

`Class.newInstance()` 已被标记为过时（deprecated），推荐改用 `Constructor.newInstance()`，它能明确要求使用构造器，异常处理也更清晰。

### 3.2 Constructor.newInstance()

```java
import java.lang.reflect.Constructor;

public static Worker createByConstructor() throws Exception {
    Class<?> clazz = Class.forName("com.example.creation.Worker");
    Constructor<?> ctor = clazz.getConstructor();        // 无参
    return (Worker) ctor.newInstance();
}

public static Worker createByConstructor(String name, Integer age) throws Exception {
    Class<?> clazz = Class.forName("com.example.creation.Worker");
    Constructor<?> ctor = clazz.getConstructor(String.class, int.class);
    return (Worker) ctor.newInstance(name, age);
}
```

::: warning 反射的注意点
- 反射调用有性能开销，频繁创建时应缓存 `Class` / `Constructor`；
- 反射能突破访问控制（`setAccessible(true)`），但会带来安全与模块化（JPMS）限制；
- 反射通常与"通过类名创建"绑定，类名拼写错误会在运行时才暴露。
:::

## 4. 序列化与反序列化

序列化把对象状态写成字节流，反序列化则**在还原时创建对象**。这条路径常常是破解单例、绕过构造器校验的入口，因此也备受安全关注。

```java
import java.io.*;

public class SerializeDemo {
    // 写出对象
    public static void storeObject(String path, Worker worker) throws IOException {
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(path))) {
            out.writeObject(worker);
        }
    }

    // 从字节流还原对象
    public static Worker loadObject(String path) throws IOException, ClassNotFoundException {
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(path))) {
            return (Worker) in.readObject();
        }
    }
}
```

被序列化的类必须实现 `Serializable`，并建议显式声明 `serialVersionUID`，否则类结构变化后反序列化可能失败。

## 5. 深拷贝 / 克隆

`clone` 直接复制已有对象，**不经过构造器**。

```java
public class Worker implements Cloneable, Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;

    public Worker() {
        this.name = "";
        this.age = 0;
    }

    public Worker(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public Worker clone() throws CloneNotSupportedException {
        return (Worker) super.clone();
    }
}
```

::: important 浅拷贝 vs 深拷贝
`Object.clone()` 默认是**浅拷贝**：基本类型字段被复制，引用类型字段仍指向同一个对象。若字段是可变对象（如 `List`），需要手动对每个引用字段再克隆，或改用"序列化再反序列化"实现深拷贝。经典的深拷贝实现可以借助 `ByteArrayOutputStream` + `ObjectOutputStream` 把对象写出再读回。
:::

## 6. 绕过构造器：Unsafe 与 Objenesis

序列化框架（如 Kryo、部分 ORM）如果调用构造器会带来副作用，于是需要"不调用构造器而分配实例"的能力：

```java
import sun.misc.Unsafe;
import java.lang.reflect.Field;

public static Worker createWithoutConstructor() throws Exception {
    Field f = Unsafe.class.getDeclaredField("theUnsafe");
    f.setAccessible(true);
    Unsafe unsafe = (Unsafe) f.get(null);
    return (Worker) unsafe.allocateInstance(Worker.class);
}
```

`Unsafe.allocateInstance` 只分配内存、不执行构造器。Objenesis 库对它做了封装，屏蔽了不同 JVM 的差异。这些手段属于框架内部技巧，业务代码不应使用。

## 7. 用设计模式封装创建

当创建逻辑复杂（需要组装、缓存、条件判断）时，直接 `new` 会让调用方耦合细节，此时用设计模式：

- **静态工厂方法**：`Integer.valueOf(...)`、`LocalDate.of(...)`，可复用实例、命名清晰；
- **工厂方法 / 抽象工厂**：把"造什么"延迟到子类或配置，见 [工厂方法模式](../pattern/4_factory_method.md)；
- **建造者（Builder）**：参数多、需链式构造时使用，见 [建造者模式](../pattern/6_builder.md)；
- **单例**：控制全局唯一实例，注意线程安全，见 [单例模式](../pattern/2_singleton.md)；
- **原型（Prototype）**：以克隆代替创建，见 [原型模式](../pattern/7_prototype.md)。

## 8. 创建时机与初始化顺序

对象创建不只关乎"用哪个方法"，还关涉"何时执行什么代码"：

1. 首次主动使用类时触发**类加载与初始化**，执行静态变量赋值与静态代码块（仅一次）；
2. 创建实例时，先分配内存并置零值，再执行父类构造器，然后执行子类的实例变量初始化与实例代码块，最后执行子类构造器体；
3. 因此静态代码块 → 父类构造器 → 实例块 → 子类构造器，是固定的执行顺序。

把复杂逻辑放在构造器里、或在构造器里调用可被子类覆写的方法，都是常见隐患。

## 9. 单例为何会被"多实例"

单例的约束常被以下途径打破，恰是上述"不调用正常构造器"的创建方式所致：

- **反射**：`setAccessible(true)` 后调用私有构造器；
- **反序列化**：`readObject` 会创建新实例，需实现 `readResolve` 修复；
- **克隆**：若单例实现 `Cloneable`，`clone` 会绕过构造器。

枚举实现单例（`enum`）天然抵御反射与反序列化，是《Effective Java》推荐的写法。

## 10. 小结

- `new` 最简单直接，优先使用；
- 反射适合运行期按类名创建，是框架基石，注意缓存与安全；
- 克隆、反序列化、`Unsafe` 都**不走构造器**，这既是技巧也是隐患；
- 对象创建复杂时用工厂、建造者、单例等模式封装；
- 牢记类初始化与实例初始化的执行顺序，避免在构造器中埋雷；
- 枚举单例能天然抵御反射、反序列化带来的多实例问题。
