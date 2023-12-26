import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as r,c as l,a as s,b as n,d as a,f as e}from"./app-DmnHa7HT.js";const p={},d=s("h1",{id:"redis入门-数据类型-5种基础数据类型详解",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#redis入门-数据类型-5种基础数据类型详解","aria-hidden":"true"},"#"),n(" Redis入门 - 数据类型：5种基础数据类型详解")],-1),c=s("blockquote",null,[s("p",null,"Redis所有的key（键）都是字符串。我们在谈基础数据结构时，讨论的是存储值的数据类型，主要包括常见的5种数据类型，分别是：String、List、Set、Zset、Hash")],-1),u=s("h2",{id:"redis数据结构简介",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#redis数据结构简介","aria-hidden":"true"},"#"),n(" Redis数据结构简介")],-1),m={href:"https://redis.io/topics/data-types",target:"_blank",rel:"noopener noreferrer"},k=e(`<p>首先对redis来说，所有的key（键）都是字符串。我们在谈基础数据结构时，讨论的是存储值的数据类型，主要包括常见的5种数据类型，分别是：String、List、Set、Zset、Hash。</p><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-ds-1.jpeg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><table><thead><tr><th>结构类型</th><th>结构存储的值</th><th>结构的读写能力</th></tr></thead><tbody><tr><td><strong>String字符串</strong></td><td>可以是字符串、整数或浮点数</td><td>对整个字符串或字符串的一部分进行操作；对整数或浮点数进行自增或自减操作；</td></tr><tr><td><strong>List列表</strong></td><td>一个链表，链表上的每个节点都包含一个字符串</td><td>对链表的两端进行push和pop操作，读取单个或多个元素；根据值查找或删除元素；</td></tr><tr><td><strong>Set集合</strong></td><td>包含字符串的无序集合</td><td>字符串的集合，包含基础的方法有看是否存在添加、获取、删除；还包含计算交集、并集、差集等</td></tr><tr><td><strong>Hash散列</strong></td><td>包含键值对的无序散列表</td><td>包含方法有添加、获取、删除单个元素</td></tr><tr><td><strong>Zset有序集合</strong></td><td>和散列一样，用于存储键值对</td><td>字符串成员与浮点数分数之间的有序映射；元素的排列顺序由分数的大小决定；包含方法有添加、获取、删除单个元素以及根据分值范围或成员来获取元素</td></tr></tbody></table><h2 id="基础数据结构详解" tabindex="-1"><a class="header-anchor" href="#基础数据结构详解" aria-hidden="true">#</a> 基础数据结构详解</h2><blockquote><p>内容其实比较简单，我觉得理解的重点在于这个结构怎么用，能够用来做什么？所以我在梳理时，围绕<strong>图例</strong>，<strong>命令</strong>，<strong>执行</strong>和<strong>场景</strong>来阐述。</p></blockquote><h3 id="string字符串" tabindex="-1"><a class="header-anchor" href="#string字符串" aria-hidden="true">#</a> String字符串</h3><blockquote><p>String是redis中最基本的数据类型，一个key对应一个value。</p></blockquote><p>String类型是二进制安全的，意思是 redis 的 string 可以包含任何数据。如数字，字符串，jpg图片或者序列化的对象。</p><ul><li><strong>图例</strong></li></ul><p>下图是一个String类型的实例，其中键为hello，值为world</p><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-ds-3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li><strong>命令使用</strong></li></ul><table><thead><tr><th>命令</th><th>简述</th><th>使用</th></tr></thead><tbody><tr><td>GET</td><td>获取存储在给定键中的值</td><td>GET name</td></tr><tr><td>SET</td><td>设置存储在给定键中的值</td><td>SET name value</td></tr><tr><td>DEL</td><td>删除存储在给定键中的值</td><td>DEL name</td></tr><tr><td>INCR</td><td>将键存储的值加1</td><td>INCR key</td></tr><tr><td>DECR</td><td>将键存储的值减1</td><td>DECR key</td></tr><tr><td>INCRBY</td><td>将键存储的值加上整数</td><td>INCRBY key amount</td></tr><tr><td>DECRBY</td><td>将键存储的值减去整数</td><td>DECRBY key amount</td></tr></tbody></table><ul><li><strong>命令执行</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">set</span> hello world
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> get hello
<span class="token string">&quot;world&quot;</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> del hello
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> get hello
<span class="token punctuation">(</span>nil<span class="token punctuation">)</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">set</span> counter <span class="token number">2</span>
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> get counter
<span class="token string">&quot;2&quot;</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> incr counter
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> get counter
<span class="token string">&quot;3&quot;</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> incrby counter <span class="token number">100</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">103</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> get counter
<span class="token string">&quot;103&quot;</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> decr counter
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">102</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> get counter
<span class="token string">&quot;102&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>实战场景 <ul><li><strong>缓存</strong>： 经典使用场景，把常用信息，字符串，图片或者视频等信息放到redis中，redis作为缓存层，mysql做持久化层，降低mysql的读写压力。</li><li><strong>计数器</strong>：redis是单线程模型，一个命令执行完才会执行下一个，同时数据可以一步落地到其他的数据源。</li><li><strong>session</strong>：常见方案spring session + redis实现session共享，</li></ul></li></ul><h3 id="list列表" tabindex="-1"><a class="header-anchor" href="#list列表" aria-hidden="true">#</a> List列表</h3><blockquote><p>Redis中的List其实就是链表（Redis用双端链表实现List）。</p></blockquote><p>使用List结构，我们可以轻松地实现最新消息排队功能（比如新浪微博的TimeLine）。List的另一个应用就是消息队列，可以利用List的 PUSH 操作，将任务存放在List中，然后工作线程再用 POP 操作将任务取出进行执行。</p><ul><li><strong>图例</strong></li></ul><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-ds-5.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li><strong>命令使用</strong></li></ul><table><thead><tr><th>命令</th><th>简述</th><th>使用</th></tr></thead><tbody><tr><td>RPUSH</td><td>将给定值推入到列表右端</td><td>RPUSH key value</td></tr><tr><td>LPUSH</td><td>将给定值推入到列表左端</td><td>LPUSH key value</td></tr><tr><td>RPOP</td><td>从列表的右端弹出一个值，并返回被弹出的值</td><td>RPOP key</td></tr><tr><td>LPOP</td><td>从列表的左端弹出一个值，并返回被弹出的值</td><td>LPOP key</td></tr><tr><td>LRANGE</td><td>获取列表在给定范围上的所有值</td><td>LRANGE key 0 -1</td></tr><tr><td>LINDEX</td><td>通过索引获取列表中的元素。你也可以使用负数下标，以 -1 表示列表的最后一个元素， -2 表示列表的倒数第二个元素，以此类推。</td><td>LINDEX key index</td></tr></tbody></table><ul><li>使用列表的技巧 <ul><li>lpush+lpop=Stack(栈)</li><li>lpush+rpop=Queue（队列）</li><li>lpush+ltrim=Capped Collection（有限集合）</li><li>lpush+brpop=Message Queue（消息队列）</li></ul></li><li><strong>命令执行</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> lpush mylist <span class="token number">1</span> <span class="token number">2</span> ll <span class="token function">ls</span> mem
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">5</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> lrange mylist <span class="token number">0</span> <span class="token parameter variable">-1</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;mem&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;ls&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;ll&quot;</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">&quot;2&quot;</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">&quot;1&quot;</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> lindex mylist <span class="token parameter variable">-1</span>
<span class="token string">&quot;1&quot;</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> lindex mylist <span class="token number">10</span>        <span class="token comment"># index不在 mylist 的区间范围内</span>
<span class="token punctuation">(</span>nil<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>实战场景 <ul><li><strong>微博TimeLine</strong>: 有人发布微博，用lpush加入时间轴，展示新的列表信息。</li><li><strong>消息队列</strong></li></ul></li></ul><h3 id="set集合" tabindex="-1"><a class="header-anchor" href="#set集合" aria-hidden="true">#</a> Set集合</h3><blockquote><p>Redis 的 Set 是 String 类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据。</p></blockquote><p>Redis 中集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。</p><ul><li><strong>图例</strong></li></ul><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-ds-7.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li><strong>命令使用</strong></li></ul><table><thead><tr><th>命令</th><th>简述</th><th>使用</th></tr></thead><tbody><tr><td>SADD</td><td>向集合添加一个或多个成员</td><td>SADD key value</td></tr><tr><td>SCARD</td><td>获取集合的成员数</td><td>SCARD key</td></tr><tr><td>SMEMBERS</td><td>返回集合中的所有成员</td><td>SMEMBERS key member</td></tr><tr><td>SISMEMBER</td><td>判断 member 元素是否是集合 key 的成员</td><td>SISMEMBER key member</td></tr></tbody></table>`,33),b={href:"https://www.runoob.com/redis/redis-sets.html",target:"_blank",rel:"noopener noreferrer"},g=e(`<ul><li><strong>命令执行</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> sadd myset hao hao1 xiaohao hao
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> smembers myset
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;xiaohao&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;hao1&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;hao&quot;</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> sismember myset hao
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>实战场景 <ul><li><strong>标签</strong>（tag）,给用户添加标签，或者用户给消息添加标签，这样有同一标签或者类似标签的可以给推荐关注的事或者关注的人。</li><li><strong>点赞，或点踩，收藏等</strong>，可以放到set中实现</li></ul></li></ul><h3 id="hash散列" tabindex="-1"><a class="header-anchor" href="#hash散列" aria-hidden="true">#</a> Hash散列</h3><blockquote><p>Redis hash 是一个 string 类型的 field（字段） 和 value（值） 的映射表，hash 特别适合用于存储对象。</p></blockquote><ul><li><strong>图例</strong></li></ul><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-ds-4.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li><strong>命令使用</strong></li></ul><table><thead><tr><th>命令</th><th>简述</th><th>使用</th></tr></thead><tbody><tr><td>HSET</td><td>添加键值对</td><td>HSET hash-key sub-key1 value1</td></tr><tr><td>HGET</td><td>获取指定散列键的值</td><td>HGET hash-key key1</td></tr><tr><td>HGETALL</td><td>获取散列中包含的所有键值对</td><td>HGETALL hash-key</td></tr><tr><td>HDEL</td><td>如果给定键存在于散列中，那么就移除这个键</td><td>HDEL hash-key sub-key1</td></tr></tbody></table><ul><li><strong>命令执行</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> hset user name1 hao
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> hset user email1 hao@163.com
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> hgetall user
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;name1&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;hao&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;email1&quot;</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">&quot;hao@163.com&quot;</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> hget user user
<span class="token punctuation">(</span>nil<span class="token punctuation">)</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> hget user name1
<span class="token string">&quot;hao&quot;</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> hset user name2 xiaohao
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> hset user email2 xiaohao@163.com
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> hgetall user
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;name1&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;hao&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;email1&quot;</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">&quot;hao@163.com&quot;</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">&quot;name2&quot;</span>
<span class="token number">6</span><span class="token punctuation">)</span> <span class="token string">&quot;xiaohao&quot;</span>
<span class="token number">7</span><span class="token punctuation">)</span> <span class="token string">&quot;email2&quot;</span>
<span class="token number">8</span><span class="token punctuation">)</span> <span class="token string">&quot;xiaohao@163.com&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>实战场景 <ul><li><strong>缓存</strong>： 能直观，相比string更节省空间，的维护缓存信息，如用户信息，视频信息等。</li></ul></li></ul><h3 id="zset有序集合" tabindex="-1"><a class="header-anchor" href="#zset有序集合" aria-hidden="true">#</a> Zset有序集合</h3><blockquote><p>Redis 有序集合和集合一样也是 string 类型元素的集合,且不允许重复的成员。不同的是每个元素都会关联一个 double 类型的分数。redis 正是通过分数来为集合中的成员进行从小到大的排序。</p></blockquote><p>有序集合的成员是唯一的, 但分数(score)却可以重复。有序集合是通过两种数据结构实现：</p><ol><li><strong>压缩列表(ziplist)</strong>: ziplist是为了提高存储效率而设计的一种特殊编码的双向链表。它可以存储字符串或者整数，存储整数时是采用整数的二进制而不是字符串形式存储。它能在O(1)的时间复杂度下完成list两端的push和pop操作。但是因为每次操作都需要重新分配ziplist的内存，所以实际复杂度和ziplist的内存使用量相关</li><li><strong>跳跃表（zSkiplist)</strong>: 跳跃表的性能可以保证在查找，删除，添加等操作的时候在对数期望时间内完成，这个性能是可以和平衡树来相比较的，而且在实现方面比平衡树要优雅，这是采用跳跃表的主要原因。跳跃表的复杂度是O(log(n))。</li></ol><ul><li><strong>图例</strong></li></ul><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-ds-8.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li><strong>命令使用</strong></li></ul><table><thead><tr><th>命令</th><th>简述</th><th>使用</th></tr></thead><tbody><tr><td>ZADD</td><td>将一个带有给定分值的成员添加到有序集合里面</td><td>ZADD zset-key 178 member1</td></tr><tr><td>ZRANGE</td><td>根据元素在有序集合中所处的位置，从有序集合中获取多个元素</td><td>ZRANGE zset-key 0-1 withccores</td></tr><tr><td>ZREM</td><td>如果给定元素成员存在于有序集合中，那么就移除这个元素</td><td>ZREM zset-key member1</td></tr></tbody></table>`,20),h={href:"https://www.runoob.com/redis/redis-sorted-sets.html",target:"_blank",rel:"noopener noreferrer"},v=e(`<ul><li><strong>命令执行</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> zadd myscoreset <span class="token number">100</span> hao <span class="token number">90</span> xiaohao
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> ZRANGE myscoreset <span class="token number">0</span> <span class="token parameter variable">-1</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;xiaohao&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;hao&quot;</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> ZSCORE myscoreset hao
<span class="token string">&quot;100&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>实战场景 <ul><li><strong>排行榜</strong>：有序集合经典使用场景。例如小说视频等网站需要对用户上传的小说视频做排行榜，榜单可以按照用户关注数，更新时间，字数等打分，做排行。</li></ul></li></ul><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,4),f={href:"http://ddrv.cn/a/260579",target:"_blank",rel:"noopener noreferrer"},q={href:"https://www.cnblogs.com/haoprogrammer/p/11065461.html",target:"_blank",rel:"noopener noreferrer"},y={href:"https://www.pianshen.com/article/6479421770/",target:"_blank",rel:"noopener noreferrer"},w={href:"https://www.runoob.com/redis/redis-sorted-sets.html",target:"_blank",rel:"noopener noreferrer"};function _(E,x){const t=o("ExternalLinkIcon");return r(),l("div",null,[d,c,u,s("blockquote",null,[s("p",null,[n("Redis基础文章非常多，关于基础数据结构类型，我推荐你先看下"),s("a",m,[n("官方网站内容在新窗口打开"),a(t)]),n("，然后再看下面的小结")])]),k,s("p",null,[n("其它一些集合操作，请参考这里"),s("a",b,[n("https://www.runoob.com/redis/redis-sets.html"),a(t)])]),g,s("p",null,[n("更多命令请参考这里 "),s("a",h,[n("https://www.runoob.com/redis/redis-sorted-sets.html"),a(t)])]),v,s("ul",null,[s("li",null,[s("a",f,[n("http://ddrv.cn/a/260579"),a(t)])]),s("li",null,[s("a",q,[n("https://www.cnblogs.com/haoprogrammer/p/11065461.html"),a(t)])]),s("li",null,[s("a",y,[n("https://www.pianshen.com/article/6479421770/"),a(t)])]),s("li",null,[s("a",w,[n("https://www.runoob.com/redis/redis-sorted-sets.html"),a(t)])])])])}const L=i(p,[["render",_],["__file","db-redis-data-types.html.vue"]]);export{L as default};
