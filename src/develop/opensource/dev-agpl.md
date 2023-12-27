---
date: 2019-08-14
category:
  - 开源协议
tag:
  - 协议
---
# AGPL v3 开源协议（慎用） 

> AGPL 是 GPL 的一个补充, 在GPL 的基础上加了一些限制。GPL 的约束生效前提是该软件"发布"，有的公司就使用 GPL 组件编写web 系统，但是不发布系统，只用这个系统在线提供服务，这样就避免了开源系统代码。而 AGPL 要求如果云服务(即 saas )用到的代码是该许可证，那云服务的代码也必须开源。

## 什么是 copyleft 许可证？

Copyleft许可证执行了Stallman在其GNU宣言中首先支持的原则。在20世纪60年代，开发人员公开共享所有帮助他人的源代码是很常见的，这创造了一种社区和协作的感觉。到了20世纪80年代，随着组织开始在其源代码上应用版权，这一趋势不再受欢迎。Copyleft与Copyright(版权)相反，它强制执行使用、修改和重新分发任何具有Copyleft许可证（如GPL）的源代码的权利。

## 什么是AGPL开源证书

> AGPL 是 GPL 的一个补充, 在GPL 的基础上加了一些限制。GPL 的约束生效前提是该软件"发布"，有的公司就使用 GPL 组件编写web 系统，但是不发布系统，只用这个系统在线提供服务，这样就避免了开源系统代码。而 AGPL 要求**如果云服务(即 saas )用到的代码是该许可证，那云服务的代码也必须开源**。

- **GPL**：GNU通用公共许可证（GNU General Public License）
  - **GPL v3协议**，意味着修改和使用其代码都需要开源，但是这是建立在软件分发的基础上，如果使用代码作为服务提供，而不分发软件，则不需要开源。这实际上是GPL协议本身的缺陷。
- **AGPL**：The GNU Affero General Public License
  - **AGPL v3协议**，也就是说，除非获得商业授权，否则无论以何种方式修改或者使用代码，都需要开源。

## 哪些组件使用了AGPL v3?

> itextpdf是比较有代表性的。

### iText5

> 使用itext一定要了解其版本历史，和License问题，在早前版本使用的是**MPL和LGPL双许可协议**，在5.x以上版本中使用的是**AGPLv3**(这个协议意味着，只有个人用途和开源的项目才能使用itext这个库，否则是需要收费的)

- iText 0.x-2.x/iTextSharp 3.x-4.x
  - 更新时间是2000-2009
  - 使用的是**MPL和LGPL双许可协议**
  - 最近的更新是2009年，版本号是**iText 2.1.7**/iTextSharp 4.1.6.0
  - 此时引入包的GAV版本如下：

```xml
<dependency>
  <groupId>com.lowagie</groupId>
  <artifactId>itext</artifactId>
  <version>2.1.7</version>
</dependency>
```

- iText 5.x和iTextSharp 5.x

  - 更新时间是2009-2016, 公司化运作，并标准化和提高性能

  - 开始使用**

    AGPLv3协议在新窗口打开

    ** 

    - **只有个人用途和开源的项目才能使用itext这个库，否则是需要收费的**

  - iTextSharp被设计成iText库的.NET版本，并且与iText版本号同步，iText 5.0.0和iTextSharp5.0.0同时发布

  - 新功能不在这里面增加，但是官方会修复重要的bug

  - 此时引入包的GAV版本如下：

```xml
<dependency>
  <groupId>com.itextpdf</groupId>
  <artifactId>itextpdf</artifactId>
  <version>5.5.13.3</version>
</dependency>
```

- iText 7.x
  - 更新时间是2016到现在
  - [AGPLv3协议在新窗口打开](https://github.com/itext/itextpdf/blob/develop/LICENSE.md)
  - 完全重写，重点关注可扩展性和模块化
  - 不适用iTextSharp这个名称，都统称为iText,有Java和.Net版本
  - JDK 1.7+
  - 此时引入包的GAV版本如下：

```xml
<dependency>
  <groupId>com.itextpdf</groupId>
  <artifactId>itext7-core</artifactId>
  <version>7.2.2</version>
  <type>pom</type>
</dependency>
```

注：iText变化后，GitHub上有团队基于4.x版本（MPL和LGPL双许可协议）fork了一个分支成为[OpenPDF在新窗口打开](https://github.com/LibrePDF/OpenPDF/)，并继续维护该项目。

### Berkeley DB

- Berkeley DB在新窗口打开
  - Berkeley DB是一个开源的文件数据库，介于关系数据库与内存数据库之间，使用方式与内存数据库类似，它提供的是一系列直接访问数据库的函数，而不是像关系数据库那样需要网络通讯、SQL解析等步骤。

## 参考文章

- https://blog.csdn.net/meanshe/article/details/125671349
- https://blog.csdn.net/iteye_16581/article/details/82271838
