import{_ as s,W as l,X as o,Y as e,Z as t,$ as r,a2 as i,C as n}from"./framework-6505ccb1.js";const c={},h=i('<h1 id="浅谈单元测试" tabindex="-1"><a class="header-anchor" href="#浅谈单元测试" aria-hidden="true">#</a> 浅谈单元测试</h1><blockquote><p>单元测试（unit testing），是指对软件中的最小可测试单元进行检查和验证。这是基础，所以围绕着单元测试，我从网上搜集和总结了相关的概念，以助你完善体系。@pdai</p></blockquote><h2 id="什么是单元测试" tabindex="-1"><a class="header-anchor" href="#什么是单元测试" aria-hidden="true">#</a> 什么是单元测试？</h2><blockquote><p>来自百度百科。</p></blockquote><p>单元测试（unit testing），是指对软件中的最小可测试单元进行检查和验证。对于单元测试中单元的含义，一般来说，要根据实际情况去判定其具体含义，如C语言中单元指一个函数，Java里单元指一个类，图形化的软件中可以指一个窗口或一个菜单等。总的来说，单元就是人为规定的最小的被测功能模块。单元测试是在软件开发过程中要进行的最低级别的测试活动，软件的独立单元将在与程序的其他部分相隔离的情况下进行测试。</p><h2 id="为什么要写单元测试" tabindex="-1"><a class="header-anchor" href="#为什么要写单元测试" aria-hidden="true">#</a> 为什么要写单元测试？</h2><blockquote><p>使用单元测试可以有效地降低程序出错的机率，提供准确的文档，并帮助我们改进设计方案等等。</p></blockquote><p>以下列举了一些我为什么使用单元测试的好处：</p><ul><li>允许你对代码做出任何改变，因为你了解单元测试会在你的预期之中。</li><li>单元测试可以有效地降低程序出现BUG的机率；</li><li>帮助你更深入地理解代码--因为在写单元测试的时候，你需要明确程序所有的执行流程及对应的执行结果等等;</li><li>允许在任何时候代码重构，而不必担心破坏现有的代码。这使得我们编写程序更灵活;</li><li>确保你的代码的健壮性，因为所有的测试都是通过了的。</li><li>文档记录。单元测试就是一种无价的文档，它是展示函数或类如何使用的最佳文档，这份文档是可编译、可运行的、并且它保持最新，永远与代码同步。</li><li>具有回归性。自动化的单元测试避免了代码出现回归，编写完成之后，可以随时随地地快速运行测试，而不是将代码部署到设备之后，然后再手动地覆盖各种执行路径，这样的行为效率低下，浪费时间。</li></ul><h2 id="什么时候写单元测试" tabindex="-1"><a class="header-anchor" href="#什么时候写单元测试" aria-hidden="true">#</a> 什么时候写单元测试？</h2><p>写单元测试的时机不外乎三种情况：</p><ul><li>一是在具体实现代码之前，这是测试驱动开发（TDD）所提倡的；</li><li>二是与具体实现代码同步进行。先写少量功能代码，紧接着写单元测试（重复这两个过程，直到完成功能代码开发）。其实这种方案跟第一种已经很接近，基本上功能代码开发完，单元测试也差不多完成了。</li><li>三是编写完功能代码再写单元测试。我的实践经验告诉我，事后编写的单元测试“粒度”都比较粗。对同样的功能代码，采取前两种方案的结果可能是用10个“小”的单测来覆盖，每个单测比较简单易懂，可读性可维护性都比较好（重构时单测的改动不大）；而第三种方案写的单测，往往是用1个“大”的单测来覆盖，这个单测逻辑就比较复杂，因为它要测的东西很多，可读性可维护性就比较差。</li></ul><p>建议：我个人是比较推荐单元测试与具体实现代码同步进行这个方案的。只有对需求有一定的理解后才能知道什么是代码的正确性，才能写出有效的单元测试来验证正确性，而能写出一些功能代码则说明对需求有一定理解了。</p><h2 id="单元测试要写多细" tabindex="-1"><a class="header-anchor" href="#单元测试要写多细" aria-hidden="true">#</a> 单元测试要写多细？</h2><p>单元测试不是越多越好，而是越有效越好！进一步解读就是哪些代码需要有单元测试覆盖：</p><ul><li>逻辑复杂的</li><li>容易出错的</li><li>不易理解的，即使是自己过段时间也会遗忘的，看不懂自己的代码，单元测试代码有助于理解代码的功能和需求</li><li>公共代码。比如自定义的所有http请求都会经过的拦截器；工具类等。</li><li>核心业务代码。一个产品里最核心最有业务价值的代码应该要有较高的单元测试覆盖率。</li></ul><h2 id="有哪些单元测试相关的概念" tabindex="-1"><a class="header-anchor" href="#有哪些单元测试相关的概念" aria-hidden="true">#</a> 有哪些单元测试相关的概念？</h2>',17),p={href:"https://segmentfault.com/a/1190000006731125%EF%BC%8C%E4%BD%9C%E8%80%85yongshun",target:"_blank",rel:"noopener noreferrer"},d=i('<h3 id="被测系统" tabindex="-1"><a class="header-anchor" href="#被测系统" aria-hidden="true">#</a> 被测系统</h3><p>被测系统(System under test, SUT)表示正在被测试的系统, 目的是测试系统能否正确操作. 根据测试类型的不同, SUT 指代的内容也不同, 例如 SUT 可以是一个类甚至是一整个系统.</p><h3 id="测试依赖组件-doc" tabindex="-1"><a class="header-anchor" href="#测试依赖组件-doc" aria-hidden="true">#</a> 测试依赖组件(DOC)</h3><p>被测系统所依赖的组件, 例如进程 UserService 的单元测试时, UserService 会依赖 UserDao, 因此 UserDao 就是 DOC.</p><h3 id="测试替身-test-double" tabindex="-1"><a class="header-anchor" href="#测试替身-test-double" aria-hidden="true">#</a> 测试替身(Test Double)</h3><p>一个实际的系统会依赖多个外部对象, 但是在进行单元测试时, 我们会用一些功能较为简单的并且其行为和实际对象类似的假对象来作为 SUT 的依赖对象, 以此来降低单元测试的复杂性和可实现性. 在这里, 这些假对象就被称为 测试替身(Test Double). 测试替身有如下 5 种类型:</p><ul><li><p>Test stub</p><p>为 SUT 提供数据的假对象，我们举一个例子来展示什么是 Test stub.</p><p>假设我们的一个模块需要从 HTTP 接口中获取商品价格数据, 这个获取数据的接口被封装为 getPrice 方法. 在对这个模块进行测试时, 我们显然不太可能专门开一个 HTTP 服务器来提供此接口, 而是提供一个带有 getPrice 方法的假对象, 从这个假对象中获取数据. 在这个例子中, 提供数据的假对象就叫做 Test stub.</p></li><li><p>Fake object</p><p>实现了简单功能的一个假对象. Fake object 和 Test stub 的主要区别就是 Test stub 侧重于用于提供数据的假对象, 而 Fake object 没有这层含义.</p><p>使用 Fake object 的最主要的原因就是在测试时某些组件不可用或运行速度太慢, 因而使用 Fake object 来代替它们.</p></li><li><p>Mock object</p><p>用于模拟实际的对象, 并且能够校验对这个 Mock object 的方法调用是否符合预期.</p><p>实际上, Mock object 是 Test stub 或 Fake object 一种, 但是 Mock object 有 Test stub/Fake object 没有的特性, Mock object 可以很灵活地配置所调用的方法所产生的行为, 并且它可以追踪方法调用, 例如一个 Mock Object 方法调用时传递了哪些参数, 方法调用了几次等.</p></li><li><p>Dummy object</p><p>在测试中并不使用的, 但是为了测试代码能够正常编译/运行而添加的对象. 例如我们调用一个 Test Double 对象的一个方法, 这个方法需要传递几个参数, 但是其中某个参数无论是什么值都不会影响测试的结果, 那么这个参数就是一个 Dummy object. Dummy object 可以是一个空引用, 一个空对象或者是一个常量等.</p><p>简单的说, Dummy object 就是那些没有使用到的, 仅仅是为了填充参数列表的对象.</p></li><li><p>Test Spy</p><p>可以包装一个真实的 Java 对象, 并返回一个包装后的新对象. 若没有特别配置的话, 对这个新对象的所有方法调用, 都会委派给实际的 Java 对象.</p><p>mock 和 spy 的区别是: mock 是无中生有地生出一个完全虚拟的对象, 它的所有方法都是虚拟的; 而 spy 是在现有类的基础上包装了一个对象, 即如果我们没有重写 spy 的方法, 那么这些方法的实现其实都是调用的被包装的对象的方法.</p></li></ul><h3 id="test-fixture" tabindex="-1"><a class="header-anchor" href="#test-fixture" aria-hidden="true">#</a> Test fixture</h3><p>所谓 test fixture, 就是运行测试程序所需要的先决条件(precondition). 即对被测对象进行测试时锁需要的一切东西(The test fixture is everything we need to have in place to exercise the SUT). 这个 东西 不单单指的是数据, 同时包括对被测对象的配置, 被测对象所需要的依赖对象等. JUnit4 之前是通过 setUp, TearDown 方法完成, 在 JUnit4这, 我们可以使用@Before 代替 setUp 方法, @After 代替 tearDown 方法.</p><p>注意, @Before 在每个测试方法运行前都会被调用, @After 在每个测试方法运行后都会被调用.</p><p>因为 @Before 和 @After 会在每个测试方法前后都会被调用, 而有时我们仅仅需要在测试前进行一次初始化, 这样的情况下, 可以使用@BeforeClass 和@AfterClass 注解.</p><h3 id="测试用例-test-case" tabindex="-1"><a class="header-anchor" href="#测试用例-test-case" aria-hidden="true">#</a> 测试用例(Test case)</h3><p>在 JUnit 3中, 测试方法都必须以 test 为前缀, 且必须是 public void 的, JUnit 4之后, 就没有这个限制了, 只要在每个测试方法标注 @Test 注解, 方法签名可以是任意的.</p><h2 id="测试套件" tabindex="-1"><a class="header-anchor" href="#测试套件" aria-hidden="true">#</a> 测试套件</h2><p>通过 TestSuit 对象将多个测试用例组装成一个测试套件, 测试套件批量运行.通过@RunWith 和@SuteClass 两个注解, 我们可以创建一个测试套件. 通过@RunWith 指定一个特殊的运行器, 几 Suite.class 套件运行器, 并通过@SuiteClasses 注解, 将需要进行测试的类列表作作为参数传入.</p><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>',16),u={href:"https://coolshell.cn/articles/8209.html",target:"_blank",rel:"noopener noreferrer"},b={href:"https://segmentfault.com/a/1190000006731125",target:"_blank",rel:"noopener noreferrer"},f={href:"https://blog.csdn.net/flysqrlboy/article/details/79301241",target:"_blank",rel:"noopener noreferrer"};function k(T,_){const a=n("ExternalLinkIcon");return l(),o("div",null,[h,e("blockquote",null,[e("p",null,[t("这里节选自"),e("a",p,[t("https://segmentfault.com/a/1190000006731125，作者yongshun"),r(a)]),t(" 采用署名-非商业性使用-相同方式共享 3.0 中国大陆许可协议.")])]),d,e("p",null,[e("a",u,[t("https://coolshell.cn/articles/8209.html"),r(a)])]),e("p",null,[e("a",b,[t("https://segmentfault.com/a/1190000006731125"),r(a)])]),e("p",null,[e("a",f,[t("https://blog.csdn.net/flysqrlboy/article/details/79301241"),r(a)])])])}const x=s(c,[["render",k],["__file","unit-test.html.vue"]]);export{x as default};
