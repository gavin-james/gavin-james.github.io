const e=JSON.parse('{"key":"v-74cb7293","path":"/db/nosql-redis/db-redis-x-performance.html","title":"Redis进阶 - 性能调优：Redis性能调优详解","lang":"zh-CN","frontmatter":{"date":"2022-06-27T00:00:00.000Z","category":["NoSQL Redis"],"tag":["NoSQL Redis"],"description":"Redis进阶 - 性能调优：Redis性能调优详解 Redis 的性能问题，涉及到的知识点非常广，几乎涵盖了 CPU、内存、网络、甚至磁盘的方方面面；同时还需要对上文中一些基础或底层有详细的了解。针对Redis的性能调优，这里整理分享一篇水滴与银弹（公众号）的文章，这篇文章可以帮助你构筑Redis性能调优的知识体系。 前言 Redis 作为优秀的内存数据库，其拥有非常高的性能，单个实例的 OPS 能够达到 10W 左右。但也正因此如此，当我们在使用 Redis 时，如果发现操作延迟变大的情况，就会与我们的预期不符。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/nosql-redis/db-redis-x-performance.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"Redis进阶 - 性能调优：Redis性能调优详解"}],["meta",{"property":"og:description","content":"Redis进阶 - 性能调优：Redis性能调优详解 Redis 的性能问题，涉及到的知识点非常广，几乎涵盖了 CPU、内存、网络、甚至磁盘的方方面面；同时还需要对上文中一些基础或底层有详细的了解。针对Redis的性能调优，这里整理分享一篇水滴与银弹（公众号）的文章，这篇文章可以帮助你构筑Redis性能调优的知识体系。 前言 Redis 作为优秀的内存数据库，其拥有非常高的性能，单个实例的 OPS 能够达到 10W 左右。但也正因此如此，当我们在使用 Redis 时，如果发现操作延迟变大的情况，就会与我们的预期不符。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:52:28.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"NoSQL Redis"}],["meta",{"property":"article:published_time","content":"2022-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:52:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis进阶 - 性能调优：Redis性能调优详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:52:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"Redis真的变慢了吗？","slug":"redis真的变慢了吗","link":"#redis真的变慢了吗","children":[]},{"level":2,"title":"使用复杂度过高的命令","slug":"使用复杂度过高的命令","link":"#使用复杂度过高的命令","children":[]},{"level":2,"title":"操作bigkey","slug":"操作bigkey","link":"#操作bigkey","children":[]},{"level":2,"title":"集中过期","slug":"集中过期","link":"#集中过期","children":[]},{"level":2,"title":"实例内存达到上限","slug":"实例内存达到上限","link":"#实例内存达到上限","children":[]},{"level":2,"title":"fork耗时严重","slug":"fork耗时严重","link":"#fork耗时严重","children":[]},{"level":2,"title":"开启内存大页","slug":"开启内存大页","link":"#开启内存大页","children":[]},{"level":2,"title":"开启AOF","slug":"开启aof","link":"#开启aof","children":[]},{"level":2,"title":"绑定CPU","slug":"绑定cpu","link":"#绑定cpu","children":[]},{"level":2,"title":"使用Swap","slug":"使用swap","link":"#使用swap","children":[]},{"level":2,"title":"碎片整理","slug":"碎片整理","link":"#碎片整理","children":[]},{"level":2,"title":"网络带宽过载","slug":"网络带宽过载","link":"#网络带宽过载","children":[]},{"level":2,"title":"其他原因","slug":"其他原因","link":"#其他原因","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"后记","slug":"后记","link":"#后记","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703580748000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":3}]},"readingTime":{"minutes":40.71,"words":12213},"filePathRelative":"db/nosql-redis/db-redis-x-performance.md","localizedDate":"2022年6月27日","excerpt":"<h1> Redis进阶 - 性能调优：Redis性能调优详解</h1>\\n<blockquote>\\n<p>Redis 的性能问题，涉及到的知识点非常广，几乎涵盖了 CPU、内存、网络、甚至磁盘的方方面面；同时还需要对上文中一些基础或底层有详细的了解。针对Redis的性能调优，这里整理分享一篇水滴与银弹（公众号）的文章，这篇文章可以帮助你构筑Redis性能调优的知识体系。</p>\\n</blockquote>\\n<h2> 前言</h2>\\n<blockquote>\\n<p>Redis 作为优秀的内存数据库，其拥有非常高的性能，单个实例的 OPS 能够达到 10W 左右。但也正因此如此，当我们在使用 Redis 时，如果发现操作延迟变大的情况，就会与我们的预期不符。</p>\\n</blockquote>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};