---
title: Spring IoC 容器详解
category: [框架]
tag: [Spring, IoC]
---

# Spring IoC 容器详解

> 控制反转（Inversion of Control, IoC）是 Spring 的地基：把对象的「创建、装配、生命周期」从业务代码里挪到容器里，业务只声明「我需要什么」。

## 1. 为什么需要 IoC

不用 IoC 时，对象自己 `new` 依赖：

```java
public class OrderService {
    // 直接依赖具体实现，换一个实现就要改这行
    private final OrderRepository repo = new MysqlOrderRepository();
}
```

问题随之而来：

- **强耦合**：`OrderService` 被钉死在 `MysqlOrderRepository` 上，想换 Redis 实现得改源码。
- **难测试**：单元测试里无法注入一个假的 Repository，只能连真实数据库。
- **生命周期失控**：谁创建、何时创建、是否单例、何时销毁，全散落在业务代码里。
- **配置散乱**：连接池参数、超时等配置出现在每个 `new` 的旁边。

IoC 的做法是**反转控制权**：对象不再主动获取依赖，而是被动等待容器把依赖「送进来」。这就是**依赖注入（Dependency Injection, DI）**——IoC 是思想，DI 是最主流的实现手段。

## 2. 容器与核心接口

Spring 提供两层容器抽象：

| 接口 | 定位 | 特点 |
|------|------|------|
| `BeanFactory` | 最底层容器 | 懒加载为主，功能精简，几乎不用直接面向它编程 |
| `ApplicationContext` | 企业级容器 | 继承 `BeanFactory`，额外提供事件、国际化、AOP、资源加载、自动注册 `BeanPostProcessor` 等 |

常用实现类：

- `AnnotationConfigApplicationContext`：基于注解 + Java 配置类，现代项目主流。
- `ClassPathXmlApplicationContext`：基于 XML 配置，老项目常见。

容器内部围绕一批关键抽象运转：

| 抽象 | 作用 |
|------|------|
| `BeanDefinition` | Bean 的元数据「图纸」：类名、作用域、构造参数、依赖等 |
| `BeanFactoryPostProcessor` | 在 Bean 实例化**之前**修改 `BeanDefinition`（如占位符解析） |
| `BeanPostProcessor` | 在 Bean 初始化**前后**插入逻辑（AOP 代理、`@Autowired` 注入都靠它） |
| `BeanDefinitionRegistry` | 注册/管理 `BeanDefinition` |

一句话理解启动流程：**读配置 → 生成 BeanDefinition → 触发 BeanFactoryPostProcessor → 实例化 → 属性注入 → BeanPostProcessor 前后置 → 初始化方法 → 就绪（单例放入单例池）**。

## 3. 依赖注入方式

```java
@Service
public class OrderService {

    private final OrderRepository repo;
    private final PaymentClient payment;

    // 推荐：构造器注入
    public OrderService(OrderRepository repo, PaymentClient payment) {
        this.repo = repo;
        this.payment = payment;
    }
}
```

三种方式对比：

| 方式 | 写法 | 评价 |
|------|------|------|
| 构造器注入 | 构造函数参数 | **推荐**：依赖 `final` 不可变、缺失依赖启动即失败、天然易测、暴露循环依赖 |
| Setter 注入 | `@Autowired` 标注 setter | 适合**可选**依赖 |
| 字段注入 | `@Autowired` 标在字段上 | 写法最短，但**不推荐**：隐藏依赖、无法 `final`、脱离容器难测试 |

Spring 官方立场是优先构造器注入：依赖一旦确定就不该变，且能在启动阶段就发现装配问题，而不是运行到一半才 NPE。

## 4. Bean 作用域

- `singleton`（默认）：容器内**每个容器**一份实例。
- `prototype`：每次 `getBean()` 都新建，容器不负责销毁。
- `request` / `session` / `application` / `websocket`：Web 环境专用。

一个经典陷阱：**单例 Bean 注入了原型 Bean，原型只会被注入一次**，此后永远复用同一个实例。要每次拿到新的，需借助 `ObjectProvider`、`@Lookup` 或 `scoped-proxy`：

```java
@Service
public class OrderService {
    private final ObjectProvider<OrderContext> contextProvider;

    public OrderService(ObjectProvider<OrderContext> contextProvider) {
        this.contextProvider = contextProvider;
    }

    public void handle() {
        // 每次取用都是新的原型实例
        OrderContext ctx = contextProvider.getObject();
    }
}
```

## 5. 循环依赖与三级缓存

两个单例 Bean 互相依赖（A 依赖 B、B 依赖 A）时，Spring 用**三级缓存**尝试解决：

| 缓存 | 内容 |
|------|------|
| 一级 `singletonObjects` | 完全初始化好的成品单例 |
| 二级 `earlySingletonObjects` | 已实例化但未完成注入的「早期引用」 |
| 三级 `singletonFactories` | 生成早期引用的工厂（可产出代理对象） |

流程大意：创建 A → 实例化 A 后把 A 的对象工厂放入三级缓存 → 注入时发现需要 B → 创建 B → B 注入 A 时能从三级/二级缓存拿到 A 的早期引用 → B 完成 → 回到 A 完成。

关键结论：

- **只有单例 + Setter/字段注入**才可能被自动解决。
- **构造器注入的循环依赖无法解决**，Spring 会直接抛 `BeanCurrentlyInCreationException`——这其实是好事，逼你从设计上消除环。
- 三级缓存的第三级是为了在需要时对早期引用生成 **AOP 代理**，保证注入的是代理对象而非原始对象。

实践建议：**把循环依赖当设计坏味道**（往往意味着职责划分不清），能用抽离公共服务、事件解耦、领域分层解决，就不要依赖容器的黑魔法。

## 6. 条件装配与 Profile

```java
@Configuration
public class PayConfig {

    @Bean
    @Profile("prod")
    @ConditionalOnProperty(name = "feature.pay", havingValue = "true")
    public PayClient payClient() {
        return new RealPayClient();
    }
}
```

- `@Profile`：按环境（dev/test/prod）激活不同 Bean。
- `@Conditional` / `@ConditionalOnClass` / `@ConditionalOnMissingBean` 等：**Spring Boot 自动配置的地基**——大量 `XxxAutoConfiguration` 靠条件注解决定「装不装、装哪个」。

## 7. 实践清单

1. 业务 Bean 一律**构造器注入**，依赖声明为 `final`。
2. 配置类保持无状态，不要在 `@Bean` 方法里做重 IO。
3. 警惕在构造函数里做耗时操作（会拖慢启动、放大循环依赖风险）。
4. 明确区分「基础设施 Bean」（DataSource、线程池）与「领域服务」，前者集中管理、后者按限界上下文划分。
5. 循环依赖优先**改设计**，其次才谈缓存机制。

## 8. 小结

- IoC 是思想，DI 是实现；Spring 用容器 + `BeanDefinition` + `BeanPostProcessor` 完成装配。
- `ApplicationContext` 是面向业务的容器，`BeanFactory` 是其内核。
- 构造器注入是默认推荐，循环依赖优先靠设计消除。
- 条件装配是 Spring Boot 自动配置的底层能力，理解它才能看懂 Starter。
