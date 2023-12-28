const d=JSON.parse('{"key":"v-24c4e449","path":"/develop/regex/dev-regex-usage.html","title":"常用正则表达式","lang":"zh-CN","frontmatter":{"date":"2019-04-22T00:00:00.000Z","category":["开发理论"],"tag":["正则表达式"],"description":"常用正则表达式 在学习了正则表达式知识点之后，通常使用正则表达式推荐你本文总结的常用的正则表达式，能覆盖80%的应用场景，如果没有通过再下一篇的工具自己写和校验。 校验数字的表达式 数字：^[0-9]*$ n位的数字：^\\\\d{n}$ 至少n位的数字：^\\\\d{n,}$ m-n位的数字：^\\\\d{m,n}$ 零和非零开头的数字：^(0|[1-9][0-9]*)$ 非零开头的最多带两位小数的数字：^([1-9][0-9]*)+(\\\\.[0-9]{1,2})?$ 带1-2位小数的正数或负数：^(\\\\-)?\\\\d+(\\\\.\\\\d{1,2})$ 正数、负数、和小数：^(\\\\-|\\\\+)?\\\\d+(\\\\.\\\\d+)?$ 有两位小数的正实数：^[0-9]+(\\\\.[0-9]{2})?$ 有1~3位小数的正实数：^[0-9]+(\\\\.[0-9]{1,3})?$ 非零的正整数：^[1-9]\\\\d*$ 或 ^([1-9][0-9]*){1,3}$ 或 ^\\\\+?[1-9][0-9]*$ 非零的负整数：^\\\\-[1-9][]0-9\\"*$ 或 ^-[1-9]\\\\d*$ 非负整数：^\\\\d+$ 或 ^[1-9]\\\\d*|0$ 非正整数：^-[1-9]\\\\d*|0$ 或 ^((-\\\\d+)|(0+))$ 非负浮点数：^\\\\d+(\\\\.\\\\d+)?$ 或 ^[1-9]\\\\d*\\\\.\\\\d*|0\\\\.\\\\d*[1-9]\\\\d*|0?\\\\.0+|0$ 非正浮点数：^((-\\\\d+(\\\\.\\\\d+)?)|(0+(\\\\.0+)?))$ 或 ^(-([1-9]\\\\d*\\\\.\\\\d*|0\\\\.\\\\d*[1-9]\\\\d*))|0?\\\\.0+|0$ 正浮点数：^[1-9]\\\\d*\\\\.\\\\d*|0\\\\.\\\\d*[1-9]\\\\d*$ 或 ^(([0-9]+\\\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\\\.+ [0-9]+)|([0-9]*[1-9][0-9]*))$ 负浮点数：^-([1-9]\\\\d*\\\\.\\\\d*|0\\\\.\\\\d*[1-9]\\\\d*)$ 或 ^(-(([0-9]+\\\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\\\.[0-9]+)|([0-9]*[1-9][0-9]*)))$ 浮点数：^(-?\\\\d+)(\\\\.\\\\d+)?$ 或 ^-?([1-9]\\\\d*\\\\.\\\\d*|0\\\\.\\\\d*[1-9]\\\\d*|0?\\\\.0+|0)$","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/develop/regex/dev-regex-usage.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"常用正则表达式"}],["meta",{"property":"og:description","content":"常用正则表达式 在学习了正则表达式知识点之后，通常使用正则表达式推荐你本文总结的常用的正则表达式，能覆盖80%的应用场景，如果没有通过再下一篇的工具自己写和校验。 校验数字的表达式 数字：^[0-9]*$ n位的数字：^\\\\d{n}$ 至少n位的数字：^\\\\d{n,}$ m-n位的数字：^\\\\d{m,n}$ 零和非零开头的数字：^(0|[1-9][0-9]*)$ 非零开头的最多带两位小数的数字：^([1-9][0-9]*)+(\\\\.[0-9]{1,2})?$ 带1-2位小数的正数或负数：^(\\\\-)?\\\\d+(\\\\.\\\\d{1,2})$ 正数、负数、和小数：^(\\\\-|\\\\+)?\\\\d+(\\\\.\\\\d+)?$ 有两位小数的正实数：^[0-9]+(\\\\.[0-9]{2})?$ 有1~3位小数的正实数：^[0-9]+(\\\\.[0-9]{1,3})?$ 非零的正整数：^[1-9]\\\\d*$ 或 ^([1-9][0-9]*){1,3}$ 或 ^\\\\+?[1-9][0-9]*$ 非零的负整数：^\\\\-[1-9][]0-9\\"*$ 或 ^-[1-9]\\\\d*$ 非负整数：^\\\\d+$ 或 ^[1-9]\\\\d*|0$ 非正整数：^-[1-9]\\\\d*|0$ 或 ^((-\\\\d+)|(0+))$ 非负浮点数：^\\\\d+(\\\\.\\\\d+)?$ 或 ^[1-9]\\\\d*\\\\.\\\\d*|0\\\\.\\\\d*[1-9]\\\\d*|0?\\\\.0+|0$ 非正浮点数：^((-\\\\d+(\\\\.\\\\d+)?)|(0+(\\\\.0+)?))$ 或 ^(-([1-9]\\\\d*\\\\.\\\\d*|0\\\\.\\\\d*[1-9]\\\\d*))|0?\\\\.0+|0$ 正浮点数：^[1-9]\\\\d*\\\\.\\\\d*|0\\\\.\\\\d*[1-9]\\\\d*$ 或 ^(([0-9]+\\\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\\\.+ [0-9]+)|([0-9]*[1-9][0-9]*))$ 负浮点数：^-([1-9]\\\\d*\\\\.\\\\d*|0\\\\.\\\\d*[1-9]\\\\d*)$ 或 ^(-(([0-9]+\\\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\\\.[0-9]+)|([0-9]*[1-9][0-9]*)))$ 浮点数：^(-?\\\\d+)(\\\\.\\\\d+)?$ 或 ^-?([1-9]\\\\d*\\\\.\\\\d*|0\\\\.\\\\d*[1-9]\\\\d*|0?\\\\.0+|0)$"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-27T08:55:11.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"正则表达式"}],["meta",{"property":"article:published_time","content":"2019-04-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-27T08:55:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"常用正则表达式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-04-22T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-27T08:55:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"校验数字的表达式","slug":"校验数字的表达式","link":"#校验数字的表达式","children":[]},{"level":2,"title":"校验字符的表达式","slug":"校验字符的表达式","link":"#校验字符的表达式","children":[]},{"level":2,"title":"特殊需求表达式","slug":"特殊需求表达式","link":"#特殊需求表达式","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703667311000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":3}]},"readingTime":{"minutes":5.75,"words":1724},"filePathRelative":"develop/regex/dev-regex-usage.md","localizedDate":"2019年4月22日","excerpt":"<h1> 常用正则表达式</h1>\\n<blockquote>\\n<p>在学习了正则表达式知识点之后，通常使用正则表达式推荐你本文总结的常用的正则表达式，能覆盖80%的应用场景，如果没有通过再下一篇的工具自己写和校验。</p>\\n</blockquote>\\n<h2> 校验数字的表达式</h2>\\n<ul>\\n<li>数字：<code>^[0-9]*$</code></li>\\n<li>n位的数字：<code>^\\\\d{n}$</code></li>\\n<li>至少n位的数字：<code>^\\\\d{n,}$</code></li>\\n<li>m-n位的数字：<code>^\\\\d{m,n}$</code></li>\\n<li>零和非零开头的数字：<code>^(0|[1-9][0-9]*)$</code></li>\\n<li>非零开头的最多带两位小数的数字：<code>^([1-9][0-9]*)+(\\\\.[0-9]{1,2})?$</code></li>\\n<li>带1-2位小数的正数或负数：<code>^(\\\\-)?\\\\d+(\\\\.\\\\d{1,2})$</code></li>\\n<li>正数、负数、和小数：<code>^(\\\\-|\\\\+)?\\\\d+(\\\\.\\\\d+)?$</code></li>\\n<li>有两位小数的正实数：<code>^[0-9]+(\\\\.[0-9]{2})?$</code></li>\\n<li>有1~3位小数的正实数：<code>^[0-9]+(\\\\.[0-9]{1,3})?$</code></li>\\n<li>非零的正整数：<code>^[1-9]\\\\d*$ 或 ^([1-9][0-9]*){1,3}$</code> 或 <code>^\\\\+?[1-9][0-9]*$</code></li>\\n<li>非零的负整数：<code>^\\\\-[1-9][]0-9\\"*$</code> 或 <code>^-[1-9]\\\\d*$</code></li>\\n<li>非负整数：<code>^\\\\d+$</code> 或 <code>^[1-9]\\\\d*|0$</code></li>\\n<li>非正整数：<code>^-[1-9]\\\\d*|0$</code> 或 <code>^((-\\\\d+)|(0+))$</code></li>\\n<li>非负浮点数：<code>^\\\\d+(\\\\.\\\\d+)?$</code> 或 <code>^[1-9]\\\\d*\\\\.\\\\d*|0\\\\.\\\\d*[1-9]\\\\d*|0?\\\\.0+|0$</code></li>\\n<li>非正浮点数：<code>^((-\\\\d+(\\\\.\\\\d+)?)|(0+(\\\\.0+)?))$</code> 或 <code>^(-([1-9]\\\\d*\\\\.\\\\d*|0\\\\.\\\\d*[1-9]\\\\d*))|0?\\\\.0+|0$</code></li>\\n<li>正浮点数：<code>^[1-9]\\\\d*\\\\.\\\\d*|0\\\\.\\\\d*[1-9]\\\\d*$</code> 或 <code>^(([0-9]+\\\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\\\.+ [0-9]+)|([0-9]*[1-9][0-9]*))$</code></li>\\n<li>负浮点数：<code>^-([1-9]\\\\d*\\\\.\\\\d*|0\\\\.\\\\d*[1-9]\\\\d*)$</code> 或 <code>^(-(([0-9]+\\\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\\\.[0-9]+)|([0-9]*[1-9][0-9]*)))$</code></li>\\n<li>浮点数：<code>^(-?\\\\d+)(\\\\.\\\\d+)?$</code> 或 <code>^-?([1-9]\\\\d*\\\\.\\\\d*|0\\\\.\\\\d*[1-9]\\\\d*|0?\\\\.0+|0)$</code></li>\\n</ul>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{d as data};