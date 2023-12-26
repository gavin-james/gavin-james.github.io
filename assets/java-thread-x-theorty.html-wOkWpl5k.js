const e=JSON.parse('{"key":"v-53ba6f7e","path":"/java/thread/java-thread-x-theorty.html","title":"Java 并发 - 理论基础","lang":"zh-CN","frontmatter":{"date":"2022-02-21T00:00:00.000Z","category":["Java 多线程"],"tag":["Java 多线程"],"description":"Java 并发 - 理论基础 本文从理论的角度引入并发安全问题以及JMM应对并发问题的原理。 带着BAT大厂的面试问题去理解 提示 请带着这些问题继续后文，会很大程度上帮助你更好的理解并发理论基础。 多线程的出现是要解决什么问题的? 线程不安全是指什么? 举例说明 并发出现线程不安全的本质什么? 可见性，原子性和有序性。 Java是怎么解决并发问题的? 3个关键字，JMM和8个Happens-Before 线程安全是不是非真即假? 不是 线程安全有哪些实现思路? 如何理解并发和并行的区别?","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/java/thread/java-thread-x-theorty.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"Java 并发 - 理论基础"}],["meta",{"property":"og:description","content":"Java 并发 - 理论基础 本文从理论的角度引入并发安全问题以及JMM应对并发问题的原理。 带着BAT大厂的面试问题去理解 提示 请带着这些问题继续后文，会很大程度上帮助你更好的理解并发理论基础。 多线程的出现是要解决什么问题的? 线程不安全是指什么? 举例说明 并发出现线程不安全的本质什么? 可见性，原子性和有序性。 Java是怎么解决并发问题的? 3个关键字，JMM和8个Happens-Before 线程安全是不是非真即假? 不是 线程安全有哪些实现思路? 如何理解并发和并行的区别?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-25T08:42:25.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java 多线程"}],["meta",{"property":"article:published_time","content":"2022-02-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-25T08:42:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 并发 - 理论基础\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-02-21T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-25T08:42:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"带着BAT大厂的面试问题去理解","slug":"带着bat大厂的面试问题去理解","link":"#带着bat大厂的面试问题去理解","children":[]},{"level":2,"title":"为什么需要多线程","slug":"为什么需要多线程","link":"#为什么需要多线程","children":[]},{"level":2,"title":"线程不安全示例","slug":"线程不安全示例","link":"#线程不安全示例","children":[]},{"level":2,"title":"并发出现问题的根源: 并发三要素","slug":"并发出现问题的根源-并发三要素","link":"#并发出现问题的根源-并发三要素","children":[{"level":3,"title":"可见性: CPU缓存引起","slug":"可见性-cpu缓存引起","link":"#可见性-cpu缓存引起","children":[]},{"level":3,"title":"原子性: 分时复用引起","slug":"原子性-分时复用引起","link":"#原子性-分时复用引起","children":[]},{"level":3,"title":"有序性: 重排序引起","slug":"有序性-重排序引起","link":"#有序性-重排序引起","children":[]}]},{"level":2,"title":"JAVA是怎么解决并发问题的: JMM(Java内存模型)","slug":"java是怎么解决并发问题的-jmm-java内存模型","link":"#java是怎么解决并发问题的-jmm-java内存模型","children":[{"level":3,"title":"关键字: volatile、synchronized 和 final","slug":"关键字-volatile、synchronized-和-final","link":"#关键字-volatile、synchronized-和-final","children":[]},{"level":3,"title":"Happens-Before 规则","slug":"happens-before-规则","link":"#happens-before-规则","children":[]}]},{"level":2,"title":"线程安全: 不是一个非真即假的命题","slug":"线程安全-不是一个非真即假的命题","link":"#线程安全-不是一个非真即假的命题","children":[{"level":3,"title":"1. 不可变","slug":"_1-不可变","link":"#_1-不可变","children":[]},{"level":3,"title":"2. 绝对线程安全","slug":"_2-绝对线程安全","link":"#_2-绝对线程安全","children":[]},{"level":3,"title":"3. 相对线程安全","slug":"_3-相对线程安全","link":"#_3-相对线程安全","children":[]},{"level":3,"title":"4. 线程兼容","slug":"_4-线程兼容","link":"#_4-线程兼容","children":[]},{"level":3,"title":"5. 线程对立","slug":"_5-线程对立","link":"#_5-线程对立","children":[]}]},{"level":2,"title":"线程安全的实现方法","slug":"线程安全的实现方法","link":"#线程安全的实现方法","children":[{"level":3,"title":"1. 互斥同步","slug":"_1-互斥同步","link":"#_1-互斥同步","children":[]},{"level":3,"title":"2. 非阻塞同步","slug":"_2-非阻塞同步","link":"#_2-非阻塞同步","children":[]},{"level":3,"title":"3. 无同步方案","slug":"_3-无同步方案","link":"#_3-无同步方案","children":[]}]}],"git":{"createdTime":1687917370000,"updatedTime":1703493745000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":19.41,"words":5823},"filePathRelative":"java/thread/java-thread-x-theorty.md","localizedDate":"2022年2月21日","excerpt":"<h1> Java 并发 - 理论基础</h1>\\n<blockquote>\\n<p>本文从理论的角度引入并发安全问题以及JMM应对并发问题的原理。</p>\\n</blockquote>\\n<h2> 带着BAT大厂的面试问题去理解</h2>\\n<blockquote>\\n<p>提示</p>\\n<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解并发理论基础。</p>\\n</blockquote>\\n<ul>\\n<li>多线程的出现是要解决什么问题的?</li>\\n<li>线程不安全是指什么? 举例说明</li>\\n<li>并发出现线程不安全的本质什么? 可见性，原子性和有序性。</li>\\n<li>Java是怎么解决并发问题的? 3个关键字，JMM和8个Happens-Before</li>\\n<li>线程安全是不是非真即假? 不是</li>\\n<li>线程安全有哪些实现思路?</li>\\n<li>如何理解并发和并行的区别?</li>\\n</ul>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};