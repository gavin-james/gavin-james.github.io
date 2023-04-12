<template><div><nav class="table-of-contents"><ul><li><router-link to="#建造者模式基本介绍">建造者模式基本介绍</router-link></li><li><router-link to="#建造者模式的四个角色">建造者模式的四个角色</router-link></li><li><router-link to="#建造者模式结构图">建造者模式结构图</router-link></li><li><router-link to="#盖房案例">盖房案例</router-link></li><li><router-link to="#传统方式解决盖房案例">传统方式解决盖房案例</router-link></li><li><router-link to="#传统方式的问题分析">传统方式的问题分析</router-link></li><li><router-link to="#建造者模式解决盖房案例">建造者模式解决盖房案例</router-link></li><li><router-link to="#建造者模式的-jdk-应用">建造者模式的 JDK 应用</router-link></li><li><router-link to="#建造者模式的注意事项和细节">建造者模式的注意事项和细节</router-link></li><li><router-link to="#建造者模式的应用场景">建造者模式的应用场景</router-link></li></ul></nav>
<h2 id="建造者模式基本介绍" tabindex="-1"><a class="header-anchor" href="#建造者模式基本介绍" aria-hidden="true">#</a> 建造者模式基本介绍</h2>
<p>在软件开发过程中有时需要创建一个复杂的对象，这个复杂对象通常由多个子部件按一定的步骤组合而成。例如，计算机是由 CPU、主板、内存、硬盘、显卡、机箱、显示器、键盘、鼠标等部件组装而成的，采购员不可能自己去组装计算机，而是将计算机的配置要求告诉计算机销售公司，计算机销售公司安排技术人员去组装计算机，然后再交给要买计算机的采购员。</p>
<p>生活中这样的例子很多，如游戏中的不同角色，其性别、个性、能力、脸型、体型、服装、发型等特性都有所差异；还有汽车中的方向盘、发动机、车架、轮胎等部件也多种多样；每封电子邮件的发件人、收件人、主题、内容、附件等内容也各不相同。</p>
<p>以上所有这些产品都是由多个部件构成的，各个部件可以灵活选择，但其创建步骤都大同小异。这类产品的创建无法用前面介绍的工厂模式描述，只有建造者模式可以很好地描述该类产品的创建。</p>
<p><strong>建造者模式</strong>（Builder Pattern）又叫 <strong>生成器模式</strong>，是一种对象 <strong>构建模式</strong>。它可以将复杂对象的建造过程抽象出来（抽象类别），使这个抽象过程的不同实现方法可以构造出不同表现（属性）的对象。</p>
<p><strong>建造者模式</strong> 是一步一步创建一个复杂的对象，它允许用户只通过指定复杂对象的类型和内容就可以构建它们， 用户不需要知道内部的具体构建细节。</p>
<blockquote>
<p>主要优点</p>
</blockquote>
<ul>
<li>
<p>封装性好，构建和表示分离</p>
</li>
<li>
<p>扩展性好，各个具体的建造者相互独立，有利于系统的解耦</p>
</li>
<li>
<p>客户端不必知道产品内部组成的细节，建造者可以对创建过程逐步细化，而不对其它模块产生任何影响，便于控制细节风险</p>
</li>
</ul>
<blockquote>
<p>主要缺点</p>
</blockquote>
<ul>
<li>
<p>产品的组成部分必须相同，这限制了其使用范围</p>
</li>
<li>
<p>如果产品的内部变化复杂，如果产品内部发生变化，则建造者也要同步修改，后期维护成本较大</p>
</li>
</ul>
<p>建造者（Builder Pattern）模式和工厂模式的关注点不同：建造者模式注重零部件的组装过程，而 <a href="https://notes.gavin.cn/design-pattern/factory/#%E5%B7%A5%E5%8E%82%E6%96%B9%E6%B3%95-factory-method" target="_blank" rel="noopener noreferrer">工厂方法模式<ExternalLinkIcon/></a> 更注重零部件的创建过程，但两者可以结合使用。</p>
<h2 id="建造者模式的四个角色" tabindex="-1"><a class="header-anchor" href="#建造者模式的四个角色" aria-hidden="true">#</a> 建造者模式的四个角色</h2>
<ul>
<li>Product（产品角色）：一个具体的产品对象</li>
<li>Builder（抽象建造者）：创建一个 Product 对象的各个部件指定的接口 / 抽象类</li>
<li>ConcreteBuilder（具体建造者）：实现接口，构建和装配各个部件</li>
<li>Director（指挥者）：构建一个使用 Builder 接口的对象。它主要是用于创建一个复杂的对象。它主要有两个作用，一是：隔离了客户与对象的生产过程，二是：负责控制产品对象的生产过程</li>
</ul>
<h2 id="建造者模式结构图" tabindex="-1"><a class="header-anchor" href="#建造者模式结构图" aria-hidden="true">#</a> 建造者模式结构图</h2>
<p>建造者（Builder）模式的主要角色如下：</p>
<ul>
<li>
<p>产品角色（Product）：它是包含多个组成部件的复杂对象，由具体建造者来创建其各个零部件</p>
</li>
<li>
<p>抽象建造者（Builder）：它是一个包含创建产品各个子部件的抽象方法的接口，通常还包含一个返回复杂产品的方法 <code v-pre>getResult()</code></p>
</li>
<li>
<p>具体建造者(Concrete Builder）：实现 Builder 接口，完成复杂产品的各个部件的具体创建方法</p>
</li>
<li>
<p>指挥者（Director）：它调用建造者对象中的部件构造与装配方法完成复杂对象的创建，在指挥者中不涉及具体产品的信息</p>
</li>
</ul>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220316221947.png" alt="image-20220316221946018" loading="lazy"></p>
<h2 id="盖房案例" tabindex="-1"><a class="header-anchor" href="#盖房案例" aria-hidden="true">#</a> 盖房案例</h2>
<ul>
<li>需要建房子：这一过程为打桩、砌墙、封顶</li>
<li>房子有各种各样的，比如普通房，高楼，别墅，各种房子的过程虽然一样，但是要求不要相同的</li>
</ul>
<h2 id="传统方式解决盖房案例" tabindex="-1"><a class="header-anchor" href="#传统方式解决盖房案例" aria-hidden="true">#</a> 传统方式解决盖房案例</h2>
<p>思路分析（图解）</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220302213652.png" alt="image-20220301194218699" loading="lazy"></p>
<p>AbstractHouse 类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractHouse</span> <span class="token punctuation">{</span>

    <span class="token comment">// 打地基</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">buildBasic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 砌墙</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">buildWalls</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 封顶</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">roofed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">buildBasic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">buildWalls</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">roofed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CommonHouse 类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CommonHouse</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractHouse</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">buildBasic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 普通房子打地基 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">buildWalls</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 普通房子砌墙 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">roofed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 普通房子封顶 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Client 类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">CommonHouse</span> commonHouse <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CommonHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		commonHouse<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="传统方式的问题分析" tabindex="-1"><a class="header-anchor" href="#传统方式的问题分析" aria-hidden="true">#</a> 传统方式的问题分析</h2>
<p>优点是比较好理解，简单易操作。</p>
<p>设计的程序结构，过于简单，没有设计缓存层对象，程序的扩展和维护不好. 也就是说，这种设计方案，把产品（即：房子）和创建产品的过程（即：建房子流程）封装在一起，耦合性增强了。</p>
<p>解决方案：将产品和产品建造的过程解耦：<strong>建造者模式</strong>。</p>
<h2 id="建造者模式解决盖房案例" tabindex="-1"><a class="header-anchor" href="#建造者模式解决盖房案例" aria-hidden="true">#</a> 建造者模式解决盖房案例</h2>
<ul>
<li>需要建房子：这一过程为打桩、砌墙、封顶。不管是普通房子也好，别墅也好都需要经历这些过程，下面我们使用建造者模式（Builder Pattern）来完成</li>
<li>思路分析图解（类图）</li>
</ul>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220302213657.png" alt="image-20220301195650273" loading="lazy"></p>
<p>房子 House 类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">House</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> baise<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> wall<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> roofed<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getBaise</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> baise<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setBaise</span><span class="token punctuation">(</span><span class="token class-name">String</span> baise<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>baise <span class="token operator">=</span> baise<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getWall</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> wall<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setWall</span><span class="token punctuation">(</span><span class="token class-name">String</span> wall<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>wall <span class="token operator">=</span> wall<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getRoofed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> roofed<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setRoofed</span><span class="token punctuation">(</span><span class="token class-name">String</span> roofed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>roofed <span class="token operator">=</span> roofed<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>建造者类以及子类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">HouseBuilder</span> <span class="token punctuation">{</span>

    <span class="token keyword">protected</span> <span class="token class-name">House</span> house <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">House</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 将建造的流程写好，抽象的方法</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">buildBasic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">buildWalls</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">roofed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 建造房子好， 将产品（房子）返回</span>
    <span class="token keyword">public</span> <span class="token class-name">House</span> <span class="token function">buildHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> house<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CommonHouse</span> <span class="token keyword">extends</span> <span class="token class-name">HouseBuilder</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">buildBasic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 普通房子打地基 5 米 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">buildWalls</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 普通房子砌墙 10cm "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">roofed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 普通房子屋顶 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HighBuilding</span> <span class="token keyword">extends</span> <span class="token class-name">HouseBuilder</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">buildBasic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 高楼的打地基 100 米 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">buildWalls</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 高楼的砌墙 20cm "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">roofed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 高楼的透明屋顶 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>HouseDirector 类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HouseDirector</span> <span class="token punctuation">{</span>
    <span class="token class-name">HouseBuilder</span> houseBuilder <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token comment">// 构造器传入 houseBuilder</span>
    <span class="token keyword">public</span> <span class="token class-name">HouseDirector</span><span class="token punctuation">(</span><span class="token class-name">HouseBuilder</span> houseBuilder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>houseBuilder <span class="token operator">=</span> houseBuilder<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 通过 setter 传入 houseBuilder</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setHouseBuilder</span><span class="token punctuation">(</span><span class="token class-name">HouseBuilder</span> houseBuilder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>houseBuilder <span class="token operator">=</span> houseBuilder<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 如何处理建造房子的流程，交给指挥者</span>
    <span class="token keyword">public</span> <span class="token class-name">House</span> <span class="token function">constructHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        houseBuilder<span class="token punctuation">.</span><span class="token function">buildBasic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        houseBuilder<span class="token punctuation">.</span><span class="token function">buildWalls</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        houseBuilder<span class="token punctuation">.</span><span class="token function">roofed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> houseBuilder<span class="token punctuation">.</span><span class="token function">buildHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Client 测试类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">// 盖普通房子</span>
        <span class="token class-name">CommonHouse</span> commonHouse <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CommonHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 准备创建房子的指挥者</span>
        <span class="token class-name">HouseDirector</span> houseDirector <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HouseDirector</span><span class="token punctuation">(</span>commonHouse<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 完成盖房子，返回产品(普通房子)</span>
        <span class="token class-name">House</span> house <span class="token operator">=</span> houseDirector<span class="token punctuation">.</span><span class="token function">constructHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// System.out.println("输出流程");</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"--------------------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 盖高楼</span>
        <span class="token class-name">HighBuilding</span> highBuilding <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HighBuilding</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 重置建造者</span>
        houseDirector<span class="token punctuation">.</span><span class="token function">setHouseBuilder</span><span class="token punctuation">(</span>highBuilding<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 完成盖房子，返回产品(高楼)</span>
        houseDirector<span class="token punctuation">.</span><span class="token function">constructHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="建造者模式的-jdk-应用" tabindex="-1"><a class="header-anchor" href="#建造者模式的-jdk-应用" aria-hidden="true">#</a> 建造者模式的 JDK 应用</h2>
<p><code v-pre>java.lang.StringBuilder</code> 使用了建造者模式</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220302213700.png" alt="image-20220301201855363" loading="lazy"></p>
<p>源码中建造者模式角色分析：</p>
<ul>
<li>Appendable 接口定义了多个 append 方法（抽象方法），即 Appendable 为抽象建造者，定义了抽象方法</li>
<li>AbstractStringBuilder 实现了 <code v-pre>Appendable</code> 接口方法，这里的 AbstractStringBuilder 已经是建造者，只是不能实例化</li>
<li>StringBuilder 即充当了指挥者角色，同时充当了具体的建造者，建造方法的实现是由 AbstractStringBuilder 完成, 而 StringBuilder 继承了 AbstractStringBuilder</li>
</ul>
<h2 id="建造者模式的注意事项和细节" tabindex="-1"><a class="header-anchor" href="#建造者模式的注意事项和细节" aria-hidden="true">#</a> 建造者模式的注意事项和细节</h2>
<ul>
<li>客户端（使用程序）不必知道产品内部组成的细节，将产品本身与产品的创建过程解耦，使得相同的创建过程可以创建不同的产品对象</li>
<li>每一个具体建造者都相对独立，而与其他的具体建造者无关，因此可以很方便地替换具体建造者或增加新的具体建造者，用户使用不同的具体建造者即可得到不同的产品对象</li>
<li>可以更加精细地控制产品的创建过程。将复杂产品的创建步骤分解在不同的方法中，使得创建过程更加清晰，也更方便使用程序来控制创建过程</li>
<li>增加新的具体建造者无须修改原有类库的代码，指挥者类针对抽象建造者类编程，系统扩展方便，符合 <strong>开闭原则</strong></li>
<li>建造者模式所创建的产品一般具有较多的共同点，其组成部分相似，如果产品之间的差异性很大，则不适合使用建造者模式，因此其使用范围受到一定的限制</li>
<li>如果产品的内部变化复杂，可能会导致需要定义很多具体建造者类来实现这种变化，导致系统变得很庞大，因此在这种情况下，要考虑是否选择建造者模式</li>
</ul>
<blockquote>
<p>抽象工厂模式 VS 建造者</p>
</blockquote>
<p>抽象工厂模式实现对产品家族的创建，一个产品家族是这样的一系列产品：具有不同分类维度的产品组合，采用抽象工厂模式不需要关心构建过程，只关心什么产品由什么工厂生产即可。而建造者模式则是要求按照指定的蓝图建造产品，它的主要目的是通过组装零配件而产生一个新产品。</p>
<h2 id="建造者模式的应用场景" tabindex="-1"><a class="header-anchor" href="#建造者模式的应用场景" aria-hidden="true">#</a> 建造者模式的应用场景</h2>
<p>建造者模式唯一区别于工厂模式的是针对复杂对象的创建。也就是说，如果创建简单对象，通常都是使用工厂模式进行创建，而如果创建复杂对象，就可以考虑使用建造者模式。</p>
<p>当需要创建的产品具备复杂创建过程时，可以抽取出共性创建过程，然后交由具体实现类自定义创建流程，使得同样的创建行为可以生产出不同的产品，分离了创建与表示，使创建产品的灵活性大大增加。</p>
<p>建造者模式主要适用于以下应用场景：</p>
<ul>
<li>相同的方法，不同的执行顺序，产生不同的结果</li>
<li>多个部件或零件，都可以装配到一个对象中，但是产生的结果又不相同</li>
<li>产品类非常复杂，或者产品类中不同的调用顺序产生不同的作用</li>
<li>初始化一个对象特别复杂，参数多，而且很多参数都具有默认值</li>
</ul>
</div></template>
