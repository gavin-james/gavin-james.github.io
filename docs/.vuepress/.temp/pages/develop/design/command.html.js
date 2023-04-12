export const data = JSON.parse("{\"key\":\"v-2b152058\",\"path\":\"/develop/design/command.html\",\"title\":\"行为型命令模式\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"行为型命令模式\",\"date\":\"2019-11-04T00:00:00.000Z\",\"category\":[\"设计模式\"],\"tag\":[\"设计模式\"],\"description\":\"命令模式基本介绍 在软件开发系统中，「方法的请求者」与「方法的实现者」之间经常存在紧密的耦合关系，这不利于软件功能的扩展与维护。例如，想对方法进行「撤销、重做、记录」等处理都很不方便，因此「如何将方法的请求者与实现者解耦？」变得很重要，命令模式就能很好地解决这个问题。 命令模式（Command Pattern）：在软件设计中，我们经常需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是哪个，我们只需在程序运行时指定具体的请求接收者即可，此时，可以使用命令模式来进行设计。 命名模式使得 请求发送者与请求接收者消除彼此之间的耦合，让对象之间的调用关系更加灵活，实现解耦。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"http://www.gavin-james.com/develop/design/command.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Gavin blog\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"行为型命令模式\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"命令模式基本介绍 在软件开发系统中，「方法的请求者」与「方法的实现者」之间经常存在紧密的耦合关系，这不利于软件功能的扩展与维护。例如，想对方法进行「撤销、重做、记录」等处理都很不方便，因此「如何将方法的请求者与实现者解耦？」变得很重要，命令模式就能很好地解决这个问题。 命令模式（Command Pattern）：在软件设计中，我们经常需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是哪个，我们只需在程序运行时指定具体的请求接收者即可，此时，可以使用命令模式来进行设计。 命名模式使得 请求发送者与请求接收者消除彼此之间的耦合，让对象之间的调用关系更加灵活，实现解耦。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"gavin-james\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"设计模式\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2019-11-04T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"行为型命令模式\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2019-11-04T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"gavin-james\\\",\\\"url\\\":\\\"http://www.gavin-james.xyz\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"命令模式基本介绍\",\"slug\":\"命令模式基本介绍\",\"link\":\"#命令模式基本介绍\",\"children\":[]},{\"level\":2,\"title\":\"命令模式的结构与实现\",\"slug\":\"命令模式的结构与实现\",\"link\":\"#命令模式的结构与实现\",\"children\":[]},{\"level\":2,\"title\":\"命令模式解决智能生活项目\",\"slug\":\"命令模式解决智能生活项目\",\"link\":\"#命令模式解决智能生活项目\",\"children\":[]},{\"level\":2,\"title\":\"JdbcTemplate 的命令模式分析\",\"slug\":\"jdbctemplate-的命令模式分析\",\"link\":\"#jdbctemplate-的命令模式分析\",\"children\":[]},{\"level\":2,\"title\":\"命令模式的注意事项和细节\",\"slug\":\"命令模式的注意事项和细节\",\"link\":\"#命令模式的注意事项和细节\",\"children\":[]},{\"level\":2,\"title\":\"命令模式的应用场景\",\"slug\":\"命令模式的应用场景\",\"link\":\"#命令模式的应用场景\",\"children\":[]}],\"readingTime\":{\"minutes\":9.42,\"words\":2825},\"filePathRelative\":\"develop/design/command.md\",\"localizedDate\":\"2019年11月4日\",\"excerpt\":\"<h2> 命令模式基本介绍</h2>\\n<p>在软件开发系统中，「方法的请求者」与「方法的实现者」之间经常存在紧密的耦合关系，这不利于软件功能的扩展与维护。例如，想对方法进行「撤销、重做、记录」等处理都很不方便，因此「如何将方法的请求者与实现者解耦？」变得很重要，命令模式就能很好地解决这个问题。</p>\\n<p><strong>命令模式</strong>（Command Pattern）：在软件设计中，我们经常需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是哪个，我们只需在程序运行时指定具体的请求接收者即可，此时，可以使用命令模式来进行设计。</p>\\n<p>命名模式使得 <strong>请求发送者与请求接收者消除彼此之间的耦合</strong>，让对象之间的调用关系更加灵活，实现解耦。</p>\",\"copyright\":{\"author\":\"gavin-james\",\"license\":\"https://github.com/gavin-james/gavin-james.github.io/LICENSE\"},\"autoDesc\":true}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
