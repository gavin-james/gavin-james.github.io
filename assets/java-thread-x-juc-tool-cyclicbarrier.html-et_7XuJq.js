const e=JSON.parse('{"key":"v-6d0d4f46","path":"/java/thread/java-thread-x-juc-tool-cyclicbarrier.html","title":"JUC工具类: CyclicBarrier详解","lang":"zh-CN","frontmatter":{"date":"2022-03-14T00:00:00.000Z","category":["Java 多线程"],"tag":["Java 多线程"],"description":"JUC工具类: CyclicBarrier详解 CyclicBarrier底层是基于ReentrantLock和AbstractQueuedSynchronizer来实现的, 在理解的时候最好和CountDownLatch放在一起理解(相见本文分析)。 带着BAT大厂的面试问题去理解 提示 请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。 什么是CyclicBarrier? CyclicBarrier底层实现原理? CountDownLatch和CyclicBarrier对比? CyclicBarrier的核心函数有哪些? CyclicBarrier适用于什么场景?","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/java/thread/java-thread-x-juc-tool-cyclicbarrier.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"JUC工具类: CyclicBarrier详解"}],["meta",{"property":"og:description","content":"JUC工具类: CyclicBarrier详解 CyclicBarrier底层是基于ReentrantLock和AbstractQueuedSynchronizer来实现的, 在理解的时候最好和CountDownLatch放在一起理解(相见本文分析)。 带着BAT大厂的面试问题去理解 提示 请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。 什么是CyclicBarrier? CyclicBarrier底层实现原理? CountDownLatch和CyclicBarrier对比? CyclicBarrier的核心函数有哪些? CyclicBarrier适用于什么场景?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-25T08:42:25.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java 多线程"}],["meta",{"property":"article:published_time","content":"2022-03-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-25T08:42:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JUC工具类: CyclicBarrier详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-03-14T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-25T08:42:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"带着BAT大厂的面试问题去理解","slug":"带着bat大厂的面试问题去理解","link":"#带着bat大厂的面试问题去理解","children":[]},{"level":2,"title":"CyclicBarrier简介","slug":"cyclicbarrier简介","link":"#cyclicbarrier简介","children":[]},{"level":2,"title":"CyclicBarrier源码分析","slug":"cyclicbarrier源码分析","link":"#cyclicbarrier源码分析","children":[{"level":3,"title":"类的继承关系","slug":"类的继承关系","link":"#类的继承关系","children":[]},{"level":3,"title":"类的属性","slug":"类的属性","link":"#类的属性","children":[]},{"level":3,"title":"类的构造函数","slug":"类的构造函数","link":"#类的构造函数","children":[]},{"level":3,"title":"核心函数 - dowait函数","slug":"核心函数-dowait函数","link":"#核心函数-dowait函数","children":[]},{"level":3,"title":"核心函数 - nextGeneration函数","slug":"核心函数-nextgeneration函数","link":"#核心函数-nextgeneration函数","children":[]},{"level":3,"title":"breakBarrier函数","slug":"breakbarrier函数","link":"#breakbarrier函数","children":[]}]},{"level":2,"title":"CyclicBarrier示例","slug":"cyclicbarrier示例","link":"#cyclicbarrier示例","children":[]},{"level":2,"title":"和CountDonwLatch再对比","slug":"和countdonwlatch再对比","link":"#和countdonwlatch再对比","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1687917370000,"updatedTime":1703493745000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":10.78,"words":3235},"filePathRelative":"java/thread/java-thread-x-juc-tool-cyclicbarrier.md","localizedDate":"2022年3月14日","excerpt":"<h1> JUC工具类: CyclicBarrier详解</h1>\\n<blockquote>\\n<p>CyclicBarrier底层是基于ReentrantLock和AbstractQueuedSynchronizer来实现的, 在理解的时候最好和CountDownLatch放在一起理解(相见本文分析)。</p>\\n</blockquote>\\n<h2> 带着BAT大厂的面试问题去理解</h2>\\n<blockquote>\\n<p>提示</p>\\n<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>\\n</blockquote>\\n<ul>\\n<li>什么是CyclicBarrier?</li>\\n<li>CyclicBarrier底层实现原理?</li>\\n<li>CountDownLatch和CyclicBarrier对比?</li>\\n<li>CyclicBarrier的核心函数有哪些?</li>\\n<li>CyclicBarrier适用于什么场景?</li>\\n</ul>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};