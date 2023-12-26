const e=JSON.parse('{"key":"v-3d4bda3e","path":"/db/nosql-mongo/mongo-y-doc.html","title":"Mongo进阶 - 系统设计：模式构建","lang":"zh-CN","frontmatter":{"date":"2022-07-21T00:00:00.000Z","category":["NoSQL MongoDB"],"tag":["NoSQL MongoDB"],"description":"Mongo进阶 - 系统设计：模式构建 MongoDB使用文档数据模型具有内在的灵活性，允许数据模型支持你的应用程序需求, 灵活性也可能导致模式比它们应有样子的更复杂。这涉及到如何在MongoDB中设计数据库模式（schema），有一个严峻的现实，大多数性能问题都可以追溯到糟糕的模式设计。 前言 当涉及MongoDB时，一个经常被问到的问题是“我如何在MongoDB中为我的应用程序构造模式（schema）？”老实说，这要看情况而定。你的应用程序读操作比写操作多吗？从数据库中读取时需要将哪些数据放在一起？有哪些性能因素需要考虑？文档有多大？它们今后会变成多大？你预计数据会如何增长和扩展？","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/nosql-mongo/mongo-y-doc.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"Mongo进阶 - 系统设计：模式构建"}],["meta",{"property":"og:description","content":"Mongo进阶 - 系统设计：模式构建 MongoDB使用文档数据模型具有内在的灵活性，允许数据模型支持你的应用程序需求, 灵活性也可能导致模式比它们应有样子的更复杂。这涉及到如何在MongoDB中设计数据库模式（schema），有一个严峻的现实，大多数性能问题都可以追溯到糟糕的模式设计。 前言 当涉及MongoDB时，一个经常被问到的问题是“我如何在MongoDB中为我的应用程序构造模式（schema）？”老实说，这要看情况而定。你的应用程序读操作比写操作多吗？从数据库中读取时需要将哪些数据放在一起？有哪些性能因素需要考虑？文档有多大？它们今后会变成多大？你预计数据会如何增长和扩展？"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:34:19.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"NoSQL MongoDB"}],["meta",{"property":"article:published_time","content":"2022-07-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:34:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mongo进阶 - 系统设计：模式构建\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-07-21T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:34:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"模式构建","slug":"模式构建","link":"#模式构建","children":[{"level":3,"title":"多态模式","slug":"多态模式","link":"#多态模式","children":[]},{"level":3,"title":"属性模式","slug":"属性模式","link":"#属性模式","children":[]},{"level":3,"title":"桶模式","slug":"桶模式","link":"#桶模式","children":[]},{"level":3,"title":"异常值模式","slug":"异常值模式","link":"#异常值模式","children":[]},{"level":3,"title":"计算模式","slug":"计算模式","link":"#计算模式","children":[]},{"level":3,"title":"子集模式","slug":"子集模式","link":"#子集模式","children":[]},{"level":3,"title":"扩展引用模式","slug":"扩展引用模式","link":"#扩展引用模式","children":[]},{"level":3,"title":"近似值模式","slug":"近似值模式","link":"#近似值模式","children":[]},{"level":3,"title":"树形模式","slug":"树形模式","link":"#树形模式","children":[]},{"level":3,"title":"预分配模式","slug":"预分配模式","link":"#预分配模式","children":[]},{"level":3,"title":"文档版本控制模式","slug":"文档版本控制模式","link":"#文档版本控制模式","children":[]},{"level":3,"title":"模式版本控制模式","slug":"模式版本控制模式","link":"#模式版本控制模式","children":[]}]},{"level":2,"title":"模式构建小结","slug":"模式构建小结","link":"#模式构建小结","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703579659000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":50.36,"words":15107},"filePathRelative":"db/nosql-mongo/mongo-y-doc.md","localizedDate":"2022年7月21日","excerpt":"<h1> Mongo进阶 - 系统设计：模式构建</h1>\\n<blockquote>\\n<p>MongoDB使用文档数据模型具有内在的灵活性，允许数据模型支持你的应用程序需求, 灵活性也可能导致模式比它们应有样子的更复杂。这涉及到如何在MongoDB中设计数据库模式（schema），有一个严峻的现实，大多数性能问题都可以追溯到糟糕的模式设计。</p>\\n</blockquote>\\n<h2> 前言</h2>\\n<p>当涉及MongoDB时，一个经常被问到的问题是“我如何在MongoDB中为我的应用程序构造模式（schema）？”老实说，这要看情况而定。你的应用程序读操作比写操作多吗？从数据库中读取时需要将哪些数据放在一起？有哪些性能因素需要考虑？文档有多大？它们今后会变成多大？你预计数据会如何增长和扩展？</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
