---
date: 2019-03-19
category:
  - 常用开发库
tag:
  - 常用开发库
---
# 其它常用类库

> 除了 Guava、Hutool、Apache Commons 这类"通用工具"，日常开发还离不开集合扩展、日期时间、参数校验、HTTP 客户端、文件 IO、文档处理等专项类库。工具类库的用法无需死记，掌握"遇到问题去哪儿找"即可。

## 1. 选库原则

- **能用标准库就不引依赖**：JDK 自 Java 8 起补齐了日期时间（`java.time`）、流式集合等能力，许多老牌第三方库的必要性已下降；
- **评估许可证与漏洞**：引入前看开源协议是否与项目兼容，并关注 CVE，见 [开源协议](../opensource/dev-opensource.md)；
- **统一版本、避免功能重叠**：同一个项目里不要同时引入多个做同一件事的库（例如两套 JSON 库）；
- **看维护活跃度**：长期不更新的库即使功能齐全也要谨慎，避免踩到未修复的漏洞。

## 2. 集合工具

标准库的 `Collections`、`Arrays` 只覆盖基础操作，复杂场景常借助工具库：

| 能力 | 常用库 / API |
| --- | --- |
| 集合判空、过滤、转换 | Java 8 Stream |
| 不可变集合、多值 Map | Guava `ImmutableList` / `Multimap` |
| 集合差集、交并集 | Apache Commons Collections `CollectionUtils` |
| 一句话判空、转换 | Hutool `CollUtil` |

参见 [Google Guava 包](./dev-package-x-google-guava.md)、[Apache Commons 包](./dev-package-x-apache-common.md)、[Hutool 包](./dev-package-x-hu-tool.md)。

```java
// Guava：构造不可变集合与多值 Map
ImmutableList<String> list = ImmutableList.of("a", "b");
Multimap<String, Integer> multimap = ArrayListMultimap.create();
multimap.put("k", 1);
multimap.put("k", 2);   // 一个 key 对应多个 value

// Apache Commons：集合判空
boolean empty = CollectionUtils.isEmpty(list);
```

## 3. 日期时间

Java 8 之前只有 `Date` + `Calendar`，易错、非线程安全。`java.time`（JSR-310）是当前的标准方案：

```java
LocalDate today = LocalDate.now();
LocalDate nextWeek = today.plusWeeks(1);
LocalDateTime now = LocalDateTime.now();
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
System.out.println(now.format(fmt));
```

- **`LocalDate` / `LocalTime` / `LocalDateTime`**：不含时区的本地时间，最常用；
- **`Instant`**：时间戳，适合存储与传输；
- **`ZonedDateTime`**：带时区，跨时区场景使用；
- **`Duration` / `Period`**：分别表示时间量与日期间隔。

::: warning 格式化模式里的坑
`yyyy` 表示"日历年"，而 `YYYY` 表示"按周算的年份"（week-based year），跨年周使用 `YYYY` 会得到意外结果；月份用 `MM`（大写），`mm` 是分钟。格式化模式务必逐字符核对。
:::

若仍需旧的字符串解析能力，Hutool 的 `DateUtil` 提供了大量便捷方法。Joda-Time 是老项目常见的历史依赖，新项目直接用 `java.time` 即可。

## 4. 参数校验

Web 层参数校验的标准是 **Bean Validation**（原 JSR-303/349，现 Jakarta Bean Validation），规范由 `jakarta.validation`（旧版为 `javax.validation`）提供，实现通常是 Hibernate Validator。

```java
public class UserForm {
    @NotBlank(message = "用户名不能为空")
    private String username;

    @Email(message = "邮箱格式不正确")
    private String email;

    @Min(value = 1, message = "年龄至少为 1")
    @Max(value = 150, message = "年龄过大")
    private int age;
}

// Spring MVC 中配合 @Validated 触发校验
@PostMapping("/users")
public Result create(@Validated @RequestBody UserForm form) {
    // ...
}
```

- **注解在字段上**声明规则，校验逻辑与业务代码解耦；
- **分组校验（groups）**：新增与更新用不同的校验组；
- **自定义校验注解**：内置注解不够时实现 `ConstraintValidator`；
- 工具库层面也有 Hutool `Validator`、Apache Commons `Validate` 等轻量断言，但不如 Bean Validation 成体系。

## 5. HTTP 客户端

调用外部接口需要 HTTP 客户端，常见选择：

| 客户端 | 特点 |
| --- | --- |
| `java.net.http.HttpClient` | JDK 11+ 内置，标准库首选 |
| Apache HttpClient | 功能全、生态成熟，老项目常用 |
| OkHttp | 性能好、API 简洁，Android/服务端均适用 |
| Retrofit | 基于 OkHttp 的声明式客户端，接口即 API |
| Spring `RestTemplate` / `WebClient` | Spring 生态同步/异步方案 |

```java
// JDK 11+ 内置 HttpClient
HttpClient client = HttpClient.newHttpClient();
HttpRequest req = HttpRequest.newBuilder()
        .uri(URI.create("https://example.com/api"))
        .GET()
        .build();
HttpResponse<String> resp = client.send(req, HttpResponse.BodyHandlers.ofString());
```

::: tip 连接池与超时
生产环境务必配置**连接池**和**连接/读取超时**，否则外部接口慢会导致线程耗尽。OkHttp、Apache HttpClient 都内置连接池，JDK `HttpClient` 也可通过 `Executor` 与超时设置调优。
:::

## 6. 文件与 IO

标准库的 `java.nio.file.Files` 已能覆盖多数读写操作，工具库则提供了更顺手的语法糖：

- **Apache Commons IO**：`FileUtils`、`IOUtils` 一行完成目录拷贝、流转换、读取为字符串；
- **Hutool `FileUtil`**：`readUtf8String`、`copy`、`touch` 等便捷方法；
- **编码**：Apache Commons Codec 提供 `Base64`、`Hex`、`DigestUtils`（摘要），见 [安全算法 - 摘要算法](../algorithms-structures/alg-domain/alg-domain-security-degist.md)。

```java
// Commons IO：把输入流读成字符串并写入文件
String content = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
FileUtils.writeStringToFile(new File("out.txt"), content, StandardCharsets.UTF_8);
```

## 7. 文档与 Excel 处理

生成报表、导入导出是后台系统的常见需求：

| 场景 | 常用库 |
| --- | --- |
| Excel 读写 | Apache POI、EasyExcel（阿里，内存友好） |
| Word / PDF | Apache POI（Word）、iText / OpenPDF（PDF） |
| CSV | OpenCSV、commons-csv |

EasyExcel 通过 SAX 方式逐行解析，避免 POI 全量加载导致的内存溢出，适合海量数据导入。PDF 导出实践见 [Itext PDF 导出](../usage/dev-usage-export-pdf.md)。

## 8. 图片处理

- **Thumbnailator**：一行代码生成缩略图、裁剪、旋转、加水印；
- **Java 内置 `javax.imageio`**：基础读写与缩放，功能有限；
- **commons-imaging**：读取 EXIF 等元数据。

```java
// Thumbnailator：把图片等比缩放到 200x200
Thumbnails.of("src.jpg").size(200, 200).toFile("thumb.jpg");
```

## 9. 依赖冲突排查

引入多个工具库后容易出现同名类或版本冲突（如 `NoSuchMethodError`、`ClassNotFoundException`），可用 Maven/Gradle 检查依赖树：

```bash
mvn dependency:tree -Dincludes=com.google.guava:guava
```

看到同一 artifact 出现多个版本时，用 `<dependencyManagement>` 统一版本，或在冲突处 `<exclusions>` 排除传递依赖。日志库冲突（SLF4J 多绑定）见 [日志类库详解](./dev-package-x-log.md)。

## 10. 小结

- 选库先看标准库能否覆盖，再看许可证、漏洞与维护活跃度，避免功能重叠。
- 集合操作优先 Stream，复杂场景用 Guava / Commons / Hutool。
- 日期时间一律用 `java.time`，注意 `yyyy` 与 `YYYY`、`MM` 与 `mm` 的区别。
- 参数校验用 Bean Validation 注解化，配合分组与自定义校验器。
- HTTP 客户端按 JDK 版本与生态选择，生产必备连接池与超时。
- 文件 IO、Excel、图片各有成熟专项库，引入后注意依赖冲突。
