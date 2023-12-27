import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as e,o,c,a as n,b as a,d as t,f as l}from"./app-5g2Grfu7.js";const i={},u=l(`<h1 id="树-哈夫曼树-huffman-tree" tabindex="-1"><a class="header-anchor" href="#树-哈夫曼树-huffman-tree" aria-hidden="true">#</a> 树 - 哈夫曼树(Huffman Tree)</h1><blockquote><p>哈夫曼又称最优二叉树, 是一种带权路径长度最短的二叉树。(注意带权路径WPL是指叶子节点，很多网上的文章有误导)</p></blockquote><h2 id="哈夫曼树相关名词" tabindex="-1"><a class="header-anchor" href="#哈夫曼树相关名词" aria-hidden="true">#</a> 哈夫曼树相关名词</h2><p>先看一棵哈夫曼树: (哈夫曼树推理是通过叶子节点，所以理解的时候需要忽略非叶子节点，很多文章在这点上有误导)</p><figure><img src="https://www.pdai.tech/images/alg/alg-tree-hafman-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li><code>路径与路径长度</code>: 从树中一个节点到另一个节点之间的分支构成了两个节点之间的路径，路径上的分支数目称作路径长度。若规定根节点位于第一层，则根节点到第H层的节点的路径长度为H-1。如到40 的路径长度为1；30的路径长度为2；20的路径长度为3。</li><li><code>节点的权</code>: 将树中的节点赋予一个某种含义的数值作为该节点的权值，该值称为节点的权；</li><li><code>带权路径长度</code>: 从根节点到某个节点之间的路径长度与该节点的权的乘积。例如上图节点10的路径长度为3,它的带权路径长度为10 * 3 = 30；</li><li><code>树的带权路径长度</code>: 树的带权路径长度为所有叶子节点的带权路径长度之和，称为WPL。上图的WPL = 1x40+2x30+3x10+3x20 = 190，而哈夫曼树就是树的带权路径最小的二叉树。</li></ul><h2 id="哈夫曼树的构建" tabindex="-1"><a class="header-anchor" href="#哈夫曼树的构建" aria-hidden="true">#</a> 哈夫曼树的构建</h2><p>假设有n个权值，则构造出的哈夫曼树有n个叶子结点。 n个权值分别设为 w1、w2、…、wn，哈夫曼树的构造规则为:</p><ul><li>将w1、w2、…，wn看成是有n 棵树的森林(每棵树仅有一个结点)；</li><li>在森林中选出根结点的权值最小的两棵树进行合并，作为一棵新树的左、右子树，且新树的根结点权值为其左、右子树根结点权值之和；</li><li>从森林中删除选取的两棵树，并将新树加入森林；</li><li>重复上面两步，直到森林中只剩一棵树为止，该树即为所求得的哈夫曼树。</li></ul><p>上图中，它的叶子节点为{10，20，30，40}，以这4个权值构建哈夫曼树的过程为:</p><figure><img src="https://www.pdai.tech/images/alg/alg-tree-hafman-2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="哈夫曼编码" tabindex="-1"><a class="header-anchor" href="#哈夫曼编码" aria-hidden="true">#</a> 哈夫曼编码</h2><p>为{10，20，30，40}这四个权值构建了哈夫曼编码后，我们可以由如下规则获得它们的哈夫曼编码:</p><p>从根节点到每一个叶子节点的路径上，左分支记为0，右分支记为1，将这些0与1连起来即为叶子节点的哈夫曼编码。如下图:</p><table><thead><tr><th>(字母)权值</th><th>编码</th></tr></thead><tbody><tr><td>10</td><td>100</td></tr><tr><td>20</td><td>101</td></tr><tr><td>30</td><td>11</td></tr><tr><td>40</td><td>0</td></tr><tr><td>由此可见，出现频率越高的字母(也即权值越大)，其编码越短。这便使编码之后的字符串的平均长度、期望值降低，从而达到无损压缩数据的目的。</td><td></td></tr></tbody></table><p>具体流程如下:</p><figure><img src="https://www.pdai.tech/images/alg/alg-tree-hafman-5.jpeg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="哈夫曼树的实现" tabindex="-1"><a class="header-anchor" href="#哈夫曼树的实现" aria-hidden="true">#</a> 哈夫曼树的实现</h2><p>哈夫曼树的重点是如何构造哈夫曼树。本文构造哈夫曼时，用到了&quot;(二叉堆)最小堆&quot;。下面对哈夫曼树进行讲解。</p><ul><li>哈夫曼树节点</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HuffmanNode</span> <span class="token keyword">implements</span> <span class="token class-name">Comparable</span><span class="token punctuation">,</span> <span class="token class-name">Cloneable</span> <span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token keyword">int</span> key<span class="token punctuation">;</span>              <span class="token comment">// 权值</span>
    <span class="token keyword">protected</span> <span class="token class-name">HuffmanNode</span> left<span class="token punctuation">;</span>     <span class="token comment">// 左孩子</span>
    <span class="token keyword">protected</span> <span class="token class-name">HuffmanNode</span> right<span class="token punctuation">;</span>    <span class="token comment">// 右孩子</span>
    <span class="token keyword">protected</span> <span class="token class-name">HuffmanNode</span> parent<span class="token punctuation">;</span>   <span class="token comment">// 父结点</span>

    <span class="token keyword">protected</span> <span class="token class-name">HuffmanNode</span><span class="token punctuation">(</span><span class="token keyword">int</span> key<span class="token punctuation">,</span> <span class="token class-name">HuffmanNode</span> left<span class="token punctuation">,</span> <span class="token class-name">HuffmanNode</span> right<span class="token punctuation">,</span> <span class="token class-name">HuffmanNode</span> parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> key<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>left <span class="token operator">=</span> left<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>right <span class="token operator">=</span> right<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>parent <span class="token operator">=</span> parent<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Object</span> obj<span class="token operator">=</span><span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            obj <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HuffmanNode</span><span class="token punctuation">)</span><span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Object 中的clone()识别出你要复制的是哪一个对象。    </span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">CloneNotSupportedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> obj<span class="token punctuation">;</span>    
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compareTo</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">-</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">HuffmanNode</span><span class="token punctuation">)</span>obj<span class="token punctuation">)</span><span class="token punctuation">.</span>key<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>哈夫曼树</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Collections</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Huffman</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token class-name">HuffmanNode</span> mRoot<span class="token punctuation">;</span>	<span class="token comment">// 根结点</span>

	<span class="token comment">/* 
	 * 创建Huffman树
	 *
	 * @param 权值数组
	 */</span>
	<span class="token keyword">public</span> <span class="token class-name">Huffman</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">HuffmanNode</span> parent <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
		<span class="token class-name">MinHeap</span> heap<span class="token punctuation">;</span>

		<span class="token comment">// 建立数组a对应的最小堆</span>
		heap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MinHeap</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
	 
		<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>a<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>   
        	<span class="token class-name">HuffmanNode</span> left <span class="token operator">=</span> heap<span class="token punctuation">.</span><span class="token function">dumpFromMinimum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 最小节点是左孩子</span>
        	<span class="token class-name">HuffmanNode</span> right <span class="token operator">=</span> heap<span class="token punctuation">.</span><span class="token function">dumpFromMinimum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 其次才是右孩子</span>
	 
			<span class="token comment">// 新建parent节点，左右孩子分别是left/right；</span>
			<span class="token comment">// parent的大小是左右孩子之和</span>
			parent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HuffmanNode</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span>key<span class="token operator">+</span>right<span class="token punctuation">.</span>key<span class="token punctuation">,</span> left<span class="token punctuation">,</span> right<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			left<span class="token punctuation">.</span>parent <span class="token operator">=</span> parent<span class="token punctuation">;</span>
			right<span class="token punctuation">.</span>parent <span class="token operator">=</span> parent<span class="token punctuation">;</span>

			<span class="token comment">// 将parent节点数据拷贝到&quot;最小堆&quot;中</span>
			heap<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>parent<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		mRoot <span class="token operator">=</span> parent<span class="token punctuation">;</span>

		<span class="token comment">// 销毁最小堆</span>
		heap<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">/*
	 * 前序遍历&quot;Huffman树&quot;
	 */</span>
	<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">preOrder</span><span class="token punctuation">(</span><span class="token class-name">HuffmanNode</span> tree<span class="token punctuation">)</span> <span class="token punctuation">{</span>
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
	 * 中序遍历&quot;Huffman树&quot;
	 */</span>
	<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">inOrder</span><span class="token punctuation">(</span><span class="token class-name">HuffmanNode</span> tree<span class="token punctuation">)</span> <span class="token punctuation">{</span>
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
	 * 后序遍历&quot;Huffman树&quot;
	 */</span>
	<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">postOrder</span><span class="token punctuation">(</span><span class="token class-name">HuffmanNode</span> tree<span class="token punctuation">)</span> <span class="token punctuation">{</span>
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
	 * 销毁Huffman树
	 */</span>
	<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token class-name">HuffmanNode</span> tree<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>tree<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span> <span class="token punctuation">;</span>

		<span class="token keyword">if</span> <span class="token punctuation">(</span>tree<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
			<span class="token function">destroy</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>tree<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
			<span class="token function">destroy</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>

		tree<span class="token operator">=</span><span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">destroy</span><span class="token punctuation">(</span>mRoot<span class="token punctuation">)</span><span class="token punctuation">;</span>
		mRoot <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">/*
	 * 打印&quot;Huffman树&quot;
	 *
	 * key        -- 节点的键值 
	 * direction  --  0，表示该节点是根节点;
	 *               -1，表示该节点是它的父结点的左孩子;
	 *                1，表示该节点是它的父结点的右孩子。
	 */</span>
	<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name">HuffmanNode</span> tree<span class="token punctuation">,</span> <span class="token keyword">int</span> key<span class="token punctuation">,</span> <span class="token keyword">int</span> direction<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">if</span><span class="token punctuation">(</span>tree <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

			<span class="token keyword">if</span><span class="token punctuation">(</span>direction<span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span>	<span class="token comment">// tree是根节点</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%2d is root\\n&quot;</span><span class="token punctuation">,</span> tree<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">else</span>				<span class="token comment">// tree是分支节点</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>最小堆</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MinHeap</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">HuffmanNode</span><span class="token punctuation">&gt;</span></span> mHeap<span class="token punctuation">;</span>		<span class="token comment">// 存放堆的数组</span>

	<span class="token comment">/* 
	 * 创建最小堆
	 *
	 * 参数说明：
	 *     a -- 数据所在的数组
	 */</span>
	<span class="token keyword">protected</span> <span class="token class-name">MinHeap</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		mHeap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">HuffmanNode</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 初始化数组</span>
		<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>a<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		    <span class="token class-name">HuffmanNode</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HuffmanNode</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			mHeap<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 从(size/2-1) --&gt; 0逐次遍历。遍历之后，得到的数组实际上是一个最小堆。</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> a<span class="token punctuation">.</span>length <span class="token operator">/</span> <span class="token number">2</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span>
			<span class="token function">filterdown</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> a<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">/* 
	 * 最小堆的向下调整算法
	 *
	 * 注：数组实现的堆中，第N个节点的左孩子的索引值是(2N+1)，右孩子的索引是(2N+2)。
	 *
	 * 参数说明：
	 *     start -- 被下调节点的起始位置(一般为0，表示从第1个开始)
	 *     end   -- 截至范围(一般为数组中最后一个元素的索引)
	 */</span>
	<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">filterdown</span><span class="token punctuation">(</span><span class="token keyword">int</span> start<span class="token punctuation">,</span> <span class="token keyword">int</span> end<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">int</span> c <span class="token operator">=</span> start<span class="token punctuation">;</span> 	 	<span class="token comment">// 当前(current)节点的位置</span>
		<span class="token keyword">int</span> l <span class="token operator">=</span> <span class="token number">2</span><span class="token operator">*</span>c <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> 	<span class="token comment">// 左(left)孩子的位置</span>
		<span class="token class-name">HuffmanNode</span> tmp <span class="token operator">=</span> mHeap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// 当前(current)节点</span>

		<span class="token keyword">while</span><span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> end<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// &quot;l&quot;是左孩子，&quot;l+1&quot;是右孩子</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">&lt;</span> end <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>mHeap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>l<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>mHeap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>l<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
				l<span class="token operator">++</span><span class="token punctuation">;</span>		<span class="token comment">// 左右两孩子中选择较小者，即mHeap[l+1]</span>

			<span class="token keyword">int</span> cmp <span class="token operator">=</span> tmp<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>mHeap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>l<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span>cmp <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>		<span class="token comment">//调整结束</span>
			<span class="token keyword">else</span> <span class="token punctuation">{</span>
				mHeap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> mHeap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>l<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				c <span class="token operator">=</span> l<span class="token punctuation">;</span>
				l <span class="token operator">=</span> <span class="token number">2</span><span class="token operator">*</span>l <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>   
			<span class="token punctuation">}</span>       
		<span class="token punctuation">}</span>   
		mHeap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> tmp<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token comment">/*
	 * 最小堆的向上调整算法(从start开始向上直到0，调整堆)
	 *
	 * 注：数组实现的堆中，第N个节点的左孩子的索引值是(2N+1)，右孩子的索引是(2N+2)。
	 *
	 * 参数说明：
	 *     start -- 被上调节点的起始位置(一般为数组中最后一个元素的索引)
	 */</span>
	<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">filterup</span><span class="token punctuation">(</span><span class="token keyword">int</span> start<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">int</span> c <span class="token operator">=</span> start<span class="token punctuation">;</span>			<span class="token comment">// 当前节点(current)的位置</span>
		<span class="token keyword">int</span> p <span class="token operator">=</span> <span class="token punctuation">(</span>c<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>		<span class="token comment">// 父(parent)结点的位置 </span>
		<span class="token class-name">HuffmanNode</span> tmp <span class="token operator">=</span> mHeap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// 当前(current)节点</span>

		<span class="token keyword">while</span><span class="token punctuation">(</span>c <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">int</span> cmp <span class="token operator">=</span> mHeap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>tmp<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span>cmp <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">else</span> <span class="token punctuation">{</span>
				mHeap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> mHeap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				c <span class="token operator">=</span> p<span class="token punctuation">;</span>
				p <span class="token operator">=</span> <span class="token punctuation">(</span>p<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>   
			<span class="token punctuation">}</span>       
		<span class="token punctuation">}</span>
		mHeap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> tmp<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span> 
 
	<span class="token comment">/* 
	 * 将node插入到二叉堆中
	 */</span>
	<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token class-name">HuffmanNode</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">int</span> size <span class="token operator">=</span> mHeap<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		mHeap<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// 将&quot;数组&quot;插在表尾</span>
		<span class="token function">filterup</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>		<span class="token comment">// 向上调整堆</span>
	<span class="token punctuation">}</span>

	<span class="token comment">/*
	 * 交换两个HuffmanNode节点的全部数据
	 */</span>
	<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">swapNode</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">HuffmanNode</span> tmp <span class="token operator">=</span> mHeap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
		mHeap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> mHeap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		mHeap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>j<span class="token punctuation">,</span> tmp<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">/* 
	 * 新建一个节点，并将最小堆中最小节点的数据复制给该节点。
	 * 然后除最小节点之外的数据重新构造成最小堆。
	 *
	 * 返回值：
	 *     失败返回null。
	 */</span>
	<span class="token keyword">protected</span> <span class="token class-name">HuffmanNode</span> <span class="token function">dumpFromMinimum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">int</span> size <span class="token operator">=</span> mHeap<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">// 如果&quot;堆&quot;已空，则返回</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>size <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

		<span class="token comment">// 将&quot;最小节点&quot;克隆一份，将克隆得到的对象赋值给node</span>
		<span class="token class-name">HuffmanNode</span> node <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HuffmanNode</span><span class="token punctuation">)</span>mHeap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">// 交换&quot;最小节点&quot;和&quot;最后一个节点&quot;</span>
		mHeap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> mHeap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>size<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 删除最后的元素</span>
		mHeap<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>size<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token keyword">if</span> <span class="token punctuation">(</span>mHeap<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span>
			<span class="token function">filterdown</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> mHeap<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token keyword">return</span> node<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 销毁最小堆</span>
	<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		mHeap<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		mHeap <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="哈夫曼树测试" tabindex="-1"><a class="header-anchor" href="#哈夫曼树测试" aria-hidden="true">#</a> 哈夫曼树测试</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HuffmanTest</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> a<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">int</span> i<span class="token punctuation">;</span>
		<span class="token class-name">Huffman</span> tree<span class="token punctuation">;</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;== 添加数组: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>a<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> 
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">+</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	
		<span class="token comment">// 创建数组a对应的Huffman树</span>
		tree <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Huffman</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n== 前序遍历: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		tree<span class="token punctuation">.</span><span class="token function">preOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n== 中序遍历: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		tree<span class="token punctuation">.</span><span class="token function">inOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n== 后序遍历: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		tree<span class="token punctuation">.</span><span class="token function">postOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;== 树的详细信息: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		tree<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">// 销毁二叉树</span>
		tree<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,28),k={href:"https://www.cnblogs.com/QG-whz/p/5175485.html",target:"_blank",rel:"noopener noreferrer"},r={href:"https://www.cnblogs.com/skywang12345/p/3706833.html",target:"_blank",rel:"noopener noreferrer"},d={href:"http://c.biancheng.net/view/3398.html",target:"_blank",rel:"noopener noreferrer"};function m(v,b){const s=e("ExternalLinkIcon");return o(),c("div",null,[u,n("ul",null,[n("li",null,[n("a",k,[a("https://www.cnblogs.com/QG-whz/p/5175485.html"),t(s)])]),n("li",null,[n("a",r,[a("https://www.cnblogs.com/skywang12345/p/3706833.html"),t(s)])]),n("li",null,[n("a",d,[a("http://c.biancheng.net/view/3398.html"),t(s)])])])])}const w=p(i,[["render",m],["__file","alg-basic-tree-hafman.html.vue"]]);export{w as default};
