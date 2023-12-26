---
date: 2022-07-23
category:
  - NoSQL MongoDB
tag:
  - NoSQL MongoDB
---
# MongoDB 替换方案之PostgreSQL 

> MongoDB 宣布其开源许可证从 GNU AGPLv3 切换到 Server Side Public License (SSPL), SSPL 明确要求托管 MongoDB 实例的云计算公司要么获取商业许可证要么向社区开源其服务代码。导致了一些商业公司为了规避风险，弃用MongoDB转而投入其它NoSQL方案。本文主要调研PostgreSQL替换MongoDB方案。

## 关于MongoDB V3版本证书

> MongoDB 宣布其开源许可证从 GNU AGPLv3 切换到 Server Side Public License (SSPL)。新许可证将适用于新版本的 MongoDB Community Server 以及打过补丁的旧版本。AGPLv3 和 SSPL 在自由使用、自由修改和重新分发代码上没有区别。

最大的区别是 MongoDB 希望从软件即服务上获取收入，**SSPL 明确要求托管 MongoDB 实例的云计算公司要么获取商业许可证要么向社区开源其服务代码**。

相比之下 AGPLv3 只声明需要将修改的代码回馈社区，但没有涉及到任何软件即服务。

## PostgreSQL与MongoDB对比

> 因为目标是替换MongoDB，所以直接对比PostgreSQL和MongoDB

### 支持的数据类型

> PG支持的数据类型叫JSON，从PostgreSQL 9.2版本支持JSON，并且从PostgreSQL 9.2版本开始，JSON已经成为内置数据类型，不仅仅是一个扩展了。**PG从9.4开始，又推出了新的JSONB的数据类型**。

#### PostgreSQL - JSON & JSONB

> 先介绍下JSON，在2012年V9.2版本中支持， 请直接看下面的例子

- **Document Database – JSON**

Document database capabilities in Postgres advanced significantly, when support for the JSON data type was introduced **in 2012 as part of Postgres 9.2**. JSON (JavaScript Object Notation) is one of the most popular data-interchange formats on the web.

Postgres offers robust support for JSON. Postgres has a JSON data type, which validates and stores JSON data and provides functions for extracting elements from JSON values. And, it offers the ability to easily encode query result sets using JSON. This last piece of functionality is particularly important, as it means that applications that prefer to work natively with JSON can easily obtain their data from Postgres in JSON.

Below are some examples of using JSON data in Postgres:

![img](https://www.pdai.tech/images/db/db-postgre-5.png)

![img](https://www.pdai.tech/images/db/db-postgre-6.png)

![img](https://www.pdai.tech/images/db/db-postgre-7.png)

In addition to **the native JSON data type, Postgres v9.3, released in 2013, added a JSON parser and a variety of JSON functions**. This means web application developers don't need translation layers in the code between the database and the web framework that uses JSON. JSON-formatted data can be sent directly to the database where Postgres will not only store the data, but properly validate it as well. With JSON functions, Postgres can read relational data from a table and return it to the application as valid JSON formatted strings. And, the relational data can be returned as JSON for either a single value or an entire record.

- **JSONB – Binary JSON**

**Postgres 9.4 introduces JSONB, a second JSON type with a binary storage format**. There are some significant differences between JSONB in Postgres and BSON, which is used by one of the largest document-only database providers. JSONB uses an internal storage format that is not exposed to clients; JSONB values are sent and received using the JSON text representation. **BSON stands for Binary JSON, but in fact not all JSON values can be represented using BSON. For example, BSON cannot represent an integer or floating-point number with more than 64 bits of precision, whereas JSONB can represent arbitrary JSON values**. Users of BSON-based solutions should be aware of this limitation to avoid data loss.

> jsonb 的出现带来了更多的函数, 更多的索引创建方式, 更多的操作符和更高的性能

关于PG的JSON和JSONB的具体介绍和测试，参考Francs的blog：

- http://francs3.blog.163.com/blog/static/40576727201452293027868/
- http://francs3.blog.163.com/blog/static/40576727201442264738357/
- http://francs3.blog.163.com/blog/static/40576727201341613630793/

#### MongoDB - BSON

> 其实BSON就是JSON的一个扩展，BSON是一种类json的一种二进制形式的存储格式，简称Binary JSON，它和JSON一样，支持内嵌的文档对象和数组对象，但是BSON有JSON没有的一些数据类型，如Date和BinData类型。

**二者的区别参考**：

http://www.tuicool.com/articles/iUNbyi

BSON是由10gen开发的一个数据格式，目前主要用于MongoDB中，是MongoDB的数据存储格式。BSON基于JSON格式，选择JSON进行改造的原因主要是JSON的通用性及JSON的schemaless的特性。

**BSON主要会实现以下三点目标**：

- 更快的遍历速度

对JSON格式来说，太大的JSON结构会导致数据遍历非常慢。在JSON中，要跳过一个文档进行数据读取，需要对此文档进行扫描才行，需要进行麻烦的数据结构匹配，比如括号的匹配，而BSON对JSON的一大改进就是，它会将JSON的每一个元素的长度存在元素的头部，这样你只需要读取到元素长度就能直接seek到指定的点上进行读取了。

- 操作更简易

对JSON来说，数据存储是无类型的，比如你要修改基本一个值，从9到10，由于从一个字符变成了两个，所以可能其后面的所有内容都需要往后移一位才可以。而使用BSON，你可以指定这个列为数字列，那么无论数字从9长到10还是100，我们都只是在存储数字的那一位上进行修改，不会导致数据总长变大。当然，在MongoDB中，如果数字从整形增大到长整型，还是会导致数据总长变大的。

- 增加了额外的数据类型

JSON是一个很方便的数据交换格式，但是其类型比较有限。BSON在其基础上增加了“byte array”数据类型。这使得二进制的存储不再需要先base64转换后再存成JSON。大大减少了计算开销和数据大小。

当然，在有的时候，BSON相对JSON来说也并没有空间上的优势，比如对{“field”:7}，在JSON的存储上7只使用了一个字节，而如果用BSON，那就是至少4个字节（32位）

### 性能对比

> PostgreSQL在NoSQL方面的表现确实抢眼。PostgreSQL不仅是SQL+NoSQL+ACID的完美组合，性能还比MongoDB技高一筹（分布式集群上MongoDB更有优势）

进行了一下Mongodb亿级数据量的性能测试，分别测试如下几个项目： （所有插入都是单线程进行，所有读取都是多线程进行）

1） 普通插入性能 （插入的数据每条大约在1KB左右）

2） 批量插入性能 （使用的是官方C#客户端的InsertBatch），这个测的是批量插入性能能有多少提高

3） 安全插入功能 （确保插入成功，使用的是SafeMode.True开关），这个测的是安全插入性能会差多少

4） 查询一个索引后的数字列，返回10条记录（也就是10KB）的性能，这个测的是索引查询的性能

5） 查询两个索引后的数字列，返回10条记录（每条记录只返回20字节左右的2个小字段）的性能，这个测的是返回小数据量以及多一个查询条件对性能的影响

6） 查询一个索引后的数字列，按照另一个索引的日期字段排序（索引建立的时候是倒序，排序也是倒序），并且Skip100条记录后返回10条记录的性能，这个测的是Skip和Order对性能的影响

7） 查询100条记录（也就是100KB）的性能（没有排序，没有条件），这个测的是大数据量的查询结果对性能的影响

8） 统计随着测试的进行，总磁盘占用，索引磁盘占用以及数据磁盘占用的数量

并且每一种测试都使用单进程的Mongodb和同一台服务器开三个Mongodb进程作为Sharding（每一个进程大概只能用7GB左右的内存）两种方案

其实对于Sharding，虽然是一台机器放3个进程，但是在查询的时候每一个并行进程查询部分数据，再有运行于另外一个机器的mongos来汇总数据，理论上来说在某些情况下性能会有点提高

基于以上的种种假设，猜测某些情况性能会下降，某些情况性能会提高，那么来看一下最后的测试结果怎么样？

备注：测试的存储服务器是 E5620 @ 2.40GHz，24GB内存，CentOs操作系统，打压机器是E5504 @ 2.0GHz，4GB内存，Windows Server 2003操作系统，两者千兆网卡直连。

![img](https://www.pdai.tech/images/db/db-postgre-11.jpg)

- 数据加载

从服务端资源消耗的角度看，是MongoDB的性能是PostgreSQL的2倍。但是如果数据加载不能很好的并发展开，让mongoimport成为了瓶颈，那应该算打平。 另外，EnterpriseDB的数据加载的测试结果和我的结果差异比较大，可能是因为EnterpriseDB的测试中，数据量超过了系统内存量，IO对测试结果的影响开始显现。

- 数据插入

从服务端资源消耗的角度看，两者其实相差不大。EnterpriseDB的测试结果被mongo客户端的性能瓶颈绑架了。

- 数据查询

对无匹配数据(或少量匹配数据)的索引查询，PostgreSQL的性能是MongoDB的4倍(这一点也有点令人不解，同样是走索引的单点查询，为什么差距就这么大呢？)。 虽然EnterpriseDB的测试结果也表明PostgreSQL的性能是MongoDB 4倍左右，但EnterpriseDB的测试方法是有问题的。

- 数据大小 MongoDB的数据大小大约是PostgreSQL的3倍，这和EnterpriseDB的测试结果是一致的。

这里推荐看两篇文章：

- https://www.cnblogs.com/lovecindywang/archive/2011/03/02/1969324.html
- http://blog.chinaunix.net/uid-20726500-id-4960138.html

## PostgreSQL搭建

### 服务端 - 下载

> 下载最新的12.0版本

URL： https://www.postgresql.org/download/linux/redhat/

![img](https://www.pdai.tech/images/db/db-postgre-1.png)

安装的步骤很简单，当然如果你遇到问题，可以看这两篇文章

- [Centos7安装postgresql9.4在新窗口打开](https://www.cnblogs.com/Yatces/p/11082061.html)
- [centos7 安装postgresql11在新窗口打开](https://www.jianshu.com/p/b4a759c2208f)

### 客户端 - pgAdmin4

> pgAdmin 4是一款为PostgreSQL设计的可靠和全面的数据库设计和管理软件，
>
> - 它允许您连接到特定的数据库，创建表和运行各种从简单到复杂的SQL语句。
> - 它支持的操作系统包括Linux，Windows，Mac OS X。

- **最新版本**

最新的版本是v4.18，官方网站是 [https://www.pgadmin.org/在新窗口打开](https://www.pgadmin.org/)

![img](https://www.pdai.tech/images/db/db-postgre-4.png)

- **安装和使用**

这里使用的pgAdmin 4是安装PostgreSQL数据库时自带的，在安装包解压后的目录可以看到客户端工具pgAdmin 4。

![img](https://www.pdai.tech/images/db/db-postgre-3.jpg)

连接之后是这样的

![img](https://www.pdai.tech/images/db/db-postgre-2.jpg)

PgAdmin4的使用，推荐看这篇文章：[PostgresSQL客户端pgAdmin4使用在新窗口打开](https://www.jianshu.com/p/e7fe45a10cee)

- **Pgadmin 与 PGAdmin4的关系**

  - 这里文字摘自官网
  - **pgAdmin** is a free software project released under the PostgreSQL/Artistic licence. The software is available in source and binary format from the PostgreSQL mirror network. Because compiling from source requires technical knowledge, we recommend installing binary packages whenever possible.

  The pages in this section give additional details about each binary package available as well as more direct download links. In addition, you can download source tarballs and pgAgent for your servers to enable additional functionality.

  - **pgAdmin 4** pgAdmin 4 is a complete rewrite of pgAdmin, built using Python and Javascript/jQuery. A desktop runtime written in C++ with Qt allows it to run standalone for individual users, or the web application code may be deployed directly on a webserver for use by one or more users through their web browser. The software has the look and feel of a desktop application whatever the runtime environment is, and vastly improves on pgAdmin III with updated user interface elements, multi-user/web deployment options, dashboards and a more modern design.

## PostgreSQL 开发使用的例子

> 主要技术栈：
>
> - JDK 8
> - Spring Boot
> - Spring JPA
> - PostgreSQL

### 纯SQL例子

> 可以看这个例子，https://github.com/callicoder/spring-boot-postgresql-jpa-hibernate-rest-api-demo

这个例子中，基本和MySQL使用一致

基础的使用，可以看这个菜鸟教程：https://www.runoob.com/postgresql/postgresql-select-database.html

### 包含NoSQL（JsonB）例子

> 本例子可以参看 https://github.com/brant-hwang/springboot-postgresql94-hibernate5-example， 但是这里面pg版本是老的9.4，要知道9.4是刚刚支持JsonB。现在的版本2020-2月份更新的是12.0，对应的驱动版本是42.2.10。

- License

另外注意下，这个驱动的版本是：BSD 2-clause

- 最新的Mvn包

```xml
<!-- https://mvnrepository.com/artifact/org.postgresql/postgresql -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.2.10</version>
</dependency>
```

## PostgreSQL 推荐资料

> pg官方资料基本可以从这里找到

- 官方网站 https://www.postgresql.org
- 官方文档 https://www.postgresql.org/docs/

> 注意了，官方还有一个中文文档，最新版本是pg 11.2

[PostgreSQL 11.2 手册](http://www.postgres.cn/docs/11/index.html)
