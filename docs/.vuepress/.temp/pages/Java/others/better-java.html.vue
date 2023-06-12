<template><div><h1 id="better-java" tabindex="-1"><a class="header-anchor" href="#better-java" aria-hidden="true">#</a> Better Java</h1>
<p>Java 虽作为最流行的编程语言之一，但是似乎并没有什么人很享受用它。好吧，Java 确实是这样的一门编程语言，从最近发布不久的 Java 8 开始，为了更好的使用 Java，我决定收集一些库，实践和工具等相关资料。“更好” 是主观的，所以推荐使用我所说的建议的某些部分，而不是一下子全部按照这些建议来做。请尽情添加其他意见并提交 PR。</p>
<p>这篇文章原始发布在
<a href="https://www.seancassidy.me/better-java.html" target="_blank" rel="noopener noreferrer">我的博客<ExternalLinkIcon/></a>.</p>
<p>其他语言版本： <RouterLink to="/java/others/">English</RouterLink>, <RouterLink to="/java/others/README.zh-cn.html">简体中文</RouterLink></p>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2>
<ul>
<li><a href="#style">Style（风格）</a>
<ul>
<li><a href="#structs">Structs（结构）</a>
<ul>
<li><a href="#the-builder-pattern">The Builder Pattern（构建器模式）</a></li>
<li><a href="#immutable-object-generation">Immutable Object Generation（不可变对象生成）</a></li>
</ul>
</li>
<li><a href="#exceptions">Exceptions（异常）</a></li>
<li><a href="#dependency-injection">Dependency injection（依赖注入）</a></li>
<li><a href="#avoid-nulls">Avoid Nulls（避免空值）</a></li>
<li><a href="#immutable-by-default">Immutable-by-default（默认不可变）</a></li>
<li><a href="#avoid-lots-of-util-classes">Avoid lots of Util classes（避免过多的工具类）</a></li>
<li><a href="#formatting">Formatting（格式）</a>
<ul>
<li><a href="#javadoc">Javadoc</a></li>
</ul>
</li>
<li><a href="#streams">Streams（流）</a></li>
</ul>
</li>
<li><a href="#deploying">Deploying（部署）</a>
<ul>
<li><a href="#frameworks">Frameworks（框架）</a></li>
<li><a href="#maven">Maven</a>
<ul>
<li><a href="#dependency-convergence">Dependency Convergence（依赖收敛）</a></li>
</ul>
</li>
<li><a href="#continuous-integration">Continuous Integration（持续集成）</a></li>
<li><a href="#maven-repository">Maven repository（Maven 仓库）</a></li>
<li><a href="#configuration-management">Configuration management（配置管理）</a></li>
</ul>
</li>
<li><a href="#libraries">Libraries（库）</a>
<ul>
<li><a href="#missing-features">Missing Features（缺失的特性）</a>
<ul>
<li><a href="#apache-commons">Apache Commons</a></li>
<li><a href="#guava">Guava</a></li>
<li><a href="#gson">Gson</a></li>
<li><a href="#java-tuples">Java Tuples（Java 元组）</a></li>
<li><a href="#javaslang">Javaslang</a></li>
<li><a href="#joda-time">Joda-Time</a></li>
<li><a href="#lombok">Lombok</a></li>
<li><a href="#play-framework">Play framework（Play 框架）</a></li>
<li><a href="#slf4j">SLF4J</a></li>
<li><a href="#jooq">jOOQ</a></li>
</ul>
</li>
<li><a href="#testing">Testing（测试）</a>
<ul>
<li><a href="#junit-4">jUnit 4</a></li>
<li><a href="#jmock">jMock</a></li>
<li><a href="#assertj">AssertJ</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="#tools">Tools（工具）</a>
<ul>
<li><a href="#intellij-idea">IntelliJ IDEA</a>
<ul>
<li><a href="#chronon">Chronon</a></li>
</ul>
</li>
<li><a href="#jrebel">JRebel</a></li>
<li><a href="#the-checker-framework">The Checker Framework（检查框架）</a></li>
<li><a href="#code-quality">Code Quality（代码质量）</a></li>
<li><a href="#eclipse-memory-analyzer">Eclipse Memory Analyzer（Eclipse 内存分析）</a></li>
</ul>
</li>
<li><a href="#resources">Resources（资源）</a>
<ul>
<li><a href="#books">Books（书）</a></li>
<li><a href="#podcasts">Podcasts（播客）</a></li>
<li><a href="#videos">Videos（视频）</a></li>
</ul>
</li>
</ul>
<h2 id="style" tabindex="-1"><a class="header-anchor" href="#style" aria-hidden="true">#</a> Style</h2>
<p>Java 传统的代码风格是被用来编写非常复杂的企业级 JavaBean。新的代码风格看起来会更加整洁，更加正确，并且更加简单。</p>
<h3 id="structs" tabindex="-1"><a class="header-anchor" href="#structs" aria-hidden="true">#</a> Structs</h3>
<p>对我们程序员来说，包装数据是最简单的事情之一。下面是传统的通过定义一个 JavaBean 的实现方式：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataHolder</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> data<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">DataHolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setData</span><span class="token punctuation">(</span><span class="token class-name">String</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式既繁琐又浪费代码。即使你的 IDE 可以自动生成这些代码，也是浪费。因此，<a href="http://www.javapractices.com/topic/TopicAction.do?Id=84" target="_blank" rel="noopener noreferrer">别这么干<ExternalLinkIcon/></a>.</p>
<p>相反，我更喜欢 C 语言保存数据的风格来写一个类：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataHolder</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">String</span> data<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">DataHolder</span><span class="token punctuation">(</span><span class="token class-name">String</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样不仅减少了近一半的代码行数。并且，这个类里面保存的数据除了你去继承它，否则不会改变，由于它不可变性，我们可以认为这会更加简单。</p>
<p>如果你想保存很容易修改的对象数据，像 Map 或者 List，你应该使用 ImmutableMap 或者 ImmutableList，这些会在不变性那一部分讨论。</p>
<h4 id="the-builder-pattern" tabindex="-1"><a class="header-anchor" href="#the-builder-pattern" aria-hidden="true">#</a> The Builder Pattern</h4>
<p>如果你想用这种构造的方式构造更复杂的对象，请考虑构建器模式。</p>
<p>你可以建一个静态内部类来构建你的对象。构建器构建对象的时候，对象的状态是可变的，但是一旦你调用了 build 方法之后，构建的对象就变成了不可变的了。</p>
<p>想象一下我们有一个更复杂的 <em>DataHolder</em>。那么它的构建器看起来应该是这样的：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ComplicatedDataHolder</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">String</span> data<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> num<span class="token punctuation">;</span>
    <span class="token comment">// lots more fields and a constructor</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Builder</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> data<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> num<span class="token punctuation">;</span>
        
        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">data</span><span class="token punctuation">(</span><span class="token class-name">String</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">num</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>num <span class="token operator">=</span> num<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token class-name">ComplicatedDataHolder</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ComplicatedDataHolder</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> num<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// etc</span>
        <span class="token punctuation">}</span>  
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后调用它：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">ComplicatedDataHolder</span> cdh <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ComplicatedDataHolder<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span><span class="token string">"set this"</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">num</span><span class="token punctuation">(</span><span class="token number">523</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这有<a href="http://jlordiales.me/2012/12/13/the-builder-pattern-in-practice/" target="_blank" rel="noopener noreferrer">关于构建器更好的例子<ExternalLinkIcon/></a>，他会让你感受到构建器到底是怎么回事。它没有使用许多我们尽力避免使用的样板，并且它会给你不可变的对象和非常好用的接口。</p>
<p>可以考虑下在众多的库中选择一个来帮你生成构建器，取代你亲手去写构建器的方式。</p>
<h4 id="immutable-object-generation" tabindex="-1"><a class="header-anchor" href="#immutable-object-generation" aria-hidden="true">#</a> Immutable Object Generation</h4>
<p>如果你要手动创建许多不可变对象，请考虑用注解处理器的方式从它们的接口自动生成。它使样板代码减少到最小化，减少产生 bug 的可能性，促进了对象的不可变性。看这 <a href="https://docs.google.com/presentation/d/14u_h-lMn7f1rXE1nDiLX0azS3IkgjGl5uxp5jGJ75RE/edit#slide=id.g2a5e9c4a8_00" target="_blank" rel="noopener noreferrer">presentation<ExternalLinkIcon/></a> 有常见的 Java 设计模式中一些问题的有趣的讨论。</p>
<p>一些非常棒的代码生成库如 [immutables]
(<a href="https://github.com/immutables/immutables" target="_blank" rel="noopener noreferrer">https://github.com/immutables/immutables<ExternalLinkIcon/></a>), 谷歌的
<a href="https://github.com/google/auto/tree/master/value" target="_blank" rel="noopener noreferrer">auto-value<ExternalLinkIcon/></a> 和
<a href="https://projectlombok.org/" target="_blank" rel="noopener noreferrer">Lombok<ExternalLinkIcon/></a></p>
<h3 id="exceptions" tabindex="-1"><a class="header-anchor" href="#exceptions" aria-hidden="true">#</a> Exceptions</h3>
<p>使用<a href="http://docs.oracle.com/javase/7/docs/api/java/lang/Exception.html" target="_blank" rel="noopener noreferrer">检查<ExternalLinkIcon/></a>异常的时候一定要注意，或者干脆别用。它会强制你去用 try/catch 代码块包裹住可能抛出异常的部分。比较好的方式就是使你自定义的异常继承自运行时异常来取而代之。这样，可以让你的用户使用他们喜欢的方式去处理异常，而不是每次抛出异常的时候都强制它们去处理/声明，这样会污染代码。</p>
<p>一个比较漂亮的绝招是在你的方法异常声明中声明 RuntimeExceptions。这对编译器没有影响，但是可以通过文档告诉你的用户在这里可能会有异常抛出。</p>
<h3 id="dependency-injection" tabindex="-1"><a class="header-anchor" href="#dependency-injection" aria-hidden="true">#</a> Dependency injection</h3>
<p>在软件工程领域，而不仅是在 Java 领域，使用<a href="https://en.wikipedia.org/wiki/Dependency_injection" target="_blank" rel="noopener noreferrer">依赖注入<ExternalLinkIcon/></a>是编写可测试软件最好的方法之一。
由于 Java 强烈鼓励使用面向对象的设计，所以在 Java 中为了开发可测试软件，你不得不使用依赖注入。</p>
<p>在 Java 中，通常使用<a href="http://projects.spring.io/spring-framework/" target="_blank" rel="noopener noreferrer">Spring 框架<ExternalLinkIcon/></a>来完成依赖注入。Spring 有基于代码的和基于 XML 配置文件的两种连接方式。如果你使用基于 XML 配置文件的方式，注意不要<a href="http://programmers.stackexchange.com/questions/92393/what-does-the-spring-framework-do-should-i-use-it-why-or-why-not" target="_blank" rel="noopener noreferrer">过度使用 Spring<ExternalLinkIcon/></a>，正是由于它使用的基于 XML 配置文件的格式。在 XML 配置文件中绝对不应该有逻辑或者控制结构。它应该仅仅被用来做依赖注入。</p>
<p>使用 Google 和 Square 的 <a href="http://square.github.io/dagger/" target="_blank" rel="noopener noreferrer">Dagger<ExternalLinkIcon/></a> 或者 Google 的 <a href="https://github.com/google/guice" target="_blank" rel="noopener noreferrer">Guice<ExternalLinkIcon/></a> 库是 Spring 比较好的替代品。它们不使用像 Spring 那样的 XML 配置文件的格式，相反它们把注入逻辑以注解的方式写到代码中。</p>
<h3 id="avoid-nulls" tabindex="-1"><a class="header-anchor" href="#avoid-nulls" aria-hidden="true">#</a> Avoid Nulls</h3>
<p>尽量避免使用空值。不要返回 null 的集合，你应该返回一个 empty 的集合。如果你确实准备使用 null 请考虑使用 <a href="https://github.com/google/guice/wiki/UseNullable" target="_blank" rel="noopener noreferrer">@Nullable<ExternalLinkIcon/></a> 注解。<a href="http://www.jetbrains.com/idea/" target="_blank" rel="noopener noreferrer">IntelliJ IDEA<ExternalLinkIcon/></a> 内置支持 @Nullable 注解。</p>
<p>阅读<a href="https://www.lucidchart.com/techblog/2015/08/31/the-worst-mistake-of-computer-science/" target="_blank" rel="noopener noreferrer">计算机科学领域最糟糕的错误<ExternalLinkIcon/></a>了解更多为何不使用 null。</p>
<p>如果你使用的是 Java 8，你可以用新出的优秀的 <a href="http://www.oracle.com/technetwork/articles/java/java8-optional-2175753.html" target="_blank" rel="noopener noreferrer">Optional<ExternalLinkIcon/></a> 类型。如果有一个值你不确定是否存在，你可以像这样在类中用 <em>Optional</em> 包裹住它们：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FooWidget</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> data<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Bar</span><span class="token punctuation">></span></span> bar<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">FooWidget</span><span class="token punctuation">(</span><span class="token class-name">String</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">FooWidget</span><span class="token punctuation">(</span><span class="token class-name">String</span> data<span class="token punctuation">,</span> <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Bar</span><span class="token punctuation">></span></span> bar<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>bar <span class="token operator">=</span> bar<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Bar</span><span class="token punctuation">></span></span> <span class="token function">getBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> bar<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，现在你可以清晰地知道 <em>data</em> 肯定不为 null，但是 <em>bar</em> 不清楚是不是存在。<em>Optional</em> 有如 <em>isPresent</em> 这样的方法，可以用来检查是否为 <em>null</em>，感觉和原来的方式并没有太大区别。但是它允许你可以这样写：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FooWidget</span><span class="token punctuation">></span></span> fooWidget <span class="token operator">=</span> <span class="token function">maybeGetFooWidget</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">final</span> <span class="token class-name">Baz</span> baz <span class="token operator">=</span> fooWidget<span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token class-name">FooWidget</span><span class="token operator">::</span><span class="token function">getBar</span><span class="token punctuation">)</span>
                         <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token class-name">BarWidget</span><span class="token operator">::</span><span class="token function">getBaz</span><span class="token punctuation">)</span>
                         <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span>defaultBaz<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样比写一连串的判断是否为空的检查代码更好。使用 Optional 唯一不好的是标准库对 Optional 的支持并不是很好，所以对 null 的处理仍然是必要的。</p>
<h3 id="immutable-by-default" tabindex="-1"><a class="header-anchor" href="#immutable-by-default" aria-hidden="true">#</a> Immutable-by-default</h3>
<p>变量，类和集合应该设置为不可变的，除非你有很好的理由去修改他们。</p>
<p>变量可以用 <em>final</em> 关键字使起不可变：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">FooWidget</span> fooWidget<span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">condition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fooWidget <span class="token operator">=</span> <span class="token function">getWidget</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        fooWidget <span class="token operator">=</span> cachedFooWidget<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">CachingException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"Couldn't get cached value"</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">throw</span> e<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// fooWidget is guaranteed to be set here</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在你可以确定 fooWidget 对象不会意外地被重新赋值了。<em>final</em> 关键词也可以在 if/else 和 try/catch 代码块中使用。当然，如果 <em>fooWidget</em> 对象本身不是不可变的，你可以很容易去修改它。</p>
<p>使用集合的时候，任何可能的情况下尽量使用 Guava 的 <a href="http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/collect/ImmutableMap.html" target="_blank" rel="noopener noreferrer">ImmutableMap<ExternalLinkIcon/></a>, <a href="http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/collect/ImmutableList.html" target="_blank" rel="noopener noreferrer">ImmutableList<ExternalLinkIcon/></a>, 或者
<a href="http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/collect/ImmutableSet.html" target="_blank" rel="noopener noreferrer">ImmutableSet<ExternalLinkIcon/></a> 类。这些类都有构建器，你可以很容易地动态构建集合，一旦你执行了 build 方法，集合就变成了不可变的。</p>
<p>类应该声明不可变的字段（通过 <em>final</em> 实现）和不可变的集合使该类不可变。或者，可以对类本身使用 <em>final</em> 关键词，这样这个类就不会被继承也不会被修改了。</p>
<h3 id="avoid-lots-of-util-classes" tabindex="-1"><a class="header-anchor" href="#avoid-lots-of-util-classes" aria-hidden="true">#</a> Avoid lots of Util classes</h3>
<p>如果你发现在你正在往工具类中添加很多方法，就要注意了。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MiscUtil</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">frobnicateString</span><span class="token punctuation">(</span><span class="token class-name">String</span> base<span class="token punctuation">,</span> <span class="token keyword">int</span> times<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ... etc</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">throwIfCondition</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> condition<span class="token punctuation">,</span> <span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ... etc</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>乍一看这些工具类似乎很不错，因为里面的那些方法放在别处确实都不太合适。因此，你以可重用代码的名义全放这了。</p>
<p>这个想法比本身这么做还要糟糕。请把这些类放到它应该在的地方去并积极重构。不要命名一些像 &quot;MiscUtils&quot; 或者 &quot;ExtrasLibrary&quot; 这样的很普通的类，包或者库。这会鼓励产生无关代码。</p>
<h3 id="formatting" tabindex="-1"><a class="header-anchor" href="#formatting" aria-hidden="true">#</a> Formatting</h3>
<p>格式化代码对大多数程序员来说并没有它应有的那么重要。统一化你的代码格式对阅读你的代码的人有帮助吗？当然了。但是别在为了 if 代码块匹配添加空格上耗一天。</p>
<p>如果你确实需要一个代码格式风格的教程，我高度推荐 <a href="http://google.github.io/styleguide/javaguide.html" target="_blank" rel="noopener noreferrer">Google's Java Style<ExternalLinkIcon/></a> 这个教程。写的最好的部分是 <a href="http://google.github.io/styleguide/javaguide.html#s6-programming-practices" target="_blank" rel="noopener noreferrer">Programming Practices<ExternalLinkIcon/></a>。绝对值得一读。</p>
<h4 id="javadoc" tabindex="-1"><a class="header-anchor" href="#javadoc" aria-hidden="true">#</a> Javadoc</h4>
<p>文档对对你代码的阅读着来说也很重要。这意味着你要给出<a href="http://docs.guava-libraries.googlecode.com/git-history/release/javadoc/com/google/common/collect/ImmutableMap.Builder.html" target="_blank" rel="noopener noreferrer">使用示例<ExternalLinkIcon/></a>，并且给出你的变量，方法和类清晰地描述。</p>
<p>这样做的必然结果是不要对不需要写文档的地方填写文档。如果你对一个参数的含义没什么可说的，或者它本身已经很明显是什么意思了，就不要为其写文档了。统一样板的文档比没有文档更加糟糕，这样会让读你代码的人误以为那就是文档。</p>
<h3 id="streams" tabindex="-1"><a class="header-anchor" href="#streams" aria-hidden="true">#</a> Streams</h3>
<p><a href="http://www.java8.org/" target="_blank" rel="noopener noreferrer">Java 8<ExternalLinkIcon/></a> 有很棒的 <a href="http://blog.hartveld.com/2013/03/jdk-8-33-stream-api.html" target="_blank" rel="noopener noreferrer">stream<ExternalLinkIcon/></a> and lambda 语法。你可以像这样来写代码：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> filtered <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>s <span class="token operator">-></span> s<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">"s"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>s <span class="token operator">-></span> s<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>取代这样的写法:</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> filtered <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> str <span class="token operator">:</span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">"s"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        filtered<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它让你可以写更多的流畅的代码，并且可读性更高。</p>
<h2 id="deploying" tabindex="-1"><a class="header-anchor" href="#deploying" aria-hidden="true">#</a> Deploying</h2>
<p>Java 的部署问题确实有点棘手。现如今有两种主流的方式：使用框架或者灵活性更高的内部研发的解决方案。</p>
<h3 id="frameworks" tabindex="-1"><a class="header-anchor" href="#frameworks" aria-hidden="true">#</a> Frameworks</h3>
<p>由于 Java 的部署并不容易，所以使用框架还是很有帮助的。最好的两个框架是 <a href="https://dropwizard.github.io/dropwizard/" target="_blank" rel="noopener noreferrer">Dropwizard<ExternalLinkIcon/></a> 和 <a href="http://projects.spring.io/spring-boot/" target="_blank" rel="noopener noreferrer">Spring Boot<ExternalLinkIcon/></a>。<a href="https://www.playframework.com/" target="_blank" rel="noopener noreferrer">Play 框架<ExternalLinkIcon/></a> 也可以被看作为一种部署框架。</p>
<p>这些框架都是尽力地降低你部署代码的壁垒。它们对 Java 新手或者想提高效率的人尤有帮助。单独的 JAR 包部署会比复杂的 WAR 包或者 EAR 包部署更简单一点。</p>
<p>然而，这些框架并没有你想象的那么灵活，如果你的项目的开发者选择的框架并不合适，你不得不迁移到手动配置更多的部署方案上来。</p>
<h3 id="maven" tabindex="-1"><a class="header-anchor" href="#maven" aria-hidden="true">#</a> Maven</h3>
<p><strong>不错的替代工具</strong>: <a href="http://gradle.org/" target="_blank" rel="noopener noreferrer">Gradle<ExternalLinkIcon/></a>.</p>
<p>Maven 仍然是构建，打包和测试的标准。有很多不错的替代工具，如 Gradle，但是他们同样都没有像 Maven 那样的适应性。如果你是 Maven 新手，你应该从<a href="http://books.sonatype.com/mvnex-book/reference/index.html" target="_blank" rel="noopener noreferrer">Maven 实例<ExternalLinkIcon/></a>这里开始。</p>
<p>我喜欢用一个根 POM（Project Object Model，项目对象模型）来管理所有用到的外部依赖。它会像<a href="https://gist.github.com/cxxr/10787344" target="_blank" rel="noopener noreferrer">这个样子<ExternalLinkIcon/></a>。这个根 POM 仅仅包含一个外部依赖，但是如果你的产品足够大，你将会有几十个外部依赖了。你的根 POM 应该像其他 Java 项目一样采用版本控制和发布的方式，有一个自己的项目。</p>
<p>如果你认为你的根 POM 每添加一个外部依赖都打上一个标签很麻烦，那你肯定没有遇到过为了排查依赖错误引起的问题，浪费一周的时间翻遍整个项目的情况。</p>
<p>你所有的 Maven 项目都应该包含你的根 POM，以及这些项目的所有版本信息。这样你会清除地了解到你们公司选择的每一个外部依赖的版本，以及所有正确的 Maven 插件。如果你要引入很多的外部依赖，它将会是这样子的：</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.third.party<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>some-artifact<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你想使用内部依赖，它应该被每一个单独项目的 <strong><dependencyManagement></strong> 部分来管理。否则那将会很难保持根 POM 的版本号是正常的。</p>
<h4 id="dependency-convergence" tabindex="-1"><a class="header-anchor" href="#dependency-convergence" aria-hidden="true">#</a> Dependency Convergence</h4>
<p>Java 最好的一方面就是拥有大量的第三方库可以做任何事。基本上每一个 API 或者工具包都有一个 Java SDK，可以很方便的用 Maven 引入。</p>
<p>并且这些第三方 Java 库本身依赖特定版本的其他的库。如果你引入足够多的库，你会发现有些库的版本是冲突的，像这样：</p>
<pre><code>Foo library depends on Bar library v1.0
Widget library depends on Bar library v0.9
</code></pre>
<p>你的项目到底要引入哪一个版本呢？</p>
<p>如果你的项目依赖于不同版本的同一个库，使用 <a href="https://maven.apache.org/enforcer/enforcer-rules/dependencyConvergence.html" target="_blank" rel="noopener noreferrer">Maven 依赖趋同插件<ExternalLinkIcon/></a>构建时将会报错。然后你有两个方案来解决这个冲突：</p>
<ol>
<li>在你的 <em>dependencyManagement</em> 部分明确地支出你所使用的 Bar 的版本号</li>
<li>在 FOO 或者 Widget 中排除对 Bar 的依赖。</li>
</ol>
<p>这两个方案到底选哪一个要看你面对的是什么情况：如果你想跟踪一个项目的版本，那么选择排除的方案是不错的。另一方面，如果你想明确地指出它，你可以选择一个版本，尽管你在需要更新其他依赖的时候也需要更新它。</p>
<h3 id="continuous-integration" tabindex="-1"><a class="header-anchor" href="#continuous-integration" aria-hidden="true">#</a> Continuous Integration</h3>
<p>很明显，你需要某种形式的持续集成服务器来帮你不断构建你的快照版本和基于 git 标签构建。</p>
<p><a href="http://jenkins-ci.org/" target="_blank" rel="noopener noreferrer">Jenkins<ExternalLinkIcon/></a> 和 <a href="https://travis-ci.org/" target="_blank" rel="noopener noreferrer">Travis-CI<ExternalLinkIcon/></a> 就成了很自然的选择.</p>
<p>代码覆盖率非常有用，<a href="http://cobertura.github.io/cobertura/" target="_blank" rel="noopener noreferrer">Cobertura<ExternalLinkIcon/></a> 就有 <a href="http://mojo.codehaus.org/cobertura-maven-plugin/usage.html" target="_blank" rel="noopener noreferrer">一个很好的 Maven 插件<ExternalLinkIcon/></a>
<a href="http://mojo.codehaus.org/cobertura-maven-plugin/usage.html" target="_blank" rel="noopener noreferrer">a good Maven plugin<ExternalLinkIcon/></a> 并且支持 CI。还有一些其他的支持 Java 的代码覆盖率工具，但是我只用过 Cobertura。</p>
<h3 id="maven-repository" tabindex="-1"><a class="header-anchor" href="#maven-repository" aria-hidden="true">#</a> Maven repository</h3>
<p>你需要一个地方存储你生成的 JAR 包，WAR 包或者 EAR 包，因此，你需要一个仓库。</p>
<p>一般选择有 <a href="http://www.jfrog.com/" target="_blank" rel="noopener noreferrer">Artifactory<ExternalLinkIcon/></a> 和 <a href="http://www.sonatype.com/nexus" target="_blank" rel="noopener noreferrer">Nexus<ExternalLinkIcon/></a> 这两个。它们都可以用，但是它们都有着各自的优缺点。</p>
<p>你应该有自己的 Artifactory/Nexus 设备和<a href="http://www.jfrog.com/confluence/display/RTF/Configuring+Artifacts+Resolution" target="_blank" rel="noopener noreferrer">镜像<ExternalLinkIcon/></a> 使你的依赖基于此。这样就不会由于上游的 Maven 库宕机而使你的构建崩溃了。</p>
<h3 id="configuration-management" tabindex="-1"><a class="header-anchor" href="#configuration-management" aria-hidden="true">#</a> Configuration management</h3>
<p>现在，你的代码已经编译完了，你的仓库也跑起来了，最终你需要把你的代码从开发环境部署到生产环境了。到了这里，千万不要吝啬，因为将来很长一段时间，你会从这些自动化方式中尝到很多的甜头。</p>
<p><a href="https://www.chef.io/chef/" target="_blank" rel="noopener noreferrer">Chef<ExternalLinkIcon/></a>，<a href="https://puppetlabs.com/" target="_blank" rel="noopener noreferrer">Puppet<ExternalLinkIcon/></a>，和 <a href="http://www.ansible.com/home" target="_blank" rel="noopener noreferrer">Ansible<ExternalLinkIcon/></a> 是很典型的选择。我曾经也写了一个叫 <a href="http://www.gosquadron.com" target="_blank" rel="noopener noreferrer">Squadron<ExternalLinkIcon/></a> 的也可供选择，当然，我认为你应该仔细看看这个，因为它使用起来比其他的更为简单方便。</p>
<p>无论你选择了什么工具，不要忘了使你的部署实现自动化。</p>
<h2 id="libraries" tabindex="-1"><a class="header-anchor" href="#libraries" aria-hidden="true">#</a> Libraries</h2>
<p>对 Java 来说，拥有大量的扩展库也许是最大的特点了。下面这些一小部分的扩展库对大部分人来说很适用的。</p>
<h3 id="missing-features" tabindex="-1"><a class="header-anchor" href="#missing-features" aria-hidden="true">#</a> Missing Features</h3>
<p>Java 标准库曾经作出过惊人的改进，但是现在来看，它仍然缺少一些关键的特性。</p>
<h4 id="apache-commons" tabindex="-1"><a class="header-anchor" href="#apache-commons" aria-hidden="true">#</a> Apache Commons</h4>
<p><a href="http://commons.apache.org/" target="_blank" rel="noopener noreferrer">Apache Commons 项目<ExternalLinkIcon/></a> 拥有大量的有用的扩展库。</p>
<p><strong>Commons Codec</strong> 对 Base64 和 16 进制字符串来说有很多有用的编/解码方法。不要再浪费时间重写这些东西了。</p>
<p><strong>Commons Lang</strong> 有许多关于字符串的操作和创建，字符集和许多各种各样的实用的方法。</p>
<p><strong>Commons IO</strong> 拥有所有你能想到的关于文件操作的方法。有
<a href="http://commons.apache.org/proper/commons-io/javadocs/api-release/org/apache/commons/io/FileUtils.html#copyDirectory(java.io.File,%20java.io.File)" target="_blank" rel="noopener noreferrer">FileUtils.copyDirectory<ExternalLinkIcon/></a>，<a href="http://commons.apache.org/proper/commons-io/javadocs/api-release/org/apache/commons/io/FileUtils.html#writeStringToFile(java.io.File,%20java.lang.String)" target="_blank" rel="noopener noreferrer">FileUtils.writeStringToFile<ExternalLinkIcon/></a>，<a href="http://commons.apache.org/proper/commons-io/javadocs/api-release/org/apache/commons/io/IOUtils.html#readLines(java.io.InputStream)" target="_blank" rel="noopener noreferrer">IOUtils.readLines<ExternalLinkIcon/></a> 和更多实用的方法。</p>
<h4 id="guava" tabindex="-1"><a class="header-anchor" href="#guava" aria-hidden="true">#</a> Guava</h4>
<p><a href="https://github.com/google/guava" target="_blank" rel="noopener noreferrer">Guava<ExternalLinkIcon/></a> 是谷歌优秀的对 Java 标准库缺少的特性进行补充的扩展库。虽然这很难提炼总结出我有多喜欢这个库，但是我会尽力的。</p>
<p><strong>Cache</strong> 让你可以用很简单的方法，实现把网络访问，磁盘访问，缓存函数或者其他任何你想要缓存的内容，缓存到内存当中。你仅仅只需要实现 <a href="http://docs.guava-libraries.googlecode.com/git-history/release/javadoc/com/google/common/cache/CacheBuilder.html" target="_blank" rel="noopener noreferrer">CacheBuilder<ExternalLinkIcon/></a> 类并且告诉 Guava 怎么样构建你的缓存，一切就搞定了！</p>
<p><strong>Immutable</strong> 集合。它有许多如：<a href="http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/collect/ImmutableMap.html" target="_blank" rel="noopener noreferrer">ImmutableMap<ExternalLinkIcon/></a>，<a href="http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/collect/ImmutableList.html" target="_blank" rel="noopener noreferrer">ImmutableList<ExternalLinkIcon/></a>，或者甚至 <a href="http://docs.guava-libraries.googlecode.com/git-history/release/javadoc/com/google/common/collect/ImmutableSortedMultiset.html" target="_blank" rel="noopener noreferrer">ImmutableSortedMultiSet<ExternalLinkIcon/></a> 等不可变集合可以使用，如果你喜欢用这种风格的话。</p>
<p>我也喜欢用 Guava 的方式来写一些可变的集合：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// Instead of</span>
<span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Widget</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// You can use</span>
<span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Widget</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token class-name">Maps</span><span class="token punctuation">.</span><span class="token function">newHashMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它还有一些静态类如 <a href="http://docs.guava-libraries.googlecode.com/git-history/release/javadoc/com/google/common/collect/Lists.html" target="_blank" rel="noopener noreferrer">Lists<ExternalLinkIcon/></a>，<a href="http://docs.guava-libraries.googlecode.com/git-history/release/javadoc/com/google/common/collect/Maps.html" target="_blank" rel="noopener noreferrer">Maps<ExternalLinkIcon/></a>和<a href="http://docs.guava-libraries.googlecode.com/git-history/release/javadoc/com/google/common/collect/Sets.html" target="_blank" rel="noopener noreferrer">Sets<ExternalLinkIcon/></a> 等。使用起来它们显得更整洁，并且可读性更强。</p>
<p>如果你坚持使用 Java 6 或者 7 的话，你可以使用 <a href="http://docs.guava-libraries.googlecode.com/git-history/release/javadoc/com/google/common/collect/Collections2.html" target="_blank" rel="noopener noreferrer">Collections2<ExternalLinkIcon/></a> 这个类，它有一些像 filter 和 transform 这样的方法。能够让你没有 Java 8 的 Stream 的支持也能写出流畅的代码。</p>
<p>Guava 也可以做一些很简单的事情，比如 <strong>Joiner</strong> 类可以用来用分隔符把字符串拼接起来，并且可以用忽略的方式<a href="http://docs.guava-libraries.googlecode.com/git-history/release/javadoc/com/google/common/util/concurrent/Uninterruptibles.html" target="_blank" rel="noopener noreferrer">来处理打断程序<ExternalLinkIcon/></a>的数据。</p>
<h4 id="gson" tabindex="-1"><a class="header-anchor" href="#gson" aria-hidden="true">#</a> Gson</h4>
<p>谷歌的 <a href="https://github.com/google/gson" target="_blank" rel="noopener noreferrer">Gson<ExternalLinkIcon/></a> 库是一个简单快速的 JSON 解析库。可以这样用：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">Gson</span> gson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">final</span> <span class="token class-name">String</span> json <span class="token operator">=</span> gson<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>fooWidget<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">final</span> <span class="token class-name">FooWidget</span> newFooWidget <span class="token operator">=</span> gson<span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token class-name">FooWidget</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这用起来真的很简单，很愉悦。<a href="https://sites.google.com/site/gson/gson-user-guide" target="_blank" rel="noopener noreferrer">Gson 用户手册<ExternalLinkIcon/></a> 有很多的使用示例。</p>
<h4 id="java-tuples" tabindex="-1"><a class="header-anchor" href="#java-tuples" aria-hidden="true">#</a> Java Tuples</h4>
<p>Java 令我比较烦恼的问题之一 Java 标准库中没有内置对元组的支持。幸运的是，<a href="http://www.javatuples.org/" target="_blank" rel="noopener noreferrer">Java tuples<ExternalLinkIcon/></a> 项目解决了这个问题。</p>
<p>它使用用起来很简单，很棒：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">Pair</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// something...</span>
    <span class="token keyword">return</span> <span class="token class-name">Pair</span><span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span>stringResult<span class="token punctuation">,</span> intResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="javaslang" tabindex="-1"><a class="header-anchor" href="#javaslang" aria-hidden="true">#</a> Javaslang</h4>
<p><a href="http://javaslang.com/" target="_blank" rel="noopener noreferrer">Javaslang<ExternalLinkIcon/></a> 是一个函数式编程库，它被设计用来弥补本应该出现在 Java 8 中但缺失的一些特性。它有这样的一些特点：</p>
<ul>
<li>一个全新函数式集合库</li>
<li>紧密集成的元组功能</li>
<li>模式匹配</li>
<li>通过不可变性保证线程安全</li>
<li>饥汉式和懒汉式的数据类型</li>
<li>通过 Option 实现了 null 的安全性</li>
<li>通过 Try 更好的实现异常处理</li>
</ul>
<p>有一些 Java 库依赖于原始的 Java 集合类。它们通过以面向对象和被设计为可变的方式来保证和其他的类的兼容性。而 Javaslang 的集合的设计灵感来源于  Haskell, Clojure 和 Scala，是一个全新的飞跃。它们被设计为函数式风格并且遵循不可变性的设计风格。</p>
<p>像下面这样的代码就可以自动实现线程安全，并且不用 try-catch 语句处理异常：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// Success/Failure containing the result/exception</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Try</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> <span class="token function">getUser</span><span class="token punctuation">(</span><span class="token keyword">int</span> userId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Try</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token constant">DB</span><span class="token punctuation">.</span><span class="token function">findUser</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">recover</span><span class="token punctuation">(</span>x <span class="token operator">-></span> <span class="token class-name">Match</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">whenType</span><span class="token punctuation">(</span><span class="token class-name">RemoteException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>e <span class="token operator">-></span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">whenType</span><span class="token punctuation">(</span><span class="token class-name">SQLException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>e <span class="token operator">-></span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Thread-safe, reusable collections</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">sayByeBye</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">"bye, "</span>bye<span class="token string">", "</span>collect<span class="token string">", "</span>mania"<span class="token punctuation">)</span>
               <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">toUpperCase</span><span class="token punctuation">)</span>
               <span class="token punctuation">.</span><span class="token function">intersperse</span><span class="token punctuation">(</span><span class="token string">" "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="joda-time" tabindex="-1"><a class="header-anchor" href="#joda-time" aria-hidden="true">#</a> Joda-Time</h4>
<p><a href="http://www.joda.org/joda-time/" target="_blank" rel="noopener noreferrer">Joda-Time<ExternalLinkIcon/></a> 是我用过的最简单的时间处理库。简单，直接，并且很容易测试。夫复何求？</p>
<p>因为 Java 8 已经有了自己的新的 <a href="http://www.oracle.com/technetwork/articles/java/jf14-date-time-2125367.html" target="_blank" rel="noopener noreferrer">时间处理<ExternalLinkIcon/></a>库， 所以如果你还没有用 Java 8，你需要这一个库足矣。</p>
<h4 id="lombok" tabindex="-1"><a class="header-anchor" href="#lombok" aria-hidden="true">#</a> Lombok</h4>
<p><a href="https://projectlombok.org/" target="_blank" rel="noopener noreferrer">Lombok<ExternalLinkIcon/></a> 是一个很有意思的库。它可以让你以注解的方式减少 Java 中糟糕的样板代码。</p>
<p>想为你的类的变量添加 setter 和 getter 方法吗？像这样：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Getter</span> <span class="token annotation punctuation">@Setter</span> <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token keyword">var</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在你就可以这么用了：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">Foo</span> foo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
foo<span class="token punctuation">.</span><span class="token function">setVar</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这还有<a href="http://jnb.ociweb.com/jnb/jnbJan2010.html" target="_blank" rel="noopener noreferrer">很多<ExternalLinkIcon/></a>例子。我在之前的产品中还没有用过 Lombok，但是现在我等不急了。</p>
<h4 id="play-framework" tabindex="-1"><a class="header-anchor" href="#play-framework" aria-hidden="true">#</a> Play framework</h4>
<p><strong>好的替代品</strong>: <a href="https://jersey.java.net/" target="_blank" rel="noopener noreferrer">Jersey<ExternalLinkIcon/></a> 或者 <a href="http://sparkjava.com/" target="_blank" rel="noopener noreferrer">Spark<ExternalLinkIcon/></a></p>
<p>在 Java 实现 RESTful web services 有两大主要阵营：<a href="https://en.wikipedia.org/wiki/Java_API_for_RESTful_Web_Services" target="_blank" rel="noopener noreferrer">JAX-RS<ExternalLinkIcon/></a> 和其他。</p>
<p>JAX-RS 是传统的实现方式。你可以用像 <a href="https://jersey.java.net/" target="_blank" rel="noopener noreferrer">Jersey<ExternalLinkIcon/></a> 这样的框架，以注解的方式来实现接口及其实现的结合。这样你就可以很容易的根据接口类来开发客户端。</p>
<p><a href="https://www.playframework.com/" target="_blank" rel="noopener noreferrer">Play 框架<ExternalLinkIcon/></a> 基于 JVM 的 web services 实现和其他根本框架不同：它有一个路由文件，你写的类要和路由文件中的路由信息关联起来。Play 框架其实是一个<a href="https://www.playframework.com/documentation/2.3.x/Anatomy" target="_blank" rel="noopener noreferrer">完整的 MVC 框架<ExternalLinkIcon/></a>，但是你可以很简单地仅仅使用它的 REST web services 部分的功能。</p>
<p>它同时支持 Java 和 Scala。虽然对重点支持的 Scala 稍有不足，但是对 Java 的支持还是很好用的。</p>
<p>如果你在 Python 中用过像 Flask 这样的微框架，你对 <a href="http://sparkjava.com/" target="_blank" rel="noopener noreferrer">Spark<ExternalLinkIcon/></a> 肯定会很熟悉。它对 Java 8 的支持尤其的好。</p>
<h4 id="slf4j" tabindex="-1"><a class="header-anchor" href="#slf4j" aria-hidden="true">#</a> SLF4J</h4>
<p>有很多 Java 日志解决方案。我最喜欢的是 <a href="http://www.slf4j.org/" target="_blank" rel="noopener noreferrer">SLF4J<ExternalLinkIcon/></a>，因为它拥有非常棒的可插拔性，同时能够和很多的日志框架想结合。有没有做过同时使用 java.util.logging，JCL，和 log4j 的奇葩项目？SLF4J 就是为你而生。</p>
<p>这<a href="http://www.slf4j.org/manual.html" target="_blank" rel="noopener noreferrer">两页手册<ExternalLinkIcon/></a>足够你可以开始入门使用 SLF4J 了。</p>
<h4 id="jooq" tabindex="-1"><a class="header-anchor" href="#jooq" aria-hidden="true">#</a> jOOQ</h4>
<p>我不喜欢重量级的 ORM 框架，因为我喜欢 SQL。所以我写了很多 <a href="http://docs.spring.io/spring/docs/4.0.3.RELEASE/javadoc-api/org/springframework/jdbc/core/JdbcTemplate.html" target="_blank" rel="noopener noreferrer">JDBC 模板<ExternalLinkIcon/></a>，但是很难去维护它。<a href="http://www.jooq.org/" target="_blank" rel="noopener noreferrer">jOOQ<ExternalLinkIcon/></a> 是一个更好的解决方案。</p>
<p>它让你在 Java 中用类型安全的方式编写 SQL：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// Typesafely execute the SQL statement directly with jOOQ</span>
<span class="token class-name">Result</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Record3</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span><span class="token punctuation">></span></span> result <span class="token operator">=</span> 
create<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token constant">BOOK</span><span class="token punctuation">.</span><span class="token constant">TITLE</span><span class="token punctuation">,</span> <span class="token constant">AUTHOR</span><span class="token punctuation">.</span><span class="token constant">FIRST_NAME</span><span class="token punctuation">,</span> <span class="token constant">AUTHOR</span><span class="token punctuation">.</span><span class="token constant">LAST_NAME</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token constant">BOOK</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token constant">AUTHOR</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token constant">BOOK</span><span class="token punctuation">.</span><span class="token constant">AUTHOR_ID</span><span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span><span class="token constant">AUTHOR</span><span class="token punctuation">.</span><span class="token constant">ID</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token constant">BOOK</span><span class="token punctuation">.</span><span class="token constant">PUBLISHED_IN</span><span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span><span class="token number">1948</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 jOOQ 和 <a href="http://www.javapractices.com/topic/TopicAction.do?Id=66" target="_blank" rel="noopener noreferrer">DAO<ExternalLinkIcon/></a> 的模式让你的数据库访问变得轻而易举。</p>
<h3 id="testing" tabindex="-1"><a class="header-anchor" href="#testing" aria-hidden="true">#</a> Testing</h3>
<p>测试是软件的关键环节。下面这些软件包能够让你更容易地测试。</p>
<h4 id="junit-4" tabindex="-1"><a class="header-anchor" href="#junit-4" aria-hidden="true">#</a> jUnit 4</h4>
<p><strong>好的替代品</strong>：<a href="http://testng.org" target="_blank" rel="noopener noreferrer">TestNG<ExternalLinkIcon/></a>.</p>
<p><a href="http://junit.org/" target="_blank" rel="noopener noreferrer">jUnit<ExternalLinkIcon/></a> 就无需多言了。它是 Java 单元测试中的标准工具。</p>
<p>但是很可能你使用的 jUnit 并没有发挥它的全部潜力。jUnit 支持<a href="https://github.com/junit-team/junit/wiki/Parameterized-tests" target="_blank" rel="noopener noreferrer">参数化测试<ExternalLinkIcon/></a>，<a href="https://github.com/junit-team/junit/wiki/Rules" target="_blank" rel="noopener noreferrer">规则化<ExternalLinkIcon/></a>测试，<a href="https://github.com/junit-team/junit/wiki/Theories" target="_blank" rel="noopener noreferrer">theories<ExternalLinkIcon/></a> 可以随机测试特定代码，还有 <a href="https://github.com/junit-team/junit/wiki/Assumptions-with-assume" target="_blank" rel="noopener noreferrer">assumptions<ExternalLinkIcon/></a>，可以让你少写很多样板代码。</p>
<h4 id="jmock" tabindex="-1"><a class="header-anchor" href="#jmock" aria-hidden="true">#</a> jMock</h4>
<p>如果你完成了依赖注入，这是它的回报：可以 mock 出有副作用（比如和 REST 服务器交互）的代码，并且可以断言调用这段代码的行为。</p>
<p><a href="http://www.jmock.org/" target="_blank" rel="noopener noreferrer">jMock<ExternalLinkIcon/></a> 是标准的 Java mock 工具。像这样使用：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FooWidgetTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Mockery</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Mockery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">basicTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">FooWidgetDependency</span> dep <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">FooWidgetDependency</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        context<span class="token punctuation">.</span><span class="token function">checking</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Expectations</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>
            <span class="token function">oneOf</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">atLeast</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">optionalCall</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">final</span> <span class="token class-name">FooWidget</span> foo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FooWidget</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span><span class="token function">doThing</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        context<span class="token punctuation">.</span><span class="token function">assertIsSatisfied</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码通过 jMock 建立了一个 <em>FooWidgetDependency</em>，然后添加你所期望结果的条件。我们期望 <em>dep</em> 的 <em>call</em> 方法会被以一个字符串为参数的形式调用，并且会被调用 0 次或者多次。</p>
<p>如果你想一遍又一遍地设置相同的依赖，你应该把它放到 <a href="https://github.com/junit-team/junit/wiki/Test-fixtures" target="_blank" rel="noopener noreferrer">test fixture<ExternalLinkIcon/></a> 中，并且把<em>assertIsSatisfied</em> 放在以 <em>@After</em> 注解的 fixture 中。</p>
<h4 id="assertj" tabindex="-1"><a class="header-anchor" href="#assertj" aria-hidden="true">#</a> AssertJ</h4>
<p>你曾经用 jUnit 干过这个吗？</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> result <span class="token operator">=</span> some<span class="token punctuation">.</span><span class="token function">testMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> result<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">"some result"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">"some other result"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">"shouldn't be here"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是很恶心的样板代码。<a href="http://joel-costigliola.github.io/assertj/index.html" target="_blank" rel="noopener noreferrer">AssertJ<ExternalLinkIcon/></a> 可以解决这个问题。你可以把相同的代码转换成这个样子：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>some<span class="token punctuation">.</span><span class="token function">testMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasSize</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
                             <span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">"some result"</span><span class="token punctuation">,</span> <span class="token string">"some other result"</span><span class="token punctuation">)</span>
                             <span class="token punctuation">.</span><span class="token function">doesNotContain</span><span class="token punctuation">(</span><span class="token string">"shouldn't be here"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样的流畅接口让你的测试更具有可读性。你还想咋地？</p>
<h2 id="tools" tabindex="-1"><a class="header-anchor" href="#tools" aria-hidden="true">#</a> Tools</h2>
<h3 id="intellij-idea" tabindex="-1"><a class="header-anchor" href="#intellij-idea" aria-hidden="true">#</a> IntelliJ IDEA</h3>
<p><strong>好的替代品</strong>: <a href="https://www.eclipse.org/" target="_blank" rel="noopener noreferrer">Eclipse<ExternalLinkIcon/></a> 和 <a href="https://netbeans.org/" target="_blank" rel="noopener noreferrer">Netbeans<ExternalLinkIcon/></a></p>
<p>Java 最好的 IDE 是 <a href="http://www.jetbrains.com/idea/" target="_blank" rel="noopener noreferrer">IntelliJ IDEA<ExternalLinkIcon/></a>。它有大量的牛逼的特性，它是真正的能让 Java 用来像不戴套做爱那么爽的工具。自动完成功能超棒，<a href="http://i.imgur.com/92ztcCd.png" target="_blank" rel="noopener noreferrer">代码检查功能也是顶尖的<ExternalLinkIcon/></a>，重构工具那是相当有帮助。</p>
<p>免费的社区版对我来说已经足够好了，但是它的旗舰版加载了更多的牛逼的特性，如数据库工具，Spring 框架的支持和对 Chronon 的支持。</p>
<h4 id="chronon" tabindex="-1"><a class="header-anchor" href="#chronon" aria-hidden="true">#</a> Chronon</h4>
<p>我最喜欢 GDB 7 的特性之一就是调试的时候能够按照时间跟踪回来。当你拥有了旗舰版的 IntelliJ，你可以通过安装 <a href="http://blog.jetbrains.com/idea/2014/03/try-chronon-debugger-with-intellij-idea-13-1-eap/" target="_blank" rel="noopener noreferrer">Chronon IntelliJ 插件<ExternalLinkIcon/></a>实现。</p>
<p>你可以获取到变量的变化历史，后退，方法的历史以及更多的信息。如果你是第一次用会觉得有点怪，但是它真的能够帮你解决很复杂的 bug，诸如海森堡类的 bug。</p>
<h3 id="jrebel" tabindex="-1"><a class="header-anchor" href="#jrebel" aria-hidden="true">#</a> JRebel</h3>
<p><strong>好的替代品</strong>: <a href="https://github.com/dcevm/dcevm" target="_blank" rel="noopener noreferrer">DCEVM<ExternalLinkIcon/></a></p>
<p>持续集成往往以软件即服务为产品目标。想象一下如果你不用等待代码构建完成而能实时看到代码的变化会是怎样？</p>
<p>这就是 <a href="http://zeroturnaround.com/software/jrebel/" target="_blank" rel="noopener noreferrer">JRebel<ExternalLinkIcon/></a> 所做的。一旦你将你的服务器和你的 JReble 以 hook 方式连接，你就可以从服务器看到实时变化。当你想快速试验的时候它能为你节省大量的时间。</p>
<h3 id="the-checker-framework" tabindex="-1"><a class="header-anchor" href="#the-checker-framework" aria-hidden="true">#</a> The Checker Framework</h3>
<p>Java 的类型系统很差劲。它不能够区分正常的字符串和正则表达式字符串，更不用说<a href="https://en.wikipedia.org/wiki/Taint_checking" target="_blank" rel="noopener noreferrer">坏点检查<ExternalLinkIcon/></a>了。不过 <a href="http://types.cs.washington.edu/checker-framework/" target="_blank" rel="noopener noreferrer">Checker Framework<ExternalLinkIcon/></a> 可以完成这个功能并且能够实现更多的东西。</p>
<p>它使用像 <em>@Nullable</em> 这样的注解来检查类型。你甚至可以使用<a href="http://types.cs.washington.edu/checker-framework/tutorial/webpages/encryption-checker-cmd.html" target="_blank" rel="noopener noreferrer">自定义注解<ExternalLinkIcon/></a>来实现静态分析，甚至更强大的功能。</p>
<h3 id="code-quality" tabindex="-1"><a class="header-anchor" href="#code-quality" aria-hidden="true">#</a> Code Quality</h3>
<p>即使遵循着最佳实践的原则，即使是最好的开发者，也都会犯错误。这有很多工具，你可以使用它们验证你的代码从而检查代码是否有问题。下面是选出的最流行的一部分工具。很多这些工具都可以和流行的 IDE 如 Eclipse 或者 IntelliJ 集成，可以让你更快地发现代码中的错误。</p>
<ul>
<li><strong><a href="http://checkstyle.sourceforge.net/" title="Checkstyle" target="_blank" rel="noopener noreferrer">Checkstyle<ExternalLinkIcon/></a></strong>：一个静态代码分析工具，它主要着力于保证你的代码符合代码标准。检查规则在一个 XML 文件中定义，你可以把它检入你的版本控制工具，和你的代码放在一起。</li>
<li><strong><a href="http://findbugs.sourceforge.net/" title="FindBugs" target="_blank" rel="noopener noreferrer">FindBugs<ExternalLinkIcon/></a></strong>：主要集中于发现你的代码中可能导致产生 bug 或者错误的部分。虽然作为独立的进程运行，但是对流行的 IDE 和构建工具的支持也很好。</li>
<li><strong><a href="https://pmd.github.io/" title="PMD" target="_blank" rel="noopener noreferrer">PMD<ExternalLinkIcon/></a></strong>：和 FindBugs 很相似，PMD 着力于发现你代码中的错误和整理的你的代码。你可以把针对你的代码的检查规则控制在 XML 文件中，和你的代码放在一块儿提交。</li>
<li><strong><a href="http://www.sonarqube.org/" title="SonarQube" target="_blank" rel="noopener noreferrer">SonarQube<ExternalLinkIcon/></a></strong>：和前面所述的工具不同，它是在本地运行的，SonarQube 启动一个服务器，你把你代码提交到这个服务器来进行分析。它提供了 web 界面，你可以看到你的代码的健康状况信息，如不好的做法，潜在的 bug，测试覆盖率百分比，和你写代码的<a href="https://en.wikipedia.org/wiki/Technical_debt" title="Technical Debt on Wikipedia" target="_blank" rel="noopener noreferrer">技术水平<ExternalLinkIcon/></a></li>
</ul>
<p>除了在开发工程中使用这些工具，把它们用在你的构建阶段往往也是一个不错的想法。它可以和想 Maven 或者 Gradle 这样的构建工具绑定到一起，也可以和持续集成工具绑定使用。</p>
<h3 id="eclipse-memory-analyzer" tabindex="-1"><a class="header-anchor" href="#eclipse-memory-analyzer" aria-hidden="true">#</a> Eclipse Memory Analyzer</h3>
<p>即使在 Java 中内存泄露也时有发生。幸运的是，我们有一些工具就是为此而生。<a href="http://www.eclipse.org/mat/" target="_blank" rel="noopener noreferrer">Eclipse Memory Analyzer<ExternalLinkIcon/></a> 是我用过的最好用的解决内存泄露问题的工具。它能够获取到堆栈信息让你查阅，去发现问题所在。</p>
<p>有几种方法可以获取到 JVM 进程的堆栈信息，但是我用 <a href="http://docs.oracle.com/javase/7/docs/technotes/tools/share/jmap.html" target="_blank" rel="noopener noreferrer">jmap<ExternalLinkIcon/></a> 工具实现：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ jmap -dump:live,format<span class="token operator">=</span>b,file<span class="token operator">=</span>heapdump.hprof <span class="token parameter variable">-F</span> <span class="token number">8152</span>
Attaching to process ID <span class="token number">8152</span>, please wait<span class="token punctuation">..</span>.
Debugger attached successfully.
Server compiler detected.
JVM version is <span class="token number">23.25</span>-b01
Dumping heap to heapdump.hprof <span class="token punctuation">..</span>.
<span class="token punctuation">..</span>. snip <span class="token punctuation">..</span>.
Heap dump <span class="token function">file</span> created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后你可以用内存分析器打开 <em>heapdump.hprof</em> 文件，快看看到底是怎么回事。</p>
<h2 id="resources" tabindex="-1"><a class="header-anchor" href="#resources" aria-hidden="true">#</a> Resources</h2>
<p>这些资源能够帮你成为 Java 大牛。</p>
<h3 id="books" tabindex="-1"><a class="header-anchor" href="#books" aria-hidden="true">#</a> Books</h3>
<ul>
<li><a href="http://www.amazon.com/Effective-Java-Edition-Joshua-Bloch/dp/0321356683" target="_blank" rel="noopener noreferrer">Effective Java<ExternalLinkIcon/></a></li>
<li><a href="http://www.amazon.com/Java-Concurrency-Practice-Brian-Goetz/dp/0321349601" target="_blank" rel="noopener noreferrer">Java Concurrency in Practice<ExternalLinkIcon/></a></li>
<li><a href="http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/" target="_blank" rel="noopener noreferrer">Clean Code<ExternalLinkIcon/></a></li>
</ul>
<h3 id="podcasts" tabindex="-1"><a class="header-anchor" href="#podcasts" aria-hidden="true">#</a> Podcasts</h3>
<ul>
<li><a href="http://www.javaposse.com/" target="_blank" rel="noopener noreferrer">The Java Posse<ExternalLinkIcon/></a> (<em>discontinued</em>)</li>
<li><a href="http://virtualjug.com/" target="_blank" rel="noopener noreferrer">vJUG<ExternalLinkIcon/></a></li>
<li><a href="https://lescastcodeurs.com/" target="_blank" rel="noopener noreferrer">Les Cast Codeurs<ExternalLinkIcon/></a> (<em>French</em>)</li>
<li><a href="http://www.javapubhouse.com/" target="_blank" rel="noopener noreferrer">Java Pub House<ExternalLinkIcon/></a></li>
<li><a href="http://www.javaoffheap.com/" target="_blank" rel="noopener noreferrer">Java Off Heap<ExternalLinkIcon/></a></li>
<li><a href="http://www.enterprisejavanews.com" target="_blank" rel="noopener noreferrer">Enterprise Java Newscast<ExternalLinkIcon/></a></li>
</ul>
<h3 id="videos" tabindex="-1"><a class="header-anchor" href="#videos" aria-hidden="true">#</a> Videos</h3>
<ul>
<li><a href="https://www.youtube.com/watch?v=V1vQf4qyMXg" target="_blank" rel="noopener noreferrer">Effective Java - Still Effective After All These Years<ExternalLinkIcon/></a></li>
<li><a href="http://www.infoq.com/" target="_blank" rel="noopener noreferrer">InfoQ<ExternalLinkIcon/></a> - see especially <a href="http://www.infoq.com/java/presentations/" target="_blank" rel="noopener noreferrer">presentations<ExternalLinkIcon/></a> and <a href="http://www.infoq.com/java/interviews/" target="_blank" rel="noopener noreferrer">interviews<ExternalLinkIcon/></a></li>
<li><a href="https://www.parleys.com/" target="_blank" rel="noopener noreferrer">Parleys<ExternalLinkIcon/></a></li>
</ul>
</div></template>


