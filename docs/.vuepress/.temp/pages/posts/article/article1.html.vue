<template><div><h1 id="文章-1" tabindex="-1"><a class="header-anchor" href="#文章-1" aria-hidden="true">#</a> 文章 1</h1>
<h2 id="标题-2" tabindex="-1"><a class="header-anchor" href="#标题-2" aria-hidden="true">#</a> 标题 2</h2>
<p>这里是内容。</p>
<h3 id="标题-3" tabindex="-1"><a class="header-anchor" href="#标题-3" aria-hidden="true">#</a> 标题 3</h3>
<p>这里是内容。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>
  <span class="token doc-comment comment">/**
   * 红字信息表十申请查询
   */</span>
  <span class="token annotation punctuation">@Test</span>
  <span class="token keyword">void</span> <span class="token function">uploadHzxxSelect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token function">post</span><span class="token punctuation">(</span><span class="token class-name">Urls</span><span class="token punctuation">.</span>uploadHzxx<span class="token punctuation">,</span> <span class="token function">getFileParam</span><span class="token punctuation">(</span><span class="token string">"/uploadHzxx/SelectParam.json"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
