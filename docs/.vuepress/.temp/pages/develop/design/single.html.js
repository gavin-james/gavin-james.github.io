export const data = JSON.parse("{\"key\":\"v-60256d6b\",\"path\":\"/develop/design/single.html\",\"title\":\"创建型单例模式\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"创建型单例模式\",\"date\":\"2019-10-10T00:00:00.000Z\",\"category\":[\"设计模式\"],\"tag\":[\"设计模式\"],\"description\":\"单例设计模式介绍 在计算机系统中，还有 Windows 的回收站、操作系统中的文件系统、多线程中的线程池、显卡的驱动程序对象、打印机的后台处理服务、应用程序的日志对象、数据库的连接池、网站的计数器、Web 应用的配置对象、应用程序中的对话框、系统中的缓存等常常被设计成单例。 所谓类的 单例设计模式，就是 采取一定的方法保证在整个的软件系统中，对某个类只能存在一个对象实例，并且该类只提供一个取得其对象实例的方法（静态方法）。 比如 Hibernate 的 SessionFactory，它充当数据存储源的代理，并负责创建 Session 对象。SessionFactory 并不是轻量级的，一般情况下，一个项目通常只需要一个 SessionFactory 就够，这是就会使用到单例模式。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"http://www.gavin-james.com/develop/design/single.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Gavin James\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"创建型单例模式\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"单例设计模式介绍 在计算机系统中，还有 Windows 的回收站、操作系统中的文件系统、多线程中的线程池、显卡的驱动程序对象、打印机的后台处理服务、应用程序的日志对象、数据库的连接池、网站的计数器、Web 应用的配置对象、应用程序中的对话框、系统中的缓存等常常被设计成单例。 所谓类的 单例设计模式，就是 采取一定的方法保证在整个的软件系统中，对某个类只能存在一个对象实例，并且该类只提供一个取得其对象实例的方法（静态方法）。 比如 Hibernate 的 SessionFactory，它充当数据存储源的代理，并负责创建 Session 对象。SessionFactory 并不是轻量级的，一般情况下，一个项目通常只需要一个 SessionFactory 就够，这是就会使用到单例模式。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"gavin-james\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"设计模式\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2019-10-10T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"创建型单例模式\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2019-10-10T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"gavin-james\\\",\\\"url\\\":\\\"http://www.gavin-james.xyz\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"单例设计模式介绍\",\"slug\":\"单例设计模式介绍\",\"link\":\"#单例设计模式介绍\",\"children\":[]},{\"level\":2,\"title\":\"单例设计模式八种方式\",\"slug\":\"单例设计模式八种方式\",\"link\":\"#单例设计模式八种方式\",\"children\":[{\"level\":3,\"title\":\"饿汉式（静态常量）\",\"slug\":\"饿汉式-静态常量\",\"link\":\"#饿汉式-静态常量\",\"children\":[]},{\"level\":3,\"title\":\"饿汉式（静态代码块）\",\"slug\":\"饿汉式-静态代码块\",\"link\":\"#饿汉式-静态代码块\",\"children\":[]},{\"level\":3,\"title\":\"懒汉式（线程不安全）\",\"slug\":\"懒汉式-线程不安全\",\"link\":\"#懒汉式-线程不安全\",\"children\":[]},{\"level\":3,\"title\":\"懒汉式（线程安全，同步方法）\",\"slug\":\"懒汉式-线程安全-同步方法\",\"link\":\"#懒汉式-线程安全-同步方法\",\"children\":[]},{\"level\":3,\"title\":\"懒汉式（线程安全，同步代码块）\",\"slug\":\"懒汉式-线程安全-同步代码块\",\"link\":\"#懒汉式-线程安全-同步代码块\",\"children\":[]},{\"level\":3,\"title\":\"双重检查\",\"slug\":\"双重检查\",\"link\":\"#双重检查\",\"children\":[]},{\"level\":3,\"title\":\"静态内部类\",\"slug\":\"静态内部类\",\"link\":\"#静态内部类\",\"children\":[]},{\"level\":3,\"title\":\"枚举\",\"slug\":\"枚举\",\"link\":\"#枚举\",\"children\":[]}]},{\"level\":2,\"title\":\"单例模式JDK应用\",\"slug\":\"单例模式jdk应用\",\"link\":\"#单例模式jdk应用\",\"children\":[]},{\"level\":2,\"title\":\"单例模式注意事项和细节说明\",\"slug\":\"单例模式注意事项和细节说明\",\"link\":\"#单例模式注意事项和细节说明\",\"children\":[]},{\"level\":2,\"title\":\"单例模式的应用场景\",\"slug\":\"单例模式的应用场景\",\"link\":\"#单例模式的应用场景\",\"children\":[]},{\"level\":2,\"title\":\"单例存在哪些问题\",\"slug\":\"单例存在哪些问题\",\"link\":\"#单例存在哪些问题\",\"children\":[{\"level\":3,\"title\":\"单例对 OOP 特性的支持不友好\",\"slug\":\"单例对-oop-特性的支持不友好\",\"link\":\"#单例对-oop-特性的支持不友好\",\"children\":[]},{\"level\":3,\"title\":\"单例会隐藏类之间的依赖关系\",\"slug\":\"单例会隐藏类之间的依赖关系\",\"link\":\"#单例会隐藏类之间的依赖关系\",\"children\":[]},{\"level\":3,\"title\":\"单例对代码的扩展性不友好\",\"slug\":\"单例对代码的扩展性不友好\",\"link\":\"#单例对代码的扩展性不友好\",\"children\":[]},{\"level\":3,\"title\":\"单例对代码的可测试性不友好\",\"slug\":\"单例对代码的可测试性不友好\",\"link\":\"#单例对代码的可测试性不友好\",\"children\":[]},{\"level\":3,\"title\":\"单例不支持有参数的构造函数\",\"slug\":\"单例不支持有参数的构造函数\",\"link\":\"#单例不支持有参数的构造函数\",\"children\":[]}]},{\"level\":2,\"title\":\"有何替代解决方案\",\"slug\":\"有何替代解决方案\",\"link\":\"#有何替代解决方案\",\"children\":[]},{\"level\":2,\"title\":\"如何理解单例模式中的唯一性\",\"slug\":\"如何理解单例模式中的唯一性\",\"link\":\"#如何理解单例模式中的唯一性\",\"children\":[]},{\"level\":2,\"title\":\"如何实现线程唯一的单例\",\"slug\":\"如何实现线程唯一的单例\",\"link\":\"#如何实现线程唯一的单例\",\"children\":[]},{\"level\":2,\"title\":\"如何实现集群环境下的单例？\",\"slug\":\"如何实现集群环境下的单例\",\"link\":\"#如何实现集群环境下的单例\",\"children\":[]},{\"level\":2,\"title\":\"如何实现一个多例模式？\",\"slug\":\"如何实现一个多例模式\",\"link\":\"#如何实现一个多例模式\",\"children\":[]}],\"readingTime\":{\"minutes\":26.75,\"words\":8025},\"filePathRelative\":\"develop/design/single.md\",\"localizedDate\":\"2019年10月10日\",\"excerpt\":\"<h2> 单例设计模式介绍</h2>\\n<p>在计算机系统中，还有 Windows 的回收站、操作系统中的文件系统、多线程中的线程池、显卡的驱动程序对象、打印机的后台处理服务、应用程序的日志对象、数据库的连接池、网站的计数器、Web 应用的配置对象、应用程序中的对话框、系统中的缓存等常常被设计成单例。</p>\\n<p>所谓类的 <strong>单例设计模式</strong>，就是 <strong>采取一定的方法保证在整个的软件系统中，对某个类只能存在一个对象实例</strong>，并且该类只提供一个取得其对象实例的方法（静态方法）。</p>\\n<p>比如 Hibernate 的 SessionFactory，它充当数据存储源的代理，并负责创建 Session 对象。SessionFactory 并不是轻量级的，一般情况下，一个项目通常只需要一个 SessionFactory 就够，这是就会使用到单例模式。</p>\",\"copyright\":{\"author\":\"gavin-james\",\"license\":\"https://github.com/gavin-james/gavin-james.github.io/LICENSE\"},\"autoDesc\":true}")

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
