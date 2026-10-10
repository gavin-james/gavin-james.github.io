---
title: Spring Cloud 详解
category: [框架]
tag: [Spring, Spring Cloud, 微服务]
---

# Spring Cloud 详解

> 单体拆成多个可独立部署、独立伸缩的服务后，会凭空多出一批分布式问题：服务怎么互相找到、配置怎么统一下发、流量怎么统一入口、依赖挂了怎么办。Spring Cloud 提供了一套约定化的组件与抽象来回答这些问题。

## 1. 拆分前先想清楚

微服务不是免费的。拆之前先自问：

- **边界是否按业务能力划分**？拆错了会得到更难维护的「分布式单体」。
- **数据是否要拆库**？跨库就没了本地事务，只能靠最终一致。
- **团队是否具备运维与可观测能力**？没有就先把单体做扎实。

一句话：**微服务解决的是组织与伸缩问题，不是技术炫耀**。没有对应的痛点，就别拆。

## 2. 一条最小微服务链路

```text
                        ┌──────────┐
        Client ───────▶ │ Gateway  │ ── 统一入口、鉴权、路由、限流
                        └────┬─────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │Service A │──▶│Service B │──▶│Service C │
        └──────────┘   └──────────┘   └──────────┘
              ▲              ▲
              └──────┬───────┘
                     │
        ┌────────────────────────────┐
        │  Registry(注册发现) + Config(配置) │
        └────────────────────────────┘
```

四个核心能力：

1. **注册发现**：服务启动后把实例信息注册到注册中心，调用方按**服务名**拿到实例列表，配合负载均衡发起调用。
2. **配置中心**：把环境相关配置外置，支持集中管理与动态刷新。
3. **网关**：所有外部流量的统一入口，负责路由、鉴权、限流、灰度。
4. **容错治理**：超时、重试、熔断、降级、隔离，保证单点故障不拖垮全链路。

## 3. 各组件在链路中的位置

| 能力 | 组件 | 说明 |
|------|------|------|
| 注册发现 | Nacos / Eureka / Consul | 服务注册与健康检查 |
| 配置中心 | Nacos / Apollo / Spring Cloud Config | 集中配置 + 动态刷新 |
| 网关 | Spring Cloud Gateway | 基于 WebFlux 的非阻塞网关 |
| 负载均衡 | Spring Cloud LoadBalancer | 客户端负载均衡 |
| 容错 | Sentinel / Resilience4j | 限流、熔断、降级 |
| 声明式调用 | OpenFeign | 声明式 HTTP 客户端 |
| 链路追踪 | Micrometer Tracing + Zipkin 等 | 跨服务 traceId |

## 4. 服务发现与声明式调用

以 Nacos + OpenFeign 为例：

```yaml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
        namespace: dev
```

```java
@FeignClient(name = "order-service")   // name 即注册中心里的服务名
public interface OrderClient {
    @GetMapping("/orders/{id}")
    OrderDTO getById(@PathVariable("id") Long id);
}
```

启动类开启 Feign：`@EnableFeignClients`。调用方拿到的 `name` 不是域名，而是注册中心里的服务名，由负载均衡解析成某个实例地址。负载均衡从注册中心获取健康实例列表，再按策略（轮询/随机/权重）挑选目标，属于**客户端负载均衡**。

## 5. 配置中心

把配置从代码里剥离，集中管理并支持动态刷新：

```yaml
spring:
  config:
    import: optional:nacos:order-service.yaml
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848
        file-extension: yaml
```

要点：配置按环境隔离（namespace）、按应用拆分（dataId）；敏感项加密；提供本地兜底，避免配置中心故障导致无法启动。详见 [Nacos 注册与配置中心](./cloud-nacos.md)。

## 6. 容错：顺序很重要

引入分布式后，网络抖动、依赖变慢是常态。治理顺序建议：

1. **先设超时**：没有超时，一个慢依赖就能拖满线程池。
2. **再谈重试**：只对**幂等**操作重试，设上限 + 退避，避免重试风暴把下游打垮。
3. **然后熔断**：错误率/慢调用比例超阈值时快速失败，给下游恢复窗口。
4. **配合降级**：熔断/限流后返回兜底值（缓存、默认值、友好提示）。
5. **隔离**：线程池/信号量舱壁，让故障限制在一个依赖里。

## 7. 链路追踪与可观测

跨服务排障的前提是**全链路 traceId**：入口（网关）生成 traceId，随调用逐跳透传，日志、指标、链路数据都用它串联。缺失 traceId 时，一次跨服务故障往往要在多个服务的日志里人工对齐时间戳，成本极高。常见做法是 Micrometer Tracing + Zipkin/Jaeger，指标走 Prometheus + Grafana。

## 8. Spring Cloud Alibaba 常见组合

| 组件 | 定位 |
|------|------|
| Nacos | 注册中心 + 配置中心二合一 |
| Sentinel | 流量治理（限流/熔断/系统保护） |
| Seata | 分布式事务（AT/TCC/Saga，**慎用**，优先业务方案） |
| RocketMQ | 消息解耦、异步、最终一致 |

这四者在国内落地最广。Nacos、Gateway、Sentinel 的细节分别见 [Nacos 注册与配置中心](./cloud-nacos.md)、[Spring Cloud Gateway](./cloud-gateway.md)、[Sentinel 流量治理](./cloud-sentinel.md)。

## 9. 版本对齐

Spring Cloud 采用**发布列车（Release Train）**版本命名（如 2022.0.x、2023.0.x），每个版本对应特定的 Spring Boot 与 Spring Framework 版本。选型时**必须按官方兼容矩阵对齐三者版本**，混搭极易出现启动失败或行为异常。引入依赖时用 BOM（`spring-cloud-dependencies`）统一管理版本，不要手动指定单个组件版本。

## 10. 落地建议

1. **先拆一个垂直业务验证**，别一次拆出几十个服务。
2. **同步调用能少则少**，能用消息异步就用消息，减少调用链上的耦合点。
3. **统一 traceId**，否则跨服务排障成本指数上升。
4. **API 契约要跟上**：OpenAPI 文档 + 契约测试，防止接口悄悄破坏调用方。
5. **分布式事务尽量退化为本地事务 + 最终一致**（可靠消息、状态机补偿），别轻易上强一致的 2PC。

## 11. 小结

- 微服务引入的是分布式复杂度，拆分要基于真实痛点。
- 核心四件套：注册发现、配置中心、网关、容错治理。
- 容错顺序：先超时，再重试（且幂等），后熔断降级，全程隔离。
- 国内主流是 Spring Cloud Alibaba（Nacos + Sentinel + Seata + RocketMQ）。
- 版本按发布列车 + BOM 对齐；数据一致性优先业务方案（最终一致）。
