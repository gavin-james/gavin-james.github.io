const e=JSON.parse('{"key":"v-44ff8903","path":"/java/collection/java-collection-ArrayList.html","title":"Collection - ArrayList 源码解析","lang":"zh-CN","frontmatter":{"date":"2022-02-12T00:00:00.000Z","category":["Java 集合"],"tag":["Java 集合"],"description":"Collection - ArrayList 源码解析 本文主要对Collection - ArrayList进行源码解析。 概述 ArrayList实现了List接口，是顺序容器，即元素存放的数据与放进去的顺序相同，允许放入null元素，底层通过数组实现。除该类未实现同步外，其余跟Vector大致相同。每个ArrayList都有一个容量(capacity)，表示底层数组的实际大小，容器内存储元素的个数不能多于当前容量。当向容器中添加元素时，如果容量不足，容器会自动增大底层数组的大小。前面已经提过，Java泛型只是编译器提供的语法糖，所以这里的数组是一个Object数组，以便能够容纳任何类型的对象。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/java/collection/java-collection-ArrayList.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"Collection - ArrayList 源码解析"}],["meta",{"property":"og:description","content":"Collection - ArrayList 源码解析 本文主要对Collection - ArrayList进行源码解析。 概述 ArrayList实现了List接口，是顺序容器，即元素存放的数据与放进去的顺序相同，允许放入null元素，底层通过数组实现。除该类未实现同步外，其余跟Vector大致相同。每个ArrayList都有一个容量(capacity)，表示底层数组的实际大小，容器内存储元素的个数不能多于当前容量。当向容器中添加元素时，如果容量不足，容器会自动增大底层数组的大小。前面已经提过，Java泛型只是编译器提供的语法糖，所以这里的数组是一个Object数组，以便能够容纳任何类型的对象。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-25T09:17:23.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java 集合"}],["meta",{"property":"article:published_time","content":"2022-02-12T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-25T09:17:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Collection - ArrayList 源码解析\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-02-12T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-25T09:17:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"ArrayList的实现","slug":"arraylist的实现","link":"#arraylist的实现","children":[{"level":3,"title":"底层数据结构","slug":"底层数据结构","link":"#底层数据结构","children":[]},{"level":3,"title":"构造函数","slug":"构造函数","link":"#构造函数","children":[]},{"level":3,"title":"自动扩容","slug":"自动扩容","link":"#自动扩容","children":[]},{"level":3,"title":"add(), addAll()","slug":"add-addall","link":"#add-addall","children":[]},{"level":3,"title":"set()","slug":"set","link":"#set","children":[]},{"level":3,"title":"get()","slug":"get","link":"#get","children":[]},{"level":3,"title":"remove()","slug":"remove","link":"#remove","children":[]},{"level":3,"title":"trimToSize()","slug":"trimtosize","link":"#trimtosize","children":[]},{"level":3,"title":"indexOf(), lastIndexOf()","slug":"indexof-lastindexof","link":"#indexof-lastindexof","children":[]},{"level":3,"title":"Fail-Fast机制:","slug":"fail-fast机制","link":"#fail-fast机制","children":[]}]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1687917370000,"updatedTime":1703495843000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":4}]},"readingTime":{"minutes":8.67,"words":2601},"filePathRelative":"java/collection/java-collection-ArrayList.md","localizedDate":"2022年2月12日","excerpt":"<h1> Collection - ArrayList 源码解析</h1>\\n<blockquote>\\n<p>本文主要对Collection - ArrayList进行源码解析。</p>\\n</blockquote>\\n<h2> 概述</h2>\\n<p><em>ArrayList</em>实现了<em>List</em>接口，是顺序容器，即元素存放的数据与放进去的顺序相同，允许放入<code>null</code>元素，底层通过<strong>数组实现</strong>。除该类未实现同步外，其余跟<em>Vector</em>大致相同。每个<em>ArrayList</em>都有一个容量(capacity)，表示底层数组的实际大小，容器内存储元素的个数不能多于当前容量。当向容器中添加元素时，如果容量不足，容器会自动增大底层数组的大小。前面已经提过，Java泛型只是编译器提供的语法糖，所以这里的数组是一个Object数组，以便能够容纳任何类型的对象。</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};