const t=JSON.parse('{"key":"v-5d6c8a12","path":"/develop/algorithms-structures/alg-basic/alg-basic-graph-min-distance.html","title":"图 - 最短路径(Dijkstra & Frolyd)","lang":"zh-CN","frontmatter":{"date":"2019-06-27T00:00:00.000Z","category":["算法和数据结构"],"tag":["数据结构"],"description":"图 - 最短路径(Dijkstra &amp; Frolyd) 最短路径有着广泛的应用，比如地图两点间距离计算，公交查询系统，路由选择等。 最短路径介绍 最短路径问题是图论研究中的一个经典算法问题，旨在寻找图(由结点和路径组成的)中两结点之间的最短路径。最短路径不一定是经过边最少的路径，但在这些最短路径中，长度最短的那一条路径上只有一条边，且它的权值在从源点出发的所有边的权值最小。 从图中某一顶点(称为源点)到达另一顶点(称为终点)的路径可能不止一条，如何找到一条路径使得沿此路径上各边上的权值总和达到最小，例: 公交查询系统。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/develop/algorithms-structures/alg-basic/alg-basic-graph-min-distance.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"图 - 最短路径(Dijkstra & Frolyd)"}],["meta",{"property":"og:description","content":"图 - 最短路径(Dijkstra &amp; Frolyd) 最短路径有着广泛的应用，比如地图两点间距离计算，公交查询系统，路由选择等。 最短路径介绍 最短路径问题是图论研究中的一个经典算法问题，旨在寻找图(由结点和路径组成的)中两结点之间的最短路径。最短路径不一定是经过边最少的路径，但在这些最短路径中，长度最短的那一条路径上只有一条边，且它的权值在从源点出发的所有边的权值最小。 从图中某一顶点(称为源点)到达另一顶点(称为终点)的路径可能不止一条，如何找到一条路径使得沿此路径上各边上的权值总和达到最小，例: 公交查询系统。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-27T08:55:11.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"数据结构"}],["meta",{"property":"article:published_time","content":"2019-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-27T08:55:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"图 - 最短路径(Dijkstra & Frolyd)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-27T08:55:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"最短路径介绍","slug":"最短路径介绍","link":"#最短路径介绍","children":[]},{"level":2,"title":"最短路径算法","slug":"最短路径算法","link":"#最短路径算法","children":[{"level":3,"title":"Dijkstra算法","slug":"dijkstra算法","link":"#dijkstra算法","children":[]},{"level":3,"title":"Floyd算法","slug":"floyd算法","link":"#floyd算法","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1703667311000,"updatedTime":1703667311000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":1}]},"readingTime":{"minutes":3.61,"words":1082},"filePathRelative":"develop/algorithms-structures/alg-basic/alg-basic-graph-min-distance.md","localizedDate":"2019年6月27日","excerpt":"<h1> 图 - 最短路径(Dijkstra &amp; Frolyd)</h1>\\n<blockquote>\\n<p>最短路径有着广泛的应用，比如地图两点间距离计算，公交查询系统，路由选择等。</p>\\n</blockquote>\\n<h2> 最短路径介绍</h2>\\n<p>最短路径问题是图论研究中的一个经典算法问题，旨在寻找图(由结点和路径组成的)中两结点之间的最短路径。最短路径不一定是经过边最少的路径，但在这些最短路径中，长度最短的那一条路径上只有一条边，且它的权值在从源点出发的所有边的权值最小。</p>\\n<p>从图中某一顶点(称为源点)到达另一顶点(称为终点)的路径可能不止一条，如何找到一条路径使得沿此路径上各边上的权值总和达到最小，例: 公交查询系统。</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{t as data};
