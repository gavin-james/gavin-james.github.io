---
date: 2019-03-12
category:
  - 常用开发库
tag:
  - 常用开发库
---
# 常用开发库 - Google Guava包 

> Google出品的common包，我比较常用的比如Guava缓存等。

## Google Guava简介

Guava工程包含了若干被Google的 Java项目广泛依赖 的核心库，例如：集合 [collections] 、缓存 [caching] 、原生类型支持 [primitives support] 、并发库 [concurrency libraries] 、通用注解 [common annotations] 、字符串处理 [string processing] 、I/O 等等。 所有这些工具每天都在被Google的工程师应用在产品服务中。

guava的优点：

- 高效设计良好的API，被Google的开发者设计，实现和使用
- 遵循高效的java语法实践
- 使代码更刻度，简洁，简单
- 节约时间，资源，提高生产力

## 推荐网址

- [Guava Wiki在新窗口打开](https://github.com/google/guava/wiki/Home)
- [Guava API Doc在新窗口打开](https://guava.dev/releases/snapshot-jre/api/docs/)
- [Guava Github在新窗口打开](https://github.com/google/guava)
- [Guava 中文教程 - ifeve.com在新窗口打开](http://ifeve.com/google-guava/) 看这里

## 使用Guava

注意：JDK 1.8 or higher.

```xml
<dependency>
  <groupId>com.google.guava</groupId>
  <artifactId>guava</artifactId>
  <version>28.2-jre</version>
  <!-- or, for Android: -->
  <version>28.2-android</version>
</dependency>
```

## 内容简介

### 基本工具 [Basic utilities]

让使用Java语言变得更舒适

1.1 [使用和避免null在新窗口打开](http://ifeve.com/google-guava-using-and-avoiding-null/)：null是模棱两可的，会引起令人困惑的错误，有些时候它让人很不舒服。很多Guava工具类用快速失败拒绝null值，而不是盲目地接受

1.2 [前置条件在新窗口打开](http://ifeve.com/google-guava-preconditions/): 让方法中的条件检查更简单

1.3 [常见Object方法在新窗口打开](http://ifeve.com/google-guava-commonobjectutilities/): 简化Object方法实现，如hashCode()和toString()

1.4 [排序在新窗口打开](http://ifeve.com/google-guava-ordering/): Guava强大的”流畅风格比较器”

1.5 [Throwables在新窗口打开](http://ifeve.com/google-guava-throwables/)：简化了异常和错误的传播与检查

### 集合[Collections]

Guava对JDK集合的扩展，这是Guava最成熟和为人所知的部分

2.1 [不可变集合在新窗口打开](http://ifeve.com/google-guava-immutablecollections/): 用不变的集合进行防御性编程和性能提升。

2.2 [新集合类型在新窗口打开](http://ifeve.com/google-guava-newcollectiontypes/): multisets, multimaps, tables, bidirectional maps等

2.3 [强大的集合工具类在新窗口打开](http://ifeve.com/google-guava-collectionutilities/): 提供java.util.Collections中没有的集合工具

2.4 [扩展工具类](http://ifeve.com/google-guava-collectionhelpersexplained/：让实现和扩展集合类变得更容易，比如创建Collection的装饰器，或实现迭代器

### 缓存[Caches]

[Guava Cache在新窗口打开](http://ifeve.com/google-guava-cachesexplained/)：本地缓存实现，支持多种缓存过期策略

### 函数式风格[Functional idioms]

[Guava的函数式支持在新窗口打开](http://ifeve.com/google-guava-functional/)可以显著简化代码，但请谨慎使用它

### 并发[Concurrency]

强大而简单的抽象，让编写正确的并发代码更简单

5.1 [ListenableFuture在新窗口打开](http://ifeve.com/google-guava-listenablefuture/)：完成后触发回调的Future

5.2 [Service框架在新窗口打开](http://ifeve.com/google-guava-serviceexplained/)：抽象可开启和关闭的服务，帮助你维护服务的状态逻辑

### 字符串处理[Strings]

[字符串处理在新窗口打开](http://ifeve.com/google-guava-strings/): 非常有用的字符串工具，包括分割、连接、填充等操作

### 原生类型[Primitives]

[原生类型在新窗口打开](http://ifeve.com/google-guava-primitives/): 扩展 JDK 未提供的原生类型（如int、char）操作， 包括某些类型的无符号形式

### 区间[Ranges]

[区间在新窗口打开](http://ifeve.com/google-guava-ranges/): 可比较类型的区间API，包括连续和离散类型

### I/O

[I/O在新窗口打开](http://ifeve.com/google-guava-io/): 简化I/O尤其是I/O流和文件的操作，针对Java5和6版本

### 散列[Hash]

[散列在新窗口打开](http://ifeve.com/google-guava-hashing/): 提供比Object.hashCode()更复杂的散列实现，并提供布鲁姆过滤器的实现

### 事件总线[EventBus]

[事件总线在新窗口打开](http://ifeve.com/google-guava-eventbus/):发布-订阅模式的组件通信，但组件不需要显式地注册到其他组件中

### 数学运算[Math]

[数学运算在新窗口打开](http://ifeve.com/google-guava-math/):优化的、充分测试的数学工具类

### 反射[Reflection]

[反射在新窗口打开](http://ifeve.com/guava-reflection/): Guava 的 Java 反射机制工具类

## 参考文章

- http://ifeve.com/google-guava/