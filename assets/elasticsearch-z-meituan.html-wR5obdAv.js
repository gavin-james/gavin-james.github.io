const e=JSON.parse('{"key":"v-49b42386","path":"/db/nosql-es/elasticsearch-z-meituan.html","title":"大厂实践 - 美团：美团外卖搜索基于Elasticsearch的优化实践","lang":"zh-CN","frontmatter":{"date":"2022-08-13T00:00:00.000Z","category":["NoSQL ElasticSearch"],"tag":["NoSQL ElasticSearch"],"description":"大厂实践 - 美团：美团外卖搜索基于Elasticsearch的优化实践 美团外卖搜索工程团队在Elasticsearch的优化实践中，基于Location-Based Service（LBS）业务场景对Elasticsearch的查询性能进行优化。该优化基于Run-Length Encoding（RLE）设计了一款高效的倒排索引结构，使检索耗时（TP99）降低了84%。本文从问题分析、技术选型、优化方案等方面进行阐述，并给出最终灰度验证的结论。 1. 前言 最近十年，Elasticsearch 已经成为了最受欢迎的开源检索引擎，其作为离线数仓、近线检索、B端检索的经典基建，已沉淀了大量的实践案例及优化总结。然而在高并发、高可用、大数据量的 C 端场景，目前可参考的资料并不多。因此，我们希望通过分享在外卖搜索场景下的优化实践，能为大家提供 Elasticsearch 优化思路上的一些借鉴。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/nosql-es/elasticsearch-z-meituan.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"大厂实践 - 美团：美团外卖搜索基于Elasticsearch的优化实践"}],["meta",{"property":"og:description","content":"大厂实践 - 美团：美团外卖搜索基于Elasticsearch的优化实践 美团外卖搜索工程团队在Elasticsearch的优化实践中，基于Location-Based Service（LBS）业务场景对Elasticsearch的查询性能进行优化。该优化基于Run-Length Encoding（RLE）设计了一款高效的倒排索引结构，使检索耗时（TP99）降低了84%。本文从问题分析、技术选型、优化方案等方面进行阐述，并给出最终灰度验证的结论。 1. 前言 最近十年，Elasticsearch 已经成为了最受欢迎的开源检索引擎，其作为离线数仓、近线检索、B端检索的经典基建，已沉淀了大量的实践案例及优化总结。然而在高并发、高可用、大数据量的 C 端场景，目前可参考的资料并不多。因此，我们希望通过分享在外卖搜索场景下的优化实践，能为大家提供 Elasticsearch 优化思路上的一些借鉴。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:34:19.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"NoSQL ElasticSearch"}],["meta",{"property":"article:published_time","content":"2022-08-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:34:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"大厂实践 - 美团：美团外卖搜索基于Elasticsearch的优化实践\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-08-13T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:34:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 前言","slug":"_1-前言","link":"#_1-前言","children":[]},{"level":2,"title":"2. 背景","slug":"_2-背景","link":"#_2-背景","children":[]},{"level":2,"title":"3. 挑战及问题","slug":"_3-挑战及问题","link":"#_3-挑战及问题","children":[{"level":3,"title":"3.1 倒排链查询流程","slug":"_3-1-倒排链查询流程","link":"#_3-1-倒排链查询流程","children":[]},{"level":3,"title":"3.2 倒排链合并流程","slug":"_3-2-倒排链合并流程","link":"#_3-2-倒排链合并流程","children":[]}]},{"level":2,"title":"4. 技术探索与实践","slug":"_4-技术探索与实践","link":"#_4-技术探索与实践","children":[{"level":3,"title":"4.1 倒排链查询优化","slug":"_4-1-倒排链查询优化","link":"#_4-1-倒排链查询优化","children":[]},{"level":3,"title":"4.2 倒排链合并","slug":"_4-2-倒排链合并","link":"#_4-2-倒排链合并","children":[]},{"level":3,"title":"4.3 基于 RLE 的倒排格式设计","slug":"_4-3-基于-rle-的倒排格式设计","link":"#_4-3-基于-rle-的倒排格式设计","children":[]},{"level":3,"title":"4.4 功能集成","slug":"_4-4-功能集成","link":"#_4-4-功能集成","children":[]}]},{"level":2,"title":"5. 性能收益","slug":"_5-性能收益","link":"#_5-性能收益","children":[]},{"level":2,"title":"6. 总结与展望","slug":"_6-总结与展望","link":"#_6-总结与展望","children":[]},{"level":2,"title":"7. 作者简介","slug":"_7-作者简介","link":"#_7-作者简介","children":[]},{"level":2,"title":"8. 参考文献","slug":"_8-参考文献","link":"#_8-参考文献","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703579659000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":24.07,"words":7221},"filePathRelative":"db/nosql-es/elasticsearch-z-meituan.md","localizedDate":"2022年8月13日","excerpt":"<h1> 大厂实践 - 美团：美团外卖搜索基于Elasticsearch的优化实践</h1>\\n<blockquote>\\n<p>美团外卖搜索工程团队在Elasticsearch的优化实践中，基于Location-Based Service（LBS）业务场景对Elasticsearch的查询性能进行优化。该优化基于Run-Length Encoding（RLE）设计了一款高效的倒排索引结构，使检索耗时（TP99）降低了84%。本文从问题分析、技术选型、优化方案等方面进行阐述，并给出最终灰度验证的结论。</p>\\n</blockquote>\\n<h2> 1. 前言</h2>\\n<p>最近十年，Elasticsearch 已经成为了最受欢迎的开源检索引擎，其作为离线数仓、近线检索、B端检索的经典基建，已沉淀了大量的实践案例及优化总结。然而在高并发、高可用、大数据量的 C 端场景，目前可参考的资料并不多。因此，我们希望通过分享在外卖搜索场景下的优化实践，能为大家提供 Elasticsearch 优化思路上的一些借鉴。</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};