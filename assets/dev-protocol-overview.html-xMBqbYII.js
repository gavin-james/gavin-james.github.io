import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as i,o as c,c as s,a as e,b as l,d as t,f as r}from"./app-IRwI16JE.js";const u={},a=r('<h1 id="♥网络协议和工具知识体系详解♥" tabindex="-1"><a class="header-anchor" href="#♥网络协议和工具知识体系详解♥" aria-hidden="true">#</a> ♥网络协议和工具知识体系详解♥</h1><blockquote><p>网络基础，尤其是网络协议（TCP/IP协议栈为主）在网络开发中极为重要，本系列带你梳理<strong>网络基础和协议相关的知识体系</strong>。</p></blockquote><h2 id="如何学习" tabindex="-1"><a class="header-anchor" href="#如何学习" aria-hidden="true">#</a> 如何学习</h2><blockquote><p><strong>第一步：学习计算机网络基础</strong>；构筑任何基础体系之前，需要学习这个专题的整体知识点（最好是一本完整的书），这里主要基于<code>《计算机网络(第五版)》</code>知识点梳理，不得不说这本书作者<strong>谢希仁</strong>画的PPT还是挺棒的。网络基础分三部分内容，主要包含如下：</p></blockquote>',4),d=e("strong",null,"网络基础的第一篇",-1),h={href:"https://www.cnblogs.com/googny/p/3682280.html",target:"_blank",rel:"noopener noreferrer"},P=r("<li>网络基础之二 - 网络7层协议，4层，5层 <ul><li><strong>网络基础的第二篇</strong>，我觉的一定要有全局框架观，构建全局观时建议分三步：第一步，理解全局的网络层次；第二步，理解每一层次中的常见的网络设备及功能；第三步，理解每一层中的常见协议。在此基础上，将其它知识点放置在相应的层次（很多网络上的零散知识点是没法帮你构筑完整的知识体系的，推荐你完整的看一本关于网络的书籍来构筑基础）</li></ul></li><li>网络基础之三 - IP 协议相关详解 <ul><li><strong>网络基础第三篇</strong>，主要阐述： <code>IP协议</code>（在网络层）及其配套协议（在数据链路层的<code>ARP协议</code>，在网络层的<code>ICMP，IGMP协议</code>，IPV6详解，网络地址转换 NAT等。</li></ul></li>",2),p=e("blockquote",null,[e("p",null,[e("strong",null,"第二步：学习传输层协议TCP/UDP"),l("；TCP/UDP是后面应用层协议的基础。")])],-1),_={href:"https://book.douban.com/subject/1088054/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://coolshell.cn/articles/11564.html",target:"_blank",rel:"noopener noreferrer"},g={href:"http://www.tcpipguide.com/buy.htm?free",target:"_blank",rel:"noopener noreferrer"},k=e("li",null,[l("网络协议 - UDP 协议详解 "),e("ul",null,[e("li",null,"基于TCP和UDP的协议非常广泛，所以也有必要对UDP协议进行详解")])],-1),T=r("<blockquote><p><strong>第三步：学习应用层协议</strong>；HTTP 基于TCP协议实现，web开发必学；DNS 基于UDP协议实现。</p></blockquote><ul><li>网络协议 - HTTP 协议详解 <ul><li>HTTP 协议详解，web开发必备</li></ul></li><li>网络协议 - DNS 相关详解 <ul><li>DNS的核心工作就是将域名翻译成计算机IP地址, 它是基于UDP协议实现的，本文将具体阐述DNS相关的概念，解析，调度原理（负载均衡和区域调度）等DNS相关的所有知识点</li></ul></li></ul><blockquote><p><strong>第四步：知识点贯穿理解</strong>；</p></blockquote><ul><li>知识点串联：输入URL 到页面加载过程详解 <ul><li>第一，将前面涉及网络协议特别是<code>TCP协议</code>和<code>HTTP协议</code>，<code>DNS解析</code>等等知识点贯穿；</li><li>第二，在此基础上介绍<code>浏览器渲染过程</code>，以及为<code>Web优化</code>提供基础。</li></ul></li></ul><blockquote><p><strong>第五步：相关工具等</strong>；</p></blockquote><ul><li>工具: netstat查看服务及监听端口详解 <ul><li>在Linux使用过程中，需要了解当前系统开放了哪些端口，并且要查看开放这些端口的具体进程和用户，可以通过netstat命令进行简单查询。</li></ul></li><li>工具: 网络抓包神器 tcpdump 使用详解 <ul><li>tcpdump 是一款强大的网络抓包工具，它使用 libpcap 库来抓取网络数据包，这个库在几乎在所有的 Linux/Unix 中都有。熟悉 tcpdump 的使用能够帮助你分析调试网络数据，本文将通过一个个具体的示例来介绍它在不同场景下的使用方法。。</li></ul></li><li>工具: Wireshark介绍及抓包分析 <ul><li>Wireshark（前称Ethereal）是一个网络封包分析软件.网络管理员使用Wireshark来检测网络问题，网络安全工程师使用Wireshark来检查资讯安全相关问题，开发者使用Wireshark来为新的通讯协定除错，普通使用者使用Wireshark来学习网络协定的相关知识。</li></ul></li></ul>",6);function f(m,C){const o=i("ExternalLinkIcon");return c(),s("div",null,[a,e("ul",null,[e("li",null,[l("网络基础之一 - 计算机网络基础部分梳理 "),e("ul",null,[e("li",null,[d,l("，主要来源于大学的课程《计算机网络(第五版)》知识点梳理，内容整理自"),e("a",h,[l("这里在新窗口打开"),t(o)]),l(", 但是作了调整和优化; 不得不说这本书作者谢希仁画的PPT还是挺棒的。")])])]),P]),p,e("ul",null,[e("li",null,[l("网络协议 - TCP 协议详解 "),e("ul",null,[e("li",null,[l("TCP是一个巨复杂的协议，关于TCP这个协议的细节，我还是推荐你去看W.Richard Stevens的"),e("a",_,[l("《TCP/IP 详解 卷1：协议》在新窗口打开"),t(o)]),l("。全网上讲TCP/IP的文章众多，多数是皮毛；本文梳理自 左耳朵耗子的文章"),e("a",b,[l("《TCP 的那些事儿》在新窗口打开"),t(o)]),l("，来帮助大家理解TCP/IP, 其中引用的图片在"),e("a",g,[l("这里在新窗口打开"),t(o)])])])]),k]),T])}const q=n(u,[["render",f],["__file","dev-protocol-overview.html.vue"]]);export{q as default};
