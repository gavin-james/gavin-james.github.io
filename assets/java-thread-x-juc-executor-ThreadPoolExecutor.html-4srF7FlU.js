const e=JSON.parse('{"key":"v-3344b079","path":"/java/thread/java-thread-x-juc-executor-ThreadPoolExecutor.html","title":"JUC线程池: ThreadPoolExecutor详解","lang":"zh-CN","frontmatter":{"date":"2022-03-10T00:00:00.000Z","category":["Java 多线程"],"tag":["Java 多线程"],"description":"JUC线程池: ThreadPoolExecutor详解 本文主要对ThreadPoolExecutor详解。 带着BAT大厂的面试问题去理解 提示 请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。 为什么要有线程池? Java是实现和管理线程池有哪些方式? 请简单举例如何使用。 为什么很多公司不允许使用Executors去创建线程池? 那么推荐怎么使用呢? ThreadPoolExecutor有哪些核心的配置参数? 请简要说明 ThreadPoolExecutor可以创建哪是哪三种线程池呢? 当队列满了并且worker的数量达到maxSize的时候，会怎么样? 说说ThreadPoolExecutor有哪些RejectedExecutionHandler策略? 默认是什么策略? 简要说下线程池的任务执行机制? execute –&gt; addWorker –&gt;runworker (getTask) 线程池中任务是如何提交的? 线程池中任务是如何关闭的? 在配置线程池的时候需要考虑哪些配置因素? 如何监控线程池的状态?","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/java/thread/java-thread-x-juc-executor-ThreadPoolExecutor.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"JUC线程池: ThreadPoolExecutor详解"}],["meta",{"property":"og:description","content":"JUC线程池: ThreadPoolExecutor详解 本文主要对ThreadPoolExecutor详解。 带着BAT大厂的面试问题去理解 提示 请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。 为什么要有线程池? Java是实现和管理线程池有哪些方式? 请简单举例如何使用。 为什么很多公司不允许使用Executors去创建线程池? 那么推荐怎么使用呢? ThreadPoolExecutor有哪些核心的配置参数? 请简要说明 ThreadPoolExecutor可以创建哪是哪三种线程池呢? 当队列满了并且worker的数量达到maxSize的时候，会怎么样? 说说ThreadPoolExecutor有哪些RejectedExecutionHandler策略? 默认是什么策略? 简要说下线程池的任务执行机制? execute –&gt; addWorker –&gt;runworker (getTask) 线程池中任务是如何提交的? 线程池中任务是如何关闭的? 在配置线程池的时候需要考虑哪些配置因素? 如何监控线程池的状态?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-25T08:42:25.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java 多线程"}],["meta",{"property":"article:published_time","content":"2022-03-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-25T08:42:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JUC线程池: ThreadPoolExecutor详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-03-10T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-25T08:42:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"带着BAT大厂的面试问题去理解","slug":"带着bat大厂的面试问题去理解","link":"#带着bat大厂的面试问题去理解","children":[]},{"level":2,"title":"为什么要有线程池","slug":"为什么要有线程池","link":"#为什么要有线程池","children":[]},{"level":2,"title":"ThreadPoolExecutor例子","slug":"threadpoolexecutor例子","link":"#threadpoolexecutor例子","children":[]},{"level":2,"title":"ThreadPoolExecutor使用详解","slug":"threadpoolexecutor使用详解","link":"#threadpoolexecutor使用详解","children":[{"level":3,"title":"Execute原理","slug":"execute原理","link":"#execute原理","children":[]},{"level":3,"title":"参数","slug":"参数","link":"#参数","children":[]},{"level":3,"title":"三种类型","slug":"三种类型","link":"#三种类型","children":[]},{"level":3,"title":"关闭线程池","slug":"关闭线程池","link":"#关闭线程池","children":[]}]},{"level":2,"title":"ThreadPoolExecutor源码详解","slug":"threadpoolexecutor源码详解","link":"#threadpoolexecutor源码详解","children":[{"level":3,"title":"几个关键属性","slug":"几个关键属性","link":"#几个关键属性","children":[]},{"level":3,"title":"内部状态","slug":"内部状态","link":"#内部状态","children":[]},{"level":3,"title":"任务的执行","slug":"任务的执行","link":"#任务的执行","children":[]},{"level":3,"title":"任务的提交","slug":"任务的提交","link":"#任务的提交","children":[]},{"level":3,"title":"任务的关闭","slug":"任务的关闭","link":"#任务的关闭","children":[]}]},{"level":2,"title":"更深入理解","slug":"更深入理解","link":"#更深入理解","children":[{"level":3,"title":"为什么线程池不允许使用Executors去创建? 推荐方式是什么?","slug":"为什么线程池不允许使用executors去创建-推荐方式是什么","link":"#为什么线程池不允许使用executors去创建-推荐方式是什么","children":[]},{"level":3,"title":"配置线程池需要考虑因素","slug":"配置线程池需要考虑因素","link":"#配置线程池需要考虑因素","children":[]},{"level":3,"title":"监控线程池的状态","slug":"监控线程池的状态","link":"#监控线程池的状态","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1687917370000,"updatedTime":1703493745000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":24.89,"words":7467},"filePathRelative":"java/thread/java-thread-x-juc-executor-ThreadPoolExecutor.md","localizedDate":"2022年3月10日","excerpt":"<h1> JUC线程池: ThreadPoolExecutor详解</h1>\\n<blockquote>\\n<p>本文主要对ThreadPoolExecutor详解。</p>\\n</blockquote>\\n<h2> 带着BAT大厂的面试问题去理解</h2>\\n<blockquote>\\n<p>提示</p>\\n<p>请带着这些问题继续后文，会很大程度上帮助你更好的理解相关知识点。</p>\\n</blockquote>\\n<ul>\\n<li>为什么要有线程池?</li>\\n<li>Java是实现和管理线程池有哪些方式? 请简单举例如何使用。</li>\\n<li>为什么很多公司不允许使用Executors去创建线程池? 那么推荐怎么使用呢?</li>\\n<li>ThreadPoolExecutor有哪些核心的配置参数? 请简要说明</li>\\n<li>ThreadPoolExecutor可以创建哪是哪三种线程池呢?</li>\\n<li>当队列满了并且worker的数量达到maxSize的时候，会怎么样?</li>\\n<li>说说ThreadPoolExecutor有哪些RejectedExecutionHandler策略? 默认是什么策略?</li>\\n<li>简要说下线程池的任务执行机制? execute –&gt; addWorker –&gt;runworker (getTask)</li>\\n<li>线程池中任务是如何提交的?</li>\\n<li>线程池中任务是如何关闭的?</li>\\n<li>在配置线程池的时候需要考虑哪些配置因素?</li>\\n<li>如何监控线程池的状态?</li>\\n</ul>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
