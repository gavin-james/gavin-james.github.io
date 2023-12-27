import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as t,c as l,a,b as e,d as s,f as d}from"./app-pgelmVnX.js";const o={},c=d(`<h1 id="负载均衡算法-汇总" tabindex="-1"><a class="header-anchor" href="#负载均衡算法-汇总" aria-hidden="true">#</a> 负载均衡算法 - 汇总</h1><blockquote><p>本文主要介绍常用的负载均衡算法和Nginx中支持的负载均衡算法。</p></blockquote><h2 id="常见的负载均衡算法" tabindex="-1"><a class="header-anchor" href="#常见的负载均衡算法" aria-hidden="true">#</a> 常见的负载均衡算法</h2><p>常见的负载均衡算法包含:</p><ul><li>轮询法(Round Robin)</li><li>加权轮询法(Weight Round Robin)</li><li>平滑加权轮询法(Smooth Weight Round Robin)</li><li>随机法(Random)</li><li>加权随机法(Weight Random)</li><li>源地址哈希法(Hash)</li><li>最小连接数法(Least Connections)</li></ul><h3 id="轮询法-round-robin" tabindex="-1"><a class="header-anchor" href="#轮询法-round-robin" aria-hidden="true">#</a> 轮询法(Round Robin)</h3><p>将请求按顺序轮流地分配到后端服务器上，它均衡地对待后端的每一台服务器，而不关心服务器实际的连接数和当前的系统负载。</p><h3 id="加权轮询法-weight-round-robin" tabindex="-1"><a class="header-anchor" href="#加权轮询法-weight-round-robin" aria-hidden="true">#</a> 加权轮询法(Weight Round Robin)</h3><p>不同的后端服务器可能机器的配置和当前系统的负载并不相同，因此它们的抗压能力也不相同。给配置高、负载低的机器配置更高的权重，让其处理更多的请；而配置低、负载高的机器，给其分配较低的权重，降低其系统负载，加权轮询能很好地处理这一问题，并将请求顺序且按照权重分配到后端。</p><h3 id="随机法-random" tabindex="-1"><a class="header-anchor" href="#随机法-random" aria-hidden="true">#</a> 随机法(Random)</h3><p>通过系统的随机算法，根据后端服务器的列表大小值来随机选取其中的一台服务器进行访问。由概率统计理论可以得知，随着客户端调用服务端的次数增多，其实际效果越来越接近于平均分配调用量到后端的每一台服务器，也就是轮询的结果。</p><h3 id="加权随机法-weight-random" tabindex="-1"><a class="header-anchor" href="#加权随机法-weight-random" aria-hidden="true">#</a> 加权随机法(Weight Random)</h3><p>与加权轮询法一样，加权随机法也根据后端机器的配置，系统的负载分配不同的权重。不同的是，它是按照权重随机请求后端服务器，而非顺序。</p><h3 id="源地址哈希法-hash" tabindex="-1"><a class="header-anchor" href="#源地址哈希法-hash" aria-hidden="true">#</a> 源地址哈希法(Hash)</h3><p>源地址哈希的思想是根据获取客户端的IP地址，通过哈希函数计算得到的一个数值，用该数值对服务器列表的大小进行取模运算，得到的结果便是客服端要访问服务器的序号。采用源地址哈希法进行负载均衡，同一IP地址的客户端，当后端服务器列表不变时，它每次都会映射到同一台后端服务器进行访问。</p><h3 id="最小连接数法-least-connections" tabindex="-1"><a class="header-anchor" href="#最小连接数法-least-connections" aria-hidden="true">#</a> 最小连接数法(Least Connections)</h3><p>最小连接数算法比较灵活和智能，由于后端服务器的配置不尽相同，对于请求的处理有快有慢，它是根据后端服务器当前的连接情况，动态地选取其中当前积压连接数最少的一台服务器来处理当前的请求，尽可能地提高后端服务的利用效率，将负责合理地分流到每一台服务器。</p><h2 id="nginx的5种负载均衡算法" tabindex="-1"><a class="header-anchor" href="#nginx的5种负载均衡算法" aria-hidden="true">#</a> Nginx的5种负载均衡算法</h2><h3 id="轮询法-round-robin-默认" tabindex="-1"><a class="header-anchor" href="#轮询法-round-robin-默认" aria-hidden="true">#</a> 轮询法(Round Robin)(默认)</h3><p>每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。</p><h3 id="加权轮询法-weight-round-robin-weight" tabindex="-1"><a class="header-anchor" href="#加权轮询法-weight-round-robin-weight" aria-hidden="true">#</a> 加权轮询法(Weight Round Robin)- weight</h3><p>指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况。</p><p>例如:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>upstream bakend <span class="token punctuation">{</span>  
  server <span class="token number">192.168</span>.0.14 <span class="token assign-left variable">weight</span><span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">;</span>  
  server <span class="token number">192.168</span>.0.15 <span class="token assign-left variable">weight</span><span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">;</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="源地址哈希法-hash-ip-hash" tabindex="-1"><a class="header-anchor" href="#源地址哈希法-hash-ip-hash" aria-hidden="true">#</a> 源地址哈希法(Hash)- ip_hash</h3><p>每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。</p><p>例如:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>upstream bakend <span class="token punctuation">{</span>  
  ip_hash<span class="token punctuation">;</span>  
  server <span class="token number">192.168</span>.0.14:88<span class="token punctuation">;</span>  
  server <span class="token number">192.168</span>.0.15:80<span class="token punctuation">;</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fair-第三方" tabindex="-1"><a class="header-anchor" href="#fair-第三方" aria-hidden="true">#</a> fair(第三方)</h3><p>按后端服务器的响应时间来分配请求，响应时间短的优先分配。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>upstream backend <span class="token punctuation">{</span>  
  server server1<span class="token punctuation">;</span>  
  server server2<span class="token punctuation">;</span>  
  fair<span class="token punctuation">;</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="url-hash-第三方" tabindex="-1"><a class="header-anchor" href="#url-hash-第三方" aria-hidden="true">#</a> url_hash(第三方)</h3><p>按访问url的hash结果来分配请求，使每个url定向到同一个后端服务器，后端服务器为缓存时比较有效。</p><p>例: 在upstream中加入hash语句，server语句中不能写入weight等其他的参数，hash_method是使用的hash算法。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>upstream backend <span class="token punctuation">{</span>  
  server squid1:3128<span class="token punctuation">;</span>  
  server squid2:3128<span class="token punctuation">;</span>  
  <span class="token builtin class-name">hash</span> <span class="token variable">$request_uri</span><span class="token punctuation">;</span>  
  hash_method crc32<span class="token punctuation">;</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>tips:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>upstream bakend<span class="token punctuation">{</span>#定义负载均衡设备的Ip及设备状态  
  ip_hash<span class="token punctuation">;</span>  
  server <span class="token number">127.0</span>.0.1:9090 down<span class="token punctuation">;</span>  
  server <span class="token number">127.0</span>.0.1:8080 <span class="token assign-left variable">weight</span><span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">;</span>  
  server <span class="token number">127.0</span>.0.1:6060<span class="token punctuation">;</span>  
  server <span class="token number">127.0</span>.0.1:7070 backup<span class="token punctuation">;</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在需要使用负载均衡的server中增加</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>proxy_pass http://bakend/<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>每个设备的状态设置为:</p><ul><li>down 表示单前的server暂时不参与负载</li><li>weight 默认为1.weight越大，负载的权重就越大。</li><li>max_fails : 允许请求失败的次数默认为1.当超过最大次数时，返回proxy_next_upstream 模块定义的错误</li><li>fail_timeout:max_fails次失败后，暂停的时间。</li><li>backup: 其它所有的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻。</li></ul><p>nginx支持同时设置多组的负载均衡，用来给不用的server来使用。</p><ul><li>client_body_in_file_only: 设置为On，可以讲client post过来的数据记录到文件中用来做debug。</li><li>client_body_temp_path: 设置记录文件的目录，可以设置最多3层目录。</li><li>location: 对URL进行匹配，可以进行重定向或者进行新的代理，负载均衡。</li></ul><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,44),p={href:"https://blog.csdn.net/youanyyou/article/details/78990133",target:"_blank",rel:"noopener noreferrer"},u={href:"https://blog.csdn.net/claram/article/details/90265243",target:"_blank",rel:"noopener noreferrer"};function h(b,v){const n=r("ExternalLinkIcon");return t(),l("div",null,[c,a("ul",null,[a("li",null,[a("a",p,[e("https://blog.csdn.net/youanyyou/article/details/78990133"),s(n)])]),a("li",null,[a("a",u,[e("https://blog.csdn.net/claram/article/details/90265243"),s(n)])])])])}const g=i(o,[["render",h],["__file","alg-domain-load-balance.html.vue"]]);export{g as default};
