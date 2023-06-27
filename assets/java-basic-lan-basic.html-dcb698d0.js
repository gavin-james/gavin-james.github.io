const l=JSON.parse('{"key":"v-97baa718","path":"/Java/basic/java-basic-lan-basic.html","title":"知识点","lang":"zh-CN","frontmatter":{"date":"2022-02-04T00:00:00.000Z","category":["Java 基础"],"tag":["Java 基础"],"description":"知识点 本文主要对Java基础知识点进行总结。 @pdai 数据类型 包装类型 八个基本类型: boolean/1 byte/8 char/16 short/16 int/32 float/32 long/64 double/64 基本类型都有对应的包装类型，基本类型与其对应的包装类型之间的赋值使用自动装箱与拆箱完成。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/Java/basic/java-basic-lan-basic.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"知识点"}],["meta",{"property":"og:description","content":"知识点 本文主要对Java基础知识点进行总结。 @pdai 数据类型 包装类型 八个基本类型: boolean/1 byte/8 char/16 short/16 int/32 float/32 long/64 double/64 基本类型都有对应的包装类型，基本类型与其对应的包装类型之间的赋值使用自动装箱与拆箱完成。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-27T10:13:08.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java 基础"}],["meta",{"property":"article:published_time","content":"2022-02-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-27T10:13:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"知识点\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-02-04T00:00:00.000Z\\",\\"dateModified\\":\\"2023-06-27T10:13:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"数据类型","slug":"数据类型","link":"#数据类型","children":[{"level":3,"title":"包装类型","slug":"包装类型","link":"#包装类型","children":[]},{"level":3,"title":"缓存池","slug":"缓存池","link":"#缓存池","children":[]}]},{"level":2,"title":"String","slug":"string","link":"#string","children":[{"level":3,"title":"概览","slug":"概览","link":"#概览","children":[]},{"level":3,"title":"不可变的好处","slug":"不可变的好处","link":"#不可变的好处","children":[]},{"level":3,"title":"String, StringBuffer and StringBuilder","slug":"string-stringbuffer-and-stringbuilder","link":"#string-stringbuffer-and-stringbuilder","children":[]},{"level":3,"title":"String.intern()","slug":"string-intern","link":"#string-intern","children":[]}]},{"level":2,"title":"运算","slug":"运算","link":"#运算","children":[{"level":3,"title":"参数传递","slug":"参数传递","link":"#参数传递","children":[]},{"level":3,"title":"float 与 double","slug":"float-与-double","link":"#float-与-double","children":[]},{"level":3,"title":"隐式类型转换","slug":"隐式类型转换","link":"#隐式类型转换","children":[]},{"level":3,"title":"switch","slug":"switch","link":"#switch","children":[]}]},{"level":2,"title":"继承","slug":"继承","link":"#继承","children":[{"level":3,"title":"访问权限","slug":"访问权限","link":"#访问权限","children":[]},{"level":3,"title":"抽象类与接口","slug":"抽象类与接口","link":"#抽象类与接口","children":[]},{"level":3,"title":"super","slug":"super","link":"#super","children":[]},{"level":3,"title":"重写与重载","slug":"重写与重载","link":"#重写与重载","children":[]}]},{"level":2,"title":"Object 通用方法","slug":"object-通用方法","link":"#object-通用方法","children":[{"level":3,"title":"概览","slug":"概览-1","link":"#概览-1","children":[]},{"level":3,"title":"equals()","slug":"equals","link":"#equals","children":[]},{"level":3,"title":"hashCode()","slug":"hashcode","link":"#hashcode","children":[]},{"level":3,"title":"toString()","slug":"tostring","link":"#tostring","children":[]},{"level":3,"title":"clone()","slug":"clone","link":"#clone","children":[]}]},{"level":2,"title":"关键字","slug":"关键字","link":"#关键字","children":[{"level":3,"title":"final","slug":"final","link":"#final","children":[]},{"level":3,"title":"static","slug":"static","link":"#static","children":[]}]},{"level":2,"title":"反射","slug":"反射","link":"#反射","children":[]},{"level":2,"title":"异常","slug":"异常","link":"#异常","children":[]},{"level":2,"title":"泛型","slug":"泛型","link":"#泛型","children":[]},{"level":2,"title":"注解","slug":"注解","link":"#注解","children":[]},{"level":2,"title":"特性","slug":"特性","link":"#特性","children":[{"level":3,"title":"Java 各版本的新特性","slug":"java-各版本的新特性","link":"#java-各版本的新特性","children":[]},{"level":3,"title":"Java 与 C++ 的区别","slug":"java-与-c-的区别","link":"#java-与-c-的区别","children":[]},{"level":3,"title":"JRE or JDK","slug":"jre-or-jdk","link":"#jre-or-jdk","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1687860788000,"updatedTime":1687860788000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":1}]},"readingTime":{"minutes":25.29,"words":7588},"filePathRelative":"Java/basic/java-basic-lan-basic.md","localizedDate":"2022年2月4日","excerpt":"<h1> 知识点</h1>\\n<blockquote>\\n<p>本文主要对Java基础知识点进行总结。 @pdai</p>\\n</blockquote>\\n<h2> 数据类型</h2>\\n<h3> 包装类型</h3>\\n<p>八个基本类型:</p>\\n<ul>\\n<li>boolean/1</li>\\n<li>byte/8</li>\\n<li>char/16</li>\\n<li>short/16</li>\\n<li>int/32</li>\\n<li>float/32</li>\\n<li>long/64</li>\\n<li>double/64</li>\\n</ul>\\n<p>基本类型都有对应的包装类型，基本类型与其对应的包装类型之间的赋值使用自动装箱与拆箱完成。</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{l as data};
