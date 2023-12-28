const e=JSON.parse('{"key":"v-76d5ebe5","path":"/java/javaup/java9-11.html","title":"Java 8 升Java 11 重要特性必读","lang":"zh-CN","frontmatter":{"date":"2022-04-15T00:00:00.000Z","category":["Java 新特性"],"tag":["Java 新特性"],"description":"Java 8 升Java 11 重要特性必读 Java 11 在 2018 年 9 月 25 日正式发布！根据发布的规划，JDK 11 是一个长期维护的版本（LTS); 本文帮助你梳理Java 8 升Java 11 重要特性。 升级JDK11概述 这里帮你梳理为何JDK 11会是一个极为重要的版本以及如何去理解它。 JDK 10后版本发布规则？ Java 11 已于 2018 年 9 月 25 日正式发布，之前在 Java 10 新特性介绍 中介绍过，为了加快的版本迭代、跟进社区反馈，Java 的版本发布周期调整为每六个月一次——即每半年发布一个大版本，每个季度发布一个中间特性版本，并且做出不会跳票的承诺。通过这样的方式，Java 开发团队能够将一些重要特性尽早的合并到 Java Release 版本中，以便快速得到开发者的反馈，避免出现类似 Java 9 发布时的两次延期的情况。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/java/javaup/java9-11.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"Java 8 升Java 11 重要特性必读"}],["meta",{"property":"og:description","content":"Java 8 升Java 11 重要特性必读 Java 11 在 2018 年 9 月 25 日正式发布！根据发布的规划，JDK 11 是一个长期维护的版本（LTS); 本文帮助你梳理Java 8 升Java 11 重要特性。 升级JDK11概述 这里帮你梳理为何JDK 11会是一个极为重要的版本以及如何去理解它。 JDK 10后版本发布规则？ Java 11 已于 2018 年 9 月 25 日正式发布，之前在 Java 10 新特性介绍 中介绍过，为了加快的版本迭代、跟进社区反馈，Java 的版本发布周期调整为每六个月一次——即每半年发布一个大版本，每个季度发布一个中间特性版本，并且做出不会跳票的承诺。通过这样的方式，Java 开发团队能够将一些重要特性尽早的合并到 Java Release 版本中，以便快速得到开发者的反馈，避免出现类似 Java 9 发布时的两次延期的情况。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-25T08:42:25.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java 新特性"}],["meta",{"property":"article:published_time","content":"2022-04-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-25T08:42:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 8 升Java 11 重要特性必读\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-15T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-25T08:42:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"升级JDK11概述","slug":"升级jdk11概述","link":"#升级jdk11概述","children":[]},{"level":2,"title":"语言新特性","slug":"语言新特性","link":"#语言新特性","children":[{"level":3,"title":"JDK9 - 允许在接口中使用私有方法","slug":"jdk9-允许在接口中使用私有方法","link":"#jdk9-允许在接口中使用私有方法","children":[]},{"level":3,"title":"JDK10 - 局部变量类型推断","slug":"jdk10-局部变量类型推断","link":"#jdk10-局部变量类型推断","children":[]},{"level":3,"title":"JDK11 - 用于 Lambda 参数的局部变量语法","slug":"jdk11-用于-lambda-参数的局部变量语法","link":"#jdk11-用于-lambda-参数的局部变量语法","children":[]}]},{"level":2,"title":"新工具和库更新","slug":"新工具和库更新","link":"#新工具和库更新","children":[{"level":3,"title":"JDK9 - 集合、Stream 和 Optional更新方法","slug":"jdk9-集合、stream-和-optional更新方法","link":"#jdk9-集合、stream-和-optional更新方法","children":[]},{"level":3,"title":"JDK9 - 进程 API (Process Handle)","slug":"jdk9-进程-api-process-handle","link":"#jdk9-进程-api-process-handle","children":[]},{"level":3,"title":"JDK9 - 变量句柄 (Var Handle)","slug":"jdk9-变量句柄-var-handle","link":"#jdk9-变量句柄-var-handle","children":[]},{"level":3,"title":"JDK9 - I/O 流新特性","slug":"jdk9-i-o-流新特性","link":"#jdk9-i-o-流新特性","children":[]},{"level":3,"title":"JDK9 - 改进应用安全性能","slug":"jdk9-改进应用安全性能","link":"#jdk9-改进应用安全性能","children":[]},{"level":3,"title":"JDK10 - 根证书认证","slug":"jdk10-根证书认证","link":"#jdk10-根证书认证","children":[]},{"level":3,"title":"JDK11 - 标准 HTTP Client 升级","slug":"jdk11-标准-http-client-升级","link":"#jdk11-标准-http-client-升级","children":[]},{"level":3,"title":"JDK11 - 简化启动单个源代码文件的方法","slug":"jdk11-简化启动单个源代码文件的方法","link":"#jdk11-简化启动单个源代码文件的方法","children":[]},{"level":3,"title":"JDK11 - 支持 TLS 1.3 协议","slug":"jdk11-支持-tls-1-3-协议","link":"#jdk11-支持-tls-1-3-协议","children":[]}]},{"level":2,"title":"JVM优化","slug":"jvm优化","link":"#jvm优化","children":[{"level":3,"title":"JDK9 - 统一 JVM 日志","slug":"jdk9-统一-jvm-日志","link":"#jdk9-统一-jvm-日志","children":[]},{"level":3,"title":"JDK10 - 统一 GC 接口","slug":"jdk10-统一-gc-接口","link":"#jdk10-统一-gc-接口","children":[]},{"level":3,"title":"JDK10 - 并行全垃圾回收器 G1","slug":"jdk10-并行全垃圾回收器-g1","link":"#jdk10-并行全垃圾回收器-g1","children":[]},{"level":3,"title":"JDK11 - Epsilon：低开销垃圾回收器","slug":"jdk11-epsilon-低开销垃圾回收器","link":"#jdk11-epsilon-低开销垃圾回收器","children":[]},{"level":3,"title":"JDK11 - 低开销的 Heap Profiling","slug":"jdk11-低开销的-heap-profiling","link":"#jdk11-低开销的-heap-profiling","children":[]},{"level":3,"title":"JDK11 - 可伸缩低延迟垃圾收集器(ZGC)","slug":"jdk11-可伸缩低延迟垃圾收集器-zgc","link":"#jdk11-可伸缩低延迟垃圾收集器-zgc","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1687917370000,"updatedTime":1703493745000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":24.64,"words":7392},"filePathRelative":"java/javaup/java9-11.md","localizedDate":"2022年4月15日","excerpt":"<h1> Java 8 升Java 11 重要特性必读</h1>\\n<blockquote>\\n<p>Java 11 在 2018 年 9 月 25 日正式发布！根据发布的规划，JDK 11 是一个长期维护的版本（LTS); 本文帮助你梳理Java 8 升Java 11 重要特性。</p>\\n</blockquote>\\n<h2> 升级JDK11概述</h2>\\n<blockquote>\\n<p>这里帮你梳理为何JDK 11会是一个极为重要的版本以及如何去理解它。</p>\\n</blockquote>\\n<h4> JDK 10后版本发布规则？</h4>\\n<p>Java 11 已于 2018 年 9 月 25 日正式发布，之前在 Java 10 新特性介绍 中介绍过，为了加快的版本迭代、跟进社区反馈，Java 的版本发布周期调整为每六个月一次——即每半年发布一个大版本，每个季度发布一个中间特性版本，并且做出不会跳票的承诺。通过这样的方式，Java 开发团队能够将一些重要特性尽早的合并到 Java Release 版本中，以便快速得到开发者的反馈，避免出现类似 Java 9 发布时的两次延期的情况。</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};