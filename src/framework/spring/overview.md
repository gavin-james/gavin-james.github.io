---
title: Spring 生态总览
category: [框架]
tag: [Spring]
---

# Spring 生态总览

> Spring 是 Java 企业开发事实上的标准底座。它从「IoC 容器 + AOP 内核」出发，长出 Spring Boot 的约定式装配、Spring Cloud 的分布式组件、Spring Security 的安全体系，形成一套覆盖开发全流程的编程模型。

## 1. Spring 解决了什么

早期 Java EE 开发的痛点集中在三处：

- **对象手工装配**：`new` 遍布业务代码，耦合高、难替换、难测试。
- **样板代码多**：每个模块重复写配置、连接管理、事务边界。
- **横切逻辑散落**：日志、鉴权、事务、监控散在各处，改一处要翻十处。

Spring 的对策是一套统一答案：用 **IoC 容器**接管对象的创建与装配，用 **AOP** 收拢横切关注点，用 **统一的编程模型**（注解 + 约定）抹平各中间件的差异。理解这两个内核，后面所有组件都是它们的延伸。

## 2. 生态地图

```text
Spring Framework  ── 内核：IoC / AOP / MVC / 事务 / 数据访问
        │
        ▼
Spring Boot        ── 约定优于配置：自动配置 / Starter / 内嵌容器
        │
        ▼
Spring Cloud       ── 分布式：注册发现 / 配置 / 网关 / 容错 / 链路
        │
        ▼
Security / Data / Batch / Session …   ── 场景化组件
```

一句话概括三者关系：**Framework 提供能力，Boot 负责让能力「开箱即用」，Cloud 把单机能力组合成分布式系统。**

## 3. 基础篇

从内核开始，层层递进：

1. [IoC 容器详解](./ioc.md)：容器、`BeanDefinition`、依赖注入、循环依赖、条件装配——一切的地基。
2. [Spring AOP 详解](./aop.md)：代理机制、通知类型、切点表达式，以及它和事务的关系。
3. [Spring MVC 详解](./mvc.md)：请求处理链路、参数绑定、统一异常、拦截器。
4. [Spring Framework 核心](./spring-framework.md)：把 IoC / AOP / MVC 串成完整运行时视图。
5. [Spring 事务管理](./spring-transaction.md)：声明式事务的机制、传播行为与失效清单。

## 4. Boot 篇

把 Framework 的能力变成「零配置启动」：

1. [Spring Boot 详解](./spring-boot.md)：起步依赖、内嵌容器、配置管理、打包运行。
2. [Spring Boot 自动配置](./boot-auto-config.md)：`@Conditional` 家族与自动配置装载机制。
3. [Spring Boot 工程实践](./boot-practice.md)：分层、配置、异常、观测、测试的落地约定。

## 5. Cloud 篇

单体拆成多服务后，分布式问题成批出现：

1. [Spring Cloud 详解](./spring-cloud.md)：微服务全景，以及各组件在链路中的位置。
2. [Spring Cloud Gateway](./cloud-gateway.md)：路由、过滤器、限流、灰度。
3. [Nacos 注册与配置中心](./cloud-nacos.md)：服务发现 + 动态配置。
4. [Sentinel 流量治理](./cloud-sentinel.md)：限流、熔断、降级、系统保护。

## 6. 安全篇

- [Spring Security](./security.md)：认证、授权、过滤器链，以及 API 场景下的 JWT / OAuth2 方案。

## 7. 学习路径建议

- **先内核后框架**：IoC/AOP 看不透，后面所有「黑魔法」都只能死记。
- **先会用再源码**：能读懂现象、能排障之后再啃 `refresh()` 主流程，收益更大。
- **按问题找组件**：遇到「服务怎么发现」「配置怎么动态改」「流量怎么保护」时，再对应到 Cloud 篇的具体文档，避免被组件名词淹没。

技术选型上，新项目普遍以 **Spring Boot 3.x（要求 Java 17+、Jakarta EE 9+）** 为基线；老项目多见 Spring Boot 2.x。两者在包名（`javax.*` → `jakarta.*`）、最低 JDK 上有硬差异，迁移时需一并评估。
