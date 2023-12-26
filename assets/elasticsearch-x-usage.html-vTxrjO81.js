const e=JSON.parse('{"key":"v-3ce741b4","path":"/db/nosql-es/elasticsearch-x-usage.html","title":"ES详解 - 入门：查询和聚合的基础使用","lang":"zh-CN","frontmatter":{"date":"2022-07-28T00:00:00.000Z","category":["NoSQL ElasticSearch"],"tag":["NoSQL ElasticSearch"],"description":"ES详解 - 入门：查询和聚合的基础使用 安装完ElasticSearch 和 Kibana后，为了快速上手，我们通过官网GitHub提供的一个数据进行入门学习，主要包括查询数据和聚合数据。 入门：从索引文档开始 索引一个文档 PUT /customer/_doc/1 { \\"name\\": \\"John Doe\\" }","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/nosql-es/elasticsearch-x-usage.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"ES详解 - 入门：查询和聚合的基础使用"}],["meta",{"property":"og:description","content":"ES详解 - 入门：查询和聚合的基础使用 安装完ElasticSearch 和 Kibana后，为了快速上手，我们通过官网GitHub提供的一个数据进行入门学习，主要包括查询数据和聚合数据。 入门：从索引文档开始 索引一个文档 PUT /customer/_doc/1 { \\"name\\": \\"John Doe\\" }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:34:19.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"NoSQL ElasticSearch"}],["meta",{"property":"article:published_time","content":"2022-07-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:34:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ES详解 - 入门：查询和聚合的基础使用\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-07-28T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:34:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"入门：从索引文档开始","slug":"入门-从索引文档开始","link":"#入门-从索引文档开始","children":[]},{"level":2,"title":"学习准备：批量索引文档","slug":"学习准备-批量索引文档","link":"#学习准备-批量索引文档","children":[]},{"level":2,"title":"查询数据","slug":"查询数据","link":"#查询数据","children":[{"level":3,"title":"查询所有","slug":"查询所有","link":"#查询所有","children":[]},{"level":3,"title":"分页查询(from+size)","slug":"分页查询-from-size","link":"#分页查询-from-size","children":[]},{"level":3,"title":"指定字段查询：match","slug":"指定字段查询-match","link":"#指定字段查询-match","children":[]},{"level":3,"title":"查询段落匹配：match_phrase","slug":"查询段落匹配-match-phrase","link":"#查询段落匹配-match-phrase","children":[]},{"level":3,"title":"多条件查询: bool","slug":"多条件查询-bool","link":"#多条件查询-bool","children":[]},{"level":3,"title":"查询条件：query or filter","slug":"查询条件-query-or-filter","link":"#查询条件-query-or-filter","children":[]}]},{"level":2,"title":"聚合查询：Aggregation","slug":"聚合查询-aggregation","link":"#聚合查询-aggregation","children":[{"level":3,"title":"简单聚合","slug":"简单聚合","link":"#简单聚合","children":[]},{"level":3,"title":"嵌套聚合","slug":"嵌套聚合","link":"#嵌套聚合","children":[]},{"level":3,"title":"对聚合结果排序","slug":"对聚合结果排序","link":"#对聚合结果排序","children":[]}]}],"git":{"createdTime":1690160698000,"updatedTime":1703579659000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":4.45,"words":1336},"filePathRelative":"db/nosql-es/elasticsearch-x-usage.md","localizedDate":"2022年7月28日","excerpt":"<h1> ES详解 - 入门：查询和聚合的基础使用</h1>\\n<blockquote>\\n<p>安装完ElasticSearch 和 Kibana后，为了快速上手，我们通过官网GitHub提供的一个数据进行入门学习，主要包括<strong>查询数据</strong>和<strong>聚合数据</strong>。</p>\\n</blockquote>\\n<h2> 入门：从索引文档开始</h2>\\n<ul>\\n<li>索引一个文档</li>\\n</ul>\\n<div class=\\"language-bash line-numbers-mode\\" data-ext=\\"sh\\"><pre class=\\"language-bash\\"><code>PUT /customer/_doc/1\\n<span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token string\\">\\"name\\"</span><span class=\\"token builtin class-name\\">:</span> <span class=\\"token string\\">\\"John Doe\\"</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
