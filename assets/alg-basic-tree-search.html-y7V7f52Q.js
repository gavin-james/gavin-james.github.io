const e=JSON.parse('{"key":"v-46fae135","path":"/develop/algorithms-structures/alg-basic/alg-basic-tree-search.html","title":"树 - 二叉搜索树(BST)","lang":"zh-CN","frontmatter":{"date":"2019-06-19T00:00:00.000Z","category":["算法和数据结构"],"tag":["数据结构"],"description":"树 - 二叉搜索树(BST) 本文主要介绍 二叉树中最基本的二叉查找树（Binary Search Tree），（又：二叉搜索树，二叉排序树）它或者是一棵空树，或者是具有下列性质的二叉树： 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 它的左、右子树也分别为二叉排序树。 BST的定义 在二叉查找树中: 若任意节点的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 任意节点的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 任意节点的左、右子树也分别为二叉查找树。 没有键值相等的节点。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/develop/algorithms-structures/alg-basic/alg-basic-tree-search.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"树 - 二叉搜索树(BST)"}],["meta",{"property":"og:description","content":"树 - 二叉搜索树(BST) 本文主要介绍 二叉树中最基本的二叉查找树（Binary Search Tree），（又：二叉搜索树，二叉排序树）它或者是一棵空树，或者是具有下列性质的二叉树： 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 它的左、右子树也分别为二叉排序树。 BST的定义 在二叉查找树中: 若任意节点的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 任意节点的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 任意节点的左、右子树也分别为二叉查找树。 没有键值相等的节点。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-27T08:55:11.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"数据结构"}],["meta",{"property":"article:published_time","content":"2019-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-27T08:55:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"树 - 二叉搜索树(BST)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-27T08:55:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"BST的定义","slug":"bst的定义","link":"#bst的定义","children":[]},{"level":2,"title":"BST的实现","slug":"bst的实现","link":"#bst的实现","children":[{"level":3,"title":"节点","slug":"节点","link":"#节点","children":[]},{"level":3,"title":"遍历","slug":"遍历","link":"#遍历","children":[]},{"level":3,"title":"查找","slug":"查找","link":"#查找","children":[]},{"level":3,"title":"最大值和最小值","slug":"最大值和最小值","link":"#最大值和最小值","children":[]},{"level":3,"title":"前驱和后继","slug":"前驱和后继","link":"#前驱和后继","children":[]},{"level":3,"title":"插入","slug":"插入","link":"#插入","children":[]},{"level":3,"title":"删除","slug":"删除","link":"#删除","children":[]},{"level":3,"title":"打印","slug":"打印","link":"#打印","children":[]},{"level":3,"title":"销毁","slug":"销毁","link":"#销毁","children":[]}]},{"level":2,"title":"测试程序","slug":"测试程序","link":"#测试程序","children":[]},{"level":2,"title":"代码和测试代码","slug":"代码和测试代码","link":"#代码和测试代码","children":[{"level":3,"title":"代码实现","slug":"代码实现","link":"#代码实现","children":[]},{"level":3,"title":"测试代码","slug":"测试代码","link":"#测试代码","children":[]},{"level":3,"title":"测试结果","slug":"测试结果","link":"#测试结果","children":[]}]},{"level":2,"title":"BST相关题目","slug":"bst相关题目","link":"#bst相关题目","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1703667311000,"updatedTime":1703667311000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":1}]},"readingTime":{"minutes":16.78,"words":5033},"filePathRelative":"develop/algorithms-structures/alg-basic/alg-basic-tree-search.md","localizedDate":"2019年6月19日","excerpt":"<h1> 树 - 二叉搜索树(BST)</h1>\\n<blockquote>\\n<p>本文主要介绍 二叉树中最基本的二叉查找树（Binary Search Tree），（又：二叉搜索树，二叉排序树）它或者是一棵空树，或者是具有下列性质的二叉树： 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 它的左、右子树也分别为二叉排序树。</p>\\n</blockquote>\\n<h2> BST的定义</h2>\\n<p>在二叉查找树中:</p>\\n<ul>\\n<li>若任意节点的左子树不空，则左子树上所有结点的值均小于它的根结点的值；</li>\\n<li>任意节点的右子树不空，则右子树上所有结点的值均大于它的根结点的值；</li>\\n<li>任意节点的左、右子树也分别为二叉查找树。</li>\\n<li>没有键值相等的节点。</li>\\n</ul>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
