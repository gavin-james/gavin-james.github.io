const e=JSON.parse('{"key":"v-18eedada","path":"/java/jvm/java-jvm-debug-idea.html","title":"调试排错 - Java 问题排查之使用IDEA本地调试和远程调试","lang":"zh-CN","frontmatter":{"date":"2022-05-14T00:00:00.000Z","category":["Java JVM"],"tag":["Java JVM"],"description":"调试排错 - Java 问题排查之使用IDEA本地调试和远程调试 Debug用来追踪代码的运行流程，通常在程序运行过程中出现异常，启用Debug模式可以分析定位异常发生的位置，以及在运行过程中参数的变化；并且在实际的排错过程中，还会用到Remote Debug。IDEA 相比 Eclipse/STS效率更高，本文主要介绍基于IDEA的Debug和Remote Debug的技巧。 Debug开篇 首先看下IDEA中Debug模式下的界面。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/java/jvm/java-jvm-debug-idea.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"调试排错 - Java 问题排查之使用IDEA本地调试和远程调试"}],["meta",{"property":"og:description","content":"调试排错 - Java 问题排查之使用IDEA本地调试和远程调试 Debug用来追踪代码的运行流程，通常在程序运行过程中出现异常，启用Debug模式可以分析定位异常发生的位置，以及在运行过程中参数的变化；并且在实际的排错过程中，还会用到Remote Debug。IDEA 相比 Eclipse/STS效率更高，本文主要介绍基于IDEA的Debug和Remote Debug的技巧。 Debug开篇 首先看下IDEA中Debug模式下的界面。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-25T08:42:25.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java JVM"}],["meta",{"property":"article:published_time","content":"2022-05-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-25T08:42:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"调试排错 - Java 问题排查之使用IDEA本地调试和远程调试\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-05-14T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-25T08:42:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"Debug开篇","slug":"debug开篇","link":"#debug开篇","children":[]},{"level":2,"title":"基本用法&快捷键","slug":"基本用法-快捷键","link":"#基本用法-快捷键","children":[]},{"level":2,"title":"变量查看","slug":"变量查看","link":"#变量查看","children":[]},{"level":2,"title":"计算表达式","slug":"计算表达式","link":"#计算表达式","children":[]},{"level":2,"title":"智能步入","slug":"智能步入","link":"#智能步入","children":[]},{"level":2,"title":"断点条件设置","slug":"断点条件设置","link":"#断点条件设置","children":[]},{"level":2,"title":"多线程调试","slug":"多线程调试","link":"#多线程调试","children":[]},{"level":2,"title":"回退断点","slug":"回退断点","link":"#回退断点","children":[]},{"level":2,"title":"中断Debug","slug":"中断debug","link":"#中断debug","children":[]},{"level":2,"title":"远程调试(Remote Debug)","slug":"远程调试-remote-debug","link":"#远程调试-remote-debug","children":[{"level":3,"title":"使用特定JVM参数运行服务端代码","slug":"使用特定jvm参数运行服务端代码","link":"#使用特定jvm参数运行服务端代码","children":[]},{"level":3,"title":"本地连接远程服务器debug端口","slug":"本地连接远程服务器debug端口","link":"#本地连接远程服务器debug端口","children":[]},{"level":3,"title":"设置断点，开始调试","slug":"设置断点-开始调试","link":"#设置断点-开始调试","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1687917370000,"updatedTime":1703493745000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":14.38,"words":4315},"filePathRelative":"java/jvm/java-jvm-debug-idea.md","localizedDate":"2022年5月14日","excerpt":"<h1> 调试排错 - Java 问题排查之使用IDEA本地调试和远程调试</h1>\\n<blockquote>\\n<p>Debug用来追踪代码的运行流程，通常在程序运行过程中出现异常，启用Debug模式可以分析定位异常发生的位置，以及在运行过程中参数的变化；并且在实际的排错过程中，还会用到Remote Debug。IDEA 相比 Eclipse/STS效率更高，本文主要介绍基于IDEA的Debug和Remote Debug的技巧。</p>\\n</blockquote>\\n<h2> Debug开篇</h2>\\n<blockquote>\\n<p>首先看下IDEA中Debug模式下的界面。</p>\\n</blockquote>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};