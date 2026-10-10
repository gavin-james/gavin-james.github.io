---
date: 2026-10-11
title: Spring Boot 详解
category: [框架]
tag: [Spring, Spring Boot]
---

# Spring Boot 详解

> Spring Boot 的目标是让基于 Spring 的应用「几乎零配置」就能启动并达到生产可用。它靠三件事实现：起步依赖（Starter）聚合依赖、自动配置按需装配 Bean、内嵌容器让应用可直接运行。

## 1. 解决什么问题

用纯 Spring Framework 起一个 Web 应用，历史上需要经历：手动引入一堆版本对齐的依赖、写 XML/Java Config 装配 `DispatcherServlet`、配置数据源与事务、把应用打成 war 再丢进外部 Tomcat。样板工作占据了大量时间，且依赖版本极易冲突。

Spring Boot 用三个约定把上述流程收敛：

- **起步依赖**：一个 `spring-boot-starter-web` 帮你引入 Web 所需的整套依赖，且版本由父 POM 统一管理，不用再逐个对版本号。
- **自动配置**：根据类路径上「有什么」，自动装配出一个可运行的默认配置，且默认值都能被覆盖。
- **内嵌容器**：把 Tomcat/Jetty/Undertow 打进应用，`java -jar` 即可启动，无需外部容器。

## 2. 起步依赖

| Starter | 场景 |
|---------|------|
| `spring-boot-starter-web` | Web / REST（内嵌 Tomcat + Spring MVC） |
| `spring-boot-starter-webflux` | 响应式 Web |
| `spring-boot-starter-data-jpa` | JPA / Hibernate |
| `mybatis-spring-boot-starter` | MyBatis 集成 |
| `spring-boot-starter-data-redis` | Redis 缓存 |
| `spring-boot-starter-validation` | Bean Validation 参数校验 |
| `spring-boot-starter-actuator` | 健康检查 / 指标 |
| `spring-boot-starter-security` | 安全 |
| `spring-boot-starter-test` | 测试（JUnit、Mockito、AssertJ） |

`spring-boot-starter-web` 内部会展开成 `web` + `tomcat` + `webmvc` 等依赖——Starter 本身通常没有代码，只是「依赖清单」。

## 3. 自动配置一览

`@SpringBootApplication` 是一个组合注解：

```java
@SpringBootApplication
// 等价于下面三个
// @SpringBootConfiguration  （本质是 @Configuration）
// @EnableAutoConfiguration  （开启自动配置）
// @ComponentScan            （扫描当前包及子包）
```

自动配置的机制与条件注解，单独在本区 [Spring Boot 自动配置](./boot-auto-config.md) 详述。这里只需记住：**Boot 会根据类路径和已有配置，决定「装不装、装哪个」Bean**。

## 4. 配置管理

配置优先级（从高到低，常见来源）：

1. 命令行参数（`--server.port=8081`）
2. `SPRING_APPLICATION_JSON` / 系统环境变量
3. 外部配置文件（与 jar 同目录、`config/` 目录）
4. 打包在 jar 内的 `application.yml`

Profiles 让不同环境用不同配置：

```yaml
# application.yml
spring:
  profiles:
    active: dev
  datasource:
    url: jdbc:mysql://localhost:3306/demo
    username: ${DB_USER}
    password: ${DB_PASSWORD}
```

```yaml
# application-prod.yml
spring:
  datasource:
    url: jdbc:mysql://prod-host:3306/demo
```

```bash
java -jar app.jar --spring.profiles.active=prod
```

::: warning 敏感信息
数据库口令等不要写进 `application.yml` 提交到 Git。用环境变量、启动参数或外部配置注入，源码里只留占位符。
:::

用 `@ConfigurationProperties` 把一组相关配置映射成强类型对象，比散落一堆 `@Value` 更清晰：

```java
@ConfigurationProperties(prefix = "app.order")
public class OrderProperties {
    private int timeoutSeconds = 3;   // 提供默认值
    private int maxRetry = 2;
    // getter / setter
}
```

## 5. 打包与运行

```bash
# 构建可执行 jar
./mvnw -DskipTests clean package
# 运行
java -jar target/app.jar --spring.profiles.active=prod
```

产物是「Fat Jar」（可执行 jar），内含依赖与内嵌容器。进阶话题包括分层 jar（`layered jar`，提升镜像层复用）、以及用 Buildpacks 或 Dockerfile 构建镜像。生产建议：

- 用 `-XX:MaxRAMPercentage` 等让 JVM 感知容器内存限制。
- 优雅停机：`server.shutdown=graceful` 配合 `spring.lifecycle.timeout-per-shutdown-phase`。
- 就绪/存活探针配合 Actuator 的健康检查端点。

## 6. Actuator 与可观测性

引入 `spring-boot-starter-actuator` 后，可获得一批运维端点：

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      probes:
        enabled: true     # 暴露 liveness / readiness
```

`/actuator/health` 用于探针，`/actuator/metrics`、`/actuator/prometheus` 用于接入监控。注意**默认只暴露 health/info**，其余端点需显式开放，并做好鉴权，避免信息泄露。

## 7. 生产清单

- 健康检查 + readiness/liveness 探针。
- 日志分级、结构化（JSON）+ 链路 traceId、敏感字段脱敏。
- 连接池、超时、重试参数显式配置，不依赖默认。
- 优雅停机，避免滚动更新时请求被硬断。
- 配置与密钥不进仓库。
- 有回滚方案与启动自检。

## 8. 小结

- Spring Boot = 起步依赖 + 自动配置 + 内嵌容器，目标是开箱即用。
- `@SpringBootApplication` 组合了配置、扫描与自动配置开关。
- 配置优先级「命令行 > 环境变量 > 外部文件 > jar 内」，Profile 管环境差异。
- 用 `@ConfigurationProperties` 做类型安全配置，用 Actuator 打通可观测性。
- 自动配置原理见 [Spring Boot 自动配置](./boot-auto-config.md)，落地约定见 [Spring Boot 工程实践](./boot-practice.md)。
