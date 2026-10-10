---
date: 2019-08-01
category:
  - 算法和数据结构
tag:
  - 领域算法
---
# 大数据处理 - Map & Reduce

> MapReduce 是一种面向大规模数据的**并行计算模型**，本质上就是"分治 + 哈希 + 归并排序"这套单机思路在分布式集群上的延伸。它把"怎么并行"的复杂度封装起来，让开发者只需编写 Map 与 Reduce 两段业务逻辑。

## 1. 从单机分治到分布式 MapReduce

单机处理海量数据会受限于内存、CPU 和磁盘；而把数据切分到多台机器上并行处理，就能把总时间大幅压缩。MapReduce 正是这一思想的工程化落地：

- **应用范围**：数据量很大，但数据种类相对单一、可切分；
- **基本原理**：把数据划分给不同机器并行处理（Map），再把中间结果按 key 归约、合并（Reduce）；
- **本质**：许多 MapReduce 任务（如排序、分组统计）都可视为**归并排序**的一个特例。

一句话概括：**分解（Map）后并行执行，再将结果合并（Reduce）**。

## 2. 执行流程

一个 MapReduce 作业的核心阶段如下：

```mermaid
flowchart LR
    A[输入分片 Split] --> B[Map 阶段]
    B --> C[Shuffle 洗牌]
    C --> D[Reduce 阶段]
    D --> E[输出]
```

| 阶段 | 作用 |
| --- | --- |
| 输入分片 | 把输入数据切成若干大小相近的 split，一个 split 对应一个 Map 任务 |
| Map | 对每条输入记录产出若干 `<key, value>` 中间结果 |
| Shuffle | 按 key 对中间结果分区、排序、合并、传输到对应的 Reduce |
| Reduce | 对相同 key 的所有 value 做归约，输出最终结果 |

**Shuffle 是 MapReduce 的性能关键**：它包含 Map 端的环形缓冲、溢写（spill）、合并（merge），以及 Reduce 端拉取（fetch）与归并。数据倾斜、小文件过多等问题往往都集中在这一阶段。

## 3. 经典示例：词频统计

统计"每个单词在文档集合中出现的次数"是 MapReduce 的教科书示例，也最直观地体现了模型思想。

**Map 阶段**：对每行文本按空格切分，输出 `(单词, 1)`。

```java
// 伪代码：Map 阶段，输入 "hello world"，输出 (hello,1) (world,1)
void map(String line, Emitter out) {
    for (String word : line.split("\\s+")) {
        out.emit(word, 1);
    }
}
```

**Shuffle 阶段**：框架把相同 key 的 value 汇聚到一起，形如：

```text
hello -> [1, 1, 1]
world -> [1, 1]
```

**Reduce 阶段**：对每个 key 的 value 列表求和。

```java
// 伪代码：Reduce 阶段，对同一 key 的 value 求和
void reduce(String word, Iterable<Integer> values, Emitter out) {
    int sum = 0;
    for (int v : values) {
        sum += v;
    }
    out.emit(word, sum);
}
```

最终输出 `hello 3`、`world 2`。整个过程中，开发者只写了两个函数，分区、排序、容错、并行调度全部由框架完成。

## 4. Shuffle 为什么是重点

Shuffle 承担了"把 Map 输出按 key 重新分配到 Reduce"的职责，其开销通常占作业总时间的大头：

- **分区（Partition）**：决定某个 key 交给哪个 Reduce，默认对 key 取哈希再取模；
- **排序（Sort）**：每个分区内部按 key 有序，便于 Reduce 端做流式归并；
- **合并（Combine）**：可选地在 Map 端先做一次本地 Reduce，减少网络传输（词频统计可在 Map 端把 `(word,1)` 合成 `(word,n)`）；
- **归并（Merge）**：Reduce 端把拉取到的多个有序段归并成一个有序流。

**数据倾斜**是常见陷阱：某个 key 的 value 特别多时，处理它的那个 Reduce 会成为长尾。常用缓解手段是加随机前缀打散，或借助 Combine 提前聚合。

## 5. 相关经典题目

MapReduce 的价值在面试与工程中常以"海量数据"题目的形式出现，解法几乎都是同一套"分治 + 哈希 + 归并"：

- **海量数据的词频统计**：即上文示例，Map 产出词频、Reduce 求和。
- **100 台电脑上分布的海量数据求 TOP 10**：每台机器本地求 TOP 10（用最小堆），再把各机器结果汇聚到一个节点求全局 TOP 10。
- **N 台机器、每台存 N 个数，求 N² 个数的中位数**：先各机器排序（或做直方图），汇总分布后再定位中位数所在区间。
- **海量数据去重/求 TopK/排序**：参见 [大数据处理 - 外排序](./alg-domain-bigdata-outsort.md)、[大数据处理 - 分治 & 哈希](./alg-domain-bigdata-devide-and-hash.md)。

这类题目的通用套路是：**若单机内存装不下，就按某个维度把数据切成能放进内存的块，各块内部处理，最后归并。**

## 6. 局限与演进

MapReduce 的模型简单、容错强，但也有明显短板：

- 中间结果**落盘**，迭代式算法（机器学习、图计算）反复读写磁盘，效率低；
- 编程模型只提供 Map/Reduce 两种原语，表达能力受限；
- 不适合低延迟的交互式查询。

因此在其之上演化出了多种计算引擎：**Spark** 以内存计算和 DAG 调度显著减少落盘；**Flink** 主打流式计算；**Tez/Presto** 面向查询优化。但它们的调度原理仍能追溯到 MapReduce 的"分片—并行—归约"骨架。

## 7. 小结

- MapReduce = 分布式版的分治 + 哈希 + 归并排序，核心是"分解并行、结果归约"。
- 四阶段：Split → Map → Shuffle → Reduce，其中 Shuffle 是性能与调优的关键。
- 词频统计是最佳入门示例：Map 输出 `(word,1)`，Reduce 求和。
- 海量数据题目的通用解法是分块处理再归并，注意数据倾斜与 Combine 优化。
- 编程简单、容错强是优点；迭代效率低是短板，推动了 Spark/Flink 等引擎的演进。
