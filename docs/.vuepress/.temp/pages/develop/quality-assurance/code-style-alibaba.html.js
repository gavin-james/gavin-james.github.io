export const data = JSON.parse("{\"key\":\"v-72edcc3e\",\"path\":\"/develop/quality-assurance/code-style-alibaba.html\",\"title\":\"阿里巴巴 Java 开发手册\",\"lang\":\"zh-CN\",\"frontmatter\":{\"date\":\"2022-02-03T00:00:00.000Z\",\"category\":[\"代码规范\"],\"tag\":[\"代码规范\"],\"description\":\"阿里巴巴 Java 开发手册 前言 《Java开发手册》是阿里巴巴和开课吧技术团队的集体智慧结晶和经验总结，经历了多次大规模一线实战的检验及不断完善，公开到业界后，众多社区开发者踊跃参与打磨完善，系统化地整理成册，当前的最新版本是黄山版。现代软件行业的高速发展对开发者的综合素质要求越来越高，因为不仅是编程知识点，其它维度的知识点也会影响到软件的最终交付质量。比如：五花八门的错误码会人为地增加排查问题的难度；数据库的表结构和索引设计缺陷带来的系统架构缺陷或性能风险；工程结构混乱导致后续项目维护艰难；没有鉴权的漏洞代码容易被黑客攻击等。所以本手册以Java开发者为中心视角，划分为编程规约、异常日志、单元测试、安全规约、MySQL数据库、工程结构、设计规约七个维度，再根据内容特征，细分成若干二级子目录。此外，依据约束力强弱及故障敏感性，规约依次分为【强制】、【推荐】、【参考】三大类。在延伸的信息中，“说明”对规约做了适当扩展和解释；“正例”提倡什么样的编码和实现方式；“反例”说明需要提防的雷区，以及真实的错误案例。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"http://www.gavin-james.com/develop/quality-assurance/code-style-alibaba.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Gavin James\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"阿里巴巴 Java 开发手册\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"阿里巴巴 Java 开发手册 前言 《Java开发手册》是阿里巴巴和开课吧技术团队的集体智慧结晶和经验总结，经历了多次大规模一线实战的检验及不断完善，公开到业界后，众多社区开发者踊跃参与打磨完善，系统化地整理成册，当前的最新版本是黄山版。现代软件行业的高速发展对开发者的综合素质要求越来越高，因为不仅是编程知识点，其它维度的知识点也会影响到软件的最终交付质量。比如：五花八门的错误码会人为地增加排查问题的难度；数据库的表结构和索引设计缺陷带来的系统架构缺陷或性能风险；工程结构混乱导致后续项目维护艰难；没有鉴权的漏洞代码容易被黑客攻击等。所以本手册以Java开发者为中心视角，划分为编程规约、异常日志、单元测试、安全规约、MySQL数据库、工程结构、设计规约七个维度，再根据内容特征，细分成若干二级子目录。此外，依据约束力强弱及故障敏感性，规约依次分为【强制】、【推荐】、【参考】三大类。在延伸的信息中，“说明”对规约做了适当扩展和解释；“正例”提倡什么样的编码和实现方式；“反例”说明需要提防的雷区，以及真实的错误案例。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"gavin-james\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"代码规范\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-02-03T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"阿里巴巴 Java 开发手册\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-02-03T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"gavin-james\\\",\\\"url\\\":\\\"http://www.gavin-james.xyz\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"前言\",\"slug\":\"前言\",\"link\":\"#前言\",\"children\":[]},{\"level\":2,\"title\":\"一、编程规约\",\"slug\":\"一、编程规约\",\"link\":\"#一、编程规约\",\"children\":[{\"level\":3,\"title\":\"(一) 命名风格\",\"slug\":\"一-命名风格\",\"link\":\"#一-命名风格\",\"children\":[]},{\"level\":3,\"title\":\"(二) 常量定义\",\"slug\":\"二-常量定义\",\"link\":\"#二-常量定义\",\"children\":[]},{\"level\":3,\"title\":\"(三) 代码格式\",\"slug\":\"三-代码格式\",\"link\":\"#三-代码格式\",\"children\":[]},{\"level\":3,\"title\":\"(四) OOP规约\",\"slug\":\"四-oop规约\",\"link\":\"#四-oop规约\",\"children\":[]},{\"level\":3,\"title\":\"(五) 日期时间\",\"slug\":\"五-日期时间\",\"link\":\"#五-日期时间\",\"children\":[]},{\"level\":3,\"title\":\"(六) 集合处理\",\"slug\":\"六-集合处理\",\"link\":\"#六-集合处理\",\"children\":[]},{\"level\":3,\"title\":\"(七) 并发处理\",\"slug\":\"七-并发处理\",\"link\":\"#七-并发处理\",\"children\":[]},{\"level\":3,\"title\":\"(八) 控制语句\",\"slug\":\"八-控制语句\",\"link\":\"#八-控制语句\",\"children\":[]},{\"level\":3,\"title\":\"(九) 注释规约\",\"slug\":\"九-注释规约\",\"link\":\"#九-注释规约\",\"children\":[]},{\"level\":3,\"title\":\"(十) 前后端规约\",\"slug\":\"十-前后端规约\",\"link\":\"#十-前后端规约\",\"children\":[]},{\"level\":3,\"title\":\"(十一) 其他\",\"slug\":\"十一-其他\",\"link\":\"#十一-其他\",\"children\":[]}]},{\"level\":2,\"title\":\"二、异常日志\",\"slug\":\"二、异常日志\",\"link\":\"#二、异常日志\",\"children\":[{\"level\":3,\"title\":\"(一) 错误码\",\"slug\":\"一-错误码\",\"link\":\"#一-错误码\",\"children\":[]},{\"level\":3,\"title\":\"(二) 异常处理\",\"slug\":\"二-异常处理\",\"link\":\"#二-异常处理\",\"children\":[]},{\"level\":3,\"title\":\"(三) 日志规约\",\"slug\":\"三-日志规约\",\"link\":\"#三-日志规约\",\"children\":[]}]},{\"level\":2,\"title\":\"三、单元测试\",\"slug\":\"三、单元测试\",\"link\":\"#三、单元测试\",\"children\":[]},{\"level\":2,\"title\":\"四、安全规约\",\"slug\":\"四、安全规约\",\"link\":\"#四、安全规约\",\"children\":[]},{\"level\":2,\"title\":\"五、MySQL数据库\",\"slug\":\"五、mysql数据库\",\"link\":\"#五、mysql数据库\",\"children\":[{\"level\":3,\"title\":\"(一) 建表规约\",\"slug\":\"一-建表规约\",\"link\":\"#一-建表规约\",\"children\":[]},{\"level\":3,\"title\":\"(二) 索引规约\",\"slug\":\"二-索引规约\",\"link\":\"#二-索引规约\",\"children\":[]},{\"level\":3,\"title\":\"(三) SQL语句\",\"slug\":\"三-sql语句\",\"link\":\"#三-sql语句\",\"children\":[]},{\"level\":3,\"title\":\"(四) ORM映射\",\"slug\":\"四-orm映射\",\"link\":\"#四-orm映射\",\"children\":[]}]},{\"level\":2,\"title\":\"六、工程结构\",\"slug\":\"六、工程结构\",\"link\":\"#六、工程结构\",\"children\":[{\"level\":3,\"title\":\"(一) 应用分层\",\"slug\":\"一-应用分层\",\"link\":\"#一-应用分层\",\"children\":[]},{\"level\":3,\"title\":\"(二) 二方库依赖\",\"slug\":\"二-二方库依赖\",\"link\":\"#二-二方库依赖\",\"children\":[]},{\"level\":3,\"title\":\"(三) 服务器\",\"slug\":\"三-服务器\",\"link\":\"#三-服务器\",\"children\":[]}]},{\"level\":2,\"title\":\"七、设计规约\",\"slug\":\"七、设计规约\",\"link\":\"#七、设计规约\",\"children\":[]},{\"level\":2,\"title\":\"附 1 ：版本历史\",\"slug\":\"附-1-版本历史\",\"link\":\"#附-1-版本历史\",\"children\":[]},{\"level\":2,\"title\":\"附 2 ：专有名词解释\",\"slug\":\"附-2-专有名词解释\",\"link\":\"#附-2-专有名词解释\",\"children\":[]},{\"level\":2,\"title\":\"附 3 ：错误码列表\",\"slug\":\"附-3-错误码列表\",\"link\":\"#附-3-错误码列表\",\"children\":[]}],\"readingTime\":{\"minutes\":126.74,\"words\":38021},\"filePathRelative\":\"develop/quality-assurance/code-style-alibaba.md\",\"localizedDate\":\"2022年2月3日\",\"excerpt\":\"<h1> 阿里巴巴 Java 开发手册</h1>\\n<h2> 前言</h2>\\n<p>《Java开发手册》是阿里巴巴和开课吧技术团队的集体智慧结晶和经验总结，经历了多次大规模一线实战的检验及不断完善，公开到业界后，众多社区开发者踊跃参与打磨完善，系统化地整理成册，当前的最新版本是黄山版。现代软件行业的高速发展对开发者的综合素质要求越来越高，因为不仅是编程知识点，其它维度的知识点也会影响到软件的最终交付质量。比如：五花八门的错误码会人为地增加排查问题的难度；数据库的表结构和索引设计缺陷带来的系统架构缺陷或性能风险；工程结构混乱导致后续项目维护艰难；没有鉴权的漏洞代码容易被黑客攻击等。所以本手册以Java开发者为中心视角，划分为编程规约、异常日志、单元测试、安全规约、MySQL数据库、工程结构、设计规约七个维度，再根据内容特征，细分成若干二级子目录。此外，依据约束力强弱及故障敏感性，规约依次分为<span style=\\\"color: red;\\\">【强制】</span>、<span style=\\\"color: #FEB409;\\\">【推荐】</span>、<span style=\\\"color: #64822E;\\\">【参考】</span>三大类。在延伸的信息中，“说明”对规约做了适当扩展和解释；“<span style=\\\"color: #64822E;\\\">正例</span>”提倡什么样的编码和实现方式；“<span style=\\\"color: red;\\\">反例</span>”说明需要提防的雷区，以及真实的错误案例。</p>\",\"copyright\":{\"author\":\"gavin-james\",\"license\":\"https://github.com/gavin-james/gavin-james.github.io/LICENSE\"},\"autoDesc\":true}")

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
