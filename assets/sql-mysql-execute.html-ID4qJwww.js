const e=JSON.parse('{"key":"v-a73fe49c","path":"/db/sql-mysql/sql-mysql-execute.html","title":"MySQL - 一条 SQL 的执行过程详解","lang":"zh-CN","frontmatter":{"date":"2022-06-03T00:00:00.000Z","category":["SQL MySQL"],"tag":["SQL MySQL"],"description":"MySQL - 一条 SQL 的执行过程详解 天天和数据库打交道，一天能写上几十条 SQL 语句，但你知道我们的系统是如何和数据库交互的吗？MySQL 如何帮我们存储数据、又是如何帮我们管理事务？....是不是感觉真的除了写几个 「select * from dual」外基本脑子一片空白？这篇文章就将带你走进 MySQL 的世界，让你彻底了解系统到底是如何和 MySQL 交互的，MySQL 在接受到我们发送的 SQL 语句时又分别做了哪些事情。 前言 天天和数据库打交道，一天能写上几十条 SQL 语句，但你知道我们的系统是如何和数据库交互的吗？MySQL 如何帮我们存储数据、又是如何帮我们管理事务？....是不是感觉真的除了写几个 「select * from dual」外基本脑子一片空白？这篇文章就将带你走进 MySQL 的世界，让你彻底了解系统到底是如何和 MySQL 交互的，MySQL 在接受到我们发送的 SQL 语句时又分别做了哪些事情。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/sql-mysql/sql-mysql-execute.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"MySQL - 一条 SQL 的执行过程详解"}],["meta",{"property":"og:description","content":"MySQL - 一条 SQL 的执行过程详解 天天和数据库打交道，一天能写上几十条 SQL 语句，但你知道我们的系统是如何和数据库交互的吗？MySQL 如何帮我们存储数据、又是如何帮我们管理事务？....是不是感觉真的除了写几个 「select * from dual」外基本脑子一片空白？这篇文章就将带你走进 MySQL 的世界，让你彻底了解系统到底是如何和 MySQL 交互的，MySQL 在接受到我们发送的 SQL 语句时又分别做了哪些事情。 前言 天天和数据库打交道，一天能写上几十条 SQL 语句，但你知道我们的系统是如何和数据库交互的吗？MySQL 如何帮我们存储数据、又是如何帮我们管理事务？....是不是感觉真的除了写几个 「select * from dual」外基本脑子一片空白？这篇文章就将带你走进 MySQL 的世界，让你彻底了解系统到底是如何和 MySQL 交互的，MySQL 在接受到我们发送的 SQL 语句时又分别做了哪些事情。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:34:19.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"SQL MySQL"}],["meta",{"property":"article:published_time","content":"2022-06-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:34:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL - 一条 SQL 的执行过程详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-03T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:34:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"MySQL 驱动","slug":"mysql-驱动","link":"#mysql-驱动","children":[]},{"level":2,"title":"数据库连接池","slug":"数据库连接池","link":"#数据库连接池","children":[]},{"level":2,"title":"网络连接必须由线程来处理","slug":"网络连接必须由线程来处理","link":"#网络连接必须由线程来处理","children":[]},{"level":2,"title":"SQL 接口","slug":"sql-接口","link":"#sql-接口","children":[]},{"level":2,"title":"查询解析器","slug":"查询解析器","link":"#查询解析器","children":[]},{"level":2,"title":"MySQL 查询优化器","slug":"mysql-查询优化器","link":"#mysql-查询优化器","children":[]},{"level":2,"title":"存储引擎","slug":"存储引擎","link":"#存储引擎","children":[]},{"level":2,"title":"执行器","slug":"执行器","link":"#执行器","children":[]},{"level":2,"title":"初识存储引擎","slug":"初识存储引擎","link":"#初识存储引擎","children":[]},{"level":2,"title":"Buffer Pool","slug":"buffer-pool","link":"#buffer-pool","children":[]},{"level":2,"title":"undo 日志文件：记录数据被修改前的样子","slug":"undo-日志文件-记录数据被修改前的样子","link":"#undo-日志文件-记录数据被修改前的样子","children":[]},{"level":2,"title":"redo 日志文件：记录数据被修改后的样子","slug":"redo-日志文件-记录数据被修改后的样子","link":"#redo-日志文件-记录数据被修改后的样子","children":[]},{"level":2,"title":"bin log 日志文件：记录整个操作过程","slug":"bin-log-日志文件-记录整个操作过程","link":"#bin-log-日志文件-记录整个操作过程","children":[]},{"level":2,"title":"本文总结","slug":"本文总结","link":"#本文总结","children":[]},{"level":2,"title":"结束语","slug":"结束语","link":"#结束语","children":[]},{"level":2,"title":"文章来源","slug":"文章来源","link":"#文章来源","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703579659000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":20.76,"words":6229},"filePathRelative":"db/sql-mysql/sql-mysql-execute.md","localizedDate":"2022年6月3日","excerpt":"<h1> MySQL - 一条 SQL 的执行过程详解</h1>\\n<blockquote>\\n<p>天天和数据库打交道，一天能写上几十条 SQL 语句，但你知道我们的系统是如何和数据库交互的吗？MySQL 如何帮我们存储数据、又是如何帮我们管理事务？....是不是感觉真的除了写几个 「select * from dual」外基本脑子一片空白？这篇文章就将带你走进 MySQL 的世界，让你彻底了解系统到底是如何和 MySQL 交互的，MySQL 在接受到我们发送的 SQL 语句时又分别做了哪些事情。</p>\\n</blockquote>\\n<h2> 前言</h2>\\n<p>天天和数据库打交道，一天能写上几十条 SQL 语句，但你知道我们的系统是如何和数据库交互的吗？MySQL 如何帮我们存储数据、又是如何帮我们管理事务？....是不是感觉真的除了写几个 「select * from dual」外基本脑子一片空白？这篇文章就将带你走进 MySQL 的世界，让你彻底了解系统到底是如何和 MySQL 交互的，MySQL 在接受到我们发送的 SQL 语句时又分别做了哪些事情。</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
