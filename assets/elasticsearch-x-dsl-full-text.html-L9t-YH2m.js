import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as p,c,a as n,b as s,d as t,f as e}from"./app-Kb1srcrM.js";const u={},o=e(`<h1 id="es详解-查询-dsl查询之全文搜索详解" tabindex="-1"><a class="header-anchor" href="#es详解-查询-dsl查询之全文搜索详解" aria-hidden="true">#</a> ES详解 - 查询：DSL查询之全文搜索详解</h1><blockquote><p>DSL查询极为常用的是对文本进行搜索，我们叫全文搜索，本文主要对全文搜索进行详解。</p></blockquote><h2 id="写在前面-谈谈如何从官网学习" tabindex="-1"><a class="header-anchor" href="#写在前面-谈谈如何从官网学习" aria-hidden="true">#</a> 写在前面:谈谈如何从官网学习</h2><p>提示</p><p>很多读者在看官方文档学习时存在一个误区，以DSL中full text查询为例，其实内容是非常多的， 没有取舍/没重点去阅读， 要么需要花很多时间，要么头脑一片浆糊。所以这里重点谈谈我的理解。</p><p>一些理解：</p><ul><li>第一点：<strong>全局观</strong>，即我们现在学习内容在整个体系的哪个位置？</li></ul><p>如下图，可以很方便的帮助你构筑这种体系</p><figure><img src="https://www.pdai.tech/images/db/es/es-dsl-full-text-3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li>第二点： <strong>分类别</strong>，从上层理解，而不是本身</li></ul><p>比如Full text Query中，我们只需要把如下的那么多点分为3大类，你的体系能力会大大提升</p><figure><img src="https://www.pdai.tech/images/db/es/es-dsl-full-text-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li>第三点： <strong>知识点还是API</strong>？ API类型的是可以查询的，只需要知道大致有哪些功能就可以了。</li></ul><figure><img src="https://www.pdai.tech/images/db/es/es-dsl-full-text-2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="match类型" tabindex="-1"><a class="header-anchor" href="#match类型" aria-hidden="true">#</a> Match类型</h2><blockquote><p>第一类：match 类型</p></blockquote><h3 id="match-查询的步骤" tabindex="-1"><a class="header-anchor" href="#match-查询的步骤" aria-hidden="true">#</a> match 查询的步骤</h3><p>在<a href="">前文</a>中我们已经介绍了match查询。</p><ul><li><strong>准备一些数据</strong></li></ul><p>这里我们准备一些数据，通过实例看match 查询的步骤</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /test-dsl-match
<span class="token punctuation">{</span> <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;number_of_shards&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">}</span> 

POST /test-dsl-match/_bulk
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;The quick brown fox&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;The quick brown fox jumps over the lazy dog&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;The quick brown fox jumps over the quick dog&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Brown fox brown dog&quot;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>查询数据</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /test-dsl-match/_search
<span class="token punctuation">{</span>
    <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;QUICK!&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Elasticsearch 执行上面这个 match 查询的步骤是：</p><ol><li><strong>检查字段类型</strong> 。</li></ol><p>标题 title 字段是一个 string 类型（ analyzed ）已分析的全文字段，这意味着查询字符串本身也应该被分析。</p><ol><li><strong>分析查询字符串</strong> 。</li></ol><p>将查询的字符串 QUICK! 传入标准分析器中，输出的结果是单个项 quick 。因为只有一个单词项，所以 match 查询执行的是单个底层 term 查询。</p><ol><li><strong>查找匹配文档</strong> 。</li></ol><p>用 term 查询在倒排索引中查找 quick 然后获取一组包含该项的文档，本例的结果是文档：1、2 和 3 。</p><ol><li><strong>为每个文档评分</strong> 。</li></ol><p>用 term 查询计算每个文档相关度评分 _score ，这是种将词频（term frequency，即词 quick 在相关文档的 title 字段中出现的频率）和反向文档频率（inverse document frequency，即词 quick 在所有文档的 title 字段中出现的频率），以及字段的长度（即字段越短相关度越高）相结合的计算方式。</p><ul><li><strong>验证结果</strong></li></ul><figure><img src="https://www.pdai.tech/images/db/es/es-dsl-full-text-4.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="match多个词深入" tabindex="-1"><a class="header-anchor" href="#match多个词深入" aria-hidden="true">#</a> match多个词深入</h3><p>我们在上文中复合查询中已经使用了match多个词，比如“Quick pets”； 这里我们通过例子带你更深入理解match多个词</p><ul><li><strong>match多个词的本质</strong></li></ul><p>查询多个词&quot;BROWN DOG!&quot;</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /test-dsl-match/_search
<span class="token punctuation">{</span>
    <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;BROWN DOG&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://www.pdai.tech/images/db/es/es-dsl-full-text-5.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>因为 match 查询必须查找两个词（ [&quot;brown&quot;,&quot;dog&quot;] ），它在内部实际上先执行两次 term 查询，然后将两次查询的结果合并作为最终结果输出。为了做到这点，它将两个 term 查询包入一个 bool 查询中，</p><p>所以上述查询的结果，和如下语句查询结果是等同的</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /test-dsl-match/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;should&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;brown&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>,
        <span class="token punctuation">{</span>
          <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;dog&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://www.pdai.tech/images/db/es/es-dsl-full-text-6.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li><strong>match多个词的逻辑</strong></li></ul><p>上面等同于should（任意一个满足），是因为 match还有一个operator参数，默认是or, 所以对应的是should。</p><p>所以上述查询也等同于</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /test-dsl-match/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;BROWN DOG&quot;</span>,
        <span class="token string">&quot;operator&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;or&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么我们如果是需要and操作呢，即同时满足呢？</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /test-dsl-match/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;BROWN DOG&quot;</span>,
        <span class="token string">&quot;operator&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;and&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等同于</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /test-dsl-match/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;must&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;brown&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>,
        <span class="token punctuation">{</span>
          <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;dog&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://www.pdai.tech/images/db/es/es-dsl-full-text-7.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="控制match的匹配精度" tabindex="-1"><a class="header-anchor" href="#控制match的匹配精度" aria-hidden="true">#</a> 控制match的匹配精度</h3><p>如果用户给定 3 个查询词，想查找至少包含其中 2 个的文档，该如何处理？将 operator 操作符参数设置成 and 或者 or 都是不合适的。</p><p>match 查询支持 minimum_should_match 最小匹配参数，这让我们可以指定必须匹配的词项数用来表示一个文档是否相关。我们可以将其设置为某个具体数字，更常用的做法是将其设置为一个百分数，因为我们无法控制用户搜索时输入的单词数量：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /test-dsl-match/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span>                <span class="token string">&quot;quick brown dog&quot;</span>,
        <span class="token string">&quot;minimum_should_match&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;75%&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当给定百分比的时候， minimum_should_match 会做合适的事情：在之前三词项的示例中， 75% 会自动被截断成 66.6% ，即三个里面两个词。无论这个值设置成什么，至少包含一个词项的文档才会被认为是匹配的。</p><figure><img src="https://www.pdai.tech/images/db/es/es-dsl-full-text-8.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>当然也等同于</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /test-dsl-match/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;should&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;quick&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>,
        <span class="token punctuation">{</span> <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;brown&quot;</span>   <span class="token punctuation">}</span><span class="token punctuation">}</span>,
        <span class="token punctuation">{</span> <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;dog&quot;</span>   <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span>,
      <span class="token string">&quot;minimum_should_match&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span> 
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://www.pdai.tech/images/db/es/es-dsl-full-text-9.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="其它match类型" tabindex="-1"><a class="header-anchor" href="#其它match类型" aria-hidden="true">#</a> 其它match类型</h3><ul><li><strong>match_pharse</strong></li></ul><p>match_phrase在前文中我们已经有了解，我们再看下另外一个例子。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /test-dsl-match/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_phrase&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;quick brown&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://www.pdai.tech/images/db/es/es-dsl-full-text-11.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>很多人对它仍然有误解的，比如如下例子：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /test-dsl-match/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_phrase&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;quick brown f&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样的查询是查不出任何数据的，因为前文中我们知道了match本质上是对term组合，match_phrase本质是连续的term的查询，所以f并不是一个分词，不满足term查询，所以最终查不出任何内容了。</p><figure><img src="https://www.pdai.tech/images/db/es/es-dsl-full-text-12.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li><strong>match_pharse_prefix</strong></li></ul><p>那有没有可以查询出<code>quick brown f</code>的方式呢？ELasticSearch在match_phrase基础上提供了一种可以查最后一个词项是前缀的方法，这样就可以查询<code>quick brown f</code>了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /test-dsl-match/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_phrase_prefix&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;quick brown f&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://www.pdai.tech/images/db/es/es-dsl-full-text-13.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>(ps: prefix的意思不是整个text的开始匹配，而是最后一个词项满足term的prefix查询而已)</p><ul><li><strong>match_bool_prefix</strong></li></ul><p>除了match_phrase_prefix，ElasticSearch还提供了match_bool_prefix查询</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /test-dsl-match/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_bool_prefix&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;quick brown f&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://www.pdai.tech/images/db/es/es-dsl-full-text-14.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>它们两种方式有啥区别呢？match_bool_prefix本质上可以转换为：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /test-dsl-match/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;should&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;quick&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>,
        <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;brown&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>,
        <span class="token punctuation">{</span> <span class="token string">&quot;prefix&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;f&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以这样你就能理解，match_bool_prefix查询中的quick,brown,f是无序的。</p><ul><li><strong>multi_match</strong></li></ul><p>如果我们期望一次对多个字段查询，怎么办呢？ElasticSearch提供了multi_match查询的方式</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;multi_match&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span>    <span class="token string">&quot;Will Smith&quot;</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;title&quot;</span>, <span class="token string">&quot;*_name&quot;</span> <span class="token punctuation">]</span> 
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>*</code>表示前缀匹配字段。</p><h2 id="query-string类型" tabindex="-1"><a class="header-anchor" href="#query-string类型" aria-hidden="true">#</a> query string类型</h2><blockquote><p>第二类：query string 类型</p></blockquote><h3 id="query-string" tabindex="-1"><a class="header-anchor" href="#query-string" aria-hidden="true">#</a> query_string</h3><p>此查询使用语法根据运算符（例如AND或）来解析和拆分提供的查询字符串NOT。然后查询在返回匹配的文档之前独立分析每个拆分的文本。</p><p>可以使用该query_string查询创建一个复杂的搜索，其中包括通配符，跨多个字段的搜索等等。尽管用途广泛，但查询是严格的，如果查询字符串包含任何无效语法，则返回错误。</p><p>例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /test-dsl-match/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;query_string&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;(lazy dog) OR (brown dog)&quot;</span>,
      <span class="token string">&quot;default_field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;title&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里查询结果，你需要理解本质上查询这四个分词（term）or的结果而已，所以doc 3和4也在其中</p><figure><img src="https://www.pdai.tech/images/db/es/es-dsl-full-text-15.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,96),r={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html",target:"_blank",rel:"noopener noreferrer"},d=e(`<h3 id="query-string-simple" tabindex="-1"><a class="header-anchor" href="#query-string-simple" aria-hidden="true">#</a> query_string_simple</h3><p>该查询使用一种简单的语法来解析提供的查询字符串并将其拆分为基于特殊运算符的术语。然后查询在返回匹配的文档之前独立分析每个术语。</p><p>尽管其语法比query_string查询更受限制 ，但<strong>simple_query_string 查询不会针对无效语法返回错误。而是，它将忽略查询字符串的任何无效部分</strong>。</p><p>举例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /test-dsl-match/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;simple_query_string&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;<span class="token entity" title="\\&quot;">\\&quot;</span>over the<span class="token entity" title="\\&quot;">\\&quot;</span> + (lazy | quick) + dog&quot;</span>,
        <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;title&quot;</span><span class="token punctuation">]</span>,
        <span class="token string">&quot;default_operator&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;and&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://www.pdai.tech/images/db/es/es-dsl-full-text-16.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,6),m={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html",target:"_blank",rel:"noopener noreferrer"},k=e(`<h2 id="interval类型" tabindex="-1"><a class="header-anchor" href="#interval类型" aria-hidden="true">#</a> Interval类型</h2><blockquote><p>第三类：interval类型</p></blockquote><p>Intervals是时间间隔的意思，本质上将多个规则按照顺序匹配。</p><p>比如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /test-dsl-match/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;intervals&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;title&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;all_of&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;ordered&quot;</span> <span class="token builtin class-name">:</span> true,
          <span class="token string">&quot;intervals&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
              <span class="token string">&quot;match&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;query&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;quick&quot;</span>,
                <span class="token string">&quot;max_gaps&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">0</span>,
                <span class="token string">&quot;ordered&quot;</span> <span class="token builtin class-name">:</span> <span class="token boolean">true</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>,
            <span class="token punctuation">{</span>
              <span class="token string">&quot;any_of&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;intervals&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                  <span class="token punctuation">{</span> <span class="token string">&quot;match&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;query&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;jump over&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>,
                  <span class="token punctuation">{</span> <span class="token string">&quot;match&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;query&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;quick dog&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
                <span class="token punctuation">]</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://www.pdai.tech/images/db/es/es-dsl-full-text-17.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,6),v={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-intervals-query.html",target:"_blank",rel:"noopener noreferrer"},b=n("h2",{id:"参考文章",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考文章","aria-hidden":"true"},"#"),s(" 参考文章")],-1),g={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/full-text-queries.html#full-text-queries",target:"_blank",rel:"noopener noreferrer"},q={href:"https://www.elastic.co/guide/cn/elasticsearch/guide/current/match-multi-word.html",target:"_blank",rel:"noopener noreferrer"};function h(f,_){const a=l("ExternalLinkIcon");return p(),c("div",null,[o,n("p",null,[s("对构筑知识体系已经够了，但是它其实还有很多参数和用法，更多请参考"),n("a",r,[s("官网在新窗口打开"),t(a)])]),d,n("p",null,[s("更多请参考"),n("a",m,[s("官网在新窗口打开"),t(a)])]),k,n("p",null,[s("因为interval之间是可以组合的，所以它可以表现的很复杂。更多请参考"),n("a",v,[s("官网在新窗口打开"),t(a)])]),b,n("p",null,[n("a",g,[s("https://www.elastic.co/guide/en/elasticsearch/reference/current/full-text-queries.html#full-text-queries"),t(a)])]),n("p",null,[n("a",q,[s("https://www.elastic.co/guide/cn/elasticsearch/guide/current/match-multi-word.html"),t(a)])])])}const y=i(u,[["render",h],["__file","elasticsearch-x-dsl-full-text.html.vue"]]);export{y as default};
