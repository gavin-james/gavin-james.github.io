export const data = JSON.parse("{\"key\":\"v-7a5d87ce\",\"path\":\"/develop/design/state.html\",\"title\":\"行为型状态模式\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"行为型状态模式\",\"date\":\"2019-11-18T00:00:00.000Z\",\"category\":[\"设计模式\"],\"tag\":[\"设计模式\"],\"description\":\"状态模式基本介绍 在软件开发过程中，应用程序中的部分对象可能会根据不同的情况做出不同的行为，我们把这种对象称为有状态的对象，而把影响对象行为的一个或多个动态变化的属性称为状态。当有状态的对象与外部事件产生互动时，其内部状态就会发生改变，从而使其行为也发生改变。如人都有高兴和伤心的时候，不同的情绪有不同的行为，当然外界也会影响其情绪变化。 对这种有状态的对象编程，传统的解决方案是：将这些所有可能发生的情况全都考虑到，然后使用 if-else 或 switch-case 语句来做状态判断，再进行不同情况的处理。但是显然这种做法对复杂的状态判断存在天然弊端，条件判断语句会过于臃肿，可读性差，且不具备扩展性，维护难度也大。且增加新的状态时要添加新的 if-else 语句，这违背了「开闭原则」，不利于程序的扩展。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"http://www.gavin-james.com/develop/design/state.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Gavin blog\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"行为型状态模式\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"状态模式基本介绍 在软件开发过程中，应用程序中的部分对象可能会根据不同的情况做出不同的行为，我们把这种对象称为有状态的对象，而把影响对象行为的一个或多个动态变化的属性称为状态。当有状态的对象与外部事件产生互动时，其内部状态就会发生改变，从而使其行为也发生改变。如人都有高兴和伤心的时候，不同的情绪有不同的行为，当然外界也会影响其情绪变化。 对这种有状态的对象编程，传统的解决方案是：将这些所有可能发生的情况全都考虑到，然后使用 if-else 或 switch-case 语句来做状态判断，再进行不同情况的处理。但是显然这种做法对复杂的状态判断存在天然弊端，条件判断语句会过于臃肿，可读性差，且不具备扩展性，维护难度也大。且增加新的状态时要添加新的 if-else 语句，这违背了「开闭原则」，不利于程序的扩展。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"gavin-james\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"设计模式\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2019-11-18T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"行为型状态模式\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2019-11-18T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"gavin-james\\\",\\\"url\\\":\\\"http://www.gavin-james.xyz\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"状态模式基本介绍\",\"slug\":\"状态模式基本介绍\",\"link\":\"#状态模式基本介绍\",\"children\":[]},{\"level\":2,\"title\":\"状态模式的结构与实现\",\"slug\":\"状态模式的结构与实现\",\"link\":\"#状态模式的结构与实现\",\"children\":[]},{\"level\":2,\"title\":\"APP 抽奖活动问题\",\"slug\":\"app-抽奖活动问题\",\"link\":\"#app-抽奖活动问题\",\"children\":[]},{\"level\":2,\"title\":\"状态模式解决抽奖活动问题\",\"slug\":\"状态模式解决抽奖活动问题\",\"link\":\"#状态模式解决抽奖活动问题\",\"children\":[]},{\"level\":2,\"title\":\"状态模式在实际项目源码\",\"slug\":\"状态模式在实际项目源码\",\"link\":\"#状态模式在实际项目源码\",\"children\":[]},{\"level\":2,\"title\":\"状态模式的注意事项和细节\",\"slug\":\"状态模式的注意事项和细节\",\"link\":\"#状态模式的注意事项和细节\",\"children\":[]},{\"level\":2,\"title\":\"状态模式的应用场景\",\"slug\":\"状态模式的应用场景\",\"link\":\"#状态模式的应用场景\",\"children\":[]}],\"readingTime\":{\"minutes\":11.65,\"words\":3496},\"filePathRelative\":\"develop/design/state.md\",\"localizedDate\":\"2019年11月18日\",\"excerpt\":\"<h2> 状态模式基本介绍</h2>\\n<p>在软件开发过程中，应用程序中的部分对象可能会根据不同的情况做出不同的行为，我们把这种对象称为有状态的对象，而把影响对象行为的一个或多个动态变化的属性称为状态。当有状态的对象与外部事件产生互动时，其内部状态就会发生改变，从而使其行为也发生改变。如人都有高兴和伤心的时候，不同的情绪有不同的行为，当然外界也会影响其情绪变化。</p>\\n<p>对这种有状态的对象编程，传统的解决方案是：将这些所有可能发生的情况全都考虑到，然后使用 if-else 或 switch-case 语句来做状态判断，再进行不同情况的处理。但是显然这种做法对复杂的状态判断存在天然弊端，条件判断语句会过于臃肿，可读性差，且不具备扩展性，维护难度也大。且增加新的状态时要添加新的 if-else 语句，这违背了「开闭原则」，不利于程序的扩展。</p>\",\"copyright\":{\"author\":\"gavin-james\",\"license\":\"https://github.com/gavin-james/gavin-james.github.io/LICENSE\"},\"autoDesc\":true}")

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
