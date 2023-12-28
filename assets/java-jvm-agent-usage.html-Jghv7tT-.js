const e=JSON.parse('{"key":"v-2c8cebb5","path":"/java/jvm/java-jvm-agent-usage.html","title":"调试排错 - Java动态调试技术原理","lang":"zh-CN","frontmatter":{"date":"2022-05-15T00:00:00.000Z","category":["Java JVM"],"tag":["Java JVM"],"description":"调试排错 - Java动态调试技术原理 本文转载自 美团技术团队胡健的Java 动态调试技术原理及实践在新窗口打开, 通过学习java agent方式进行动态调试了解目前很多大厂开源的一些基于此的调试工具。 简介 断点调试是我们最常使用的调试手段，它可以获取到方法执行过程中的变量信息，并可以观察到方法的执行路径。但断点调试会在断点位置停顿，使得整个应用停止响应。在线上停顿应用是致命的，动态调试技术给了我们创造新的调试模式的想象空间。本文将研究Java语言中的动态调试技术，首先概括Java动态调试所涉及的技术基础，接着介绍我们在Java动态调试领域的思考及实践，通过结合实际业务场景，设计并实现了一种具备动态性的断点调试工具Java-debug-tool，显著提高了故障排查效率。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/java/jvm/java-jvm-agent-usage.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"调试排错 - Java动态调试技术原理"}],["meta",{"property":"og:description","content":"调试排错 - Java动态调试技术原理 本文转载自 美团技术团队胡健的Java 动态调试技术原理及实践在新窗口打开, 通过学习java agent方式进行动态调试了解目前很多大厂开源的一些基于此的调试工具。 简介 断点调试是我们最常使用的调试手段，它可以获取到方法执行过程中的变量信息，并可以观察到方法的执行路径。但断点调试会在断点位置停顿，使得整个应用停止响应。在线上停顿应用是致命的，动态调试技术给了我们创造新的调试模式的想象空间。本文将研究Java语言中的动态调试技术，首先概括Java动态调试所涉及的技术基础，接着介绍我们在Java动态调试领域的思考及实践，通过结合实际业务场景，设计并实现了一种具备动态性的断点调试工具Java-debug-tool，显著提高了故障排查效率。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-25T08:42:25.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java JVM"}],["meta",{"property":"article:published_time","content":"2022-05-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-25T08:42:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"调试排错 - Java动态调试技术原理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-05-15T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-25T08:42:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":2,"title":"Agent的实现模式","slug":"agent的实现模式","link":"#agent的实现模式","children":[{"level":3,"title":"通过Java Instrumentation API","slug":"通过java-instrumentation-api","link":"#通过java-instrumentation-api","children":[]}]},{"level":2,"title":"启动时加载Agent","slug":"启动时加载agent","link":"#启动时加载agent","children":[{"level":3,"title":"参数解析","slug":"参数解析","link":"#参数解析","children":[]},{"level":3,"title":"执行加载操作","slug":"执行加载操作","link":"#执行加载操作","children":[]},{"level":3,"title":"instrument动态链接库","slug":"instrument动态链接库","link":"#instrument动态链接库","children":[]}]},{"level":2,"title":"运行时加载Agent","slug":"运行时加载agent","link":"#运行时加载agent","children":[{"level":3,"title":"AttachListener","slug":"attachlistener","link":"#attachlistener","children":[]},{"level":3,"title":"运行时加载Agent的实现","slug":"运行时加载agent的实现","link":"#运行时加载agent的实现","children":[]},{"level":3,"title":"load命令的实现","slug":"load命令的实现","link":"#load命令的实现","children":[]}]},{"level":2,"title":"动态字节码修改的限制","slug":"动态字节码修改的限制","link":"#动态字节码修改的限制","children":[]},{"level":2,"title":"重定义类字节码的实现细节","slug":"重定义类字节码的实现细节","link":"#重定义类字节码的实现细节","children":[]},{"level":2,"title":"Java-debug-tool","slug":"java-debug-tool","link":"#java-debug-tool","children":[{"level":3,"title":"Java-debug-tool整体架构","slug":"java-debug-tool整体架构","link":"#java-debug-tool整体架构","children":[]},{"level":3,"title":"Java-debug-tool的字节码增强方案","slug":"java-debug-tool的字节码增强方案","link":"#java-debug-tool的字节码增强方案","children":[]},{"level":3,"title":"Java-debug-tool的命令设计与实现","slug":"java-debug-tool的命令设计与实现","link":"#java-debug-tool的命令设计与实现","children":[]},{"level":3,"title":"Java-debug-tool与同类产品对比分析","slug":"java-debug-tool与同类产品对比分析","link":"#java-debug-tool与同类产品对比分析","children":[]}]},{"level":2,"title":"参考文献","slug":"参考文献","link":"#参考文献","children":[]}],"git":{"createdTime":1687917370000,"updatedTime":1703493745000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":30.68,"words":9204},"filePathRelative":"java/jvm/java-jvm-agent-usage.md","localizedDate":"2022年5月15日","excerpt":"<h1> 调试排错 - Java动态调试技术原理</h1>\\n<blockquote>\\n<p>本文转载自 美团技术团队胡健的<a href=\\"https://tech.meituan.com/2019/11/07/java-dynamic-debugging-technology.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Java 动态调试技术原理及实践在新窗口打开</a>, 通过学习java agent方式进行动态调试了解目前很多大厂开源的一些基于此的调试工具。</p>\\n</blockquote>\\n<h2> 简介</h2>\\n<p>断点调试是我们最常使用的调试手段，它可以获取到方法执行过程中的变量信息，并可以观察到方法的执行路径。但断点调试会在断点位置停顿，使得整个应用停止响应。在线上停顿应用是致命的，动态调试技术给了我们创造新的调试模式的想象空间。本文将研究Java语言中的动态调试技术，首先概括Java动态调试所涉及的技术基础，接着介绍我们在Java动态调试领域的思考及实践，通过结合实际业务场景，设计并实现了一种具备动态性的断点调试工具Java-debug-tool，显著提高了故障排查效率。</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};