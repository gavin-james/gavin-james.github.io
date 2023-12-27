import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as c,c as l,a as n,b as s,d as p,f as t}from"./app-pgelmVnX.js";const i={},u=t('<h1 id="树-二叉搜索树-bst" tabindex="-1"><a class="header-anchor" href="#树-二叉搜索树-bst" aria-hidden="true">#</a> 树 - 二叉搜索树(BST)</h1><blockquote><p>本文主要介绍 二叉树中最基本的二叉查找树（Binary Search Tree），（又：二叉搜索树，二叉排序树）它或者是一棵空树，或者是具有下列性质的二叉树： 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 它的左、右子树也分别为二叉排序树。</p></blockquote><h2 id="bst的定义" tabindex="-1"><a class="header-anchor" href="#bst的定义" aria-hidden="true">#</a> BST的定义</h2><p>在二叉查找树中:</p><ul><li>若任意节点的左子树不空，则左子树上所有结点的值均小于它的根结点的值；</li><li>任意节点的右子树不空，则右子树上所有结点的值均大于它的根结点的值；</li><li>任意节点的左、右子树也分别为二叉查找树。</li><li>没有键值相等的节点。</li></ul><figure><img src="https://www.pdai.tech/images/alg/alg-tree-binary-search-1.svg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>',6),k={href:"https://www.cs.usfca.edu/~galles/visualization/BST.html",target:"_blank",rel:"noopener noreferrer"},r=t(`<figure><img src="https://www.pdai.tech/images/alg/alg-tree-binary-search-0.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="bst的实现" tabindex="-1"><a class="header-anchor" href="#bst的实现" aria-hidden="true">#</a> BST的实现</h2><h3 id="节点" tabindex="-1"><a class="header-anchor" href="#节点" aria-hidden="true">#</a> 节点</h3><p>BSTree是二叉树，它保存了二叉树的根节点mRoot；mRoot是BSTNode类型，而BSTNode是二叉查找树的节点，它是BSTree的内部类。BSTNode包含二叉查找树的几个基本信息:</p><ul><li>key -- 它是关键字，是用来对二叉查找树的节点进行排序的。</li><li>left -- 它指向当前节点的左孩子。</li><li>right -- 它指向当前节点的右孩子。</li><li>parent -- 它指向当前节点的父结点。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BSTree</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">Comparable</span><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> mRoot<span class="token punctuation">;</span>    <span class="token comment">// 根结点</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">Comparable</span><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
        <span class="token class-name">T</span> key<span class="token punctuation">;</span>                <span class="token comment">// 关键字(键值)</span>
        <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> left<span class="token punctuation">;</span>      <span class="token comment">// 左孩子</span>
        <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> right<span class="token punctuation">;</span>     <span class="token comment">// 右孩子</span>
        <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> parent<span class="token punctuation">;</span>    <span class="token comment">// 父结点</span>

        <span class="token keyword">public</span> <span class="token class-name">BSTNode</span><span class="token punctuation">(</span><span class="token class-name">T</span> key<span class="token punctuation">,</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> parent<span class="token punctuation">,</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> left<span class="token punctuation">,</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> key<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>parent <span class="token operator">=</span> parent<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>left <span class="token operator">=</span> left<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>right <span class="token operator">=</span> right<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="遍历" tabindex="-1"><a class="header-anchor" href="#遍历" aria-hidden="true">#</a> 遍历</h3><p>这里讲解前序遍历、中序遍历、后序遍历3种方式。</p><h4 id="前序遍历" tabindex="-1"><a class="header-anchor" href="#前序遍历" aria-hidden="true">#</a> 前序遍历</h4><p>若二叉树非空，则执行以下操作:</p><ul><li>访问根结点；</li><li>先序遍历左子树；</li><li>先序遍历右子树。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">preOrder</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> tree<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>tree <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>key<span class="token operator">+</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">preOrder</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">preOrder</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">preOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">preOrder</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="中序遍历" tabindex="-1"><a class="header-anchor" href="#中序遍历" aria-hidden="true">#</a> 中序遍历</h4><p>若二叉树非空，则执行以下操作:</p><ul><li>中序遍历左子树；</li><li>访问根结点；</li><li>中序遍历右子树。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">inOrder</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> tree<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>tree <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">inOrder</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>key<span class="token operator">+</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">inOrder</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">inOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">inOrder</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="后序遍历" tabindex="-1"><a class="header-anchor" href="#后序遍历" aria-hidden="true">#</a> 后序遍历</h4><p>若二叉树非空，则执行以下操作:</p><ul><li>后序遍历左子树；</li><li>后序遍历右子树；</li><li>访问根结点。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">postOrder</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> tree<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>tree <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">postOrder</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">postOrder</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>key<span class="token operator">+</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">postOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">postOrder</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看看下面这颗树的各种遍历方式:</p><figure><img src="https://www.pdai.tech/images/alg/alg-tree-binary-search-1.svg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>对于上面的二叉树而言，</p><ul><li>前序遍历结果: 8 3 1 6 4 7 10 14 13</li><li>中序遍历结果: 1 3 4 6 7 8 10 13 14</li><li>后序遍历结果: 1 4 7 6 3 13 14 10 8</li></ul><h3 id="查找" tabindex="-1"><a class="header-anchor" href="#查找" aria-hidden="true">#</a> 查找</h3><ul><li>递归版本的代码</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/*
 * (递归实现)查找&quot;二叉树x&quot;中键值为key的节点
 */</span>
<span class="token keyword">private</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">search</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> x<span class="token punctuation">,</span> <span class="token class-name">T</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> x<span class="token punctuation">;</span>

    <span class="token keyword">int</span> cmp <span class="token operator">=</span> key<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cmp <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token function">search</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>left<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>cmp <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token function">search</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>right<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        <span class="token keyword">return</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">search</span><span class="token punctuation">(</span><span class="token class-name">T</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">search</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>非递归版本的代码</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/*
 * (非递归实现)查找&quot;二叉树x&quot;中键值为key的节点
 */</span>
<span class="token keyword">private</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">iterativeSearch</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> x<span class="token punctuation">,</span> <span class="token class-name">T</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>x<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> cmp <span class="token operator">=</span> key<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>cmp <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> 
            x <span class="token operator">=</span> x<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>cmp <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> 
            x <span class="token operator">=</span> x<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            <span class="token keyword">return</span> x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">iterativeSearch</span><span class="token punctuation">(</span><span class="token class-name">T</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">iterativeSearch</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="最大值和最小值" tabindex="-1"><a class="header-anchor" href="#最大值和最小值" aria-hidden="true">#</a> 最大值和最小值</h3><figure><img src="https://www.pdai.tech/images/alg/alg-tree-11.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li>查找最大结点</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/* 
 * 查找最大结点: 返回tree为根结点的二叉树的最大结点。
 */</span>
<span class="token keyword">private</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">maximum</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> tree<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>tree <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        tree <span class="token operator">=</span> tree<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
    <span class="token keyword">return</span> tree<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">maximum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> p <span class="token operator">=</span> <span class="token function">maximum</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> p<span class="token punctuation">.</span>key<span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>查找最小结点</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/* 
 * 查找最小结点: 返回tree为根结点的二叉树的最小结点。
 */</span>
<span class="token keyword">private</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">minimum</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> tree<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>tree <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        tree <span class="token operator">=</span> tree<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
    <span class="token keyword">return</span> tree<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">minimum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> p <span class="token operator">=</span> <span class="token function">minimum</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> p<span class="token punctuation">.</span>key<span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="前驱和后继" tabindex="-1"><a class="header-anchor" href="#前驱和后继" aria-hidden="true">#</a> 前驱和后继</h3><p>节点的前驱: 是该节点的左子树中的最大节点。 节点的后继: 是该节点的右子树中的最小节点。</p><ul><li>查找前驱节点</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/* 
 * 找结点(x)的前驱结点。即，查找&quot;二叉树中数据值小于该结点&quot;的&quot;最大结点&quot;。
 */</span>
<span class="token keyword">public</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">predecessor</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果x存在左孩子，则&quot;x的前驱结点&quot;为 &quot;以其左孩子为根的子树的最大结点&quot;。</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token function">maximum</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 如果x没有左孩子。则x有以下两种可能: </span>
    <span class="token comment">// (01) x是&quot;一个右孩子&quot;，则&quot;x的前驱结点&quot;为 &quot;它的父结点&quot;。</span>
    <span class="token comment">// (01) x是&quot;一个左孩子&quot;，则查找&quot;x的最低的父结点，并且该父结点要具有右孩子&quot;，找到的这个&quot;最低的父结点&quot;就是&quot;x的前驱结点&quot;。</span>
    <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> y <span class="token operator">=</span> x<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>y<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>x<span class="token operator">==</span>y<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        x <span class="token operator">=</span> y<span class="token punctuation">;</span>
        y <span class="token operator">=</span> y<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>查找后继节点</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/* 
 * 找结点(x)的后继结点。即，查找&quot;二叉树中数据值大于该结点&quot;的&quot;最小结点&quot;。
 */</span>
<span class="token keyword">public</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">successor</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果x存在右孩子，则&quot;x的后继结点&quot;为 &quot;以其右孩子为根的子树的最小结点&quot;。</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token function">minimum</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 如果x没有右孩子。则x有以下两种可能: </span>
    <span class="token comment">// (01) x是&quot;一个左孩子&quot;，则&quot;x的后继结点&quot;为 &quot;它的父结点&quot;。</span>
    <span class="token comment">// (02) x是&quot;一个右孩子&quot;，则查找&quot;x的最低的父结点，并且该父结点要具有左孩子&quot;，找到的这个&quot;最低的父结点&quot;就是&quot;x的后继结点&quot;。</span>
    <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> y <span class="token operator">=</span> x<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>y<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>x<span class="token operator">==</span>y<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        x <span class="token operator">=</span> y<span class="token punctuation">;</span>
        y <span class="token operator">=</span> y<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="插入" tabindex="-1"><a class="header-anchor" href="#插入" aria-hidden="true">#</a> 插入</h3><figure><img src="https://www.pdai.tech/images/alg/alg-tree-8.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/* 
 * 将结点插入到二叉树中
 *
 * 参数说明: 
 *     tree 二叉树的
 *     z 插入的结点
 */</span>
<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token class-name">BSTree</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> bst<span class="token punctuation">,</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> z<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> cmp<span class="token punctuation">;</span>
    <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> y <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> x <span class="token operator">=</span> bst<span class="token punctuation">.</span>mRoot<span class="token punctuation">;</span>

    <span class="token comment">// 查找z的插入位置</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>x <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        y <span class="token operator">=</span> x<span class="token punctuation">;</span>
        cmp <span class="token operator">=</span> z<span class="token punctuation">.</span>key<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cmp <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            x <span class="token operator">=</span> x<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            x <span class="token operator">=</span> x<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    z<span class="token punctuation">.</span>parent <span class="token operator">=</span> y<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>y<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span>
        bst<span class="token punctuation">.</span>mRoot <span class="token operator">=</span> z<span class="token punctuation">;</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        cmp <span class="token operator">=</span> z<span class="token punctuation">.</span>key<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>y<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cmp <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            y<span class="token punctuation">.</span>left <span class="token operator">=</span> z<span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            y<span class="token punctuation">.</span>right <span class="token operator">=</span> z<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 
 * 新建结点(key)，并将其插入到二叉树中
 *
 * 参数说明: 
 *     tree 二叉树的根结点
 *     key 插入结点的键值
 */</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token class-name">T</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> z<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>key<span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 如果新建结点失败，则返回。</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>z <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token function">insert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> z<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除" tabindex="-1"><a class="header-anchor" href="#删除" aria-hidden="true">#</a> 删除</h3><figure><img src="https://www.pdai.tech/images/alg/alg-tree-10.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/* 
 * 删除结点(z)，并返回被删除的结点
 *
 * 参数说明: 
 *     bst 二叉树
 *     z 删除的结点
 */</span>
<span class="token keyword">private</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">BSTree</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> bst<span class="token punctuation">,</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> z<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> x<span class="token operator">=</span><span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> y<span class="token operator">=</span><span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>z<span class="token punctuation">.</span>left <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>z<span class="token punctuation">.</span>right <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>
        y <span class="token operator">=</span> z<span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        y <span class="token operator">=</span> <span class="token function">successor</span><span class="token punctuation">(</span>z<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>y<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        x <span class="token operator">=</span> y<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        x <span class="token operator">=</span> y<span class="token punctuation">.</span>right<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        x<span class="token punctuation">.</span>parent <span class="token operator">=</span> y<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>y<span class="token punctuation">.</span>parent <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        bst<span class="token punctuation">.</span>mRoot <span class="token operator">=</span> x<span class="token punctuation">;</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>y <span class="token operator">==</span> y<span class="token punctuation">.</span>parent<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
        y<span class="token punctuation">.</span>parent<span class="token punctuation">.</span>left <span class="token operator">=</span> x<span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        y<span class="token punctuation">.</span>parent<span class="token punctuation">.</span>right <span class="token operator">=</span> x<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>y <span class="token operator">!=</span> z<span class="token punctuation">)</span> 
        z<span class="token punctuation">.</span>key <span class="token operator">=</span> y<span class="token punctuation">.</span>key<span class="token punctuation">;</span>

    <span class="token keyword">return</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 
 * 删除结点(z)，并返回被删除的结点
 *
 * 参数说明: 
 *     tree 二叉树的根结点
 *     z 删除的结点
 */</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">T</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> z<span class="token punctuation">,</span> node<span class="token punctuation">;</span> 

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>z <span class="token operator">=</span> <span class="token function">search</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span>node <span class="token operator">=</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> z<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            node <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="打印" tabindex="-1"><a class="header-anchor" href="#打印" aria-hidden="true">#</a> 打印</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/*
 * 打印&quot;二叉查找树&quot;
 *
 * key        -- 节点的键值 
 * direction  --  0，表示该节点是根节点;
 *               -1，表示该节点是它的父结点的左孩子;
 *                1，表示该节点是它的父结点的右孩子。
 */</span>
<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> tree<span class="token punctuation">,</span> <span class="token class-name">T</span> key<span class="token punctuation">,</span> <span class="token keyword">int</span> direction<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>tree <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>direction<span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span>    <span class="token comment">// tree是根节点</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%2d is root\\n&quot;</span><span class="token punctuation">,</span> tree<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>                <span class="token comment">// tree是分支节点</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%2d is %2d&#39;s %6s child\\n&quot;</span><span class="token punctuation">,</span> tree<span class="token punctuation">.</span>key<span class="token punctuation">,</span> key<span class="token punctuation">,</span> direction<span class="token operator">==</span><span class="token number">1</span><span class="token operator">?</span><span class="token string">&quot;right&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;left&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">print</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>left<span class="token punctuation">,</span> tree<span class="token punctuation">.</span>key<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">print</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>right<span class="token punctuation">,</span>tree<span class="token punctuation">.</span>key<span class="token punctuation">,</span>  <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>mRoot <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token function">print</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">,</span> mRoot<span class="token punctuation">.</span>key<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="销毁" tabindex="-1"><a class="header-anchor" href="#销毁" aria-hidden="true">#</a> 销毁</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/*
 * 销毁二叉树
 */
private void destroy(BSTNode&lt;T&gt; tree) {
    if (tree==null)
        return ;

    if (tree.left != null)
        destroy(tree.left);
    if (tree.right != null)
        destroy(tree.right);

    tree=null;
}

public void clear() {
    destroy(mRoot);
    mRoot = null;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="测试程序" tabindex="-1"><a class="header-anchor" href="#测试程序" aria-hidden="true">#</a> 测试程序</h2><p>下面对测试程序的流程进行分析！</p><ul><li>新建&quot;二叉查找树&quot;root。</li><li>向二叉查找树中依次插入1,5,4,3,2,6 。如下图所示:</li></ul><figure><img src="https://www.pdai.tech/images/alg/alg-tree-bst-test-1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li>遍历和查找</li></ul><p>插入1,5,4,3,2,6之后，得到的二叉查找树如下:</p><figure><img src="https://www.pdai.tech/images/alg/alg-tree-bst-test-2.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>前序遍历结果: <span class="token number">1</span> <span class="token number">5</span> <span class="token number">4</span> <span class="token number">3</span> <span class="token number">2</span> <span class="token number">6</span> 
中序遍历结果: <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span> <span class="token number">4</span> <span class="token number">5</span> <span class="token number">6</span> 
后序遍历结果: <span class="token number">2</span> <span class="token number">3</span> <span class="token number">4</span> <span class="token number">6</span> <span class="token number">5</span> <span class="token number">1</span> 
最小值是1，而最大值是6。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>删除节点4。如下图所示:</li></ul><figure><img src="https://www.pdai.tech/images/alg/alg-tree-bst-test-3.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li>重新遍历该二叉查找树。</li></ul><p>中序遍历结果: 1 2 4 5 6</p><h2 id="代码和测试代码" tabindex="-1"><a class="header-anchor" href="#代码和测试代码" aria-hidden="true">#</a> 代码和测试代码</h2><h3 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Java 语言: 二叉查找树
 *
 * <span class="token keyword">@author</span> skywang
 * <span class="token keyword">@date</span> 2013/11/07
 */</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BSTree</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">Comparable</span><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> mRoot<span class="token punctuation">;</span>    <span class="token comment">// 根结点</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">Comparable</span><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
        <span class="token class-name">T</span> key<span class="token punctuation">;</span>                <span class="token comment">// 关键字(键值)</span>
        <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> left<span class="token punctuation">;</span>    <span class="token comment">// 左孩子</span>
        <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> right<span class="token punctuation">;</span>    <span class="token comment">// 右孩子</span>
        <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> parent<span class="token punctuation">;</span>    <span class="token comment">// 父结点</span>

        <span class="token keyword">public</span> <span class="token class-name">BSTNode</span><span class="token punctuation">(</span><span class="token class-name">T</span> key<span class="token punctuation">,</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> parent<span class="token punctuation">,</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> left<span class="token punctuation">,</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> key<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>parent <span class="token operator">=</span> parent<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>left <span class="token operator">=</span> left<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>right <span class="token operator">=</span> right<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> key<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;key:&quot;</span><span class="token operator">+</span>key<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">BSTree</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mRoot<span class="token operator">=</span><span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
     * 前序遍历&quot;二叉树&quot;
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">preOrder</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> tree<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>tree <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>key<span class="token operator">+</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">preOrder</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">preOrder</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">preOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">preOrder</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
     * 中序遍历&quot;二叉树&quot;
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">inOrder</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> tree<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>tree <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">inOrder</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>key<span class="token operator">+</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">inOrder</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">inOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">inOrder</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token comment">/*
     * 后序遍历&quot;二叉树&quot;
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">postOrder</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> tree<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>tree <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">postOrder</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">postOrder</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>key<span class="token operator">+</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">postOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">postOrder</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token comment">/*
     * (递归实现)查找&quot;二叉树x&quot;中键值为key的节点
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">search</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> x<span class="token punctuation">,</span> <span class="token class-name">T</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> x<span class="token punctuation">;</span>

        <span class="token keyword">int</span> cmp <span class="token operator">=</span> key<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cmp <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token function">search</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>left<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>cmp <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token function">search</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>right<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            <span class="token keyword">return</span> x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">search</span><span class="token punctuation">(</span><span class="token class-name">T</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">search</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
     * (非递归实现)查找&quot;二叉树x&quot;中键值为key的节点
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">iterativeSearch</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> x<span class="token punctuation">,</span> <span class="token class-name">T</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>x<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> cmp <span class="token operator">=</span> key<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>cmp <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> 
                x <span class="token operator">=</span> x<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>cmp <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> 
                x <span class="token operator">=</span> x<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                <span class="token keyword">return</span> x<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">iterativeSearch</span><span class="token punctuation">(</span><span class="token class-name">T</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">iterativeSearch</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 
     * 查找最小结点: 返回tree为根结点的二叉树的最小结点。
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">minimum</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> tree<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>tree <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            tree <span class="token operator">=</span> tree<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
        <span class="token keyword">return</span> tree<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">minimum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> p <span class="token operator">=</span> <span class="token function">minimum</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> p<span class="token punctuation">.</span>key<span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
     
    <span class="token comment">/* 
     * 查找最大结点: 返回tree为根结点的二叉树的最大结点。
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">maximum</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> tree<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>tree <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            tree <span class="token operator">=</span> tree<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
        <span class="token keyword">return</span> tree<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">maximum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> p <span class="token operator">=</span> <span class="token function">maximum</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> p<span class="token punctuation">.</span>key<span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 
     * 找结点(x)的后继结点。即，查找&quot;二叉树中数据值大于该结点&quot;的&quot;最小结点&quot;。
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">successor</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果x存在右孩子，则&quot;x的后继结点&quot;为 &quot;以其右孩子为根的子树的最小结点&quot;。</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token function">minimum</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 如果x没有右孩子。则x有以下两种可能: </span>
        <span class="token comment">// (01) x是&quot;一个左孩子&quot;，则&quot;x的后继结点&quot;为 &quot;它的父结点&quot;。</span>
        <span class="token comment">// (02) x是&quot;一个右孩子&quot;，则查找&quot;x的最低的父结点，并且该父结点要具有左孩子&quot;，找到的这个&quot;最低的父结点&quot;就是&quot;x的后继结点&quot;。</span>
        <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> y <span class="token operator">=</span> x<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>y<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>x<span class="token operator">==</span>y<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            x <span class="token operator">=</span> y<span class="token punctuation">;</span>
            y <span class="token operator">=</span> y<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
     
    <span class="token comment">/* 
     * 找结点(x)的前驱结点。即，查找&quot;二叉树中数据值小于该结点&quot;的&quot;最大结点&quot;。
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">predecessor</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果x存在左孩子，则&quot;x的前驱结点&quot;为 &quot;以其左孩子为根的子树的最大结点&quot;。</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token function">maximum</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 如果x没有左孩子。则x有以下两种可能: </span>
        <span class="token comment">// (01) x是&quot;一个右孩子&quot;，则&quot;x的前驱结点&quot;为 &quot;它的父结点&quot;。</span>
        <span class="token comment">// (01) x是&quot;一个左孩子&quot;，则查找&quot;x的最低的父结点，并且该父结点要具有右孩子&quot;，找到的这个&quot;最低的父结点&quot;就是&quot;x的前驱结点&quot;。</span>
        <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> y <span class="token operator">=</span> x<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>y<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>x<span class="token operator">==</span>y<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            x <span class="token operator">=</span> y<span class="token punctuation">;</span>
            y <span class="token operator">=</span> y<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 
     * 将结点插入到二叉树中
     *
     * 参数说明: 
     *     tree 二叉树的
     *     z 插入的结点
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token class-name">BSTree</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> bst<span class="token punctuation">,</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> z<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> cmp<span class="token punctuation">;</span>
        <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> y <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> x <span class="token operator">=</span> bst<span class="token punctuation">.</span>mRoot<span class="token punctuation">;</span>

        <span class="token comment">// 查找z的插入位置</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>x <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            y <span class="token operator">=</span> x<span class="token punctuation">;</span>
            cmp <span class="token operator">=</span> z<span class="token punctuation">.</span>key<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>cmp <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
                x <span class="token operator">=</span> x<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                x <span class="token operator">=</span> x<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        z<span class="token punctuation">.</span>parent <span class="token operator">=</span> y<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>y<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span>
            bst<span class="token punctuation">.</span>mRoot <span class="token operator">=</span> z<span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token punctuation">{</span>
            cmp <span class="token operator">=</span> z<span class="token punctuation">.</span>key<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>y<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>cmp <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
                y<span class="token punctuation">.</span>left <span class="token operator">=</span> z<span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                y<span class="token punctuation">.</span>right <span class="token operator">=</span> z<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 
     * 新建结点(key)，并将其插入到二叉树中
     *
     * 参数说明: 
     *     tree 二叉树的根结点
     *     key 插入结点的键值
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token class-name">T</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> z<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>key<span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 如果新建结点失败，则返回。</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>z <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token function">insert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> z<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 
     * 删除结点(z)，并返回被删除的结点
     *
     * 参数说明: 
     *     bst 二叉树
     *     z 删除的结点
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">BSTree</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> bst<span class="token punctuation">,</span> <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> z<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> x<span class="token operator">=</span><span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> y<span class="token operator">=</span><span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>z<span class="token punctuation">.</span>left <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>z<span class="token punctuation">.</span>right <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>
            y <span class="token operator">=</span> z<span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            y <span class="token operator">=</span> <span class="token function">successor</span><span class="token punctuation">(</span>z<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>y<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            x <span class="token operator">=</span> y<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            x <span class="token operator">=</span> y<span class="token punctuation">.</span>right<span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            x<span class="token punctuation">.</span>parent <span class="token operator">=</span> y<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>y<span class="token punctuation">.</span>parent <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            bst<span class="token punctuation">.</span>mRoot <span class="token operator">=</span> x<span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>y <span class="token operator">==</span> y<span class="token punctuation">.</span>parent<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
            y<span class="token punctuation">.</span>parent<span class="token punctuation">.</span>left <span class="token operator">=</span> x<span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            y<span class="token punctuation">.</span>parent<span class="token punctuation">.</span>right <span class="token operator">=</span> x<span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>y <span class="token operator">!=</span> z<span class="token punctuation">)</span> 
            z<span class="token punctuation">.</span>key <span class="token operator">=</span> y<span class="token punctuation">.</span>key<span class="token punctuation">;</span>

        <span class="token keyword">return</span> y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 
     * 删除结点(z)，并返回被删除的结点
     *
     * 参数说明: 
     *     tree 二叉树的根结点
     *     z 删除的结点
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">T</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> z<span class="token punctuation">,</span> node<span class="token punctuation">;</span> 

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>z <span class="token operator">=</span> <span class="token function">search</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span>node <span class="token operator">=</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> z<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                node <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
     * 销毁二叉树
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> tree<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>tree<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>tree<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token function">destroy</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>tree<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token function">destroy</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>

        tree<span class="token operator">=</span><span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">destroy</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">)</span><span class="token punctuation">;</span>
        mRoot <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
     * 打印&quot;二叉查找树&quot;
     *
     * key        -- 节点的键值 
     * direction  --  0，表示该节点是根节点;
     *               -1，表示该节点是它的父结点的左孩子;
     *                1，表示该节点是它的父结点的右孩子。
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name">BSTNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> tree<span class="token punctuation">,</span> <span class="token class-name">T</span> key<span class="token punctuation">,</span> <span class="token keyword">int</span> direction<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>tree <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token keyword">if</span><span class="token punctuation">(</span>direction<span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span>    <span class="token comment">// tree是根节点</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%2d is root\\n&quot;</span><span class="token punctuation">,</span> tree<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>                <span class="token comment">// tree是分支节点</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%2d is %2d&#39;s %6s child\\n&quot;</span><span class="token punctuation">,</span> tree<span class="token punctuation">.</span>key<span class="token punctuation">,</span> key<span class="token punctuation">,</span> direction<span class="token operator">==</span><span class="token number">1</span><span class="token operator">?</span><span class="token string">&quot;right&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;left&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token function">print</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>left<span class="token punctuation">,</span> tree<span class="token punctuation">.</span>key<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">print</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>right<span class="token punctuation">,</span>tree<span class="token punctuation">.</span>key<span class="token punctuation">,</span>  <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>mRoot <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token function">print</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">,</span> mRoot<span class="token punctuation">.</span>key<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试代码" tabindex="-1"><a class="header-anchor" href="#测试代码" aria-hidden="true">#</a> 测试代码</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Java 语言: 二叉查找树
 *
 * <span class="token keyword">@author</span> skywang
 * <span class="token keyword">@date</span> 2013/11/07
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BSTreeTest</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> arr<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> i<span class="token punctuation">,</span> ilen<span class="token punctuation">;</span>
        <span class="token class-name">BSTree</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> tree<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">BSTree</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;== 依次添加: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ilen <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>ilen<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">+</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            tree<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n== 前序遍历: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        tree<span class="token punctuation">.</span><span class="token function">preOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n== 中序遍历: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        tree<span class="token punctuation">.</span><span class="token function">inOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n== 后序遍历: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        tree<span class="token punctuation">.</span><span class="token function">postOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;== 最小值: &quot;</span><span class="token operator">+</span> tree<span class="token punctuation">.</span><span class="token function">minimum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;== 最大值: &quot;</span><span class="token operator">+</span> tree<span class="token punctuation">.</span><span class="token function">maximum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;== 树的详细信息: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        tree<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n== 删除根节点: &quot;</span><span class="token operator">+</span> arr<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        tree<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n== 中序遍历: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        tree<span class="token punctuation">.</span><span class="token function">inOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 销毁二叉树</span>
        tree<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试结果" tabindex="-1"><a class="header-anchor" href="#测试结果" aria-hidden="true">#</a> 测试结果</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">==</span> 依次添加: <span class="token number">1</span> <span class="token number">5</span> <span class="token number">4</span> <span class="token number">3</span> <span class="token number">2</span> <span class="token number">6</span> 
<span class="token operator">==</span> 前序遍历: <span class="token number">1</span> <span class="token number">5</span> <span class="token number">4</span> <span class="token number">3</span> <span class="token number">2</span> <span class="token number">6</span> 
<span class="token operator">==</span> 中序遍历: <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span> <span class="token number">4</span> <span class="token number">5</span> <span class="token number">6</span> 
<span class="token operator">==</span> 后序遍历: <span class="token number">2</span> <span class="token number">3</span> <span class="token number">4</span> <span class="token number">6</span> <span class="token number">5</span> <span class="token number">1</span> 
<span class="token operator">==</span> 最小值: <span class="token number">1</span>
<span class="token operator">==</span> 最大值: <span class="token number">6</span>
<span class="token operator">==</span> 树的详细信息: 
is root
is  <span class="token number">1</span><span class="token string">&#39;s  right child
is  5&#39;</span>s   left child
is  <span class="token number">4</span><span class="token string">&#39;s   left child
is  3&#39;</span>s   left child
is  <span class="token number">5</span>&#39;s  right child

<span class="token operator">==</span> 删除根节点: <span class="token number">3</span>
<span class="token operator">==</span> 中序遍历: <span class="token number">1</span> <span class="token number">2</span> <span class="token number">4</span> <span class="token number">5</span> <span class="token number">6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="bst相关题目" tabindex="-1"><a class="header-anchor" href="#bst相关题目" aria-hidden="true">#</a> BST相关题目</h2><p>二叉查找树(BST): 根节点大于等于左子树所有节点，小于等于右子树所有节点。</p><p>二叉查找树中序遍历有序。</p><p><strong>修剪二叉查找树</strong></p>`,74),d={href:"https://leetcode.com/problems/trim-a-binary-search-tree/description/",target:"_blank",rel:"noopener noreferrer"},v=t(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>Input:

    3
   / \\
  0   4
   \\
    2
   /
  1

  L = 1
  R = 3

Output:

      3
     /
   2
  /
 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>题目描述: 只保留值在 L ~ R 之间的节点</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">TreeNode</span> <span class="token function">trimBST</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">,</span> <span class="token keyword">int</span> <span class="token class-name">L</span><span class="token punctuation">,</span> <span class="token keyword">int</span> <span class="token class-name">R</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">&gt;</span> <span class="token class-name">R</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">trimBST</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">,</span> <span class="token class-name">L</span><span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">&lt;</span> <span class="token class-name">L</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">trimBST</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">,</span> <span class="token class-name">L</span><span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    root<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token function">trimBST</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">,</span> <span class="token class-name">L</span><span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    root<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token function">trimBST</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">,</span> <span class="token class-name">L</span><span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> root<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>寻找二叉查找树的第 k 个元素</strong></p>`,4),m={href:"https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/",target:"_blank",rel:"noopener noreferrer"},b=t(`<p>中序遍历解法:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">int</span> cnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> val<span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">kthSmallest</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">inOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> k<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> val<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">inOrder</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> node<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token function">inOrder</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">,</span> k<span class="token punctuation">)</span><span class="token punctuation">;</span>
    cnt<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cnt <span class="token operator">==</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        val <span class="token operator">=</span> node<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">inOrder</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">,</span> k<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>递归解法:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">kthSmallest</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> leftCnt <span class="token operator">=</span> <span class="token function">count</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>leftCnt <span class="token operator">==</span> k <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> root<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>leftCnt <span class="token operator">&gt;</span> k <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">kthSmallest</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">,</span> k<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">kthSmallest</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">,</span> k <span class="token operator">-</span> leftCnt <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token function">count</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">count</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>把二叉查找树每个节点的值都加上比它大的节点的值</strong></p>`,5),y={href:"https://leetcode.com/problems/convert-bst-to-greater-tree/description/",target:"_blank",rel:"noopener noreferrer"},g=t(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>Input: The root of a Binary Search Tree like this:

              5
            /   \\
           2     13

Output: The root of a Greater Tree like this:

             18
            /   \\
          20     13
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先遍历右子树。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token class-name">TreeNode</span> <span class="token function">convertBST</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">traver</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> root<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">traver</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token function">traver</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
    sum <span class="token operator">+=</span> node<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
    node<span class="token punctuation">.</span>val <span class="token operator">=</span> sum<span class="token punctuation">;</span>
    <span class="token function">traver</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>二叉查找树的最近公共祖先</strong></p>`,4),w={href:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/",target:"_blank",rel:"noopener noreferrer"},f=t(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>        _______6______
      /                \\
  ___2__             ___8__
 /      \\           /      \\
0        4         7        9
        /  \\
       3   5

For example, the lowest common ancestor (LCA) of nodes 2 and 8 is 6. Another example is LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root.val &gt; p.val &amp;&amp; root.val &gt; q.val) return lowestCommonAncestor(root.left, p, q);
    if (root.val &lt; p.val &amp;&amp; root.val &lt; q.val) return lowestCommonAncestor(root.right, p, q);
    return root;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>二叉树的最近公共祖先</strong></p>`,2),h={href:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/",target:"_blank",rel:"noopener noreferrer"},T=t(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>       _______3______
      /              \\
  ___5__           ___1__
 /      \\         /      \\
6        2       0        8
        /  \\
       7    4

For example, the lowest common ancestor (LCA) of nodes 5 and 1 is 3. Another example is LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    return left == null ? right : right == null ? left : root;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>从有序数组中构造二叉查找树</strong></p>`,2),x={href:"https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/",target:"_blank",rel:"noopener noreferrer"},S=t(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">TreeNode</span> <span class="token function">sortedArrayToBST</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">toBST</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token class-name">TreeNode</span> <span class="token function">toBST</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">,</span> <span class="token keyword">int</span> sIdx<span class="token punctuation">,</span> <span class="token keyword">int</span> eIdx<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>sIdx <span class="token operator">&gt;</span> eIdx<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> mIdx <span class="token operator">=</span> <span class="token punctuation">(</span>sIdx <span class="token operator">+</span> eIdx<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token class-name">TreeNode</span> root <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeNode</span><span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mIdx<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    root<span class="token punctuation">.</span>left <span class="token operator">=</span>  <span class="token function">toBST</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> sIdx<span class="token punctuation">,</span> mIdx <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    root<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token function">toBST</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> mIdx <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> eIdx<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> root<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>根据有序链表构造平衡的二叉查找树</strong></p>`,2),q={href:"https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/description/",target:"_blank",rel:"noopener noreferrer"},B=t(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>Given the sorted linked list: [-10,-3,0,5,9],

One possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:

      0
     / \\
   -3   9
   /   /
 -10  5
public TreeNode sortedListToBST(ListNode head) {
    if (head == null) return null;
    if (head.next == null) return new TreeNode(head.val);
    ListNode preMid = preMid(head);
    ListNode mid = preMid.next;
    preMid.next = null;  // 断开链表
    TreeNode t = new TreeNode(mid.val);
    t.left = sortedListToBST(head);
    t.right = sortedListToBST(mid.next);
    return t;
}

private ListNode preMid(ListNode head) {
    ListNode slow = head, fast = head.next;
    ListNode pre = head;
    while (fast != null &amp;&amp; fast.next != null) {
        pre = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    return pre;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在二叉查找树中寻找两个节点，使它们的和为一个给定值</strong></p>`,2),N={href:"https://leetcode.com/problems/two-sum-iv-input-is-a-bst/description/",target:"_blank",rel:"noopener noreferrer"},_=t(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>Input:

    5
   / \\
  3   6
 / \\   \\
2   4   7

Target = 9

Output: True
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用中序遍历得到有序数组之后，再利用双指针对数组进行查找。</p><p>应该注意到，这一题不能用分别在左右子树两部分来处理这种思想，因为两个待求的节点可能分别在左右子树中。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">findTarget</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> nums <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">inOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> nums<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> j <span class="token operator">=</span> nums<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> sum <span class="token operator">=</span> nums<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">+</span> nums<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>sum <span class="token operator">==</span> k<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>sum <span class="token operator">&lt;</span> k<span class="token punctuation">)</span> i<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> j<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">inOrder</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token function">inOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">,</span> nums<span class="token punctuation">)</span><span class="token punctuation">;</span>
    nums<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">inOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">,</span> nums<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在二叉查找树中查找两个节点之差的最小绝对值</strong></p>`,5),j={href:"https://leetcode.com/problems/minimum-absolute-difference-in-bst/description/",target:"_blank",rel:"noopener noreferrer"},z=t(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>Input:

   1
    \\
     3
    /
   2

Output:

1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用二叉查找树的中序遍历为有序的性质，计算中序遍历中临近的两个节点之差的绝对值，取最小值。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">int</span> minDiff <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">TreeNode</span> preNode <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getMinimumDifference</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">inOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> minDiff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">inOrder</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token function">inOrder</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>preNode <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> minDiff <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>minDiff<span class="token punctuation">,</span> node<span class="token punctuation">.</span>val <span class="token operator">-</span> preNode<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    preNode <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token function">inOrder</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>寻找二叉查找树中出现次数最多的值</strong></p>`,4),O={href:"https://leetcode.com/problems/find-mode-in-binary-search-tree/description/",target:"_blank",rel:"noopener noreferrer"},R=t(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>   1
    \\
     2
    /
   2

return [2].
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>答案可能不止一个，也就是有多个值出现的次数一样多。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">int</span> curCnt <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> maxCnt <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">TreeNode</span> preNode <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">findMode</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> maxCntNums <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">inOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> maxCntNums<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> ret <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>maxCntNums<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> idx <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> maxCntNums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ret<span class="token punctuation">[</span>idx<span class="token operator">++</span><span class="token punctuation">]</span> <span class="token operator">=</span> num<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">inOrder</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> node<span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token function">inOrder</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">,</span> nums<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>preNode <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>preNode<span class="token punctuation">.</span>val <span class="token operator">==</span> node<span class="token punctuation">.</span>val<span class="token punctuation">)</span> curCnt<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> curCnt <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>curCnt <span class="token operator">&gt;</span> maxCnt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        maxCnt <span class="token operator">=</span> curCnt<span class="token punctuation">;</span>
        nums<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        nums<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>curCnt <span class="token operator">==</span> maxCnt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        nums<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    preNode <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token function">inOrder</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">,</span> nums<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,4),C={href:"https://www.cnblogs.com/skywang12345/p/3576452.html%EF%BC%8C%E5%9C%A8%E6%AD%A4%E5%9F%BA%E7%A1%80%E4%B8%8A%E9%87%8D%E6%96%B0%E7%BB%84%E7%BB%87%E5%92%8C%E5%A2%9E%E5%8A%A0%E4%BA%86%E5%86%85%E5%AE%B9%E3%80%82",target:"_blank",rel:"noopener noreferrer"},L={href:"http://www.sohu.com/a/113502963_464041",target:"_blank",rel:"noopener noreferrer"},A={href:"https://www.cnblogs.com/QG-whz/p/5168620.html",target:"_blank",rel:"noopener noreferrer"},E={href:"https://blog.csdn.net/isea533/article/details/80345507",target:"_blank",rel:"noopener noreferrer"};function I(M,D){const a=o("ExternalLinkIcon");return c(),l("div",null,[u,n("p",null,[s("动画效果请参考 "),n("a",k,[s("BST在新窗口打开"),p(a)])]),r,n("p",null,[n("a",d,[s("669. Trim a Binary Search Tree (Easy)在新窗口打开"),p(a)])]),v,n("p",null,[n("a",m,[s("230. Kth Smallest Element in a BST (Medium)在新窗口打开"),p(a)])]),b,n("p",null,[n("a",y,[s("Convert BST to Greater Tree (Easy)在新窗口打开"),p(a)])]),g,n("p",null,[n("a",w,[s("235. Lowest Common Ancestor of a Binary Search Tree (Easy)在新窗口打开"),p(a)])]),f,n("p",null,[n("a",h,[s("236. Lowest Common Ancestor of a Binary Tree (Medium) 在新窗口打开"),p(a)])]),T,n("p",null,[n("a",x,[s("108. Convert Sorted Array to Binary Search Tree (Easy)在新窗口打开"),p(a)])]),S,n("p",null,[n("a",q,[s("109. Convert Sorted List to Binary Search Tree (Medium)在新窗口打开"),p(a)])]),B,n("p",null,[n("a",N,[s("653. Two Sum IV - Input is a BST (Easy)在新窗口打开"),p(a)])]),_,n("p",null,[n("a",j,[s("530. Minimum Absolute Difference in BST (Easy)在新窗口打开"),p(a)])]),z,n("p",null,[n("a",O,[s("501. Find Mode in Binary Search Tree (Easy)在新窗口打开"),p(a)])]),R,n("blockquote",null,[n("p",null,[s("本文主要来源于@skywang12345的"),n("a",C,[s("https://www.cnblogs.com/skywang12345/p/3576452.html，在此基础上重新组织和增加了内容。"),p(a)])])]),n("p",null,[n("a",L,[s("http://www.sohu.com/a/113502963_464041"),p(a)])]),n("p",null,[n("a",A,[s("https://www.cnblogs.com/QG-whz/p/5168620.html"),p(a)])]),n("p",null,[n("a",E,[s("https://blog.csdn.net/isea533/article/details/80345507"),p(a)])])])}const G=e(i,[["render",I],["__file","alg-basic-tree-search.html.vue"]]);export{G as default};
