---
title: 分布式锁
category: [架构]
tag: [分布式, 分布式锁]
---

# 分布式锁

> 单机的 `synchronized` / `ReentrantLock` 只管住一个 JVM。当同一段临界逻辑跑在多个实例上（定时任务防重、库存扣减兜底、唯一资源初始化），就需要一把**跨进程的分布式锁**。

## 1. 什么时候真的需要

先泼一盆冷水：**能用更简单方案解决的，就不要上分布式锁。**

| 场景 | 是否有更简方案 |
|------|---------------|
| 订单防重复创建 | 有：数据库唯一索引 + 幂等，胜过加锁 |
| 库存扣减 | 有：`UPDATE stock = stock - 1 WHERE stock >= 1` 原子扣减 |
| 定时任务多实例防重 | 视情况：可走「抢占式」锁或选主 |
| 唯一资源初始化（建表、刷缓存） | 分布式锁合适 |
| 复杂临界区（跨多步有副作用） | 分布式锁合适，但要配幂等 |

分布式锁的定位是**降低并发冲突**，而不是**保证业务正确性**。真正的正确性要靠**幂等 + 唯一约束**兜底——锁失效（过期、续期失败）时，业务不能因此出错。

## 2. 合格的分布式锁必须满足什么

1. **互斥**：任意时刻只有一个持有者。
2. **可释放**：持锁者崩溃或超时后，锁能自动释放，避免死锁。
3. **防误删**：A 的锁不能被 B 释放掉。
4. **高可用**：锁服务本身不能是单点。
5. **可重入**（视需求）：同一线程可重复获取。

## 3. 基于 Redis 实现

### 3.1 最简形态：SET NX EX

```bash
SET lock:order <唯一值> NX PX 30000
```

- `NX`：key 不存在才设置，保证互斥。
- `PX 30000`：30 秒自动过期，防止持锁者崩溃后死锁。
- `<唯一值>`（如 UUID）：标记锁的归属，释放时用它校验。

**释放必须原子**，否则会出现「校验通过后、删除前锁刚好过期、又误删了别人的锁」的竞态：

```lua
-- release.lua：先比对 value，再删除，整个过程原子执行
if redis.call('get', KEYS[1]) == ARGV[1] then
    return redis.call('del', KEYS[1])
else
    return 0
end
```

```java
// 获取锁
String token = UUID.randomUUID().toString();
Boolean locked = redis.opsForValue().setIfAbsent("lock:order", token, 30, TimeUnit.SECONDS);

// 释放锁（Lua 保证原子）
String script = "if redis.call('get', KEYS[1]) == ARGV[1] then " +
                "return redis.call('del', KEYS[1]) else return 0 end";
redis.execute(new DefaultRedisScript<>(script, Long.class),
              Collections.singletonList("lock:order"), token);
```

### 3.2 手动实现的三个坑

1. **过期时间难定**：太短，业务没跑完锁就失效；太长，崩溃后长时间锁死。
2. **非重入**：同一线程第二次获取会失败。
3. **续期缺失**：长任务需要「看门狗」定期续租。

### 3.3 Redisson：生产首选

Redisson 在 Redis 之上封装了完整的锁语义，用起来几乎像本地锁：

```java
@Autowired
private RedissonClient redissonClient;

public void doBusiness() {
    RLock lock = redissonClient.getLock("lock:order:" + orderId);
    // tryLock(waitTime, leaseTime, unit)：
    // waitTime 最长等待获取锁的时间；leaseTime 锁自动释放时间
    boolean locked = false;
    try {
        // 传 -1 表示启用看门狗自动续期
        locked = lock.tryLock(3, 30, TimeUnit.SECONDS);
        if (!locked) {
            throw new IllegalStateException("获取锁失败，稍后重试");
        }
        // ... 临界区业务
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    } finally {
        // 必须判断是否由当前线程持有，避免误释放
        if (locked && lock.isHeldByCurrentThread()) {
            lock.unlock();
        }
    }
}
```

Redisson 的**看门狗（watchdog）**机制：当 `leaseTime` 未显式指定（默认锁为 30 秒，由 `lockWatchdogTimeout` 配置，默认 30000ms）时，后台线程会**每隔锁时间的三分之一（约 10 秒）检查并续期**，直到业务主动 `unlock()`。这样既避免业务没跑完锁就到期，也避免崩溃后长时间锁死。

其他实用特性：

- **可重入**：基于 Redis Hash 记录持有者与重入次数。
- **RedLock**：向多个独立 Redis 节点加锁，多数成功才算加锁成功，用于降低单点风险。但其正确性在学界有争议（依赖时钟假设），**不要把它当银弹**。

### 3.4 集群下的主从丢锁问题

Redis 默认**异步复制**：主库写入锁后尚未同步到从库就宕机，从库升主，新主上这把锁不存在——**两个客户端可能同时持锁**。

缓解手段：
- 用**多节点 RedLock**（成本与争议并存）；
- 或改用下面基于共识的 ZooKeeper/etcd。

## 4. 基于 ZooKeeper 实现

ZooKeeper 天然适合做「强一致协调」，锁的实现思路是利用**临时顺序节点**：

1. 所有客户端在 `/lock` 下创建**临时顺序节点**，如 `/lock/lock-0000000001`；
2. 每个客户端取回 `/lock` 的子节点列表，若**自己的序号最小**，则获得锁；
3. 否则**监听前一个节点**（watch），它被删除时自己被唤醒；
4. 释放锁 = 删除自己的临时节点；**会话断开时临时节点自动删除**，天然避免死锁。

用 Curator 一行搞定：

```java
CuratorFramework client = CuratorFrameworkFactory.newClient(
        "zk1:2181,zk2:2181", new ExponentialBackoffRetry(1000, 3));
client.start();

InterProcessMutex lock = new InterProcessMutex(client, "/lock/order");
if (lock.acquire(3, TimeUnit.SECONDS)) {
    try {
        // ... 临界区业务
    } finally {
        lock.release();
    }
}
```

**优点**：强一致（ZAB 协议），会话断开自动释放，等待机制基于 watch 不会空转。
**缺点**：ZooKeeper 本身较重，写请求走共识，性能与吞吐低于 Redis；节点数多时可能出现「羊群效应」，监听链设计要正确。

## 5. 基于数据库实现

### 5.1 唯一索引（最简单）

```sql
CREATE TABLE distributed_lock (
    lock_name   VARCHAR(64) PRIMARY KEY,
    owner       VARCHAR(64),
    expire_time DATETIME
);
```

- **加锁**：`INSERT INTO distributed_lock(lock_name, owner, expire_time) VALUES (...)`，主键冲突则失败。
- **解锁**：`DELETE FROM distributed_lock WHERE lock_name = ? AND owner = ?`。
- **防死锁**：额外用定时任务清理 `expire_time < now()` 的记录。

缺点是**对数据库依赖重**：锁的竞争都打到 DB，性能差，不适合高并发。

### 5.2 乐观锁（版本号）

```sql
UPDATE account
   SET balance = balance - 100, version = version + 1
 WHERE id = 1001 AND version = 5;
-- 影响行数为 0 说明版本已被他人修改，需重试或失败
```

适合**冲突少**的场景，本质是「用版本号做无锁并发控制」，不是严格的锁，但常作为轻量替代。

### 5.3 悲观锁（SELECT ... FOR UPDATE）

```sql
BEGIN;
SELECT * FROM stock WHERE sku = 'A001' FOR UPDATE; -- 行锁，事务提交前其他事务阻塞
UPDATE stock SET qty = qty - 1 WHERE sku = 'A001';
COMMIT;
```

依赖数据库行锁，**事务必须尽快提交**，否则锁等待会拖垮连接池；容易出现死锁（多行加锁顺序不一致）。

## 6. 三种方案对比

| 维度 | Redis | ZooKeeper | 数据库 |
|------|-------|-----------|--------|
| 一致性 | 主从异步，可能丢锁 | 强一致（共识） | 依赖 DB 事务 |
| 性能 | 最高 | 中 | 低 |
| 自动释放 | 到期释放 | 会话断开即释放 | 需额外清理 |
| 可重入 | Redisson 支持 | Curator 支持 | 需自行实现 |
| 复杂度 | 低（有现成库） | 中 | 低 |
| 适用 | 高频、可容忍极小概率失效 | 强一致协调、低频但敏感 | 低并发、不想引入新组件 |

::: tip 选型口诀
**要性能选 Redis（配 Redisson），要强一致选 ZooKeeper/etcd，能不选就不选（用唯一约束/幂等替代）。**
:::

## 7. 常见坑

1. **锁粒度太大**：锁住整个订单表，所有请求串行，吞吐暴跌。锁要细到「资源 ID」。
2. **无过期时间**：持锁者崩溃导致永久死锁。
3. **业务不幂等**：锁已失效却仍重复执行，说明正确性没兜住。锁是优化，幂等才是底线。
4. **把锁当分布式事务**：锁只能互斥，不能保证跨多个库的原子提交。跨库原子性属 [分布式事务](./distributed-transaction.md) 的范畴。
5. **释放不校验归属**：不判断 owner 就删锁，可能删掉别人的锁。
6. **锁续期与业务耗时脱节**：没有看门狗，长任务必然出现锁提前过期。

## 8. 小结

- 分布式锁是「降低冲突」的手段，正确性要靠**幂等 + 唯一约束**兜底。
- Redis 方案（`SET NX PX` + Lua 释放 + Redisson 看门狗）性能最好，注意主从丢锁。
- ZooKeeper 用临时顺序节点实现，强一致、会话断开自动释放，代价是性能与运维成本。
- 数据库方案最简单，靠唯一索引/乐观锁/悲观锁，适合低并发场景。
- 锁的粒度要细、要有过期、要校验归属、要配合幂等。
