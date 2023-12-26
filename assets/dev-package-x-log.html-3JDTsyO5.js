const e=JSON.parse('{"key":"v-3389ec7d","path":"/develop/package/dev-package-x-log.html","title":"常用开发库 - 日志类库详解","lang":"zh-CN","frontmatter":{"date":"2019-03-15T00:00:00.000Z","category":["常用开发库"],"tag":["常用开发库"],"description":"常用开发库 - 日志类库详解 Java日志库是最能体现Java库在进化中的渊源关系的，在理解时重点理解日志框架本身和日志门面，以及比较好的实践等。要关注其历史渊源和设计（比如桥接），而具体在使用时查询接口即可， 否则会陷入JUL(Java Util Log), JCL(Commons Logging), Log4j, SLF4J, Logback，Log4j2傻傻分不清楚的境地。 日志库简介 我认为全面理解日志库需要从下面三个角度去理解：","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/develop/package/dev-package-x-log.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"常用开发库 - 日志类库详解"}],["meta",{"property":"og:description","content":"常用开发库 - 日志类库详解 Java日志库是最能体现Java库在进化中的渊源关系的，在理解时重点理解日志框架本身和日志门面，以及比较好的实践等。要关注其历史渊源和设计（比如桥接），而具体在使用时查询接口即可， 否则会陷入JUL(Java Util Log), JCL(Commons Logging), Log4j, SLF4J, Logback，Log4j2傻傻分不清楚的境地。 日志库简介 我认为全面理解日志库需要从下面三个角度去理解："}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T09:56:01.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"常用开发库"}],["meta",{"property":"article:published_time","content":"2019-03-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T09:56:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"常用开发库 - 日志类库详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-15T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T09:56:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"日志库简介","slug":"日志库简介","link":"#日志库简介","children":[]},{"level":2,"title":"日志库之日志系统","slug":"日志库之日志系统","link":"#日志库之日志系统","children":[{"level":3,"title":"java.util.logging (JUL)","slug":"java-util-logging-jul","link":"#java-util-logging-jul","children":[]},{"level":3,"title":"Log4j","slug":"log4j","link":"#log4j","children":[]},{"level":3,"title":"Logback","slug":"logback","link":"#logback","children":[]},{"level":3,"title":"Log4j2","slug":"log4j2","link":"#log4j2","children":[]},{"level":3,"title":"Log4j vs Logback vs Log4j2","slug":"log4j-vs-logback-vs-log4j2","link":"#log4j-vs-logback-vs-log4j2","children":[]}]},{"level":2,"title":"日志库之日志门面","slug":"日志库之日志门面","link":"#日志库之日志门面","children":[{"level":3,"title":"common-logging","slug":"common-logging","link":"#common-logging","children":[]},{"level":3,"title":"slf4j","slug":"slf4j","link":"#slf4j","children":[]},{"level":3,"title":"common-logging vs slf4j","slug":"common-logging-vs-slf4j","link":"#common-logging-vs-slf4j","children":[]}]},{"level":2,"title":"日志库使用方案","slug":"日志库使用方案","link":"#日志库使用方案","children":[{"level":3,"title":"日志库jar包","slug":"日志库jar包","link":"#日志库jar包","children":[]},{"level":3,"title":"日志库配置 - 针对于日志框架","slug":"日志库配置-针对于日志框架","link":"#日志库配置-针对于日志框架","children":[]},{"level":3,"title":"日志库API - 针对于日志门面","slug":"日志库api-针对于日志门面","link":"#日志库api-针对于日志门面","children":[]}]},{"level":2,"title":"日志库选型与改造","slug":"日志库选型与改造","link":"#日志库选型与改造","children":[{"level":3,"title":"对Java日志组件选型的建议","slug":"对java日志组件选型的建议","link":"#对java日志组件选型的建议","children":[]},{"level":3,"title":"对日志架构使用比较好的实践","slug":"对日志架构使用比较好的实践","link":"#对日志架构使用比较好的实践","children":[]},{"level":3,"title":"对现有系统日志架构的改造建议","slug":"对现有系统日志架构的改造建议","link":"#对现有系统日志架构的改造建议","children":[]}]},{"level":2,"title":"参考文档","slug":"参考文档","link":"#参考文档","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703584561000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":19.05,"words":5715},"filePathRelative":"develop/package/dev-package-x-log.md","localizedDate":"2019年3月15日","excerpt":"<h1> 常用开发库 - 日志类库详解</h1>\\n<blockquote>\\n<p>Java日志库是最能体现Java库在进化中的渊源关系的，在理解时重点理解日志框架本身和日志门面，以及比较好的实践等。要关注其历史渊源和设计（比如桥接），而具体在使用时查询接口即可， 否则会陷入JUL(Java Util Log), JCL(Commons Logging), Log4j, SLF4J, Logback，Log4j2傻傻分不清楚的境地。</p>\\n</blockquote>\\n<h2> 日志库简介</h2>\\n<blockquote>\\n<p>我认为全面理解日志库需要从下面三个角度去理解：</p>\\n</blockquote>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};