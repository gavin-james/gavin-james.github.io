const e=JSON.parse('{"key":"v-3f273922","path":"/develop/security/dev-security-x-ddos.html","title":"DDoS 详解","lang":"zh-CN","frontmatter":{"date":"2019-04-17T00:00:00.000Z","category":["开发理论"],"tag":["安全相关"],"description":"DDoS 详解 分布式拒绝服务攻击(英文意思是Distributed Denial of Service，简称DDoS)是指处于不同位置的多个攻击者同时向一个或数个目标发动攻击，或者一个攻击者控制了位于不同位置的多台机器并利用这些机器对受害者同时实施攻击。由于攻击的发出点是分布在不同地方的，这类攻击称为分布式拒绝服务攻击，其中的攻击者可以有多个。 攻击简介 DDoS攻击模型的四种角色： 黑客（Intruder/Attacker/Client） 黑客操作主机的接口，向Master发送各种命令。 主控端（Master/Handler） 监听Intruder的命令，向各个Daemon发送攻击命令。 守护进程端（Daemon/Slave/Agent/Zombie/Bot/Server） 接收和响应来自Master的攻击命令，是真正攻击前锋。 受害者（Victim）被攻击的目标主机。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/develop/security/dev-security-x-ddos.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"DDoS 详解"}],["meta",{"property":"og:description","content":"DDoS 详解 分布式拒绝服务攻击(英文意思是Distributed Denial of Service，简称DDoS)是指处于不同位置的多个攻击者同时向一个或数个目标发动攻击，或者一个攻击者控制了位于不同位置的多台机器并利用这些机器对受害者同时实施攻击。由于攻击的发出点是分布在不同地方的，这类攻击称为分布式拒绝服务攻击，其中的攻击者可以有多个。 攻击简介 DDoS攻击模型的四种角色： 黑客（Intruder/Attacker/Client） 黑客操作主机的接口，向Master发送各种命令。 主控端（Master/Handler） 监听Intruder的命令，向各个Daemon发送攻击命令。 守护进程端（Daemon/Slave/Agent/Zombie/Bot/Server） 接收和响应来自Master的攻击命令，是真正攻击前锋。 受害者（Victim）被攻击的目标主机。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-27T08:55:11.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"安全相关"}],["meta",{"property":"article:published_time","content":"2019-04-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-27T08:55:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DDoS 详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-04-17T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-27T08:55:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"攻击简介","slug":"攻击简介","link":"#攻击简介","children":[]},{"level":2,"title":"攻击原理","slug":"攻击原理","link":"#攻击原理","children":[]},{"level":2,"title":"攻击分类","slug":"攻击分类","link":"#攻击分类","children":[{"level":3,"title":"分类","slug":"分类","link":"#分类","children":[]}]},{"level":2,"title":"攻击方式","slug":"攻击方式","link":"#攻击方式","children":[{"level":3,"title":"攻击网络资源带宽","slug":"攻击网络资源带宽","link":"#攻击网络资源带宽","children":[]},{"level":3,"title":"攻击系统资源","slug":"攻击系统资源","link":"#攻击系统资源","children":[]},{"level":3,"title":"攻击应用资源","slug":"攻击应用资源","link":"#攻击应用资源","children":[]}]},{"level":2,"title":"攻击防御","slug":"攻击防御","link":"#攻击防御","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703667311000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":3}]},"readingTime":{"minutes":39.51,"words":11852},"filePathRelative":"develop/security/dev-security-x-ddos.md","localizedDate":"2019年4月17日","excerpt":"<h1> DDoS 详解</h1>\\n<blockquote>\\n<p>分布式拒绝服务攻击(英文意思是Distributed Denial of Service，简称DDoS)是指处于不同位置的多个攻击者同时向一个或数个目标发动攻击，或者一个攻击者控制了位于不同位置的多台机器并利用这些机器对受害者同时实施攻击。由于攻击的发出点是分布在不同地方的，这类攻击称为分布式拒绝服务攻击，其中的攻击者可以有多个。</p>\\n</blockquote>\\n<h2> 攻击简介</h2>\\n<p>DDoS攻击模型的四种角色：</p>\\n<ul>\\n<li>黑客（Intruder/Attacker/Client）   黑客操作主机的接口，向Master发送各种命令。</li>\\n<li>主控端（Master/Handler）   监听Intruder的命令，向各个Daemon发送攻击命令。</li>\\n<li>守护进程端（Daemon/Slave/Agent/Zombie/Bot/Server）   接收和响应来自Master的攻击命令，是真正攻击前锋。</li>\\n<li>受害者（Victim）被攻击的目标主机。</li>\\n</ul>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
