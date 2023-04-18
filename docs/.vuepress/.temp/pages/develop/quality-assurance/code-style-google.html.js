export const data = JSON.parse("{\"key\":\"v-56af3e42\",\"path\":\"/develop/quality-assurance/code-style-google.html\",\"title\":\"Google Java 编程风格指南\",\"lang\":\"zh-CN\",\"frontmatter\":{\"date\":\"2022-02-04T00:00:00.000Z\",\"category\":[\"代码规范\"],\"tag\":[\"代码规范\"],\"description\":\"Google Java 编程风格指南 转载并翻译自 https://google.github.io/styleguide/javaguide.html。个人英语水平有限，应以原文档为标准。 简介 本文档是 Google Java 语言编程规范的 完整 定义。一个 Java 源文件当且仅当遵守本规范时，才可被描述为 Google 风格。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"http://www.gavin-james.com/develop/quality-assurance/code-style-google.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Gavin blog\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Google Java 编程风格指南\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Google Java 编程风格指南 转载并翻译自 https://google.github.io/styleguide/javaguide.html。个人英语水平有限，应以原文档为标准。 简介 本文档是 Google Java 语言编程规范的 完整 定义。一个 Java 源文件当且仅当遵守本规范时，才可被描述为 Google 风格。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"gavin-james\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"代码规范\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-02-04T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Google Java 编程风格指南\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-02-04T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"gavin-james\\\",\\\"url\\\":\\\"http://www.gavin-james.xyz\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"简介\",\"slug\":\"简介\",\"link\":\"#简介\",\"children\":[{\"level\":3,\"title\":\"术语说明\",\"slug\":\"术语说明\",\"link\":\"#术语说明\",\"children\":[]},{\"level\":3,\"title\":\"指南说明\",\"slug\":\"指南说明\",\"link\":\"#指南说明\",\"children\":[]}]},{\"level\":2,\"title\":\"源文件准则\",\"slug\":\"源文件准则\",\"link\":\"#源文件准则\",\"children\":[{\"level\":3,\"title\":\"文件名\",\"slug\":\"文件名\",\"link\":\"#文件名\",\"children\":[]},{\"level\":3,\"title\":\"文件编码：UTF-8\",\"slug\":\"文件编码-utf-8\",\"link\":\"#文件编码-utf-8\",\"children\":[]},{\"level\":3,\"title\":\"特殊字符\",\"slug\":\"特殊字符\",\"link\":\"#特殊字符\",\"children\":[]}]},{\"level\":2,\"title\":\"源文件结构\",\"slug\":\"源文件结构\",\"link\":\"#源文件结构\",\"children\":[{\"level\":3,\"title\":\"License 或者 Copyright 信息\",\"slug\":\"license-或者-copyright-信息\",\"link\":\"#license-或者-copyright-信息\",\"children\":[]},{\"level\":3,\"title\":\"Package 语句\",\"slug\":\"package-语句\",\"link\":\"#package-语句\",\"children\":[]},{\"level\":3,\"title\":\"Import 语句\",\"slug\":\"import-语句\",\"link\":\"#import-语句\",\"children\":[]},{\"level\":3,\"title\":\"Class 定义\",\"slug\":\"class-定义\",\"link\":\"#class-定义\",\"children\":[]}]},{\"level\":2,\"title\":\"格式化\",\"slug\":\"格式化\",\"link\":\"#格式化\",\"children\":[{\"level\":3,\"title\":\"花括号\",\"slug\":\"花括号\",\"link\":\"#花括号\",\"children\":[]},{\"level\":3,\"title\":\"块缩进：+2 个空格\",\"slug\":\"块缩进-2-个空格\",\"link\":\"#块缩进-2-个空格\",\"children\":[]},{\"level\":3,\"title\":\"一条语句占一行\",\"slug\":\"一条语句占一行\",\"link\":\"#一条语句占一行\",\"children\":[]},{\"level\":3,\"title\":\"列限制：100\",\"slug\":\"列限制-100\",\"link\":\"#列限制-100\",\"children\":[]},{\"level\":3,\"title\":\"换行\",\"slug\":\"换行\",\"link\":\"#换行\",\"children\":[]},{\"level\":3,\"title\":\"空格\",\"slug\":\"空格\",\"link\":\"#空格\",\"children\":[]},{\"level\":3,\"title\":\"分组括号：推荐\",\"slug\":\"分组括号-推荐\",\"link\":\"#分组括号-推荐\",\"children\":[]},{\"level\":3,\"title\":\"特定结构\",\"slug\":\"特定结构\",\"link\":\"#特定结构\",\"children\":[]}]},{\"level\":2,\"title\":\"命名\",\"slug\":\"命名\",\"link\":\"#命名\",\"children\":[{\"level\":3,\"title\":\"适用于所有标识符的通用规则\",\"slug\":\"适用于所有标识符的通用规则\",\"link\":\"#适用于所有标识符的通用规则\",\"children\":[]},{\"level\":3,\"title\":\"各种类型的标识符的规则\",\"slug\":\"各种类型的标识符的规则\",\"link\":\"#各种类型的标识符的规则\",\"children\":[]},{\"level\":3,\"title\":\"骆驼峰形式：定义\",\"slug\":\"骆驼峰形式-定义\",\"link\":\"#骆驼峰形式-定义\",\"children\":[]}]},{\"level\":2,\"title\":\"编程实践\",\"slug\":\"编程实践\",\"link\":\"#编程实践\",\"children\":[{\"level\":3,\"title\":\"@Override：总是使用\",\"slug\":\"override-总是使用\",\"link\":\"#override-总是使用\",\"children\":[]},{\"level\":3,\"title\":\"捕获异常：不能忽略\",\"slug\":\"捕获异常-不能忽略\",\"link\":\"#捕获异常-不能忽略\",\"children\":[]},{\"level\":3,\"title\":\"静态成员：限定使用类\",\"slug\":\"静态成员-限定使用类\",\"link\":\"#静态成员-限定使用类\",\"children\":[]},{\"level\":3,\"title\":\"Finalizers：禁用\",\"slug\":\"finalizers-禁用\",\"link\":\"#finalizers-禁用\",\"children\":[]}]},{\"level\":2,\"title\":\"Javadoc\",\"slug\":\"javadoc\",\"link\":\"#javadoc\",\"children\":[{\"level\":3,\"title\":\"格式化\",\"slug\":\"格式化-1\",\"link\":\"#格式化-1\",\"children\":[]},{\"level\":3,\"title\":\"摘要片段\",\"slug\":\"摘要片段\",\"link\":\"#摘要片段\",\"children\":[]},{\"level\":3,\"title\":\"在何处使用 Javadoc\",\"slug\":\"在何处使用-javadoc\",\"link\":\"#在何处使用-javadoc\",\"children\":[]}]}],\"readingTime\":{\"minutes\":28.34,\"words\":8501},\"filePathRelative\":\"develop/quality-assurance/code-style-google.md\",\"localizedDate\":\"2022年2月4日\",\"excerpt\":\"<h1> Google Java 编程风格指南</h1>\\n<blockquote>\\n<p>转载并翻译自 <a href=\\\"https://google.github.io/styleguide/javaguide.html\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">https://google.github.io/styleguide/javaguide.html</a>。个人英语水平有限，应以原文档为标准。<!--more--></p>\\n</blockquote>\\n<h2> 简介</h2>\\n<p>本文档是 Google Java 语言编程规范的 <strong>完整</strong> 定义。一个 Java 源文件当且仅当遵守本规范时，才可被描述为 Google 风格。</p>\",\"copyright\":{\"author\":\"gavin-james\",\"license\":\"https://github.com/gavin-james/gavin-james.github.io/LICENSE\"},\"autoDesc\":true}")

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
