export const data = JSON.parse("{\"key\":\"v-78b81ff9\",\"path\":\"/java/basic/java-basic-reflection.html\",\"title\":\"反射机制详解\",\"lang\":\"zh-CN\",\"frontmatter\":{\"date\":\"2022-02-09T00:00:00.000Z\",\"category\":[\"Java 基础\"],\"tag\":[\"Java 基础\"],\"description\":\"反射机制详解 JAVA反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性；这种动态获取的信息以及动态调用对象的方法的功能称为java语言的反射机制。Java反射机制在框架设计中极为广泛，需要深入理解。本文综合多篇文章后，总结了Java 反射的相关知识，希望可以提升你对Java中反射的认知效率。@pdai 反射基础 RTTI（Run-Time Type Identification）运行时类型识别。在《Thinking in Java》一书第十四章中有提到，其作用是在运行时识别一个对象的类型和类的信息。主要有两种方式：一种是“传统的”RTTI，它假定我们在编译时已经知道了所有的类型；另一种是“反射”机制，它允许我们在运行时发现和使用类的信息。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"http://www.gavin-james.com/java/basic/java-basic-reflection.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Gavin James\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"反射机制详解\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"反射机制详解 JAVA反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性；这种动态获取的信息以及动态调用对象的方法的功能称为java语言的反射机制。Java反射机制在框架设计中极为广泛，需要深入理解。本文综合多篇文章后，总结了Java 反射的相关知识，希望可以提升你对Java中反射的认知效率。@pdai 反射基础 RTTI（Run-Time Type Identification）运行时类型识别。在《Thinking in Java》一书第十四章中有提到，其作用是在运行时识别一个对象的类型和类的信息。主要有两种方式：一种是“传统的”RTTI，它假定我们在编译时已经知道了所有的类型；另一种是“反射”机制，它允许我们在运行时发现和使用类的信息。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"gavin-james\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Java 基础\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-02-09T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"反射机制详解\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-02-09T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"gavin-james\\\",\\\"url\\\":\\\"http://www.gavin-james.xyz\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"反射基础\",\"slug\":\"反射基础\",\"link\":\"#反射基础\",\"children\":[{\"level\":3,\"title\":\"Class类\",\"slug\":\"class类\",\"link\":\"#class类\",\"children\":[]},{\"level\":3,\"title\":\"类加载\",\"slug\":\"类加载\",\"link\":\"#类加载\",\"children\":[]}]},{\"level\":2,\"title\":\"反射的使用\",\"slug\":\"反射的使用\",\"link\":\"#反射的使用\",\"children\":[{\"level\":3,\"title\":\"Class类对象的获取\",\"slug\":\"class类对象的获取\",\"link\":\"#class类对象的获取\",\"children\":[]},{\"level\":3,\"title\":\"Constructor类及其用法\",\"slug\":\"constructor类及其用法\",\"link\":\"#constructor类及其用法\",\"children\":[]},{\"level\":3,\"title\":\"Field类及其用法\",\"slug\":\"field类及其用法\",\"link\":\"#field类及其用法\",\"children\":[]},{\"level\":3,\"title\":\"Method类及其用法\",\"slug\":\"method类及其用法\",\"link\":\"#method类及其用法\",\"children\":[]}]},{\"level\":2,\"title\":\"反射机制执行的流程\",\"slug\":\"反射机制执行的流程\",\"link\":\"#反射机制执行的流程\",\"children\":[{\"level\":3,\"title\":\"反射获取类实例\",\"slug\":\"反射获取类实例\",\"link\":\"#反射获取类实例\",\"children\":[]},{\"level\":3,\"title\":\"反射获取方法\",\"slug\":\"反射获取方法\",\"link\":\"#反射获取方法\",\"children\":[]},{\"level\":3,\"title\":\"调用method.invoke()方法\",\"slug\":\"调用method-invoke-方法\",\"link\":\"#调用method-invoke-方法\",\"children\":[]},{\"level\":3,\"title\":\"反射调用流程小结\",\"slug\":\"反射调用流程小结\",\"link\":\"#反射调用流程小结\",\"children\":[]}]},{\"level\":2,\"title\":\"参考文章\",\"slug\":\"参考文章\",\"link\":\"#参考文章\",\"children\":[]}],\"readingTime\":{\"minutes\":33.86,\"words\":10158},\"filePathRelative\":\"java/basic/java-basic-reflection.md\",\"localizedDate\":\"2022年2月9日\",\"excerpt\":\"<h1> 反射机制详解</h1>\\n<blockquote>\\n<p>JAVA反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性；这种动态获取的信息以及动态调用对象的方法的功能称为java语言的反射机制。Java反射机制在框架设计中极为广泛，需要深入理解。本文综合多篇文章后，总结了Java 反射的相关知识，希望可以提升你对Java中反射的认知效率。@pdai</p>\\n</blockquote>\\n<h2> 反射基础</h2>\\n<p>RTTI（Run-Time Type Identification）运行时类型识别。在《Thinking in Java》一书第十四章中有提到，其作用是在运行时识别一个对象的类型和类的信息。主要有两种方式：一种是“传统的”RTTI，它假定我们在编译时已经知道了所有的类型；另一种是“反射”机制，它允许我们在运行时发现和使用类的信息。</p>\",\"copyright\":{\"author\":\"gavin-james\",\"license\":\"https://github.com/gavin-james/gavin-james.github.io/LICENSE\"},\"autoDesc\":true}")

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
