---
title: MongoDB 性能模型
category: [数据库]
tag: [MongoDB]
---

# MongoDB 性能模型

> MongoDB 的性能不是由单个参数决定的，而是“**工作集是否装进内存 + 索引是否命中 + 写关注/读关注级别 + 数据模型是否合理**”四者共同作用的结果。本页给出一个可落地的性能分析模型，并说明数据建模的关键取舍。

## 1. 影响性能的四个前提

排查 MongoDB 慢之前，先建立判断框架：

1. **内存与工作集**：热点数据能否常驻内存，直接决定是内存访问还是磁盘 IO。
2. **索引命中**：查询是否走索引，还是全集合扫描。
3. **写关注与读关注（Write/Read Concern）**：一致性级别越高，写等待与延迟越大。
4. **数据模型**：内嵌还是引用、数组是否有界，决定了文档读写是否随数据增长而恶化。

下面逐一展开。

## 2. 内存与工作集（WiredTiger 缓存）

MongoDB 默认存储引擎为 WiredTiger。它使用自有缓存（由 `wiredTiger.engineConfig.cacheSizeGB` 控制，默认约为物理内存的一半或 256MB 中的较大值）。性能的核心指标是**工作集（working set）**：能被频繁访问的索引与文档，是否大多驻留在缓存中。

- 工作集小于内存：绝大多数读是内存操作，延迟低。
- 工作集大于内存：频繁发生 page fault，需要从磁盘读取，读延迟上升。

监控重点：`wiredTiger.cache` 下的 `bytes currently in the cache`、`pages read into cache`、`page faults` 等指标。若 page fault 持续偏高且缓存已放大不了，应考虑扩内存、优化索引或分片。

## 3. 索引命中

索引是 MongoDB 查询性能的第一杠杆。判断一次查询是否高效，用 `explain`：

```javascript
db.orders.find({ userId: 42, status: "PAID" }).explain("executionStats")
```

关键看两点：

- `winningPlan.stage` 是 **IXSCAN**（走索引）还是 **COLLSCAN**（全集合扫描）。出现 COLLSCAN 且返回大量文档，基本就是慢查询根因。
- `executionStats` 中 `totalDocsExamined` 与 `nReturned` 的比值。理想情况下二者接近；若检查的文档远多于返回的文档，说明索引选择性差或未覆盖查询。

覆盖查询（covered query）能进一步省掉回表：当查询字段与返回字段都在同一个索引中时，MongoDB 直接从索引返回，不读取文档。详见 [MongoDB 索引](./mongo-z-index.md)。

## 4. 写关注与读关注

一致性级别直接影响延迟与吞吐：

- **写关注 writeConcern**：`w:1` 表示主节点确认即返回，延迟最低；`w:"majority"` 表示多数副本确认，更安全但更慢；`j:true` 要求写入 journal 落盘，防宕机丢失。写多且可容忍少量丢失的场景可用 `w:1`，账务类场景应上 majority + journal。
- **读关注 readConcern**：`local`（默认，读本地最新）、`majority`（读多数已确认）、`linearizable`（线性一致）等，级别越高一致性越强、代价越大。

把一致性级别与业务容忍度对齐，往往比调硬件更有效。

## 5. 并发与锁

WiredTiger 采用**文档级并发控制**，并配合 MVCC（多版本并发控制），读操作不会被写阻塞，写与写之间只在同一文档上冲突。这与早期 MMAPv1 的库级锁有本质区别。

因此，MongoDB 中更常见的并发瓶颈不是“锁”，而是：

- 同一热点文档被大量并发更新（写冲突、版本竞争）。
- 长事务或大批量写导致 oplog 与缓存压力。

应对方式是拆分热点（如计数器分片、计数器文档拆分）与错峰写。

## 6. 数据模型设计

数据模型是性能的下限。核心取舍是**内嵌（embedding）还是引用（referencing）**：

| 场景 | 推荐 |
| --- | --- |
| 一对少、总是一起读 | 内嵌子文档 |
| 一对多、子数据量大或独立访问 | 引用（另建集合） |
| 数组会无界增长 | 避免内嵌无界数组，改用引用或“桶（bucket）”模式 |
| 读多写少、需要联合查询 | 适度反范式（冗余字段） |

要点：

- **避免无界数组**：文档不断变大不仅拉低读写，还可能触发文档搬迁。
- **用桶模式**处理时序/日志类数据：按时间或范围把多条记录聚合成一个文档，控制文档数量与大小。
- **适度反范式**减少 `$lookup`：把高频一起查询的字段冗余进来，用少量冗余换读取效率。

更多建模与架构内容可参考 [Mongo 架构](./mongo-y-arch.md) 与 [分片](./mongo-z-sharding.md)。

## 7. 排查方法

- **慢查询**：`db.setProfilingLevel(1, { slowms: 100 })` 开启慢查询分析器；再结合 `system.profile` 定位。
- **当前操作**：`db.currentOp()` 查看正在执行的操作，发现长耗时或阻塞操作。
- **执行计划**：`explain("executionStats")` 看扫描与返回量。
- **实时概览**：`mongostat` 看 op/s、连接、page fault；`mongotop` 看各集合读写耗时。
- **硬件与副本**：结合 `serverStatus`、副本集状态判断是否某节点落后拖慢读。

## 8. 一个排查实例

假设某服务高峰期出现“接口变慢、磁盘 IO 飙高”，可以按模型逐步验证：

1. **内存/工作集**：查 `serverStatus` 的 `wiredTiger.cache`，若 “pages read into cache” 与 page fault 随流量陡增，说明工作集已超出缓存，读落到了磁盘。
2. **索引**：抓取慢查询，用 `explain("executionStats")` 逐条确认；若出现 `COLLSCAN`，或 `totalDocsExamined` 远大于 `nReturned`，就是缺索引或索引选择性差。
3. **一致性级别**：确认写是否用了 `w:"majority"` + `j:true` 且磁盘慢，导致写等待拉长。
4. **数据模型**：检查是否存在不断增长的数组字段，或频繁读写的大文档，引发文档搬迁与缓存抖动。
5. **横向扩展**：若以上都正常但压力仍高，再考虑用分片把负载摊到多节点（见 [分片](./mongo-z-sharding.md)）。

四步下来，往往能把“看起来像内存问题”的现象，精准定位到“其实是某条查询没走索引”。这就是建立性能模型的用处：**让排查有章法，而不是碰运气**。

## 9. 小结

- MongoDB 性能模型由**工作集内存、索引命中、一致性级别、数据模型**四要素构成，排查时逐项对照。
- 工作集决定读是内存访问还是磁盘 IO，是扩容与分片的主要依据。
- 用 `explain` 区分 IXSCAN/COLLSCAN，关注检查文档数与返回数之比，尽量做覆盖查询。
- 写关注/读关注是把一致性与延迟做权衡的开关，应与业务容忍度对齐。
- 数据建模优先“内嵌少而稳定、引用大而独立”，杜绝无界数组，善用桶模式与适度反范式。

延伸阅读：[MongoDB 索引](./mongo-z-index.md)、[缓存机制](./mongo-y-cache.md)、[性能优化](./mongo-performance-improve.md)、[分片](./mongo-z-sharding.md)。
