const e=JSON.parse('{"key":"v-680a9b6e","path":"/java/thread/java-thread-x-lock-ReentrantReadWriteLock.html","title":"JUC锁: ReentrantReadWriteLock详解","lang":"zh-CN","frontmatter":{"date":"2022-03-04T00:00:00.000Z","category":["Java 多线程"],"tag":["Java 多线程"],"description":"JUC锁: ReentrantReadWriteLock详解 ReentrantReadWriteLock表示可重入读写锁，ReentrantReadWriteLock中包含了两种锁，读锁ReadLock和写锁WriteLock，可以通过这两种锁实现线程间的同步。 带着BAT大厂的面试问题去理解 提示 请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。 为了有了ReentrantLock还需要ReentrantReadWriteLock? ReentrantReadWriteLock底层实现原理? ReentrantReadWriteLock底层读写状态如何设计的? 高16位为读锁，低16位为写锁 读锁和写锁的最大数量是多少? 本地线程计数器ThreadLocalHoldCounter是用来做什么的? 缓存计数器HoldCounter是用来做什么的? 写锁的获取与释放是怎么实现的? 读锁的获取与释放是怎么实现的? RentrantReadWriteLock为什么不支持锁升级? 什么是锁的升降级? RentrantReadWriteLock为什么不支持锁升级?","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/java/thread/java-thread-x-lock-ReentrantReadWriteLock.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"JUC锁: ReentrantReadWriteLock详解"}],["meta",{"property":"og:description","content":"JUC锁: ReentrantReadWriteLock详解 ReentrantReadWriteLock表示可重入读写锁，ReentrantReadWriteLock中包含了两种锁，读锁ReadLock和写锁WriteLock，可以通过这两种锁实现线程间的同步。 带着BAT大厂的面试问题去理解 提示 请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。 为了有了ReentrantLock还需要ReentrantReadWriteLock? ReentrantReadWriteLock底层实现原理? ReentrantReadWriteLock底层读写状态如何设计的? 高16位为读锁，低16位为写锁 读锁和写锁的最大数量是多少? 本地线程计数器ThreadLocalHoldCounter是用来做什么的? 缓存计数器HoldCounter是用来做什么的? 写锁的获取与释放是怎么实现的? 读锁的获取与释放是怎么实现的? RentrantReadWriteLock为什么不支持锁升级? 什么是锁的升降级? RentrantReadWriteLock为什么不支持锁升级?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-25T08:42:25.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java 多线程"}],["meta",{"property":"article:published_time","content":"2022-03-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-25T08:42:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JUC锁: ReentrantReadWriteLock详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-03-04T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-25T08:42:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"带着BAT大厂的面试问题去理解","slug":"带着bat大厂的面试问题去理解","link":"#带着bat大厂的面试问题去理解","children":[]},{"level":2,"title":"ReentrantReadWriteLock数据结构","slug":"reentrantreadwritelock数据结构","link":"#reentrantreadwritelock数据结构","children":[]},{"level":2,"title":"ReentrantReadWriteLock源码分析","slug":"reentrantreadwritelock源码分析","link":"#reentrantreadwritelock源码分析","children":[{"level":3,"title":"类的继承关系","slug":"类的继承关系","link":"#类的继承关系","children":[]},{"level":3,"title":"类的内部类","slug":"类的内部类","link":"#类的内部类","children":[]},{"level":3,"title":"内部类 - Sync类","slug":"内部类-sync类","link":"#内部类-sync类","children":[]},{"level":3,"title":"内部类 - Sync核心函数分析","slug":"内部类-sync核心函数分析","link":"#内部类-sync核心函数分析","children":[]},{"level":3,"title":"类的属性","slug":"类的属性","link":"#类的属性","children":[]},{"level":3,"title":"类的构造函数","slug":"类的构造函数","link":"#类的构造函数","children":[]},{"level":3,"title":"核心函数分析","slug":"核心函数分析","link":"#核心函数分析","children":[]}]},{"level":2,"title":"ReentrantReadWriteLock示例","slug":"reentrantreadwritelock示例","link":"#reentrantreadwritelock示例","children":[]},{"level":2,"title":"更深入理解","slug":"更深入理解","link":"#更深入理解","children":[{"level":3,"title":"什么是锁升降级?","slug":"什么是锁升降级","link":"#什么是锁升降级","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1687917370000,"updatedTime":1703493745000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":16.2,"words":4860},"filePathRelative":"java/thread/java-thread-x-lock-ReentrantReadWriteLock.md","localizedDate":"2022年3月4日","excerpt":"<h1> JUC锁: ReentrantReadWriteLock详解</h1>\\n<blockquote>\\n<p>ReentrantReadWriteLock表示可重入读写锁，ReentrantReadWriteLock中包含了两种锁，读锁ReadLock和写锁WriteLock，可以通过这两种锁实现线程间的同步。</p>\\n</blockquote>\\n<h2> 带着BAT大厂的面试问题去理解</h2>\\n<blockquote>\\n<p>提示</p>\\n<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>\\n</blockquote>\\n<ul>\\n<li>为了有了ReentrantLock还需要ReentrantReadWriteLock?</li>\\n<li>ReentrantReadWriteLock底层实现原理?</li>\\n<li>ReentrantReadWriteLock底层读写状态如何设计的? 高16位为读锁，低16位为写锁</li>\\n<li>读锁和写锁的最大数量是多少?</li>\\n<li>本地线程计数器ThreadLocalHoldCounter是用来做什么的?</li>\\n<li>缓存计数器HoldCounter是用来做什么的?</li>\\n<li>写锁的获取与释放是怎么实现的?</li>\\n<li>读锁的获取与释放是怎么实现的?</li>\\n<li>RentrantReadWriteLock为什么不支持锁升级?</li>\\n<li>什么是锁的升降级? RentrantReadWriteLock为什么不支持锁升级?</li>\\n</ul>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
