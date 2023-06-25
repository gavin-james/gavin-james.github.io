const e=JSON.parse('{"key":"v-9fc6e360","path":"/develop/design/adapter.html","title":"结构型适配器模式","lang":"zh-CN","frontmatter":{"title":"结构型适配器模式","date":"2019-10-18T00:00:00.000Z","category":["设计模式"],"tag":["设计模式"],"description":"基本介绍 在现实生活中，经常出现两个对象因接口不兼容而不能在一起工作的实例，这时需要第三者进行适配。例如，讲中文的人同讲英文的人对话时需要一个翻译，用直流电的笔记本电脑接交流电源时需要一个电源适配器，用计算机访问照相机的 SD 内存卡时需要一个读卡器等。 在软件设计中也可能出现：需要开发的具有某种业务功能的组件在现有的组件库中已经存在，但它们与当前系统的接口规范不兼容，如果重新开发这些组件成本又很高，这时用适配器模式能很好地解决这些问题。 适配器模式（Adapter Pattern）将某个类的接口转换成客户端期望的另一个接口表示，主的目的是兼容性，让原本因接口不匹配不能一起工作的两个类可以协同工作。其别名为包装器（Wrapper）。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/develop/design/adapter.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"结构型适配器模式"}],["meta",{"property":"og:description","content":"基本介绍 在现实生活中，经常出现两个对象因接口不兼容而不能在一起工作的实例，这时需要第三者进行适配。例如，讲中文的人同讲英文的人对话时需要一个翻译，用直流电的笔记本电脑接交流电源时需要一个电源适配器，用计算机访问照相机的 SD 内存卡时需要一个读卡器等。 在软件设计中也可能出现：需要开发的具有某种业务功能的组件在现有的组件库中已经存在，但它们与当前系统的接口规范不兼容，如果重新开发这些组件成本又很高，这时用适配器模式能很好地解决这些问题。 适配器模式（Adapter Pattern）将某个类的接口转换成客户端期望的另一个接口表示，主的目的是兼容性，让原本因接口不匹配不能一起工作的两个类可以协同工作。其别名为包装器（Wrapper）。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-12T04:14:48.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"设计模式"}],["meta",{"property":"article:published_time","content":"2019-10-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-12T04:14:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"结构型适配器模式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-18T00:00:00.000Z\\",\\"dateModified\\":\\"2023-04-12T04:14:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"基本介绍","slug":"基本介绍","link":"#基本介绍","children":[]},{"level":2,"title":"模式的结构","slug":"模式的结构","link":"#模式的结构","children":[]},{"level":2,"title":"工作原理","slug":"工作原理","link":"#工作原理","children":[]},{"level":2,"title":"现实生活中的适配器例子","slug":"现实生活中的适配器例子","link":"#现实生活中的适配器例子","children":[]},{"level":2,"title":"类适配器模式","slug":"类适配器模式","link":"#类适配器模式","children":[{"level":3,"title":"类适配器模式介绍","slug":"类适配器模式介绍","link":"#类适配器模式介绍","children":[]},{"level":3,"title":"类适配器模式应用实例","slug":"类适配器模式应用实例","link":"#类适配器模式应用实例","children":[]},{"level":3,"title":"类适配器模式注意事项和细节","slug":"类适配器模式注意事项和细节","link":"#类适配器模式注意事项和细节","children":[]}]},{"level":2,"title":"对象适配器模式","slug":"对象适配器模式","link":"#对象适配器模式","children":[{"level":3,"title":"对象适配器模式介绍","slug":"对象适配器模式介绍","link":"#对象适配器模式介绍","children":[]},{"level":3,"title":"对象适配器模式应用实例","slug":"对象适配器模式应用实例","link":"#对象适配器模式应用实例","children":[]},{"level":3,"title":"对象适配器模式注意事项和细节","slug":"对象适配器模式注意事项和细节","link":"#对象适配器模式注意事项和细节","children":[]}]},{"level":2,"title":"接口适配器模式","slug":"接口适配器模式","link":"#接口适配器模式","children":[{"level":3,"title":"接口适配器模式介绍","slug":"接口适配器模式介绍","link":"#接口适配器模式介绍","children":[]},{"level":3,"title":"接口适配器模式应用实例","slug":"接口适配器模式应用实例","link":"#接口适配器模式应用实例","children":[]}]},{"level":2,"title":"SpringMVC 的适配器模式剖析","slug":"springmvc-的适配器模式剖析","link":"#springmvc-的适配器模式剖析","children":[]},{"level":2,"title":"适配器模式的注意事项和细节","slug":"适配器模式的注意事项和细节","link":"#适配器模式的注意事项和细节","children":[]},{"level":2,"title":"适配器模式的应用场景","slug":"适配器模式的应用场景","link":"#适配器模式的应用场景","children":[]}],"git":{"createdTime":1681272888000,"updatedTime":1681272888000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":1}]},"readingTime":{"minutes":9,"words":2701},"filePathRelative":"develop/design/adapter.md","localizedDate":"2019年10月18日","excerpt":"<h2> 基本介绍</h2>\\n<p>在现实生活中，经常出现两个对象因接口不兼容而不能在一起工作的实例，这时需要第三者进行适配。例如，讲中文的人同讲英文的人对话时需要一个翻译，用直流电的笔记本电脑接交流电源时需要一个电源适配器，用计算机访问照相机的 SD 内存卡时需要一个读卡器等。</p>\\n<p>在软件设计中也可能出现：需要开发的具有某种业务功能的组件在现有的组件库中已经存在，但它们与当前系统的接口规范不兼容，如果重新开发这些组件成本又很高，这时用适配器模式能很好地解决这些问题。</p>\\n<p><strong>适配器模式</strong>（Adapter Pattern）将某个类的接口转换成客户端期望的另一个接口表示，主的目的是兼容性，让原本因接口不匹配不能一起工作的两个类可以协同工作。其别名为包装器（Wrapper）。</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
