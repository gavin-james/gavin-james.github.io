const e=JSON.parse('{"key":"v-595dbbce","path":"/develop/quality-assurance/unit-test.html","title":"浅谈单元测试","lang":"zh-CN","frontmatter":{"date":"2019-02-04T00:00:00.000Z","description":"浅谈单元测试 单元测试（unit testing），是指对软件中的最小可测试单元进行检查和验证。这是基础，所以围绕着单元测试，我从网上搜集和总结了相关的概念，以助你完善体系。 什么是单元测试？ 来自百度百科。 单元测试（unit testing），是指对软件中的最小可测试单元进行检查和验证。对于单元测试中单元的含义，一般来说，要根据实际情况去判定其具体含义，如C语言中单元指一个函数，Java里单元指一个类，图形化的软件中可以指一个窗口或一个菜单等。总的来说，单元就是人为规定的最小的被测功能模块。单元测试是在软件开发过程中要进行的最低级别的测试活动，软件的独立单元将在与程序的其他部分相隔离的情况下进行测试。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/develop/quality-assurance/unit-test.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"浅谈单元测试"}],["meta",{"property":"og:description","content":"浅谈单元测试 单元测试（unit testing），是指对软件中的最小可测试单元进行检查和验证。这是基础，所以围绕着单元测试，我从网上搜集和总结了相关的概念，以助你完善体系。 什么是单元测试？ 来自百度百科。 单元测试（unit testing），是指对软件中的最小可测试单元进行检查和验证。对于单元测试中单元的含义，一般来说，要根据实际情况去判定其具体含义，如C语言中单元指一个函数，Java里单元指一个类，图形化的软件中可以指一个窗口或一个菜单等。总的来说，单元就是人为规定的最小的被测功能模块。单元测试是在软件开发过程中要进行的最低级别的测试活动，软件的独立单元将在与程序的其他部分相隔离的情况下进行测试。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-18T08:49:30.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:published_time","content":"2019-02-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-18T08:49:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"浅谈单元测试\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-02-04T00:00:00.000Z\\",\\"dateModified\\":\\"2023-04-18T08:49:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"什么是单元测试？","slug":"什么是单元测试","link":"#什么是单元测试","children":[]},{"level":2,"title":"为什么要写单元测试？","slug":"为什么要写单元测试","link":"#为什么要写单元测试","children":[]},{"level":2,"title":"什么时候写单元测试？","slug":"什么时候写单元测试","link":"#什么时候写单元测试","children":[]},{"level":2,"title":"单元测试要写多细？","slug":"单元测试要写多细","link":"#单元测试要写多细","children":[]},{"level":2,"title":"有哪些单元测试相关的概念？","slug":"有哪些单元测试相关的概念","link":"#有哪些单元测试相关的概念","children":[{"level":3,"title":"被测系统","slug":"被测系统","link":"#被测系统","children":[]},{"level":3,"title":"测试依赖组件(DOC)","slug":"测试依赖组件-doc","link":"#测试依赖组件-doc","children":[]},{"level":3,"title":"测试替身(Test Double)","slug":"测试替身-test-double","link":"#测试替身-test-double","children":[]},{"level":3,"title":"Test fixture","slug":"test-fixture","link":"#test-fixture","children":[]},{"level":3,"title":"测试用例(Test case)","slug":"测试用例-test-case","link":"#测试用例-test-case","children":[]}]},{"level":2,"title":"测试套件","slug":"测试套件","link":"#测试套件","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1681807575000,"updatedTime":1681807770000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":8.39,"words":2516},"filePathRelative":"develop/quality-assurance/unit-test.md","localizedDate":"2019年2月4日","excerpt":"<h1> 浅谈单元测试</h1>\\n<blockquote>\\n<p>单元测试（unit testing），是指对软件中的最小可测试单元进行检查和验证。这是基础，所以围绕着单元测试，我从网上搜集和总结了相关的概念，以助你完善体系。</p>\\n</blockquote>\\n<h2> 什么是单元测试？</h2>\\n<blockquote>\\n<p>来自百度百科。</p>\\n</blockquote>\\n<p>单元测试（unit testing），是指对软件中的最小可测试单元进行检查和验证。对于单元测试中单元的含义，一般来说，要根据实际情况去判定其具体含义，如C语言中单元指一个函数，Java里单元指一个类，图形化的软件中可以指一个窗口或一个菜单等。总的来说，单元就是人为规定的最小的被测功能模块。单元测试是在软件开发过程中要进行的最低级别的测试活动，软件的独立单元将在与程序的其他部分相隔离的情况下进行测试。</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
