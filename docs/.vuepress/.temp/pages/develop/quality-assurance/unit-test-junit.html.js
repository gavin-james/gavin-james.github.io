export const data = JSON.parse("{\"key\":\"v-ea902450\",\"path\":\"/develop/quality-assurance/unit-test-junit.html\",\"title\":\"JUnit4 详解\",\"lang\":\"zh-CN\",\"frontmatter\":{\"date\":\"2019-02-05T00:00:00.000Z\",\"description\":\"JUnit4 详解 JUint是Java编程语言的单元测试框架，用于编写和运行可重复的自动化测试。本文主要针对Junit4要点进行梳理总结。@pdai 什么是JUnit？ JUint是Java编程语言的单元测试框架，用于编写和运行可重复的自动化测试。 JUnit特点？ JUnit 是一个开放的资源框架，用于编写和运行测试。 提供注解来识别测试方法。 提供断言来测试预期结果。 JUnit 测试允许你编写代码更快，并能提高质量。 JUnit 优雅简洁。没那么复杂，花费时间较少。 JUnit测试可以自动运行并且检查自身结果并提供即时反馈。所以也没有必要人工梳理测试结果的报告。 JUnit测试可以被组织为测试套件，包含测试用例，甚至其他的测试套件。 JUnit在一个条中显示进度。如果运行良好则是绿色；如果运行失败，则变成红色。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"http://www.gavin-james.com/develop/quality-assurance/unit-test-junit.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Gavin blog\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"JUnit4 详解\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"JUnit4 详解 JUint是Java编程语言的单元测试框架，用于编写和运行可重复的自动化测试。本文主要针对Junit4要点进行梳理总结。@pdai 什么是JUnit？ JUint是Java编程语言的单元测试框架，用于编写和运行可重复的自动化测试。 JUnit特点？ JUnit 是一个开放的资源框架，用于编写和运行测试。 提供注解来识别测试方法。 提供断言来测试预期结果。 JUnit 测试允许你编写代码更快，并能提高质量。 JUnit 优雅简洁。没那么复杂，花费时间较少。 JUnit测试可以自动运行并且检查自身结果并提供即时反馈。所以也没有必要人工梳理测试结果的报告。 JUnit测试可以被组织为测试套件，包含测试用例，甚至其他的测试套件。 JUnit在一个条中显示进度。如果运行良好则是绿色；如果运行失败，则变成红色。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"gavin-james\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2019-02-05T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"JUnit4 详解\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2019-02-05T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"gavin-james\\\",\\\"url\\\":\\\"http://www.gavin-james.xyz\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"什么是JUnit？\",\"slug\":\"什么是junit\",\"link\":\"#什么是junit\",\"children\":[]},{\"level\":2,\"title\":\"JUnit特点？\",\"slug\":\"junit特点\",\"link\":\"#junit特点\",\"children\":[]},{\"level\":2,\"title\":\"官方资料\",\"slug\":\"官方资料\",\"link\":\"#官方资料\",\"children\":[]},{\"level\":2,\"title\":\"常用注解\",\"slug\":\"常用注解\",\"link\":\"#常用注解\",\"children\":[]},{\"level\":2,\"title\":\"编写单元测试\",\"slug\":\"编写单元测试\",\"link\":\"#编写单元测试\",\"children\":[{\"level\":3,\"title\":\"Maven包引入\",\"slug\":\"maven包引入\",\"link\":\"#maven包引入\",\"children\":[]},{\"level\":3,\"title\":\"测试:Hello World\",\"slug\":\"测试-hello-world\",\"link\":\"#测试-hello-world\",\"children\":[]},{\"level\":3,\"title\":\"测试:生命周期\",\"slug\":\"测试-生命周期\",\"link\":\"#测试-生命周期\",\"children\":[]},{\"level\":3,\"title\":\"测试:禁用测试\",\"slug\":\"测试-禁用测试\",\"link\":\"#测试-禁用测试\",\"children\":[]},{\"level\":3,\"title\":\"测试:断言测试\",\"slug\":\"测试-断言测试\",\"link\":\"#测试-断言测试\",\"children\":[]},{\"level\":3,\"title\":\"测试:异常测试\",\"slug\":\"测试-异常测试\",\"link\":\"#测试-异常测试\",\"children\":[]},{\"level\":3,\"title\":\"测试:时间测试\",\"slug\":\"测试-时间测试\",\"link\":\"#测试-时间测试\",\"children\":[]},{\"level\":3,\"title\":\"测试:参数化测试\",\"slug\":\"测试-参数化测试\",\"link\":\"#测试-参数化测试\",\"children\":[]},{\"level\":3,\"title\":\"测试:套件测试\",\"slug\":\"测试-套件测试\",\"link\":\"#测试-套件测试\",\"children\":[]},{\"level\":3,\"title\":\"测试:测试顺序\",\"slug\":\"测试-测试顺序\",\"link\":\"#测试-测试顺序\",\"children\":[]}]},{\"level\":2,\"title\":\"参考文章\",\"slug\":\"参考文章\",\"link\":\"#参考文章\",\"children\":[]}],\"readingTime\":{\"minutes\":13.3,\"words\":3989},\"filePathRelative\":\"develop/quality-assurance/unit-test-junit.md\",\"localizedDate\":\"2019年2月5日\",\"excerpt\":\"<h1> JUnit4 详解</h1>\\n<blockquote>\\n<p>JUint是Java编程语言的单元测试框架，用于编写和运行可重复的自动化测试。本文主要针对Junit4要点进行梳理总结。@pdai</p>\\n</blockquote>\\n<h2> 什么是JUnit？</h2>\\n<p>JUint是Java编程语言的单元测试框架，用于编写和运行可重复的自动化测试。</p>\\n<h2> JUnit特点？</h2>\\n<p>JUnit 是一个开放的资源框架，用于编写和运行测试。</p>\\n<ul>\\n<li>提供注解来识别测试方法。</li>\\n<li>提供断言来测试预期结果。</li>\\n<li>JUnit 测试允许你编写代码更快，并能提高质量。</li>\\n<li>JUnit 优雅简洁。没那么复杂，花费时间较少。</li>\\n<li>JUnit测试可以自动运行并且检查自身结果并提供即时反馈。所以也没有必要人工梳理测试结果的报告。</li>\\n<li>JUnit测试可以被组织为测试套件，包含测试用例，甚至其他的测试套件。</li>\\n<li>JUnit在一个条中显示进度。如果运行良好则是绿色；如果运行失败，则变成红色。</li>\\n</ul>\",\"copyright\":{\"author\":\"gavin-james\",\"license\":\"https://github.com/gavin-james/gavin-james.github.io/LICENSE\"},\"autoDesc\":true}")

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
