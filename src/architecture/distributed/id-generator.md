---
title: 分布式 ID 生成
category: [架构]
tag: [分布式, 分布式ID]
---

# 分布式 ID 生成

> 数据分库分表后，单库自增主键不再全局唯一。分布式 ID 要在一组机器上，生成**全局唯一、尽量趋势递增、高性能、高可用**的编号。

## 1. 到底需要什么样的 ID

先明确需求，再谈方案。一个「合格」的分布式 ID 通常要满足：

| 要求 | 说明 | 是否必需 |
|------|------|----------|
| 全局唯一 | 跨库、跨表、跨服务都不重复 | 必需 |
| 趋势递增 | 新 ID 大体大于旧 ID，利于 B+ 树索引插入，避免页分裂 | 重要 |
| 高性能 | 单机每秒生成成千上万个，不成为瓶颈 | 重要 |
| 高可用 | 发号服务不能是单点 | 重要 |
| 信息安全 | 不可被轻易猜测、推断业务量 | 视场景 |
| 语义信息 | 含时间、机器等，便于排查 | 加分项 |

一个常见的误区：**「唯一」和「递增」是两种不同强度的要求**。只要能唯一、不要求趋势递增，方案会简单很多。

## 2. 主流方案对比

| 方案 | 唯一性 | 有序性 | 性能 | 依赖 | 适用 |
|------|--------|--------|------|------|------|
| UUID | 强（概率唯一） | 无序 | 极高（本地） | 无 | 日志追踪、请求 ID |
| 数据库自增 | 强 | 递增 | 低（单点） | 数据库 | 小规模、单库 |
| 数据库号段 | 强 | 递增 | 高 | 数据库 | 订单、通用主键 |
| Redis INCR | 强 | 递增 | 高 | Redis | 并发不大、已有 Redis |
| 雪花算法 | 强 | 趋势递增 | 极高（本地） | 机器号分配 | 高并发主键 |
| 号段 + 雪花（Leaf） | 强 | 趋势递增 | 极高 | 数据库 + 机器号 | 生产推荐 |

## 3. 逐一说清

### 3.1 UUID

```java
// 标准 UUID v4，随机生成
String id = UUID.randomUUID().toString(); // 550e8400-e29b-41d4-a716-446655440000
```

- **优点**：本地生成、无网络开销、绝不重复（理论上）。
- **缺点**：128 位、字符串形式长；**完全无序**，作为 MySQL 主键会频繁造成页分裂与索引碎片；不含时间语义，无法排序。

> 结论：适合做**请求 ID、日志链路 ID**，不适合做数据库主键。若既要唯一又要有序，可用 **ULID** 或 **UUID v7**——它们把时间戳放在高位，生成即有序。

### 3.2 数据库自增

用一个独立表 `SEQUENCE`，靠 `AUTO_INCREMENT` 或 `UPDATE ... SET value = value + step` 发号。

```sql
-- 每次取 N 个号：把步长设为 N，一次更新前进 N
UPDATE id_generator SET value = value + 1000 WHERE biz_tag = 'order';
-- 再 SELECT 拿回新的 value，内存中依次发放 value-999 .. value
```

- 单库自增是**单点**，性能上限低，扩展要靠设置不同起始值/步长（`auto_increment_offset` / `auto_increment_increment`）分号段，但扩容时要改配置，麻烦。

### 3.3 数据库号段（Segment）

这是数据库方案的正确打开方式，也是美团 Leaf、滴滴 Tinyid 的核心思想：

1. 应用向数据库**一次申请一整段**号（例如 1~1000），缓存到内存；
2. 内存中顺序发放，发完再申请下一段；
3. 数据库只需承担「每 1000 次一写」的压力，吞吐大幅提升。

```text
申请：UPDATE id_generator SET max_id = max_id + step WHERE biz_tag = 'order';
      SELECT max_id FROM id_generator WHERE biz_tag = 'order';
发放：内存中 [max_id - step + 1, max_id] 顺序使用
```

工程上还要做**双 Buffer**：当前号段用到 10% 时就异步预取下一段，避免「切换瞬间的请求卡住」。号段方案的缺点是：**服务重启会浪费一段号**（内存里没用完的号丢弃），且强依赖数据库可用。

### 3.4 Redis INCR

```bash
SET order:id 0
INCR order:id          # 每次自增 1，原子
INCRBY order:id 1000   # 批量取号
```

- **优点**：单机 Redis 每秒可发十万级，实现极简。
- **缺点**：强依赖 Redis 高可用；默认异步复制下主从切换**可能丢号（产生空洞）或回退（理论重复）**；如果要求绝对连续，需配合持久化或 RedLock 式方案，成本上升。

> 注意：Redis 发号**必须容忍跳号**。业务上「订单号连续」通常不是硬需求，别为了连续性付出高成本。

### 3.5 雪花算法（Snowflake）

Twitter 提出的经典方案，用一个 64 位 long 表达全局唯一且趋势递增的 ID：

| 位段 | 位数 | 含义 |
|------|------|------|
| 符号位 | 1 | 恒为 0（保证正数） |
| 时间戳 | 41 | 毫秒级时间戳 - 起始纪元，可用约 69 年 |
| 机房 + 机器 | 10 | 5 位机房 ID + 5 位工作机器 ID（或细分），最多 1024 台 |
| 序列号 | 12 | 同一毫秒内的自增序号，单机每毫秒最多 4096 个 |

```java
public class SnowflakeIdGenerator {
    private static final long EPOCH = 1672531200000L; // 自定义起始时间
    private static final long WORKER_BITS = 10L;
    private static final long SEQUENCE_BITS = 12L;
    private static final long MAX_WORKER_ID = ~(-1L << WORKER_BITS);   // 1023
    private static final long MAX_SEQUENCE = ~(-1L << SEQUENCE_BITS);  // 4095
    private static final long WORKER_SHIFT = SEQUENCE_BITS;
    private static final long TIMESTAMP_SHIFT = SEQUENCE_BITS + WORKER_BITS;

    private final long workerId;
    private long lastTimestamp = -1L;
    private long sequence = 0L;

    public SnowflakeIdGenerator(long workerId) {
        if (workerId < 0 || workerId > MAX_WORKER_ID) {
            throw new IllegalArgumentException("workerId 超出范围: " + workerId);
        }
        this.workerId = workerId;
    }

    public synchronized long nextId() {
        long timestamp = System.currentTimeMillis();
        if (timestamp < lastTimestamp) {
            // 时钟回拨处理：见下节
            throw new IllegalStateException("时钟回拨 " + (lastTimestamp - timestamp) + "ms");
        }
        if (timestamp == lastTimestamp) {
            sequence = (sequence + 1) & MAX_SEQUENCE;
            if (sequence == 0) {
                // 当前毫秒序列用尽，等到下一毫秒
                while ((timestamp = System.currentTimeMillis()) <= lastTimestamp) {
                    // 自旋等待
                }
            }
        } else {
            sequence = 0L;
        }
        lastTimestamp = timestamp;
        return ((timestamp - EPOCH) << TIMESTAMP_SHIFT)
                | (workerId << WORKER_SHIFT)
                | sequence;
    }
}
```

- **优点**：本地生成、无网络 IO，单机每秒可达数十万；整体趋势递增，索引友好。
- **痛点一：时钟回拨**。服务器 NTP 校时会让时钟后退，此时可能生成重复 ID。处理策略见下节。
- **痛点二：机器号分配**。1024 个 workerId 要保证不冲突，需要借助 ZooKeeper/etcd 或数据库注册，或由 K8s StatefulSet 序号推导。

### 3.6 时钟回拨怎么处理

| 策略 | 做法 | 取舍 |
|------|------|------|
| 抛异常 | 回拨则拒绝发号，由上层重试 | 简单，但会短暂不可用 |
| 等待追平 | 回拨小于阈值（如 5ms）时自旋等待时钟追上 | 影响小延迟 |
| 改用备用位 | 回拨期间借用机器号高位当序列位 | 需预留位，复杂度上升 |
| 直接切换 | 回拨过大则告警并切到备用发号器 | 需额外组件 |

生产实践：**优先做好 NTP 同步并配置平滑校时**，再叠加「小回拨等待 + 大回拨告警」的兜底。

## 4. 选型建议

- **订单号 / 交易号**：号段或雪花 + 业务前缀，如 `20260315` + 号段。
- **只需唯一、不要有序**：UUID v7 / ULID。
- **已有 Redis 且并发不高**：Redis INCR，注意接受跳号。
- **超大规模、强趋势递增**：雪花算法或美团 Leaf（号段 + 雪花双模式），配合机器号自动注册。
- **要求连续无空洞**：几乎无解的强需求，应说服业务放弃「连续」，否则只能用单点数据库。

## 5. 常见坑

1. **把 UUID 当主键**：导致 MySQL 索引性能劣化，写入变慢。
2. **Redis 少号段导致频繁冲库**：号段太小，DB 压力没降下来；太大则重启浪费多。步长要结合 QPS 估算。
3. **雪花机器号硬编码**：多实例部署时冲突，产生重复 ID。一定要动态分配或从环境推导。
4. **忽视时钟回拨**：NTP 一抖就产生重复主键，插入失败。
5. **用自增 ID 暴露业务量**：对外接口应使用无规律的业务号，而非纯自增。

## 6. 小结

- 先分清「唯一」与「有序」两种强度，再选方案。
- 本地生成（UUID、雪花）性能最好；号段用 DB 换吞吐；Redis 简单但需容忍跳号。
- 雪花算法的两个坑是**时钟回拨**与**机器号分配**，必须有明确处理策略。
- 生产推荐「号段 + 雪花」组合（如 Leaf），兼顾性能、趋势递增与容错。
