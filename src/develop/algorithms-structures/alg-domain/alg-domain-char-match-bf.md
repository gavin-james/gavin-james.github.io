---
date: 2019-07-22
category:
  - 算法和数据结构
tag:
  - 领域算法
---
# 字符串匹配 - 模式预处理：朴素算法（Naive)(暴力破解) 

> 朴素的字符串匹配算法又称为**暴力匹配算法**（Brute Force Algorithm），最为简单的字符串匹配算法。 

## 算法简介

> 朴素的字符串匹配算法又称为暴力匹配算法（Brute Force Algorithm），它的主要特点是：

- 没有预处理阶段；
- 滑动窗口总是后移 1 位；
- 对模式中的字符的比较顺序不限定，可以从前到后，也可以从后到前；
- 匹配阶段需要 O((n - m + 1)m) 的时间复杂度；
- 需要 2n 次的字符比较；

很显然，朴素的字符串匹配算法 NAIVE-STRING-MATCHER 是最原始的算法，它通过使用循环来检查是否在范围 n-m+1 中存在满足条件 P[1..m] = T [s + 1..s + m] 的有效位移 s。

伪代码如下：

```bash
NAIVE-STRING-MATCHER(T, P)
  n ← length[T]
  m ← length[P]
  for s ← 0 to n - m
    do if P[1 .. m] = T[s + 1 .. s + m]
      then print "Pattern occurs with shift" s
```

![img](https://www.pdai.tech/images/alg/alg-domain-char-bf-2.png)

如上图中，对于模式 P = aab 和文本 T = acaabc，将模式 P 沿着 T 从左到右滑动，逐个比较字符以判断模式 P 在文本 T 中是否存在。

可以看出，NAIVE-STRING-MATCHER 没有对模式 P 进行预处理，所以预处理的时间为 0。而匹配的时间在最坏情况下为 Θ((n-m+1)m)，如果 m = [n/2]，则为 Θ(n2)。

## 图例分析

假设有两个字符串：

- M="abcdefabcdx";
- T="abcdx";

想要找到T串在M串中的位置，要怎么找呢？

![img](https://www.pdai.tech/images/alg/alg-domain-char-bf-1.png)

也就是说，从主串M的第一个字符开始分别与子串从开头进行比较，当发现不匹配时，主串回到这一轮开始的下一个字符，子串从头开始比较。直到子串所有的字符都匹配，返回所在主串中的下标。

## 算法复杂度

假设S的长度是m，T的长度是n，暂不考虑pos，从字符串S的开头开始比较。

- 最好的情况是第一次就匹配了，需要比较的次数是n.
- 最坏的情况下，就是上面举的这种例子，需要把整个字符串都比较完，从下面的代码中就体现为把两层循环都跑了一遍。这时候，比较的次数就是t*(s-t+1).

所以这个算法的(最坏)时间复杂度就是o(t(s-t+1))，近似为o(n2).

## 参考文章

- https://www.cnblogs.com/gaochundong/p/string_matching.html#kmp_string_matching_algorithm
- https://blog.csdn.net/u013301192/article/details/48507695