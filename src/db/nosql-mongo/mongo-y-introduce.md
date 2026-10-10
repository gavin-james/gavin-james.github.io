---
date: 2022-07-10
category:
  - NoSQL MongoDB
tag:
  - NoSQL MongoDB
---
# MongoDB 入门与体系

> MongoDB 是面向文档的 NoSQL 数据库，用「文档」取代「行」、用「集合」取代「表」，把嵌套结构与数组作为一等公民。它既要回答「和关系库有什么不同」，也要给出高可用（副本集）与水平扩展（分片集）的完整体系。本文是一份入门与全局视图，细节再按需下钻。

## 1. 从关系模型到文档模型

关系模型把数据拆进多张规范化的表，用 JOIN 组合；文档模型更倾向**把常一起访问的数据放进同一个文档**，减少关联。核心概念一一对应：

| 关系型（RDBMS） | MongoDB | 说明 |
| --- | --- | --- |
| 数据库 database | 数据库 database | 容器 |
| 表 table | 集合 collection | 一组文档 |
| 行 row | 文档 document | 一条 BSON 记录 |
| 列 column | 字段 field | 键值对 |
| 主键 primary key | `_id` | 每个文档必有，默认自动生成 |
| JOIN | `$lookup` / 内嵌 | 优先用内嵌与数组，减少关联 |
| 事务 | 多文档事务 | 副本集 / 分片集上支持 |

同一个「订单 + 明细」，关系库需要两张表 JOIN，文档库可以直接内嵌：

```json
{
  "_id": "65f0c2c1a1b2c3d4e5f60001",
  "userId": 10086,
  "status": "PAID",
  "items": [
    { "sku": "A1", "qty": 2, "price": 9.9 },
    { "sku": "B7", "qty": 1, "price": 19.9 }
  ],
  "createAt": "2024-03-01T10:00:00Z"
}
```

**内嵌（embedding）与引用（referencing）是文档建模的核心决策**：一对少量、需要整体读取的数据适合内嵌；一对极多、或会被独立频繁更新的数据适合引用（存对方 `_id`）。内嵌换来「一次读取拿到完整对象」，代价是文档可能变大、更新路径变复杂。

## 2. BSON 与数据类型

MongoDB 在磁盘和网络上使用 **BSON（Binary JSON）**——一种带类型信息的二进制 JSON 扩展，兼顾 JSON 的表达力与二进制的解析效率。常用类型：

- `String`：UTF-8 字符串。
- `Int32` / `Int64` / `Double` / `Decimal128`：整数、浮点与高精度小数（金额建议用 `Decimal128`）。
- `Boolean`、`Date`、`Null`。
- `ObjectId`：默认 `_id` 类型，12 字节，由 4 字节时间戳 + 5 字节随机值 + 3 字节自增计数器构成，因此**大致按时间递增**。
- `Object`（内嵌文档）、`Array`（数组，元素可混合类型）。
- `BinData`、`Timestamp`、`GeoJSON` 等。

因为字段是动态的，同一集合里的文档可以有不同字段（schema-less / flexible schema）；但「灵活」不等于「无设计」，生产上仍会用校验（schema validation）约束关键结构。

## 3. 基本操作与查询

增删改查围绕集合进行：

```javascript
// 插入
db.orders.insertOne({ userId: 10086, status: "PAID" });

// 查询：条件、投影、排序、分页
db.orders.find(
  { status: "PAID", "items.sku": "A1" },   // 条件，可点进嵌套字段
  { userId: 1, createAt: 1, _id: 0 }       // 投影
).sort({ createAt: -1 }).skip(0).limit(20);

// 更新：局部更新嵌套字段
db.orders.updateOne(
  { userId: 10086 },
  { $set: { status: "SHIPPED" }, $push: { logs: { at: new Date(), msg: "已发货" } } }
);
```

复杂场景用**聚合管道（aggregation pipeline）**：把 `$match`、`$group`、`$sort`、`$lookup`、`$project` 等阶段串起来，像流水线一样逐级处理文档，用于统计、分组、关联与形态转换。

## 4. 索引

MongoDB 的索引基于 B 树，支持单字段、复合、多键（数组）、地理空间、文本、TTL 等类型。要点：

- 复合索引同样遵循**前缀原则**，字段顺序影响能否命中。
- **多键索引**：对数组字段建索引时，会为每个数组元素建立索引项。
- **TTL 索引**：对日期字段自动过期删除文档，适合会话、日志类数据。
- 用 `explain("executionStats")` 查看是否 `COLLSCAN`（全集合扫描），目标是 `IXSCAN`。

索引细节见 [MongoDB 索引](./mongo-z-index.md)。

## 5. 副本集：高可用

副本集（Replica Set）是一组保存**同一份数据**的 mongod 实例，默认提供高可用与读扩展：

- **Primary（主）**：唯一接受写操作的节点。
- **Secondary（从）**：通过复制 **oplog（操作日志）**持续同步主节点变更，可承担读（read preference）。
- **Arbiter（仲裁者）**：不存数据，仅参与选举投票，用于凑够奇数票。

Primary 故障时，成员通过选举从 Secondary 中选出新主（需要多数派），实现自动故障转移。写入可用**写关注（write concern）**控制：`w:1` 只要主确认，`w:"majority"` 要求多数派确认，后者更安全但延迟更高。细节见 [MongoDB 复制集](./mongo-z-rep.md)。

## 6. 分片集：水平扩展

当单机容量或吞吐到顶，用**分片集群（Sharded Cluster）**横向扩展，主要组件：

- **mongos**：路由进程，对应用呈现单一逻辑入口，按分片键把请求转发到对应分片。
- **config servers**：存储集群元数据（分片键范围、chunk 分布等），本身也是一个副本集。
- **shards**：每个分片通常是一个副本集，存放部分数据。

数据按**分片键（shard key）**切分成 **chunk** 分布到各分片，后台 **balancer** 负责在分片间迁移 chunk 以实现均衡。分片键的选择至关重要：既要分布均匀，又要让常用查询能带上它以避免广播查询。详见 [MongoDB 分片](./mongo-z-sharding.md)。

## 7. 存储引擎：WiredTiger

从 3.2 起，WiredTiger 是默认存储引擎，提供文档级并发与支持**快照隔离**的多文档事务。它用 B 树组织数据（也支持 LSM），通过 **checkpoint** 定期把内存中的修改持久化到数据文件并缩短恢复时间，配合 journal（预写日志）保证崩溃后的一致性。缓存与 checkpoint 机制见 [WT 引擎：Page 生命周期](./mongo-y-page.md)、[WT 引擎：checkpoint 原理](./mongo-y-checkpoint.md)。

## 8. 适用场景

**适合**：

- 数据模型天然嵌套 / 多变（内容、目录、用户画像、物化 JSON）。
- 需要灵活的 schema 与快速迭代，字段经常增减。
- 高写入、需要水平扩展与高可用的场景（日志、IoT、消息，以及半结构化数据的实时处理）。
- 读多写少，且以文档整体为单位的访问。

**不适合**：

- 强事务、多表强关联且高度规范化的事务型业务（如核心账务），关系库更合适。
- 需要复杂多表 JOIN 与严格 SQL 语义的分析场景，数据仓库更合适。

## 9. 学习路径

- 概念与生态：[MongoDB 基础概念](./mongo-x-basic.md)、[MongoDB 生态](./mongo-x-ecosystem.md)
- 快速上手：[基本使用：安装和 CRUD](./mongo-x-usage-1.md)、[索引和聚合](./mongo-x-usage-2.md)
- 体系结构：[MongoDB 体系结构](./mongo-y-arch.md)
- 核心机制：[复制集](./mongo-z-rep.md)、[分片](./mongo-z-sharding.md)、[索引](./mongo-z-index.md)、[事务](./mongo-y-trans.md)
- 数据模型：[文档模型](./mongo-y-doc.md)
- 知识体系总览：[MongoDB 知识体系](./mongo.md)

## 10. 小结

- 文档模型用「内嵌 + 数组」减少关联，内嵌 vs 引用是建模的核心取舍。
- 数据以 BSON 存储，`_id` 默认 `ObjectId`（近似按时间递增），字段灵活但仍应做校验。
- 查询语言以 `find` + 聚合管道为主；索引基于 B 树，注意前缀原则并用 `explain` 验证。
- 高可用靠副本集（Primary / Secondary + oplog + 选举），水平扩展靠分片集（mongos / config / shard + chunk + balancer）。
- 默认引擎 WiredTiger 提供文档级并发与快照隔离；强事务、强关联场景仍应优先关系库。
