const e=JSON.parse('{"key":"v-5a65fcf4","path":"/develop/design/flyweight.html","title":"结构型享元模式","lang":"zh-CN","frontmatter":{"title":"结构型享元模式","date":"2019-10-28T00:00:00.000Z","category":["设计模式"],"tag":["设计模式"],"description":"享元模式基本介绍 在面向对象程序设计过程中，有时会面临要创建大量相同或相似对象实例的问题。创建那么多的对象将会耗费很多的系统资源，它是系统性能提高的一个瓶颈。 例如，围棋和五子棋中的黑白棋子，图像中的坐标点或颜色，局域网中的路由器、交换机和集线器，教室里的桌子和凳子等。这些对象有很多相似的地方，如果能把它们相同的部分提取出来共享，则能节省大量的系统资源，这就是享元模式的产生背景。 享元模式（Flyweight Pattern） 也叫 蝇量模式: 运用共享技术有效地支持大量细粒度的对象。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/develop/design/flyweight.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"结构型享元模式"}],["meta",{"property":"og:description","content":"享元模式基本介绍 在面向对象程序设计过程中，有时会面临要创建大量相同或相似对象实例的问题。创建那么多的对象将会耗费很多的系统资源，它是系统性能提高的一个瓶颈。 例如，围棋和五子棋中的黑白棋子，图像中的坐标点或颜色，局域网中的路由器、交换机和集线器，教室里的桌子和凳子等。这些对象有很多相似的地方，如果能把它们相同的部分提取出来共享，则能节省大量的系统资源，这就是享元模式的产生背景。 享元模式（Flyweight Pattern） 也叫 蝇量模式: 运用共享技术有效地支持大量细粒度的对象。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-12T04:14:48.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"设计模式"}],["meta",{"property":"article:published_time","content":"2019-10-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-12T04:14:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"结构型享元模式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-28T00:00:00.000Z\\",\\"dateModified\\":\\"2023-04-12T04:14:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"享元模式基本介绍","slug":"享元模式基本介绍","link":"#享元模式基本介绍","children":[]},{"level":2,"title":"享元模式的结构与实现","slug":"享元模式的结构与实现","link":"#享元模式的结构与实现","children":[{"level":3,"title":"内部状态和外部状态","slug":"内部状态和外部状态","link":"#内部状态和外部状态","children":[]},{"level":3,"title":"模式的结构","slug":"模式的结构","link":"#模式的结构","children":[]}]},{"level":2,"title":"展示网站项目需求","slug":"展示网站项目需求","link":"#展示网站项目需求","children":[]},{"level":2,"title":"传统方案解决网站展现项目","slug":"传统方案解决网站展现项目","link":"#传统方案解决网站展现项目","children":[{"level":3,"title":"问题分析","slug":"问题分析","link":"#问题分析","children":[]}]},{"level":2,"title":"享元模式解决网站展现项目","slug":"享元模式解决网站展现项目","link":"#享元模式解决网站展现项目","children":[]},{"level":2,"title":"JDK-Integer 的享元模式剖析","slug":"jdk-integer-的享元模式剖析","link":"#jdk-integer-的享元模式剖析","children":[]},{"level":2,"title":"享元模式的注意事项和细节","slug":"享元模式的注意事项和细节","link":"#享元模式的注意事项和细节","children":[]},{"level":2,"title":"享元模式的应用场景","slug":"享元模式的应用场景","link":"#享元模式的应用场景","children":[]}],"git":{"createdTime":1681272888000,"updatedTime":1681272888000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":1}]},"readingTime":{"minutes":10.93,"words":3279},"filePathRelative":"develop/design/flyweight.md","localizedDate":"2019年10月28日","excerpt":"<h2> 享元模式基本介绍</h2>\\n<p>在面向对象程序设计过程中，有时会面临要创建大量相同或相似对象实例的问题。创建那么多的对象将会耗费很多的系统资源，它是系统性能提高的一个瓶颈。</p>\\n<p>例如，围棋和五子棋中的黑白棋子，图像中的坐标点或颜色，局域网中的路由器、交换机和集线器，教室里的桌子和凳子等。这些对象有很多相似的地方，如果能把它们相同的部分提取出来共享，则能节省大量的系统资源，这就是享元模式的产生背景。</p>\\n<p><strong>享元模式</strong>（Flyweight Pattern） 也叫 <strong>蝇量模式</strong>: 运用共享技术有效地支持大量细粒度的对象。</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
