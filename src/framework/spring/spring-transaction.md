---
title: Spring 事务管理
category: [框架]
tag: [Spring, 事务]
---

# Spring 事务管理

> Spring 的事务管理把 JDBC/ORM 的「开启、提交、回滚、释放连接」封装成声明式能力：一个 `@Transactional` 注解，方法进出即自动完成事务边界。但要真正用好它，得理解它靠 AOP 代理实现——代理不生效，事务就不生效。

## 1. 声明式事务

```java
@Service
public class OrderService {

    private final OrderMapper orderMapper;
    private final InventoryClient inventoryClient;

    public OrderService(OrderMapper orderMapper, InventoryClient inventoryClient) {
        this.orderMapper = orderMapper;
        this.inventoryClient = inventoryClient;
    }

    @Transactional(rollbackFor = Exception.class)
    public void createOrder(OrderCmd cmd) {
        orderMapper.insert(cmd.toOrder());
        inventoryClient.deduct(cmd.getItemId(), cmd.getQty());
    }
}
```

`@Transactional` 的底层是 AOP 环绕通知：方法进入时开启/加入事务，正常返回时提交，满足回滚条件时回滚，最后释放连接。

## 2. 关键属性

| 属性 | 说明 |
|------|------|
| `rollbackFor` | 指定哪些异常触发回滚（默认只回滚 `RuntimeException`/`Error`） |
| `noRollbackFor` | 指定例外不回滚的异常 |
| `propagation` | 传播行为（见下） |
| `isolation` | 隔离级别（`DEFAULT` 表示由数据库决定） |
| `readOnly` | 只读提示，可让数据库/ORM 做优化 |
| `timeout` | 事务超时（秒），超时自动回滚 |

::: warning 默认只回滚运行时异常
Spring 默认只在遇到 `RuntimeException` 与 `Error` 时回滚，**检查型异常（`Exception` 的子类但非运行时）默认不回滚**。所以业务里若抛的是受检异常，必须写 `rollbackFor = Exception.class`，否则「异常抛了、数据却提交了」。
:::

## 3. 传播行为

| 传播行为 | 含义 |
|----------|------|
| `REQUIRED` | 有事务则加入，没有则新建（**默认，绝大多数场景**） |
| `REQUIRES_NEW` | 挂起当前事务，新开一个独立事务（内外互不影响） |
| `NESTED` | 在当前事务内开子事务，基于保存点，子事务失败可单独回滚 |
| `SUPPORTS` | 有事务就加入，没有就以非事务方式执行 |
| `NOT_SUPPORTED` | 以非事务方式执行，挂起当前事务 |
| `MANDATORY` | 必须已存在事务，否则抛异常 |
| `NEVER` | 必须无事务，否则抛异常 |

选型建议：

| 场景 | 建议 |
|------|------|
| 普通业务调用 | `REQUIRED` |
| 审计/日志必须独立提交，不随主事务回滚 | `REQUIRES_NEW` |
| 需要部分回滚（子流程失败不影响主流程已做部分） | 评估 `NESTED`，但要确认底层数据库支持保存点 |

## 4. 失效场景清单

`@Transactional` 生效前提与 AOP 一致：**调用经过代理对象**。以下都会失效：

1. **方法非 public**。代理无法增强非 public 方法。
2. **同类内部自调用**。

```java
@Service
public class OrderService {
    public void outer() {
        inner();          // this 调用，绕过代理，inner 的事务注解失效
    }

    @Transactional
    public void inner() { /* ... */ }
}
```

3. **异常被吞掉**：catch 后不抛出，Spring 看不到异常，自然不会回滚。
4. **抛的是受检异常且没配 `rollbackFor`**：默认不回滚。
5. **数据库引擎不支持事务**：如老式 MyISAM。
6. **多数据源未正确配置事务管理器**：`@Transactional` 绑到的事务管理器与实际数据源不匹配。
7. **类未被 Spring 管理**（自己 `new` 出来的对象）。

自调用的解法：把 `inner()` 挪到另一个 Bean、通过 `AopContext.currentProxy()` 调用（需 `@EnableAspectJAutoProxy(exposeProxy = true)`）、或注入自身代理。

## 5. 事务与锁、隔离级别

- **隔离级别**：`DEFAULT`（由数据库决定，MySQL 默认 `REPEATABLE READ`）、`READ_COMMITTED`、`REPEATABLE_READ`、`SERIALIZABLE` 等。隔离级别越高并发越低，需按业务在一致性与吞吐间取舍。
- **超时**：`timeout` 能防止长事务长期占锁，但只对能响应中断的操作有效。
- **长事务危害**：占用连接与锁、放大 `undo`、阻塞 DDL。事务里**不要做 RPC、发消息、长耗时计算**——这些应移出事务边界。

## 6. 与分布式事务的关系

**本地事务不等于分布式事务**。`@Transactional` 只管一个数据源。跨服务/跨库时，本地事务无能为力，常见方案按优先级：

- **可靠消息 + 最终一致**：本地事务写业务表 + 消息表，异步投递，消费端幂等。
- **状态机 / 补偿（Saga）**：每步有正向与补偿操作，失败时逆序补偿。
- **TCC**：Try-Confirm-Cancel，侵入性强，适合资金类强一致场景。
- **尽量避免强依赖 2PC（两阶段提交）**：性能与可用性代价大，且需要参与者都支持。

一句话原则：**能靠业务设计做到最终一致的，就不要引入重量级分布式事务框架。**

## 7. 实践要点

1. 业务方法默认 `REQUIRED`，慎用 `REQUIRES_NEW`（会多占连接）。
2. 事务方法里只做数据库操作，RPC/消息/文件操作移到事务外。
3. 明确回滚异常类型，别依赖默认行为。
4. 长事务要拆分；只读操作加 `readOnly = true`。
5. 循环依赖与事务失效同源，见 [Spring AOP 详解](./aop.md)。

## 8. 小结

- `@Transactional` 靠 AOP 代理实现，代理不生效则事务不生效。
- 默认只回滚运行时异常，受检异常要显式 `rollbackFor`。
- 传播行为默认 `REQUIRED`，独立提交用 `REQUIRES_NEW`，部分回滚评估 `NESTED`。
- 失效五大原因：非 public、自调用、吞异常、受检异常未配、多数据源错配。
- 跨服务一致性优先「最终一致 + 补偿」，谨慎使用 2PC。
