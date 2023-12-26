---
date: 2022-07-08
category:
  - NoSQL MongoDB
tag:
  - NoSQL MongoDB
---
# Mongo入门 - 基本使用：Spring集成 

> 本文为主要介绍Spring Data对MongoDB原生API的封装，比如Spring-data-mongo，MongoTemplate等。以及原生API和Spring data系列之间的关系。

## Spring Data 与 MongoDB

> 在初学使用者而言，常会分不清Spring-data-jpa, spring-data-mongo, springboot-data-mongo-starter以及mongo-driver之间的关联关系， 本节将带你理解它们之间的关系。

### Spring Data的层次结构

首先让我们回顾下Spring runtime体系：

![img](https://www.pdai.tech/images/db/mongo/mongo-x-usage-spring-4.png)

Spring Data是基于Spring runtime体系的：

> 下面这个图能够直观反映出它们之间的依赖关系，以及包中类之间的以来关系。

![img](https://www.pdai.tech/images/db/mongo/mongo-x-usage-spring-5.png)

### springboot-data-mongo层次结构

我们通过引入`springboot-data-mongo-starter`包来看它们之间的层次结构：

![img](https://www.pdai.tech/images/db/mongo/mongo-x-usage-spring-1.png)

## mongodb+Java用法

> 所以通过上面分析我们可以得到基于mongodb+Java的常见用法：

### 使用方式及依赖包的引入

- 引入`mongodb-driver`, 使用最原生的方式通过Java调用mongodb提供的Java driver;

- 引入

  ```
  spring-data-mongo
  ```

  , 自行配置使用spring data 提供的对MongoDB的封装 

  - 使用`MongoTemplate` 的方式
  - 使用`MongoRespository` 的方式

- 引入`spring-data-mongo-starter`, 采用spring autoconfig机制自动装配，然后再使用`MongoTemplate`或者`MongoRespository`方式。

### 具体使用中文档的参考

[spring-data/mongodb 官方的参考文档在新窗口打开](https://docs.spring.io/spring-data/mongodb/docs/3.0.3.RELEASE/reference/html/#preface)

![img](https://www.pdai.tech/images/db/mongo/mongo-x-usage-spring-2.png)

### 一些案例的参考

#### 原生方式

- 前文我们展示的Java通过[mongodb-driver操作mongodb示例]()。
- [官方mongo-java-driver 例子在新窗口打开](http://mongodb.github.io/mongo-java-driver/3.12/driver/getting-started/quick-start/)

#### spring-data-mongo

- [官方spring-data-mongodb 例子在新窗口打开](https://spring.io/projects/spring-data-mongodb#samples)

![img](https://www.pdai.tech/images/db/mongo/mongo-x-usage-spring-3.png)