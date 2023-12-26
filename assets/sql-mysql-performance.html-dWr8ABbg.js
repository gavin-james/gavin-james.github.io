const e=JSON.parse('{"key":"v-363dead7","path":"/db/sql-mysql/sql-mysql-performance.html","title":"MySQL - 性能优化","lang":"zh-CN","frontmatter":{"date":"2022-05-30T00:00:00.000Z","category":["SQL MySQL"],"tag":["SQL MySQL"],"description":"MySQL - 性能优化 使用 Explain 进行分析 Explain 用来分析 SELECT 查询语句，开发人员可以通过分析 Explain 结果来优化查询语句。 比较重要的字段有: select_type : 查询类型，有简单查询、联合查询、子查询等 key : 使用的索引 rows : 扫描的行数 优化数据访问 1. 减少请求的数据量 只返回必要的列: 最好不要使用 SELECT * 语句。 只返回必要的行: 使用 LIMIT 语句来限制返回的数据。 缓存重复查询的数据: 使用缓存可以避免在数据库中进行查询，特别在要查询的数据经常被重复查询时，缓存带来的查询性能提升将会是非常明显的。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/sql-mysql/sql-mysql-performance.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"MySQL - 性能优化"}],["meta",{"property":"og:description","content":"MySQL - 性能优化 使用 Explain 进行分析 Explain 用来分析 SELECT 查询语句，开发人员可以通过分析 Explain 结果来优化查询语句。 比较重要的字段有: select_type : 查询类型，有简单查询、联合查询、子查询等 key : 使用的索引 rows : 扫描的行数 优化数据访问 1. 减少请求的数据量 只返回必要的列: 最好不要使用 SELECT * 语句。 只返回必要的行: 使用 LIMIT 语句来限制返回的数据。 缓存重复查询的数据: 使用缓存可以避免在数据库中进行查询，特别在要查询的数据经常被重复查询时，缓存带来的查询性能提升将会是非常明显的。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:34:19.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"SQL MySQL"}],["meta",{"property":"article:published_time","content":"2022-05-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:34:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL - 性能优化\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-05-30T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:34:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"使用 Explain 进行分析","slug":"使用-explain-进行分析","link":"#使用-explain-进行分析","children":[]},{"level":2,"title":"优化数据访问","slug":"优化数据访问","link":"#优化数据访问","children":[{"level":3,"title":"1. 减少请求的数据量","slug":"_1-减少请求的数据量","link":"#_1-减少请求的数据量","children":[]},{"level":3,"title":"2. 减少服务器端扫描的行数","slug":"_2-减少服务器端扫描的行数","link":"#_2-减少服务器端扫描的行数","children":[]}]},{"level":2,"title":"重构查询方式","slug":"重构查询方式","link":"#重构查询方式","children":[{"level":3,"title":"1. 切分大查询","slug":"_1-切分大查询","link":"#_1-切分大查询","children":[]},{"level":3,"title":"2. 分解大连接查询","slug":"_2-分解大连接查询","link":"#_2-分解大连接查询","children":[]}]}],"git":{"createdTime":1690160698000,"updatedTime":1703579659000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":2.09,"words":628},"filePathRelative":"db/sql-mysql/sql-mysql-performance.md","localizedDate":"2022年5月30日","excerpt":"<h1> MySQL - 性能优化</h1>\\n<h2> 使用 Explain 进行分析</h2>\\n<p>Explain 用来分析 SELECT 查询语句，开发人员可以通过分析 Explain 结果来优化查询语句。</p>\\n<p>比较重要的字段有:</p>\\n<ul>\\n<li>select_type : 查询类型，有简单查询、联合查询、子查询等</li>\\n<li>key : 使用的索引</li>\\n<li>rows : 扫描的行数</li>\\n</ul>\\n<h2> 优化数据访问</h2>\\n<h3> 1. 减少请求的数据量</h3>\\n<ul>\\n<li>只返回必要的列: 最好不要使用 SELECT * 语句。</li>\\n<li>只返回必要的行: 使用 LIMIT 语句来限制返回的数据。</li>\\n<li>缓存重复查询的数据: 使用缓存可以避免在数据库中进行查询，特别在要查询的数据经常被重复查询时，缓存带来的查询性能提升将会是非常明显的。</li>\\n</ul>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
