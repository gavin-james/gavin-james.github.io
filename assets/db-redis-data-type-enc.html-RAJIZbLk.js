const e=JSON.parse('{"key":"v-78ae1878","path":"/db/nosql-redis/db-redis-data-type-enc.html","title":"Redis进阶 - 数据结构：redis对象与编码(底层结构)对应关系详解","lang":"zh-CN","frontmatter":{"date":"2022-06-16T00:00:00.000Z","category":["NoSQL Redis"],"tag":["NoSQL Redis"],"description":"Redis进阶 - 数据结构：redis对象与编码(底层结构)对应关系详解 在学习完底层数据结构之后，我们终于可以结合前文内容阐述redis对象及编码之间的关系了。 redis对象与编码(底层结构)对应关系引入 在对对象机制详解 和 底层数据结构 有了初步认识之后，我们便可以继续理解它们是怎么对应的： img","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/nosql-redis/db-redis-data-type-enc.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"Redis进阶 - 数据结构：redis对象与编码(底层结构)对应关系详解"}],["meta",{"property":"og:description","content":"Redis进阶 - 数据结构：redis对象与编码(底层结构)对应关系详解 在学习完底层数据结构之后，我们终于可以结合前文内容阐述redis对象及编码之间的关系了。 redis对象与编码(底层结构)对应关系引入 在对对象机制详解 和 底层数据结构 有了初步认识之后，我们便可以继续理解它们是怎么对应的： img"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:34:19.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"NoSQL Redis"}],["meta",{"property":"article:published_time","content":"2022-06-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:34:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis进阶 - 数据结构：redis对象与编码(底层结构)对应关系详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-16T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:34:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"redis对象与编码(底层结构)对应关系引入","slug":"redis对象与编码-底层结构-对应关系引入","link":"#redis对象与编码-底层结构-对应关系引入","children":[]},{"level":2,"title":"字符串对象","slug":"字符串对象","link":"#字符串对象","children":[]},{"level":2,"title":"列表对象","slug":"列表对象","link":"#列表对象","children":[]},{"level":2,"title":"哈希对象","slug":"哈希对象","link":"#哈希对象","children":[]},{"level":2,"title":"集合对象","slug":"集合对象","link":"#集合对象","children":[]},{"level":2,"title":"有序集合对象","slug":"有序集合对象","link":"#有序集合对象","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703579659000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":8.08,"words":2423},"filePathRelative":"db/nosql-redis/db-redis-data-type-enc.md","localizedDate":"2022年6月16日","excerpt":"<h1> Redis进阶 - 数据结构：redis对象与编码(底层结构)对应关系详解</h1>\\n<blockquote>\\n<p>在学习完<a href=\\"\\">底层数据结构</a>之后，我们终于可以结合前文内容阐述redis对象及编码之间的关系了。</p>\\n</blockquote>\\n<h2> redis对象与编码(底层结构)对应关系引入</h2>\\n<p>在对<a href=\\"\\">对象机制详解</a> 和 <a href=\\"\\">底层数据结构</a> 有了初步认识之后，我们便可以继续理解它们是怎么对应的：</p>\\n<figure><img src=\\"https://www.pdai.tech/images/db/redis/db-redis-object-2-4.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};