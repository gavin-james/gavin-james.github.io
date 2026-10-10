---
title: 框架与中间件
icon: manage
index: false
---

# 框架与中间件

> 本分区收录 Java 后端日常离不开的框架与中间件：**Spring 生态**负责「代码怎么组织」（IoC/AOP/事务/Web/微服务），**ORM** 负责「数据怎么读写」（MyBatis / JPA），**消息队列**负责「系统怎么解耦与削峰」（Kafka / RabbitMQ / RocketMQ），**Web 与网络**负责「请求与连接怎么被处理」（Tomcat / Netty）。四组内容互相咬合：一个 HTTP 请求往往由 Tomcat 接住、经 Spring MVC 分发、用 MyBatis 落库，异步环节再交给 MQ。

## 1. Spring 生态

从容器内核出发，逐层向上：

- [Spring 生态总览](./spring/overview.md)：生态地图与学习路径，先读这篇建立全局观。
- [IoC 容器](./spring/ioc.md)：容器、`BeanDefinition`、依赖注入、循环依赖、条件装配——一切的地基。
- [AOP](./spring/aop.md)：代理机制、通知类型、切点表达式，以及它与事务的关系。
- [MVC](./spring/mvc.md)：请求处理链路、参数绑定、统一异常、拦截器。
- [Boot 自动配置](./spring/boot-auto-config.md) / [Boot 实践](./spring/boot-practice.md)：约定式装配与工程落地。
- [Cloud：Gateway](./spring/cloud-gateway.md) / [Nacos](./spring/cloud-nacos.md) / [Sentinel](./spring/cloud-sentinel.md)：网关、注册配置、流量治理。
- [Security](./spring/security.md) / [事务](./spring/spring-transaction.md)：安全与声明式事务。

## 2. ORM（数据访问）

对象与关系表之间的映射，两条主流路线：

- [ORM 总览](./orm/overview.md)：全自动与半自动的区别、选型决策。
- [MyBatis 详解](./orm/mybatis.md)：半自动路线，你写 SQL，框架管映射；适合复杂查询与精细控制。
- [JPA 与 Hibernate](./orm/jpa.md)：全自动路线，以实体为中心；适合模型稳定、CRUD 密集的场景。

## 3. 消息队列

异步解耦、削峰填谷、事件驱动，三款主流实现各自用武之地：

- [消息队列总览](./mq/overview.md)：共性问题（重复、丢失、乱序）与三款产品对比表。
- [Kafka 详解](./mq/kafka.md)：分区、副本 ISR、高吞吐日志场景。
- [RabbitMQ 详解](./mq/rabbitmq.md)：交换机路由灵活、传统业务消息语义。
- [RocketMQ 详解](./mq/rocketmq.md)：事务消息、顺序消息、延迟消息等业务友好特性。

## 4. Web 与网络

请求进来与连接处理的最底层积木：

- [Tomcat 详解](./web/tomcat.md)：Connector/Container 架构、类加载器、线程池与调优。
- [Netty 详解](./web/netty.md)：NIO 三件套、EventLoop、Pipeline、ByteBuf 与零拷贝。

## 5. 阅读建议

- **先内核后框架**：IoC/AOP 看不透，Spring 的「黑魔法」只能死记。
- **按问题找组件**：遇到「服务怎么发现」「消息怎么不丢」时再对应到具体文档，避免被名词淹没。
- **ORM 与 MQ 无银弹**：选型取决于业务形态，读完两组总览再决定，不要默认用某个。
