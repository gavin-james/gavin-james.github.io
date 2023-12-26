import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as g,o as r,c as a,a as t,b as e,d as o,f as s}from"./app-IRwI16JE.js";const l={},u=s('<h1 id="代码质量-代码质量管理-spotbugs插件详解" tabindex="-1"><a class="header-anchor" href="#代码质量-代码质量管理-spotbugs插件详解" aria-hidden="true">#</a> 代码质量 - 代码质量管理: SpotBugs插件详解</h1><blockquote><p>SpotBugs是Findbugs的继任者（Findbugs已经于2016年后不再维护），用于对代码进行静态分析，查找相关的漏洞；在本地IDE中可以配置SpotBugs插件进行检查。</p></blockquote><h2 id="spotbugs" tabindex="-1"><a class="header-anchor" href="#spotbugs" aria-hidden="true">#</a> SpotBugs</h2><blockquote><p>SpotBugs是Findbugs的继任者（Findbugs已经于2016年后不再维护），用于对代码进行静态分析，查找相关的漏洞; 它是一款自由软件，按照GNU Lesser General Public License 的条款发布。</p></blockquote><p>与查看源代码的Java编译器不同，静态分析会检查<strong>Java字节码</strong>（已编译的.class文件）是否存在错误模式。错误模式是一种经常容易出错的代码表达式/习惯用法。错误模式的产生可能有多种原因，其中包括：</p><ul><li>错误使用编程语言的某些特性</li><li>误用的API方法</li><li>在维护期间修改代码时误解变量</li><li>错别字，使用错误的运算符等</li></ul><p>在使用之前，我们需要先看下官网的简单介绍，特别是注意点</p><figure><img src="https://www.pdai.tech/images/develop/ut/dev-qt-spotbugs-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>然后我们看下它提供的哪些检查</p><figure><img src="https://www.pdai.tech/images/develop/ut/dev-qt-spotbugs-2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li><strong>Bad practice</strong> 不佳实践：常见代码错误，用于静态代码检查时进行缺陷模式匹配(如重写equals但没重写 hashCode，或相反情况等)</li><li><strong>Correctness</strong> 可能导致错误的代码(如空指针引用、无限循环等)</li><li><strong>Experimental</strong> 实验性</li><li><strong>Internationalization</strong> 国际化相关问题（如错误的字符串转换等）</li><li><strong>Malicious code vulnerability</strong> 可能受到的恶意攻击（如访问权限修饰符的定义等）</li><li><strong>Multithreaded correctness</strong> 多线程的正确性（如多线程编程时常见的同步，线程调度问题等）</li><li><strong>BogusMultithreaded correctness</strong> 多线程的正确性（如多线程编程时常见的同步，线程调度问题等）</li><li><strong>Performance</strong> 运行时性能问题（如由变量定义，方法调用导致的代码低效问题等）</li><li><strong>Security</strong> 安全问题（如HTTP，SQL，DB等）</li><li><strong>Dodgy code</strong> 导致自身错误的代码（如未确认的强制转换、冗余的空值检查等）</li></ul>',11),c={href:"https://spotbugs.readthedocs.io/en/latest/introduction.html",target:"_blank",rel:"noopener noreferrer"},p=s('<h2 id="idea-中使用spotbug插件" tabindex="-1"><a class="header-anchor" href="#idea-中使用spotbug插件" aria-hidden="true">#</a> IDEA 中使用SpotBug插件</h2><blockquote><p>IntelliJ SpotBugs插件提供静态字节代码分析，以从IntelliJ IDEA中查找Java代码中的错误。SpotBugs是Java的缺陷检测工具，它使用静态分析来查找 400 多种错误模式，例如空指针取消引用，无限递归循环，对Java库的错误使用和死锁。SpotBugs可以识别大型应用程序中的数百个严重缺陷（通常每 1000-2000 行非注释源语句中大约有 1 个缺陷）。</p></blockquote><ul><li><strong>下载插件</strong></li></ul><figure><img src="https://www.pdai.tech/images/develop/ut/dev-qt-spotbugs-3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>PS: FindBugs-IDEA的官方信息最后一次更新是在2016年10月17日，显然，这个不能用了，这也是为什么在Intellij的插件库中搜索关键词findbugs和BUG不显示改插件的原因。</p><ul><li><strong>扫描代码</strong></li></ul><figure><img src="https://www.pdai.tech/images/develop/ut/dev-qt-spotbugs-6.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li><strong>审查相关结果</strong>，针对修改</li></ul><figure><img src="https://www.pdai.tech/images/develop/ut/dev-qt-spotbugs-5.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="spotbugs-额外插件" tabindex="-1"><a class="header-anchor" href="#spotbugs-额外插件" aria-hidden="true">#</a> SpotBugs 额外插件</h2><blockquote><p>SpotBugs 还有对应的额外插件，用于<strong>扩展对应的规则，探测出更多的代码问题</strong>。</p></blockquote><ul><li><strong>fb-contrib</strong> 其中因 FindBugs分叉，SpotBugs需要使用-sb版本。</li></ul>',12),d={href:"https://github.com/mebigfatguy/fb-contrib",target:"_blank",rel:"noopener noreferrer"},b=t("ul",null,[t("li",null,[t("strong",null,"find-sec-bugs")])],-1),h=t("p",null,"针对安全（Security）增加了大致70+条规则",-1),f={href:"https://github.com/find-sec-bugs/find-sec-bugs",target:"_blank",rel:"noopener noreferrer"};function m(_,v){const i=g("ExternalLinkIcon");return r(),a("div",null,[u,t("p",null,[e("相关文档请参考"),t("a",c,[e("这里在新窗口打开"),o(i)]),e("。")]),p,t("p",null,[e("官网 : "),t("a",d,[e("https://github.com/mebigfatguy/fb-contrib"),o(i)])]),b,h,t("p",null,[e("官网: "),t("a",f,[e("https://github.com/find-sec-bugs/find-sec-bugs"),o(i)])])])}const x=n(l,[["render",m],["__file","dev-qt-spotbugs.html.vue"]]);export{x as default};