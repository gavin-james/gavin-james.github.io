---
date: 2022-07-03
category:
  - NoSQL MongoDB
tag:
  - NoSQL MongoDB
---
# Mongo入门 - MongoDB整体生态 

> 很多人在学习Mongo时仅仅围绕着数据库功能，围绕着CRUD和聚合操作，但是MongoDB其实已经基本形成了它自身的生态了。我们在学习一项技能时一定要跳出使用的本身，要从高一点的格局上了解整个生态，这样会对你构筑知识体系有很大的帮助。

## 整体生态

![img](https://www.pdai.tech/images/db/mongo/mongo-y-echo-11.png)

## MongoDB Server

MongoDB数据库，包含如下核心功能：

![img](https://www.pdai.tech/images/db/mongo/mongo-y-echo-4.png)

- [社区版本在新窗口打开](https://www.mongodb.com/try/download/community)

![img](https://www.pdai.tech/images/db/mongo/mongo-y-echo-10.png)

- [企业版本在新窗口打开](https://www.mongodb.com/try/download/enterprise)

![img](https://www.pdai.tech/images/db/mongo/mongo-y-echo-9.png)

## MongoDB Cloud

[MongoDB Cloud在新窗口打开](https://docs.mongodb.com/cloud/)

![img](https://www.pdai.tech/images/db/mongo/mongo-y-echo-8.png)

## MongoDB Drivers

[MongoDB Drivers在新窗口打开](https://docs.mongodb.com/ecosystem/drivers/)

![img](https://www.pdai.tech/images/db/mongo/mongo-y-echo-6.png)

[驱动相关的文档在新窗口打开](https://docs.mongodb.com/drivers/java/)

![img](https://www.pdai.tech/images/db/mongo/mongo-y-echo-7.png)

## 工具相关

[MongoDB Tools在新窗口打开](https://docs.mongodb.com/tools/)

![img](https://www.pdai.tech/images/db/mongo/mongo-y-echo-5.png)

### MongoDB Atlas Open Service Broker

[Open Service Broker在新窗口打开](https://www.openservicebrokerapi.org/)

https://www.jdon.com/49640

### MongoDB Connector for BI

[MongoDB Connector for BI在新窗口打开](https://docs.mongodb.com/bi-connector/current/)

BI是指Business Intelligence，众所周知的BI工具有Tableau, MicroStrategy和Qlik等；而MongoDB BI Connector充当在mongod或mongos实例与BI工具之间转换查询和数据的层， 这样用户就可以使用SQL创建查询，可视化，图形化和报告等方式来展示MongoDB中的数据。

![img](https://www.pdai.tech/images/db/mongo/mongo-y-echo-1.png)

- `MongoDB DB`: 数据的存储
- `BI Connector`: 提供一个关系模式(Schema)，以及BI工具和MongoDB之间转换SQL查询
- `ODBC data source name (DSN)`: 连接配置数据和认证等.
- `BI Tool`: 数据分析和展示工具.

### MongoDB Charts

[MongoDB Charts在新窗口打开](https://docs.mongodb.com/charts/saas/)

负责MongoDB数据可视化的一个工具。

![img](https://www.pdai.tech/images/db/mongo/mongo-y-echo-2.png)

### MongoDB Command Line Interface (mongocli)

[MongoDB Command Line Interface (mongocli)在新窗口打开](https://docs.mongodb.com/mongocli/stable/)

通过命令行进行管理Mongo的工具，支持Cloud和On-premises，Cloud通过MongoDB Atlas支持；On-premises通过 MongoDB Cloud Manager 和 MongoDB Ops Manager支持。

### MongoDB Kubernetes Operator

[MongoDB Community Kubernetes Operator在新窗口打开](https://github.com/mongodb/mongodb-kubernetes-operator)

将MongoDB部署到Kubernetes集群的工具。

### MongoDB Compass

[**MongoDB Compass**在新窗口打开](https://docs.mongodb.com/compass/current/)

提供的对MongoDB进行界面化管理的工具。

> 需要注意：MongoDB 3.6+ 版本才支持这个工具；对于聚合操作的可视化是它的优势。

### MongoDB VsCode插件

[MongoDB for VS Code在新窗口打开](https://docs.mongodb.com/mongodb-vscode/)

MongoDB VsCode插件

![img](https://www.pdai.tech/images/db/mongo/mongo-y-echo-3.png)

### MongoDB Shell

[MongoDB Shell在新窗口打开](https://docs.mongodb.com/mongodb-shell/)

mongosh是一个MongoDB的shell工具。

### MongoDB Kafka Connector

[MongoDB Kafka Connector在新窗口打开](https://docs.mongodb.com/kafka-connector/current/)

MongoDB连接kafka的工具。

### MongoDB Spark Connector

[MongoDB Spark Connector在新窗口打开](https://docs.mongodb.com/spark-connector/current/)

MongoDB连接Spark的工具。

### MongoDB Database Tools

[MongoDB Database Tools在新窗口打开](https://docs.mongodb.com/database-tools/)

- 二进制导入导出 
  - `mongodump` Creates a binary export of the contents of a mongod database.
  - `mongorestore` Restores data from a mongodump database dump into a mongod or mongos
  - `bsondump` Converts BSON dump files into JSON.
- 数据导入导出 
  - `mongoimport` Imports content from an Extended JSON, CSV, or TSV export file.
  - `mongoexport` Produces a JSON or CSV export of data stored in a mongod instance.
- 诊断工具 
  - `mongostat` Provides a quick overview of the status of a currently running mongod or mongos instance.
  - `mongotop` Provides an overview of the time a mongod instance spends reading and writing data.
- GridFS 工具 
  - `mongofiles` Supports manipulating files stored in your MongoDB instance in GridFS objects.
