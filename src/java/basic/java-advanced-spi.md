---
date: 2022-02-10
category:
  - Java 基础
tag:
  - Java 基础
---
# SPI机制详解

> SPI（Service Provider Interface，服务提供者接口）是 JDK 内置的一种服务发现机制：由接口定义方约定契约，由第三方实现方提供实现，运行期再由 `java.util.ServiceLoader` 动态发现并加载实现类。它的核心价值是**解耦**——调用方只依赖接口，不需要在编译期知道具体实现。

## 1. 为什么需要 SPI

在没有 SPI 的朴素做法里，调用方如果要切换实现，往往要改代码：直接 `new` 某个实现类，或者 `Class.forName("com.xxx.MyImpl")` 写死全限定名，又或者维护一个工厂类把 `if/else` 写满。这几种方式都把“用哪个实现”这个决定固化在了调用方的源码里，一旦引入新实现（比如换数据库、换日志组件），就要重新编译。

SPI 把“装配的控制权”从程序内部移到程序外部：接口方只定义标准，实现方各自打包自己的 jar，调用方在运行期通过约定的目录扫描、发现并加载实现。这正是插件化、可扩展框架的通用套路。

## 2. 核心约定

Java SPI 的规则很短，只有三条：

1. **接口由标准方定义**：例如 `java.sql.Driver` 由 JDK 定义，只声明方法、不提供实现。
2. **实现方登记自己**：在实现 jar 的 `META-INF/services/` 目录下，创建一个**以接口全限定名命名**的文件（如 `java.sql.Driver`），文件内容是实现类的全限定名，一行一个，`#` 开头为注释。
3. **使用方通过 `ServiceLoader` 加载**：`ServiceLoader.load(驱动接口.class)` 会扫描所有 jar 的约定目录，把实现类反射实例化。

## 3. 完整示例

以“内容搜索”为例：接口统一为 `Search`，实现可以是文件搜索，也可以是数据库搜索。

```java
public interface Search {
    List<String> searchDoc(String keyword);
}

public class FileSearch implements Search {
    @Override
    public List<String> searchDoc(String keyword) {
        System.out.println("文件搜索 " + keyword);
        return Collections.emptyList();
    }
}

public class DatabaseSearch implements Search {
    @Override
    public List<String> searchDoc(String keyword) {
        System.out.println("数据库搜索 " + keyword);
        return Collections.emptyList();
    }
}
```

在 `resources/META-INF/services/` 下新建文件 `com.example.spi.Search`，内容为实现类全限定名（要启用某个实现就写哪一行）：

```text
com.example.spi.FileSearch
com.example.spi.DatabaseSearch
```

加载与遍历：

```java
ServiceLoader<Search> loader = ServiceLoader.load(Search.class);
for (Search search : loader) {
    search.searchDoc("hello world");
}
```

只要把实现 jar 放进 classpath，`ServiceLoader` 就会自动找到它，调用方无需改动一行代码——这就是 SPI 的威力。

## 4. ServiceLoader 的工作原理

`ServiceLoader<S>` 实现了 `Iterable<S>`，但它**不是**在 `load()` 时就立刻加载全部实现，而是**懒加载**：

- 类内部常量 `PREFIX = "META-INF/services/"`，拼接接口全限定名即为要扫描的资源路径。
- 内部持有 `LazyIterator`：调用 `hasNext()` 时才去 `ClassLoader` 定位资源并逐行解析配置；调用 `next()` 时才用反射 `Class.forName(name, false, loader)` 加载类并 `newInstance()` 实例化。
- 实例化后的对象按顺序缓存进 `LinkedHashMap<String, S> providers`，因此同一实现在一次加载中只实例化一次；调用 `reload()` 可清空缓存并重新加载。
- 类加载器默认取 `Thread.currentThread().getContextClassLoader()`，也可显式传入，或用 `loadInstalled()` 只扫描扩展类路径。

## 5. 典型应用

| 场景 | 接口 | 说明 |
| --- | --- | --- |
| JDBC 驱动 | `java.sql.Driver` | JDBC 4.0 之后无需再写 `Class.forName("com.mysql.jdbc.Driver")`，`DriverManager` 的静态代码块会通过 `ServiceLoader.load(Driver.class)` 自动装载 classpath 上所有驱动 |
| 日志门面 | `SLF4J` / `Commons-Logging` | 门面只提供 API，具体日志实现（logback、log4j2）在运行期绑定，应用与实现解耦 |
| 框架扩展点 | — | 如 Spring Boot 通过读取各 jar 的扩展点文件批量装载自动配置类；Dubbo 实现了一套增强版 SPI 机制 |
| 插件体系 | — | Eclipse 的插件清单、各类编辑器/IDE 的扩展点，本质都是“标准方定规则、实现方登记、容器扫描加载” |

以 JDBC 为例，`DriverManager` 初始化时执行 `loadInitialDrivers()`：先从系统属性 `jdbc.drivers` 读取驱动，再用 `ServiceLoader` 遍历所有 `Driver` 实现并实例化。所以只要驱动 jar 在 classpath 上，建立连接时代码里根本不需要出现驱动类名。

## 6. SPI 与 API 的区别

一个常见问题是“SPI 和 API 到底差在哪”。两者的关键差异在于**接口相对于调用方/实现方的位置**：

| 维度 | SPI | API |
| --- | --- | --- |
| 接口概念上更靠近谁 | 调用方（使用方定义契约） | 实现方 |
| 接口与实现在组织上的关系 | 接口在调用方包中，实现在独立包/jar 中 | 接口与实现通常在同一包中 |
| 典型形态 | 插件、可替换实现 | 库对外暴露的调用入口 |

一句话：SPI 是“我定义接口，你来实现”，API 是“我实现好功能，你来调用”。

## 7. 缺陷与常见坑

- **不能按需加载**：`ServiceLoader` 会遍历并实例化所有登记的实现，无法只挑一个；若某实现初始化很重，也会被连带加载。
- **只能迭代、不能按键取**：没有办法根据某个参数直接拿到对应实现，只能遍历后自行判断。这也是 Dubbo、Spring 等自建 SPI 机制（支持 `key=value`）的动机。
- **非线程安全**：`ServiceLoader` 实例不能安全地被多个线程并发使用。
- **类加载器陷阱**：实现类由指定/上下文类加载器加载，在容器、多类加载器环境下可能找不到资源或抛 `ServiceConfigurationError`。
- **配置易错**：文件名必须与接口全限定名完全一致，内容必须是实现类全限定名且无多余空格，否则会报错。

## 8. 为什么很多框架要自建 SPI

原生 SPI 的能力有限，几个主流框架都在它之上做了增强：

- **Spring**：较早的版本通过 `SpringFactoriesLoader` 读取各 jar 中的 `META-INF/spring.factories`，键为接口全限定名、值为实现类列表（逗号分隔），用于批量装载自动配置与扩展点；较新版本引入了按需导入的机制以替代全量扫描。
- **Dubbo**：实现了自己的 `ExtensionLoader`，扩展点文件放在 `META-INF/dubbo/` 下，采用 `名称=实现类` 的键值对形式，因此可以**按名字**获取某个扩展实现，而不是只能遍历；同时支持依赖注入与包装增强。
- **日志门面**：SLF4J 的绑定、Commons-Logging 的工厂发现，本质都是“接口在前、实现在后”，运行期再决定绑定哪个实现。

把这些增强放在一起看，方向高度一致：**按 key 获取、按需（懒）加载、支持依赖注入/包装**。理解了这三点，就理解了所有“SPI 增强版”的设计动机。

## 9. ServiceLoader 常用 API 速查

- `ServiceLoader.load(Class<S> service)`：用线程上下文类加载器创建加载器。
- `ServiceLoader.load(Class<S> service, ClassLoader loader)`：指定类加载器。
- `ServiceLoader.loadInstalled(Class<S> service)`：只扫描已“安装”到 JVM 的提供者。
- `serviceLoader.iterator()` 或直接 `for-each`：遍历所有实现（非线程安全）。
- `serviceLoader.reload()`：清空缓存、重新加载，用于运行期新增提供者的场景。
- `serviceLoader.stream()`（JDK 9+）：以流的方式获取 `Provider`，支持延迟实例化。

使用建议：优先用 `load(service, loader)` 显式指定类加载器，避免多类加载器环境下找不到资源；遍历时对每个实现做异常隔离，防止某个实现初始化失败拖垮整条装配链。

## 10. 小结

- SPI 用“接口 + `META-INF/services` 约定文件 + `ServiceLoader`”实现了运行期的实现发现，把装配权移出代码，是面向接口编程在框架层的落地。
- `ServiceLoader` 懒加载、反射实例化、按加载顺序缓存；一次加载只实例化一次，`reload()` 可刷新。
- JDBC、日志门面、Spring Boot、Dubbo 都是 SPI 思想的实践者，其中后两者在原生 SPI 基础上做了增强以支持按 key 获取。
- 原生 SPI 的短板是全量加载、无法按键获取、非线程安全，使用时要注意其代价。

相关内容可参考 [Java 反射机制](./java-basic-x-reflection.md) 与 [注解机制](./java-basic-x-annotation.md)。
