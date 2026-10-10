---
date: 2026-10-11
title: React Hooks
category: [前端]
tag: [React, Hooks]
---

# React Hooks

> Hooks 让函数组件拥有状态、生命周期与逻辑复用能力。理解 Hooks 的关键，是两条铁律，以及「每次渲染都是一次函数调用」这个前提。

## 1. 为什么有 Hooks

Hooks 之前，只有类组件能有状态，逻辑复用靠高阶组件 / render props，导致「层层包裹」和 `this` 之痛。Hooks 把状态与副作用直接搬进函数组件，并把复用单位从「组件」变成「函数」。

**后端类比**：Hooks 像**切面 / 拦截器**——在函数组件的调用链上按顺序登记「状态」「副作用」「缓存」等能力。

一个前提要牢记：**每次渲染都会重新调用组件函数**。函数里的普通变量每次都重建；`useState`、`useRef` 之所以能「记住」值，是因为 React 在底层把这些值与「调用顺序」一一对应存储。这就是为什么 Hooks 不能放进条件 / 循环——顺序一乱，React 就对不上号了。

## 2. 两条铁律

1. **只在顶层调用 Hook**：不要放进 `if`、`for`、`while`、嵌套函数里。
2. **只在 React 函数组件 / 自定义 Hook 里调用**：不要在普通 JS 函数里调。

```jsx
// ❌ 错误：在条件里调用
function Bad({ show }) {
  if (show) {
    const [x, setX] = useState(0); // 违反规则
  }
}

// ✅ 正确：Hook 在顶层，条件用在 JSX 里
function Good({ show }) {
  const [x, setX] = useState(0);
  return show ? <p>{x}</p> : null;
}
```

React 通过 ESLint 插件 `eslint-plugin-react-hooks` 在编译期检查这两条规则。

## 3. useState：状态

```jsx
import { useState } from "react";

const [count, setCount] = useState(0);
```

- 参数是初始值（只在首次渲染使用）。
- 返回 `[当前值, 更新函数]`。
- 更新是异步批量的，依赖旧值时必须用函数式更新。

```jsx
setCount((c) => c + 1); // ✅ 基于最新值
```

惰性初始化：初始值计算很贵时传函数，只在首次执行一次。

```jsx
const [data] = useState(() => heavyCompute());
```

## 4. useEffect：副作用

副作用（side effect）指渲染之外的操作：请求数据、订阅、手动改 DOM、计时器。`useEffect` 在渲染后执行它们。

```jsx
useEffect(() => {
  // 副作用：组件挂载后、依赖变化后执行
  return () => {
    // 清理函数：卸载前、下次执行前调用
  };
}, [deps]); // 依赖数组
```

**依赖数组决定何时重跑**，这是最容易出错的地方：

| 依赖数组 | 执行时机 |
|----------|----------|
| 不写 | 每次渲染后都执行 |
| `[]` | 只在挂载后执行一次 |
| `[a, b]` | 挂载后 + `a` 或 `b` 变化后 |

### 请求数据 + 清理

```jsx
function OrderList({ userId }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let cancelled = false; // 防止竞态：组件已卸载 / 参数已变时丢弃结果

    fetch(`/api/orders?userId=${userId}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setOrders(data);
      });

    return () => {
      cancelled = true;
    };
  }, [userId]); // userId 变化时重新拉取

  return <ul>{orders.map((o) => <li key={o.id}>{o.title}</li>)}</ul>;
}
```

### 订阅与事件解绑

```jsx
useEffect(() => {
  const onResize = () => console.log(window.innerWidth);
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize); // 清理，防泄漏
}, []);
```

::: note 与 useLayoutEffect 的区别
`useLayoutEffect` 用法与 `useEffect` 一致，但它在**浏览器绘制前**同步执行，适合需要在用户看到界面前测量布局、避免闪烁的场景。绝大多数情况用 `useEffect` 即可。
:::

::: warning 清理函数不能省
订阅、计时器、请求都要在清理函数里收尾。否则组件卸载后回调仍在运行，造成内存泄漏，以及「在已卸载组件上 setState」的告警。
:::

## 5. useRef：跨渲染保存可变值

`useRef` 返回一个 `{ current }` 对象，修改它**不会触发重渲染**，且在整个组件生命周期内保持同一引用。

两种用途：

```jsx
import { useRef } from "react";

function FocusInput() {
  const inputRef = useRef(null); // ① 引用 DOM 节点

  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>聚焦</button>
    </>
  );
}
```

```jsx
const renderCount = useRef(0); // ② 保存不引起渲染的可变值
renderCount.current += 1;
```

**`useRef` vs `useState`**：要显示到界面上的变化用 `useState`；只用来「记住」、不影响渲染的值（计时器 id、上一次的值、DOM 引用）用 `useRef`。

## 6. useMemo 与 useCallback：性能优化

两者都用来**缓存**，避免每次渲染重复计算或重建引用。

```jsx
import { useMemo, useCallback } from "react";

// useMemo 缓存「计算结果」
const total = useMemo(() => {
  return orders.reduce((sum, o) => sum + o.amount, 0);
}, [orders]); // orders 不变就不重算

// useCallback 缓存「函数引用」
const handleSelect = useCallback((id) => {
  console.log("选择了", id);
}, []); // 依赖不变则返回同一个函数
```

- 什么时候用？当**计算确实昂贵**，或**引用稳定对下游有影响**（比如传给 `React.memo` 的子组件）时。
- 不要无脑包：绝大多数场景提前优化反而增加复杂度，**先测量、再优化**。

**后端类比**：`useMemo` 像带失效条件的本地缓存；`useCallback` 像复用同一个对象引用，避免下游「误判变了」。

## 7. useContext：跨层级共享

`useContext` 读取上层 `Context` 提供的值，避免 props 逐层传递：

```jsx
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");

// 祖先提供
<ThemeContext.Provider value="dark">
  <Toolbar />
</ThemeContext.Provider>

// 任意后代读取
function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>工具栏</div>;
}
```

**后端类比**：像**依赖注入 / `ThreadLocal`**——祖先注册，后代按需取，跳过中间层。注意 Context 的值一变化，**所有消费该 Context 的组件都会重渲染**，不要往 Context 里塞频繁变化的巨量数据。

## 8. useReducer：复杂状态逻辑

状态更新逻辑复杂、下一个状态依赖前一个时，用 `useReducer` 把逻辑集中到一个 reducer 函数：

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });
// dispatch({ type: "increment" });
```

**后端类比**：像**状态机 / 事件溯源**——所有状态迁移都经由 `action → reducer` 集中处理，便于推理与测试。适合多字段联动、有多个动作类型的场景。

## 9. 自定义 Hook

把可复用的**状态逻辑**抽成 `useXxx` 函数（内部可调用其它 Hook），是 Hooks 最大的价值。

```jsx
// useRequest.js
import { useState, useEffect } from "react";

export function useRequest(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => { if (!cancelled) setData(d); })
      .catch((e) => { if (!cancelled) setError(e); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}
```

使用：

```jsx
function Orders() {
  const { data, loading, error } = useRequest("/api/orders");

  if (loading) return <p>加载中…</p>;
  if (error) return <p>加载失败：{error.message}</p>;
  return <ul>{data.map((o) => <li key={o.id}>{o.title}</li>)}</ul>;
}
```

再比如把组件状态同步到 `localStorage`：

```jsx
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

防抖是搜索框的常见需求，也可抽成 Hook：

```jsx
import { useState, useEffect } from "react";

// 值稳定 delay 毫秒后才更新，用于减少高频请求
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // 值再次变化时取消上一次，实现防抖
  }, [value, delay]);

  return debounced;
}
```

自定义 Hook **共享的是逻辑，不是状态**——两个组件各调一次 `useRequest`，状态各自独立。命名一律 `use` 开头，既是约定，也让 lint 能识别它是 Hook。

## 10. 常见坑

- **依赖数组漏项**：用了 `userId` 却没写进依赖，会让 effect「读旧值」。
- **依赖是对象 / 数组**：每次渲染都是新引用，导致 effect 反复执行。要么只依赖其内部基本字段，要么用 `useMemo` 稳定引用。
- **忘记清理**：订阅 / 计时器 / 请求不清理，造成泄漏。
- **无条件调用 Hook**：放进 `if` 后报「Rendered fewer hooks than expected」。
- **过度用 `useMemo` / `useCallback`**：增加复杂度却无收益，先测量再优化。
- **把 `useRef` 当状态用**：改了 `.current` 界面不更新，需要渲染的用 `useState`。
- **在事件回调里读旧 state**：闭包捕获的是当次渲染的值，需要最新值改用函数式更新或 `useRef`。

## 11. 小结

- Hooks 让函数组件拥有状态与副作用，前提是「**每次渲染即一次函数调用**」。
- **两条铁律**：只在顶层调用、只在函数组件 / 自定义 Hook 里调用。
- **`useState`** 管状态（不可变、异步批量）；**`useEffect`** 管副作用（依赖数组 + 清理）。
- **`useRef`** 保存跨渲染可变值；**`useMemo` / `useCallback`** 缓存计算与函数引用。
- **`useContext`** 跨层共享，**`useReducer`** 管理复杂状态。
- **自定义 Hook** 复用逻辑而非状态，是组件保持「薄」的关键。

回顾：[React 基础](./overview.md)。
