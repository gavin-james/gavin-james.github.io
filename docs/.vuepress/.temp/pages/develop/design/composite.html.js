export const data = JSON.parse("{\"key\":\"v-cf7f7ed0\",\"path\":\"/develop/design/composite.html\",\"title\":\"结构型组合模式\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"结构型组合模式\",\"date\":\"2019-10-24T00:00:00.000Z\",\"category\":[\"设计模式\"],\"tag\":[\"设计模式\"],\"description\":\"组合模式基本介绍 在现实生活中，存在很多「部分-整体」的关系，例如，大学中的部门与学院、总公司中的部门与分公司、学习用品中的书与书包、生活用品中的衣服与衣柜、以及厨房中的锅碗瓢盆等。在软件开发中也是这样，例如，文件系统中的文件与文件夹、窗体程序中的简单控件与容器控件等。对这些简单对象与复合对象的处理，如果用组合模式来实现会很方便。 组合模式（Composite Pattern），又叫 部分整体模式，它创建了对象组的树形结构，将对象组合成树状结构以表示「整体-部分」的层次关系，属于结构型模式。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"http://www.gavin-james.com/develop/design/composite.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Gavin James\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"结构型组合模式\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"组合模式基本介绍 在现实生活中，存在很多「部分-整体」的关系，例如，大学中的部门与学院、总公司中的部门与分公司、学习用品中的书与书包、生活用品中的衣服与衣柜、以及厨房中的锅碗瓢盆等。在软件开发中也是这样，例如，文件系统中的文件与文件夹、窗体程序中的简单控件与容器控件等。对这些简单对象与复合对象的处理，如果用组合模式来实现会很方便。 组合模式（Composite Pattern），又叫 部分整体模式，它创建了对象组的树形结构，将对象组合成树状结构以表示「整体-部分」的层次关系，属于结构型模式。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-04-12T04:14:48.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"gavin-james\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"设计模式\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2019-10-24T00:00:00.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-04-12T04:14:48.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"结构型组合模式\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2019-10-24T00:00:00.000Z\\\",\\\"dateModified\\\":\\\"2023-04-12T04:14:48.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"gavin-james\\\",\\\"url\\\":\\\"http://www.gavin-james.xyz\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"组合模式基本介绍\",\"slug\":\"组合模式基本介绍\",\"link\":\"#组合模式基本介绍\",\"children\":[]},{\"level\":2,\"title\":\"组合模式结构与实现\",\"slug\":\"组合模式结构与实现\",\"link\":\"#组合模式结构与实现\",\"children\":[{\"level\":3,\"title\":\"透明方式\",\"slug\":\"透明方式\",\"link\":\"#透明方式\",\"children\":[]},{\"level\":3,\"title\":\"安全方式\",\"slug\":\"安全方式\",\"link\":\"#安全方式\",\"children\":[]},{\"level\":3,\"title\":\"模式的实现\",\"slug\":\"模式的实现\",\"link\":\"#模式的实现\",\"children\":[]}]},{\"level\":2,\"title\":\"学校院系展示需求\",\"slug\":\"学校院系展示需求\",\"link\":\"#学校院系展示需求\",\"children\":[]},{\"level\":2,\"title\":\"传统方案解决学校院系展示\",\"slug\":\"传统方案解决学校院系展示\",\"link\":\"#传统方案解决学校院系展示\",\"children\":[]},{\"level\":2,\"title\":\"组合模式解决学校院系展示\",\"slug\":\"组合模式解决学校院系展示\",\"link\":\"#组合模式解决学校院系展示\",\"children\":[]},{\"level\":2,\"title\":\"JDK 集合的组合模式剖析\",\"slug\":\"jdk-集合的组合模式剖析\",\"link\":\"#jdk-集合的组合模式剖析\",\"children\":[]},{\"level\":2,\"title\":\"组合模式的注意事项和细节\",\"slug\":\"组合模式的注意事项和细节\",\"link\":\"#组合模式的注意事项和细节\",\"children\":[]},{\"level\":2,\"title\":\"组合模式的应用场景\",\"slug\":\"组合模式的应用场景\",\"link\":\"#组合模式的应用场景\",\"children\":[]}],\"git\":{\"createdTime\":1681272888000,\"updatedTime\":1681272888000,\"contributors\":[{\"name\":\"gavin-james\",\"email\":\"meaganlindesy1258@gmail.com\",\"commits\":1}]},\"readingTime\":{\"minutes\":8.43,\"words\":2530},\"filePathRelative\":\"develop/design/composite.md\",\"localizedDate\":\"2019年10月24日\",\"excerpt\":\"<h2> 组合模式基本介绍</h2>\\n<p>在现实生活中，存在很多「部分-整体」的关系，例如，大学中的部门与学院、总公司中的部门与分公司、学习用品中的书与书包、生活用品中的衣服与衣柜、以及厨房中的锅碗瓢盆等。在软件开发中也是这样，例如，文件系统中的文件与文件夹、窗体程序中的简单控件与容器控件等。对这些简单对象与复合对象的处理，如果用组合模式来实现会很方便。</p>\\n<p><strong>组合模式</strong>（Composite Pattern），又叫 <strong>部分整体模式</strong>，它创建了对象组的树形结构，将对象组合成树状结构以表示「整体-部分」的层次关系，属于结构型模式。</p>\",\"copyright\":{\"author\":\"gavin-james\",\"license\":\"https://github.com/gavin-james/gavin-james.github.io/LICENSE\"},\"autoDesc\":true}")
