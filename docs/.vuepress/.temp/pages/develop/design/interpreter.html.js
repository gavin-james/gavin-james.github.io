export const data = JSON.parse("{\"key\":\"v-26071b05\",\"path\":\"/develop/design/interpreter.html\",\"title\":\"行为型解释器模式\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"行为型解释器模式\",\"date\":\"2019-11-16T00:00:00.000Z\",\"category\":[\"设计模式\"],\"tag\":[\"设计模式\"],\"description\":\"解释器模式基本介绍 在编译原理中，一个算术表达式通过词法分析器形成词法单元，而后这些词法单元再通过语法分析器构建语法分析树，最终形成一颗抽象的语法分析树。这里的词法分析器和语法分析器都可以看做是解释器。 解释器模式（Interpreter Pattern）：是指给定一个语言（表达式），定义它的文法的一种表示，并定义一个解释器，使用该解释器来解释语言中的句子（表达式）。这种模式实现了文法表达式处理的接口，该接口解释一个特定的上下文。 这里提到的文法和句子的概念同编译原理中的描述相同，文法 指语言的语法规则，而 句子 是语言集中的元素。例如，汉语中的句子有很多，「我是中国人」是其中的一个句子，可以用一棵语法树来直观地描述语言中的句子。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"http://www.gavin-james.com/develop/design/interpreter.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Gavin James\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"行为型解释器模式\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"解释器模式基本介绍 在编译原理中，一个算术表达式通过词法分析器形成词法单元，而后这些词法单元再通过语法分析器构建语法分析树，最终形成一颗抽象的语法分析树。这里的词法分析器和语法分析器都可以看做是解释器。 解释器模式（Interpreter Pattern）：是指给定一个语言（表达式），定义它的文法的一种表示，并定义一个解释器，使用该解释器来解释语言中的句子（表达式）。这种模式实现了文法表达式处理的接口，该接口解释一个特定的上下文。 这里提到的文法和句子的概念同编译原理中的描述相同，文法 指语言的语法规则，而 句子 是语言集中的元素。例如，汉语中的句子有很多，「我是中国人」是其中的一个句子，可以用一棵语法树来直观地描述语言中的句子。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-04-12T04:14:48.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"gavin-james\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"设计模式\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2019-11-16T00:00:00.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-04-12T04:14:48.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"行为型解释器模式\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2019-11-16T00:00:00.000Z\\\",\\\"dateModified\\\":\\\"2023-04-12T04:14:48.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"gavin-james\\\",\\\"url\\\":\\\"http://www.gavin-james.xyz\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"解释器模式基本介绍\",\"slug\":\"解释器模式基本介绍\",\"link\":\"#解释器模式基本介绍\",\"children\":[]},{\"level\":2,\"title\":\"解释器模式的结构与实现\",\"slug\":\"解释器模式的结构与实现\",\"link\":\"#解释器模式的结构与实现\",\"children\":[]},{\"level\":2,\"title\":\"四则运算问题\",\"slug\":\"四则运算问题\",\"link\":\"#四则运算问题\",\"children\":[]},{\"level\":2,\"title\":\"解释器模式来实现四则\",\"slug\":\"解释器模式来实现四则\",\"link\":\"#解释器模式来实现四则\",\"children\":[]},{\"level\":2,\"title\":\"解释器模式的注意事项和细节\",\"slug\":\"解释器模式的注意事项和细节\",\"link\":\"#解释器模式的注意事项和细节\",\"children\":[]},{\"level\":2,\"title\":\"解释器模式的应用场景\",\"slug\":\"解释器模式的应用场景\",\"link\":\"#解释器模式的应用场景\",\"children\":[]}],\"git\":{\"createdTime\":1681272888000,\"updatedTime\":1681272888000,\"contributors\":[{\"name\":\"gavin-james\",\"email\":\"meaganlindesy1258@gmail.com\",\"commits\":1}]},\"readingTime\":{\"minutes\":7.46,\"words\":2238},\"filePathRelative\":\"develop/design/interpreter.md\",\"localizedDate\":\"2019年11月16日\",\"excerpt\":\"<h2> 解释器模式基本介绍</h2>\\n<p>在编译原理中，一个算术表达式通过词法分析器形成词法单元，而后这些词法单元再通过语法分析器构建语法分析树，最终形成一颗抽象的语法分析树。这里的词法分析器和语法分析器都可以看做是解释器。</p>\\n<p><strong>解释器模式</strong>（Interpreter Pattern）：是指给定一个语言（表达式），定义它的文法的一种表示，并定义一个解释器，使用该解释器来解释语言中的句子（表达式）。这种模式实现了文法表达式处理的接口，该接口解释一个特定的上下文。</p>\\n<p>这里提到的文法和句子的概念同编译原理中的描述相同，<mark>文法</mark> 指语言的语法规则，而 <mark>句子</mark> 是语言集中的元素。例如，汉语中的句子有很多，「我是中国人」是其中的一个句子，可以用一棵语法树来直观地描述语言中的句子。</p>\",\"copyright\":{\"author\":\"gavin-james\",\"license\":\"https://github.com/gavin-james/gavin-james.github.io/LICENSE\"},\"autoDesc\":true}")
