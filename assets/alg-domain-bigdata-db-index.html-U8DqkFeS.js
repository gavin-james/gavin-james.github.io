import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,f as e}from"./app-pgelmVnX.js";const t={},i=e(`<h1 id="大数据处理-trie树-数据库-倒排索引" tabindex="-1"><a class="header-anchor" href="#大数据处理-trie树-数据库-倒排索引" aria-hidden="true">#</a> 大数据处理 - Trie树/数据库/倒排索引</h1><blockquote><p>大数据处理处理思想之 Trie树/数据库/倒排索引, 本文主要梳理下思路。</p></blockquote><h2 id="trie树" tabindex="-1"><a class="header-anchor" href="#trie树" aria-hidden="true">#</a> Trie树</h2><blockquote><p>Trie树的介绍和实现请参考 <a href="">树 - 前缀树(Trie)</a></p></blockquote><ul><li><code>适用范围</code>: 数据量大，重复多，但是数据种类小可以放入内存</li><li><code>基本原理及要点</code>: 实现方式，节点孩子的表示方式</li><li><code>扩展</code>: 压缩实现。</li></ul><p><strong>一些适用场景</strong>：</p><ul><li>寻找<strong>热门查询</strong>: 查询串的<strong>重复度比较高</strong>，虽然总数是1千万，但如果除去重复后，不超过3百万个，每个不超过255字节。</li><li>有10个文件，每个文件1G，每个文件的每一行都存放的是用户的query，每个文件的<strong>query都可能重复</strong>。要你按照query的频度排序。</li><li>1000万字符串，其中有些是相同的(<strong>重复</strong>),需要把重复的全部去掉，保留没有重复的字符串。请问怎么设计和实现?</li><li>一个文本文件，大约有一万行，每行一个词，要求统计出其中<strong>最频繁出现</strong>的前10个词。其解决方法是: 用trie树统计每个词出现的次数，时间复杂度是O(n*le)(le表示单词的平准长度)，然后是找出出现最频繁的前10个词。</li></ul><h2 id="数据库索引" tabindex="-1"><a class="header-anchor" href="#数据库索引" aria-hidden="true">#</a> 数据库索引</h2><blockquote><p>数据库索引相关，可以参看 <a href="">MySQL - 索引(B+树)</a></p></blockquote><ul><li><code>适用范围</code>: 大数据量的增删改查</li><li><code>基本原理及要点</code>: 利用数据的设计实现方法，对海量数据的增删改查进行处理。</li></ul><h2 id="倒排索引-inverted-index" tabindex="-1"><a class="header-anchor" href="#倒排索引-inverted-index" aria-hidden="true">#</a> 倒排索引(Inverted index)</h2><blockquote><p>倒排索引，可以参看 ElsaticSearch底层的实现。</p></blockquote><ul><li><code>适用范围</code>: 搜索引擎，关键字查询</li><li><code>基本原理及要点</code>: 为何叫倒排索引? 一种索引方法，被用来存储在全文搜索下某个单词在一个文档或者一组文档中的存储位置的映射。</li></ul><p>以英文为例，下面是要被索引的文本:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>T0 <span class="token operator">=</span> <span class="token string">&quot;it is what it is&quot;</span>
T1 <span class="token operator">=</span> <span class="token string">&quot;what is it&quot;</span>
T2 <span class="token operator">=</span> <span class="token string">&quot;it is a banana&quot;</span>
// 我们就能得到下面的倒排索引: 
<span class="token string">&quot;a&quot;</span><span class="token builtin class-name">:</span>      <span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>
<span class="token string">&quot;banana&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>
<span class="token string">&quot;is&quot;</span><span class="token builtin class-name">:</span>     <span class="token punctuation">{</span><span class="token number">0</span>, <span class="token number">1</span>, <span class="token number">2</span><span class="token punctuation">}</span>
<span class="token string">&quot;it&quot;</span><span class="token builtin class-name">:</span>     <span class="token punctuation">{</span><span class="token number">0</span>, <span class="token number">1</span>, <span class="token number">2</span><span class="token punctuation">}</span>
<span class="token string">&quot;what&quot;</span><span class="token builtin class-name">:</span>   <span class="token punctuation">{</span><span class="token number">0</span>, <span class="token number">1</span><span class="token punctuation">}</span>
// 检索的条件<span class="token string">&quot;what&quot;</span>,<span class="token string">&quot;is&quot;</span>和<span class="token string">&quot;it&quot;</span>将对应集合的交集。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正向索引开发出来用来存储每个文档的单词的列表。正向索引的查询往往满足每个文档有序频繁的全文查询和每个单词在校验文档中的验证这样的查询。在正向索引中，文档占据了中心的位置，每个文档指向了一个它所包含的索引项的序列。也就是说文档指向了它包含的那些单词，而<strong>倒排索引则是单词指向了包含它的文档，很容易看到这个反向的关系</strong>。</p>`,16),o=[i];function l(c,p){return s(),a("div",null,o)}const d=n(t,[["render",l],["__file","alg-domain-bigdata-db-index.html.vue"]]);export{d as default};
