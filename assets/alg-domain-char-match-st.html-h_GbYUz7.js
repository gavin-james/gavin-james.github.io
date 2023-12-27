const e=JSON.parse('{"key":"v-122bd9a8","path":"/develop/algorithms-structures/alg-domain/alg-domain-char-match-st.html","title":"字符串匹配 - 文本预处理：后缀树（Suffix Tree）","lang":"zh-CN","frontmatter":{"date":"2019-07-25T00:00:00.000Z","category":["算法和数据结构"],"tag":["领域算法"],"description":"字符串匹配 - 文本预处理：后缀树（Suffix Tree） 上述字符串匹配算法(朴素的字符串匹配算法, KMP 算法, Boyer-Moore算法)均是通过对模式（Pattern）字符串进行预处理的方式来加快搜索速度。对 Pattern 进行预处理的最优复杂度为 O(m)，其中 m 为 Pattern 字符串的长度。那么，有没有对文本（Text）进行预处理的算法呢？本文即将介绍一种对 Text 进行预处理的字符串匹配算法：后缀树（Suffix Tree）。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/develop/algorithms-structures/alg-domain/alg-domain-char-match-st.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"字符串匹配 - 文本预处理：后缀树（Suffix Tree）"}],["meta",{"property":"og:description","content":"字符串匹配 - 文本预处理：后缀树（Suffix Tree） 上述字符串匹配算法(朴素的字符串匹配算法, KMP 算法, Boyer-Moore算法)均是通过对模式（Pattern）字符串进行预处理的方式来加快搜索速度。对 Pattern 进行预处理的最优复杂度为 O(m)，其中 m 为 Pattern 字符串的长度。那么，有没有对文本（Text）进行预处理的算法呢？本文即将介绍一种对 Text 进行预处理的字符串匹配算法：后缀树（Suffix Tree）。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-27T08:55:11.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"领域算法"}],["meta",{"property":"article:published_time","content":"2019-07-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-27T08:55:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"字符串匹配 - 文本预处理：后缀树（Suffix Tree）\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-07-25T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-27T08:55:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"什么是后缀树","slug":"什么是后缀树","link":"#什么是后缀树","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1703667311000,"updatedTime":1703667311000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":1}]},"readingTime":{"minutes":17.82,"words":5345},"filePathRelative":"develop/algorithms-structures/alg-domain/alg-domain-char-match-st.md","localizedDate":"2019年7月25日","excerpt":"<h1> 字符串匹配 - 文本预处理：后缀树（Suffix Tree）</h1>\\n<blockquote>\\n<p>上述字符串匹配算法(朴素的字符串匹配算法, KMP 算法, Boyer-Moore算法)均是通过对<strong>模式（Pattern）字符串进行预处理</strong>的方式来加快搜索速度。对 Pattern 进行预处理的最优复杂度为 O(m)，其中 m 为 Pattern 字符串的长度。那么，有没有对文本（Text）进行预处理的算法呢？本文即将介绍一种<strong>对 Text 进行预处理</strong>的字符串匹配算法：后缀树（Suffix Tree）。</p>\\n</blockquote>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
