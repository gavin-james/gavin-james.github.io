const e=JSON.parse('{"key":"v-336c63aa","path":"/db/nosql-mongo/postgresql-replace.html","title":"MongoDB 替换方案之PostgreSQL","lang":"zh-CN","frontmatter":{"date":"2022-07-23T00:00:00.000Z","category":["NoSQL MongoDB"],"tag":["NoSQL MongoDB"],"description":"MongoDB 替换方案之PostgreSQL MongoDB 宣布其开源许可证从 GNU AGPLv3 切换到 Server Side Public License (SSPL), SSPL 明确要求托管 MongoDB 实例的云计算公司要么获取商业许可证要么向社区开源其服务代码。导致了一些商业公司为了规避风险，弃用MongoDB转而投入其它NoSQL方案。本文主要调研PostgreSQL替换MongoDB方案。 关于MongoDB V3版本证书 MongoDB 宣布其开源许可证从 GNU AGPLv3 切换到 Server Side Public License (SSPL)。新许可证将适用于新版本的 MongoDB Community Server 以及打过补丁的旧版本。AGPLv3 和 SSPL 在自由使用、自由修改和重新分发代码上没有区别。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/nosql-mongo/postgresql-replace.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"MongoDB 替换方案之PostgreSQL"}],["meta",{"property":"og:description","content":"MongoDB 替换方案之PostgreSQL MongoDB 宣布其开源许可证从 GNU AGPLv3 切换到 Server Side Public License (SSPL), SSPL 明确要求托管 MongoDB 实例的云计算公司要么获取商业许可证要么向社区开源其服务代码。导致了一些商业公司为了规避风险，弃用MongoDB转而投入其它NoSQL方案。本文主要调研PostgreSQL替换MongoDB方案。 关于MongoDB V3版本证书 MongoDB 宣布其开源许可证从 GNU AGPLv3 切换到 Server Side Public License (SSPL)。新许可证将适用于新版本的 MongoDB Community Server 以及打过补丁的旧版本。AGPLv3 和 SSPL 在自由使用、自由修改和重新分发代码上没有区别。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:34:19.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"NoSQL MongoDB"}],["meta",{"property":"article:published_time","content":"2022-07-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:34:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB 替换方案之PostgreSQL\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-07-23T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:34:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"关于MongoDB V3版本证书","slug":"关于mongodb-v3版本证书","link":"#关于mongodb-v3版本证书","children":[]},{"level":2,"title":"PostgreSQL与MongoDB对比","slug":"postgresql与mongodb对比","link":"#postgresql与mongodb对比","children":[{"level":3,"title":"支持的数据类型","slug":"支持的数据类型","link":"#支持的数据类型","children":[]},{"level":3,"title":"性能对比","slug":"性能对比","link":"#性能对比","children":[]}]},{"level":2,"title":"PostgreSQL搭建","slug":"postgresql搭建","link":"#postgresql搭建","children":[{"level":3,"title":"服务端 - 下载","slug":"服务端-下载","link":"#服务端-下载","children":[]},{"level":3,"title":"客户端 - pgAdmin4","slug":"客户端-pgadmin4","link":"#客户端-pgadmin4","children":[]}]},{"level":2,"title":"PostgreSQL 开发使用的例子","slug":"postgresql-开发使用的例子","link":"#postgresql-开发使用的例子","children":[{"level":3,"title":"纯SQL例子","slug":"纯sql例子","link":"#纯sql例子","children":[]},{"level":3,"title":"包含NoSQL（JsonB）例子","slug":"包含nosql-jsonb-例子","link":"#包含nosql-jsonb-例子","children":[]}]},{"level":2,"title":"PostgreSQL 推荐资料","slug":"postgresql-推荐资料","link":"#postgresql-推荐资料","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703579659000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":10.17,"words":3051},"filePathRelative":"db/nosql-mongo/postgresql-replace.md","localizedDate":"2022年7月23日","excerpt":"<h1> MongoDB 替换方案之PostgreSQL</h1>\\n<blockquote>\\n<p>MongoDB 宣布其开源许可证从 GNU AGPLv3 切换到 Server Side Public License (SSPL), SSPL 明确要求托管 MongoDB 实例的云计算公司要么获取商业许可证要么向社区开源其服务代码。导致了一些商业公司为了规避风险，弃用MongoDB转而投入其它NoSQL方案。本文主要调研PostgreSQL替换MongoDB方案。</p>\\n</blockquote>\\n<h2> 关于MongoDB V3版本证书</h2>\\n<blockquote>\\n<p>MongoDB 宣布其开源许可证从 GNU AGPLv3 切换到 Server Side Public License (SSPL)。新许可证将适用于新版本的 MongoDB Community Server 以及打过补丁的旧版本。AGPLv3 和 SSPL 在自由使用、自由修改和重新分发代码上没有区别。</p>\\n</blockquote>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
