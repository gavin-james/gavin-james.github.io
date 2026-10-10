---
date: 2022-07-19
category:
  - NoSQL MongoDB
tag:
  - NoSQL MongoDB
---
# Mongo进阶 - DB核心：备份恢复

> 备份是数据库运维的底线能力。MongoDB 提供了多种备份手段：`mongodump`/`mongorestore`（BSON 逻辑备份）、`mongoexport`/`mongoimport`（JSON/CSV 导入导出）、文件系统快照，以及基于 **oplog** 的时间点恢复。选哪种，取决于对**一致性、跨版本兼容性、恢复粒度**的要求。

## 1. 备份方式概览

| 方式 | 产物 | 优点 | 局限 |
| --- | --- | --- | --- |
| `mongodump` / `mongorestore` | BSON | 保留数据类型与索引，可结合 oplog 做一致备份 | 大库较慢，跨主版本可能不兼容 |
| `mongoexport` / `mongoimport` | JSON / CSV | 人类可读、跨版本通用、便于数据交换 | 只保留数据，**不含索引、用户等元信息** |
| 文件系统/磁盘快照 | 数据文件 | 快、适合大库 | 需停机或依赖存储卷快照能力，跨版本同样受限 |
| oplog 增量 + 全量 | BSON + oplog | 支持**时间点恢复（PITR）** | 需要副本集环境与额外流程 |

一句话区分：**BSON 用于数据库级备份恢复，JSON 用于数据级导入导出**。

## 2. mongodump / mongorestore（BSON）

`mongodump` 把集合导出为 BSON 文件，并记录索引等元数据。

```bash
# 导出整个实例到 /backup
mongodump --host 127.0.0.1:27017 --out /backup --gzip

# 只导出某个库/集合
mongodump --db appdb --collection orders --out /backup --gzip

# 导出为单个归档文件
mongodump --archive=/backup/appdb.archive --gzip
```

恢复：

```bash
mongorestore --host 127.0.0.1:27017 --gzip /backup          # 恢复整目录
mongorestore --archive=/backup/appdb.archive --gzip         # 从归档恢复
mongorestore --drop /backup/appdb                           # 恢复前先删除同名集合
```

要点：

- `--gzip` 压缩可显著减小体积；`--archive` 便于单文件传输。
- 跨大版本迁移前，先确认两个版本的 BSON 兼容性；不兼容时改用 JSON 通道。
- `mongorestore` 默认**不覆盖**已存在的数据，需要覆盖要显式加 `--drop`。

## 3. mongoexport / mongoimport（JSON）

适合把数据导出给其他系统，或做跨版本/跨引擎迁移。

```bash
# 导出为 JSON（每行一个文档）
mongoexport --db appdb --collection orders --out /backup/orders.json

# 导出为 CSV，需指定字段
mongoexport --db appdb --collection orders \
  --type=csv --fields=orderId,userId,amount --out /backup/orders.csv

# 导入 JSON
mongoimport --db appdb --collection orders --file /backup/orders.json

# 导入 CSV
mongoimport --db appdb --collection orders --type=csv \
  --fields=orderId,userId,amount --file /backup/orders.csv
```

::: warning 注意
`mongoexport`/`mongoimport` **只保留数据**，不保留索引、用户、角色、集合选项等元信息。恢复后需要手工重建索引与权限。JSON 的可读性换来了较大的体积，且类型信息可能不如 BSON 精确。
:::

## 4. oplog 与时间点恢复

副本集的主节点会把所有写操作记录到 **oplog（操作日志）** 中。备份时带上 oplog，就能把备份恢复到一个一致的时间点：

```bash
# 备份时同时捕获 oplog，保证备份期间写入也被记录
mongodump --host rs0/127.0.0.1:27017 --oplog --out /backup

# 恢复时应用 oplog，完成时间点恢复
mongorestore --host rs0/127.0.0.1:27017 --oplogReplay /backup
```

思路是：**先恢复全量快照，再回放快照之后到目标时间点的 oplog**，把数据库推进到某个精确时刻（如“误删前一秒”）。这也是生产环境最常强调的恢复能力。oplog 细节参见 [副本集](./mongo-z-rep.md)。

## 5. 一致性备份

要得到一致性的备份，常用两种方式：

1. **副本集 + 从节点备份**：在从节点上执行 `mongodump`，避免影响主节点性能；结合 `--oplog` 保证一致性。
2. **文件快照**：对数据目录或底层卷做快照，需保证快照写入的一致性（如借助存储层能力）。备份前可用 `db.fsyncLock()` 暂停写入、备份后 `db.fsyncUnlock()` 解锁——但会阻塞写，务必在维护窗口操作。

## 6. 恢复流程与演练

一次可靠的恢复流程：

1. 明确目标：恢复到哪个库/集合/时间点。
2. 准备环境：恢复目标实例或新建实例，确认版本兼容。
3. 全量恢复：`mongorestore` 恢复 BSON。
4. 增量回放：应用 oplog 到目标时间点（如需要）。
5. 校验：核对集合数量、关键文档数、索引是否齐全、抽样数据是否正确。
6. 应用权限与索引：补齐用户、角色、索引。

::: tip 备份不是备份，恢复成功才是
备份要定期做**恢复演练**：只有真正恢复成功过一次，才能说明备份是有效的。同时监控备份任务是否成功、备份文件是否可读。
:::

## 7. 实践要点与坑

- **区分备份目的**：数据库级灾备用 BSON/快照；数据交换用 JSON。
- **注意版本兼容**：跨主版本恢复优先验证，必要时走 JSON。
- **别忘元信息**：用 JSON 通道恢复后，索引、用户、集合选项都要手工补回。
- **控制备份影响**：大库备份尽量放到从节点或低峰期，避免抢占主节点资源。
- **保留多份与异地**：备份文件本身也要防误删，建议保留多版本并异地存放。
- **分片集群**：分片环境的备份要通过 `mongos` 操作，并确保各分片快照时间大致一致。参见 [分片](./mongo-z-sharding.md)。

## 8. 云环境与分片集群备份

云托管的 MongoDB 通常提供**自动快照 + 时间点恢复**能力，日常无需自己写 `mongodump` 脚本，但仍要关注备份保留时长、快照频率、跨区域副本，以及定期恢复演练。

自建**分片集群**时要注意：

- 备份通过 `mongos` 或对各分片分别进行；必须保证各分片的备份**时间点尽量一致**，否则恢复后会出现跨分片数据不一致。
- 分片集群的配置元数据（config 服务器）也要一并备份，否则无法还原分片拓扑。
- 大分片建议先停写入（或借助副本集的从节点）再做快照，降低不一致风险。参见 [分片集群](./mongo-z-sharding.md)。

## 9. 常见问题排查

- **`mongorestore` 报 BSON 版本不兼容**：多发生在跨主版本迁移，改用 `mongoexport`/`mongoimport` 的 JSON 通道。
- **恢复后索引丢失**：JSON 通道不保留索引，需要手工重建；BSON 通道可从 `mongodump` 的元数据恢复。
- **备份耗时长、影响业务**：把备份任务放到从节点或业务低峰期，必要时限速。
- **oplog 太小导致回放不足**：备份期间写入量若超过 oplog 容量，旧记录会被覆盖，时间点恢复会失败；应适当调大 oplog 或缩短备份窗口。
- **恢复后缺少账户/角色**：用 `--drop` 恢复前确认权限体系已同步，避免恢复后无法登录。

## 10. 备份策略建议

- **遵循 3-2-1 原则**：至少保留 3 份副本、存于 2 种介质、其中 1 份异地存放。
- **明确频率与保留**：按数据的 RPO 确定备份频率，并规定保留时长与过期清理策略。
- **权限最小化**：备份账号只需备份所需权限，避免使用超级用户。
- **自动化与告警**：脚本化备份并监控执行结果，失败立即告警。

## 11. 小结

- MongoDB 备份分 BSON（`mongodump`/`mongorestore`）与 JSON（`mongoexport`/`mongoimport`）两条主线：前者保元信息、适合数据库级恢复，后者只保数据、胜在跨版本通用与可读。
- 借助 oplog 可实现时间点恢复，先恢复全量再回放 oplog。
- 一致性可通过“从节点备份 + `--oplog`”或文件快照获得。
- 备份的价值由“能否成功恢复”定义，务必定期演练并校验。

延伸阅读：[副本集](./mongo-z-rep.md)、[分片集群](./mongo-z-sharding.md)、[事务](./mongo-y-trans.md)。
