---
date: 2026-10-11
title: JavaScript 基础
category: [前端]
tag: [JavaScript, ES6]
---

# JavaScript 基础

> JavaScript（JS）是页面的**行为层**：响应用户操作、请求后端、更新 DOM。它和 Java 名字相似，语言模型却完全不同——动态类型、单线程、基于原型。

## 1. 从后端视角理解 JS

Java 是**静态类型 + 编译期检查**：变量类型写死在声明里，编译不过就发不出去。JS 是**动态类型 + 运行期决定**：变量不绑类型，赋值时就地决定，运行时才暴露类型错误。

```js
let x = 1;        // 数字
x = "hello";      // 立刻变成字符串，不报错
x = { a: 1 };     // 又变成对象
```

这种灵活带来快速开发，也带来「类型炸弹」。工程化的答案是 **TypeScript**：给 JS 加回静态类型，编译期就能发现字段拼错、类型不符——对习惯了 Java 编译器的后端同学，这是极大的安全感。

## 2. 声明与作用域

| 关键字 | 作用域 | 可重复声明 | 可重新赋值 | 提升 |
|--------|--------|-----------|-----------|------|
| `var` | 函数作用域 | 是 | 是 | 是（初始化为 `undefined`） |
| `let` | 块级作用域 `{}` | 否 | 是 | 是（暂时性死区，未初始化前不可用） |
| `const` | 块级作用域 | 否 | 否 | 同 `let` |

现代代码**默认用 `const`，需要重新赋值再用 `let`，不要用 `var`**。

```js
const name = "订单";     // 引用不可再指向别处
name = "用户";           // ❌ TypeError

const list = [];
list.push("a");          // ✅ 可以，const 锁的是引用不是内容
```

`const` 只保证「引用不变」，对象内容仍可修改——类似 Java 的 `final`。

## 3. 类型与隐式转换

JS 有 8 种类型：`undefined`、`null`、`boolean`、`number`、`string`、`symbol`、`bigint` 是原始类型，`object` 是引用类型。

**相等比较**是最大的坑：

```js
1 == "1"           // true  ← 会做隐式类型转换
1 === "1"          // false ← 严格相等，推荐
null == undefined  // true
NaN === NaN        // false ← NaN 不等于自身
```

**结论：永远用 `===` / `!==`**，别让引擎替你做类型转换。

触发转换的常见场景：

```js
"1" + 1        // "11"（+ 遇到字符串变拼接）
"3" - 1        // 2    （- 只做数学运算，字符串被转数字）
[] + []        // ""
[] + {}        // "[object Object]"
```

`+` 号既是加法又是字符串拼接，是隐式转换的重灾区。

## 4. 作用域与闭包

**闭包（Closure）**：函数可以「记住」定义时所在的作用域，即使这个函数在其作用域之外被调用，依然能访问那个作用域里的变量。

```js
function counter() {
  let count = 0;              // 被闭包捕获
  return function () {
    count += 1;
    return count;
  };
}

const next = counter();
next(); // 1
next(); // 2  ← 同一个 count，持续累加
```

**后端类比**：像 Java 匿名内部类 / Lambda 捕获 effectively final 的外部变量。区别是 JS 闭包捕获的变量**可变且有独立生命周期**，多个闭包各持一份。

闭包的两个经典用途：

1. **数据私有化**：`count` 外界无法直接改，只能通过返回的函数操作。
2. **保存状态**：事件回调、防抖节流、模块封装都靠它。

还有一个高频考点——**循环里的闭包**：

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i)); // 输出 3 3 3（var 共享同一个 i）
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i)); // 输出 0 1 2（let 每轮生成新的 i）
}
```

## 5. this 绑定

`this` 的值取决于**函数如何被调用**，而不是在哪定义（箭头函数例外）。四条规则按优先级：

| 调用方式 | `this` 指向 |
|----------|-------------|
| `obj.method()` | `obj`（方法调用） |
| `fn()` 普通调用 | 非严格模式是全局对象，严格模式是 `undefined` |
| `new Fn()` | 新创建的对象 |
| `fn.call(a)` / `fn.apply(a)` / `fn.bind(a)` | 显式指定的 `a` |

箭头函数**没有自己的 `this`**，它捕获外层作用域的 `this`（类似 Java 里对外层 `this` 的引用）。

```js
const obj = {
  name: "订单",
  // 普通函数：this 是调用它的对象
  say() { return this.name; },
  // 箭头函数：this 是外层（此处为模块作用域）的 this，不是 obj
  sayArrow: () => this.name,
};

obj.say();       // "订单"
obj.sayArrow();  // undefined
```

**实践建议**：方法用普通函数或简写，回调里要用外层 `this` 就用箭头函数——这也是传给 `setTimeout`、`addEventListener` 时最常见的用法。

## 6. 原型与原型链

JS 没有「类继承」的原生模型，用的是**原型链**：每个对象都有一个内部指针指向它的「原型对象」，读属性时先找自身，找不到就顺着原型往上找，直到 `null`。

```js
function Animal(name) { this.name = name; }
Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};

const dog = new Animal("旺财");
dog.speak();                 // "旺财 makes a sound"
dog.hasOwnProperty("name");  // true
dog.hasOwnProperty("speak"); // false ← speak 来自原型
```

`new Animal()` 的过程：创建空对象 → 把它的原型指向 `Animal.prototype` → 执行 `Animal`，`this` 指向新对象 → 返回该对象。

**`class` 是原型语法的糖**：

```js
class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound`; }
}
class Dog extends Animal {
  speak() { return `${super.speak()}，汪`; }
}
```

**后端类比**：原型链像 Java 的继承，但有两个关键差异——

1. 继承发生在**对象之间**，而不是类之间；
2. 是**动态的**，运行时改 `prototype` 会立即影响所有实例。

理解原型链，才能看懂为什么所有对象都有 `toString`、为什么数组能 `push`——它们都来自原型链。

## 7. 事件循环（异步的地基）

JS 运行在**单线程**上——同一时刻只执行一段代码。但它通过**事件循环（Event Loop）**实现了非阻塞：同步代码先跑完，异步回调排队等待，被派发后再执行。

```js
console.log("1");
setTimeout(() => console.log("2"), 0);           // 宏任务，排队
Promise.resolve().then(() => console.log("3"));  // 微任务
console.log("4");
// 输出：1 4 3 2
```

一个可背下来的执行顺序直觉：**同步代码 → 清空微任务队列 → 取一个宏任务 → 再清空微任务 → …**

**后端类比**：像单线程的 NIO / Netty，用事件循环 + 任务队列在单线程里处理大量 IO，而不是为每个请求开一个线程。

异步编程是前端最核心的难点之一：Promise、async/await、宏任务微任务的深入细节见 [JavaScript 异步编程](./async.md)。

## 8. 与后端联调

前端通过 `fetch` 或 `axios` 调用后端接口。一个带鉴权的请求：

```js
const res = await fetch("/api/orders", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  credentials: "include", // 跨域时携带 Cookie
});

if (!res.ok) {
  throw new Error(`请求失败：${res.status}`);
}
const data = await res.json();
```

后端同学重点理解这几件事：

- **CORS（跨域资源共享）**：浏览器同源策略下，跨域请求需要后端返回 `Access-Control-Allow-Origin` 等响应头，否则请求被浏览器拦截（**不是后端没收到，而是浏览器不允许前端读取响应**）。
- **Cookie 跨域**：前端 `credentials: "include"` 时，后端必须返回 `Access-Control-Allow-Credentials: true`，且 `Allow-Origin` 不能是 `*`。
- **状态码语义**：`2xx` 成功、`4xx` 客户端问题、`5xx` 服务端问题；前端常按状态码统一弹错。
- **统一错误体**：约定 `{ code, message, data }` 结构，前端才能统一处理。

## 9. 工程化

- **ES Modules（ESM）**：用 `import` / `export` 组织模块，替代早年的 `<script>` 全局变量。类似 Java 的包 + `import`。
- **构建工具**：Vite（现代主流，开发时极快）或 Webpack，负责转译、打包、热更新。
- **TypeScript**：渐进式引入——先给接口和工具函数加类型，再逐步覆盖。

```js
// math.js —— 导出
export function add(a, b) { return a + b; }
// app.js —— 导入
import { add } from "./math.js";
```

## 10. 常见坑

- **用 `==` 比较**：隐式转换导致 `"1" == 1` 为真。一律用 `===`。
- **`var` 在循环里被闭包共享**：输出全是最终值，用 `let` 或 IIFE 修复。
- **`this` 丢失**：把方法当回调传出去后 `this` 变了，用箭头函数或 `bind`。
- **修改 `const` 对象的属性**：`const` 不冻结内容，误以为不可变。
- **`NaN` 判断**：用 `Number.isNaN(x)`，别用 `x === NaN`。

## 11. 小结

- JS 是**动态类型、单线程、基于原型**的语言；类型安全交给 TypeScript。
- 变量默认 `const`，需要改再用 `let`；比较永远用 `===`。
- **闭包**捕获定义时的作用域，是私有状态与回调的基础。
- **`this`** 由调用方式决定，箭头函数继承外层。
- **原型链**是属性查找机制，`class` 只是它的语法糖。
- **事件循环**是单线程非阻塞的关键，宏任务 / 微任务顺序要背熟。

下一步深入异步细节：[JavaScript 异步编程](./async.md)；想回看页面结构看 [HTML 基础](../html/overview.md)。
