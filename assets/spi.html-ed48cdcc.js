const e=JSON.parse('{"key":"v-7a28917c","path":"/Java/basic/spi.html","title":"SPI机制详解","lang":"zh-CN","frontmatter":{"description":"SPI机制详解 SPI（Service Provider Interface），是JDK内置的一种 服务提供发现机制，可以用来启用框架扩展和替换组件，主要是被框架的开发人员使用。@pdai SPI（Service Provider Interface），是JDK内置的一种 服务提供发现机制，可以用来启用框架扩展和替换组件，主要是被框架的开发人员使用，比如java.sql.Driver接口，其他不同厂商可以针对同一接口做出不同的实现，MySQL和PostgreSQL都有不同的实现提供给用户，而Java的SPI机制可以为某个接口寻找服务实现。Java中SPI机制主要思想是将装配的控制权移到程序之外，在模块化设计中这个机制尤其重要，其核心思想就是 解耦。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/Java/basic/spi.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"SPI机制详解"}],["meta",{"property":"og:description","content":"SPI机制详解 SPI（Service Provider Interface），是JDK内置的一种 服务提供发现机制，可以用来启用框架扩展和替换组件，主要是被框架的开发人员使用。@pdai SPI（Service Provider Interface），是JDK内置的一种 服务提供发现机制，可以用来启用框架扩展和替换组件，主要是被框架的开发人员使用，比如java.sql.Driver接口，其他不同厂商可以针对同一接口做出不同的实现，MySQL和PostgreSQL都有不同的实现提供给用户，而Java的SPI机制可以为某个接口寻找服务实现。Java中SPI机制主要思想是将装配的控制权移到程序之外，在模块化设计中这个机制尤其重要，其核心思想就是 解耦。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-12T07:29:28.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:modified_time","content":"2023-06-12T07:29:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SPI机制详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-12T07:29:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"SPI机制的简单示例","slug":"spi机制的简单示例","link":"#spi机制的简单示例","children":[]},{"level":2,"title":"SPI机制的广泛应用","slug":"spi机制的广泛应用","link":"#spi机制的广泛应用","children":[{"level":3,"title":"SPI机制 - JDBC DriverManager","slug":"spi机制-jdbc-drivermanager","link":"#spi机制-jdbc-drivermanager","children":[]},{"level":3,"title":"SPI机制 - Common-Logging","slug":"spi机制-common-logging","link":"#spi机制-common-logging","children":[]},{"level":3,"title":"SPI机制 - 插件体系","slug":"spi机制-插件体系","link":"#spi机制-插件体系","children":[]},{"level":3,"title":"SPI机制 - Spring中SPI机制","slug":"spi机制-spring中spi机制","link":"#spi机制-spring中spi机制","children":[]}]},{"level":2,"title":"SPI机制深入理解","slug":"spi机制深入理解","link":"#spi机制深入理解","children":[{"level":3,"title":"SPI机制通常怎么使用","slug":"spi机制通常怎么使用","link":"#spi机制通常怎么使用","children":[]},{"level":3,"title":"SPI和API的区别是什么","slug":"spi和api的区别是什么","link":"#spi和api的区别是什么","children":[]},{"level":3,"title":"SPI机制实现原理","slug":"spi机制实现原理","link":"#spi机制实现原理","children":[]},{"level":3,"title":"SPI机制的缺陷","slug":"spi机制的缺陷","link":"#spi机制的缺陷","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1686554968000,"updatedTime":1686554968000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":1}]},"readingTime":{"minutes":20.1,"words":6030},"filePathRelative":"Java/basic/spi.md","localizedDate":"2023年6月12日","excerpt":"<h1> SPI机制详解</h1>\\n<blockquote>\\n<p>SPI（Service Provider Interface），是JDK内置的一种 服务提供发现机制，可以用来启用框架扩展和替换组件，主要是被框架的开发人员使用。@pdai</p>\\n</blockquote>\\n<p>SPI（Service Provider Interface），是JDK内置的一种 服务提供发现机制，可以用来启用框架扩展和替换组件，主要是被框架的开发人员使用，比如java.sql.Driver接口，其他不同厂商可以针对同一接口做出不同的实现，MySQL和PostgreSQL都有不同的实现提供给用户，而Java的SPI机制可以为某个接口寻找服务实现。Java中SPI机制主要思想是将装配的控制权移到程序之外，在模块化设计中这个机制尤其重要，其核心思想就是 <strong>解耦</strong>。</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
