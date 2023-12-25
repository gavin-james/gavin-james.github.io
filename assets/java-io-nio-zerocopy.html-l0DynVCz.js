const e=JSON.parse('{"key":"v-ad7d3fdc","path":"/java/io/java-io-nio-zerocopy.html","title":"Java NIO - 零拷贝实现","lang":"zh-CN","frontmatter":{"date":"2022-03-31T00:00:00.000Z","category":["Java IO/NIO/AIO"],"tag":["Java IO/NIO/AIO"],"description":"Java NIO - 零拷贝实现 这里转一篇Java NIO 零拷贝的实现文章，在此之前建议先理解什么是Linux中零拷贝，可以先看这篇文章。本文从源码着手分析了 Java NIO 对零拷贝的实现，主要包括基于内存映射（mmap）方式的 MappedByteBuffer 以及基于 sendfile 方式的 FileChannel。最后在篇末简单的阐述了一下 Netty 中的零拷贝机制，以及 RocketMQ 和 Kafka 两种消息队列在零拷贝实现方式上的区别。 Java NIO零拷贝","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/java/io/java-io-nio-zerocopy.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"Java NIO - 零拷贝实现"}],["meta",{"property":"og:description","content":"Java NIO - 零拷贝实现 这里转一篇Java NIO 零拷贝的实现文章，在此之前建议先理解什么是Linux中零拷贝，可以先看这篇文章。本文从源码着手分析了 Java NIO 对零拷贝的实现，主要包括基于内存映射（mmap）方式的 MappedByteBuffer 以及基于 sendfile 方式的 FileChannel。最后在篇末简单的阐述了一下 Netty 中的零拷贝机制，以及 RocketMQ 和 Kafka 两种消息队列在零拷贝实现方式上的区别。 Java NIO零拷贝"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-25T08:42:25.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java IO/NIO/AIO"}],["meta",{"property":"article:published_time","content":"2022-03-31T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-25T08:42:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java NIO - 零拷贝实现\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-03-31T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-25T08:42:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"Java NIO零拷贝","slug":"java-nio零拷贝","link":"#java-nio零拷贝","children":[{"level":3,"title":"MappedByteBuffer","slug":"mappedbytebuffer","link":"#mappedbytebuffer","children":[]},{"level":3,"title":"DirectByteBuffer","slug":"directbytebuffer","link":"#directbytebuffer","children":[]},{"level":3,"title":"FileChannel","slug":"filechannel","link":"#filechannel","children":[]}]},{"level":2,"title":"其它的零拷贝实现","slug":"其它的零拷贝实现","link":"#其它的零拷贝实现","children":[{"level":3,"title":"Netty零拷贝","slug":"netty零拷贝","link":"#netty零拷贝","children":[]},{"level":3,"title":"RocketMQ和Kafka对比","slug":"rocketmq和kafka对比","link":"#rocketmq和kafka对比","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1687917370000,"updatedTime":1703493745000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":16.78,"words":5033},"filePathRelative":"java/io/java-io-nio-zerocopy.md","localizedDate":"2022年3月31日","excerpt":"<h1> Java NIO - 零拷贝实现</h1>\\n<blockquote>\\n<p>这里转一篇Java NIO 零拷贝的实现文章，在此之前建议先理解什么是Linux中零拷贝，可以先看这篇文章。本文从源码着手分析了 Java NIO 对零拷贝的实现，主要包括基于内存映射（mmap）方式的 MappedByteBuffer 以及基于 sendfile 方式的 FileChannel。最后在篇末简单的阐述了一下 Netty 中的零拷贝机制，以及 RocketMQ 和 Kafka 两种消息队列在零拷贝实现方式上的区别。</p>\\n</blockquote>\\n<h2> Java NIO零拷贝</h2>\\n","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
