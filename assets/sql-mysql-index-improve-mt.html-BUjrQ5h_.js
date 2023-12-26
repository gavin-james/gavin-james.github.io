const e=JSON.parse('{"key":"v-402977d4","path":"/db/sql-mysql/sql-mysql-index-improve-mt.html","title":"大厂实践 - 美团: MySQL索引原理及慢查询优化","lang":"zh-CN","frontmatter":{"date":"2022-06-05T00:00:00.000Z","category":["SQL MySQL"],"tag":["SQL MySQL"],"description":"大厂实践 - 美团: MySQL索引原理及慢查询优化 目前常用的 SQL 优化方式包括但不限于：业务层优化、SQL逻辑优化、索引优化等。其中索引优化通常通过调整索引或新增索引从而达到 SQL 优化的目的，索引优化往往可以在短时间内产生非常巨大的效果。本文旨在以开发工程师的角度来解释数据库索引的原理和如何优化慢查询。 背景 MySQL凭借着出色的性能、低廉的成本、丰富的资源，已经成为绝大多数互联网公司的首选关系型数据库。虽然性能出色，但所谓“好马配好鞍”，如何能够更好的使用它，已经成为开发工程师的必修课，我们经常会从职位描述上看到诸如“精通MySQL”、“SQL语句优化”、“了解数据库原理”等要求。我们知道一般的应用系统，读写比例在10:1左右，而且插入操作和一般的更新操作很少出现性能问题，遇到最多的，也是最容易出问题的，还是一些复杂的查询操作，所以查询语句的优化显然是重中之重。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/sql-mysql/sql-mysql-index-improve-mt.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"大厂实践 - 美团: MySQL索引原理及慢查询优化"}],["meta",{"property":"og:description","content":"大厂实践 - 美团: MySQL索引原理及慢查询优化 目前常用的 SQL 优化方式包括但不限于：业务层优化、SQL逻辑优化、索引优化等。其中索引优化通常通过调整索引或新增索引从而达到 SQL 优化的目的，索引优化往往可以在短时间内产生非常巨大的效果。本文旨在以开发工程师的角度来解释数据库索引的原理和如何优化慢查询。 背景 MySQL凭借着出色的性能、低廉的成本、丰富的资源，已经成为绝大多数互联网公司的首选关系型数据库。虽然性能出色，但所谓“好马配好鞍”，如何能够更好的使用它，已经成为开发工程师的必修课，我们经常会从职位描述上看到诸如“精通MySQL”、“SQL语句优化”、“了解数据库原理”等要求。我们知道一般的应用系统，读写比例在10:1左右，而且插入操作和一般的更新操作很少出现性能问题，遇到最多的，也是最容易出问题的，还是一些复杂的查询操作，所以查询语句的优化显然是重中之重。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:34:19.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"SQL MySQL"}],["meta",{"property":"article:published_time","content":"2022-06-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:34:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"大厂实践 - 美团: MySQL索引原理及慢查询优化\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-05T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:34:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"背景","slug":"背景","link":"#背景","children":[]},{"level":2,"title":"一个慢查询引发的思考","slug":"一个慢查询引发的思考","link":"#一个慢查询引发的思考","children":[]},{"level":2,"title":"MySQL索引原理","slug":"mysql索引原理","link":"#mysql索引原理","children":[{"level":3,"title":"索引目的","slug":"索引目的","link":"#索引目的","children":[]},{"level":3,"title":"索引原理","slug":"索引原理","link":"#索引原理","children":[]},{"level":3,"title":"磁盘IO与预读","slug":"磁盘io与预读","link":"#磁盘io与预读","children":[]},{"level":3,"title":"索引的数据结构","slug":"索引的数据结构","link":"#索引的数据结构","children":[]}]},{"level":2,"title":"慢查询优化","slug":"慢查询优化","link":"#慢查询优化","children":[{"level":3,"title":"建索引的几大原则","slug":"建索引的几大原则","link":"#建索引的几大原则","children":[]},{"level":3,"title":"回到开始的慢查询","slug":"回到开始的慢查询","link":"#回到开始的慢查询","children":[]},{"level":3,"title":"查询优化神器 - explain命令","slug":"查询优化神器-explain命令","link":"#查询优化神器-explain命令","children":[]},{"level":3,"title":"几个慢查询案例","slug":"几个慢查询案例","link":"#几个慢查询案例","children":[]}]},{"level":2,"title":"写在后面的话","slug":"写在后面的话","link":"#写在后面的话","children":[]},{"level":2,"title":"参考文献","slug":"参考文献","link":"#参考文献","children":[]},{"level":2,"title":"文章来源","slug":"文章来源","link":"#文章来源","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703579659000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":23.27,"words":6982},"filePathRelative":"db/sql-mysql/sql-mysql-index-improve-mt.md","localizedDate":"2022年6月5日","excerpt":"<h1> 大厂实践 - 美团: MySQL索引原理及慢查询优化</h1>\\n<blockquote>\\n<p>目前常用的 SQL 优化方式包括但不限于：业务层优化、SQL逻辑优化、索引优化等。其中索引优化通常通过调整索引或新增索引从而达到 SQL 优化的目的，索引优化往往可以在短时间内产生非常巨大的效果。本文旨在以开发工程师的角度来解释数据库索引的原理和如何优化慢查询。</p>\\n</blockquote>\\n<h2> 背景</h2>\\n<p>MySQL凭借着出色的性能、低廉的成本、丰富的资源，已经成为绝大多数互联网公司的首选关系型数据库。虽然性能出色，但所谓“好马配好鞍”，如何能够更好的使用它，已经成为开发工程师的必修课，我们经常会从职位描述上看到诸如“精通MySQL”、“SQL语句优化”、“了解数据库原理”等要求。我们知道一般的应用系统，读写比例在10:1左右，而且插入操作和一般的更新操作很少出现性能问题，遇到最多的，也是最容易出问题的，还是一些复杂的查询操作，所以查询语句的优化显然是重中之重。</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};