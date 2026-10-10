---
date: 2022-05-05
category:
  - Java JVM
tag:
  - Java JVM
---
# GC - Java 垃圾回收器之CMS GC问题分析与解决

> CMS（Concurrent Mark Sweep，并发标记清除）是 HotSpot 面向**低停顿**设计的老年代收集器。它在多数阶段与用户线程并发执行，把停顿控制在较短的初始标记与重新标记上，但仍保留了“标记-清除”算法固有的内存碎片问题。本篇梳理 CMS 的分代位置、回收阶段、关键参数、碎片退化与常见问题排查，并给出与 G1 的对比。

## 1. CMS 在分代模型中的位置

传统分代模型把堆划分为新生代与老年代，不同区域用不同的收集器：

- **新生代**：CMS 默认搭配 **ParNew** 收集器（多线程复制算法），负责年轻对象的高频、短停顿回收。
- **老年代**：**CMS** 使用“并发标记清除”，负责存活时间长的对象。

两者组合即常说的 `ParNew + CMS`。开启方式为 `-XX:+UseConcMarkSweepGC`，开启后新生代自动使用 ParNew。

::: warning 注意
CMS 自 JDK 9 起被标记为废弃，JDK 14 起彻底移除。新项目应优先选择 G1、ZGC 等更现代的收集器；了解 CMS 更多是为了读懂存量系统与面试题。
:::

## 2. CMS 的回收阶段

CMS 以“可达性分析 + 标记-清除”为核心，一次完整回收分为六个阶段：

| 阶段 | 是否 STW | 说明 |
| --- | --- | --- |
| 初始标记（Initial Mark） | 是 | 仅标记 GC Roots 直接可达的对象，停顿极短 |
| 并发标记（Concurrent Mark） | 否 | 从初始标记对象出发做可达性遍历，与用户线程并发 |
| 并发预清理（Concurrent Preclean） | 否 | 处理并发标记期间因引用变化产生的增量，减少重新标记工作量 |
| 重新标记（Remark） | 是 | 用增量更新/卡表修正并发期间的引用变动，停顿较长 |
| 并发清除（Concurrent Sweep） | 否 | 清除不可达对象，回收空间 |
| 并发重置（Concurrent Reset） | 否 | 重置算法内部状态，准备下一轮 |

两个 STW 阶段中，**初始标记**只扫根、极快；**重新标记**需修正并发期间的变更，通常是最长的一次停顿，也是 CMS 调优关注的重点。

## 3. 关键参数

| 参数 | 含义 |
| --- | --- |
| `-XX:+UseConcMarkSweepGC` | 启用 CMS + ParNew 组合 |
| `-XX:CMSInitiatingOccupancyFraction=N` | 老年代使用率达到 N% 触发 CMS GC，默认约 68 |
| `-XX:+UseCMSInitiatingOccupancyOnly` | 只按上面的阈值触发，不依赖运行时预测 |
| `-XX:ConcGCThreads` / `-XX:ParallelGCThreads` | 并发标记线程数 / 并行阶段线程数 |
| `-XX:CMSFullGCsBeforeCompaction=N` | 每 N 次 Full GC 做一次压缩整理，缓解碎片 |
| `-XX:+CMSScavengeBeforeRemark` | 重新标记前先做一次新生代 GC，降低重新标记耗时 |
| `-XX:+UseCMSCompactAtFullCollection` | Full GC 时进行压缩（与上一参数配合） |

合理设置 `CMSInitiatingOccupancyFraction` 很关键：太低会增加 GC 频率，太高则可能在 CMS 清完之前老年代就已满，从而退化为 Full GC。

## 4. 内存碎片与“退化”

CMS 使用**标记-清除**，不移动存活对象，因此会产生内存碎片。碎片带来两个典型故障：

- **Concurrent Mode Failure**：CMS 正在并发回收时，老年代剩余空间已无法满足新对象晋升，被迫触发一次 STW 的 Full GC（通常是单线程的 Serial Old），停顿显著变长。
- **Promotion Failed**：新生代对象晋升老年代时，因碎片导致没有连续空间容纳，同样触发 Full GC。

触发退化后，日志中会出现 `concurrent mode failure` 或 `promotion failed`。缓解手段包括：

1. 适当调小 `CMSInitiatingOccupancyFraction`，让 CMS 更早启动，留足并发期间的空间。
2. 开启 `+UseCMSCompactAtFullCollection` 并在若干次 Full GC 后做压缩整理，消除碎片。
3. 增大堆或提升回收效率，减少晋升压力。

## 5. 常见问题与排查

CMS 问题的表象常常互为因果——RT 上涨可能同时伴随 GC 耗时增大、线程阻塞、慢查询和 CPU 高。排查时应先看 GC 日志，再定位诱因。

- **看 GC 日志**：`-Xlog:gc*`（JDK 9+）或 `-XX:+PrintGCDetails -XX:+PrintGCDateStamps`（JDK 8），关注 GC 频率、单次停顿、并发阶段耗时与是否有 Full GC。
- **`jstat -gc <pid> 1000`**：观察 `O`（老年代占用）、`FGC`（Full GC 次数）、`FGCT`（Full GC 总耗时）。
- **jmap -histo / -dump**：定位大对象与内存泄漏。
- **jstack**：排查因 GC 导致的线程阻塞。

判断“GC 是否有问题”的基本思路：先看停顿是否超过业务可接受阈值（如数百毫秒），再看 Full GC 是否频繁，最后结合内存增长曲线定位是正常的晋升还是泄漏。

## 6. CMS 与 G1 对比

| 维度 | CMS | G1 |
| --- | --- | --- |
| 堆布局 | 物理分代（新生代 + 老年代） | 逻辑分代，物理划分为等大 Region |
| 算法 | 标记-清除（不压缩，有碎片） | 标记-复制/整理（Region 间复制，无碎片） |
| 停顿控制 | 靠经验调参 | 可设 `-XX:MaxGCPauseMillis` 目标 |
| 碎片问题 | 存在，可能退化 Full GC | 基本没有 |
| 大堆表现 | 堆越大停顿越难控 | 更适合大堆、可预测停顿 |
| 现状 | 已废弃（JDK 14 移除） | JDK 9 起默认收集器 |

选型结论：存量小堆系统可继续用 CMS 并做好监控；新系统与大堆场景应优先 G1；对超低停顿有极致要求时可考虑 ZGC。

## 7. 调优实战：从日志到参数

把“看日志 → 定根因 → 调参数”串成一条可执行的路径：

**第一步，读 GC 日志。** JDK 8 用 `-XX:+PrintGCDetails -XX:+PrintGCDateStamps -Xloggc:gc.log`，JDK 9+ 用 `-Xlog:gc*:file=gc.log`。重点看：

- 有多频繁触发 CMS GC（`[GC (CMS Initial Mark)` 等）。
- 每次重新标记的停顿（Remark）是否过长。
- 是否出现 `concurrent mode failure` / `promotion failed`，即是否退化成 Full GC。

**第二步，定根因。** 常见对应关系：提升速率过高 → 关注新生代大小；老年代增长快 → 可能有缓存膨胀或内存泄漏；碎片导致退化 → 需要压缩或降低触发阈值。

**第三步，调参并回归。** 常用组合：

```bash
-XX:+UseConcMarkSweepGC
-XX:CMSInitiatingOccupancyFraction=70
-XX:+UseCMSInitiatingOccupancyOnly
-XX:+CMSScavengeBeforeRemark
-XX:+UseCMSCompactAtFullCollection
-XX:CMSFullGCsBeforeCompaction=5
```

参数调整必须配合**压测或灰度**验证，并观察业务 RT 与 Full GC 频次是否同步改善，切忌只凭单次日志拍脑袋。

## 8. 常用排查工具

- `jstat -gc <pid> <interval>`：快速观察各区容量、占用与 GC 次数/耗时，是最轻量的入口。
- `jmap -histo <pid>` / `jmap -dump`：查看对象直方图或导出堆快照，定位大对象与泄漏。
- `jstack <pid>`：查看线程状态，识别因 GC 停顿造成的阻塞。
- GC 日志可视化工具：把日志画成停顿分布与内存曲线，便于横向对比调参前后。

## 9. 小结

- CMS 以“并发标记清除”换取低停顿，搭配 ParNew 服务老年代回收。
- 六阶段回收中，只有初始标记与重新标记会 STW，重新标记是调优重点。
- 标记-清除不压缩，碎片会导致 Concurrent Mode Failure 与 Promotion Failed，需要靠阈值与压缩策略缓解。
- CMS 已废弃移除，新项目优先 G1/ZGC；理解 CMS 有助于读懂存量系统和 GC 类面试题。

延伸阅读：[垃圾回收基础](./java-jvm-gc.md)、[G1 收集器](./java-jvm-gc-g1.md)、[ZGC 收集器](./java-jvm-gc-zgc.md)、[JVM 常用参数](./java-jvm-param.md)。
