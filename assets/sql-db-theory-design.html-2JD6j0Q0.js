const e=JSON.parse('{"key":"v-294c800a","path":"/db/sql/sql-db-theory-design.html","title":"SQL DB - 关系型数据库设计流程","lang":"zh-CN","frontmatter":{"date":"2022-05-21T00:00:00.000Z","category":["数据库原理"],"tag":["数据库原理"],"description":"SQL DB - 关系型数据库设计流程 在上文知道如何设计表和健后，让我们再看看整个的数据库设计的标准流程吧，主要包括需求分析, 概念结构设计, 逻辑结构设计 , 物理设计, 实施阶段和运行和维护阶段这6个阶段，其中最重要的是逻辑结构设计。 规范设计的6个阶段 按照规范设计的方法，考虑数据库及其应用系统开发全过程，将数据库设计分为以下6个阶段","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/sql/sql-db-theory-design.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"SQL DB - 关系型数据库设计流程"}],["meta",{"property":"og:description","content":"SQL DB - 关系型数据库设计流程 在上文知道如何设计表和健后，让我们再看看整个的数据库设计的标准流程吧，主要包括需求分析, 概念结构设计, 逻辑结构设计 , 物理设计, 实施阶段和运行和维护阶段这6个阶段，其中最重要的是逻辑结构设计。 规范设计的6个阶段 按照规范设计的方法，考虑数据库及其应用系统开发全过程，将数据库设计分为以下6个阶段"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:34:19.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"数据库原理"}],["meta",{"property":"article:published_time","content":"2022-05-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:34:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SQL DB - 关系型数据库设计流程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-05-21T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:34:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"规范设计的6个阶段","slug":"规范设计的6个阶段","link":"#规范设计的6个阶段","children":[{"level":3,"title":"需求分析阶段（常用自顶向下）","slug":"需求分析阶段-常用自顶向下","link":"#需求分析阶段-常用自顶向下","children":[]},{"level":3,"title":"概念结构设计阶段（常用自底向上）","slug":"概念结构设计阶段-常用自底向上","link":"#概念结构设计阶段-常用自底向上","children":[]},{"level":3,"title":"逻辑结构设计阶段（E-R图）","slug":"逻辑结构设计阶段-e-r图","link":"#逻辑结构设计阶段-e-r图","children":[]},{"level":3,"title":"物理设计阶段","slug":"物理设计阶段","link":"#物理设计阶段","children":[]},{"level":3,"title":"数据库实施阶段","slug":"数据库实施阶段","link":"#数据库实施阶段","children":[]},{"level":3,"title":"数据库运行和维护阶段","slug":"数据库运行和维护阶段","link":"#数据库运行和维护阶段","children":[]}]},{"level":2,"title":"E-R图","slug":"e-r图","link":"#e-r图","children":[{"level":3,"title":"实体的三种联系","slug":"实体的三种联系","link":"#实体的三种联系","children":[]},{"level":3,"title":"表示出现多次的关系","slug":"表示出现多次的关系","link":"#表示出现多次的关系","children":[]},{"level":3,"title":"联系的多向性","slug":"联系的多向性","link":"#联系的多向性","children":[]},{"level":3,"title":"表示子类","slug":"表示子类","link":"#表示子类","children":[]}]},{"level":2,"title":"基于E-R图的数据库结构设计","slug":"基于e-r图的数据库结构设计","link":"#基于e-r图的数据库结构设计","children":[{"level":3,"title":"确定entities及relationships","slug":"确定entities及relationships","link":"#确定entities及relationships","children":[]},{"level":3,"title":"确定所需数据","slug":"确定所需数据","link":"#确定所需数据","children":[]},{"level":3,"title":"标准化数据","slug":"标准化数据","link":"#标准化数据","children":[]},{"level":3,"title":"考量关系","slug":"考量关系","link":"#考量关系","children":[]},{"level":3,"title":"检验设计","slug":"检验设计","link":"#检验设计","children":[]},{"level":3,"title":"最终设计","slug":"最终设计","link":"#最终设计","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703579659000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":17.29,"words":5188},"filePathRelative":"db/sql/sql-db-theory-design.md","localizedDate":"2022年5月21日","excerpt":"<h1> SQL DB - 关系型数据库设计流程</h1>\\n<blockquote>\\n<p>在上文知道如何设计表和健后，让我们再看看整个的<strong>数据库设计的标准流程</strong>吧，主要包括<code>需求分析</code>, <code>概念结构设计</code>, <code>逻辑结构设计</code> , <code>物理设计</code>, <code>实施阶段</code>和<code>运行和维护阶段</code>这6个阶段，其中最重要的是<code>逻辑结构设计</code>。</p>\\n</blockquote>\\n<h2> 规范设计的6个阶段</h2>\\n<blockquote>\\n<p>按照规范设计的方法，考虑数据库及其应用系统开发全过程，将数据库设计分为以下6个阶段</p>\\n</blockquote>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
