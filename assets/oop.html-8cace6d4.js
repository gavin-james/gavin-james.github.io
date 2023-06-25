import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as p,c,a as n,b as s,d as e,f as i}from"./app-5798e4ed.js";const o={},u=i(`<h1 id="面向对象" tabindex="-1"><a class="header-anchor" href="#面向对象" aria-hidden="true">#</a> 面向对象</h1><blockquote><p>本文主要介绍Java OOP 面向对象基础和相关类图。@pdai</p></blockquote><h2 id="三大特性" tabindex="-1"><a class="header-anchor" href="#三大特性" aria-hidden="true">#</a> 三大特性</h2><h3 id="封装" tabindex="-1"><a class="header-anchor" href="#封装" aria-hidden="true">#</a> 封装</h3><p>利用抽象数据类型将数据和基于数据的操作封装在一起，使其构成一个不可分割的独立实体。数据被保护在抽象数据类型的内部，尽可能地隐藏内部的细节，只保留一些对外接口使之与外部发生联系。用户无需知道对象内部的细节，但可以通过对象对外提供的接口来访问该对象。</p><p>优点:</p><ul><li>减少耦合: 可以独立地开发、测试、优化、使用、理解和修改</li><li>减轻维护的负担: 可以更容易被程序员理解，并且在调试的时候可以不影响其他模块</li><li>有效地调节性能: 可以通过剖析确定哪些模块影响了系统的性能</li><li>提高软件的可重用性</li><li>降低了构建大型系统的风险: 即使整个系统不可用，但是这些独立的模块却有可能是可用的</li></ul><p>以下 Person 类封装 name、gender、age 等属性，外界只能通过 get() 方法获取一个 Person 对象的 name 属性和 gender 属性，而无法获取 age 属性，但是 age 属性可以供 work() 方法使用。</p><p>注意到 gender 属性使用 int 数据类型进行存储，封装使得用户注意不到这种实现细节。并且在需要修改 gender 属性使用的数据类型时，也可以在不影响客户端代码的情况下进行。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> gender<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getGender</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> gender <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token string">&quot;man&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;woman&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">work</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token number">18</span> <span class="token operator">&lt;=</span> age <span class="token operator">&amp;&amp;</span> age <span class="token operator">&lt;=</span> <span class="token number">50</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name <span class="token operator">+</span> <span class="token string">&quot; is working very hard!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name <span class="token operator">+</span> <span class="token string">&quot; can&#39;t work any more!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="继承" tabindex="-1"><a class="header-anchor" href="#继承" aria-hidden="true">#</a> 继承</h3><p>继承实现了 <strong>IS-A</strong> 关系，例如 Cat 和 Animal 就是一种 IS-A 关系，因此 Cat 可以继承自 Animal，从而获得 Animal 非 private 的属性和方法。</p><p>继承应该遵循里氏替换原则，子类对象必须能够替换掉所有父类对象。</p><p>Cat 可以当做 Animal 来使用，也就是说可以使用 Animal 引用 Cat 对象。父类引用指向子类对象称为 <strong>向上转型</strong> 。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Animal</span> animal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="多态" tabindex="-1"><a class="header-anchor" href="#多态" aria-hidden="true">#</a> 多态</h3><p>多态分为编译时多态和运行时多态:</p><ul><li>编译时多态主要指方法的重载</li><li>运行时多态指程序中定义的对象引用所指向的具体类型在运行期间才确定</li></ul><p>运行时多态有三个条件:</p><ul><li>继承</li><li>覆盖(重写)</li><li>向上转型</li></ul><p>下面的代码中，乐器类(Instrument)有两个子类: Wind 和 Percussion，它们都覆盖了父类的 play() 方法，并且在 main() 方法中使用父类 Instrument 来引用 Wind 和 Percussion 对象。在 Instrument 引用调用 play() 方法时，会执行实际引用对象所在类的 play() 方法，而不是 Instrument 类的方法。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Instrument</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Instrument is playing...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Wind</span> <span class="token keyword">extends</span> <span class="token class-name">Instrument</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Wind is playing...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Percussion</span> <span class="token keyword">extends</span> <span class="token class-name">Instrument</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Percussion is playing...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Music</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Instrument</span><span class="token punctuation">&gt;</span></span> instruments <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        instruments<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Wind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        instruments<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Percussion</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">Instrument</span> instrument <span class="token operator">:</span> instruments<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            instrument<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="类图" tabindex="-1"><a class="header-anchor" href="#类图" aria-hidden="true">#</a> 类图</h2>`,23),r={href:"https://www.planttext.com/",target:"_blank",rel:"noopener noreferrer"},d={href:"http://plantuml.com/",target:"_blank",rel:"noopener noreferrer"},v=i(`<h3 id="泛化关系-generalization" tabindex="-1"><a class="header-anchor" href="#泛化关系-generalization" aria-hidden="true">#</a> 泛化关系 (Generalization)</h3><p>用来描述继承关系，在 Java 中使用 extends 关键字。</p><figure><img src="https://www.pdai.tech/images/pics/SoWkIImgAStDuU8goIp9ILLmJyrBBKh.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>@startuml

title Generalization

class Vehical
class Car
class Truck

Vehical <span class="token operator">&lt;</span><span class="token operator">|</span>-- Car
Vehical <span class="token operator">&lt;</span><span class="token operator">|</span>-- Truck

@enduml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="实现关系-realization" tabindex="-1"><a class="header-anchor" href="#实现关系-realization" aria-hidden="true">#</a> 实现关系 (Realization)</h3><p>用来实现一个接口，在 Java 中使用 implements 关键字。</p><figure><img src="https://www.pdai.tech/images/pics/SoWkIImgAStDuU8goIp9ILK8IatCoQn.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>@startuml

title Realization

interface MoveBehavior
class Fly
class Run

MoveBehavior <span class="token operator">&lt;</span><span class="token operator">|</span><span class="token punctuation">..</span> Fly
MoveBehavior <span class="token operator">&lt;</span><span class="token operator">|</span><span class="token punctuation">..</span> Run

@enduml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="聚合关系-aggregation" tabindex="-1"><a class="header-anchor" href="#聚合关系-aggregation" aria-hidden="true">#</a> 聚合关系 (Aggregation)</h3><p>表示整体由部分组成，但是整体和部分不是强依赖的，整体不存在了部分还是会存在。</p><figure><img src="https://www.pdai.tech/images/pics/SoWkIImgAStDuU8goIp9ILLmJ4ylIar.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>@startuml

title Aggregation

class Computer
class Keyboard
class Mouse
class Screen

Computer o-- Keyboard
Computer o-- Mouse
Computer o-- Screen

@enduml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="组合关系-composition" tabindex="-1"><a class="header-anchor" href="#组合关系-composition" aria-hidden="true">#</a> 组合关系 (Composition)</h3><p>和聚合不同，组合中整体和部分是强依赖的，整体不存在了部分也不存在了。比如公司和部门，公司没了部门就不存在了。但是公司和员工就属于聚合关系了，因为公司没了员工还在。</p><figure><img src="https://www.pdai.tech/images/pics/SoWkIImgAStDuU8goIp9ILLmpiyjo2_.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>@startuml

title Composition

class Company
class DepartmentA
class DepartmentB

Company *-- DepartmentA
Company *-- DepartmentB

@enduml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关联关系-association" tabindex="-1"><a class="header-anchor" href="#关联关系-association" aria-hidden="true">#</a> 关联关系 (Association)</h3><p>表示不同类对象之间有关联，这是一种静态关系，与运行过程的状态无关，在最开始就可以确定。因此也可以用 1 对 1、多对 1、多对多这种关联关系来表示。比如学生和学校就是一种关联关系，一个学校可以有很多学生，但是一个学生只属于一个学校，因此这是一种多对一的关系，在运行开始之前就可以确定。</p><figure><img src="https://www.pdai.tech/images/pics/SoWkIImgAStDuU8goIp9ILLmB2xEJyv.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>@startuml

title Association

class School
class Student

School <span class="token string">&quot;1&quot;</span> - <span class="token string">&quot;n&quot;</span> Student

@enduml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="依赖关系-dependency" tabindex="-1"><a class="header-anchor" href="#依赖关系-dependency" aria-hidden="true">#</a> 依赖关系 (Dependency)</h3><p>和关联关系不同的是，依赖关系是在运行过程中起作用的。A 类和 B 类是依赖关系主要有三种形式:</p><ul><li>A 类是 B 类中的(某中方法的)局部变量；</li><li>A 类是 B 类方法当中的一个参数；</li><li>A 类向 B 类发送消息，从而影响 B 类发生变化；</li></ul><figure><img src="https://www.pdai.tech/images/pics/LOun2W9134NxVugmbJPp15d4LalxC4O.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>@startuml

title Dependency

class Vehicle <span class="token punctuation">{</span>
    move<span class="token punctuation">(</span>MoveBehavior<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

interface MoveBehavior <span class="token punctuation">{</span>
    move<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

note <span class="token string">&quot;MoveBehavior.move()&quot;</span> as N

Vehicle <span class="token punctuation">..</span><span class="token operator">&gt;</span> MoveBehavior

Vehicle <span class="token punctuation">..</span> N

@enduml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,26),m=n("li",null,"Java 编程思想",-1),k=n("li",null,"敏捷软件开发: 原则、模式与实践",-1),b={href:"http://www.cnblogs.com/shanyou/archive/2009/09/21/1570716.html",target:"_blank",rel:"noopener noreferrer"},g={href:"http://design-patterns.readthedocs.io/zh_CN/latest/read_uml.html#generalization",target:"_blank",rel:"noopener noreferrer"},h={href:"http://www.cnblogs.com/wolf-sun/p/UML-Sequence-diagram.html",target:"_blank",rel:"noopener noreferrer"},w={href:"http://blog.csdn.net/jianyuerensheng/article/details/51602015",target:"_blank",rel:"noopener noreferrer"},f={href:"https://blog.csdn.net/weixin_38173324/article/details/70037927",target:"_blank",rel:"noopener noreferrer"},y={href:"https://www.cnblogs.com/AlanLee/p/6475334.html",target:"_blank",rel:"noopener noreferrer"},_={href:"http://www.cnblogs.com/wujing-hubei/p/6012105.html",target:"_blank",rel:"noopener noreferrer"};function x(I,S){const a=l("ExternalLinkIcon");return p(),c("div",null,[u,n("p",null,[s("以下类图使用 "),n("a",r,[s("PlantUML在新窗口打开"),e(a)]),s(" 绘制，更多语法及使用请参考: "),n("a",d,[s("http://plantuml.com/"),e(a)]),s(" 。")]),v,n("ul",null,[m,k,n("li",null,[n("a",b,[s("面向对象设计的 SOLID 原则在新窗口打开"),e(a)])]),n("li",null,[n("a",g,[s("看懂 UML 类图和时序图在新窗口打开"),e(a)])]),n("li",null,[n("a",h,[s("UML 系列——时序图(顺序图)sequence diagram在新窗口打开"),e(a)])]),n("li",null,[n("a",w,[s("面向对象编程三大特性 ------ 封装、继承、多态在新窗口打开"),e(a)])]),n("li",null,[s("javaoop基础知识总结 "),n("a",f,[s("https://blog.csdn.net/weixin_38173324/article/details/70037927"),e(a)])]),n("li",null,[s("Java实现OOP(面向对象编程) "),n("a",y,[s("https://www.cnblogs.com/AlanLee/p/6475334.html"),e(a)])]),n("li",null,[s("Java 抽象类与oop三大特征 "),n("a",_,[s("http://www.cnblogs.com/wujing-hubei/p/6012105.html"),e(a)])])])])}const L=t(o,[["render",x],["__file","oop.html.vue"]]);export{L as default};
