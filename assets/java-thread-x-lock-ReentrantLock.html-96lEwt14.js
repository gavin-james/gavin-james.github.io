const e=JSON.parse('{"key":"v-5f3a45a5","path":"/java/thread/java-thread-x-lock-ReentrantLock.html","title":"JUC锁: ReentrantLock详解","lang":"zh-CN","frontmatter":{"date":"2022-03-03T00:00:00.000Z","category":["Java 多线程"],"tag":["Java 多线程"],"description":"JUC锁: ReentrantLock详解 可重入锁ReentrantLock的底层是通过AbstractQueuedSynchronizer实现，所以先要学习上一章节AbstractQueuedSynchronizer详解。 带着BAT大厂的面试问题去理解 提示 请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。 什么是可重入，什么是可重入锁? 它用来解决什么问题? ReentrantLock的核心是AQS，那么它怎么来实现的，继承吗? 说说其类内部结构关系。 ReentrantLock是如何实现公平锁的? ReentrantLock是如何实现非公平锁的? ReentrantLock默认实现的是公平还是非公平锁? 使用ReentrantLock实现公平和非公平锁的示例? ReentrantLock和Synchronized的对比?","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/java/thread/java-thread-x-lock-ReentrantLock.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"JUC锁: ReentrantLock详解"}],["meta",{"property":"og:description","content":"JUC锁: ReentrantLock详解 可重入锁ReentrantLock的底层是通过AbstractQueuedSynchronizer实现，所以先要学习上一章节AbstractQueuedSynchronizer详解。 带着BAT大厂的面试问题去理解 提示 请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。 什么是可重入，什么是可重入锁? 它用来解决什么问题? ReentrantLock的核心是AQS，那么它怎么来实现的，继承吗? 说说其类内部结构关系。 ReentrantLock是如何实现公平锁的? ReentrantLock是如何实现非公平锁的? ReentrantLock默认实现的是公平还是非公平锁? 使用ReentrantLock实现公平和非公平锁的示例? ReentrantLock和Synchronized的对比?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-25T08:42:25.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java 多线程"}],["meta",{"property":"article:published_time","content":"2022-03-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-25T08:42:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JUC锁: ReentrantLock详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-03-03T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-25T08:42:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"带着BAT大厂的面试问题去理解","slug":"带着bat大厂的面试问题去理解","link":"#带着bat大厂的面试问题去理解","children":[]},{"level":2,"title":"ReentrantLock源码分析","slug":"reentrantlock源码分析","link":"#reentrantlock源码分析","children":[{"level":3,"title":"类的继承关系","slug":"类的继承关系","link":"#类的继承关系","children":[]},{"level":3,"title":"类的内部类","slug":"类的内部类","link":"#类的内部类","children":[]},{"level":3,"title":"类的属性","slug":"类的属性","link":"#类的属性","children":[]},{"level":3,"title":"类的构造函数","slug":"类的构造函数","link":"#类的构造函数","children":[]},{"level":3,"title":"核心函数分析","slug":"核心函数分析","link":"#核心函数分析","children":[]}]},{"level":2,"title":"示例分析","slug":"示例分析","link":"#示例分析","children":[{"level":3,"title":"公平锁","slug":"公平锁","link":"#公平锁","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1687917370000,"updatedTime":1703493745000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":8.52,"words":2557},"filePathRelative":"java/thread/java-thread-x-lock-ReentrantLock.md","localizedDate":"2022年3月3日","excerpt":"<h1> JUC锁: ReentrantLock详解</h1>\\n<blockquote>\\n<p>可重入锁ReentrantLock的底层是通过AbstractQueuedSynchronizer实现，所以先要学习上一章节AbstractQueuedSynchronizer详解。</p>\\n</blockquote>\\n<h2> 带着BAT大厂的面试问题去理解</h2>\\n<blockquote>\\n<p>提示</p>\\n<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>\\n</blockquote>\\n<ul>\\n<li>什么是可重入，什么是可重入锁? 它用来解决什么问题?</li>\\n<li>ReentrantLock的核心是AQS，那么它怎么来实现的，继承吗? 说说其类内部结构关系。</li>\\n<li>ReentrantLock是如何实现公平锁的?</li>\\n<li>ReentrantLock是如何实现非公平锁的?</li>\\n<li>ReentrantLock默认实现的是公平还是非公平锁?</li>\\n<li>使用ReentrantLock实现公平和非公平锁的示例?</li>\\n<li>ReentrantLock和Synchronized的对比?</li>\\n</ul>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
