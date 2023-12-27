---
date: 2019-03-13
category:
  - 常用开发库
tag:
  - 常用开发库
---
# Hutool包 

> Hutool作为后起之秀，功能上也比较全。但是要注意一点，它的开源协议是：中国第一个开源协议[木兰宽松许可证, 第1版在新窗口打开](http://license.coscl.org.cn/MulanPSL)，对此在商业项目中需要谨慎些，在个人项目无所谓。

## 简介

Hutool是一个小而全的Java工具类库，通过静态方法封装，降低相关API的学习成本，提高工作效率，使Java拥有函数式语言般的优雅，让Java语言也可以“甜甜的”。

Hutool中的工具方法来自于每个用户的精雕细琢，它涵盖了Java开发底层代码中的方方面面，它既是大型项目开发中解决小问题的利器，也是小型项目中的效率担当；

Hutool是项目中“util”包友好的替代，它节省了开发人员对项目中公用类和公用工具方法的封装时间，使开发专注于业务，同时可以最大限度的避免封装不完善带来的bug。

### Hutool名称的由来

Hutool = Hu + tool，是原公司项目底层代码剥离后的开源库，“Hu”是公司名称的表示，tool表示工具。Hutool谐音“糊涂”，一方面简洁易懂，一方面寓意“难得糊涂”。

### Hutool如何改变我们的coding方式

Hutool的目标是使用一个工具方法代替一段复杂代码，从而最大限度的避免“复制粘贴”代码的问题，彻底改变我们写代码的方式。

以计算MD5为例：

- 【以前】打开搜索引擎 -> 搜“Java MD5加密” -> 打开某篇博客-> 复制粘贴 -> 改改好用
- 【现在】引入Hutool -> SecureUtil.md5()

Hutool的存在就是为了减少代码搜索成本，避免网络上参差不齐的代码出现导致的bug。

## 包含组件

一个Java基础工具类，对文件、流、加密解密、转码、正则、线程、XML等JDK方法进行封装，组成各种Util工具类，同时提供以下组件：

| 模块               | 介绍                                                         |
| ------------------ | ------------------------------------------------------------ |
| hutool-aop         | JDK动态代理封装，提供非IOC下的切面支持                       |
| hutool-bloomFilter | 布隆过滤，提供一些Hash算法的布隆过滤                         |
| hutool-cache       | 简单缓存实现                                                 |
| hutool-core        | 核心，包括Bean操作、日期、各种Util等                         |
| hutool-cron        | 定时任务模块，提供类Crontab表达式的定时任务                  |
| hutool-crypto      | 加密解密模块，提供对称、非对称和摘要算法封装                 |
| hutool-db          | JDBC封装后的数据操作，基于ActiveRecord思想                   |
| hutool-dfa         | 基于DFA模型的多关键字查找                                    |
| hutool-extra       | 扩展模块，对第三方封装（模板引擎、邮件、Servlet、二维码、Emoji、FTP、分词等） |
| hutool-http        | 基于HttpUrlConnection的Http客户端封装                        |
| hutool-log         | 自动识别日志实现的日志门面                                   |
| hutool-script      | 脚本执行封装，例如Javascript                                 |
| hutool-setting     | 功能更强大的Setting配置文件和Properties封装                  |
| hutool-system      | 系统参数调用封装（JVM信息等）                                |
| hutool-json        | JSON实现                                                     |
| hutool-captcha     | 图片验证码实现                                               |
| hutool-poi         | 针对POI中Excel的封装                                         |
| hutool-socket      | 基于Java的NIO和AIO的Socket封装                               |

可以根据需求对每个模块单独引入，也可以通过引入`hutool-all`方式引入所有模块。

## 文档

- [中文文档在新窗口打开](https://www.hutool.cn/docs/) 看这里
- [中文文档（备用）在新窗口打开](https://www.hutool.club/docs/)
- [参考API在新窗口打开](https://apidoc.gitee.com/loolly/hutool/)

## 安装

### Maven

在项目的pom.xml的dependencies中加入以下内容:

```xml
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.1.0</version>
</dependency>
```

### Gradle

```text
compile 'cn.hutool:hutool-all:5.1.0'
```

### 非Maven项目

点击以下任一链接，下载`hutool-all-X.X.X.jar`即可：

- [Maven中央库1在新窗口打开](https://repo1.maven.org/maven2/cn/hutool/hutool-all/5.1.0/)
- [Maven中央库2在新窗口打开](http://repo2.maven.org/maven2/cn/hutool/hutool-all/5.1.0/)

> 注意 Hutool 5.x支持JDK8+，对Android平台没有测试，不能保证所有工具类获工具方法可用。 如果你的项目使用JDK7，请使用Hutool 4.x版本

### 编译安装

访问Hutool的码云主页：[https://gitee.com/loolly/hutool在新窗口打开](https://gitee.com/loolly/hutool) 下载整个项目源码（v5-master或v5-dev分支都可）然后进入Hutool项目目录执行：

```bash
./hutool.sh install
```

然后就可以使用Maven引入了。