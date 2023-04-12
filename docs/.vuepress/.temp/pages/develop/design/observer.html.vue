<template><div><h2 id="观察者模式基本介绍" tabindex="-1"><a class="header-anchor" href="#观察者模式基本介绍" aria-hidden="true">#</a> 观察者模式基本介绍</h2>
<p>在现实世界中，许多对象并不是独立存在的，其中一个对象的行为发生改变可能会导致一个或者多个其他对象的行为也发生改变。例如，某种商品的物价上涨时会导致部分商家高兴，而消费者伤心；还有，当我们开车到交叉路口时，遇到红灯会停，遇到绿灯会行。这样的例子还有很多，例如，股票价格与股民、微信公众号与微信用户、气象局的天气预报与听众、小偷与警察等。</p>
<p><strong>观察者模式</strong>（Observer Pattern）的定义：指多个对象间存在一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。这种模式有时又称作发布-订阅模式、模型-视图模式，它是对象行为型模式。</p>
<p>观察者模式是一种对象行为型模式。</p>
<blockquote>
<p>主要优点</p>
</blockquote>
<ul>
<li>降低了目标与观察者之间的耦合关系，两者之间是抽象耦合关系。符合依赖倒置原则</li>
<li>目标与观察者之间建立了一套触发机制</li>
</ul>
<blockquote>
<p>主要缺点</p>
</blockquote>
<ul>
<li>目标与观察者之间的依赖关系并没有完全解除，而且有可能出现循环引用</li>
<li>当观察者对象很多时，通知的发布会花费很多时间，影响程序的效率</li>
</ul>
<h2 id="观察者模式的结构与实现" tabindex="-1"><a class="header-anchor" href="#观察者模式的结构与实现" aria-hidden="true">#</a> 观察者模式的结构与实现</h2>
<p>实现观察者模式时要注意具体目标对象和具体观察者对象之间不能直接调用，否则将使两者之间紧密耦合起来，这违反了面向对象的设计原则。</p>
<p>观察者模式的主要角色如下：</p>
<ul>
<li>抽象主题（Subject）角色：也叫抽象目标类，它提供了一个用于保存观察者对象的聚集类和增加、删除观察者对象的方法，以及通知所有观察者的抽象方法</li>
<li>具体主题（Concrete Subject）角色：也叫具体目标类，它实现抽象目标中的通知方法，当具体主题的内部状态发生改变时，通知所有注册过的观察者对象</li>
<li>抽象观察者（Observer）角色：它是一个抽象类或接口，它包含了一个更新自己的抽象方法，当接到具体主题的更改通知时被调用</li>
<li>具体观察者（Concrete Observer）角色：实现抽象观察者中定义的抽象方法，以便在得到目标的更改通知时更新自身的状态</li>
</ul>
<p>观察者模式的结构图如下所示：</p>
<figure><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220326161322.png" alt="image-20220326161321893" tabindex="0" loading="lazy"><figcaption>image-20220326161321893</figcaption></figure>
<p>代码实现：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 抽象目标</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Subject</span> <span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Observer</span><span class="token punctuation">></span></span> observers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Observer</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 增加观察者方法</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Observer</span> observer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        observers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>observer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 删除观察者方法</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">Observer</span> observer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        observers<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>observer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">notifyObserver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 通知观察者方法</span>
<span class="token punctuation">}</span>
<span class="token comment">// 具体目标</span>
<span class="token keyword">class</span> <span class="token class-name">ConcreteSubject</span> <span class="token keyword">extends</span> <span class="token class-name">Subject</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">notifyObserver</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"具体目标发生改变..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"--------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Object</span> obs <span class="token operator">:</span> observers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Observer</span><span class="token punctuation">)</span> obs<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 抽象观察者</span>
<span class="token keyword">interface</span> <span class="token class-name">Observer</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 反应</span>
<span class="token punctuation">}</span>
<span class="token comment">// 具体观察者1</span>
<span class="token keyword">class</span> <span class="token class-name">ConcreteObserver1</span> <span class="token keyword">implements</span> <span class="token class-name">Observer</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"具体观察者1作出反应！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 具体观察者 1</span>
<span class="token keyword">class</span> <span class="token class-name">ConcreteObserver2</span> <span class="token keyword">implements</span> <span class="token class-name">Observer</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"具体观察者2作出反应！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ObserverPattern</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Subject</span> subject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteSubject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Observer</span> obs1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteObserver1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Observer</span> obs2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteObserver2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        subject<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>obs1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        subject<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>obs2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        subject<span class="token punctuation">.</span><span class="token function">notifyObserver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="天气预报项目需求" tabindex="-1"><a class="header-anchor" href="#天气预报项目需求" aria-hidden="true">#</a> 天气预报项目需求</h2>
<ul>
<li>气象站可以将每天测量到的温度，湿度，气压等等以公告的形式发布出去（比如发布到自己的网站或第三方）</li>
<li>需要设计开放型 API，便于其他第三方也能接入气象站获取数据</li>
<li>提供温度、气压和湿度的接口</li>
<li>测量数据更新时，要能实时的通知给第三方</li>
</ul>
<h2 id="普通方案解决天气预报需求" tabindex="-1"><a class="header-anchor" href="#普通方案解决天气预报需求" aria-hidden="true">#</a> 普通方案解决天气预报需求</h2>
<h3 id="逻辑分析" tabindex="-1"><a class="header-anchor" href="#逻辑分析" aria-hidden="true">#</a> 逻辑分析</h3>
<p>传统的设计方案初步设计出一个 WeatherData 类。</p>
<figure><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220326160527.png" alt="image-20220326160526405" tabindex="0" loading="lazy"><figcaption>image-20220326160526405</figcaption></figure>
<p>说明：</p>
<ul>
<li>通过 <code v-pre>getXxx</code> 方法，可以让第三方接入，并得到相关信息</li>
<li>当数据有更新时，气象站通过调用 <code v-pre>dataChange()</code> 去更新数据，当第三方再次获取时，就能得到最新数据，当然也可以推送</li>
</ul>
<figure><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220326160614.png" alt="image-20220326160613310" tabindex="0" loading="lazy"><figcaption>image-20220326160613310</figcaption></figure>
<p>CurrentConditions 可以理解成是我们气象局的网站。</p>
<h3 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CurrentConditions</span> <span class="token punctuation">{</span>
    <span class="token comment">// 温度，气压，湿度</span>
    <span class="token keyword">private</span> <span class="token keyword">float</span> temperature<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">float</span> pressure<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">float</span> humidity<span class="token punctuation">;</span>

    <span class="token comment">// 更新 天气情况，是由 WeatherData 来调用，我使用推送模式</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token keyword">float</span> temperature<span class="token punctuation">,</span> <span class="token keyword">float</span> pressure<span class="token punctuation">,</span> <span class="token keyword">float</span> humidity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>temperature <span class="token operator">=</span> temperature<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>pressure <span class="token operator">=</span> pressure<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>humidity <span class="token operator">=</span> humidity<span class="token punctuation">;</span>
        <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 显示</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"***Today mTemperature: "</span> <span class="token operator">+</span> temperature <span class="token operator">+</span> <span class="token string">"***"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"***Today mPressure: "</span> <span class="token operator">+</span> pressure <span class="token operator">+</span> <span class="token string">"***"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"***Today mHumidity: "</span> <span class="token operator">+</span> humidity <span class="token operator">+</span> <span class="token string">"***"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WeatherData</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">float</span> temperatrue<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">float</span> pressure<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">float</span> humidity<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">CurrentConditions</span> currentConditions<span class="token punctuation">;</span>
    <span class="token comment">// 加入新的第三方</span>
    <span class="token keyword">public</span> <span class="token class-name">WeatherData</span><span class="token punctuation">(</span><span class="token class-name">CurrentConditions</span> currentConditions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>currentConditions <span class="token operator">=</span> currentConditions<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">float</span> <span class="token function">getTemperature</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> temperatrue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">float</span> <span class="token function">getPressure</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> pressure<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">float</span> <span class="token function">getHumidity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> humidity<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">dataChange</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 调用接入方的 update</span>
        currentConditions<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token function">getTemperature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getPressure</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getHumidity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 当数据有更新时，就调用 setData</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setData</span><span class="token punctuation">(</span><span class="token keyword">float</span> temperature<span class="token punctuation">,</span> <span class="token keyword">float</span> pressure<span class="token punctuation">,</span> <span class="token keyword">float</span> humidity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>temperatrue <span class="token operator">=</span> temperature<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>pressure <span class="token operator">=</span> pressure<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>humidity <span class="token operator">=</span> humidity<span class="token punctuation">;</span>
        <span class="token comment">// 调用 dataChange， 将最新的信息推送给接入方 currentConditions</span>
        <span class="token function">dataChange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建接入方 currentConditions</span>
        <span class="token class-name">CurrentConditions</span> currentConditions <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CurrentConditions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 创建 WeatherData 并将接入方 currentConditions 传递到 WeatherData中</span>
        <span class="token class-name">WeatherData</span> weatherData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeatherData</span><span class="token punctuation">(</span>currentConditions<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 更新天气情况</span>
        weatherData<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 天气情况变化</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"============天气情况变化============="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        weatherData<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">,</span> <span class="token number">160</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="问题分析" tabindex="-1"><a class="header-anchor" href="#问题分析" aria-hidden="true">#</a> 问题分析</h3>
<ul>
<li>其他第三方接入气象站获取数据的问题</li>
<li>无法在运行时动态的添加第三方 (如新浪网站）</li>
<li>违反 OCP 原则</li>
<li>在 WeatherData 中，当增加一个第三方，都需要创建一个对应的第三方的公告板对象，并加入到 dataChange, 不利于维护，也不是动态加入</li>
</ul>
<p>所以我们可以使用 <strong>观察者模式</strong>，</p>
<h2 id="观察者模式解决天气预报需求" tabindex="-1"><a class="header-anchor" href="#观察者模式解决天气预报需求" aria-hidden="true">#</a> 观察者模式解决天气预报需求</h2>
<p>类图：</p>
<figure><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220326162334.png" alt="image-20220326162333026" tabindex="0" loading="lazy"><figcaption>image-20220326162333026</figcaption></figure>
<p>代码实现：</p>
<p>观察者类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 观察者接口，有观察者来实现</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Observer</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token keyword">float</span> temperature<span class="token punctuation">,</span> <span class="token keyword">float</span> pressure<span class="token punctuation">,</span> <span class="token keyword">float</span> humidity<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BaiduSite</span> <span class="token keyword">implements</span> <span class="token class-name">Observer</span> <span class="token punctuation">{</span>

	<span class="token comment">// 温度，气压，湿度</span>
	<span class="token keyword">private</span> <span class="token keyword">float</span> temperature<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">float</span> pressure<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">float</span> humidity<span class="token punctuation">;</span>

	<span class="token comment">// 更新 天气情况，是由 WeatherData 来调用，我使用推送模式</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token keyword">float</span> temperature<span class="token punctuation">,</span> <span class="token keyword">float</span> pressure<span class="token punctuation">,</span> <span class="token keyword">float</span> humidity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>temperature <span class="token operator">=</span> temperature<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>pressure <span class="token operator">=</span> pressure<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>humidity <span class="token operator">=</span> humidity<span class="token punctuation">;</span>
		<span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 显示</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"===百度网站===="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"***百度网站 气温 : "</span> <span class="token operator">+</span> temperature <span class="token operator">+</span> <span class="token string">"***"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"***百度网站 气压: "</span> <span class="token operator">+</span> pressure <span class="token operator">+</span> <span class="token string">"***"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"***百度网站 湿度: "</span> <span class="token operator">+</span> humidity <span class="token operator">+</span> <span class="token string">"***"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CurrentConditions</span> <span class="token keyword">implements</span> <span class="token class-name">Observer</span> <span class="token punctuation">{</span>

	<span class="token comment">// 温度，气压，湿度</span>
	<span class="token keyword">private</span> <span class="token keyword">float</span> temperature<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">float</span> pressure<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">float</span> humidity<span class="token punctuation">;</span>

	<span class="token comment">// 更新 天气情况，是由 WeatherData 来调用，我使用推送模式</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token keyword">float</span> temperature<span class="token punctuation">,</span> <span class="token keyword">float</span> pressure<span class="token punctuation">,</span> <span class="token keyword">float</span> humidity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>temperature <span class="token operator">=</span> temperature<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>pressure <span class="token operator">=</span> pressure<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>humidity <span class="token operator">=</span> humidity<span class="token punctuation">;</span>
		<span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 显示</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"***Today mTemperature: "</span> <span class="token operator">+</span> temperature <span class="token operator">+</span> <span class="token string">"***"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"***Today mPressure: "</span> <span class="token operator">+</span> pressure <span class="token operator">+</span> <span class="token string">"***"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"***Today mHumidity: "</span> <span class="token operator">+</span> humidity <span class="token operator">+</span> <span class="token string">"***"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数据类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 接口, 让 WeatherData 来实现 </span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Subject</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">registerObserver</span><span class="token punctuation">(</span><span class="token class-name">Observer</span> o<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">removeObserver</span><span class="token punctuation">(</span><span class="token class-name">Observer</span> o<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">notifyObservers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/**
 * 类是核心
 * 1. 包含最新的天气情况信息 
 * 2. 含有 观察者集合，使用 ArrayList 管理
 * 3. 当数据有更新时，就主动的调用 ArrayList，通知所有的（接入方）就看到最新的信息
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WeatherData</span> <span class="token keyword">implements</span> <span class="token class-name">Subject</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">float</span> temperatrue<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">float</span> pressure<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">float</span> humidity<span class="token punctuation">;</span>
    <span class="token comment">// 观察者集合</span>
    <span class="token keyword">private</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Observer</span><span class="token punctuation">></span></span> observers<span class="token punctuation">;</span>
    <span class="token comment">// 加入新的第三方</span>
    <span class="token keyword">public</span> <span class="token class-name">WeatherData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        observers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Observer</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">float</span> <span class="token function">getTemperature</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> temperatrue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">float</span> <span class="token function">getPressure</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> pressure<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">float</span> <span class="token function">getHumidity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> humidity<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">dataChange</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 调用 接入方的 update</span>
        <span class="token function">notifyObservers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 当数据有更新时，就调用 setData</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setData</span><span class="token punctuation">(</span><span class="token keyword">float</span> temperature<span class="token punctuation">,</span> <span class="token keyword">float</span> pressure<span class="token punctuation">,</span> <span class="token keyword">float</span> humidity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>temperatrue <span class="token operator">=</span> temperature<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>pressure <span class="token operator">=</span> pressure<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>humidity <span class="token operator">=</span> humidity<span class="token punctuation">;</span>
        <span class="token comment">// 调用 dataChange， 将最新的信息推送给接入方 currentConditions</span>
        <span class="token function">dataChange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 注册一个观察者</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">registerObserver</span><span class="token punctuation">(</span><span class="token class-name">Observer</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        observers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 移除一个观察者</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">removeObserver</span><span class="token punctuation">(</span><span class="token class-name">Observer</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>observers<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            observers<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 遍历所有的观察者，并通知</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">notifyObservers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> observers<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            observers<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>temperatrue<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>pressure<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>humidity<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 创建一个 WeatherData</span>
		<span class="token class-name">WeatherData</span> weatherData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeatherData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token comment">// 创建观察者</span>
		<span class="token class-name">CurrentConditions</span> currentConditions <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CurrentConditions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">BaiduSite</span> baiduSite <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BaiduSite</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token comment">// 注册到 WeatherData</span>
		weatherData<span class="token punctuation">.</span><span class="token function">registerObserver</span><span class="token punctuation">(</span>currentConditions<span class="token punctuation">)</span><span class="token punctuation">;</span>
		weatherData<span class="token punctuation">.</span><span class="token function">registerObserver</span><span class="token punctuation">(</span>baiduSite<span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token comment">// 测试</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"通知各个注册的观察者, 看看信息"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		weatherData<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token number">10f</span><span class="token punctuation">,</span> <span class="token number">100f</span><span class="token punctuation">,</span> <span class="token number">30.3f</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		weatherData<span class="token punctuation">.</span><span class="token function">removeObserver</span><span class="token punctuation">(</span>currentConditions<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 测试</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"通知各个注册的观察者, 看看信息"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		weatherData<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token number">10f</span><span class="token punctuation">,</span> <span class="token number">100f</span><span class="token punctuation">,</span> <span class="token number">30.3f</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用了观察者模式设计后，会以集合的方式来管理用户（Observer），包括注册，移除和通知。这样，我们增加观察者（这里可以理解成一个新的公告板），就不需要去修改核心类 WeatherData 不会修改代码，遵守了 OCP 原则。</p>
<h2 id="jdk-的观察者模式剖析" tabindex="-1"><a class="header-anchor" href="#jdk-的观察者模式剖析" aria-hidden="true">#</a> JDK 的观察者模式剖析</h2>
<p>JDK 的 Observable 类就使用了观察者模式。</p>
<figure><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220326162754.png" alt="image-20220326162754094" tabindex="0" loading="lazy"><figcaption>image-20220326162754094</figcaption></figure>
<ul>
<li>Observable 的作用和地位等价于我们前面讲过 Subject</li>
<li>Observable 是类，不是接口，类中已经实现了核心的方法，即管理 Observer 的方法 <code v-pre>add</code>、<code v-pre>delete</code>、<code v-pre>notify</code></li>
<li>Observer 的作用和地位等价于我们前面讲过的 Observer，有 update</li>
<li>Observable 和 Observer 的使用方法和前面讲过的一样，只是 Observable 是类，通过继承来实现观察者模式</li>
</ul>
<h2 id="观察者模式的应用场景" tabindex="-1"><a class="header-anchor" href="#观察者模式的应用场景" aria-hidden="true">#</a> 观察者模式的应用场景</h2>
<p>在软件系统中，当系统一方行为依赖另一方行为的变动时，可使用观察者模式松耦合联动双方，使得一方的变动可以通知到感兴趣的另一方对象，从而让另一方对象对此做出响应。</p>
<p>通过前面的分析与应用实例可知观察者模式适合以下几种情形：</p>
<ul>
<li>
<p>对象间存在一对多关系，一个对象的状态发生改变会影响其他对象</p>
</li>
<li>
<p>当一个抽象模型有两个方面，其中一个方面依赖于另一方面时，可将这二者封装在独立的对象中以使它们可以各自独立地改变和复用</p>
</li>
<li>
<p>实现类似广播机制的功能，不需要知道具体收听者，只需分发广播，系统中感兴趣的对象会自动接收该广播</p>
</li>
<li>
<p>多层级嵌套使用，形成一种链式触发机制，使得事件具备跨域（跨越两种观察者类型）通知</p>
</li>
</ul>
</div></template>


