const e=JSON.parse('{"key":"v-d1bc46ac","path":"/develop/dev-agile/dev-pratice-tdd.html","title":"敏捷开发 - 开发实践：测试驱动开发(TDD）","lang":"zh-CN","frontmatter":{"date":"2019-06-09T00:00:00.000Z","category":["开发流程"],"tag":["开发流程"],"description":"敏捷开发 - 开发实践：测试驱动开发(TDD） 测试驱动开发(Test Driven Development, 简称TDD)是敏捷开发中的一项核心实践和技术，也是一种设计方法论。TDD的原理是在开发功能代码之前，先编写单元测试用例代码，测试代码确定需要编写什么产品代码。TDD的基本思路就是通过测试来推动整个开发的进行，但测试驱动开发并不只是单纯的测试工作，而是把需求分析，设计，质量控制量化的过程。TDD首先考虑使用需求（对象、功能、过程、接口等），主要是编写测试用例框架对功能的过程和接口进行设计，而测试框架可以持续进行验证。本主要介绍TDD的基础和实践案例，以及很多团队无法使用TDD方式开发的一些思考。","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/develop/dev-agile/dev-pratice-tdd.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"敏捷开发 - 开发实践：测试驱动开发(TDD）"}],["meta",{"property":"og:description","content":"敏捷开发 - 开发实践：测试驱动开发(TDD） 测试驱动开发(Test Driven Development, 简称TDD)是敏捷开发中的一项核心实践和技术，也是一种设计方法论。TDD的原理是在开发功能代码之前，先编写单元测试用例代码，测试代码确定需要编写什么产品代码。TDD的基本思路就是通过测试来推动整个开发的进行，但测试驱动开发并不只是单纯的测试工作，而是把需求分析，设计，质量控制量化的过程。TDD首先考虑使用需求（对象、功能、过程、接口等），主要是编写测试用例框架对功能的过程和接口进行设计，而测试框架可以持续进行验证。本主要介绍TDD的基础和实践案例，以及很多团队无法使用TDD方式开发的一些思考。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-27T08:55:11.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"开发流程"}],["meta",{"property":"article:published_time","content":"2019-06-09T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-27T08:55:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"敏捷开发 - 开发实践：测试驱动开发(TDD）\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-06-09T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-27T08:55:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"什么是测试驱动开发(TDD)","slug":"什么是测试驱动开发-tdd","link":"#什么是测试驱动开发-tdd","children":[{"level":3,"title":"如何进行TDD？","slug":"如何进行tdd","link":"#如何进行tdd","children":[]},{"level":3,"title":"什么是ATDD?和TDD是什么关系?","slug":"什么是atdd-和tdd是什么关系","link":"#什么是atdd-和tdd是什么关系","children":[]}]},{"level":2,"title":"TDD实践案例","slug":"tdd实践案例","link":"#tdd实践案例","children":[{"level":3,"title":"第一个需求：计算两个int类型的加法功能","slug":"第一个需求-计算两个int类型的加法功能","link":"#第一个需求-计算两个int类型的加法功能","children":[]},{"level":3,"title":"第二个需求：如果两个int类型相加越界，则抛出异常而不是错误值","slug":"第二个需求-如果两个int类型相加越界-则抛出异常而不是错误值","link":"#第二个需求-如果两个int类型相加越界-则抛出异常而不是错误值","children":[]}]},{"level":2,"title":"进一步理解","slug":"进一步理解","link":"#进一步理解","children":[{"level":3,"title":"TDD核心思想是什么?","slug":"tdd核心思想是什么","link":"#tdd核心思想是什么","children":[]},{"level":3,"title":"为什么很多团队无法执行TDD?","slug":"为什么很多团队无法执行tdd","link":"#为什么很多团队无法执行tdd","children":[]},{"level":3,"title":"AMDD：通过敏捷模型拓展TDD?","slug":"amdd-通过敏捷模型拓展tdd","link":"#amdd-通过敏捷模型拓展tdd","children":[]},{"level":3,"title":"TDD研究文献推荐？","slug":"tdd研究文献推荐","link":"#tdd研究文献推荐","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1690160698000,"updatedTime":1703667311000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":2}]},"readingTime":{"minutes":13.57,"words":4070},"filePathRelative":"develop/dev-agile/dev-pratice-tdd.md","localizedDate":"2019年6月9日","excerpt":"<h1> 敏捷开发 - 开发实践：测试驱动开发(TDD）</h1>\\n<blockquote>\\n<p>测试驱动开发(Test Driven Development, 简称TDD)是敏捷开发中的一项核心实践和技术，也是一种设计方法论。TDD的原理是在开发功能代码之前，先编写单元测试用例代码，测试代码确定需要编写什么产品代码。TDD的基本思路就是通过测试来推动整个开发的进行，但测试驱动开发并不只是单纯的测试工作，而是把需求分析，设计，质量控制量化的过程。TDD首先考虑使用需求（对象、功能、过程、接口等），主要是编写测试用例框架对功能的过程和接口进行设计，而测试框架可以持续进行验证。本主要介绍TDD的基础和实践案例，以及很多团队无法使用TDD方式开发的一些思考。</p>\\n</blockquote>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}');export{e as data};
