import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as l,c as s,a as i,b as a,d as e,f as o}from"./app-pgelmVnX.js";const g={},S=i("h1",{id:"安全算法-国密算法",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#安全算法-国密算法","aria-hidden":"true"},"#"),a(" 安全算法 - 国密算法")],-1),p=i("blockquote",null,[i("p",null,"国密即国家密码局认定的国产密码算法。主要有SM1，SM2，SM3，SM4，SM7, SM9。")],-1),d=i("h2",{id:"国密算法分类",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#国密算法分类","aria-hidden":"true"},"#"),a(" 国密算法分类")],-1),h={href:"http://openstd.samr.gov.cn/bzgk/gb/",target:"_blank",rel:"noopener noreferrer"},c=o('<ul><li>SM1 <strong>为对称加密</strong>。其加密强度与AES相当。该算法不公开，调用该算法时，需要通过<strong>加密芯片的接口进行调用</strong>。</li><li>SM2 <strong>非对称加密</strong>，基于ECC。该算法已公开。由于该算法基于ECC，故其签名速度与秘钥生成速度都快于RSA。ECC 256位（SM2采用的就是ECC 256位的一种）安全强度比RSA 2048位高，但运算速度快于RSA。</li><li>SM3 <strong>消息摘要</strong>。可以用MD5作为对比理解。该算法已公开。校验结果为256位。</li><li>SM4 无线局域网标准的<strong>分组数据算法</strong>。对称加密，密钥长度和分组长度均为128位。</li><li>SM7 是一种分组密码算法，分组长度为128比特，密钥长度为128比特。SM7适用于非接触式IC卡，应用包括身份识别类应用(门禁卡、工作证、参赛证)，票务类应用(大型赛事门票、展会门票)，支付与通卡类应用（积分消费卡、校园一卡通、企业一卡通等）。</li><li>SM9 不需要申请数字证书，适用于互联网应用的各种新兴应用的安全保障。如基于云技术的密码服务、电子邮件安全、智能终端保护、物联网安全、云存储安全等等。这些安全应用可采用手机号码或邮件地址作为公钥，实现数据加密、身份认证、通话加密、通道加密等安全应用，并具有使用方便，易于部署的特点，从而开启了普及密码算法的大门。</li></ul><h3 id="sm2算法" tabindex="-1"><a class="header-anchor" href="#sm2算法" aria-hidden="true">#</a> SM2算法</h3><blockquote><p>SM2算法：SM2椭圆曲线公钥密码算法是我国自主设计的公钥密码算法，包括SM2-1椭圆曲线数字签名算法，SM2-2椭圆曲线密钥交换协议，SM2-3椭圆曲线公钥加密算法，分别用于实现数字签名密钥协商和数据加密等功能。SM2算法与RSA算法不同的是，SM2算法是基于椭圆曲线上点群离散对数难题，相对于RSA算法，256位的SM2密码强度已经比2048位的RSA密码强度要高。</p></blockquote><p>SM2公钥加密算法比RSA相对复杂，加密结果由3个部分组成，SM2加密过程中使用了随机数，因此同样的明文数据每一次加密结果都不一样。但是这并不能防御重放攻击，如果要防御重放攻击，需要服务端提供加密因子，通过SM2SM4混合算法来抵御重放攻击。</p><p><strong>学习sm2算法，首先学习ECC算法</strong></p><p>ECC算法描述：</p><ul><li>1、用户A选定一条适合加密的椭圆曲线Ep(a,b)(如:y2=x3+ax+b)，并取椭圆曲线上一点，作为基点G。</li><li>2、用户A选择一个私有密钥k，并生成公开密钥（公钥PB）K=kG。</li><li>3、用户A将Ep(a,b)和点（公钥）K，G传给用户B。</li><li>4、用户B接到信息后 ，将待传输的明文（M）编码到Ep(a,b)上一点M，并产生一个随机整数r（r&lt;n）。加密开始</li><li>5、用户B计算点C1=M+rK；C2=rG。</li><li>6、用户B将C1、C2传给用户A。</li><li>7、用户A接到信息后，计算C1-kC2，结果就是点M。因为C1-kC2=M+rK-k(rG)=M+rK-r(kG)=M; 再对点M进行解码就可以得到明文。 　　 密码学中，描述一条Fp上的椭圆曲线，常用到六个参量：T=(p,a,b,G,n,h)。（p 、a 、b 用来确定一条椭圆曲线，G为基点，n为点G的阶，h 是椭圆曲线上所有点的个数m与n相除的整数部分）这几个参量取值的选择，直接影响了加密的安全性。参量值一般要求满足以下几个条件：</li><li>1、p 当然越大越安全，但越大，计算速度会变慢，200位左右可以满足一般安全要求；</li><li>2、p≠n×h；</li><li>3、pt≠1 (mod n)，1≤t&lt;20；</li><li>4、4a3+27b2≠0 (mod p)；</li><li>5、n 为素数；</li><li>6、h≤4。</li></ul><p>所以关于<strong>sm2算法的流程如图</strong></p><figure><img src="https://www.pdai.tech/images/alg/alg-domain-sm-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>SM2算法就是ECC椭圆曲线密码机制，但在签名、密钥交换方面不同于ECDSA、ECDH等国际标准，而是采取了更为安全的机制。另外，SM2推荐了一条256位的曲线作为标准曲线。</p><p>SM2标准包括<strong>总则</strong>，<strong>数字签名算法</strong>，<strong>密钥交换协议</strong>，<strong>公钥加密算法</strong>四个部分，并在每个部分的附录详细说明了实现的相关细节及示例。</p><p>SM2算法主要考虑素域Fp和F2m上的椭圆曲线，分别介绍了这两类域的表示，运算，以及域上的椭圆曲线的点的表示，运算和多倍点计算算法。然后介绍了编程语言中的数据转换，包括整数和字节串，字节串和比特串，域元素和比特串，域元素和整数，点和字节串之间的数据转换规则。</p><p>详细说明了有限域上椭圆曲线的参数生成以及验证，椭圆曲线的参数包括有限域的选取，椭圆曲线方程参数，椭圆曲线群基点的选取等，并给出了选取的标准以便于验证。最后给椭圆曲线上密钥对的生成以及公钥的验证，用户的密钥对为（s，sP），其中s为用户的私钥，sP为用户的公钥，由于离散对数问题从sP难以得到s，并针对素域和二元扩域给出了密钥对生成细节和验证方式。总则中的知识也适用于<strong>SM9算法</strong>。</p><p>在总则的基础上给出了数字签名算法（包括数字签名生成算法和验证算法），密钥交换协议以及公钥加密算法（包括加密算法和解密算法），并在每个部分给出了算法描述，算法流程和相关示例。</p><p>数字签名算法，密钥交换协议以及公钥加密算法都使用了国家密管理局批准的SM3密码杂凑算法和随机数发生器。数字签名算法，密钥交换协议以及公钥加密算法根据总则来选取有限域和椭圆曲线，并生成密钥对。</p><p><strong>SM2算法在很多方面都优于RSA算法</strong>（RSA发展得早应用普遍，SM2领先也很自然），与RSA安全性对比如下图</p><figure><img src="https://www.pdai.tech/images/alg/alg-domain-sm-2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="sm3算法" tabindex="-1"><a class="header-anchor" href="#sm3算法" aria-hidden="true">#</a> SM3算法</h3><blockquote><p>SM3算法：SM3杂凑算法是我国自主设计的密码杂凑算法，适用于商用密码应用中的数字签名和验证消息认证码的生成与验证以及随机数的生成，可满足多种密码应用的安全需求。为了保证杂凑算法的安全性，其产生的杂凑值的长度不应太短，例如MD5输出128比特杂凑值，输出长度太短，影响其安全性SHA-1算法的输出长度为160比特，SM3算法的输出长度为256比特，因此SM3算法的安全性要高于MD5算法和SHA-1算法。</p></blockquote><p>对长度为l(l&lt;2^64)比特的消息m，SM3杂凑算法经过填充和迭代压缩，生成杂凑值，杂凑值长度为256比特。 假设消息m的长度为l比特。首先将比特“1”添加到消息的末尾，再添加k个“0”，k是满足l+1+k448mod512的最小的非负整数。然后再添加一个64位比特串，该比特串是长度l的二进制表示。</p><p>填充后的消息m′的比特长度为512的倍数。</p><p>例如：对消息01100001 01100010 01100011，其长度l=24，经填充得到比特串： 01100001 01100010 01100011 1 00...00（423比特）00...011000（64比特l的二进制表示）</p><p>下面的是实现了SM3的标准输出</p><figure><img src="https://www.pdai.tech/images/alg/alg-domain-sm-3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="sm4算法" tabindex="-1"><a class="header-anchor" href="#sm4算法" aria-hidden="true">#</a> SM4算法</h3><blockquote><p>此算法是一个分组算法，用于无线局域网产品。该算法的分组长度为128比特，密钥长度为128比特。加密算法与密钥扩展算法都采用32轮非线性迭代结构。解密算法与加密算法的结构相同，只是轮密钥的使用顺序相反，解密轮密钥是加密轮密钥的逆序。</p></blockquote><p>此算法采用非线性迭代结构，每次迭代由一个轮函数给出，其中轮函数由一个非线性变换和线性变换复合而成，非线性变换由S盒所给出。其中rki为轮密钥，合成置换T组成轮函数。轮密钥的产生与上图流程类似，由加密密钥作为输入生成，轮函数中的线性变换不同，还有些参数的区别。</p><p>过程:</p><figure><img src="https://www.pdai.tech/images/alg/alg-domain-sm-4.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li><strong>基本运算</strong>：SM4密码算法使用模2加和循环移位作为基本运算。</li><li><strong>基本密码部件</strong>：SM4密码算法使用了S盒、非线性变换τ、线性变换部件L、合成变换T基本密码部件。</li><li><strong>轮函数</strong>：SM4密码算法采用对基本轮函数进行迭代的结构。利用上述基本密码部件，便可构成轮函数。SM4密码算法的轮函数是一种以字为处理单位的密码函数。</li><li><strong>加密算法</strong>：SM4密码算法是一个分组算法。数据分组长度为128比特，密钥长度为128比特。加密算法采用32轮迭代结构，每轮使用一个轮密钥。</li><li><strong>解密算法</strong>：SM4密码算法是对合运算，因此解密算法与加密算法的结构相同，只是轮密铝的使用顺序相反，解密轮密钥是加密轮密钥的逆序。</li><li><strong>密钥扩展算法</strong>：SM4密码算法使用128位的加密密钥，并采用32轮法代加密结构，每一轮加密使用一个32位的轮密钥，共使用32个轮密钥。因此需要使用密钥扩展算法，从加密密钥产生出32个轮密钥。</li><li><strong>SM4的安全性</strong>：SM4密码算法经过我国专业密码机构的充分分析测试，可以抵抗差分攻击、线性攻击等现有攻击，因此是安全的。</li></ul><p>SM4实例:</p><figure><img src="https://www.pdai.tech/images/alg/alg-domain-sm-5.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="sm7算法" tabindex="-1"><a class="header-anchor" href="#sm7算法" aria-hidden="true">#</a> SM7算法</h3><p>SM7算法，是一种分组密码算法，分组长度为128比特，密钥长度为128比特。SM7适用于非接触式IC卡，应用包括身份识别类应用(门禁卡、工作证、参赛证)，票务类应用(大型赛事门票、展会门票)，支付与通卡类应用（积分消费卡、校园一卡通、企业一卡通等）。</p><h3 id="sm9算法" tabindex="-1"><a class="header-anchor" href="#sm9算法" aria-hidden="true">#</a> SM9算法</h3><p>为了降低公开密钥系统中密钥和证书管理的复杂性，以色列科学家、RSA算法发明人之一Adi Shamir在1984年提出了标识密码（Identity-Based Cryptography）的理念。标识密码将用户的标识（如邮件地址、手机号码、QQ号码等）作为公钥，省略了交换数字证书和公钥过程，使得安全系统变得易于部署和管理，非常适合端对端离线安全通讯、云端数据加密、基于属性加密、基于策略加密的各种场合。2008年标识密码算法正式获得国家密码管理局颁发的商密算法型号：SM9(商密九号算法)，为我国标识密码技术的应用奠定了坚实的基础。</p><p>SM9算法不需要申请数字证书，适用于互联网应用的各种新兴应用的安全保障。如基于云技术的密码服务、电子邮件安全、智能终端保护、物联网安全、云存储安全等等。这些安全应用可采用手机号码或邮件地址作为公钥，实现数据加密、身份认证、通话加密、通道加密等安全应用，并具有使用方便，易于部署的特点，从而开启了普及密码算法的大门。</p><h2 id="相关工具" tabindex="-1"><a class="header-anchor" href="#相关工具" aria-hidden="true">#</a> 相关工具</h2><h3 id="gmssl" tabindex="-1"><a class="header-anchor" href="#gmssl" aria-hidden="true">#</a> GmSSL</h3><p>GmSSL是一个开源的密码工具箱，支持SM2/SM3/SM4/SM9等国密(国家商用密码)算法、SM2国密数字证书及基于SM2证书的SSL/TLS安全通信协议，支持国密硬件密码设备，提供符合国密规范的编程接口与命令行工具，可以用于构建PKI/CA、安全通信、数据加密等符合国密标准的安全应用。GmSSL项目是OpenSSL项目的分支，并与OpenSSL保持接口兼容。因此GmSSL可以替代应用中的OpenSSL组件，并使应用自动具备基于国密的安全能力。GmSSL项目采用对商业应用友好的类BSD开源许可证，开源且可以用于闭源的商业应用。GmSSL项目由北京大学关志副研究员的密码学研究组开发维护，项目源码托管于GitHub。自2014年发布以来，GmSSL已经在多个项目和产品中获得部署与应用，并获得2015年度“一铭杯”中国Linux软件大赛二等奖(年度最高奖项)与开源中国密码类推荐项目。GmSSL项目的核心目标是通过开源的密码技术推动国内网络空间安全建设。</p><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>',41),m=i("li",null,"《科普一下SM系列国密算法（从零开始学区块链）》",-1),M={href:"https://blog.csdn.net/qq_33430322/article/details/106687662",target:"_blank",rel:"noopener noreferrer"};function u(f,b){const t=r("ExternalLinkIcon");return l(),s("div",null,[S,p,d,i("blockquote",null,[i("p",null,[a("国家标准官方网站如下："),i("a",h,[a("http://openstd.samr.gov.cn/bzgk/gb/"),e(t)])])]),c,i("ul",null,[m,i("li",null,[i("a",M,[a("https://blog.csdn.net/qq_33430322/article/details/106687662"),e(t)])])])])}const k=n(g,[["render",u],["__file","alg-domain-security-sm.html.vue"]]);export{k as default};
