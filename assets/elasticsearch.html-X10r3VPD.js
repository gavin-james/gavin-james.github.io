import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as a,o as c,c as r,a as l,b as i,d as s,f as o}from"./app-DmnHa7HT.js";const n={},u=o('<h1 id="♥elasticsearch知识体系详解♥" tabindex="-1"><a class="header-anchor" href="#♥elasticsearch知识体系详解♥" aria-hidden="true">#</a> ♥ElasticSearch知识体系详解♥</h1><blockquote><p>本系列主要对ElasticSearch知识体系进行详解。</p></blockquote><h2 id="知识体系" tabindex="-1"><a class="header-anchor" href="#知识体系" aria-hidden="true">#</a> 知识体系</h2><p><em>相关文章</em></p><blockquote><p>首先，我们通过学习ElasticSearch的概念基础，了解Elastic Stack生态和场景方案。</p></blockquote><ul><li>ES详解 - 认知：ElasticSearch基础概念 <ul><li>在学习ElasticSearch之前，先简单了解下ES流行度，使用背景，以及相关概念等</li></ul></li><li>ES详解 - 认知：Elastic Stack生态和场景方案 <ul><li>在了解ElaticSearch之后，我们还要了解Elastic背后的生态即我们常说的ELK；与此同时，还会给你展示ElasticSearch的案例场景，让你在学习ES前对它有个全局的印象。</li></ul></li></ul><blockquote><p>然后，搭建ElasticSearch和Kibana，进而从查询和聚合的角度入门学习。</p></blockquote><ul><li>ES详解 - 安装：ElasticSearch和Kibana安装 <ul><li>了解完ElasticSearch基础和Elastic Stack生态后，我们便可以开始学习使用ElastiSearch了。所以本文主要介绍ElasticSearch和Kibana的安装。</li></ul></li><li>ES详解 - 入门：查询和聚合的基础使用 <ul><li>安装完ElasticSearch 和 Kibana后，为了快速上手，我们通过官网GitHub提供的一个数据进行入门学习，主要包括<strong>查询数据</strong>和<strong>聚合数据</strong>。</li></ul></li></ul><blockquote><p>入门后，需要从两大方面深入ElasticSearch常用功能：第一方面是<strong>索引</strong>管理；第二方面是<strong>查询</strong>和<strong>聚合</strong>。</p></blockquote><ul><li>ES详解 - 索引：索引管理详解 <ul><li>了解基本使用后，我们从索引操作的角度看看如何对索引进行管理。</li></ul></li><li>ES详解 - 索引：索引模板(Index Template)详解 <ul><li>前文介绍了索引的一些操作，特别是手动创建索引，但是批量和脚本化必然需要提供一种模板方式快速构建和管理索引，这就是本文要介绍的索引模板(Index Template)，它是一种告诉Elasticsearch在创建索引时如何配置索引的方法。为了更好的复用性，在7.8中还引入了组件模板。</li></ul></li><li>ES详解 - 查询：DSL查询之复合查询详解 <ul><li>在查询中会有多种条件组合的查询，在ElasticSearch中叫复合查询。它提供了5种复合查询方式：<strong>bool query(布尔查询)</strong>、<strong>boosting query(提高查询)</strong>、<strong>constant_score（固定分数查询）</strong>、<strong>dis_max(最佳匹配查询）</strong>、<strong>function_score(函数查询）</strong>。</li></ul></li><li>ES详解 - 查询：DSL查询之全文搜索详解 <ul><li>DSL查询极为常用的是对文本进行搜索，我们叫全文搜索，本文主要对全文搜索进行详解。</li></ul></li><li>ES详解 - 查询：DSL查询之Term详解 <ul><li>DSL查询另一种极为常用的是对词项进行搜索，官方文档中叫”term level“查询，本文主要对term level搜索进行详解。</li></ul></li><li>ES详解 - 聚合：聚合查询之Bucket聚合详解 <ul><li>除了查询之外，最常用的聚合了，ElasticSearch提供了三种聚合方式： <strong>桶聚合（Bucket Aggregation)</strong>，<strong>指标聚合（Metric Aggregation)</strong> 和 <strong>管道聚合（Pipline Aggregation)</strong>，本文主要介绍桶聚合（Bucket Aggregation)。</li></ul></li><li>ES详解 - 聚合：聚合查询之Metric聚合详解 <ul><li>前文主要讲了 ElasticSearch提供的三种聚合方式之桶聚合（Bucket Aggregation)，本文主要讲讲指标聚合（Metric Aggregation)。</li></ul></li><li>ES详解 - 聚合：聚合查询之Pipline聚合详解 <ul><li>前文主要讲了 ElasticSearch提供的三种聚合方式之指标聚合（Metric Aggregation)，本文主要讲讲管道聚合（Pipeline Aggregation)。</li></ul></li></ul><blockquote><p>进一步进阶，了解并深入ElasticSearch底层的原理等。</p></blockquote><ul><li>ES详解 - 原理：从图解构筑对ES原理的初步认知 <ul><li>在学习ElasticSearch原理时，我推荐你先通过官方博客中的一篇图解文章(虽然是基于2.x版本）来构筑对ES的初步认知（这种认识是体系上的快速认知）。</li></ul></li><li>ES详解 - 原理：ES原理知识点补充和整体结构 <ul><li>通过上文图解了解了ES整体的原理后，我们便可以基于此知识体系下梳理下ES的整体结构以及相关的知识点， 这将帮助你更好的ElasticSearch索引文档和搜索文档的原理。</li></ul></li><li>ES详解 - 原理：ES原理之索引文档流程详解 <ul><li>ElasticSearch中最重要原理是文档的索引和文档的读取，本文带你理解ES文档的索引过程。</li></ul></li><li>ES详解 - 原理：ES原理之读取文档流程详解 <ul><li>ElasticSearch中最重要原理是文档的索引和文档的读取，前文介绍了索引文档流程，本文带你理解ES文档的读取过程。</li></ul></li></ul><blockquote><p>最后，学习ElasticSearch实践，大厂经验，运维，资料等。</p></blockquote>',13),E=l("li",null,[i("ES详解 - 优化：ElasticSearch性能优化详解 "),l("ul",null,[l("li",null,"Elasticsearch 作为一个开箱即用的产品，在生产环境上线之后，我们其实不一定能确保其的性能和稳定性。如何根据实际情况提高服务的性能，其实有很多技巧。这章我们分享从实战经验中总结出来的 elasticsearch 性能优化，主要从硬件配置优化、索引优化设置、查询方面优化、数据结构优化、集群架构优化等方面讲解。")])],-1),S=l("li",null,[i("大厂实践 - 哈啰：记录一次ElasticSearch的查询性能优化 "),l("ul",null,[l("li",null,"再分享一篇哈啰单车技术团队对ElasticSearch的查询性能优化的分析文章。")])],-1),h=l("li",null,[i("大厂实践 - 腾讯：腾讯万亿级 Elasticsearch 技术实践 "),l("ul",null,[l("li",null,"腾讯在ES优化上非常具备参考价值，本文来源于腾讯相关团队的技术分享。Elasticsearch 在腾讯内部广泛应用于日志实时分析、结构化数据分析、全文检索等场景，目前单集群规模达到千级节点、万亿级吞吐，同时腾讯联合 Elastic 公司在腾讯云上提供了内核增强版 ES 云服务。海量规模、丰富的应用场景推动着腾讯对原生 ES 进行持续的高可用、高性能、低成本等全方位优化。本次分享主要剖析腾讯对 Elasticsearch 海量规模下的内核优化与实践，希望能和广大 ES 爱好者共同探讨推动 ES 技术的发展。")])],-1),g={href:"https://github.com/dzharii/awesome-elasticsearch",target:"_blank",rel:"noopener noreferrer"},_=l("li",null,[l("a",{href:""},"ElasticSearch - WrapperQuery")],-1),d=l("li",null,[l("a",{href:""},"ElasticSearch - 备份和迁移")],-1);function p(b,k){const e=a("ExternalLinkIcon");return c(),r("div",null,[u,l("ul",null,[E,S,h,l("li",null,[i("ES详解 - 资料：Awesome Elasticsearch "),l("ul",null,[l("li",null,[i("本文来自 "),l("a",g,[i("GitHub Awesome Elasticsearch 项目在新窗口打开"),s(e)]),i(", 搜集ElasticSearch相关的优秀资料。")])])]),_,d])])}const q=t(n,[["render",p],["__file","elasticsearch.html.vue"]]);export{q as default};
