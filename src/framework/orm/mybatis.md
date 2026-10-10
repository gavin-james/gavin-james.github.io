---
date: 2026-10-11
title: MyBatis 详解
category: [框架]
tag: [MyBatis]
---

# MyBatis 详解

> MyBatis 是「半自动」ORM：SQL 由开发者手写，框架只负责把参数塞进 SQL、把结果集映射成对象。它不做对象与表的自动翻译，换来的是对 SQL 的完全掌控。在复杂查询、报表、遗留库场景里，这种掌控力往往比「少写 SQL」更有价值。

## 1. 定位与整体流程

MyBatis 的核心价值链只有一句话：**SQL 你写，映射它管**。一个查询从调用到返回，经过这些环节：

```text
Mapper 接口方法调用
   │（JDK 动态代理拦截）
   ▼
MapperProxy → MapperMethod（解析方法签名）
   ▼
SqlSession → Executor（一级缓存 / 二级缓存 / 事务）
   ▼
MappedStatement（拿 SQL、参数映射、结果映射）
   ▼
StatementHandler → ParameterHandler（#{} → ?）→ ResultSetHandler（列 → 属性）
```

关键对象职责：

| 对象 | 作用 |
|------|------|
| `SqlSessionFactory` | 全局唯一，由 `Configuration` 构建，线程安全 |
| `SqlSession` | 一次数据库会话，非线程安全，相当于对 Connection 的封装 |
| `Executor` | 执行器，负责缓存、事务、SQL 执行（`SimpleExecutor`/`ReuseExecutor`/`BatchExecutor`） |
| `MappedStatement` | 一条 SQL 的完整元数据（id、SQL、参数类型、结果类型） |
| `StatementHandler` | 负责创建 `PreparedStatement`、设置参数、执行 |

## 2. Mapper 接口与动态代理

为什么只写一个接口、不写实现类，方法就能执行 SQL？答案是 **JDK 动态代理**。

```java
public interface UserMapper {
    User selectById(Long id);
}

// 使用时
try (SqlSession session = sqlSessionFactory.openSession()) {
    UserMapper mapper = session.getMapper(UserMapper.class); // 返回的是代理对象
    User user = mapper.selectById(1L);
}
```

`getMapper()` 内部从 `MapperRegistry` 取出该接口的 `MapperProxyFactory`，用它生成一个实现了 `UserMapper` 的 `MapperProxy`。调用方法时：

1. `MapperProxy.invoke()` 把方法包装成 `MapperMethod`（缓存，避免重复解析）；
2. `MapperMethod` 根据命令类型（SELECT/INSERT/UPDATE/DELETE）调用 `SqlSession` 的对应方法；
3. `SqlSession` 通过 `statement = 接口全限定名 + 方法名` 找到对应的 `MappedStatement` 并执行。

这条链路解释了几个常见现象：

- **接口与 XML 靠命名空间绑定**：XML 的 `namespace` 必须等于接口全限定名，statement 的 `id` 必须等于方法名，否则抛 `BindingException`（`Invalid bound statement`）。
- **重载方法会报错**：因为 statement id 是「接口名 + 方法名」，重载的两个方法 id 相同，会冲突。
- **注解与 XML 二选一**：可以用 `@Select` 等注解替代 XML，但动态 SQL 复杂时 XML 更清晰。

```xml
<mapper namespace="com.example.mapper.UserMapper">
    <select id="selectById" resultType="com.example.entity.User">
        SELECT id, name, age FROM user WHERE id = #{id}
    </select>
</mapper>
```

## 3. #{} 与 ${}：预编译与拼接的分水岭

这是 MyBatis 最需要刻进肌肉记忆的一组区别：

| 语法 | 处理方式 | 安全性 | 用途 |
|------|----------|--------|------|
| `#{}` | 编译成 JDBC 的 `?` 参数标记，走 `PreparedStatement` 预编译 | **安全**，防 SQL 注入 | 几乎所有参数 |
| `${}` | 直接把值拼进 SQL 字符串 | **危险**，可被注入 | 表名、列名、排序字段等结构位置 |

```xml
<!-- 正确：参数走预编译 -->
<select id="findByName" resultType="User">
    SELECT id, name FROM user WHERE name = #{name}
</select>

<!-- 危险：字符串拼接，name="x' OR '1'='1" 就能绕过 -->
<select id="findByNameUnsafe" resultType="User">
    SELECT id, name FROM user WHERE name = '${name}'
</select>

<!-- ${} 的合理用途：动态排序字段，但必须走白名单校验 -->
<select id="listByOrder" resultType="User">
    SELECT id, name FROM user
    ORDER BY ${orderColumn} ${orderDir}
</select>
```

`${}` 的合规用法只有一个前提：**值来自代码白名单，绝不来自用户输入**。例如 `orderColumn` 只允许 `id`/`created_at`，`orderDir` 只允许 `asc`/`desc`，先在 Java 侧校验再传入。此外 `#{}` 还支持类型处理：单个参数直接取、多参数用 `@Param` 命名，`#{property, jdbcType=...}` 可显式指定类型（`jdbcType` 主要针对值为 `null` 的列，部分驱动需要）。

## 4. 动态 SQL

MyBatis 的动态 SQL 是一组 XML 标签，运行时按条件拼出最终 SQL，比在 Java 里拼字符串清晰得多。

```xml
<select id="search" resultType="User">
    SELECT id, name, age FROM user
    <where>
        <if test="name != null and name != ''">
            AND name LIKE CONCAT('%', #{name}, '%')
        </if>
        <if test="minAge != null">
            AND age &gt;= #{minAge}
        </if>
        <if test="statusList != null and statusList.size() > 0">
            AND status IN
            <foreach collection="statusList" item="s" open="(" separator="," close=")">
                #{s}
            </foreach>
        </if>
    </where>
    ORDER BY id DESC
</select>
```

主力标签：

| 标签 | 作用 | 常见坑 |
|------|------|--------|
| `if` | 条件拼接 | 首个条件前多余的 `AND`/`OR` |
| `where` | 自动补 `WHERE` 并剔除开头多余的 `AND`/`OR` | 无任何条件时不会输出 `WHERE` |
| `set` | UPDATE 时自动补 `SET` 并去掉末尾逗号 | 全字段为 null 时生成非法 SQL |
| `choose/when/otherwise` | 多分支（类似 switch） | 只命中第一个 `when` |
| `foreach` | 遍历集合，拼 `IN`、批量插入 | 空集合要先用 `if` 判断，否则生成 `IN ()` |
| `trim` | 自定义前后缀裁剪 | `where`/`set` 的底层实现 |
| `bind` | 定义变量，如模糊查询拼 `%` | 注意作用域 |

::: warning foreach 空集合的坑
`<foreach>` 对空集合会生成 `IN ()`，SQL 语法错误。务必先用 `<if test="list != null and list.size() > 0">` 包住整个 `IN` 子句，或退化为 `IN (NULL)`。
:::

## 5. 一级缓存与二级缓存

MyBatis 有两级缓存，但都**默认容易被误用**，理解它们的边界比用好它们更重要。

| 级别 | 作用域 | 默认 | 生效条件 |
|------|--------|------|----------|
| 一级缓存 | `SqlSession` 级（`PerpetualCache`） | 开启 | 同一会话、同一 statement、参数相同、期间无增删改 |
| 二级缓存 | Mapper namespace 级 | 关闭 | 需显式开启，且要求实体可序列化 |

**一级缓存**：同一 `SqlSession` 内重复查询同样的 SQL 会直接命中内存。它在以下情况失效：执行了任何 `INSERT`/`UPDATE`/`DELETE`、调用了 `commit()`/`rollback()`/`clearCache()`、或会话关闭。Spring 集成时，一级缓存实际作用域是「一次事务/一次请求」，因为 `SqlSession` 随事务开启关闭。可用 `<setting name="localCacheScope" value="STATEMENT"/>` 关掉它（设为 STATEMENT 后每次查询都清）。

**二级缓存**：需要在 Mapper XML 里加 `<cache/>`，或接口上加 `@CacheNamespace`。它按 namespace 隔离，多个 `SqlSession` 共享，命中时命中对象为**反序列化后的副本**，所以实体必须实现 `Serializable`。

```xml
<mapper namespace="com.example.mapper.UserMapper">
    <cache eviction="LRU" flushInterval="60000" size="512" readOnly="false"/>
    <select id="selectById" resultType="User" useCache="true">
        SELECT * FROM user WHERE id = #{id}
    </select>
</mapper>
```

::: danger 二级缓存的分布式陷阱
二级缓存是**进程内**的。分布式部署下，A 节点更新了数据，只清空 A 自己的缓存，B 节点仍会命中旧值，导致读到脏数据。因此生产环境通常**关闭二级缓存，改用 Redis 等业务缓存**，把失效策略握在自己手里。
:::

## 6. 插件机制

MyBatis 允许拦截四大对象的指定方法：

| 可拦截对象 | 典型用途 |
|-----------|----------|
| `Executor` | 分页、二次封装查询 |
| `ParameterHandler` | 参数加解密、脱敏 |
| `StatementHandler` | SQL 改写、分页（PageHelper 就在这里） |
| `ResultSetHandler` | 结果字段加解密、填充审计字段 |

```java
@Intercepts({
    @Signature(type = StatementHandler.class, method = "prepare",
               args = {Connection.class, Integer.class})
})
public class MyPlugin implements Interceptor {
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        StatementHandler handler = (StatementHandler) invocation.getTarget();
        // 可在此读取/改写 SQL，例如打印耗时或强制分页
        return invocation.proceed();
    }
}
```

多个插件会串成责任链，注意**执行顺序**与对 `MetaObject`（MyBatis 反射工具）的正确使用，不要无脑 `SELECT *` 全量改写。

## 7. 与 MyBatis-Plus 的关系

MyBatis-Plus（MP）是**对 MyBatis 的增强，不是替代**：底层仍是 MyBatis 的 `SqlSession`/`Executor`，MP 在其上做了一层封装，用「不写 SQL 也能 CRUD」换取开发效率。

```java
public interface UserMapper extends BaseMapper<User> { }

// 单表 CRUD 无需任何 SQL
User user = userMapper.selectById(1L);
List<User> list = userMapper.selectList(
    new LambdaQueryWrapper<User>()
        .ge(User::getAge, 18)
        .orderByDesc(User::getId));
```

MP 主要提供：

- `BaseMapper`：内置单表 CRUD；
- `Wrapper` / `LambdaQueryWrapper`：类型安全的条件构造器；
- 分页插件、乐观锁（`@Version`）、逻辑删除（`@TableLogic`）；
- 代码生成器、自动填充（`@TableField(fill=...)`）。

关键认知：**MP 只擅长单表**，多表关联、复杂报表仍要写 XML SQL；复杂的 `Wrapper` 拼出来可读性差，不如直接写 SQL。团队规范里通常约定「简单 CRUD 用 MP，复杂查询写 XML」。

## 8. 实践要点与常见坑

1. **SQL 与索引一起评审**：MyBatis 让你掌控 SQL，也意味着性能责任在你，慢 SQL 不能甩锅给框架。
2. **禁止无限制大结果集**：任何列表查询都要分页，避免 `SELECT *` 拉全表进内存。
3. **批量操作走 BatchExecutor**：大量插入用 `sqlSessionFactory.openSession(ExecutorType.BATCH)` 或 MP 的 `saveBatch`，比逐条提交快一个数量级。
4. **多参数用 `@Param` 命名**：超过一个参数时给每个参数 `@Param("name")`，否则只能用 `arg0/param1` 这种脆弱写法。
5. **区分 `resultType` 与 `resultMap`**：单表用 `resultType`（列名 → 属性，靠驼峰映射 `map-underscore-to-camel-case`）；关联复杂、列名与属性不一致时用 `resultMap`。
6. **逻辑删除/多租户用统一拦截器**，不要在每个 SQL 里手写 `deleted = 0`，否则迟早漏一个。
7. **警惕 `useGeneratedKeys`**：插入后取主键用它，但批量插入时部分数据库/驱动支持有限。
8. **不要在 SQL 里做业务判断**：复杂条件尽量在 Java 侧组装，保持 SQL 可读可测。

## 9. 小结

- MyBatis 是半自动 ORM：SQL 手写、映射框架管，胜在对 SQL 的完全掌控。
- Mapper 接口靠 JDK 动态代理执行，接口全限定名 + 方法名即 statement id。
- `#{}` 预编译防注入，`${}` 字符串拼接仅限白名单的结构位置。
- 动态 SQL 标签解决条件拼装，注意空集合与首个 `AND`。
- 一级缓存是 `SqlSession` 级、二级缓存是 namespace 级，分布式下二级缓存慎用。
- MyBatis-Plus 是 MyBatis 的增强，擅长单表 CRUD，复杂查询仍回到 XML。
