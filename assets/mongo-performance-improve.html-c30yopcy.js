import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,f as p}from"./app-5g2Grfu7.js";const e={},t=p(`<h1 id="mongo进阶-性能-查询聚合优化" tabindex="-1"><a class="header-anchor" href="#mongo进阶-性能-查询聚合优化" aria-hidden="true">#</a> Mongo进阶 - 性能：查询聚合优化</h1><blockquote><p>在MongoDB中通过查询聚合语句分析定位慢查询/聚合分析。</p></blockquote><h2 id="问题描述" tabindex="-1"><a class="header-anchor" href="#问题描述" aria-hidden="true">#</a> 问题描述</h2><p>执行BI服务的接口， 发现返回一天的记录需要10s左右，这明显是有问题: <img src="https://www.pdai.tech/images/mongo/osa_app_event.png" alt="img" loading="lazy"></p><h2 id="问题分析" tabindex="-1"><a class="header-anchor" href="#问题分析" aria-hidden="true">#</a> 问题分析</h2><h3 id="定位慢查询" tabindex="-1"><a class="header-anchor" href="#定位慢查询" aria-hidden="true">#</a> 定位慢查询</h3><p>为了定位查询，需要查看当前mongo profile的级别, profile的级别有0|1|2，分别代表意思: 0代表关闭，1代表记录慢命令，2代表全部</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>db.getProfilingLevel()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>显示为0， 表示默认下是没有记录的。</p><p>设置profile级别，设置为记录慢查询模式, 所有超过1000ms的查询语句都会被记录下来</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>db.setProfilingLevel(<span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1000</span>)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>再次执行BI一天的查询接口，查看Profile, 发现确实记录了这条慢查询: <img src="https://www.pdai.tech/images/mongo/osa_app_event2.png" alt="img" loading="lazy"></p><h3 id="分析慢查询语句" tabindex="-1"><a class="header-anchor" href="#分析慢查询语句" aria-hidden="true">#</a> 分析慢查询语句</h3><p>通过view document查看慢查询的profile记录</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;op&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;command&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;ns&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;standalone.application_alert&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;command&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;aggregate&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;application_alert&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;pipeline&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
            <span class="token punctuation">{</span>
                <span class="token property">&quot;$match&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">&quot;factoryId&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;10001&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;$and&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
                        <span class="token punctuation">{</span>
                            <span class="token property">&quot;insertTime&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                                <span class="token property">&quot;$gte&quot;</span> <span class="token operator">:</span> ISODate(<span class="token string">&quot;2018-03-25T16:00:00.000Z&quot;</span>)<span class="token punctuation">,</span>
                                <span class="token property">&quot;$lte&quot;</span> <span class="token operator">:</span> ISODate(<span class="token string">&quot;2018-03-26T09:04:20.288Z&quot;</span>)
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">]</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> 
            <span class="token punctuation">{</span>
                <span class="token property">&quot;$project&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">&quot;eventType&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;date&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token property">&quot;$concat&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
                            <span class="token punctuation">{</span>
                                <span class="token property">&quot;$substr&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
                                    <span class="token punctuation">{</span>
                                        <span class="token property">&quot;$year&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
                                            <span class="token string">&quot;$insertTime&quot;</span>
                                        <span class="token punctuation">]</span>
                                    <span class="token punctuation">}</span><span class="token punctuation">,</span> 
                                    <span class="token number">0</span><span class="token punctuation">,</span> 
                                    <span class="token number">4</span>
                                <span class="token punctuation">]</span>
                            <span class="token punctuation">}</span><span class="token punctuation">,</span> 
                            <span class="token string">&quot;-&quot;</span><span class="token punctuation">,</span> 
                            <span class="token punctuation">{</span>
                                <span class="token property">&quot;$substr&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
                                    <span class="token punctuation">{</span>
                                        <span class="token property">&quot;$month&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
                                            <span class="token string">&quot;$insertTime&quot;</span>
                                        <span class="token punctuation">]</span>
                                    <span class="token punctuation">}</span><span class="token punctuation">,</span> 
                                    <span class="token number">0</span><span class="token punctuation">,</span> 
                                    <span class="token number">2</span>
                                <span class="token punctuation">]</span>
                            <span class="token punctuation">}</span><span class="token punctuation">,</span> 
                            <span class="token string">&quot;-&quot;</span><span class="token punctuation">,</span> 
                            <span class="token punctuation">{</span>
                                <span class="token property">&quot;$substr&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
                                    <span class="token punctuation">{</span>
                                        <span class="token property">&quot;$dayOfMonth&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
                                            <span class="token string">&quot;$insertTime&quot;</span>
                                        <span class="token punctuation">]</span>
                                    <span class="token punctuation">}</span><span class="token punctuation">,</span> 
                                    <span class="token number">0</span><span class="token punctuation">,</span> 
                                    <span class="token number">2</span>
                                <span class="token punctuation">]</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> 
            <span class="token punctuation">{</span>
                <span class="token property">&quot;$group&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token property">&quot;date&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;$date&quot;</span><span class="token punctuation">,</span>
                        <span class="token property">&quot;eventType&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;$eventType&quot;</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;count&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token property">&quot;$sum&quot;</span> <span class="token operator">:</span> <span class="token number">1</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;keysExamined&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;docsExamined&quot;</span> <span class="token operator">:</span> <span class="token number">2636052</span><span class="token punctuation">,</span>
    <span class="token property">&quot;numYield&quot;</span> <span class="token operator">:</span> <span class="token number">20651</span><span class="token punctuation">,</span>
    <span class="token property">&quot;locks&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;Global&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;acquireCount&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;r&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">41310</span>)
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Database&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;acquireCount&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;r&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">20655</span>)
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Collection&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;acquireCount&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;r&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">20654</span>)
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;nreturned&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;responseLength&quot;</span> <span class="token operator">:</span> <span class="token number">196</span><span class="token punctuation">,</span>
    <span class="token property">&quot;protocol&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;op_query&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;millis&quot;</span> <span class="token operator">:</span> <span class="token number">9484</span><span class="token punctuation">,</span>
    <span class="token property">&quot;planSummary&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;COLLSCAN&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;ts&quot;</span> <span class="token operator">:</span> ISODate(<span class="token string">&quot;2018-03-26T08:44:51.322Z&quot;</span>)<span class="token punctuation">,</span>
    <span class="token property">&quot;client&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;10.11.0.118&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;allUsers&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
        <span class="token punctuation">{</span>
            <span class="token property">&quot;user&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;standalone&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;db&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;standalone&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;user&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;standalone@standalone&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面profile中可以看到我们执行的BI　查询接口对应到Mongo执行了一个pipleline:</p><ul><li>第一步: match 工厂ID是10001的记录，时间段是当前一天</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>     <span class="token punctuation">{</span>
            <span class="token property">&quot;$match&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;factoryId&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;10001&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;$and&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
                    <span class="token punctuation">{</span>
                        <span class="token property">&quot;insertTime&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                            <span class="token property">&quot;$gte&quot;</span> <span class="token operator">:</span> ISODate(<span class="token string">&quot;2018-03-25T16:00:00.000Z&quot;</span>)<span class="token punctuation">,</span>
                            <span class="token property">&quot;$lte&quot;</span> <span class="token operator">:</span> ISODate(<span class="token string">&quot;2018-03-26T09:04:20.288Z&quot;</span>)
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>第二步: 字段映射，project:</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>          <span class="token punctuation">{</span>
                <span class="token property">&quot;$project&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">&quot;eventType&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;date&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token property">&quot;$concat&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
                            <span class="token punctuation">{</span>
                                <span class="token property">&quot;$substr&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
                                    <span class="token punctuation">{</span>
                                        <span class="token property">&quot;$year&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
                                            <span class="token string">&quot;$insertTime&quot;</span>
                                        <span class="token punctuation">]</span>
                                    <span class="token punctuation">}</span><span class="token punctuation">,</span> 
                                    <span class="token number">0</span><span class="token punctuation">,</span> 
                                    <span class="token number">4</span>
                                <span class="token punctuation">]</span>
                            <span class="token punctuation">}</span><span class="token punctuation">,</span> 
                            <span class="token string">&quot;-&quot;</span><span class="token punctuation">,</span> 
                            <span class="token punctuation">{</span>
                                <span class="token property">&quot;$substr&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
                                    <span class="token punctuation">{</span>
                                        <span class="token property">&quot;$month&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
                                            <span class="token string">&quot;$insertTime&quot;</span>
                                        <span class="token punctuation">]</span>
                                    <span class="token punctuation">}</span><span class="token punctuation">,</span> 
                                    <span class="token number">0</span><span class="token punctuation">,</span> 
                                    <span class="token number">2</span>
                                <span class="token punctuation">]</span>
                            <span class="token punctuation">}</span><span class="token punctuation">,</span> 
                            <span class="token string">&quot;-&quot;</span><span class="token punctuation">,</span> 
                            <span class="token punctuation">{</span>
                                <span class="token property">&quot;$substr&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
                                    <span class="token punctuation">{</span>
                                        <span class="token property">&quot;$dayOfMonth&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> 
                                            <span class="token string">&quot;$insertTime&quot;</span>
                                        <span class="token punctuation">]</span>
                                    <span class="token punctuation">}</span><span class="token punctuation">,</span> 
                                    <span class="token number">0</span><span class="token punctuation">,</span> 
                                    <span class="token number">2</span>
                                <span class="token punctuation">]</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到除了对event_type做了简单的project外，还对insertTime字段做了拼接，拼接为yyyy-MM-dd格式，并且project为date字段。</p><ul><li>第三步: group操作</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>            <span class="token punctuation">{</span>
                <span class="token property">&quot;$group&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token property">&quot;date&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;$date&quot;</span><span class="token punctuation">,</span>
                        <span class="token property">&quot;eventType&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;$eventType&quot;</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;count&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token property">&quot;$sum&quot;</span> <span class="token operator">:</span> <span class="token number">1</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对#2中的date和event_type进行group，统计不同日期和事件类型所对应的事件数量(count).</p><p>对应的其它字段:</p><ul><li>Mills: 花了9484毫秒返回查询结果</li><li>ts: 命令执行时间</li><li>info: 命令的内容</li><li>query: 代表查询</li><li>ns: standalone.application_alert 代表查询的库与集合</li><li>nreturned: 返回记录数及用时</li><li>reslen: 返回的结果集大小，byte数</li><li>nscanned: 扫描记录数量</li></ul><p>如果发现9484毫秒时间比较长，那么就需要作优化。</p><p>通常来说，经验上可以对这些指标做参考:</p><ul><li>比如nscanned数很大，或者接近记录总数，那么可能没有用到索引查询。</li><li>reslen很大，有可能返回没必要的字段。</li><li>nreturned很大，那么有可能查询的时候没有加限制。</li></ul><h3 id="查看db-server-collection的状态" tabindex="-1"><a class="header-anchor" href="#查看db-server-collection的状态" aria-hidden="true">#</a> 查看DB/Server/Collection的状态</h3><ul><li>DB status</li></ul><figure><img src="https://www.pdai.tech/images/mongo/osa_app_event3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li>查看Server状态</li></ul><blockquote><p>由于server 状态指标众多，我这边只列出来一部分。</p></blockquote><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;host&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;OPASTORMON&quot;</span><span class="token punctuation">,</span> #主机名 
    <span class="token property">&quot;version&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;3.4.1&quot;</span><span class="token punctuation">,</span> #版本号
    <span class="token property">&quot;process&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;mongod&quot;</span><span class="token punctuation">,</span> #进程名  
    <span class="token property">&quot;pid&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">1462</span>)<span class="token punctuation">,</span> #进程ID  
    <span class="token property">&quot;uptime&quot;</span> <span class="token operator">:</span> <span class="token number">10111875.0</span><span class="token punctuation">,</span> #运行时间 
    <span class="token property">&quot;uptimeMillis&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">10111875602</span>)<span class="token punctuation">,</span> #运行时间 
    <span class="token property">&quot;uptimeEstimate&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">10111875</span>)<span class="token punctuation">,</span> #运行时间 
    <span class="token property">&quot;localTime&quot;</span> <span class="token operator">:</span> ISODate(<span class="token string">&quot;2018-03-26T09:14:13.679Z&quot;</span>)<span class="token punctuation">,</span> #当前时间 
    <span class="token property">&quot;asserts&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;regular&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;warning&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;msg&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;user&quot;</span> <span class="token operator">:</span> <span class="token number">26549</span><span class="token punctuation">,</span>
        <span class="token property">&quot;rollovers&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;connections&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;current&quot;</span> <span class="token operator">:</span> <span class="token number">104</span><span class="token punctuation">,</span> #当前链接数  
        <span class="token property">&quot;available&quot;</span> <span class="token operator">:</span> <span class="token number">715</span><span class="token punctuation">,</span> #可用链接数
        <span class="token property">&quot;totalCreated&quot;</span> <span class="token operator">:</span> <span class="token number">11275</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;extra_info&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;note&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;fields vary by platform&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;page_faults&quot;</span> <span class="token operator">:</span> <span class="token number">49</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;globalLock&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;totalTime&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">10111875549000</span>)<span class="token punctuation">,</span> #总运行时间(ns)
        <span class="token property">&quot;currentQueue&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> #当前需要执行的队列
            <span class="token property">&quot;readers&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> #读队列
            <span class="token property">&quot;writers&quot;</span> <span class="token operator">:</span> <span class="token number">0</span> #写队列
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;activeClients&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">110</span><span class="token punctuation">,</span> #当前客户端执行的链接数  
            <span class="token property">&quot;readers&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> #读链接数  
            <span class="token property">&quot;writers&quot;</span> <span class="token operator">:</span> <span class="token number">0</span> #写链接数 
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;locks&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;Global&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;acquireCount&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;r&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">8457368136</span>)<span class="token punctuation">,</span>
                <span class="token property">&quot;w&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">1025512487</span>)<span class="token punctuation">,</span>
                <span class="token property">&quot;W&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">7</span>)
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;acquireWaitCount&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;r&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">2</span>)
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;timeAcquiringMicros&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;r&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">94731</span>)
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Database&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;acquireCount&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;r&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">3715927334</span>)<span class="token punctuation">,</span>
                <span class="token property">&quot;w&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">1025512452</span>)<span class="token punctuation">,</span>
                <span class="token property">&quot;R&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">194</span>)<span class="token punctuation">,</span>
                <span class="token property">&quot;W&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">69</span>)
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;acquireWaitCount&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;r&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">13</span>)<span class="token punctuation">,</span>
                <span class="token property">&quot;w&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">5</span>)<span class="token punctuation">,</span>
                <span class="token property">&quot;R&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">6</span>)<span class="token punctuation">,</span>
                <span class="token property">&quot;W&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">3</span>)
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;timeAcquiringMicros&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;r&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">530972</span>)<span class="token punctuation">,</span>
                <span class="token property">&quot;w&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">426173</span>)<span class="token punctuation">,</span>
                <span class="token property">&quot;R&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">3207</span>)<span class="token punctuation">,</span>
                <span class="token property">&quot;W&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">1321</span>)
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Collection&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;acquireCount&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;r&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">3715046899</span>)<span class="token punctuation">,</span>
                <span class="token property">&quot;w&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">1025512453</span>)
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Metadata&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;acquireCount&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;w&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">1</span>)<span class="token punctuation">,</span>
                <span class="token property">&quot;W&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">3</span>)
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;network&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;bytesIn&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">373939915493</span>)<span class="token punctuation">,</span> #输入数据(byte)
        <span class="token property">&quot;bytesOut&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">961227224728</span>)<span class="token punctuation">,</span> #输出数据(byte)
        <span class="token property">&quot;physicalBytesIn&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">373939915493</span>)<span class="token punctuation">,</span>#物理输入数据(byte)
        <span class="token property">&quot;physicalBytesOut&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">961054421482</span>)<span class="token punctuation">,</span>#物理输入数据(byte)
        <span class="token property">&quot;numRequests&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">3142377739</span>) #请求数  
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;opLatencies&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;reads&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;latency&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">3270742192035</span>)<span class="token punctuation">,</span>
            <span class="token property">&quot;ops&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">540111914</span>)
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;writes&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;latency&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">261946981235</span>)<span class="token punctuation">,</span>
            <span class="token property">&quot;ops&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">1024301418</span>)
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;commands&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;latency&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">458086641</span>)<span class="token punctuation">,</span>
            <span class="token property">&quot;ops&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">6776702</span>)
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;opcounters&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;insert&quot;</span> <span class="token operator">:</span> <span class="token number">6846448</span><span class="token punctuation">,</span> #插入操作数  
        <span class="token property">&quot;query&quot;</span> <span class="token operator">:</span> <span class="token number">248443106</span><span class="token punctuation">,</span> #查询操作数
        <span class="token property">&quot;update&quot;</span> <span class="token operator">:</span> <span class="token number">1018594976</span><span class="token punctuation">,</span> #更新操作数  
        <span class="token property">&quot;delete&quot;</span> <span class="token operator">:</span> <span class="token number">1830</span><span class="token punctuation">,</span> #删除操作数
        <span class="token property">&quot;getmore&quot;</span> <span class="token operator">:</span> <span class="token number">162213</span><span class="token punctuation">,</span> #获取更多的操作数
        <span class="token property">&quot;command&quot;</span> <span class="token operator">:</span> <span class="token number">298306448</span> #其他命令操作数
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;opcountersRepl&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;insert&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;query&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;update&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;delete&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;getmore&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;command&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;storageEngine&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;wiredTiger&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;supportsCommittedReads&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;readOnly&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;persistent&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;tcmalloc&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;generic&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;current_allocated_bytes&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">3819325752</span>)<span class="token punctuation">,</span>
            <span class="token property">&quot;heap_size&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">6959509504</span>)
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;tcmalloc&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;pageheap_free_bytes&quot;</span> <span class="token operator">:</span> <span class="token number">199692288</span><span class="token punctuation">,</span>
            <span class="token property">&quot;pageheap_unmapped_bytes&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">2738442240</span>)<span class="token punctuation">,</span>
            <span class="token property">&quot;max_total_thread_cache_bytes&quot;</span> <span class="token operator">:</span> NumberLong(<span class="token number">1073741824</span>)<span class="token punctuation">,</span>
            <span class="token property">&quot;current_total_thread_cache_bytes&quot;</span> <span class="token operator">:</span> <span class="token number">35895120</span><span class="token punctuation">,</span>
            <span class="token property">&quot;total_free_bytes&quot;</span> <span class="token operator">:</span> <span class="token number">202049224</span><span class="token punctuation">,</span>
            <span class="token property">&quot;central_cache_free_bytes&quot;</span> <span class="token operator">:</span> <span class="token number">165650360</span><span class="token punctuation">,</span>
            <span class="token property">&quot;transfer_cache_free_bytes&quot;</span> <span class="token operator">:</span> <span class="token number">503744</span><span class="token punctuation">,</span>
            <span class="token property">&quot;thread_cache_free_bytes&quot;</span> <span class="token operator">:</span> <span class="token number">35895120</span><span class="token punctuation">,</span>
            <span class="token property">&quot;aggressive_memory_decommit&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;formattedString&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;------------------------------------------------\\nMALLOC:     3819325752 ( 3642.4 MiB) Bytes in use by application\\nMALLOC: +    199692288 (  190.4 MiB) Bytes in page heap freelist\\nMALLOC: +    165650360 (  158.0 MiB) Bytes in central cache freelist\\nMALLOC: +       503744 (    0.5 MiB) Bytes in transfer cache freelist\\nMALLOC: +     35895120 (   34.2 MiB) Bytes in thread cache freelists\\nMALLOC: +     40001728 (   38.1 MiB) Bytes in malloc metadata\\nMALLOC:   ------------\\nMALLOC: =   4261068992 ( 4063.7 MiB) Actual memory used (physical + swap)\\nMALLOC: +   2738442240 ( 2611.6 MiB) Bytes released to OS (aka unmapped)\\nMALLOC:   ------------\\nMALLOC: =   6999511232 ( 6675.3 MiB) Virtual address space used\\nMALLOC:\\nMALLOC:         521339              Spans in use\\nMALLOC:            115              Thread heaps in use\\nMALLOC:           4096              Tcmalloc page size\\n------------------------------------------------\\nCall ReleaseFreeMemory() to release freelist memory to the OS (via madvise()).\\nBytes released to the OS take up virtual address space but no physical memory.\\n&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;mem&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;bits&quot;</span> <span class="token operator">:</span> <span class="token number">64</span><span class="token punctuation">,</span> #<span class="token number">64</span>位系统  
        <span class="token property">&quot;resident&quot;</span> <span class="token operator">:</span> <span class="token number">4103</span><span class="token punctuation">,</span> #占有物理内存数  
        <span class="token property">&quot;virtual&quot;</span> <span class="token operator">:</span> <span class="token number">7045</span><span class="token punctuation">,</span> #占有虚拟内存  
        <span class="token property">&quot;supported&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> #是否支持扩展内存  
        <span class="token property">&quot;mapped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;mappedWithJournal&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;ok&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>查看application_alert这个collection的状态</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;ns&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;standalone.application_alert&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;size&quot;</span> <span class="token operator">:</span> <span class="token number">783852548</span><span class="token punctuation">,</span>
    <span class="token property">&quot;count&quot;</span> <span class="token operator">:</span> <span class="token number">2638262</span><span class="token punctuation">,</span>
    <span class="token property">&quot;avgObjSize&quot;</span> <span class="token operator">:</span> <span class="token number">297</span><span class="token punctuation">,</span>
    <span class="token property">&quot;storageSize&quot;</span> <span class="token operator">:</span> <span class="token number">189296640</span><span class="token punctuation">,</span>
    <span class="token property">&quot;capped&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">&quot;wiredTiger&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;metadata&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;formatVersion&quot;</span> <span class="token operator">:</span> <span class="token number">1</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;creationString&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;allocation_size=4KB,app_metadata=(formatVersion=1),block_allocation=best,block_compressor=snappy,cache_resident=false,checksum=on,colgroups=,collator=,columns=,dictionary=0,encryption=(keyid=,name=),exclusive=false,extractor=,format=btree,huffman_key=,huffman_value=,ignore_in_memory_cache_size=false,immutable=false,internal_item_max=0,internal_key_max=0,internal_key_truncate=true,internal_page_max=4KB,key_format=q,key_gap=10,leaf_item_max=0,leaf_key_max=0,leaf_page_max=32KB,leaf_value_max=64MB,log=(enabled=true),lsm=(auto_throttle=true,bloom=true,bloom_bit_count=16,bloom_config=,bloom_hash_count=8,bloom_oldest=false,chunk_count_limit=0,chunk_max=5GB,chunk_size=10MB,merge_max=15,merge_min=0),memory_page_max=10m,os_cache_dirty_max=0,os_cache_max=0,prefix_compression=false,prefix_compression_min=4,source=,split_deepen_min_child=0,split_deepen_per_child=0,split_pct=90,type=file,value_format=u&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;file&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;uri&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;statistics:table:collection-4-6040851502998278747&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;LSM&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;bloom filter false positives&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;bloom filter hits&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;bloom filter misses&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;bloom filter pages evicted from cache&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;bloom filter pages read into cache&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;bloom filters in the LSM tree&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;chunks in the LSM tree&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;highest merge generation in the LSM tree&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;queries that could have benefited from a Bloom filter that did not exist&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;sleep for LSM checkpoint throttle&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;sleep for LSM merge throttle&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;total size of bloom filters&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;block-manager&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;allocations requiring file extension&quot;</span> <span class="token operator">:</span> <span class="token number">31543</span><span class="token punctuation">,</span>
            <span class="token property">&quot;blocks allocated&quot;</span> <span class="token operator">:</span> <span class="token number">346110</span><span class="token punctuation">,</span>
            <span class="token property">&quot;blocks freed&quot;</span> <span class="token operator">:</span> <span class="token number">124238</span><span class="token punctuation">,</span>
            <span class="token property">&quot;checkpoint size&quot;</span> <span class="token operator">:</span> <span class="token number">189259776</span><span class="token punctuation">,</span>
            <span class="token property">&quot;file allocation unit size&quot;</span> <span class="token operator">:</span> <span class="token number">4096</span><span class="token punctuation">,</span>
            <span class="token property">&quot;file bytes available for reuse&quot;</span> <span class="token operator">:</span> <span class="token number">20480</span><span class="token punctuation">,</span>
            <span class="token property">&quot;file magic number&quot;</span> <span class="token operator">:</span> <span class="token number">120897</span><span class="token punctuation">,</span>
            <span class="token property">&quot;file major version number&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token property">&quot;file size in bytes&quot;</span> <span class="token operator">:</span> <span class="token number">189296640</span><span class="token punctuation">,</span>
            <span class="token property">&quot;minor version number&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;btree&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;btree checkpoint generation&quot;</span> <span class="token operator">:</span> <span class="token number">165242</span><span class="token punctuation">,</span>
            <span class="token property">&quot;column-store fixed-size leaf pages&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;column-store internal pages&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;column-store variable-size RLE encoded values&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;column-store variable-size deleted values&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;column-store variable-size leaf pages&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;fixed-record size&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;maximum internal page key size&quot;</span> <span class="token operator">:</span> <span class="token number">368</span><span class="token punctuation">,</span>
            <span class="token property">&quot;maximum internal page size&quot;</span> <span class="token operator">:</span> <span class="token number">4096</span><span class="token punctuation">,</span>
            <span class="token property">&quot;maximum leaf page key size&quot;</span> <span class="token operator">:</span> <span class="token number">2867</span><span class="token punctuation">,</span>
            <span class="token property">&quot;maximum leaf page size&quot;</span> <span class="token operator">:</span> <span class="token number">32768</span><span class="token punctuation">,</span>
            <span class="token property">&quot;maximum leaf page value size&quot;</span> <span class="token operator">:</span> <span class="token number">67108864</span><span class="token punctuation">,</span>
            <span class="token property">&quot;maximum tree depth&quot;</span> <span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
            <span class="token property">&quot;number of key/value pairs&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;overflow pages&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;pages rewritten by compaction&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;row-store internal pages&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;row-store leaf pages&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;cache&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;bytes currently in the cache&quot;</span> <span class="token operator">:</span> <span class="token number">1014702364</span><span class="token punctuation">,</span>
            <span class="token property">&quot;bytes read into cache&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;bytes written from cache&quot;</span> <span class="token operator">:</span> <span class="token number">1888143292.0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;checkpoint blocked page eviction&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;data source pages selected for eviction unable to be evicted&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;hazard pointer blocked page eviction&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;in-memory page passed criteria to be split&quot;</span> <span class="token operator">:</span> <span class="token number">224</span><span class="token punctuation">,</span>
            <span class="token property">&quot;in-memory page splits&quot;</span> <span class="token operator">:</span> <span class="token number">112</span><span class="token punctuation">,</span>
            <span class="token property">&quot;internal pages evicted&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;internal pages split during eviction&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;leaf pages split during eviction&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;modified pages evicted&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
            <span class="token property">&quot;overflow pages read into cache&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;overflow values cached in memory&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;page split during eviction deepened the tree&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;page written requiring lookaside records&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;pages read into cache&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;pages read into cache requiring lookaside entries&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;pages requested from the cache&quot;</span> <span class="token operator">:</span> <span class="token number">49191856</span><span class="token punctuation">,</span>
            <span class="token property">&quot;pages written from cache&quot;</span> <span class="token operator">:</span> <span class="token number">217176</span><span class="token punctuation">,</span>
            <span class="token property">&quot;pages written requiring in-memory restoration&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;unmodified pages evicted&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;cache_walk&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;Average difference between current eviction generation when the page was last considered&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Average on-disk page image size seen&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Clean pages currently in cache&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Current eviction generation&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Dirty pages currently in cache&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Entries in the root page&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Internal pages currently in cache&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Leaf pages currently in cache&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Maximum difference between current eviction generation when the page was last considered&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Maximum page size seen&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Minimum on-disk page image size seen&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;On-disk page image sizes smaller than a single allocation unit&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Pages created in memory and never written&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Pages currently queued for eviction&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Pages that could not be queued for eviction&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Refs skipped during cache traversal&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Size of the root page&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Total number of pages currently in cache&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;compression&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;compressed pages read&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;compressed pages written&quot;</span> <span class="token operator">:</span> <span class="token number">83604</span><span class="token punctuation">,</span>
            <span class="token property">&quot;page written failed to compress&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;page written was too small to compress&quot;</span> <span class="token operator">:</span> <span class="token number">133572</span><span class="token punctuation">,</span>
            <span class="token property">&quot;raw compression call failed, additional data available&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;raw compression call failed, no additional data available&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;raw compression call succeeded&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;cursor&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;bulk-loaded cursor-insert calls&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;create calls&quot;</span> <span class="token operator">:</span> <span class="token number">78758</span><span class="token punctuation">,</span>
            <span class="token property">&quot;cursor-insert key and value bytes inserted&quot;</span> <span class="token operator">:</span> <span class="token number">795578636</span><span class="token punctuation">,</span>
            <span class="token property">&quot;cursor-remove key bytes removed&quot;</span> <span class="token operator">:</span> <span class="token number">8857</span><span class="token punctuation">,</span>
            <span class="token property">&quot;cursor-update value bytes updated&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;insert calls&quot;</span> <span class="token operator">:</span> <span class="token number">2642785</span><span class="token punctuation">,</span>
            <span class="token property">&quot;next calls&quot;</span> <span class="token operator">:</span> <span class="token number">5850718215.0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;prev calls&quot;</span> <span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
            <span class="token property">&quot;remove calls&quot;</span> <span class="token operator">:</span> <span class="token number">4460</span><span class="token punctuation">,</span>
            <span class="token property">&quot;reset calls&quot;</span> <span class="token operator">:</span> <span class="token number">48942545</span><span class="token punctuation">,</span>
            <span class="token property">&quot;restarted searches&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;search calls&quot;</span> <span class="token operator">:</span> <span class="token number">10229</span><span class="token punctuation">,</span>
            <span class="token property">&quot;search near calls&quot;</span> <span class="token operator">:</span> <span class="token number">46285468</span><span class="token punctuation">,</span>
            <span class="token property">&quot;truncate calls&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;update calls&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;reconciliation&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;dictionary matches&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;fast-path pages deleted&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;internal page key bytes discarded using suffix compression&quot;</span> <span class="token operator">:</span> <span class="token number">7946666</span><span class="token punctuation">,</span>
            <span class="token property">&quot;internal page multi-block writes&quot;</span> <span class="token operator">:</span> <span class="token number">60010</span><span class="token punctuation">,</span>
            <span class="token property">&quot;internal-page overflow keys&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;leaf page key bytes discarded using prefix compression&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;leaf page multi-block writes&quot;</span> <span class="token operator">:</span> <span class="token number">64250</span><span class="token punctuation">,</span>
            <span class="token property">&quot;leaf-page overflow keys&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;maximum blocks required for a page&quot;</span> <span class="token operator">:</span> <span class="token number">253</span><span class="token punctuation">,</span>
            <span class="token property">&quot;overflow values written&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;page checksum matches&quot;</span> <span class="token operator">:</span> <span class="token number">10496129</span><span class="token punctuation">,</span>
            <span class="token property">&quot;page reconciliation calls&quot;</span> <span class="token operator">:</span> <span class="token number">189077</span><span class="token punctuation">,</span>
            <span class="token property">&quot;page reconciliation calls for eviction&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token property">&quot;pages deleted&quot;</span> <span class="token operator">:</span> <span class="token number">7</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;session&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;object compaction&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;open cursor count&quot;</span> <span class="token operator">:</span> <span class="token number">35</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;transaction&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;update conflicts&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;nindexes&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;totalIndexSize&quot;</span> <span class="token operator">:</span> <span class="token number">24420352</span><span class="token punctuation">,</span>
    <span class="token property">&quot;indexSizes&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;_id_&quot;</span> <span class="token operator">:</span> <span class="token number">24420352</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;ok&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="性能优化" tabindex="-1"><a class="header-anchor" href="#性能优化" aria-hidden="true">#</a> 性能优化</h2><h3 id="性能优化-索引" tabindex="-1"><a class="header-anchor" href="#性能优化-索引" aria-hidden="true">#</a> 性能优化 - 索引</h3><p>通过上述的指标，需要优化的话，第一考虑的是查看是否对该collection创建了索引:</p><ul><li>查看是否有相关索引</li></ul><figure><img src="https://www.pdai.tech/images/mongo/osa_app_event4.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li>增加相关字段的搜索索引 发现只有对id的索引，所以接下来对application_alert创建event_type和factory_id，timeStamp字段的索引</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>db.application_alert.ensureIndex(<span class="token punctuation">{</span><span class="token property">&quot;insertTime&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token property">&quot;eventType&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span>);
db.application_alert.ensureIndex(<span class="token punctuation">{</span><span class="token property">&quot;insertTime&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span>);
db.application_alert.ensureIndex(<span class="token punctuation">{</span><span class="token property">&quot;eventType&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span>);
db.application_alert.ensureIndex(<span class="token punctuation">{</span><span class="token property">&quot;factoryId&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span>);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看增加index后查询一天的数据聚合需要424ms, 基本可以接受。</p><figure><img src="https://www.pdai.tech/images/mongo/osa_app_event5.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li>查询20天，看时间仍然需要20s</li></ul><figure><img src="https://www.pdai.tech/images/mongo/osa_app_event6.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li>通过增加索引小结 到这里我们基本可以看到添加查询index对BI接口的影响，索引的添加只是解决了针对索引字段查询的效率，但是并不能解决查询之后数据的聚合问题。对一天而言由于数据量的少，查询速度提升显著，但是对大量数据做聚合仍然不合适。</li></ul><p>我们通过增加索引解决了什么问题?</p><blockquote><p>在没有索引的前提下，找出100万条{eventType: &quot;abnormal&quot;}需要多少时间? 全表扫描COLLSCAN从700w条数据中找出600w条，跟从1亿条数据中找出600w条显然是两个概念。命中索引IXSCAN，这个差异就会小很多，几乎可以忽略。索引的添加只是解决了针对索引字段查询的效率，但是并不能解决查询之后数据的聚合问题。顺便应该提一下看效率是否有差异应该看执行计划，不要看执行时间，时间是不准确的。</p></blockquote><h3 id="性能优化-聚合大量数据" tabindex="-1"><a class="header-anchor" href="#性能优化-聚合大量数据" aria-hidden="true">#</a> 性能优化 - 聚合大量数据</h3><blockquote><p>那问题是，如何解决这种查询聚合大量数据的问题呢?</p></blockquote><p>首先要说明的一个问题是，对于OLAP型的操作，期望不应该太高。毕竟是对于大量数据的操作，光从IO就已经远超通常的OLTP操作，所以要求达到OLTP操作的速度和并发是不现实的，也是没有意义的。但并不是说一点优化空间也没有。</p><p>这样优化之后预计在可以提升一部分查询性能，但是并不能解决。原因开头说了，对OLAP就不能期望这么高。如果你真有这方面的需求，就应该从源头入手，考虑:</p><ul><li>每次info字段有更新或插入时就做好计数</li><li>每隔一段时间做一次完整的统计，缓存统计结果，查询的时候直接展现给用户</li></ul><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>小结如下:</p><ul><li><code>慢查询定位</code>: 通过Profile分析慢查询</li><li><code>对于查询优化</code>: 通过添加相应索引提升查询速度；</li><li><code>对于聚合大数据方案</code>: 首先要说明的一个问题是，对于OLAP型的操作，期望不应该太高。毕竟是对于大量数据的操作，光从IO就已经远超通常的OLTP操作，所以要求达到OLTP操作的速度和并发是不现实的，也是没有意义的。但并不是说一点优化空间也没有。</li></ul><p>这样优化之后预计在可以提升一部分查询性能，但是并不能解决。原因开头说了，对OLAP就不能期望这么高，应该从源头入手，考虑:</p><ul><li>每次eventType字段和insertTime有更新或插入时就做好计数</li><li>每隔一段时间做一次完整的统计，缓存统计结果，查询的时候直接展现给用户</li></ul>`,61),o=[t];function l(c,u){return s(),a("div",null,o)}const k=n(e,[["render",l],["__file","mongo-performance-improve.html.vue"]]);export{k as default};
