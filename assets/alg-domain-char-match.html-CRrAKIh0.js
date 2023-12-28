const t=JSON.parse('{"key":"v-332ed69c","path":"/develop/algorithms-structures/alg-domain/alg-domain-char-match.html","title":"字符串匹配 - Overview","lang":"zh-CN","frontmatter":{"date":"2019-07-21T00:00:00.000Z","category":["算法和数据结构"],"tag":["领域算法"],"description":"字符串匹配 - Overview 字符串匹配(String Matchiing)也称字符串搜索(String Searching)是字符串算法中重要的一种，是指从一个大字符串或文本中找到模式串出现的位置。 字符串匹配概念 字符串匹配问题的形式定义： 文本（Text）是一个长度为 n 的数组 T[1..n]； 模式（Pattern）是一个长度为 m 且 m≤n 的数组 P[1..m]； T 和 P 中的元素都属于有限的字母表 Σ 表； 如果 0≤s≤n-m，并且 T[s+1..s+m] = P[1..m]，即对 1≤j≤m，有 T[s+j] = P[j]，则说模式 P 在文本 T 中出现且位移为 s，且称 s 是一个有效位移（Valid Shift）。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/develop/algorithms-structures/alg-domain/alg-domain-char-match.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"字符串匹配 - Overview"}],["meta",{"property":"og:description","content":"字符串匹配 - Overview 字符串匹配(String Matchiing)也称字符串搜索(String Searching)是字符串算法中重要的一种，是指从一个大字符串或文本中找到模式串出现的位置。 字符串匹配概念 字符串匹配问题的形式定义： 文本（Text）是一个长度为 n 的数组 T[1..n]； 模式（Pattern）是一个长度为 m 且 m≤n 的数组 P[1..m]； T 和 P 中的元素都属于有限的字母表 Σ 表； 如果 0≤s≤n-m，并且 T[s+1..s+m] = P[1..m]，即对 1≤j≤m，有 T[s+j] = P[j]，则说模式 P 在文本 T 中出现且位移为 s，且称 s 是一个有效位移（Valid Shift）。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-27T08:55:11.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"领域算法"}],["meta",{"property":"article:published_time","content":"2019-07-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-27T08:55:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"字符串匹配 - Overview\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-07-21T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-27T08:55:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"字符串匹配概念","slug":"字符串匹配概念","link":"#字符串匹配概念","children":[]},{"level":2,"title":"字符串匹配算法","slug":"字符串匹配算法","link":"#字符串匹配算法","children":[]}],"git":{"createdTime":1703667311000,"updatedTime":1703667311000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":1}]},"readingTime":{"minutes":2.26,"words":679},"filePathRelative":"develop/algorithms-structures/alg-domain/alg-domain-char-match.md","localizedDate":"2019年7月21日","excerpt":"<h1> 字符串匹配 - Overview</h1>\\n<blockquote>\\n<p>字符串匹配(String Matchiing)也称字符串搜索(String Searching)是字符串算法中重要的一种，是指从一个大字符串或文本中找到模式串出现的位置。</p>\\n</blockquote>\\n<h2> 字符串匹配概念</h2>\\n<blockquote>\\n<p>字符串匹配问题的形式定义：</p>\\n</blockquote>\\n<ul>\\n<li>文本（Text）是一个长度为 n 的数组 T[1..n]；</li>\\n<li>模式（Pattern）是一个长度为 m 且 m≤n 的数组 P[1..m]；</li>\\n<li>T 和 P 中的元素都属于有限的字母表 Σ 表；</li>\\n<li>如果 0≤s≤n-m，并且 T[s+1..s+m] = P[1..m]，即对 1≤j≤m，有 T[s+j] = P[j]，则说模式 P 在文本 T 中出现且位移为 s，且称 s 是一个有效位移（Valid Shift）。</li>\\n</ul>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{t as data};