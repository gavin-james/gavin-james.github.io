const e=JSON.parse('{"key":"v-5abdef58","path":"/develop/algorithms-structures/alg-basic/alg-basic-graph-aoe.html","title":"图 - AOE & 关键路径","lang":"zh-CN","frontmatter":{"date":"2019-06-29T00:00:00.000Z","category":["算法和数据结构"],"tag":["数据结构"],"description":"图 - AOE &amp; 关键路径 关键路径在项目管理计算工期等方面有广泛等应用，提升工期就是所见缩减所有关键路径上的工期，并且在实现时需要应用到之前拓扑排序的算法(前提: 有向无环图，有依赖关系)。 关键路径相关名词 相关术语: AOV网络(Activity On Vertex Network): 有向图，用顶点表示活动，用弧表示活动的先后顺序 AOE网络(Activity On Edge): 有向图，用顶点表示事件，用弧表示活动，用权值表示活动消耗时间(带权的有向无环图) 活动: 业务逻辑中的行为，用边表示 事件: 活动的结果或者触发条件 关键路径: 具有最大路径长度(权重)的路径，可能不止一条 活动的两个属性: e(i)最早开始时间，l(i)最晚开始时间 事件的两个属性: ve(j)最早开始时间，vl(j)最晚开始时间","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/develop/algorithms-structures/alg-basic/alg-basic-graph-aoe.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"图 - AOE & 关键路径"}],["meta",{"property":"og:description","content":"图 - AOE &amp; 关键路径 关键路径在项目管理计算工期等方面有广泛等应用，提升工期就是所见缩减所有关键路径上的工期，并且在实现时需要应用到之前拓扑排序的算法(前提: 有向无环图，有依赖关系)。 关键路径相关名词 相关术语: AOV网络(Activity On Vertex Network): 有向图，用顶点表示活动，用弧表示活动的先后顺序 AOE网络(Activity On Edge): 有向图，用顶点表示事件，用弧表示活动，用权值表示活动消耗时间(带权的有向无环图) 活动: 业务逻辑中的行为，用边表示 事件: 活动的结果或者触发条件 关键路径: 具有最大路径长度(权重)的路径，可能不止一条 活动的两个属性: e(i)最早开始时间，l(i)最晚开始时间 事件的两个属性: ve(j)最早开始时间，vl(j)最晚开始时间"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-27T08:55:11.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"数据结构"}],["meta",{"property":"article:published_time","content":"2019-06-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-27T08:55:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"图 - AOE & 关键路径\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-06-29T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-27T08:55:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"关键路径相关名词","slug":"关键路径相关名词","link":"#关键路径相关名词","children":[]},{"level":2,"title":"关键路径的实现","slug":"关键路径的实现","link":"#关键路径的实现","children":[{"level":3,"title":"4个关键概念","slug":"_4个关键概念","link":"#_4个关键概念","children":[]},{"level":3,"title":"4个时间的关系","slug":"_4个时间的关系","link":"#_4个时间的关系","children":[]},{"level":3,"title":"算法实现","slug":"算法实现","link":"#算法实现","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1703667311000,"updatedTime":1703667311000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":1}]},"readingTime":{"minutes":2.53,"words":760},"filePathRelative":"develop/algorithms-structures/alg-basic/alg-basic-graph-aoe.md","localizedDate":"2019年6月29日","excerpt":"<h1> 图 - AOE &amp; 关键路径</h1>\\n<blockquote>\\n<p>关键路径在项目管理计算工期等方面有广泛等应用，提升工期就是所见缩减所有关键路径上的工期，并且在实现时需要应用到之前拓扑排序的算法(前提: 有向无环图，有依赖关系)。</p>\\n</blockquote>\\n<h2> 关键路径相关名词</h2>\\n<p>相关术语:</p>\\n<ul>\\n<li><code>AOV网络(Activity On Vertex Network)</code>: 有向图，用顶点表示活动，用弧表示活动的先后顺序</li>\\n<li><code>AOE网络(Activity On Edge)</code>: 有向图，用顶点表示事件，用弧表示活动，用权值表示活动消耗时间(带权的有向无环图)</li>\\n<li><code>活动</code>: 业务逻辑中的行为，用边表示</li>\\n<li><code>事件</code>: 活动的结果或者触发条件</li>\\n<li><code>关键路径</code>: 具有最大路径长度(权重)的路径，可能不止一条</li>\\n<li><code>活动的两个属性</code>: e(i)最早开始时间，l(i)最晚开始时间</li>\\n<li><code>事件的两个属性</code>: ve(j)最早开始时间，vl(j)最晚开始时间</li>\\n</ul>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
