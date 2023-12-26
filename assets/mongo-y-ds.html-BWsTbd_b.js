const e=JSON.parse('{"key":"v-3492596a","path":"/db/nosql-mongo/mongo-y-ds.html","title":"Mongo进阶 - WT引擎：数据结构","lang":"zh-CN","frontmatter":{"date":"2022-07-11T00:00:00.000Z","category":["NoSQL MongoDB"],"tag":["NoSQL MongoDB"],"description":"Mongo进阶 - WT引擎：数据结构 MongoDB的WiredTiger存储引擎背后采用了什么样的数据结构呢？本文将从常见引擎数据结构，典型B-Tree数据结构，磁盘数据结构, 内存数据结构, Page数据结构等方面详解介绍。 存储引擎及常见数据结构 存储引擎要做的事情无外乎是将磁盘上的数据读到内存并返回给应用，或者将应用修改的数据由内存写到磁盘上。如何设计一种高效的数据结构和算法是所有存储引擎要考虑的根本问题，目前大多数流行的存储引擎是基于B-Tree或LSM(Log Structured Merge) Tree这两种数据结构来设计的。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/nosql-mongo/mongo-y-ds.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"Mongo进阶 - WT引擎：数据结构"}],["meta",{"property":"og:description","content":"Mongo进阶 - WT引擎：数据结构 MongoDB的WiredTiger存储引擎背后采用了什么样的数据结构呢？本文将从常见引擎数据结构，典型B-Tree数据结构，磁盘数据结构, 内存数据结构, Page数据结构等方面详解介绍。 存储引擎及常见数据结构 存储引擎要做的事情无外乎是将磁盘上的数据读到内存并返回给应用，或者将应用修改的数据由内存写到磁盘上。如何设计一种高效的数据结构和算法是所有存储引擎要考虑的根本问题，目前大多数流行的存储引擎是基于B-Tree或LSM(Log Structured Merge) Tree这两种数据结构来设计的。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:34:19.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"NoSQL MongoDB"}],["meta",{"property":"article:published_time","content":"2022-07-11T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:34:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mongo进阶 - WT引擎：数据结构\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-07-11T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:34:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"存储引擎及常见数据结构","slug":"存储引擎及常见数据结构","link":"#存储引擎及常见数据结构","children":[]},{"level":2,"title":"典型B-Tree数据结构","slug":"典型b-tree数据结构","link":"#典型b-tree数据结构","children":[]},{"level":2,"title":"WiredTiger数据文件在磁盘上的数据结构","slug":"wiredtiger数据文件在磁盘上的数据结构","link":"#wiredtiger数据文件在磁盘上的数据结构","children":[]},{"level":2,"title":"WiredTiger内存上的基础数据结构","slug":"wiredtiger内存上的基础数据结构","link":"#wiredtiger内存上的基础数据结构","children":[]},{"level":2,"title":"page的其它数据结构","slug":"page的其它数据结构","link":"#page的其它数据结构","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703579659000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":7.12,"words":2136},"filePathRelative":"db/nosql-mongo/mongo-y-ds.md","localizedDate":"2022年7月11日","excerpt":"<h1> Mongo进阶 - WT引擎：数据结构</h1>\\n<blockquote>\\n<p>MongoDB的WiredTiger存储引擎背后采用了什么样的数据结构呢？本文将从<code>常见引擎数据结构</code>，<code>典型B-Tree数据结构</code>，<code>磁盘数据结构</code>, <code>内存数据结构</code>, <code>Page数据结构</code>等方面详解介绍。</p>\\n</blockquote>\\n<h2> 存储引擎及常见数据结构</h2>\\n<p>存储引擎要做的事情无外乎是将磁盘上的数据读到内存并返回给应用，或者将应用修改的数据由内存写到磁盘上。如何设计一种高效的数据结构和算法是所有存储引擎要考虑的根本问题，目前大多数流行的存储引擎是基于B-Tree或LSM(Log Structured Merge) Tree这两种数据结构来设计的。</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
