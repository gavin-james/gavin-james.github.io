---
date: 2019-07-28
category:
  - 算法和数据结构
tag:
  - 领域算法
---
# 大数据处理 - Bitmap & Bloom Filter 

> 布隆过滤器有着广泛的应用，对于大量数据的“存不存在”的问题在空间上有明显优势，但是在判断存不存在是有一定的错误率(false positive)，也就是说，有可能把不属于这个集合的元素误认为属于这个集合(False Positive)，但不会把属于这个集合的元素误认为不属于这个集合(False Negative)。

## 布隆过滤器由来

布隆在1970年提出了布隆过滤器(Bloom Filter)，是一个很长的二进制向量(可以想象成一个序列)和一系列随机映射函数(hash function)。可用于判断一个元素是否在一个集合中，查询效率很高(1-N，最优能逼近于1)。通常应用在一些需要快速判断某个元素是否属于集合，但是并不严格要求100%正确的场合。

### 特点

- `优点`: 占用空间小，查询快
- `缺点`: 有误判，删除困难

### 几个专业术语

这里有必要介绍一下`False Positive`和`False Negative`的概念:

- `False Positive`: 中文可以理解为“假阳性”，在这里表示，有可能把不属于这个集合的元素误认为属于这个集合
- `False Negative`: 中文可以理解为“假阴性”，Bloom Filter是不存在false negatived的， 即不会把属于这个集合的元素误认为不属于这个集合(False Negative)。

## 布隆过滤器应用场景

- `网页爬虫对URL的去重`: 避免爬取相同的URL地址；
- `反垃圾邮件`: 假设邮件服务器通过发送方的邮件域或者IP地址对垃圾邮件进行过滤，那么就需要判断当前的邮件域或者IP地址是否处于黑名单之中。如果邮件服务器的通信邮件数量非常大(也可以认为数据量级上亿)，那么也可以使用Bloom Filter算法；
- `缓存击穿`: 将已存在的缓存放到布隆中，当黑客访问不存在的缓存时迅速返回避免缓存及DB挂掉；
- `HTTP缓存服务器`: 当本地局域网中的PC发起一条HTTP请求时，缓存服务器会先查看一下这个URL是否已经存在于缓存之中，如果存在的话就没有必要去原始的服务器拉取数据了(为了简单起见，我们假设数据没有发生变化)，这样既能节省流量，还能加快访问速度，以提高用户体验。
- `黑/白名单`: 类似反垃圾邮件。
- `Bigtable`: Google 著名的分布式数据库 Bigtable 使用了布隆过滤器来查找不存在的行或列，以减少磁盘查找的IO次数。
- `Squid`: 网页代理缓存服务器在 cachedigests 中使用了也布隆过滤器。
- `Venti 文档存储系统`: 也采用布隆过滤器来检测先前存储的数据。
- `SPIN 模型检测器`: 也使用布隆过滤器在大规模验证问题时跟踪可达状态空间。
- `Chrome加速安全浏览`: Google Chrome浏览器使用了布隆过滤器加速安全浏览服务。
- `Key-Value系统`: 在很多Key-Value系统中也使用了布隆过滤器来加快查询过程，如 Hbase，Accumulo，Leveldb，一般而言，Value 保存在磁盘中，访问磁盘需要花费大量时间，然而使用布隆过滤器可以快速判断某个Key对应的Value是否存在，因此可以避免很多不必要的磁盘IO操作，只是引入布隆过滤器会带来一定的内存消耗。
- `HTTP Proxy-Cache`: 在Internet Cache Protocol中的Proxy-Cache很多都是使用Bloom Filter存储URLs，除了高效的查询外，还能很方便得传输交换Cache信息。
- `网络应用`: P2P网络中查找资源操作，可以对每条网络通路保存Bloom Filter，当命中时，则选择该通路访问。广播消息时，可以检测某个IP是否已发包。检测广播消息包的环路，将Bloom Filter保存在包里，每个节点将自己添加入Bloom Filter。信息队列管理，使用Counter Bloom Filter管理信息流量。

## 布隆过滤器实现

Bloom Filter在很多开源框架都有实现，例如:

- `Elasticsearch`: org.elasticsearch.common.util.BloomFilter
- `guava`: com.google.common.hash.BloomFilter
- `Hadoop`: org.apache.hadoop.util.bloom.BloomFilter(基于BitSet实现)

### 以BitSet 实现方式为例

创建一个m位BitSet，先将所有位初始化为0，然后选择k个不同的哈希函数。第i个哈希函数对字符串str哈希的结果记为h(i，str)，且h(i，str)的范围是0到m-1 。

- 加入字符串过程

下面是每个字符串处理的过程，首先是将字符串str“记录”到BitSet中的过程: 对于字符串str，分别计算h(1，str)，h(2，str)…… h(k，str)。然后将BitSet的第h(1，str)、h(2，str)…… h(k，str)位设为1。

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-0.png)

这样就将字符串str映射到BitSet中的k个二进制位了。

- 检查字符串是否存在的过程

下面是检查字符串str是否被BitSet记录过的过程: 对于字符串str，分别计算h(1，str)，h(2，str)…… h(k，str)。然后检查BitSet的第h(1，str)、h(2，str)…… h(k，str)位是否为1，若其中任何一位不为1则可以判定str一定没有被记录过。若全部位都是1，则“认为”字符串str存在。 若一个字符串对应的Bit不全为1，则可以肯定该字符串一定没有被Bloom Filter记录过。(这是显然的，因为字符串被记录过，其对应的二进制位肯定全部被设为1了)

### 以BitSet 实现代码

```java
package algorithm;
import java.util.BitSet;
public class BloomFilter
{
    /* BitSet初始分配2^24个bit */
    private static final int DEFAULT_SIZE = 1 << 25;
    /* 不同哈希函数的种子，一般应取质数 */
    private static final int[] seeds = new int[]{ 5, 7, 11, 13, 31, 37, 61 };
    private BitSet bits = new BitSet(DEFAULT_SIZE);
    /* 哈希函数对象 */
    private SimpleHash[] func = new SimpleHash[seeds.length];
 
    public BloomFilter()
    {
        for (int i = 0; i < seeds.length; i++)
        {
            func[i] = new SimpleHash(DEFAULT_SIZE, seeds[i]);
        }
    }
 
    // 将字符串标记到bits中
    public void add(String value)
    {
        for (SimpleHash f : func)
        {
            bits.set(f.hash(value), true);
        }
    }
 
    // 判断字符串是否已经被bits标记
    public boolean contains(String value)
    {
        if (value == null)
        {
            return false;
        }
        boolean ret = true;
        for (SimpleHash f : func)
        {
            ret = ret && bits.get(f.hash(value));
        }
        return ret;
    }
 
    /* 哈希函数类 */
    public static class SimpleHash
    {
        private int cap;
        private int seed;
 
        public SimpleHash(int cap, int seed)
        {
            this.cap = cap;
            this.seed = seed;
        }
 
        // hash函数，采用简单的加权和hash
        public int hash(String value)
        {
            int result = 0;
            int len = value.length();
            for (int i = 0; i < len; i++)
            {
                result = seed * result + value.charAt(i);
            }
            return (cap - 1) & result;
        }
    }
}
```

## 误报率 - False Positive Rate

### 误报率的产生

初始状态下，Bloom Filter是一个m位的位数组，且数组被0所填充。同时，我们需要定义k个不同的hash函数，每一个hash函数都随机的将每一个输入元素映射到位数组中的一个位上。那么对于一个确定的输入，我们会得到k个索引。

插入元素: 经过k个hash函数的映射，我们会得到k个索引，我们把位数组中这k个位置全部置1(不管其中的位之前是0还是1)

查询元素: 输入元素经过k个hash函数的映射会得到k个索引，如果位数组中这k个索引任意一处是0，那么就说明这个元素不在集合之中；如果元素处于集合之中，那么当插入元素的时候这k个位都是1。但如果这k个索引处的位都是1，被查询的元素就一定在集合之中吗? 答案是不一定，也就是说出现了False Positive的情况(但Bloom Filter不会出现False Negative的情况)

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-1.png)

在上图中，当插入x、y、z这三个元素之后，再来查询w，会发现w不在集合之中，而如果w经过三个hash函数计算得出的结果所得索引处的位全是1，那么Bloom Filter就会告诉你，w在集合之中，实际上这里是误报，w并不在集合之中。

### 误报率的计算

Bloom Filter的误报率到底有多大? 下面在数学上进行一番推敲。假设HASH函数输出的索引值落在m位的数组上的每一位上都是等可能的。那么，对于一个给定的HASH函数，在进行某一个运算的时候，一个特定的位没有被设置为1的概率是

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-a-1.png)

那么，对于所有的k个HASH函数，都没有把这个位设置为1的概率是

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-a-2.png)

如果我们已经插入了n个元素，那么对于一个给定的位，这个位仍然是0的概率是

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-a-3.png)

那么，如果插入n个元素之后，这个位是1的概率是

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-a-4.png)

如果对一个特定的元素存在误报，那么这个元素的经过HASH函数所得到的k个索引全部都是1，概率也就是

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-a-5.png)

根据常数e的定义，可以近似的表示为:

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-a-6.png)

### 减少误报率: 最优的哈希函数个数

既然Bloom Filter要靠多个哈希函数将集合映射到位数组中，那么应该选择几个哈希函数才能使元素查询时的错误率降到最低呢? 这里有两个互斥的理由: 如果哈希函数的个数多，那么在对一个不属于集合的元素进行查询时得到0的概率就大；但另一方面，如果哈希函数的个数少，那么位数组中的0就多。为了得到最优的哈希函数个数，我们需要根据上一小节中的错误率公式进行计算。

先用p和f进行计算。注意到f = exp(k ln(1 − e−kn/m))，我们令g = k ln(1 − e−kn/m)，只要让g取到最小，f自然也取到最小。由于p = e-kn/m，我们可以将g写成

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-b-1.png)

根据对称性法则可以很容易看出当p = 1/2，也就是k = ln2· (m/n)时，g取得最小值。在这种情况下，最小错误率f等于(1/2)k ≈ (0.6185)m/n。另外，注意到p是位数组中某一位仍是0的概率，所以p = 1/2对应着位数组中0和1各一半。换句话说，要想保持错误率低，最好让位数组有一半还空着。

需要强调的一点是，p = 1/2时错误率最小这个结果并不依赖于近似值p和f。同样对于f’ = exp(k ln(1 − (1 − 1/m)kn))，g’ = k ln(1 − (1 − 1/m)kn)，p’ = (1 − 1/m)kn，我们可以将g’写成

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-b-2.png)

同样根据对称性法则可以得到当p’ = 1/2时，g’取得最小值。

### 减少误报率: 位数组的大小

在不超过一定错误率的情况下，Bloom Filter至少需要多少位才能表示全集中任意n个元素的集合? 假设全集中共有u个元素，允许的最大错误率为є，下面我们来求位数组的位数m。

假设X为全集中任取n个元素的集合，F(X)是表示X的位数组。那么对于集合X中任意一个元素x，在s = F(X)中查询x都能得到肯定的结果，即s能够接受x。显然，由于Bloom Filter引入了错误，s能够接受的不仅仅是X中的元素，它还能够є (u - n)个false positive。因此，对于一个确定的位数组来说，它能够接受总共n + є (u - n)个元素。在n + є (u - n)个元素中，s真正表示的只有其中n个，所以一个确定的位数组可以表示

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-c-1.png)

个集合。m位的位数组共有2m个不同的组合，进而可以推出，m位的位数组可以表示

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-c-2.png)

个集合。全集中n个元素的集合总共有

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-c-3.png)

个，因此要让m位的位数组能够表示所有n个元素的集合，必须有

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-c-4.png)

即:

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-c-5.png)

上式中的近似前提是n和єu相比很小，这也是实际情况中常常发生的。根据上式，我们得出结论: 在错误率不大于є的情况下，m至少要等于n log2(1/є)才能表示任意n个元素的集合。

上一小节中我们曾算出当k = ln2· (m/n)时错误率f最小，这时f = (1/2)k = (1/2)mln2 / n。现在令f≤є，可以推出

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-c-6.png)

这个结果比前面我们算得的下界n log2(1/є)大了log2 e ≈ 1.44倍。这说明在哈希函数的个数取到最优时，要让错误率不超过є，m至少需要取到最小值的1.44倍。

## 拓展: Counting Bloom Filter

从前面对Bloom Filter的介绍可以看出，标准的Bloom Filter是一种很简单的数据结构，它只支持插入和查找两种操作。在所要表达的集合是静态集合的时候，标准Bloom Filter可以很好地工作，但是如果要表达的集合经常变动，标准Bloom Filter的弊端就显现出来了，因为它不支持删除操作。

Counting Bloom Filter的出现解决了这个问题，它将标准Bloom Filter位数组的每一位扩展为一个小的计数器(Counter)，在插入元素时给对应的k(k为哈希函数个数)个Counter的值分别加1，删除元素时给对应的k个Counter的值分别减1。Counting Bloom Filter通过多占用几倍的存储空间的代价，给Bloom Filter增加了删除操作。下一个问题自然就是，到底要多占用几倍呢?

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-d-1.png)

我们先计算第i个Counter被增加j次的概率，其中n为集合元素个数，k为哈希函数个数，m为Counter个数(对应着原来位数组的大小):

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-d-2.png)

上面等式右端的表达式中，前一部分表示从nk次哈希中选择j次，中间部分表示j次哈希都选中了第i个Counter，后一部分表示其它nk – j次哈希都没有选中第i个Counter。因此，第i个Counter的值大于j的概率可以限定为:

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-d-3.png)

上式第二步缩放中应用了估计阶乘的斯特林公式:

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-d-4.png)

在Bloom Filter概念和原理一文中，我们提到过k的最优值为(ln2)m/n，现在我们限制k ≤ (ln2)m/n，就可以得到如下结论:

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-d-5.png)

如果每个Counter分配4位，那么当Counter的值达到16时就会溢出。这个概率为:

![img](https://www.pdai.tech/images/alg/alg-dst-bloomfilter-d-6.png)

这个值足够小，因此对于大多数应用程序来说，4位就足够了。

## 拓展: 其它

### Data synchronization

Byers等人提出了使用布隆过滤器近似数据同步。

### Bloomier filters

Chazelle 等人提出了一个通用的布隆过滤器，该布隆过滤器可以将某一值与每个已经插入的元素关联起来，并实现了一个关联数组Map。与普通的布隆过滤器一样，Chazelle实现的布隆过滤器也可以达到较低的空间消耗，但同时也会产生false positive，不过，在Bloomier filter中，某 key 如果不在 map 中，falsepositive在会返回时会被定义出的。该Map 结构不会返回与 key 相关的在 map 中的错误的值。

### Compact approximators

### Stable Bloom filters

### Scalable Bloom filters

### Attenuated Bloom filters

## 相关题目

### 给你A,B两个文件，各存放50亿条URL，每条URL占用64字节，内存限制是4G，让你找出A,B文件共同的URL。如果是三个乃至n个文件呢?

根据这个问题我们来计算下内存的占用，4G=2^32大概是40亿*8大概是340亿，n=50亿，如果按出错率0.01算需要的大概是650亿个bit。现在可用的是340亿，相差并不多，这样可能会使出错率上升些。另外如果这些urlip是一一对应的，就可以转换成ip，则大大简单了。

### 给定a、b两个文件，各存放50亿个url，每个url各占64字节，内存限制是4G，让你找出a、b文件共同的url?

如果允许有一定的错误率，可以使用Bloom filter，4G内存大概可以表示340亿bit。将其中一个文件中的url使用Bloom filter映射为这340亿bit，然后挨个读取另外一个文件的url，检查是否与Bloom filter，如果是，那么该url应该是共同的url(注意会有一定的错误率)。”

### 在2.5亿个整数中找出不重复的整数，注，内存不足以容纳这2.5亿个整数。

`方案1`: 采用2-Bitmap(每个数分配2bit，00表示不存在，01表示出现一次，10表示多次，11无意义)进行，共需内存2^32 * 2 bit=1 GB内存，还可以接受。然后扫描这2.5亿个整数，查看Bitmap中相对应位，如果是00变01，01变10，10保持不变。所描完事后，查看bitmap，把对应位是01的整数输出即可。

`方案2`: 也可采用分治，划分小文件的方法。然后在小文件中找出不重复的整数，并排序。然后再进行归并，注意去除重复的元素。

### 给40亿个不重复的unsigned int的整数，没排过序的，然后再给一个数，如何快速判断这个数是否在那40亿个数当中?

用位图/Bitmap的方法，申请512M的内存，一个bit位代表一个unsigned int值。读入40亿个数，设置相应的bit位，读入要查询的数，查看相应bit位是否为1，为1表示存在，为0表示不存在。

## 参考文章

- https://my.oschina.net/kiwivip/blog/133498
- https://blog.csdn.net/h348592532/article/details/45364147
- https://blog.csdn.net/h348592532/article/details/45362661
- https://blog.csdn.net/qianshangding0708/article/details/48030057
- https://blog.csdn.net/xf_87/article/details/51073678
- https://blog.csdn.net/weixin_34082695/article/details/90331258
- https://blog.csdn.net/v_JULY_v/article/details/7382693
