import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,f as e}from"./app-5g2Grfu7.js";const t={},p=e(`<h1 id="分布式算法-snowflake算法" tabindex="-1"><a class="header-anchor" href="#分布式算法-snowflake算法" aria-hidden="true">#</a> 分布式算法 - Snowflake算法</h1><blockquote><p>Snowflake，雪花算法是由Twitter开源的分布式ID生成算法，以划分命名空间的方式将 64-bit位分割成多个部分，每个部分代表不同的含义。这种就是将64位划分为不同的段，每段代表不同的涵义，基本就是时间戳、机器ID和序列数。为什么如此重要？因为它提供了一种ID生成及生成的思路，当然这种方案就是需要考虑时钟回拨的问题以及做一些 buffer的缓冲设计提高性能。</p></blockquote><h2 id="雪花算法-snowflake" tabindex="-1"><a class="header-anchor" href="#雪花算法-snowflake" aria-hidden="true">#</a> 雪花算法-Snowflake</h2><p>Snowflake，雪花算法是由Twitter开源的分布式ID生成算法，以划分命名空间的方式将 64-bit位分割成多个部分，每个部分代表不同的含义。而 Java中64bit的整数是Long类型，所以在 Java 中 SnowFlake 算法生成的 ID 就是 long 来存储的。</p><ul><li><strong>第1位</strong>占用1bit，其值始终是0，可看做是符号位不使用。</li><li><strong>第2位</strong>开始的41位是时间戳，41-bit位可表示2^41个数，每个数代表毫秒，那么雪花算法可用的时间年限是<code>(1L&lt;&lt;41)/(1000L360024*365)</code>=69 年的时间。</li><li><strong>中间的10-bit位</strong>可表示机器数，即2^10 = 1024台机器，但是一般情况下我们不会部署这么台机器。如果我们对IDC（互联网数据中心）有需求，还可以将 10-bit 分 5-bit 给 IDC，分5-bit给工作机器。这样就可以表示32个IDC，每个IDC下可以有32台机器，具体的划分可以根据自身需求定义。</li><li><strong>最后12-bit位</strong>是自增序列，可表示2^12 = 4096个数。</li></ul><p>这样的划分之后相当于<strong>在一毫秒一个数据中心的一台机器上可产生4096个有序的不重复的ID</strong>。但是我们 IDC 和机器数肯定不止一个，所以毫秒内能生成的有序ID数是翻倍的。</p><figure><img src="https://www.pdai.tech/images/arch/arch-z-id-3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>Snowflake 的Twitter官方原版是用Scala写的，对Scala语言有研究的同学可以去阅读下，以下是 Java 版本的写法。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>jajian<span class="token punctuation">.</span>demo<span class="token punctuation">.</span>distribute</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * Twitter_Snowflake<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * SnowFlake的结构如下(每部分用-分开):<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * 0 - 0000000000 0000000000 0000000000 0000000000 0 - 00000 - 00000 - 000000000000 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * 1位标识，由于long基本类型在Java中是带符号的，最高位是符号位，正数是0，负数是1，所以id一般是正数，最高位是0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * 41位时间截(毫秒级)，注意，41位时间截不是存储当前时间的时间截，而是存储时间截的差值（当前时间截 - 开始时间截)
 * 得到的值），这里的的开始时间截，一般是我们的id生成器开始使用的时间，由我们程序来指定的（如下下面程序IdWorker类的startTime属性）。41位的时间截，可以使用69年，年T = (1L &lt;&lt; 41) / (1000L * 60 * 60 * 24 * 365) = 69<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * 10位的数据机器位，可以部署在1024个节点，包括5位datacenterId和5位workerId<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * 12位序列，毫秒内的计数，12位的计数顺序号支持每个节点每毫秒(同一机器，同一时间截)产生4096个ID序号<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * 加起来刚好64位，为一个Long型。<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * SnowFlake的优点是，整体上按照时间自增排序，并且整个分布式系统内不会产生ID碰撞(由数据中心ID和机器ID作区分)，并且效率较高，经测试，SnowFlake每秒能够产生26万ID左右。
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SnowflakeDistributeId</span> <span class="token punctuation">{</span>


    <span class="token comment">// ==============================Fields===========================================</span>
    <span class="token doc-comment comment">/**
     * 开始时间截 (2015-01-01)
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> twepoch <span class="token operator">=</span> <span class="token number">1420041600000L</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 机器id所占的位数
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> workerIdBits <span class="token operator">=</span> <span class="token number">5L</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 数据标识id所占的位数
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> datacenterIdBits <span class="token operator">=</span> <span class="token number">5L</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 支持的最大机器id，结果是31 (这个移位算法可以很快的计算出几位二进制数所能表示的最大十进制数)
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> maxWorkerId <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">^</span> <span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">&lt;&lt;</span> workerIdBits<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 支持的最大数据标识id，结果是31
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> maxDatacenterId <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">^</span> <span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">&lt;&lt;</span> datacenterIdBits<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 序列在id中占的位数
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> sequenceBits <span class="token operator">=</span> <span class="token number">12L</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 机器ID向左移12位
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> workerIdShift <span class="token operator">=</span> sequenceBits<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 数据标识id向左移17位(12+5)
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> datacenterIdShift <span class="token operator">=</span> sequenceBits <span class="token operator">+</span> workerIdBits<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 时间截向左移22位(5+5+12)
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> timestampLeftShift <span class="token operator">=</span> sequenceBits <span class="token operator">+</span> workerIdBits <span class="token operator">+</span> datacenterIdBits<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 生成序列的掩码，这里为4095 (0b111111111111=0xfff=4095)
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> sequenceMask <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">^</span> <span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">&lt;&lt;</span> sequenceBits<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 工作机器ID(0~31)
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> workerId<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 数据中心ID(0~31)
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> datacenterId<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 毫秒内序列(0~4095)
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> sequence <span class="token operator">=</span> <span class="token number">0L</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 上次生成ID的时间截
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> lastTimestamp <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1L</span><span class="token punctuation">;</span>

    <span class="token comment">//==============================Constructors=====================================</span>

    <span class="token doc-comment comment">/**
     * 构造函数
     *
     * <span class="token keyword">@param</span> <span class="token parameter">workerId</span>     工作ID (0~31)
     * <span class="token keyword">@param</span> <span class="token parameter">datacenterId</span> 数据中心ID (0~31)
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">SnowflakeDistributeId</span><span class="token punctuation">(</span><span class="token keyword">long</span> workerId<span class="token punctuation">,</span> <span class="token keyword">long</span> datacenterId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>workerId <span class="token operator">&gt;</span> maxWorkerId <span class="token operator">||</span> workerId <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;worker Id can&#39;t be greater than %d or less than 0&quot;</span><span class="token punctuation">,</span> maxWorkerId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>datacenterId <span class="token operator">&gt;</span> maxDatacenterId <span class="token operator">||</span> datacenterId <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;datacenter Id can&#39;t be greater than %d or less than 0&quot;</span><span class="token punctuation">,</span> maxDatacenterId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>workerId <span class="token operator">=</span> workerId<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>datacenterId <span class="token operator">=</span> datacenterId<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ==============================Methods==========================================</span>

    <span class="token doc-comment comment">/**
     * 获得下一个ID (该方法是线程安全的)
     *
     * <span class="token keyword">@return</span> SnowflakeId
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">long</span> <span class="token function">nextId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">long</span> timestamp <span class="token operator">=</span> <span class="token function">timeGen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//如果当前时间小于上一次ID生成的时间戳，说明系统时钟回退过这个时候应当抛出异常</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>timestamp <span class="token operator">&lt;</span> lastTimestamp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>
                    <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;Clock moved backwards.  Refusing to generate id for %d milliseconds&quot;</span><span class="token punctuation">,</span> lastTimestamp <span class="token operator">-</span> timestamp<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//如果是同一时间生成的，则进行毫秒内序列</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>lastTimestamp <span class="token operator">==</span> timestamp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            sequence <span class="token operator">=</span> <span class="token punctuation">(</span>sequence <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> sequenceMask<span class="token punctuation">;</span>
            <span class="token comment">//毫秒内序列溢出</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>sequence <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//阻塞到下一个毫秒,获得新的时间戳</span>
                timestamp <span class="token operator">=</span> <span class="token function">tilNextMillis</span><span class="token punctuation">(</span>lastTimestamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//时间戳改变，毫秒内序列重置</span>
        <span class="token keyword">else</span> <span class="token punctuation">{</span>
            sequence <span class="token operator">=</span> <span class="token number">0L</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//上次生成ID的时间截</span>
        lastTimestamp <span class="token operator">=</span> timestamp<span class="token punctuation">;</span>

        <span class="token comment">//移位并通过或运算拼到一起组成64位的ID</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>timestamp <span class="token operator">-</span> twepoch<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> timestampLeftShift<span class="token punctuation">)</span> <span class="token comment">//</span>
                <span class="token operator">|</span> <span class="token punctuation">(</span>datacenterId <span class="token operator">&lt;&lt;</span> datacenterIdShift<span class="token punctuation">)</span> <span class="token comment">//</span>
                <span class="token operator">|</span> <span class="token punctuation">(</span>workerId <span class="token operator">&lt;&lt;</span> workerIdShift<span class="token punctuation">)</span> <span class="token comment">//</span>
                <span class="token operator">|</span> sequence<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 阻塞到下一个毫秒，直到获得新的时间戳
     *
     * <span class="token keyword">@param</span> <span class="token parameter">lastTimestamp</span> 上次生成ID的时间截
     * <span class="token keyword">@return</span> 当前时间戳
     */</span>
    <span class="token keyword">protected</span> <span class="token keyword">long</span> <span class="token function">tilNextMillis</span><span class="token punctuation">(</span><span class="token keyword">long</span> lastTimestamp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">long</span> timestamp <span class="token operator">=</span> <span class="token function">timeGen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>timestamp <span class="token operator">&lt;=</span> lastTimestamp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            timestamp <span class="token operator">=</span> <span class="token function">timeGen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> timestamp<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 返回以毫秒为单位的当前时间
     *
     * <span class="token keyword">@return</span> 当前时间(毫秒)
     */</span>
    <span class="token keyword">protected</span> <span class="token keyword">long</span> <span class="token function">timeGen</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试的代码如下</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">SnowflakeDistributeId</span> idWorker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SnowflakeDistributeId</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">long</span> id <span class="token operator">=</span> idWorker<span class="token punctuation">.</span><span class="token function">nextId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//      System.out.println(Long.toBinaryString(id));</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>雪花算法提供了一个很好的设计思想，雪花算法生成的ID是趋势递增，不依赖数据库等第三方系统，以服务的方式部署，稳定性更高，生成ID的性能也是非常高的，而且可以根据自身业务特性分配bit位，非常灵活</strong>。</p><p>但是雪花算法强<strong>依赖机器时钟</strong>，如果机器上时钟回拨，会导致发号重复或者服务会处于不可用状态。如果恰巧回退前生成过一些ID，而时间回退后，生成的ID就有可能重复。官方对于此并没有给出解决方案，而是简单的抛错处理，这样会造成在时间被追回之前的这段时间服务不可用。</p><p>很多其他类雪花算法也是在此思想上的设计然后改进规避它的缺陷，后面介绍的<code>百度 UidGenerator</code> 和 <code>美团分布式ID生成系统 Leaf</code> 中snowflake模式都是在 snowflake 的基础上演进出来的。</p><h2 id="其它相关算法" tabindex="-1"><a class="header-anchor" href="#其它相关算法" aria-hidden="true">#</a> 其它相关算法</h2><p>在如下文章中已经包含了所有主流的全局唯一ID实现方案：</p><ul><li><a href="">分布式系统 - 全局唯一ID实现方案</a></li></ul><p>这里给出相关的链接：</p><ul><li><a href="">为什么需要全局唯一ID</a></li><li><a href="">UUID</a></li><li><a href="">数据库生成</a></li><li><a href="">使用redis实现</a></li><li><a href="">雪花算法-Snowflake</a></li><li>百度-UidGenerator <ul><li><a href="">DefaultUidGenerator 实现</a></li><li><a href="">CachedUidGenerator 实现</a></li></ul></li><li>美团Leaf <ul><li><a href="">Leaf-segment 数据库方案</a></li><li><a href="">Leaf-snowflake方案</a></li></ul></li><li><a href="">Mist 薄雾算法</a></li></ul>`,19),o=[p];function l(i,c){return s(),a("div",null,o)}const d=n(t,[["render",l],["__file","alg-domain-id-snowflake.html.vue"]]);export{d as default};
