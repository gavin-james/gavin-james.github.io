<template><div><nav class="table-of-contents"><ul><li><router-link to="#状态模式基本介绍">状态模式基本介绍</router-link></li><li><router-link to="#状态模式的结构与实现">状态模式的结构与实现</router-link></li><li><router-link to="#app-抽奖活动问题">APP 抽奖活动问题</router-link></li><li><router-link to="#状态模式解决抽奖活动问题">状态模式解决抽奖活动问题</router-link></li><li><router-link to="#状态模式在实际项目源码">状态模式在实际项目源码</router-link></li><li><router-link to="#状态模式的注意事项和细节">状态模式的注意事项和细节</router-link></li><li><router-link to="#状态模式的应用场景">状态模式的应用场景</router-link></li></ul></nav>
<h2 id="状态模式基本介绍" tabindex="-1"><a class="header-anchor" href="#状态模式基本介绍" aria-hidden="true">#</a> 状态模式基本介绍</h2>
<p>在软件开发过程中，应用程序中的部分对象可能会根据不同的情况做出不同的行为，我们把这种对象称为有状态的对象，而把影响对象行为的一个或多个动态变化的属性称为状态。当有状态的对象与外部事件产生互动时，其内部状态就会发生改变，从而使其行为也发生改变。如人都有高兴和伤心的时候，不同的情绪有不同的行为，当然外界也会影响其情绪变化。</p>
<p>对这种有状态的对象编程，传统的解决方案是：将这些所有可能发生的情况全都考虑到，然后使用 if-else 或 switch-case 语句来做状态判断，再进行不同情况的处理。但是显然这种做法对复杂的状态判断存在天然弊端，条件判断语句会过于臃肿，可读性差，且不具备扩展性，维护难度也大。且增加新的状态时要添加新的 if-else 语句，这违背了「开闭原则」，不利于程序的扩展。</p>
<p>以上问题如果采用 <mark>状态模式</mark> 就能很好地得到解决。状态模式的解决思想是：当控制一个对象状态转换的条件表达式过于复杂时，把相关「判断逻辑」提取出来，用各个不同的类进行表示，系统处于哪种情况，直接使用相应的状态类对象进行处理，这样能把原来复杂的逻辑判断简单化，消除了 <code v-pre>if-else</code>、<code v-pre>switch-case</code> 等冗余语句，代码更有层次性，并且具备良好的扩展力。</p>
<p><strong>状态模式</strong>（State Pattern）：对有状态的对象，把复杂的「判断逻辑」提取到不同的状态对象中，允许状态对象在其内部状态发生改变时改变其行为。它主要用来解决对象在多种状态转换时，需要对外输出不同的行为的问题。状态和行为是一一对应的，状态之间可以相互转换。</p>
<p>当一个对象的内在状态改变时，允许改变其行为，这个对象看起来像是改变了其类。</p>
<p>状态模式是一种对象行为型模式。</p>
<blockquote>
<p>主要优点</p>
</blockquote>
<ul>
<li>结构清晰，状态模式将与特定状态相关的行为局部化到一个状态中，并且将不同状态的行为分割开来，满足「单一职责原则」</li>
<li>将状态转换显示化，减少对象间的相互依赖。将不同的状态引入独立的对象中会使得状态转换变得更加明确，且减少对象间的相互依赖</li>
<li>状态类职责明确，有利于程序的扩展。通过定义新的子类很容易地增加新的状态和转换</li>
</ul>
<blockquote>
<p>主要缺点</p>
</blockquote>
<ul>
<li>状态模式的使用必然会增加系统的类与对象的个数</li>
<li>状态模式的结构与实现都较为复杂，如果使用不当会导致程序结构和代码的混乱</li>
<li>状态模式对开闭原则的支持并不太好，对于可以切换状态的状态模式，增加新的状态类需要修改那些负责状态转换的源码，否则无法切换到新增状态，而且修改某个状态类的行为也需要修改对应类的源码</li>
</ul>
<h2 id="状态模式的结构与实现" tabindex="-1"><a class="header-anchor" href="#状态模式的结构与实现" aria-hidden="true">#</a> 状态模式的结构与实现</h2>
<p>状态模式把受环境改变的对象行为包装在不同的状态对象里，其意图是让一个对象在其内部状态改变的时候，其行为也随之改变。现在我们来分析其基本结构和实现方法。</p>
<p>状态模式包含以下主要角色。</p>
<ul>
<li>环境类（Context）角色：也称为上下文，它定义了客户端需要的接口，内部维护一个当前状态，并负责具体状态的切换</li>
<li>抽象状态（State）角色：定义一个接口，用以封装环境对象中的特定状态所对应的行为，可以有一个或多个行为</li>
<li>具体状态（Concrete State）角色：实现抽象状态所对应的行为，并且在需要的情况下进行状态切换</li>
</ul>
<p>其结构图如下图所示：</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220326173759.png" alt="image-20220326173758893" loading="lazy"></p>
<p>代码实现：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 环境类</span>
<span class="token keyword">class</span> <span class="token class-name">Context</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">State</span> state<span class="token punctuation">;</span>
    <span class="token comment">// 定义环境类的初始状态</span>
    <span class="token keyword">public</span> <span class="token class-name">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteStateA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 设置新状态</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setState</span><span class="token punctuation">(</span><span class="token class-name">State</span> state<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 读取状态</span>
    <span class="token keyword">public</span> <span class="token class-name">State</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 对请求做处理</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token class-name">Handle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token namespace">state<span class="token punctuation">.</span></span>Handle</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 抽象状态类</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">State</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token class-name">Handle</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 具体状态 A 类</span>
<span class="token keyword">class</span> <span class="token class-name">ConcreteStateA</span> <span class="token keyword">extends</span> <span class="token class-name">State</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token class-name">Handle</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"当前状态是 A."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        context<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ConcreteStateB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 具体状态 B 类</span>
<span class="token keyword">class</span> <span class="token class-name">ConcreteStateB</span> <span class="token keyword">extends</span> <span class="token class-name">State</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token class-name">Handle</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"当前状态是 B."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        context<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ConcreteStateA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StatePatternClient</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Context</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 创建环境      </span>
        <span class="token class-name"><span class="token namespace">context<span class="token punctuation">.</span></span>Handle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 处理请求</span>
        <span class="token class-name"><span class="token namespace">context<span class="token punctuation">.</span></span>Handle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token namespace">context<span class="token punctuation">.</span></span>Handle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token namespace">context<span class="token punctuation">.</span></span>Handle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="app-抽奖活动问题" tabindex="-1"><a class="header-anchor" href="#app-抽奖活动问题" aria-hidden="true">#</a> APP 抽奖活动问题</h2>
<p>具体要求如下：</p>
<ul>
<li>假如每参加一次这个活动要扣除用户 50 积分，中奖概率是 10%</li>
<li>奖品数量固定，抽完就不能抽奖</li>
<li>活动有四个状态: 可以抽奖、不能抽奖、发放奖品和奖品领完</li>
</ul>
<p>活动的四个状态转换关系图：</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220326172740.png" alt="image-20220326172739237" loading="lazy"></p>
<h2 id="状态模式解决抽奖活动问题" tabindex="-1"><a class="header-anchor" href="#状态模式解决抽奖活动问题" aria-hidden="true">#</a> 状态模式解决抽奖活动问题</h2>
<p>思路分析和类图：</p>
<ul>
<li>定义出一个接口叫状态接口，每个状态都实现它</li>
<li>接口有扣除积分方法、抽奖方法、发放奖品方法</li>
</ul>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220326172844.png" alt="image-20220326172843488" loading="lazy"></p>
<p>代码示例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RaffleActivity</span> <span class="token punctuation">{</span>

    <span class="token comment">// state 表示活动当前的状态，是变化</span>
    <span class="token class-name">State</span> state <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token comment">// 奖品数量</span>
    <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token comment">// 四个属性，表示四种状态</span>
    <span class="token class-name">State</span> noRafflleState <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NoRaffleState</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">State</span> canRaffleState <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CanRaffleState</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">State</span> dispenseState <span class="token operator">=</span>   <span class="token keyword">new</span> <span class="token class-name">DispenseState</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">State</span> dispensOutState <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DispenseOutState</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 构造器</span>
    <span class="token comment">// 1. 初始化当前的状态为 noRafflleState（即不能抽奖的状态）</span>
    <span class="token comment">// 2. 初始化奖品的数量 </span>
    <span class="token keyword">public</span> <span class="token class-name">RaffleActivity</span><span class="token punctuation">(</span> <span class="token keyword">int</span> count<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token function">getNoRafflleState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">=</span> count<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 扣分，调用当前状态的 deductMoney</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">debuctMoney</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        state<span class="token punctuation">.</span><span class="token function">deductMoney</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 抽奖 </span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">raffle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 如果当前的状态是抽奖成功</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span><span class="token function">raffle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// 领取奖品</span>
            state<span class="token punctuation">.</span><span class="token function">dispensePrize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//这里请大家注意，每领取一次奖品，count--</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> curCount <span class="token operator">=</span> count<span class="token punctuation">;</span> 
        count<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> curCount<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// setter 和 getter 方法省略</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>状态类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 状态抽象类</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">State</span> <span class="token punctuation">{</span>
    <span class="token comment">// 扣除积分 - 50</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">deductMoney</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 是否抽中奖品</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">boolean</span> <span class="token function">raffle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 发放奖品</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span>  <span class="token keyword">void</span> <span class="token function">dispensePrize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 可以抽奖的状态</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CanRaffleState</span> <span class="token keyword">extends</span> <span class="token class-name">State</span> <span class="token punctuation">{</span>

    <span class="token class-name">RaffleActivity</span> activity<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">CanRaffleState</span><span class="token punctuation">(</span><span class="token class-name">RaffleActivity</span> activity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>activity <span class="token operator">=</span> activity<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 已经扣除了积分，不能再扣</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">deductMoney</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"已经扣取过了积分"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 可以抽奖, 抽完奖后，根据实际情况，改成新的状态</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">raffle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"正在抽奖，请稍等！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Random</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> num <span class="token operator">=</span> r<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 10% 中奖机会</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>num <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// 改变活动状态为发放奖品 context</span>
            activity<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>activity<span class="token punctuation">.</span><span class="token function">getDispenseState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"很遗憾没有抽中奖品！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 改变状态为不能抽奖</span>
            activity<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>activity<span class="token punctuation">.</span><span class="token function">getNoRafflleState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 不能发放奖品</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">dispensePrize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"没中奖，不能发放奖品"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 不能抽奖状态</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NoRaffleState</span> <span class="token keyword">extends</span> <span class="token class-name">State</span> <span class="token punctuation">{</span>
    <span class="token comment">// 初始化时传入活动引用，扣除积分后改变其状态</span>
    <span class="token class-name">RaffleActivity</span> activity<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">NoRaffleState</span><span class="token punctuation">(</span><span class="token class-name">RaffleActivity</span> activity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>activity <span class="token operator">=</span> activity<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 当前状态可以扣积分，扣除后，将状态设置成可以抽奖状态</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">deductMoney</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"扣除50积分成功，您可以抽奖了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        activity<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>activity<span class="token punctuation">.</span><span class="token function">getCanRaffleState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 当前状态不能抽奖</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">raffle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"扣了积分才能抽奖喔！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 当前状态不能发奖品</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">dispensePrize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"不能发放奖品"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 发放奖品的状态</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DispenseState</span> <span class="token keyword">extends</span> <span class="token class-name">State</span> <span class="token punctuation">{</span>

    <span class="token comment">// 初始化时传入活动引用，发放奖品后改变其状态</span>
    <span class="token class-name">RaffleActivity</span> activity<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">DispenseState</span><span class="token punctuation">(</span><span class="token class-name">RaffleActivity</span> activity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>activity <span class="token operator">=</span> activity<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">deductMoney</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"不能扣除积分"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">raffle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"不能抽奖"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 发放奖品</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">dispensePrize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>activity<span class="token punctuation">.</span><span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"恭喜中奖了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 改变状态为不能抽奖</span>
            activity<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>activity<span class="token punctuation">.</span><span class="token function">getNoRafflleState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"很遗憾，奖品发送完了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 改变状态为奖品发送完毕，后面我们就不可以抽奖</span>
            activity<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>activity<span class="token punctuation">.</span><span class="token function">getDispensOutState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 奖品发放完毕状态</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DispenseOutState</span> <span class="token keyword">extends</span> <span class="token class-name">State</span> <span class="token punctuation">{</span>
    <span class="token comment">// 初始化时传入活动引用，当我们 activity 改变成 DispenseOutState，抽奖活动结束</span>
    <span class="token class-name">RaffleActivity</span> activity<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">DispenseOutState</span><span class="token punctuation">(</span><span class="token class-name">RaffleActivity</span> activity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>activity <span class="token operator">=</span> activity<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">deductMoney</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"奖品发送完了，请下次再参加"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">raffle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"奖品发送完了，请下次再参加"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">dispensePrize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"奖品发送完了，请下次再参加"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 状态模式测试类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ClientTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建活动对象，奖品有 1 个奖品</span>
        <span class="token class-name">RaffleActivity</span> activity <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RaffleActivity</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 我们连续抽 300 次奖</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">30</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"--------第"</span> <span class="token operator">+</span> <span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"次抽奖----------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 参加抽奖，第一步点击扣除积分</span>
            activity<span class="token punctuation">.</span><span class="token function">debuctMoney</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 第二步抽奖</span>
            activity<span class="token punctuation">.</span><span class="token function">raffle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="状态模式在实际项目源码" tabindex="-1"><a class="header-anchor" href="#状态模式在实际项目源码" aria-hidden="true">#</a> 状态模式在实际项目源码</h2>
<p>借贷平台的订单，有审核、发布、抢单等等步骤，随着操作的不同，会改变订单的状态，项目中的这个模块实现就会使用到状态模式。</p>
<p>通常通过 if/else 判断订单的状态，从而实现不同的逻辑，伪代码如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">if</span><span class="token punctuation">(</span>审核<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 审核逻辑</span>
<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>发布<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 发布逻辑</span>
<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>抢单<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 抢单逻辑</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>问题分析</p>
</blockquote>
<p>这类代码难以应对变化，在添加一种状态时，我们需要手动添加 <code v-pre>if/else</code>，在添加一种功能时，要对所有的状态进行判断。因此代码会变得越来越臃肿，并且一旦没有处理某个状态，便会发生极其严重的 BUG，难以维护。</p>
<blockquote>
<p>使用状态模式完成借贷平台项目的审核模块</p>
</blockquote>
<p>状态类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">State</span> <span class="token punctuation">{</span>
    <span class="token comment">// 电审</span>
    <span class="token keyword">void</span> <span class="token function">checkEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 电审失败</span>
    <span class="token keyword">void</span> <span class="token function">checkFailEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 定价发布</span>
    <span class="token keyword">void</span> <span class="token function">makePriceEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 接单</span>
    <span class="token keyword">void</span> <span class="token function">acceptOrderEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 无人接单失效</span>
    <span class="token keyword">void</span> <span class="token function">notPeopleAcceptEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 付款</span>
    <span class="token keyword">void</span> <span class="token function">payOrderEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 接单有人支付失效</span>
    <span class="token keyword">void</span> <span class="token function">orderFailureEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 反馈</span>
    <span class="token keyword">void</span> <span class="token function">feedBackEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token comment">// 获取状态</span>
    <span class="token class-name">String</span> <span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>各种状态子类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractState</span> <span class="token keyword">implements</span> <span class="token class-name">State</span> <span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">RuntimeException</span> EXCEPTION <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"操作流程不允许"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 抽象类，默认实现了 State 接口的所有方法</span>
    <span class="token comment">// 该类的所有方法，其子类（具体的状态类），可以有选择的进行重写</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">checkEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> EXCEPTION<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">checkFailEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> EXCEPTION<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">makePriceEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> EXCEPTION<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">acceptOrderEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> EXCEPTION<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">notPeopleAcceptEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> EXCEPTION<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">payOrderEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> EXCEPTION<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">orderFailureEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> EXCEPTION<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">feedBackEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> EXCEPTION<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 已完结状态类</span>
<span class="token keyword">class</span> <span class="token class-name">FeedBackState</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractState</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">StateEnum</span><span class="token punctuation">.</span>FEED_BACKED<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 订单生成状态类</span>
<span class="token keyword">class</span> <span class="token class-name">GenerateState</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractState</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">checkEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        context<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ReviewState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">checkFailEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        context<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FeedBackState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">StateEnum</span><span class="token punctuation">.</span>GENERATE<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 待付款状态类</span>
<span class="token keyword">class</span> <span class="token class-name">NotPayState</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractState</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">payOrderEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        context<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PaidState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">feedBackEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        context<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FeedBackState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">StateEnum</span><span class="token punctuation">.</span>NOT_PAY<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 已付款状态类</span>
<span class="token keyword">class</span> <span class="token class-name">PaidState</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractState</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">feedBackEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        context<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FeedBackState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">StateEnum</span><span class="token punctuation">.</span>PAID<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 已发布状态类</span>
<span class="token keyword">class</span> <span class="token class-name">PublishState</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractState</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">acceptOrderEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 把当前状态设置为  NotPayState</span>
        <span class="token comment">// 至于应该变成哪个状态，有流程图来决定</span>
        context<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">NotPayState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">notPeopleAcceptEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        context<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FeedBackState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">StateEnum</span><span class="token punctuation">.</span>PUBLISHED<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 已审核状态类</span>
<span class="token keyword">class</span> <span class="token class-name">ReviewState</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractState</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">makePriceEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        context<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PublishState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">StateEnum</span><span class="token punctuation">.</span>REVIEWED<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>状态枚举类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">StateEnum</span> <span class="token punctuation">{</span>
    <span class="token comment">// 订单生成</span>
    <span class="token function">GENERATE</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"GENERATE"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// 已审核</span>
    <span class="token function">REVIEWED</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">"REVIEWED"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// 已发布</span>
    <span class="token function">PUBLISHED</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">"PUBLISHED"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// 待付款</span>
    <span class="token function">NOT_PAY</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">"NOT_PAY"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// 已付款</span>
    <span class="token function">PAID</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">"PAID"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// 已完结</span>
    <span class="token function">FEED_BACKED</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token string">"FEED_BACKED"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">private</span> <span class="token keyword">int</span> key<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> value<span class="token punctuation">;</span>
    <span class="token class-name">StateEnum</span><span class="token punctuation">(</span><span class="token keyword">int</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> key<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token keyword">return</span> key<span class="token punctuation">;</span><span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token keyword">return</span> value<span class="token punctuation">;</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>环境上下文类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 环境上下文</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Context</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractState</span><span class="token punctuation">{</span>
	<span class="token comment">// 当前的状态 state，根据我们的业务流程处理，不停的变化</span>
	<span class="token keyword">private</span> <span class="token class-name">State</span> state<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">checkEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span><span class="token function">checkEvent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">checkFailEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span><span class="token function">checkFailEvent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">makePriceEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span><span class="token function">makePriceEvent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">acceptOrderEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span><span class="token function">acceptOrderEvent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">notPeopleAcceptEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span><span class="token function">notPeopleAcceptEvent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">payOrderEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span><span class="token function">payOrderEvent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">orderFailureEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span><span class="token function">orderFailureEvent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">feedBackEvent</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span><span class="token function">feedBackEvent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">State</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> state<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setState</span><span class="token punctuation">(</span><span class="token class-name">State</span> state<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"当前状态 : "</span> <span class="token operator">+</span> state<span class="token punctuation">.</span><span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> state<span class="token punctuation">.</span><span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ClientTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建 context 对象</span>
        <span class="token class-name">Context</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 将当前状态设置为 PublishState</span>
        context<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PublishState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        context<span class="token punctuation">.</span><span class="token function">acceptOrderEvent</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
        context<span class="token punctuation">.</span><span class="token function">payOrderEvent</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 失败, 检测失败时，会抛出异常</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            context<span class="token punctuation">.</span><span class="token function">checkFailEvent</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"流程正常.."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="状态模式的注意事项和细节" tabindex="-1"><a class="header-anchor" href="#状态模式的注意事项和细节" aria-hidden="true">#</a> 状态模式的注意事项和细节</h2>
<ul>
<li>状态模式的代码有很强的可读性。状态模式将每个状态的行为封装到对应的一个类</li>
<li>状态模式方便维护。将容易产生问题的 <code v-pre>if-else</code> 语句删除了，如果把每个状态的行为都放到一个类中，每次调用方法时都要判断当前是什么状态，不但会产出很多 <code v-pre>if-else</code> 语句，而且容易出错</li>
<li>符合「开闭原则」。容易增删状态</li>
<li>会产生很多类。每个状态都要一个对应的类，当状态过多时会产生很多类，加大维护难度</li>
</ul>
<h2 id="状态模式的应用场景" tabindex="-1"><a class="header-anchor" href="#状态模式的应用场景" aria-hidden="true">#</a> 状态模式的应用场景</h2>
<p>通常在以下情况下可以考虑使用状态模式：</p>
<ul>
<li>当一个对象的行为取决于它的状态，并且它必须在运行时根据状态改变它的行为时，就可以考虑使用状态模式</li>
<li>一个操作中含有庞大的分支结构，并且这些分支决定于对象的状态时</li>
</ul>
</div></template>
