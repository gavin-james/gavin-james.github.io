---
date: 2026-10-11
title: Nacos 注册与配置中心
category: [框架]
tag: [Spring Cloud, Nacos]
---

# Nacos 注册与配置中心

> Nacos 把「服务注册发现」和「配置管理」两件事合二为一，是国内 Spring Cloud Alibaba 体系里最常用的基础设施组件。服务通过它互相发现，配置通过它统一下发并支持动态刷新。

## 1. 能力概览

Nacos（Dynamic Naming and Configuration Service）提供两大核心能力：

- **服务注册与发现**：服务实例启动后注册，调用方按服务名获取健康实例列表。
- **配置管理**：集中管理配置，支持按维度隔离、版本管理与动态推送刷新。

外加：命名空间隔离、健康检查、权重与元数据、集群部署。

## 2. 数据模型：隔离靠「命名空间 / 分组 / DataId」

Nacos 的配置与注册都按三级坐标组织，理解它是用好 Nacos 的前提：

| 层级 | 作用 | 常见用法 |
|------|------|----------|
| Namespace（命名空间） | 最外层隔离 | **按环境隔离**：dev / test / prod |
| Group（分组） | 次级隔离 | 按业务域或团队划分，默认 `DEFAULT_GROUP` |
| DataId（数据标识） | 具体一份配置 | 常按应用 + 后缀：`order-service.yaml` |

服务发现同样可以用命名空间/分组做环境与逻辑隔离。一条经验：**环境隔离一定用不同 namespace，而不是靠 group 混用**，否则极易误连生产。

## 3. 服务注册与发现原理

引入依赖（Spring Cloud Alibaba）：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

配置：

```yaml
spring:
  application:
    name: order-service          # 服务名，即注册到 Nacos 的名字
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
        namespace: dev
        group: DEFAULT_GROUP
```

启动类加 `@EnableDiscoveryClient`（新版多数场景可省略，但显式标注更清晰）。服务启动后注册实例，Nacos 通过心跳/健康检查维持实例状态；调用方（如 OpenFeign）解析服务名得到实例并负载均衡。

Nacos 的实例分为两类，行为不同：

- **临时实例（ephemeral）**：默认，靠客户端心跳保活，心跳丢失即被剔除，适合无状态微服务。
- **持久实例（persistent）**：由服务端主动探测健康状态，实例不会因心跳丢失立即下线，适合需要稳定注册的场景。

::: tip 优雅上下线
服务要下线时，先从注册中心**摘除实例**、等待流量排空，再停止进程。配合健康检查，避免流量打到尚未就绪或正在关闭的实例。
:::

## 4. 配置中心

Nacos 配置中心的一个关键特性是**引导阶段就要拿到配置**（如数据库地址），因此新版 Spring Cloud 用 `spring.config.import` 显式导入：

```yaml
spring:
  config:
    import:
      - optional:nacos:order-service.yaml   # 应用主配置
      - optional:nacos:common.yaml          # 公共配置
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848
        namespace: dev
        group: DEFAULT_GROUP
        file-extension: yaml
```

`optional:` 前缀表示**拉不到也不阻断启动**（配置中心故障时用本地兜底），生产建议加上，避免配置中心短暂不可用导致全站无法启动。

动态刷新：标注 `@RefreshScope` 的 Bean 在配置变更时重建，`@Value` / `@ConfigurationProperties` 的值随之更新。

```java
@RestController
@RefreshScope
public class FeatureController {

    @Value("${feature.new-order:false}")
    private boolean newOrderEnabled;

    @GetMapping("/feature")
    public boolean feature() {
        return newOrderEnabled;   // 配置中心改值后无需重启即可生效
    }
}
```

多环境配置可借助 `spring.profiles.active` 拼接 DataId，例如当前 profile 为 `prod` 时，`order-service-prod.yaml` 会被一并加载，实现公共配置 + 环境差异的分层。

## 5. 与 OpenFeign 协同

服务发现的价值最终体现在调用上。声明式客户端直接使用服务名：

```java
@FeignClient(name = "order-service")   // name 即注册中心中的服务名
public interface OrderClient {
    @GetMapping("/orders/{id}")
    OrderDTO getById(@PathVariable("id") Long id);
}
```

负载均衡交给 Spring Cloud LoadBalancer，从 Nacos 拉到的健康实例列表中选择目标，实现客户端负载均衡。

## 6. 集群与高可用

生产环境 Nacos 必须集群化，否则单点会成为全局故障源：

- 部署**多个 Nacos 节点**，前面挂负载均衡，客户端配置多个 `server-addr`（逗号分隔）。
- 元数据存储接入**外部数据库**（如 MySQL），避免默认内嵌存储带来的数据一致性问题。
- 集群节点间通过网络通信同步数据，要保证各节点间通信端口互通。

## 7. 实践建议与常见坑

1. **配置变更可审计**：重要配置改动要留记录，谁在何时把什么改成了什么。
2. **敏感配置加密**：口令、密钥不要明文放 Nacos，使用加密插件或外部密钥管理。
3. **本地兜底配置**：防止配置中心故障导致应用无法启动（用 `optional:` + 本地默认）。
4. **合理拆分 DataId**：按应用拆主配置，公共配置抽出来共享，但别把无关配置塞进一个巨型 DataId。
5. **注意刷新范围**：不是所有 Bean 都能安全热刷新，涉及连接池/线程池的配置变更可能需要重启评估。
6. **命名空间别混用**：环境隔离用 namespace，不要用 group 顶替，否则误连生产风险极高。

## 8. 配置与注册的一致性

Nacos 同时承担注册与配置，两者共用一套命名空间与分组坐标，配置错位往往比代码 bug 更难排查：

- **坐标要对齐**：注册与配置的 `namespace`、`group` 必须指向同一套环境，否则会出现「服务注册在 dev、配置却拉到了 prod」这类隐蔽问题。
- **灰度发布**：可借助分组或元数据把新版本实例单独成组，先导一小部分流量验证，再全量。
- **变更联动**：配置动态刷新后，服务的数据源、限流阈值等随之变化，要评估这些 Bean 是否支持在线重建，避免刷新出半成品状态。

一条朴素但有效的原则：**环境隔离靠命名空间，逻辑隔离靠分组**，坐标一旦定好就不要随意调整。

## 9. 小结

- Nacos = 注册发现 + 配置中心，国内 Spring Cloud Alibaba 标配。
- 数据模型三级：namespace（环境）/ group（业务）/ dataId（具体配置）。
- 服务发现按服务名注册与解析，临时实例靠心跳、持久实例靠服务端探测。
- 配置用 `spring.config.import: optional:nacos:xxx` 导入，`@RefreshScope` 支持动态刷新。
- 敏感信息加密、本地兜底、生产集群化，是三条硬要求。
