---
date: 2026-10-11
title: Spring Boot 自动配置
category: [框架]
tag: [Spring Boot]
---

# Spring Boot 自动配置

> 自动配置（Auto-configuration）是 Spring Boot 的灵魂：它在启动时扫描类路径与已有配置，决定往容器里补哪些 Bean，且补的每一个都能被使用者覆盖。理解它，就能看懂任何 Starter 的行为，也能自己写一个。

## 1. 入口：@SpringBootApplication

```java
@SpringBootApplication
// 展开后：
// @SpringBootConfiguration  → 就是 @Configuration
// @ComponentScan            → 扫描当前包及子包
// @EnableAutoConfiguration  → 自动配置的开关（关键）
```

`@EnableAutoConfiguration` 通过 `@Import(AutoConfigurationImportSelector.class)` 生效。`AutoConfigurationImportSelector` 在启动时收集所有 jar 包里的自动配置类清单，返回给容器，让它们像普通配置类一样被处理。

## 2. 自动配置类的装载路径

自动配置类清单从哪里来，经历了版本演进：

| 版本 | 装载文件 |
|------|----------|
| Spring Boot 2.6 及更早 | `META-INF/spring.factories`（key 为 `EnableAutoConfiguration`） |
| Spring Boot 2.7+ / 3.x | `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` |

新文件格式是**每行一个自动配置类的全限定名**，比 `spring.factories` 更清晰：

```text
com.example.myapp.MyAppAutoConfiguration
com.example.myapp.CacheAutoConfiguration
```

Boot 会读取所有依赖（含第三方 Starter）中的这个文件，汇总成一个候选列表。候选列表还会经过一层筛选：通过 `@AutoConfiguration` 上的 `before`/`after` 声明排序，并受 `spring.autoconfigure.exclude` 排除。

## 3. 条件注解：决定装不装

自动配置类**极少无条件生效**，几乎都挂着条件注解。常见的条件：

| 注解 | 生效条件 |
|------|----------|
| `@ConditionalOnClass` | 类路径存在某个类（如 `DataSource`） |
| `@ConditionalOnMissingClass` | 类路径**不**存在某个类 |
| `@ConditionalOnBean` | 容器已存在某类 Bean |
| `@ConditionalOnMissingBean` | 容器**没有**某类 Bean（最关键的「可覆盖」机制） |
| `@ConditionalOnProperty` | 某配置项取到指定值 |
| `@ConditionalOnResource` | 存在某资源文件 |
| `@ConditionalOnWebApplication` | 当前是 Web 应用 |

一个典型的自动配置类：

```java
@AutoConfiguration
@ConditionalOnClass(DataSource.class)
@ConditionalOnMissingBean(DataSource.class)
@EnableConfigurationProperties(DataSourceProperties.class)
public class DataSourceAutoConfiguration {

    @Bean
    @ConditionalOnProperty(name = "app.datasource.enabled", havingValue = "true", matchIfMissing = true)
    public DataSource dataSource(DataSourceProperties props) {
        return props.initializeDataSourceBuilder().build();
    }
}
```

读法：类路径有 `DataSource` + 容器里还没有 `DataSource` Bean + 配置项允许 → 才创建默认数据源。

::: tip @ConditionalOnMissingBean 是覆盖的关键
自动配置提供的 Bean 大多带 `@ConditionalOnMissingBean`。只要你**自己声明**了同类型的 `@Bean`，Boot 就会让位，用你的。这是「约定默认、允许覆盖」的落地方式。
:::

## 4. 调试：看清谁生效了

开启调试试探，让 Boot 打印一份自动配置报告：

```yaml
debug: true
```

或启动参数 `--debug`。输出会分三栏：

- **Positive matches**：条件满足、已生效的自动配置（附命中原因）。
- **Negative matches**：条件不满足、未生效的（附未命中原因）。
- **Unconditional classes**：无条件生效的类。

排障场景很实用：比如「为什么我的数据源没自动建」，报告会直接告诉你哪个条件没满足。

## 5. 覆盖与关闭自动配置

三种方式：

1. **自己声明同类型 Bean**：借助 `@ConditionalOnMissingBean` 生效（首选）。
2. **通过配置项关闭**：如 `spring.autoconfigure.exclude` 精确排除某自动配置类。

```yaml
spring:
  autoconfigure:
    exclude:
      - org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
```

```java
// 也可注解式排除
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
```

3. **改属性值**：多数自动配置都绑定了 `*Properties`，改配置即可调整行为，无需关掉整个配置类。

## 6. 自定义 Starter

给团队封装一个「开箱即用」的组件，通常分两个模块：

- `myapp-spring-boot-autoconfigure`：写自动配置类与 `Properties`。
- `myapp-spring-boot-starter`：聚合依赖（依赖 autoconfigure 模块 + 需要的第三方库），本身几乎无代码。

自动配置模块步骤：

```java
@ConfigurationProperties(prefix = "myapp.client")
public class MyClientProperties {
    private String endpoint = "http://localhost:8080";
    private Duration timeout = Duration.ofSeconds(3);
    // getter / setter
}
```

```java
@AutoConfiguration
@ConditionalOnClass(MyClient.class)
@EnableConfigurationProperties(MyClientProperties.class)
public class MyClientAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public MyClient myClient(MyClientProperties props) {
        return new MyClient(props.getEndpoint(), props.getTimeout());
    }
}
```

最后在 autoconfigure 模块的 `META-INF/spring/....AutoConfiguration.imports` 里登记这个类的全限定名。要点：**默认值要安全且合理、每个 Bean 都加 `@ConditionalOnMissingBean`、提供 `metadata` 让 IDE 提示配置项**。

## 7. 常见坑

1. **条件判断发生在配置类解析期**，此时其它 Bean 可能还没创建，`@ConditionalOnBean` 的顺序依赖要小心（一般通过自动配置排序解决）。
2. **`@ConditionalOnClass` 用字符串写类名**（如 `@ConditionalOnClass(name = "com.x.Y")`）可避免类缺失时加载失败。
3. **自动配置类不要被 `@ComponentScan` 扫到**，否则会丢掉「可覆盖」语义，应通过 imports 文件登记。

## 8. 小结

- `@EnableAutoConfiguration` → `AutoConfigurationImportSelector` 收集候选自动配置类。
- 候选清单在新版本来自 `AutoConfiguration.imports`，旧版本来自 `spring.factories`。
- 条件注解（尤其 `@ConditionalOnMissingBean`）实现「默认 + 可覆盖」。
- `debug=true` 看 Positive/Negative matches 排障；`exclude` 精确关闭。
- 自定义 Starter = autoconfigure 模块 + starter 聚合模块 + imports 登记，详见 [Spring Boot 工程实践](./boot-practice.md)。
