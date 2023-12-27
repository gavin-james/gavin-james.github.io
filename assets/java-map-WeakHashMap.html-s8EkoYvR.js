import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as t,c as s,a as e,b as a,d as r,f as o}from"./app-pgelmVnX.js";const d={},c=o(`<h1 id="map-weakhashmap源码解析" tabindex="-1"><a class="header-anchor" href="#map-weakhashmap源码解析" aria-hidden="true">#</a> Map - WeakHashMap源码解析</h1><blockquote><p>本文主要对Map - WeakHashMap源码解析 源码解析。</p></blockquote><h2 id="java-7-weakhashmap" tabindex="-1"><a class="header-anchor" href="#java-7-weakhashmap" aria-hidden="true">#</a> Java 7- WeakHashMap</h2><h3 id="总体介绍" tabindex="-1"><a class="header-anchor" href="#总体介绍" aria-hidden="true">#</a> 总体介绍</h3><p>在Java集合框架系列文章的最后，笔者打算介绍一个特殊的成员: <em>WeakHashMap</em>，从名字可以看出它是某种 <em>Map</em>。它的特殊之处在于 <em>WeakHashMap</em> 里的<code>entry</code>可能会被GC自动删除，即使程序员没有调用<code>remove()</code>或者<code>clear()</code>方法。</p><p>更直观的说，当使用 <em>WeakHashMap</em> 时，即使没有显示的添加或删除任何元素，也可能发生如下情况:</p><blockquote><ul><li>调用两次<code>size()</code>方法返回不同的值；</li><li>两次调用<code>isEmpty()</code>方法，第一次返回<code>false</code>，第二次返回<code>true</code>；</li><li>两次调用<code>containsKey()</code>方法，第一次返回<code>true</code>，第二次返回<code>false</code>，尽管两次使用的是同一个<code>key</code>；</li><li>两次调用<code>get()</code>方法，第一次返回一个<code>value</code>，第二次返回<code>null</code>，尽管两次使用的是同一个对象。</li></ul></blockquote><p>遇到这么奇葩的现象，你是不是觉得使用者一定会疯掉? 其实不然，*<strong>WeakHashMap* 的这个特点特别适用于需要缓存的场景</strong>。在缓存场景下，由于内存是有限的，不能缓存所有对象；对象缓存命中可以提高系统效率，但缓存MISS也不会造成错误，因为可以通过计算重新得到。</p><p>要明白 <em>WeakHashMap</em> 的工作原理，还需要引入一个概念 : <strong>弱引用(WeakReference)</strong>。我们都知道Java中内存是通过GC自动管理的，GC会在程序运行过程中自动判断哪些对象是可以被回收的，并在合适的时机进行内存释放。GC判断某个对象是否可被回收的依据是，<strong>是否有有效的引用指向该对象</strong>。如果没有有效引用指向该对象(基本意味着不存在访问该对象的方式)，那么该对象就是可回收的。这里的<strong>有效引用</strong> 并不包括<strong>弱引用</strong>。也就是说，<strong>虽然弱引用可以用来访问对象，但进行垃圾回收时弱引用并不会被考虑在内，仅有弱引用指向的对象仍然会被GC回收</strong>。</p><p><em>WeakHashMap</em> 内部是通过弱引用来管理<code>entry</code>的，弱引用的特性对应到 <em>WeakHashMap</em> 上意味着什么呢？<strong>将一对<code>key, value</code>放入到 *WeakHashMap* 里并不能避免该<code>key</code>值被GC回收，除非在 *WeakHashMap* 之外还有对该<code>key</code>的强引用</strong>。</p><p>关于强引用，弱引用等概念以后再具体讲解，这里只需要知道Java中引用也是分种类的，并且不同种类的引用对GC的影响不同就够了。</p><h3 id="具体实现" tabindex="-1"><a class="header-anchor" href="#具体实现" aria-hidden="true">#</a> 具体实现</h3><p>WeakHashMap的存储结构类似于<a href="">Map - HashSet &amp; HashMap 源码解析</a>，这里不再赘述。</p><p>关于强弱引用的管理方式，博主将会另开专题单独讲解。</p><h3 id="weak-hashset" tabindex="-1"><a class="header-anchor" href="#weak-hashset" aria-hidden="true">#</a> Weak HashSet?</h3><p>如果你看过前几篇关于 <em>Map</em> 和 <em>Set</em> 的讲解，一定会问: 既然有 <em>WeakHashMap</em>，是否有 <em>WeekHashSet</em> 呢? 答案是没有:( 。不过Java <em>Collections</em>工具类给出了解决方案，<code>Collections.newSetFromMap(Map&lt;E,Boolean&gt; map)</code>方法可以将任何 <em>Map</em>包装成一个<em>Set</em>。通过如下方式可以快速得到一个 <em>Weak HashSet</em>:</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>// 将WeakHashMap包装成一个Set
Set&lt;Object&gt; weakHashSet = Collections.newSetFromMap(
        new WeakHashMap&lt;Object, Boolean&gt;());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不出你所料，<code>newSetFromMap()</code>方法只是对传入的 <em>Map</em>做了简单包装:</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>// Collections.newSetFromMap()用于将任何Map包装成一个Set
public static &lt;E&gt; Set&lt;E&gt; newSetFromMap(Map&lt;E, Boolean&gt; map) {
    return new SetFromMap&lt;&gt;(map);
}

private static class SetFromMap&lt;E&gt; extends AbstractSet&lt;E&gt;
    implements Set&lt;E&gt;, Serializable
{
    private final Map&lt;E, Boolean&gt; m;  // The backing map
    private transient Set&lt;E&gt; s;       // Its keySet
    SetFromMap(Map&lt;E, Boolean&gt; map) {
        if (!map.isEmpty())
            throw new IllegalArgumentException(&quot;Map is non-empty&quot;);
        m = map;
        s = map.keySet();
    }
    public void clear()               {        m.clear(); }
    public int size()                 { return m.size(); }
    public boolean isEmpty()          { return m.isEmpty(); }
    public boolean contains(Object o) { return m.containsKey(o); }
    public boolean remove(Object o)   { return m.remove(o) != null; }
    public boolean add(E e) { return m.put(e, Boolean.TRUE) == null; }
    public Iterator&lt;E&gt; iterator()     { return s.iterator(); }
    public Object[] toArray()         { return s.toArray(); }
    public &lt;T&gt; T[] toArray(T[] a)     { return s.toArray(a); }
    public String toString()          { return s.toString(); }
    public int hashCode()             { return s.hashCode(); }
    public boolean equals(Object o)   { return o == this || s.equals(o); }
    public boolean containsAll(Collection&lt;?&gt; c) {return s.containsAll(c);}
    public boolean removeAll(Collection&lt;?&gt; c)   {return s.removeAll(c);}
    public boolean retainAll(Collection&lt;?&gt; c)   {return s.retainAll(c);}
    // addAll is the only inherited implementation
    ......
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h3>`,20),m={href:"https://www.cnblogs.com/CarpenterLee/p/5544598.html",target:"_blank",rel:"noopener noreferrer"};function p(u,v){const n=l("ExternalLinkIcon");return t(),s("div",null,[c,e("ul",null,[e("li",null,[a("浅谈WeakHashMap "),e("a",m,[a("https://www.cnblogs.com/CarpenterLee/p/5544598.html"),r(n)])])])])}const g=i(d,[["render",p],["__file","java-map-WeakHashMap.html.vue"]]);export{g as default};
