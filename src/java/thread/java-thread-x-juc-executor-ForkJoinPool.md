---
date: 2022-03-12
category:
  - Java 多线程
tag:
  - Java 多线程
---
# JUC线程池: Fork/Join框架详解

> Fork/Join 是 JDK 7 引入的并行计算框架，是分治算法（Divide-and-Conquer）的并行实现。它把一个可拆分的大任务递归拆成若干小任务并行执行，再合并结果，并借助**工作窃取（work-stealing）**让空闲线程去“偷”其他线程的任务来执行，从而尽可能榨干多核算力。

## 1. 核心思想：分治

Fork/Join 处理问题的伪代码可以概括为：

```text
Result solve(Problem problem) {
    if (problem is small)
        directly solve problem
    else {
        split problem into independent parts
        fork new subtasks to solve each part
        join all subtasks
        compose result from subresults
    }
}
```

“Fork”是把任务拆出子任务并提交，“Join”是等待子任务完成并合并结果。是否继续拆分的判断（“small”的阈值）是性能关键。

## 2. 三大模块

| 模块 | 说明 |
| --- | --- |
| `ForkJoinTask` | 任务抽象，实现 `Future`，是 `Future` 的轻量级实现；子类有 `RecursiveTask`（有返回值）、`RecursiveAction`（无返回值）、`CountedCompleter`（完成后触发钩子） |
| `ForkJoinWorkerThread` | 执行 Fork/Join 任务的工作线程，每个线程独占一个任务队列 |
| `ForkJoinPool` | 线程池，通过池中的工作线程来处理 `ForkJoinTask` |

三者关系：`ForkJoinPool` 调度 `ForkJoinWorkerThread` 执行 `ForkJoinTask`。实践中通常继承 `RecursiveTask` / `RecursiveAction` / `CountedCompleter`，而不是直接继承 `ForkJoinTask`。

`ForkJoinPool` 只接受 `ForkJoinTask`；即便提交 `Runnable`/`Callable`，池内也会把它包装成 `ForkJoinTask`。

## 3. 工作窃取（work-stealing）

每个工作线程对应一个 `WorkQueue`，本质是**双端队列**：

- 队列支持 `push`、`pop`、`poll` 三个操作；`push`/`pop` 只能由队列所有者调用，`poll` 可被其他线程调用。
- 子任务 `fork()` 后压入**自己**队列的 `top` 端。
- 所有者线程按 **LIFO** 从 `top` 取任务执行（栈式，缓存友好）。
- 自己的队列空了，就去随机选择其他队列，从 `base` 端按 **FIFO** `poll`（窃取）任务。

这样减少了线程间对同一端的争用：所有者操作一端、窃取者操作另一端。池的 `workQueues` 数组中，外部提交的任务放在偶数槽位，工作线程 `fork` 产生的子任务放在奇数槽位。

## 4. 与 ThreadPoolExecutor 的区别

| 维度 | ForkJoinPool | ThreadPoolExecutor |
| --- | --- | --- |
| 队列结构 | 每个工作线程一个双端队列 | 通常共享一个阻塞队列 |
| 任务调度 | 工作窃取，子任务线程本地执行 | 任务在公共队列中先入先出 |
| 设计目标 | 计算密集、可分治的递归任务 | 通用异步任务、阻塞 IO 场景 |
| 并行度控制 | `parallelism`（默认 CPU 核数，池内为核数-1 的常见约定） | `corePoolSize` / `maximumPoolSize` |
| 任务类型 | 必须是 `ForkJoinTask`（Runnable/Callable 会被包装） | `Runnable` / `Callable` |
| 结果返回 | `fork`/`join` 组合，`join` 阻塞等待 | `Future.get` 阻塞等待 |
| 典型适用 | 并行排序、递归求和、树/图遍历 | Web 请求处理、IO 任务 |
| 阻塞任务 | 数量少、可拆分时较好；阻塞多会拖累窃取 | 更适合阻塞任务（配合合适的队列与线程数） |

关键差异：`ThreadPoolExecutor` 用“外部队列 + 工作线程争抢”调度，`ForkJoinPool` 用“线程本地队列 + 窃取”调度，后者在**任务能不断派生子任务**时利用率更高。

## 5. 代码示例

### 5.1 递归求和 1+2+…+10000

```java
static final class SumTask extends RecursiveTask<Integer> {
    final int start, end;
    SumTask(int start, int end) { this.start = start; this.end = end; }

    @Override
    protected Integer compute() {
        if (end - start < 1000) {            // 阈值内直接算
            int sum = 0;
            for (int i = start; i <= end; i++) sum += i;
            return sum;
        }
        int mid = (start + end) / 2;
        SumTask left = new SumTask(start, mid);
        SumTask right = new SumTask(mid + 1, end);
        left.fork();                          // 只 fork 一个，另一个自己算
        int rightAns = right.compute();
        int leftAns = left.join();
        return leftAns + rightAns;
    }
}

public static void main(String[] args) {
    ForkJoinPool pool = new ForkJoinPool();
    System.out.println(pool.invoke(new SumTask(1, 10000))); // 50005000
}
```

### 5.2 斐波那契（注意调用顺序）

```java
static class Fibonacci extends RecursiveTask<Integer> {
    final int n;
    Fibonacci(int n) { this.n = n; }
    @Override
    protected Integer compute() {
        if (n <= 1) return n;
        Fibonacci f1 = new Fibonacci(n - 1);
        Fibonacci f2 = new Fibonacci(n - 2);
        invokeAll(f1, f2);      // 推荐：invokeAll 会留一个给当前线程执行
        return f2.join() + f1.join();
    }
}
```

若手工 `fork` 两个子任务，必须遵循 `f1.fork(); f2.fork(); f2.join(); f1.join();` 的顺序（后进先出，先 join 栈顶的 f2 才能最快执行），否则会损失并行度。

## 6. 实践要点与坑

- **避免不必要的 fork**：两个子任务不必都 fork，留一个在当前线程 `compute()` 直接跑能减少调度开销。
- **严守 fork/compute/join 顺序**：先 fork 后 join 才能让子任务与当前线程并行；写反了就变成串行。
- **选好粒度阈值**：任务太大无法提升吞吐，太小则任务创建、调度、合并的开销盖过收益。官方经验是子任务执行约 100~10000 个基本计算步骤，最终以实测为准（且要预热、跑多轮）。
- **减少重量级合并**：拆分与合并时尽量避免 `System.arraycopy` 这类耗时耗空间的操作。
- **用 common pool 要谨慎**：`ForkJoinPool.commonPool()` 是 JVM 全局共享、并行度为 CPU 核数-1；在其上跑阻塞任务会拖垮整个 common pool，此时应使用独立池，或对阻塞任务使用 `ManagedBlocker`。
- **异常处理**：`invoke`/`join` 会把任务内部异常包装成运行时异常抛出；若想基于“结果/异常”统一处理，可用 `quietlyInvoke` / `quietlyJoin`，并配合 `isCompletedNormally()` / `isCompletedAbnormally()`。

## 7. 并行流（parallelStream）与 common pool

JDK 8 的 `parallelStream()` 底层使用的正是 `ForkJoinPool.commonPool()`，这带来两个必须记住的约束：

- **全局共享**：common pool 是整个 JVM 共用的，任何一处提交的阻塞任务都会占用它，进而拖慢其他同样在用并行流的代码。
- **并行度固定**：默认并行度为“可用处理器数 - 1”，可通过系统属性 `java.util.concurrent.ForkJoinPool.common.parallelism` 调整，但影响全局。

因此**在 parallelStream 中执行阻塞 IO 是危险操作**：线程一旦被阻塞就无法去窃取其他任务，整个 common pool 可能被打满。若确有阻塞需求，应使用自建的 `ForkJoinPool`，或把阻塞工作交给独立的普通线程池。

## 8. 底层结构速览

- **ctl**：`ForkJoinPool` 用一个 64 位 `long` 打包全局状态，拆成活跃线程数、总线程数、栈顶等待线程版本与索引等子域，通过位运算做一个原子量来更新。
- **workQueues 数组**：按奇偶槽位区分——偶数是外部提交任务的共享队列，奇数是工作线程的私有队列。
- **WorkQueue 字段**：`base`（FIFO 出队端，也是窃取端）、`top`（LIFO 入队端）、`scanState`（活跃/扫描状态）、`currentJoin` / `currentSteal`（记录当前 join 与窃取的任务）。
- **ForkJoinTask.status**：用位标记表达 NORMAL / CANCELLED / EXCEPTIONAL / SIGNAL 等状态，`doExec()` 驱动执行、`doJoin()` 负责等待与帮助执行。

这些细节不必死记，但知道“位运算打包状态 + 奇偶槽位队列”这两点，读源码时会顺畅很多。

## 9. 阻塞任务的处理：ManagedBlocker

Fork/Join 的设计假设是“任务纯计算、能快速完成”。一旦某个任务长时间阻塞（例如等待 IO），工作线程被占住，池就无法有效调度其他任务，吞吐明显下降。

`ForkJoinPool.ManagedBlocker` 就是为此准备的接口：任务在可能阻塞前调用 `ForkJoinPool.managedBlock(blocker)`，池会检测到线程即将阻塞，必要时**创建补偿线程**维持并行度，阻塞结束后再归还。它能让“偶发阻塞”不至于拖垮整个池，但本质上仍是权宜之计——大量长阻塞任务应交给普通线程池。

## 10. 小结

- Fork/Join 用分治 + 工作窃取把可拆分的计算任务并行化。
- 三要素：`ForkJoinTask`（任务）、`ForkJoinWorkerThread`（线程）、`ForkJoinPool`（池）。
- 每个工作线程一个双端队列，所有者 LIFO 取任务，窃取者从另一端 FIFO 偷任务。
- 与 `ThreadPoolExecutor` 相比更擅长计算密集的递归任务；阻塞任务要另辟独立池或使用 `ManagedBlocker`。
- 用好它的关键是阈值、调用顺序与避免无谓的 fork/合并。

延伸阅读：[ThreadPoolExecutor 详解](./java-thread-x-juc-executor-ThreadPoolExecutor.md)、[FutureTask 详解](./java-thread-x-juc-executor-FutureTask.md)、[JUC 框架总览](./java-thread-x-juc-overview.md)。
