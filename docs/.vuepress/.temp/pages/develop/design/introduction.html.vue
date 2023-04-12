<template><div><h2 id="基于接口而非实现编程" tabindex="-1"><a class="header-anchor" href="#基于接口而非实现编程" aria-hidden="true">#</a> 基于接口而非实现编程</h2>
<p>这个原则非常重要，是一种非常有效的提高代码质量的手段，在平时的开发中特别经常被用到。</p>
<h3 id="如何解读原则中的「接口」二字" tabindex="-1"><a class="header-anchor" href="#如何解读原则中的「接口」二字" aria-hidden="true">#</a> 如何解读原则中的「接口」二字</h3>
<p>「基于接口而非实现编程」这条原则的英文描述是：「Program to an interface, not an implementation」。我们理解这条原则的时候，千万不要一开始就与具体的编程语言挂钩，局限在编程语言的「接口」语法中（比如 Java 中的 interface 接口语法）。这条原则最早出现于 1994 年 GoF 的《设计模式》这本书，它先于很多编程语言而诞生（比如 Java 语言），是一条比较抽象、泛化的设计思想。</p>
<p>实际上，理解这条原则的关键，就是理解其中的「接口」两个字。从本质上来看，「接口」就是一组「协议」或者「约定」，是功能提供者提供给使用者的一个「功能列表」。「接口」在不同的应用场景下会有不同的解读，比如服务端与客户端之间的「接口」，类库提供的「接口」，甚至是一组通信的协议都可以叫作「接口」。刚刚对「接口」的理解，都比较偏上层、偏抽象，与实际的写代码离得有点远。如果落实到具体的编码，「基于接口而非实现编程」这条原则中的「接口」，可以理解为编程语言中的接口或者抽象类。</p>
<p>前面我们提到，这条原则能非常有效地提高代码质量，之所以这么说，那是因为，应用这条原则，可以将接口和实现相分离，封装不稳定的实现，暴露稳定的接口。上游系统面向接口而非实现编程，不依赖不稳定的实现细节，这样当实现发生变化的时候，上游系统的代码基本上不需要做改动，以此来降低耦合性，提高扩展性。</p>
<p>实际上，「基于接口而非实现编程」这条原则的另一个表述方式，是「基于抽象而非实现编程」。后者的表述方式其实更能体现这条原则的设计初衷。在软件开发中，最大的挑战之一就是需求的不断变化，这也是考验代码设计好坏的一个标准。<strong>越抽象、越顶层、越脱离具体某一实现的设计，越能提高代码的灵活性，越能应对未来的需求变化。好的代码设计，不仅能应对当下的需求，而且在将来需求发生变化的时候，仍然能够在不破坏原有代码设计的情况下灵活应对</strong>。而抽象就是提高代码扩展性、灵活性、可维护性最有效的手段之一。</p>
<h3 id="如何将这条原则应用到实战中" tabindex="-1"><a class="header-anchor" href="#如何将这条原则应用到实战中" aria-hidden="true">#</a> 如何将这条原则应用到实战中</h3>
<p>假设我们的系统中有很多涉及图片处理和存储的业务逻辑。图片经过处理之后被上传到阿里云上。为了代码复用，我们封装了图片存储相关的代码逻辑，提供了一个统一的 AliyunImageStore 类，供整个系统来使用。具体的代码实现如下所示：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AliyunImageStore</span> <span class="token punctuation">{</span>
  <span class="token comment">// ... 省略属性、构造函数等 ...</span>
  
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">createBucketIfNotExisting</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ... 创建 bucket 代码逻辑 ...</span>
    <span class="token comment">// ... 失败会抛出异常 ...</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">generateAccessToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...根据 accesskey/secrectkey 等生成 access token</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">uploadToAliyun</span><span class="token punctuation">(</span><span class="token class-name">Image</span> image<span class="token punctuation">,</span> <span class="token class-name">String</span> bucketName<span class="token punctuation">,</span> <span class="token class-name">String</span> accessToken<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//... 上传图片到阿里云 ...</span>
    <span class="token comment">//... 返回图片存储在阿里云上的地址(url）...</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">public</span> <span class="token class-name">Image</span> <span class="token function">downloadFromAliyun</span><span class="token punctuation">(</span><span class="token class-name">String</span> url<span class="token punctuation">,</span> <span class="token class-name">String</span> accessToken<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//... 从阿里云下载图片 ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// AliyunImageStore 类的使用举例</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ImageProcessingJob</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> BUCKET_NAME <span class="token operator">=</span> <span class="token string">"ai_images_bucket"</span><span class="token punctuation">;</span>
  <span class="token comment">// ... 省略其他无关代码 ...</span>
  
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Image</span> image <span class="token operator">=</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>  <span class="token comment">// 处理图片，并封装为 Image 对象</span>
    <span class="token class-name">AliyunImageStore</span> imageStore <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AliyunImageStore</span><span class="token punctuation">(</span><span class="token comment">/*省略参数*/</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    imageStore<span class="token punctuation">.</span><span class="token function">createBucketIfNotExisting</span><span class="token punctuation">(</span>BUCKET_NAME<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> accessToken <span class="token operator">=</span> imageStore<span class="token punctuation">.</span><span class="token function">generateAccessToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    imagestore<span class="token punctuation">.</span><span class="token function">uploadToAliyun</span><span class="token punctuation">(</span>image<span class="token punctuation">,</span> BUCKET_NAME<span class="token punctuation">,</span> accessToken<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整个上传流程包含三个步骤：创建 bucket（你可以简单理解为存储目录）、生成 access token 访问凭证、携带 access token 上传图片到指定的 bucket 中。代码实现非常简单，类中的几个方法定义得都很干净，用起来也很清晰，乍看起来没有太大问题，完全能满足我们将图片存储在阿里云的业务需求。</p>
<p>不过，软件开发中唯一不变的就是变化。过了一段时间后，我们自建了私有云，不再将图片存储到阿里云了，而是将图片存储到自建私有云上。为了满足这样一个需求的变化，我们该如何修改代码呢？</p>
<ol>
<li>
<p>我们需要重新设计实现一个存储图片到私有云的 <code v-pre>PrivateImageStore</code> 类，并用它替换掉项目中所有的 <code v-pre>AliyunImageStore</code> 类对象。这样的修改听起来并不复杂，只是简单替换而已，对整个代码的改动并不大。不过，我们经常说，「细节是魔鬼」。这句话在软件开发中特别适用。实际上，刚刚的设计实现方式，就隐藏了很多容易出问题的「魔鬼细节」，我们一块来看看都有哪些</p>
</li>
<li>
<p>新的 <code v-pre>PrivateImageStore</code> 类需要设计实现哪些方法，才能在尽量最小化代码修改的情况下，替换掉 <code v-pre>AliyunImageStore</code> 类呢？这就要求我们必须将 <code v-pre>AliyunImageStore</code> 类中所定义的所有 public 方法，在 <code v-pre>PrivateImageStore</code> 类中都逐一定义并重新实现一遍。而这样做就会存在一些问题，我总结了下面两点</p>
<ul>
<li>首先，<code v-pre>AliyunImageStore</code> 类中有些函数命名暴露了实现细节，比如，<code v-pre>uploadToAliyun()</code> 和 <code v-pre>downloadFromAliyun()</code>。如果开发这个功能的同事没有接口意识、抽象思维，那这种暴露实现细节的命名方式就不足为奇了，毕竟最初我们只考虑将图片存储在阿里云上。而我们把这种包含「aliyun」字眼的方法，照抄到 <code v-pre>PrivateImageStore</code> 类中，显然是不合适的。如果我们在新类中重新命名 <code v-pre>uploadToAliyun()</code>、<code v-pre>downloadFromAliyun()</code> 这些方法，那就意味着，我们要修改项目中所有使用到这两个方法的代码，代码修改量可能就会很大</li>
<li>其次，将图片存储到阿里云的流程，跟存储到私有云的流程，可能并不是完全一致的。比如，阿里云的图片上传和下载的过程中，需要生产 access token，而私有云不需要 access token。一方面，<code v-pre>AliyunImageStore</code> 中定义的 <code v-pre>generateAccessToken()</code> 方法不能照抄到 <code v-pre>PrivateImageStore </code>中；另一方面，我们在使用 <code v-pre>AliyunImageStore</code> 上传、下载图片的时候，代码中用到了 <code v-pre>generateAccessToken()</code> 方法，如果要改为私有云的上传下载流程，这些代码都需要做调整</li>
</ul>
</li>
<li>
<p>那这两个问题该如何解决呢？解决这个问题的根本方法就是，在编写代码的时候，要遵从「基于接口而非实现编程」的原则，具体来讲，我们需要做到下面这 3 点。</p>
<ol>
<li>函数的命名不能暴露任何实现细节。比如，前面提到的 <code v-pre>uploadToAliyun()</code> 就不符合要求，应该改为去掉 aliyun 这样的字眼，改为更加抽象的命名方式，比如：<code v-pre>upload()</code></li>
<li>封装具体的实现细节。比如，跟阿里云相关的特殊上传（或下载）流程不应该暴露给调用者。我们对上传（或下载）流程进行封装，对外提供一个包裹所有上传（或下载）细节的方法，给调用者使用</li>
<li>为实现类定义抽象的接口。具体的实现类都依赖统一的接口定义，遵从一致的上传功能协议。使用者依赖接口，而不是具体的实现类来编程</li>
</ol>
</li>
<li>
<p>我们按照这个思路，把代码重构一下。重构后的代码如下所示：</p>
</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ImageStore</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">upload</span><span class="token punctuation">(</span><span class="token class-name">Image</span> image<span class="token punctuation">,</span> <span class="token class-name">String</span> bucketName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Image</span> <span class="token function">download</span><span class="token punctuation">(</span><span class="token class-name">String</span> url<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AliyunImageStore</span> <span class="token keyword">implements</span> <span class="token class-name">ImageStore</span> <span class="token punctuation">{</span>
    <span class="token comment">// ... 省略属性、构造函数等 ...</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">upload</span><span class="token punctuation">(</span><span class="token class-name">Image</span> image<span class="token punctuation">,</span> <span class="token class-name">String</span> bucketName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">createBucketIfNotExisting</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> accessToken <span class="token operator">=</span> <span class="token function">generateAccessToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// ... 上传图片到阿里云 ...</span>
        <span class="token comment">// ... 返回图片在阿里云上的地址(url) ...</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Image</span> <span class="token function">download</span><span class="token punctuation">(</span><span class="token class-name">String</span> url<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> accessToken <span class="token operator">=</span> <span class="token function">generateAccessToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// ... 从阿里云下载图片 ...</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">createBucketIfNotExisting</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ... 创建bucket ...</span>
        <span class="token comment">// ... 失败会抛出异常 ...</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">generateAccessToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ... 根据 accesskey/secrectkey 等生成 access token</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 上传下载流程改变：私有云不需要支持 access token</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PrivateImageStore</span> <span class="token keyword">implements</span> <span class="token class-name">ImageStore</span>  <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">upload</span><span class="token punctuation">(</span><span class="token class-name">Image</span> image<span class="token punctuation">,</span> <span class="token class-name">String</span> bucketName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">createBucketIfNotExisting</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// ... 上传图片到私有云 ...</span>
        <span class="token comment">// ... 返回图片的ur l...</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Image</span> <span class="token function">download</span><span class="token punctuation">(</span><span class="token class-name">String</span> url<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//... 从私有云下载图片 ...</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">createBucketIfNotExisting</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ... 创建bucke t...</span>
        <span class="token comment">// ... 失败会抛出异常 ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// ImageStore 的使用举例</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ImageProcessingJob</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> BUCKET_NAME <span class="token operator">=</span> <span class="token string">"ai_images_bucket"</span><span class="token punctuation">;</span>
    <span class="token comment">// ... 省略其他无关代码 ...</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Image</span> image <span class="token operator">=</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span> <span class="token comment">// 处理图片，并封装为 Image 对象</span>
        <span class="token class-name">ImageStore</span> imageStore <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrivateImageStore</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        imagestore<span class="token punctuation">.</span><span class="token function">upload</span><span class="token punctuation">(</span>image<span class="token punctuation">,</span> BUCKET_NAME<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外，很多人在定义接口的时候，希望通过实现类来反推接口的定义。先把实现类写好，然后看实现类中有哪些方法，照抄到接口定义中。如果按照这种思考方式，就有可能导致接口定义不够抽象，依赖具体的实现。这样的接口设计就没有意义了。不过，如果你觉得这种思考方式更加顺畅，那也没问题，只是将实现类的方法搬移到接口定义中的时候，要有选择性的搬移，不要将跟具体实现相关的方法搬移到接口中，比如 AliyunImageStore 中的 <code v-pre>generateAccessToken()</code> 方法。</p>
<p>总结一下，我们在做软件开发的时候，一定要有抽象意识、封装意识、接口意识。在定义接口的时候，不要暴露任何实现细节。接口的定义只表明做什么，而不是怎么做。而且，在设计接口的时候，我们要多思考一下，这样的接口设计是否足够通用，是否能够做到在替换具体的接口实现的时候，不需要任何接口定义的改动。</p>
<h3 id="是否需要为每个类定义接口" tabindex="-1"><a class="header-anchor" href="#是否需要为每个类定义接口" aria-hidden="true">#</a> 是否需要为每个类定义接口</h3>
<ol>
<li>
<p>看了刚刚的讲解，你可能会有这样的疑问：为了满足这条原则，我是不是需要给每个实现类都定义对应的接口呢？在开发的时候，是不是任何代码都要只依赖接口，完全不依赖实现编程呢</p>
</li>
<li>
<p>做任何事情都要讲求一个「度」，过度使用这条原则，非得给每个类都定义接口，接口满天飞，也会导致不必要的开发负担。至于什么时候，该为某个类定义接口，实现基于接口的编程，什么时候不需要定义接口，直接使用实现类编程，我们做权衡的根本依据，还是要回归到设计原则诞生的初衷上来。只要搞清楚了这条原则是为了解决什么样的问题而产生的，你就会发现，很多之前模棱两可的问题，都会变得豁然开朗</p>
</li>
<li>
<p>前面我们也提到，这条原则的设计初衷是，将接口和实现相分离，封装不稳定的实现，暴露稳定的接口。上游系统面向接口而非实现编程，不依赖不稳定的实现细节，这样当实现发生变化的时候，上游系统的代码基本上不需要做改动，以此来降低代码间的耦合性，提高代码的扩展性</p>
</li>
<li>
<p>从这个设计初衷上来看，如果在我们的业务场景中，某个功能只有一种实现方式，未来也不可能被其他实现方式替换，那我们就没有必要为其设计接口，也没有必要基于接口编程，直接使用实现类就可以了</p>
</li>
<li>
<p>除此之外，越是不稳定的系统，我们越是要在代码的扩展性、维护性上下功夫。相反，如果某个系统特别稳定，在开发完之后，基本上不需要做维护，那我们就没有必要为其扩展性，投入不必要的开发时间</p>
</li>
</ol>
<h2 id="多用组合少用继承" tabindex="-1"><a class="header-anchor" href="#多用组合少用继承" aria-hidden="true">#</a> 多用组合少用继承</h2>
<p>在面向对象编程中，有一条非常经典的设计原则，那就是：组合优于继承，多用组合少用继承。为什么不推荐使用继承？组合相比继承有哪些优势？如何判断该用组合还是继承？今天，我们就围绕着这三个问题，来详细讲解一下这条设计原则。</p>
<h3 id="为什么不推荐使用继承" tabindex="-1"><a class="header-anchor" href="#为什么不推荐使用继承" aria-hidden="true">#</a> 为什么不推荐使用继承</h3>
<p>继承是面向对象的四大特性之一，用来表示类之间的 is-a 关系，可以解决代码复用的问题。虽然继承有诸多作用，但继承层次过深、过复杂，也会影响到代码的可维护性。所以，对于是否应该在项目中使用继承，网上有很多争议。很多人觉得继承是一种反模式，应该尽量少用，甚至不用。为什么会有这样的争议？我们通过一个例子来解释一下。</p>
<p>假设我们要设计一个关于鸟的类。我们将「鸟类」这样一个抽象的事物概念，定义为一个抽象类 AbstractBird。所有更细分的鸟，比如麻雀、鸽子、乌鸦等，都继承这个抽象类。</p>
<p>我们知道，大部分鸟都会飞，那我们可不可以在 <code v-pre>AbstractBird</code> 抽象类中，定义一个 <code v-pre>fly()</code> 方法呢？答案是否定的。尽管大部分鸟都会飞，但也有特例，比如鸵鸟就不会飞。鸵鸟继承具有 <code v-pre>fly()</code> 方法的父类，那鸵鸟就具有「飞」这样的行为，这显然不符合我们对现实世界中事物的认识。当然，你可能会说，我在鸵鸟这个子类中重写（override）<code v-pre>fly()</code> 方法，让它抛出 <code v-pre>UnSupportedMethodException</code> 异常不就可以了吗？具体的代码实现如下所示：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AbstractBird</span> <span class="token punctuation">{</span>
  <span class="token comment">// ... 省略其他属性和方法 ...</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// ... }</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Ostrich</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractBird</span> <span class="token punctuation">{</span> <span class="token comment">// 鸵鸟</span>
  <span class="token comment">// ... 省略其他属性和方法 ...</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnSupportedMethodException</span><span class="token punctuation">(</span><span class="token string">"I can't fly.'"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种设计思路虽然可以解决问题，但不够优美。因为除了鸵鸟之外，不会飞的鸟还有很多，比如企鹅。对于这些不会飞的鸟来说，我们都需要重写 <code v-pre>fly()</code> 方法，抛出异常。这样的设计，一方面，徒增了编码的工作量；另一方面，也违背了我们之后要讲的最小知识原则（Least Knowledge Principle，也叫最少知识原则或者迪米特法则），暴露不该暴露的接口给外部，增加了类使用过程中被误用的概率。</p>
<p>你可能又会说，那我们再通过 <code v-pre>AbstractBird</code> 类派生出两个更加细分的抽象类：会飞的鸟类 <code v-pre>AbstractFlyableBird</code> 和不会飞的鸟类 <code v-pre>AbstractUnFlyableBird</code>，让麻雀、乌鸦这些会飞的鸟都继承 <code v-pre>AbstractFlyableBird</code>，让鸵鸟、企鹅这些不会飞的鸟，都继承 <code v-pre>AbstractUnFlyableBird</code> 类，不就可以了吗？</p>
<p>在刚刚这个场景中，我们只关注「鸟会不会飞」，但如果我们还关注「鸟会不会叫」，那这个时候，我们又该如何设计类之间的继承关系呢？</p>
<ul>
<li>是否会飞？是否会叫？两个行为搭配起来会产生四种情况：会飞会叫、不会飞会叫、会飞不会叫、不会飞不会叫。如果我们继续沿用刚才的设计思路，那就需要再定义四个抽象类（AbstractFlyableTweetableBird、AbstractFlyableUnTweetableBird、AbstractUnFlyableTweetableBird、AbstractUnFlyableUnTweetableBird）。</li>
</ul>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220327010121.png" alt="0002" loading="lazy"></p>
<p>如果我们还需要考虑「是否会下蛋」这样一个行为，那估计就要组合爆炸了。类的继承层次会越来越深、继承关系会越来越复杂。而这种层次很深、很复杂的继承关系，一方面，会导致代码的可读性变差。因为我们要搞清楚某个类具有哪些方法、属性，必须阅读父类的代码、父类的父类的代码……一直追溯到最顶层父类的代码。另一方面，这也破坏了类的封装特性，将父类的实现细节暴露给了子类。子类的实现依赖父类的实现，两者高度耦合，一旦父类代码修改，就会影响所有子类的逻辑。</p>
<p>总之，继承最大的问题就在于：继承层次过深、继承关系过于复杂会影响到代码的可读性和可维护性。这也是为什么我们不推荐使用继承。那刚刚例子中继承存在的问题，我们又该如何来解决呢？你可以先自己思考一下，再听我下面的讲解。</p>
<h3 id="组合相比继承有哪些优势" tabindex="-1"><a class="header-anchor" href="#组合相比继承有哪些优势" aria-hidden="true">#</a> 组合相比继承有哪些优势</h3>
<p>实际上，我们可以利用组合（composition）、接口、委托（delegation）三个技术手段，一块儿来解决刚刚继承存在的问题。</p>
<p>接口表示具有某种行为特性。针对「会飞」这样一个行为特性，我们可以定义一个 Flyable 接口，只让会飞的鸟去实现这个接口。对于会叫、会下蛋这些行为特性，我们可以类似地定义 Tweetable 接口、EggLayable 接口。我们将这个设计思路翻译成 Java 代码的话，就是下面这个样子：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Flyable</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Tweetable</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">tweet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">EggLayable</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">layEgg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Ostrich</span> <span class="token keyword">implements</span> <span class="token class-name">Tweetable</span><span class="token punctuation">,</span> <span class="token class-name">EggLayable</span> <span class="token punctuation">{</span><span class="token comment">//鸵鸟</span>
    <span class="token comment">// ... 省略其他属性和方法...</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">tweet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// ... }</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">layEgg</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// ... }</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Sparrow</span> impelents <span class="token class-name">Flyable</span><span class="token punctuation">,</span> <span class="token class-name">Tweetable</span><span class="token punctuation">,</span> <span class="token class-name">EggLayable</span> <span class="token punctuation">{</span><span class="token comment">//麻雀</span>
            <span class="token comment">// ... 省略其他属性和方法 ...</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// ... }</span>
                <span class="token annotation punctuation">@Override</span>
                <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">tweet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// ... }</span>
                    <span class="token annotation punctuation">@Override</span>
                    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">layEgg</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// ... }</span>
                    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过，我们知道，接口只声明方法，不定义实现。也就是说，每个会下蛋的鸟都要实现一遍 <code v-pre>layEgg()</code> 方法，并且实现逻辑是一样的，这就会导致代码重复的问题。那这个问题又该如何解决呢？</p>
<p>我们可以针对三个接口再定义三个实现类，它们分别是：实现了 <code v-pre>fly()</code> 方法的 FlyAbility 类、实现了 <code v-pre>tweet()</code> 方法的 TweetAbility 类、实现了 <code v-pre>layEgg()</code> 方法的 EggLayAbility 类。然后，通过组合和委托技术来消除代码重复。具体的代码实现如下所示：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Flyable</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span>；
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FlyAbility</span> <span class="token keyword">implements</span> <span class="token class-name">Flyable</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">//... }</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 省略 Tweetable/TweetAbility/EggLayable/EggLayAbility</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Ostrich</span> <span class="token keyword">implements</span> <span class="token class-name">Tweetable</span><span class="token punctuation">,</span> <span class="token class-name">EggLayable</span> <span class="token punctuation">{</span> <span class="token comment">// 鸵鸟</span>
        <span class="token keyword">private</span> <span class="token class-name">TweetAbility</span> tweetAbility <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TweetAbility</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 组合</span>
        <span class="token keyword">private</span> <span class="token class-name">EggLayAbility</span> eggLayAbility <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EggLayAbility</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 组合</span>
        <span class="token comment">// ... 省略其他属性和方法 ...</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">tweet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            tweetAbility<span class="token punctuation">.</span><span class="token function">tweet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 委托</span>
        <span class="token punctuation">}</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">layEgg</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            eggLayAbility<span class="token punctuation">.</span><span class="token function">layEgg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 委托</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们知道继承主要有三个作用：表示 is-a 关系，支持多态特性，代码复用。而这三个作用都可以通过其他技术手段来达成。比如 is-a 关系，我们可以通过组合和接口的 has-a 关系来替代；多态特性我们可以利用接口来实现；代码复用我们可以通过组合和委托来实现。所以，从理论上讲，通过组合、接口、委托三个技术手段，我们完全可以替换掉继承，在项目中不用或者少用继承关系，特别是一些复杂的继承关系。</p>
<h3 id="如何判断该用组合还是继承" tabindex="-1"><a class="header-anchor" href="#如何判断该用组合还是继承" aria-hidden="true">#</a> 如何判断该用组合还是继承</h3>
<ol>
<li>
<p>尽管我们鼓励多用组合少用继承，但组合也并不是完美的，继承也并非一无是处。从上面的例子来看，继承改写成组合意味着要做更细粒度的类的拆分。这也就意味着，我们要定义更多的类和接口。类和接口的增多也就或多或少地增加代码的复杂程度和维护成本。所以，在实际的项目开发中，我们还是要根据具体的情况，来具体选择该用继承还是组合</p>
</li>
<li>
<p>如果类之间的继承结构稳定（不会轻易改变），继承层次比较浅（比如，最多有两层继承关系），继承关系不复杂，我们就可以大胆地使用继承。反之，系统越不稳定，继承层次很深，继承关系复杂，我们就尽量使用组合来替代继承</p>
</li>
<li>
<p>除此之外，还有一些设计模式会固定使用继承或者组合。比如，装饰者模式（decorator pattern）、策略模式（strategy pattern）、组合模式（composite pattern）等都使用了组合关系，而模板模式（template pattern）使用了继承关系</p>
</li>
<li>
<p>前面我们讲到继承可以实现代码复用。利用继承特性，我们把相同的属性和方法，抽取出来，定义到父类中。子类复用父类中的属性和方法，达到代码复用的目的。但是，有的时候，从业务含义上，A 类和 B 类并不一定具有继承关系。比如，Crawler 类和 PageAnalyzer 类，它们都用到了 URL 拼接和分割的功能，但并不具有继承关系（既不是父子关系，也不是兄弟关系）。仅仅为了代码复用，生硬地抽象出一个父类出来，会影响到代码的可读性。如果不熟悉背后设计思路的同事，发现 Crawler 类和 PageAnalyzer 类继承同一个父类，而父类中定义的却只是 URL 相关的操作，会觉得这个代码写得莫名其妙，理解不了。这个时候，使用组合就更加合理、更加灵活。具体的代码实现如下所示：</p>
</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Url</span> <span class="token punctuation">{</span>
    <span class="token comment">// ... 省略属性和方法</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Crawler</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Url</span> url<span class="token punctuation">;</span> <span class="token comment">// 组合</span>
    <span class="token keyword">public</span> <span class="token class-name">Crawler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>url <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Url</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PageAnalyzer</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Url</span> url<span class="token punctuation">;</span> <span class="token comment">// 组合</span>
    <span class="token keyword">public</span> <span class="token class-name">PageAnalyzer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>url <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Url</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有一些特殊的场景要求我们必须使用继承。如果你不能改变一个函数的入参类型，而入参又非接口，为了支持多态，只能采用继承来实现。比如下面这样一段代码，其中 FeignClient 是一个外部类，我们没有权限去修改这部分代码，但是我们希望能重写这个类在运行时执行的 <code v-pre>encode()</code> 函数。这个时候，我们只能采用继承来实现了。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignClient</span> <span class="token punctuation">{</span> <span class="token comment">// Feign Client 框架代码</span>
    <span class="token comment">// ... 省略其他代码 ...</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">encode</span><span class="token punctuation">(</span><span class="token class-name">String</span> url<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// ... }</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">demofunction</span><span class="token punctuation">(</span><span class="token class-name">FeignClient</span> feignClient<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        feignClient<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomizedFeignClient</span> <span class="token keyword">extends</span> <span class="token class-name">FeignClient</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">encode</span><span class="token punctuation">(</span><span class="token class-name">String</span> url<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// ... 重写 encode 的实现 ...}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 调用</span>
        <span class="token class-name">FeignClient</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CustomizedFeignClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">demofunction</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管有些人说，要杜绝继承，100% 用组合代替继承，但是我的观点没那么极端！之所以「多用组合少用继承」这个口号喊得这么响，只是因为，长期以来，我们过度使用继承。还是那句话，组合并不完美，继承也不是一无是处。只要我们控制好它们的副作用、发挥它们各自的优势，在不同的场合下，恰当地选择使用继承还是组合，这才是我们所追求的境界。</p>
<h2 id="通过封装、抽象、模块化、中间层等解耦代码" tabindex="-1"><a class="header-anchor" href="#通过封装、抽象、模块化、中间层等解耦代码" aria-hidden="true">#</a> 通过封装、抽象、模块化、中间层等解耦代码</h2>
<h3 id="解耦为何如此重要" tabindex="-1"><a class="header-anchor" href="#解耦为何如此重要" aria-hidden="true">#</a> 解耦为何如此重要</h3>
<ol>
<li>
<p>软件设计与开发最重要的工作之一就是应对复杂性。人处理复杂性的能力是有限的。过于复杂的代码往往在可读性、可维护性上都不友好。那如何来控制代码的复杂性呢？手段有很多，我个人认为，最关键的就是解耦，保证代码松耦合、高内聚。如果说重构是保证代码质量不至于腐化到无可救药地步的有效手段，那么利用解耦的方法对代码重构，就是保证代码不至于复杂到无法控制的有效手段</p>
</li>
<li>
<p>后文迪米特法则有介绍，什么是「高内聚、松耦合」。实际上，「高内聚、松耦合」是一个比较通用的设计思想，不仅可以指导细粒度的类和类之间关系的设计，还能指导粗粒度的系统、架构、模块的设计。相对于编码规范，它能够在更高层次上提高代码的可读性和可维护性</p>
</li>
<li>
<p>不管是阅读代码还是修改代码，「高内聚、松耦合」的特性可以让我们聚焦在某一模块或类中，不需要了解太多其他模块或类的代码，让我们的焦点不至于过于发散，降低了阅读和修改代码的难度。而且，因为依赖关系简单，耦合小，修改代码不至于牵一发而动全身，代码改动比较集中，引入 bug 的风险也就减少了很多。同时，「高内聚、松耦合」的代码可测试性也更加好，容易 mock 或者很少需要 mock 外部依赖的模块或者类</p>
</li>
<li>
<p>除此之外，代码「高内聚、松耦合」，也就意味着，代码结构清晰、分层和模块化合理、依赖关系简单、模块或类之间的耦合小，那代码整体的质量就不会差。即便某个具体的类或者模块设计得不怎么合理，代码质量不怎么高，影响的范围是非常有限的。我们可以聚焦于这个模块或者类，做相应的小型重构。而相对于代码结构的调整，这种改动范围比较集中的小型重构的难度就容易多了</p>
</li>
</ol>
<h3 id="代码是否需要解耦" tabindex="-1"><a class="header-anchor" href="#代码是否需要解耦" aria-hidden="true">#</a> 代码是否需要解耦</h3>
<ol>
<li>
<p>那现在问题来了，我们该怎么判断代码的耦合程度呢？或者说，怎么判断代码是否符合 <strong>高内聚、松耦合</strong> 呢？再或者说，如何判断系统是否需要解耦重构呢</p>
</li>
<li>
<p>间接的衡量标准有很多，前面我们讲到了一些，比如，看修改代码会不会牵一发而动全身。除此之外，还有一个直接的衡量标准，也是我在阅读源码的时候经常会用到的，那就是把模块与模块之间、类与类之间的依赖关系画出来，根据依赖关系图的复杂性来判断是否需要解耦重构</p>
</li>
<li>
<p>如果依赖关系复杂、混乱，那从代码结构上来讲，可读性和可维护性肯定不是太好，那我们就需要考虑是否可以通过解耦的方法，让依赖关系变得清晰、简单。当然，这种判断还是有比较强的主观色彩，但是可以作为一种参考和梳理依赖的手段，配合间接的衡量标准一块来使用</p>
</li>
</ol>
<h3 id="如何给代码解耦" tabindex="-1"><a class="header-anchor" href="#如何给代码解耦" aria-hidden="true">#</a> 如何给代码解耦</h3>
<blockquote>
<p>封装与抽象</p>
</blockquote>
<p>封装和抽象作为两个非常通用的设计思想，可以应用在很多设计场景中，比如系统、模块、lib、组件、接口、类等等的设计。封装和抽象可以有效地隐藏实现的复杂性，隔离实现的易变性，给依赖的模块提供稳定且易用的抽象接口。</p>
<blockquote>
<p>中间层</p>
</blockquote>
<p>引入中间层能简化模块或类之间的依赖关系。下面这张图是引入中间层前后的依赖关系对比图。在引入数据存储中间层之前，A、B、C 三个模块都要依赖内存一级缓存、Redis 二级缓存、DB 持久化存储三个模块。在引入中间层之后，三个模块只需要依赖数据存储一个模块即可。从图上可以看出，中间层的引入明显地简化了依赖关系，让代码结构更加清晰。</p>
<p><img src="https://unpkg.zhimg.com/youthlql@1.0.0/design_patterns/design_ideas/0003.png" alt="" loading="lazy"></p>
<p>除此之外，我们在进行重构的时候，引入中间层可以起到过渡的作用，能够让开发和重构同步进行，不互相干扰。比如，某个接口设计得有问题，我们需要修改它的定义，同时，所有调用这个接口的代码都要做相应的改动。如果新开发的代码也用到这个接口，那开发就跟重构冲突了。为了让重构能小步快跑，我们可以分下面四个阶段来完成接口的修改。</p>
<ul>
<li>第一阶段：引入一个中间层，包裹老的接口，提供新的接口定义</li>
<li>第二阶段：新开发的代码依赖中间层提供的新接口</li>
<li>第三阶段：将依赖老接口的代码改为调用新接口</li>
<li>第四阶段：确保所有的代码都调用新接口之后，删除掉老的接口</li>
</ul>
<p>这样，每个阶段的开发工作量都不会很大，都可以在很短的时间内完成。重构跟开发冲突的概率也变小了。</p>
<blockquote>
<p>模块化</p>
</blockquote>
<p>模块化是构建复杂系统常用的手段。不仅在软件行业，在建筑、机械制造等行业，这个手段也非常有用。对于一个大型复杂系统来说，没有人能掌控所有的细节。之所以我们能搭建出如此复杂的系统，并且能维护得了，最主要的原因就是将系统划分成各个独立的模块，让不同的人负责不同的模块，这样即便在不了解全部细节的情况下，管理者也能协调各个模块，让整个系统有效运转。</p>
<blockquote>
<p>其他设计思想和原则</p>
</blockquote>
<p><strong>高内聚、松耦合</strong> 是一个非常重要的设计思想，能够有效提高代码的可读性和可维护性，缩小功能改动导致的代码改动范围。实际上，我们已经多次听到过这个设计思想。很多设计原则都以实现代码的 <strong>高内聚、松耦合</strong> 为目的。我们来一块简单了解都有哪些原则。</p>
<ul>
<li>单一职责原则</li>
</ul>
<p>我们前面提到，内聚性和耦合性并非独立的。高内聚会让代码更加松耦合，而实现高内聚的重要指导原则就是单一职责原则。模块或者类的职责设计得单一，而不是大而全，那依赖它的类和它依赖的类就会比较少，代码耦合也就相应的降低了。</p>
<ul>
<li>基于接口而非实现编程</li>
</ul>
<p>基于接口而非实现编程能通过接口这样一个中间层，隔离变化和具体的实现。这样做的好处是，在有依赖关系的两个模块或类之间，一个模块或者类的改动，不会影响到另一个模块或类。实际上，这就相当于将一种强依赖关系（强耦合）解耦为了弱依赖关系（弱耦合）。依赖注入。</p>
<ul>
<li>依赖注入</li>
</ul>
<p>跟基于接口而非实现编程思想类似，依赖注入也是将代码之间的强耦合变为弱耦合。尽管依赖注入无法将本应该有依赖关系的两个类，解耦为没有依赖关系，但可以让耦合关系没那么紧密，容易做到插拔替换。</p>
<ul>
<li>多用组合少用继承</li>
</ul>
<p>我们知道，继承是一种强依赖关系，父类与子类高度耦合，且这种耦合关系非常脆弱，牵一发而动全身，父类的每一次改动都会影响所有的子类。相反，组合关系是一种弱依赖关系，这种关系更加灵活，所以，对于继承结构比较复杂的代码，利用组合来替换继承，也是一种解耦的有效手段。</p>
<ul>
<li>迪米特法则</li>
</ul>
<p>迪米特法则讲的是，不该有直接依赖关系的类之间，不要有依赖；有依赖关系的类之间，尽量只依赖必要的接口。从定义上，我们明显可以看出，这条原则的目的就是为了实现代码的松耦合。除了上面讲到的这些设计思想和原则之外，还有一些设计模式也是为了解耦依赖，比如观察者模式，有关这一部分的内容，我们留在设计模式模块中慢慢讲解。</p>
<p><strong>下一章会继续讲解七大设计原则。</strong></p>
<h2 id="代码复用" tabindex="-1"><a class="header-anchor" href="#代码复用" aria-hidden="true">#</a> 代码复用</h2>
<p>无论是开发哪种软件产品，成本和时间都是最重要的。较少的开发时间意味着可以比竞争对手更早进入市场。较低的开发成本意味着能够留出更多的营销资金，覆盖更广泛的潜在客户。</p>
<p>其中，代码复用是减少开发成本最常用的方式之一，其目的非常明显，即：与其反复从头开发，不如在新对象中重用已有的代码。</p>
<p>这个想法表面看起来很棒，但实际上要让已有的代码在全新的代码中工作，还是需要付出额外努力的。组件间紧密的耦合、对具体类而非接口的依赖和硬编码的行为都会降低代码的灵活性，使得复用这些代码变得更加困难。</p>
<p>使用设计模式是增加软件组件灵活性并使其易于复用的方式之一。但是，这可能也会让组件变得更加复杂。</p>
<p>一般情况下，复用可以分为三个层次。在最底层，可以复用类、类库、容器，也许还有一些类的「团体（例如容器和迭代器）」。</p>
<p>框架位于最高层。它们能帮助你精简自己的设计，可以明确解决问题所需的抽象概念，然后用类来表示这些概念并定义其关系。例如，JUnit 是一个小型框架，也是框架的 <code v-pre>Hello, world</code>，其中定义了 Test、TestCase 和 TestSuite 这几个类及其关系。框架通常比单个类的颗粒度要大。你可以通过在某处构建子类来与框架建立联系。这些子类信奉「别给我们打电话，我们会给你打电话的。」</p>
<p>还有一个中间层次。这是我觉得设计模式所处的位置。设计模式比框架更小且更抽象。它们实际上是对一组类的关系及其互动方式的描述。当你从类转向模式，并最终到达框架的过程中，复用程度会不断增加。</p>
<p>中间层次的优点在于模式提供的复用方式要比框架的风险小。创建框架是一项投入重大且风险很高的工作，模式则能让你独立于具体代码来复用设计思想和理念。</p>
<h2 id="扩展性" tabindex="-1"><a class="header-anchor" href="#扩展性" aria-hidden="true">#</a> 扩展性</h2>
<p>需求变化是程序员生命中唯一不变的事情。比如以下几种场景：</p>
<ul>
<li>你在 Windows 平台上发布了一款游戏，现在人们想要 Mac OS 的版本</li>
<li>你创建了一个使用方形按钮的 GUI 框架，但几个月后开始流行原型按钮</li>
<li>你设计了一款优秀的电子商务网站，但仅仅几个月后，客户就要求新增电话订单的功能</li>
</ul>
<p>每个软件开发者都经历过许多相似的故事，导致它们发生的原因也不少。</p>
<p>首先，在完成了第一版的程序后，我们就应该做好了从头开始优化重写代码的准备，因为现在你已经能在很多方面更好的理解问题了，同时在专业水平上也有所提高，所以之前的代码现在看上去可能会显得很糟糕。</p>
<p>其次，可能是在你掌控之外的某些事情发生了变化，这也是导致许多开发团队转变最初想法的原因。比如，每位在网络应用中使用 Flash 的开发者都必须重新开发或移植代码，因为不断地有浏览器停止对 Flash 格式地支持。</p>
<p>最后，可能是需求的改变，之前你的客户对当前版本的程序感到满意，但是现在希望对程序进行 11 个「小小」的改动，使其可完成原始计划阶段中完全没有提到的功能，新增或改变功能。</p>
<p>当然这也有好的一面，如果有人要求你对程序进行修改，至少说明还有人关心它。因此在设计程序架构时，有经验的开发者都会尽量选择支持未来任何可能变更的方式。</p>
<h2 id="设计模式七大原则" tabindex="-1"><a class="header-anchor" href="#设计模式七大原则" aria-hidden="true">#</a> 设计模式七大原则</h2>
<p>设计模式原则，其实就是程序员在编程时，应当遵守的原则，也是各种设计模式的基础（即：设计模式为什么 这样设计的依据）。</p>
<p>设计模式常用的七大原则有：</p>
<ul>
<li>单一职责原则</li>
<li>接口隔离原则</li>
<li>依赖倒转（倒置）原则</li>
<li>里氏替换原则</li>
<li>开闭原则</li>
<li>迪米特法则</li>
<li>合成复用原则</li>
</ul>
<h2 id="单一职责原则-srp" tabindex="-1"><a class="header-anchor" href="#单一职责原则-srp" aria-hidden="true">#</a> 单一职责原则（SRP）</h2>
<h3 id="基本介绍" tabindex="-1"><a class="header-anchor" href="#基本介绍" aria-hidden="true">#</a> 基本介绍</h3>
<p><strong>单一职责原则</strong>（Single Responsibility Principle，SRP）又称单一功能原则，由罗伯特·C.马丁（Robert C. Martin）于《敏捷软件开发：原则、模式和实践》一书中提出的。这里的职责是指类变化的原因，单一职责原则规定一个类应该有且仅有一个引起它变化的原因，否则类应该被拆分（There should never be more than one reason for a class to change）。</p>
<p>对类来说的，即一个类应该只负责一项职责。如类 A 负责两个不同职责：职责 1，职责 2。当职责 1 需求变更而改变 A 时，可能造成职责 2 执行错误，所以需要将类 A 的粒度分解为 A1，A2。</p>
<ul>
<li>就像一个 DAO 类负责一个表的增删改查，不能出现其他表的增删改查。</li>
</ul>
<p>该原则提出对象不应该承担太多职责，如果一个对象承担了太多的职责，至少存在以下两个缺点：</p>
<ul>
<li>
<p>一个职责的变化可能会削弱或者抑制这个类实现其他职责的能力</p>
</li>
<li>
<p>当客户端需要该对象的某一个职责时，不得不将其他不需要的职责全都包含进来，从而造成冗余代码或代码的浪费</p>
</li>
</ul>
<h3 id="单一职责原则的优点" tabindex="-1"><a class="header-anchor" href="#单一职责原则的优点" aria-hidden="true">#</a> 单一职责原则的优点</h3>
<p>单一职责原则的核心就是控制类的粒度大小、将对象解耦、提高其内聚性。如果遵循单一职责原则将有以下优点：</p>
<ul>
<li>降低类的复杂度。一个类只负责一项职责，其逻辑肯定要比负责多项职责简单得多</li>
<li>提高类的可读性。复杂性降低，自然其可读性会提高</li>
<li>提高系统的可维护性。可读性提高，那自然更容易维护了</li>
<li>变更引起的风险降低。变更是必然的，如果单一职责原则遵守得好，当修改一个功能时，可以显著降低对其他功能的影响</li>
</ul>
<h3 id="应用实例" tabindex="-1"><a class="header-anchor" href="#应用实例" aria-hidden="true">#</a> 应用实例</h3>
<p><strong>代码示例 1</strong></p>
<p>下方代码 <strong>违反了单一职责原则</strong>，run 方法不能既负责摩托车、汽车（陆地），又负责飞机（飞机）。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SingleResponsibility1</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Vehicle</span> vehicle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vehicle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        vehicle<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token string">"摩托车"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        vehicle<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token string">"汽车"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        vehicle<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token string">"飞机"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">String</span> vehicle<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>vehicle <span class="token operator">+</span> <span class="token string">" 在公路上运行...."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改进：我们要根据交通工具运行方法不同，分解成不同类即可，看代码示例 2。</p>
<p><strong>代码示例 2</strong></p>
<p>下面代码虽然遵守单一职责原则，但是这样做的改动很大，即将 <strong>类分解</strong> 成三个，同时修改和新增 main 方法的对象。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SingleResponsibility2</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RoadVehicle</span> roadVehicle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RoadVehicle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        roadVehicle<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token string">"摩托车"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        roadVehicle<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token string">"汽车"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">AirVehicle</span> airVehicle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AirVehicle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        airVehicle<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token string">"飞机"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">RoadVehicle</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">String</span> vehicle<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>vehicle <span class="token operator">+</span> <span class="token string">"公路运行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">AirVehicle</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">String</span> vehicle<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>vehicle <span class="token operator">+</span> <span class="token string">"天空运行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">WaterVehicle</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">String</span> vehicle<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>vehicle <span class="token operator">+</span> <span class="token string">"水中运行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改进：直接修改 Vehicle 类，改动的代码会比较少。</p>
<p><strong>代码示例 3</strong></p>
<p>下面代码的修改方法没有对原来的类做大的修改，只是增加方法。</p>
<p>这里虽然没有在类这个级别上遵守单一职责原则，但是在方法级别上，仍然是遵守单一职责。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SingleResponsibility3</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Vehicle2</span> vehicle2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vehicle2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        vehicle2<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token string">"汽车"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        vehicle2<span class="token punctuation">.</span><span class="token function">runWater</span><span class="token punctuation">(</span><span class="token string">"轮船"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        vehicle2<span class="token punctuation">.</span><span class="token function">runAir</span><span class="token punctuation">(</span><span class="token string">"飞机"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Vehicle2</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">String</span> vehicle<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 处理</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>vehicle <span class="token operator">+</span> <span class="token string">" 在公路上运行...."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">runAir</span><span class="token punctuation">(</span><span class="token class-name">String</span> vehicle<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>vehicle <span class="token operator">+</span> <span class="token string">" 在天空上运行...."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">runWater</span><span class="token punctuation">(</span><span class="token class-name">String</span> vehicle<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>vehicle <span class="token operator">+</span> <span class="token string">" 在水中行...."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="单一职责原则注意事项和细节" tabindex="-1"><a class="header-anchor" href="#单一职责原则注意事项和细节" aria-hidden="true">#</a> 单一职责原则注意事项和细节</h3>
<ul>
<li>降低类的复杂度，一个类只负责一项职责</li>
<li>提高类的可读性，可维护性</li>
<li>降低变更引起的风险</li>
<li>通常情况下，我们应当遵守单一职责原则，只有逻辑足够简单，才可以在代码级违反单一职责原则；只有类中方法数量足够少，可以在方法级别保持单一职责原则</li>
</ul>
<h2 id="接口隔离原则-isp" tabindex="-1"><a class="header-anchor" href="#接口隔离原则-isp" aria-hidden="true">#</a> 接口隔离原则（ISP）</h2>
<h3 id="基本介绍-1" tabindex="-1"><a class="header-anchor" href="#基本介绍-1" aria-hidden="true">#</a> 基本介绍</h3>
<p><strong>接口隔离原则</strong>（Interface Segregation Principle）：客户端不应该依赖它不需要的接口，即 <strong>一个类对另一个类的依赖应该建立在最小的接口上</strong>。</p>
<p>最小接口指：接口里的方法不应该囤积许多类需要的不同方法，尽量保证一个接口只能由一个或多个类共同使用的方法。</p>
<p>先看一张图（违反接口隔离原则）：</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220224195736.png" alt="image-20220224195635097" loading="lazy"></p>
<p>类 A 通过接口 Interface1 依赖类 B，类 C 通过接口 Interface1 依赖类 D，如果接口 Interface1 对于类 A 和类 C 来说不是最小接口，那么类 B 和类 D 必须去实现他们不需要的方法。</p>
<p>按隔离原则应当这样处理：将接口 Interface1 拆分为独立的几个接口（这里我们拆分成 3 个接口），类 A 和类 C 分别与他们需要的接口建立依赖关系。也就是采用接口隔离原则。</p>
<p>接口隔离原则和单一职责都是为了提高类的内聚性、降低它们之间的耦合性，体现了封装的思想，但两者是不同的：</p>
<ul>
<li>单一职责原则注重的是职责，而接口隔离原则注重的是对接口依赖的隔离</li>
<li>单一职责原则主要是约束类，它针对的是程序中的实现和细节；接口隔离原则主要约束接口，主要针对抽象和程序整体框架的构建</li>
</ul>
<h3 id="接口隔离原则的优点" tabindex="-1"><a class="header-anchor" href="#接口隔离原则的优点" aria-hidden="true">#</a> 接口隔离原则的优点</h3>
<p>接口隔离原则是为了约束接口、降低类对接口的依赖性，遵循接口隔离原则有以下 5 个优点：</p>
<ul>
<li>
<p>将臃肿庞大的接口分解为多个粒度小的接口，可以预防外来变更的扩散，提高系统的灵活性和可维护性</p>
</li>
<li>
<p>接口隔离提高了系统的内聚性，减少了对外交互，降低了系统的耦合性</p>
</li>
<li>
<p>如果接口的粒度大小定义合理，能够保证系统的稳定性；但是，如果定义过小，则会造成接口数量过多，使设计复杂化；如果定义太大，灵活性降低，无法提供定制服务，给整体项目带来无法预料的风险</p>
</li>
<li>
<p>使用多个专门的接口还能够体现对象的层次，因为可以通过接口的继承，实现对总接口的定义</p>
</li>
<li>
<p>能减少项目工程中的代码冗余。过大的大接口里面通常放置许多不用的方法，当实现这个接口的时候，被迫设计冗余的代码</p>
</li>
</ul>
<h3 id="应用实例-1" tabindex="-1"><a class="header-anchor" href="#应用实例-1" aria-hidden="true">#</a> 应用实例</h3>
<p>类 A 通过接口 Interface1 依赖类 B，类 C 通过接口 Interface1 依赖类 D，编写代码的应用实例。</p>
<p><strong>没有使用接口隔离原则代码</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Segregation1</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 接口</span>
<span class="token keyword">interface</span> <span class="token class-name">Interface1</span> <span class="token punctuation">{</span>
	<span class="token keyword">void</span> <span class="token function">operation1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token function">operation2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token function">operation3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token function">operation4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token function">operation5</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">implements</span> <span class="token class-name">Interface1</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"B 实现了 operation1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"B 实现了 operation2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"B 实现了 operation3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"B 实现了 operation4"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation5</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"B 实现了 operation5"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">D</span> <span class="token keyword">implements</span> <span class="token class-name">Interface1</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"D 实现了 operation1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"D 实现了 operation2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"D 实现了 operation3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"D 实现了 operation4"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation5</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"D 实现了 operation5"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span> <span class="token comment">// A 类通过接口 Interface1 依赖(使用) B 类，但是只会用到 1,2,3 方法</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">depend1</span><span class="token punctuation">(</span><span class="token class-name">Interface1</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		i<span class="token punctuation">.</span><span class="token function">operation1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">depend2</span><span class="token punctuation">(</span><span class="token class-name">Interface1</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		i<span class="token punctuation">.</span><span class="token function">operation2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">depend3</span><span class="token punctuation">(</span><span class="token class-name">Interface1</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		i<span class="token punctuation">.</span><span class="token function">operation3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
  
<span class="token keyword">class</span> <span class="token class-name">C</span> <span class="token punctuation">{</span> <span class="token comment">// C 类通过接口 Interface1 依赖(使用) D 类，但是只会用到 1,4,5 方法</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">depend1</span><span class="token punctuation">(</span><span class="token class-name">Interface1</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		i<span class="token punctuation">.</span><span class="token function">operation1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">depend4</span><span class="token punctuation">(</span><span class="token class-name">Interface1</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		i<span class="token punctuation">.</span><span class="token function">operation4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">depend5</span><span class="token punctuation">(</span><span class="token class-name">Interface1</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		i<span class="token punctuation">.</span><span class="token function">operation5</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类 A 通过接口 Interface1 依赖类 B，类 C 通过接口 Interface1 依赖类 D，如果接口 Interface1 对于类 A 和类 C 来说不是最小接口，那么类 B 和类 D 必须去实现他们不需要的方法。</p>
<p><strong>使用接口隔离原则代码</strong></p>
<p>将接口 <strong>Interface1 拆分为独立的几个接口</strong>，类 A 和类 C 分别与他们需要的接口建立依赖关系。也就是采用接口隔离原则。</p>
<p>接口 Interface1 中出现的方法，根据实际情况拆分为三个接口。</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220224200507.png" alt="image-20220224200505149" loading="lazy"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Segregation1</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 使用一把</span>
        <span class="token class-name">A</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        a<span class="token punctuation">.</span><span class="token function">depend1</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// A 类通过接口去依赖 B 类</span>
        a<span class="token punctuation">.</span><span class="token function">depend2</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        a<span class="token punctuation">.</span><span class="token function">depend3</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">C</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        c<span class="token punctuation">.</span><span class="token function">depend1</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">D</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// C 类通过接口去依赖(使用) D 类</span>
        c<span class="token punctuation">.</span><span class="token function">depend4</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">D</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        c<span class="token punctuation">.</span><span class="token function">depend5</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">D</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 接口 1</span>
<span class="token keyword">interface</span> <span class="token class-name">Interface1</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">operation1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 接口 2</span>
<span class="token keyword">interface</span> <span class="token class-name">Interface2</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">operation2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">operation3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 接口 3</span>
<span class="token keyword">interface</span> <span class="token class-name">Interface3</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">operation4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">operation5</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">implements</span> <span class="token class-name">Interface1</span><span class="token punctuation">,</span> <span class="token class-name">Interface2</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"B 实现了 operation1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"B 实现了 operation2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"B 实现了 operation3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">D</span> <span class="token keyword">implements</span> <span class="token class-name">Interface1</span><span class="token punctuation">,</span> <span class="token class-name">Interface3</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"D 实现了 operation1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"D 实现了 operation4"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operation5</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"D 实现了 operation5"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span> <span class="token comment">// A 类通过接口 Interface1,Interface2 依赖(使用) B类，但是只会用到 1,2,3 方法</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">depend1</span><span class="token punctuation">(</span><span class="token class-name">Interface1</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        i<span class="token punctuation">.</span><span class="token function">operation1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">depend2</span><span class="token punctuation">(</span><span class="token class-name">Interface2</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        i<span class="token punctuation">.</span><span class="token function">operation2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">depend3</span><span class="token punctuation">(</span><span class="token class-name">Interface2</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        i<span class="token punctuation">.</span><span class="token function">operation3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">C</span> <span class="token punctuation">{</span> <span class="token comment">// C 类通过接口 Interface1,Interface3 依赖(使用) D 类，但是只会用到 1,4,5 方法</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">depend1</span><span class="token punctuation">(</span><span class="token class-name">Interface1</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        i<span class="token punctuation">.</span><span class="token function">operation1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">depend4</span><span class="token punctuation">(</span><span class="token class-name">Interface3</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        i<span class="token punctuation">.</span><span class="token function">operation4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">depend5</span><span class="token punctuation">(</span><span class="token class-name">Interface3</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        i<span class="token punctuation">.</span><span class="token function">operation5</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="依赖倒转原则-dip" tabindex="-1"><a class="header-anchor" href="#依赖倒转原则-dip" aria-hidden="true">#</a> 依赖倒转原则（DIP）</h2>
<h3 id="基本介绍-2" tabindex="-1"><a class="header-anchor" href="#基本介绍-2" aria-hidden="true">#</a> 基本介绍</h3>
<p><strong>依赖倒转原则</strong>（Dependence Inversion Principle）是指：</p>
<ul>
<li>
<p>高层模块不应该依赖低层模块，二者都应该依赖其抽象</p>
</li>
<li>
<p><strong>抽象不应该依赖细节，细节应该依赖抽象</strong></p>
</li>
<li>
<p>依赖倒转（倒置）的中心思想是 <strong>面向接口编程</strong></p>
</li>
<li>
<p>依赖倒转原则是基于这样的设计理念：相对于细节的多变性，抽象的东西要稳定的多。以抽象为基础搭建的架构比以细节为基础的架构要稳定的多。在 Java 中，抽象指的是接口或抽象类，细节就是具体的实现类</p>
</li>
<li>
<p>使用 <strong>接口或抽象类</strong> 的目的是制定好 <strong>规范</strong>，而不涉及任何具体的操作，把展现细节的任务交给他们的实现类去完成</p>
</li>
</ul>
<p><strong>类与类之间不建议之间互相引用，而是通过接口来间接引用，这样给接口传入不同的类，就能使用该类的方法。</strong></p>
<h3 id="依赖倒转原则的作用" tabindex="-1"><a class="header-anchor" href="#依赖倒转原则的作用" aria-hidden="true">#</a> 依赖倒转原则的作用</h3>
<p>依赖倒置原则的主要作用如下：</p>
<ul>
<li>依赖倒置原则可以降低类间的耦合性</li>
<li>依赖倒置原则可以提高系统的稳定性</li>
<li>依赖倒置原则可以减少并行开发引起的风险</li>
<li>依赖倒置原则可以提高代码的可读性和可维护性</li>
</ul>
<h3 id="简单应用实例" tabindex="-1"><a class="header-anchor" href="#简单应用实例" aria-hidden="true">#</a> 简单应用实例</h3>
<p>需求：Person 接收消息。</p>
<p><strong>方式一：违反依赖倒转原则</strong></p>
<p>简单，比较容易想到，但是 Person 类的 <code v-pre>receive</code> 方法竟然直接引用 Email 类，导致双方高耦合，彼此无法分离。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DependecyInversion</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        person<span class="token punctuation">.</span><span class="token function">receive</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Email</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Email</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"电子邮件信息: hello,world"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">receive</span><span class="token punctuation">(</span><span class="token class-name">Email</span> email <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>email<span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们获取的对象是 微信，短信等等，则新增类，同时 Perons 也要增加相应的接收方法。</p>
<p>解决思路：引入一个抽象的接口 IReceiver，表示接收者，这样 Person 类与接口 IReceiver 发生依赖，因为 Email，WeiXin 等等属于接收的范围，他们各自实现 IReceiver 接口就好了，这样我们就符合依赖倒转原则。</p>
<p><strong>方式二</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DependecyInversion</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 客户端无需改变</span>
		<span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		person<span class="token punctuation">.</span><span class="token function">receive</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Email</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		person<span class="token punctuation">.</span><span class="token function">receive</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">WeiXin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义接口</span>
<span class="token keyword">interface</span> <span class="token class-name">IReceiver</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Email</span> <span class="token keyword">implements</span> <span class="token class-name">IReceiver</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token string">"电子邮件信息: hello,world"</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 增加微信</span>
<span class="token keyword">class</span> <span class="token class-name">WeiXin</span> <span class="token keyword">implements</span> <span class="token class-name">IReceiver</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token string">"微信信息: hello,ok"</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 方式 2</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
	<span class="token comment">// 这里我们是对接口的依赖</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">receive</span><span class="token punctuation">(</span><span class="token class-name">IReceiver</span> receiver <span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>receiver<span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意 33 行的参数类型，这样只需要传入继承接口的类，就能实现该类的方法，<strong>调用多个类只需要一个接口类</strong>。</p>
<h3 id="依赖关系传递的三种方式和应用案例" tabindex="-1"><a class="header-anchor" href="#依赖关系传递的三种方式和应用案例" aria-hidden="true">#</a> 依赖关系传递的三种方式和应用案例</h3>
<p>上方只是简单介绍依赖倒转原则的基本使用，下面是核心方式使用：</p>
<ul>
<li>接口传递</li>
<li>构造方法传递</li>
<li>setter 方式传递</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DependencyPass</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">Kele</span> kele <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Kele</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">OpenAndClose1</span> openAndClose1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAndClose1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		openAndClose1<span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span>kele<span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token comment">// 通过构造器进行依赖传递</span>
		<span class="token class-name">BingTang</span> bingTang <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BingTang</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">OpenAndClose2</span> openAndClose2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAndClose2</span><span class="token punctuation">(</span>bingTang<span class="token punctuation">)</span><span class="token punctuation">;</span>
		openAndClose2<span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
		<span class="token comment">// 通过 setter 方法进行依赖传递</span>
		<span class="token class-name">XueLi</span> xueLi <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XueLi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">OpenAndClose3</span> openAndClose <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAndClose3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		openAndClose<span class="token punctuation">.</span><span class="token function">setTv</span><span class="token punctuation">(</span>xueLi<span class="token punctuation">)</span><span class="token punctuation">;</span>
		openAndClose<span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 方式 1：通过接口传递实现依赖</span>
<span class="token comment">// 开关的接口</span>
<span class="token keyword">interface</span> <span class="token class-name">IOpenAndClose1</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token keyword">open</span><span class="token punctuation">(</span><span class="token class-name">ITV1</span> tv<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 抽象方法，接收接口</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">ITV1</span> <span class="token punctuation">{</span> <span class="token comment">// ITV 接口</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Kele</span> <span class="token keyword">implements</span> <span class="token class-name">ITV1</span> <span class="token punctuation">{</span>
	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"可乐电视机，打开"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">OpenAndClose1</span> <span class="token keyword">implements</span> <span class="token class-name">IOpenAndClose1</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token keyword">open</span><span class="token punctuation">(</span><span class="token class-name">ITV1</span> tv<span class="token punctuation">)</span><span class="token punctuation">{</span>
		tv<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 方式 2: 通过构造方法依赖传递</span>
<span class="token keyword">interface</span> <span class="token class-name">IOpenAndClose2</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 抽象方法</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">ITV2</span> <span class="token punctuation">{</span> <span class="token comment">// ITV 接口</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">OpenAndClose2</span> <span class="token keyword">implements</span> <span class="token class-name">IOpenAndClose2</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token class-name">ITV2</span> tv<span class="token punctuation">;</span> <span class="token comment">// 成员</span>
	<span class="token keyword">public</span> <span class="token class-name">OpenAndClose2</span><span class="token punctuation">(</span><span class="token class-name">ITV2</span> tv<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">// 构造器</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>tv <span class="token operator">=</span> tv<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>tv<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">BingTang</span> <span class="token keyword">implements</span> <span class="token class-name">ITV2</span> <span class="token punctuation">{</span>
	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"冰糖电视机，打开"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 方式 3，通过 setter 方法传递</span>
<span class="token keyword">interface</span> <span class="token class-name">IOpenAndClose3</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 抽象方法</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setTv</span><span class="token punctuation">(</span><span class="token class-name">ITV3</span> tv<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">ITV3</span> <span class="token punctuation">{</span> <span class="token comment">// ITV接口</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">OpenAndClose3</span> <span class="token keyword">implements</span> <span class="token class-name">IOpenAndClose3</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token class-name">ITV3</span> tv<span class="token punctuation">;</span>
	
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setTv</span><span class="token punctuation">(</span><span class="token class-name">ITV3</span> tv<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>tv <span class="token operator">=</span> tv<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>tv<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">XueLi</span> <span class="token keyword">implements</span> <span class="token class-name">ITV3</span> <span class="token punctuation">{</span>
	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"雪梨电视机，打开"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>可乐电视机，打开
冰糖电视机，打开
雪梨电视机，打开
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="依赖倒转原则的注意事项和细节" tabindex="-1"><a class="header-anchor" href="#依赖倒转原则的注意事项和细节" aria-hidden="true">#</a> 依赖倒转原则的注意事项和细节</h3>
<ul>
<li>低层模块尽量都要有抽象类或接口，或者两者都有，程序稳定性更好</li>
<li>变量的 <strong>声明类型尽量是抽象类或接口</strong>，这样我们的变量引用和实际对象间，就存在 <strong>一个缓冲层</strong>，利于程序扩展和优化</li>
<li>继承时遵循 <strong>里氏替换原则</strong></li>
</ul>
<h2 id="里氏替换原则-lsp" tabindex="-1"><a class="header-anchor" href="#里氏替换原则-lsp" aria-hidden="true">#</a> 里氏替换原则（LSP）</h2>
<h3 id="oo-中的继承性的思考和说明" tabindex="-1"><a class="header-anchor" href="#oo-中的继承性的思考和说明" aria-hidden="true">#</a> OO 中的继承性的思考和说明</h3>
<p>继承包含这样一层含义：父类中凡是已经实现好的方法，实际上是在设定规范和契约，虽然它不强制要求所有的子类必须遵循这些契约，但是如果子类对这些已经实现的方法任意修改，就会对整个继承体系造成破坏。</p>
<p><strong>继承在给程序设计带来便利的同时，也带来了弊端</strong>。比如使用继承会给程序带来 <strong>侵入性</strong>，程序的可移植性降低，增加对象间的耦合性，如果一个类被其他的类所继承，则当这个类需要修改时，必须考虑到所有的子类，并且父类修改后，所有涉及到子类的功能都有可能产生故障。</p>
<blockquote>
<p>问题：在编程中，如何正确的使用继承？</p>
</blockquote>
<p>使用里氏替原则。</p>
<h3 id="基本介绍-3" tabindex="-1"><a class="header-anchor" href="#基本介绍-3" aria-hidden="true">#</a> 基本介绍</h3>
<p><strong>里氏替换原则</strong>（Liskov Substitution Principle）由麻省理工学院计算机科学实验室的里斯科夫（Liskov）女士在 1987 年的「面向对象技术的高峰会议」（OOPSLA）上发表的一篇文章《数据抽象和层次》（Data Abstraction and Hierarchy）里提出来的，她提出：继承必须确保超类所拥有的性质在子类中仍然成立（Inheritance should ensure that any property proved about supertype objects also holds for subtype objects）。</p>
<p>如果对每个类型为 T1 的对象 o1，都有类型为 T2 的对象 o2，使得以 T1 定义的所有程序 P 在所有的对象 o1 都代换成 o2 时，程序 P 的行为没有发生变化，那么类型 T2 是类型 T1 的子类型。换句话说，所有引用基类的地方必须能透明地使用其子类的对象。</p>
<p>在使用继承时，遵循里氏替换原则，在 <strong>子类中尽量不要重写父类的方法</strong>。</p>
<p><strong>里氏替换原则</strong> 主要阐述了有关继承的一些原则，因为继承实际上让两个类耦合性增强了，所以告诉我们什么时候应该使用继承，什么时候不应该使用继承，以及其中蕴含的原理。里氏替换原是继承复用的基础，它反映了基类与子类之间的关系，是对开闭原则的补充，是对实现抽象化的具体步骤的规范。</p>
<p>在适当的情况下，可以通过聚合、组合、依赖来解决问题。</p>
<blockquote>
<p>举例</p>
</blockquote>
<p>假设 B 类需要 A 类的某些方法（日后基本不会改），则把这些方法放到一个抽象类 C，再让 A、B 类继承抽象类 C，防止 B 直接继承 A 类，提高耦合度。</p>
<h3 id="里氏替换原则的作用" tabindex="-1"><a class="header-anchor" href="#里氏替换原则的作用" aria-hidden="true">#</a> 里氏替换原则的作用</h3>
<p>里氏替换原则的主要作用如下：</p>
<ul>
<li>
<p>里氏替换原则是实现开闭原则的重要方式之一</p>
</li>
<li>
<p>它克服了继承中重写父类造成的可复用性变差的缺点</p>
</li>
<li>
<p>它是动作正确性的保证。即类的扩展不会给已有的系统引入新的错误，降低了代码出错的可能性</p>
</li>
<li>
<p>加强程序的健壮性，同时变更时可以做到非常好的兼容性，提高程序的维护性、可扩展性，降低需求变更时引入的风险</p>
</li>
</ul>
<h3 id="应用实例-2" tabindex="-1"><a class="header-anchor" href="#应用实例-2" aria-hidden="true">#</a> 应用实例</h3>
<p>看下面代码，思考问题和解决思路</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Liskov</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">A</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"11-3="</span> <span class="token operator">+</span> a<span class="token punctuation">.</span><span class="token function">func1</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"1-8="</span> <span class="token operator">+</span> a<span class="token punctuation">.</span><span class="token function">func1</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"-----------------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">B</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"11-3="</span> <span class="token operator">+</span> b<span class="token punctuation">.</span><span class="token function">func1</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 这里本意是求出 11-3，但是不小心c</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"1-8="</span> <span class="token operator">+</span> b<span class="token punctuation">.</span><span class="token function">func1</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1-8</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"11+3+9="</span> <span class="token operator">+</span> b<span class="token punctuation">.</span><span class="token function">func2</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// A 类</span>
<span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
	<span class="token comment">// 返回两个数的差</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token keyword">int</span> num1<span class="token punctuation">,</span> <span class="token keyword">int</span> num2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> num1 <span class="token operator">-</span> num2<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// B 类继承了 A</span>
<span class="token comment">// 增加了一个新功能：完成两个数相加，然后和 9 求和</span>
<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
	<span class="token comment">// 这里，重写了 A 类的方法, 可能是无意识</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">func2</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">func1</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">9</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解决方法</strong></p>
<p>我们发现原来运行正常的相减功能发生了错误。原因就是类 B 无意中重写了父类的方法，造成原有功能出现错误。在实际编程中，我们常常会通过重写父类的方法完成新的功能，这样写起来虽然简单，但整个继承体系的复用性会比较差。特别是运行多态比较频繁的时候。</p>
<p>通用的做法是：原来的父类和子类都继承一个更通俗的基类，原有的继承关系去掉，采用依赖、聚合、组合等 关系代替。</p>
<p>改进方案：</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220224203107.png" alt="image-20220224203106674" loading="lazy"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Liskov</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">A</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"11-3="</span> <span class="token operator">+</span> a<span class="token punctuation">.</span><span class="token function">func1</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"1-8="</span> <span class="token operator">+</span> a<span class="token punctuation">.</span><span class="token function">func1</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"-----------------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">B</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 因为 B 类不再继承A类，因此调用者，不会再 func1 是求减法</span>
		<span class="token comment">// 调用完成的功能就会很明确</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"11+3="</span> <span class="token operator">+</span> b<span class="token punctuation">.</span><span class="token function">func1</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 这里本意是求出 11+3</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"1+8="</span> <span class="token operator">+</span> b<span class="token punctuation">.</span><span class="token function">func1</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1+8</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"11+3+9="</span> <span class="token operator">+</span> b<span class="token punctuation">.</span><span class="token function">func2</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token comment">// 使用组合仍然可以使用到 A 类相关方法</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"11-3="</span> <span class="token operator">+</span> b<span class="token punctuation">.</span><span class="token function">func3</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 这里本意是求出 11-3</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 创建一个更加基础的基类</span>
<span class="token keyword">class</span> <span class="token class-name">Base</span> <span class="token punctuation">{</span>
	<span class="token comment">// 把更加基础的方法和成员写到 Base 类</span>
<span class="token punctuation">}</span>

<span class="token comment">// A 类</span>
<span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token keyword">extends</span> <span class="token class-name">Base</span> <span class="token punctuation">{</span>
	<span class="token comment">// 返回两个数的差</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token keyword">int</span> num1<span class="token punctuation">,</span> <span class="token keyword">int</span> num2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> num1 <span class="token operator">-</span> num2<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// B 类继承了 A</span>
<span class="token comment">// 增加了一个新功能：完成两个数相加，然后和 9 求和</span>
<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">Base</span> <span class="token punctuation">{</span>
	<span class="token comment">// 如果 B 需要使用 A 类的方法，使用组合关系</span>
	<span class="token keyword">private</span> <span class="token class-name">A</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	
	<span class="token comment">// 这里，重写了 A 类的方法, 可能是无意识</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">func2</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">func1</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">9</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token comment">// 我们仍然想使用 A 的方法</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">func3</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">.</span><span class="token function">func1</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开闭原则-ocp" tabindex="-1"><a class="header-anchor" href="#开闭原则-ocp" aria-hidden="true">#</a> 开闭原则（OCP）</h2>
<h3 id="基本介绍-4" tabindex="-1"><a class="header-anchor" href="#基本介绍-4" aria-hidden="true">#</a> 基本介绍</h3>
<p><strong>开闭原则</strong>（Open Closed Principle，OCP）由勃兰特·梅耶（Bertrand Meyer）提出，他在 1988 年的著作《面向对象软件构造》（Object Oriented Software Construction）中提出：软件实体应当对扩展开放，对修改关闭（Software entities should be open for extension，but closed for modification），这就是开闭原则的经典定义。</p>
<p><strong>开闭原则</strong>（Open Closed Principle）是编程中 <strong>最基础、最重要</strong> 的设计原则。</p>
<p>一个软件实体如类，模块和函数应该 <strong>对扩展开放（对提供方）</strong>，对 <strong>修改关闭（对使用方）</strong>。用抽象构建框架，用实现扩展细节。</p>
<p>当软件需要变化时，尽量 <strong>通过扩展软件</strong> 实体的行为来实现变化，而不是 <strong>通过修改</strong> 已有的代码来实现变化。</p>
<p>编程中遵循其它原则，以及使用设计模式的目的就是遵循 <strong>开闭原则</strong>。</p>
<h3 id="开闭原则的作用" tabindex="-1"><a class="header-anchor" href="#开闭原则的作用" aria-hidden="true">#</a> 开闭原则的作用</h3>
<p>开闭原则是面向对象程序设计的终极目标，它使软件实体拥有一定的适应性和灵活性的同时具备稳定性和延续性。具体来说，其作用如下：</p>
<blockquote>
<p>对软件测试的影响</p>
</blockquote>
<p>软件遵守开闭原则的话，软件测试时只需要对扩展的代码进行测试就可以了，因为原有的测试代码仍然能够正常运行。</p>
<blockquote>
<p>可以提高代码的可复用性</p>
</blockquote>
<p>粒度越小，被复用的可能性就越大；在面向对象的程序设计中，根据原子和抽象编程可以提高代码的可复用性。</p>
<blockquote>
<p>可以提高软件的可维护性</p>
</blockquote>
<p>遵守开闭原则的软件，其稳定性高和延续性强，从而易于扩展和维护。</p>
<h3 id="应用示例" tabindex="-1"><a class="header-anchor" href="#应用示例" aria-hidden="true">#</a> 应用示例</h3>
<p>类图设计，如下：</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220224203441.png" alt="image-20220224203440696" loading="lazy"></p>
<p><strong>代码演示</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Ocp</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 使用看看存在的问题</span>
		<span class="token class-name">GraphicEditor</span> graphicEditor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GraphicEditor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		graphicEditor<span class="token punctuation">.</span><span class="token function">drawShape</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		graphicEditor<span class="token punctuation">.</span><span class="token function">drawShape</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 这是一个用于绘图的类 [使用方]</span>
<span class="token keyword">class</span> <span class="token class-name">GraphicEditor</span> <span class="token punctuation">{</span>
	<span class="token comment">// 接收 Shape 对象，然后根据 type，来绘制不同的图形</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">drawShape</span><span class="token punctuation">(</span><span class="token class-name">Shape</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>m_type <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>
			<span class="token function">drawRectangle</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>m_type <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span>
			<span class="token function">drawCircle</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 绘制矩形</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">drawRectangle</span><span class="token punctuation">(</span><span class="token class-name">Shape</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 绘制矩形 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 绘制圆形</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">drawCircle</span><span class="token punctuation">(</span><span class="token class-name">Shape</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 绘制圆形 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Shape 类，基类</span>
<span class="token keyword">class</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
	<span class="token keyword">int</span> m_type<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Rectangle</span> <span class="token keyword">extends</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
	<span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">.</span>m_type <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token keyword">extends</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
	<span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">.</span>m_type <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>上方代码优缺点</strong></p>
<ul>
<li>优点是比较好理解，简单易操作</li>
<li>缺点是违反了设计模式的 OCP 原则，即对扩展开放（提供方），对修改关闭（使用方）。即当我们给类增加新功能的时候，尽量不修改代码，或者尽可能少修改代码</li>
<li>比如我们这时要新增加一个图形种类三角形，我们需要做如下修改，修改的地方较多（四处）</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Ocp</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 使用看看存在的问题</span>
		<span class="token class-name">GraphicEditor</span> graphicEditor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GraphicEditor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		graphicEditor<span class="token punctuation">.</span><span class="token function">drawShape</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		graphicEditor<span class="token punctuation">.</span><span class="token function">drawShape</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		graphicEditor<span class="token punctuation">.</span><span class="token function">drawShape</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Triangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 这是一个用于绘图的类 [使用方]</span>
<span class="token keyword">class</span> <span class="token class-name">GraphicEditor</span> <span class="token punctuation">{</span>
	<span class="token comment">// 接收 Shape 对象，然后根据 type，来绘制不同的图形</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">drawShape</span><span class="token punctuation">(</span><span class="token class-name">Shape</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>m_type <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>
			<span class="token function">drawRectangle</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>m_type <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span>
			<span class="token function">drawCircle</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 绘制矩形</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">drawRectangle</span><span class="token punctuation">(</span><span class="token class-name">Shape</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 绘制矩形 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 绘制圆形</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">drawCircle</span><span class="token punctuation">(</span><span class="token class-name">Shape</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 绘制圆形 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token comment">// 绘制三角形</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">drawTriangle</span><span class="token punctuation">(</span><span class="token class-name">Shape</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 绘制三角形 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Shape 类，基类</span>
<span class="token keyword">class</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
	<span class="token keyword">int</span> m_type<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Rectangle</span> <span class="token keyword">extends</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
	<span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">.</span>m_type <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token keyword">extends</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
	<span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">.</span>m_type <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 新增画三角形</span>
<span class="token keyword">class</span> <span class="token class-name">Triangle</span> <span class="token keyword">extends</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
	<span class="token class-name">Triangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">.</span>m_type <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="应用实例改进" tabindex="-1"><a class="header-anchor" href="#应用实例改进" aria-hidden="true">#</a> 应用实例改进</h3>
<p>思路：把创建 Shape 类做成抽象类，并提供一个抽象的 <code v-pre>draw</code> 方法，让子类去实现即可，这样我们有新的图形种类时，只需要让新的图形类继承 Shape，并实现 <code v-pre>draw</code> 方法即可，使用方的代码就不需要修，<strong>满足了开闭原则</strong>。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Ocp</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 使用看看存在的问题</span>
		<span class="token class-name">GraphicEditor</span> graphicEditor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GraphicEditor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		graphicEditor<span class="token punctuation">.</span><span class="token function">drawShape</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		graphicEditor<span class="token punctuation">.</span><span class="token function">drawShape</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		graphicEditor<span class="token punctuation">.</span><span class="token function">drawShape</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Triangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		graphicEditor<span class="token punctuation">.</span><span class="token function">drawShape</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">OtherGraphic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 这是一个用于绘图的类 [使用方]</span>
<span class="token keyword">class</span> <span class="token class-name">GraphicEditor</span> <span class="token punctuation">{</span>
	<span class="token comment">//接收 Shape 对象，调用 draw 方法</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">drawShape</span><span class="token punctuation">(</span><span class="token class-name">Shape</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		s<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Shape 类，基类</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
	<span class="token keyword">int</span> m_type<span class="token punctuation">;</span>
	
	<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//抽象方法</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Rectangle</span> <span class="token keyword">extends</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
	<span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">.</span>m_type <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 绘制矩形 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token keyword">extends</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
	<span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">.</span>m_type <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 绘制圆形 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 新增画三角形</span>
<span class="token keyword">class</span> <span class="token class-name">Triangle</span> <span class="token keyword">extends</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
	<span class="token class-name">Triangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">.</span>m_type <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 绘制三角形 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 新增一个图形</span>
<span class="token keyword">class</span> <span class="token class-name">OtherGraphic</span> <span class="token keyword">extends</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
	<span class="token class-name">OtherGraphic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">.</span>m_type <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">" 绘制其它图形 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和依赖倒转原则类似，遵循其它原则，以及使用设计模式的目的就是遵循 <strong>开闭原则</strong>。</p>
<h2 id="迪米特法则-dp" tabindex="-1"><a class="header-anchor" href="#迪米特法则-dp" aria-hidden="true">#</a> 迪米特法则（DP）</h2>
<h3 id="基本介绍-5" tabindex="-1"><a class="header-anchor" href="#基本介绍-5" aria-hidden="true">#</a> 基本介绍</h3>
<ul>
<li>
<p>一个对象应该对其他对象保持最少的了解，类与类关系越密切，耦合度越大</p>
</li>
<li>
<p><strong>迪米特法则</strong>（Demeter Principle）又叫 <strong>最少知道原则</strong>，即一个类 <strong>对自己依赖的类（引用的其他类）知道的越少越好</strong>。也就是说，对于被依赖的类不管多么复杂，都尽量将逻辑封装在类的内部。对外除了提供的 public 方法，不对外泄露任何信息</p>
</li>
</ul>
<blockquote>
<p>主要优点</p>
</blockquote>
<ul>
<li>降低了类之间的耦合度，提高了模块的相对独立性</li>
<li>由于亲合度降低，从而提高了类的可复用率和系统的扩展性</li>
</ul>
<p>迪米特法则还有个更简单的定义：只与直接的朋友通信。</p>
<p><strong>直接的朋友</strong>：每个对象都会与其他对象有耦合关系，只要两个对象之间有耦合关系，我们就说这两个对象之间是朋友关系。耦合的方式很多，依赖，关联，组合，聚合等。其中，我们称出现成员变量，方法参数，方法返回值中的类为直接的朋友，而出现在局部变量中的类不是直接的朋友。也就是说，陌生的类最好不要以局部变量的形式出现在类的内部</p>
<blockquote>
<p>直接朋友和非直接朋友举例</p>
</blockquote>
<p>B 是 A 的直接朋友：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
	<span class="token comment">// 成员变量</span>
    <span class="token class-name">B</span> b<span class="token punctuation">;</span>
    <span class="token comment">// 方法参数</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">method1</span><span class="token punctuation">(</span><span class="token class-name">B</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span>
    <span class="token comment">// 方法返回值</span>
    <span class="token keyword">public</span> <span class="token class-name">B</span> <span class="token function">method2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>非直接朋友：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 局部变量不是直接朋友</span>
        <span class="token class-name">B</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>迪米特法则能够帮我们实现代码的 <strong>高内聚、松耦合</strong>。</p>
<blockquote>
<p>那到底什么是「高内聚」呢？</p>
</blockquote>
<p>所谓高内聚，就是指相近的功能应该放到同一个类中，不相近的功能不要放到同一个类中。相近的功能往往会被同时修改，放到同一个类中，修改会比较集中，代码容易维护。实际上，我们前面讲过的单一职责原则是实现代码高内聚非常有效的设计原则。</p>
<blockquote>
<p>我们再来看一下，什么是「松耦合」？</p>
</blockquote>
<p>所谓松耦合是说，在代码中，类与类之间的依赖关系简单清晰。即使两个类有依赖关系，一个类的代码改动不会或者很少导致依赖类的代码改动。实际上，我们前面讲的依赖注入、接口隔离、基于接口而非实现编程，以及今天讲的迪米特法则，都是为了实现代码的松耦合。</p>
<blockquote>
<p>最后，我们来看一下，「内聚」和「耦合」之间的关系</p>
</blockquote>
<p>前面也提到，「高内聚」有助于「松耦合」，同理，「低内聚」也会导致「紧耦合」。关于这一点，我画了一张对比图来解释。图中左边部分的代码结构是「高内聚、松耦合」；右边部分正好相反，是「低内聚、紧耦合」</p>
<img src="https://unpkg.zhimg.com/youthlql@1.0.0/design_patterns/design_principles/0001.png" />
<ol>
<li>图中左边部分的代码设计中，类的粒度比较小，每个类的职责都比较单一。相近的功能都放到了一个类中，不相近的功能被分割到了多个类中。这样类更加独立，代码的内聚性更好。因为职责单一，所以每个类被依赖的类就会比较少，代码低耦合。一个类的修改，只会影响到一个依赖类的代码改动。我们只需要测试这一个依赖类是否还能正常工作就行了</li>
<li>图中右边部分的代码设计中，类粒度比较大，低内聚，功能大而全，不相近的功能放到了一个类中。这就导致很多其他类都依赖这个类。当我们修改这个类的某一个功能代码的时候，会影响依赖它的多个类。我们需要测试这三个依赖类，是否还能正常工作。这也就是所谓的「牵一发而动全身」</li>
<li>除此之外，从图中我们也可以看出，高内聚、低耦合的代码结构更加简单、清晰，相应地，在可维护性和可读性上确实要好很多</li>
</ol>
<p>所以，在运用迪米特法则时要注意以下 6 点：</p>
<ul>
<li>在类的划分上，应该创建弱耦合的类。类与类之间的耦合越弱，就越有利于实现可复用的目标</li>
<li>在类的结构设计上，尽量降低类成员的访问权限</li>
<li>在类的设计上，优先考虑将一个类设置成不变类</li>
<li>在对其他类的引用上，将引用其他对象的次数降到最低</li>
<li>不暴露类的属性成员，而应该提供相应的访问器（set 和 get 方法）</li>
<li>谨慎使用序列化（Serializable）功能</li>
</ul>
<h3 id="应用实例-3" tabindex="-1"><a class="header-anchor" href="#应用实例-3" aria-hidden="true">#</a> 应用实例</h3>
<p>需求：有一个学校，下属有各个学院和总部，现要求打印出学校总部员工 ID 和学院员工的 id。</p>
<p>违反了 <strong>迪米特法则</strong> 的内容是 SchoolManager 类的内容（57 - 90 行代码）</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 客户端</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demeter1</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 创建了一个 SchoolManager 对象</span>
		<span class="token class-name">SchoolManager</span> schoolManager <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SchoolManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 输出学院的员工 id 和  学校总部的员工信息</span>
		schoolManager<span class="token punctuation">.</span><span class="token function">printAllEmployee</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CollegeManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 学校总部员工类</span>
<span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setId</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> id<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 学院的员工类</span>
<span class="token keyword">class</span> <span class="token class-name">CollegeEmployee</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setId</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> id<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 管理学院员工的管理类</span>
<span class="token keyword">class</span> <span class="token class-name">CollegeManager</span> <span class="token punctuation">{</span>
	<span class="token comment">// 返回学院的所有员工</span>
	<span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CollegeEmployee</span><span class="token punctuation">></span></span> <span class="token function">getAllEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CollegeEmployee</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CollegeEmployee</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 这里我们增加了 10 个员工到 list</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
			<span class="token class-name">CollegeEmployee</span> emp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CollegeEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			emp<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token string">"学院员工id= "</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
			list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>emp<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> list<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 学校管理类</span>

<span class="token comment">// 分析 SchoolManager 类的直接朋友类有哪些：Employee、CollegeManager</span>
<span class="token comment">// CollegeEmployee 不是直接朋友 而是一个陌生类，这样违背了 迪米特法则</span>
<span class="token keyword">class</span> <span class="token class-name">SchoolManager</span> <span class="token punctuation">{</span>
	<span class="token comment">// 返回学校总部的员工</span>
	<span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span> <span class="token function">getAllEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 这里我们增加了 5 个员工到 list</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
			<span class="token class-name">Employee</span> emp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			emp<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token string">"学校总部员工id= "</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
			list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>emp<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> list<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 该方法完成输出学校总部和学院员工信息(id)</span>
	<span class="token keyword">void</span> <span class="token function">printAllEmployee</span><span class="token punctuation">(</span><span class="token class-name">CollegeManager</span> sub<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		
		<span class="token comment">// 分析问题</span>
		<span class="token comment">// 1. 这里的 CollegeEmployee 不是 SchoolManager 的直接朋友</span>
		<span class="token comment">// 2. CollegeEmployee 是以局部变量方式出现在 SchoolManager</span>
		<span class="token comment">// 3. 违反了 迪米特法则 </span>
		
		<span class="token comment">// 获取到学院员工</span>
		<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CollegeEmployee</span><span class="token punctuation">></span></span> list1 <span class="token operator">=</span> sub<span class="token punctuation">.</span><span class="token function">getAllEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"------------学院员工------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">CollegeEmployee</span> e <span class="token operator">:</span> list1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 获取到学校总部员工</span>
		<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span> list2 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAllEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"------------学校总部员工------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Employee</span> e <span class="token operator">:</span> list2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上方代码违反了 <strong>迪米特法则</strong>。</p>
<h3 id="应用实例改进-1" tabindex="-1"><a class="header-anchor" href="#应用实例改进-1" aria-hidden="true">#</a> 应用实例改进</h3>
<p>前面设计的问题在于 SchoolManager 中，CollegeEmployee 类并不是 SchoolManager 类的直接朋友（分析）。</p>
<p>按照迪米特法则，应该避免类中出现这样非直接朋友关系的耦合。</p>
<p>主要看 SchoolManager 类的内容（65 - 91 行代码）</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 客户端</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demeter1</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"~~~使用迪米特法则的改进~~~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 创建了一个 SchoolManager 对象</span>
		<span class="token class-name">SchoolManager</span> schoolManager <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SchoolManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 输出学院的员工 id 和 学校总部的员工信息</span>
		schoolManager<span class="token punctuation">.</span><span class="token function">printAllEmployee</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CollegeManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 学校总部员工类</span>
<span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setId</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> id<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 学院的员工类</span>
<span class="token keyword">class</span> <span class="token class-name">CollegeEmployee</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setId</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> id<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 管理学院员工的管理类</span>
<span class="token keyword">class</span> <span class="token class-name">CollegeManager</span> <span class="token punctuation">{</span>
	<span class="token comment">// 返回学院的所有员工</span>
	<span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CollegeEmployee</span><span class="token punctuation">></span></span> <span class="token function">getAllEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CollegeEmployee</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CollegeEmployee</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 这里我们增加了 10 个员工到 list</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
			<span class="token class-name">CollegeEmployee</span> emp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CollegeEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			emp<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token string">"学院员工id= "</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
			list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>emp<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> list<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token comment">// 输出学院员工的信息</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取到学院员工</span>
		<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CollegeEmployee</span><span class="token punctuation">></span></span> list1 <span class="token operator">=</span> <span class="token function">getAllEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"------------学院员工------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">CollegeEmployee</span> e <span class="token operator">:</span> list1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 学校管理类</span>
<span class="token keyword">class</span> <span class="token class-name">SchoolManager</span> <span class="token punctuation">{</span>
	<span class="token comment">// 返回学校总部的员工</span>
	<span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span> <span class="token function">getAllEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 这里我们增加了 5 个员工到 list</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
			<span class="token class-name">Employee</span> emp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			emp<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token string">"学校总部员工id= "</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
			list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>emp<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> list<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 该方法完成输出学校总部和学院员工信息(id)</span>
	<span class="token keyword">void</span> <span class="token function">printAllEmployee</span><span class="token punctuation">(</span><span class="token class-name">CollegeManager</span> sub<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		
		<span class="token comment">// 分析问题</span>
		<span class="token comment">// 1. 将输出学院的员工方法，封装到 CollegeManager</span>
		sub<span class="token punctuation">.</span><span class="token function">printEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	
		<span class="token comment">// 获取到学校总部员工</span>
		<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span> list2 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAllEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"------------学校总部员工------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Employee</span> e <span class="token operator">:</span> list2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="迪米特法则注意事项和细节" tabindex="-1"><a class="header-anchor" href="#迪米特法则注意事项和细节" aria-hidden="true">#</a> 迪米特法则注意事项和细节</h3>
<ul>
<li>迪米特法则的核心是降低类之间的耦合，<strong>不建议在方法里 new 其他的类</strong></li>
<li>但是注意：由于每个类都减少了不必要的依赖，因此迪米特法则只是要求降低类间（对象间）耦合关系，并不是要求完全没有依赖关系</li>
</ul>
<h2 id="合成复用原则-crp" tabindex="-1"><a class="header-anchor" href="#合成复用原则-crp" aria-hidden="true">#</a> 合成复用原则（CRP）</h2>
<p><strong>合成复用原则</strong>（Composite Reuse Principle，CRP）又叫 组合/<strong>聚合复用原则</strong>（Composition/Aggregate Reuse Principle，CARP）。它要求在软件复用时，要尽量先使用 <strong>组合或者聚合</strong> 等关联关系来实现，其次才考虑使用继承关系来实现。</p>
<p>如果要使用继承关系，则必须严格遵循里氏替换原则。</p>
<blockquote>
<p>继承图</p>
</blockquote>
<p>B 直接继承 A。</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220226215410.png" alt="image-20220226103414310" loading="lazy"></p>
<blockquote>
<p>聚合图</p>
</blockquote>
<p>B 需要 A 的三个方法，但不是继承，而是通过方法参数、构造器、setter 传入 A 的对象。</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220226215412.png" alt="image-20220226103435911" loading="lazy"></p>
<blockquote>
<p>组合图</p>
</blockquote>
<p>B 需要 A 的三个方法，直接通过 <code v-pre>new A</code> 获得 A 的对象。</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220226215413.png" alt="image-20220226103439980" loading="lazy"></p>
<h3 id="设计原则核心思想" tabindex="-1"><a class="header-anchor" href="#设计原则核心思想" aria-hidden="true">#</a> 设计原则核心思想</h3>
<ul>
<li>找出应用中可能需要变化之处，把它们独立出来，不要和那些不需要变化的代码混在一起</li>
<li>针对接口编程，而不是针对实现编程</li>
<li>为了交互对象之间的松耦合设计而努力</li>
</ul>
<h3 id="合成复用原则的重要性" tabindex="-1"><a class="header-anchor" href="#合成复用原则的重要性" aria-hidden="true">#</a> 合成复用原则的重要性</h3>
<p>通常类的复用分为继承复用和合成复用两种，继承复用虽然有简单和易实现的优点，但它也存在以下缺点：</p>
<ul>
<li>继承复用破坏了类的封装性。因为继承会将父类的实现细节暴露给子类，父类对子类是透明的，所以这种复用又称为「白箱」复用</li>
<li>子类与父类的耦合度高。父类的实现的任何改变都会导致子类的实现发生变化，这不利于类的扩展与维护</li>
<li>它限制了复用的灵活性。从父类继承而来的实现是静态的，在编译时已经定义，所以在运行时不可能发生变化</li>
</ul>
<p>采用组合或聚合复用时，可以将已有对象纳入新对象中，使之成为新对象的一部分，新对象可以调用已有对象的功能，它有以下优点：</p>
<ul>
<li>它维持了类的封装性。因为成分对象的内部细节是新对象看不见的，所以这种复用又称为「黑箱」复用</li>
<li>新旧类之间的耦合度低。这种复用所需的依赖较少，新对象存取成分对象的唯一方法是通过成分对象的接口</li>
<li>复用的灵活性高。这种复用可以在运行时动态进行，新对象可以动态地引用与成分对象类型相同的对象</li>
</ul>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<ul>
<li>单一职责原则：一个类或一个方法只负责一件事情</li>
<li>接口隔离原则：一个接口的所有抽象方法能被一个类全部实现</li>
<li>依赖倒转原则：通过接口、构造器、setter 来降低类与类之间的依赖</li>
<li>里氏替换原则：子类中尽量不要重写父类的方法，应该将父类的方法（以后不会改）放到一个抽象类，由父类和子类共同继承</li>
<li>开闭原则：对扩展开放（对提供方），对修改关闭（对使用方）</li>
<li>迪米特法则：不要在方法里 new 其他的类，而是用过方法参数、全局变量引用其他类</li>
<li>合成复用原则：尽量使用合成/聚合的方式引用其他类，而不是使用继承</li>
</ul>
<table>
<thead>
<tr>
<th>设计原则</th>
<th>一句话归纳</th>
<th>目的</th>
</tr>
</thead>
<tbody>
<tr>
<td>开闭原则</td>
<td>对扩展开放，对修改关闭</td>
<td>降低维护带来的新风险</td>
</tr>
<tr>
<td>依赖倒置原则</td>
<td>高层不应该依赖低层，要面向接口编程</td>
<td>更利于代码结构的升级扩展</td>
</tr>
<tr>
<td>单一职责原则</td>
<td>一个类只干一件事，实现类要单一</td>
<td>便于理解，提高代码的可读性</td>
</tr>
<tr>
<td>接口隔离原则</td>
<td>一个接口只干一件事，接口要精简单一</td>
<td>功能解耦，高聚合、低耦合</td>
</tr>
<tr>
<td>迪米特法则</td>
<td>不该知道的不要知道，一个类应该保持对其它对象最少的了解，降低耦合度</td>
<td>只和朋友交流，不和陌生人说话，减少代码臃肿</td>
</tr>
<tr>
<td>里氏替换原则</td>
<td>不要破坏继承体系，子类重写方法功能发生改变，不应该影响父类方法的含义</td>
<td>防止继承泛滥</td>
</tr>
<tr>
<td>合成复用原则</td>
<td>尽量使用组合或者聚合关系实现代码复用，少使用继承</td>
<td>降低代码耦合</td>
</tr>
</tbody>
</table>
<p>实际上，这些原则的目的只有一个：降低对象之间的耦合，增加程序的可复用性、可扩展性和可维护性。</p>
<h2 id="uml-基本介绍" tabindex="-1"><a class="header-anchor" href="#uml-基本介绍" aria-hidden="true">#</a> UML 基本介绍</h2>
<p>997 年 UML 被国际对象管理组织（OMG）采纳为面向对象的建模语言的国际标准。它的特点是 <strong>简单、统一、图形化、能表达软件设计中的动态与静态信息</strong>。</p>
<p>UML：Unified modeling language UML (统一建模语言)，是一种用于软件系统分析和设计的语言工具，它用于帮助软件开发人员进行思考和记录思路的结果。</p>
<p>UML 本身是一套符号的规定，就像数学符号和化学符号一样，这些符号用于描述软件模型中的各个元素和他 们之间的关系，比如类、接口、实现、泛化、依赖、组合、聚合等，如右图：</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220226222057.png" alt="image-20220226222056781" loading="lazy"></p>
<p>画 UML 图与写文章差不多，都是把自己的思想描述给别人看，关键在于思路和条理，UML 图分类：</p>
<ul>
<li>用例图（use case）</li>
<li>静态结构图：类图、对象图、包图、组件图、部署图</li>
<li>动态行为图：交互图（时序图与协作图）、状态图、活动图</li>
</ul>
<p>说明：类图是描述类与类之间的关系的，是 UML 图中最核心的。</p>
<h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h2>
<p>UML 能为软件开发的所有阶段提供模型化和可视化支持。而且融入了软件工程领域的新思想、新方法和新技术，使软件设计人员沟通更简明，进一步缩短了设计时间，减少开发成本。</p>
<p>UML 具有很宽的应用领域。其中最常用的是建立软件系统的模型，但它同样可以用于描述非软件领域的系统，如机械系统、企业机构或业务过程，以及处理复杂数据的信息系统、具有实时要求的工业系统或工业过程等。总之，UML 可以对任何具有静态结构和动态行为的系统进行建模，而且使用于从需求规格描述直至系统完成后的测试和维护等系统开发的各个阶段。</p>
<p>UML 模型大多以图表的方式表现出来，一份典型的建模图表通常包含几个块或框、连接线和作为模型附加信息的文本。这些虽简单却非常重要，在 UML 规则中相互联系和扩展。</p>
<p>在这里大家可能会疑问，UML 明明是一种图形，为什么说是语言呢？</p>
<p>语言是包括文字和图形的，有很多内容文字是无法表达的。你见过建筑设计图纸吗？里面还不是很多图形，光用文字能表达清楚建筑设计吗？在建筑界，有一套标准来描述设计，同样道理，在软件开发界，我们也需要一套标准来帮助我们做好软件开发的工作。UML 就是其中的一种标准，注意这可不是唯一标准，只是 UML 是大家比较推崇的一种标准而已。UML 并不是强制性标准，没有规定在软件开发中一定要用 UML，但是我们需要包括 UML 在内的各种标准，来提高我们软件开发的水平。</p>
<h2 id="基本构件" tabindex="-1"><a class="header-anchor" href="#基本构件" aria-hidden="true">#</a> 基本构件</h2>
<p>UML 建模的核心是模型，模型是现实的简化、真实系统的抽象。UML 提供了系统的设计蓝图。当给软件系统建模时，需要采用通用的符号语言，这种描述模型所使用的语言被称为建模语言。在 UML 中，所有的描述由事物、关系和图这些构件组成。下图完整地描述了所有构件的关系：</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220326235403.png" alt="image-20220326235402075" loading="lazy"></p>
<h2 id="uml-接口" tabindex="-1"><a class="header-anchor" href="#uml-接口" aria-hidden="true">#</a> UML 接口</h2>
<p>接口（Interface）是一种特殊的类，它具有类的结构但不可被实例化，只可以被子类实现。它包含抽象操作，但不包含属性。它描述了类或组件对外可见的动作。在 UML 中，接口使用一个带有名称的小圆圈来进行表示。</p>
<p>如下所示是图形类接口的 UML 表示：</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220327001039.png" alt="image-20220327001037848" loading="lazy"></p>
<p>如果在 IDEA，那么是：</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220327001013.png" alt="image-20220327001011970" loading="lazy"></p>
<h2 id="uml-类图" tabindex="-1"><a class="header-anchor" href="#uml-类图" aria-hidden="true">#</a> UML 类图</h2>
<p>类图（ClassDiagram）是用来显示系统中的类、接口、协作以及它们之间的静态结构和关系的一种静态模型。它主要用于描述软件系统的结构化设计，帮助人们简化对软件系统的理解，它是系统分析与设计阶段的重要产物，也是系统编码与测试的重要模型依据。</p>
<p>类图中的类可以通过某种编程语言直接实现。类图在软件系统开发的整个生命周期都是有效的，它是面向对象系统的建模中最常见的图。如下所示是「计算长方形和圆形的周长与面积」的类图，图形接口有计算面积和周长的抽象方法，长方形和圆形实现这两个方法供访问类调用。</p>
<p>类图用于描述系统中的类（对象）本身的组成和类（对象）之间的各种静态关系。</p>
<ul>
<li>类之间的关系：依赖、泛化（继承）、实现、关联、聚合与组合</li>
</ul>
<blockquote>
<p>类图简单举例</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token operator">=</span>name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对该类右键</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220226225440.png" alt="image-20220226225439452" loading="lazy"></p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220226225626.png" alt="image-20220226225625153" loading="lazy"></p>
<p>如果新建一个类图，快捷键是空格，或者对着空白处右键，点击 <code v-pre>Add Class to Diagram...</code>，搜索其他类即可。</p>
<blockquote>
<p>类图用 3 个矩形拼接表示，最上面的部分标识类的名称，中间的部分标识类的属性，最下面的部分标识类的方法。</p>
</blockquote>
<p>类图中，需注意以下几点：</p>
<ul>
<li>抽象类或抽象方法用斜体表示</li>
<li>如果是接口，则在类名上方加 <code v-pre>&lt;&lt;Interface&gt;&gt;</code></li>
<li>字段和方法返回值的数据类型非必需</li>
<li>静态类或静态方法加下划线</li>
</ul>
<h2 id="类之间的关系" tabindex="-1"><a class="header-anchor" href="#类之间的关系" aria-hidden="true">#</a> 类之间的关系</h2>
<p>UML 将事物之间的联系归纳为 6 种，并用对应的图形类表示。下面根据类与类之间的耦合度从弱到强排列。UML 中的类图有以下几种关系：依赖关系、关联关系、聚合关系、组合关系、泛化关系和实现关系。其中泛化和实现的耦合度相等，它们是最强的。</p>
<h3 id="类图—依赖关系-dependence" tabindex="-1"><a class="header-anchor" href="#类图—依赖关系-dependence" aria-hidden="true">#</a> 类图—依赖关系（Dependence）</h3>
<p>依赖（Dependency）关系是一种使用关系，它是对象之间耦合度最弱的一种关联方式，是临时性的关联。在代码中，某个类的方法通过局部变量、方法的参数或者对静态方法的调用来访问另一个类（被依赖类）中的某些方法来完成一些职责。</p>
<p>只要是在类中用到了对方，那么他们之间就存在依赖关系。如果没有对方，连编绎都通过不了。</p>
<p>依赖关系使用 <strong>带箭头的虚线</strong> 来表示，箭头从使用类指向被依赖的类。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PersonServiceBean</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">PersonDao</span> personDao<span class="token punctuation">;</span> <span class="token comment">// 类</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token class-name">Person</span> person<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">IDCard</span> <span class="token function">getIDCard</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> personid<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span><span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">modify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">Department</span> department <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Department</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">PersonDao</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">IDCard</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Person1</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Department</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应的类图：</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220226230457.png" alt="image-20220226230456728" loading="lazy"></p>
<h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3>
<p>什么时候显示依赖关系：</p>
<ul>
<li>类中用到了对方</li>
<li>如果是类的成员属性</li>
<li>如果是方法的返回类型</li>
<li>是方法接收的参数类型</li>
<li>方法中使用到</li>
</ul>
<h3 id="类图—关联关系-association" tabindex="-1"><a class="header-anchor" href="#类图—关联关系-association" aria-hidden="true">#</a> 类图—关联关系（Association）</h3>
<p>关联（Association）关系是对象之间的一种引用关系，用于表示一类对象与另一类对象之间的联系，如老师和学生、师傅和徒弟、丈夫和妻子等。关联关系是类与类之间最常用的一种关系，分为一般关联关系、聚合关系和组合关系。</p>
<p>关联具有 <strong>导航性</strong>：即双向关系或单向关系。</p>
<p>关联具有多重性：如 1(表示有且仅有一个），「0...」(表示 0 个或者多个），「0，1」(表示 0 个或者一个）,「n.….」(表示 n 到 m 个都可以)，「m.….*」（表示至少 m 个)。</p>
<p>关联可以是双向的，也可以是单向的。在 UML 类图中，双向的关联可以用 <strong>带两个箭头或者没有箭头的实线</strong> 来表示，单向的关联用 <strong>带一个箭头的实线</strong> 来表示，箭头从使用类指向被关联的类。也可以在关联线的两端标注角色名，代表两种不同的角色。</p>
<blockquote>
<p>双向一对一关系</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Tercher</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> stus<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Tercher</span><span class="token punctuation">></span></span> teas<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">study</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220327001331.png" alt="image-20220327001329079" loading="lazy"></p>
<h3 id="类图—聚合关系-aggregation" tabindex="-1"><a class="header-anchor" href="#类图—聚合关系-aggregation" aria-hidden="true">#</a> 类图—聚合关系（Aggregation）</h3>
<p>聚合（Aggregation）关系是关联关系的一种，是强关联关系，是整体和部分之间的关系，是 has-a 的关系，是 <strong>整体和部分的关系</strong>，<strong>整体与部分可以分开</strong>，是 <strong>关联关系的特例</strong>，所以他具有关联的 <strong>导航性与多重性</strong>。</p>
<p>聚合关系也是通过成员对象来实现的，其中成员对象是整体对象的一部分，但是成员对象可以脱离整体对象而独立存在。例如，学校与老师的关系，学校包含老师，但如果学校停办了，老师依然存在。</p>
<p>在 UML 类图中，聚合关系可以用 <strong>带空心菱形的实线</strong> 来表示，菱形指向整体。如下是大学和教师的代码和关系图：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">University</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Teacher</span> teas<span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setTeacher</span><span class="token punctuation">(</span><span class="token class-name">Teacher</span> teas<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>teas <span class="token operator">=</span> teas<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Teacher</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">teaching</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220327001544.png" alt="image-20220327001543029" loading="lazy"></p>
<h3 id="类图—组合关系-composition" tabindex="-1"><a class="header-anchor" href="#类图—组合关系-composition" aria-hidden="true">#</a> 类图—组合关系（Composition）</h3>
<p>组合（Composition）关系也是关联关系的一种，也表示类之间的整体与部分的关系，但它是一种更强烈的聚合关系，是 cxmtains-a 关系。</p>
<p>在组合关系中，整体对象可以控制部分对象的生命周期，一旦整体对象不存在，部分对象也将不存在，部分对象不能脱离整体对象而存在。例如，头和嘴的关系，没有了头，嘴也就不存在了。</p>
<p>在 UML 类图中，组合关系用 <strong>带实心菱形的实线</strong> 来表示，菱形指向整体。</p>
<p>案例：在程序中我们定义实体：Person（人）与 IDCard（身份证）、Head（头），那么 Head 和 Person 就是组合，IDCard 和 Person 就是聚合。</p>
<p>但是如果在程序中 Person 实体中定义了对 IDCard 进行级联删除，即删除 Person 时连同 IDCard 一起删除，那 么 IDCard 和 Person 就是组合了。</p>
<blockquote>
<p>案例 1</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Head</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">IDCard</span> card<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Head</span> head <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Head</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IDCard</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Head</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下图，可以看到黑色的箭头是组合关系，白色的箭头是聚合。</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220226232426.png" alt="image-20220226232425687" loading="lazy"></p>
<blockquote>
<p>案例 2</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Computer</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Mouse</span> mouse <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Mouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 鼠标可以和 Computer 不能分离</span>
    <span class="token keyword">private</span> <span class="token class-name">Moniter</span> moniter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Moniter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 显示器可以和 Computer 不能分离</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setMouse</span><span class="token punctuation">(</span><span class="token class-name">Mouse</span> mouse<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>mouse <span class="token operator">=</span> mouse<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setMoniter</span><span class="token punctuation">(</span><span class="token class-name">Moniter</span> moniter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>moniter <span class="token operator">=</span> moniter<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Mouse</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Moniter</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220226232506.png" alt="image-20220226232506081" loading="lazy"></p>
<p>聚合通过方法参数、构造器、setter 传入对象，是组合的弱引用。</p>
<p>组合是直接 new 出对象，依赖性强。</p>
<h3 id="类图—泛化关系-generalization" tabindex="-1"><a class="header-anchor" href="#类图—泛化关系-generalization" aria-hidden="true">#</a> 类图—泛化关系(generalization）</h3>
<p>泛化（Generalization）关系是对象之间耦合度最大的一种关系，表示一般与特殊的关系，是父类与子类之间的关系，是一种继承关系，是 is-a 的关系。</p>
<p>在 UML 类图中，泛化关系用 <strong>带空心三角箭头的实线</strong> 来表示，箭头从子类指向父类。在代码实现时，使用面向对象的继承机制来实现泛化关系。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">DaoSupport</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token class-name">Object</span> entity<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token class-name">Object</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">PersonServiceBean2</span> <span class="token keyword">extends</span> <span class="token class-name">DaoSupport</span><span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类图（蓝色是 IDEA 自带，实际是空心的）：</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220226231116.png" alt="image-20220226231114471" loading="lazy"></p>
<h3 id="类图—实现关系-implementation" tabindex="-1"><a class="header-anchor" href="#类图—实现关系-implementation" aria-hidden="true">#</a> 类图—实现关系（Implementation）</h3>
<p>实现（Realization）关系是接口与实现类之间的关系。在这种关系中，类实现了接口，类中的操作实现了接口中所声明的所有的抽象操作。</p>
<p>在 UML 类图中，实现关系使用 <strong>带空心三角箭头的虚线</strong> 来表示，箭头从实现类指向接口。</p>
<p>实现关系实际上就是 A 类实现 B 接口，他是依赖关系的特例。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PersonService</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token class-name">Interger</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PersonServiceBean</span> <span class="token keyword">implements</span> <span class="token class-name">PersonService</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token class-name">Interger</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下图，绿色是 IDEA 自带，实际是空心的虚线：</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220226231347.png" alt="image-20220226231346103" loading="lazy"></p>
<h2 id="类与类箭头技巧" tabindex="-1"><a class="header-anchor" href="#类与类箭头技巧" aria-hidden="true">#</a> 类与类箭头技巧</h2>
<p>画类图时，要使用正确的箭头。类关系记忆技巧总结如下表所示：</p>
<table>
<thead>
<tr>
<th>分类</th>
<th>箭头特征</th>
<th>记忆技巧</th>
</tr>
</thead>
<tbody>
<tr>
<td>箭头方向</td>
<td>从子类指向父类</td>
<td>定义子类需要通过 extends 关键字指定父类子类一定是知道父类定义的，但父类并不知道子类的定义只有知道对方信息时才能指向对方箭头的方向是从子类指向父类</td>
</tr>
<tr>
<td>继承/实现</td>
<td>用线条连接两个类； 空心三角箭头表示继承或实现</td>
<td>实线表示继承，是is-a的关系，表示扩展，不虚，很结实</td>
</tr>
<tr>
<td>虚线表示实现，虚线代表「虚」无实体</td>
<td></td>
<td></td>
</tr>
<tr>
<td>关联/依赖</td>
<td>用线条连接两个类； 普通箭头表示关联或依赖</td>
<td>虚线表示依赖关系：临时用一下，若即若离，虚无缥缈，若有若无表示一种使用关系，一个类需要借助另一个类来实现功能一般一个类将另一个类作为参数使用，或作为返回值</td>
</tr>
<tr>
<td>实线表示关联关系：关系稳定，实打实的关系，「铁哥们」表示一个类对象和另一个类对象有关联通常一个类中有另一个类对象作为属性</td>
<td></td>
<td></td>
</tr>
<tr>
<td>组合/聚合</td>
<td>用菱形表示：像一个盛东西的器皿（如盘子）</td>
<td>聚合：空心菱形，代表空器皿里可以放很多相同的东西，聚集在一起（箭头方向所指的类）整体和局部的关系，两者有独立的生命周期，是 has-a 的关系弱关系，消极的词：弱-空</td>
</tr>
<tr>
<td>组合：实心菱形，代表器皿里已经有实体结构的存在，生死与共整体与局部的关系，和聚合关系对比，关系更加强烈，两者具有相同的生命周期，contains-a 的关系强关系，积极的词；强-满</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p>注意：UML 的标准类关系图中，没有实心箭头。有些 Java 编程的 IDE 自带类生成工具可能出现实心箭头，主要目的是降低理解难度。</p>
<h2 id="掌握设计模式的层次" tabindex="-1"><a class="header-anchor" href="#掌握设计模式的层次" aria-hidden="true">#</a> 掌握设计模式的层次</h2>
<ul>
<li>第 1 层：刚开始学编程不久，听说过什么是设计模式</li>
<li>第 2 层：有很长时间的编程经验，自己写了很多代码，其中用到了设计模式，但是自己却不知道</li>
<li>第 3 层：学习过了设计模式，发现自己已经在使用了，并且发现了一些新的模式挺好用的</li>
<li>第 4 层：阅读了很多别人写的源码和框架，在其中看到别人设计模式，并且能够领会设计模式的精妙和带来的 好处</li>
<li>第 5 层：代码写着写着，自己都没有意识到使用了设计模式，并且熟练的写了出来</li>
</ul>
<h2 id="设计模式介绍" tabindex="-1"><a class="header-anchor" href="#设计模式介绍" aria-hidden="true">#</a> 设计模式介绍</h2>
<p>设计模式是程序员在面对同类软件工程设计问题所总结出来的有用的经验，<strong>模式不是代码</strong>，而是 <strong>某类问题的通用解决方案</strong>，设计模式（Design pattern）代表了最佳的实践。这些解决方案是众多软件开发人员经过相当长的一段时间的试验和错误总结出来的。</p>
<p>设计模式的本质提高 <strong>软件的维护性，通用性和扩展性，并降低软件的复杂度</strong>。</p>
<p>《设计模式》 是经典的书，作者是 Erich Gamma、Richard Helm、Ralph Johnson 和 John Vlissides Design（俗称「四人组 GOF」）。</p>
<p>设计模式并不局限于某种语言，Java，PHP，C++ 都有设计模式。</p>
<h2 id="设计模式的重要性" tabindex="-1"><a class="header-anchor" href="#设计模式的重要性" aria-hidden="true">#</a> 设计模式的重要性</h2>
<p>软件工程中，<strong>设计模式</strong>（design pattern）是对软件设计中 <strong>普遍存在（反复出现）</strong> 的各种问题，所提出的 <strong>解决方案</strong>。这个术语是由埃里希·伽玛（Erich Gamma）等人在 1990 年代从建筑设计领域引入到计算机科学的。</p>
<p>拿实际工作经历来说，当一个项目开发完后，如果客户 <strong>提出增新功能</strong>，怎么办?。（可扩展性，使用设计模式，软件具有很好的扩展性）。</p>
<p>如果项目开发完后，原来程序员离职，你接手维护该项目怎么办? (维护性、可读性、规范性)</p>
<p>目前程序员门槛越来越高，一线 IT 公司(大厂)，都会问你在实际项目中 <strong>使用过什么设计模式，怎样使用的，解决了什么问题</strong>。</p>
<p><strong>设计模式在软件中哪里</strong>？面向对象（oo）=&gt; 功能模块[设计模式 + 算法(数据结构)] =&gt; 框架（使用到多种设计模式） =&gt; 架构（服务器集群）。</p>
<p>如果想成为合格软件工程师，那就花时间来研究下设计模式是非常必要的。</p>
<h2 id="设计模式的目的" tabindex="-1"><a class="header-anchor" href="#设计模式的目的" aria-hidden="true">#</a> 设计模式的目的</h2>
<p>编写软件过程中，程序员面临着来自 <strong>耦合性，内聚性以及可维护性，可扩展性，重用性，灵活性</strong> 等多方面的挑战，设计模式是为了让程序（软件），具有更好的：</p>
<ul>
<li>代码重用性（即：相同功能的代码，不用多次编写）</li>
<li>可读性（即：编程规范性，便于其他程序员的阅读和理解）</li>
<li>可扩展性（即：当需要增加新的功能时，非常的方便，称为可维护）</li>
<li>可靠性（即：当我们增加新的功能后，对原来的功能没有影响）</li>
<li>可靠性（即：当我们增加新的功能后，对原来的功能没有影响）</li>
</ul>
<p>设计模式的本质是面向对象设计原则的实际运用，是对类的封装性、继承性和多态性以及类的关联关系和组合关系的充分理解。正确使用设计模式具有以下优点：</p>
<ul>
<li>可以提高程序员的思维能力、编程能力和设计能力</li>
<li>使程序设计更加标准化、代码编制更加工程化，使软件开发效率大大提高，从而缩短软件的开发周期</li>
<li>使设计的代码可重用性高、可读性强、可靠性高、灵活性好、可维护性强</li>
</ul>
<p>设计模式解决的是设计不足的问题，但同时也要避免设计过度。一定要牢记简洁原则，要知道设计模式是为了使设计简单，而不是更复杂。如果引入设计模式使得设计变得复杂，只能说我们把简单问题复杂化了，问题本身不需要设计模式。</p>
<p>当然，设计模式只是一个引导。在具体的软件幵发中，必须根据设计的应用系统的特点和要求来恰当选择。对于简单的程序开发，苛能写一个简单的算法要比引入某种设计模式更加容易。但对大项目的开发或者框架设计，用设计模式来组织代码显然更好。</p>
<p><strong>设计模式要活学活用，不要生搬硬套。</strong></p>
<p>需要特别声明的是，在日常应用中，设计模式从来都不是单个设计模式独立使用的。在实际应用中，通常多个设计模式混合使用，你中有我，我中有你。如下图：</p>
<p><img src="https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/design-pattern/20220326231408.png" alt="" loading="lazy"></p>
<p>分享金句：</p>
<ul>
<li>设计模式包含了面向对象的精髓，「懂了设计模式，你就懂了面向对象分析和设计（OOA/D）的精要」</li>
<li>Scott Mayers 在其巨著《Effective C++》就曾经说过：C++ 老手和 C++ 新手的区别就是前者手背上有很多伤疤</li>
</ul>
<h2 id="设计模式类型" tabindex="-1"><a class="header-anchor" href="#设计模式类型" aria-hidden="true">#</a> 设计模式类型</h2>
<p>根据模式是用来完成什么工作来划分，这种方式可分为创建型模式、结构型模式和行为型模式 3 种：</p>
<ul>
<li>创建型模式：用于描述「怎样创建对象」，它的主要特点是「将对象的创建与使用分离」</li>
<li>结构型模式：用于描述如何将类或对象按某种布局组成更大的结构</li>
<li>行为型模式：用于描述类或对象之间怎样相互协作共同完成单个对象都无法单独完成的任务，以及怎样分配职责</li>
</ul>
<p>共 23 种：</p>
<blockquote>
<p>创建型模式（5 种）</p>
</blockquote>
<ul>
<li>单例模式（Singleton Pattern）：某个类只能生成一个实例，该类提供了一个全局访问点供外部获取该实例，其拓展是有限多例模式</li>
<li>工厂方法模式（FactoryMethod Pattern）：定义一个用于创建产品的接口，由子类决定生产什么产品</li>
<li>抽象工厂模式（AbstractFactory Pattern）：提供一个创建产品族的接口，其每个子类可以生产一系列相关的产品</li>
<li>原型模式（Prototype Pattern）：将一个对象作为原型，通过对其进行复制而克隆出多个和原型类似的新实例</li>
<li>建造者模式（Builder Pattern）：将一个复杂对象分解成多个相对简单的部分，然后根据不同需要分别创建它们，最后构建成该复杂对象</li>
</ul>
<p>以上 5 种创建型模式，除了工厂方法模式属于类创建型模式，其他的全部属于对象创建型模式。</p>
<blockquote>
<p>结构型模式（7 种）</p>
</blockquote>
<ul>
<li>适配器模式（Adapter Pattern）：将一个类的接口转换成客户希望的另外一个接口，使得原本由于接口不兼容而不能一起工作的那些类能一起工作</li>
<li>桥接模式（Bridge Pattern）：将抽象与实现分离，使它们可以独立变化。它是用组合关系代替继承关系来实现的，从而降低了抽象和实现这两个可变维度的耦合度</li>
<li>装饰模式（Decorator Pattern）：动态地给对象增加一些职责，即增加其额外的功能</li>
<li>组合模式（Composite Pattern）：将对象组合成树状层次结构，使用户对单个对象和组合对象具有一致的访问性</li>
<li>外观模式（Facade Pattern）：为多个复杂的子系统提供一个一致的接口，使这些子系统更加容易被访问</li>
<li>享元模式（Flyweight Pattern）：运用共享技术来有效地支持大量细粒度对象的复用</li>
<li>代理模式（Proxy Pattern）：为某对象提供一种代理以控制对该对象的访问。即客户端通过代理间接地访问该对象，从而限制、增强或修改该对象的一些特性</li>
</ul>
<p>以上 7 种结构型模式，除了适配器模式分为类结构型模式和对象结构型模式两种，其他的全部属于对象结构型模式。</p>
<blockquote>
<p>行为型模式（11 种）</p>
</blockquote>
<ul>
<li>模板方法模式（Template Method Pattern）模式：定义一个操作中的算法骨架，将算法的一些步骤延迟到子类中，使得子类在可以不改变该算法结构的情况下重定义该算法的某些特定步骤</li>
<li>命令模式（Command Pattern）：将一个请求封装为一个对象，使发出请求的责任和执行请求的责任分割开</li>
<li>访问者模式（Visitor Pattern）：在不改变集合元素的前提下，为一个集合中的每个元素提供多种访问方式，即每个元素有多个访问者对象访问</li>
<li>迭代器模式（Iterator Pattern）：提供一种方法来顺序访问聚合对象中的一系列数据，而不暴露聚合对象的内部表示</li>
<li>观察者模式（Observer Pattern）：多个对象间存在一对多关系，当一个对象发生改变时，把这种改变通知给其他多个对象，从而影响其他对象的行为</li>
<li>中介者模式（Mediator Pattern）：定义一个中介对象来简化原有对象之间的交互关系，降低系统中对象间的耦合度，使原有对象之间不必相互了解</li>
<li>备忘录模式（Memento Pattern）：在不破坏封装性的前提下，获取并保存一个对象的内部状态，以便以后恢复它</li>
<li>解释器模式（Interpreter Pattern）：提供如何定义语言的文法，以及对语言句子的解释方法，即解释器</li>
<li>状态模式（State Pattern）：允许一个对象在其内部状态发生改变时改变其行为能力</li>
<li>策略模式（Strategy Pattern）：定义了一系列算法，并将每个算法封装起来，使它们可以相互替换，且算法的改变不会影响使用算法的客户</li>
<li>职责链模式（Chain of Responsibility Pattern）：把请求从链中的一个对象传到下一个对象，直到请求被响应为止。通过这种方式去除对象之间的耦合</li>
</ul>
<p>以上 11 种行为型模式，除了模板方法模式和解释器模式是类行为型模式，其他的全部属于对象行为型模式。</p>
</div></template>
