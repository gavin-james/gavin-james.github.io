const e=JSON.parse('{"key":"v-dbb17486","path":"/develop/package/dev-package-x-lombok.html","title":"Lombok工具库详解","lang":"zh-CN","frontmatter":{"date":"2019-03-17T00:00:00.000Z","category":["常用开发库"],"tag":["常用开发库"],"description":"Lombok工具库详解 Lombok是一款非常实用Java工具，可用来帮助开发人员消除Java的冗长代码，尤其是对于简单的Java对象（POJO）。实际上我并不推荐使用Lombok（不主动使用它）, 但是因为它有着很大的使用量，我们仍然有必要掌握它，不仅知道如何使用和它解决的问题，还要知道它的坑。 Lombok的引入 我们通常需要编写大量代码才能使类变得有用。如以下内容： toString()方法 hashCode() and equals()方法 Getter and Setter 方法 构造函数","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/develop/package/dev-package-x-lombok.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"Lombok工具库详解"}],["meta",{"property":"og:description","content":"Lombok工具库详解 Lombok是一款非常实用Java工具，可用来帮助开发人员消除Java的冗长代码，尤其是对于简单的Java对象（POJO）。实际上我并不推荐使用Lombok（不主动使用它）, 但是因为它有着很大的使用量，我们仍然有必要掌握它，不仅知道如何使用和它解决的问题，还要知道它的坑。 Lombok的引入 我们通常需要编写大量代码才能使类变得有用。如以下内容： toString()方法 hashCode() and equals()方法 Getter and Setter 方法 构造函数"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-27T08:55:11.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"常用开发库"}],["meta",{"property":"article:published_time","content":"2019-03-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-27T08:55:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Lombok工具库详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-17T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-27T08:55:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"Lombok的引入","slug":"lombok的引入","link":"#lombok的引入","children":[{"level":3,"title":"在引入Lombok之前我们是怎么做的","slug":"在引入lombok之前我们是怎么做的","link":"#在引入lombok之前我们是怎么做的","children":[]}]},{"level":2,"title":"Lombok的安装和使用","slug":"lombok的安装和使用","link":"#lombok的安装和使用","children":[{"level":3,"title":"Lombok官网","slug":"lombok官网","link":"#lombok官网","children":[]},{"level":3,"title":"Lombok安装","slug":"lombok安装","link":"#lombok安装","children":[]},{"level":3,"title":"Lombok注解说明","slug":"lombok注解说明","link":"#lombok注解说明","children":[]},{"level":3,"title":"Lombok代码示例","slug":"lombok代码示例","link":"#lombok代码示例","children":[]}]},{"level":2,"title":"Lombok深入理解","slug":"lombok深入理解","link":"#lombok深入理解","children":[{"level":3,"title":"Lombok解决了什么问题","slug":"lombok解决了什么问题","link":"#lombok解决了什么问题","children":[]},{"level":3,"title":"Lombok的原理","slug":"lombok的原理","link":"#lombok的原理","children":[]},{"level":3,"title":"Lombok类似原理工具有什么","slug":"lombok类似原理工具有什么","link":"#lombok类似原理工具有什么","children":[]},{"level":3,"title":"Lombok没有未来 - Java14 Record了解下","slug":"lombok没有未来-java14-record了解下","link":"#lombok没有未来-java14-record了解下","children":[]}]},{"level":2,"title":"Lombok有什么坑","slug":"lombok有什么坑","link":"#lombok有什么坑","children":[{"level":3,"title":"@Data的坑","slug":"data的坑","link":"#data的坑","children":[]},{"level":3,"title":"代码可读性，可调试性低","slug":"代码可读性-可调试性低","link":"#代码可读性-可调试性低","children":[]},{"level":3,"title":"Lombok有很强的侵入性","slug":"lombok有很强的侵入性","link":"#lombok有很强的侵入性","children":[]},{"level":3,"title":"Lombok破坏了封装性","slug":"lombok破坏了封装性","link":"#lombok破坏了封装性","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703667311000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":3}]},"readingTime":{"minutes":15.69,"words":4706},"filePathRelative":"develop/package/dev-package-x-lombok.md","localizedDate":"2019年3月17日","excerpt":"<h1> Lombok工具库详解</h1>\\n<blockquote>\\n<p>Lombok是一款非常实用Java工具，可用来帮助开发人员消除Java的冗长代码，尤其是对于简单的Java对象（POJO）。实际上我并不推荐使用Lombok（不主动使用它）, 但是因为它有着很大的使用量，我们仍然有必要掌握它，不仅知道如何使用和它解决的问题，还要知道它的坑。</p>\\n</blockquote>\\n<h2> Lombok的引入</h2>\\n<p>我们通常需要编写大量代码才能使类变得有用。如以下内容：</p>\\n<ul>\\n<li><code>toString()</code>方法</li>\\n<li><code>hashCode()</code> and <code>equals()</code>方法</li>\\n<li><code>Getter</code> and <code>Setter</code> 方法</li>\\n<li>构造函数</li>\\n</ul>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};