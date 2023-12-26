const e=JSON.parse('{"key":"v-4777caa4","path":"/db/nosql-es/elasticsearch-wrapper-query.html","title":"ElasticSearch - WrapperQuery","lang":"zh-CN","frontmatter":{"date":"2022-08-15T00:00:00.000Z","category":["NoSQL ElasticSearch"],"tag":["NoSQL ElasticSearch"],"description":"ElasticSearch - WrapperQuery 在工作中遇到ElasticSearch版本升级时出现Java High Level接口变更导致的兼容性问题: 之前使用的是2.4.x，考虑性能和功能的增强，需要更换为6.4.x; 2.4.x中我们使用DSL语句直接查询(数据的不确定性和方便动态建立查询规则等因素)，而新的ES Java 高阶API中去掉了相关接口的支持。 此文主要记录通过 ES Wrapper Query实现对6.x版本中 Java high-level transport client对json DSL查询对支持。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/nosql-es/elasticsearch-wrapper-query.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"ElasticSearch - WrapperQuery"}],["meta",{"property":"og:description","content":"ElasticSearch - WrapperQuery 在工作中遇到ElasticSearch版本升级时出现Java High Level接口变更导致的兼容性问题: 之前使用的是2.4.x，考虑性能和功能的增强，需要更换为6.4.x; 2.4.x中我们使用DSL语句直接查询(数据的不确定性和方便动态建立查询规则等因素)，而新的ES Java 高阶API中去掉了相关接口的支持。 此文主要记录通过 ES Wrapper Query实现对6.x版本中 Java high-level transport client对json DSL查询对支持。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:34:19.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"NoSQL ElasticSearch"}],["meta",{"property":"article:published_time","content":"2022-08-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:34:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ElasticSearch - WrapperQuery\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-08-15T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:34:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"实现方式理论基础","slug":"实现方式理论基础","link":"#实现方式理论基础","children":[]},{"level":2,"title":"实现示例","slug":"实现示例","link":"#实现示例","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703579659000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":1.27,"words":380},"filePathRelative":"db/nosql-es/elasticsearch-wrapper-query.md","localizedDate":"2022年8月15日","excerpt":"<h1> ElasticSearch - WrapperQuery</h1>\\n<blockquote>\\n<p>在工作中遇到ElasticSearch版本升级时出现Java High Level接口变更导致的兼容性问题: 之前使用的是2.4.x，考虑性能和功能的增强，需要更换为6.4.x; 2.4.x中我们使用DSL语句直接查询(数据的不确定性和方便动态建立查询规则等因素)，而新的ES Java 高阶API中去掉了相关接口的支持。 此文主要记录通过 ES Wrapper Query实现对6.x版本中 Java high-level transport client对json DSL查询对支持。</p>\\n</blockquote>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
