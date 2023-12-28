import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as n,c as o,a as e,b as t,d as r,f as s}from"./app-PDcd_-E9.js";const h={},c=s('<h1 id="图-最短路径-dijkstra-frolyd" tabindex="-1"><a class="header-anchor" href="#图-最短路径-dijkstra-frolyd" aria-hidden="true">#</a> 图 - 最短路径(Dijkstra &amp; Frolyd)</h1><blockquote><p>最短路径有着广泛的应用，比如地图两点间距离计算，公交查询系统，路由选择等。</p></blockquote><h2 id="最短路径介绍" tabindex="-1"><a class="header-anchor" href="#最短路径介绍" aria-hidden="true">#</a> 最短路径介绍</h2><p>最短路径问题是图论研究中的一个经典算法问题，旨在寻找图(由结点和路径组成的)中两结点之间的最短路径。最短路径不一定是经过边最少的路径，但在这些最短路径中，长度最短的那一条路径上只有一条边，且它的权值在从源点出发的所有边的权值最小。</p><p>从图中某一顶点(称为源点)到达另一顶点(称为终点)的路径可能不止一条，如何找到一条路径使得沿此路径上各边上的权值总和达到最小，例: 公交查询系统。</p><figure><img src="https://www.pdai.tech/images/alg/alg-graph-min-distance-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>路径长度最短的最短路径的特点:</p><ul><li>在这条路径上，必定只含一条弧，并且这条弧的权值最小。</li><li>下一条路径长度次短的最短路径的特点:</li><li>它只可能有两种情况: 或者是直接从源点到该点(只含一条弧)； 或者是从源点经过顶点v1，再到达该顶点(由两条弧组成)。</li></ul><p>问题解法:</p><ul><li>求从某个源点到其余各点的最短路径 — Dijkstra算法</li><li>每一对顶点之间的最短路径 — Floyd算法</li></ul><h2 id="最短路径算法" tabindex="-1"><a class="header-anchor" href="#最短路径算法" aria-hidden="true">#</a> 最短路径算法</h2><h3 id="dijkstra算法" tabindex="-1"><a class="header-anchor" href="#dijkstra算法" aria-hidden="true">#</a> Dijkstra算法</h3><p>1.定义概览</p><p>Dijkstra(迪杰斯特拉)算法是典型的单源最短路径算法，用于计算一个节点到其他所有节点的最短路径。主要特点是以起始点为中心向外层层扩展，直到扩展到终点为止。Dijkstra算法是很有代表性的最短路径算法，在很多专业课程中都作为基本内容有详细的介绍，如数据结构，图论，运筹学等等。注意该算法要求图中不存在负权边。</p><p>问题描述: 在无向图 G=(V,E) 中，假设每条边 E[i] 的长度为 w[i]，找到由顶点 V0 到其余各点的最短路径。(单源最短路径)</p><p>2.算法描述</p><p>1)算法思想: 设G=(V,E)是一个带权有向图，把图中顶点集合V分成两组，第一组为已求出最短路径的顶点集合(用S表示，初始时S中只有一个源点，以后每求得一条最短路径 , 就将加入到集合S中，直到全部顶点都加入到S中，算法就结束了)，第二组为其余未确定最短路径的顶点集合(用U表示)，按最短路径长度的递增次序依次把第二组的顶点加入S中。在加入的过程中，总保持从源点v到S中各顶点的最短路径长度不大于从源点v到U中任何顶点的最短路径长度。此外，每个顶点对应一个距离，S中的顶点的距离就是从v到此顶点的最短路径长度，U中的顶点的距离，是从v到此顶点只包括S中的顶点为中间顶点的当前最短路径长度。</p><p>2)算法步骤:</p><p>a.初始时，S只包含源点，即S＝{v}，v的距离为0。U包含除v外的其他顶点，即:U={其余顶点}，若v与U中顶点u有边，则&lt;u,v&gt;正常有权值，若u不是v的出边邻接点，则&lt;u,v&gt;权值为∞。</p><p>b.从U中选取一个距离v最小的顶点k，把k，加入S中(该选定的距离就是v到k的最短路径长度)。</p><p>c.以k为新考虑的中间点，修改U中各顶点的距离；若从源点v到顶点u的距离(经过顶点k)比原来距离(不经过顶点k)短，则修改顶点u的距离值，修改后的距离值的顶点k的距离加上边上的权。</p><p>d.重复步骤b和c直到所有顶点都包含在S中。</p><figure><img src="https://www.pdai.tech/images/alg/alg-graph-min-distance-2.gif" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="floyd算法" tabindex="-1"><a class="header-anchor" href="#floyd算法" aria-hidden="true">#</a> Floyd算法</h3><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>',25),d={href:"https://www.cnblogs.com/lisen10/p/10876132.html",target:"_blank",rel:"noopener noreferrer"},p={href:"https://www.cnblogs.com/biyeymyhjob/archive/2012/07/31/2615833.html",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.cnblogs.com/idreamo/p/9472295.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://segmentfault.com/a/1190000015440278",target:"_blank",rel:"noopener noreferrer"};function f(u,b){const a=l("ExternalLinkIcon");return n(),o("div",null,[c,e("ul",null,[e("li",null,[e("a",d,[t("https://www.cnblogs.com/lisen10/p/10876132.html"),r(a)])]),e("li",null,[e("a",p,[t("https://www.cnblogs.com/biyeymyhjob/archive/2012/07/31/2615833.html"),r(a)])]),e("li",null,[e("a",g,[t("https://www.cnblogs.com/idreamo/p/9472295.html"),r(a)])]),e("li",null,[e("a",m,[t("https://segmentfault.com/a/1190000015440278"),r(a)])])])])}const w=i(h,[["render",f],["__file","alg-basic-graph-min-distance.html.vue"]]);export{w as default};