import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as e,c as r,f as h}from"./app-DmnHa7HT.js";const i={},d=h('<h1 id="mysql-数据类型" tabindex="-1"><a class="header-anchor" href="#mysql-数据类型" aria-hidden="true">#</a> MySQL - 数据类型</h1><blockquote><p>本文主要整理MySQL中数据字段类型。</p></blockquote><h2 id="字段类型" tabindex="-1"><a class="header-anchor" href="#字段类型" aria-hidden="true">#</a> 字段类型</h2><h3 id="整型" tabindex="-1"><a class="header-anchor" href="#整型" aria-hidden="true">#</a> 整型</h3><p>TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT 分别使用 8, 16, 24, 32, 64 位存储空间，一般情况下越小的列越好。</p><p>INT(11) 中的数字只是规定了交互工具显示字符的个数，对于存储和计算来说是没有意义的。</p><h3 id="浮点数" tabindex="-1"><a class="header-anchor" href="#浮点数" aria-hidden="true">#</a> 浮点数</h3><p>FLOAT 和 DOUBLE 为浮点类型，DECIMAL 为高精度小数类型。CPU 原生支持浮点运算，但是不支持 DECIMAl 类型的计算，因此 DECIMAL 的计算比浮点类型需要更高的代价。</p><p>FLOAT、DOUBLE 和 DECIMAL 都可以指定列宽，例如 DECIMAL(18, 9) 表示总共 18 位，取 9 位存储小数部分，剩下 9 位存储整数部分。</p><h3 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串" aria-hidden="true">#</a> 字符串</h3><p>主要有 CHAR 和 VARCHAR 两种类型，一种是定长的，一种是变长的。</p><p>VARCHAR 这种变长类型能够节省空间，因为只需要存储必要的内容。但是在执行 UPDATE 时可能会使行变得比原来长，当超出一个页所能容纳的大小时，就要执行额外的操作。MyISAM 会将行拆成不同的片段存储，而 InnoDB 则需要分裂页来使行放进页内。</p><p>VARCHAR 会保留字符串末尾的空格，而 CHAR 会删除。</p><h3 id="时间和日期" tabindex="-1"><a class="header-anchor" href="#时间和日期" aria-hidden="true">#</a> 时间和日期</h3><p>MySQL 提供了两种相似的日期时间类型: DATETIME 和 TIMESTAMP。</p><h4 id="_1-datetime" tabindex="-1"><a class="header-anchor" href="#_1-datetime" aria-hidden="true">#</a> 1. DATETIME</h4><p>能够保存从 1001 年到 9999 年的日期和时间，精度为秒，使用 8 字节的存储空间。</p><p>它与时区无关。</p><p>默认情况下，MySQL 以一种可排序的、无歧义的格式显示 DATETIME 值，例如“2008-01-16 22:37:08”，这是 ANSI 标准定义的日期和时间表示方法。</p><h4 id="_2-timestamp" tabindex="-1"><a class="header-anchor" href="#_2-timestamp" aria-hidden="true">#</a> 2. TIMESTAMP</h4><p>和 UNIX 时间戳相同，保存从 1970 年 1 月 1 日午夜(格林威治时间)以来的秒数，使用 4 个字节，只能表示从 1970 年 到 2038 年。</p><p>它和时区有关，也就是说一个时间戳在不同的时区所代表的具体时间是不同的。</p><p>MySQL 提供了 FROM_UNIXTIME() 函数把 UNIX 时间戳转换为日期，并提供了 UNIX_TIMESTAMP() 函数把日期转换为 UNIX 时间戳。</p><p>默认情况下，如果插入时没有指定 TIMESTAMP 列的值，会将这个值设置为当前时间。</p><p>应该尽量使用 TIMESTAMP，因为它比 DATETIME 空间效率更高。</p><h2 id="选择优化的数据类型" tabindex="-1"><a class="header-anchor" href="#选择优化的数据类型" aria-hidden="true">#</a> 选择优化的数据类型</h2><ul><li>更小的通常更好；更小的数据类型通常更快，因为它们占用更少的磁盘、内存和CPU缓存，并且处理时需要的CPU周期也更少；</li><li>简单就好；例如，整形比字符串操作代价更低；实用内建类型而不是字符串来存储日期和时间；用整形存储IP地址等；</li><li>尽量避免NULL；如果查询中包含可为NULL的列，对MySQL来说更难优化，因为可为NULL 的列使得索引、索引统计和值比较都更复杂。尽管把可为NULL的列改为NOT NULL带来的性能提升比较小，但如果计划在列上创建索引，就应该尽量避免设计成可为NULL的列；</li></ul><h3 id="字符串类型" tabindex="-1"><a class="header-anchor" href="#字符串类型" aria-hidden="true">#</a> 字符串类型</h3><h4 id="varchar-和-char" tabindex="-1"><a class="header-anchor" href="#varchar-和-char" aria-hidden="true">#</a> VARCHAR 和 CHAR</h4><p>VARCHAR是最常见的字符串类型。VARCHAR节省了存储空间，所以对性能也有帮助。但是，由于行是可变的，在UPDATE时可能使行变得比原来更长，这就导致需要做额外的工作。如果一个行占用的空间增长，并且在页内没有更多的空间可以存储，MyISAM会将行拆成不同的片段存储；InnoDB则需要分裂页来使行可以放进页内。</p><p>下面这些情况使用VARCHAR是合适的：字符串的最大长度比平均长度大很多；列的更新很少，所以碎片不是问题；使用了像UTF-8这样复杂的字符集，每个字符都使用不同的字节数进行存储。</p><p>当存储CHAR值时，MySQL会删除所有的末尾空格。CHAR值会根据需要采用空格进行填充以方便比较。</p><p>CHAR适合存储很短的字符串，或者所有值都接近同一个长度，如密码的MD5值。对于经常变更的数据，CHAR也比VARCHAR更好，因为CHAR不容易产生碎片（行间碎片？）。</p><h4 id="varchar-5-和varchar-200" tabindex="-1"><a class="header-anchor" href="#varchar-5-和varchar-200" aria-hidden="true">#</a> VARCHAR(5)和VARCHAR(200)</h4><blockquote><p>使用VARCHAR(5)和VARCHAR(200)存储&quot;hello&quot;的空间开销是一样的。那么使用更短的列有什么优势吗？</p></blockquote><p>事实证明有很大的优势。更长的列会消耗更多的内存，因为MySQL通常会分配固定大小的内存块来保存内部值。尤其是使用内存临时表进行排序或其他操作时会特别糟糕。在利用磁盘临时表进行排序时也同样糟糕。</p><p>所以最好的策略是只分配真正需要的空间。</p><h4 id="blob-和-text" tabindex="-1"><a class="header-anchor" href="#blob-和-text" aria-hidden="true">#</a> BLOB 和 TEXT</h4><p>BLOB和TEXT都是为存储很大的数据而设计的数据类型，分别采用二进制和字符方式存储。</p><p>与其他类型不同，MySQL把每个BLOB和TEXT值当做一个独立的对象去处理。当BLOB和TEXT值太大时，InnoDB会使用专门的“外部”存储区域来进行存储，此时每个值在行内需要1~4个字节存储一个指针，然后在外部存储区域存储实际的值。</p><p>MySQL对BLOB和TEXT列进行排序与其他类型是不同的：它只对每个列的最前max_sort_length个字节而不是整个字符串做排序。同样的，MySQL也不能将BLOB或TEXT列全部长度的字符串进行索引。</p><h3 id="选择表示符-identifier" tabindex="-1"><a class="header-anchor" href="#选择表示符-identifier" aria-hidden="true">#</a> 选择表示符（identifier）</h3><p>整数类型通常是标识列的最佳选择，因为它们很快并且可以使用AUTO_INCREMENT。 如果可能，应该避免使用字符串类型作为标识列，因为它们很耗空间，并且比数字类型慢。 对于完全随机的字符串也需要多加注意，例如MD5(),SHA1()或者UUID()产生的字符串。这些函数生成的新值会任意分布在很大的空间内，这会导致INSERT以及一些SELECT语句变得很慢：</p><ul><li>因为插入值会随机的写入到索引的不同位置，所以使得INSERT语句更慢。这会导致页分裂、磁盘随机访问。</li><li>SELECT语句会变的更慢，因为逻辑上相邻的行会分布在磁盘和内存的不同地方。</li><li>随机值导致缓存对所有类型的查询语句效果都很差，因为会使得缓存赖以工作的局部性原理失效。</li></ul>',44),t=[d];function n(p,c){return e(),r("div",null,t)}const o=a(i,[["render",n],["__file","sql-mysql-theory.html.vue"]]);export{o as default};
