---
date: 2019-03-11
category:
  - 常用开发库
tag:
  - 常用开发库
---
# Apache Common包 

> Apache common不仅被成千上万开源工具使用，更是学习Java编程比较好的代码参考工具，效率工具。

## Apache Common包简介

Apache Commons是对JDK的拓展，包含了很多开源的工具，用于解决平时编程经常会遇到的问题，减少重复劳动。官网网址:http://commons.apache.org

## Common包包含哪些

- 请参考：[Apache Common官方网站在新窗口打开](http://commons.apache.org/)

我从官网上截了个图，主要功能如下, 其中我划线的是常用的：

![img](https://www.pdai.tech/images/develop/package/dev-package-common-1.png)

![img](https://www.pdai.tech/images/develop/package/dev-package-common-2.png)

## 常用包梳理

### Commons BeanUtils

针对Bean的一个工具集。由于Bean往往是有一堆get和set组成，所以BeanUtils也是在此基础上进行一些包装。它利用Java的反射机制，从动态的生成对bean的getter和setter的调用代码，到模拟创建一个动态的bean，等等。这个包看似简单，却是很多开源项目的基石：如在著名的Struts和Spring Framework中，我们都能找到BeanUtils的影子。大家猜猜看，有哪位名人是BeanUtils的作者之一？没错，就是Struts的创始人Craig McClanahan。

一个比较常用的功能是Bean Copy，也就是copy bean的属性。如果做分层架构开发的话就会用到，比如从PO（Persistent Object）拷贝数据到VO（Value Object）。

Commons BeanUtils一共包括如下5个包：

```java
org.apache.commons.beanutils – 核心包，定义一组Utils类和需要用到的接口规范

org.apache.commons.beanutils.converters – 转换String到需要类型的类，实现Converter接口

org.apache.commons.beanutils.locale –beanutils的locale敏感版本

org.apache.commons.beanutils.locale.converters– converters的locale敏感版本

org.apache.commons.collections – beanutils使用到的Collection类
```

### Commons Codec

是编码和解码组件，提供常用的编码和解码方法，如DES、SHA1、MD5、Base64、URL和Soundx等。

### Commons Collections

是一个集合组件，扩展了Java标准Collections API，对常用的集合操作进行了很好的封装、抽象和补充，在保证性能的同时大大简化代码。

我们先来浏览一下它的包结构。一共是12个：

```java
org.apache.commons.collections – CommonsCollections自定义的一组公用的接口和工具类

org.apache.commons.collections.bag – 实现Bag接口的一组类

org.apache.commons.collections.bidimap – 实现BidiMap系列接口的一组类

org.apache.commons.collections.buffer – 实现Buffer接口的一组类

org.apache.commons.collections.collection –实现java.util.Collection接口的一组类

org.apache.commons.collections.comparators– 实现java.util.Comparator接口的一组类

org.apache.commons.collections.functors –Commons Collections自定义的一组功能类

org.apache.commons.collections.iterators – 实现java.util.Iterator接口的一组类

org.apache.commons.collections.keyvalue – 实现集合和键/值映射相关的一组类

org.apache.commons.collections.list – 实现java.util.List接口的一组类

org.apache.commons.collections.map – 实现Map系列接口的一组类

org.apache.commons.collections.set – 实现Set系列接口的一组类
```

- 作为容器类的补充，我们可以找到Bag、Buffer、BidiMap、OrderedMap等等；
- 作为操作类的补充，我们可以找到CollectionUtils、IteratorUtils、ListUtils、SetUtils等等；
- 作为辅助类的补充，我们可以找到MapIterator、Closure、Predicate、Transformer等等；

### Commons Compress

是一个压缩、解压缩文件的组件，可以操作rar、cpio、Unix dump、tar、zip、gzip、XZ、Pack200和bzip2格式的压缩文件。

### Commons Configuration

是一个Java应用程序的配置管理工具，可以从properties或者xml文件中加载配置信息。

### Commons CSV

是一个用来读写各种Comma Separated Value(CSV)格式文件的Java类库。

### Commons Daemon

实现将普通的Java应用变成系统的后台服务,例如 Tomcat 就是利用这个项目来实现作为 Linux 和 Windows 的服务启动和停止的。

### Commons DBCP

数据库连接池。

### Commons DBUtils

是JDBC工具组件，对传统操作数据库的类进行二次封装，可以把结果集转化成List。

### Commons Digester

是XML到Java对象的映射工具集。

### Commons Email

是邮件操作组件，对Java Mail API进行了封装，提供了常用的邮件发送和接收类，简化邮件操作。该组件依赖Java Mail API。

### Commons Exec

提供一些常用的方法用来执行外部进程，如执行exe文件或命令行。

### Commons FileUpload

为Web应用程序或Servlet提供文件上传功能，Struts2和SpringMVC的文件上传组件。

### Commons IO

是处理IO的工具类包，对java.io进行扩展，提供了更加方便的IO操作。

### Commons JCI

提供通用的Java编译器接口。

### Commons Lang3

是处理Java基本对象方法的工具类包，该类包提供对字符、数组等基本对象的操作，弥补了java.lang api基本处理方法上的不足。

- [API 文档在新窗口打开](http://commons.apache.org/proper/commons-lang/javadocs/api-release/index.html)

```java
ArrayUtils – 用于对数组的操作，如添加、查找、删除、子数组、倒序、元素类型转换等；

BitField – 用于操作位元，提供了一些方便而安全的方法；

BooleanUtils – 用于操作和转换boolean或者Boolean及相应的数组；

CharEncoding – 包含了Java环境支持的字符编码，提供是否支持某种编码的判断；

CharRange – 用于设定字符范围并做相应检查；

CharSet – 用于设定一组字符作为范围并做相应检查；

CharSetUtils – 用于操作CharSet；

CharUtils – 用于操作char值和Character对象；

ClassUtils – 用于对Java类的操作，不使用反射；

ObjectUtils – 用于操作Java对象，提供null安全的访问和其他一些功能；

RandomStringUtils – 用于生成随机的字符串；

SerializationUtils – 用于处理对象序列化，提供比一般Java序列化更高级的处理能力；

StringEscapeUtils – 用于正确处理转义字符，产生正确的Java、JavaScript、HTML、XML和SQL代码；

StringUtils – 处理String的核心类，提供了相当多的功能；

SystemUtils – 在java.lang.System基础上提供更方便的访问，如用户路径、Java版本、时区、操作系统等判断；

Validate – 提供验证的操作，有点类似assert断言；

WordUtils – 用于处理单词大小写、换行等。
```

### Commons Logging

提供统一的日志接口，同时兼顾轻量级和不依赖于具体的实现。类包给中间件/日志工具开发者一个简单的日志操作抽象，允许程序开发人员使用不同的具体日志实现工具。

### Commons Math

轻量级自容器的数学和统计计算方法类包，包含大多数常用的数值算法。

### Commons Net

封装了各种网络协议的客户端，支持FTP、NNTP、SMTP、POP3、Telnet等协议。

### Commons Pool

提供了一整套用于实现对象池化的框架，以及若干各具特色的对象池实现，可以有效地减少处理对象池化时的工作量。类包用于提高像文件句柄、数据库连接、socket通信这类大对象的调用效率，简单的说就是一种对象一次创建多次使用的技术。

### Commons Primitives

提供了一个更小，更快和更易使用的对Java基本类型的支持。

### Commons Validator

提供了一个简单的、可扩展的框架来在一个XML文件中定义校验器(校验方法)和校验规则。支持校验规则的和错误消息的国际化。

### Apache HttpClient

曾经是Apache Commons的子项目，后来独立出来。HttpClient简化HTTP客户端与服务器的各种通讯，实现HTTP客户端程序（也就是浏览器程序）的功能。

## Common 包检索和使用

在这里检索吧：[Apache Common 包在新窗口打开](https://mvnrepository.com/artifact/org.apache.commons)

![img](https://www.pdai.tech/images/develop/package/dev-package-common-3.png)

## 参考文章

- https://blog.csdn.net/wiker_yong/article/details/23551209