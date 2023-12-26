---
date: 2022-07-06
category:
  - NoSQL MongoDB
tag:
  - NoSQL MongoDB
---
# Mongo入门 - 基本使用：效率工具 

> 本文将主要介绍常用的MongoDB的工具，这些工具可以极大程度的提升你的效率。

## 官方MongoDB Compass

> 推荐使用MongoDB Compass，所以详细截几个图给大家看看。

MongoDB Compass Community由MongoDB开发人员开发，这意味着更高的可靠性和兼容性。它为MongoDB提供GUI mongodb工具，以探索数据库交互；具有完整的CRUD功能并提供可视方式。借助内置模式可视化，用户可以分析文档并显示丰富的结构。为了监控服务器的负载，它提供了数据库操作的实时统计信息。就像MongoDB一样，Compass也有两个版本，一个是Enterprise（付费），社区可以免费使用。适用于Linux，Mac或Windows。[官网下载地址在新窗口打开](https://www.mongodb.com/try/download/compass)

- **查询**

展示列表

![img](https://www.pdai.tech/images/db/mongo/mongo-x-usage-18.png)

特色：*按条件查询*

![img](https://www.pdai.tech/images/db/mongo/mongo-x-usage-19.png)

特色：转化为查询语言

![img](https://www.pdai.tech/images/db/mongo/mongo-x-usage-22.png)

- **聚合**

特色：*可以可视化的添加pipleline中的Stage*

![img](https://www.pdai.tech/images/db/mongo/mongo-x-usage-20.png)

- 索引

![img](https://www.pdai.tech/images/db/mongo/mongo-x-usage-24.png)

- Explain

![img](https://www.pdai.tech/images/db/mongo/mongo-x-usage-25.png)

- Schema

![img](https://www.pdai.tech/images/db/mongo/mongo-x-usage-21.png)

- 校验

![img](https://www.pdai.tech/images/db/mongo/mongo-x-usage-26.png)

## NoSQLBooster

NoSQLBooster是MongoDB CLI界面中非常流行的GUI工具。它正式名称为MongoBooster。NoSQLBooster是一个跨平台，它自带一些mongodb工具来管理数据库和监控服务器。这个Mongodb工具包括服务器监控工具，Visual Explain Plan，查询构建器，SQL查询，ES2017语法支持等。它有免费，个人和商业版本，当然，免费版本有一些功能限制。NoSQLBooster也可用于Windows，MacOS和Linux。支持 sql，免费版 支持 CSV、JSON 导入，但不支持 CSV、JSON 导出。集成了 mongodump/mongorestore，支持监控，和查询优化。 [下载链接在新窗口打开](https://nosqlbooster.com/downloads)

![img](https://www.pdai.tech/images/db/mongo/mongo-x-usage-22.webp)

## Robot3T

Robo 3T前身是Robomongo。支持Windows，MacOS和Linux系统。Robo 3T 1.3为您提供了对MongoDB 4.0和SCRAM-SHA-256（升级的mongo shell）的支持，支持从MongoDB SRV连接字符串导入，以及许多其他修复和改进。大家也可以找到之前的Robomongo，完全免费的版本使用。[下载地址在新窗口打开](https://robomongo.org/download)

![img](https://www.pdai.tech/images/db/mongo/mongo-x-usage-23.png)

早前的Robomongo

![img](https://www.pdai.tech/images/db/mongo/mongo-x-usage-28.png)

## Vs Code plugin

对于喜欢超级轻量级的，以及vscode粉来说，MongoDB vscode插件可以考虑下：

![img](https://www.pdai.tech/images/db/mongo/mongo-x-usage-27.png)

## 其它

> 因为其它不常用，且上面的几个工具已经足够了，这里只是给出其它工具的列表：

- [ClusterControl在新窗口打开](https://severalnines.com/)
  - 还要注册！它不仅支持MongoDB，还支持MySQL，MySQL复制，MySQL NDB集群，Galera集群，MariaDB，PostgreSQL，TimescaleDB，Docker和ProxySQL。
  - 为数据库基础架构提供全自动安全性，该基础架构具有单个图形用户界面，可操作和自动化MongoDB和MySQL数据库环境。它可通过YUM/APT提供回购，适用于Linux平台（RedHat，Centos，Ubuntu或Debian）
- [Mongo Management Studio在新窗口打开](http://mms.litixsoft.de/index.php?lang=de/)
  - 目前看只更新到v3.4
- [NoSQL Client在新窗口打开](https://www.nosqlclient.com/)
  - 这里有个[demo在新窗口打开](https://www.nosqlclient.com/demo/)
- [更多可以参考这里](https://developer.aliyun.com/article/721720)