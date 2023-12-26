---
date: 2022-06-25
category:
  - NoSQL Redis
tag:
  - NoSQL Redis
---
# Redis进阶 - 版本特性: Redis4.0、5.0、6.0特性整理 

> 在学习Redis知识体系时，我们难免会需要查看版本实现之间的差异，本文主要整理Redis较为新的版本的特性。

## Redis 4

### 模块系统

 Redis 4.0 发生的最大变化就是加入了模块系统， 这个系统可以让用户通过自己编写的代码来扩展和实现 Redis 本身并不具备的功能，因为模块系统是通过高层次 API 实现的， 它与 Redis 内核本身完全分离、互不干扰， 所以用户可以在有需要的情况下才启用这个功能。目前已经有人使用这个功能开发了各种各样的模块， 比如 Redis Labs 开发的一些模块就可以在 http://redismodules.com 看到。模块功能使得用户可以将 Redis 用作基础设施， 并在上面构建更多功能， 这给 Redis 带来了无数新的可能性。

### PSYNC 2.0

新版本的PSYNC命令解决了旧版本的 Redis 在复制时的一些不够优化的地方：

- 在旧版本 Redis 中， 如果一个从服务器在 FAILOVER 之后成为了新的主节点， 那么其他从节点在复制这个新主的时候就必须进行全量复制。 在 Redis 4.0 中， 新主和从服务器在处理这种情况时， 将在条件允许的情况下使用部分复制。
- 在旧版本 Redis 中， 一个从服务器如果重启了， 那么它就必须与主服务器重新进行全量复制， 在 Redis 4.0 中， 只要条件允许， 主从在处理这种情况时将使用部分复制。
- 在旧版本中，当复制为链式复制的时候，如 A—>B—>C ，主节点为A。当A出现问题，C节点不能正常复制B节点的数据。当提升B为主节点，C需要全量同步B的数据。在PSYNC2：PSYNC2解决了链式复制之间的关联性。A出现问题不影响C节点，B提升为主C不需要全量同步。
- 在使用星形复制时，如一主两从。A—>B , A—>C ，主节点为A。当A出现问题，B提升为主节点，C 重新指向主节点B。使用同步机制PSYNC2，C节点只做增量同步即可。在使用sentinel故障转移可以较少数据重新同步的延迟时间，避免大redis同步出现的网络带宽占满。

### 缓存驱逐策略优化

新添加了Last Frequently Used（LFU）缓存驱逐策略；

LFU：最不经常使用。在一段时间内，使用次数最少的数据，优先被淘汰；

另外 Redis 4.0 还对已有的缓存驱逐策略进行了优化， 使得它们能够更健壮、高效、快速和精确。

### Lazy Free

在 Redis 4.0 之前， 用户在使用 DEL命令删除体积较大的键， 又或者在使用 **FLUSHDB** 和 **FLUSHALL**删除包含大量键的数据库时， 都可能会造成服务器阻塞。

为了解决以上问题， Redis 4.0 新添加了**UNLINK**命令， 这个命令是DEL命令的异步版本， 它可以将删除指定键的操作放在后台线程里面执行， 从而尽可能地避免服务器阻塞：

```bash
redis> UNLINK fruits
(integer) 1
```

 因为一些历史原因， 执行同步删除操作的DEL命令将会继续保留。此外， Redis 4.0 中的**FLUSHDB**和**FLUSHALL**这两个命令都新添加了ASYNC选项， 带有这个选项的数据库删除操作将在后台线程进行：

```bash
redis> FLUSHDB ASYNC
OK

redis> FLUSHALL ASYNC
OK
```

 还有，执行`rename oldkey newkey`时，如果newkey已经存在，Redis会先删除已经存在的newkey，这也会引发上面提到的删除大key问题。如果想让Redis在这种场景下也使用lazyfree的方式来删除，可以按如下配置：

```bash
lazyfree-lazy-server-del yes
```

### 交换数据库

Redis 4.0 对数据库命令的另外一个修改是新增了SWAPDB命令， 这个命令可以对指定的两个数据库进行互换： 比如说， 通过执行命令 `SWAPDB 0 1` ， 我们可以将原来的数据库 0 变成数据库 1 ， 而原来的数据库 1 则变成数据库 0。

### 混合持久化

Redis 4.0 新增了 RDB-AOF 混合持久化格式， 这是一个可选的功能， 在开启了这个功能之后， AOF 重写产生的文件将同时包含 RDB 格式的内容和 AOF 格式的内容， 其中 RDB 格式的内容用于记录已有的数据， 而 AOF 格式的内存则用于记录最近发生了变化的数据， 这样 Redis 就可以同时兼有 RDB 持久化和 AOF 持久化的优点 —— 既能够快速地生成重写文件， 也能够在出现问题时， 快速地载入数据。这个功能可以通过配置项：`aof-use-rdb-preamble`进行开启。

### 内存命令

新添加了一个MEMORY命令， 这个命令可以用于视察内存使用情况， 并进行相应的内存管理操作：

```bash
redis> MEMORY HELP
1) "MEMORY USAGE <key> [SAMPLES <count>] - Estimate memory usage of key"
2) "MEMORY STATS                         - Show memory usage details"
3) "MEMORY PURGE                         - Ask the allocator to release memory"
4) "MEMORY MALLOC-STATS                  - Show allocator internal stats"
```

其中， 使用MEMORY USAGE子命令可以估算储存给定键所需的内存：

```bash
redis> SET msg "hello world"
OK

redis> SADD fruits apple banana cherry
(integer) 3

redis> MEMORY USAGE msg
(integer) 62

redis> MEMORY USAGE fruits
(integer) 375
```

使用MEMORY STATS子命令可以查看 Redis 当前的内存使用情况：

```bash
redis> MEMORY STATS
1) "peak.allocated"
2) (integer) 1014480
3) "total.allocated"
4) (integer) 1014512
5) "startup.allocated"
6) (integer) 963040
7) "replication.backlog"
8) (integer) 0
9) "clients.slaves"
10) (integer) 0
11) "clients.normal"
12) (integer) 49614
13) "aof.buffer"
14) (integer) 0
15) "db.0"
16) 1) "overhead.hashtable.main"
    2) (integer) 264
    3) "overhead.hashtable.expires"
    4) (integer) 32
17) "overhead.total"
18) (integer) 1012950
19) "keys.count"
20) (integer) 5
21) "keys.bytes-per-key"
22) (integer) 10294
23) "dataset.bytes"
24) (integer) 1562
25) "dataset.percentage"
26) "3.0346596240997314"
27) "peak.percentage"
28) "100.00315093994141"
29) "fragmentation"
30) "2.1193723678588867"
```

使用**MEMORY PURGE**子命令可以要求分配器释放内存：

```bash
redis> MEMORY PURGE
OK
```

使用**MEMORY MALLOC-STATS**子命令可以展示分配器内部状态：

```bash
127.0.0.1:6306> MEMORY MALLOC-STATS
___ Begin jemalloc statistics ___
Version: 4.0.3-0-ge9192eacf8935e29fc62fddc2701f7942b1cc02c
Assertions disabled
Run-time option settings:
  opt.abort: false
  opt.lg_chunk: 21
  opt.dss: "secondary"
  opt.narenas: 32
  opt.lg_dirty_mult: 3 (arenas.lg_dirty_mult: 3)
  opt.stats_print: false
  opt.junk: "false"
  opt.quarantine: 0
  opt.redzone: false
  opt.zero: false
  opt.tcache: true
  opt.lg_tcache_max: 15
CPUs: 8
Arenas: 32
Pointer size: 8
Quantum size: 8
Page size: 4096
Min active:dirty page ratio per arena: 8:1
Maximum thread-cached size class: 32768
Chunk size: 2097152 (2^21)
Allocated: 3101248, active: 3371008, metadata: 1590912, resident: 4657152, mapped: 8388608
Current active ceiling: 4194304
 
arenas[0]:
assigned threads: 1
dss allocation precedence: secondary
min active:dirty page ratio: 8:1
dirty pages: 823:10 active:dirty, 1 sweep, 3 madvises, 1032 purged
                            allocated      nmalloc      ndalloc    nrequests
small:                         586304        25408        13607    170099066
large:                        2514944      3967215      3967203      3967223
huge:                               0            1            1            1
total:                        3101248      3992624      3980811    174066290
active:                       3371008
mapped:                       6291456
metadata: mapped: 159744, allocated: 346240
...
...
```

### 兼容 NAT 和 Docker

 在Redis Cluster集群模式下，集群的节点需要告诉用户或者是其他节点连接自己的IP和端口。

 默认情况下，Redis会自动检测自己的IP和从配置中获取绑定的PORT，告诉客户端或者是其他节点。而在Docker环境中，如果使用的不是host网络模式，在容器内部的IP和PORT都是隔离的，那么客户端和其他节点无法通过节点公布的IP和PORT建立连接。

4.0中增加了三个配置：

- `cluster-announce-ip`：要宣布的IP地址
- `cluster-announce-port`：要宣布的数据端口
- `cluster-announce-bus-port`：节点通信端口，默认在端口前+1

如果配置了以后，Redis节点会将配置中的这些IP和PORT告知客户端或其他节点。而这些IP和PORT是通过Docker转发到容器内的临时IP和PORT的。 Active Defrag

Redis 4.0 之后支持自动内存碎片整理（Active Defrag），通过以下选项进行配置：

```bash
# 开启自动内存碎片整理(总开关)
activedefrag yes
# 当碎片达到 100mb 时，开启内存碎片整理
active-defrag-ignore-bytes 100mb
# 当碎片超过 10% 时，开启内存碎片整理
active-defrag-threshold-lower 10
# 内存碎片超过 100%，则尽最大努力整理
active-defrag-threshold-upper 100
# 内存自动整理占用资源最小百分比
active-defrag-cycle-min 25
# 内存自动整理占用资源最大百分比
active-defrag-cycle-max 75
```

实现原理可参考：https://zhuanlan.zhihu.com/p/67381368

### 其他

- Redis Cluster的故障检测方式改变，node之间的通讯减少；
- 慢日志记录客户端来源IP地址，这个小功能对于故障排查很有用处；
- 新增zlexcount命令，用于sorted set中，和zrangebylex类似，不同的是zrangebylex返回member，而zlexcount是返回符合条件的member个数；

## Redis 5

### Stream类型

Stream与Redis现有数据结构比较：

| Stream                                                       | List, Pub/Sub, Zset                                      |
| ------------------------------------------------------------ | -------------------------------------------------------- |
| 获取元素高效，复杂度为O(logN)                                | List获取元素的复杂度为O(N)                               |
| 支持offset，每个消息元素有唯一id。不会因为新元素加入或者其他元素淘汰而改变id。 | List没有offset概念，如果有元素被逐出，无法确定最新的元素 |
| 支持消息元素持久化，可以保存到AOF和RDB中                     | Pub/Sub不支持持久化消息                                  |
| 支持消费分组                                                 | Pub/Sub不支持消费分组                                    |
| 支持ACK（消费确认）                                          | Pub/Sub不支持                                            |
| Stream性能与消费者数量无明显关系                             | Pub/Sub性能与客户端数量负相关                            |
| 允许按时间线逐出历史数据，支持block，给予radix tree和listpack，内存开销少 | Zset不能重复添加相同元素，不支持逐出和block，内存开销大  |
| 不能从中间删除消息元素                                       | Zet支持删除任意元素                                      |

### 新的Redis模块API

新的Redis模块API：定时器(Timers)、集群(Cluster)和字典API(Dictionary APIs)。

### 集群管理器更改

 redis3.x和redis4.x的集群管理主要依赖基于Ruby的redis-trib.rb脚本，redis5.0彻底抛弃了它，将集群管理功能全部集成到完全用C写的redis-cli中。可以通过命令`redis-cli --cluster help`查看帮助信息。

### Lua改进

将Lua脚本更好地传播到 replicas/AOF；

Lua脚本现在可以超时并在副本中进入BUSY状态。

### RDB格式变化

Redis5.0开始，RDB快照文件中增加存储key逐出策略LRU和LFU：

- LRU(Least Recently Used)：最近最少使用。长期未使用的数据，优先被淘汰。
- LFU(Least Frequently Used)：最不经常使用。在一段时间内，使用次数最少的数据，优先被淘汰。

Redis5.0的RDB文件格式有变化，向下兼容。因此如果使用快照的方式迁移，可以从Redis低版本迁移到Redis5.0，但不能从Redis5.0迁移到低版本。

### 动态HZ

 以前redis版本的配置项hz都是固定的，redis5.0将hz动态化是为了平衡空闲CPU的使用率和响应能力。当然这个是可配置的，只不过在5.0中默认是动态的，其对应的配置为：`dynamic-hz yes`

### ZPOPMIN&ZPOPMAX命令

- ZPOPMIN key [count]

  在有序集合ZSET所有key中，删除并返回指定count个数得分最低的成员，如果返回多个成员，也会按照得分高低（value值比较），从低到高排列。

- ZPOPMAX key [count]

  在有序集合ZSET所有key中，删除并返回指定count个数得分最高的成员，如果返回多个成员，也会按照得分高低（value值比较），从高到低排列。

- BZPOPMIN key [key …] timeout

  ZPOPMIN的阻塞版本。

- BZPOPMAX key [key …] timeout

  ZPOPMAX的阻塞版本。

### CLIENT新增命令

- CLIENT UNBLOCK

  **格式：**CLIENT UNBLOCK client-id [TIMEOUT|ERROR]

  **用法：**当客户端因为执行具有阻塞功能的命令如BRPOP、XREAD被阻塞时，该命令可以通过其他连接解除客户端的阻塞

- CLIENT ID

  该命令仅返回当前连接的ID。每个连接ID都有某些保证： 它永远不会重复，可以判断当前链接是否断开过； ID是单调递增的。可以判断两个链接的接入顺序。

### 其他

- 主动碎片整理V2：增强版主动碎片整理，配合Jemalloc版本更新，更快更智能，延时更低；
- HyperLogLog改进：在Redis5.0中，HyperLogLog算法得到改进，优化了计数统计时的内存使用效率；
- 更好的内存统计报告；
- 客户经常连接和断开连接时性能更好；
- 错误修复和改进；
- Jemalloc内存分配器升级到5.1版本；
- 许多拥有子命令的命令，新增了HELP子命令，如：XINFO help、PUBSUB help、XGROUP help…
- LOLWUT命令：没什么实际用处，根据不同的版本，显示不同的图案，类似安卓；
- 如果不为了API向后兼容，我们将不再使用“slave”一词：[查看原因在新窗口打开](https://www.oschina.net/news/99797/redis-master-slave-terminology)
- Redis核心在许多方面进行了重构和改进。

## Redis 6

### 多线程IO

 Redis的多线程部分只是用来处理网络数据的读写和协议解析，执行命令仍然是单线程顺序执行。所以我们不需要去考虑控制 key、lua、事务，LPUSH/LPOP 等等的并发及线程安全问题。

 Redis6.0的多线程默认是禁用的，只使用主线程。如需开启需要修改redis.conf配置文件：io-threads-do-reads yes。开启多线程后，还需要设置线程数，否则是不生效的。修改redis.conf配置文件：io-threads ，关于线程数的设置，官方有一个建议：4核的机器建议设置为2或3个线程，8核的建议设置为6个线程，线程数一定要小于机器核数。还需要注意的是，线程数并不是越大越好，官方认为超过了8个基本就没什么意义了。

 更多关于redis 6.0多线程的讲解，请查看：https://www.cnblogs.com/madashu/p/12832766.html

### SSL支持

 连接支持SSL协议，更加安全。

### ACL支持

 在之前的版本中，Redis都会有这样的问题：用户执行FLUSHAL，现在整个数据库就空了在以前解决这个问题的办法可能是在Redis配置中将危险命令进行rename，这样将命令更名为随机字符串或者直接屏蔽掉，以满足需要。当有了ACL之后，你就可以控制比如：这个连接只允许使用RPOP，LPUSH这些命令，其他命令都无法调用。

 Redis ACL是Access Control List（访问控制列表）的缩写，该功能允许根据可以执行的命令和可以访问的键来限制某些连接。它的工作方式是：在客户端连接之后，需要客户端进行身份验证，以提供用户名和有效密码：如果身份验证阶段成功，则将连接与指定用户关联，并且该用户具有指定的限制。可以对Redis进行配置，使新连接通过“默认”用户进行身份验证（这是默认配置），但是只能提供特定的功能子集。

 在默认配置中，Redis 6（第一个具有ACL的版本）的工作方式与Redis的旧版本完全相同，也就是说，每个新连接都能够调用每个可能的命令并访问每个键，因此ACL功能对于客户端和应用程序与旧版本向后兼容。同样，使用requirepass配置指令配置密码的旧方法仍然可以按预期工作，但是现在它的作用只是为默认用户设置密码。

Redis AUTH命令在Redis 6中进行了扩展，因此现在可以在两个参数的形式中使用它：

```bash
AUTH <username> <password>
```

也可按照旧格式使用时，即：

```bash
AUTH <password>
```

Redis提供了一个新的命令ACL来维护Redis的访问控制信息，详情见：https://redis.io/topics/acl

### RESP3

 RESP（Redis Serialization Protocol）是 Redis 服务端与客户端之间通信的协议。Redis 6之前使用的是 RESP2，而Redis 6开始在兼容RESP2的基础上，开始支持RESP3。在Redis 6中我们可以使用HELLO命令在RESP2和RESP3协议之间进行切换：

```bash
#使用RESP2协议
HELLO 2
#使用RESP3协议
HELLO 3
```

推出RESP3的目的：一是因为希望能为客户端提供更多的语义化响应（semantical replies），降低客户端的复杂性，以开发使用旧协议难以实现的功能；另一个原因是为了实现 Client side caching（客户端缓存）功能。详细见：https://github.com/antirez/RESP3/blob/master/spec.md

```bash
127.0.0.1:6380> HSET myhash a 1 b 2 c 3
(integer) 3
127.0.0.1:6380> HGETALL myhash
1) "a"
2) "1"
3) "b"
4) "2"
5) "c"
6) "3"
127.0.0.1:6380> HELLO 3
1# "server" => "redis"
2# "version" => "6.0"
3# "proto" => (integer) 3
4# "id" => (integer) 5
5# "mode" => "standalone"
6# "role" => "master"
7# "modules" => (empty array)
127.0.0.1:6380> HGETALL myhash
1# "a" => "1"
2# "b" => "2"
3# "c" => "3"
```

### 客户端缓存

 基于 RESP3 协议实现的客户端缓存功能。为了进一步提升缓存的性能，将客户端经常访问的数据cache到客户端。减少TCP网络交互。不过该特性目前合并到了unstable 分支，作者说等6.0 GA版本之前，还要修改很多。

 客户端缓存的功能是该版本的全新特性，服务端能够支持让客户端缓存values，Redis作为一个本身作为一个缓存数据库，自身的性能是非常出色的，但是如果可以在Redis客户端再增加一层缓存结果，那么性能会更加的出色。Redis实现的是一个服务端协助的客户端缓存，叫做tracking。客户端缓存的命令是:

```bash
CLIENT TRACKING ON|OFF [REDIRECT client-id] [PREFIX prefix] [BCAST] [OPTIN] [OPTOUT] [NOLOOP]
```

 当tracking开启时， Redis会"记住"每个客户端请求的key，当key的值发现变化时会发送失效信息给客户端。失效信息可以通过 RESP3 协议发送给请求的客户端，或者转发给一个不同的连接(支持RESP2+ Pub/Sub)。

更多信息见：http://antirez.com/news/130

### 集群代理

 因为 Redis Cluster 内部使用的是P2P中的Gossip协议，每个节点既可以从其他节点得到服务，也可以向其他节点提供服务，没有中心的概念，通过一个节点可以获取到整个集群的所有信息。所以如果应用连接Redis Cluster可以配置一个节点地址，也可以配置多个节点地址。但需要注意如果集群进行了上下节点的的操作，其应用也需要进行修改，这样会导致需要重启应用，非常的不友好。从Redis 6.0开始支持了Prxoy，可以直接用Proxy来管理各个集群节点。本文来介绍下如何使用官方自带的proxy：redis-cluster-proxy  通过使用 redis-cluster-proxy 可以与组成Redis集群的一组实例进行通讯，就像是单个实例一样。Redis群集代理是多线程的，使用多路复用通信模型，因此每个线程都有自己的与群集的连接，该连接由属于该线程本身的所有客户端共享。

在某些特殊情况下（例如MULTI事务或阻塞命令），多路复用将被禁用；并且客户端将拥有自己的集群连接。这样客户端仅发送诸如GET和SET之类的简单命令就不需要Redis集群的专有连接。

redis-cluster-proxy的主要功能特点：

- 路由：每个查询都会自动路由到集群的正确节点
- 多线程
- 支持多路复用和专用连接模型
- 在多路复用上下文中，可以确保查询执行和答复顺序
- 发生ASK | MOVED错误后自动更新集群的配置：当答复中发生此类错误时，代理通过获取集群的更新配置并重新映射所有插槽来自动更新集群。 更新完成后所有查询将重新执行，因此，从客户端的角度来看，一切正常进行（客户端将不会收到ASK | MOVED错误：他们将在收到请求后直接收到预期的回复） 群集配置已更新）。
- 跨槽/跨节点查询：支持许多命令，这些命令涉及属于不同插槽（甚至不同集群节点）的多个键。这些命令会将查询分为多个查询，这些查询将被路由到不同的插槽/节点。 这些命令的回复处理是特定于命令的。 某些命令（例如MGET）将合并所有答复，就好像它们是单个答复一样。 其他命令（例如MSET或DEL）将汇总所有答复的结果。 由于这些查询实际上破坏了命令的原子性，因此它们的用法是可选的（默认情况下禁用）。
- 一些没有特定节点/插槽的命令（例如DBSIZE）将传递到所有节点，并且将对映射的回复进行映射缩减，以便得出所有回复中包含的所有值的总和。
- 可用于执行某些特定于代理的操作的附加PROXY命令

### Disque module

 这个本来是作者几年前开发的一个基于 Redis 的消息队列工具，但多年来作者发现 Redis 在持续开发时，他也要持续把新的功能合并到这个Disque 项目里面，这里有大量无用的工作。因此这次他在 Redis 的基础上通过 Modules 功能实现 Disque。

 如果业务并不需要保持严格消息的顺序，这个 Disque 能提供足够简单和快速的消息队列功能。

### 其他

- 新的Expire算法：用于定期删除过期key的函数activeExpireCycle被重写，以便更快地收回已经过期的key；
- 提供了许多新的Module API；
- 从服务器也支持无盘复制：在用户可以配置的特定条件下，从服务器现在可以在第一次同步时直接从套接字加载RDB到内存；
- SRANDMEMBER命令和类似的命令优化，使其结果具有更好的分布；
- 重写了Systemd支持；
- 官方redis-benchmark工具支持cluster模式；
- 提升了RDB日志加载速度；

### 文章来源

本文主要来源于（参考redis4.0、5.0、6.0版本的release notes）

https://blog.csdn.net/sinat_14840559/article/details/108326178