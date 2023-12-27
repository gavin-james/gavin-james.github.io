---
date: 2019-08-01
category:
  - 算法和数据结构
tag:
  - 领域算法
---
# 大数据处理 - Map & Reduce 

> MapReduce是一种计算模型, 本质上是`分治/hash_map/归并排序`这种方式在分布式下的延伸。

## Map & Reduce简介

MapReduce是一种计算模型，简单的说就是将大批量的工作(数据)分解(MAP)执行，然后再将结果合并成最终结果(REDUCE)。这样做的好处是可以在任务被分解后，可以通过大量机器进行并行计算，减少整个操作的时间。但如果你要我再通俗点介绍，那么，说白了，Mapreduce的原理就是一个归并排序。

- `适用范围`: 数据量大，但是数据种类小可以放入内存
- `基本原理及要点`: 将数据交给不同的机器去处理，数据划分，结果归约。

## 相关题目

- The canonical example application of MapReduce is a process to count the appearances of each different word in a set of documents:
- 海量数据分布在100台电脑中，想个办法高效统计出这批数据的TOP10。
- 一共有N个机器，每个机器上有N个数。每个机器最多存O(N)个数并对它们操作。如何找到N^2个数的中数(median)?

## 参考文章

- https://blog.csdn.net/v_JULY_v/article/details/7382693
