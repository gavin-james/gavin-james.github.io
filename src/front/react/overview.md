---
date: 2026-10-11
title: React 基础
category: [前端]
tag: [React, JSX]
---

# React 基础

> React 的心智模型只有一句：**UI 是状态的函数**，即 `UI = f(state)`。状态变了，React 重新计算并更新对应的界面。它用 JavaScript（而非模板）描述结构，灵活度和类型友好度高。

## 1. 心智模型：UI = f(state)

不用框架时，界面靠手动操作 DOM。React 把关注点从「怎么改 DOM」转成「当前状态应该长什么样」：

```jsx
// 声明：给定 state，返回 UI
function Counter({ count }) {
  return <button>点击了 {count} 次</button>;
}
```

状态（state）是组件的**记忆**。它一变，组件函数就被重新调用，返回新的 JSX，React 负责把差异更新到真实 DOM（通过虚拟 DOM diff）。

**后端类比**：像**纯函数**——输入（props / state）决定输出（UI），同样输入得到同样界面，无副作用。

## 2. JSX：在 JS 里写结构

JSX 是 JavaScript 的语法扩展，看起来像 HTML，编译后其实是函数调用：

```jsx
const element = <h1 className="title">订单列表</h1>;
// 编译为：React.createElement("h1", { className: "title" }, "订单列表")
```

与 HTML 的差异（**高频坑**）：

| HTML | JSX | 说明 |
|------|-----|------|
| `class` | `className` | `class` 是 JS 保留字 |
| `for` | `htmlFor` | 同上 |
| `onclick` | `onClick` | 事件名小驼峰 |
| `<br>` | `<br />` | 所有标签必须闭合 |
| `style="color:red"` | `style={{ color: "red" }}` | 传对象，不是字符串 |

在 JSX 里插入变量用 `{}`：

```jsx
const name = "订单";
const list = ["A", "B"];
return (
  <div>
    <p>{name}</p>
    <p>{1 + 1}</p>
    <ul>{list.map((x) => <li key={x}>{x}</li>)}</ul>
  </div>
);
```

`{}` 里放的是**表达式**（有返回值），不能放 `if` 语句、`for` 循环这类语句。

## 3. 函数组件与 props

现代 React 用**函数组件**：一个返回 JSX 的函数。父组件通过 props 传数据：

```jsx
function OrderCard({ title, amount, status }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>￥{amount}</p>
      <span>{status}</span>
    </div>
  );
}

// 使用
<OrderCard title="订单 A" amount={99.5} status="已支付" />
```

- props 是**只读**的，组件不能修改自己的 props（和 Vue 一样，单向数据流）。
- 用解构 `{ title, amount }` 提取，比 `props.title` 简洁。

## 4. 状态：useState

组件自己的状态用 `useState`：

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0); // [当前值, 更新函数]

  return (
    <button onClick={() => setCount(count + 1)}>
      点击了 {count} 次
    </button>
  );
}
```

三个要点：

1. **不要直接改状态**：`count++` 不会触发重渲染，必须调用 `setCount(...)`。
2. **状态更新是异步批量的**：连续 `setCount(count + 1)` 两次，count 只会加 1，因为读的是同一份旧值。要用函数式更新。

```jsx
setCount((c) => c + 1); // 基于最新值更新
setCount((c) => c + 1); // 接上一次，count 正确 +2
```

3. **状态是不可变的**：改数组 / 对象要返回新对象。

```jsx
// ❌ 直接改，UI 不更新
list.push(item);
setList(list);

// ✅ 返回新数组
setList([...list, item]);
setList(list.filter((x) => x.id !== id));
```

**后端类比**：像「不可变值对象」——不就地修改，而是产生新实例，便于比较与预测。

## 5. 列表与 key

渲染列表用 `map`，每项必须有稳定唯一的 `key`：

```jsx
<ul>
  {orders.map((o) => (
    <li key={o.id}>{o.title}</li>
  ))}
</ul>
```

`key` 帮助 React 识别哪一项是「老面孔」，从而高效复用 DOM。**不要用数组索引当 key**（增删会错位），要用数据的唯一 id。

## 6. 受控组件与表单

**受控组件**：表单元素的值由 React 状态掌控，而不是 DOM 自己管。

```jsx
function SearchBox() {
  const [keyword, setKeyword] = useState("");

  return (
    <input
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
}
```

要点：

- `value` 绑定状态、`onChange` 写回状态——**单一数据源**。
- 如果只给 `value` 不给 `onChange`，输入框会「锁死」不可编辑。

```jsx
// 提交表单
function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value })); // 合并新值
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 阻止默认提交 / 刷新
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) alert("登录失败");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={form.username} onChange={handleChange} />
      <input name="password" type="password" value={form.password} onChange={handleChange} />
      <button type="submit">登录</button>
    </form>
  );
}
```

## 7. 条件渲染

React 里用 JS 表达式做条件渲染：

```jsx
{isLogin ? <Dashboard /> : <Login />}

{loading && <Spinner />}

{error && <p className="error">{error}</p>}
```

注意 `0 && ...` 会渲染出 `0`——涉及数字判断时要用显式比较：

```jsx
{count > 0 && <p>共 {count} 条</p>}
```

## 8. 事件处理

- 事件名小驼峰：`onClick`、`onChange`、`onSubmit`。
- 传的是**函数**，不是字符串：`onClick={handleClick}`（不要 `onClick={handleClick()}`，那是立即调用）。
- 需要传参就用箭头函数包裹：`onClick={() => handleDelete(o.id)}`。

## 9. 生态

React 官方只管视图，周边按需组合：

| 关注点 | 推荐 |
|--------|------|
| 路由 | React Router |
| 数据请求 / 缓存 | TanStack Query（替代手写 `useEffect` 请求） |
| 轻量全局状态 | Zustand（比 Redux 简洁） |
| 脚手架 | Vite（`npm create vite@latest -- --template react`） |

## 10. 常见坑

- **直接改 state**：数组 / 对象就地修改不触发更新，必须换新引用。
- **用索引当 `key`**：列表增删后复用错乱。
- **`onClick={fn()}`**：立即执行而非作为回调。
- **`0 && ...` 渲染出 0**：数字判断要显式比较。
- **想直接改 props**：props 只读，改数据走状态或回调。

## 11. 小结

- React 的核心模型是 **UI = f(state)**，状态驱动渲染。
- **JSX** 用 JS 描述结构，注意 `className` / `htmlFor` / 闭合 / `style` 对象。
- **函数组件 + props（只读）** 组织界面。
- **`useState`** 管理状态；状态不可变，更新是异步批量的。
- **列表必须有稳定 `key`**，表单用**受控组件**（`value` + `onChange`）。
- 生态库里 Router、TanStack Query、Zustand 通常已够用。

下一站：[React Hooks](./hooks.md) 详解状态与副作用。
