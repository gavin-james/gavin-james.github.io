<template><div><h2 id="解释器模式基本介绍" tabindex="-1"><a class="header-anchor" href="#解释器模式基本介绍" aria-hidden="true">#</a> 解释器模式基本介绍</h2>
<p>在编译原理中，一个算术表达式通过词法分析器形成词法单元，而后这些词法单元再通过语法分析器构建语法分析树，最终形成一颗抽象的语法分析树。这里的词法分析器和语法分析器都可以看做是解释器。</p>
<p><strong>解释器模式</strong>（Interpreter Pattern）：是指给定一个语言（表达式），定义它的文法的一种表示，并定义一个解释器，使用该解释器来解释语言中的句子（表达式）。这种模式实现了文法表达式处理的接口，该接口解释一个特定的上下文。</p>
<p>这里提到的文法和句子的概念同编译原理中的描述相同，<mark>文法</mark> 指语言的语法规则，而 <mark>句子</mark> 是语言集中的元素。例如，汉语中的句子有很多，「我是中国人」是其中的一个句子，可以用一棵语法树来直观地描述语言中的句子。</p>
<p>解释器模式是一种类行为型模式。</p>
<blockquote>
<p>主要优点</p>
</blockquote>
<ul>
<li>扩展性好。由于在解释器模式中使用类来表示语言的文法规则，因此可以通过继承等机制来改变或扩展文法</li>
<li>容易实现。在语法树中的每个表达式节点类都是相似的，所以实现其文法较为容易</li>
</ul>
<blockquote>
<p>主要缺点</p>
</blockquote>
<ul>
<li><strong>执行效率较低</strong>。解释器模式中通常使用大量的循环和递归调用，当要解释的句子较复杂时，其运行速度很慢，且代码的调试过程也比较麻烦</li>
<li><strong>会引起类膨胀</strong>。解释器模式中的每条规则至少需要定义一个类，当包含的文法规则很多时，类的个数将急剧增加，导致系统难以管理与维护</li>
<li><strong>可应用的场景比较少</strong>。在软件开发中，需要定义语言文法的应用实例非常少，所以这种模式很少被使用到</li>
</ul>
<h2 id="解释器模式的结构与实现" tabindex="-1"><a class="header-anchor" href="#解释器模式的结构与实现" aria-hidden="true">#</a> 解释器模式的结构与实现</h2>
<p>解释器模式的结构与 <a href="https://notes.gavin.cn/design-pattern/combination/" target="_blank" rel="noopener noreferrer">组合模式<ExternalLinkIcon/></a> 相似，不过其包含的组成元素比组合模式多，而且组合模式是对象结构型模式，而解释器模式是类行为型模式。</p>
<p>解释器模式包含以下主要角色：</p>
<ul>
<li>抽象表达式（Abstract Expression）角色：定义解释器的接口，约定解释器的解释操作，主要包含解释方法 <code v-pre>interpret()</code></li>
<li>终结符表达式（Terminal Expression）角色：是抽象表达式的子类，用来实现文法中与终结符相关的操作，文法中的每一个终结符都有一个具体终结表达式与之相对应</li>
<li>非终结符表达式（Nonterminal Expression）角色：也是抽象表达式的子类，用来实现文法中与非终结符相关的操作，文法中的每条规则都对应于一个非终结符表达式</li>
<li>环境（Context）角色：通常包含各个解释器需要的数据或是公共的功能，一般用来传递被所有解释器共享的数据，后面的解释器可以从这里获取这些值</li>
<li>客户端（Client）：主要任务是将需要分析的句子或表达式转换成使用解释器对象描述的抽象语法树，然后调用解释器的解释方法，当然也可以通过环境角色间接访问解释器的解释方法</li>
</ul>
<p>解释器模式的结构图如下图所示：</p>
<figure><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220326171644.png" alt="image-20220326171643437" tabindex="0" loading="lazy"><figcaption>image-20220326171643437</figcaption></figure>
<p>代码实现：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 抽象表达式类</span>
<span class="token keyword">interface</span> <span class="token class-name">AbstractExpression</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">interpret</span><span class="token punctuation">(</span><span class="token class-name">String</span> info<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 解释方法</span>
<span class="token punctuation">}</span>
<span class="token comment">// 终结符表达式类</span>
<span class="token keyword">class</span> <span class="token class-name">TerminalExpression</span> <span class="token keyword">implements</span> <span class="token class-name">AbstractExpression</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">interpret</span><span class="token punctuation">(</span><span class="token class-name">String</span> info<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 对终结符表达式的处理</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 非终结符表达式类</span>
<span class="token keyword">class</span> <span class="token class-name">NonterminalExpression</span> <span class="token keyword">implements</span> <span class="token class-name">AbstractExpression</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">AbstractExpression</span> exp1<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">AbstractExpression</span> exp2<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">interpret</span><span class="token punctuation">(</span><span class="token class-name">String</span> info<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 非对终结符表达式的处理</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 环境类</span>
<span class="token keyword">class</span> <span class="token class-name">Context</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">AbstractExpression</span> exp<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 数据初始化</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation</span><span class="token punctuation">(</span><span class="token class-name">String</span> info<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 调用相关表达式类的解释方法</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四则运算问题" tabindex="-1"><a class="header-anchor" href="#四则运算问题" aria-hidden="true">#</a> 四则运算问题</h2>
<p>先输入表达式的形式，分别输入 a、b、c、d、e 的值，比如 <code v-pre>a + b + c - d + e</code>，要求表达式的字母不能重复，最后求出结果：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>请输入表达式：a+b+c-d+e
请输入a的值：10
请输入b的值：11
请输入c的值：1
请输入d的值：2
请输入e的值：3
运算结果：a+b+c-d+e=23
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如图</p>
<figure><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220326170940.png" alt="image-20220326170939660" tabindex="0" loading="lazy"><figcaption>image-20220326170939660</figcaption></figure>
<h2 id="解释器模式来实现四则" tabindex="-1"><a class="header-anchor" href="#解释器模式来实现四则" aria-hidden="true">#</a> 解释器模式来实现四则</h2>
<p>思路分析和类图：</p>
<figure><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220326171910.png" alt="image-20220326171909429" tabindex="0" loading="lazy"><figcaption>image-20220326171909429</figcaption></figure>
<p>代码实现：</p>
<p>解释器类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 抽象类表达式，通过 HashMap 键值对, 可以获取到变量的值</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Expression</span> <span class="token punctuation">{</span>
    <span class="token comment">// a + b - c</span>
    <span class="token comment">// 解释公式和数值, key 就是公式(表达式) 参数[a,b,c], value 就是就是具体值</span>
    <span class="token comment">// HashMap {a=10, b=20}</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">int</span> <span class="token function">interpreter</span><span class="token punctuation">(</span><span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span> <span class="token keyword">var</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 抽象运算符号解析器 这里，每个运算符号，都只和自己左右两个数字有关系，但左右两个数字有可能也是一个解析的结果，无论何种类型，都是 Expression 类的实现类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SymbolExpression</span> <span class="token keyword">extends</span> <span class="token class-name">Expression</span> <span class="token punctuation">{</span>

	<span class="token keyword">protected</span> <span class="token class-name">Expression</span> left<span class="token punctuation">;</span>
	<span class="token keyword">protected</span> <span class="token class-name">Expression</span> right<span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token class-name">SymbolExpression</span><span class="token punctuation">(</span><span class="token class-name">Expression</span> left<span class="token punctuation">,</span> <span class="token class-name">Expression</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>left <span class="token operator">=</span> left<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>right <span class="token operator">=</span> right<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 因为 SymbolExpression 是让其子类来实现，因此 interpreter 是一个默认实现</span>
	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">interpreter</span><span class="token punctuation">(</span><span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span> <span class="token keyword">var</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 变量的解释器</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">VarExpression</span> <span class="token keyword">extends</span> <span class="token class-name">Expression</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token class-name">String</span> key<span class="token punctuation">;</span> <span class="token comment">// key=a,key=b,key=c</span>

	<span class="token keyword">public</span> <span class="token class-name">VarExpression</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> key<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// var 就是 {a=10, b=20}</span>
	<span class="token comment">// interpreter 根据 变量名称，返回对应值</span>
	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">interpreter</span><span class="token punctuation">(</span><span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span> <span class="token keyword">var</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token keyword">var</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 加法解释器</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AddExpression</span> <span class="token keyword">extends</span> <span class="token class-name">SymbolExpression</span>  <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">AddExpression</span><span class="token punctuation">(</span><span class="token class-name">Expression</span> left<span class="token punctuation">,</span> <span class="token class-name">Expression</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> right<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 处理相加</span>
    <span class="token comment">// var 仍然是 {a=10,b=20}</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">interpreter</span><span class="token punctuation">(</span><span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span> <span class="token keyword">var</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span>left<span class="token punctuation">.</span><span class="token function">interpreter</span><span class="token punctuation">(</span><span class="token keyword">var</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token keyword">super</span><span class="token punctuation">.</span>right<span class="token punctuation">.</span><span class="token function">interpreter</span><span class="token punctuation">(</span><span class="token keyword">var</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 减法解释器</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SubExpression</span> <span class="token keyword">extends</span> <span class="token class-name">SymbolExpression</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token class-name">SubExpression</span><span class="token punctuation">(</span><span class="token class-name">Expression</span> left<span class="token punctuation">,</span> <span class="token class-name">Expression</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> right<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 求出left 和 right 表达式相减后的结果</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">interpreter</span><span class="token punctuation">(</span><span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span> <span class="token keyword">var</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span>left<span class="token punctuation">.</span><span class="token function">interpreter</span><span class="token punctuation">(</span><span class="token keyword">var</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token keyword">super</span><span class="token punctuation">.</span>right<span class="token punctuation">.</span><span class="token function">interpreter</span><span class="token punctuation">(</span><span class="token keyword">var</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>计算类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Calculator</span> <span class="token punctuation">{</span>
    <span class="token comment">// 定义表达式</span>
    <span class="token keyword">private</span> <span class="token class-name">Expression</span> expression<span class="token punctuation">;</span>
    <span class="token comment">// 构造函数传参，并解析</span>
    <span class="token keyword">public</span> <span class="token class-name">Calculator</span><span class="token punctuation">(</span><span class="token class-name">String</span> expStr<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// expStr = a+b</span>
        <span class="token comment">// 安排运算先后顺序</span>
        <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Expression</span><span class="token punctuation">></span></span> stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 表达式拆分成字符数组 </span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> charArray <span class="token operator">=</span> expStr<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [a, +, b]</span>
        <span class="token class-name">Expression</span> left <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">Expression</span> right <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token comment">// 遍历我们的字符数组，即遍历  [a, +, b]</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> charArray<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">switch</span> <span class="token punctuation">(</span>charArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">case</span> <span class="token char">'+'</span><span class="token operator">:</span>
                    <span class="token comment">// 从 stack 取出 left => "a"</span>
                    left <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
                    <span class="token comment">// 取出右表达式 "b"</span>
                    right <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VarExpression</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>charArray<span class="token punctuation">[</span><span class="token operator">++</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">// 然后根据得到 left 和 right 构建 AddExpresson 加入 stack</span>
                    stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AddExpression</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> right<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token char">'-'</span><span class="token operator">:</span>
                    left <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    right <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VarExpression</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>charArray<span class="token punctuation">[</span><span class="token operator">++</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SubExpression</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> right<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token keyword">default</span><span class="token operator">:</span> 
                    <span class="token comment">// 如果是一个 Var 就创建要给 VarExpression 对象，并 push 到 stack</span>
                    stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">VarExpression</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>charArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 当遍历完整个 charArray 数组后，stack 就得到最后 Expression</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>expression <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span> <span class="token keyword">var</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 最后将表达式 a+b 和 var = {a=10,b=20}</span>
        <span class="token comment">// 然后传递给 expression 的 interpreter 进行解释执行</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>expression<span class="token punctuation">.</span><span class="token function">interpreter</span><span class="token punctuation">(</span><span class="token keyword">var</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ClientTest</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> expStr <span class="token operator">=</span> <span class="token function">getExpStr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// a+b</span>
        <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span> <span class="token keyword">var</span> <span class="token operator">=</span> <span class="token function">getValue</span><span class="token punctuation">(</span>expStr<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// var {a=10, b=20}</span>
        <span class="token class-name">Calculator</span> calculator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Calculator</span><span class="token punctuation">(</span>expStr<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"运算结果："</span> <span class="token operator">+</span> expStr <span class="token operator">+</span> <span class="token string">"="</span> <span class="token operator">+</span> calculator<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token keyword">var</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获得表达式</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getExpStr</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"请输入表达式："</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获得值映射</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token class-name">String</span> expStr<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> ch <span class="token operator">:</span> expStr<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ch <span class="token operator">!=</span> <span class="token char">'+'</span> <span class="token operator">&amp;&amp;</span> ch <span class="token operator">!=</span> <span class="token char">'-'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>map<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"请输入"</span> <span class="token operator">+</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"的值："</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">String</span> in <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>in<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> map<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="解释器模式的注意事项和细节" tabindex="-1"><a class="header-anchor" href="#解释器模式的注意事项和细节" aria-hidden="true">#</a> 解释器模式的注意事项和细节</h2>
<p>当有一个语言需要解释执行，可将该语言中的句子表示为一个抽象语法树，就可以考虑使用解释器模式，让程序具有良好的扩展性。</p>
<p>使用解释器可能带来的问题：解释器模式会引起类膨胀、解释器模式采用递归调用方法，将会导致调试非常复杂、效率可能降低。</p>
<h2 id="解释器模式的应用场景" tabindex="-1"><a class="header-anchor" href="#解释器模式的应用场景" aria-hidden="true">#</a> 解释器模式的应用场景</h2>
<p>前面介绍了解释器模式的结构与特点，下面分析它的应用场景。</p>
<ul>
<li>当语言的文法较为简单，且执行效率不是关键问题时</li>
<li>当问题重复出现，且可以用一种简单的语言来进行表达时</li>
<li>当一个语言需要解释执行，并且语言中的句子可以表示为一个抽象语法树的时候，如 XML 文档解释</li>
</ul>
<p>注意：解释器模式在实际的软件开发中使用比较少，因为它会引起效率、性能以及维护等问题。如果碰到对表达式的解释，在 Java 中可以用 Expression4J 或 Jep 等来设计。</p>
</div></template>


