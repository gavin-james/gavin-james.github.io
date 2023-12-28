import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as p,o as e,c as o,a as s,b as n,d as c,f as i}from"./app-PDcd_-E9.js";const l={},u=i(`<h1 id="排序-基数排序-radix-sort" tabindex="-1"><a class="header-anchor" href="#排序-基数排序-radix-sort" aria-hidden="true">#</a> 排序 - 基数排序(Radix Sort)</h1><blockquote><p>基数排序(Radix Sort)是桶排序的扩展.</p></blockquote><h2 id="基数排序介绍" tabindex="-1"><a class="header-anchor" href="#基数排序介绍" aria-hidden="true">#</a> 基数排序介绍</h2><p>它的基本思想是: 将整数按位数切割成不同的数字，然后按每个位数分别比较。 具体做法是: 将所有待比较数值统一为同样的数位长度，数位较短的数前面补零。然后，从最低位开始，依次进行一次排序。这样从最低位排序一直到最高位排序完成以后, 数列就变成一个有序序列。</p><h2 id="基数排序实现" tabindex="-1"><a class="header-anchor" href="#基数排序实现" aria-hidden="true">#</a> 基数排序实现</h2><p>通过基数排序对数组{53, 3, 542, 748, 14, 214, 154, 63, 616}，它的示意图如下:</p><figure><img src="https://www.pdai.tech/images/alg/alg-sort-radix-1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在上图中，首先将所有待比较树脂统一为统一位数长度，接着从最低位开始，依次进行排序。</p><ol><li>按照个位数进行排序。</li><li>按照十位数进行排序。</li><li>按照百位数进行排序。 排序后，数列就变成了一个有序序列。</li></ol><p>下面简单介绍一下对数组{53, 3, 542, 748, 14, 214, 154, 63, 616}按个位数进行排序的流程。</p><ul><li>个位的数值范围是[0,10)。因此，参见桶数组buckets[]，将数组按照个位数值添加到桶中。</li></ul><figure><img src="https://www.pdai.tech/images/alg/alg-sort-radix-2.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li>接着是根据桶数组buckets[]来进行排序。假设将排序后的数组存在output[]中；找出output[]和buckets[]之间的联系就可以对数据进行排序了。</li></ul><figure><img src="https://www.pdai.tech/images/alg/alg-sort-radix-3.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="基数排序复杂度和稳定性" tabindex="-1"><a class="header-anchor" href="#基数排序复杂度和稳定性" aria-hidden="true">#</a> 基数排序复杂度和稳定性</h2><h3 id="基数排序复杂度" tabindex="-1"><a class="header-anchor" href="#基数排序复杂度" aria-hidden="true">#</a> 基数排序复杂度</h3><h3 id="基数排序稳定性" tabindex="-1"><a class="header-anchor" href="#基数排序稳定性" aria-hidden="true">#</a> 基数排序稳定性</h3><h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 基数排序: Java
 *
 * <span class="token keyword">@author</span> skywang
 * <span class="token keyword">@date</span> 2014/03/15
 */</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RadixSort</span> <span class="token punctuation">{</span>

    <span class="token comment">/*
     * 获取数组a中最大值
     *
     * 参数说明: 
     *     a -- 数组
     *     n -- 数组长度
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getMax</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> max<span class="token punctuation">;</span>

        max <span class="token operator">=</span> a<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> a<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&gt;</span> max<span class="token punctuation">)</span>
                max <span class="token operator">=</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> max<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
     * 对数组按照&quot;某个位数&quot;进行排序(桶排序)
     *
     * 参数说明: 
     *     a -- 数组
     *     exp -- 指数。对数组a按照该指数进行排序。
     *
     * 例如，对于数组a={50, 3, 542, 745, 2014, 154, 63, 616}；
     *    (01) 当exp=1表示按照&quot;个位&quot;对数组a进行排序
     *    (02) 当exp=10表示按照&quot;十位&quot;对数组a进行排序
     *    (03) 当exp=100表示按照&quot;百位&quot;对数组a进行排序
     *    ...
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">countSort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> exp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//int output[a.length];    // 存储&quot;被排序数据&quot;的临时数组</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> output <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>a<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>    <span class="token comment">// 存储&quot;被排序数据&quot;的临时数组</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> buckets <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token comment">// 将数据出现的次数存储在buckets[]中</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> a<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            buckets<span class="token punctuation">[</span> <span class="token punctuation">(</span>a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">/</span>exp<span class="token punctuation">)</span><span class="token operator">%</span><span class="token number">10</span> <span class="token punctuation">]</span><span class="token operator">++</span><span class="token punctuation">;</span>

        <span class="token comment">// 更改buckets[i]。目的是让更改后的buckets[i]的值，是该数据在output[]中的位置。</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            buckets<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+=</span> buckets<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token comment">// 将数据存储到临时数组output[]中</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> a<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            output<span class="token punctuation">[</span>buckets<span class="token punctuation">[</span> <span class="token punctuation">(</span>a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">/</span>exp<span class="token punctuation">)</span><span class="token operator">%</span><span class="token number">10</span> <span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            buckets<span class="token punctuation">[</span> <span class="token punctuation">(</span>a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">/</span>exp<span class="token punctuation">)</span><span class="token operator">%</span><span class="token number">10</span> <span class="token punctuation">]</span><span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 将排序好的数据赋值给a[]</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> a<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            a<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> output<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>

        output <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        buckets <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
     * 基数排序
     *
     * 参数说明: 
     *     a -- 数组
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">radixSort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> exp<span class="token punctuation">;</span>    <span class="token comment">// 指数。当对数组按各位进行排序时，exp=1；按十位进行排序时，exp=10；...</span>
        <span class="token keyword">int</span> max <span class="token operator">=</span> <span class="token function">getMax</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 数组a中的最大值</span>

        <span class="token comment">// 从个位开始，对数组a按&quot;指数&quot;进行排序</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>exp <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> max<span class="token operator">/</span>exp <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span> exp <span class="token operator">*=</span> <span class="token number">10</span><span class="token punctuation">)</span>
            <span class="token function">countSort</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> exp<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> i<span class="token punctuation">;</span>
        <span class="token keyword">int</span> a<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">53</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">542</span><span class="token punctuation">,</span> <span class="token number">748</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">214</span><span class="token punctuation">,</span> <span class="token number">154</span><span class="token punctuation">,</span> <span class="token number">63</span><span class="token punctuation">,</span> <span class="token number">616</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;before sort:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>a<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d &quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">radixSort</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 基数排序</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;after  sort:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>a<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d &quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2><p>提示</p>`,21),k={href:"https://www.cnblogs.com/skywang12345/p/3603669.html",target:"_blank",rel:"noopener noreferrer"};function r(d,v){const a=p("ExternalLinkIcon");return e(),o("div",null,[u,s("p",null,[n("本文主要参考至 "),s("a",k,[n("https://www.cnblogs.com/skywang12345/p/3603669.html"),c(a)]),n(", 在此基础上做了内容的增改。")])])}const h=t(l,[["render",r],["__file","alg-sort-x-radix.html.vue"]]);export{h as default};