---
date: 2019-04-19
category:
  - 开发理论
tag:
  - 安全相关
---
# 开发安全实战 - Web安全测试平台(DVWA) 

> DVWA（Damn Vulnerable Web Application）是一个用来进行安全脆弱性鉴定的PHP/MySQL Web应用，旨在为安全专业人员测试自己的专业技能和工具提供合法的环境，帮助web开发者更好的理解web应用安全防范的过程。

## DVMA介绍

- [DVWA官网在新窗口打开](http://www.dvwa.co.uk/)
- [DVWA Github在新窗口打开](https://github.com/ethicalhack3r/DVWA)

![img](https://www.pdai.tech/images/security/dev-security-dvwa.png)

DVWA共有十个模块，分别是：

- Brute Force（暴力（破解））
- Command Injection（命令行注入）
- CSRF（跨站请求伪造）
- File Inclusion（文件包含）
- File Upload（文件上传）
- Insecure CAPTCHA （不安全的验证码）
- SQL Injection（SQL注入）
- SQL Injection（Blind）（SQL盲注）
- XSS（Reflected）（反射型跨站脚本）
- XSS（Stored）（存储型跨站脚本）

> 需要注意的是，DVWA 1.9的代码分为四种安全级别：Low，Medium，High，Impossible。我们可以通过比较四种级别的代码，接触到一些PHP代码审计的内容。

## DVWA的搭建

- 下载[phpStudy在新窗口打开](http://phpstudy.php.cn/)

phpStudy是集成了Apache和MySql的集成环境，下载好安装phpStudy,

运行时若显示缺少VC运行库: [32位的VC9在新窗口打开](http://www.microsoft.com/zh-CN/download/details.aspx?id=5582), [64位的VC9在新窗口打开](http://www.microsoft.com/zh-CN/download/details.aspx?id=15336)

安装好后运行127.0.0.1看是否可以出现界面

下载DVWA http://www.dvwa.co.uk/

下载后解压，放到phpStudy的WWW目录之下

- 配置一下相关文件首先最好先配置一下phpStudy的数据库密码

修改后将DVWA/confing下的config.inc.php.dist修改为config.inc.php,找到其中的把原来的db_password改为刚设置的

- 修改成功后访问127.0.0.1/DVWA

然后创建好了若没有问题便会自动跳转至登陆界面, 账号/密码：admin/password

## DVWA上的漏洞列表

DVMA正如他的名字一样是一个包含了很多漏洞的应用系统。DVWA的漏洞包括了OWASP oepen web application security project的web 10大漏洞。DVWA里面具体包括如下这些漏洞:

- 1.暴力破解漏洞通过brute force登录页面进入到该漏洞的测试位置。这个漏洞是用来测试暴力破解工具和展示不安全的弱密码。
- 2.命令执行漏洞在存在风险的系统上执行命令。
- 3.CSRF伪造跨站请求漏洞，允许攻击者去修改应用的管理员密码。
- 4.SQL注入，DVWA包括盲注和错误型注入两种SQL注入漏洞类型。
- 5.不安全的文件上传漏洞，允许攻击者上传恶意的文件到web服务器上
- 6.XSS跨站脚本漏洞，允许攻击者注入他们自己的脚本到web服务器上。DVWA系统里面包含了反射性XSS和存储型XSS两种类型。
- 7.文件包含漏洞，允许进行本地文件包含执行和远程文件包含执行
- 8.验证码绕过

## 参考文章

- [DVWA官网在新窗口打开](http://www.dvwa.co.uk/)
- [DVWA Github在新窗口打开](https://github.com/ethicalhack3r/DVWA)
- https://blog.csdn.net/u011781521/article/details/54933538
