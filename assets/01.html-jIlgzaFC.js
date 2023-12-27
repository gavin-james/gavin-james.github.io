import{_ as l}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as d,c as r,a as n,b as s,d as e,f as i}from"./app-pgelmVnX.js";const c={},o=n("p",null,"[TOC]",-1),p=n("h1",{id:"_1、gradle是什么",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1、gradle是什么","aria-hidden":"true"},"#"),s(" 1、Gradle是什么")],-1),u=n("h2",{id:"_1-1-简介",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-1-简介","aria-hidden":"true"},"#"),s(" 1.1 简介")],-1),v={href:"https://docs.gradle.org/current/userguide/userguide.html",target:"_blank",rel:"noopener noreferrer"},m=i('<ul><li>Gradle是一个基于JVM的构建工具</li><li>是一款通用灵活的构建工具</li><li>支持maven， Ivy仓库</li><li>支持传递性依赖管理，而不需要远程仓库或者是pom.xml和ivy.xml配置文件</li><li>基于Groovy，build脚本使用Groovy编写</li><li>它使用一种基于Groovy的特定领域语言(DSL)来声明项目设置</li><li>目前也增加了基于Kotlin语言的kotlin-based DSL，抛弃了基于XML的各种繁琐配置</li><li>面向Java应用为主。当前其支持的语言C++、Java、Groovy、Kotlin、Scala和Swift，计划未来将支持更多的语言</li><li>gradle对多工程的构建支持很出色，工程依赖是gradle的第一功能</li><li>gradle支持局部构建</li><li>支持多方式依赖管理：包括从maven远程仓库、nexus私服、ivy仓库以及本地文件系统的jars或者dirs</li><li>gradle是第一个构建集成工具，与ant、maven、ivy有良好的相容相关性</li><li>轻松迁移：gradle适用于任何结构的工程，你可以在同一个开发平台平行构建原工程和gradle工程。通常要求写相关测试，以保证开发的插件的相似性，这种迁移可以减少破坏性，尽可能的可靠。这也是重构的最佳实践</li><li>gradle的整体设计是以作为一种语言为导向的，而非成为一个严格死板的框架</li><li>免费开源</li></ul><h2 id="_1-2-gradle发展史" tabindex="-1"><a class="header-anchor" href="#_1-2-gradle发展史" aria-hidden="true">#</a> 1.2 Gradle发展史</h2><p>ant-----ivy</p><ul><li><p>2000年</p></li><li><p>使用XML作为一种格式来写构建脚本</p></li><li><p>XML是分层的，不利于程序的编程，而且当XML文件变大以后变得难以管理</p></li><li><p>tomcat仍然使用的ant进行项目搭建</p></li></ul><p>maven----resipotory</p><ul><li>2004年</li><li>依赖xml</li></ul><p>gradle</p><ul><li><p>2012年</p></li><li><p>是一个基于Apache Ant和Apache Maven概念的项目构建工具</p></li><li><p>它使用一种基于<code>Groovy</code>的特定领域语言(DSL)来声明项目设置，抛弃了基于XML的各种繁琐配置</p></li><li><p>面向Java应用为主，当前其支持的语言限于Jdava、Groovy和Scala，计划未来将支持更多的语言</p></li></ul><p>生存周期：</p><ul><li>依赖约定和能够通过网络下载依赖关系。</li><li>Maven的主要好处是它的生命周期。虽然接连的多个项目生命周期相同，这是以灵活性为代价的</li></ul><h2 id="_1-3-为什么使用groovy" tabindex="-1"><a class="header-anchor" href="#_1-3-为什么使用groovy" aria-hidden="true">#</a> 1.3 为什么使用Groovy</h2><p>完整的Gradle API是使用Groovy语言设计的</p><ul><li><p>这是基于XML内部DSL的优点</p></li><li><p>Gradle是其核心的通用构建工具;它的主要焦点是Java项目</p></li><li><p>在这些项目中，团队成员要熟悉Java，这是为了更好的构建透明，给所有团队成员的项目</p></li><li><p>类似于Python , Groovy或Ruby语言是最好的构建框架</p></li><li><p>为什么Groovy被选中?这是因为它为使用ava的人提供了迄今为止最大的透明度。Groovy的基本语法与ava是一样的</p></li></ul><p>Java, Groovy, Scala 语言可以混写，最终都会被编成.class字节码文件</p><ul><li>Groovy可以调用JVM的方法</li></ul><h1 id="_2、gradle安装配置" tabindex="-1"><a class="header-anchor" href="#_2、gradle安装配置" aria-hidden="true">#</a> 2、Gradle安装配置</h1>',16),b={href:"https://services.gradle.org/distributions/",target:"_blank",rel:"noopener noreferrer"},g=i(`<p>配置环境变量：</p><ol><li>GRADLE_HOME+安装的目录</li><li>path：加上%GRADLE_HOME%\\bin</li><li>本地仓库构建：GRADLE_USER_HOME+MAVEN的仓库</li><li>镜像配置：在build.gradle中加上</li></ol><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>allprojects <span class="token punctuation">{</span>
    repositories <span class="token punctuation">{</span>
        <span class="token comment">//使gradle先加载本地仓库再去加载中央仓库</span>
        <span class="token function">mavenLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        maven <span class="token punctuation">{</span>
            url <span class="token string">&#39;https://maven.aliyun.com/repository/public/&#39;</span>
        <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span>
            url <span class="token string">&#39;https://maven.aliyun.com/repository/google/&#39;</span>
        <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span>
            url <span class="token string">&#39;https://maven.aliyun.com/repository/gradle-plugin/&#39;</span>
        <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span>
            url <span class="token string">&#39;https://maven.aliyun.com/repository/spring/&#39;</span>
        <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span>
            url <span class="token string">&#39;https://maven.aliyun.com/repository/spring-plugin/&#39;</span>
        <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span>
            url <span class="token string">&#39;https://maven.aliyun.com/repository/grails-core/&#39;</span>
        <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span>
            url <span class="token string">&#39;https://maven.aliyun.com/repository/apache-snapshots/&#39;</span>
        <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span>
            url <span class="token string">&#39;https://repo.spring.io/&#39;</span>
        <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span>
            url <span class="token string">&#39;https://repo.spring.io/plugins-release&#39;</span>
        <span class="token punctuation">}</span>
        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">jcenter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//指定jdk版本</span>
    sourceCompatibility <span class="token operator">=</span> <span class="token number">8</span>
    <span class="token comment">//指定编码格式</span>
    tasks<span class="token punctuation">.</span><span class="token function">withType</span><span class="token punctuation">(</span>JavaCompile<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        options<span class="token punctuation">.</span>encoding <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;UTF-8&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//配置子项目的资源库</span>
subprojects <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_3、项目构建" tabindex="-1"><a class="header-anchor" href="#_3、项目构建" aria-hidden="true">#</a> 3、项目构建</h1><h2 id="_3-1gradle构建脚本" tabindex="-1"><a class="header-anchor" href="#_3-1gradle构建脚本" aria-hidden="true">#</a> 3.1Gradle构建脚本</h2><p>每个Gradle生成表示一个或多个项目</p><ul><li><p>一个项目表示一个JAR库或Web应用程序，也可能表示由其他项目产生的JAR文件组装的ZIP</p></li><li><p>简单地说，一个项目是由不同的<code>任务</code>组成</p></li><li><p>一个任务是指构建执行的一块工作</p></li><li><p>任务可能是编译一些类，创建一个]AR，产生的]avadoc或发布一些归档文件库</p></li></ul><p>Gradle提供了一个域特定语言(DSL)，用于描述构建。它使用Groovy语言，使其更容易来形容和构建。</p><ul><li>Gradle中的每一个构建脚本使用UTF-8进行编码保存，并命名为build.gradle</li></ul><h3 id="_3-1-1-创建build-gradle文件" tabindex="-1"><a class="header-anchor" href="#_3-1-1-创建build-gradle文件" aria-hidden="true">#</a> 3.1.1 创建build.gradle文件</h3><ul><li><p>gradle最小运算单元：task</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>task firstgvy{
    doLast {
        println(&#39;this is the first gradle&#39;)
    }
}
task upper{
    doLast {
        String expStr = &#39;yyj&#39;
        println &quot;original:&quot;+expStr
        println &quot;upper case:&quot;+expStr.toUpperCase()
    }
}
task count{
    doLast {
        4.times {
            print &quot;$it &quot;
        }
        println(&quot;&quot;)
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>终端执行</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 在Execution阶段执行groovy任务，3阶段一起执行
# -q 静默状态执行，Log只显示错误日志
F:\\codes_202103\\gradlestudy&gt;gradle -q firstgvy
this is the first gradle
F:\\codes_202103\\gradlestudy&gt;gradle -q upper
original:yyj
upper case:YYJ
F:\\codes_202103\\gradlestudy&gt;gradle -q count
0 1 2 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_3-1-2-build的三个阶段" tabindex="-1"><a class="header-anchor" href="#_3-1-2-build的三个阶段" aria-hidden="true">#</a> 3.1.2 build的三个阶段</h3><p>gradle构建的生命周期主要分为三个阶段，Initialization , Configuration，Execution</p><ul><li><p>lnitialization : Gradle支持单个或多个工程的构建</p><ul><li>Gradle决定哪些工程将参与到当前构建过程，并为每一个这样的工程创建一个<code>Project</code>实例</li><li>一般情况下，参与构建的工程信息将在<code>settings.gradle</code>中定义 <ul><li>settings.gradle 存放工程信息</li></ul></li></ul></li><li><p>Configuration:</p><ul><li>在这一阶段，配置project的实例</li><li>所有工程的构建脚本都将被执行 <ul><li>Task , configuration和许多其他的对象将被创建和配置</li></ul></li></ul></li><li><p>Execution :</p><ul><li>在之前的configuration阶段，task的一个子集被创建并配置 <ul><li>这些子集来自于作为参数传入gradle命令的task名字</li><li>在execution阶段，这一子集将被依次执行</li></ul></li></ul></li></ul><p>问题: doLast语句处于哪个阶段?</p><ul><li>到执行阶段，3阶段都执行</li></ul><p>2类task</p><ul><li><p>加doLst</p><ul><li>在Execution阶段执行</li></ul></li><li><p>不加doLast</p><ul><li>在Configuration阶段执行</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>task firstgvy{
//    doLast {
        println(&#39;this is the first gradle&#39;)
//    }
}

println &quot;this is the outside gradle&quot;
task secondgvy{
    println &quot;this is the inside gradle&quot;
    doLast {
        println(&#39;this is the second gradle&#39;)
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 只走到配置阶段执行
D:\\Coding\\OnlineStudy\\gradlestudy&gt;gradle

&gt; Configure project :
this is the first gradle
this is the outside gradle
this is the inside gradle

&gt; Task :help

Welcome to Gradle 6.8.3.

To run a build, run gradle &lt;task&gt; ...

To see a list of available tasks, run gradle tasks

To see a list of command-line options, run gradle --help

To see more detail about a task, run gradle help --task &lt;task&gt;

For troubleshooting, visit https://help.gradle.org

BUILD SUCCESSFUL in 992ms
1 actionable task: 1 executed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-3-groovy的jdk方法" tabindex="-1"><a class="header-anchor" href="#_3-1-3-groovy的jdk方法" aria-hidden="true">#</a> 3.1.3 groovy的JDK方法</h3><ul><li>Groovy增加了很多有用的方法到标准的Java类 <ul><li>如从Java API可迭代实现它遍历Iterable接口的元素的each方法</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>task groovyJDKMethod{
    String myName = &quot;yyj&quot;
    myName.each(){
        println &quot;\${it}&quot;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-2-gradle任务" tabindex="-1"><a class="header-anchor" href="#_3-2-gradle任务" aria-hidden="true">#</a> 3.2 Gradle任务</h2><ul><li>不加{}也能执行</li><li>加{}形成闭包</li></ul><h3 id="_3-2-1-任务依赖" tabindex="-1"><a class="header-anchor" href="#_3-2-1-任务依赖" aria-hidden="true">#</a> 3.2.1 任务依赖</h3><h4 id="方式1-参数" tabindex="-1"><a class="header-anchor" href="#方式1-参数" aria-hidden="true">#</a> 方式1~参数</h4><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>task groovyJDKMethod<span class="token punctuation">{</span>
    String myName <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;yyj&quot;</span></span>
    <span class="token comment">//JDK String.each方法</span>
    myName<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        println <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">it</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

task <span class="token function">wdf</span><span class="token punctuation">(</span>dependsOn<span class="token punctuation">:</span>groovyJDKMethod<span class="token punctuation">)</span><span class="token punctuation">{</span>
    doLast<span class="token punctuation">{</span>
        println <span class="token interpolation-string"><span class="token string">&quot;wonderful!&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>输出<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
D<span class="token punctuation">:</span>\\Coding\\OnlineStudy\\gradlestudy<span class="token operator">&gt;</span>gradle <span class="token operator">-</span>q wdf
y
y
j
wonderful<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="方式2-task1-dependson-task2" tabindex="-1"><a class="header-anchor" href="#方式2-task1-dependson-task2" aria-hidden="true">#</a> 方式2~task1.dependsOn task2</h4><ul><li><p>要将一个任务依赖于另一个任务，这意味着当一个任务完成时，另一个任务将开始</p></li><li><p>每个任务都使用任务名称进行区分</p></li><li><p>任务名称集合由其任务集合引用</p></li><li><p>要引用另一个项目中的任务，应该使用项目路径作为相应任务名称的前缀</p></li></ul><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>task upper<span class="token punctuation">{</span>
    doLast <span class="token punctuation">{</span>
        String expStr <span class="token operator">=</span> <span class="token string">&#39;yyj&#39;</span>
        println <span class="token interpolation-string"><span class="token string">&quot;original:&quot;</span></span><span class="token operator">+</span>expStr
        println <span class="token interpolation-string"><span class="token string">&quot;upper case:&quot;</span></span><span class="token operator">+</span>expStr<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
task count<span class="token punctuation">{</span>
    doLast <span class="token punctuation">{</span>
        <span class="token number">4</span><span class="token punctuation">.</span>times <span class="token punctuation">{</span>
            print <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">it</span></span><span class="token string"> &quot;</span></span>
        <span class="token punctuation">}</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

count<span class="token punctuation">.</span>dependsOn upper
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>输出<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
D<span class="token punctuation">:</span>\\Coding\\OnlineStudy\\gradlestudy<span class="token operator">&gt;</span>gradle <span class="token operator">-</span>q count
upper <span class="token keyword">case</span><span class="token punctuation">:</span>YYJ
<span class="token number">0</span> <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="方式3-使用闭包" tabindex="-1"><a class="header-anchor" href="#方式3-使用闭包" aria-hidden="true">#</a> 方式3~使用闭包</h4><ul><li>任务通过闭包释放，如果在构建脚本中使用闭包，依赖于多个任务对象</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>task upper{
    doLast {
        String expStr = &#39;yyj&#39;
        println &quot;original:&quot;+expStr
        println &quot;upper case:&quot;+expStr.toUpperCase()
    }
}

upper.dependsOn{
    tasks.findAll{
        task-&gt;task.name.startsWith(&#39;lib&#39;)
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-2-定位任务" tabindex="-1"><a class="header-anchor" href="#_3-2-2-定位任务" aria-hidden="true">#</a> 3.2.2 定位任务</h3><ul><li><p>如果要查找在构建文件中定义的任务，则必须使用相应的标准项目属性</p><ul><li>这意味着每个任务都可以作为项目的属性，使用任务名称作为属性名称</li></ul></li><li><p>还可以通过任务集合使用所有属性</p></li></ul><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>task yyj
println yyj<span class="token punctuation">.</span>name
println project<span class="token punctuation">.</span>yyj<span class="token punctuation">.</span>name

println tasks<span class="token punctuation">.</span>yyj<span class="token punctuation">.</span>name
println tasks<span class="token punctuation">[</span><span class="token string">&#39;yyj&#39;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>name
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>输出<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
D<span class="token punctuation">:</span>\\Coding\\OnlineStudy\\gradlestudy<span class="token operator">&gt;</span>gradle <span class="token operator">-</span>q yyj
yyj
yyj
yyj
yyj
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-3-向任务添加描述" tabindex="-1"><a class="header-anchor" href="#_3-2-3-向任务添加描述" aria-hidden="true">#</a> 3.2.3 向任务添加描述</h3><ul><li>使用description关键字：可以向任务添加描述，增加可读性</li></ul><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>task <span class="token function">copyTask</span><span class="token punctuation">(</span>type<span class="token punctuation">:</span>Copy<span class="token punctuation">)</span><span class="token punctuation">{</span>
    description <span class="token string">&#39;Copy the resource directory to the target directory&#39;</span>
    from <span class="token string">&#39;resouces&#39;</span>
    into <span class="token string">&#39;target&#39;</span>
    <span class="token function">include</span><span class="token punctuation">(</span><span class="token string">&#39;**/*.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;**/*.xml&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;**/*.properties&#39;</span><span class="token punctuation">)</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;description applied&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>输出<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
D<span class="token punctuation">:</span>\\Coding\\OnlineStudy\\gradlestudy<span class="token operator">&gt;</span>gradle <span class="token operator">-</span>q copyTask
description applied
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-4-跳过任务" tabindex="-1"><a class="header-anchor" href="#_3-2-4-跳过任务" aria-hidden="true">#</a> 3.2.4 跳过任务</h3><ul><li>如果用于跳过任务的逻辑不能用谓词表示，则可以使用stopExecutionException <ul><li>如果操作抛出此异常，则会跳过此操作的进一步执行以及此任务的任何后续操作的执行, 构建继续执行下一个任务</li></ul></li></ul><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>task compile<span class="token punctuation">{</span>
    doLast<span class="token punctuation">{</span>
        println <span class="token interpolation-string"><span class="token string">&quot;compile.&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// compile的前置任务：如果这个执行异常，compile不执行</span>
compile<span class="token punctuation">.</span>doFirst<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Exception</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

task <span class="token function">myTask</span><span class="token punctuation">(</span>dependsOn<span class="token punctuation">:</span> <span class="token string">&#39;compile&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    doLast<span class="token punctuation">{</span>
        println <span class="token interpolation-string"><span class="token string">&quot;myTask.&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_4、gradle依赖管理" tabindex="-1"><a class="header-anchor" href="#_4、gradle依赖管理" aria-hidden="true">#</a> 4、Gradle依赖管理</h1><ul><li><p>Gradle构建脚本定义了构建项目的过程</p><ul><li>每个项目包含一些依赖项和一些发表项 <ul><li>依赖性意味着支持构建项目的东西 <ul><li>例如来自其他项目的所需JAR文件以及类路径中的外部JAR</li></ul></li><li>发布项目的结果 <ul><li>如测试类文件和构建文件，如war文件。</li></ul></li></ul></li></ul></li><li><p>Gradle负责构建和发布结果</p><ul><li>发布基于定义的任务</li><li>可能希望将文件复制到本地目录，或将其上传到远程Maven或lvy存储库，或者可以在同一个多项目构建中使用另一个项目的文件</li></ul></li></ul><h2 id="_4-1-声明依赖关系" tabindex="-1"><a class="header-anchor" href="#_4-1-声明依赖关系" aria-hidden="true">#</a> 4.1 声明依赖关系</h2><p>Gradle遵循一些特殊语法来定义依赖关系</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token comment">// 引用java插件:引入大量task，如clean,jar,build,init,wrapper,javadoc,check,test</span>
apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;java&#39;</span>

<span class="token comment">// maven仓库</span>
repositories <span class="token punctuation">{</span>
    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// maven的scope对应gradle的group</span>
<span class="token comment">// 依赖关系</span>
dependencies<span class="token punctuation">{</span>
    compile group<span class="token punctuation">:</span> <span class="token string">&#39;org.hibernate&#39;</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span><span class="token string">&#39;hibernate-core&#39;</span><span class="token punctuation">,</span> version<span class="token punctuation">:</span><span class="token string">&#39;5.4.2.Final&#39;</span>
    testCompile group<span class="token punctuation">:</span> <span class="token string">&#39;junit&#39;</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span><span class="token string">&#39;junit&#39;</span><span class="token punctuation">,</span> version<span class="token punctuation">:</span><span class="token string">&#39;5.+&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-2-依赖关系配置" tabindex="-1"><a class="header-anchor" href="#_4-2-依赖关系配置" aria-hidden="true">#</a> 4.2 依赖关系配置</h2><p>在对应的scope范围内生效：</p><ul><li><p>依赖关系配置只是定义了一组依赖关系</p><ul><li>使用此功能声明从Web下载外部依赖关系</li></ul></li><li><p>定义了以下不同的标准配置</p><ul><li>编译【被弃用】 <ul><li>编译项目的生产源所需的依赖关系</li></ul></li><li>运行时 <ul><li>运行时生产类所需的依赖关系</li><li>默认情况下，还包括编译时依赖项</li></ul></li><li>测试编译 <ul><li>编译项目测试源所需的依赖项</li><li>默认情况下，它包括编译的产生的类和编译时的依赖</li></ul></li><li>测试运行时–运行测试所需的依赖关系 <ul><li>默认情况下，它包括运行时和测试编译依赖项</li></ul></li></ul></li></ul><h3 id="_4-2-1-java用于声明依赖的配置" tabindex="-1"><a class="header-anchor" href="#_4-2-1-java用于声明依赖的配置" aria-hidden="true">#</a> 4.2.1 Java用于声明依赖的配置</h3><table><thead><tr><th style="text-align:left;">配置名称</th><th style="text-align:left;">角色</th><th style="text-align:left;">Consumable?</th><th style="text-align:left;">Resolvable?</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><code>api</code></td><td style="text-align:left;">声明 API 依赖项</td><td style="text-align:left;">no</td><td style="text-align:left;">no</td><td style="text-align:left;">这是您声明依赖项的地方，这些依赖项可传递地导出到使用者，用于编译时和运行时。</td></tr><tr><td style="text-align:left;"><code>implementation</code></td><td style="text-align:left;">声明实现依赖</td><td style="text-align:left;">no</td><td style="text-align:left;">no</td><td style="text-align:left;">这是您声明纯粹内部的依赖项的地方，并不打算向消费者公开（它们在运行时仍然向消费者公开）。</td></tr><tr><td style="text-align:left;"><code>compileOnly</code></td><td style="text-align:left;">声明仅编译依赖项</td><td style="text-align:left;">no</td><td style="text-align:left;">no</td><td style="text-align:left;">这是您声明在编译时需要但在运行时不需要的依赖项的地方。这通常包括在运行时发现的依赖项。</td></tr><tr><td style="text-align:left;"><code>compileOnlyApi</code></td><td style="text-align:left;">声明仅编译 API 依赖项</td><td style="text-align:left;">no</td><td style="text-align:left;">no</td><td style="text-align:left;">您可以在此处声明模块和使用者在编译时需要的依赖项，但在运行时不需要。这通常包括在运行时发现的依赖项</td></tr><tr><td style="text-align:left;"><code>runtimeOnly</code></td><td style="text-align:left;">声明运行时依赖项</td><td style="text-align:left;">no</td><td style="text-align:left;">no</td><td style="text-align:left;">这是您声明仅在运行时需要的依赖项，而不是在编译时需要的依赖项。</td></tr><tr><td style="text-align:left;"><code>testImplementation</code></td><td style="text-align:left;">测试依赖</td><td style="text-align:left;">no</td><td style="text-align:left;">no</td><td style="text-align:left;">这是您声明用于编译测试的依赖项的地方。</td></tr><tr><td style="text-align:left;"><code>testCompileOnly</code></td><td style="text-align:left;">声明测试只编译依赖项</td><td style="text-align:left;">no</td><td style="text-align:left;">no</td><td style="text-align:left;">这是您声明仅在测试编译时需要但不应泄漏到运行时的依赖项的地方。这通常包括在运行时发现的依赖项。</td></tr><tr><td style="text-align:left;"><code>testRuntimeOnly</code></td><td style="text-align:left;">声明测试运行时依赖项</td><td style="text-align:left;">no</td><td style="text-align:left;">no</td><td style="text-align:left;">这是您声明仅在测试运行时需要的依赖项，而不是在测试编译时需要的依赖项。</td></tr></tbody></table><p>下图描述了在使用Java库插件时配置。</p><figure><img src="https://docs.gradle.org/current/userguide/img/java-library-ignore-deprecated-main.png" alt="配置" tabindex="0" loading="lazy"><figcaption>配置</figcaption></figure><ul><li><p>绿色的配置是用户应该用于声明依赖的配置</p></li><li><p>粉红色中的配置是组件编译或对库运行时使用的配置</p></li><li><p>蓝色配置是组件内部的，因为它可以使用</p></li><li></li></ul><p>下图描述了测试配置设置:</p><figure><img src="https://docs.gradle.org/current/userguide/img/java-library-ignore-deprecated-test.png" alt="测试配置" tabindex="0" loading="lazy"><figcaption>测试配置</figcaption></figure><h2 id="_4-3-外部依赖" tabindex="-1"><a class="header-anchor" href="#_4-3-外部依赖" aria-hidden="true">#</a> 4.3 外部依赖</h2><p>外部依赖是一种依赖</p><ul><li>这是对当前构建之外构建的一些文件的依赖，并且存储在某种类型的存储库中 <ul><li>例如:Maven central , corporate Maven或lvy repository或本地文件系统中的目录</li></ul></li></ul><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>dependencies<span class="token punctuation">{</span>
    compile group<span class="token punctuation">:</span> <span class="token string">&#39;org.hibernate&#39;</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span><span class="token string">&#39;hibernate-core&#39;</span><span class="token punctuation">,</span> version<span class="token punctuation">:</span><span class="token string">&#39;5.4.2.Final&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-4-存储库" tabindex="-1"><a class="header-anchor" href="#_4-4-存储库" aria-hidden="true">#</a> 4.4 存储库</h2><ul><li><p>在添加外部依赖关系时，Gradle在存储库中查找它们</p><ul><li>存储库只是文件的集合，按分组，名称和版本来组织构造</li><li>默认情况下，Gradle不定义任何存储库</li><li>必须至少明确地定义一个存储库</li></ul></li><li><p>一个Java工程通常会依赖于外部的jar包，Gradle可以使用Maven的仓库来获取或者发布相应的jar包</p></li></ul><p>setting.gradle：</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>pluginManagement<span class="token punctuation">{</span>
    repositories<span class="token punctuation">{</span>
        <span class="token comment">//阿里云镜像</span>
        maven<span class="token punctuation">{</span> url <span class="token string">&#39;http://maven.aliyun.com/nexus/content/groups/public/&#39;</span><span class="token punctuation">}</span>
        maven<span class="token punctuation">{</span> url <span class="token string">&#39;http://maven.aliyun.com/nexus/content/repositories/jcenter&#39;</span><span class="token punctuation">}</span>
        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">gradlePluginPortal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        maven <span class="token punctuation">{</span>
            url <span class="token string">&#39;https://repo.spring.io/plugins-release&#39;</span>
        <span class="token punctuation">}</span>
<span class="token comment">//        if(version.endsWith(&#39;BUILD-SNAPSHOT&#39;)){</span>
<span class="token comment">//            maven{ url &quot;https://repo.spring.io/snapshot&quot;}</span>
<span class="token comment">//        }</span>
    <span class="token punctuation">}</span>
    resolutionStrategy<span class="token punctuation">{</span>
        eachPlugin<span class="token punctuation">{</span>
<span class="token comment">//            if(request.id.id == &quot;org.jetbrains.kotlin.jvm&quot;){</span>
<span class="token comment">//                useVersion &quot;\${kotlinVersion}&quot;</span>
<span class="token comment">//            }</span>
<span class="token comment">//            if(request.id.id == &quot;org.jetbrains.kotlin.plugin.spring&quot;){</span>
<span class="token comment">//                useVersion &quot;\${kotlinVersion}&quot;</span>
<span class="token comment">//            }</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
plugins<span class="token punctuation">{</span>
<span class="token comment">//    id &#39;com.gradle.enterprise&#39; version &quot;6.8.3&quot;</span>
<span class="token punctuation">}</span>
rootProject<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;gradlestudy&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-5-发布文件" tabindex="-1"><a class="header-anchor" href="#_4-5-发布文件" aria-hidden="true">#</a> 4.5 发布文件</h2><ul><li><p>依赖关系配置也用于发布文件，这些已发布的文件称为工件</p><ul><li>通常，我们使用插件来定义工件</li><li>但是需要告诉Gradle在哪里发布文件 <ul><li>可以通过将存储库附加到上传存档任务来实现此目的</li></ul></li></ul></li><li><p>执行时，Gradle将根据项目需求生成并上传pom.xml，在build.gradle文件中使用此代码</p></li></ul><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;maven&#39;</span>

uploadArchives<span class="token punctuation">{</span>
    reposities<span class="token punctuation">{</span>
        mavenDeployer<span class="token punctuation">{</span>
            <span class="token function">repository</span><span class="token punctuation">(</span>url<span class="token punctuation">:</span><span class="token interpolation-string"><span class="token string">&quot;file://localhost/tmp/myRepo&quot;</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">// 这是自己的阿里云仓库</span>
group <span class="token string">&#39;[GROUP_ID]&#39;</span>
version <span class="token string">&#39;[VERSION]&#39;</span>
<span class="token keyword">def</span> artifactId <span class="token operator">=</span> <span class="token string">&#39;[ARTIFACT_ID]&#39;</span>

<span class="token comment">// 文件具体推送到哪个库，根据您项目目录的build.gradle文件中version字段中是否配置了-SNAPSHOT。</span>
apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;maven-publish&#39;</span>

<span class="token comment">// 上传source</span>
task <span class="token function">sourcesJar</span><span class="token punctuation">(</span>type<span class="token punctuation">:</span> Jar<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    from sourceSets<span class="token punctuation">.</span>main<span class="token punctuation">.</span>allJava
    archiveClassifier<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;sources&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

publishing <span class="token punctuation">{</span>
    publications <span class="token punctuation">{</span>
        <span class="token function">mavenJava</span><span class="token punctuation">(</span>MavenPublication<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            from components<span class="token punctuation">.</span>java
            versionMapping <span class="token punctuation">{</span>
                <span class="token function">usage</span><span class="token punctuation">(</span><span class="token string">&#39;java-api&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">fromResolutionOf</span><span class="token punctuation">(</span><span class="token string">&#39;runtimeClasspath&#39;</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                <span class="token function">usage</span><span class="token punctuation">(</span><span class="token string">&#39;java-runtime&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">fromResolutionResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 主要是这一行</span>
            artifact sourcesJar
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 私有仓库仓库地址</span>
    repositories <span class="token punctuation">{</span>
        maven <span class="token punctuation">{</span>
            <span class="token comment">// change URLs to point to your repos, e.g. http://my.org/repo</span>
            <span class="token keyword">def</span> releasesRepoUrl <span class="token operator">=</span> <span class="token string">&#39;https://packages.aliyun.com/maven/repository/2173289-release-vctkTy/&#39;</span>
            <span class="token keyword">def</span> snapshotsRepoUrl <span class="token operator">=</span> <span class="token string">&#39;https://packages.aliyun.com/maven/repository/2173289-snapshot-g5yEdX/&#39;</span>
            url <span class="token operator">=</span> version<span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span><span class="token string">&#39;SNAPSHOT&#39;</span><span class="token punctuation">)</span> <span class="token operator">?</span> snapshotsRepoUrl <span class="token punctuation">:</span> releasesRepoUrl
            credentials <span class="token punctuation">{</span>
                username <span class="token operator">=</span> <span class="token string">&#39;61ce7cfea96ac5d9b038f98c&#39;</span>
                password <span class="token operator">=</span> <span class="token string">&#39;Ywnuvi=(4e9d&#39;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：</p><ul><li>这里由于本地没有该仓库，因此该步骤需要被注释，否则会报错</li></ul><h1 id="_5、gradle插件" tabindex="-1"><a class="header-anchor" href="#_5、gradle插件" aria-hidden="true">#</a> 5、Gradle插件</h1><ul><li>插件只是一组任务 <ul><li>几乎所有的任务，如编译任务，设置域对象，设置源文件等都由插件处理</li></ul></li></ul><h2 id="_5-1-插件类型" tabindex="-1"><a class="header-anchor" href="#_5-1-插件类型" aria-hidden="true">#</a> 5.1 插件类型</h2><p>Gradle中有两种类型的插件∶ 脚本插件和二进制插件</p><ul><li><p>脚本插件是一个额外的构建脚本，它提供了一种声明性方法来操作构建，通常在构建中使用</p></li><li><p>二进制插件是实现插件接口并采用编程方法来操作构建的类</p><ul><li>二进制插件可以驻留在插件JAR中的一个构建脚本和项目层次结构或外部</li></ul></li><li><p>Project.apply() API方法用于应用特定的插件, 可以多次使用相同的插件</p></li></ul><h3 id="_5-1-1脚本插件" tabindex="-1"><a class="header-anchor" href="#_5-1-1脚本插件" aria-hidden="true">#</a> 5.1.1脚本插件</h3><p>脚本插件可以从本地文件系统进行应用，文件系统位置相对于项目目录，而远程脚本位置指定HTTP URL</p><p>other.gradle</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ext{
    verson=&#39;1.0&#39;
    url=&#39;http://yyj.cn&#39;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>build.gradle 使用other.gradle插件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apply from: &#39;other.gradle&#39;

task testTask{
    doLast{
        println &quot;verson:$verson, url:$url&quot;
    }
}
D:\\Coding\\OnlineStudy\\gradlestudy&gt;gradle -q testTask
verson:1.0, url:http://yyj.cn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-1-2-二进制插件【对象插件】" tabindex="-1"><a class="header-anchor" href="#_5-1-2-二进制插件【对象插件】" aria-hidden="true">#</a> 5.1.2 二进制插件【对象插件】</h3><ul><li>每个插件由插件标识，一些核心插件是使用短名称来应用它，一些社区插件是使用插件ID的完全限定名称，有时它允许指定一个插件类 <ul><li>二进制插件就是实现了<code>org.gradle.api.Plugin</code>接口的插件，它们可以有Plugin id。</li><li>通常对象插件分2类: <ul><li>内部插件</li></ul></li></ul></li></ul><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623567680577-7d0dae20-ed94-437e-81ba-1b4179e40d69.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623567879992-bf9a6cf9-923f-43ce-b887-fcc981410230.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623567912834-995d4061-8e48-4f80-bb10-7fbfaa44acd7.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h4 id="内部插件1-对应插件名" tabindex="-1"><a class="header-anchor" href="#内部插件1-对应插件名" aria-hidden="true">#</a> 内部插件1~对应插件名</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apply plugin:JavaPlugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="内部插件2-使用短名称应用核心插件" tabindex="-1"><a class="header-anchor" href="#内部插件2-使用短名称应用核心插件" aria-hidden="true">#</a> 内部插件2~使用短名称应用核心插件:</h4><ul><li>也称为插件DSL</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>plugins{
    id &#39;java&#39;
}

//或者这种也可以
apply plugin: &#39;java&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623565005860-44ef5410-22ed-4796-bd81-97d41ae02aad.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h4 id="第三方插件" tabindex="-1"><a class="header-anchor" href="#第三方插件" aria-hidden="true">#</a> 第三方插件</h4>`,94),k={href:"https://plugins.gradle.org/",target:"_blank",rel:"noopener noreferrer"},h=n("ul",null,[n("li",null,"gradle帮助托管的第三方插件")],-1),y=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>plugins {
  id &quot;com.jfrog.bintray&quot; version &quot;1.8.5&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>或者按如下方式使用 <ul><li>第三方的对象插件通常是jar文件，要想让构建脚本知道第三方插件的存在，需要使用buildScript来设置</li><li>如果没有被托管到gradle, 那么就只能用该方式使用该插件</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>buildscript {
  repositories {
    maven {
      url &quot;https://plugins.gradle.org/m2/&quot;
    }
  }
  dependencies {
    classpath &quot;com.jfrog.bintray.gradle:gradle-bintray-plugin:1.8.5&quot;
  }
}

apply plugin: &quot;com.jfrog.bintray&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-2-编写自定义插件" tabindex="-1"><a class="header-anchor" href="#_5-2-编写自定义插件" aria-hidden="true">#</a> 5.2 编写自定义插件</h2><h3 id="_5-2-1-自定义插件" tabindex="-1"><a class="header-anchor" href="#_5-2-1-自定义插件" aria-hidden="true">#</a> 5.2.1 自定义插件</h3><p>在创建自定义插件时，需要编写一个插件的实现</p><ul><li>Gradle实例化插件并使用Plugin. apply()方法调用插件实例</li></ul><p>build.gradle</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apply plugin:HelloPlugin

class HelloPlugin implements Plugin&lt;Project&gt;{
    void apply(Project project){
        project.task(&#39;hello&#39;){
            doLast{
                println &quot;Hello from the HelloPlugin.&quot;
            }
        }
    }
}
D:\\Coding\\OnlineStudy\\gradlestudy&gt;gradle -q hello
Hello from the HelloPlugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-2-自定义插件扩展" tabindex="-1"><a class="header-anchor" href="#_5-2-2-自定义插件扩展" aria-hidden="true">#</a> 5.2.2 自定义插件扩展</h3><ul><li>大多数插件需要从构建脚本中的配置获得支持，Gradle项目有一个关联&quot;ExtensionContainer&quot;对象，它有助于跟踪传递给插件的所有设置和属性</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 自定义插件扩展
class HelloPlugin implements Plugin&lt;Project&gt;{
    void apply(Project project){
        //增加一个greeting任务，扩展对象
        project.extensions.create(&quot;greeting&quot;, HelloPluginExtension)

        project.task(&#39;hello&#39;){
            doLast{
                println &quot;Hello from the HelloPlugin.&quot;
                println project.greeting.message
            }
        }
    }
}

class HelloPluginExtension{
    String message
}

apply plugin:HelloPlugin

greeting.message=&quot;yyj study gradle&quot;

// 或使用该方法赋值
/*
greeting{
    message=&quot;yyj study gradle&quot;
}*/
D:\\Coding\\OnlineStudy\\gradlestudy&gt;gradle -q hello
Hello from the HelloPlugin.
yyj study gradle
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-3-标准gradle插件" tabindex="-1"><a class="header-anchor" href="#_5-3-标准gradle插件" aria-hidden="true">#</a> 5.3 标准Gradle插件</h2><h3 id="_5-3-1-语言插件" tabindex="-1"><a class="header-anchor" href="#_5-3-1-语言插件" aria-hidden="true">#</a> 5.3.1 语言插件</h3><p>这些插件的添加，让JVM在编译和执行时对各种语言支持</p><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623567467497-22c9ca0d-7e66-4153-8290-e673e5f85975.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623568636025-cbd3d20a-eba5-480e-a49a-9b48945a019f.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h4 id="只对某些源起作用的依赖" tabindex="-1"><a class="header-anchor" href="#只对某些源起作用的依赖" aria-hidden="true">#</a> 只对某些源起作用的依赖</h4><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623568184617-c95f548a-2e6f-4cb7-8a4c-b00893b28855.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h4 id="增加源sourset" tabindex="-1"><a class="header-anchor" href="#增加源sourset" aria-hidden="true">#</a> 增加源sourset</h4><p><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623568337348-eb098598-2e1a-443c-a496-3809291a63ab.png" alt="img" loading="lazy"><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623568347369-9259cf76-0456-43f1-994a-3dae7a8a0fa6.png" alt="img" loading="lazy"></p><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623568438418-12c669fa-cea3-4e9e-8929-2789d7539d38.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_5-3-2-孵化语言插件" tabindex="-1"><a class="header-anchor" href="#_5-3-2-孵化语言插件" aria-hidden="true">#</a> 5.3.2 孵化语言插件</h3><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623568769568-fa7f5979-06d7-46e7-a2c1-7520c7846bd3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_5-4-gradle-java插件" tabindex="-1"><a class="header-anchor" href="#_5-4-gradle-java插件" aria-hidden="true">#</a> 5.4 Gradle Java插件</h2><p>Java插件：</p><ul><li><p>依赖管理</p></li><li><p>增加的属性</p></li><li><p>增加的任务</p></li><li><p>用法</p></li><li><p>源集</p></li><li><p>项目目录结构</p></li></ul><p>Java插件是构建JVM项目的基础，它为项目增加了很多能力</p><ul><li>例如编译，测试，打包，发布等等</li><li>很多插件都是基于Java插件实现的 <ul><li>例如Android插件</li></ul></li></ul><h3 id="_5-4-1-源集" tabindex="-1"><a class="header-anchor" href="#_5-4-1-源集" aria-hidden="true">#</a> 5.4.1 源集</h3><p>Java插件引入了源集的概念，它在逻辑上表示一组用于编译执行的源文件，这些源文件可能包括<code>源代码文件和资源文件</code></p><ul><li><p>一个源集有一个相关联的编译类路径和运行时类路径</p></li><li><p>Java插件就是通过源集的概念来管理源代码目录的</p><ul><li>源集的一个用途是，把源文件进行逻辑上的分组，以描述它们的目的</li><li>例如，你可能会使用一个源集来定义一个集成测试套件，或者你可能会使用单独的源集来定义你的项目的<code>API</code>和实现类</li></ul></li><li><p>Java插件提供了两个标准源集∶</p><ul><li><code>main</code>包含了项目的源代码，被用于编译和生成<code>JAR</code>文件</li><li><code>test</code>包含单元测试源代码，它们将被编译并使用<code>JUnit</code>或<code>TestNG</code>来执行</li></ul></li></ul><h4 id="定义源集" tabindex="-1"><a class="header-anchor" href="#定义源集" aria-hidden="true">#</a> 定义源集</h4><p><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623570564726-fb3ba15e-a113-4b8c-8b02-f36329096171.png" alt="img" loading="lazy"><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623570582563-5f489886-11ae-490b-ae4b-ecec4cd4016c.png" alt="img" loading="lazy"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sourceSets {
    other{
        output.resourcesDir=file(&quot;out/bin&quot;)
        java.outputDir=file(&quot;out/bin&quot;)

        java{
            srcDirs=[&#39;src/other/java&#39;]
        }
        resources {
            srcDirs=[&#39;src/other/java/resources&#39;]
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：</p><ul><li>源集的位置也很重要，不要在dependencies下面，否则对源集的依赖就将不起作用</li></ul><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623570638179-f49aaae6-f953-4418-8a0e-51b2de197d3d.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h4 id="访问源集" tabindex="-1"><a class="header-anchor" href="#访问源集" aria-hidden="true">#</a> 访问源集</h4><ul><li>sourceSets是Java插件为Project 增加的一个属性，可以直接使用</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>task outSourceSet{
    doLast{
        //遍历
        sourceSets.all{
            println &quot;$name -&gt;&quot;
        }
        println(&quot;-------split------&quot;)
        // 单个的
        println(&quot;\${sourceSets.main.name} --&gt;&quot;)
        println(&quot;\${sourceSets[&#39;other&#39;].name} --&gt;&quot;)

        //一些属性
        println(&quot;java.srcDirs --&gt;\${sourceSets.other.java.srcDirs}&quot;)
        println(&quot;resource.srcDirs --&gt;\${sourceSets.other.resources.srcDirs}&quot;)
    }
}
D:\\Coding\\OnlineStudy\\gradlestudy&gt;gradle -q outSourceSet
main -&gt;
other -&gt;
test -&gt;
-------split------
main --&gt;
other --&gt;
java.srcDirs --&gt;[D:\\Coding\\OnlineStudy\\gradlestudy\\src\\other\\java]
resource.srcDirs --&gt;[D:\\Coding\\OnlineStudy\\gradlestudy\\src\\other\\java\\resources]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="为源集添加依赖" tabindex="-1"><a class="header-anchor" href="#为源集添加依赖" aria-hidden="true">#</a> 为源集添加依赖</h4><ul><li>默认给main目录下增加依赖 <ul><li>前面加上源集，就可以给对应的源集添加依赖，请注意有先后关系</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>dependencies{
    compile group: &#39;org.hibernate&#39;, name:&#39;hibernate-core&#39;, version:&#39;5.4.2.Final&#39;
    testCompile group: &#39;junit&#39;, name:&#39;junit&#39;, version:&#39;4.13&#39;
    testImplementation &#39;org.junit.jupiter:junit-jupiter-api:5.6.0&#39;
    testRuntimeOnly &#39;org.junit.jupiter:junit-jupiter-engine&#39;
    otherImplementation &#39;com.google.code.gson:gson:2.8.7&#39;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="将源集打成一个jar包" tabindex="-1"><a class="header-anchor" href="#将源集打成一个jar包" aria-hidden="true">#</a> 将源集打成一个Jar包</h4><ul><li>创建一个otherJar任务，将源集的输出作为任务的文件来源</li><li>执行这个任务即可生成JAR包</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>task otherJar(type: Jar){
    archivesBaseName=sourceSets.other.name
    archiveVersion=&#39;0.1.0&#39;
    destinationDirectory=file(&quot;\${project.projectDir}/jar&quot;)
    from sourceSets.other.output
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623573740886-08128944-7d9d-4f55-ad13-2402ddbd9a91.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h4 id="为源集生成doc" tabindex="-1"><a class="header-anchor" href="#为源集生成doc" aria-hidden="true">#</a> 为源集生成doc</h4><ul><li>创建一个任务将源集的所有Java文件作为源文件</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tasks.withType(Javadoc){
    options.encoding=&#39;UTF-8&#39;
}
tasks.withType(JavaCompile){
    options.encoding=&#39;UTF-8&#39;
}
task otherDoc(type: Javadoc){
    options.addStringOption(&#39;Xdoclint:none&#39;, &#39;-quiet&#39;)
    destinationDir = file(&quot;\${project.projectDir}/doc&quot;)
    source sourceSets.other.allJava
    title sourceSets.other.name
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：</p><ul><li>type: 后面要有空格</li></ul><h4 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构" aria-hidden="true">#</a> 项目结构</h4><p>Java插件的默认目录结构如下所示</p><ul><li>无论这些文件夹中有没有内容, Java插件都会编译里面的内容,并处理没有的内容</li><li>这个目录结构也是Java世界标准的项目目录</li></ul><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623576258040-7ed3a310-b678-4671-b7ec-1bbcdbe3e399.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h1 id="_6、gradle运行构建" tabindex="-1"><a class="header-anchor" href="#_6、gradle运行构建" aria-hidden="true">#</a> 6、Gradle运行构建</h1><p>Gradle提供了一个命令行来执行构建脚本</p><ul><li>它可以一次执行多个任务，在这里将介绍如何使用不同的选项来执行多个任务</li></ul><h2 id="_6-1-执行多个任务" tabindex="-1"><a class="header-anchor" href="#_6-1-执行多个任务" aria-hidden="true">#</a> 6.1 执行多个任务</h2><p>Gradle可以从单个构建文件执行多个任务</p><ul><li>使用grad le命令处理构建文件。此命令将按列出的顺序编译每个任务，并使用不同的选项执行每个任务以及依赖关系</li><li><code>**重复依赖的任务只执行一次**</code>，如果命令执行成功，将获得以下输出 <ul><li>只看直接相关</li></ul></li></ul><p>示例·假设有四个任务·task1, task2，task3和task4</p><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623576557124-608db323-5bc2-4a2b-8db7-a3341719c428.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623576606895-7d3a4ff3-5ce6-4551-8646-cc9bd10c3218.png" alt="img" loading="lazy"><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623576745779-6d80adaf-c977-4a97-9e2f-2a2b2292a5ff.png" alt="img" loading="lazy"></p><h2 id="_6-2-排除任务" tabindex="-1"><a class="header-anchor" href="#_6-2-排除任务" aria-hidden="true">#</a> 6.2 排除任务</h2><ul><li>要执行中排除某个任务时，可以在gradle命令中使用<code>-x</code>选项，并指出要排除的任务的名称</li></ul><p><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623577286461-21415923-1653-40a6-ad7d-87ddd507f865.png" alt="img" loading="lazy"><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623577410394-e06e5f8d-054a-47c1-9c50-38cc335e4eb0.png" alt="img" loading="lazy"></p><h2 id="_6-3-选择执行哪些构建" tabindex="-1"><a class="header-anchor" href="#_6-3-选择执行哪些构建" aria-hidden="true">#</a> 6.3 选择执行哪些构建</h2><ul><li>当运行gradle命令时，它在当前目录中查找构建文件</li><li>也可以使用-b选项选择指定的构建文件的路径</li></ul><p>other.gradle</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>task hello{
    doLast {
        println &quot;Use File:$buildFile.name in &#39;$buildFile.parentFile.name&#39;.&quot;
    }
}
D:\\Coding\\OnlineStudy\\gradlestudy&gt;gradle -q -b other.gradle hello
Use File:other.gradle in &#39;gradlestudy&#39;.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-4-获取构建信息" tabindex="-1"><a class="header-anchor" href="#_6-4-获取构建信息" aria-hidden="true">#</a> 6.4 获取构建信息</h2><ul><li>Gradle提供了几个内置任务来检索有关任务和项目的详细信息，这对理解构建的结构和依赖性以及调试一些问题很有用 <ul><li>可使用项目报告插件向项目中添加任务，来生成这些报告</li></ul></li></ul><h3 id="_6-4-1-列出项目" tabindex="-1"><a class="header-anchor" href="#_6-4-1-列出项目" aria-hidden="true">#</a> 6.4.1 列出项目</h3><ul><li>可以使用gradle -q projects命令来列出所选项目及其子项目的项目层次结构</li></ul><p>other.gradle</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 对该项目的描述
description &#39;this is other gradle&#39;
ext{
    verson=&#39;1.0&#39;
    url=&#39;http://yyj.cn&#39;
}

task hellos{
    doLast {
        println &quot;Use File:$buildFile.name in &#39;$buildFile.parentFile.name&#39;.&quot;
    }
}
D:\\Coding\\OnlineStudy\\gradlestudy&gt;gradle -q -b other.gradle projects

------------------------------------------------------------
Root project &#39;gradlestudy&#39; - this is other gradle
------------------------------------------------------------

Root project &#39;gradlestudy&#39; - this is other gradle
No sub-projects

To see a list of the tasks of a project, run gradle &lt;project-path&gt;:tasks
For example, try running gradle :tasks
D:\\Coding\\OnlineStudy\\gradlestudy&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-2-列出任务" tabindex="-1"><a class="header-anchor" href="#_6-4-2-列出任务" aria-hidden="true">#</a> 6.4.2 列出任务</h3><ul><li>列出属于多个项目的所有任务</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>D:\\Coding\\OnlineStudy\\gradlestudy&gt;gradle -q -b other.gradle  tasks --all

------------------------------------------------------------
Tasks runnable from root project &#39;gradlestudy&#39; - this is other gradle
------------------------------------------------------------

Build Setup tasks
-----------------
init - Initializes a new Gradle build.
wrapper - Generates Gradle wrapper files.

Help tasks
----------
buildEnvironment - Displays all buildscript dependencies declared in root project &#39;gradlestudy&#39;.
dependencies - Displays all dependencies declared in root project &#39;gradlestudy&#39;.
dependencyInsight - Displays the insight into a specific dependency in root project &#39;gradlestudy&#39;.
help - Displays a help message.
javaToolchains - Displays the detected java toolchains. [incubating]
outgoingVariants - Displays the outgoing variants of root project &#39;gradlestudy&#39;.
projects - Displays the sub-projects of root project &#39;gradlestudy&#39;.
properties - Displays the properties of root project &#39;gradlestudy&#39;.
tasks - Displays the tasks runnable from root project &#39;gradlestudy&#39;.

Other tasks
-----------
components - Displays the components produced by root project &#39;gradlestudy&#39;. [deprecated]
dependentComponents - Displays the dependent components of components in root project &#39;gradlestudy&#39;. [deprecated]
hellos
model - Displays the configuration model of root project &#39;gradlestudy&#39;. [deprecated]
prepareKotlinBuildScriptModel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-3-其他" tabindex="-1"><a class="header-anchor" href="#_6-4-3-其他" aria-hidden="true">#</a> 6.4.3 其他</h3><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623578678545-c64a15c7-f5da-412e-8a3c-3d765db33ff1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h1 id="_7、gradle构建java项目" tabindex="-1"><a class="header-anchor" href="#_7、gradle构建java项目" aria-hidden="true">#</a> 7、Gradle构建Java项目</h1><h2 id="_7-1-java默认的项目布局" tabindex="-1"><a class="header-anchor" href="#_7-1-java默认的项目布局" aria-hidden="true">#</a> 7.1 Java默认的项目布局</h2>`,86),f={href:"http://start.aliyun.com",target:"_blank",rel:"noopener noreferrer"},x=i(`<figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623578907469-e8350034-7eaa-4616-906c-521d677e4a10.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623578941621-25f9f289-6b35-40c9-a58a-b1f707a58196.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li>如果遵循上面设置，以下构建文件足以编译，测试并捆绑Java项目</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>D:\\Coding\\OnlineStudy\\gradlestudy&gt;gradle build

&gt; Configure project :
this is the first gradle
this is the outside gradle
this is the inside gradle
y
y
j
yyj
yyj
yyj
yyj
description applied

Deprecated Gradle features were used in this build, making it incompatible with Gradle 7.0.
Use &#39;--warning-mode all&#39; to show the individual deprecation warnings.
See https://docs.gradle.org/6.8.3/userguide/command_line_interface.html#sec:command_line_warnings

BUILD SUCCESSFUL in 8s
2 actionable tasks: 2 executed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-2-初始化任务执行" tabindex="-1"><a class="header-anchor" href="#_7-2-初始化任务执行" aria-hidden="true">#</a> 7.2 初始化任务执行</h2><ul><li><p>Gradle还不支持多个项目模板</p><ul><li>但它提供了一个init来初始化任务，来创建一个新的<code>Gradle项目的结构</code></li><li>如果没有指定其他参数，任务将创建一个Gradle项目，其中包含<code>gradle包装器文件</code>、<code>bui1d.gradle</code>和<code>settings.gradle</code>文件</li></ul></li><li><p>当使用java-library作为值并添加--type参数时，将创建一个<code>java项目结构</code>，build.gradle文件包含带有Junit的某个Java模板</p><ul><li>在仓库(repositories )这部分中，它定义了要从哪里找到依赖</li><li>Jcenter是为了解决依赖，依赖关系( dependencies)部分用于提供有关外部依赖关系的信息</li></ul></li></ul><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623579285299-f5c9f14a-7e11-4308-b34f-bdc15fae83ea.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_7-3-指定java版本" tabindex="-1"><a class="header-anchor" href="#_7-3-指定java版本" aria-hidden="true">#</a> 7.3 指定Java版本</h2><p>通常，Java项目要有一个版本和一个目标JRE，在其上编译它</p><ul><li><code>version</code>和<code>sourceCompatibility</code>属性可以在build.gradle文件中设置</li><li>如果这是一个可执行的Java应用程序，<code>MANIFEST.MF </code>文件必须要指定具有main方法的类</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apply plugin: &#39;java&#39;
version=&quot;0.1.1&quot;
sourceCompatibility=1.8
targetCompatibility=1.8

jar{
    manifest{
        attributes &quot;Manifest-Version&quot;:1.0,
        &#39;Main-Class&#39;:&#39;App&#39;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apply plugin: &#39;java&#39;
apply plugin: &#39;maven&#39;
apply plugin: &#39;idea&#39;
apply plugin: &#39;org.springframework.boot&#39;
apply plugin: &#39;io.spring.dependency-management&#39;

//针对多模块
allprojects {
    group &#39;com.yyj&#39;
    version &#39;0.0.1-SNAPSHOT&#39;
    repositories {
        maven{ url &#39;http://maven.aliyun.com/nexus/content/groups/public/&#39;}
        maven{ url &#39;http://maven.aliyun.com/nexus/content/repositories/jcenter&#39;}
        mavenCentral()
        jcenter()
    }
}

repositories {
    mavenCentral()
    jcenter()
    mavenLocal()
}

//该区域是配置构建工具gradle本身所需要的依赖和仓库的代码区域，不能把工程所需要的依赖放置在这里
buildscript{
    ext{
        springBootVersion = &#39;2.3.2.RELEASE&#39;
    }

    //gradle自身依赖的仓库，除了jcenter , maven ,ivy之外，还支持google等
    repositories {
        maven{ url &#39;http://maven.aliyun.com/nexus/content/groups/public/&#39;}
        maven{ url &#39;http://maven.aliyun.com/nexus/content/repositories/jcenter&#39;}
        maven{ url &#39;https://repo.spring.io/plugins-release&#39;}
        mavenCentral()
        jcenter()
    }

    // 该区域配置了gradle编译springboot工程所需要的依赖插件
    dependencies {
        classpath(&quot;org.springframework.boot:spring-boot-gradle-plugin:\${springBootVersion}&quot;)
    }
}

sourceCompatibility=1.8
targetCompatibility=1.8

jar{
    manifest{
        attributes &quot;Manifest-Version&quot;:1.0,
                &#39;Main-Class&#39;:&#39;com.yyj.SpringBootApp1&#39;
    }
}

dependencies{
    compile group: &#39;org.hibernate&#39;, name:&#39;hibernate-core&#39;, version:&#39;5.4.2.Final&#39;
    testCompile group: &#39;junit&#39;, name:&#39;junit&#39;, version:&#39;4.13&#39;
    testImplementation &#39;org.junit.jupiter:junit-jupiter-api:5.6.0&#39;
    testRuntimeOnly &#39;org.junit.jupiter:junit-jupiter-engine&#39;
    otherImplementation &#39;com.google.code.gson:gson:2.8.7&#39;
    implementation group: &#39;org.springframework.boot&#39;, name: &#39;spring-boot-starter-web&#39;, version: &#39;2.5.1&#39;
}

tasks.withType(JavaCompile){
    options.encoding=&#39;UTF-8&#39;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623581706469-52dd0244-ba60-4ba3-ba44-a99f819d986c.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623581638036-b7378877-d42a-49a6-b98e-3fc838058e4d.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_7-4-clean-build" tabindex="-1"><a class="header-anchor" href="#_7-4-clean-build" aria-hidden="true">#</a> 7.4 clean &amp; build</h2><ul><li>clean 清除构建结果</li><li>build 重新构建项目，可以在对应目录生成Jar包</li></ul><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623582219682-4913ec7d-85f1-4dab-8f00-2735b2fe10e7.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623582979657-4cbdf881-1032-46b2-9d09-c97a7717162f.png" alt="img" loading="lazy"><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623582200860-a1f58751-1c27-43e6-a40f-9baf5d5dcba9.png" alt="img" loading="lazy"></p><h1 id="_8、gradle测试" tabindex="-1"><a class="header-anchor" href="#_8、gradle测试" aria-hidden="true">#</a> 8、Gradle测试</h1><ul><li><p>测试任务会自动检测和执行测试源集合中的所有单元测试</p></li><li><p>它还会在测试执行完成后生成报告</p></li><li><p>JUnit和TestNG都是支持的API</p></li></ul><h2 id="_8-1-测试检测" tabindex="-1"><a class="header-anchor" href="#_8-1-测试检测" aria-hidden="true">#</a> 8.1 测试检测</h2><ul><li><p>测试任务通过检查编译的测试类来检测哪些类是测试类</p><ul><li>默认情况下，它扫描所有.class文件，不过也可以设置自定义包含/排除，只有那些类才会被扫描</li></ul></li><li><p>根据所使用的<code>测试框架([Junit / TestNG )</code>，测试类检测使用不同的标准</p></li><li><p>如果不想使用测试类检测，可以通过将scanForTestclasses设置为false来禁用它</p></li></ul><p>build.gradle</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>test {
    // 默认使用Junit
    useJUnitPlatform()
    // 使用testNG
    useTestNG()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试用例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

/**
 * @ClassName: AppTest
 * @Description:
 * @author: sunjr on 2021-06-13 19:17
 * @Version: 1.0
 **/

public class AppTest {
    @Test
    public void test(){
        String test = &quot;test&quot;;
        Assertions.assertEquals(&quot;test&quot;, test);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623584005776-71015c62-08ce-4764-a4d6-427cba81f8a8.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_8-2-包括和排除指定测试" tabindex="-1"><a class="header-anchor" href="#_8-2-包括和排除指定测试" aria-hidden="true">#</a> 8.2 包括和排除指定测试</h2><ul><li>Test类有一个include和exclude方法。这些方法可以用于指定哪些测试应该运行</li></ul><h3 id="_8-2-1-使用junit框架" tabindex="-1"><a class="header-anchor" href="#_8-2-1-使用junit框架" aria-hidden="true">#</a> 8.2.1 使用Junit框架</h3><ul><li>注意：Junit和testNG不要同时使用，可能会造成build/test/test/packages出不来</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>test {
    // 默认使用Junit
    useJUnitPlatform()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>禁用测试：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>test{
    //跳过测试用例
    enabled=false
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只运行包含的测试</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>test{
    include &#39;com/yyj/*&#39;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>跳过排除的测试</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>test{
    exclude &#39;com/yyj/*&#39;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623586373412-88dc619b-f315-43e6-83ef-0b978073afc7.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_8-2-2-testng" tabindex="-1"><a class="header-anchor" href="#_8-2-2-testng" aria-hidden="true">#</a> 8.2.2 TestNG</h3><p><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623586628202-2f1c99e6-40b0-4cb2-a82f-aee821708494.png" alt="img" loading="lazy"><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623586632577-3c27b4f8-f293-4e38-b264-c47d1f8b5c84.png" alt="img" loading="lazy"></p><p>可以使用以下命令语法来执行一些测试任务:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>gradle &lt;someTestTask --debug-jvm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="_9、gradle多项目构建" tabindex="-1"><a class="header-anchor" href="#_9、gradle多项目构建" aria-hidden="true">#</a> 9、Gradle多项目构建</h1><ul><li>Gradle可以轻松处理各种大小规模的项目 <ul><li>小项目由一个单一的构建文件和一个源代码树构成</li><li>大项目可以将其拆分成更小的，相互依赖的模块，以便更容易理解，Gradle完美支持这种多项目构建的场景</li></ul></li></ul><h2 id="_9-1-settings-gradle-build-gradle" tabindex="-1"><a class="header-anchor" href="#_9-1-settings-gradle-build-gradle" aria-hidden="true">#</a> 9.1 settings.gradle+build.gradle</h2><p>这种构建有各种形状和大小，但它们都有一些共同的特点</p>`,47),q=n("p",null,[s("在"),n("code",null,"**项目的根目录或主目录**"),s("中都有一个"),n("code",null,"settings.gradle"),s("文件：全局配置")],-1),j=n("li",null,"include 各个模块",-1),_={href:"http://rootProject.name",target:"_blank",rel:"noopener noreferrer"},S=n("li",null,[s("rootProject.children.each 设置每个子项目的"),n("code",null,"buildFileName"),n("ul",null,[n("li",null,[s("对应"),n("code",null,"${project.name}.gradle"),s("文件，默认是"),n("code",null,"build.gradle")])])],-1),G=n("li",null,[s("settings.gradle.projectsLoaded 项目加载时的设置 "),n("ul",null,[n("li",null,[n("code",null,"buildScan "),s("选择编译哪些东西")])])],-1),J=n("li",null,[n("p",null,[s("根目录或主目录都有一个"),n("code",null,"build.gradle"),s("文件")])],-1),C=n("li",null,[n("p",null,[s("具有自己的"),n("code",null,"*.gradle"),s("构建文件的子目录(某些多项目构建可能会省略子项目构建脚本)。")])],-1),D=i(`<p>要列出构建文件中的所有项目，可以使用以下命令:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>D:\\Coding\\OnlineStudy\\gradlestudy&gt;gradle -a projects
Starting a Gradle Daemon (subsequent builds will be faster)

&gt; Configure project :
this is the first gradle
this is the outside gradle
this is the inside gradle
y
y
j
yyj
yyj
yyj
yyj
description applied

&gt; Task :projects

------------------------------------------------------------
Root project &#39;gradlestudy&#39; - this is other gradle
------------------------------------------------------------

Root project &#39;gradlestudy&#39; - this is other gradle
\\--- Project &#39;:mygradle&#39;

To see a list of the tasks of a project, run gradle &lt;project-path&gt;:tasks
For example, try running gradle :mygradle:tasks

Deprecated Gradle features were used in this build, making it incompatible with Gradle 7.0.
Use &#39;--warning-mode all&#39; to show the individual deprecation warnings.
See https://docs.gradle.org/6.8.3/userguide/command_line_interface.html#sec:command_line_warnings

BUILD SUCCESSFUL in 6s
1 actionable task: 1 executed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-2-wrapper-gradle-wrapper-properties" tabindex="-1"><a class="header-anchor" href="#_9-2-wrapper-gradle-wrapper-properties" aria-hidden="true">#</a> 9.2 Wrapper~gradle-wrapper.properties</h2><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623905730227-27245bf8-8e35-4573-a02f-1fa1069a054a.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_9-3-设置" tabindex="-1"><a class="header-anchor" href="#_9-3-设置" aria-hidden="true">#</a> 9.3 设置</h2><h3 id="_9-3-1-根目录下-settings-gradle" tabindex="-1"><a class="header-anchor" href="#_9-3-1-根目录下-settings-gradle" aria-hidden="true">#</a> 9.3.1 根目录下~settings.gradle</h3><ul><li>自动写入各个模块内容</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rootProject.name = &#39;gradlestudy&#39;
include &#39;entry&#39;
include &#39;service&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-3-2-根目录下-指定常规构建设置" tabindex="-1"><a class="header-anchor" href="#_9-3-2-根目录下-指定常规构建设置" aria-hidden="true">#</a> 9.3.2 根目录下~指定常规构建设置</h3><ul><li><p>在根项目中的build.gradle文件中，常规配置可以应用于所有项目或仅应用于子项目</p><ul><li>这指定了一个公共<code>com.yyj</code>组和一个<code>0.0.1-SNAPSHOT</code>版本到所有项目 <ul><li><code>Project API</code>提供了一个属性<code>allprojects</code>，它返回当前项目及其下面所有子项目的列表</li><li>如果使用闭包调用<code>allprojects</code>，则闭包的语句将委派给与所有项目相关联的项目</li><li>可以使用<code>allprojects.each</code>进行迭代，但这将更冗长</li></ul></li><li><code>subprojects</code>闭合所有应用对<code>子项目通用配置</code>，但不对根项目应用</li></ul></li><li><p>其他构建系统使用继承作为定义公共行为的主要方法，Gradle也为项目提供继承</p><ul><li>但Gradle使用配置注入作为定义公共行为的常用方式，这是一种非常强大和灵活的配置多项目构建的方式，</li><li>共享配置的另一种可能性是使用公共外部脚本。</li></ul></li></ul><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token comment">// 针对多模块 打包的策略</span>
buildscript <span class="token punctuation">{</span>
    <span class="token comment">// 自定义参数</span>
    ext <span class="token punctuation">{</span>
        <span class="token comment">// 具体版本依赖可以去 https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E 找相应的版本</span>
        springBootVersion <span class="token operator">=</span> <span class="token string">&#39;2.3.12.RELEASE&#39;</span>
        springCloudVersion <span class="token operator">=</span> <span class="token string">&#39;Hoxton.SR12&#39;</span>
        springCloudAlibabaVersion <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;2.2.7.RELEASE&quot;</span></span>
        <span class="token comment">// 依赖包</span>
        hutoolVersion <span class="token operator">=</span> <span class="token string">&#39;5.7.2&#39;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 项目仓库设置</span>
    repositories <span class="token punctuation">{</span>
        <span class="token comment">// 优先使用本地 mavene 仓库</span>
        <span class="token function">mavenLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// 阿里云 central 仓和 jcenter 仓的聚合仓</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/public/&#39;</span> <span class="token punctuation">}</span>
        <span class="token comment">// 阿里云 gradle 插件仓库</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/gradle-plugin/&#39;</span> <span class="token punctuation">}</span>
        <span class="token comment">// 阿里云 spring 代理仓库</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/spring/&#39;</span> <span class="token punctuation">}</span>
        <span class="token comment">// 中央maven仓库</span>
        <span class="token function">jcenter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// springboot gradle 打包插件依赖</span>
    dependencies <span class="token punctuation">{</span>
        <span class="token function">classpath</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;org.springframework.boot:spring-boot-gradle-plugin:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">springBootVersion</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 所有项目配置</span>
allprojects <span class="token punctuation">{</span>
    <span class="token comment">// gradle插件</span>
    <span class="token comment">//  Java的gradle插件 </span>
    apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;java&#39;</span>
    <span class="token comment">//  maven 扩展插件 </span>
    apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;maven&#39;</span>
    <span class="token comment">// maven发布的gradle插件</span>
    <span class="token comment">// apply plugin: &#39;maven-publish&#39;</span>
    <span class="token comment">// idea 扩展插件 </span>
    apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;idea&#39;</span>
    <span class="token comment">// java增强 </span>
    apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;java-library&#39;</span>

    <span class="token comment">// 定义您的源文件应该被视为哪种语言版本的 Java。</span>
    sourceCompatibility <span class="token operator">=</span> <span class="token string">&#39;1.8&#39;</span>
    <span class="token comment">// 定义您的代码应该运行的最低 JVM 版本，即它确定编译器生成的字节码版本。</span>
    targetCompatibility <span class="token operator">=</span> <span class="token string">&#39;1.8&#39;</span>

    <span class="token comment">// 项目信息 </span>
    group <span class="token operator">=</span> <span class="token string">&#39;com.gavin&#39;</span>
    <span class="token comment">// 版本</span>
    version <span class="token operator">=</span> <span class="token string">&#39;0.0.1-SNAPSHOT&#39;</span>

    <span class="token comment">// 项目仓库设置</span>
    repositories <span class="token punctuation">{</span>
        <span class="token comment">// 优先使用本地 mavene 仓库</span>
        <span class="token function">mavenLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// 阿里云 central 仓和 jcenter 仓的聚合仓</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/public/&#39;</span> <span class="token punctuation">}</span>
        <span class="token comment">// 阿里云 gradle 插件仓库</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/gradle-plugin/&#39;</span> <span class="token punctuation">}</span>
        <span class="token comment">// 阿里云 spring 代理仓库</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/spring/&#39;</span> <span class="token punctuation">}</span>
        <span class="token comment">// 自己的生产库maven仓库</span>
        maven <span class="token punctuation">{</span>
            credentials <span class="token punctuation">{</span>
                username <span class="token string">&#39;61ce7cfea96ac5d9b038f98c&#39;</span>
                password <span class="token string">&#39;Ywnuvi=(4e9d&#39;</span>
            <span class="token punctuation">}</span>
            url <span class="token string">&#39;https://packages.aliyun.com/maven/repository/2173289-release-vctkTy/&#39;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 自己的开发版库maven仓库</span>
        <span class="token comment">// maven {</span>
        <span class="token comment">//     credentials {</span>
        <span class="token comment">//         username &#39;61ce7cfea96ac5d9b038f98c&#39;</span>
        <span class="token comment">//         password &#39;Ywnuvi=(4e9d&#39;</span>
        <span class="token comment">//     }</span>
        <span class="token comment">//     url &#39;https://packages.aliyun.com/maven/repository/2173289-snapshot-g5yEdX/&#39;</span>
        <span class="token comment">// }</span>
        <span class="token comment">// 中央maven仓库</span>
        <span class="token function">jcenter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 指定编码格式 第一种方法</span>
    tasks<span class="token punctuation">.</span><span class="token function">withType</span><span class="token punctuation">(</span>JavaCompile<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        options<span class="token punctuation">.</span>encoding <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;UTF-8&quot;</span></span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 指定编码格式 第二种方法</span>
    <span class="token comment">// [compileJava, compileTestJava, javadoc]*.options*.encoding = &#39;UTF-8&#39;</span>

    <span class="token comment">// 依赖范围配置修改</span>
    configurations <span class="token punctuation">{</span>
        <span class="token comment">// 修改annotationProcessor 使其可以继承 </span>
        compileOnly <span class="token punctuation">{</span>
            extendsFrom annotationProcessor
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token comment">// 子项目设置 </span>
subprojects <span class="token punctuation">{</span>
    <span class="token comment">// springboot插件 </span>
    apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;org.springframework.boot&#39;</span>
    <span class="token comment">// spring依赖管理插件 </span>
    apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;io.spring.dependency-management&#39;</span>

    <span class="token comment">// 全局依赖</span>
    dependencies <span class="token punctuation">{</span>

        <span class="token comment">// hutool 简化工具集</span>
        implementation <span class="token interpolation-string"><span class="token string">&quot;cn.hutool:hutool-core:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">hutoolVersion</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>

        <span class="token comment">// 热部署开发工 idea 中使用 Jrebel</span>
        <span class="token comment">// developmentOnly &#39;org.springframework.boot:spring-boot-devtools&#39;</span>

        <span class="token comment">// 注解依赖 </span>
        <span class="token function">annotationProcessor</span><span class="token punctuation">(</span>
                <span class="token comment">// 配置文件解析 </span>
                <span class="token string">&#39;org.springframework.boot:spring-boot-configuration-processor&#39;</span><span class="token punctuation">,</span>
                <span class="token comment">// lombok 简化开发 </span>
                <span class="token string">&#39;org.projectlombok:lombok&#39;</span>
        <span class="token punctuation">)</span>

        <span class="token comment">// 测试依赖</span>
        <span class="token function">testImplementation</span><span class="token punctuation">(</span><span class="token string">&#39;org.springframework.boot:spring-boot-starter-test&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            exclude group<span class="token punctuation">:</span> <span class="token string">&#39;org.junit.vintage&#39;</span><span class="token punctuation">,</span> module<span class="token punctuation">:</span> <span class="token string">&#39;junit-vintage-engine&#39;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 子项目管理依赖 </span>
    dependencyManagement <span class="token punctuation">{</span>
        imports <span class="token punctuation">{</span>
            <span class="token comment">// Spring-Cloud 依赖</span>
            mavenBom <span class="token interpolation-string"><span class="token string">&quot;org.springframework.cloud:spring-cloud-dependencies:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">springCloudVersion</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
            <span class="token comment">// Spring-Alibaba 依赖</span>
            mavenBom <span class="token interpolation-string"><span class="token string">&quot;com.alibaba.cloud:spring-cloud-alibaba-dependencies:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">springCloudAlibabaVersion</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
        <span class="token punctuation">}</span>
         <span class="token comment">// 子项目管理依赖</span>
        dependencies <span class="token punctuation">{</span>
            dependency <span class="token interpolation-string"><span class="token string">&quot;mysql:mysql-connector-java:8.0.25&quot;</span></span>
            dependency <span class="token string">&#39;com.baomidou:mybatisplus-spring-boot-starter:1.0.5&#39;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 测试配置 </span>
    test <span class="token punctuation">{</span>
        <span class="token function">useJUnitPlatform</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>子模块中<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
<span class="token comment">// 将子项目打成jar包</span>
jar<span class="token punctuation">.</span>enabled <span class="token operator">=</span> <span class="token boolean">true</span> 

<span class="token comment">// 要想其不生产springboot jar 需要使其失效</span>
bootJar<span class="token punctuation">.</span>enabled <span class="token operator">=</span> <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如只针对service执行：</p><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623909403397-37bb03c4-0593-40fa-983c-28836485db4a.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623909155665-0a21b940-6422-4bc0-926a-22bac586cf36.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_9-3-3-子项目指定配置和依赖关系" tabindex="-1"><a class="header-anchor" href="#_9-3-3-子项目指定配置和依赖关系" aria-hidden="true">#</a> 9.3.3 子项目指定配置和依赖关系</h3><ul><li>子项目也可以设置allProjects{}和subProjects, 针对最外层项目和最外层项目所有的子项目</li><li>增加特有内容 <ul><li>项目依赖项可使用项目方法指定</li></ul></li></ul><p>如对于<code>entry</code>子项目增加依赖：</p><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623907905826-13560cca-6de3-4b8e-afbf-280c8611d396.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>如只针对service执行：</p><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623909363757-65487821-2fe9-428e-931b-f57d4fb6afbb.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h1 id="_10、gradle-部署" tabindex="-1"><a class="header-anchor" href="#_10、gradle-部署" aria-hidden="true">#</a> 10、Gradle 部署</h1><ul><li>Gradle提供了几种部署构建工件(artifacts)存储库的方法 <ul><li>将工件的签名部署到Maven仓库时，还需要签署已发布的POM文件</li></ul></li></ul><h2 id="_10-1-使用maven插件部署" tabindex="-1"><a class="header-anchor" href="#_10-1-使用maven插件部署" aria-hidden="true">#</a> 10.1 使用Maven插件部署</h2><h3 id="_10-1-1-build" tabindex="-1"><a class="header-anchor" href="#_10-1-1-build" aria-hidden="true">#</a> 10.1.1 build</h3><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623992488504-f5606bf8-f1f3-421e-880c-9729fd282958.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_10-1-2-publish" tabindex="-1"><a class="header-anchor" href="#_10-1-2-publish" aria-hidden="true">#</a> 10.1.2 publish</h3><h4 id="发布到本地仓库" tabindex="-1"><a class="header-anchor" href="#发布到本地仓库" aria-hidden="true">#</a> 发布到本地仓库</h4><ul><li>Gradle默认提供maven-publish插件，它用于发布gradle脚本</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apply plugin:&#39;java&#39;
// 使用maven插件发布
apply plugin:&#39;maven-publish&#39;

publishing{
    publications{
        // 使用MavenPublication
        maven(MavenPublication){
            // 从这里进行获取源集下的编译好的文件
            from(components.java)
        }
    }

    repositories {
        maven{
            //发布到这个仓库，这里实际上是个文件夹
            url &quot;$buildDir/repo&quot;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623992649505-30d60d31-71db-4f4e-b15a-7a8a0a2dfac1.png" alt="img" loading="lazy"><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623992657042-57740e93-ca59-4bea-a4b8-bda673849636.png" alt="img" loading="lazy"></p><h4 id="发布到远端" tabindex="-1"><a class="header-anchor" href="#发布到远端" aria-hidden="true">#</a> 发布到远端</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apply plugin:&#39;maven-publish&#39;

publishing{
    publications{
        maven(MavenPublication){
            from(components.java)
        }
    }

    repositories {
        maven{
            //default credentials for a nexus repository ManageReferralControl
            credentials{
                username &#39;admin&#39;
                password &#39;mypasswd&#39;
            }
            //发布maven存储库的url
            url &quot;http://localhost:8080/nexus/content/repositories/releases/&quot;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10-2-将项目从maven转换为gradle" tabindex="-1"><a class="header-anchor" href="#_10-2-将项目从maven转换为gradle" aria-hidden="true">#</a> 10.2 将项目从Maven转换为Gradle</h2><ul><li>有一个特殊的命令用于将<code>Apache Maven pom .xml</code>文件转换为<code>Gradle构建文件</code>，如果此任务已经知道使用的所有Maven插件</li></ul><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623993274525-2c683c7f-41c8-4453-8ab6-7ba0c93f1a4b.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;project xmlns=&quot;http://maven.apache.org/POM/4.0.0&quot;
         xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
         xsi:schemaLocation=&quot;http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd&quot;&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;org.example&lt;/groupId&gt;
    &lt;artifactId&gt;Test02MavenSpark&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;

    &lt;properties&gt;
        &lt;maven.compiler.source&gt;8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;8&lt;/maven.compiler.target&gt;
        &lt;scala.version&gt;2.12&lt;/scala.version&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;
        &lt;!-- https://mvnrepository.com/artifact/org.apache.spark/spark-core --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.spark&lt;/groupId&gt;
            &lt;artifactId&gt;spark-core_\${scala.version}&lt;/artifactId&gt;
            &lt;version&gt;3.1.2&lt;/version&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;

&lt;/project&gt;
D:\\Coding\\Test\\Test02MavenSpark&gt;gradle init --type pom
Starting a Gradle Daemon (subsequent builds will be faster)

Select build script DSL:
  1: Groovy
  2: Kotlin
Enter selection (default: Groovy) [1..2] 2


&gt; Task :init
Maven to Gradle conversion is an incubating feature.
Get more help with your project: https://docs.gradle.org/6.8.3/userguide/migrating_from_maven.html

BUILD SUCCESSFUL in 22s
2 actionable tasks: 2 executed
D:\\Coding\\Test\\Test02MavenSpark&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cdn.nlark.com/yuque/0/2021/png/524492/1623993438672-323da091-a4d3-42f6-82e9-f674c654334e.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>结果build.gradle.kts</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/*
 * This file was generated by the Gradle &#39;init&#39; task.
 */

plugins {
    java
    \`maven-publish\`
}

repositories {
    mavenLocal()
    maven {
        url = uri(&quot;https://repo.maven.apache.org/maven2/&quot;)
    }
}

dependencies {
    implementation(&quot;org.apache.spark:spark-core_2.12:3.1.2&quot;)
}

group = &quot;org.example&quot;
version = &quot;1.0-SNAPSHOT&quot;
description = &quot;Test02MavenSpark&quot;
java.sourceCompatibility = JavaVersion.VERSION_1_8

publishing {
    publications.create&lt;MavenPublication&gt;(&quot;maven&quot;) {
        from(components[&quot;java&quot;])
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,39);function P(T,w){const a=t("ExternalLinkIcon");return d(),r("div",null,[o,p,u,n("p",null,[s("Gradle是一个基于Apache Ant和Apache Maven概念的项目自动化构建开源工具;"),n("a",v,[s("官网"),e(a)])]),m,n("p",null,[s("下载地址："),n("a",b,[s("https://services.gradle.org/distributions/"),e(a)])]),g,n("ul",null,[n("li",null,[s("使用短名称应用社区( "),n("a",k,[s("https://plugins.gradle.org/"),e(a)]),s(" )插件 "),h])]),y,n("p",null,[s("阿里云的构建地址: "),n("a",f,[s("http://start.aliyun.com"),e(a)])]),x,n("ul",null,[n("li",null,[q,n("ul",null,[j,n("li",null,[n("a",_,[s("rootProject.name"),e(a)]),s(" 根模块的名字")]),S,G])]),J,C]),D])}const M=l(c,[["render",P],["__file","01.html.vue"]]);export{M as default};
