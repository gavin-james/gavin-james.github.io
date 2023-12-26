const e=JSON.parse('{"key":"v-edb6b08a","path":"/db/nosql-mongo/mongo-z-rep.html","title":"Mongo进阶 - DB核心：复制集","lang":"zh-CN","frontmatter":{"date":"2022-07-17T00:00:00.000Z","category":["NoSQL MongoDB"],"tag":["NoSQL MongoDB"],"description":"Mongo进阶 - DB核心：复制集 在实际的生产环境中，我们需要考虑数据冗余和高可靠性，即通过在不同的机器上保存副本来保证数据的不会因为单点损坏而丢失；能够随时应对数据丢失、机器损坏带来的风险。MongoDB的复制集就是用来解决这个问题的，一组复制集就是一组mongod实例掌管同一个数据集，实例可以在不同的机器上面。实例中包含一个主导，接受客户端所有的写入操作，其他都是副本实例，从主服务器上获得数据并保持同步。 为什么要引入复制集？ 保证数据在生产部署时的冗余和可靠性，通过在不同的机器上保存副本来保证数据的不会因为单点损坏而丢失。能够随时应对数据丢失、机器损坏带来的风险。换一句话来说，还能提高读取能力，用户的读取服务器和写入服务器在不同的地方，而且，由不同的服务器为不同的用户提供服务，提高整个系统的负载。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/nosql-mongo/mongo-z-rep.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"Mongo进阶 - DB核心：复制集"}],["meta",{"property":"og:description","content":"Mongo进阶 - DB核心：复制集 在实际的生产环境中，我们需要考虑数据冗余和高可靠性，即通过在不同的机器上保存副本来保证数据的不会因为单点损坏而丢失；能够随时应对数据丢失、机器损坏带来的风险。MongoDB的复制集就是用来解决这个问题的，一组复制集就是一组mongod实例掌管同一个数据集，实例可以在不同的机器上面。实例中包含一个主导，接受客户端所有的写入操作，其他都是副本实例，从主服务器上获得数据并保持同步。 为什么要引入复制集？ 保证数据在生产部署时的冗余和可靠性，通过在不同的机器上保存副本来保证数据的不会因为单点损坏而丢失。能够随时应对数据丢失、机器损坏带来的风险。换一句话来说，还能提高读取能力，用户的读取服务器和写入服务器在不同的地方，而且，由不同的服务器为不同的用户提供服务，提高整个系统的负载。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:34:19.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"NoSQL MongoDB"}],["meta",{"property":"article:published_time","content":"2022-07-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:34:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mongo进阶 - DB核心：复制集\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-07-17T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:34:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"为什么要引入复制集？","slug":"为什么要引入复制集","link":"#为什么要引入复制集","children":[]},{"level":2,"title":"复制集有哪些成员？","slug":"复制集有哪些成员","link":"#复制集有哪些成员","children":[{"level":3,"title":"基本成员","slug":"基本成员","link":"#基本成员","children":[]},{"level":3,"title":"主节点（Primary）的细化","slug":"主节点-primary-的细化","link":"#主节点-primary-的细化","children":[]}]},{"level":2,"title":"复制集常见部署架构？","slug":"复制集常见部署架构","link":"#复制集常见部署架构","children":[{"level":3,"title":"基础三节点","slug":"基础三节点","link":"#基础三节点","children":[]},{"level":3,"title":"跨数据中心","slug":"跨数据中心","link":"#跨数据中心","children":[]}]},{"level":2,"title":"复制集是如何保证数据高可用的？","slug":"复制集是如何保证数据高可用的","link":"#复制集是如何保证数据高可用的","children":[{"level":3,"title":"选举机制","slug":"选举机制","link":"#选举机制","children":[]},{"level":3,"title":"故障转移期间的回滚","slug":"故障转移期间的回滚","link":"#故障转移期间的回滚","children":[]}]},{"level":2,"title":"复制集中的OptLog","slug":"复制集中的optlog","link":"#复制集中的optlog","children":[{"level":3,"title":"什么是OptLog","slug":"什么是optlog","link":"#什么是optlog","children":[]},{"level":3,"title":"在设计OptLog时要考虑什么","slug":"在设计optlog时要考虑什么","link":"#在设计optlog时要考虑什么","children":[]}]},{"level":2,"title":"复制集中的数据同步","slug":"复制集中的数据同步","link":"#复制集中的数据同步","children":[{"level":3,"title":"初始同步(Initial Sync)","slug":"初始同步-initial-sync","link":"#初始同步-initial-sync","children":[]},{"level":3,"title":"复制(Replication)","slug":"复制-replication","link":"#复制-replication","children":[]},{"level":3,"title":"注意事项","slug":"注意事项","link":"#注意事项","children":[]}]},{"level":2,"title":"复制集读写关注(concern)","slug":"复制集读写关注-concern","link":"#复制集读写关注-concern","children":[{"level":3,"title":"读的优先级(Read Preference)","slug":"读的优先级-read-preference","link":"#读的优先级-read-preference","children":[]},{"level":3,"title":"Write Concern","slug":"write-concern","link":"#write-concern","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703579659000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":16.78,"words":5034},"filePathRelative":"db/nosql-mongo/mongo-z-rep.md","localizedDate":"2022年7月17日","excerpt":"<h1> Mongo进阶 - DB核心：复制集</h1>\\n<blockquote>\\n<p>在实际的生产环境中，我们需要考虑<strong>数据冗余和高可靠性</strong>，即通过在不同的机器上保存副本来保证数据的不会因为单点损坏而丢失；能够随时应对数据丢失、机器损坏带来的风险。MongoDB的复制集就是用来解决这个问题的，一组复制集就是一组mongod实例掌管同一个数据集，实例可以在不同的机器上面。实例中包含一个主导，接受客户端所有的写入操作，其他都是副本实例，从主服务器上获得数据并保持同步。</p>\\n</blockquote>\\n<h2> 为什么要引入复制集？</h2>\\n<blockquote>\\n<p>保证数据在生产部署时的<strong>冗余和可靠性</strong>，通过在不同的机器上保存副本来保证数据的不会因为单点损坏而丢失。能够随时应对数据丢失、机器损坏带来的风险。换一句话来说，还能提高读取能力，用户的读取服务器和写入服务器在不同的地方，而且，由不同的服务器为不同的用户提供服务，提高整个系统的负载。</p>\\n</blockquote>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
