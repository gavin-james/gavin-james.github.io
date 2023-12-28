const e=JSON.parse('{"key":"v-588630e5","path":"/develop/algorithms-structures/alg-sort/alg-sort-x-merge.html","title":"排序 - 归并排序(Merge Sort)","lang":"zh-CN","frontmatter":{"date":"2019-07-07T00:00:00.000Z","category":["算法和数据结构"],"tag":["排序算法"],"description":"排序 - 归并排序(Merge Sort) 将两个的有序数列合并成一个有序数列，我们称之为\\"归并\\"。归并排序(Merge Sort)就是利用归并思想对数列进行排序。 归并排序介绍 根据具体的实现，归并排序包括\\"从上往下\\"和\\"从下往上\\"2种方式。 从下往上的归并排序 将待排序的数列分成若干个长度为1的子数列，然后将这些数列两两合并；得到若干个长度为2的有序数列，再将这些数列两两合并；得到若干个长度为4的有序数列，再将它们两两合并；直接合并成一个数列为止。这样就得到了我们想要的排序结果。(参考下面的图片)","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/develop/algorithms-structures/alg-sort/alg-sort-x-merge.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"排序 - 归并排序(Merge Sort)"}],["meta",{"property":"og:description","content":"排序 - 归并排序(Merge Sort) 将两个的有序数列合并成一个有序数列，我们称之为\\"归并\\"。归并排序(Merge Sort)就是利用归并思想对数列进行排序。 归并排序介绍 根据具体的实现，归并排序包括\\"从上往下\\"和\\"从下往上\\"2种方式。 从下往上的归并排序 将待排序的数列分成若干个长度为1的子数列，然后将这些数列两两合并；得到若干个长度为2的有序数列，再将这些数列两两合并；得到若干个长度为4的有序数列，再将它们两两合并；直接合并成一个数列为止。这样就得到了我们想要的排序结果。(参考下面的图片)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-27T08:55:11.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"排序算法"}],["meta",{"property":"article:published_time","content":"2019-07-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-27T08:55:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"排序 - 归并排序(Merge Sort)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-07-07T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-27T08:55:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"归并排序介绍","slug":"归并排序介绍","link":"#归并排序介绍","children":[{"level":3,"title":"从下往上的归并排序","slug":"从下往上的归并排序","link":"#从下往上的归并排序","children":[]},{"level":3,"title":"从上往下的归并排序","slug":"从上往下的归并排序","link":"#从上往下的归并排序","children":[]}]},{"level":2,"title":"归并排序实现","slug":"归并排序实现","link":"#归并排序实现","children":[{"level":3,"title":"从上往下的归并排序","slug":"从上往下的归并排序-1","link":"#从上往下的归并排序-1","children":[]},{"level":3,"title":"从下往上的归并排序","slug":"从下往上的归并排序-1","link":"#从下往上的归并排序-1","children":[]}]},{"level":2,"title":"归并排序的时间复杂度和稳定性","slug":"归并排序的时间复杂度和稳定性","link":"#归并排序的时间复杂度和稳定性","children":[{"level":3,"title":"归并排序时间复杂度","slug":"归并排序时间复杂度","link":"#归并排序时间复杂度","children":[]},{"level":3,"title":"归并排序稳定性","slug":"归并排序稳定性","link":"#归并排序稳定性","children":[]}]},{"level":2,"title":"代码实现","slug":"代码实现","link":"#代码实现","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1703667311000,"updatedTime":1703667311000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":1}]},"readingTime":{"minutes":5.73,"words":1718},"filePathRelative":"develop/algorithms-structures/alg-sort/alg-sort-x-merge.md","localizedDate":"2019年7月7日","excerpt":"<h1> 排序 - 归并排序(Merge Sort)</h1>\\n<blockquote>\\n<p>将两个的有序数列合并成一个有序数列，我们称之为\\"归并\\"。归并排序(Merge Sort)就是利用归并思想对数列进行排序。</p>\\n</blockquote>\\n<h2> 归并排序介绍</h2>\\n<p>根据具体的实现，归并排序包括\\"从上往下\\"和\\"从下往上\\"2种方式。</p>\\n<h3> 从下往上的归并排序</h3>\\n<p>将待排序的数列分成若干个长度为1的子数列，然后将这些数列两两合并；得到若干个长度为2的有序数列，再将这些数列两两合并；得到若干个长度为4的有序数列，再将它们两两合并；直接合并成一个数列为止。这样就得到了我们想要的排序结果。(参考下面的图片)</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};