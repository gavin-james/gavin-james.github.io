const e=JSON.parse('{"key":"v-1f68b428","path":"/develop/security/dev-security-x-injection.html","title":"开发安全 - 注入攻击详解","lang":"zh-CN","frontmatter":{"date":"2019-04-14T00:00:00.000Z","category":["开发理论"],"tag":["安全相关"],"description":"开发安全 - 注入攻击详解 注入攻击最为常见的攻击方式，作为开发而言必须完全避免; 本文会介绍常见的几种注入方式，比如：SQL 注入, xPath 注入, 命令注入, LDAP注入, CLRF注入, Host头注入, Email头注入等等，总结来看其本质其实是一样的，且防御措施也大同小异，具体看下面的内容。 SQL 注入","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/develop/security/dev-security-x-injection.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"开发安全 - 注入攻击详解"}],["meta",{"property":"og:description","content":"开发安全 - 注入攻击详解 注入攻击最为常见的攻击方式，作为开发而言必须完全避免; 本文会介绍常见的几种注入方式，比如：SQL 注入, xPath 注入, 命令注入, LDAP注入, CLRF注入, Host头注入, Email头注入等等，总结来看其本质其实是一样的，且防御措施也大同小异，具体看下面的内容。 SQL 注入"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T09:56:01.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"安全相关"}],["meta",{"property":"article:published_time","content":"2019-04-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T09:56:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"开发安全 - 注入攻击详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-04-14T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-26T09:56:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"SQL 注入","slug":"sql-注入","link":"#sql-注入","children":[{"level":3,"title":"什么样的SQL会造成攻击?","slug":"什么样的sql会造成攻击","link":"#什么样的sql会造成攻击","children":[]},{"level":3,"title":"如何防御?","slug":"如何防御","link":"#如何防御","children":[]}]},{"level":2,"title":"xPath 注入","slug":"xpath-注入","link":"#xpath-注入","children":[{"level":3,"title":"xPath是怎么工作的?","slug":"xpath是怎么工作的","link":"#xpath是怎么工作的","children":[]},{"level":3,"title":"如何攻击的?","slug":"如何攻击的","link":"#如何攻击的","children":[]},{"level":3,"title":"如何防御?","slug":"如何防御-1","link":"#如何防御-1","children":[]}]},{"level":2,"title":"命令注入","slug":"命令注入","link":"#命令注入","children":[{"level":3,"title":"什么是命令注入","slug":"什么是命令注入","link":"#什么是命令注入","children":[]},{"level":3,"title":"命令注入的场景","slug":"命令注入的场景","link":"#命令注入的场景","children":[]},{"level":3,"title":"常见注入方式","slug":"常见注入方式","link":"#常见注入方式","children":[]},{"level":3,"title":"一般如何防御呢","slug":"一般如何防御呢","link":"#一般如何防御呢","children":[]}]},{"level":2,"title":"LDAP注入","slug":"ldap注入","link":"#ldap注入","children":[{"level":3,"title":"LDAP简介","slug":"ldap简介","link":"#ldap简介","children":[]},{"level":3,"title":"LDAP注入场景","slug":"ldap注入场景","link":"#ldap注入场景","children":[]},{"level":3,"title":"学习更多LDAP攻防","slug":"学习更多ldap攻防","link":"#学习更多ldap攻防","children":[]}]},{"level":2,"title":"CLRF注入","slug":"clrf注入","link":"#clrf注入","children":[]},{"level":2,"title":"Host头注入","slug":"host头注入","link":"#host头注入","children":[]},{"level":2,"title":"Email头注入","slug":"email头注入","link":"#email头注入","children":[]},{"level":2,"title":"XXE","slug":"xxe","link":"#xxe","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703584561000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":9.94,"words":2981},"filePathRelative":"develop/security/dev-security-x-injection.md","localizedDate":"2019年4月14日","excerpt":"<h1> 开发安全 - 注入攻击详解</h1>\\n<blockquote>\\n<p>注入攻击最为常见的攻击方式，作为开发而言必须完全避免; 本文会介绍常见的几种注入方式，比如：<code>SQL 注入</code>, <code>xPath 注入</code>, <code>命令注入</code>, <code>LDAP注入</code>, <code>CLRF注入</code>, <code>Host头注入</code>, <code>Email头注入</code>等等，总结来看其本质其实是一样的，且防御措施也大同小异，具体看下面的内容。</p>\\n</blockquote>\\n<h2> SQL 注入</h2>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
