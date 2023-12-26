const o=JSON.parse('{"key":"v-2480ea03","path":"/db/nosql-mongo/mongo-y-arch.html","title":"Mongo进阶 - MongoDB体系结构","lang":"zh-CN","frontmatter":{"date":"2022-07-09T00:00:00.000Z","category":["NoSQL MongoDB"],"tag":["NoSQL MongoDB"],"description":"Mongo进阶 - MongoDB体系结构 上面章节已经对MongoDB生态中工具以及使用有了基础，后续文章我们将开始理解MongoDB是如何支撑这些功能的。我们将从最基本的MongoDB的体系结构开始介绍，主要包括MongoDB的包结构，MongoDB的数据逻辑结构，MongoDB的数据文件结构。其中围绕着MongoDB的数据文件结构，将为我们后续介绍MongoDB的存储引擎详解打下基础。 MongoDB包组件结构","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/nosql-mongo/mongo-y-arch.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"Mongo进阶 - MongoDB体系结构"}],["meta",{"property":"og:description","content":"Mongo进阶 - MongoDB体系结构 上面章节已经对MongoDB生态中工具以及使用有了基础，后续文章我们将开始理解MongoDB是如何支撑这些功能的。我们将从最基本的MongoDB的体系结构开始介绍，主要包括MongoDB的包结构，MongoDB的数据逻辑结构，MongoDB的数据文件结构。其中围绕着MongoDB的数据文件结构，将为我们后续介绍MongoDB的存储引擎详解打下基础。 MongoDB包组件结构"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:34:19.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"NoSQL MongoDB"}],["meta",{"property":"article:published_time","content":"2022-07-09T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:34:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mongo进阶 - MongoDB体系结构\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-07-09T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:34:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"MongoDB包组件结构","slug":"mongodb包组件结构","link":"#mongodb包组件结构","children":[]},{"level":2,"title":"MongoDB数据逻辑结构","slug":"mongodb数据逻辑结构","link":"#mongodb数据逻辑结构","children":[{"level":3,"title":"数据库","slug":"数据库","link":"#数据库","children":[]},{"level":3,"title":"集合","slug":"集合","link":"#集合","children":[]},{"level":3,"title":"文档","slug":"文档","link":"#文档","children":[]}]},{"level":2,"title":"MongoDB数据库文件","slug":"mongodb数据库文件","link":"#mongodb数据库文件","children":[{"level":3,"title":"MongoDB - MMAPv1引擎下的数据库文件","slug":"mongodb-mmapv1引擎下的数据库文件","link":"#mongodb-mmapv1引擎下的数据库文件","children":[]},{"level":3,"title":"MongoDB - WiredTiger","slug":"mongodb-wiredtiger","link":"#mongodb-wiredtiger","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703579659000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":6.37,"words":1912},"filePathRelative":"db/nosql-mongo/mongo-y-arch.md","localizedDate":"2022年7月9日","excerpt":"<h1> Mongo进阶 - MongoDB体系结构</h1>\\n<blockquote>\\n<p>上面章节已经对MongoDB生态中工具以及使用有了基础，后续文章我们将开始理解MongoDB是如何支撑这些功能的。我们将从最基本的MongoDB的体系结构开始介绍，主要包括<code>MongoDB的包结构</code>，<code>MongoDB的数据逻辑结构</code>，<code>MongoDB的数据文件结构</code>。其中围绕着MongoDB的数据文件结构，将为我们后续介绍MongoDB的存储引擎详解打下基础。</p>\\n</blockquote>\\n<h2> MongoDB包组件结构</h2>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{o as data};