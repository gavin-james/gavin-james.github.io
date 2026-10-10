---
title: JavaScript 异步编程
category: [前端]
tag: [JavaScript, 异步]
---

# JavaScript 异步编程

> 前端几乎所有耗时操作——请求接口、读文件、定时器——都是异步的。理解 Promise、`async/await` 与事件循环的宏微任务，是写好前端代码的分水岭。

## 1. 为什么必须异步

JS 是**单线程**的：同一时刻只跑一段代码。如果请求接口是同步阻塞的，整个页面就会卡死——网络往返可能几百毫秒到几秒，期间用户点不动、界面不刷新。

所以 JS 的做法是：**发请求不阻塞，先把控制权交回浏览器，拿到结果后再执行回调**。这就是「非阻塞 I/O + 事件循环」。

**后端类比**：这非常像 Netty / NIO 的单线程事件循环模型——一个线程用事件循环处理大量并发 IO，而不是一个请求开一个线程。区别是后端还能用多线程兜底 CPU 密集任务，而浏览器用于 UI 的线程只有一个，长任务会直接卡界面。

## 2. 回调地狱：异步的原始形态

最早异步靠**回调函数（callback）**：

```js
getUser(id, (user) => {
  getOrders(user.id, (orders) => {
    getDetail(orders[0].id, (detail) => {
      console.log(detail); // 一层套一层
    }, onError);
  }, onError);
}, onError);
```

问题：

- **嵌套深**：逻辑横向增长，读起来像「回调地狱」。
- **错误处理散乱**：每个回调都要单独处理 `onError`。
- **无法组合**：想「等多个请求都完成」很别扭。

JS 的解法依次是 **Promise → async/await**。

## 3. Promise：表示「未来的结果」

Promise 是一个**代表异步操作最终结果的对象**，有三种状态：

| 状态 | 含义 |
|------|------|
| `pending` | 进行中 |
| `fulfilled` | 成功，带一个结果值 |
| `rejected` | 失败，带一个原因（错误） |

状态一旦从 `pending` 变为 `fulfilled` 或 `rejected`，就**不可再变**。

```js
const p = new Promise((resolve, reject) => {
  // 异步操作，比如请求接口
  setTimeout(() => {
    const ok = true;
    ok ? resolve("成功数据") : reject(new Error("失败"));
  }, 300);
});

p.then((value) => console.log("结果：", value))
 .catch((err) => console.error("出错：", err.message))
 .finally(() => console.log("无论成败都执行"));
```

`then` 返回一个**新的 Promise**，因此可以**链式调用**，把回调地狱拉平成一条链：

```js
getUser(id)
  .then((user) => getOrders(user.id))
  .then((orders) => getDetail(orders[0].id))
  .then((detail) => console.log(detail))
  .catch((err) => console.error("任一步出错都在这里")); // 统一兜底
```

**后端类比**：`Promise` 就是 JS 版的 `CompletableFuture`，都是「未来结果」的容器，都能链式组合、统一异常处理。

## 4. 组合多个 Promise

并发场景下把多个 Promise 组合起来：

| 方法 | 行为 | 结果 |
|------|------|------|
| `Promise.all([...])` | 全部成功才成功 | 结果数组；**任一失败即整体失败** |
| `Promise.allSettled([...])` | 等全部结束 | 每项带 `status`，**允许部分失败** |
| `Promise.race([...])` | 第一个结束的胜出 | 结果或错误 |
| `Promise.any([...])` | 第一个成功的胜出 | 全失败才失败 |

```js
// 并行拉取，全部完成后一起用
const [user, orders, stats] = await Promise.all([
  fetch("/api/user").then((r) => r.json()),
  fetch("/api/orders").then((r) => r.json()),
  fetch("/api/stats").then((r) => r.json()),
]);

// 允许部分失败：失败项也能拿到原因
const results = await Promise.allSettled([fetchA(), fetchB()]);
results.forEach((r) => {
  if (r.status === "fulfilled") console.log("成功", r.value);
  else console.warn("失败", r.reason);
});
```

**`race` 实现超时控制**（很常用的技巧）：

```js
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("请求超时")), ms)
  );
  return Promise.race([promise, timeout]);
}
```

::: warning 并发还是串行
`Promise.all` 发出的是**并发**请求。如果几个接口互相独立，用 `Promise.all` 一次发完；若写成连续的 `await`，就是**串行**，总耗时相加——这是接口「瀑布流」的常见成因。
:::

## 5. async / await：用同步语法写异步

`async/await` 建立在 Promise 之上，让异步代码看起来像同步代码。`async` 函数返回 Promise，`await` 会「暂停」函数等待结果（但**不阻塞线程**）。

```js
async function loadOrder(id) {
  try {
    const user = await getUser(id);          // 等这个完成
    const orders = await getOrders(user.id);
    const detail = await getDetail(orders[0].id);
    return detail;                           // 会被包装成 Promise
  } catch (err) {
    console.error("加载订单失败", err);
    throw err;
  }
}
```

要点：

- `await` 后面的表达式**通常是 Promise**（非 Promise 会被自动包装）。
- 用 `try/catch` 捕获错误，取代 `.catch()`。
- `await` 只能在 `async` 函数（或模块顶层）里使用。
- **`await` 会暂停当前 `async` 函数、让出事件循环**——所以它不会卡住整个页面，但同一函数内的后续代码要等它。

## 6. 事件循环：宏任务与微任务

要真正理解 `async/await` 的执行顺序，必须分清**宏任务（macrotask）**与**微任务（microtask）**。

| 类型 | 例子 |
|------|------|
| 宏任务 | `setTimeout` / `setInterval`、I/O、UI 渲染 |
| 微任务 | `Promise.then`、`queueMicrotask`、`MutationObserver`、`await` 恢复 |

执行顺序（背熟）：

1. 执行当前**同步代码**（整段脚本本身就是一个宏任务）；
2. 同步代码执行完，**清空微任务队列**（一个接一个，过程中新产生的微任务也在此轮清空）；
3. 从宏任务队列**取下一个宏任务**执行；
4. 再次清空微任务队列……如此循环。

```js
console.log("script start");

setTimeout(() => console.log("setTimeout"), 0);   // 宏任务

Promise.resolve()
  .then(() => console.log("promise 1"))            // 微任务
  .then(() => console.log("promise 2"));           // 微任务（链式）

console.log("script end");

// 输出顺序：
// script start
// script end
// promise 1
// promise 2
// setTimeout
```

`await` 的本质：`await x` 后面的代码相当于被包进 `x.then(...)`，所以 `await` 之后的代码是**微任务**。

```js
async function f() {
  console.log("a");
  await null;         // 之后的代码变成微任务
  console.log("c");
}
f();
console.log("b");
// 输出：a b c
```

::: tip 为什么关心顺序
- **微任务会插队**：`await` 之后的逻辑比 `setTimeout` 先跑，容易写出「我以为会先执行」的 bug。
- **长任务卡 UI**：微任务队列若一直被续上新微任务，会饿死渲染，页面卡顿。
- **调试时序问题**：日志顺序和预期不符时，先画出宏微任务队列。
:::

## 7. 取消与并发控制

### AbortController 取消请求

`fetch` 通过 `AbortController` 支持取消（比如用户离开页面、切换筛选条件）：

```js
const controller = new AbortController();

fetch("/api/orders", { signal: controller.signal })
  .catch((err) => {
    if (err.name === "AbortError") console.log("请求已取消");
  });

// 需要时取消
controller.abort();
```

### 限制并发数

一次发几百个请求会压垮浏览器和服务端，需要控制并发度。下面是常用思路（分批 + `Promise.all`）：

```js
async function pool(tasks, limit) {
  const results = [];
  for (let i = 0; i < tasks.length; i += limit) {
    const batch = tasks.slice(i, i + limit);
    results.push(...(await Promise.all(batch.map((t) => t()))));
  }
  return results;
}

// 一次最多 3 个并发
const tasks = urls.map((url) => () => fetch(url).then((r) => r.json()));
const all = await pool(tasks, 3);
```

### 防止竞态

快速切换筛选条件时，旧请求可能后返回并覆盖新结果。用「标记最新请求」解决：

```js
let latestId = 0;

async function search(keyword) {
  const myId = ++latestId;
  const data = await fetch(`/api/search?q=${keyword}`).then((r) => r.json());
  if (myId !== latestId) return; // 已有更新的请求，丢弃本次结果
  render(data);
}
```

## 8. 常见坑

- **`forEach` 里 `await` 不生效**：`forEach` 不会等待异步回调。要串行用 `for...of`，要并发用 `Promise.all(arr.map(...))`。
- **忘记 `await`**：拿到的是 Promise 对象而非结果，后续代码拿到 `[object Promise]`。
- **`try/catch` 抓不到漏掉的 `await`**：只有被 `await` 的 Promise 被 reject 才会进 `catch`。
- **串行化**：能并发的接口写成连续 `await`，总耗时翻倍。
- **微任务饥饿**：递归微任务（如无终止条件的 `promise.then`）会阻塞渲染。

## 9. 小结

- JS 单线程靠**事件循环**实现非阻塞，长任务会卡 UI。
- **Promise** 是「未来结果」的容器，可链式、可组合；对应后端的 `CompletableFuture`。
- **`Promise.all` 并发、`allSettled` 容错、`race` 超时、`any` 抢先**。
- **`async/await`** 用同步写法写异步流程，配 `try/catch` 处理错误。
- 执行顺序：**同步 → 清空微任务 → 宏任务 → …**；`await` 之后是微任务。
- 请求要能**取消**（`AbortController`）、能**限流**、能**防竞态**。

相关：[JavaScript 基础](./overview.md) · [Vue 3 基础](../vue/overview.md) · [React 基础](../react/overview.md)
