const a=JSON.parse('{"key":"v-59da0611","path":"/java/javaup/java8-jre.html","title":"Java 8 - JRE精简","lang":"zh-CN","frontmatter":{"date":"2022-04-08T00:00:00.000Z","category":["Java 新特性"],"tag":["Java 新特性"],"description":"Java 8 - JRE精简 理解Java8 JRE精简需理解几个问题: 为什么精简Java8 JRE，及好处是啥? 在不同平台上如何编译等? Oracle公司如期发布了Java 8正式版！没有让广大javaer失望。对于一个人来说，18岁是人生的转折点，从稚嫩走向成熟，法律意味着你是完全民事行为能力人，不再收益于未成年人保护法，到今年为止，java也走过了18年，java8是一个新的里程碑，带来了前所未有的诸多特性，lambda表达式，Stream API，新的Date time api，多核并发支持，重大安全问题改进等，相信java会越来越好，丰富的类库以及庞大的开源生态环境是其他语言所不具备的，说起丰富的类库，很多同学就吐槽了，java该减肥了，确实是该减肥，java8有个很好的特性，即JEP161(http://openjdk.java.net/jeps/161 ),该特性定义了Java SE平台规范的一些子集，使java应用程序不需要整个JRE平台即可部署和运行在小型设备上。开发人员可以基于目标硬件的可用资源选择一个合适的JRE运行环境。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/java/javaup/java8-jre.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"Java 8 - JRE精简"}],["meta",{"property":"og:description","content":"Java 8 - JRE精简 理解Java8 JRE精简需理解几个问题: 为什么精简Java8 JRE，及好处是啥? 在不同平台上如何编译等? Oracle公司如期发布了Java 8正式版！没有让广大javaer失望。对于一个人来说，18岁是人生的转折点，从稚嫩走向成熟，法律意味着你是完全民事行为能力人，不再收益于未成年人保护法，到今年为止，java也走过了18年，java8是一个新的里程碑，带来了前所未有的诸多特性，lambda表达式，Stream API，新的Date time api，多核并发支持，重大安全问题改进等，相信java会越来越好，丰富的类库以及庞大的开源生态环境是其他语言所不具备的，说起丰富的类库，很多同学就吐槽了，java该减肥了，确实是该减肥，java8有个很好的特性，即JEP161(http://openjdk.java.net/jeps/161 ),该特性定义了Java SE平台规范的一些子集，使java应用程序不需要整个JRE平台即可部署和运行在小型设备上。开发人员可以基于目标硬件的可用资源选择一个合适的JRE运行环境。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-25T08:42:25.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"Java 新特性"}],["meta",{"property":"article:published_time","content":"2022-04-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-25T08:42:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 8 - JRE精简\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-08T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-25T08:42:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"JRE精简好处","slug":"jre精简好处","link":"#jre精简好处","children":[]},{"level":2,"title":"概念","slug":"概念","link":"#概念","children":[]},{"level":2,"title":"使用工具开发的效果","slug":"使用工具开发的效果","link":"#使用工具开发的效果","children":[{"level":3,"title":"JDEPS工具使用","slug":"jdeps工具使用","link":"#jdeps工具使用","children":[]},{"level":3,"title":"在linux上构建profile","slug":"在linux上构建profile","link":"#在linux上构建profile","children":[]},{"level":3,"title":"编译后compact大致的占用空间","slug":"编译后compact大致的占用空间","link":"#编译后compact大致的占用空间","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1687917370000,"updatedTime":1703493745000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":3.36,"words":1007},"filePathRelative":"java/javaup/java8-jre.md","localizedDate":"2022年4月8日","excerpt":"<h1> Java 8 - JRE精简</h1>\\n<blockquote>\\n<p>理解Java8 JRE精简需理解几个问题:</p>\\n<ul>\\n<li>为什么精简Java8 JRE，及好处是啥?</li>\\n<li>在不同平台上如何编译等?</li>\\n</ul>\\n</blockquote>\\n<p>Oracle公司如期发布了Java 8正式版！没有让广大javaer失望。对于一个人来说，18岁是人生的转折点，从稚嫩走向成熟，法律意味着你是完全民事行为能力人，不再收益于未成年人保护法，到今年为止，java也走过了18年，java8是一个新的里程碑，带来了前所未有的诸多特性，lambda表达式，Stream API，新的Date time api，多核并发支持，重大安全问题改进等，相信java会越来越好，丰富的类库以及庞大的开源生态环境是其他语言所不具备的，说起丰富的类库，很多同学就吐槽了，java该减肥了，确实是该减肥，java8有个很好的特性，即JEP161(<a href=\\"http://openjdk.java.net/jeps/161\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">http://openjdk.java.net/jeps/161</a> ),该特性定义了Java SE平台规范的一些子集，使java应用程序不需要整个JRE平台即可部署和运行在小型设备上。开发人员可以基于目标硬件的可用资源选择一个合适的JRE运行环境。</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{a as data};