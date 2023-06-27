const e=JSON.parse('{"key":"v-08ff9d40","path":"/Java/basic/java-basic-x-annotation.html","title":"注解机制详解","lang":"zh-CN","frontmatter":{"date":"2022-02-07T00:00:00.000Z","category":["Java 基础"],"tag":["Java 基础"],"description":"注解机制详解 注解是JDK1.5版本开始引入的一个特性，用于对代码进行说明，可以对包、类、接口、字段、方法参数、局部变量等进行注解。它是框架学习和设计者必须掌握的基础。@pdai 注解基础 注解是JDK1.5版本开始引入的一个特性，用于对代码进行说明，可以对包、类、接口、字段、方法参数、局部变量等进行注解。它主要的作用有以下四方面： 生成文档，通过代码里标识的元数据生成javadoc文档。 编译检查，通过代码里标识的元数据让编译器在编译期间进行检查验证。 编译时动态处理，编译时通过代码里标识的元数据动态处理，例如动态生成代码。 运行时动态处理，运行时通过代码里标识的元数据动态处理，例如使用反射注入实例。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/Java/basic/java-basic-x-annotation.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"注解机制详解"}],["meta",{"property":"og:description","content":"注解机制详解 注解是JDK1.5版本开始引入的一个特性，用于对代码进行说明，可以对包、类、接口、字段、方法参数、局部变量等进行注解。它是框架学习和设计者必须掌握的基础。@pdai 注解基础 注解是JDK1.5版本开始引入的一个特性，用于对代码进行说明，可以对包、类、接口、字段、方法参数、局部变量等进行注解。它主要的作用有以下四方面： 生成文档，通过代码里标识的元数据生成javadoc文档。 编译检查，通过代码里标识的元数据让编译器在编译期间进行检查验证。 编译时动态处理，编译时通过代码里标识的元数据动态处理，例如动态生成代码。 运行时动态处理，运行时通过代码里标识的元数据动态处理，例如使用反射注入实例。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-27T10:13:08.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java 基础"}],["meta",{"property":"article:published_time","content":"2022-02-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-27T10:13:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"注解机制详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-02-07T00:00:00.000Z\\",\\"dateModified\\":\\"2023-06-27T10:13:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"注解基础","slug":"注解基础","link":"#注解基础","children":[{"level":3,"title":"Java内置注解","slug":"java内置注解","link":"#java内置注解","children":[]},{"level":3,"title":"元注解","slug":"元注解","link":"#元注解","children":[]},{"level":3,"title":"注解与反射接口","slug":"注解与反射接口","link":"#注解与反射接口","children":[]},{"level":3,"title":"自定义注解","slug":"自定义注解","link":"#自定义注解","children":[]}]},{"level":2,"title":"深入理解注解","slug":"深入理解注解","link":"#深入理解注解","children":[{"level":3,"title":"Java8提供了哪些新的注解？","slug":"java8提供了哪些新的注解","link":"#java8提供了哪些新的注解","children":[]},{"level":3,"title":"注解支持继承吗？","slug":"注解支持继承吗","link":"#注解支持继承吗","children":[]},{"level":3,"title":"注解实现的原理？","slug":"注解实现的原理","link":"#注解实现的原理","children":[]}]},{"level":2,"title":"注解的应用场景","slug":"注解的应用场景","link":"#注解的应用场景","children":[{"level":3,"title":"配置化到注解化 - 框架的演进","slug":"配置化到注解化-框架的演进","link":"#配置化到注解化-框架的演进","children":[]},{"level":3,"title":"继承实现到注解实现 - Junit3到Junit4","slug":"继承实现到注解实现-junit3到junit4","link":"#继承实现到注解实现-junit3到junit4","children":[]},{"level":3,"title":"自定义注解和AOP - 通过切面实现解耦","slug":"自定义注解和aop-通过切面实现解耦","link":"#自定义注解和aop-通过切面实现解耦","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1687860788000,"updatedTime":1687860788000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":1}]},"readingTime":{"minutes":17.99,"words":5398},"filePathRelative":"Java/basic/java-basic-x-annotation.md","localizedDate":"2022年2月7日","excerpt":"<h1> 注解机制详解</h1>\\n<blockquote>\\n<p>注解是JDK1.5版本开始引入的一个特性，用于对代码进行说明，可以对包、类、接口、字段、方法参数、局部变量等进行注解。它是框架学习和设计者必须掌握的基础。@pdai</p>\\n</blockquote>\\n<h2> 注解基础</h2>\\n<p>注解是JDK1.5版本开始引入的一个特性，用于对代码进行说明，可以对包、类、接口、字段、方法参数、局部变量等进行注解。它主要的作用有以下四方面：</p>\\n<ul>\\n<li>生成文档，通过代码里标识的元数据生成javadoc文档。</li>\\n<li>编译检查，通过代码里标识的元数据让编译器在编译期间进行检查验证。</li>\\n<li>编译时动态处理，编译时通过代码里标识的元数据动态处理，例如动态生成代码。</li>\\n<li>运行时动态处理，运行时通过代码里标识的元数据动态处理，例如使用反射注入实例。</li>\\n</ul>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
