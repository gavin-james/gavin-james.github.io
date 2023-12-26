const e=JSON.parse('{"key":"v-39bc0b56","path":"/db/nosql-es/elasticsearch-x-index-template.html","title":"ES详解 - 索引：索引模板(Index Template)详解","lang":"zh-CN","frontmatter":{"date":"2022-07-30T00:00:00.000Z","category":["NoSQL ElasticSearch"],"tag":["NoSQL ElasticSearch"],"description":"ES详解 - 索引：索引模板(Index Template)详解 前文介绍了索引的一些操作，特别是手动创建索引，但是批量和脚本化必然需要提供一种模板方式快速构建和管理索引，这就是本文要介绍的索引模板(Index Template)，它是一种告诉Elasticsearch在创建索引时如何配置索引的方法。为了更好的复用性，在7.8中还引入了组件模板。 索引模板 索引模板是一种告诉Elasticsearch在创建索引时如何配置索引的方法。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/nosql-es/elasticsearch-x-index-template.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"ES详解 - 索引：索引模板(Index Template)详解"}],["meta",{"property":"og:description","content":"ES详解 - 索引：索引模板(Index Template)详解 前文介绍了索引的一些操作，特别是手动创建索引，但是批量和脚本化必然需要提供一种模板方式快速构建和管理索引，这就是本文要介绍的索引模板(Index Template)，它是一种告诉Elasticsearch在创建索引时如何配置索引的方法。为了更好的复用性，在7.8中还引入了组件模板。 索引模板 索引模板是一种告诉Elasticsearch在创建索引时如何配置索引的方法。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:34:19.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"NoSQL ElasticSearch"}],["meta",{"property":"article:published_time","content":"2022-07-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:34:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ES详解 - 索引：索引模板(Index Template)详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-07-30T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:34:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"索引模板","slug":"索引模板","link":"#索引模板","children":[{"level":3,"title":"模板类型","slug":"模板类型","link":"#模板类型","children":[]},{"level":3,"title":"索引模板中的优先级","slug":"索引模板中的优先级","link":"#索引模板中的优先级","children":[]},{"level":3,"title":"内置索引模板","slug":"内置索引模板","link":"#内置索引模板","children":[]},{"level":3,"title":"案例","slug":"案例","link":"#案例","children":[]}]},{"level":2,"title":"模拟多组件模板","slug":"模拟多组件模板","link":"#模拟多组件模板","children":[{"level":3,"title":"模拟某个索引结果","slug":"模拟某个索引结果","link":"#模拟某个索引结果","children":[]},{"level":3,"title":"模拟组件模板结果","slug":"模拟组件模板结果","link":"#模拟组件模板结果","children":[]},{"level":3,"title":"模拟组件模板和自身模板结合后的结果","slug":"模拟组件模板和自身模板结合后的结果","link":"#模拟组件模板和自身模板结合后的结果","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703579659000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":3.41,"words":1023},"filePathRelative":"db/nosql-es/elasticsearch-x-index-template.md","localizedDate":"2022年7月30日","excerpt":"<h1> ES详解 - 索引：索引模板(Index Template)详解</h1>\\n<blockquote>\\n<p>前文介绍了索引的一些操作，特别是手动创建索引，但是批量和脚本化必然需要提供一种模板方式快速构建和管理索引，这就是本文要介绍的索引模板(Index Template)，它是一种告诉Elasticsearch在创建索引时如何配置索引的方法。为了更好的复用性，在7.8中还引入了组件模板。</p>\\n</blockquote>\\n<h2> 索引模板</h2>\\n<blockquote>\\n<p>索引模板是一种告诉Elasticsearch在创建索引时如何配置索引的方法。</p>\\n</blockquote>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
