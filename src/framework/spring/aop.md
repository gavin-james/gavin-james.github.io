---
title: Spring AOP 详解
category: [框架]
tag: [Spring, AOP]
---

# Spring AOP 详解

> 面向切面编程（Aspect-Oriented Programming, AOP）把「散落在各个方法里的横切逻辑」抽成独立的切面，再由容器在运行期织入目标方法。Spring 的声明式事务、日志、鉴权、限流，底层都是它。

## 1. 为什么需要 AOP

先看一个问题：给所有业务方法加「耗时统计 + 审计日志」，不改的话会变成这样：

```java
public void createOrder(OrderCmd cmd) {
    long start = System.currentTimeMillis();     // 横切
    log.info("audit: createOrder, user={}", userId); // 横切
    try {
        // ... 真正的业务
    } finally {
        log.info("cost={}ms", System.currentTimeMillis() - start); // 横切
    }
}
```

这些「横切」代码与业务无关，却要重复铺满每个方法。问题随之而来：

- **重复**：同样的模板在几十个方法里复制，改一处漏九处。
- **污染**：业务阅读者要先穿过一堆无关代码才能看到核心逻辑。
- **不可维护**：想统一调整审计格式，得全量替换。

AOP 的想法是把这些逻辑**声明成切面**，让它自动作用到匹配的方法上，业务代码只保留业务本身。

## 2. 核心术语

| 术语 | 英文 | 含义 |
|------|------|------|
| 切面 | Aspect | 横切逻辑的模块，如「日志切面」 |
| 连接点 | Join Point | 程序执行中可被织入的点，Spring AOP 中特指**方法执行** |
| 切点 | Pointcut | 一个表达式，决定切面作用到哪些连接点 |
| 通知 | Advice | 具体做事的逻辑，分前置/后置/环绕等类型 |
| 织入 | Weaving | 把通知应用到目标对象的过程，Spring 在**运行期**完成 |
| 目标对象 | Target | 被代理的原始对象 |
| 代理 | Proxy | 容器生成、包裹目标对象并插入通知的对象 |

::: tip 关键区分
Spring AOP 只支持**方法级**连接点，不像 AspectJ 那样支持字段、构造器等。这让它更简单，也意味着它无法拦截字段访问。
:::

## 3. 代理机制：JDK 还是 CGLIB

Spring 不能凭空改写目标类，它靠**动态代理**实现织入，两种策略：

| 方式 | 条件 | 原理 |
|------|------|------|
| JDK 动态代理 | 目标类**实现了接口** | 基于接口生成实现类，通过 `InvocationHandler` 转发 |
| CGLIB | 目标类**没有接口** | 生成目标类的子类，覆写方法以插入通知 |

- Spring Boot 2.x 起，AOP 自动配置**默认倾向 CGLIB**（`spring.aop.proxy-target-class=true`），即使有接口也用子类代理。
- CGLIB 代理的是**继承**，因此：`final` 类无法代理、`final`/`private`/`static` 方法无法被增强。
- CGLIB 代理对象不实现目标类的接口时，按接口类型注入会失败——这是升级时常见的坑。

```yaml
spring:
  aop:
    proxy-target-class: true   # true=CGLIB，false=有接口走 JDK
    auto: true                 # 是否开启自动代理（默认开启）
```

## 4. 通知类型

| 注解 | 时机 | 典型用途 |
|------|------|----------|
| `@Before` | 目标方法执行前 | 参数校验、权限预检 |
| `@AfterReturning` | 正常返回后 | 记录结果、埋点 |
| `@AfterThrowing` | 抛异常后 | 异常上报 |
| `@After` | 相当于 `finally` | 资源释放 |
| `@Around` | 包裹整个方法 | 事务、限流、耗时统计（能力最强） |

`@Around` 能决定是否调用 `proceed()`、能改参数、能改返回值，也最容易写错——忘了调用 `proceed()` 就等于把业务方法吞掉了。

## 5. 一个完整的切面示例

```java
@Aspect
@Component
public class AuditAspect {

    // 切点：拦截所有标注 @Audit 的方法
    @Pointcut("@annotation(audit)")
    public void auditPointcut(Audit audit) {}

    @Around(value = "auditPointcut(audit)", argNames = "pjp,audit")
    public Object around(ProceedingJoinPoint pjp, Audit audit) throws Throwable {
        long start = System.currentTimeMillis();
        String method = pjp.getSignature().toShortString();
        try {
            Object result = pjp.proceed();
            log.info("audit ok: {} cost={}ms", method, System.currentTimeMillis() - start);
            return result;
        } catch (Throwable ex) {
            log.warn("audit fail: {} msg={}", method, ex.getMessage());
            throw ex;   // 必须抛出，否则异常被吞
        }
    }
}
```

配合自定义注解：

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Audit {
    String action() default "";
}
```

## 6. 切点表达式要点

- `execution(...)`：按方法签名匹配，最常用，如 `execution(* com.example.service..*.*(..))`。
- `@annotation(...)`：匹配「标注了某注解的方法」，比签名匹配更精确、更少误伤。
- `within(...)`：按类型匹配，如 `within(com.example.service..*)`。
- `bean(...)`：按 Bean 名称匹配，如 `bean(*Service)`。
- `args(...)`：按参数类型匹配。
- 可用 `&&` `||` `!` 组合，`@Pointcut` 可复用命名切点。

实践偏好：**优先按注解匹配**（`@annotation`），让「被增强」成为开发者显式声明的意图，避免按包名通配导致意外的广泛增强。

## 7. AOP 失效场景

AOP 的生效前提是**调用经过代理对象**。以下情况会绕过代理，增强失效：

1. **同类内部自调用**：`this.b()` 不经过代理，`b()` 上的通知不生效。

```java
public void a() { b(); }   // b 的通知失效

@Audit
public void b() { /* ... */ }
```

2. **方法非 public**：CGLIB/JDK 代理均无法增强非 public 方法（`protected`/`private`）。
3. **final 类或 final 方法**：无法被继承覆写。
4. **对象由 `new` 创建**：没有被容器管理，自然没有代理。
5. **代理对象被强制转型**：拿到接口引用后强转实现类可能抛 `ClassCastException`（CGLIB 场景下需注意）。

解决自调用，常见做法是：把方法拆到另一个 Bean、通过 `AopContext.currentProxy()` 调用（需 `exposeProxy=true`）、或注入自身代理。

## 8. 与声明式事务的关系

`@Transactional` 本质上就是基于 AOP 的环绕通知：方法进入时开启/加入事务，正常返回提交，抛异常回滚。因此**事务失效场景与 AOP 失效场景高度重合**——「自调用导致事务失效」是同一根因的另一面。理解 AOP 代理，就理解了大半事务坑，详见 [Spring 事务管理](./spring-transaction.md)。

## 9. 使用边界

**适合放进切面的**：日志、审计、鉴权、限流、幂等、耗时/链路埋点、重试。

**不适合的**：把核心业务规则拆进切面。切面天然「隐式」——读代码时看不到它，过度使用会让流程变得难以追踪。判断标准：如果一段逻辑**只有配合某个业务方法才有意义**，它应该待在业务代码里，而不是切面里。
