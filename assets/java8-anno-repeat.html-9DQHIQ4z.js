const n=JSON.parse('{"key":"v-0c4bedb4","path":"/java/javaup/java8-anno-repeat.html","title":"Java 8 - 重复注解","lang":"zh-CN","frontmatter":{"date":"2022-04-06T00:00:00.000Z","category":["Java 新特性"],"tag":["Java 新特性"],"description":"Java 8 - 重复注解 理解Java 8 重复注解需理解几个问题: Jdk8之前对重复注解是怎么做的? Jdk8对重复注解添加了什么支持? 什么是重复注解 允许在同一申明类型(类，属性，或方法)的多次使用同一个注解 JDK8之前 java 8之前也有重复使用注解的解决方案，但可读性不是很好，比如下面的代码: public @interface Authority { String role(); } public @interface Authorities { Authority[] value(); } public class RepeatAnnotationUseOldVersion { @Authorities({@Authority(role=\\"Admin\\"),@Authority(role=\\"Manager\\")}) public void doSomeThing(){ } }","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/java/javaup/java8-anno-repeat.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"Java 8 - 重复注解"}],["meta",{"property":"og:description","content":"Java 8 - 重复注解 理解Java 8 重复注解需理解几个问题: Jdk8之前对重复注解是怎么做的? Jdk8对重复注解添加了什么支持? 什么是重复注解 允许在同一申明类型(类，属性，或方法)的多次使用同一个注解 JDK8之前 java 8之前也有重复使用注解的解决方案，但可读性不是很好，比如下面的代码: public @interface Authority { String role(); } public @interface Authorities { Authority[] value(); } public class RepeatAnnotationUseOldVersion { @Authorities({@Authority(role=\\"Admin\\"),@Authority(role=\\"Manager\\")}) public void doSomeThing(){ } }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-25T08:42:25.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java 新特性"}],["meta",{"property":"article:published_time","content":"2022-04-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-25T08:42:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 8 - 重复注解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-06T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-25T08:42:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"什么是重复注解","slug":"什么是重复注解","link":"#什么是重复注解","children":[{"level":3,"title":"JDK8之前","slug":"jdk8之前","link":"#jdk8之前","children":[]},{"level":3,"title":"Jdk8重复注解","slug":"jdk8重复注解","link":"#jdk8重复注解","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1687917370000,"updatedTime":1703493745000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":1.18,"words":355},"filePathRelative":"java/javaup/java8-anno-repeat.md","localizedDate":"2022年4月6日","excerpt":"<h1> Java 8 - 重复注解</h1>\\n<blockquote>\\n<p>理解Java 8 重复注解需理解几个问题:</p>\\n<ul>\\n<li>Jdk8之前对重复注解是怎么做的?</li>\\n<li>Jdk8对重复注解添加了什么支持?</li>\\n</ul>\\n</blockquote>\\n<h2> 什么是重复注解</h2>\\n<p>允许在同一申明类型(类，属性，或方法)的多次使用同一个注解</p>\\n<h3> JDK8之前</h3>\\n<p>java 8之前也有重复使用注解的解决方案，但可读性不是很好，比如下面的代码:</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token annotation punctuation\\">@interface</span> <span class=\\"token class-name\\">Authority</span> <span class=\\"token punctuation\\">{</span>\\n     <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">role</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">public</span> <span class=\\"token annotation punctuation\\">@interface</span> <span class=\\"token class-name\\">Authorities</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">Authority</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token function\\">value</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">RepeatAnnotationUseOldVersion</span> <span class=\\"token punctuation\\">{</span>\\n\\n    <span class=\\"token annotation punctuation\\">@Authorities</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span><span class=\\"token annotation punctuation\\">@Authority</span><span class=\\"token punctuation\\">(</span>role<span class=\\"token operator\\">=</span><span class=\\"token string\\">\\"Admin\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span><span class=\\"token annotation punctuation\\">@Authority</span><span class=\\"token punctuation\\">(</span>role<span class=\\"token operator\\">=</span><span class=\\"token string\\">\\"Manager\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">doSomeThing</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{n as data};