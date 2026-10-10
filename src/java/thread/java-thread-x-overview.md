---
date: 2022-02-20
category:
  - Java 多线程
tag:
  - Java 多线程
---
# Java 并发知识体系总览

> 本页是 Java 并发专题的索引与学习地图，串联“理论基础 → 线程基础 → 并发关键字 → 锁 → J.U.C 框架 → 本质与模式”的主线。建议按顺序阅读，遇到具体类再跳到对应篇目。

## 1. 并发基础

先把“为什么并发、并发为什么不安全”想清楚，再谈工具。核心是三条性质：**原子性、可见性、有序性**，以及约束三者的 **JMM（Java 内存模型）** 与 **happens-before** 规则。

- [并发理论基础](./java-thread-x-theorty.md)：线程安全、JMM、happens-before、并发与并行的区别。
- [线程基础](./java-thread-x-thread-basic.md)：线程状态与转换、创建方式、中断、互斥同步与协作机制。

## 2. 并发关键字

Java 用三个关键字直接支撑可见性与有序性：

- [synchronized 详解](./java-thread-x-key-synchronized.md)：对象锁与类锁、锁升级（偏向锁/轻量级锁/重量级锁）、与 Lock 的对比。
- [volatile 详解](./java-thread-x-key-volatile.md)：内存屏障、可见性与有序性、为什么保证不了 `i++` 的原子性。
- [final 详解](./java-thread-x-key-final.md)：final 域的重排序规则与安全发布。

## 3. 锁

- [Java 中的锁全景](./java-thread-x-lock-all.md)：公平/非公平、可重入、读写锁、乐观/悲观等分类与适用场景。

J.U.C 中的锁体系以 AQS 为核心：

- [LockSupport 详解](./java-thread-x-lock-LockSupport.md)：park/unpark 基础工具。
- [AQS 详解](./java-thread-x-lock-AbstractQueuedSynchronizer.md)：独占/共享两种资源获取方式、模板方法设计。
- [ReentrantLock 详解](./java-thread-x-lock-ReentrantLock.md)：可重入、公平与非公平实现。
- [ReentrantReadWriteLock 详解](./java-thread-x-lock-ReentrantReadWriteLock.md)：读写状态设计、为什么不支持锁升级。

## 4. J.U.C 框架五大类

[JUC 框架总览](./java-thread-x-juc-overview.md) 之后，可按下述五类深入。

### 4.1 原子类

- [CAS、Unsafe 与原子类](./java-thread-x-juc-AtomicInteger.md)：CAS 原理、ABA 问题及其解法。

### 4.2 并发集合

- [ConcurrentHashMap](./java-thread-x-juc-collection-ConcurrentHashMap.md)：分段锁到 CAS + 红黑树的演进。
- [CopyOnWriteArrayList](./java-thread-x-juc-collection-CopyOnWriteArrayList.md)：写时复制与弱一致迭代器。
- [ConcurrentLinkedQueue](./java-thread-x-juc-collection-ConcurrentLinkedQueue.md)：无锁队列与延迟更新。
- [BlockingQueue](./java-thread-x-juc-collection-BlockingQueue.md)：阻塞队列家族与常用方法。

### 4.3 线程池与异步任务

- [FutureTask](./java-thread-x-juc-executor-FutureTask.md)：异步结果与运行状态流转。
- [ThreadPoolExecutor](./java-thread-x-juc-executor-ThreadPoolExecutor.md)：核心参数、任务提交流程与拒绝策略。
- [ScheduledThreadPoolExecutor](./java-thread-x-juc-executor-ScheduledThreadPoolExecutor.md)：定时与周期任务。
- [Fork/Join 框架](./java-thread-x-juc-executor-ForkJoinPool.md)：分治与工作窃取。

### 4.4 同步工具类

- [CountDownLatch](./java-thread-x-juc-tool-countdownlatch.md)、[CyclicBarrier](./java-thread-x-juc-tool-cyclicbarrier.md)、[Semaphore](./java-thread-x-juc-tool-semaphore.md)、[Phaser](./java-thread-x-juc-tool-phaser.md)、[Exchanger](./java-thread-x-juc-tool-exchanger.md)。

### 4.5 线程隔离

- [ThreadLocal 详解](./java-thread-x-threadlocal.md)：线程隔离原理与内存泄漏问题。

## 5. 学习建议

- **先框架后细节**：先理解并发问题的三条性质与 JMM，再看具体工具，能避免“死记 API”。
- **围绕 AQS 理解 JUC**：锁、信号量、CountDownLatch 等很多同步器都构建在 AQS 之上，吃透一个可以举一反三。
- **用线程池收口**：生产环境应统一用线程池管理线程，避免无界创建；注意线程命名、拒绝策略与监控。
- **看现象定根因**：出现数据错乱先查可见性/原子性，出现卡顿先查锁竞争与线程池配置。

## 6. 常见误区

- **“volatile 能保证线程安全”**：错。它只保证可见性与有序性，不保证复合操作的原子性，`i++` 依然不安全。
- **“用了锁就一定安全”**：锁只保护被它包住的临界区；逃逸引用、未初始化对象被发布仍会破坏安全。
- **“线程越多越快”**：线程过多带来上下文切换与栈内存开销，通常应使用线程池并控制并发度。
- **“ThreadLocal 能解决一切共享问题”**：它只是把变量隔离到线程；在线程池复用线程时若不调用 `remove()`，会造成数据串号与内存泄漏。
- **“Fork/Join 适合所有并行任务”**：它面向可拆分的计算任务，阻塞任务会拖累工作窃取，应优先考虑普通线程池。

## 7. 排查与调优提示

- 出现数据错乱，先怀疑共享可变状态的可见性/原子性，而不是盲目加锁。
- 出现卡顿，先看锁竞争（`jstack` 找 BLOCKED 线程）与线程池队列（是否堆积、是否频繁触发拒绝策略）。
- 死锁可用 `jstack` 输出的 “Found one Java-level deadlock” 定位持有与等待环。
- 高并发下优先用无锁结构（原子类、`ConcurrentHashMap`）降低竞争，再考虑锁的粒度。
- 定位到热点后，用压测验证优化收益；并发问题“看起来对”不等于“真的对”。

## 8. 小结

Java 并发的主线是“**为什么需要并发 → 并发为什么不安全 → 如何用关键字与 JUC 工具保证安全与效率**”。本页给出全站索引，建议按“基础 → 关键字 → 锁 → JUC → 本质与模式”的顺序推进。
