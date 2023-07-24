const e=JSON.parse('{"key":"v-63ce1cd4","path":"/java/basic/java-basic-x-exception.html","title":"异常机制详解","lang":"zh-CN","frontmatter":{"date":"2022-02-08T00:00:00.000Z","category":["Java 基础"],"tag":["Java 基础"],"description":"异常机制详解 Java异常是Java提供的一种识别及响应错误的一致性机制，java异常机制可以使程序中异常处理代码和正常业务代码分离，保证程序代码更加优雅，并提高程序健壮性。本文综合多篇文章后，总结了Java 异常的相关知识，希望可以提升你对Java中异常的认知效率。 异常的层次结构 异常指不期而至的各种状况，如：文件找不到、网络连接失败、非法参数等。异常是一个事件，它发生在程序运行期间，干扰了正常的指令流程。Java通 过API中Throwable类的众多子类描述各种不同的异常。因而，Java异常都是对象，是Throwable子类的实例，描述了出现在一段编码中的 错误条件。当条件生成时，错误将引发异常。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/java/basic/java-basic-x-exception.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"异常机制详解"}],["meta",{"property":"og:description","content":"异常机制详解 Java异常是Java提供的一种识别及响应错误的一致性机制，java异常机制可以使程序中异常处理代码和正常业务代码分离，保证程序代码更加优雅，并提高程序健壮性。本文综合多篇文章后，总结了Java 异常的相关知识，希望可以提升你对Java中异常的认知效率。 异常的层次结构 异常指不期而至的各种状况，如：文件找不到、网络连接失败、非法参数等。异常是一个事件，它发生在程序运行期间，干扰了正常的指令流程。Java通 过API中Throwable类的众多子类描述各种不同的异常。因而，Java异常都是对象，是Throwable子类的实例，描述了出现在一段编码中的 错误条件。当条件生成时，错误将引发异常。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-24T01:04:58.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java 基础"}],["meta",{"property":"article:published_time","content":"2022-02-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-24T01:04:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"异常机制详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-02-08T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-24T01:04:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"异常的层次结构","slug":"异常的层次结构","link":"#异常的层次结构","children":[{"level":3,"title":"Throwable","slug":"throwable","link":"#throwable","children":[]},{"level":3,"title":"Error（错误）","slug":"error-错误","link":"#error-错误","children":[]},{"level":3,"title":"Exception（异常）","slug":"exception-异常","link":"#exception-异常","children":[]},{"level":3,"title":"可查的异常（checked exceptions）和不可查的异常（unchecked exceptions）","slug":"可查的异常-checked-exceptions-和不可查的异常-unchecked-exceptions","link":"#可查的异常-checked-exceptions-和不可查的异常-unchecked-exceptions","children":[]}]},{"level":2,"title":"异常基础","slug":"异常基础","link":"#异常基础","children":[{"level":3,"title":"异常关键字","slug":"异常关键字","link":"#异常关键字","children":[]},{"level":3,"title":"异常的申明(throws)","slug":"异常的申明-throws","link":"#异常的申明-throws","children":[]},{"level":3,"title":"异常的抛出(throw)","slug":"异常的抛出-throw","link":"#异常的抛出-throw","children":[]},{"level":3,"title":"异常的自定义","slug":"异常的自定义","link":"#异常的自定义","children":[]},{"level":3,"title":"异常的捕获","slug":"异常的捕获","link":"#异常的捕获","children":[]},{"level":3,"title":"异常基础总结","slug":"异常基础总结","link":"#异常基础总结","children":[]},{"level":3,"title":"常用的异常","slug":"常用的异常","link":"#常用的异常","children":[]}]},{"level":2,"title":"异常实践","slug":"异常实践","link":"#异常实践","children":[{"level":3,"title":"只针对不正常的情况才使用异常","slug":"只针对不正常的情况才使用异常","link":"#只针对不正常的情况才使用异常","children":[]},{"level":3,"title":"在 finally 块中清理资源或者使用 try-with-resource 语句","slug":"在-finally-块中清理资源或者使用-try-with-resource-语句","link":"#在-finally-块中清理资源或者使用-try-with-resource-语句","children":[]},{"level":3,"title":"尽量使用标准的异常","slug":"尽量使用标准的异常","link":"#尽量使用标准的异常","children":[]},{"level":3,"title":"对异常进行文档说明","slug":"对异常进行文档说明","link":"#对异常进行文档说明","children":[]},{"level":3,"title":"优先捕获最具体的异常","slug":"优先捕获最具体的异常","link":"#优先捕获最具体的异常","children":[]},{"level":3,"title":"不要捕获 Throwable 类","slug":"不要捕获-throwable-类","link":"#不要捕获-throwable-类","children":[]},{"level":3,"title":"不要忽略异常","slug":"不要忽略异常","link":"#不要忽略异常","children":[]},{"level":3,"title":"不要记录并抛出异常","slug":"不要记录并抛出异常","link":"#不要记录并抛出异常","children":[]},{"level":3,"title":"包装异常时不要抛弃原始的异常","slug":"包装异常时不要抛弃原始的异常","link":"#包装异常时不要抛弃原始的异常","children":[]},{"level":3,"title":"不要使用异常控制程序的流程","slug":"不要使用异常控制程序的流程","link":"#不要使用异常控制程序的流程","children":[]},{"level":3,"title":"不要在finally块中使用return。","slug":"不要在finally块中使用return。","link":"#不要在finally块中使用return。","children":[]}]},{"level":2,"title":"深入理解异常","slug":"深入理解异常","link":"#深入理解异常","children":[{"level":3,"title":"JVM处理异常的机制？","slug":"jvm处理异常的机制","link":"#jvm处理异常的机制","children":[]},{"level":3,"title":"异常是否耗时？为什么会耗时？","slug":"异常是否耗时-为什么会耗时","link":"#异常是否耗时-为什么会耗时","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1687917370000,"updatedTime":1690160698000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":29.32,"words":8795},"filePathRelative":"java/basic/java-basic-x-exception.md","localizedDate":"2022年2月8日","excerpt":"<h1> 异常机制详解</h1>\\n<blockquote>\\n<p>Java异常是Java提供的一种识别及响应错误的一致性机制，java异常机制可以使程序中异常处理代码和正常业务代码分离，保证程序代码更加优雅，并提高程序健壮性。本文综合多篇文章后，总结了Java 异常的相关知识，希望可以提升你对Java中异常的认知效率。</p>\\n</blockquote>\\n<h2> 异常的层次结构</h2>\\n<p>异常指不期而至的各种状况，如：文件找不到、网络连接失败、非法参数等。异常是一个事件，它发生在程序运行期间，干扰了正常的指令流程。Java通 过API中Throwable类的众多子类描述各种不同的异常。因而，Java异常都是对象，是Throwable子类的实例，描述了出现在一段编码中的 错误条件。当条件生成时，错误将引发异常。</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
