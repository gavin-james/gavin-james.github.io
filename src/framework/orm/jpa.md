---
date: 2026-10-11
title: JPA 与 Hibernate
category: [框架]
tag: [JPA, Hibernate]
---

# JPA 与 Hibernate

> JPA（Jakarta Persistence API）是一套「对象持久化」的规范，Hibernate 是它最主流的实现。它走的是全自动路线：你用实体（Entity）描述领域模型，框架自动生成 SQL、管理对象状态、追踪变更。写 CRUD 时几乎不碰 SQL，代价是对 SQL 的控制力变弱，理解持久化上下文（Persistence Context）与懒加载，是从「会用」到「用好」的分水岭。

## 1. 规范与实现

理清三者关系是关键：

| 名称 | 角色 |
|------|------|
| JPA | 一套接口与注解规范（`EntityManager`、`@Entity`、`@Id`……） |
| Hibernate | JPA 的实现，也是 JPA 之上的扩展（`Session`、HQL） |
| Spring Data JPA | 在 JPA 之上再封装一层 Repository，方法名即查询 |

写业务时通常面向 JPA 注解和 `EntityManager`（或 Spring Data JPA 的 `Repository`），底层由 Hibernate 干活。换实现（如 EclipseLink）代码基本不动——这正是规范的价值。

## 2. 实体映射

实体是映射的起点：

```java
@Entity
@Table(name = "t_order")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 自增，交给数据库
    private Long id;

    @Column(name = "order_no", nullable = false, length = 32, unique = true)
    private String orderNo;

    @Enumerated(EnumType.STRING) // 存字符串而非序号，避免枚举顺序变化踩坑
    private OrderStatus status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // getter / setter 省略
}
```

关联关系用一组注解声明：

| 注解 | 含义 | 默认加载 |
|------|------|----------|
| `@ManyToOne` | 多对一（如订单 → 用户） | **EAGER** |
| `@OneToMany` | 一对多（如用户 → 订单） | **LAZY** |
| `@OneToOne` | 一对一 | EAGER |
| `@ManyToMany` | 多对多（需中间表） | LAZY |

::: warning 默认加载策略是 N+1 的第一来源
`@ManyToOne` 默认 EAGER，意味着查一个订单会顺带把用户也查出来。看似方便，但当你在列表里循环访问关联时，就会放大成大量 SQL。生产实践里通常**显式改成 LAZY**，需要时再按需加载。
:::

实体还有几条硬约束：必须有无参构造、不能是 `final`（Hibernate 要用代理）、主键必须定义、字段用包装类型避免 `null` 转基本类型异常。

## 3. 持久化上下文与实体状态

持久化上下文（Persistence Context）可以理解成「Hibernate 眼中的一批托管实体」，由 `EntityManager` 管理，本质就是一个**一级缓存 + 变更追踪器**。实体在它眼里有四种状态：

| 状态 | 含义 | 典型触发 |
|------|------|----------|
| 新建（New/Transient） | 还没和上下文关联 | `new Entity()` |
| 托管（Managed） | 被上下文管理，变更会被追踪 | `persist()`、`find()`、事务内查询 |
| 游离（Detached） | 曾托管但上下文已关闭 | 事务结束后拿到的对象 |
| 删除（Removed） | 标记删除，提交时删 | `remove()` |

托管状态最「魔法」的地方是**脏检查（Dirty Checking）**：你改了托管对象的字段，**不用显式调用 update**，事务提交时 Hibernate 自动对比快照、生成 `UPDATE`。

```java
@Transactional
public void rename(Long id, String newNo) {
    Order order = entityManager.find(Order.class, id); // 托管
    order.setOrderNo(newNo);                            // 改字段
    // 无需 update，事务提交时自动 flush 生成 UPDATE
}
```

**flush 时机**影响 SQL 顺序。Hibernate 默认在以下时点 flush：事务提交前、执行 JPQL 查询前（若可能影响结果）、显式 `flush()` 时。批量写入时，间歇性 `flush()` + `clear()` 可避免上下文无限膨胀（内存泄漏的常见来源）。

## 4. 懒加载与 N+1 问题

**懒加载（Lazy Loading）**：关联对象在真正访问时才去查库，靠代理（Proxy）或延迟集合实现。

```java
@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
private List<Order> orders;
```

N+1 的经典场景：查 N 个用户，然后循环访问每个用户的订单，会额外触发 N 次查询——1 次查用户 + N 次查订单。

```java
List<User> users = userRepository.findAll();     // 1 条 SQL
for (User u : users) {
    System.out.println(u.getOrders().size());    // 每个用户再 1 条 SQL → N 条
}
```

四种对策：

| 方案 | 做法 | 适用 |
|------|------|------|
| `join fetch` | JPQL 里 `JOIN FETCH u.orders` | 单层关联、结果集不大 |
| `@EntityGraph` | 在查询方法上声明要抓取的关联 | Spring Data JPA 常用 |
| `@BatchSize` | 分批加载，把 N 次合并成 N/批 次 | 多层、集合较大 |
| 投影（DTO） | 只查需要的列，用构造器投影 | 报表、只读展示 |

```java
// JPQL join fetch
@Query("SELECT DISTINCT u FROM User u JOIN FETCH u.orders WHERE u.id = :id")
User findWithOrders(@Param("id") Long id);

// EntityGraph
@EntityGraph(attributePaths = {"orders"})
List<User> findAll();
```

另一个高频报错是 `LazyInitializationException`：在事务/会话关闭后再访问懒加载关联，代理无法初始化。根因是「对象已游离还想加载关联」。对策是**在事务内完成需要的加载**（用 DTO 组装后返回），而不是靠 OSIV（Open Session In View）把会话拖到整个请求周期——OSIV 虽然默认开启，但它会让连接迟迟不释放，高并发下是隐患，生产建议评估后关闭。

## 5. 查询方式

Spring Data JPA 提供从简单到复杂的几种查询手段：

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // 1. 方法名派生查询：findBy + 条件
    List<User> findByStatusOrderByIdDesc(OrderStatus status);

    // 2. JPQL：面向实体，跨数据库
    @Query("SELECT u FROM User u WHERE u.age >= :minAge")
    List<User> findAdults(@Param("minAge") int minAge);

    // 3. 原生 SQL：复杂报表、数据库特有函数
    @Query(value = "SELECT * FROM user WHERE age >= :minAge", nativeQuery = true)
    List<User> findAdultsNative(@Param("minAge") int minAge);
}
```

- **方法名查询**：`findBy`、`OrderBy`、`And`、`In`、`Like` 等关键字组合，简单直接，但方法名一长就难读。
- **JPQL**：面向实体与字段（不是表与列），可移植性好，支持 `JOIN FETCH`。
- **Criteria API**：类型安全的动态查询构造器，适合条件不确定的场景，但样板代码多。
- **原生 SQL**：牺牲可移植性换取数据库特有能力的直接使用。

JPQL 与 SQL 的关键差异：JPQL 操作的是**实体名和属性名**，SQL 操作的是**表名和列名**；JPQL 里写 `FROM User u WHERE u.name = :name`，不是 `FROM user WHERE name = ?`。分页则交给 `Pageable`：

```java
Page<User> page = userRepository.findByStatus(status, PageRequest.of(0, 20, Sort.by("id").descending()));
```

## 6. 与 MyBatis 的选型对比

两者代表 ORM 的两条路线，选择取决于场景而非偏好：

| 对比项 | JPA / Hibernate | MyBatis |
|--------|-----------------|---------|
| SQL 生成 | 自动，可预测性低 | 手写，完全可控 |
| 开发效率 | 简单 CRUD 极高 | 需逐条写 SQL |
| 复杂查询 | 写 JPQL/原生 SQL，较绕 | 天然擅长 |
| 动态条件 | Criteria/Wrapper 拼装 | 动态 SQL 标签直观 |
| 性能调优 | 依赖 SQL 日志定位 | 所见即所得 |
| 领域建模 | 实体为中心，贴合 DDD | 数据为中心 |
| 学习成本 | 入门快、精通难 | 概念少、即刻上手 |
| 适合 | 模型稳定、CRUD 密集、对象思维 | 复杂查询、报表、SQL 精细控制 |

**结论不是二选一**：很多项目主干用 JPA（或 Spring Data JPA）做领域模型与常规 CRUD，报表与复杂统计单独用 MyBatis 写 SQL。若团队整体 SQL 能力强、SQL 需要频繁调优，则全线 MyBatis 更省心。

## 7. 实践要点与常见坑

1. **显式声明 `fetch = LAZY`**：默认 EAGER 的关联（`@ManyToOne`/`@OneToOne`）是 N+1 温床，按需改为 LAZY。
2. **用 DTO 投影替代实体返回**：只读查询不要拉整个实体图，用构造器投影或接口投影减少数据量。
3. **警惕 OSIV**：`spring.jpa.open-in-view` 默认开启，会掩盖懒加载问题的同时占用连接，高并发下建议关闭并正视 N+1。
4. **批量操作用 `saveAll` + 合理 `flush/clear`**，并留意 `IDENTITY` 主键策略会禁用 JDBC 批量插入。
5. **不要在事务外改游离实体期待自动保存**：脏检查只对托管实体生效，游离对象要 `merge()`。
6. **实体别当 DTO 传给前端**：会触发意外懒加载并暴露内部结构，务必转换。
7. **枚举用 `@Enumerated(EnumType.STRING)`**，避免用序号导致枚举顺序变更后数据错乱。

## 8. 小结

- JPA 是规范、Hibernate 是实现、Spring Data JPA 是再封装，业务面向 JPA 注解编程。
- 持久化上下文是「一级缓存 + 变更追踪」，托管实体靠脏检查自动生成 `UPDATE`。
- 懒加载是性能关键：`@ManyToOne` 默认 EAGER，N+1 用 `join fetch`/`EntityGraph`/`@BatchSize`/投影解决。
- JPQL 面向实体与属性，与 SQL 的表/列不同；复杂场景退化为原生 SQL。
- 与 MyBatis 不是对立：JPA 擅长稳定模型的高效 CRUD，MyBatis 擅长复杂查询与 SQL 精控，可混用。
