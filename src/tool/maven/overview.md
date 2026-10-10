---
date: 2026-10-11
title: Maven 详解
category: [工具]
tag: [Maven]
---

# Maven 详解

> Maven 用一套「约定优于配置」的模型解决了 Java 项目最实际的两个问题：**依赖从哪来**（中央仓库 + 私服 + 本地仓库），以及**怎么构建**（标准化的生命周期 + 插件）。理解它的坐标、依赖调解和生命周期，是排查「本地能跑、服务器炸」这类问题的前提。

## 1. 为什么需要 Maven

没有构建工具时，项目会退化成一场手工劳动：手动下载 jar 放进 `lib/`、手动指定 `javac` 的 classpath、手动打包、手动跑测试，还得把这一堆命令写进文档让新人照做。痛点集中在三处：

- **依赖管理混乱**：jar 靠人肉拷贝，版本靠口口相传，传递依赖（A 依赖 B、B 依赖 C）完全失控，极易出现类冲突。
- **构建过程不可复现**：每个人的「编译一下」用的命令和参数都不一样，产物不一致。
- **多模块难以组织**：一个大项目拆成多个模块后，模块间依赖、统一版本与插件配置缺少统一入口。

Maven 的答案是：用**统一坐标**定位一切构件，用**标准目录约定**替代配置，用**生命周期 + 插件**把构建过程标准化。

## 2. 坐标与仓库

任何构件（jar、pom、war）都由坐标唯一定位：

```
groupId:artifactId:version[:packaging][:classifier]
```

- `groupId`：组织/公司，如 `com.example`。
- `artifactId`：项目/模块名，如 `order-service`。
- `version`：版本号，`1.0.0` 为正式版，`1.0.0-SNAPSHOT` 为快照版（可变、用于开发联调）。
- `packaging`：打包类型（`jar`/`war`/`pom`，默认 `jar`）。
- `classifier`：区分同一坐标下不同产物，如 `jdk8`、`sources`。

构件按「先近后远」的顺序查找：

```mermaid
flowchart LR
  A[本地仓库 ~/.m2] -->|未命中| B[私服 Nexus]
  B -->|未命中| C[中央仓库/镜像]
```

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>3.2.0</version>
</dependency>
```

首次构建时，Maven 会把下载到的构件缓存在本地仓库 `~/.m2/repository`；团队应统一通过**私服**代理中央仓库，既提速又能在内网构建时不受外网影响。

## 3. 依赖范围与传递

**scope** 决定依赖在哪些阶段可见、是否参与打包：

| scope | 编译期 | 运行期 | 典型用途 |
|-------|:------:|:------:|----------|
| `compile`（默认） | 是 | 是 | 普通依赖 |
| `provided` | 是 | 否 | Servlet API、Lombok——运行环境已提供 |
| `runtime` | 否 | 是 | JDBC 驱动——编译期不用，运行期需要 |
| `test` | 否（仅测试） | 否 | JUnit、Mockito |
| `import` | — | — | 仅用于 `dependencyManagement` 导入 BOM |

由 `compile` 和 `runtime` 范围引出的依赖会**传递**给下游项目；`provided` 与 `test` **不传递**。传递让依赖树迅速膨胀，也就带来了冲突。

**依赖调解**遵循两条规则：

1. **路径最近者优先**：A → B → C（C 深度 2）与 A → D → E → C（深度 3）冲突时，选深度小的。
2. **路径等长时，先声明者优先**：在 `pom.xml` 里写在前面的依赖胜出。

这两条规则是「依赖树一旦变复杂，结果就变得不直观」的根源，所以排查冲突要靠工具而不是猜：

```bash
mvn dependency:tree                 # 打印完整依赖树
mvn dependency:tree -Dincludes=commons-logging
mvn dependency:analyze              # 找出「用了但没声明」和「声明了但没用」的依赖
```

需要强制排除某条传递依赖时用 `<exclusions>`：

```xml
<dependency>
    <groupId>com.example</groupId>
    <artifactId>some-lib</artifactId>
    <version>1.2.0</version>
    <exclusions>
        <exclusion>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

## 4. 生命周期与插件

Maven 有三套**生命周期（lifecycle）**，各自由一串**阶段（phase）**组成；阶段本身不干活，干活的是绑定到阶段上的**插件目标（goal）**。

- `clean`：`pre-clean` → `clean` → `post-clean`，清理 `target/`。
- `default`（构建主流程）：

| 阶段 | 作用 |
|------|------|
| `validate` | 校验项目信息 |
| `compile` | 编译主代码 |
| `test` | 运行单元测试 |
| `package` | 打包成 jar/war |
| `verify` | 运行集成检查 |
| `install` | 安装到本地仓库 `~/.m2` |
| `deploy` | 发布到远程/私服仓库 |

- `site`：生成项目站点文档。

关键机制是**阶段顺序执行**：执行 `mvn package` 会依次跑完它前面的所有阶段（`validate`→…→`package`）。你无法只跑「编译但不跑校验」——除非对具体插件目标单独调用。

绑定示例：

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <configuration>
                <release>17</release>
            </configuration>
        </plugin>
    </plugins>
</build>
```

常用命令与阶段对应：`mvn clean`（清理）、`mvn compile`、`mvn test`、`mvn package`、`mvn install`、`mvn deploy`；打包跳过测试用 `-DskipTests`（编译测试但仍跳过执行）或 `-Dmaven.test.skip=true`（连测试代码都不编译）。直接调用插件目标（如 `mvn dependency:tree`）不会触发生命周期阶段，这是它和 `mvn package` 的重要区别。

## 5. 聚合与继承

多模块项目靠两个机制组织，二者容易混淆：

- **聚合（aggregation）**：父工程用 `<modules>` 把子模块列进去，`mvn install` 在父工程执行即按依赖顺序构建所有子模块。
- **继承（inheritance）**：子模块通过 `<parent>` 声明父 POM，继承其依赖版本、插件配置、属性等。

实践中一个父 POM 往往**同时**承担聚合与继承两种角色：

```xml
<!-- 父 pom.xml（packaging 为 pom） -->
<packaging>pom</packaging>
<modules>
    <module>common</module>
    <module>order-service</module>
</modules>

<properties>
    <java.version>17</java.version>
</properties>
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>3.2.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

关键区别：**`<dependencyManagement>` 只声明版本、不真正引入依赖**，子模块需要时再在自己的 `<dependencies>` 里写坐标（可省略版本）。这样既能统一版本，又不会把父 POM 的依赖强加给所有子模块。`<dependencies>` 则是真的引入并传递。

`import` + `pom` 范围是引入 **BOM（Bill of Materials）** 的标准做法，Spring Boot 的 `spring-boot-dependencies` 就是典型 BOM——它锁定一整套依赖的兼容版本，子模块引用时无需逐条写版本。

## 6. 私服

企业内网项目不会直接连中央仓库，而是搭一台**私服**（常用 Nexus 或 Artifactory），它是本地与中央仓库之间的代理兼缓存：

- **代理**：缓存从中央仓库下载的构件，团队共享，减少外网流量、加速构建。
- **托管**：存放公司自研构件（含 `SNAPSHOT` 与 `release`），供内部项目引用。
- **控制**：统一出口、审计依赖来源、隔离不可用或不合规的构件。

本地通过 `~/.m2/settings.xml` 配置私服地址与认证（不要把账号密码写进项目 `pom.xml`）：

```xml
<settings>
    <servers>
        <server>
            <id>company-repo</id>
            <username>${env.MAVEN_USER}</username>
            <password>${env.MAVEN_PASS}</password>
        </server>
    </servers>
    <mirrors>
        <mirror>
            <id>company-repo</id>
            <mirrorOf>central</mirrorOf>
            <url>https://nexus.example.com/repository/maven-public/</url>
        </mirror>
    </mirrors>
</settings>
```

以 `*` 作为 `mirrorOf` 会把所有仓库请求都导向私服，适合完全内网的环境。

## 7. 常见坑

1. **SNAPSHOT 污染生产**：快照版每次构建内容可能不同，无法复现。发布务必切到正式版本号，并避免让生产依赖 `-SNAPSHOT`。
2. **依赖冲突在运行期才爆**：编译期 classpath 与运行期（尤其是容器内）可能不一致，出现 `NoSuchMethodError`、`ClassNotFoundException`。定位手段就是 `dependency:tree` 加 `-Dverbose` 看被省略的版本。
3. **JDK 版本不一致**：IDE、`JAVA_HOME`、`maven-compiler-plugin` 的 `release` 三处要对齐，否则出现「本地 17、流水线 8」的诡异报错。统一用 `maven.compiler.release` 属性最省心。
4. **`mvn install` 与 IDE 各说各话**：IDE 有自己的编译输出，与 `target/` 可能不同步。怀疑产物不对时先 `mvn clean` 再构建。
5. **本地缓存损坏**：依赖下载中断会留下 `.lastUpdated` 之类的残file，表现为「明明有网却报找不到构件」。删除对应目录下的 `*.lastUpdated` 或整个构件目录后重试。
6. **多模块循环依赖**：模块间互相 `<dependency>` 会导致 Maven 无法确定构建顺序，本质是模块划分问题，应从设计上拆解。

## 8. 小结

- 坐标唯一定位构件，仓库按「本地 → 私服 → 中央」就近查找。
- scope 决定依赖的可见阶段与是否传递；冲突靠「路径最近优先、等长先声明优先」调解，用 `dependency:tree` 排查。
- 生命周期是阶段的序列，插件目标绑定到阶段上执行；调用具体目标不等于走生命周期。
- 聚合组织构建顺序，继承共享配置；`dependencyManagement` 只管版本，`import` 范围引入 BOM。
- 私服是团队依赖的枢纽，凭据放 `settings.xml` 而非 `pom.xml`。

想了解以任务和增量构建为核心的另一种构建工具，见 [Gradle 教程](../gradle/01.md)。
