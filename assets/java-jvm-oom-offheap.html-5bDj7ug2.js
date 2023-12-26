const e=JSON.parse('{"key":"v-d1b45d9a","path":"/java/jvm/java-jvm-oom-offheap.html","title":"调试排错 - Java 内存分析之堆外内存","lang":"zh-CN","frontmatter":{"date":"2022-05-08T00:00:00.000Z","category":["Java JVM"],"tag":["Java JVM"],"description":"调试排错 - Java 内存分析之堆外内存 Java 堆外内存分析相对来说是复杂的，美团技术团队的Spring Boot引起的“堆外内存泄漏”排查及经验总结在新窗口打开可以为很多Native Code内存泄漏/占用提供方向性指引。 背景","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/java/jvm/java-jvm-oom-offheap.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"调试排错 - Java 内存分析之堆外内存"}],["meta",{"property":"og:description","content":"调试排错 - Java 内存分析之堆外内存 Java 堆外内存分析相对来说是复杂的，美团技术团队的Spring Boot引起的“堆外内存泄漏”排查及经验总结在新窗口打开可以为很多Native Code内存泄漏/占用提供方向性指引。 背景"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-25T08:42:25.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java JVM"}],["meta",{"property":"article:published_time","content":"2022-05-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-25T08:42:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"调试排错 - Java 内存分析之堆外内存\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-05-08T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-25T08:42:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"背景","slug":"背景","link":"#背景","children":[]},{"level":2,"title":"排查过程","slug":"排查过程","link":"#排查过程","children":[{"level":3,"title":"使用Java层面的工具定位内存区域","slug":"使用java层面的工具定位内存区域","link":"#使用java层面的工具定位内存区域","children":[]},{"level":3,"title":"使用系统层面的工具定位堆外内存","slug":"使用系统层面的工具定位堆外内存","link":"#使用系统层面的工具定位堆外内存","children":[]},{"level":3,"title":"为什么堆外内存没有释放掉呢？","slug":"为什么堆外内存没有释放掉呢","link":"#为什么堆外内存没有释放掉呢","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1687917370000,"updatedTime":1703493745000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":9.56,"words":2867},"filePathRelative":"java/jvm/java-jvm-oom-offheap.md","localizedDate":"2022年5月8日","excerpt":"<h1> 调试排错 - Java 内存分析之堆外内存</h1>\\n<blockquote>\\n<p>Java 堆外内存分析相对来说是复杂的，美团技术团队的<a href=\\"https://tech.meituan.com/2019/01/03/spring-boot-native-memory-leak.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Spring Boot引起的“堆外内存泄漏”排查及经验总结在新窗口打开</a>可以为很多Native Code内存泄漏/占用提供方向性指引。</p>\\n</blockquote>\\n<h2> 背景</h2>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};