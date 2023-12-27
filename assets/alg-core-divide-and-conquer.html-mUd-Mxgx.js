import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as i,o as t,c as l,a as n,b as d,d as r,f as e}from"./app-5g2Grfu7.js";const c={},o=e('<h1 id="算法思想-分治算法" tabindex="-1"><a class="header-anchor" href="#算法思想-分治算法" aria-hidden="true">#</a> 算法思想 - 分治算法</h1><blockquote><p>分治算法的基本思想是将一个规模为N的问题分解为K个规模较小的子问题，这些子问题相互独立且与原问题性质相同。求出子问题的解，就可得到原问题的解。</p></blockquote><h2 id="分治相关题目" tabindex="-1"><a class="header-anchor" href="#分治相关题目" aria-hidden="true">#</a> 分治相关题目</h2><h3 id="给表达式加括号" tabindex="-1"><a class="header-anchor" href="#给表达式加括号" aria-hidden="true">#</a> 给表达式加括号</h3>',4),u={href:"https://leetcode.com/problems/different-ways-to-add-parentheses/description/",target:"_blank",rel:"noopener noreferrer"},v=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>Input: &quot;2-1-1&quot;.

((2-1)-1) = 0
(2-(1-1)) = 2

Output : [0, 2]
public List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span> diffWaysToCompute(String input) {
    List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span> ways = new ArrayList&lt;&gt;();
    for (int i = 0; i &lt; input.length(); i++) {
        char c = input.charAt(i);
        if (c == &#39;+&#39; || c == &#39;-&#39; || c == &#39;*&#39;) {
            List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span> left = diffWaysToCompute(input.substring(0, i));
            List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span> right = diffWaysToCompute(input.substring(i + 1));
            for (int l : left) {
                for (int r : right) {
                    switch (c) {
                        case &#39;+&#39;:
                            ways.add(l + r);
                            break;
                        case &#39;-&#39;:
                            ways.add(l - r);
                            break;
                        case &#39;*&#39;:
                            ways.add(l * r);
                            break;
                    }
                }
            }
        }
    }
    if (ways.size() == 0) {
        ways.add(Integer.valueOf(input));
    }
    return ways;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function p(m,b){const s=i("ExternalLinkIcon");return t(),l("div",null,[o,n("p",null,[n("a",u,[d("241. Different Ways to Add Parentheses (Medium)在新窗口打开"),r(s)])]),v])}const g=a(c,[["render",p],["__file","alg-core-divide-and-conquer.html.vue"]]);export{g as default};
