---
date: 2026-10-11
title: 分布式会话
category: [架构]
tag: [分布式, Session]
---

# 分布式会话

> 应用横向扩展成多实例后，用户的登录态不能再「只存在这台机器上」。分布式会话要解决的问题是：**用户这次落在 A 机器、下次落在 B 机器，如何仍是同一个已登录用户。**

## 1. 为什么本地 Session 会失效

传统 Servlet 容器把 `HttpSession` 存在**当前 JVM 的内存**里。单机时代没问题，一旦前面挂上负载均衡：

```text
        负载均衡
       /        \
   实例A       实例B
 (登录态在A)  (B没有A的登录态)
```

用户在 A 登录成功，下一个请求被负载均衡转发到 B，B 的内存里没有这个 Session —— 用户「莫名掉线」。这就是分布式会话要解决的经典问题。

## 2. 主流方案

| 方案 | 原理 | 优点 | 缺点 |
|------|------|------|------|
| 粘滞会话（Sticky Session） | 同一用户固定路由到同一实例 | 改造最少 | 扩缩容/故障切换差，实例不均衡 |
| 会话复制（Session Replication） | 容器间互相广播复制 Session | 无需外部组件 | 节点多时广播风暴，只适合小集群 |
| 集中式会话（Redis 等） | Session 存到共享存储 | 应用无状态、易扩展 | 引入存储依赖 |
| Token / JWT | 状态放客户端，服务端验签 | 无状态、跨服务方便 | 注销/续签/轮换复杂 |

## 3. 逐一说清

### 3.1 粘滞会话

由 Nginx `ip_hash` 或负载均衡的会话保持实现，把同一来源的请求固定打到一个后端：

```nginx
upstream backend {
    ip_hash;                # 按客户端 IP 哈希固定后端
    server 10.0.0.1:8080;
    server 10.0.0.2:8080;
}
```

- 简单，但**某台实例宕机，其上的所有用户掉线**；
- 节点负载不均匀；扩缩容会打乱映射。
- 只适合过渡或内部系统。

### 3.2 会话复制

Tomcat 可配置集群，通过组播把 Session 变化同步给其他节点：

```xml
<!-- tomcat conf/server.xml 中开启集群（示意） -->
<Cluster className="org.apache.catalina.ha.tcp.SimpleTcpCluster"/>
```

节点少时可行，节点一多广播量爆炸（N 个节点要发 N-1 份），**不适合大规模集群**。

### 3.3 集中式会话（推荐）

把所有 Session 放进共享存储（通常是 Redis），应用本身变得**无状态**：

- 任意实例都能读取、校验；
- 实例故障不影响登录态；
- 扩容无需迁移 Session。

Spring 生态用 **Spring Session** 几乎零改造接入：

```xml
<dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-data-redis</artifactId>
</dependency>
```

```yaml
spring:
  session:
    store-type: redis
    timeout: 30m          # 会话过期时间
  data:
    redis:
      host: redis-host
      port: 6379
```

```java
@EnableRedisHttpSession       // 开启 Redis 会话
@Configuration
public class SessionConfig { }
```

配置后，`HttpSession` 的读写会自动落到 Redis，业务代码基本不用改。要点：

- Session 里**只放轻量数据**（用户 ID、权限标识），别放大对象——每次请求都要反序列化。
- 设置合理的**过期时间**，并与 Redis 的淘汰策略配合。
- Redis 要做**高可用**（哨兵/集群），否则存储挂了全员登出。
- 跨域场景要正确设置 Cookie 的 `domain`、`SameSite`。

### 3.4 Token / JWT（无状态）

把登录态放进客户端持有的令牌里，服务端只做验签，不再存储：

```text
JWT 结构：header.payload.signature
payload 里可放：用户ID、过期时间(exp)、签发者(iss) 等
```

```text
Authorization: Bearer <token>
```

- 服务端（或网关）用**公钥/密钥验签**，无需查存储；
- 天然跨服务、跨语言，适合**前后端分离 / API 场景**；
- 代价：**令牌无法「主动作废」**——用户登出、密码修改后，旧令牌在过期前仍然有效。

JWT 的补救手段：

| 问题 | 手段 |
|------|------|
| 注销难 | 维护短周期的**黑名单/白名单**（如 Redis 存已撤销 token 的 jti） |
| 过期时间 | 用**短有效期 access token + 长有效期 refresh token** |
| 密钥泄露 | 定期轮换签名密钥，用 `kid` 标识当前密钥 |
| 信息泄露 | payload 是**明文 Base64**，绝不放敏感信息 |

## 4. 怎么选

| 场景 | 建议 |
|------|------|
| 前后端分离、纯 API、跨端（App/H5） | **Token / JWT**（配 refresh token） |
| 管理后台、Session 语义重、需要服务端可控注销 | **Spring Session + Redis** |
| 内部小系统、图省事 | 粘滞会话（可接受掉线） |
| 小集群且不想引入外部存储 | 会话复制（节点数很少时） |

实践中常见**组合**：网关做统一鉴权，校验 token；网关上把解析出的用户信息透传给下游服务，下游不再各自解析登录态。

## 5. 安全要点

- **全程 HTTPS**：会话 Cookie / token 一旦被抓包就是会话劫持。
- **Cookie 属性**：`HttpOnly`（禁止 JS 读取）、`Secure`（仅 HTTPS 发送）、`SameSite=Lax/Strict`（防 CSRF）。
- **防伪造网关头**：内部服务若信任网关注入的 `X-User-Id` 之类请求头，必须保证外部请求**无法伪造**这些头（网关剥离外来同名头），并限制网络入口。
- **短过期 + 刷新**：access token 有效期短（如 15 分钟），refresh token 长但可撤销。
- **会话固定攻击**：登录成功后**重新生成** Session ID。
- **退出登录**：集中式会话删除 Redis 记录即可；JWT 需走黑名单或短过期。

## 6. 实践要点与常见坑

1. **Session 里存大对象**：每次请求都要反序列化整个 Session，会把延迟放大；只存用户 ID、权限标识等轻量字段。
2. **集中式会话无高可用**：Redis 单点宕机导致全员登出，必须用哨兵或集群。
3. **Cookie 作用域配置错误**：跨子域/跨端口时 `domain`、`path` 没配对，登录态「时有时无」。
4. **JWT 过期时间过长**：失去撤销能力的时间窗变大；access token 宜短、refresh token 宜可撤销。
5. **JWT 里放敏感信息**：payload 只是 Base64 编码，任何人可解开查看。
6. **退出登录只删前端 token**：无状态方案下旧 token 在过期前仍有效，需服务端黑名单配合。

## 7. 小结

- 本地 Session 在多实例下失效，是分布式会话要解决的根本问题。
- 粘滞、复制是过渡方案；**集中式（Redis + Spring Session）**是管理后台类应用的稳妥选择。
- **Token / JWT** 无状态、跨端友好，是前后端分离与 API 场景的主流，但注销与密钥轮换要额外设计。
- 安全底线：HTTPS + 安全 Cookie 属性 + 防头伪造 + 短过期令牌。
