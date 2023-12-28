const e=JSON.parse('{"key":"v-462b5b61","path":"/java/javaup/java8-stampedlock.html","title":"Java 8 - StampedLock","lang":"zh-CN","frontmatter":{"date":"2022-04-10T00:00:00.000Z","category":["Java 新特性"],"tag":["Java 新特性"],"description":"Java 8 - StampedLock 本文将从synchronized、Lock到Java8新增的StampedLock进行对比分析，相信StampedLock不会让大家失望。 synchronized 在java5之前，实现同步主要是使用synchronized。它是Java语言的关键字，当它用来修饰一个方法或者一个代码块的时候，能够保证在同一时刻最多只有一个线程执行该段代码。 有四种不同的同步块: 实例方法 静态方法 实例方法中的同步块 静态方法中的同步块","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/java/javaup/java8-stampedlock.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"Java 8 - StampedLock"}],["meta",{"property":"og:description","content":"Java 8 - StampedLock 本文将从synchronized、Lock到Java8新增的StampedLock进行对比分析，相信StampedLock不会让大家失望。 synchronized 在java5之前，实现同步主要是使用synchronized。它是Java语言的关键字，当它用来修饰一个方法或者一个代码块的时候，能够保证在同一时刻最多只有一个线程执行该段代码。 有四种不同的同步块: 实例方法 静态方法 实例方法中的同步块 静态方法中的同步块"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-25T08:42:25.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java 新特性"}],["meta",{"property":"article:published_time","content":"2022-04-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-25T08:42:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 8 - StampedLock\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-10T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-25T08:42:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"synchronized","slug":"synchronized","link":"#synchronized","children":[]},{"level":2,"title":"Lock","slug":"lock","link":"#lock","children":[]},{"level":2,"title":"StampedLock","slug":"stampedlock","link":"#stampedlock","children":[]},{"level":2,"title":"StampedLock与ReadWriteLock性能对比","slug":"stampedlock与readwritelock性能对比","link":"#stampedlock与readwritelock性能对比","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1687917370000,"updatedTime":1703493745000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":6.12,"words":1835},"filePathRelative":"java/javaup/java8-stampedlock.md","localizedDate":"2022年4月10日","excerpt":"<h1> Java 8 - StampedLock</h1>\\n<blockquote>\\n<p>本文将从synchronized、Lock到Java8新增的StampedLock进行对比分析，相信StampedLock不会让大家失望。</p>\\n</blockquote>\\n<h2> synchronized</h2>\\n<p>在java5之前，实现同步主要是使用synchronized。它是Java语言的关键字，当它用来修饰一个方法或者一个代码块的时候，能够保证在同一时刻最多只有一个线程执行该段代码。</p>\\n<p>有四种不同的同步块:</p>\\n<div class=\\"language-text line-numbers-mode\\" data-ext=\\"text\\"><pre class=\\"language-text\\"><code>实例方法\\n静态方法\\n实例方法中的同步块\\n静态方法中的同步块\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};