---
date: 2019-03-27
category:
  - 质量保障
tag:
  - 代码质量
---
# 统一命名规范详解 

> 好的代码本身就是注释。一个团队若命名风格各异，阅读成本会急剧上升。本文系统梳理 Java 中的命名规范，并说明如何用工具把规范真正落地。

## 为什么命名重要

命名是代码可读性的第一道门槛：变量叫 `a`、`b`、`tmp1`，读者就必须靠推理才能理解意图；同一个概念一会儿叫 `order`、一会儿叫 `trade`，维护者就得反复确认它们是不是同一件事。统一命名能把「靠猜」变成「一看就懂」，也让协作与代码评审更顺畅。

命名的难点在于它几乎没有「唯一正确答案」：`getUserInfo` 与 `fetchUser` 都能表达取用户，但如果在同一个项目里两种写法并存，阅读者就要不断在脑中做「同义归一」。统一命名规范的意义，就是提前把这类选择固定下来，让团队不必为风格反复争论。

## 命名规范总览

| 元素 | 风格 | 示例 |
| --- | --- | --- |
| 包 | 全小写、点分隔、单数 | `com.example.order.service` |
| 类 / 接口 | 大驼峰（UpperCamelCase） | `OrderService`、`Runnable` |
| 抽象类 | `Abstract` / `Base` 前缀 | `AbstractRepository` |
| 异常类 | `Exception` 结尾 | `OrderNotFoundException` |
| 方法 / 变量 | 小驼峰（lowerCamelCase） | `findByUsername`、`orderId` |
| 常量 | 全大写、下划线分隔 | `MAX_PAGE_SIZE` |
| 枚举 | 类名大驼峰，成员全大写 | `DealStatusEnum.SUCCESS` |
| 实现类 | `Impl` 后缀 | `OrderServiceImpl` |

一张表能把规范讲清楚，但要让它真正生效，还得靠团队的统一语言与工具约束——这正是后文要展开的内容。

## 命名规范的四条基本取向

在具体规则之外，命名还有一些贯穿始终的取向：

- **准确优先于简短**：`orderItemId` 比 `oiid` 好，宁可长一点，也不要让读者去猜。
- **一致性优先于个性**：同一个概念在项目里只用一个词，避免 `user` / `member` / `account` 混用。
- **可读优先于可写**：代码被读的次数远多于被写的次数，为读者优化命名是划算的。
- **语义优先于形式**：风格统一（大小写、下划线）解决「看起来一致」，词义清晰才解决「看得懂」。

## 各层级命名细则

下面从外到内、从大到小依次说明各类元素的命名约定。

### 包

包名全小写，用 `.` 分隔，每个单元只含一个名词，通常以顶级域名（com / org / cn / io）开头，再接组织与模块名：

```java
package com.example.order.service;
package org.springframework.boot.autoconfigure;
```

包名看似琐碎，却是项目结构的第一层表达。一个清晰的包名能让读者不打开代码就大致知道这里放的是什么；反之，`util`、`common`、`misc` 这类包名往往意味着职责没有想清楚。

### 类与接口

类用名词、大驼峰；接口常用形容词，或「名词 + 能力」的组合来描述行为：

```java
public class OrderItemController { }

public interface Closeable { }
public interface ApplicationContextAware { }
```

类的命名应体现它的职责，而不是它的实现方式：`UserRepository` 比 `UserDbHelper` 更能说明意图，也更容易在实现更换后保持稳定。

不鼓励随意缩写（`AbsClass`、`condi` 之类），但约定俗成的缩写（DTO、DAO、JWT、URI）可以使用。

### 方法

方法首字母小写，采用「动词 + 名词」的组织方式：

- 取值用 `get`，查询用 `find` / `query`，条件用 `by` / `with`；
- 设置类操作以 `set` / `insert` / `update` / `delete` 开头；
- 布尔返回值用 `is` / `has`；长度、数量用 `length` / `size`；类型转换用 `to`。

```java
public User findByUsername(String username) { }
public boolean isNotEmpty() { }
public int size() { }
public UserDto convertTo(User user) { }
```

阿里巴巴手册对各层的约定是：获取单个对象用 `get`、获取多个对象用 `list`、统计用 `count`、插入用 `save` / `insert`、删除用 `remove` / `delete`、修改用 `update`（完整规范见[阿里巴巴 Java 开发手册](../code-style/code-style-alibaba.md)）。

方法命名的常见错误，是把「实现」写进名字（如 `getUserBySelectSql`），或者用 `handle` / `process` / `doSomething` 这类没有信息量的动词。好的方法名描述的是「做什么」，而不是「怎么做」。

### 变量与常量

变量小驼峰，不以 `_` 或 `$` 作前缀或分隔；常量全大写、下划线分隔：

```java
private String mobileNumber;
private Long orderId;

public static final int DEFAULT_PAGE_NO = 1;
public static final long MAX_PAGE_SIZE = 1000;
```

变量命名最容易走两个极端：`data`、`temp`、`list1` 太抽象，读者不知道里面是什么；`userListOfActiveVip` 又太长，读起来费力。折中的做法是用「领域名词 + 限定」，如 `activeUsers`。

### 枚举与泛型

枚举类名大驼峰、成员全大写；泛型参数有约定俗成的单字母含义：`E`（Element）、`K` / `V`（Key / Value）、`T`（Type）、`N`（Number），未知类型用 `?`：

```java
public enum Color { RED, YELLOW, BLUE; }

public class HashMap<K, V> extends AbstractMap<K, V> { }
```

枚举成员承担着「取值范围」的表达，命名要能自解释，避免 `TYPE1`、`TYPE2` 这种无语义的名字；泛型参数用单字母是业界惯例，但一旦有多个类型参数，最好加注释说明各自含义。

### 接口实现类与测试类

实现类推荐用 `Impl` 后缀，而不是大写的 `I` 前缀；测试类以被测类名 + `Test` 结尾，测试方法以 `test` 开头、按「操作_状态」命名：

```java
public interface OrderService { }

public class OrderServiceImpl implements OrderService { }

public class OrderServiceTest {
    public void testCreate_isOk() { }
}
```

实现类加 `Impl` 后缀，是为了让「抽象」与「实现」在文件列表中一眼可辨；测试方法用 `test` 前缀并按「操作_状态」命名，则是为了让失败的用例在报告里就能看出正在测什么。

## 用工具落地命名规范

规范写下来容易，长期坚持要靠工具：

- **IDE 格式化与检查**：统一 IDEA / Eclipse 的 Code Style Scheme，把方案放进仓库供全队使用（见[统一代码格式化](./dev-qt-code-style.md)）。
- **Checkstyle**：通过命名相关的模块（如 `TypeName`、`MethodName`、`ConstantName`、`LocalVariableName`、`MemberName`）在构建期校验命名，不合规即失败（见[静态样式检查](./dev-qt-code-style-1.md)）。
- **Spotless**：把格式化与检查集成进 Maven / Gradle 构建，`spotless:check` 在 CI 中卡住不合规代码，`spotless:apply` 一键修复。
- **评审兜底**：工具能覆盖命名这类机械规则，语义是否清晰仍需代码评审把关。

工具能保证「形式一致」，但保证不了「语义贴切」。因此建议在代码评审清单里固定几条命名检查项：新引入的术语是否与既有词汇表一致？名称是否暴露了实现细节？缩写是否会造成歧义？把这些固化成评审习惯，命名规范才不会止步于文档。

## 用词表：把命名债务降到最低

团队在一个项目里反复出现命名分歧，往往是因为缺少一份「用词表」。这份表不需要很正式，只要把核心领域概念的**标准叫法**固定下来即可，例如统一用 `order` 而非 `trade`、统一用 `cancel` 而非 `abort`。新成员加入时先读用词表，就能避免制造新的同义词。用词表与代码评审配合，是控制命名债务最有效的组合。

## 常见坑

- 用拼音或中英夹杂命名（`getPingfen`、`某变量`）。
- 布尔字段加 `is` 前缀导致某些框架序列化异常（如 `isDeleted` 被解析成 `deleted`）。
- 用一个大而全的 `XXXConstant` 塞满所有常量，查找与维护困难。
- 数组写成 `String args[]`（中括号应紧跟类型：`String[] args`）。
- 过度缩写，`AbstractClass` 缩成 `AbsClass`，反而难懂。

命名问题很少孤立出现，它往往是「职责没分清楚」的信号。当发现某个名字怎么取都不合适时，不妨退一步看看这个类或方法是不是承担了过多的职责。

## 命名中常见的权衡

命名没有绝对标准，很多时候是在几种方案之间权衡：

- **长度与信息量**：短名字写得快，但读者要额外推理；在局部作用域（字段、参数）里可以短一些，在公共 API、跨模块调用处则应更完整。
- **通用与专用**：`Manager`、`Helper`、`Util` 这类通用后缀容易掩盖真实职责，能用具体名词就不要用它们。
- **现状与重构**：遇到历史遗留的糟糕命名，不要为了「统一」而做大规模无意义重命名；应在改动相关代码时顺手修正，避免制造巨大的 diff。

## 小结

- 命名遵循「包小写、类大驼峰、方法变量小驼峰、常量全大写」的基本规则。
- 抽象类加 `Abstract` / `Base`，异常类加 `Exception`，实现类加 `Impl`，测试类加 `Test`。
- 方法命名体现意图（get / find / set / is / to），变量用复数表达集合，泛型用约定单字母。
- 规范要落到工具（IDE 格式化、Checkstyle、Spotless）才能长期坚持。
- 命名应准确、一致、可读，并在项目内维护一份核心用词表。
- 遇到糟糕的历史命名，随改动顺手修正，而非一次性大重构。
- 机械规则交给工具，语义清晰度交给评审。
- 命名规范要与人（统一语言、用词表）和工具（格式化、静态检查）配合，才能真正落地。
