import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as c,c as u,a as n,b as s,d as t,f as e}from"./app-DmnHa7HT.js";const l={},i=n("h1",{id:"elasticsearch-wrapperquery",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#elasticsearch-wrapperquery","aria-hidden":"true"},"#"),s(" ElasticSearch - WrapperQuery")],-1),r=n("blockquote",null,[n("p",null,"在工作中遇到ElasticSearch版本升级时出现Java High Level接口变更导致的兼容性问题: 之前使用的是2.4.x，考虑性能和功能的增强，需要更换为6.4.x; 2.4.x中我们使用DSL语句直接查询(数据的不确定性和方便动态建立查询规则等因素)，而新的ES Java 高阶API中去掉了相关接口的支持。 此文主要记录通过 ES Wrapper Query实现对6.x版本中 Java high-level transport client对json DSL查询对支持。")],-1),d=n("h2",{id:"实现方式理论基础",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#实现方式理论基础","aria-hidden":"true"},"#"),s(" 实现方式理论基础")],-1),k=n("ul",null,[n("li",null,"Wrapper Query 官网说明")],-1),v={href:"https://www.elastic.co/guide/en/elasticsearch/reference/6.4/query-dsl-wrapper-query.html",target:"_blank",rel:"noopener noreferrer"},q=e(`<blockquote><p>This query is more useful in the context of the Java high-level REST client or transport client to also accept queries as json formatted string. In these cases queries can be specified as a json or yaml formatted string or as a query builder (which is a available in the Java high-level REST client).</p></blockquote><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /_search
<span class="token punctuation">{</span>
    <span class="token property">&quot;query&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;wrapper&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;query&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eyJ0ZXJtIiA6IHsgInVzZXIiIDogIktpbWNoeSIgfX0=&quot;</span> <span class="token comment">// Base64 encoded string: {&quot;term&quot; : { &quot;user&quot; : &quot;Kimchy&quot; }}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>将DSL JSON语句 转成 map</li></ul>`,3),m={href:"https://blog.csdn.net/qq_41370896/article/details/83658948",target:"_blank",rel:"noopener noreferrer"},g=e(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">String</span> dsl <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">Map</span> maps <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Map</span><span class="token punctuation">)</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>dsl<span class="token punctuation">)</span><span class="token punctuation">;</span>  
maps<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;query&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// dsl query string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Java 代码</li></ul>`,2),h={href:"https://blog.csdn.net/tcyzhyx/article/details/84566734",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.jianshu.com/p/216ca70d9e62",target:"_blank",rel:"noopener noreferrer"},f=e(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">StringBuffer</span> dsl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dsl<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;{\\&quot;bool\\&quot;: {&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dsl<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;      \\&quot;must\\&quot;: [&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dsl<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;        {&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dsl<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;          \\&quot;term\\&quot;: {&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dsl<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;            \\&quot;mdid.keyword\\&quot;: {&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dsl<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;              \\&quot;value\\&quot;: \\&quot;2fa9d41e1af460e0d47ce36ca8a98737\\&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dsl<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;            }&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dsl<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;          }&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dsl<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;        }&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dsl<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;      ]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dsl<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;    }&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dsl<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">WrapperQueryBuilder</span> wqb <span class="token operator">=</span> <span class="token class-name">QueryBuilders</span><span class="token punctuation">.</span><span class="token function">wrapperQuery</span><span class="token punctuation">(</span>dsl<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">SearchResponse</span> searchResponse <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">prepareSearch</span><span class="token punctuation">(</span>basicsysCodeManager<span class="token punctuation">.</span><span class="token function">getYjzxYjxxIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">setTypes</span><span class="token punctuation">(</span>basicsysCodeManager<span class="token punctuation">.</span><span class="token function">getYjzxYjxxType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setQuery</span><span class="token punctuation">(</span>wqb<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setSize</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">SearchHit</span><span class="token punctuation">[</span><span class="token punctuation">]</span> hits <span class="token operator">=</span> searchResponse<span class="token punctuation">.</span><span class="token function">getHits</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getHits</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">SearchHit</span> hit <span class="token operator">:</span> hits<span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token class-name">String</span> content <span class="token operator">=</span> hit<span class="token punctuation">.</span><span class="token function">getSourceAsString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>query + agg 应该怎么写</li></ul>`,2),y={href:"http://www.itkeyword.com/doc/1009692843717298639/wrapperquerybuilder-aggs-query-throwing-query-malformed-exception",target:"_blank",rel:"noopener noreferrer"},_=e(`<div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token string">&quot;{\\&quot;query\\&quot;:{\\&quot;match_all\\&quot;: {}},\\&quot;aggs\\&quot;:{\\&quot;avg1\\&quot;:{\\&quot;avg\\&quot;:{\\&quot;field\\&quot;:\\&quot;age\\&quot;}}}}&quot;</span>
SearchSourceBuilder ssb = new SearchSourceBuilder();

<span class="token comment">// add the query part</span>
String query =<span class="token string">&quot;{\\&quot;match_all\\&quot;: {}}&quot;</span>;
WrapperQueryBuilder wrapQB = new WrapperQueryBuilder(query);
ssb.query(wrapQB);

<span class="token comment">// add the aggregation part</span>
AvgBuilder avgAgg = AggregationBuilders.avg(<span class="token string">&quot;avg1&quot;</span>).field(<span class="token string">&quot;age&quot;</span>);
ssb.aggregation(avgAgg);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实现示例" tabindex="-1"><a class="header-anchor" href="#实现示例" aria-hidden="true">#</a> 实现示例</h2><p>略</p>`,3);function w(S,x){const a=o("ExternalLinkIcon");return c(),u("div",null,[i,r,d,k,n("p",null,[n("a",v,[s("https://www.elastic.co/guide/en/elasticsearch/reference/6.4/query-dsl-wrapper-query.html"),t(a)])]),q,n("p",null,[n("a",m,[s("https://blog.csdn.net/qq_41370896/article/details/83658948"),t(a)])]),g,n("p",null,[n("a",h,[s("https://blog.csdn.net/tcyzhyx/article/details/84566734"),t(a)])]),n("p",null,[n("a",b,[s("https://www.jianshu.com/p/216ca70d9e62"),t(a)])]),f,n("p",null,[n("a",y,[s("http://www.itkeyword.com/doc/1009692843717298639/wrapperquerybuilder-aggs-query-throwing-query-malformed-exception"),t(a)])]),_])}const I=p(l,[["render",w],["__file","elasticsearch-wrapper-query.html.vue"]]);export{I as default};
