<template><div><h2 id="单例设计模式介绍" tabindex="-1"><a class="header-anchor" href="#单例设计模式介绍" aria-hidden="true">#</a> 单例设计模式介绍</h2>
<p>在计算机系统中，还有 Windows 的回收站、操作系统中的文件系统、多线程中的线程池、显卡的驱动程序对象、打印机的后台处理服务、应用程序的日志对象、数据库的连接池、网站的计数器、Web 应用的配置对象、应用程序中的对话框、系统中的缓存等常常被设计成单例。</p>
<p>所谓类的 <strong>单例设计模式</strong>，就是 <strong>采取一定的方法保证在整个的软件系统中，对某个类只能存在一个对象实例</strong>，并且该类只提供一个取得其对象实例的方法（静态方法）。</p>
<p>比如 Hibernate 的 SessionFactory，它充当数据存储源的代理，并负责创建 Session 对象。SessionFactory 并不是轻量级的，一般情况下，一个项目通常只需要一个 SessionFactory 就够，这是就会使用到单例模式。</p>
<p>单例模式在现实生活中的应用也非常广泛，例如公司 CEO、部门经理等都属于单例模型。J2EE 标准中的 Servlet Context 和 ServletContextConfig、Spring 框架应用中的 ApplicationContext、数据库中的连接池等也都是单例模式。</p>
<blockquote>
<p>主要优点</p>
</blockquote>
<ul>
<li>单例模式可以保证内存里只有一个实例，减少了内存的开销</li>
<li>可以避免对资源的多重占用</li>
<li>单例模式设置全局访问点，可以优化和共享资源的访问</li>
</ul>
<blockquote>
<p>主要缺点</p>
</blockquote>
<ul>
<li>单例模式一般没有接口，扩展困难。如果要扩展，则除了修改原来的代码，没有第二种途径，违背开闭原则</li>
<li>在并发测试中，单例模式不利于代码调试。在调试过程中，如果单例中的代码没有执行完，也不能模拟生成一个新的对象</li>
<li>单例模式的功能代码通常写在一个类中，如果功能设计不合理，则很容易违背单一职责原则</li>
</ul>
<h2 id="单例设计模式八种方式" tabindex="-1"><a class="header-anchor" href="#单例设计模式八种方式" aria-hidden="true">#</a> 单例设计模式八种方式</h2>
<p>单例模式有八种方式：</p>
<ul>
<li><strong>饿汉式（静态常量）</strong></li>
<li><strong>饿汉式（静态代码块）</strong></li>
<li>懒汉式（线程不安全）</li>
<li>懒汉式（线程安全，同步方法）</li>
<li>懒汉式（线程安全，同步代码块）</li>
<li><strong>双重检查</strong></li>
<li><strong>静态内部类</strong></li>
<li><strong>枚举</strong></li>
</ul>
<h3 id="饿汉式-静态常量" tabindex="-1"><a class="header-anchor" href="#饿汉式-静态常量" aria-hidden="true">#</a> 饿汉式（静态常量）</h3>
<p>饿汉式（静态常量）步骤如下：</p>
<ul>
<li>构造器私有化 (防止 new )</li>
<li>类的内部创建对象</li>
<li>向外暴露一个静态的公共方法。如 <code v-pre>getInstance()</code></li>
</ul>
<p>代码实现</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SingletonTest01</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 测试</span>
		<span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Singleton</span> instance2 <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> instance2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"instance.hashCode="</span> <span class="token operator">+</span> instance<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// instance.hashCode=968514068</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"instance2.hashCode="</span> <span class="token operator">+</span> instance2<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// instance2.hashCode=968514068</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token comment">// 饿汉式（静态常量）</span>
<span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
	
	<span class="token comment">// 1. 构造器私有化，外部能 new</span>
	<span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		
	<span class="token punctuation">}</span>
	
	<span class="token comment">// 2.本类内部创建对象实例</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	
	<span class="token comment">// 3. 提供一个公有的静态方法，返回实例对象</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> instance<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优缺点说明</strong></p>
<ul>
<li>优点：这种写法比较简单，就是在类装载的时候就完成实例化。避免了线程同步问题</li>
<li>缺点：在类装载的时候就完成实例化，没有达到 Lazy Loading 的效果。如果从始至终从未使用过这个实例，则 会造成内存的浪费</li>
<li>这种方式基于 classloder 机制避免了多线程的同步问题，不过，instance 在类装载时就实例化，在单例模式中大多数都是调用 <code v-pre>getInstance</code> 方法，但是导致类装载的原因有很多种，因此不能确定有其他的方式（或者其他的静态方法）导致类装载，这时候初始化 instance 就没有达到 lazy loading 的效果</li>
</ul>
<p>结论：这种单例模式 <strong>可用</strong>，<strong>可能</strong> 造成内存浪费。</p>
<h3 id="饿汉式-静态代码块" tabindex="-1"><a class="header-anchor" href="#饿汉式-静态代码块" aria-hidden="true">#</a> 饿汉式（静态代码块）</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SingletonTest02</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 测试</span>
		<span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Singleton</span> instance2 <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> instance2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"instance.hashCode="</span> <span class="token operator">+</span> instance<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"instance2.hashCode="</span> <span class="token operator">+</span> instance2<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token comment">// 饿汉式（静态代码块）</span>
<span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
	
	<span class="token comment">// 1. 构造器私有化, 外部能new</span>
	<span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		
	<span class="token punctuation">}</span>

	<span class="token comment">// 2.本类内部创建对象实例</span>
	<span class="token keyword">private</span>  <span class="token keyword">static</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>
	
	<span class="token keyword">static</span> <span class="token punctuation">{</span> <span class="token comment">// 在静态代码块中，创建单例对象</span>
		instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token comment">// 3. 提供一个公有的静态方法，返回实例对象</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> instance<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优缺点说明</strong></p>
<p>这种方式和上面的方式其实类似，只不过将类实例化的过程放在了静态代码块中，也是在类装载的时候，就执行静态代码块中的代码，初始化类的实例。优缺点和上面 <strong>是一样的</strong>。</p>
<p>结论：这种单例模式可用，但是可能造成内存浪费。</p>
<h3 id="懒汉式-线程不安全" tabindex="-1"><a class="header-anchor" href="#懒汉式-线程不安全" aria-hidden="true">#</a> 懒汉式（线程不安全）</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SingletonTest03</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"懒汉式1 ， 线程不安全~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Singleton</span> instance2 <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> instance2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"instance.hashCode="</span> <span class="token operator">+</span> instance<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"instance2.hashCode="</span> <span class="token operator">+</span> instance2<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token comment">// 懒汉式（线程不安全）</span>
<span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// 提供一个静态的公有方法，当使用到该方法时，才去创建 instance</span>
    <span class="token comment">// 即懒汉式</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优缺点说明</strong></p>
<ul>
<li>起到了 <code v-pre>Lazy Loading</code> 的效果，但是只能在单线程下使用</li>
<li>如果在多线程下，一个线程进入了 <code v-pre>if (singleton == null)</code> 判断语句块，还未来得及往下执行，另一个线程也通过了这个判断语句，这时便会产生多个实例。所以在多线程环境下不可使用这种方式</li>
</ul>
<p>结论：在实际开发中，<strong>不要使用</strong> 这种方式。</p>
<h3 id="懒汉式-线程安全-同步方法" tabindex="-1"><a class="header-anchor" href="#懒汉式-线程安全-同步方法" aria-hidden="true">#</a> 懒汉式（线程安全，同步方法）</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SingletonTest04</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"懒汉式2 ， 线程安全~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Singleton</span> instance2 <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> instance2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"instance.hashCode="</span> <span class="token operator">+</span> instance<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"instance2.hashCode="</span> <span class="token operator">+</span> instance2<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token comment">// 懒汉式（线程安全，同步方法）</span>
<span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>
	
	<span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	
	<span class="token comment">// 提供一个静态的公有方法，加入同步处理的代码，解决线程安全问题</span>
	<span class="token comment">// 即懒汉式</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">synchronized</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> instance<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优缺点说明</strong></p>
<ul>
<li>解决了 <strong>线程安全</strong> 问题</li>
<li>但是效率太低了，每个线程在想获得类的实例时候，执行 <code v-pre>getInstance()</code> 方法都要进行同步。而其实这个方法只执行 一次实例化代码就够了，后面的想获得该类实例，直接 return 就行了。方法进行同步效率太低</li>
</ul>
<p>结论：在实际开发中，<strong>不推荐</strong> 使用这种方式。</p>
<h3 id="懒汉式-线程安全-同步代码块" tabindex="-1"><a class="header-anchor" href="#懒汉式-线程安全-同步代码块" aria-hidden="true">#</a> 懒汉式（线程安全，同步代码块）</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SingletonTest04</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"懒汉式2 ， 线程安全~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Singleton</span> instance2 <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> instance2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"instance.hashCode="</span> <span class="token operator">+</span> instance<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"instance2.hashCode="</span> <span class="token operator">+</span> instance2<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 懒汉式（线程安全，同步方法）</span>
<span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>
	
	<span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	
	<span class="token comment">// 提供一个静态的公有方法，加入同步处理的代码，解决线程安全问题</span>
	<span class="token comment">// 即懒汉式</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">synchronized</span><span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> instance<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和懒汉式（线程安全，同步方法）类似，<strong>不推荐使用</strong>。</p>
<h3 id="双重检查" tabindex="-1"><a class="header-anchor" href="#双重检查" aria-hidden="true">#</a> 双重检查</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SingletonTest06</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"双重检查"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Singleton</span> instance2 <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> instance2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"instance.hashCode="</span> <span class="token operator">+</span> instance<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"instance2.hashCode="</span> <span class="token operator">+</span> instance2<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 懒汉式(线程安全，同步方法)</span>
<span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">volatile</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>
	
	<span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	
	<span class="token comment">// 提供一个静态的公有方法，加入双重检查代码，解决线程安全问题, 同时解决懒加载问题</span>
	<span class="token comment">// 同时保证了效率, 推荐使用</span>
	
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">synchronized</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> instance<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优缺点说明</strong></p>
<ul>
<li>Double-Check 概念是多线程开发中常使用到的，如代码中所示，我们进行了两次 <code v-pre>if (singleton == null)</code> 检查，这样就可以保证线程安全了</li>
<li>这样，实例化代码只用执行一次，后面再次访问时，判断 <code v-pre>if (singleton == null)</code>，直接 return 实例化对象，也避免的反复进行方法同步</li>
<li><strong>线程安全；延迟加载；效率较高</strong></li>
</ul>
<p>结论：在实际开发中，<strong>推荐使用这种单例设计模式</strong>。</p>
<h3 id="静态内部类" tabindex="-1"><a class="header-anchor" href="#静态内部类" aria-hidden="true">#</a> 静态内部类</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SingletonTest07</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"使用静态内部类完成单例模式"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Singleton</span> instance2 <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> instance2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"instance.hashCode="</span> <span class="token operator">+</span> instance<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"instance2.hashCode="</span> <span class="token operator">+</span> instance2<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 静态内部类完成，推荐使用</span>
<span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">volatile</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>
	
	<span class="token comment">// 构造器私有化</span>
	<span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	
	<span class="token comment">// 写一个静态内部类，该类中有一个静态属性 Singleton</span>
	<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SingletonInstance</span> <span class="token punctuation">{</span>
		<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Singleton</span> INSTANCE <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
	<span class="token punctuation">}</span>
	
	<span class="token comment">// 提供一个静态的公有方法，直接返回 SingletonInstance.INSTANCE</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">synchronized</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token class-name">SingletonInstance</span><span class="token punctuation">.</span>INSTANCE<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优缺点说明</strong></p>
<ul>
<li>这种方式采用了类装载的机制来保证初始化实例时只有一个线程</li>
<li>静态内部类方式在 Singleton 类被装载时并不会立即实例化，而是在需要实例化时，调用 <code v-pre>getInstance</code> 方法，才会装载 SingletonInstance 类，从而完成 Singleton 的实例化</li>
<li>类的静态属性只会在第一次加载类的时候初始化，所以在这里，JVM 帮助我们保证了线程的安全性，在类进行初始化时，别的线程是无法进入的</li>
<li>优点：<strong>避免了线程不安全</strong>，利用 <strong>静态内部类特点实现延迟加载，效率高</strong></li>
</ul>
<p>结论：<strong>推荐使用</strong>。</p>
<h3 id="枚举" tabindex="-1"><a class="header-anchor" href="#枚举" aria-hidden="true">#</a> 枚举</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SingletonTest08</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span>INSTANCE<span class="token punctuation">;</span>
        <span class="token class-name">Singleton</span> instance2 <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span>INSTANCE<span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> instance2<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>instance2<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        instance<span class="token punctuation">.</span><span class="token function">sayOK</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用枚举，可以实现单例, 推荐</span>
<span class="token keyword">enum</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    INSTANCE<span class="token punctuation">;</span> <span class="token comment">// 属性，代表 Singleton s</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sayOK</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"ok~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优缺点说明</strong></p>
<ul>
<li>这借助 JDK1.5 中添加的枚举来实现单例模式。不仅能避免多线程同步问题，而且还能防止反序列化重新创建新的对象</li>
<li>这种方式是 Effective Java 的作者 Josh Bloch 提倡的方式</li>
</ul>
<p>结论：<strong>推荐使用</strong>。</p>
<h2 id="单例模式jdk应用" tabindex="-1"><a class="header-anchor" href="#单例模式jdk应用" aria-hidden="true">#</a> 单例模式JDK应用</h2>
<p>在 JDK 中，<code v-pre>java.lang.Runtime</code> 就是经典的单例模式：饿汉式（静态常量）。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Runtime</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Runtime</span> currentRuntime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Runtime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Version</span> version<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Runtime</span> <span class="token function">getRuntime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> currentRuntime<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">Runtime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="单例模式注意事项和细节说明" tabindex="-1"><a class="header-anchor" href="#单例模式注意事项和细节说明" aria-hidden="true">#</a> 单例模式注意事项和细节说明</h2>
<p>单例模式保证了 系统内存中该类只存在一个对象，节省了系统资源，对于一些需要频繁创建销毁的对象，使用单例模式可以提高系统性能。</p>
<p>当想实例化一个单例类的时候，必须要记住使用相应的获取对象的方法，而不是使用 new。</p>
<p>单例模式使用的场景：需要 <strong>频繁的进行创建和销毁的对象</strong>、创建对象时耗时过多或耗费资源过多(即：<strong>重量级对象</strong>)，但又经常用到的对象、<strong>工具类对象</strong>、频繁访问数据库或文件的对象(比如 <strong>数据源、session 工厂</strong> 等)。</p>
<h2 id="单例模式的应用场景" tabindex="-1"><a class="header-anchor" href="#单例模式的应用场景" aria-hidden="true">#</a> 单例模式的应用场景</h2>
<p>对于 Java 来说，单例模式可以保证在一个 JVM 中只存在单一实例。单例模式的应用场景主要有以下几个方面：</p>
<ul>
<li>需要频繁创建的一些类，使用单例可以降低系统的内存压力，减少 GC</li>
<li>某类只要求生成一个对象的时候，如一个班中的班长、每个人的身份证号等</li>
<li>某些类创建实例时占用资源较多，或实例化耗时较长，且经常使用</li>
<li>某类需要频繁实例化，而创建的对象又频繁被销毁的时候，如多线程的线程池、网络连接池等</li>
<li>频繁访问数据库或文件的对象</li>
<li>对于一些控制硬件级别的操作，或者从系统上来讲应当是单一控制逻辑的操作，如果有多个实例，则系统会完全乱套</li>
<li>当对象需要被共享的场合。由于单例模式只允许创建一个对象，共享该对象可以节省内存，并加快对象访问速度。如 Web 中的配置对象、数据库的连接池等</li>
</ul>
<h2 id="单例存在哪些问题" tabindex="-1"><a class="header-anchor" href="#单例存在哪些问题" aria-hidden="true">#</a> 单例存在哪些问题</h2>
<p>尽管单例是一个很常用的设计模式，在实际的开发中，我们也确实经常用到它，但是，有些人认为单例是一种反模式（anti-pattern），并不推荐使用。大部分情况下，我们在项目中使用单例，都是用它来表示一些全局唯一类，比如配置信息类、连接池类、ID 生成器类。单例模式书写简洁、使用方便，在代码中，我们不需要创建对象，直接通过类似 IdGenerator.getInstance().getId() 这样的方法来调用就可以了。但是，这种使用方法有点类似硬编码（hard code），会带来诸多问题。接下来，我们就具体看看到底有哪些问题。</p>
<h3 id="单例对-oop-特性的支持不友好" tabindex="-1"><a class="header-anchor" href="#单例对-oop-特性的支持不友好" aria-hidden="true">#</a> 单例对 OOP 特性的支持不友好</h3>
<p>我们知道，OOP 的四大特性是封装、抽象、继承、多态。单例这种设计模式对于其中的抽象、继承、多态都支持得不好。为什么这么说呢？我们还是通过 IdGenerator 这个例子来讲解。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Order</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//...</span>
        <span class="token keyword">long</span> id <span class="token operator">=</span> <span class="token class-name">IdGenerator</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        <span class="token keyword">long</span> id <span class="token operator">=</span> <span class="token class-name">IdGenerator</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>IdGenerator 的使用方式违背了基于接口而非实现的设计原则，也就违背了广义上理解的 OOP 的抽象特性。如果未来某一天，我们希望针对不同的业务采用不同的 ID 生成算法。比如，订单 ID 和用户 ID 采用不同的 ID 生成器来生成。为了应对这个需求变化，我们需要修改所有用到 IdGenerator 类的地方，这样代码的改动就会比较大。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Order</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        <span class="token keyword">long</span> id <span class="token operator">=</span> <span class="token class-name">IdGenerator</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 需要将上面一行代码，替换为下面一行代码</span>
        <span class="token keyword">long</span> id <span class="token operator">=</span> <span class="token class-name">OrderIdGenerator</span><span class="token punctuation">.</span><span class="token function">getIntance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        <span class="token keyword">long</span> id <span class="token operator">=</span> <span class="token class-name">IdGenerator</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 需要将上面一行代码，替换为下面一行代码</span>
        <span class="token keyword">long</span> id <span class="token operator">=</span> <span class="token class-name">UserIdGenerator</span><span class="token punctuation">.</span><span class="token function">getIntance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外，单例对继承、多态特性的支持也不友好。这里之所以会用「不友好」这个词，而非「完全不支持」，是因为从理论上来讲，单例类也可以被继承、也可以实现多态，只是实现起来会非常奇怪，会导致代码的可读性变差。不明白设计意图的人，看到这样的设计，会觉得莫名其妙。所以，一旦你选择将某个类设计成到单例类，也就意味着放弃了继承和多态这两个强有力的面向对象特性，也就相当于损失了可以应对未来需求变化的扩展性</p>
<h3 id="单例会隐藏类之间的依赖关系" tabindex="-1"><a class="header-anchor" href="#单例会隐藏类之间的依赖关系" aria-hidden="true">#</a> 单例会隐藏类之间的依赖关系</h3>
<p>我们知道，代码的可读性非常重要。在阅读代码的时候，我们希望一眼就能看出类与类之间的依赖关系，搞清楚这个类依赖了哪些外部类。通过构造函数、参数传递等方式声明的类之间的依赖关系，我们通过查看函数的定义，就能很容易识别出来。但是，单例类不需要显示创建、不需要依赖参数传递，在函数中直接调用就可以了。如果代码比较复杂，这种调用关系就会非常隐蔽。在阅读代码的时候，我们就需要仔细查看每个函数的代码实现，才能知道这个类到底依赖了哪些单例类。</p>
<h3 id="单例对代码的扩展性不友好" tabindex="-1"><a class="header-anchor" href="#单例对代码的扩展性不友好" aria-hidden="true">#</a> 单例对代码的扩展性不友好</h3>
<ol>
<li>我们知道，单例类只能有一个对象实例。如果未来某一天，我们需要在代码中创建两个实例或多个实例，那就要对代码有比较大的改动。你可能会说，会有这样的需求吗？既然单例类大部分情况下都用来表示全局类，怎么会需要两个或者多个实例呢</li>
<li>实际上，这样的需求并不少见。我们拿数据库连接池来举例解释一下</li>
<li>在系统设计初期，我们觉得系统中只应该有一个数据库连接池，这样能方便我们控制对数据库连接资源的消耗。所以，我们把数据库连接池类设计成了单例类。但之后我们发现，系统中有些 SQL 语句运行得非常慢。这些 SQL 语句在执行的时候，长时间占用数据库连接资源，导致其他 SQL 请求无法响应。为了解决这个问题，我们希望将慢 SQL 与其他 SQL 隔离开来执行。为了实现这样的目的，我们可以在系统中创建两个数据库连接池，慢 SQL 独享一个数据库连接池，其他 SQL 独享另外一个数据库连接池，这样就能避免慢 SQL 影响到其他 SQL 的执行</li>
<li>如果我们将数据库连接池设计成单例类，显然就无法适应这样的需求变更，也就是说，单例类在某些情况下会影响代码的扩展性、灵活性。所以，数据库连接池、线程池这类的资源池，最好还是不要设计成单例类。实际上，一些开源的数据库连接池、线程池也确实没有设计成单例类</li>
</ol>
<h3 id="单例对代码的可测试性不友好" tabindex="-1"><a class="header-anchor" href="#单例对代码的可测试性不友好" aria-hidden="true">#</a> 单例对代码的可测试性不友好</h3>
<ol>
<li>
<p>单例模式的使用会影响到代码的可测试性。如果单例类依赖比较重的外部资源，比如 DB，我们在写单元测试的时候，希望能通过 mock 的方式将它替换掉。而单例类这种硬编码式的使用方式，导致无法实现 mock 替换</p>
</li>
<li>
<p>除此之外，如果单例类持有成员变量（比如 IdGenerator 中的 id 成员变量），那它实际上相当于一种全局变量，被所有的代码共享。如果这个全局变量是一个可变全局变量，也就是说，它的成员变量是可以被修改的，那我们在编写单元测试的时候，还需要注意不同测试用例之间，修改了单例类中的同一个成员变量的值，从而导致测试结果互相影响的问题</p>
</li>
</ol>
<h3 id="单例不支持有参数的构造函数" tabindex="-1"><a class="header-anchor" href="#单例不支持有参数的构造函数" aria-hidden="true">#</a> 单例不支持有参数的构造函数</h3>
<p>单例不支持有参数的构造函数，比如我们创建一个连接池的单例对象，我们没法通过参数来指定连接池的大小。针对这个问题，我们来看下都有哪些解决方案。</p>
<p><strong>第一种解决思路是</strong>：创建完实例之后，再调用 <code v-pre>init()</code> 函数传递参数。需要注意的是，我们在使用这个单例类的时候，要先调用 <code v-pre>init()</code> 方法，然后才能调用 <code v-pre>getInstance()</code> 方法，否则代码会抛出异常。具体的代码实现如下所示：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> paramA<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> paramB<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token keyword">int</span> paramA<span class="token punctuation">,</span> <span class="token keyword">int</span> paramB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>paramA <span class="token operator">=</span> paramA<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>paramB <span class="token operator">=</span> paramB<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"Run init() first."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token keyword">int</span> paramA<span class="token punctuation">,</span> <span class="token keyword">int</span> paramB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"Singleton has been created!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span>paramA<span class="token punctuation">,</span> paramB<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 先 init，再使用</span>
<span class="token class-name">Singleton</span> singleton <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第二种解决思路是</strong>：将参数放到 <code v-pre>getIntance()</code> 方法中。具体的代码实现如下所示：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> paramA<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> paramB<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token keyword">int</span> paramA<span class="token punctuation">,</span> <span class="token keyword">int</span> paramB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>paramA <span class="token operator">=</span> paramA<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>paramB <span class="token operator">=</span> paramB<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token keyword">int</span> paramA<span class="token punctuation">,</span> <span class="token keyword">int</span> paramB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span>paramA<span class="token punctuation">,</span> paramB<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token class-name">Singleton</span> singleton <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不知道你有没有发现，上面的代码实现稍微有点问题。如果我们如下两次执行 <code v-pre>getInstance()</code> 方法，那获取到的 singleton1 和 signleton2 的 paramA 和 paramB 都是 10 和 50。也就是说，第二次的参数（20，30）没有起作用，而构建的过程也没有给与提示，这样就会误导用户。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Singleton</span> singleton1 <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Singleton</span> singleton2 <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第三种解决思路是</strong>：将参数放到另外一个全局变量中。具体的代码实现如下。Config 是一个存储了 paramA 和 paramB 值的全局变量。里面的值既可以像下面的代码那样通过静态常量来定义，也可以从配置文件中加载得到。<strong>实际上，这种方式是最值得推荐的</strong>。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Config</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> PARAM_A <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> PARAM_B <span class="token operator">=</span> <span class="token number">245</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> paramA<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> paramB<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>paramA <span class="token operator">=</span> <span class="token class-name">Config</span><span class="token punctuation">.</span>PARAM_A<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>paramB <span class="token operator">=</span> <span class="token class-name">Config</span><span class="token punctuation">.</span>PARAM_B<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="有何替代解决方案" tabindex="-1"><a class="header-anchor" href="#有何替代解决方案" aria-hidden="true">#</a> 有何替代解决方案</h2>
<p>刚刚我们提到了单例的很多问题，你可能会说，即便单例有这么多问题，但我不用不行啊。我业务上有表示全局唯一类的需求，如果不用单例，我怎么才能保证这个类的对象全局唯一呢？为了保证全局唯一，除了使用单例，我们还可以用静态方法来实现。这也是项目开发中经常用到的一种实现思路。比如， ID 唯一递增生成器的例子，用静态方法实现一下，就是下面这个样子：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 静态方法实现方式</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IdGenerator</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">AtomicLong</span> id <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicLong</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">long</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token keyword">return</span> id<span class="token punctuation">.</span><span class="token function">incrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 使用举例</span>
<span class="token keyword">long</span> id <span class="token operator">=</span> <span class="token class-name">IdGenerator</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过，静态方法这种实现思路，并不能解决我们之前提到的问题。实际上，它比单例更加不灵活，比如，它无法支持延迟加载。我们再来看看有没有其他办法。实际上，单例除了我们之前讲到的使用方法之外，还有另外一种使用方法。具体的代码如下所示：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 1. 老的使用方式</span>
<span class="token keyword">public</span> <span class="token function">demofunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
    <span class="token keyword">long</span> id <span class="token operator">=</span> <span class="token class-name">IdGenerator</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>

<span class="token comment">// 2. 新的使用方式：依赖注入</span>
<span class="token keyword">public</span> <span class="token function">demofunction</span><span class="token punctuation">(</span><span class="token class-name">IdGenerator</span> idGenerator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> id <span class="token operator">=</span> idGenerator<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 外部调用demofunction()的时候，传入idGenerator</span>
<span class="token class-name">IdGenerator</span> idGenerator <span class="token operator">=</span> <span class="token class-name">IdGenerator</span><span class="token punctuation">.</span><span class="token function">getInsance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">demofunction</span><span class="token punctuation">(</span>idGenerator<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>基于新的使用方式，我们将单例生成的对象，作为参数传递给函数（也可以通过构造函数传递给类的成员变量），可以解决单例隐藏类之间依赖关系的问题。不过，对于单例存在的其他问题，比如对 OOP 特性、扩展性、可测性不友好等问题，还是无法解决</li>
<li>所以，如果要完全解决这些问题，我们可能要从根上，寻找其他方式来实现全局唯一类。实际上，类对象的全局唯一性可以通过多种不同的方式来保证。我们既可以通过单例模式来强制保证，也可以通过工厂模式、IOC 容器（比如 Spring IOC 容器）来保证，还可以通过程序员自己来保证（自己在编写代码的时候自己保证不要创建两个类对象）。这就类似 Java 中内存对象的释放由 JVM 来负责，而 C++ 中由程序员自己负责，道理是一样的</li>
<li>对于替代方案工厂模式、IOC 容器的详细讲解，我们放到后面讲解</li>
</ol>
<h2 id="如何理解单例模式中的唯一性" tabindex="-1"><a class="header-anchor" href="#如何理解单例模式中的唯一性" aria-hidden="true">#</a> 如何理解单例模式中的唯一性</h2>
<ol>
<li>首先，我们重新看一下单例的定义：「一个类只允许创建唯一一个对象（或者实例），那这个类就是一个单例类，这种设计模式就叫作单例设计模式，简称单例模式</li>
<li>定义中提到，「一个类只允许创建唯一一个对象」。那对象的唯一性的作用范围是什么呢？是指线程内只允许创建一个对象，还是指进程内只允许创建一个对象？答案是后者，也就是说，单例模式创建的对象是进程唯一的。这里有点不好理解，我来详细地解释一下</li>
<li>我们编写的代码，通过编译、链接，组织在一起，就构成了一个操作系统可以执行的文件，也就是我们平时所说的「可执行文件」（比如 Windows 下的 exe 文件）。可执行文件实际上就是代码被翻译成操作系统可理解的一组指令，你完全可以简单地理解为就是代码本身</li>
<li>当我们使用命令行或者双击运行这个可执行文件的时候，操作系统会启动一个进程，将这个执行文件从磁盘加载到自己的进程地址空间（可以理解操作系统为进程分配的内存存储区，用来存储代码和数据）。接着，进程就一条一条地执行可执行文件中包含的代码。比如，当进程读到代码中的 <code v-pre>User user = new User();</code> 这条语句的时候，它就在自己的地址空间中创建一个 user 临时变量和一个 User 对象。进程之间是不共享地址空间的，如果我们在一个进程中创建另外一个进程（比如，代码中有一个 fork() 语句，进程执行到这条语句的时候会创建一个新的进程），操作系统会给新进程分配新的地址空间，并且将老进程地址空间的所有内容，重新拷贝一份到新进程的地址空间中，这些内容包括代码、数据（比如 user 临时变量、User 对象）</li>
<li>所以，单例类在老进程中存在且只能存在一个对象，在新进程中也会存在且只能存在一个对象。而且，这两个对象并不是同一个对象，这也就说，单例类中对象的唯一性的作用范围是进程内的，在进程间是不唯一的</li>
</ol>
<h2 id="如何实现线程唯一的单例" tabindex="-1"><a class="header-anchor" href="#如何实现线程唯一的单例" aria-hidden="true">#</a> 如何实现线程唯一的单例</h2>
<ol>
<li>
<p>刚刚我们讲了单例类对象是进程唯一的，一个进程只能有一个单例对象。那如何实现一个线程唯一的单例呢</p>
</li>
<li>
<p>我们先来看一下，什么是线程唯一的单例，以及「线程唯一」和「进程唯一」的区别</p>
</li>
<li>
<p>「进程唯一」指的是进程内唯一，进程间不唯一。类比一下，「线程唯一」指的是线程内唯一，线程间可以不唯一。实际上，「进程唯一」还代表了线程内、线程间都唯一，这也是「进程唯一」和「线程唯一」的区别之处。这段话听起来有点像绕口令，我举个例子来解释一下</p>
</li>
<li>
<p>假设 IdGenerator 是一个线程唯一的单例类。在线程 A 内，我们可以创建一个单例对象 a。因为线程内唯一，在线程 A 内就不能再创建新的 IdGenerator 对象了，而线程间可以不唯一，所以，在另外一个线程 B 内，我们还可以重新创建一个新的单例对象 b</p>
</li>
<li>
<p>尽管概念理解起来比较复杂，但线程唯一单例的代码实现很简单，如下所示。在代码中，我们通过一个 HashMap 来存储对象，其中 key 是线程 ID，value 是对象。这样我们就可以做到，不同的线程对应不同的对象，同一个线程只能对应一个对象。实际上，Java 语言本身提供了 ThreadLocal 工具类，可以更加轻松地实现线程唯一单例。不过，ThreadLocal 底层实现原理也是基于下面代码中所示的 HashMap</p>
</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IdGenerator</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">AtomicLong</span> id <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicLong</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">IdGenerator</span><span class="token punctuation">></span></span> instances
        <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">IdGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">IdGenerator</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Long</span> currentThreadId <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        instances<span class="token punctuation">.</span><span class="token function">putIfAbsent</span><span class="token punctuation">(</span>currentThreadId<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">IdGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> instances<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>currentThreadId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> id<span class="token punctuation">.</span><span class="token function">incrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="如何实现集群环境下的单例" tabindex="-1"><a class="header-anchor" href="#如何实现集群环境下的单例" aria-hidden="true">#</a> 如何实现集群环境下的单例？</h2>
<ol>
<li>刚刚我们讲了「进程唯一」的单例和「线程唯一」的单例，现在，我们再来看下，「集群唯一」的单例</li>
<li>首先，我们还是先来解释一下，什么是「集群唯一」的单例</li>
<li>我们还是将它跟「进程唯一」「线程唯一」做个对比。「进程唯一」指的是进程内唯一、进程间不唯一。「线程唯一」指的是线程内唯一、线程间不唯一。集群相当于多个进程构成的一个集合，「集群唯一」就相当于是进程内唯一、进程间也唯一。也就是说，不同的进程间共享同一个对象，不能创建同一个类的多个对象</li>
<li>我们知道，经典的单例模式是进程内唯一的，那如何实现一个进程间也唯一的单例呢？如果严格按照不同的进程间共享同一个对象来实现，那集群唯一的单例实现起来就有点难度了</li>
<li>具体来说，我们需要把这个单例对象序列化并存储到外部共享存储区（比如文件）。进程在使用这个单例对象的时候，需要先从外部共享存储区中将它读取到内存，并反序列化成对象，然后再使用，使用完成之后还需要再存储回外部共享存储区</li>
<li>为了保证任何时刻，在进程间都只有一份对象存在，一个进程在获取到对象之后，需要对对象加锁，避免其他进程再将其获取。在进程使用完这个对象之后，还需要显式地将对象从内存中删除，并且释放对对象的加锁</li>
<li>我用伪代码实现了一下这个过程，具体如下所示：</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IdGenerator</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">AtomicLong</span> id <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicLong</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">IdGenerator</span> instance<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">SharedObjectStorage</span> storage <span class="token operator">=</span> <span class="token class-name">FileSharedObjectStorage</span><span class="token punctuation">(</span><span class="token comment">/*入参省略，比如文件地址*/</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">DistributedLock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DistributedLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">IdGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">static</span> <span class="token class-name">IdGenerator</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
        <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            instance <span class="token operator">=</span> storage<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token class-name">IdGenerator</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> synchroinzed <span class="token keyword">void</span> <span class="token function">freeInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    storage<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token class-name">IdGeneator</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    instance <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">//释放对象</span>
    lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token keyword">return</span> id<span class="token punctuation">.</span><span class="token function">incrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// IdGenerator使用举例</span>
<span class="token class-name">IdGenerator</span> idGeneator <span class="token operator">=</span> <span class="token class-name">IdGenerator</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">long</span> id <span class="token operator">=</span> idGenerator<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">IdGenerator</span><span class="token punctuation">.</span><span class="token function">freeInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="如何实现一个多例模式" tabindex="-1"><a class="header-anchor" href="#如何实现一个多例模式" aria-hidden="true">#</a> 如何实现一个多例模式？</h2>
<p>跟单例模式概念相对应的还有一个多例模式。那如何实现一个多例模式呢？「单例」指的是，一个类只能创建一个对象。对应地，「多例」指的就是，一个类可以创建多个对象，但是个数是有限制的，比如只能创建 3 个对象。如果用代码来简单示例一下的话，就是下面这个样子：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BackendServer</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> serverNo<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> serverAddress<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> SERVER_COUNT <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">BackendServer</span><span class="token punctuation">></span></span> serverInstances <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        serverInstances<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">BackendServer</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> <span class="token string">"192.134.22.138:8080"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        serverInstances<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">2L</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">BackendServer</span><span class="token punctuation">(</span><span class="token number">2L</span><span class="token punctuation">,</span> <span class="token string">"192.134.22.139:8080"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        serverInstances<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">3L</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">BackendServer</span><span class="token punctuation">(</span><span class="token number">3L</span><span class="token punctuation">,</span> <span class="token string">"192.134.22.140:8080"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">BackendServer</span><span class="token punctuation">(</span><span class="token keyword">long</span> serverNo<span class="token punctuation">,</span> <span class="token class-name">String</span> serverAddress<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>serverNo <span class="token operator">=</span> serverNo<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>serverAddress <span class="token operator">=</span> serverAddress<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">BackendServer</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token keyword">long</span> serverNo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> serverInstances<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>serverNo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">BackendServer</span> <span class="token function">getRandomInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Random</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> no <span class="token operator">=</span> r<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span>SERVER_COUNT<span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> serverInstances<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>no<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上，对于多例模式，还有一种理解方式：同一类型的只能创建一个对象，不同类型的可以创建多个对象。这里的「类型」如何理解呢？我们还是通过一个例子来解释一下，具体代码如下所示。在代码中，logger name 就是刚刚说的「类型」，同一个 logger name 获取到的对象实例是相同的，不同的 logger name 获取到的对象实例是不同的。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Logger</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Logger</span><span class="token punctuation">></span></span> instances
        <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Logger</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token class-name">String</span> loggerName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        instances<span class="token punctuation">.</span><span class="token function">putIfAbsent</span><span class="token punctuation">(</span>loggerName<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> instances<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>loggerName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//l1==l2, l1!=l3</span>
<span class="token class-name">Logger</span> l1 <span class="token operator">=</span> <span class="token class-name">Logger</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token string">"User.class"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Logger</span> l2 <span class="token operator">=</span> <span class="token class-name">Logger</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token string">"User.class"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Logger</span> l3 <span class="token operator">=</span> <span class="token class-name">Logger</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token string">"Order.class"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种多例模式的理解方式有点类似工厂模式。它跟工厂模式的不同之处是，多例模式创建的对象都是同一个类的对象，而工厂模式创建的是不同子类的对象，关于这一点，后面就会讲到。实际上，它还有点类似享元模式，两者的区别等到我们讲到享元模式的时候再来分析。除此之外，实际上，枚举类型也相当于多例模式，一个类型只能对应一个对象，一个类可以创建多个对象。</p>
<h2 id="工厂模式概述" tabindex="-1"><a class="header-anchor" href="#工厂模式概述" aria-hidden="true">#</a> 工厂模式概述</h2>
<blockquote>
<p>工厂模式很重要，后面的很多架构设计，都是工厂模式联合着其它设计模式使用。</p>
</blockquote>
<p>一般情况下，工厂模式分为三种更加细分的类型：简单工厂、工厂方法和抽象工厂。不过，在 GOF 的《设计模式》一书中，它将简单工厂模式看作是工厂方法模式的一种特例，所以工厂模式只被分成了工厂方法和抽象工厂两类。实际上，前面一种分类方法更加常见，所以，在今天的讲解中，我们沿用第一种分类方法。</p>
<p>在这三种细分的工厂模式中，简单工厂、工厂方法原理比较简单，在实际的项目中也比较常用。而抽象工厂的原理稍微复杂点，在实际的项目中相对也不常用。</p>
<p>除此之外，本内容讲解的重点也不是原理和实现，因为这些都很简单，重点还是要搞清楚应用场景：什么时候该用工厂模式？相对于直接 new 来创建对象，用工厂模式来创建究竟有什么好处呢？</p>
<p>简单工厂模式</p>
<ul>
<li>用来生产同一等级结构中的任意产品（对于增加新的产品，需要覆盖已有代码）</li>
</ul>
<p>工厂方法模式</p>
<ul>
<li>用来生产同一等级结构中的固定产品（支持增加任意产品）</li>
</ul>
<p>抽象工厂模式</p>
<ul>
<li>围绕一个超级工厂创建其他工厂，该超级工厂又称为其他工厂的工厂</li>
</ul>
<h2 id="简单工厂-simple-factory" tabindex="-1"><a class="header-anchor" href="#简单工厂-simple-factory" aria-hidden="true">#</a> 简单工厂（Simple Factory）</h2>
<h3 id="简单工厂模式基本介绍" tabindex="-1"><a class="header-anchor" href="#简单工厂模式基本介绍" aria-hidden="true">#</a> 简单工厂模式基本介绍</h3>
<p>简单工厂模式是属于 <strong>创建型模式</strong>，是工厂模式的一种。<strong>简单工厂模式是由一个工厂对象决定创建出哪一种产品类的实例</strong>。简单工厂模式是 <strong>工厂模式家族</strong> 中最简单实用的模式。</p>
<p><strong>简单工厂模式</strong>：定义了一个创建对象的类，由这个类来封装实例化对象的行为（代码）。</p>
<p>在简单工厂模式中创建实例的方法通常为静态（static）方法，因此 <strong>简单工厂模式</strong>（Simple Factory Pattern）又叫作 <strong>静态工厂方法模式</strong>（Static Factory Method Pattern）。</p>
<p>在软件开发中，当我们会用到大量的创建某种、某类或者某批对象时，就会使用到工厂模式。</p>
<blockquote>
<p>主要优点</p>
</blockquote>
<ul>
<li>
<p>工厂类包含必要的逻辑判断，可以决定在什么时候创建哪一个产品的实例。客户端可以免除直接创建产品对象的职责，很方便的创建出相应的产品。工厂和产品的职责区分明确</p>
</li>
<li>
<p>客户端无需知道所创建具体产品的类名，只需知道参数即可</p>
</li>
<li>
<p>也可以引入配置文件，在不修改客户端代码的情况下更换和添加新的具体产品类</p>
</li>
</ul>
<blockquote>
<p>主要缺点</p>
</blockquote>
<ul>
<li>简单工厂模式的工厂类单一，负责所有产品的创建，职责过重，一旦异常，整个系统将受影响。且工厂类代码会非常臃肿，违背高聚合原则</li>
<li>使用简单工厂模式会增加系统中类的个数（引入新的工厂类），增加系统的复杂度和理解难度</li>
<li>系统扩展困难，一旦增加新产品不得不修改工厂逻辑，在产品类型较多时，可能造成逻辑过于复杂</li>
<li>简单工厂模式使用了 static 工厂方法，造成工厂角色无法形成基于继承的等级结构</li>
</ul>
<blockquote>
<p>主要角色</p>
</blockquote>
<ul>
<li>简单工厂（SimpleFactory）：是简单工厂模式的核心，负责实现创建所有实例的内部逻辑。工厂类的创建产品类的方法可以被外界直接调用，创建所需的产品对象</li>
<li>抽象产品（Product）：是简单工厂创建的所有对象的父类，负责描述所有实例共有的公共接口</li>
<li>具体产品（ConcreteProduct）：是简单工厂模式的创建目标</li>
</ul>
<blockquote>
<p>结构图</p>
</blockquote>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220326223626.png" alt="image-20220326223625612" loading="lazy"></p>
<h3 id="传统方式完成披萨案例" tabindex="-1"><a class="header-anchor" href="#传统方式完成披萨案例" aria-hidden="true">#</a> 传统方式完成披萨案例</h3>
<p>看一个披萨的项目：要便于披萨种类的扩展，要便于维护</p>
<ul>
<li>披萨的种类很多（比如 GreekPizz、CheesePizz 等）</li>
<li>披萨的制作有 prepare，bake, cut, box</li>
<li>完成披萨店订购功能</li>
</ul>
<p>思路分析（类图）</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220227134536.png" alt="image-20220227134528102" loading="lazy"></p>
<p>编写制作披萨的过程类 Pizza.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Pizza</span> <span class="token punctuation">{</span>
	<span class="token keyword">protected</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span> <span class="token comment">// 名字</span>

	<span class="token comment">// 准备原材料, 不同的披萨不一样，因此，我们做成抽象方法</span>
	<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 省略 setter、getter 方法</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">CheesePizza</span> <span class="token keyword">extends</span> <span class="token class-name">Pizza</span> <span class="token punctuation">{</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 给制作奶酪披萨 准备原材料 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">GreekPizza</span> <span class="token keyword">extends</span> <span class="token class-name">Pizza</span> <span class="token punctuation">{</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 给希腊披萨 准备原材料 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编写 OrderPizza.java 去订购需要的各种披萨</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderPizza</span> <span class="token punctuation">{</span>
    
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">CheesePizza</span> cheesePizza <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CheesePizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">GreekPizza</span> greekPizza <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GreekPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>cheesePizza<span class="token punctuation">.</span>getName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>greekPizza<span class="token punctuation">.</span>getName<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要什么类型的披萨，new 出该对象。</p>
<blockquote>
<p>传统的方式的优缺点</p>
</blockquote>
<ul>
<li>优点是比较好理解，简单易操作</li>
<li>缺点是依赖性太强，不应该直接去 new 一个类</li>
</ul>
<blockquote>
<p>改进的思路分析</p>
</blockquote>
<p>分析：修改代码可以接受，但是如果我们在其它的地方也有创建 Pizza 的代码，就意味着，也需要修改，而创建 Pizza 的代码，往往有多处。</p>
<p>思路：把创建 Pizza 对象封装到一个类中，这样我们有新的 Pizza 种类时，只需要修改该类就可，其它有创建到 Pizza 对象的代码就不需要修改了，即 <strong>简单工厂模式</strong>。</p>
<h3 id="简单工厂模式完成案例" tabindex="-1"><a class="header-anchor" href="#简单工厂模式完成案例" aria-hidden="true">#</a> 简单工厂模式完成案例</h3>
<p>简单工厂模式的设计方案: 定义一个可以实例化 Pizaa 对象的类，封装创建对象的代码。</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220227140037.png" alt="image-20220227140036784" loading="lazy"></p>
<p>Pizza 类代码保持不变（上面有）。</p>
<p>简单工厂模式代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimpleFactory</span> <span class="token punctuation">{</span>

	<span class="token comment">// 方法一：if-else，缺点，违反了 OCP 原则</span>
	<span class="token keyword">public</span> <span class="token class-name">Pizza</span> <span class="token function">createPizza</span><span class="token punctuation">(</span><span class="token class-name">String</span> orderType<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token class-name">Pizza</span> pizza <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"使用简单工厂模式"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token keyword">if</span> <span class="token punctuation">(</span>orderType<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"greek"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			pizza <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GreekPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			pizza<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">" 希腊披萨 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>orderType<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"cheese"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			pizza <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CheesePizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			pizza<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">" 奶酪披萨 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> pizza<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

    <span class="token comment">// 方法二：利用方法代替 if-else，虽然也违反了 OCP 原则，但是为了迎合 OCP 原则，会花费大量的代价</span>
    <span class="token keyword">public</span> <span class="token class-name">Pizza</span> <span class="token function">getGreekPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Pizza</span> pizza <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GreekPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        pizza<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">" 希腊披萨 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> pizza<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token class-name">Pizza</span> <span class="token function">getCheesePizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Pizza</span> pizza <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CheesePizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        pizza<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">" 奶酪披萨 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> pizza<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

	<span class="token comment">// 简单工厂模式 也叫 静态工厂模式（全部替换成 static 即可）</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Pizza</span> <span class="token function">createPizza2</span><span class="token punctuation">(</span><span class="token class-name">String</span> orderType<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token class-name">Pizza</span> pizza <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"使用简单工厂模式2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token keyword">if</span> <span class="token punctuation">(</span>orderType<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"greek"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			pizza <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GreekPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			pizza<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">" 希腊披萨 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>orderType<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"cheese"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			pizza <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CheesePizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			pizza<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">" 奶酪披萨 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		
		<span class="token keyword">return</span> pizza<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时的 <code v-pre>OrderPizza.java</code> 文件也要修改：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderPizza</span> <span class="token punctuation">{</span>
    
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SimpleFactory</span> simpleFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Pizza</span> pizza <span class="token operator">=</span> simpleFactory<span class="token punctuation">.</span><span class="token function">createPizza</span><span class="token punctuation">(</span><span class="token string">"greek"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Pizza pizza = SimpleFactory.createPizza("greek"); // 静态工厂模式</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>pizza<span class="token punctuation">.</span>getName<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单工厂模式虽然违反了 OCP 原则，但是花费的代价非常小，所以经常被使用。</p>
<h2 id="工厂方法-factory-method" tabindex="-1"><a class="header-anchor" href="#工厂方法-factory-method" aria-hidden="true">#</a> 工厂方法（Factory Method）</h2>
<h3 id="工厂方法模式介绍" tabindex="-1"><a class="header-anchor" href="#工厂方法模式介绍" aria-hidden="true">#</a> 工厂方法模式介绍</h3>
<p><strong>工厂方法模式</strong> 是对简单工厂模式的进一步抽象化，其好处是可以使系统在不修改原来代码的情况下引进新的产品，即满足开闭原则。</p>
<blockquote>
<p>主要优点</p>
</blockquote>
<ul>
<li>用户只需要知道具体工厂的名称就可得到所要的产品，无须知道产品的具体创建过程</li>
<li>灵活性增强，对于新产品的创建，只需多写一个相应的工厂类</li>
<li>典型的解耦框架。高层模块只需要知道产品的抽象类，无须关心其他实现类，满足迪米特法则、依赖倒置原则和里氏替换原则</li>
</ul>
<blockquote>
<p>主要缺点</p>
</blockquote>
<ul>
<li>类的个数容易过多，增加复杂度</li>
<li>增加了系统的抽象性和理解难度</li>
<li>抽象产品只能生产一种产品，此弊端可使用 <a href="#%E6%8A%BD%E8%B1%A1%E5%B7%A5%E5%8E%82-abstract-factory">抽象工厂模式</a> 解决</li>
</ul>
<p>工厂方法模式：<strong>定义了一个创建对象的抽象方法</strong>，由 <strong>子类决定要实例化的类</strong>。工厂方法模式将 <strong>对象的实例化推迟到子类</strong>。</p>
<blockquote>
<p>主要角色</p>
</blockquote>
<ul>
<li>抽象工厂（Abstract Factory）：提供了创建产品的接口，调用者通过它访问具体工厂的工厂方法 newProduct() 来创建产品</li>
<li>具体工厂（ConcreteFactory）：主要是实现抽象工厂中的抽象方法，完成具体产品的创建</li>
<li>抽象产品（Product）：定义了产品的规范，描述了产品的主要特性和功能</li>
<li>具体产品（ConcreteProduct）：实现了抽象产品角色所定义的接口，由具体工厂来创建，它同具体工厂之间一一对应</li>
</ul>
<p>其结构图如下所示：</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220326222948.png" alt="image-20220326222947461" loading="lazy"></p>
<h3 id="工厂方法模式完成案例" tabindex="-1"><a class="header-anchor" href="#工厂方法模式完成案例" aria-hidden="true">#</a> 工厂方法模式完成案例</h3>
<p>披萨项目新的需求：客户在点披萨时，可以点不同口味的披萨，比如北京的奶酪 pizza、北京的胡椒 pizza 或者是伦敦的奶酪 pizza、伦敦的胡椒 pizza。</p>
<blockquote>
<p>思路 1</p>
</blockquote>
<p>使用简单工厂模式，创建不同的简单工厂类，比如 <code v-pre>BJPizzaSimpleFactory</code>、<code v-pre>LDPizzaSimpleFactory</code> 等等。从当前这个案例来说，也是可以的，但是考虑到项目的规模，以及软件的可维护性、可扩展性并不是特别好。</p>
<blockquote>
<p>思路 2</p>
</blockquote>
<p>使用工厂模式。</p>
<p>工厂方法模式设计方案：将披萨项目的实例化功能抽象成抽象方法，在不同的口味点餐子类中具体实现。</p>
<blockquote>
<p>思路分析图解</p>
</blockquote>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220227140636.png" alt="image-20220227140635359" loading="lazy"></p>
<blockquote>
<p>代码实现</p>
</blockquote>
<p>披萨类代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 将 Pizza 类做成抽象</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Pizza</span> <span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span> <span class="token comment">//名字</span>

    <span class="token comment">// 准备原材料, 不同的披萨不一样，因此，我们做成抽象方法</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 省略 setter、getter 方法</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">BJCheesePizza</span> <span class="token keyword">extends</span> <span class="token class-name">Pizza</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"北京的奶酪 pizza"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 北京的奶酪 pizza 准备原材料"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">BJPepperPizza</span> <span class="token keyword">extends</span> <span class="token class-name">Pizza</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"北京的胡椒 pizza"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 北京的胡椒 pizza 准备原材料"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">LDCheesePizza</span> <span class="token keyword">extends</span> <span class="token class-name">Pizza</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"伦敦的奶酪 pizza"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 伦敦的奶酪 pizza 准备原材料"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">LDPepperPizza</span> <span class="token keyword">extends</span> <span class="token class-name">Pizza</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"伦敦的奶酪 pizza"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 伦敦的奶酪 pizza 准备原材料"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>工厂方法模式代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">OrderPizzaFactory</span> <span class="token punctuation">{</span>

    <span class="token comment">// 定义一个抽象方法，createPizza，让各个工厂子类自己实现</span>
    <span class="token keyword">abstract</span> <span class="token class-name">Pizza</span> <span class="token function">createPizza</span><span class="token punctuation">(</span><span class="token class-name">String</span> orderType<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 构造器</span>
    <span class="token keyword">public</span> <span class="token class-name">OrderPizza</span><span class="token punctuation">(</span><span class="token class-name">String</span> orderType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Pizza</span> pizza <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        pizza <span class="token operator">=</span> <span class="token function">createPizza</span><span class="token punctuation">(</span>orderType<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 抽象方法，由工厂子类完成</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由工厂方法模式创建的子类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PizzaStore</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建北京口味的各种 Pizza</span>
        <span class="token class-name">BJOrderPizzaFactory</span> bJOrderPizzaFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BJOrderPizzaFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Pizza</span> pizza1 <span class="token operator">=</span> bJOrderPizzaFactory<span class="token punctuation">.</span><span class="token function">createPizza</span><span class="token punctuation">(</span><span class="token string">"cheese"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Pizza</span> pizza2<span class="token operator">=</span> bJOrderPizzaFactory<span class="token punctuation">.</span><span class="token function">createPizza</span><span class="token punctuation">(</span><span class="token string">"pepper"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>pizza1<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>pizza2<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 创建伦敦口味的各种 Pizza</span>
        <span class="token class-name">LDOrderPizzaFactory</span> lDOrderPizzaFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LDOrderPizzaFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Pizza</span> pizza3 <span class="token operator">=</span> lDOrderPizzaFactory<span class="token punctuation">.</span><span class="token function">createPizza</span><span class="token punctuation">(</span><span class="token string">"cheese"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Pizza</span> pizza4 <span class="token operator">=</span> lDOrderPizzaFactory<span class="token punctuation">.</span><span class="token function">createPizza</span><span class="token punctuation">(</span><span class="token string">"pepper"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>pizza3<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>pizza4<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">BJOrderPizzaFactory</span> <span class="token keyword">extends</span> <span class="token class-name">OrderPizzaFactory</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">Pizza</span> <span class="token function">createPizza</span><span class="token punctuation">(</span><span class="token class-name">String</span> orderType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Pizza</span> pizza <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>orderType<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"cheese"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            pizza <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BJCheesePizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>orderType<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"pepper"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            pizza <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BJPepperPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> pizza<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">LDOrderPizzaFactory</span> <span class="token keyword">extends</span> <span class="token class-name">OrderPizzaFactory</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">Pizza</span> <span class="token function">createPizza</span><span class="token punctuation">(</span><span class="token class-name">String</span> orderType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Pizza</span> pizza <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>orderType<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"cheese"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            pizza <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LDCheesePizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>orderType<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"pepper"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            pizza <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LDPepperPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> pizza<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果新增一个新的类如希腊披萨，则只需要新增两个类：希腊披萨类（继承 Pizza 类）、希腊披萨工厂类（继承 OrderPizzaFactory）。不会修改其他的代码，满足了 OCP 开闭原则，但是相比较简单工厂模式，花费的代码比较高。</p>
<h3 id="什么时候该用工厂方法模式-而非简单工厂模式呢" tabindex="-1"><a class="header-anchor" href="#什么时候该用工厂方法模式-而非简单工厂模式呢" aria-hidden="true">#</a> 什么时候该用工厂方法模式，而非简单工厂模式呢？</h3>
<p>之所以将某个代码块剥离出来，独立为函数或者类，原因是这个代码块的逻辑过于复杂，剥离之后能让代码更加清晰，更加可读、可维护。但是，如果代码块本身并不复杂，就几行代码而已，我们完全没必要将它拆分成单独的函数或者类。</p>
<p>基于这个设计思想，当对象的创建逻辑比较复杂，不只是简单的 new 一下就可以，而是要组合其他类对象，做各种初始化操作的时候，我们推荐使用工厂方法模式，将复杂的创建逻辑拆分到多个工厂类中，让每个工厂类都不至于过于复杂。而使用简单工厂模式，将所有的创建逻辑都放到一个工厂类中，会导致这个工厂类变得很复杂。</p>
<p>除此之外，在某些场景下，如果对象不可复用，那工厂类 <strong>每次都要返回不同的对象</strong>。如果我们使用简单工厂模式来实现，就只能选择第一种包含 if 分支逻辑的实现方式。如果我们还想避免烦人的 if-else 分支逻辑，这个时候，我们就推荐使用工厂方法模式。</p>
<p>工厂方法模式可以理解为在多个简单工厂模式（子工厂）的基础上再创建一个大的工厂，统一管理多个子工厂。</p>
<table>
<thead>
<tr>
<th>复杂度</th>
<th>优势模式</th>
</tr>
</thead>
<tbody>
<tr>
<td>结构复杂度</td>
<td>简单工厂模式</td>
</tr>
<tr>
<td>代码复杂度</td>
<td>简单工厂模式</td>
</tr>
<tr>
<td>编程复杂度</td>
<td>简单工厂模式</td>
</tr>
<tr>
<td>管理复杂度</td>
<td>简单工厂模式</td>
</tr>
<tr>
<td>根据实际业务</td>
<td>简单工厂模式</td>
</tr>
<tr>
<td>根据设计原则</td>
<td>工厂方法模式</td>
</tr>
</tbody>
</table>
<p>应用场景：</p>
<ul>
<li>客户只知道创建产品的工厂名，而不知道具体的产品名。如 TCL 电视工厂、海信电视工厂等</li>
<li>创建对象的任务由多个具体子工厂中的某一个完成，而抽象工厂只提供创建产品的接口</li>
<li>客户不关心创建产品的细节，只关心产品的品牌</li>
</ul>
<h2 id="抽象工厂-abstract-factory" tabindex="-1"><a class="header-anchor" href="#抽象工厂-abstract-factory" aria-hidden="true">#</a> 抽象工厂（Abstract Factory）</h2>
<h3 id="基本介绍" tabindex="-1"><a class="header-anchor" href="#基本介绍" aria-hidden="true">#</a> 基本介绍</h3>
<ul>
<li><strong>抽象工厂模式</strong>：定义了一个 interface 用于创建相关或有依赖关系的对象簇，而无需指明具体的类</li>
<li>抽象工厂模式可以将简单工厂模式和工厂方法模式进行整合，是工厂方法模式的升级版本，工厂方法模式只生产一个等级的产品，而抽象工厂模式可生产多个等级的产品</li>
<li>从设计层面看，抽象工厂模式就是对简单工厂模式的改进（或者称为进一步的抽象）</li>
<li>将工厂抽象成两层，AbsFactory（抽象工厂）和具体实现的工厂子类。程序员可以根据创建对象类型使用对应的工厂子类。这样将单个的简单工厂类变成了 <strong>工厂簇</strong>，更利于代码的维护和扩展</li>
</ul>
<blockquote>
<p>优点</p>
</blockquote>
<p>除了具有工厂方法模式的优点外，还有：</p>
<ul>
<li>可以在类的内部对产品族中相关联的多等级产品共同管理，而不必专门引入多个新的类来进行管理。</li>
<li>当需要产品族时，抽象工厂可以保证客户端始终只使用同一个产品的产品组。</li>
<li>抽象工厂增强了程序的可扩展性，当增加一个新的产品族时，不需要修改原代码，满足开闭原则。</li>
</ul>
<blockquote>
<p>主要缺点</p>
</blockquote>
<p>当产品族中需要增加一个新的产品时，所有的工厂类都需要进行修改。增加了系统的抽象性和理解难度。</p>
<blockquote>
<p>主要角色</p>
</blockquote>
<ul>
<li>抽象工厂（Abstract Factory）：提供了创建产品的接口，它包含多个创建产品的方法 newProduct()，可以创建多个不同等级的产品</li>
<li>具体工厂（Concrete Factory）：主要是实现抽象工厂中的多个抽象方法，完成具体产品的创建</li>
<li>抽象产品（Product）：定义了产品的规范，描述了产品的主要特性和功能，抽象工厂模式有多个抽象产品</li>
<li>具体产品（ConcreteProduct）：实现了抽象产品角色所定义的接口，由具体工厂来创建，它同具体工厂之间是多对一的关系</li>
</ul>
<p>抽象工厂结构图：</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220326223224.png" alt="image-20220326223223254" loading="lazy"></p>
<p>上面的披萨案例抽象工厂类图：</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220227141802.png" alt="image-20220227141801967" loading="lazy"></p>
<h3 id="抽象工厂模式应用实例" tabindex="-1"><a class="header-anchor" href="#抽象工厂模式应用实例" aria-hidden="true">#</a> 抽象工厂模式应用实例</h3>
<p>换个案例：生产小米手机、小米路由器；华为手机、华为路由器。</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220302213615.png" alt="image-20220301171914376" loading="lazy"></p>
<blockquote>
<p>小米手机和华为手机称为 <strong>产品线</strong>，小米手机和小米路由器称为 <strong>产品簇</strong>。</p>
</blockquote>
<p>首先创建手机和路由器的接口类：（为了方便，放在一个代码块里）</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 手机接口</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IPhoneProduct</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">sendMes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 路由器接口</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IRouterProduct</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token function">setting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">link</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建小米和华为的手机：（为了方便，放在一个代码块里）</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 小米手机</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">XiaoMiPhone</span> <span class="token keyword">implements</span> <span class="token class-name">IPhoneProduct</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"打开小米手机"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"关闭小米手机"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendMes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"小米手机发送消息"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"小米手机打电话"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 华为手机</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HuaWeiPhone</span> <span class="token keyword">implements</span> <span class="token class-name">IPhoneProduct</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"打开华为手机"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"关闭华为手机"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendMes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"华为手机发送消息"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"华为手机打电话"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建小米和华为的路由器：（为了方便，放在一个代码块里）</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 小米路由器</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">XiaoMiRouter</span> <span class="token keyword">implements</span> <span class="token class-name">IRouterProduct</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"打开小米路由器"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"关闭小米路由器"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setting</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"设置小米路由器"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">link</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"连接小米路由器"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 华为路由器</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HuaWeiMiRouter</span> <span class="token keyword">implements</span> <span class="token class-name">IRouterProduct</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"打开华为路由器"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"关闭华为路由器"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setting</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"设置华为路由器"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">link</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"连接华为路由器"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建抽象工厂和子工厂（小米工厂、华为工厂）（为了方便，放在一个代码块里）</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 抽象工厂</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IProductFactory</span> <span class="token punctuation">{</span>
    <span class="token class-name">IPhoneProduct</span> <span class="token function">phoneProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">IRouterProduct</span> <span class="token function">routerProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 小米工厂</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">XiaoMiFactory</span> <span class="token keyword">implements</span> <span class="token class-name">IProductFactory</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">IPhoneProduct</span> <span class="token function">phoneProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">XiaoMiPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">IRouterProduct</span> <span class="token function">routerProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">XiaoMiRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 华为工厂</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HuaWeiFactory</span> <span class="token keyword">implements</span> <span class="token class-name">IProductFactory</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">IPhoneProduct</span> <span class="token function">phoneProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">HuaWeiPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">IRouterProduct</span> <span class="token function">routerProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">HuaWeiMiRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试抽象工厂模式：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"-------------- 小米系列工厂 --------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">XiaoMiFactory</span> xiaoMiFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XiaoMiFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IPhoneProduct</span> iPhoneProduct <span class="token operator">=</span> xiaoMiFactory<span class="token punctuation">.</span><span class="token function">phoneProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iPhoneProduct<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iPhoneProduct<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iPhoneProduct<span class="token punctuation">.</span><span class="token function">sendMes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iPhoneProduct<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">IRouterProduct</span> iRouterProduct <span class="token operator">=</span> xiaoMiFactory<span class="token punctuation">.</span><span class="token function">routerProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iRouterProduct<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iRouterProduct<span class="token punctuation">.</span><span class="token function">link</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iRouterProduct<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iRouterProduct<span class="token punctuation">.</span><span class="token function">setting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"-------------- 华为系列工厂 --------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">HuaWeiFactory</span> huaWeiFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HuaWeiFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IPhoneProduct</span> iPhoneProduct1 <span class="token operator">=</span> huaWeiFactory<span class="token punctuation">.</span><span class="token function">phoneProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iPhoneProduct1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iPhoneProduct1<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iPhoneProduct1<span class="token punctuation">.</span><span class="token function">sendMes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iPhoneProduct1<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">IRouterProduct</span> iRouterProduct1 <span class="token operator">=</span> huaWeiFactory<span class="token punctuation">.</span><span class="token function">routerProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iRouterProduct1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iRouterProduct1<span class="token punctuation">.</span><span class="token function">link</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iRouterProduct1<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iRouterProduct1<span class="token punctuation">.</span><span class="token function">setting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="工厂模式在-jdk-calendar-应用的源码分析" tabindex="-1"><a class="header-anchor" href="#工厂模式在-jdk-calendar-应用的源码分析" aria-hidden="true">#</a> 工厂模式在 JDK-Calendar 应用的源码分析</h2>
<p>JDK 中的 Calendar 类中，就使用了简单工厂模式。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Factory</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// getInstance 是 Calendar 静态方法</span>
        <span class="token class-name">Calendar</span> cal <span class="token operator">=</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 注意月份下标从 0 开始，所以取月份要+1</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"年:"</span> <span class="token operator">+</span> cal<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span>YEAR<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"月:"</span> <span class="token operator">+</span> <span class="token punctuation">(</span>cal<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span>MONTH<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"日:"</span> <span class="token operator">+</span> cal<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span>DAY_OF_MONTH<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"时:"</span> <span class="token operator">+</span> cal<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span>HOUR_OF_DAY<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"分:"</span> <span class="token operator">+</span> cal<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span>MINUTE<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"秒:"</span> <span class="token operator">+</span> cal<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span>SECOND<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Calendar.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Calendar</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Calendar</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">createCalendar</span><span class="token punctuation">(</span><span class="token class-name">TimeZone</span><span class="token punctuation">.</span><span class="token function">getDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Locale</span><span class="token punctuation">.</span><span class="token function">getDefault</span><span class="token punctuation">(</span><span class="token class-name">Locale<span class="token punctuation">.</span>Category</span><span class="token punctuation">.</span>FORMAT<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Calendar</span> <span class="token function">createCalendar</span><span class="token punctuation">(</span><span class="token class-name">TimeZone</span> zone<span class="token punctuation">,</span><span class="token class-name">Locale</span> aLocale<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 根据 TimeZone zone, locale 创建对应的实例</span>
        <span class="token class-name">CalendarProvider</span> provider <span class="token operator">=</span> <span class="token class-name">LocaleProviderAdapter</span><span class="token punctuation">.</span><span class="token function">getAdapter</span><span class="token punctuation">(</span><span class="token class-name">CalendarProvider</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> aLocale<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">getCalendarProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>provider <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> provider<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>zone<span class="token punctuation">,</span> aLocale<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span> iae<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// fall back to the default instantiation</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Calendar</span> cal <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>aLocale<span class="token punctuation">.</span><span class="token function">hasExtensions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> caltype <span class="token operator">=</span> aLocale<span class="token punctuation">.</span><span class="token function">getUnicodeLocaleType</span><span class="token punctuation">(</span><span class="token string">"ca"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>caltype <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">switch</span> <span class="token punctuation">(</span>caltype<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">case</span> <span class="token string">"buddhist"</span><span class="token operator">:</span>
                        cal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BuddhistCalendar</span><span class="token punctuation">(</span>zone<span class="token punctuation">,</span> aLocale<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token keyword">case</span> <span class="token string">"japanese"</span><span class="token operator">:</span>
                        cal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JapaneseImperialCalendar</span><span class="token punctuation">(</span>zone<span class="token punctuation">,</span> aLocale<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token keyword">case</span> <span class="token string">"gregory"</span><span class="token operator">:</span>
                        cal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GregorianCalendar</span><span class="token punctuation">(</span>zone<span class="token punctuation">,</span> aLocale<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cal <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// If no known calendar type is explicitly specified</span>
            <span class="token comment">// perform the traditional way to create a Calendar:</span>
            <span class="token comment">// create a BuddhistCalendar for th_TH locale</span>
            <span class="token comment">// a JapaneseImperialCalendar for ja_JP_JP locale, or</span>
            <span class="token comment">// a GregorianCalendar for any other locales</span>
            <span class="token comment">// NOTE: The language, country and variant strings are interned. </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>aLocale<span class="token punctuation">.</span><span class="token function">getLanguage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">"th"</span> <span class="token operator">&amp;&amp;</span> aLocale<span class="token punctuation">.</span><span class="token function">getCountry</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">"TH"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                cal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BuddhistCalendar</span><span class="token punctuation">(</span>zone<span class="token punctuation">,</span> aLocale<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>aLocale<span class="token punctuation">.</span><span class="token function">getVariant</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">"JP"</span> <span class="token operator">&amp;&amp;</span> aLocale<span class="token punctuation">.</span><span class="token function">getLanguage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">"ja"</span> <span class="token operator">&amp;&amp;</span> aLocale<span class="token punctuation">.</span><span class="token function">getCountry</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">"JP"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                cal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JapaneseImperialCalendar</span><span class="token punctuation">(</span>zone<span class="token punctuation">,</span> aLocale<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                cal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GregorianCalendar</span><span class="token punctuation">(</span>zone<span class="token punctuation">,</span> aLocale<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> cal<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="工厂模式小结" tabindex="-1"><a class="header-anchor" href="#工厂模式小结" aria-hidden="true">#</a> 工厂模式小结</h2>
<ul>
<li>工厂模式的意义将实例化对象的代码提取出来，放到一个类中统一管理和维护，达到和主项目的依赖关系的解耦。从而提高项目的扩展和维护性</li>
<li>三种工厂模式 (简单工厂模式、工厂方法模式、抽象工厂模式）</li>
<li>设计模式的依赖抽象原则
<ul>
<li>创建对象实例时，不要直接 new 类, 而是把这个 new 类的动作放在一个工厂的方法中，并返回。有的书上说，变量不要直接持有具体类的引用</li>
<li>不要让类继承具体类，而是继承抽象类或者是实现 interface（接口）</li>
<li>不要覆盖基类中已经实现的方法</li>
</ul>
</li>
</ul>
<h2 id="如何设计实现一个dependency-injection框架" tabindex="-1"><a class="header-anchor" href="#如何设计实现一个dependency-injection框架" aria-hidden="true">#</a> 如何设计实现一个Dependency Injection框架</h2>
<p>当创建对象是一个「大工程」的时候，我们一般会选择使用工厂模式，来封装对象复杂的创建过程，将对象的创建和使用分离，让代码更加清晰。那何为「大工程」呢？上面我们讲了两种情况，一种是创建过程涉及复杂的 if-else 分支判断，另一种是对象创建需要组装多个其他类对象或者需要复杂的初始化过程。</p>
<p>我们来学习一个创建对象的「大工程」，依赖注入框架，或者叫依赖注入容器（Dependency Injection Container），简称 DI 容器。在今天的讲解中，我会带你一块搞清楚这样几个问题：DI 容器跟我们讲的工厂模式又有何区别和联系？DI 容器的核心功能有哪些，以及如何实现一个简单的 DI 容器？</p>
<h3 id="工厂模式和-di-容器有何区别" tabindex="-1"><a class="header-anchor" href="#工厂模式和-di-容器有何区别" aria-hidden="true">#</a> 工厂模式和 DI 容器有何区别</h3>
<p>实际上，DI 容器底层最基本的设计思路就是基于工厂模式的。DI 容器相当于一个大的工厂类，负责在程序启动的时候，根据配置（要创建哪些类对象，每个类对象的创建需要依赖哪些其他类对象）事先创建好对象。当应用程序需要使用某个类对象的时候，直接从容器中获取即可。正是因为它持有一堆对象，所以这个框架才被称为「容器」。</p>
<p>DI 容器相对于我们上面讲的工厂模式的例子来说，它处理的是更大的对象创建工程。上面讲的工厂模式中，一个工厂类只负责某个类对象或者某一组相关类对象（继承自同一抽象类或者接口的子类）的创建，而 DI 容器负责的是整个应用中所有类对象的创建。</p>
<p>除此之外，DI 容器负责的事情要比单纯的工厂模式要多。比如，它还包括配置的解析、对象生命周期的管理。接下来，我们就详细讲讲，一个简单的 DI 容器应该包含哪些核心功能。</p>
<h3 id="di-容器的核心功能有哪些" tabindex="-1"><a class="header-anchor" href="#di-容器的核心功能有哪些" aria-hidden="true">#</a> DI 容器的核心功能有哪些</h3>
<p>总结一下，一个简单的 DI 容器的核心功能一般有三个：配置解析、对象创建和对象生命周期管理。</p>
<blockquote>
<p>首先，我们来看配置解析。</p>
</blockquote>
<ol>
<li>在上面讲的工厂模式中，工厂类要创建哪个类对象是事先确定好的，并且是写死在工厂类代码中的。作为一个通用的框架来说，框架代码跟应用代码应该是高度解耦的，DI 容器事先并不知道应用会创建哪些对象，不可能把某个应用要创建的对象写死在框架代码中。所以，我们需要通过一种形式，让应用告知 DI 容器要创建哪些对象。这种形式就是我们要讲的配置</li>
<li>我们将需要由 DI 容器来创建的类对象和创建类对象的必要信息（使用哪个构造函数以及对应的构造函数参数都是什么等等），放到配置文件中。容器读取配置文件，根据配置文件提供的信息来创建对象</li>
<li>下面是一个典型的 Spring 容器的配置文件。Spring 容器读取这个配置文件，解析出要创建的两个对象：rateLimiter 和 redisCounter，并且得到两者的依赖关系：rateLimiter 依赖 redisCounter</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RateLimiter</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">RedisCounter</span> redisCounter<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">RateLimiter</span><span class="token punctuation">(</span><span class="token class-name">RedisCounter</span> redisCounter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>redisCounter <span class="token operator">=</span> redisCounter<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Hello World!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisCounter</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> ipAddress<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> port<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">RedisCounter</span><span class="token punctuation">(</span><span class="token class-name">String</span> ipAddress<span class="token punctuation">,</span> <span class="token keyword">int</span> port<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>ipAddress <span class="token operator">=</span> ipAddress<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>port <span class="token operator">=</span> port<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件 beans.xml：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>rateLimiter<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cn.gavin.RateLimiter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>redisCounter<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>redisCounter<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cn.gavin.redisCounter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>String<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>127.0.0.1<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>int<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>1234/</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>其次，我们再来看对象创建。</p>
</blockquote>
<p>在 DI 容器中，如果我们给每个类都对应创建一个工厂类，那项目中类的个数会成倍增加，这会增加代码的维护成本。要解决这个问题并不难。我们只需要将所有类对象的创建都放到一个工厂类中完成就可以了，比如 BeansFactory。</p>
<p>你可能会说，如果要创建的类对象非常多，BeansFactory 中的代码会不会线性膨胀（代码量跟创建对象的个数成正比）呢？实际上并不会。待会讲到 DI 容器的具体实现的时候，我们会讲「反射」这种机制，它能在程序运行的过程中，动态地加载类、创建对象，不需要事先在代码中写死要创建哪些对象。所以，不管是创建一个对象还是十个对象，BeansFactory 工厂类代码都是一样的。</p>
<blockquote>
<p>最后，我们来看对象的生命周期管理。</p>
</blockquote>
<p>上面我们讲到，简单工厂模式有两种实现方式，一种是每次都返回新创建的对象，另一种是每次都返回同一个事先创建好的对象，也就是所谓的单例对象。在 Spring 框架中，我们可以通过配置 scope 属性，来区分这两种不同类型的对象。<code v-pre>scope=prototype</code> 表示返回新创建的对象，<code v-pre>scope=singleton</code> 表示返回单例对象。</p>
<p>除此之外，我们还可以配置对象是否支持懒加载。如果 <code v-pre>lazy-init=true</code>，对象在真正被使用到的时候（比如：<code v-pre>BeansFactory.getBean(&quot;userService&quot;)</code>）才被被创建；如果 <code v-pre>lazy-init=false</code>，对象在应用启动的时候就事先创建好。</p>
<p>不仅如此，我们还可以配置对象的 <code v-pre>init-method</code> 和 <code v-pre>destroy-method</code> 方法，比如 <code v-pre>init-method=loadProperties()</code>，<code v-pre>destroy-method=updateConfigFile()</code>。DI 容器在创建好对象之后，会主动调用 <code v-pre>init-method</code> 属性指定的方法来初始化对象。在对象被最终销毁之前，DI 容器会主动调用 <code v-pre>destroy-method</code> 属性指定的方法来做一些清理工作，比如释放数据库连接池、关闭文件。</p>
<h2 id="如何实现一个简单的-di-容器" tabindex="-1"><a class="header-anchor" href="#如何实现一个简单的-di-容器" aria-hidden="true">#</a> 如何实现一个简单的 DI 容器？</h2>
<p>用 Java 语言来实现一个简单的 DI 容器，核心逻辑只需要包括这样两个部分：配置文件解析、根据配置文件通过「反射」语法来创建对象。</p>
<h3 id="最小原型设计" tabindex="-1"><a class="header-anchor" href="#最小原型设计" aria-hidden="true">#</a> 最小原型设计</h3>
<p>因为我们主要是讲解设计模式，所以，在今天的讲解中，我们只实现一个 DI 容器的最小原型。像 Spring 框架这样的 DI 容器，它支持的配置格式非常灵活和复杂。为了简化代码实现，重点讲解原理，在最小原型中，我们只支持下面配置文件中涉及的配置语法。</p>
<p>配置文件 beans.xml</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>rateLimiter<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cn.gavin.RateLimiter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>redisCounter<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>redisCounter<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cn.gavin.redisCounter<span class="token punctuation">"</span></span> <span class="token attr-name">scope</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>singleton<span class="token punctuation">"</span></span> <span class="token attr-name">lazy-init</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>String<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>127.0.0.1<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>int<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>1234/</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最小原型的使用方式跟 Spring 框架非常类似，示例代码如下所示：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ApplicationContext</span> applicationContext <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassPathXmlApplicationContext</span><span class="token punctuation">(</span><span class="token string">"beans.xml"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">RateLimiter</span> rateLimiter <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">RateLimiter</span><span class="token punctuation">)</span> applicationContext<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">"rateLimiter"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        rateLimiter<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="提供执行入口" tabindex="-1"><a class="header-anchor" href="#提供执行入口" aria-hidden="true">#</a> 提供执行入口</h3>
<p>面向对象设计的最后一步是：组装类并提供执行入口。在这里，执行入口就是一组暴露给外部使用的接口和类。通过刚刚的最小原型使用示例代码，我们可以看出，执行入口主要包含两部分：<code v-pre>ApplicationContext</code> 和 <code v-pre>ClassPathXmlApplicationContext</code>。其中 <code v-pre>ApplicationContext</code> 是接口，<code v-pre>ClassPathXmlApplicationContext</code> 是接口的实现类。两个类具体实现如下所示：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ApplicationContext</span> <span class="token punctuation">{</span>
    <span class="token class-name">Object</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ClassPathXmlApplicationContext</span> <span class="token keyword">implements</span> <span class="token class-name">ApplicationContext</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">BeansFactory</span> beansFactory<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">BeanConfigParser</span> beanConfigParser<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">ClassPathXmlApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">String</span> configLocation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>beansFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BeansFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>beanConfigParser <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XmlBeanConfigParser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">loadBeanDefinitions</span><span class="token punctuation">(</span>configLocation<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">loadBeanDefinitions</span><span class="token punctuation">(</span><span class="token class-name">String</span> configLocation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">InputStream</span> in <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            in <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token string">"/"</span> <span class="token operator">+</span> configLocation<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>in <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"Can not find config file: "</span> <span class="token operator">+</span> configLocation<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BeanDefinition</span><span class="token punctuation">></span></span> beanDefinitions <span class="token operator">=</span> beanConfigParser<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
            beansFactory<span class="token punctuation">.</span><span class="token function">addBeanDefinitions</span><span class="token punctuation">(</span>beanDefinitions<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>in <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    in<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// TODO: log error</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> beansFactory<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span>beanId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面的代码中，我们可以看出，ClassPathXmlApplicationContext 负责组装 BeansFactory 和 BeanConfigParser 两个类，串联执行流程：从 classpath 中加载 XML 格式的配置文件，通过 BeanConfigParser 解析为统一的 BeanDefinition 格式，然后，BeansFactory 根据 BeanDefinition 来创建对象。</p>
<h3 id="配置文件解析" tabindex="-1"><a class="header-anchor" href="#配置文件解析" aria-hidden="true">#</a> 配置文件解析</h3>
<p>配置文件解析主要包含 BeanConfigParser 接口和 XmlBeanConfigParser 实现类，负责将配置文件解析为 BeanDefinition 结构，以便 BeansFactory 根据这个结构来创建对象。配置文件的解析比较繁琐，不涉及我们要讲的理论知识，不是我们讲解的重点，所以这里我只给出两个类的大致设计思路，并未给出具体的实现代码。如果感兴趣的话，你可以自行补充完整。具体的代码框架如下所示：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BeanConfigParser</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BeanDefinition</span><span class="token punctuation">></span></span> <span class="token function">parse</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BeanDefinition</span><span class="token punctuation">></span></span> <span class="token function">parse</span><span class="token punctuation">(</span><span class="token class-name">String</span> configContent<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">XmlBeanConfigParser</span> <span class="token keyword">implements</span> <span class="token class-name">BeanConfigParser</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BeanDefinition</span><span class="token punctuation">></span></span> <span class="token function">parse</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> inputStream<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> content <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token comment">// TODO:...</span>
        <span class="token keyword">return</span> <span class="token function">parse</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BeanDefinition</span><span class="token punctuation">></span></span> <span class="token function">parse</span><span class="token punctuation">(</span><span class="token class-name">String</span> configContent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BeanDefinition</span><span class="token punctuation">></span></span> beanDefinitions <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// TODO:...</span>
        <span class="token keyword">return</span> beanDefinitions<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BeanDefinition</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> className<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ConstructorArg</span><span class="token punctuation">></span></span> constructorArgs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Scope</span> scope <span class="token operator">=</span> <span class="token class-name">Scope</span><span class="token punctuation">.</span>SINGLETON<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> lazyInit <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token comment">// 省略必要的 getter/setter/constructors</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isSingleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> scope<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Scope</span><span class="token punctuation">.</span>SINGLETON<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">enum</span> <span class="token class-name">Scope</span> <span class="token punctuation">{</span>
        SINGLETON<span class="token punctuation">,</span>
        PROTOTYPE
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">ConstructorArg</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">boolean</span> isRef<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">Class</span> type<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">Object</span> arg<span class="token punctuation">;</span>
        <span class="token comment">// 省略必要的 getter/setter/constructors</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="核心工厂类设计" tabindex="-1"><a class="header-anchor" href="#核心工厂类设计" aria-hidden="true">#</a> 核心工厂类设计</h3>
<ol>
<li>最后，我们来看，BeansFactory 是如何设计和实现的。这也是我们这个 DI 容器最核心的一个类了。它负责根据从配置文件解析得到的 BeanDefinition 来创建对象</li>
<li>如果对象的 scope 属性是 singleton，那对象创建之后会缓存在 singletonObjects 这样一个 map 中，下次再请求此对象的时候，直接从 map 中取出返回，不需要重新创建。如果对象的 scope 属性是 prototype，那每次请求对象，BeansFactory 都会创建一个新的对象返回</li>
<li>实际上，BeansFactory 创建对象用到的主要技术点就是 Java 中的反射语法：一种动态加载类和创建对象的机制。我们知道，JVM 在启动的时候会根据代码自动地加载类、创建对象。至于都要加载哪些类、创建哪些对象，这些都是在代码中写死的，或者说提前写好的。但是，如果某个对象的创建并不是写死在代码中，而是放到配置文件中，我们需要在程序运行期间，动态地根据配置文件来加载类、创建对象，那这部分工作就没法让 JVM 帮我们自动完成了，我们需要利用 Java 提供的反射语法自己去编写代码</li>
</ol>
<p>搞清楚了反射的原理，BeansFactory 的代码就不难看懂了。具体代码实现如下所示：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BeansFactory</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> singletonObjects <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">BeanDefinition</span><span class="token punctuation">></span></span> beanDefinitions <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addBeanDefinitions</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BeanDefinition</span><span class="token punctuation">></span></span> beanDefinitionList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">BeanDefinition</span> beanDefinition <span class="token operator">:</span> beanDefinitionList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>beanDefinitions<span class="token punctuation">.</span><span class="token function">putIfAbsent</span><span class="token punctuation">(</span>beanDefinition<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> beanDefinition<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">BeanDefinition</span> beanDefinition <span class="token operator">:</span> beanDefinitionList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>beanDefinition<span class="token punctuation">.</span><span class="token function">isLazyInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">false</span> <span class="token operator">&amp;&amp;</span> beanDefinition<span class="token punctuation">.</span><span class="token function">isSingleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">createBean</span><span class="token punctuation">(</span>beanDefinition<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">BeanDefinition</span> beanDefinition <span class="token operator">=</span> beanDefinitions<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>beanId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>beanDefinition <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NoSuchBeanDefinitionException</span><span class="token punctuation">(</span><span class="token string">"Bean is not defined: "</span> <span class="token operator">+</span> beanId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">createBean</span><span class="token punctuation">(</span>beanDefinition<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@VisibleForTesting</span>
    <span class="token keyword">protected</span> <span class="token class-name">Object</span> <span class="token function">createBean</span><span class="token punctuation">(</span><span class="token class-name">BeanDefinition</span> beanDefinition<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>beanDefinition<span class="token punctuation">.</span><span class="token function">isSingleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> singletonObjects<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>beanDefinition<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> singletonObjects<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>beanDefinition<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">Object</span> bean <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Class</span> beanClass <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span>beanDefinition<span class="token punctuation">.</span><span class="token function">getClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BeanDefinition<span class="token punctuation">.</span>ConstructorArg</span><span class="token punctuation">></span></span> args <span class="token operator">=</span> beanDefinition<span class="token punctuation">.</span><span class="token function">getConstructorArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                bean <span class="token operator">=</span> beanClass<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token class-name">Class</span><span class="token punctuation">[</span><span class="token punctuation">]</span> argClasses <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Class</span><span class="token punctuation">[</span>args<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> argObjects <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">[</span>args<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> args<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">BeanDefinition<span class="token punctuation">.</span>ConstructorArg</span> arg <span class="token operator">=</span> args<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>arg<span class="token punctuation">.</span><span class="token function">getIsRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        argClasses<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arg<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        argObjects<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arg<span class="token punctuation">.</span><span class="token function">getArg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                        <span class="token class-name">BeanDefinition</span> refBeanDefinition <span class="token operator">=</span> beanDefinitions<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>arg<span class="token punctuation">.</span><span class="token function">getArg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>refBeanDefinition <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NoSuchBeanDefinitionException</span><span class="token punctuation">(</span><span class="token string">"Bean is not defined: "</span> <span class="token operator">+</span> arg<span class="token punctuation">.</span><span class="token function">getArg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                        argClasses<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span>refBeanDefinition<span class="token punctuation">.</span><span class="token function">getClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        argObjects<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">createBean</span><span class="token punctuation">(</span>refBeanDefinition<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                bean <span class="token operator">=</span> beanClass<span class="token punctuation">.</span><span class="token function">getConstructor</span><span class="token punctuation">(</span>argClasses<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span>argObjects<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ClassNotFoundException</span> <span class="token operator">|</span> <span class="token class-name">IllegalAccessException</span>
                 <span class="token operator">|</span> <span class="token class-name">InstantiationException</span> <span class="token operator">|</span> <span class="token class-name">NoSuchMethodException</span> <span class="token operator">|</span> <span class="token class-name">InvocationTargetException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BeanCreationFailureException</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>bean <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> beanDefinition<span class="token punctuation">.</span><span class="token function">isSingleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            singletonObjects<span class="token punctuation">.</span><span class="token function">putIfAbsent</span><span class="token punctuation">(</span>beanDefinition<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> bean<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> singletonObjects<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>beanDefinition<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> bean<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>执行入口那里调用 <code v-pre>addBeanDefinitions</code></li>
<li>然后 <code v-pre>addBeanDefinitions</code> 再调用 <code v-pre>createBean</code> 利用反射创建对象，如果对象的 scope 属性是 singleton，那对象创建之后会缓存在 <code v-pre>singletonObjects</code> 这样一个 Map 中</li>
<li>最后最小原型设计那里再调用 <code v-pre>getBean从singletonObjects</code> 获取对象</li>
</ol>
<h2 id="原型模式基本介绍" tabindex="-1"><a class="header-anchor" href="#原型模式基本介绍" aria-hidden="true">#</a> 原型模式基本介绍</h2>
<p>在有些系统中，存在大量相同或相似对象的创建问题，如果用传统的构造函数来创建对象，会比较复杂且耗时耗资源，用原型模式生成对象就很高效，就像孙悟空拔下猴毛轻轻一吹就变出很多孙悟空一样简单。</p>
<p><strong>原型模式</strong>（Prototype Pattern）是指：用原型实例指定创建对象的种类，并且通过拷贝这些原型，创建新的对象。</p>
<p>原型模式是一种创建型设计模式，允许一个对象再创建另外一个可定制的对象，无需知道如何创建的细节。</p>
<p>工作原理是：通过将一个原型对象传给那个要发动创建的对象，这个要发动创建的对象通过请求原型对象拷贝它们自己来实施创建，即 <code v-pre>对象.clone()</code>。</p>
<blockquote>
<p>主要优点</p>
</blockquote>
<ul>
<li>Java 自带的原型模式基于内存二进制流的复制，在性能上比直接 new 一个对象更加优良</li>
<li>可以使用深克隆方式保存对象的状态，使用原型模式将对象复制一份，并将其状态保存起来，简化了创建对象的过程，以便在需要的时候使用（例如恢复到历史某一状态），可辅助实现撤销操作</li>
</ul>
<blockquote>
<p>主要缺点</p>
</blockquote>
<ul>
<li>需要为每一个类都配置一个 clone 方法</li>
<li>clone 方法位于类的内部，当对已有类进行改造的时候，需要修改代码，违背了开闭原则</li>
<li>当实现深克隆时，需要编写较为复杂的代码，而且当对象之间存在多重嵌套引用时，为了实现深克隆，每一层对象对应的类都必须支持深克隆，实现起来会比较麻烦。因此，深克隆、浅克隆需要运用得当</li>
</ul>
<h2 id="原型模式原理结构图" tabindex="-1"><a class="header-anchor" href="#原型模式原理结构图" aria-hidden="true">#</a> 原型模式原理结构图</h2>
<p>原型模式包含以下主要角色：</p>
<ul>
<li>抽象原型类（Prototype）：原型接口，声明一个克隆自己的接口，规定了具体原型对象必须实现的接口</li>
<li>具体原型类（ConcretePrototype）：实现原型接口的原型类，实现一个克隆自己的操作</li>
<li>访问类（Client）：让一个原型对象克隆自己，从而创建一个新的对象（属性一样）</li>
</ul>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220302213646.png" alt="image-20220301174940372" loading="lazy"></p>
<h2 id="克隆羊案例" tabindex="-1"><a class="header-anchor" href="#克隆羊案例" aria-hidden="true">#</a> 克隆羊案例</h2>
<p>现在有一只羊 tom，姓名为：tom, 年龄为：1，颜色为：白色，请编写程序创建和 tom 羊属性完全相同的 10 只羊。</p>
<h2 id="传统方式解决克隆羊实例" tabindex="-1"><a class="header-anchor" href="#传统方式解决克隆羊实例" aria-hidden="true">#</a> 传统方式解决克隆羊实例</h2>
<p>思路分析（图解）</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220302213643.png" alt="image-20220301174437773" loading="lazy"></p>
<p>Sheep 类代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Sheep</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> color<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Sheep</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token class-name">String</span> color<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAge</span><span class="token punctuation">(</span><span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> color<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setColor</span><span class="token punctuation">(</span><span class="token class-name">String</span> color<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Sheep [name="</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">", age="</span> <span class="token operator">+</span> age <span class="token operator">+</span> <span class="token string">", color="</span> <span class="token operator">+</span> color <span class="token operator">+</span> <span class="token string">"]"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Client 类代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 传统的方法</span>
        <span class="token class-name">Sheep</span> sheep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sheep</span><span class="token punctuation">(</span><span class="token string">"tom"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"白色"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Sheep</span> sheep2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sheep</span><span class="token punctuation">(</span>sheep<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> sheep<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> sheep<span class="token punctuation">.</span><span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Sheep</span> sheep3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sheep</span><span class="token punctuation">(</span>sheep<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> sheep<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> sheep<span class="token punctuation">.</span><span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Sheep</span> sheep4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sheep</span><span class="token punctuation">(</span>sheep<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> sheep<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> sheep<span class="token punctuation">.</span><span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Sheep</span> sheep5 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sheep</span><span class="token punctuation">(</span>sheep<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> sheep<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> sheep<span class="token punctuation">.</span><span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// ...</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>sheep<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>sheep2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>sheep3<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>sheep4<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>sheep5<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="传统的方式的优缺点" tabindex="-1"><a class="header-anchor" href="#传统的方式的优缺点" aria-hidden="true">#</a> 传统的方式的优缺点</h2>
<ul>
<li>优点是比较好理解，简单易操作</li>
<li>在创建新的对象时，总是需要重新获取原始对象的属性，如果创建的对象比较复杂时，效率较低</li>
<li>总是需要重新初始化对象，而不是动态地获得对象运行时的状态, 不够灵活</li>
</ul>
<p>改进的思路分析：Java 中 Object 类是所有类的根类，Object 类提供了一个 <code v-pre>clone()</code> 方法，该方法可以将一个 Java 对象复制一份，但是需要实现 clone 的 Java 类必须要实现一个接口 Cloneable，该接口表示该类能够复制且具有复制的能力，使用 <strong>原型模式</strong>。</p>
<h2 id="原型模式解决克隆羊实例" tabindex="-1"><a class="header-anchor" href="#原型模式解决克隆羊实例" aria-hidden="true">#</a> 原型模式解决克隆羊实例</h2>
<p>使用原型模式改进传统方式，让程序具有更高的效率和扩展性。</p>
<p>Sheep 类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Sheep</span> <span class="token keyword">implements</span> <span class="token class-name">Cloneable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> color<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> address <span class="token operator">=</span> <span class="token string">"蒙古羊"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Sheep</span> friend<span class="token punctuation">;</span> <span class="token comment">// 是对象，克隆是会如何处理</span>

    <span class="token keyword">public</span> <span class="token class-name">Sheep</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token class-name">String</span> color<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAge</span><span class="token punctuation">(</span><span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> color<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setColor</span><span class="token punctuation">(</span><span class="token class-name">String</span> color<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Sheep [name="</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">", age="</span> <span class="token operator">+</span> age <span class="token operator">+</span> <span class="token string">", color="</span> <span class="token operator">+</span> color <span class="token operator">+</span> <span class="token string">", address="</span> <span class="token operator">+</span> address <span class="token operator">+</span> <span class="token string">"]"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 克隆该实例，使用默认的 clone 方法来完成</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token class-name">Object</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Sheep</span> sheep <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            sheep <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Sheep</span><span class="token punctuation">)</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> sheep<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Client 类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"原型模式完成对象的创建"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Sheep</span> sheep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sheep</span><span class="token punctuation">(</span><span class="token string">"tom"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"白色"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        sheep<span class="token punctuation">.</span>friend <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sheep</span><span class="token punctuation">(</span><span class="token string">"jack"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">"黑色"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Sheep</span> sheep2 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Sheep</span><span class="token punctuation">)</span> sheep<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 克隆</span>
        <span class="token class-name">Sheep</span> sheep3 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Sheep</span><span class="token punctuation">)</span> sheep<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 克隆</span>
        <span class="token class-name">Sheep</span> sheep4 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Sheep</span><span class="token punctuation">)</span> sheep<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 克隆</span>
        <span class="token class-name">Sheep</span> sheep5 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Sheep</span><span class="token punctuation">)</span> sheep<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 克隆</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"sheep2 ="</span> <span class="token operator">+</span> sheep2 <span class="token operator">+</span> <span class="token string">"sheep2.friend="</span> <span class="token operator">+</span> sheep2<span class="token punctuation">.</span>friend<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"sheep3 ="</span> <span class="token operator">+</span> sheep3 <span class="token operator">+</span> <span class="token string">"sheep3.friend="</span> <span class="token operator">+</span> sheep3<span class="token punctuation">.</span>friend<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"sheep4 ="</span> <span class="token operator">+</span> sheep4 <span class="token operator">+</span> <span class="token string">"sheep4.friend="</span> <span class="token operator">+</span> sheep4<span class="token punctuation">.</span>friend<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"sheep5 ="</span> <span class="token operator">+</span> sheep5 <span class="token operator">+</span> <span class="token string">"sheep5.friend="</span> <span class="token operator">+</span> sheep5<span class="token punctuation">.</span>friend<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="spring-框架的原型模式" tabindex="-1"><a class="header-anchor" href="#spring-框架的原型模式" aria-hidden="true">#</a> Spring 框架的原型模式</h2>
<p>Spring 中原型 bean 的创建，就是原型模式。</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220302213648.png" alt="image-20220301175359902" loading="lazy"></p>
<h2 id="深入讨论-浅拷贝和深拷贝" tabindex="-1"><a class="header-anchor" href="#深入讨论-浅拷贝和深拷贝" aria-hidden="true">#</a> 深入讨论：浅拷贝和深拷贝</h2>
<blockquote>
<p>浅拷贝的介绍</p>
</blockquote>
<ul>
<li>对于数据类型是基本数据类型的成员变量，浅拷贝会直接进行值传递，也就是将该属性值复制一份给新的对象</li>
<li>对于数据类型是引用数据类型的成员变量，比如说成员变量是某个数组、某个类的对象等，那么浅拷贝会进行引用传递，也就是只是将该成员变量的引用值（内存地址）复制一份给新的对象。因为实际上两个对象的该成员变量都指向同一个实例。在这种情况下，在一个对象中修改该成员变量会影响到另一个对象的该成员变量值</li>
<li><strong>前面我们克隆羊案例就是浅拷贝</strong></li>
<li>浅拷贝是使用默认的 <code v-pre>clone()</code> 方法来实现：<code v-pre>sheep = (Sheep) super.clone();</code></li>
</ul>
<blockquote>
<p>深拷贝基本介绍</p>
</blockquote>
<ul>
<li>复制对象的所有基本数据类型的成员变量值</li>
<li>为所有引用数据类型的成员变量申请存储空间，并复制每个引用数据类型成员变量所引用的对象，直到该对象 \ 可达的所有对象。也就是说，<strong>对象进行深拷贝要对整个对象（包括对象的引用类型）进行拷贝</strong></li>
<li>深拷贝实现方式 1：重写 <code v-pre>clone</code> 方法来实现深拷贝</li>
<li>深拷贝实现方式 2：通过 <strong>对象序列化</strong> 实现深拷贝（<strong>推荐</strong>）</li>
</ul>
<blockquote>
<p>深拷贝应用实例</p>
</blockquote>
<ul>
<li>使用 重写 <code v-pre>clone</code> 方法实现深拷贝</li>
<li>使用序列化来实现深拷贝</li>
</ul>
<p>DeepCloneableTarget 类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DeepCloneableTarget</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span><span class="token punctuation">,</span> <span class="token class-name">Cloneable</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">1L</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> cloneName<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> cloneClass<span class="token punctuation">;</span>

    <span class="token comment">// 构造器</span>
    <span class="token keyword">public</span> <span class="token class-name">DeepCloneableTarget</span><span class="token punctuation">(</span><span class="token class-name">String</span> cloneName<span class="token punctuation">,</span> <span class="token class-name">String</span> cloneClass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>cloneName <span class="token operator">=</span> cloneName<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>cloneClass <span class="token operator">=</span> cloneClass<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 因为该类的属性，都是 String , 因此我们这里使用默认的 clone 完成即可</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token class-name">Object</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">CloneNotSupportedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>DeepProtoType 类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DeepProtoType</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span><span class="token punctuation">,</span> <span class="token class-name">Cloneable</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span> <span class="token comment">// String 属性</span>
    <span class="token keyword">public</span> <span class="token class-name">DeepCloneableTarget</span> deepCloneableTarget<span class="token punctuation">;</span> <span class="token comment">// 引用类型</span>

    <span class="token keyword">public</span> <span class="token class-name">DeepProtoType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 深拷贝 - 方式 1 使用 clone 方法</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token class-name">Object</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">CloneNotSupportedException</span> <span class="token punctuation">{</span>

        <span class="token class-name">Object</span> deep <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token comment">// 这里完成对基本数据类型（属性）和 String 的克隆</span>
        deep <span class="token operator">=</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 对引用类型的属性，进行单独处理</span>
        <span class="token class-name">DeepProtoType</span> deepProtoType <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">DeepProtoType</span><span class="token punctuation">)</span> deep<span class="token punctuation">;</span>
        deepProtoType<span class="token punctuation">.</span>deepCloneableTarget <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">DeepCloneableTarget</span><span class="token punctuation">)</span> deepCloneableTarget<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> deepProtoType<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 深拷贝 - 方式 2 通过对象的序列化实现 (推荐)</span>

    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">deepClone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">// 创建流对象</span>
        <span class="token class-name">ByteArrayOutputStream</span> bos <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ObjectOutputStream</span> oos <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ByteArrayInputStream</span> bis <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ObjectInputStream</span> ois <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 序列化</span>
            bos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            oos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectOutputStream</span><span class="token punctuation">(</span>bos<span class="token punctuation">)</span><span class="token punctuation">;</span>
            oos<span class="token punctuation">.</span><span class="token function">writeObject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 当前这个对象以对象流的方式输出</span>

            <span class="token comment">// 反序列化</span>
            bis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span>bos<span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            ois <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectInputStream</span><span class="token punctuation">(</span>bis<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">DeepProtoType</span> copyObj <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">DeepProtoType</span><span class="token punctuation">)</span> ois<span class="token punctuation">.</span><span class="token function">readObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">return</span> copyObj<span class="token punctuation">;</span>

        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">// 关闭流</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                bos<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                oos<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                bis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                ois<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>e2<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Client 类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
		<span class="token class-name">DeepProtoType</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DeepProtoType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		p<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"宋江"</span><span class="token punctuation">;</span>
		p<span class="token punctuation">.</span>deepCloneableTarget <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DeepCloneableTarget</span><span class="token punctuation">(</span><span class="token string">"大牛"</span><span class="token punctuation">,</span> <span class="token string">"小牛"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token comment">// 方式 1：完成深拷贝</span>
		<span class="token comment">// DeepProtoType p2 = (DeepProtoType) p.clone();</span>
		
		<span class="token comment">// System.out.println("p.name=" + p.name + "p.deepCloneableTarget=" + p.deepCloneableTarget.hashCode());</span>
		<span class="token comment">// System.out.println("p2.name=" + p.name + "p2.deepCloneableTarget=" + p2.deepCloneableTarget.hashCode());</span>

		<span class="token comment">// 方式 2：完成深拷贝</span>
		<span class="token class-name">DeepProtoType</span> p2 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">DeepProtoType</span><span class="token punctuation">)</span> p<span class="token punctuation">.</span><span class="token function">deepClone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"p.name="</span> <span class="token operator">+</span> p<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">"p.deepCloneableTarget="</span> <span class="token operator">+</span> p<span class="token punctuation">.</span>deepCloneableTarget<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"p2.name="</span> <span class="token operator">+</span> p<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">"p2.deepCloneableTarget="</span> <span class="token operator">+</span> p2<span class="token punctuation">.</span>deepCloneableTarget<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>DeepProtoType 是引用类型，类似于常写的 Person、Animal 类等。</p>
<ul>
<li>
<p>方式一：如果直接调用引用类型的 <code v-pre>clone</code> 方法，则是浅拷贝。那么再创键一个类（成员变量有引用类型），在该类的 <code v-pre>clone</code> 方法里返回成员变量（引用类型），返回前，调用引用类型的 <code v-pre>clone</code> 方法赋值给成员变量即可</p>
</li>
<li>
<p>方式二：利用了序列化和反序列化，<strong>推荐</strong></p>
</li>
</ul>
<h2 id="原型模式的注意事项和细节" tabindex="-1"><a class="header-anchor" href="#原型模式的注意事项和细节" aria-hidden="true">#</a> 原型模式的注意事项和细节</h2>
<ul>
<li>创建新的对象比较复杂时，可以利用原型模式简化对象的创建过程，同时也能够提高效率</li>
<li>不用重新初始化对象，而是动态地获得对象运行时的状态</li>
<li>如果原始对象发生变化（增加或者减少属性），其它克隆对象的也会发生相应的变化，无需修改代码</li>
<li>在实现深克隆的时候可能需要比较复杂的代码</li>
<li>缺点：需要为每一个类配备一个克隆方法，这对全新的类来说不是很难，但对已有的类进行改造时，需要修改其源代码，违背了 OCP 原则</li>
</ul>
</div></template>
