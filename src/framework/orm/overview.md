---
date: 2026-10-11
title: ORM 总览
category: [框架]
tag: [ORM]
---

# ORM 总览

> 对象关系映射（Object-Relational Mapping, ORM）要解决的核心矛盾是：Java 里是对象与引用，数据库里是表与行，两套世界观怎么对上号。ORM 用一层框架把「对象操作」翻译成「SQL 操作」，让业务代码尽量少碰 `ResultSet` 和字符串 SQL。但没有免费的午餐——翻译得越多，你对 SQL 的控制就越少，这正是选型的核心权衡。

## 1. 为什么需要 ORM

手写 JDBC 的日子大概长这样：

```java
String sql = "SELECT id, name, age FROM user WHERE id = ?";
try (Connection conn = dataSource.getConnection();
     PreparedStatement ps = conn.prepareStatement(sql)) {
    ps.setLong(1, id);
    try (ResultSet rs = ps.executeQuery()) {
        if (rs.next()) {
            return new User(rs.getLong("id"), rs.getString("name"), rs.getInt("age"));
        }
    }
}
```

痛点很集中：**样板代码多**（连接、参数、结果集逐字段搬）、**易错**（字段名写错编译期不报）、**对象与表的映射散落各处**。ORM 把这三件事收拢到框架：你声明「实体 ↔ 表」的映射关系，框架负责拼 SQL、绑参数、装结果。

## 2. 两条路线：全自动 vs 半自动

市场上主流是两个流派，理解它们的差异就理解了 ORM 选型的全部：

| 维度 | 全自动（JPA / Hibernate） | 半自动（MyBatis） |
|------|--------------------------|-------------------|
| SQL 谁写 | 框架根据实体和方法名自动生成 | 开发者手写 |
| 关注点 | 领域模型（实体） | SQL 与结果映射 |
| 学习曲线 | 入门快，调优深 | 上手即写 SQL，概念少 |
| 复杂查询 | 需要 JPQL/Criteria 或退化为原生 SQL | 天然擅长，直接写 |
| 动态条件 | Criteria 拼装，可读性一般 | 动态 SQL 标签，直观 |
| SQL 可控性 | 弱，出问题要开 SQL 日志追 | 强，所见即所得 |
| 适合场景 | 模型稳定、CRUD 密集、以对象为中心 | 复杂查询、报表、遗留库、SQL 需要精细调优 |

一句话：**JPA 让你少写 SQL，MyBatis 让你掌控 SQL**。这不是优劣之分，而是取舍。

## 3. 本站文档

- [MyBatis 详解](./mybatis.md)：Mapper 代理、`#{}` 与 `${}`、动态 SQL、一级/二级缓存、与 MyBatis-Plus 的关系。
- [JPA 与 Hibernate](./jpa.md)：实体映射、持久化上下文、懒加载与 N+1、JPQL、与 MyBatis 的选型对比。

## 4. 选型决策树

可以按下面几个问题快速定位：

1. **SQL 复杂度高吗？** 存在大量多表关联、聚合报表、窗口函数、动态条件 → 偏向 MyBatis。
2. **领域模型稳定吗？** 实体关系清晰、以聚合根为中心、写多读少 → 偏向 JPA。
3. **团队 SQL 能力强吗？** 团队习惯手写且能评审 SQL → MyBatis 更能发挥；团队更想用对象思维建模 → JPA。
4. **要不要极致性能控制？** 需要精确控制每条 SQL、强制走某索引 → MyBatis。

现实项目里**混用**是常见做法：主流程用 JPA/MyBatis-Plus 提升开发效率，复杂报表与统计单独用 MyBatis 手写 SQL。混用要注意两点：**事务边界要统一**（同一 `DataSource`、同一事务管理器），**缓存不要打架**（JPA 一级/二级缓存与 MyBatis 缓存在同一事务里可能读到不一致的旧数据）。

## 5. 共同的坑

无论选哪条路线，有几个问题都要正面应对：

- **N+1 查询**：JPA 里懒加载关联被循环访问时会放大成 N 条 SQL；MyBatis 里嵌套 `association`/`collection` 用得不当同样如此。
- **大结果集**：一次性 `SELECT *` 拉全表，内存与网络都被拖垮，必须分页或流式。
- **缓存一致性**：框架级缓存（JPA 二级缓存、MyBatis 二级缓存）在分布式部署下容易读到脏数据，业务缓存要单独设计失效策略。
- **懒加载陷阱**：JPA 的 `LazyInitializationException`、MyBatis 的延迟加载代理，都源于「会话已关闭却还想访问关联」。
