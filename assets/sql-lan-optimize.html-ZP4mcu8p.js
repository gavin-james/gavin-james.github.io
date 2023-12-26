const e=JSON.parse('{"key":"v-ed93b2c8","path":"/db/sql-lan/sql-lan-optimize.html","title":"SQL语言 - SQL语句优化","lang":"zh-CN","frontmatter":{"date":"2022-05-25T00:00:00.000Z","category":["SQL语言"],"tag":["SQL语言"],"description":"SQL语言 - SQL语句优化 最后，再总结一些SQL语句的优化建议。 负向查询不能使用索引 select name from user where id not in (1,3,4);","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/sql-lan/sql-lan-optimize.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"SQL语言 - SQL语句优化"}],["meta",{"property":"og:description","content":"SQL语言 - SQL语句优化 最后，再总结一些SQL语句的优化建议。 负向查询不能使用索引 select name from user where id not in (1,3,4);"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:34:19.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"SQL语言"}],["meta",{"property":"article:published_time","content":"2022-05-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:34:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SQL语言 - SQL语句优化\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-05-25T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:34:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"负向查询不能使用索引","slug":"负向查询不能使用索引","link":"#负向查询不能使用索引","children":[]},{"level":2,"title":"前导模糊查询不能使用索引","slug":"前导模糊查询不能使用索引","link":"#前导模糊查询不能使用索引","children":[]},{"level":2,"title":"数据区分不明显的不建议创建索引","slug":"数据区分不明显的不建议创建索引","link":"#数据区分不明显的不建议创建索引","children":[]},{"level":2,"title":"字段的默认值不要为 null","slug":"字段的默认值不要为-null","link":"#字段的默认值不要为-null","children":[]},{"level":2,"title":"在字段上进行计算不能命中索引","slug":"在字段上进行计算不能命中索引","link":"#在字段上进行计算不能命中索引","children":[]},{"level":2,"title":"最左前缀问题","slug":"最左前缀问题","link":"#最左前缀问题","children":[]},{"level":2,"title":"如果明确知道只有一条记录返回","slug":"如果明确知道只有一条记录返回","link":"#如果明确知道只有一条记录返回","children":[]},{"level":2,"title":"不要让数据库帮我们做强制类型转换","slug":"不要让数据库帮我们做强制类型转换","link":"#不要让数据库帮我们做强制类型转换","children":[]},{"level":2,"title":"如果需要进行 join 的字段两表的字段类型要相同","slug":"如果需要进行-join-的字段两表的字段类型要相同","link":"#如果需要进行-join-的字段两表的字段类型要相同","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703579659000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":1.58,"words":474},"filePathRelative":"db/sql-lan/sql-lan-optimize.md","localizedDate":"2022年5月25日","excerpt":"<h1> SQL语言 - SQL语句优化</h1>\\n<blockquote>\\n<p>最后，再总结一些SQL语句的优化建议。</p>\\n</blockquote>\\n<h2> 负向查询不能使用索引</h2>\\n<div class=\\"language-sql line-numbers-mode\\" data-ext=\\"sql\\"><pre class=\\"language-sql\\"><code><span class=\\"token keyword\\">select</span> name <span class=\\"token keyword\\">from</span> <span class=\\"token keyword\\">user</span> <span class=\\"token keyword\\">where</span> id <span class=\\"token operator\\">not</span> <span class=\\"token operator\\">in</span> <span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span><span class=\\"token number\\">3</span><span class=\\"token punctuation\\">,</span><span class=\\"token number\\">4</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
