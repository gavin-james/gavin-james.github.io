import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as i,o,c as h,a as e,b as a,d as n,f as s}from"./app-pgelmVnX.js";const l={},d=e("h1",{id:"数据挖掘-10大算法汇总",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#数据挖掘-10大算法汇总","aria-hidden":"true"},"#"),a(" 数据挖掘 - 10大算法汇总")],-1),c=e("blockquote",null,[e("p",null,"国际权威的学术组织the IEEE International Conference on Data Mining (ICDM) 2006年12月评选出了数据挖掘领域的十大经典算法: C4.5, k-Means, SVM, Apriori, EM, PageRank, AdaBoost, kNN, Naive Bayes, and CART。")],-1),p=e("h2",{id:"推荐学习",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#推荐学习","aria-hidden":"true"},"#"),a(" 推荐学习")],-1),b={href:"https://www.cnblogs.com/pinard/",target:"_blank",rel:"noopener noreferrer"},g=s('<h2 id="数据挖掘十大经典算法" tabindex="-1"><a class="header-anchor" href="#数据挖掘十大经典算法" aria-hidden="true">#</a> 数据挖掘十大经典算法</h2><h3 id="c4-5" tabindex="-1"><a class="header-anchor" href="#c4-5" aria-hidden="true">#</a> C4.5</h3><p>C4.5算法是机器学习算法中的一种分类决策树算法,其核心算法是ID3算法. C4.5算法继承了ID3算法的优点，并在以下几方面对ID3算法进行了改进:</p><ul><li>用信息增益率来选择属性，克服了用信息增益选择属性时偏向选择取值多的属性的不足；</li><li>在树构造过程中进行剪枝；</li><li>能够完成对连续属性的离散化处理；</li><li>能够对不完整数据进行处理。</li></ul><p>C4.5算法有如下优点: 产生的分类规则易于理解，准确率较高。其缺点是: 在构造树的过程中，需要对数据集进行多次的顺序扫描和排序，因而导致算法的低效(相对的CART算法只需要扫描两次数据集，以下仅为决策树优缺点)。</p><h3 id="the-k-means-algorithm-即k-means算法" tabindex="-1"><a class="header-anchor" href="#the-k-means-algorithm-即k-means算法" aria-hidden="true">#</a> The k-means algorithm 即K-Means算法</h3><p>k-means algorithm算法是一个聚类算法，把n的对象根据他们的属性分为k个分割，k &lt; n。它与处理混合正态分布的最大期望算法很相似，因为他们都试图找到数据中自然聚类的中心。它假设对象属性来自于空间向量，并且目标是使各个群组内部的均 方误差总和最小。</p><h3 id="support-vector-machines" tabindex="-1"><a class="header-anchor" href="#support-vector-machines" aria-hidden="true">#</a> Support vector machines</h3><p>支持向量机，英文为Support Vector Machine，简称SV机(论文中一般简称SVM)。它是一种監督式學習的方法，它广泛的应用于统计分类以及回归分析中。支持向量机将向量映射到一个更 高维的空间里，在这个空间里建立有一个最大间隔超平面。在分开数据的超平面的两边建有两个互相平行的超平面。分隔超平面使两个平行超平面的距离最大化。假 定平行超平面间的距离或差距越大，分类器的总误差越小。一个极好的指南是C.J.C Burges的《模式识别支持向量机指南》。van der Walt 和 Barnard 将支持向量机和其他分类器进行了比较。</p><h3 id="the-apriori-algorithm" tabindex="-1"><a class="header-anchor" href="#the-apriori-algorithm" aria-hidden="true">#</a> The Apriori algorithm</h3><p>Apriori算法是一种最有影响的挖掘布尔关联规则频繁项集的算法。其核心是基于两阶段频集思想的递推算法。该关联规则在分类上属于单维、单层、布尔关联规则。在这里，所有支持度大于最小支持度的项集称为频繁项集，简称频集。</p><h3 id="最大期望-em-算法" tabindex="-1"><a class="header-anchor" href="#最大期望-em-算法" aria-hidden="true">#</a> 最大期望(EM)算法</h3><p>在统计计算中，最大期望(EM，Expectation–Maximization)算法是在概率(probabilistic)模型中寻找参数最大似然 估计的算法，其中概率模型依赖于无法观测的隐藏变量(Latent Variabl)。最大期望经常用在机器学习和计算机视觉的数据集聚(Data Clustering)领域。</p><h3 id="pagerank" tabindex="-1"><a class="header-anchor" href="#pagerank" aria-hidden="true">#</a> PageRank</h3><p>PageRank是Google算法的重要内容。2001年9月被授予美国专利，专利人是Google创始人之一拉里·佩奇(Larry Page)。因此，PageRank里的page不是指网页，而是指佩奇，即这个等级方法是以佩奇来命名的。</p><p>PageRank根据网站的外部链接和内部链接的数量和质量俩衡量网站的价值。PageRank背后的概念是，每个到页面的链接都是对该页面的一次投票， 被链接的越多，就意味着被其他网站投票越多。这个就是所谓的“链接流行度”——衡量多少人愿意将他们的网站和你的网站挂钩。PageRank这个概念引自 学术中一篇论文的被引述的频度——即被别人引述的次数越多，一般判断这篇论文的权威性就越高。</p><h3 id="adaboost" tabindex="-1"><a class="header-anchor" href="#adaboost" aria-hidden="true">#</a> AdaBoost</h3><p>Adaboost是一种迭代算法，其核心思想是针对同一个训练集训练不同的分类器(弱分类器)，然后把这些弱分类器集合起来，构成一个更强的最终分类器 (强分类器)。其算法本身是通过改变数据分布来实现的，它根据每次训练集之中每个样本的分类是否正确，以及上次的总体分类的准确率，来确定每个样本的权 值。将修改过权值的新数据集送给下层分类器进行训练，最后将每次训练得到的分类器最后融合起来，作为最后的决策分类器。</p><h3 id="knn-k-nearest-neighbor-classification" tabindex="-1"><a class="header-anchor" href="#knn-k-nearest-neighbor-classification" aria-hidden="true">#</a> kNN: k-nearest neighbor classification</h3><p>K最近邻(k-Nearest Neighbor，KNN)分类算法，是一个理论上比较成熟的方法，也是最简单的机器学习算法之一。该方法的思路是: 如果一个样本在特征空间中的k个最相似(即特征空间中最邻近)的样本中的大多数属于某一个类别，则该样本也属于这个类别。</p><h3 id="naive-bayes" tabindex="-1"><a class="header-anchor" href="#naive-bayes" aria-hidden="true">#</a> Naive Bayes</h3><p>在众多的分类模型中，应用最为广泛的两种分类模型是决策树模型(Decision Tree Model)和朴素贝叶斯模型(Naive Bayesian Model，NBC)。 朴素贝叶斯模型发源于古典数学理论，有着坚实的数学基础，以 及稳定的分类效率。同时，NBC模型所需估计的参数很少，对缺失数据不太敏感，算法也比较简单。理论上，NBC模型与其他分类方法相比具有最小的误差率。 但是实际上并非总是如此，这是因为NBC模型假设属性之间相互独立，这个假设在实际应用中往往是不成立的，这给NBC模型的正确分类带来了一定影响。在属 性个数比较多或者属性之间相关性较大时，NBC模型的分类效率比不上决策树模型。而在属性相关性较小时，NBC模型的性能最为良好。</p><h3 id="cart-分类与回归树" tabindex="-1"><a class="header-anchor" href="#cart-分类与回归树" aria-hidden="true">#</a> CART: 分类与回归树</h3><p>CART, Classification and Regression Trees。 在分类树下面有两个关键的思想。第一个是关于递归地划分自变量空间的想法(二元切分法)；第二个想法是用验证数据进行剪枝(预剪枝、后剪枝)。在回归树的基础上的模型树构建难度可能增加了，但同时其分类效果也有提升。</p><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2><p>提示</p>',26),u={href:"https://blog.csdn.net/qq_36523839/article/details/82383597%E3%80%82",target:"_blank",rel:"noopener noreferrer"},_={href:"https://blog.csdn.net/qq_36523839/article/details/82383597",target:"_blank",rel:"noopener noreferrer"},f={href:"https://blog.csdn.net/u010983763/article/details/70854469",target:"_blank",rel:"noopener noreferrer"},k={href:"https://www.cnblogs.com/jchubby/p/5449404.html",target:"_blank",rel:"noopener noreferrer"};function m(C,x){const r=i("ExternalLinkIcon");return o(),h("div",null,[d,c,p,e("ul",null,[e("li",null,[a("博客园@刘建平Pinard 的"),e("a",b,[a("机器学习，数据挖掘系列在新窗口打开"),n(r)])])]),g,e("p",null,[a("本文主要来源于这里"),e("a",u,[a("https://blog.csdn.net/qq_36523839/article/details/82383597。"),n(r)])]),e("ul",null,[e("li",null,[e("a",_,[a("https://blog.csdn.net/qq_36523839/article/details/82383597"),n(r)])]),e("li",null,[e("a",f,[a("https://blog.csdn.net/u010983763/article/details/70854469"),n(r)])]),e("li",null,[e("a",k,[a("https://www.cnblogs.com/jchubby/p/5449404.html"),n(r)])])])])}const M=t(l,[["render",m],["__file","alg-domain-machine.html.vue"]]);export{M as default};
