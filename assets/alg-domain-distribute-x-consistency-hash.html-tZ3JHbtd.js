import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as p,c as l,a,b as n,d as e,f as o}from"./app-pgelmVnX.js";const c={},r=o(`<h1 id="分布式算法-一致性hash算法" tabindex="-1"><a class="header-anchor" href="#分布式算法-一致性hash算法" aria-hidden="true">#</a> 分布式算法 - 一致性Hash算法</h1><blockquote><p>一致性Hash算法是个经典算法，Hash环的引入是为解决<code>单调性(Monotonicity)</code>的问题；虚拟节点的引入是为了解决<code>平衡性(Balance)</code>问题。</p></blockquote><h2 id="一致性hash算法引入" tabindex="-1"><a class="header-anchor" href="#一致性hash算法引入" aria-hidden="true">#</a> 一致性Hash算法引入</h2><p>在分布式集群中，对机器的添加删除，或者机器故障后自动脱离集群这些操作是分布式集群管理最基本的功能。如果采用常用的hash(object)%N算法，那么在有机器添加或者删除后，很多原有的数据就无法找到了，这样严重的违反了单调性原则。</p><h2 id="一致性hash算法简介" tabindex="-1"><a class="header-anchor" href="#一致性hash算法简介" aria-hidden="true">#</a> 一致性Hash算法简介</h2><p>一致性哈希算法在1997年由麻省理工学院提出的一种分布式哈希(DHT)实现算法，设计目标是为了解决因特网中的热点(Hot spot)问题，初衷和CARP十分类似。一致性哈希修正了CARP使用的简 单哈希算法带来的问题，使得分布式哈希(DHT)可以在P2P环境中真正得到应用。</p><p>一致性hash算法提出了在动态变化的Cache环境中，判定哈希算法好坏的四个定义:</p><ul><li><code>平衡性(Balance)</code>: 平衡性是指哈希的结果能够尽可能分布到所有的缓冲中去，这样可以使得所有的缓冲空间都得到利用。很多哈希算法都能够满足这一条件。</li><li><code>单调性(Monotonicity)</code>: 单调性是指如果已经有一些内容通过哈希分派到了相应的缓冲中，又有新的缓冲加入到系统中。哈希的结果应能够保证原有已分配的内容可以被映射到原有的或者新的缓冲中去，而不会被映射到旧的缓冲集合中的其他缓冲区。</li><li><code>分散性(Spread)</code>: 在分布式环境中，终端有可能看不到所有的缓冲，而是只能看到其中的一部分。当终端希望通过哈希过程将内容映射到缓冲上时，由于不同终端所见的缓冲范围有可能不同，从而导致哈希的结果不一致，最终的结果是相同的内容被不同的终端映射到不同的缓冲区中。这种情况显然是应该避免的，因为它导致相同内容被存储到不同缓冲中去，降低了系统存储的效率。分散性的定义就是上述情况发生的严重程度。好的哈希算法应能够尽量避免不一致的情况发生，也就是尽量降低分散性。</li><li><code>负载(Load)</code>: 负载问题实际上是从另一个角度看待分散性问题。既然不同的终端可能将相同的内容映射到不同的缓冲区中，那么对于一个特定的缓冲区而言，也可能被不同的用户映射为不同 的内容。与分散性一样，这种情况也是应当避免的，因此好的哈希算法应能够尽量降低缓冲的负荷。</li></ul><h2 id="一致性hash算法" tabindex="-1"><a class="header-anchor" href="#一致性hash算法" aria-hidden="true">#</a> 一致性Hash算法</h2><h3 id="hash环" tabindex="-1"><a class="header-anchor" href="#hash环" aria-hidden="true">#</a> Hash环</h3><p>使用常见的hash算法可以把一个key值哈希到一个具有2^32个桶的空间中。也可以理解成，将key值哈希到 [0, 2^32) 的一个数字空间中。 我们假设这个是个首尾连接的环形空间。如下图:</p><figure><img src="https://www.pdai.tech/images/alg/alg-dist-hash-1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>假设我们现在有key1,key2,key3,key4 4个key值，我们通过一定的hash算法，将其对应到上面的环形hash空间中。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">k1</span><span class="token operator">=</span>hash<span class="token punctuation">(</span>key1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token assign-left variable">k2</span><span class="token operator">=</span>hash<span class="token punctuation">(</span>key2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token assign-left variable">k3</span><span class="token operator">=</span>hash<span class="token punctuation">(</span>key3<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token assign-left variable">k4</span><span class="token operator">=</span>hash<span class="token punctuation">(</span>key4<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://www.pdai.tech/images/alg/alg-dist-hash-2.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>同样的，假设我们有3台cache服务器，把缓存服务器通过hash算法，加入到上述的环中。一般情况下是根据机器的IP地址或者唯一的计算机别名进行哈希。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">c1</span><span class="token operator">=</span>hash<span class="token punctuation">(</span>cache1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token assign-left variable">c2</span><span class="token operator">=</span>hash<span class="token punctuation">(</span>cache2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token assign-left variable">c3</span><span class="token operator">=</span>hash<span class="token punctuation">(</span>cache3<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://www.pdai.tech/images/alg/alg-dist-hash-3.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>接下来就是数据如何存储到cache服务器上了，key值哈希之后的结果顺时针找上述环形hash空间中，距离自己最近的机器节点，然后将数据存储到上面， 如上图所示，k1 存储到 c3 服务器上， k4,k3存储到c1服务器上， k2存储在c2服务器上。用图表示如下:</p><figure><img src="https://www.pdai.tech/images/alg/alg-dist-hash-4.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="删除节点" tabindex="-1"><a class="header-anchor" href="#删除节点" aria-hidden="true">#</a> 删除节点</h3><p>假设cache3服务器宕机，这时候需要从集群中将其摘除。那么，之前存储再c3上的k1，将会顺时针寻找距离它最近的一个节点，也就是c1节点，这样，k1就会存储到c1上了，看一看下下面的图，比较清晰。</p><figure><img src="https://www.pdai.tech/images/alg/alg-dist-hash-5.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>摘除c3节点之后，只影响到了原先存储再c3上的k1，而k3、k4、k2都没有受到影响，也就意味着解决了最开始的解决方案(hash(key)%N)中可能带来的雪崩问题。</p><h3 id="增加节点" tabindex="-1"><a class="header-anchor" href="#增加节点" aria-hidden="true">#</a> 增加节点</h3><p>新增C4节点之后，原先存储到C1的k4，迁移到了C4，分担了C1上的存储压力和流量压力。</p><figure><img src="https://www.pdai.tech/images/alg/alg-dist-hash-6.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="不平衡的问题" tabindex="-1"><a class="header-anchor" href="#不平衡的问题" aria-hidden="true">#</a> 不平衡的问题</h3><p>上面的简单的一致性hash的方案在某些情况下但依旧存在问题: 一个节点宕机之后，数据需要落到距离他最近的节点上，会导致下个节点的压力突然增大，可能导致雪崩，整个服务挂掉。</p><p>如下图所示:</p><figure><img src="https://www.pdai.tech/images/alg/alg-dist-hash-7.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>当节点C3摘除之后，之前再C3上的k1就要迁移到C1上，这时候带来了两部分的压力:</p><ul><li>之前请求到C3上的流量转嫁到了C1上,会导致C1的流量增加，如果之前C3上存在热点数据，则可能导致C1扛不住压力挂掉。</li><li>之前存储到C3上的key值转义到了C1，会导致C1的内容占用量增加，可能存在瓶颈。</li></ul><p>当上面两个压力发生的时候，可能导致C1节点也宕机了。那么压力便会传递到C2上，又出现了类似滚雪球的情况，服务压力出现了雪崩，导致整个服务不可用。这一点违背了最开始提到的四个原则中的 <code>平衡性</code>， 节点宕机之后，流量及内存的分配方式打破了原有的平衡。</p><h3 id="虚拟节点" tabindex="-1"><a class="header-anchor" href="#虚拟节点" aria-hidden="true">#</a> 虚拟节点</h3><p>“虚拟节点”( virtual node )是实际节点(机器)在 hash 空间的复制品( replica )，一实际个节点(机器)对应了若干个“虚拟节点”，这个对应个数也成为“复制个数”，“虚拟节点”在 hash 空间中以hash值排列。</p><p>依旧用图片来解释，假设存在以下的真实节点和虚拟节点的对应关系。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Visual100—<span class="token operator">&gt;</span> Real1
Visual101—<span class="token operator">&gt;</span> Real1
Visual200—<span class="token operator">&gt;</span> Real2
Visual201—<span class="token operator">&gt;</span> Real2
Visual300—<span class="token operator">&gt;</span> Real3
Visual301—<span class="token operator">&gt;</span> Real3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样的，hash之后的结果如下:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>hash<span class="token punctuation">(</span>Visual100<span class="token punctuation">)</span>—<span class="token operator">&gt;</span> V100  —<span class="token operator">&gt;</span> Real1
hash<span class="token punctuation">(</span>Visual101<span class="token punctuation">)</span>—<span class="token operator">&gt;</span> V101  —<span class="token operator">&gt;</span> Real1
hash<span class="token punctuation">(</span>Visual200<span class="token punctuation">)</span>—<span class="token operator">&gt;</span> V200  —<span class="token operator">&gt;</span> Real2
hash<span class="token punctuation">(</span>Visual201<span class="token punctuation">)</span>—<span class="token operator">&gt;</span> V201  —<span class="token operator">&gt;</span> Real2
hash<span class="token punctuation">(</span>Visual300<span class="token punctuation">)</span>—<span class="token operator">&gt;</span> V300  —<span class="token operator">&gt;</span> Real3
hash<span class="token punctuation">(</span>Visual301<span class="token punctuation">)</span>—<span class="token operator">&gt;</span> V301  —<span class="token operator">&gt;</span> Real3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>key值的hash结果如上，这里暂时不写了。</p><figure><img src="https://www.pdai.tech/images/alg/alg-dist-hash-8.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>和之前介绍的不添加虚拟节点的类似，主要聊下如果宕机之后的情况。</p><p>假设Real1机器宕机，则会发生一下情况。</p><ul><li>原先存储在虚拟节点V100上的k1数据将迁移到V301上，也就意味着迁移到了Real3机器上。</li><li>原先存储再虚拟节点V101上的k4数据将迁移到V200上，也就意味着迁移到了Real2机器上。</li></ul><p>结果如下图:</p><figure><img src="https://www.pdai.tech/images/alg/alg-dist-hash-9.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这个就解决之前的问题了，某个节点宕机之后，存储及流量压力并没有全部转移到某台机器上，而是分散到了多台节点上。解决了节点宕机可能存在的雪崩问题。</p><p>当物理节点多的时候，虚拟节点多，这个的雪崩可能就越小。</p><h2 id="一致性hash的应用" tabindex="-1"><a class="header-anchor" href="#一致性hash的应用" aria-hidden="true">#</a> 一致性Hash的应用</h2><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,51),h={href:"https://blog.csdn.net/cywosp/article/details/23397179/",target:"_blank",rel:"noopener noreferrer"},d={href:"https://blog.csdn.net/losetowin/article/details/53743135",target:"_blank",rel:"noopener noreferrer"},u={href:"https://blog.csdn.net/qq1076472549/article/details/81939328",target:"_blank",rel:"noopener noreferrer"};function g(k,m){const s=t("ExternalLinkIcon");return p(),l("div",null,[r,a("ul",null,[a("li",null,[a("a",h,[n("https://blog.csdn.net/cywosp/article/details/23397179/"),e(s)])]),a("li",null,[a("a",d,[n("https://blog.csdn.net/losetowin/article/details/53743135"),e(s)])]),a("li",null,[a("a",u,[n("https://blog.csdn.net/qq1076472549/article/details/81939328"),e(s)])])])])}const v=i(c,[["render",g],["__file","alg-domain-distribute-x-consistency-hash.html.vue"]]);export{v as default};
