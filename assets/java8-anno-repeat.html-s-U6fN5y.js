import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as s,f as t}from"./app-PDcd_-E9.js";const e={},p=t(`<h1 id="java-8-重复注解" tabindex="-1"><a class="header-anchor" href="#java-8-重复注解" aria-hidden="true">#</a> Java 8 - 重复注解</h1><blockquote><p>理解Java 8 重复注解需理解几个问题:</p><ul><li>Jdk8之前对重复注解是怎么做的?</li><li>Jdk8对重复注解添加了什么支持?</li></ul></blockquote><h2 id="什么是重复注解" tabindex="-1"><a class="header-anchor" href="#什么是重复注解" aria-hidden="true">#</a> 什么是重复注解</h2><p>允许在同一申明类型(类，属性，或方法)的多次使用同一个注解</p><h3 id="jdk8之前" tabindex="-1"><a class="header-anchor" href="#jdk8之前" aria-hidden="true">#</a> JDK8之前</h3><p>java 8之前也有重复使用注解的解决方案，但可读性不是很好，比如下面的代码:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">Authority</span> <span class="token punctuation">{</span>
     <span class="token class-name">String</span> <span class="token function">role</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">Authorities</span> <span class="token punctuation">{</span>
    <span class="token class-name">Authority</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RepeatAnnotationUseOldVersion</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Authorities</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token annotation punctuation">@Authority</span><span class="token punctuation">(</span>role<span class="token operator">=</span><span class="token string">&quot;Admin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token annotation punctuation">@Authority</span><span class="token punctuation">(</span>role<span class="token operator">=</span><span class="token string">&quot;Manager&quot;</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSomeThing</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由另一个注解来存储重复注解，在使用时候，用存储注解Authorities来扩展重复注解。</p><h3 id="jdk8重复注解" tabindex="-1"><a class="header-anchor" href="#jdk8重复注解" aria-hidden="true">#</a> Jdk8重复注解</h3><p>我们再来看看java 8里面的做法:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repeatable</span><span class="token punctuation">(</span><span class="token class-name">Authorities</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">Authority</span> <span class="token punctuation">{</span>
     <span class="token class-name">String</span> <span class="token function">role</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">Authorities</span> <span class="token punctuation">{</span>
    <span class="token class-name">Authority</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RepeatAnnotationUseNewVersion</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Authority</span><span class="token punctuation">(</span>role<span class="token operator">=</span><span class="token string">&quot;Admin&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Authority</span><span class="token punctuation">(</span>role<span class="token operator">=</span><span class="token string">&quot;Manager&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSomeThing</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不同的地方是，创建重复注解Authority时，加上@Repeatable,指向存储注解Authorities，在使用时候，直接可以重复使用Authority注解。从上面例子看出，java 8里面做法更适合常规的思维，可读性强一点</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>JEP120没有太多内容，是一个小特性，仅仅是为了提高代码可读性。这次java 8对注解做了2个方面的改进(JEP 104,JEP120)，相信注解会比以前使用得更加频繁了。</p>`,14),o=[p];function c(i,l){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","java8-anno-repeat.html.vue"]]);export{d as default};