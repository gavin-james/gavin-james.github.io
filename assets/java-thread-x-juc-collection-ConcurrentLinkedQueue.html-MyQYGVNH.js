const e=JSON.parse('{"key":"v-37193a74","path":"/java/thread/java-thread-x-juc-collection-ConcurrentLinkedQueue.html","title":"JUC集合: ConcurrentLinkedQueue详解","lang":"zh-CN","frontmatter":{"date":"2022-03-07T00:00:00.000Z","category":["Java 多线程"],"tag":["Java 多线程"],"description":"JUC集合: ConcurrentLinkedQueue详解 ConcurerntLinkedQueue一个基于链接节点的无界线程安全队列。此队列按照 FIFO(先进先出)原则对元素进行排序。队列的头部是队列中时间最长的元素。队列的尾部 是队列中时间最短的元素。新的元素插入到队列的尾部，队列获取操作从队列头部获得元素。当多个线程共享访问一个公共 collection 时，ConcurrentLinkedQueue是一个恰当的选择。此队列不允许使用null元素。 带着BAT大厂的面试问题去理解","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/java/thread/java-thread-x-juc-collection-ConcurrentLinkedQueue.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"JUC集合: ConcurrentLinkedQueue详解"}],["meta",{"property":"og:description","content":"JUC集合: ConcurrentLinkedQueue详解 ConcurerntLinkedQueue一个基于链接节点的无界线程安全队列。此队列按照 FIFO(先进先出)原则对元素进行排序。队列的头部是队列中时间最长的元素。队列的尾部 是队列中时间最短的元素。新的元素插入到队列的尾部，队列获取操作从队列头部获得元素。当多个线程共享访问一个公共 collection 时，ConcurrentLinkedQueue是一个恰当的选择。此队列不允许使用null元素。 带着BAT大厂的面试问题去理解"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-25T08:42:25.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java 多线程"}],["meta",{"property":"article:published_time","content":"2022-03-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-25T08:42:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JUC集合: ConcurrentLinkedQueue详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-03-07T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-25T08:42:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"带着BAT大厂的面试问题去理解","slug":"带着bat大厂的面试问题去理解","link":"#带着bat大厂的面试问题去理解","children":[]},{"level":2,"title":"ConcurrentLinkedQueue数据结构","slug":"concurrentlinkedqueue数据结构","link":"#concurrentlinkedqueue数据结构","children":[]},{"level":2,"title":"ConcurrentLinkedQueue源码分析","slug":"concurrentlinkedqueue源码分析","link":"#concurrentlinkedqueue源码分析","children":[{"level":3,"title":"类的继承关系","slug":"类的继承关系","link":"#类的继承关系","children":[]},{"level":3,"title":"类的内部类","slug":"类的内部类","link":"#类的内部类","children":[]},{"level":3,"title":"类的属性","slug":"类的属性","link":"#类的属性","children":[]},{"level":3,"title":"类的构造函数","slug":"类的构造函数","link":"#类的构造函数","children":[]},{"level":3,"title":"核心函数分析","slug":"核心函数分析","link":"#核心函数分析","children":[]}]},{"level":2,"title":"ConcurrentLinkedQueue示例","slug":"concurrentlinkedqueue示例","link":"#concurrentlinkedqueue示例","children":[]},{"level":2,"title":"再深入理解","slug":"再深入理解","link":"#再深入理解","children":[{"level":3,"title":"HOPS(延迟更新的策略)的设计","slug":"hops-延迟更新的策略-的设计","link":"#hops-延迟更新的策略-的设计","children":[]},{"level":3,"title":"ConcurrentLinkedQueue适合的场景","slug":"concurrentlinkedqueue适合的场景","link":"#concurrentlinkedqueue适合的场景","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1687917370000,"updatedTime":1703493745000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":12.04,"words":3611},"filePathRelative":"java/thread/java-thread-x-juc-collection-ConcurrentLinkedQueue.md","localizedDate":"2022年3月7日","excerpt":"<h1> JUC集合: ConcurrentLinkedQueue详解</h1>\\n<blockquote>\\n<p>ConcurerntLinkedQueue一个基于链接节点的无界线程安全队列。此队列按照 FIFO(先进先出)原则对元素进行排序。队列的头部是队列中时间最长的元素。队列的尾部 是队列中时间最短的元素。新的元素插入到队列的尾部，队列获取操作从队列头部获得元素。当多个线程共享访问一个公共 collection 时，ConcurrentLinkedQueue是一个恰当的选择。此队列不允许使用null元素。</p>\\n</blockquote>\\n<h2> 带着BAT大厂的面试问题去理解</h2>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};