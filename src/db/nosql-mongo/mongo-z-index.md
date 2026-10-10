---
date: 2026-10-11
title: MongoDB 索引
category: [数据库]
tag: [MongoDB]
---

# MongoDB 索引

> MongoDB 的索引基于 B-tree（默认 `_id` 索引即 B-tree），用来把查询从“全集合扫描”变成“按索引定位”。理解索引类型、复合索引的**最左前缀**规则、**覆盖查询**以及索引带来的写放大，是 MongoDB 调优的核心功课。

## 1. 为什么要索引

没有索引时，一次条件查询要扫描集合中的每个文档（COLLSCAN），复杂度随数据量线性上升；有序的 B-tree 索引可以把定位成本降到对数级。索引的代价是：**每个索引都会增加写操作的开销，并占用额外存储**——所以“写多读少”的集合不应盲目堆索引。

## 2. 索引类型

| 类型 | 说明 | 示例 |
| --- | --- | --- |
| 单字段索引 | 最常见，按一个字段排序 | `{ "age": 1 }` |
| 复合索引 | 多字段组合，字段顺序有意义 | `{ "userId": 1, "status": -1 }` |
| 多键索引（Multikey） | 对数组字段建立，为数组每个元素建索引项 | `{ "tags": 1 }` |
| 文本索引 | 支持 `$text` 全文检索 | `{ "content": "text" }` |
| 哈希索引 | 用于哈希分片，仅支持相等匹配 | `{ "userKey": "hashed" }` |
| TTL 索引 | 到期自动删除文档 | `{ "expireAt": 1 }, { expireAfterSeconds: 3600 }` |
| 唯一索引 | 保证字段唯一 | `{ "email": 1 }, { unique: true }` |
| 部分索引（Partial） | 只索引满足条件的子集，省空间 | `{ createdAt: 1 }, { partialFilterExpression: { status: "ACTIVE" } }` |
| 稀疏索引（Sparse） | 只索引存在该字段的文档 | `{ phone: 1 }, { sparse: true }` |
| 地理空间索引 | `2dsphere`/`2d` 支持位置查询 | `{ location: "2dsphere" }` |

方向（`1` 升序 / `-1` 降序）在单字段索引中不影响等值查询，但在复合索引与排序中会影响能否命中。

## 3. 复合索引与最左前缀

复合索引的字段顺序决定了它能服务哪些查询。`{ a: 1, b: 1, c: 1 }` 可以支持：

- 按 `a` 查询
- 按 `a, b` 查询
- 按 `a, b, c` 查询

但**不能**高效支持只按 `b` 或只按 `c` 的查询——这就是“最左前缀”原则。设计复合索引时遵循经验排序：**等值（Equality）字段在前，排序（Sort）字段居中，范围（Range）字段在后**，简称 ESR（Equality-Sort-Range）。

```javascript
// 常见查询：按 userId 等值、按 createdAt 降序、按 amount 范围
db.orders.createIndex({ userId: 1, createdAt: -1, amount: 1 });
```

## 4. 覆盖查询（Covered Query）

当查询的**过滤字段与返回字段都包含在同一个索引中**，MongoDB 可以只读索引、不读文档本身（`explain` 中 `totalDocsExamined` 为 0），这就是覆盖查询，能显著减少 IO。

```javascript
db.users.createIndex({ name: 1, age: 1 });

// 只投影索引内的字段，且不返回 _id
db.users.find({ name: "Tom" }, { name: 1, age: 1, _id: 0 });
```

要命中覆盖查询，注意：查询字段与投影字段都要在索引里；若不显式排除，默认返回的 `_id` 不在投影中可能导致回表。

## 5. 用 explain 判断索引好坏

```javascript
db.orders.find({ userId: 42 }).explain("executionStats")
```

关注：

- `winningPlan.stage`：**IXSCAN** 表示走索引，**COLLSCAN** 表示全扫。
- `totalKeysExamined`（扫描的索引键数）与 `totalDocsExamined`（扫描的文档数）应尽量接近 `nReturned`（返回文档数）。二者远大于返回量，说明索引选择性不足。
- `executionTimeMillis`：实际执行耗时。

MongoDB 的查询优化器会在候选计划间竞争（plan cache），选出成本最低者执行。

## 6. 索引的写放大概与开销

- 每个索引都要在插入、更新、删除时同步维护，索引越多写越慢。
- 使用 `db.collection.stats()` 或 `$indexStats` 查看索引使用情况，**长期未被使用的索引应删除**。
- 对已有大集合建索引会消耗资源，可在业务低峰期进行（副本集环境下，索引构建会在各节点依次完成）。

```javascript
// 查看索引使用统计
db.orders.aggregate([{ $indexStats: {} }]);
```

## 7. 实践要点与坑

- **注意 `$or`**：`$or` 中每个分支都可能各自走索引，再用索引合并（index intersection），有时不如合并条件为 `$in`。
- **排序方向要与索引一致**：复合索引排序方向的组合要匹配 `sort`，否则可能退化为内存排序（`SORT` 阶段）。
- **多键索引限制**：一个复合索引中最多只能有一个数组字段参与“多键”。
- **索引选择性**：低基数字段（如布尔值、性别）单独建索引收益有限，更适合放进复合索引做前缀过滤。
- **不要重复建索引**：`{ a: 1 }` 与 `{ a: 1, b: 1 }` 是不同索引，但前者常能被后者覆盖，避免冗余。

## 8. 分页与大偏移查询

用 `skip + limit` 分页时，`skip` 越大，MongoDB 就要先“走过”越多文档，性能随页码线性下降。例如 `db.c.find().sort({_id:1}).skip(100000).limit(10)` 会先扫描前 10 万条再丢弃。

应对思路：

- **基于游标续读**：记住上一页最后一条记录的排序键，下一页用范围条件（如 `_id > lastId`）继续，彻底避开 `skip`。
- **保证排序键有索引**：`sort` 字段若无索引，MongoDB 需在内存中排序，大结果集可能触及内存上限而报错。

## 9. hint 与索引选择

当查询优化器选错索引时，可用 `hint()` 强制指定：

```javascript
db.orders.find({ userId: 42 }).hint({ userId: 1 });   // 指定索引
db.orders.find({ userId: 42 }).hint({ $natural: 1 }); // 强制全表扫描做对比
```

反过来，如果某个 `hint` 长期优于自动选择，说明统计信息或索引设计需要复查。生产环境慎用 `hint`：它绕过了优化器的自适应能力，容易在数据分布变化后变成“负优化”。

## 10. 常用索引命令速查

```javascript
db.users.createIndex({ email: 1 }, { unique: true });                  // 唯一索引
db.users.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });  // TTL 索引
db.users.createIndex({ tags: 1 });                                     // 多键索引
db.users.createIndex({ name: 1, age: 1 }, { background: true });       // 复合索引（后台构建）
db.users.getIndexes();                                                 // 查看索引
db.users.dropIndex("name_1_age_1");                                    // 删除索引
db.users.find({ name: "Tom" }).explain("executionStats");              // 看执行计划
```

建复合索引时字段顺序遵循 ESR；用 `getIndexes()` 与 `$indexStats` 定期清理不再使用的索引，避免无谓的写放大。

## 11. 索引与写入性能的权衡

索引不是越多越好。每增加一个索引，插入、更新、删除时都要同步维护它，写入吞吐随索引数量下降；索引本身也占用内存与磁盘。实践中应：

- 只对**确实被高频查询**的字段建索引，用 `$indexStats` 的 `accesses.ops` 判断哪些索引长期零命中。
- 优先用少量**复合索引**覆盖多种查询，减少单字段索引的堆叠。
- 对写多读少的集合克制建索引；对归档型数据可用部分索引只覆盖活跃子集。
- 大集合建索引放到低峰期，必要时先在从节点建好再切主。

::: tip 一句话原则
读多按查询模式精建索引，写多克制建索引；建完务必用 `explain` 与 `$indexStats` 验证，长期零命中的索引及时删除。
:::

## 12. 小结

- 索引把 COLLSCAN 变成 IXSCAN，是查询性能的第一杠杆，但会带来写放大与存储成本。
- 复合索引遵循最左前缀与 ESR 排序：等值在前、排序居中、范围在后。
- 覆盖查询只读索引不读文档，能显著降低 IO，注意投影字段与 `_id`。
- 用 `explain("executionStats")` 判断索引质量，用 `$indexStats` 清理无用索引。
- 写多场景克制建索引，读多场景按查询模式精建索引。

延伸阅读：[MongoDB 性能与数据模型](./mongo-performance-model.md)、[分页查询设计](./mongo-y-page.md)。
