import{_ as s}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as d,c as r,a as t,b as a,d as n,f as o}from"./app-pgelmVnX.js";const c={},i=t("h1",{id:"hutool包",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#hutool包","aria-hidden":"true"},"#"),a(" Hutool包")],-1),p={href:"http://license.coscl.org.cn/MulanPSL",target:"_blank",rel:"noopener noreferrer"},u=o('<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>Hutool是一个小而全的Java工具类库，通过静态方法封装，降低相关API的学习成本，提高工作效率，使Java拥有函数式语言般的优雅，让Java语言也可以“甜甜的”。</p><p>Hutool中的工具方法来自于每个用户的精雕细琢，它涵盖了Java开发底层代码中的方方面面，它既是大型项目开发中解决小问题的利器，也是小型项目中的效率担当；</p><p>Hutool是项目中“util”包友好的替代，它节省了开发人员对项目中公用类和公用工具方法的封装时间，使开发专注于业务，同时可以最大限度的避免封装不完善带来的bug。</p><h3 id="hutool名称的由来" tabindex="-1"><a class="header-anchor" href="#hutool名称的由来" aria-hidden="true">#</a> Hutool名称的由来</h3><p>Hutool = Hu + tool，是原公司项目底层代码剥离后的开源库，“Hu”是公司名称的表示，tool表示工具。Hutool谐音“糊涂”，一方面简洁易懂，一方面寓意“难得糊涂”。</p><h3 id="hutool如何改变我们的coding方式" tabindex="-1"><a class="header-anchor" href="#hutool如何改变我们的coding方式" aria-hidden="true">#</a> Hutool如何改变我们的coding方式</h3><p>Hutool的目标是使用一个工具方法代替一段复杂代码，从而最大限度的避免“复制粘贴”代码的问题，彻底改变我们写代码的方式。</p><p>以计算MD5为例：</p><ul><li>【以前】打开搜索引擎 -&gt; 搜“Java MD5加密” -&gt; 打开某篇博客-&gt; 复制粘贴 -&gt; 改改好用</li><li>【现在】引入Hutool -&gt; SecureUtil.md5()</li></ul><p>Hutool的存在就是为了减少代码搜索成本，避免网络上参差不齐的代码出现导致的bug。</p><h2 id="包含组件" tabindex="-1"><a class="header-anchor" href="#包含组件" aria-hidden="true">#</a> 包含组件</h2><p>一个Java基础工具类，对文件、流、加密解密、转码、正则、线程、XML等JDK方法进行封装，组成各种Util工具类，同时提供以下组件：</p><table><thead><tr><th>模块</th><th>介绍</th></tr></thead><tbody><tr><td>hutool-aop</td><td>JDK动态代理封装，提供非IOC下的切面支持</td></tr><tr><td>hutool-bloomFilter</td><td>布隆过滤，提供一些Hash算法的布隆过滤</td></tr><tr><td>hutool-cache</td><td>简单缓存实现</td></tr><tr><td>hutool-core</td><td>核心，包括Bean操作、日期、各种Util等</td></tr><tr><td>hutool-cron</td><td>定时任务模块，提供类Crontab表达式的定时任务</td></tr><tr><td>hutool-crypto</td><td>加密解密模块，提供对称、非对称和摘要算法封装</td></tr><tr><td>hutool-db</td><td>JDBC封装后的数据操作，基于ActiveRecord思想</td></tr><tr><td>hutool-dfa</td><td>基于DFA模型的多关键字查找</td></tr><tr><td>hutool-extra</td><td>扩展模块，对第三方封装（模板引擎、邮件、Servlet、二维码、Emoji、FTP、分词等）</td></tr><tr><td>hutool-http</td><td>基于HttpUrlConnection的Http客户端封装</td></tr><tr><td>hutool-log</td><td>自动识别日志实现的日志门面</td></tr><tr><td>hutool-script</td><td>脚本执行封装，例如Javascript</td></tr><tr><td>hutool-setting</td><td>功能更强大的Setting配置文件和Properties封装</td></tr><tr><td>hutool-system</td><td>系统参数调用封装（JVM信息等）</td></tr><tr><td>hutool-json</td><td>JSON实现</td></tr><tr><td>hutool-captcha</td><td>图片验证码实现</td></tr><tr><td>hutool-poi</td><td>针对POI中Excel的封装</td></tr><tr><td>hutool-socket</td><td>基于Java的NIO和AIO的Socket封装</td></tr></tbody></table><p>可以根据需求对每个模块单独引入，也可以通过引入<code>hutool-all</code>方式引入所有模块。</p><h2 id="文档" tabindex="-1"><a class="header-anchor" href="#文档" aria-hidden="true">#</a> 文档</h2>',16),h={href:"https://www.hutool.cn/docs/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.hutool.club/docs/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://apidoc.gitee.com/loolly/hutool/",target:"_blank",rel:"noopener noreferrer"},k=o(`<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><h3 id="maven" tabindex="-1"><a class="header-anchor" href="#maven" aria-hidden="true">#</a> Maven</h3><p>在项目的pom.xml的dependencies中加入以下内容:</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>cn.hutool<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>hutool-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>5.1.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="gradle" tabindex="-1"><a class="header-anchor" href="#gradle" aria-hidden="true">#</a> Gradle</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>compile &#39;cn.hutool:hutool-all:5.1.0&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="非maven项目" tabindex="-1"><a class="header-anchor" href="#非maven项目" aria-hidden="true">#</a> 非Maven项目</h3><p>点击以下任一链接，下载<code>hutool-all-X.X.X.jar</code>即可：</p>`,8),m={href:"https://repo1.maven.org/maven2/cn/hutool/hutool-all/5.1.0/",target:"_blank",rel:"noopener noreferrer"},_={href:"http://repo2.maven.org/maven2/cn/hutool/hutool-all/5.1.0/",target:"_blank",rel:"noopener noreferrer"},b=t("blockquote",null,[t("p",null,"注意 Hutool 5.x支持JDK8+，对Android平台没有测试，不能保证所有工具类获工具方法可用。 如果你的项目使用JDK7，请使用Hutool 4.x版本")],-1),f=t("h3",{id:"编译安装",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#编译安装","aria-hidden":"true"},"#"),a(" 编译安装")],-1),x={href:"https://gitee.com/loolly/hutool",target:"_blank",rel:"noopener noreferrer"},H=o(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./hutool.sh <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后就可以使用Maven引入了。</p>`,2);function J(I,M){const e=l("ExternalLinkIcon");return d(),r("div",null,[i,t("blockquote",null,[t("p",null,[a("Hutool作为后起之秀，功能上也比较全。但是要注意一点，它的开源协议是：中国第一个开源协议"),t("a",p,[a("木兰宽松许可证, 第1版在新窗口打开"),n(e)]),a("，对此在商业项目中需要谨慎些，在个人项目无所谓。")])]),u,t("ul",null,[t("li",null,[t("a",h,[a("中文文档在新窗口打开"),n(e)]),a(" 看这里")]),t("li",null,[t("a",g,[a("中文文档（备用）在新窗口打开"),n(e)])]),t("li",null,[t("a",v,[a("参考API在新窗口打开"),n(e)])])]),k,t("ul",null,[t("li",null,[t("a",m,[a("Maven中央库1在新窗口打开"),n(e)])]),t("li",null,[t("a",_,[a("Maven中央库2在新窗口打开"),n(e)])])]),b,f,t("p",null,[a("访问Hutool的码云主页："),t("a",x,[a("https://gitee.com/loolly/hutool在新窗口打开"),n(e)]),a(" 下载整个项目源码（v5-master或v5-dev分支都可）然后进入Hutool项目目录执行：")]),H])}const P=s(c,[["render",J],["__file","dev-package-x-hu-tool.html.vue"]]);export{P as default};
