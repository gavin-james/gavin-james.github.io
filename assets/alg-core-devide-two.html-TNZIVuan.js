import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as l,c as i,a as n,b as e,d as t,f as s}from"./app-pgelmVnX.js";const c={},u=s(`<h1 id="算法思想-二分法" tabindex="-1"><a class="header-anchor" href="#算法思想-二分法" aria-hidden="true">#</a> 算法思想 - 二分法</h1><blockquote><p>本文主要介绍算法思想中分治算法重要的二分法，比如二分查找；二分查找也称折半查找（Binary Search），它是一种效率较高的查找方法。但是，折半查找要求线性表必须采用顺序存储结构，而且表中元素按关键字有序排列。</p></blockquote><h2 id="二分查找" tabindex="-1"><a class="header-anchor" href="#二分查找" aria-hidden="true">#</a> 二分查找</h2><h3 id="正常实现" tabindex="-1"><a class="header-anchor" href="#正常实现" aria-hidden="true">#</a> 正常实现</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">,</span> <span class="token keyword">int</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> l <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> h <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> h<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> m <span class="token operator">=</span> l <span class="token operator">+</span> <span class="token punctuation">(</span>h <span class="token operator">-</span> l<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>m<span class="token punctuation">]</span> <span class="token operator">==</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> m<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>m<span class="token punctuation">]</span> <span class="token operator">&gt;</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            h <span class="token operator">=</span> m <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            l <span class="token operator">=</span> m <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="时间复杂度" tabindex="-1"><a class="header-anchor" href="#时间复杂度" aria-hidden="true">#</a> 时间复杂度</h3><p>二分查找也称为折半查找，每次都能将查找区间减半，这种折半特性的算法时间复杂度都为 O(logN)。</p><p><strong>m 计算</strong></p><p>有两种计算中值 m 的方式:</p><ul><li>m = (l + h) / 2</li><li>m = l + (h - l) / 2</li></ul><p>l + h 可能出现加法溢出，最好使用第二种方式。</p><p><strong>返回值</strong></p><p>循环退出时如果仍然没有查找到 key，那么表示查找失败。可以有两种返回值:</p><ul><li>-1: 以一个错误码表示没有查找到 key</li><li>l: 将 key 插入到 nums 中的正确位置</li></ul><h3 id="二分查找变种" tabindex="-1"><a class="header-anchor" href="#二分查找变种" aria-hidden="true">#</a> 二分查找变种</h3><p>二分查找可以有很多变种，变种实现要注意边界值的判断。例如在一个有重复元素的数组中查找 key 的最左位置的实现如下:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">,</span> <span class="token keyword">int</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> l <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> h <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>l <span class="token operator">&lt;</span> h<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> m <span class="token operator">=</span> l <span class="token operator">+</span> <span class="token punctuation">(</span>h <span class="token operator">-</span> l<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>m<span class="token punctuation">]</span> <span class="token operator">&gt;=</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            h <span class="token operator">=</span> m<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            l <span class="token operator">=</span> m <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> l<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该实现和正常实现有以下不同:</p><ul><li>循环条件为 l &lt; h</li><li>h 的赋值表达式为 h = m</li><li>最后返回 l 而不是 -1</li></ul><p>在 nums[m] &gt;= key 的情况下，可以推导出最左 key 位于 [l, m] 区间中，这是一个闭区间。h 的赋值表达式为 h = m，因为 m 位置也可能是解。</p><p>在 h 的赋值表达式为 h = mid 的情况下，如果循环条件为 l &lt;= h，那么会出现循环无法退出的情况，因此循环条件只能是 l &lt; h。以下演示了循环条件为 l &lt;= h 时循环无法退出的情况:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nums <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span>, <span class="token number">1</span>, <span class="token number">2</span><span class="token punctuation">}</span>, key <span class="token operator">=</span> <span class="token number">1</span>
l   m   h
<span class="token number">0</span>   <span class="token number">1</span>   <span class="token number">2</span>  nums<span class="token punctuation">[</span>m<span class="token punctuation">]</span> <span class="token operator">&gt;=</span> key
<span class="token number">0</span>   <span class="token number">0</span>   <span class="token number">1</span>  nums<span class="token punctuation">[</span>m<span class="token punctuation">]</span> <span class="token operator">&lt;</span> key
<span class="token number">1</span>   <span class="token number">1</span>   <span class="token number">1</span>  nums<span class="token punctuation">[</span>m<span class="token punctuation">]</span> <span class="token operator">&gt;=</span> key
<span class="token number">1</span>   <span class="token number">1</span>   <span class="token number">1</span>  nums<span class="token punctuation">[</span>m<span class="token punctuation">]</span> <span class="token operator">&gt;=</span> key
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当循环体退出时，不表示没有查找到 key，因此最后返回的结果不应该为 -1。为了验证有没有查找到，需要在调用端判断一下返回位置上的值和 key 是否相等。</p><h4 id="求开方" tabindex="-1"><a class="header-anchor" href="#求开方" aria-hidden="true">#</a> 求开方</h4>`,24),r={href:"https://leetcode.com/problems/sqrtx/description/",target:"_blank",rel:"noopener noreferrer"},d=s(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>Input: 4
Output: 2

Input: 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since we want to return an integer, the decimal part will be truncated.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个数 x 的开方 sqrt 一定在 0 ~ x 之间，并且满足 sqrt == x / sqrt。可以利用二分查找在 0 ~ x 之间查找 sqrt。</p><p>对于 x = 8，它的开方是 2.82842...，最后应该返回 2 而不是 3。在循环条件为 l &lt;= h 并且循环退出时，h 总是比 l 小 1，也就是说 h = 2，l = 3，因此最后的返回值应该为 h 而不是 l。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">mySqrt</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> l <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> h <span class="token operator">=</span> x<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> h<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> mid <span class="token operator">=</span> l <span class="token operator">+</span> <span class="token punctuation">(</span>h <span class="token operator">-</span> l<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> sqrt <span class="token operator">=</span> x <span class="token operator">/</span> mid<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>sqrt <span class="token operator">==</span> mid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> mid<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>mid <span class="token operator">&gt;</span> sqrt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            h <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            l <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> h<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="大于给定元素的最小元素" tabindex="-1"><a class="header-anchor" href="#大于给定元素的最小元素" aria-hidden="true">#</a> 大于给定元素的最小元素</h4>`,5),k={href:"https://leetcode.com/problems/find-smallest-letter-greater-than-target/description/",target:"_blank",rel:"noopener noreferrer"},m=s(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>Input:
letters = [&quot;c&quot;, &quot;f&quot;, &quot;j&quot;]
target = &quot;d&quot;
Output: &quot;f&quot;

Input:
letters = [&quot;c&quot;, &quot;f&quot;, &quot;j&quot;]
target = &quot;k&quot;
Output: &quot;c&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>题目描述: 给定一个有序的字符数组 letters 和一个字符 target，要求找出 letters 中大于 target 的最小字符，如果找不到就返回第 1 个字符。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">char</span> <span class="token function">nextGreatestLetter</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> letters<span class="token punctuation">,</span> <span class="token keyword">char</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> n <span class="token operator">=</span> letters<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token keyword">int</span> l <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> h <span class="token operator">=</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> h<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> m <span class="token operator">=</span> l <span class="token operator">+</span> <span class="token punctuation">(</span>h <span class="token operator">-</span> l<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>letters<span class="token punctuation">[</span>m<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            l <span class="token operator">=</span> m <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            h <span class="token operator">=</span> m <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> l <span class="token operator">&lt;</span> n <span class="token operator">?</span> letters<span class="token punctuation">[</span>l<span class="token punctuation">]</span> <span class="token operator">:</span> letters<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="有序数组的-single-element" tabindex="-1"><a class="header-anchor" href="#有序数组的-single-element" aria-hidden="true">#</a> 有序数组的 Single Element</h4>`,4),v={href:"https://leetcode.com/problems/single-element-in-a-sorted-array/description/",target:"_blank",rel:"noopener noreferrer"},b=s(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>Input: [1,1,2,3,3,4,4,8,8]
Output: 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>题目描述: 一个有序数组只有一个数不出现两次，找出这个数。要求以 O(logN) 时间复杂度进行求解。</p><p>令 index 为 Single Element 在数组中的位置。如果 m 为偶数，并且 m + 1 &lt; index，那么 nums[m] == nums[m + 1]；m + 1 &gt;= index，那么 nums[m] != nums[m + 1]。</p><p>从上面的规律可以知道，如果 nums[m] == nums[m + 1]，那么 index 所在的数组位置为 [m + 2, h]，此时令 l = m + 2；如果 nums[m] != nums[m + 1]，那么 index 所在的数组位置为 [l, m]，此时令 h = m。</p><p>因为 h 的赋值表达式为 h = m，那么循环条件也就只能使用 l &lt; h 这种形式。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">singleNonDuplicate</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> l <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> h <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>l <span class="token operator">&lt;</span> h<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> m <span class="token operator">=</span> l <span class="token operator">+</span> <span class="token punctuation">(</span>h <span class="token operator">-</span> l<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>m <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            m<span class="token operator">--</span><span class="token punctuation">;</span>   <span class="token comment">// 保证 l/h/m 都在偶数位，使得查找区间大小一直都是奇数</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>m<span class="token punctuation">]</span> <span class="token operator">==</span> nums<span class="token punctuation">[</span>m <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            l <span class="token operator">=</span> m <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            h <span class="token operator">=</span> m<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> nums<span class="token punctuation">[</span>l<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="第一个错误的版本" tabindex="-1"><a class="header-anchor" href="#第一个错误的版本" aria-hidden="true">#</a> 第一个错误的版本</h4>`,7),h={href:"https://leetcode.com/problems/first-bad-version/description/",target:"_blank",rel:"noopener noreferrer"},g=s(`<p>题目描述: 给定一个元素 n 代表有 [1, 2, ..., n] 版本，可以调用 isBadVersion(int x) 知道某个版本是否错误，要求找到第一个错误的版本。</p><p>如果第 m 个版本出错，则表示第一个错误的版本在 [l, m] 之间，令 h = m；否则第一个错误的版本在 [m + 1, h] 之间，令 l = m + 1。</p><p>因为 h 的赋值表达式为 h = m，因此循环条件为 l &lt; h。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">firstBadVersion</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> l <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> h <span class="token operator">=</span> n<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>l <span class="token operator">&lt;</span> h<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> mid <span class="token operator">=</span> l <span class="token operator">+</span> <span class="token punctuation">(</span>h <span class="token operator">-</span> l<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isBadVersion</span><span class="token punctuation">(</span>mid<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            h <span class="token operator">=</span> mid<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            l <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> l<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="旋转数组的最小数字" tabindex="-1"><a class="header-anchor" href="#旋转数组的最小数字" aria-hidden="true">#</a> 旋转数组的最小数字</h4>`,5),y={href:"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/",target:"_blank",rel:"noopener noreferrer"},w=s(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>Input: [3,4,5,1,2],
Output: 1
public int findMin(int[] nums) {
    int l = 0, h = nums.length - 1;
    while (l &lt; h) {
        int m = l + (h - l) / 2;
        if (nums[m] &lt;= nums[h]) {
            h = m;
        } else {
            l = m + 1;
        }
    }
    return nums[l];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查找区间" tabindex="-1"><a class="header-anchor" href="#查找区间" aria-hidden="true">#</a> 查找区间</h4>`,2),f={href:"https://leetcode.com/problems/search-for-a-range/description/",target:"_blank",rel:"noopener noreferrer"},x=s(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
public int[] searchRange(int[] nums, int target) {
    int first = binarySearch(nums, target);
    int last = binarySearch(nums, target + 1) - 1;
    if (first == nums.length || nums[first] != target) {
        return new int[]{-1, -1};
    } else {
        return new int[]{first, Math.max(first, last)};
    }
}

private int binarySearch(int[] nums, int target) {
    int l = 0, h = nums.length; // 注意 h 的初始值
    while (l &lt; h) {
        int m = l + (h - l) / 2;
        if (nums[m] &gt;= target) {
            h = m;
        } else {
            l = m + 1;
        }
    }
    return l;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function _(q,j){const a=o("ExternalLinkIcon");return l(),i("div",null,[u,n("p",null,[n("a",r,[e("69. Sqrt(x) (Easy)在新窗口打开"),t(a)])]),d,n("p",null,[n("a",k,[e("744. Find Smallest Letter Greater Than Target (Easy)在新窗口打开"),t(a)])]),m,n("p",null,[n("a",v,[e("540. Single Element in a Sorted Array (Medium)在新窗口打开"),t(a)])]),b,n("p",null,[n("a",h,[e("278. First Bad Version (Easy)在新窗口打开"),t(a)])]),g,n("p",null,[n("a",y,[e("153. Find Minimum in Rotated Sorted Array (Medium)在新窗口打开"),t(a)])]),w,n("p",null,[n("a",f,[e("34. Search for a Range (Medium)在新窗口打开"),t(a)])]),x])}const I=p(c,[["render",_],["__file","alg-core-devide-two.html.vue"]]);export{I as default};
