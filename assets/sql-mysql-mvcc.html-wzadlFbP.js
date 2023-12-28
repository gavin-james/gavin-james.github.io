const e=JSON.parse('{"key":"v-58dc037c","path":"/db/sql-mysql/sql-mysql-mvcc.html","title":"MySQL - MySQL InnoDB的MVCC实现机制","lang":"zh-CN","frontmatter":{"date":"2022-06-02T00:00:00.000Z","category":["SQL MySQL"],"tag":["SQL MySQL"],"description":"MySQL - MySQL InnoDB的MVCC实现机制 MySQL 中InnoDB中实现了事务（多版本并发控制MVCC+锁）， 其中通过MVCC解决隔离性问题。具体而言，MVCC就是为了实现读-写冲突不加锁，而这个读指的就是快照读, 而非当前读，当前读实际上是一种加锁的操作，是悲观锁的实现; 这里转一篇文章带你理解InnoDB中MVCC的实现机制。 前提概要 什么是MVCC?","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/sql-mysql/sql-mysql-mvcc.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"MySQL - MySQL InnoDB的MVCC实现机制"}],["meta",{"property":"og:description","content":"MySQL - MySQL InnoDB的MVCC实现机制 MySQL 中InnoDB中实现了事务（多版本并发控制MVCC+锁）， 其中通过MVCC解决隔离性问题。具体而言，MVCC就是为了实现读-写冲突不加锁，而这个读指的就是快照读, 而非当前读，当前读实际上是一种加锁的操作，是悲观锁的实现; 这里转一篇文章带你理解InnoDB中MVCC的实现机制。 前提概要 什么是MVCC?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:34:19.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"SQL MySQL"}],["meta",{"property":"article:published_time","content":"2022-06-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:34:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL - MySQL InnoDB的MVCC实现机制\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-02T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:34:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"前提概要","slug":"前提概要","link":"#前提概要","children":[{"level":3,"title":"什么是MVCC?","slug":"什么是mvcc","link":"#什么是mvcc","children":[]},{"level":3,"title":"什么是当前读和快照读？","slug":"什么是当前读和快照读","link":"#什么是当前读和快照读","children":[]},{"level":3,"title":"当前读，快照读和MVCC的关系","slug":"当前读-快照读和mvcc的关系","link":"#当前读-快照读和mvcc的关系","children":[]},{"level":3,"title":"MVCC能解决什么问题，好处是？","slug":"mvcc能解决什么问题-好处是","link":"#mvcc能解决什么问题-好处是","children":[]},{"level":3,"title":"小结一下","slug":"小结一下","link":"#小结一下","children":[]}]},{"level":2,"title":"MVCC的实现原理","slug":"mvcc的实现原理","link":"#mvcc的实现原理","children":[{"level":3,"title":"隐式字段","slug":"隐式字段","link":"#隐式字段","children":[]},{"level":3,"title":"undo日志","slug":"undo日志","link":"#undo日志","children":[]},{"level":3,"title":"Read View(读视图)","slug":"read-view-读视图","link":"#read-view-读视图","children":[]},{"level":3,"title":"整体流程","slug":"整体流程","link":"#整体流程","children":[]}]},{"level":2,"title":"MVCC相关问题","slug":"mvcc相关问题","link":"#mvcc相关问题","children":[{"level":3,"title":"RR是如何在RC级的基础上解决不可重复读的？","slug":"rr是如何在rc级的基础上解决不可重复读的","link":"#rr是如何在rc级的基础上解决不可重复读的","children":[]},{"level":3,"title":"RC,RR级别下的InnoDB快照读有什么不同？","slug":"rc-rr级别下的innodb快照读有什么不同","link":"#rc-rr级别下的innodb快照读有什么不同","children":[]}]},{"level":2,"title":"文章来源","slug":"文章来源","link":"#文章来源","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703579659000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":15.75,"words":4724},"filePathRelative":"db/sql-mysql/sql-mysql-mvcc.md","localizedDate":"2022年6月2日","excerpt":"<h1> MySQL - MySQL InnoDB的MVCC实现机制</h1>\\n<blockquote>\\n<p>MySQL 中InnoDB中实现了事务（多版本并发控制MVCC+锁）， 其中通过MVCC解决隔离性问题。具体而言，<strong>MVCC就是为了实现读-写冲突不加锁</strong>，而这个读指的就是<strong>快照读</strong>, 而非当前读，当<strong>前读实际上是一种加锁的操作，是悲观锁的实现</strong>; 这里转一篇文章带你理解InnoDB中MVCC的实现机制。</p>\\n</blockquote>\\n<h2> 前提概要</h2>\\n<h3> 什么是MVCC?</h3>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};