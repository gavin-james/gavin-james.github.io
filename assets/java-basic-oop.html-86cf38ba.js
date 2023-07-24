const e=JSON.parse('{"key":"v-29e9d384","path":"/java/basic/java-basic-oop.html","title":"面向对象","lang":"zh-CN","frontmatter":{"date":"2022-02-03T00:00:00.000Z","category":["Java 基础"],"tag":["Java 基础"],"description":"面向对象 本文主要介绍Java OOP 面向对象基础和相关类图。 三大特性 封装 利用抽象数据类型将数据和基于数据的操作封装在一起，使其构成一个不可分割的独立实体。数据被保护在抽象数据类型的内部，尽可能地隐藏内部的细节，只保留一些对外接口使之与外部发生联系。用户无需知道对象内部的细节，但可以通过对象对外提供的接口来访问该对象。 优点: 减少耦合: 可以独立地开发、测试、优化、使用、理解和修改 减轻维护的负担: 可以更容易被程序员理解，并且在调试的时候可以不影响其他模块 有效地调节性能: 可以通过剖析确定哪些模块影响了系统的性能 提高软件的可重用性 降低了构建大型系统的风险: 即使整个系统不可用，但是这些独立的模块却有可能是可用的","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/java/basic/java-basic-oop.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"面向对象"}],["meta",{"property":"og:description","content":"面向对象 本文主要介绍Java OOP 面向对象基础和相关类图。 三大特性 封装 利用抽象数据类型将数据和基于数据的操作封装在一起，使其构成一个不可分割的独立实体。数据被保护在抽象数据类型的内部，尽可能地隐藏内部的细节，只保留一些对外接口使之与外部发生联系。用户无需知道对象内部的细节，但可以通过对象对外提供的接口来访问该对象。 优点: 减少耦合: 可以独立地开发、测试、优化、使用、理解和修改 减轻维护的负担: 可以更容易被程序员理解，并且在调试的时候可以不影响其他模块 有效地调节性能: 可以通过剖析确定哪些模块影响了系统的性能 提高软件的可重用性 降低了构建大型系统的风险: 即使整个系统不可用，但是这些独立的模块却有可能是可用的"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-24T01:04:58.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java 基础"}],["meta",{"property":"article:published_time","content":"2022-02-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-24T01:04:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"面向对象\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-02-03T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-24T01:04:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"三大特性","slug":"三大特性","link":"#三大特性","children":[{"level":3,"title":"封装","slug":"封装","link":"#封装","children":[]},{"level":3,"title":"继承","slug":"继承","link":"#继承","children":[]},{"level":3,"title":"多态","slug":"多态","link":"#多态","children":[]}]},{"level":2,"title":"类图","slug":"类图","link":"#类图","children":[{"level":3,"title":"泛化关系 (Generalization)","slug":"泛化关系-generalization","link":"#泛化关系-generalization","children":[]},{"level":3,"title":"实现关系 (Realization)","slug":"实现关系-realization","link":"#实现关系-realization","children":[]},{"level":3,"title":"聚合关系 (Aggregation)","slug":"聚合关系-aggregation","link":"#聚合关系-aggregation","children":[]},{"level":3,"title":"组合关系 (Composition)","slug":"组合关系-composition","link":"#组合关系-composition","children":[]},{"level":3,"title":"关联关系 (Association)","slug":"关联关系-association","link":"#关联关系-association","children":[]},{"level":3,"title":"依赖关系 (Dependency)","slug":"依赖关系-dependency","link":"#依赖关系-dependency","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1687917370000,"updatedTime":1690160698000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":4.97,"words":1490},"filePathRelative":"java/basic/java-basic-oop.md","localizedDate":"2022年2月3日","excerpt":"<h1> 面向对象</h1>\\n<blockquote>\\n<p>本文主要介绍Java OOP 面向对象基础和相关类图。</p>\\n</blockquote>\\n<h2> 三大特性</h2>\\n<h3> 封装</h3>\\n<p>利用抽象数据类型将数据和基于数据的操作封装在一起，使其构成一个不可分割的独立实体。数据被保护在抽象数据类型的内部，尽可能地隐藏内部的细节，只保留一些对外接口使之与外部发生联系。用户无需知道对象内部的细节，但可以通过对象对外提供的接口来访问该对象。</p>\\n<p>优点:</p>\\n<ul>\\n<li>减少耦合: 可以独立地开发、测试、优化、使用、理解和修改</li>\\n<li>减轻维护的负担: 可以更容易被程序员理解，并且在调试的时候可以不影响其他模块</li>\\n<li>有效地调节性能: 可以通过剖析确定哪些模块影响了系统的性能</li>\\n<li>提高软件的可重用性</li>\\n<li>降低了构建大型系统的风险: 即使整个系统不可用，但是这些独立的模块却有可能是可用的</li>\\n</ul>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
