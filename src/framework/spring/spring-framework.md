---
title: Spring Framework 核心
category: [框架]
tag: [Spring]
---

# Spring Framework 核心

> Spring Framework 是整个生态的内核。它用 IoC 容器管理对象、用 AOP 处理横切逻辑、用 MVC 支撑 Web、用统一抽象屏蔽数据访问细节。Boot 和 Cloud 都是在这套内核上做的「开箱即用」封装。

## 1. 模块划分

Spring Framework 按职责拆成若干模块，按需引入：

| 模块 | 职责 |
|------|------|
| `spring-core` / `spring-beans` | IoC 容器与依赖注入的内核 |
| `spring-context` | 应用上下文、事件、国际化、注解驱动 |
| `spring-aop` / `aspectj` | 面向切面、声明式事务的代理基础 |
| `spring-web` / `spring-webmvc` | Web 集成与 MVC 实现 |
| `spring-tx` | 声明式/编程式事务抽象 |
| `spring-jdbc` / `orm` | 数据访问模板与 ORM 集成 |
| `spring-test` | 测试上下文与 Mock |

本篇聚焦运行时全貌；IoC 细节见 [IoC 容器详解](./ioc.md)，AOP 见 [Spring AOP 详解](./aop.md)，Web 见 [Spring MVC 详解](./mvc.md)。

## 2. 容器启动主流程

`ApplicationContext` 启动的核心是 `AbstractApplicationContext.refresh()`，可概括为一条流水线：

1. **准备上下文**：记录启动时间、初始化占位符解析器、准备事件多播器。
2. **获取 `BeanFactory`**：刷新并设置序列化、属性编辑器等基础能力。
3. **`BeanFactoryPostProcessor` 阶段**：在所有 Bean 实例化**之前**，允许修改 `BeanDefinition`（如 `@Value` 的占位符解析、配置类扫描注册）。
4. **注册 `BeanPostProcessor`**：把后置处理器登记到容器，供后续 Bean 初始化时调用。
5. **初始化消息源、事件多播器、`ApplicationListener`**。
6. **`finishBeanFactoryInitialization` 阶段**：真正实例化所有**非懒加载单例** Bean，这是最耗时、也最容易出问题的一步。
7. **`finishRefresh`**：发布 `ContextRefreshedEvent`，上下文就绪。

::: tip 面试高频
「AOP 代理是什么时候生成的？」答案在单例实例化的初始化阶段——`BeanPostProcessor` 的后置处理中。理解这条流水线，就理解了循环依赖为何用三级缓存、`@PostConstruct` 何时触发。
:::

## 3. Bean 生命周期（简化）

单个 Bean 从创建到销毁大致经历：

1. **实例化**：反射调用构造器创建原始对象。
2. **属性填充**：依赖注入，解析 `@Autowired` / XML 配置。
3. **感知接口回调**：`BeanNameAware`、`BeanFactoryAware`、`ApplicationContextAware` 等。
4. **`BeanPostProcessor.postProcessBeforeInitialization`**：初始化前处理。
5. **初始化**：`@PostConstruct` → `InitializingBean.afterPropertiesSet()` → `init-method`。
6. **`BeanPostProcessor.postProcessAfterInitialization`**：初始化后处理，**AOP 代理在此生成**。
7. **使用中**。
8. **销毁**：容器关闭时 `@PreDestroy` → `DisposableBean.destroy()` → `destroy-method`。

## 4. 配置方式的演进

| 方式 | 特点 | 现状 |
|------|------|------|
| XML | 集中声明，与代码解耦 | 老项目/遗留系统 |
| 注解 + Java Config | `@Configuration` / `@Bean`，类型安全 | 现代主流 |
| 条件装配 | `@ConditionalOn*`，按环境决定装什么 | Boot 自动配置的基础 |

Java Config 示例：

```java
@Configuration
public class DataSourceConfig {

    @Bean
    @ConfigurationProperties("app.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }
}
```

## 5. 事务传播行为

声明式事务的传播行为，是 Framework 级别的核心概念（详见 [Spring 事务管理](./spring-transaction.md)）：

| 传播行为 | 含义 |
|----------|------|
| `REQUIRED` | 有事务则加入，没有则新建（**默认**） |
| `REQUIRES_NEW` | 挂起当前事务，新开一个独立事务 |
| `NESTED` | 在当前事务内开子事务（基于保存点） |
| `SUPPORTS` | 有则加入，没有就以非事务方式执行 |
| `NOT_SUPPORTED` | 以非事务方式执行，挂起当前事务 |
| `MANDATORY` | 必须在事务中，否则抛异常 |
| `NEVER` | 必须不在事务中，否则抛异常 |

## 6. 关键注解速览

- **装配**：`@Component` / `@Service` / `@Repository` / `@Controller`、`@Autowired`、`@Qualifier`。
- **配置**：`@Configuration`、`@Bean`、`@Value`、`@PropertySource`。
- **Web**：`@RequestMapping` 及衍生注解、`@RequestBody` / `@ResponseBody`、`@ControllerAdvice`。
- **事务**：`@Transactional`（传播、隔离、`rollbackFor`、`readOnly`）。
- **条件**：`@Conditional` 家族，Boot 自动配置的引擎。

## 7. 实践建议

1. 业务 Bean 一律**构造器注入**，字段声明 `final`。
2. 配置类保持无状态，别在 `@Bean` 方法里做重 IO 或阻塞调用。
3. 留意生命周期钩子顺序：`@PostConstruct` 里若依赖尚未就绪的其他 Bean，可能拿到半成品。
4. 循环依赖优先**改设计**（抽公共服务、事件解耦），其次才依赖容器机制。
5. 先会用，再抽时间对照 `refresh()` 主流程读源码，收益最大。

## 8. 小结

- Spring Framework 是内核，Boot/Cloud 都是它的封装。
- 容器启动是一条 `refresh()` 流水线，`BeanFactoryPostProcessor` 改图纸、`BeanPostProcessor` 改实例。
- Bean 生命周期分实例化、属性填充、初始化、销毁四段，AOP 代理在初始化后生成。
- 事务传播、条件装配、统一注解模型是这套内核的三个高频抓手。
