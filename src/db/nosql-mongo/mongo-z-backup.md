---
date: 2022-07-19
category:
  - NoSQL MongoDB
tag:
  - NoSQL MongoDB
---
# Mongo进阶 - DB核心：备份恢复 

> mongoexport/mongoimport导入/导出的是JSON格式，而mongodump/mongorestore导入/导出的是BSON格式

## MongoDB的备份恢复

> mongoexport/mongoimport导入/导出的是JSON格式，而mongodump/mongorestore导入/导出的是BSON格式。

JSON可读性强但体积较大，BSON则是二进制文件，体积小但对人类几乎没有可读性。

在一些mongodb版本之间，BSON格式可能会随版本不同而有所不同，所以不同版本之间用mongodump/mongorestore可能不会成功，具体要看版本之间的兼容性。当无法使用BSON进行跨版本的数据迁移的时候，使用JSON格式即mongoexport/mongoimport是一个可选项。跨版本的mongodump/mongorestore并不推荐，实在要做请先检查文档看两个版本是否兼容（大部分时候是的）。

JSON虽然具有较好的跨版本通用性，但其只保留了数据部分，不保留索引，账户等其他基础信息。使用时应该注意。

### JSON格式：mongoexport/mongoimport

JSON可读性强但体积较大，JSON虽然具有较好的跨版本通用性，但其只保留了数据部分，不保留索引，账户等其他基础信息。

### BSON格式：mongoexport/mongoimport

BSON则是二进制文件，体积小但对人类几乎没有可读性。

## 参考文章

https://www.cnblogs.com/clsn/p/8244206.html