---
title: Vue 3 组件化
category: [前端]
tag: [Vue, 组件]
---

# Vue 3 组件化

> 组件是可复用的 UI 单元：把一块「结构 + 逻辑 + 样式」封装起来，对外暴露清晰的接口（props 进、事件出）。组件化的本质是前端版的「模块化 + 接口设计」。

## 1. 组件作为接口

一个好组件，对外的契约只有两件事：

- **输入**：props（父传子）；
- **输出**：emits（子通知父）。

内部实现（DOM 结构、状态、样式）应当私有。这和后端设计一个 Service 接口是一样的：**依赖接口，不依赖实现**。

**后端类比**：组件 ≈ 一个 Spring Bean——构造参数（props）注入，对外发事件（emits）解耦调用方，内部逻辑不暴露。

## 2. 定义与使用组件

`<script setup>` 里 `import` 的组件可以直接在模板使用：

```vue
<!-- OrderCard.vue -->
<script setup>
defineProps({ title: String, amount: Number });
</script>

<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <p>￥{{ amount.toFixed(2) }}</p>
  </div>
</template>
```

```vue
<!-- 父组件 -->
<script setup>
import OrderCard from "./OrderCard.vue";
</script>

<template>
  <OrderCard title="订单 A" :amount="99.5" />
</template>
```

## 3. Props：父传子

用 `defineProps` 声明（宏，无需 import 即可用）。推荐**对象形式**，能写类型与默认值：

```vue
<script setup>
const props = defineProps({
  // 类型
  title: { type: String, required: true },
  // 带默认值
  status: { type: String, default: "pending" },
  // 多个候选类型
  amount: [Number, String],
});

console.log(props.title);
</script>
```

要点：

- **单向数据流**：props 只能读，子组件不能直接改，否则数据流向混乱。要改就通知父组件改。
- **命名**：JS 里用 camelCase，模板里用 kebab-case（`:user-name` 对应 `userName`）。
- **TypeScript**：用类型声明更清晰。

```vue
<script setup lang="ts">
interface Props {
  title: string;
  amount?: number;
}
const props = withDefaults(defineProps<Props>(), { amount: 0 });
</script>
```

## 4. Emits：子通知父

子组件想影响父组件，用 `defineEmits` 抛出事件：

```vue
<!-- OrderCard.vue -->
<script setup>
const emit = defineEmits(["delete", "select"]);

function onDelete() {
  emit("delete", 1001); // 事件名 + 载荷
}
</script>

<template>
  <button @click="onDelete">删除</button>
  <button @click="emit('select', 1001)">选择</button>
</template>
```

```vue
<!-- 父组件监听 -->
<OrderCard @delete="handleDelete" @select="handleSelect" />
```

事件名建议用 kebab-case（如 `item-removed`），与 HTML 事件风格一致。

## 5. 插槽：内容分发

Props 传的是数据，**插槽（slot）** 传的是模板片段，让组件在使用处自定义部分内容：

```vue
<!-- BaseCard.vue -->
<template>
  <div class="card">
    <header><slot name="header">默认标题</slot></header>
    <main><slot>默认内容</slot></main>
  </div>
</template>
```

```vue
<BaseCard>
  <template #header>订单详情</template>
  <p>这里是正文内容</p>
</BaseCard>
```

- 默认插槽：`<slot>...</slot>`，无 name 时可传入任意内容。
- **具名插槽**：`<slot name="header">` 对应使用处的 `#header`。
- **作用域插槽**：把子组件的数据「传递」给插槽内容使用。

```vue
<!-- List.vue -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item">{{ item.name }}</slot>   <!-- 把 item 传给父 -->
    </li>
  </ul>
</template>
```

```vue
<List :items="orders">
  <template #default="{ item }">
    <strong>{{ item.title }}</strong> - {{ item.status }}
  </template>
</List>
```

作用域插槽是「组件提供数据、使用方决定如何渲染」的关键，等价于后端把数据通过回调（callback）交给调用方。

## 6. v-model：双向绑定与自定义组件

`v-model` 是「`:modelValue` + `@update:modelValue`」的语法糖。

在自定义组件里实现双向绑定：

```vue
<!-- CustomInput.vue -->
<script setup>
defineProps({ modelValue: String });
const emit = defineEmits(["update:modelValue"]);

function onInput(e) {
  emit("update:modelValue", e.target.value);
}
</script>

<template>
  <input :value="modelValue" @input="onInput" />
</template>
```

使用：

```vue
<CustomInput v-model="keyword" />
<!-- 等价于 <CustomInput :model-value="keyword" @update:model-value="keyword = $event" /> -->
```

Vue 3 还支持**具名 v-model**：`v-model:title="x"` 对应子组件的 `title` prop 与 `update:title` 事件。

## 7. provide / inject：跨层级注入

props 只能逐层往下传，中间层级一多就成了「prop 钻取」。`provide/inject` 让祖先直接向后代注入依赖：

```vue
<!-- 祖先 -->
<script setup>
import { provide, ref } from "vue";
const theme = ref("light");
provide("theme", theme);
</script>
```

```vue
<!-- 任意后代，不受层级限制 -->
<script setup>
import { inject } from "vue";
const theme = inject("theme", "light"); // 第二个参数是默认值
</script>
```

**后端类比**：像**依赖注入**——祖先「注册」依赖，后代「按需获取」，跳过中间层。但要克制使用：注入的依赖是隐式的，来源不直观，滥用会让数据流难追踪。

## 8. 组合式函数（Composables）

把「带状态的复用逻辑」抽成函数，是 Vue 3 复用代码的主力（替代 Vue 2 的 mixin）。约定命名以 `use` 开头：

```js
// useCounter.js
import { ref } from "vue";

export function useCounter(initial = 0) {
  const count = ref(initial);
  const increment = () => count.value++;
  const reset = () => (count.value = initial);
  return { count, increment, reset };
}
```

```vue
<script setup>
import { useCounter } from "./useCounter";

const { count, increment, reset } = useCounter(10);
</script>
```

数据请求的封装也很典型：

```js
// useRequest.js
import { ref, onMounted } from "vue";

export function useRequest(url) {
  const data = ref(null);
  const loading = ref(true);
  const error = ref(null);

  onMounted(async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data.value = await res.json();
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  });

  return { data, loading, error };
}
```

**后端类比**：composable 像可复用的「工具方法 / 切面」——把重复的状态逻辑打包，谁需要谁 `import`。

组织约定很简单：一个 composable 只负责一件事（取数、表单、订阅其中之一），返回的是 `ref` / 响应式对象而不是原始值，命名一律 `useXxx`。这样组件里一眼就能看出「这块逻辑来自哪个 composable」。

## 9. 组件通信方式一览

组件间传递数据有多种渠道，按「耦合度从低到高」选择：

| 场景 | 方式 | 方向 |
|------|------|------|
| 父传子 | props | 单向向下 |
| 子通知父 | emits | 向上通知 |
| 双向绑定 | `v-model`（`:modelValue` + `update:modelValue`） | 双向 |
| 传模板 | 插槽（含作用域插槽） | 父决定渲染 |
| 跨层级注入 | provide / inject | 祖先 → 后代 |
| 全局共享 | Pinia 等全局状态 | 任意组件 |

选择原则：

- 能用 **props / emits** 解决的，不要上 `provide/inject`；
- 能局部解决的，不要上**全局状态**；
- 每上一种渠道，数据流就更难追踪、调试成本随之上升。

举一个组合的例子：一个「订单表格」组件，父组件传 `orders`（props），行内删除按钮通过 `emits` 通知父组件；表头允许父自定义渲染（作用域插槽）；主题色来自祖先 `provide`。多种渠道各司其职，而不是一种硬扛到底。

## 10. 组件设计原则

- **展示组件纯、容器组件拉数**：展示组件只接收 props 渲染 UI；容器组件负责请求数据、管理状态。
- **props 明确、事件清晰**：接口窄而稳定，避免传一大坨对象。
- **单一职责**：一个组件只做一件事，超过几百行就该拆。
- **避免 props 钻取**：层级深时用 provide/inject 或全局状态（Pinia）。
- **有副作用就清理**：组件卸载时取消请求、清除定时器。

常见反模式：

- 把整个大对象当 props 往下传，子组件其实只用一个字段；
- 子组件 `emit("update", value)` 让父改任意数据，接口含义含糊；
- 一个组件既拉数据又渲染又处理业务，动辄几百行；
- 通过 `getCurrentInstance` 之类的黑魔法直接访问父组件实例，破坏封装。

## 11. 性能优化

- **`v-if` 与 `v-show`**：频繁切换用 `v-show`（只切 display），条件罕见用 `v-if`。
- **大列表虚拟滚动**：一次渲染上万个 DOM 会卡，用虚拟滚动只渲染可视区。
- **`computed` 缓存**：派生数据用 `computed`，别在模板里写重计算。
- **`v-memo` / `v-once`**：静态内容或不常变的子树可跳过更新。
- **`<KeepAlive>` 缓存组件**：多标签来回切换时复用组件实例，避免重复创建与请求。
- **组件懒加载**：路由级用 `() => import("./Page.vue")` 按需加载。

```js
const routes = [
  { path: "/orders", component: () => import("./views/Orders.vue") },
];
```

## 12. 小结

- 组件 = **props 进 + emits 出**的接口，内部实现私有。
- **props 单向数据流**，子组件要改数据就发事件让父组件改。
- **插槽**传模板，**作用域插槽**把子数据交给父渲染。
- **`v-model`** 是 `:modelValue` + `update:modelValue` 的语法糖。
- **provide / inject** 跨层级注入，但要克制。
- **组合式函数**（`useXxx`）是复用逻辑的首选，替代 mixin。
- 通信方式**按需选择**，性能上关注**列表、缓存、懒加载**三件事。

回顾基础：[Vue 3 基础](./overview.md)。
