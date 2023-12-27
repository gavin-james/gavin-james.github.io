import{_ as c}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as t,c as d,a as e,b as o,d as n,f as i}from"./app-pgelmVnX.js";const l={},s=i('<h1 id="大数据处理-map-reduce" tabindex="-1"><a class="header-anchor" href="#大数据处理-map-reduce" aria-hidden="true">#</a> 大数据处理 - Map &amp; Reduce</h1><blockquote><p>MapReduce是一种计算模型, 本质上是<code>分治/hash_map/归并排序</code>这种方式在分布式下的延伸。</p></blockquote><h2 id="map-reduce简介" tabindex="-1"><a class="header-anchor" href="#map-reduce简介" aria-hidden="true">#</a> Map &amp; Reduce简介</h2><p>MapReduce是一种计算模型，简单的说就是将大批量的工作(数据)分解(MAP)执行，然后再将结果合并成最终结果(REDUCE)。这样做的好处是可以在任务被分解后，可以通过大量机器进行并行计算，减少整个操作的时间。但如果你要我再通俗点介绍，那么，说白了，Mapreduce的原理就是一个归并排序。</p><ul><li><code>适用范围</code>: 数据量大，但是数据种类小可以放入内存</li><li><code>基本原理及要点</code>: 将数据交给不同的机器去处理，数据划分，结果归约。</li></ul><h2 id="相关题目" tabindex="-1"><a class="header-anchor" href="#相关题目" aria-hidden="true">#</a> 相关题目</h2><ul><li>The canonical example application of MapReduce is a process to count the appearances of each different word in a set of documents:</li><li>海量数据分布在100台电脑中，想个办法高效统计出这批数据的TOP10。</li><li>一共有N个机器，每个机器上有N个数。每个机器最多存O(N)个数并对它们操作。如何找到N^2个数的中数(median)?</li></ul><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>',8),h={href:"https://blog.csdn.net/v_JULY_v/article/details/7382693",target:"_blank",rel:"noopener noreferrer"};function p(u,_){const a=r("ExternalLinkIcon");return t(),d("div",null,[s,e("ul",null,[e("li",null,[e("a",h,[o("https://blog.csdn.net/v_JULY_v/article/details/7382693"),n(a)])])])])}const b=c(l,[["render",p],["__file","alg-domain-bigdata-map-reduce.html.vue"]]);export{b as default};
