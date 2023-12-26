const e=JSON.parse('{"key":"v-c516bfa4","path":"/develop/security/dev-security-x-click-hijack.html","title":"开发安全 - 点击劫持详解","lang":"zh-CN","frontmatter":{"date":"2019-04-18T00:00:00.000Z","category":["开发理论"],"tag":["安全相关"],"description":"开发安全 - 点击劫持详解 点击劫持其实是一种视觉上的欺骗手段，攻击者将一个透明的、不可见的iframe覆盖在一个网页上，通过调整iframe页面位置，诱使用户在页面上进行操作，在不知情的情况下用户的点击恰好是点击在iframe页面的一些功能按钮上。 点击劫持简介 点击劫持是一种恶意技术，欺骗网络用户点击与用户认为他们点击的内容不同的内容，从而可能在点击看似无害的网页时泄露机密信息。〜维基百科 点击劫持攻击基本上意味着欺骗用户通过框架页面点击某些东西来执行一些恶意攻击，比如，当攻击者在窗口中使用透明iframe诱骗用户点击CTA（例如按钮或链接）到另一个具有相同外观窗口的服务器时发生攻击。从某种意义上说，攻击者劫持了原始服务器的点击并将其发送到另一台服务器。这是对访问者本身和服务器的攻击。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/develop/security/dev-security-x-click-hijack.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"开发安全 - 点击劫持详解"}],["meta",{"property":"og:description","content":"开发安全 - 点击劫持详解 点击劫持其实是一种视觉上的欺骗手段，攻击者将一个透明的、不可见的iframe覆盖在一个网页上，通过调整iframe页面位置，诱使用户在页面上进行操作，在不知情的情况下用户的点击恰好是点击在iframe页面的一些功能按钮上。 点击劫持简介 点击劫持是一种恶意技术，欺骗网络用户点击与用户认为他们点击的内容不同的内容，从而可能在点击看似无害的网页时泄露机密信息。〜维基百科 点击劫持攻击基本上意味着欺骗用户通过框架页面点击某些东西来执行一些恶意攻击，比如，当攻击者在窗口中使用透明iframe诱骗用户点击CTA（例如按钮或链接）到另一个具有相同外观窗口的服务器时发生攻击。从某种意义上说，攻击者劫持了原始服务器的点击并将其发送到另一台服务器。这是对访问者本身和服务器的攻击。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T09:56:01.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"安全相关"}],["meta",{"property":"article:published_time","content":"2019-04-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T09:56:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"开发安全 - 点击劫持详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-04-18T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T09:56:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"点击劫持简介","slug":"点击劫持简介","link":"#点击劫持简介","children":[]},{"level":2,"title":"攻击方式","slug":"攻击方式","link":"#攻击方式","children":[{"level":3,"title":"图片覆盖攻击（XSIO）","slug":"图片覆盖攻击-xsio","link":"#图片覆盖攻击-xsio","children":[]},{"level":3,"title":"Flash点击劫持","slug":"flash点击劫持","link":"#flash点击劫持","children":[]},{"level":3,"title":"拖拽劫持与数据窃取","slug":"拖拽劫持与数据窃取","link":"#拖拽劫持与数据窃取","children":[]},{"level":3,"title":"触屏劫持（TapJacking）","slug":"触屏劫持-tapjacking","link":"#触屏劫持-tapjacking","children":[]}]},{"level":2,"title":"攻击示例","slug":"攻击示例","link":"#攻击示例","children":[{"level":3,"title":"iframe覆盖（嵌入iframe框）","slug":"iframe覆盖-嵌入iframe框","link":"#iframe覆盖-嵌入iframe框","children":[]},{"level":3,"title":"粘贴劫持","slug":"粘贴劫持","link":"#粘贴劫持","children":[]},{"level":3,"title":"拖放劫持","slug":"拖放劫持","link":"#拖放劫持","children":[]},{"level":3,"title":"组合利用方式","slug":"组合利用方式","link":"#组合利用方式","children":[]}]},{"level":2,"title":"点击劫持利用框架","slug":"点击劫持利用框架","link":"#点击劫持利用框架","children":[]},{"level":2,"title":"点击劫持防御","slug":"点击劫持防御","link":"#点击劫持防御","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703584561000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":8.9,"words":2671},"filePathRelative":"develop/security/dev-security-x-click-hijack.md","localizedDate":"2019年4月18日","excerpt":"<h1> 开发安全 - 点击劫持详解</h1>\\n<blockquote>\\n<p>点击劫持其实是一种视觉上的欺骗手段，攻击者将一个透明的、不可见的iframe覆盖在一个网页上，通过调整iframe页面位置，诱使用户在页面上进行操作，在不知情的情况下用户的点击恰好是点击在iframe页面的一些功能按钮上。</p>\\n</blockquote>\\n<h2> 点击劫持简介</h2>\\n<blockquote>\\n<p>点击劫持是一种恶意技术，欺骗网络用户点击与用户认为他们点击的内容不同的内容，从而可能在点击看似无害的网页时泄露机密信息。〜维基百科</p>\\n</blockquote>\\n<p>点击劫持攻击基本上意味着欺骗用户通过框架页面点击某些东西来执行一些恶意攻击，比如，当攻击者在窗口中使用透明iframe诱骗用户点击CTA（例如按钮或链接）到另一个具有相同外观窗口的服务器时发生攻击。从某种意义上说，攻击者劫持了原始服务器的点击并将其发送到另一台服务器。这是对访问者本身和服务器的攻击。</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
