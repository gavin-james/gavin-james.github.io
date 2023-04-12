export const data = JSON.parse("{\"key\":\"v-23dca26c\",\"path\":\"/develop/design/bridge.html\",\"title\":\"结构型桥接模式\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"结构型桥接模式\",\"date\":\"2019-10-20T00:00:00.000Z\",\"category\":[\"设计模式\"],\"tag\":[\"设计模式\"],\"description\":\"桥接模式基本介绍 在现实生活中，某些类具有两个或多个维度的变化，如图形既可按形状分，又可按颜色分。如何设计类似于 Photoshop 这样的软件，能画不同形状和不同颜色的图形呢？如果用继承方式，m 种形状和 n 种颜色的图形就有 m×n 种，不但对应的子类很多，而且扩展困难。 当然，这样的例子还有很多，如不同颜色和字体的文字、不同品牌和功率的汽车、不同性别和职业的男女、支持不同平台和不同文件格式的媒体播放器等。如果用桥接模式就能很好地解决这些问题。 桥接模式（Bridge Pattern）是指：将实现与抽象放在两个不同的类层次中，使两个层次可以独立改变，是一种结构型设计模式。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"http://www.gavin-james.com/develop/design/bridge.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Gavin blog\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"结构型桥接模式\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"桥接模式基本介绍 在现实生活中，某些类具有两个或多个维度的变化，如图形既可按形状分，又可按颜色分。如何设计类似于 Photoshop 这样的软件，能画不同形状和不同颜色的图形呢？如果用继承方式，m 种形状和 n 种颜色的图形就有 m×n 种，不但对应的子类很多，而且扩展困难。 当然，这样的例子还有很多，如不同颜色和字体的文字、不同品牌和功率的汽车、不同性别和职业的男女、支持不同平台和不同文件格式的媒体播放器等。如果用桥接模式就能很好地解决这些问题。 桥接模式（Bridge Pattern）是指：将实现与抽象放在两个不同的类层次中，使两个层次可以独立改变，是一种结构型设计模式。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"gavin-james\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"设计模式\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2019-10-20T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"结构型桥接模式\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2019-10-20T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"gavin-james\\\",\\\"url\\\":\\\"http://www.gavin-james.xyz\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"桥接模式基本介绍\",\"slug\":\"桥接模式基本介绍\",\"link\":\"#桥接模式基本介绍\",\"children\":[]},{\"level\":2,\"title\":\"桥接模式的结构与实现\",\"slug\":\"桥接模式的结构与实现\",\"link\":\"#桥接模式的结构与实现\",\"children\":[]},{\"level\":2,\"title\":\"手机操作问题\",\"slug\":\"手机操作问题\",\"link\":\"#手机操作问题\",\"children\":[]},{\"level\":2,\"title\":\"传统方案解决手机操作问题\",\"slug\":\"传统方案解决手机操作问题\",\"link\":\"#传统方案解决手机操作问题\",\"children\":[{\"level\":3,\"title\":\"传统方案解决手机操作问题分析\",\"slug\":\"传统方案解决手机操作问题分析\",\"link\":\"#传统方案解决手机操作问题分析\",\"children\":[]}]},{\"level\":2,\"title\":\"桥接模式解决手机操作问题\",\"slug\":\"桥接模式解决手机操作问题\",\"link\":\"#桥接模式解决手机操作问题\",\"children\":[]},{\"level\":2,\"title\":\"JDBC 的桥接模式剖析\",\"slug\":\"jdbc-的桥接模式剖析\",\"link\":\"#jdbc-的桥接模式剖析\",\"children\":[]},{\"level\":2,\"title\":\"桥接模式的注意事项和细节\",\"slug\":\"桥接模式的注意事项和细节\",\"link\":\"#桥接模式的注意事项和细节\",\"children\":[]},{\"level\":2,\"title\":\"桥接模式的应用场景\",\"slug\":\"桥接模式的应用场景\",\"link\":\"#桥接模式的应用场景\",\"children\":[]},{\"level\":2,\"title\":\"常见的应用场景\",\"slug\":\"常见的应用场景\",\"link\":\"#常见的应用场景\",\"children\":[]},{\"level\":2,\"title\":\"桥接模式模式的扩展\",\"slug\":\"桥接模式模式的扩展\",\"link\":\"#桥接模式模式的扩展\",\"children\":[]}],\"readingTime\":{\"minutes\":7.66,\"words\":2297},\"filePathRelative\":\"develop/design/bridge.md\",\"localizedDate\":\"2019年10月20日\",\"excerpt\":\"<h2> 桥接模式基本介绍</h2>\\n<p>在现实生活中，某些类具有两个或多个维度的变化，如图形既可按形状分，又可按颜色分。如何设计类似于 Photoshop 这样的软件，能画不同形状和不同颜色的图形呢？如果用继承方式，m 种形状和 n 种颜色的图形就有 m×n 种，不但对应的子类很多，而且扩展困难。</p>\\n<p>当然，这样的例子还有很多，如不同颜色和字体的文字、不同品牌和功率的汽车、不同性别和职业的男女、支持不同平台和不同文件格式的媒体播放器等。如果用桥接模式就能很好地解决这些问题。</p>\\n<p><strong>桥接模式</strong>（Bridge Pattern）是指：将实现与抽象放在两个不同的类层次中，使两个层次可以独立改变，是一种结构型设计模式。</p>\",\"copyright\":{\"author\":\"gavin-james\",\"license\":\"https://github.com/gavin-james/gavin-james.github.io/LICENSE\"},\"autoDesc\":true}")

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
