const e=JSON.parse('{"key":"v-1aacba26","path":"/db/sql-mysql/sql-mysql-theory.html","title":"MySQL - 数据类型","lang":"zh-CN","frontmatter":{"date":"2022-05-27T00:00:00.000Z","category":["SQL MySQL"],"tag":["SQL MySQL"],"description":"MySQL - 数据类型 本文主要整理MySQL中数据字段类型。 字段类型 整型 TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT 分别使用 8, 16, 24, 32, 64 位存储空间，一般情况下越小的列越好。 INT(11) 中的数字只是规定了交互工具显示字符的个数，对于存储和计算来说是没有意义的。 浮点数 FLOAT 和 DOUBLE 为浮点类型，DECIMAL 为高精度小数类型。CPU 原生支持浮点运算，但是不支持 DECIMAl 类型的计算，因此 DECIMAL 的计算比浮点类型需要更高的代价。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/db/sql-mysql/sql-mysql-theory.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"MySQL - 数据类型"}],["meta",{"property":"og:description","content":"MySQL - 数据类型 本文主要整理MySQL中数据字段类型。 字段类型 整型 TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT 分别使用 8, 16, 24, 32, 64 位存储空间，一般情况下越小的列越好。 INT(11) 中的数字只是规定了交互工具显示字符的个数，对于存储和计算来说是没有意义的。 浮点数 FLOAT 和 DOUBLE 为浮点类型，DECIMAL 为高精度小数类型。CPU 原生支持浮点运算，但是不支持 DECIMAl 类型的计算，因此 DECIMAL 的计算比浮点类型需要更高的代价。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T08:34:19.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"SQL MySQL"}],["meta",{"property":"article:published_time","content":"2022-05-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T08:34:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL - 数据类型\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-05-27T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T08:34:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"字段类型","slug":"字段类型","link":"#字段类型","children":[{"level":3,"title":"整型","slug":"整型","link":"#整型","children":[]},{"level":3,"title":"浮点数","slug":"浮点数","link":"#浮点数","children":[]},{"level":3,"title":"字符串","slug":"字符串","link":"#字符串","children":[]},{"level":3,"title":"时间和日期","slug":"时间和日期","link":"#时间和日期","children":[]}]},{"level":2,"title":"选择优化的数据类型","slug":"选择优化的数据类型","link":"#选择优化的数据类型","children":[{"level":3,"title":"字符串类型","slug":"字符串类型","link":"#字符串类型","children":[]},{"level":3,"title":"选择表示符（identifier）","slug":"选择表示符-identifier","link":"#选择表示符-identifier","children":[]}]}],"git":{"createdTime":1690160698000,"updatedTime":1703579659000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":5.65,"words":1695},"filePathRelative":"db/sql-mysql/sql-mysql-theory.md","localizedDate":"2022年5月27日","excerpt":"<h1> MySQL - 数据类型</h1>\\n<blockquote>\\n<p>本文主要整理MySQL中数据字段类型。</p>\\n</blockquote>\\n<h2> 字段类型</h2>\\n<h3> 整型</h3>\\n<p>TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT 分别使用 8, 16, 24, 32, 64 位存储空间，一般情况下越小的列越好。</p>\\n<p>INT(11) 中的数字只是规定了交互工具显示字符的个数，对于存储和计算来说是没有意义的。</p>\\n<h3> 浮点数</h3>\\n<p>FLOAT 和 DOUBLE 为浮点类型，DECIMAL 为高精度小数类型。CPU 原生支持浮点运算，但是不支持 DECIMAl 类型的计算，因此 DECIMAL 的计算比浮点类型需要更高的代价。</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
