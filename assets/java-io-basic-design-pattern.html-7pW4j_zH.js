import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as e,c as n,f as t}from"./app-Hbmz8LxZ.js";const s={},i=t(`<h1 id="java-io-设计模式-装饰者模式" tabindex="-1"><a class="header-anchor" href="#java-io-设计模式-装饰者模式" aria-hidden="true">#</a> Java IO - 设计模式(装饰者模式)</h1><blockquote><p>Java I/O 使用了装饰者模式来实现。</p></blockquote><h2 id="装饰者模式" tabindex="-1"><a class="header-anchor" href="#装饰者模式" aria-hidden="true">#</a> 装饰者模式</h2><p>请参考<a href="">装饰者模式详解</a></p><p>装饰者(Decorator)和具体组件(ConcreteComponent)都继承自组件(Component)，具体组件的方法实现不需要依赖于其它对象，而装饰者组合了一个组件，这样它可以装饰其它装饰者或者具体组件。所谓装饰，就是把这个装饰者套在被装饰者之上，从而动态扩展被装饰者的功能。装饰者的方法有一部分是自己的，这属于它的功能，然后调用被装饰者的方法实现，从而也保留了被装饰者的功能。可以看到，具体组件应当是装饰层次的最低层，因为只有具体组件的方法实现不需要依赖于其它对象。</p><figure><img src="https://www.pdai.tech/images/pics/137c593d-0a9e-47b8-a9e6-b71f540b82dd.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="io-装饰者模式" tabindex="-1"><a class="header-anchor" href="#io-装饰者模式" aria-hidden="true">#</a> IO 装饰者模式</h2><p>以 InputStream 为例，</p><ul><li>InputStream 是抽象组件；</li><li>FileInputStream 是 InputStream 的子类，属于具体组件，提供了字节流的输入操作；</li><li>FilterInputStream 属于抽象装饰者，装饰者用于装饰组件，为组件提供额外的功能。例如 BufferedInputStream 为 FileInputStream 提供缓存的功能。</li></ul><figure><img src="https://www.pdai.tech/images/pics/DP-Decorator-java.io.png" alt="image" tabindex="0" loading="lazy"><figcaption>image</figcaption></figure><p>实例化一个具有缓存功能的字节流对象时，只需要在 FileInputStream 对象上再套一层 BufferedInputStream 对象即可。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">FileInputStream</span> fileInputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">BufferedInputStream</span> bufferedInputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedInputStream</span><span class="token punctuation">(</span>fileInputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>DataInputStream 装饰者提供了对更多数据类型进行输入的操作，比如 int、double 等基本类型。</p>`,13),p=[i];function r(o,c){return e(),n("div",null,p)}const d=a(s,[["render",r],["__file","java-io-basic-design-pattern.html.vue"]]);export{d as default};
