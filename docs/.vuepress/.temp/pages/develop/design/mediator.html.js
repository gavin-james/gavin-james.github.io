export const data = JSON.parse("{\"key\":\"v-fd9681c0\",\"path\":\"/develop/design/mediator.html\",\"title\":\"行为型中介模式\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"行为型中介模式\",\"date\":\"2019-11-12T00:00:00.000Z\",\"category\":[\"设计模式\"],\"tag\":[\"设计模式\"],\"description\":\"中介者模式基本介绍 中介者模式（Mediator Pattern）又叫 调停模式，它是迪米特法则的典型应用。用一个 中介对象来封装一系列的对象交互。中介者使各个对象不需要显式地相互引用，从而使其 耦合松散，而且可以独立地改变它们之间的交互。 中介者模式属于行为型模式，使代码易于维护。 在现实生活中，常常会出现好多对象之间存在复杂的交互关系，这种交互关系常常是「网状结构」，它要求每个对象都必须知道它需要交互的对象。例如，每个人必须记住他（她）所有朋友的电话；而且，朋友中如果有人的电话修改了，他（她）必须让其他所有的朋友一起修改，这叫作「牵一发而动全身」，非常复杂。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"http://www.gavin-james.com/develop/design/mediator.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Gavin James\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"行为型中介模式\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"中介者模式基本介绍 中介者模式（Mediator Pattern）又叫 调停模式，它是迪米特法则的典型应用。用一个 中介对象来封装一系列的对象交互。中介者使各个对象不需要显式地相互引用，从而使其 耦合松散，而且可以独立地改变它们之间的交互。 中介者模式属于行为型模式，使代码易于维护。 在现实生活中，常常会出现好多对象之间存在复杂的交互关系，这种交互关系常常是「网状结构」，它要求每个对象都必须知道它需要交互的对象。例如，每个人必须记住他（她）所有朋友的电话；而且，朋友中如果有人的电话修改了，他（她）必须让其他所有的朋友一起修改，这叫作「牵一发而动全身」，非常复杂。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"gavin-james\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"设计模式\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2019-11-12T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"行为型中介模式\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2019-11-12T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"gavin-james\\\",\\\"url\\\":\\\"http://www.gavin-james.xyz\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"中介者模式基本介绍\",\"slug\":\"中介者模式基本介绍\",\"link\":\"#中介者模式基本介绍\",\"children\":[]},{\"level\":2,\"title\":\"中介者模式的结构与实现\",\"slug\":\"中介者模式的结构与实现\",\"link\":\"#中介者模式的结构与实现\",\"children\":[]},{\"level\":2,\"title\":\"智能家具项目\",\"slug\":\"智能家具项目\",\"link\":\"#智能家具项目\",\"children\":[]},{\"level\":2,\"title\":\"传统方案解决智能家具项目\",\"slug\":\"传统方案解决智能家具项目\",\"link\":\"#传统方案解决智能家具项目\",\"children\":[]},{\"level\":2,\"title\":\"中介者模式解决智能家庭项目\",\"slug\":\"中介者模式解决智能家庭项目\",\"link\":\"#中介者模式解决智能家庭项目\",\"children\":[]},{\"level\":2,\"title\":\"中介者模式的注意事项和细节\",\"slug\":\"中介者模式的注意事项和细节\",\"link\":\"#中介者模式的注意事项和细节\",\"children\":[]},{\"level\":2,\"title\":\"中介者模式的应用场景\",\"slug\":\"中介者模式的应用场景\",\"link\":\"#中介者模式的应用场景\",\"children\":[]}],\"readingTime\":{\"minutes\":7.51,\"words\":2253},\"filePathRelative\":\"develop/design/mediator.md\",\"localizedDate\":\"2019年11月12日\",\"excerpt\":\"<h2> 中介者模式基本介绍</h2>\\n<p><strong>中介者模式</strong>（Mediator Pattern）又叫 <strong>调停模式</strong>，它是迪米特法则的典型应用。用一个 <strong>中介对象来封装一系列的对象交互</strong>。中介者使各个对象不需要显式地相互引用，从而使其 <strong>耦合松散</strong>，而且可以独立地改变它们之间的交互。</p>\\n<p>中介者模式属于行为型模式，使代码易于维护。</p>\\n<p>在现实生活中，常常会出现好多对象之间存在复杂的交互关系，这种交互关系常常是「网状结构」，它要求每个对象都必须知道它需要交互的对象。例如，每个人必须记住他（她）所有朋友的电话；而且，朋友中如果有人的电话修改了，他（她）必须让其他所有的朋友一起修改，这叫作「牵一发而动全身」，非常复杂。</p>\",\"copyright\":{\"author\":\"gavin-james\",\"license\":\"https://github.com/gavin-james/gavin-james.github.io/LICENSE\"},\"autoDesc\":true}")

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
