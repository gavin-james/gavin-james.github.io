import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as e,c as o,a as s,b as n,d as c,f as i}from"./app-PDcd_-E9.js";const l={},u=i(`<h1 id="排序-冒泡排序-bubble-sort" tabindex="-1"><a class="header-anchor" href="#排序-冒泡排序-bubble-sort" aria-hidden="true">#</a> 排序 - 冒泡排序(Bubble Sort)</h1><blockquote><p>最简单和最基本的排序。</p></blockquote><h2 id="冒泡排序介绍" tabindex="-1"><a class="header-anchor" href="#冒泡排序介绍" aria-hidden="true">#</a> 冒泡排序介绍</h2><p>它是一种较简单的排序算法。它会遍历若干次要排序的数列，每次遍历时，它都会从前往后依次的比较相邻两个数的大小；如果前者比后者大，则交换它们的位置。这样，一次遍历之后，最大的元素就在数列的末尾！ 采用相同的方法再次遍历时，第二大的元素就被排列在最大元素之前。重复此操作，直到整个数列都有序为止！</p><h2 id="冒泡排序实现" tabindex="-1"><a class="header-anchor" href="#冒泡排序实现" aria-hidden="true">#</a> 冒泡排序实现</h2><p>下面以数列{20,40,30,10,60,50}为例，演示它的冒泡排序过程(如下图)。</p><figure><img src="https://www.pdai.tech/images/alg/alg-sort-bubble-1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们先分析第1趟排序</p><ul><li>当i=5,j=0时，a[0]&lt;a[1]。此时，不做任何处理！</li><li>当i=5,j=1时，a[1]&gt;a[2]。此时，交换a[1]和a[2]的值；交换之后，a[1]=30，a[2]=40。</li><li>当i=5,j=2时，a[2]&gt;a[3]。此时，交换a[2]和a[3]的值；交换之后，a[2]=10，a[3]=40。</li><li>当i=5,j=3时，a[3]&lt;a[4]。此时，不做任何处理！</li><li>当i=5,j=4时，a[4]&gt;a[5]。此时，交换a[4]和a[5]的值；交换之后，a[4]=50，a[3]=60。</li></ul><p>于是，第1趟排序完之后，数列{20,40,30,10,60,50}变成了{20,30,10,40,50,60}。此时，数列末尾的值最大。</p><p>根据这种方法:</p><ul><li>第2趟排序完之后，数列中a[5...6]是有序的。</li><li>第3趟排序完之后，数列中a[4...6]是有序的。</li><li>第4趟排序完之后，数列中a[3...6]是有序的。</li><li>第5趟排序完之后，数列中a[1...6]是有序的。整个数列也就是有序的了。</li></ul><h2 id="复杂度和稳定性" tabindex="-1"><a class="header-anchor" href="#复杂度和稳定性" aria-hidden="true">#</a> 复杂度和稳定性</h2><h3 id="冒泡排序时间复杂度" tabindex="-1"><a class="header-anchor" href="#冒泡排序时间复杂度" aria-hidden="true">#</a> 冒泡排序时间复杂度</h3><p>冒泡排序的时间复杂度是O(N2)。 假设被排序的数列中有N个数。遍历一趟的时间复杂度是O(N)，需要遍历多少次呢? N-1次！因此，冒泡排序的时间复杂度是O(N2)。</p><h3 id="冒泡排序稳定性" tabindex="-1"><a class="header-anchor" href="#冒泡排序稳定性" aria-hidden="true">#</a> 冒泡排序稳定性</h3><p>冒泡排序是稳定的算法，它满足稳定算法的定义。 算法稳定性 -- 假设在数列中存在a[i]=a[j]，若在排序之前，a[i]在a[j]前面；并且排序之后，a[i]仍然在a[j]前面。则这个排序算法是稳定的！</p><h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 冒泡排序: Java
 *
 * <span class="token keyword">@author</span> skywang
 * <span class="token keyword">@date</span> 2014/03/11
 */</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BubbleSort</span> <span class="token punctuation">{</span>

    <span class="token comment">/*
     * 冒泡排序
     *
     * 参数说明: 
     *     a -- 待排序的数组
     *     n -- 数组的长度
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">bubbleSort1</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> i<span class="token punctuation">,</span>j<span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span>i<span class="token operator">=</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 将a[0...i]中最大的数据放在末尾</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span>j<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> j<span class="token operator">&lt;</span>i<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

                <span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&gt;</span> a<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 交换a[j]和a[j+1]</span>
                    <span class="token keyword">int</span> tmp <span class="token operator">=</span> a<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                    a<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> a<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                    a<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> tmp<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
     * 冒泡排序(改进版)
     *
     * 参数说明: 
     *     a -- 待排序的数组
     *     n -- 数组的长度
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">bubbleSort2</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> i<span class="token punctuation">,</span>j<span class="token punctuation">;</span>
        <span class="token keyword">int</span> flag<span class="token punctuation">;</span>                 <span class="token comment">// 标记</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span>i<span class="token operator">=</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

            flag <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>            <span class="token comment">// 初始化标记为0</span>
            <span class="token comment">// 将a[0...i]中最大的数据放在末尾</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span>j<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> j<span class="token operator">&lt;</span>i<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&gt;</span> a<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 交换a[j]和a[j+1]</span>
                    <span class="token keyword">int</span> tmp <span class="token operator">=</span> a<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                    a<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> a<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                    a<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> tmp<span class="token punctuation">;</span>

                    flag <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>    <span class="token comment">// 若发生交换，则设标记为1</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>flag<span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>            <span class="token comment">// 若没发生交换，则说明数列已有序。</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> i<span class="token punctuation">;</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token number">40</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">60</span><span class="token punctuation">,</span><span class="token number">50</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;before sort:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>a<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d &quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">bubbleSort1</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> a<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//bubbleSort2(a, a.length);</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;after  sort:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>a<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d &quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2><p>提示</p>`,21),k={href:"https://www.cnblogs.com/skywang12345/p/3596232.html",target:"_blank",rel:"noopener noreferrer"};function r(d,v){const a=t("ExternalLinkIcon");return e(),o("div",null,[u,s("p",null,[n("本文主要参考至 "),s("a",k,[n("https://www.cnblogs.com/skywang12345/p/3596232.html"),c(a)]),n(", 在此基础上做了内容的增改。")])])}const h=p(l,[["render",r],["__file","alg-sort-x-bubble.html.vue"]]);export{h as default};