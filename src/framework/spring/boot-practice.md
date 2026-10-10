---
title: Spring Boot 工程实践
category: [框架]
tag: [Spring Boot]
---

# Spring Boot 工程实践

> 会用 Spring Boot 起一个能跑的应用很容易，难的是让它成为一个「多人协作、可观测、好维护」的工程。本篇聚焦分层、配置、异常、观测、测试这几件落地必做的事。

## 1. 分层结构

推荐的包划分（按职责切，而非按类型堆）：

```text
com.example.app
├── controller      入口层：参数绑定、DTO 转换、调用 application
├── application     应用层：用例编排、事务边界
├── domain          领域层：实体、值对象、领域服务、仓储接口
├── infrastructure  基础设施层：持久化实现、外部服务客户端、消息
└── config          配置：Bean 装配、拦截器、序列化等
```

原则：

- **依赖单向**：controller → application → domain，infrastructure 实现 domain 定义的接口（依赖倒置）。
- **Controller 不碰 Mapper/Repository**，只做「收参数 → 调 Service → 组装返回」。
- **DTO 与实体分离**：对外用 DTO/VO，别把数据库实体直接暴露出去。

## 2. 依赖与版本管理

- 统一继承 `spring-boot-starter-parent`，或 `dependencyManagement` 导入 `spring-boot-dependencies` BOM，让依赖版本由 Boot 统一约束。
- 引入 Spring Cloud 时再叠加 `spring-cloud-dependencies` BOM，**不要手动指定单个组件的版本**。
- 用 `mvn dependency:tree` 排查版本冲突；冲突时用 `<exclusions>` 排除传递依赖，而非强行指定版本。

## 3. 配置管理

- 文件组织：`application.yml` 放公共配置，`application-{profile}.yml` 放环境差异。
- **敏感信息不进 Git**：口令、密钥放环境变量或密钥管理服务，源码里只留 `${DB_PASSWORD}` 占位符。
- 用 `@ConfigurationProperties` 聚合一组相关配置，替代满屏 `@Value`：

```java
@ConfigurationProperties(prefix = "app.order")
@Validated
public class OrderProperties {
    @NotNull
    private Duration timeout = Duration.ofSeconds(3);
    private int maxRetry = 2;
    // getter / setter
}
```

## 4. 统一返回体与异常

对外统一一个结构，便于前端与调用方处理：

```json
{
  "code": "ORDER_NOT_FOUND",
  "message": "订单不存在",
  "data": null,
  "traceId": "9f2c1a..."
}
```

异常分层的做法：

- **业务异常**（`BizException`）：可预期，带错误码，返回给调用方，日志记 warn。
- **系统异常**（其它 `Exception`）：不可预期，回笼统提示，日志记 error + 堆栈，**绝不把堆栈返回前端**。

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BizException.class)
    public ApiResult<Void> handleBiz(BizException e) {
        return ApiResult.fail(e.getCode(), e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ApiResult<Void> handleUnknown(Exception e) {
        log.error("unexpected error", e);          // 详情进日志
        return ApiResult.fail("INTERNAL_ERROR", "系统繁忙");  // 回笼统提示
    }
}
```

## 5. 可观测性

- **Actuator**：`/actuator/health`（探针）、`/actuator/metrics`、`/actuator/prometheus`（接入监控）。默认只开 health/info，其余显式开放并鉴权。
- **日志**：结构化（JSON）+ 链路 `traceId`。无 traceId 时，跨服务排障成本会指数上升。
- **指标**：关注 QPS、RT（P95/P99）、错误率、JVM（GC/内存/线程）、连接池（活跃/等待）。

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      probes:
        enabled: true
```

## 6. 线程池与超时

- **不共用线程池**：Web 请求、异步任务、定时任务、RPC 调用各自隔离，避免相互拖垮。
- **所有外部调用都要设超时**（连接 + 读取），并配熔断/重试策略，重试要有上限与退避，防止重试风暴。
- **连接池**要设最大连接、获取超时、空闲回收；默认值通常不适合生产。

```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 20
      connection-timeout: 3000
      idle-timeout: 600000
```

## 7. 缓存与幂等

- **缓存**：优先用 Spring Cache 抽象（`@Cacheable` / `@CacheEvict`）统一入口，底层接 Redis；注意**缓存穿透、击穿、雪崩**，做空值缓存、互斥重建、过期时间加随机抖动的处理。
- **幂等**：写接口要防重复提交。手段包括：唯一业务号 + 数据库唯一索引、去重表、基于 Redis 的令牌/分布式锁。**幂等是重试与消息重复投递的前提**，没有幂等就不敢重试。

## 8. 测试策略

| 层次 | 手段 | 关注点 |
|------|------|--------|
| 单元测试 | JUnit 5 + Mockito | 单一类逻辑，不启动容器 |
| 切片测试 | `@WebMvcTest`、`@DataJpaTest` | 只加载相关分层 |
| 集成测试 | `@SpringBootTest` + Testcontainers | 端到端，真实中间件 |

```java
@WebMvcTest(OrderController.class)
class OrderControllerTest {

    @Autowired MockMvc mockMvc;
    @MockBean OrderService orderService;

    @Test
    void create_shouldReturn201() throws Exception {
        when(orderService.create(any())).thenReturn(new OrderVO(1L));
        mockMvc.perform(post("/api/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"userId\":1,\"items\":[]}"))
               .andExpect(status().isCreated());
    }
}
```

用 Testcontainers 起真实 MySQL/Redis，能跑出更接近生产的集成结果，比 H2 更可靠。

## 9. 发布清单

- 优雅停机：`server.shutdown=graceful` + 合理的 `timeout-per-shutdown-phase`。
- 就绪/存活探针配置好，滚动更新时先摘流量再停。
- 连接池、超时、线程池参数显式配置。
- 启动自检：关键依赖（DB/缓存/配置中心）不可用时快速失败并给出清晰日志。
- 有灰度与回滚方案。

## 10. 上线与协作约定

工程规范里最容易失控的不是技术选型，而是「改动怎么进主干、怎么上线、出事怎么办」。几条落地约定：

- **分支与提交**：功能走独立分支，通过 PR 合入主干；主干保护，禁止直推。提交信息写清「改了什么、为什么」。
- **环境分层**：开发、测试、预发、生产用不同 profile 与独立配置，预发尽量贴近生产（同规格、同中间件版本），避免「预发好的生产崩」。
- **发布方式**：优先滚动或蓝绿发布，配合就绪探针与优雅停机；灰度阶段盯核心指标（错误率、RT、QPS），异常即回滚。
- **变更可追溯**：配置改动、依赖升级、SQL 变更都留记录，出事时能快速定位「哪次改动引入」。
- **监控与告警接线**：应用上线前把日志、指标、探针接进统一平台，阈值告警配到具体负责人，避免「上了线没人看」。

规范的价值不在文档本身，而在于把「正确的做法」变成「默认的做法」，让新人不用踩一遍坑。

## 11. 小结

- 分层按职责切，依赖单向，Controller 不越层。
- 依赖用 BOM 统一版本，配置分环境、敏感信息出仓库、用 `@ConfigurationProperties` 聚合。
- 异常分层，系统异常不回堆栈；返回体带 traceId。
- 观测三板斧：日志 + 指标 + 探针；线程池隔离、超时必设；缓存防穿透、写接口幂等。
- 测试分单元/切片/集成三档，集成优先用 Testcontainers，详见 [Spring Boot 自动配置](./boot-auto-config.md)。
