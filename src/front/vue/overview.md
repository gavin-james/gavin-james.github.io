---
date: 2026-10-11
title: Vue 3 基础
category: [前端]
tag: [Vue, 组合式API]
---

# Vue 3 基础

> Vue 是一个渐进式前端框架：核心只负责「数据 → 视图」的**声明式**绑定，路由、状态管理等按需引入。它上手快、模板直观，是国内业务系统采用率最高的框架之一。

## 1. 心智模型：数据驱动视图

命令式的前端操作是这样的：

```js
// 命令式：手动找元素、改内容
const el = document.getElementById("count");
el.textContent = count;
```

数据一变，就要手写代码同步 DOM，容易漏、容易乱。Vue 的思路是**声明式**：

```html
<!-- 声明式：只声明「这里显示 count」 -->
<span>{{ count }}</span>
```

`count` 一变，视图自动更新。这是 Vue 一切能力的起点。

**后端类比**：像「配置驱动」而非「命令式调用」——你声明期望状态，框架负责把实际状态对齐到期望状态。

## 2. 一个最小示例

用 Vite 脚手架创建项目（`npm create vite@latest my-app -- --template vue`）后，核心文件是一个**单文件组件**（Single-File Component, SFC），把模板、逻辑、样式放在一个 `.vue` 文件里：

```vue
<script setup>
import { ref } from "vue";

const count = ref(0); // 响应式数据
function increment() {
  count.value++;      // 在 JS 里访问或修改要用 .value
}
</script>

<template>
  <button @click="increment">点击了 {{ count }} 次</button>
</template>

<style scoped>
button { padding: 8px 16px; }
</style>
```

三块各司其职：`<script setup>`（逻辑）、`<template>`（结构）、`<style scoped>`（样式，`scoped` 表示只作用于本组件）。

## 3. 模板语法

模板是合法 HTML 加上 Vue 指令。**插值**用双大括号：

```html
<p>{{ message }}</p>
<p>{{ price.toFixed(2) }}</p>
```

**指令**以 `v-` 开头，改变元素行为：

| 指令 | 作用 | 示例 |
|------|------|------|
| `v-bind`（简写 `:`） | 绑定属性 | `:href="url"` |
| `v-on`（简写 `@`） | 绑定事件 | `@click="submit"` |
| `v-if` / `v-else` | 条件渲染 | `v-if="isLogin"` |
| `v-show` | 显隐（切 `display`） | `v-show="open"` |
| `v-for` | 列表渲染 | `v-for="item in list"` |
| `v-model` | 双向绑定表单 | `v-model="keyword"` |

```html
<ul>
  <li v-for="order in orders" :key="order.id">
    {{ order.title }} - {{ order.status }}
  </li>
</ul>

<input v-model="keyword" placeholder="搜索" />
<button :disabled="!keyword" @click="search">查询</button>
```

`v-if` 与 `v-show` 的区别：`v-if` 真正创建 / 销毁元素，`v-show` 只切 `display`。频繁切换用 `v-show`，条件很少变用 `v-if`。

`v-for` 一定要写 `:key`，给每项一个稳定唯一标识，帮助 Vue 高效复用 DOM。

## 4. 响应式原理：Proxy

Vue 2 用 `Object.defineProperty` 逐个属性劫持，改不了新增属性、数组下标也监听不到。**Vue 3 改用 `Proxy`**：在对象外面套一层代理，任何读写都会经过它，因此能追踪属性的增删与嵌套变化。

```js
const state = new Proxy(
  { count: 0 },
  {
    get(target, key) { return Reflect.get(target, key); },
    set(target, key, value) {
      const result = Reflect.set(target, key, value);
      // 这里触发依赖该属性的视图重新渲染
      return result;
    },
  }
);
```

两个核心 API：

| API | 适用 | 访问方式 |
|-----|------|----------|
| `ref(x)` | 任意类型（含原始值） | `.value` |
| `reactive(obj)` | 对象 / 数组 | 直接访问属性 |

```js
import { ref, reactive } from "vue";

const count = ref(0);                        // count.value 读写
const form = reactive({ name: "", age: 0 }); // form.name 读写

count.value++;
form.name = "订单";
```

**规则**：`ref` 在 `<script>` 里取值要 `.value`，在 `<template>` 里自动解包（写 `count` 即可）。`reactive` 只能包对象。

**后端类比**：响应式像**观察者模式**——数据是被观察者，用到它的视图是观察者，数据一变就通知观察者重渲染。类似数据变更触发 `ApplicationEvent`。

## 5. 生命周期

组件从创建到销毁有一系列钩子。组合式 API 里用 `onXxx` 注册：

| 阶段 | 钩子 | 常用场景 |
|------|------|----------|
| 创建 | `setup` | 初始化响应式数据、组合式函数 |
| 挂载前 | `onBeforeMount` | 少见 |
| 挂载后 | `onMounted` | 请求数据、操作 DOM、初始化第三方库 |
| 更新前 | `onBeforeUpdate` | 少见 |
| 更新后 | `onUpdated` | DOM 更新后再操作 |
| 卸载前 | `onBeforeUnmount` | 清理计时器、取消请求、解绑事件 |
| 卸载后 | `onUnmounted` | 释放资源 |

```vue
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const orders = ref([]);
let timer = null;

onMounted(async () => {
  const res = await fetch("/api/orders");
  orders.value = await res.json();
  timer = setInterval(refresh, 30000);
});

onBeforeUnmount(() => {
  clearInterval(timer); // 必须清理，否则内存泄漏
});
</script>
```

::: warning 清理很重要
`onMounted` 里启动的计时器、订阅、请求，都要在 `onBeforeUnmount` 里收尾，否则组件销毁后仍在运行，造成内存泄漏——类似后端里连接 / 线程不关闭。
:::

## 6. 组合式 API

Vue 3 主推**组合式 API（Composition API）**：把「同一个功能相关的数据 + 逻辑」写在一起，而不是像选项式 API 那样按 `data`、`methods`、`computed` 分块散落。

```vue
<script setup>
import { ref, computed } from "vue";

const keyword = ref("");
const orders = ref([]);

// 计算属性：依赖变化时才重算，且有缓存
const filtered = computed(() =>
  orders.value.filter((o) => o.title.includes(keyword.value))
);
</script>
```

`computed` 与普通函数调用的区别：计算属性会**缓存**，依赖没变就复用上次结果。

`<script setup>` 是 `<script>` + `setup()` 的语法糖，顶层变量与函数自动暴露给模板，无需手动 `return`。

## 7. 路由与状态管理

- **Vue Router**：管理页面跳转与 URL 映射，类似后端的路由表。

```js
const routes = [
  { path: "/", component: Home },
  { path: "/orders/:id", component: OrderDetail },  // :id 是路径参数
];
```

- **Pinia**：跨组件共享状态（登录用户、购物车），替代早期 Vuex，写法更简洁。

```js
export const useUserStore = defineStore("user", {
  state: () => ({ token: "", name: "" }),
  actions: {
    login(token) { this.token = token; },
  },
});
```

**后端类比**：Router 是「路由映射」，Pinia 是「应用级缓存 / 会话状态」——组件间的共享内存。

## 8. 常见坑

- **解构响应式对象会丢失响应**：`const { name } = reactive(form)` 后 `name` 是快照，改它不影响原对象。要用 `toRefs`。
- **`ref` 忘记 `.value`**：在 `<script>` 里读写的是 `.value`，漏了就没生效。
- **`v-for` 没写 `:key`**：列表更新时 DOM 复用错乱。
- **用 `v-if` 切换成本高的组件**：频繁切换用 `v-show`。
- **忘记清理副作用**：定时器、全局事件在组件卸载后仍运行。

## 9. 小结

- Vue 是**声明式**框架：声明数据，视图自动同步。
- 单文件组件把模板、逻辑、样式收进一个 `.vue` 文件。
- 模板用**指令**（`v-bind` / `v-on` / `v-if` / `v-for` / `v-model`）表达动态行为。
- **Proxy** 是 Vue 3 响应式的内核；`ref` 包值、`reactive` 包对象。
- **生命周期**提供挂载 / 卸载等时机，副作用记得在卸载时清理。
- **组合式 API** 按功能组织逻辑，`computed` 带缓存。

深入组件协作：[Vue 3 组件化](./component.md)；想对比另一条技术栈看 [React 基础](../react/overview.md)。
