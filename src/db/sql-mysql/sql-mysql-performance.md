---
date: 2022-05-30
category:
  - SQL MySQL
tag:
  - SQL MySQL
---
# MySQL - 性能优化 

> 性能优化不是「猜哪里慢」，而是「测量 → 定位 → 验证」的闭环。本文按「先定位慢查询、再读执行计划、然后改 SQL 与索引、最后调参数与架构」的顺序，给出可落地的方法与常见坑。

## 1. 优化的对象与顺序

优化前先想清楚瓶颈在哪一层：

| 层次 | 问题表现 | 手段 |
| --- | --- | --- |
| SQL 与索引 | 单条查询慢、扫描行数大 | 改写 SQL、补 / 调索引、覆盖索引 |
| 事务与锁 | 大量锁等待、死锁 | 缩短事务、控制锁粒度、调整隔离级别 |
| 实例参数 | 缓存不足、刷盘抖动 | Buffer Pool、连接数、刷盘策略 |
| 架构 | 单机到顶 | 读写分离、分库分表、缓存、归档 |

原则是：**能用索引解决的不改写 SQL，能改 SQL 的不加机器，能加机器的不大改架构。** 且每次只改一处，用数据验证效果。

## 2. 定位慢查询

**慢查询日志**是第一手线索：

```bash
# my.cnf
slow_query_log = ON
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 0.5
log_queries_not_using_indexes = ON
```

- `long_query_time` 界定「多慢算慢」，生产常用 0.5~1 秒，压测时可调到 0.1 秒以暴露问题。
- `log_queries_not_using_indexes` 记录未用索引的语句（注意会放大日志量）。

日志量大时用工具聚合统计（按总耗时、出现次数、平均耗时排序），再挑「耗时占比高 + 调用频繁」的语句优先优化——**优化 ROI 看的是总耗时，不是单条最慢**。也可用 `performance_schema` 或 `sys` 库实时观察。

## 3. 读懂 EXPLAIN

`EXPLAIN` 输出优化器选择的执行计划，重点看几列：

| 列 | 含义 | 关注点 |
| --- | --- | --- |
| `type` | 访问类型 | `system > const > eq_ref > ref > range > index > ALL`，越靠右越差，出现 `ALL` 多为全表扫描 |
| `key` | 实际使用的索引 | 为 `NULL` 表示没走索引 |
| `key_len` | 索引使用长度 | 判断联合索引用到了哪几列 |
| `rows` | 预估扫描行数 | 太大意味着效率低 |
| `filtered` | 过滤后剩余比例 | 配合 `rows` 估算真实行数 |
| `Extra` | 额外信息 | 见下 |

`Extra` 常见的几个值：

- `Using index`：**覆盖索引**，无需回表，好现象。
- `Using where`：存储引擎返回后 Server 层再过滤，索引未完全覆盖条件。
- `Using index condition`：触发了**索引下推（Index Condition Pushdown, ICP）**，把条件下推到引擎层过滤。
- `Using filesort`：无法用索引完成排序，需额外排序，数据量大时很慢。
- `Using temporary`：使用了临时表（常见于 `GROUP BY`、`DISTINCT`），要警惕。
- `Using join buffer`：被驱动表没有可用索引，用了连接缓冲，通常意味着该加索引。

MySQL 8.0.18+ 可用 `EXPLAIN ANALYZE` 真正执行语句并返回各算子实际耗时与行数，比只看预估更可靠。

## 4. 索引优化

- **联合索引最左前缀**：`INDEX(a, b, c)` 能被 `a`、`a,b`、`a,b,c` 使用，`WHERE b = ?` 用不上。设计时把**区分度高、且高频出现在等值条件**的列放前面。
- **覆盖索引**：查询列都在索引里，避免回表。`SELECT id, name FROM t WHERE name = ?` 配 `INDEX(name)` 即可覆盖（二级索引天然含主键）。
- **避免索引失效**：对索引列做函数、隐式类型转换、前导 `%` 的 `LIKE '%x'`、`OR` 连接非索引列等，都会让索引失效。
- **索引不是越多越好**：每个索引都增加写入成本与空间；定期清理无用索引。

```sql
-- 差：对索引列做函数，索引失效
SELECT * FROM orders WHERE DATE(create_time) = '2024-01-01';
-- 好：改成范围，走索引
SELECT * FROM orders
WHERE create_time >= '2024-01-01' AND create_time < '2024-01-02';
```

## 5. 重构查询

- **只取需要的列与行**：不用 `SELECT *`，用 `LIMIT` 限制返回。宽表 + 大量列会放大 I/O 与网络传输。
- **切分大查询**：一次删除 / 更新大量数据会长时间持锁、撑爆日志、阻塞其他查询，改成分批循环：

```sql
-- 一次删一批，直到删完，控制单次事务与锁范围
DELETE FROM messages WHERE create_time < '2024-01-01' LIMIT 10000;
```

- **深分页优化**：`LIMIT 1000000, 20` 会先扫过百万行再丢弃。用「延迟关联」或游标：

```sql
-- 延迟关联：先用覆盖索引取主键，再回表
SELECT t.* FROM orders t
JOIN (SELECT id FROM orders ORDER BY id LIMIT 1000000, 20) d ON t.id = d.id;
```

- **分解大连接**：把一个大 JOIN 拆成对每个表的单表查询，在应用层关联。好处是缓存更高效、减少锁竞争、便于后续分库分表；代价是网络往返增多。是否划算要实测。

## 6. 锁与并发

- InnoDB 的行锁**实际加在索引项上**：更新条件没走索引，会锁住大量行甚至接近全表。为更新 / 删除条件建好索引，是减少锁冲突最直接的手段。
- 可重复读下，范围更新会加**间隙锁 / 临键锁**，可能锁住不存在的行，导致插入阻塞。
- 死锁多因「加锁顺序不一致」。排查用：

```sql
SHOW ENGINE INNODB STATUS;   -- 查看 LATEST DETECTED DEADLOCK 段
```

  应用层对策：统一加锁顺序、缩短事务、控制单事务操作行数。InnoDB 检测到死锁会回滚代价较小的事务，应用需能重试。

## 7. 参数与架构层面

常用参数（需结合业务与硬件压测确定，切忌照搬）：

| 参数 | 作用 |
| --- | --- |
| `innodb_buffer_pool_size` | InnoDB 缓存大小，最关键的参数，专用库常设物理内存的 50%~75% |
| `innodb_flush_log_at_trx_commit` | 提交时 redo 刷盘策略，1 最安全、性能最低 |
| `sync_binlog` | binlog 刷盘策略，与上者共同决定持久性 |
| `max_connections` | 最大连接数，过高会拖垮实例，应配合连接池使用 |
| `innodb_io_capacity` | 后台刷脏能力，SSD 可适当调高 |

架构层面：读多写少用**读写分离**（见 [主从复制与读写分离](./sql-mysql-slave.md)），写压力大用**分库分表**（见 [分库分表](./sql-mysql-devide.md)），热点数据用**缓存**并注意缓存一致性。

## 8. 优化流程清单

1. 复现问题，拿到慢查询日志 / 监控指标，确认基准。
2. `EXPLAIN`（必要时 `EXPLAIN ANALYZE`）看执行计划，定位是扫描过多还是排序 / 临时表。
3. 优先补或调整索引（覆盖索引、联合索引），再考虑改 SQL。
4. 单条 SQL 仍慢则看锁等待、事务大小、并发度。
5. 实例层面调 Buffer Pool 等参数，观察命中率与刷盘。
6. 都到顶再动架构：读写分离、分库分表、缓存、归档冷数据。
7. 每次改动后回归压测，用数据说话。

## 9. 小结

- 优化是测量闭环：慢查询日志定位 → EXPLAIN 看计划 → 改索引 / SQL → 调参 → 动架构。
- `type` 越靠 `ALL` 越差；`Extra` 里的 `filesort`、`temporary`、`join buffer` 是重要信号。
- 索引优化三件事：最左前缀、覆盖索引、避免失效；且行锁实际锁的是索引项。
- 大查询切分、深分页用延迟关联、大连接可分解，但要实测收益。
- 参数调优基于压测；架构扩容是最后手段，不是第一反应。

## 延伸阅读

- [MySQL 知识体系](./sql-mysql-overview.md)
- [MySQL 索引与 B+ 树](./sql-mysql-b-tree.md)
- [MySQL 存储引擎](./sql-mysql-engine.md)
- [大厂实践：MySQL 索引原理及慢查询优化](./sql-mysql-index-improve-mt.md)
