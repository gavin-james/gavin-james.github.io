import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as i,c,a as n,b as s,d as e,f as t}from"./app-Kb1srcrM.js";const l={},r=t(`<h1 id="redis大厂经验-美团-redis-高负载下的中断优化" tabindex="-1"><a class="header-anchor" href="#redis大厂经验-美团-redis-高负载下的中断优化" aria-hidden="true">#</a> Redis大厂经验 - 美团：Redis 高负载下的中断优化</h1><blockquote><p>本文是美团技术团队在Redis日访问量到达万亿次级别时出现网卡丢包问题的优化。文章中涉及很多会涉及内核相关的知识，不了解的可以简单看下，但是分析的思路和一步一步解决问题的方式是值得很多开发者学习的。</p></blockquote><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>2017年年初以来，随着Redis产品的用户量越来越大，接入服务越来越多，再加上美团点评Memcache和Redis两套缓存融合，Redis服务端的总体请求量从年初最开始日访问量百亿次级别上涨到高峰时段的万亿次级别，给运维和架构团队都带来了极大的挑战。</p><p>原本稳定的环境也因为请求量的上涨带来了很多不稳定的因素，其中一直困扰我们的就是网卡丢包问题。起初线上存在部分Redis节点还在使用千兆网卡的老旧服务器，而缓存服务往往需要承载极高的查询量，并要求毫秒级的响应速度，如此一来千兆网卡很快就出现了瓶颈。经过整治，我们将千兆网卡服务器替换为了万兆网卡服务器，本以为可以高枕无忧，但是没想到，在业务高峰时段，机器也竟然出现了丢包问题，而此时网卡带宽使用还远远没有达到瓶颈。</p><h2 id="定位网络丢包的原因" tabindex="-1"><a class="header-anchor" href="#定位网络丢包的原因" aria-hidden="true">#</a> 定位网络丢包的原因</h2><h3 id="从异常指标入手" tabindex="-1"><a class="header-anchor" href="#从异常指标入手" aria-hidden="true">#</a> 从异常指标入手</h3><p>首先，我们在系统监控的<code>net.if.in.dropped</code>指标中，看到有大量数据丢包异常，那么第一步就是要了解这个指标代表什么。</p><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-mt-hc-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这个指标的数据源，是读取/proc/net/dev中的数据，监控Agent做简单的处理之后上报。以下为/proc/net/dev的一个示例，可以看到第一行Receive代表in，Transmit代表out，第二行即各个表头字段，再往后每一行代表一个网卡设备具体的值。</p><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-mt-hc-2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>其中各个字段意义如下：</p><table><thead><tr><th>字段</th><th>解释</th></tr></thead><tbody><tr><td>bytes</td><td>The total number of bytes of data transmitted or received by the interface.</td></tr><tr><td>packets</td><td>The total number of packets of data transmitted or received by the interface.</td></tr><tr><td>errs</td><td>The total number of transmit or receive errors detected by the device driver.</td></tr><tr><td>drop</td><td>The total number of packets dropped by the device driver.</td></tr><tr><td>fifo</td><td>The number of FIFO buffer errors.</td></tr><tr><td>frame</td><td>The number of packet framing errors.</td></tr><tr><td>colls</td><td>The number of collisions detected on the interface.</td></tr><tr><td>compressed</td><td>The number of compressed packets transmitted or received by the device driver. (This appears to be unused in the 2.2.15 kernel.)</td></tr><tr><td>carrier</td><td>The number of carrier losses detected by the device driver.</td></tr><tr><td>multicast</td><td>The number of multicast frames transmitted or received by the device driver.</td></tr></tbody></table><p>通过上述字段解释，我们可以了解丢包发生在网卡设备驱动层面；但是想要了解真正的原因，需要继续深入源码。</p><p>/proc/net/dev的数据来源，根据源码文件net/core/net-procfs.c，可以知道上述指标是通过其中的dev_seq_show()函数和dev_seq_printf_stats()函数输出的：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">dev_seq_show</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">seq_file</span> <span class="token operator">*</span>seq<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>v<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>v <span class="token operator">==</span> SEQ_START_TOKEN<span class="token punctuation">)</span>
        <span class="token comment">/* 输出/proc/net/dev表头部分   */</span>
        <span class="token function">seq_puts</span><span class="token punctuation">(</span>seq<span class="token punctuation">,</span> <span class="token string">&quot;Inter-|   Receive                            &quot;</span>
                  <span class="token string">&quot;                    |  Transmit\\n&quot;</span>
                  <span class="token string">&quot; face |bytes    packets errs drop fifo frame &quot;</span>
                  <span class="token string">&quot;compressed multicast|bytes    packets errs &quot;</span>
                  <span class="token string">&quot;drop fifo colls carrier compressed\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        <span class="token comment">/* 输出/proc/net/dev数据部分   */</span>
        <span class="token function">dev_seq_printf_stats</span><span class="token punctuation">(</span>seq<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">dev_seq_printf_stats</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">seq_file</span> <span class="token operator">*</span>seq<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">net_device</span> <span class="token operator">*</span>dev<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">rtnl_link_stats64</span> temp<span class="token punctuation">;</span>
  
    <span class="token comment">/* 数据源从下面的函数中取得   */</span>
    <span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">rtnl_link_stats64</span> <span class="token operator">*</span>stats <span class="token operator">=</span> <span class="token function">dev_get_stats</span><span class="token punctuation">(</span>dev<span class="token punctuation">,</span> <span class="token operator">&amp;</span>temp<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token comment">/* /proc/net/dev 各个字段的数据算法   */</span>
    <span class="token function">seq_printf</span><span class="token punctuation">(</span>seq<span class="token punctuation">,</span> <span class="token string">&quot;%6s: %7llu %7llu %4llu %4llu %4llu %5llu %10llu %9llu &quot;</span>
           <span class="token string">&quot;%8llu %7llu %4llu %4llu %4llu %5llu %7llu %10llu\\n&quot;</span><span class="token punctuation">,</span>
           dev<span class="token operator">-&gt;</span>name<span class="token punctuation">,</span> stats<span class="token operator">-&gt;</span>rx_bytes<span class="token punctuation">,</span> stats<span class="token operator">-&gt;</span>rx_packets<span class="token punctuation">,</span>
           stats<span class="token operator">-&gt;</span>rx_errors<span class="token punctuation">,</span>
           stats<span class="token operator">-&gt;</span>rx_dropped <span class="token operator">+</span> stats<span class="token operator">-&gt;</span>rx_missed_errors<span class="token punctuation">,</span>
           stats<span class="token operator">-&gt;</span>rx_fifo_errors<span class="token punctuation">,</span>
           stats<span class="token operator">-&gt;</span>rx_length_errors <span class="token operator">+</span> stats<span class="token operator">-&gt;</span>rx_over_errors <span class="token operator">+</span>
            stats<span class="token operator">-&gt;</span>rx_crc_errors <span class="token operator">+</span> stats<span class="token operator">-&gt;</span>rx_frame_errors<span class="token punctuation">,</span>
           stats<span class="token operator">-&gt;</span>rx_compressed<span class="token punctuation">,</span> stats<span class="token operator">-&gt;</span>multicast<span class="token punctuation">,</span>
           stats<span class="token operator">-&gt;</span>tx_bytes<span class="token punctuation">,</span> stats<span class="token operator">-&gt;</span>tx_packets<span class="token punctuation">,</span>
           stats<span class="token operator">-&gt;</span>tx_errors<span class="token punctuation">,</span> stats<span class="token operator">-&gt;</span>tx_dropped<span class="token punctuation">,</span>
           stats<span class="token operator">-&gt;</span>tx_fifo_errors<span class="token punctuation">,</span> stats<span class="token operator">-&gt;</span>collisions<span class="token punctuation">,</span>
           stats<span class="token operator">-&gt;</span>tx_carrier_errors <span class="token operator">+</span>
            stats<span class="token operator">-&gt;</span>tx_aborted_errors <span class="token operator">+</span>
            stats<span class="token operator">-&gt;</span>tx_window_errors <span class="token operator">+</span>
            stats<span class="token operator">-&gt;</span>tx_heartbeat_errors<span class="token punctuation">,</span>
           stats<span class="token operator">-&gt;</span>tx_compressed<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>dev_seq_printf_stats()</code>函数里，对应drop输出的部分，能看到由两块组成：<code>stats-&gt;rx_dropped+stats-&gt;rx_missed_errors</code>。</p><p>继续查找dev_get_stats函数可知，rx_dropped和rx_missed_errors都是从设备获取的，并且需要设备驱动实现。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/**
 *  dev_get_stats   - get network device statistics
 *  @dev: device to get statistics from
 *  @storage: place to store stats
 *
 *  Get network statistics from device. Return @storage.
 *  The device driver may provide its own method by setting
 *  dev-&gt;netdev_ops-&gt;get_stats64 or dev-&gt;netdev_ops-&gt;get_stats;
 *  otherwise the internal statistics structure is used.
 */</span>
<span class="token keyword">struct</span> <span class="token class-name">rtnl_link_stats64</span> <span class="token operator">*</span><span class="token function">dev_get_stats</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">net_device</span> <span class="token operator">*</span>dev<span class="token punctuation">,</span>
                    <span class="token keyword">struct</span> <span class="token class-name">rtnl_link_stats64</span> <span class="token operator">*</span>storage<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">net_device_ops</span> <span class="token operator">*</span>ops <span class="token operator">=</span> dev<span class="token operator">-&gt;</span>netdev_ops<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ops<span class="token operator">-&gt;</span>ndo_get_stats64<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">memset</span><span class="token punctuation">(</span>storage<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token operator">*</span>storage<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ops<span class="token operator">-&gt;</span><span class="token function">ndo_get_stats64</span><span class="token punctuation">(</span>dev<span class="token punctuation">,</span> storage<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ops<span class="token operator">-&gt;</span>ndo_get_stats<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">netdev_stats_to_stats64</span><span class="token punctuation">(</span>storage<span class="token punctuation">,</span> ops<span class="token operator">-&gt;</span><span class="token function">ndo_get_stats</span><span class="token punctuation">(</span>dev<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">netdev_stats_to_stats64</span><span class="token punctuation">(</span>storage<span class="token punctuation">,</span> <span class="token operator">&amp;</span>dev<span class="token operator">-&gt;</span>stats<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>   
    storage<span class="token operator">-&gt;</span>rx_dropped <span class="token operator">+=</span> <span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span><span class="token punctuation">)</span><span class="token function">atomic_long_read</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>dev<span class="token operator">-&gt;</span>rx_dropped<span class="token punctuation">)</span><span class="token punctuation">;</span>
    storage<span class="token operator">-&gt;</span>tx_dropped <span class="token operator">+=</span> <span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span><span class="token punctuation">)</span><span class="token function">atomic_long_read</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>dev<span class="token operator">-&gt;</span>tx_dropped<span class="token punctuation">)</span><span class="token punctuation">;</span>
    storage<span class="token operator">-&gt;</span>rx_nohandler <span class="token operator">+=</span> <span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span><span class="token punctuation">)</span><span class="token function">atomic_long_read</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>dev<span class="token operator">-&gt;</span>rx_nohandler<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> storage<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结构体 rtnl_link_stats64 的定义在 /usr/include/linux/if_link.h 中：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/* The main device statistics structure */</span>
<span class="token keyword">struct</span> <span class="token class-name">rtnl_link_stats64</span> <span class="token punctuation">{</span>
    __u64   rx_packets<span class="token punctuation">;</span>     <span class="token comment">/* total packets received   */</span>
    __u64   tx_packets<span class="token punctuation">;</span>     <span class="token comment">/* total packets transmitted    */</span>
    __u64   rx_bytes<span class="token punctuation">;</span>       <span class="token comment">/* total bytes received     */</span>
    __u64   tx_bytes<span class="token punctuation">;</span>       <span class="token comment">/* total bytes transmitted  */</span>
    __u64   rx_errors<span class="token punctuation">;</span>      <span class="token comment">/* bad packets received     */</span>
    __u64   tx_errors<span class="token punctuation">;</span>      <span class="token comment">/* packet transmit problems */</span>
    __u64   rx_dropped<span class="token punctuation">;</span>     <span class="token comment">/* no space in linux buffers    */</span>
    __u64   tx_dropped<span class="token punctuation">;</span>     <span class="token comment">/* no space available in linux  */</span>
    __u64   multicast<span class="token punctuation">;</span>      <span class="token comment">/* multicast packets received   */</span>
    __u64   collisions<span class="token punctuation">;</span>
 
    <span class="token comment">/* detailed rx_errors: */</span>
    __u64   rx_length_errors<span class="token punctuation">;</span>
    __u64   rx_over_errors<span class="token punctuation">;</span>     <span class="token comment">/* receiver ring buff overflow  */</span>
    __u64   rx_crc_errors<span class="token punctuation">;</span>      <span class="token comment">/* recved pkt with crc error    */</span>
    __u64   rx_frame_errors<span class="token punctuation">;</span>    <span class="token comment">/* recv&#39;d frame alignment error */</span>
    __u64   rx_fifo_errors<span class="token punctuation">;</span>     <span class="token comment">/* recv&#39;r fifo overrun      */</span>
    __u64   rx_missed_errors<span class="token punctuation">;</span>   <span class="token comment">/* receiver missed packet   */</span>
 
    <span class="token comment">/* detailed tx_errors */</span>
    __u64   tx_aborted_errors<span class="token punctuation">;</span>
    __u64   tx_carrier_errors<span class="token punctuation">;</span>
    __u64   tx_fifo_errors<span class="token punctuation">;</span>
    __u64   tx_heartbeat_errors<span class="token punctuation">;</span>
    __u64   tx_window_errors<span class="token punctuation">;</span>
 
    <span class="token comment">/* for cslip etc */</span>
    __u64   rx_compressed<span class="token punctuation">;</span>
    __u64   tx_compressed<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，我们知道rx_dropped是Linux中的缓冲区空间不足导致的丢包，而rx_missed_errors则在注释中写的比较笼统。有资料指出，rx_missed_errors是fifo队列（即rx ring buffer）满而丢弃的数量，但这样的话也就和rx_fifo_errors等同了。后来公司内网络内核研发大牛王伟给了我们点拨：不同网卡自己实现不一样，比如Intel的igb网卡rx_fifo_errors在missed的基础上，还加上了RQDPC计数，而ixgbe就没这个统计。RQDPC计数是描述符不够的计数，missed是fifo满的计数。所以对于ixgbe来说，rx_fifo_errors和rx_missed_errors确实是等同的。</p><p>通过命令ethtool -S eth0可以查看网卡一些统计信息，其中就包含了上文提到的几个重要指标rx_dropped、rx_missed_errors、rx_fifo_errors等。但实际测试后，我发现不同网卡型号给出的指标略有不同，比如Intel ixgbe就能取到，而Broadcom bnx2/tg3则只能取到rx_discards（对应rx_fifo_errors）、rx_fw_discards（对应rx_dropped）。这表明，各家网卡厂商设备内部对这些丢包的计数器、指标的定义略有不同，但通过驱动向内核提供的统计数据都封装成了struct rtnl_link_stats64定义的格式。</p><p>在对丢包服务器进行检查后，发现rx_missed_errors为0，丢包全部来自rx_dropped。说明丢包发生在Linux内核的缓冲区中。接下来，我们要继续探索到底是什么缓冲区引起了丢包问题，这就需要完整地了解服务器接收数据包的过程。</p><h3 id="了解接收数据包的流程" tabindex="-1"><a class="header-anchor" href="#了解接收数据包的流程" aria-hidden="true">#</a> 了解接收数据包的流程</h3><p>接收数据包是一个复杂的过程，涉及很多底层的技术细节，但大致需要以下几个步骤：</p><ul><li>网卡收到数据包。</li><li>将数据包从网卡硬件缓存转移到服务器内存中。</li><li>通知内核处理。</li><li>经过TCP/IP协议逐层处理。</li><li>应用程序通过read()从socket buffer读取数据。</li></ul><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-mt-hc-3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h4 id="将网卡收到的数据包转移到主机内存-nic与驱动交互" tabindex="-1"><a class="header-anchor" href="#将网卡收到的数据包转移到主机内存-nic与驱动交互" aria-hidden="true">#</a> 将网卡收到的数据包转移到主机内存（NIC与驱动交互）</h4><p>NIC在接收到数据包之后，首先需要将数据同步到内核中，这中间的桥梁是rx ring buffer。它是由NIC和驱动程序共享的一片区域，事实上，rx ring buffer存储的并不是实际的packet数据，而是一个描述符，这个描述符指向了它真正的存储地址，具体流程如下：</p><ul><li>驱动在内存中分配一片缓冲区用来接收数据包，叫做sk_buffer；</li><li>将上述缓冲区的地址和大小（即接收描述符），加入到rx ring buffer。描述符中的缓冲区地址是DMA使用的物理地址；</li><li>驱动通知网卡有一个新的描述符；</li><li>网卡从rx ring buffer中取出描述符，从而获知缓冲区的地址和大小；</li><li>网卡收到新的数据包；</li><li>网卡将新数据包通过DMA直接写到sk_buffer中。</li></ul><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-mt-hc-4.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>当驱动处理速度跟不上网卡收包速度时，驱动来不及分配缓冲区，NIC接收到的数据包无法及时写到sk_buffer，就会产生堆积，当NIC内部缓冲区写满后，就会丢弃部分数据，引起丢包。这部分丢包为rx_fifo_errors，在/proc/net/dev中体现为fifo字段增长，在ifconfig中体现为overruns指标增长。</p><h4 id="通知系统内核处理-驱动与linux内核交互" tabindex="-1"><a class="header-anchor" href="#通知系统内核处理-驱动与linux内核交互" aria-hidden="true">#</a> 通知系统内核处理（驱动与Linux内核交互）</h4><p>这个时候，数据包已经被转移到了sk_buffer中。前文提到，这是驱动程序在内存中分配的一片缓冲区，并且是通过DMA写入的，这种方式不依赖CPU直接将数据写到了内存中，意味着对内核来说，其实并不知道已经有新数据到了内存中。那么如何让内核知道有新数据进来了呢？答案就是中断，通过中断告诉内核有新数据进来了，并需要进行后续处理。</p><p>提到中断，就涉及到硬中断和软中断，首先需要简单了解一下它们的区别：</p><ul><li>硬中断： 由硬件自己生成，具有随机性，硬中断被CPU接收后，触发执行中断处理程序。中断处理程序只会处理关键性的、短时间内可以处理完的工作，剩余耗时较长工作，会放到中断之后，由软中断来完成。硬中断也被称为上半部分。</li><li>软中断： 由硬中断对应的中断处理程序生成，往往是预先在代码里实现好的，不具有随机性。（除此之外，也有应用程序触发的软中断，与本文讨论的网卡收包无关。）也被称为下半部分。</li></ul><p><strong>当NIC把数据包通过DMA复制到内核缓冲区sk_buffer后，NIC立即发起一个硬件中断。CPU接收后，首先进入上半部分，网卡中断对应的中断处理程序是网卡驱动程序的一部分，之后由它发起软中断，进入下半部分，开始消费sk_buffer中的数据，交给内核协议栈处理</strong>。</p><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-mt-hc-5.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>通过中断，能够快速及时地响应网卡数据请求，但如果数据量大，那么会产生大量中断请求，CPU大部分时间都忙于处理中断，效率很低。为了解决这个问题，现在的内核及驱动都采用一种叫NAPI（new API）的方式进行数据处理，其原理可以简单理解为 中断+轮询，在数据量大时，一次中断后通过轮询接收一定数量包再返回，避免产生多次中断。</p><p>整个中断过程的源码部分比较复杂，并且不同驱动的厂商及版本也会存在一定的区别。 以下调用关系基于Linux-3.10.108及内核自带驱动drivers/net/ethernet/intel/ixgbe：</p><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-mt-hc-6.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>注意到，enqueue_to_backlog函数中，会对CPU的softnet_data实例中的接收队列（input_pkt_queue）进行判断，如果队列中的数据长度超过netdev_max_backlog ，那么数据包将直接丢弃，这就产生了丢包。netdev_max_backlog是由系统参数net.core.netdev_max_backlog指定的，默认大小是 1000。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code> <span class="token comment">/*
 * enqueue_to_backlog is called to queue an skb to a per CPU backlog
 * queue (may be a remote CPU queue).
 */</span>
<span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">enqueue_to_backlog</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">sk_buff</span> <span class="token operator">*</span>skb<span class="token punctuation">,</span> <span class="token keyword">int</span> cpu<span class="token punctuation">,</span>
                  <span class="token keyword">unsigned</span> <span class="token keyword">int</span> <span class="token operator">*</span>qtail<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">softnet_data</span> <span class="token operator">*</span>sd<span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> flags<span class="token punctuation">;</span>
 
    sd <span class="token operator">=</span> <span class="token operator">&amp;</span><span class="token function">per_cpu</span><span class="token punctuation">(</span>softnet_data<span class="token punctuation">,</span> cpu<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token function">local_irq_save</span><span class="token punctuation">(</span>flags<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token function">rps_lock</span><span class="token punctuation">(</span>sd<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
    <span class="token comment">/* 判断接收队列是否满，队列长度为 netdev_max_backlog  */</span> 
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">skb_queue_len</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>sd<span class="token operator">-&gt;</span>input_pkt_queue<span class="token punctuation">)</span> <span class="token operator">&lt;=</span> netdev_max_backlog<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  
         
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">skb_queue_len</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>sd<span class="token operator">-&gt;</span>input_pkt_queue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
enqueue<span class="token operator">:</span>
            <span class="token comment">/*  队列如果不会空，将数据包添加到队列尾  */</span>
            <span class="token function">__skb_queue_tail</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>sd<span class="token operator">-&gt;</span>input_pkt_queue<span class="token punctuation">,</span> skb<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">input_queue_tail_incr_save</span><span class="token punctuation">(</span>sd<span class="token punctuation">,</span> qtail<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">rps_unlock</span><span class="token punctuation">(</span>sd<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">local_irq_restore</span><span class="token punctuation">(</span>flags<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> NET_RX_SUCCESS<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>   
 
        <span class="token comment">/* Schedule NAPI for backlog device
         * We can use non atomic operation since we own the queue lock
         */</span>
        <span class="token comment">/*  队列如果为空，回到 ____napi_schedule加入poll_list轮询部分，并重新发起软中断  */</span> 
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">__test_and_set_bit</span><span class="token punctuation">(</span>NAPI_STATE_SCHED<span class="token punctuation">,</span> <span class="token operator">&amp;</span>sd<span class="token operator">-&gt;</span>backlog<span class="token punctuation">.</span>state<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">rps_ipi_queued</span><span class="token punctuation">(</span>sd<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token function">____napi_schedule</span><span class="token punctuation">(</span>sd<span class="token punctuation">,</span> <span class="token operator">&amp;</span>sd<span class="token operator">-&gt;</span>backlog<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>   
        <span class="token keyword">goto</span> enqueue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
    <span class="token comment">/* 队列满则直接丢弃，对应计数器 +1 */</span> 
    sd<span class="token operator">-&gt;</span>dropped<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token function">rps_unlock</span><span class="token punctuation">(</span>sd<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token function">local_irq_restore</span><span class="token punctuation">(</span>flags<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token function">atomic_long_inc</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>skb<span class="token operator">-&gt;</span>dev<span class="token operator">-&gt;</span>rx_dropped<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">kfree_skb</span><span class="token punctuation">(</span>skb<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> NET_RX_DROP<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>内核会为每个CPU Core都实例化一个softnet_data对象，这个对象中的input_pkt_queue用于管理接收的数据包。假如所有的中断都由一个CPU Core来处理的话，那么所有数据包只能经由这个CPU的input_pkt_queue，如果接收的数据包数量非常大，超过中断处理速度，那么input_pkt_queue中的数据包就会堆积，直至超过netdev_max_backlog，引起丢包。这部分丢包可以在cat /proc/net/softnet_stat的输出结果中进行确认：</p><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-mt-hc-7.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>其中每行代表一个CPU，第一列是中断处理程序接收的帧数，第二列是由于超过 netdev_max_backlog而丢弃的帧数。 第三列则是在net_rx_action函数中处理数据包超过netdev_budge指定数量或运行时间超过2个时间片的次数。在检查线上服务器之后，发现第一行CPU。硬中断的中断号及统计数据可以在/proc/interrupts中看到，对于多队列网卡，当系统启动并加载NIC设备驱动程序模块时，每个RXTX队列会被初始化分配一个唯一的中断向量号，它通知中断处理程序该中断来自哪个NIC队列。在默认情况下，所有队列的硬中断都由CPU 0处理，因此对应的软中断逻辑也会在CPU 0上处理，在服务器 TOP 的输出中，也可以观察到 %si 软中断部分，CPU 0的占比比其他core高出一截。</p><p>到这里其实有存在一个疑惑，我们线上服务器的内核版本及网卡都支持NAPI，而NAPI的处理逻辑是不会走到enqueue_to_backlog中的，enqueue_to_backlog主要是非NAPI的处理流程中使用的。对此，我们觉得可能和当前使用的Docker架构有关，事实上，我们通过net.if.dropped指标获取到的丢包，都发生在Docker虚拟网卡上，而非宿主机物理网卡上，因此很可能是Docker虚拟网桥转发数据包之后，虚拟网卡层面产生的丢包，这里由于涉及虚拟化部分，就不进一步分析了。</p><p>驱动及内核处理过程中的几个重要函数：</p><p>(1) <strong>注册中断号及中断处理程序</strong>，根据网卡是否支持MSI/MSIX，结果为：MSIX → ixgbe_msix_clean_rings，MSI → ixgbe_intr，都不支持 → ixgbe_intr。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/**
 * 文件：ixgbe_main.c
 * ixgbe_request_irq - initialize interrupts
 * @adapter: board private structure
 *
 * Attempts to configure interrupts using the best available
 * capabilities of the hardware and kernel.
 **/</span>
<span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">ixgbe_request_irq</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">ixgbe_adapter</span> <span class="token operator">*</span>adapter<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">net_device</span> <span class="token operator">*</span>netdev <span class="token operator">=</span> adapter<span class="token operator">-&gt;</span>netdev<span class="token punctuation">;</span>
    <span class="token keyword">int</span> err<span class="token punctuation">;</span>
 
    <span class="token comment">/* 支持MSIX，调用 ixgbe_request_msix_irqs 设置中断处理程序*/</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>adapter<span class="token operator">-&gt;</span>flags <span class="token operator">&amp;</span> IXGBE_FLAG_MSIX_ENABLED<span class="token punctuation">)</span>
        err <span class="token operator">=</span> <span class="token function">ixgbe_request_msix_irqs</span><span class="token punctuation">(</span>adapter<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">/* 支持MSI，直接设置 ixgbe_intr 为中断处理程序 */</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>adapter<span class="token operator">-&gt;</span>flags <span class="token operator">&amp;</span> IXGBE_FLAG_MSI_ENABLED<span class="token punctuation">)</span>
        err <span class="token operator">=</span> <span class="token function">request_irq</span><span class="token punctuation">(</span>adapter<span class="token operator">-&gt;</span>pdev<span class="token operator">-&gt;</span>irq<span class="token punctuation">,</span> <span class="token operator">&amp;</span>ixgbe_intr<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span>
                  netdev<span class="token operator">-&gt;</span>name<span class="token punctuation">,</span> adapter<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">/* 都不支持的情况，直接设置 ixgbe_intr 为中断处理程序 */</span>
    <span class="token keyword">else</span> 
        err <span class="token operator">=</span> <span class="token function">request_irq</span><span class="token punctuation">(</span>adapter<span class="token operator">-&gt;</span>pdev<span class="token operator">-&gt;</span>irq<span class="token punctuation">,</span> <span class="token operator">&amp;</span>ixgbe_intr<span class="token punctuation">,</span> IRQF_SHARED<span class="token punctuation">,</span>
                  netdev<span class="token operator">-&gt;</span>name<span class="token punctuation">,</span> adapter<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span>
        <span class="token function">e_err</span><span class="token punctuation">(</span>probe<span class="token punctuation">,</span> <span class="token string">&quot;request_irq failed, Error %d\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token keyword">return</span> err<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
  
<span class="token comment">/**
 * 文件：ixgbe_main.c
 * ixgbe_request_msix_irqs - Initialize MSI-X interrupts
 * @adapter: board private structure
 *
 * ixgbe_request_msix_irqs allocates MSI-X vectors and requests
 * interrupts from the kernel.
 **/</span>
<span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">ixgbe_adapter</span> <span class="token operator">*</span>adapter<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    …
    <span class="token keyword">for</span> <span class="token punctuation">(</span>vector <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> vector <span class="token operator">&lt;</span> adapter<span class="token operator">-&gt;</span>num_q_vectors<span class="token punctuation">;</span> vector<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">struct</span> <span class="token class-name">ixgbe_q_vector</span> <span class="token operator">*</span>q_vector <span class="token operator">=</span> adapter<span class="token operator">-&gt;</span>q_vector<span class="token punctuation">[</span>vector<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">struct</span> <span class="token class-name">msix_entry</span> <span class="token operator">*</span>entry <span class="token operator">=</span> <span class="token operator">&amp;</span>adapter<span class="token operator">-&gt;</span>msix_entries<span class="token punctuation">[</span>vector<span class="token punctuation">]</span><span class="token punctuation">;</span>
 
        <span class="token comment">/* 设置中断处理入口函数为 ixgbe_msix_clean_rings */</span>
        err <span class="token operator">=</span> <span class="token function">request_irq</span><span class="token punctuation">(</span>entry<span class="token operator">-&gt;</span>vector<span class="token punctuation">,</span> <span class="token operator">&amp;</span>ixgbe_msix_clean_rings<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span>
                  q_vector<span class="token operator">-&gt;</span>name<span class="token punctuation">,</span> q_vector<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">e_err</span><span class="token punctuation">(</span>probe<span class="token punctuation">,</span> <span class="token string">&quot;request_irq failed for MSIX interrupt &#39;%s&#39; &quot;</span>
                  <span class="token string">&quot;Error: %d\\n&quot;</span><span class="token punctuation">,</span> q_vector<span class="token operator">-&gt;</span>name<span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">goto</span> free_queue_irqs<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    …
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(2) 线上的多队列网卡均支持MSIX，<strong>中断处理程序入口</strong>为ixgbe_msix_clean_rings，里面调用了函数napi_schedule(&amp;q_vector-&gt;napi)。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/**
 * 文件：ixgbe_main.c
 **/</span>
<span class="token keyword">static</span> <span class="token class-name">irqreturn_t</span> <span class="token function">ixgbe_msix_clean_rings</span><span class="token punctuation">(</span><span class="token keyword">int</span> irq<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>data<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">ixgbe_q_vector</span> <span class="token operator">*</span>q_vector <span class="token operator">=</span> data<span class="token punctuation">;</span>
 
    <span class="token comment">/* EIAM disabled interrupts (on this vector) for us */</span>
 
    <span class="token keyword">if</span> <span class="token punctuation">(</span>q_vector<span class="token operator">-&gt;</span>rx<span class="token punctuation">.</span>ring <span class="token operator">||</span> q_vector<span class="token operator">-&gt;</span>tx<span class="token punctuation">.</span>ring<span class="token punctuation">)</span>
        <span class="token function">napi_schedule</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>q_vector<span class="token operator">-&gt;</span>napi<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token keyword">return</span> IRQ_HANDLED<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(3) 之后经过一些列调用，直到发起名为NET_RX_SOFTIRQ的软中断。到这里完成了硬中断部分，<strong>进入软中断部分</strong>，同时也上升到了内核层面。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/**
 * 文件：include/linux/netdevice.h
 *  napi_schedule - schedule NAPI poll
 *  @n: NAPI context
 *
 * Schedule NAPI poll routine to be called if it is not already
 * running.
 */</span>
<span class="token keyword">static</span> <span class="token keyword">inline</span> <span class="token keyword">void</span> <span class="token function">napi_schedule</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">napi_struct</span> <span class="token operator">*</span>n<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">napi_schedule_prep</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">/*  注意下面调用的这个函数名字前是两个下划线 */</span>
        <span class="token function">__napi_schedule</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
 
<span class="token comment">/**
 * 文件：net/core/dev.c
 * __napi_schedule - schedule for receive
 * @n: entry to schedule
 *
 * The entry&#39;s receive function will be scheduled to run.
 * Consider using __napi_schedule_irqoff() if hard irqs are masked.
 */</span>
<span class="token keyword">void</span> <span class="token function">__napi_schedule</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">napi_struct</span> <span class="token operator">*</span>n<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> flags<span class="token punctuation">;</span>
 
    <span class="token comment">/*  local_irq_save用来保存中断状态，并禁止中断 */</span>
    <span class="token function">local_irq_save</span><span class="token punctuation">(</span>flags<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">/*  注意下面调用的这个函数名字前是四个下划线，传入的 softnet_data 是当前CPU */</span>
    <span class="token function">____napi_schedule</span><span class="token punctuation">(</span><span class="token function">this_cpu_ptr</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>softnet_data<span class="token punctuation">)</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">local_irq_restore</span><span class="token punctuation">(</span>flags<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
  
<span class="token comment">/* Called with irq disabled */</span>
<span class="token keyword">static</span> <span class="token keyword">inline</span> <span class="token keyword">void</span> <span class="token function">____napi_schedule</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">softnet_data</span> <span class="token operator">*</span>sd<span class="token punctuation">,</span>
                     <span class="token keyword">struct</span> <span class="token class-name">napi_struct</span> <span class="token operator">*</span>napi<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">/* 将 napi_struct 加入 softnet_data 的 poll_list */</span>
    <span class="token function">list_add_tail</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>napi<span class="token operator">-&gt;</span>poll_list<span class="token punctuation">,</span> <span class="token operator">&amp;</span>sd<span class="token operator">-&gt;</span>poll_list<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
    <span class="token comment">/* 发起软中断 NET_RX_SOFTIRQ */</span>
    <span class="token function">__raise_softirq_irqoff</span><span class="token punctuation">(</span>NET_RX_SOFTIRQ<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(4) NET_RX_SOFTIRQ对应的<strong>软中断处理程序接口</strong>是net_rx_action()。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/*
 *  文件：net/core/dev.c
 *  Initialize the DEV module. At boot time this walks the device list and
 *  unhooks any devices that fail to initialise (normally hardware not
 *  present) and leaves us with a valid list of present and active devices.
 *
 */</span>
 
<span class="token comment">/*
 *       This is called single threaded during boot, so no need
 *       to take the rtnl semaphore.
 */</span>
<span class="token keyword">static</span> <span class="token keyword">int</span> __init <span class="token function">net_dev_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    …
    <span class="token comment">/*  分别注册TX和RX软中断的处理程序 */</span>
    <span class="token function">open_softirq</span><span class="token punctuation">(</span>NET_TX_SOFTIRQ<span class="token punctuation">,</span> net_tx_action<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">open_softirq</span><span class="token punctuation">(</span>NET_RX_SOFTIRQ<span class="token punctuation">,</span> net_rx_action<span class="token punctuation">)</span><span class="token punctuation">;</span>
    …
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(5) net_rx_action功能就是轮询调用poll方法，这里就是ixgbe_poll。一次轮询的数据包数量不能超过内核参数net.core.netdev_budget指定的数量（默认值300），并且轮询时间不能超过2个时间片。这个机制保证了单次软中断处理不会耗时太久影响被中断的程序。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/* 文件：net/core/dev.c  */</span>
<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">net_rx_action</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">softirq_action</span> <span class="token operator">*</span>h<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">softnet_data</span> <span class="token operator">*</span>sd <span class="token operator">=</span> <span class="token operator">&amp;</span><span class="token function">__get_cpu_var</span><span class="token punctuation">(</span>softnet_data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> time_limit <span class="token operator">=</span> jiffies <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> budget <span class="token operator">=</span> netdev_budget<span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token operator">*</span>have<span class="token punctuation">;</span>
 
    <span class="token function">local_irq_disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">list_empty</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>sd<span class="token operator">-&gt;</span>poll_list<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">struct</span> <span class="token class-name">napi_struct</span> <span class="token operator">*</span>n<span class="token punctuation">;</span>
        <span class="token keyword">int</span> work<span class="token punctuation">,</span> weight<span class="token punctuation">;</span>
 
        <span class="token comment">/* If softirq window is exhuasted then punt.
         * Allow this to run for 2 jiffies since which will allow
         * an average latency of 1.5/HZ.
         */</span>
  
        <span class="token comment">/* 判断处理包数是否超过 netdev_budget 及时间是否超过2个时间片 */</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">unlikely</span><span class="token punctuation">(</span>budget <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token function">time_after_eq</span><span class="token punctuation">(</span>jiffies<span class="token punctuation">,</span> time_limit<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">goto</span> softnet_break<span class="token punctuation">;</span>
 
        <span class="token function">local_irq_enable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
        <span class="token comment">/* Even though interrupts have been re-enabled, this
         * access is safe because interrupts can only add new
         * entries to the tail of this list, and only -&gt;poll()
         * calls can remove this head entry from the list.
         */</span>
        n <span class="token operator">=</span> <span class="token function">list_first_entry</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>sd<span class="token operator">-&gt;</span>poll_list<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">napi_struct</span><span class="token punctuation">,</span> poll_list<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
        have <span class="token operator">=</span> <span class="token function">netpoll_poll_lock</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
        weight <span class="token operator">=</span> n<span class="token operator">-&gt;</span>weight<span class="token punctuation">;</span>
 
        <span class="token comment">/* This NAPI_STATE_SCHED test is for avoiding a race
         * with netpoll&#39;s poll_napi().  Only the entity which
         * obtains the lock and sees NAPI_STATE_SCHED set will
         * actually make the -&gt;poll() call.  Therefore we avoid
         * accidentally calling -&gt;poll() when NAPI is not scheduled.
         */</span>
        work <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">test_bit</span><span class="token punctuation">(</span>NAPI_STATE_SCHED<span class="token punctuation">,</span> <span class="token operator">&amp;</span>n<span class="token operator">-&gt;</span>state<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            work <span class="token operator">=</span> n<span class="token operator">-&gt;</span><span class="token function">poll</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> weight<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">trace_napi_poll</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
 
        ……
    <span class="token punctuation">}</span> 
 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(6) ixgbe_poll之后的一系列调用就不一一详述了，有兴趣的同学可以自行研究，软中断部分有几个地方会有类似if (static_key_false(&amp;rps_needed))这样的判断，会进入前文所述有丢包风险的enqueue_to_backlog函数。 这里的逻辑为判断是否启用了RPS机制，RPS是早期单队列网卡上将软中断负载均衡到多个CPU Core的技术，它对数据流进行hash并分配到对应的CPU Core上，发挥多核的性能。不过现在基本都是多队列网卡，不会开启这个机制，因此走不到这里，static_key_false是针对默认为false的static key的优化判断方式。这段调用的最后，deliver_skb会将接收的数据传入一个IP层的数据结构中，至此完成二层的全部处理。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/**
 *  netif_receive_skb - process receive buffer from network
 *  @skb: buffer to process
 *
 *  netif_receive_skb() is the main receive data processing function.
 *  It always succeeds. The buffer may be dropped during processing
 *  for congestion control or by the protocol layers.
 *
 *  This function may only be called from softirq context and interrupts
 *  should be enabled.
 *
 *  Return values (usually ignored):
 *  NET_RX_SUCCESS: no congestion
 *  NET_RX_DROP: packet was dropped
 */</span>
<span class="token keyword">int</span> <span class="token function">netif_receive_skb</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">sk_buff</span> <span class="token operator">*</span>skb<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> ret<span class="token punctuation">;</span>
 
    <span class="token function">net_timestamp_check</span><span class="token punctuation">(</span>netdev_tstamp_prequeue<span class="token punctuation">,</span> skb<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">skb_defer_rx_timestamp</span><span class="token punctuation">(</span>skb<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> NET_RX_SUCCESS<span class="token punctuation">;</span>
 
    <span class="token function">rcu_read_lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_RPS</span></span>
    <span class="token comment">/* 判断是否启用RPS机制 */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">static_key_false</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>rps_needed<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">struct</span> <span class="token class-name">rps_dev_flow</span> voidflow<span class="token punctuation">,</span> <span class="token operator">*</span>rflow <span class="token operator">=</span> <span class="token operator">&amp;</span>voidflow<span class="token punctuation">;</span>
        <span class="token comment">/* 获取对应的CPU Core */</span>
        <span class="token keyword">int</span> cpu <span class="token operator">=</span> <span class="token function">get_rps_cpu</span><span class="token punctuation">(</span>skb<span class="token operator">-&gt;</span>dev<span class="token punctuation">,</span> skb<span class="token punctuation">,</span> <span class="token operator">&amp;</span>rflow<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cpu <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            ret <span class="token operator">=</span> <span class="token function">enqueue_to_backlog</span><span class="token punctuation">(</span>skb<span class="token punctuation">,</span> cpu<span class="token punctuation">,</span> <span class="token operator">&amp;</span>rflow<span class="token operator">-&gt;</span>last_qtail<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">rcu_read_unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
    ret <span class="token operator">=</span> <span class="token function">__netif_receive_skb</span><span class="token punctuation">(</span>skb<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">rcu_read_unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="tcp-ip协议栈逐层处理-最终交给用户空间读取" tabindex="-1"><a class="header-anchor" href="#tcp-ip协议栈逐层处理-最终交给用户空间读取" aria-hidden="true">#</a> TCP/IP协议栈逐层处理，最终交给用户空间读取</h4><p>数据包进到IP层之后，经过IP层、TCP层处理（校验、解析上层协议，发送给上层协议），放入socket buffer，在应用程序执行read() 系统调用时，就能从socket buffer中将新数据从内核区拷贝到用户区，完成读取。</p><p>这里的socket buffer大小即TCP接收窗口，TCP由于具备流量控制功能，能动态调整接收窗口大小，因此数据传输阶段不会出现由于socket buffer接收队列空间不足而丢包的情况（但UDP及TCP握手阶段仍会有）。涉及TCP/IP协议的部分不是此次丢包问题的研究重点，因此这里不再赘述。</p><h4 id="网卡队列" tabindex="-1"><a class="header-anchor" href="#网卡队列" aria-hidden="true">#</a> 网卡队列</h4><ul><li><strong>查看网卡型号</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  <span class="token comment"># lspci -vvv | grep Eth</span>
01:00.0 Ethernet controller: Intel Corporation Ethernet Controller <span class="token number">10</span>-Gigabit X540-AT2 <span class="token punctuation">(</span>rev 03<span class="token punctuation">)</span>
        Subsystem: Dell Ethernet 10G 4P X540/I350 rNDC
01:00.1 Ethernet controller: Intel Corporation Ethernet Controller <span class="token number">10</span>-Gigabit X540-AT2 <span class="token punctuation">(</span>rev 03<span class="token punctuation">)</span>
        Subsystem: Dell Ethernet 10G 4P X540/I350 rNDC

  
<span class="token comment"># lspci -vvv</span>
07:00.0 Ethernet controller: Intel Corporation I350 Gigabit Network Connection <span class="token punctuation">(</span>rev 01<span class="token punctuation">)</span>
        Subsystem: Dell Gigabit 4P X540/I350 rNDC
        Control: I/O- Mem+ BusMaster+ SpecCycle- MemWINV- VGASnoop- ParErr- Stepping- SERR- FastB2B- DisINTx+
        Status: Cap+ 66MHz- UDF- FastB2B- ParErr- <span class="token assign-left variable">DEVSEL</span><span class="token operator">=</span>fast <span class="token operator">&gt;</span>TAbort- <span class="token operator">&lt;</span>TAbort- <span class="token operator">&lt;</span>MAbort- <span class="token operator">&gt;</span>SERR- <span class="token operator">&lt;</span>PERR- INTx-
        Latency: <span class="token number">0</span>, Cache Line Size: <span class="token number">128</span> bytes
        Interrupt: pin D routed to IRQ <span class="token number">19</span>
        Region <span class="token number">0</span>: Memory at <span class="token number">92380000</span> <span class="token punctuation">(</span><span class="token number">32</span>-bit, non-prefetchable<span class="token punctuation">)</span> <span class="token punctuation">[</span>size<span class="token operator">=</span>512K<span class="token punctuation">]</span>
        Region <span class="token number">3</span>: Memory at <span class="token number">92404000</span> <span class="token punctuation">(</span><span class="token number">32</span>-bit, non-prefetchable<span class="token punctuation">)</span> <span class="token punctuation">[</span>size<span class="token operator">=</span>16K<span class="token punctuation">]</span>
        Expansion ROM at 92a00000 <span class="token punctuation">[</span>disabled<span class="token punctuation">]</span> <span class="token punctuation">[</span>size<span class="token operator">=</span>512K<span class="token punctuation">]</span>
        Capabilities: <span class="token punctuation">[</span><span class="token number">40</span><span class="token punctuation">]</span> Power Management version <span class="token number">3</span>
                Flags: PMEClk- DSI+ D1- D2- <span class="token assign-left variable">AuxCurrent</span><span class="token operator">=</span>0mA PME<span class="token punctuation">(</span>D0+,D1-,D2-,D3hot+,D3cold+<span class="token punctuation">)</span>
                Status: D0 NoSoftRst+ PME-Enable- <span class="token assign-left variable">DSel</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">DScale</span><span class="token operator">=</span><span class="token number">1</span> PME-
        Capabilities: <span class="token punctuation">[</span><span class="token number">50</span><span class="token punctuation">]</span> MSI: Enable- <span class="token assign-left variable">Count</span><span class="token operator">=</span><span class="token number">1</span>/1 Maskable+ 64bit+
                Address: 0000000000000000  Data: 0000
                Masking: 00000000  Pending: 00000000
        Capabilities: <span class="token punctuation">[</span><span class="token number">70</span><span class="token punctuation">]</span> MSI-X: Enable+ <span class="token assign-left variable">Count</span><span class="token operator">=</span><span class="token number">10</span> Masked-
                Vector table: <span class="token assign-left variable">BAR</span><span class="token operator">=</span><span class="token number">3</span> <span class="token assign-left variable">offset</span><span class="token operator">=</span>00000000
                PBA: <span class="token assign-left variable">BAR</span><span class="token operator">=</span><span class="token number">3</span> <span class="token assign-left variable">offset</span><span class="token operator">=</span>00002000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出，网卡的中断机制是MSI-X，即网卡的每个队列都可以分配中断（MSI-X支持2048个中断）。</p><ul><li><strong>网卡队列</strong></li></ul><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
 <span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">IXGBE_MAX_MSIX_VECTORS_82599</span>    <span class="token expression"><span class="token number">0x40</span></span></span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
 
  
  u16 <span class="token function">ixgbe_get_pcie_msix_count_generic</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">ixgbe_hw</span> <span class="token operator">*</span>hw<span class="token punctuation">)</span>
 <span class="token punctuation">{</span>
     u16 msix_count<span class="token punctuation">;</span>
     u16 max_msix_count<span class="token punctuation">;</span>
     u16 pcie_offset<span class="token punctuation">;</span>
  
     <span class="token keyword">switch</span> <span class="token punctuation">(</span>hw<span class="token operator">-&gt;</span>mac<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token keyword">case</span> ixgbe_mac_82598EB<span class="token operator">:</span>
         pcie_offset <span class="token operator">=</span> IXGBE_PCIE_MSIX_82598_CAPS<span class="token punctuation">;</span>
         max_msix_count <span class="token operator">=</span> IXGBE_MAX_MSIX_VECTORS_82598<span class="token punctuation">;</span>
         <span class="token keyword">break</span><span class="token punctuation">;</span>
     <span class="token keyword">case</span> ixgbe_mac_82599EB<span class="token operator">:</span>
     <span class="token keyword">case</span> ixgbe_mac_X540<span class="token operator">:</span>
     <span class="token keyword">case</span> ixgbe_mac_X550<span class="token operator">:</span>
     <span class="token keyword">case</span> ixgbe_mac_X550EM_x<span class="token operator">:</span>
     <span class="token keyword">case</span> ixgbe_mac_x550em_a<span class="token operator">:</span>
         pcie_offset <span class="token operator">=</span> IXGBE_PCIE_MSIX_82599_CAPS<span class="token punctuation">;</span>
         max_msix_count <span class="token operator">=</span> IXGBE_MAX_MSIX_VECTORS_82599<span class="token punctuation">;</span>
         <span class="token keyword">break</span><span class="token punctuation">;</span>
     <span class="token keyword">default</span><span class="token operator">:</span>
         <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
 <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据网卡型号确定驱动中定义的网卡队列，可以看到X540网卡驱动中定义最大支持的IRQ Vector为0x40(数值:64)。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">ixgbe_acquire_msix_vectors</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">ixgbe_adapter</span> <span class="token operator">*</span>adapter<span class="token punctuation">)</span>
 <span class="token punctuation">{</span>
     <span class="token keyword">struct</span> <span class="token class-name">ixgbe_hw</span> <span class="token operator">*</span>hw <span class="token operator">=</span> <span class="token operator">&amp;</span>adapter<span class="token operator">-&gt;</span>hw<span class="token punctuation">;</span>
     <span class="token keyword">int</span> i<span class="token punctuation">,</span> vectors<span class="token punctuation">,</span> vector_threshold<span class="token punctuation">;</span>
  
     <span class="token comment">/* We start by asking for one vector per queue pair with XDP queues
      * being stacked with TX queues.
      */</span>
     vectors <span class="token operator">=</span> <span class="token function">max</span><span class="token punctuation">(</span>adapter<span class="token operator">-&gt;</span>num_rx_queues<span class="token punctuation">,</span> adapter<span class="token operator">-&gt;</span>num_tx_queues<span class="token punctuation">)</span><span class="token punctuation">;</span>
     vectors <span class="token operator">=</span> <span class="token function">max</span><span class="token punctuation">(</span>vectors<span class="token punctuation">,</span> adapter<span class="token operator">-&gt;</span>num_xdp_queues<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
     <span class="token comment">/* It is easy to be greedy for MSI-X vectors. However, it really
      * doesn&#39;t do much good if we have a lot more vectors than CPUs. We&#39;ll
      * be somewhat conservative and only ask for (roughly) the same number
      * of vectors as there are CPUs.
      */</span>
     vectors <span class="token operator">=</span> <span class="token class-name">min_t</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">,</span> vectors<span class="token punctuation">,</span> <span class="token function">num_online_cpus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过加载网卡驱动，获取网卡型号和网卡硬件的队列数；但是在初始化misx vector的时候，还会结合系统在线CPU的数量，通过Sum = Min(网卡队列，CPU Core) 来激活相应的网卡队列数量，并申请Sum个中断号。</p><p>如果CPU数量小于64，会生成CPU数量的队列，也就是每个CPU会产生一个external IRQ。</p><p>我们线上的CPU一般是48个逻辑core，就会生成48个中断号，由于我们是两块网卡做了bond，也就会生成96个中断号。</p><h3 id="验证与复现网络丢包" tabindex="-1"><a class="header-anchor" href="#验证与复现网络丢包" aria-hidden="true">#</a> 验证与复现网络丢包</h3>`,76),u={href:"http://blog.yufeng.info/archives/2037",target:"_blank",rel:"noopener noreferrer"},d=t(`<div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>global hard<span class="token punctuation">,</span> soft<span class="token punctuation">,</span> wq
  
probe irq_handler<span class="token punctuation">.</span>entry <span class="token punctuation">{</span>
hard<span class="token punctuation">[</span>irq<span class="token punctuation">,</span> dev_name<span class="token punctuation">]</span><span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
  
probe timer<span class="token punctuation">.</span><span class="token function">s</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;==irq number:dev_name&quot;</span><span class="token punctuation">)</span>
<span class="token function">foreach</span><span class="token punctuation">(</span> <span class="token punctuation">[</span>irq<span class="token punctuation">,</span> dev_name<span class="token punctuation">]</span> in hard<span class="token operator">-</span> limit <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d,%s-&gt;%d\\n&quot;</span><span class="token punctuation">,</span> irq<span class="token punctuation">,</span> <span class="token function">kernel_string</span><span class="token punctuation">(</span>dev_name<span class="token punctuation">)</span><span class="token punctuation">,</span> hard<span class="token punctuation">[</span>irq<span class="token punctuation">,</span> dev_name<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      
<span class="token punctuation">}</span>
 
<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;==softirq cpu:h:vec:action&quot;</span><span class="token punctuation">)</span>
<span class="token function">foreach</span><span class="token punctuation">(</span> <span class="token punctuation">[</span>c<span class="token punctuation">,</span>h<span class="token punctuation">,</span>vec<span class="token punctuation">,</span>action<span class="token punctuation">]</span> in soft<span class="token operator">-</span> limit <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d:%x:%x:%s-&gt;%d\\n&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">,</span> h<span class="token punctuation">,</span> vec<span class="token punctuation">,</span> <span class="token function">symdata</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span><span class="token punctuation">,</span> soft<span class="token punctuation">[</span>c<span class="token punctuation">,</span>h<span class="token punctuation">,</span>vec<span class="token punctuation">,</span>action<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      
<span class="token punctuation">}</span>
 
  
<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;==workqueue wq_thread:work_func&quot;</span><span class="token punctuation">)</span>
<span class="token function">foreach</span><span class="token punctuation">(</span> <span class="token punctuation">[</span>wq_thread<span class="token punctuation">,</span>work_func<span class="token punctuation">]</span> in wq<span class="token operator">-</span> limit <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%x:%x-&gt;%d\\n&quot;</span><span class="token punctuation">,</span> wq_thread<span class="token punctuation">,</span> work_func<span class="token punctuation">,</span> wq<span class="token punctuation">[</span>wq_thread<span class="token punctuation">,</span> work_func<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
  
<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span>
delete hard
delete soft
delete wq
<span class="token punctuation">}</span>
  
probe softirq<span class="token punctuation">.</span>entry <span class="token punctuation">{</span>
soft<span class="token punctuation">[</span><span class="token function">cpu</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> h<span class="token punctuation">,</span>vec<span class="token punctuation">,</span>action<span class="token punctuation">]</span><span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
  
probe workqueue<span class="token punctuation">.</span>execute <span class="token punctuation">{</span>
wq<span class="token punctuation">[</span>wq_thread<span class="token punctuation">,</span> work_func<span class="token punctuation">]</span><span class="token operator">++</span>
<span class="token punctuation">}</span>
  
  
probe begin <span class="token punctuation">{</span>
<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;~&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面执行i.stap的结果:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">==</span>irq number:dev_name
<span class="token number">87</span>,eth0-0-<span class="token operator">&gt;</span><span class="token number">1693</span>
<span class="token number">90</span>,eth0-3-<span class="token operator">&gt;</span><span class="token number">1263</span>
<span class="token number">95</span>,eth1-3-<span class="token operator">&gt;</span><span class="token number">746</span>
<span class="token number">92</span>,eth1-0-<span class="token operator">&gt;</span><span class="token number">703</span>
<span class="token number">89</span>,eth0-2-<span class="token operator">&gt;</span><span class="token number">654</span>
<span class="token operator">==</span>softirq cpu:h:vec:action
<span class="token number">0</span>:ffffffff81a83098:ffffffff81a83080:0xffffffff81461a00-<span class="token operator">&gt;</span><span class="token number">8928</span>
<span class="token number">0</span>:ffffffff81a83088:ffffffff81a83080:0xffffffff81084940-<span class="token operator">&gt;</span><span class="token number">626</span>
<span class="token number">0</span>:ffffffff81a830c8:ffffffff81a83080:0xffffffff810ecd70-<span class="token operator">&gt;</span><span class="token number">614</span>
<span class="token number">16</span>:ffffffff81a83088:ffffffff81a83080:0xffffffff81084940-<span class="token operator">&gt;</span><span class="token number">225</span>
<span class="token number">16</span>:ffffffff81a830c8:ffffffff81a83080:0xffffffff810ecd70-<span class="token operator">&gt;</span><span class="token number">224</span>
<span class="token operator">==</span>workqueue wq_thread:work_func
ffff88083062aae0:ffffffffa01c53d0-<span class="token operator">&gt;</span><span class="token number">10</span>
ffff88083062aae0:ffffffffa01ca8f0-<span class="token operator">&gt;</span><span class="token number">10</span>
ffff88083420a080:ffffffff81142160-<span class="token operator">&gt;</span><span class="token number">2</span>
ffff8808343fe040:ffffffff8127c9d0-<span class="token operator">&gt;</span><span class="token number">2</span>
ffff880834282ae0:ffffffff8133bd20-<span class="token operator">&gt;</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是action对应的符号信息：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>addr2line <span class="token parameter variable">-e</span> /usr/lib/debug/lib/modules/2.6.32-431.20.3.el6.mt20161028.x86_64/vmlinux ffffffff81461a00
/usr/src/debug/kernel-2.6.32-431.20.3.el6/linux-2.6.32-431.20.3.el6.mt20161028.x86_64/net/core/dev.c:4013
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>打开这个文件，我们发现它是在执行static void net_rx_action(struct softirq_action *h)这个函数，而这个函数正是前文提到的，NET_RX_SOFTIRQ对应的软中断处理程序。因此可以确认网卡的软中断在机器上分布非常不均，而且主要集中在CPU 0上。通过/proc/interrupts能确认硬中断集中在CPU 0上，因此软中断也都由CPU 0处理，如何优化网卡的中断成为了我们关注的重点。</p><h2 id="优化策略" tabindex="-1"><a class="header-anchor" href="#优化策略" aria-hidden="true">#</a> 优化策略</h2><h3 id="cpu亲缘性" tabindex="-1"><a class="header-anchor" href="#cpu亲缘性" aria-hidden="true">#</a> CPU亲缘性</h3><p>前文提到，丢包是因为队列中的数据包超过了netdev_max_backlog造成了丢弃，因此首先想到是临时调大netdev_max_backlog能否解决燃眉之急，事实证明，对于轻微丢包调大参数可以缓解丢包，但对于大量丢包则几乎不怎么管用，内核处理速度跟不上收包速度的问题还是客观存在，本质还是因为单核处理中断有瓶颈，即使不丢包，服务响应速度也会变慢。因此如果能同时使用多个CPU Core来处理中断，就能显著提高中断处理的效率，并且每个CPU都会实例化一个softnet_data对象，队列数也增加了。</p><h4 id="中断亲缘性设置" tabindex="-1"><a class="header-anchor" href="#中断亲缘性设置" aria-hidden="true">#</a> 中断亲缘性设置</h4><p>通过设置中断亲缘性，可以让指定的中断向量号更倾向于发送给指定的CPU Core来处理，俗称“绑核”。命令grep eth /proc/interrupts的第一列可以获取网卡的中断号，如果是多队列网卡，那么就会有多行输出：</p><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-mt-hc-8.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>中断的亲缘性设置可以在<code>cat /proc/irq/\${中断号}/smp_affinity</code> 或 <code>cat /proc/irq/\${中断号}/smp_affinity_list</code>中确认，前者是16进制掩码形式，后者是以CPU Core序号形式。例如下图中，将16进制的400转换成2进制后，为 10000000000，“1”在第10位上，表示亲缘性是第10个CPU Core。</p><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-mt-hc-9.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>那为什么中断号只设置一个CPU Core呢？而不是为每一个中断号设置多个CPU Core平行处理。我们经过测试，发现当给中断设置了多个CPU Core后，它也仅能由设置的第一个CPU Core来处理，其他的CPU Core并不会参与中断处理，原因猜想是当CPU可以平行收包时，不同的核收取了同一个queue的数据包，但处理速度不一致，导致提交到IP层后的顺序也不一致，这就会产生乱序的问题，由同一个核来处理可以避免了乱序问题。</p><p>但是，当我们配置了多个Core处理中断后，发现Redis的慢查询数量有明显上升，甚至部分业务也受到了影响，慢查询增多直接导致可用性降低，因此方案仍需进一步优化。</p><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-mt-hc-10.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h4 id="redis进程亲缘性设置" tabindex="-1"><a class="header-anchor" href="#redis进程亲缘性设置" aria-hidden="true">#</a> Redis进程亲缘性设置</h4><p>如果某个CPU Core正在处理Redis的调用，执行到一半时产生了中断，那么CPU不得不停止当前的工作转而处理中断请求，中断期间Redis也无法转交给其他core继续运行，必须等处理完中断后才能继续运行。Redis本身定位就是高速缓存，线上的平均端到端响应时间小于1ms，如果频繁被中断，那么响应时间必然受到极大影响。容易想到，由最初的CPU 0单核处理中断，改进到多核处理中断，Redis进程被中断影响的几率增大了，因此我们需要对Redis进程也设置CPU亲缘性，使其与处理中断的Core互相错开，避免受到影响。</p><p>使用命令taskset可以为进程设置CPU亲缘性，操作十分简单，一句taskset -cp cpu-list pid即可完成绑定。经过一番压测，我们发现使用8个core处理中断时，流量直至打满双万兆网卡也不会出现丢包，因此决定将中断的亲缘性设置为物理机上前8个core，Redis进程的亲缘性设置为剩下的所有core。调整后，确实有明显的效果，慢查询数量大幅优化，但对比初始情况，仍然还是高了一些些，还有没有优化空间呢？</p><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-mt-hc-11.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>通过观察，我们发现一个有趣的现象，当只有CPU 0处理中断时，Redis进程更倾向于运行在CPU 0，以及CPU 0同一物理CPU下的其他核上。于是有了以下推测：我们设置的中断亲缘性，是直接选取了前8个核心，但这8个core却可能是来自两块物理CPU的，在/proc/cpuinfo中，通过字段processor和physical id 能确认这一点，那么响应慢是否和物理CPU有关呢？物理CPU又和NUMA架构关联，每个物理CPU对应一个NUMA node，那么接下来就要从NUMA角度进行分析。</p><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-mt-hc-12.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="numa" tabindex="-1"><a class="header-anchor" href="#numa" aria-hidden="true">#</a> NUMA</h3><h4 id="smp-架构" tabindex="-1"><a class="header-anchor" href="#smp-架构" aria-hidden="true">#</a> SMP 架构</h4><p>随着单核CPU的频率在制造工艺上的瓶颈，CPU制造商的发展方向也由纵向变为横向：从CPU频率转为每瓦性能。CPU也就从单核频率时代过渡到多核性能协调。</p><p><strong>SMP</strong>(对称多处理结构)：即CPU共享所有资源，例如总线、内存、IO等。</p><p><strong>SMP 结构</strong>：一个物理CPU可以有多个物理Core，每个Core又可以有多个硬件线程。即：每个HT有一个独立的L1 cache，同一个Core下的HT共享L2 cache，同一个物理CPU下的多个core共享L3 cache。</p>`,28),k={href:"https://mp.weixin.qq.com/s/y1NSE5xdh8Nt5hlmK0E8Og",target:"_blank",rel:"noopener noreferrer"},v=n("figure",null,[n("img",{src:"https://www.pdai.tech/images/db/redis/db-redis-mt-hc-13.png",alt:"img",tabindex:"0",loading:"lazy"}),n("figcaption",null,"img")],-1),m=n("h4",{id:"numa-架构",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#numa-架构","aria-hidden":"true"},"#"),s(" NUMA 架构")],-1),b=n("p",null,"在前面的FSB(前端系统总线)结构中，当CPU不断增长的情况下，共享的系统总线就会因为资源竞争(多核争抢总线资源以访问北桥上的内存)而出现扩展和性能问题。",-1),_=n("p",null,"在这样的背景下，基于SMP架构上的优化，设计出了NUMA(Non-Uniform Memory Access)非均匀内存访问。",-1),f={href:"http://mechanical-sympathy.blogspot.com/2013/02/cpu-cache-flushing-fallacy.html",target:"_blank",rel:"noopener noreferrer"},g=t('<p>CPU 多层Cache的性能差异是很巨大的，比如：L1的访问时长1ns，L2的时长3ns…跨node的访问会有几十甚至上百倍的性能损耗。</p><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-mt-hc-14.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="numa-架构下的中断优化" tabindex="-1"><a class="header-anchor" href="#numa-架构下的中断优化" aria-hidden="true">#</a> NUMA 架构下的中断优化</h3><p>这时我们再回归到中断的问题上，当两个NUMA节点处理中断时，CPU实例化的softnet_data以及驱动分配的sk_buffer都可能是跨Node的，数据接收后对上层应用Redis来说，跨Node访问的几率也大大提高，并且无法充分利用L2、L3 cache，增加了延时。</p><p>同时，由于Linux wake affinity特性，如果两个进程频繁互动，调度系统会觉得它们很有可能共享同样的数据，把它们放到同一CPU核心或NUMA Node有助于提高缓存和内存的访问性能，所以当一个进程唤醒另一个的时候，被唤醒的进程可能会被放到相同的CPU core或者相同的NUMA节点上。此特性对中断唤醒进程时也起作用，在上一节所述的现象中，所有的网络中断都分配给CPU 0去处理，当中断处理完成时，由于wakeup affinity特性的作用，所唤醒的用户进程也被安排给CPU 0或其所在的numa节点上其他core。而当两个NUMA node处理中断时，这种调度特性有可能导致Redis进程在CPU core之间频繁迁移，造成性能损失。</p><p>综合上述，将中断都分配在同一NUMA Node中，中断处理函数和应用程序充分利用同NUMA下的L2、L3缓存、以及同Node下的内存，结合调度系统的wake affinity特性，能够更进一步降低延迟。</p><figure><img src="https://www.pdai.tech/images/db/redis/db-redis-mt-hc-15.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="参考文档" tabindex="-1"><a class="header-anchor" href="#参考文档" aria-hidden="true">#</a> 参考文档</h2>',8),h={href:"https://community.intel.com/t5/Ethernet-Products/bd-p/ethernet-products",target:"_blank",rel:"noopener noreferrer"},w={href:"https://access.redhat.com/sites/default/files/attachments/20150325_network_performance_tuning.pdf",target:"_blank",rel:"noopener noreferrer"},x=n("h2",{id:"作者简介",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#作者简介","aria-hidden":"true"},"#"),s(" 作者简介")],-1),y=n("ul",null,[n("li",null,"骁雄，14年加入美团点评，主要从事MySQL、Redis数据库运维，高可用和相关运维平台建设。"),n("li",null,"春林，17年加入美团点评，毕业后一直深耕在运维线，从网络工程师到Oracle DBA再到MySQL DBA 多种岗位转变，现在美大主要职责Redis运维开发和优化工作。")],-1),q=n("h2",{id:"文章来源",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#文章来源","aria-hidden":"true"},"#"),s(" 文章来源")],-1),C=n("p",null,"转载说明",-1),P=n("li",null,"作者：骁雄，春林",-1),I=n("li",null,"版权声明：本文为美团技术团队的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。",-1),U={href:"https://tech.meituan.com/2018/03/16/redis-high-concurrency-optimization.html",target:"_blank",rel:"noopener noreferrer"};function S(E,R){const a=o("ExternalLinkIcon");return i(),c("div",null,[r,n("p",null,[s("通过霸爷的"),n("a",u,[s("一篇文章在新窗口打开"),e(a)]),s("，我们在测试环境做了测试，发现测试环境的中断确实有集中在CPU 0的情况，下面使用systemtap诊断测试环境软中断分布的方法:")]),d,n("p",null,[s("下图(摘自"),n("a",k,[s("内核月谈在新窗口打开"),e(a)]),s(")中，一个x86 CPU有4个物理Core，每个Core有两个HT(Hyper Thread)。")]),v,m,b,_,n("p",null,[s("内存控制器芯片被集成到处理器内部，多个处理器通过QPI链路相连，DRAM也就有了远近之分。(如下图所示：摘自"),n("a",f,[s("CPU Cache在新窗口打开"),e(a)]),s(")")]),g,n("ul",null,[n("li",null,[n("a",h,[s("Intel 官方文档在新窗口打开"),e(a)])]),n("li",null,[n("a",w,[s("Redhat 官方文档在新窗口打开"),e(a)])])]),x,y,q,C,n("ul",null,[P,I,n("li",null,[s("原文链接："),n("a",U,[s("https://tech.meituan.com/2018/03/16/redis-high-concurrency-optimization.html"),e(a)])])])])}const M=p(l,[["render",S],["__file","db-redis-y-mt-1.html.vue"]]);export{M as default};
