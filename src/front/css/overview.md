---
date: 2026-10-11
title: CSS 基础与布局
category: [前端]
tag: [CSS, 布局]
---

# CSS 基础与布局

> CSS（Cascading Style Sheets，层叠样式表）描述页面的**表现**：元素多大、什么颜色、摆在哪里。如果 HTML 是结构、JS 是行为，CSS 就是「把结构画出来」的那一层。

## 1. 从后端视角理解 CSS

CSS 是一套**声明式规则**：你只描述「希望长什么样」，不写「怎么算坐标」。这类似用 SQL 做声明式查询——你不关心数据库怎么走索引（那是优化器的事），CSS 里你也不关心排版引擎怎么算出每个元素的位置。

一条 CSS 规则由「选择器 + 声明块」组成：

```css
/* 选择器            声明块 */
.order-card    { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
.order-card h2 { font-size: 18px; margin: 0 0 8px; }
```

## 2. 如何把 CSS 接到页面

| 方式 | 写法 | 评价 |
|------|------|------|
| 外链 | `<link rel="stylesheet" href="app.css">` | **推荐**，可缓存、可维护 |
| 内联样式表 | `<style> ... </style>` | 演示、单页临时用 |
| 行内样式 | `<div style="color:red">` | 难维护，尽量别用 |

现代工程里，样式通常由构建工具（Vite / Webpack）处理后注入，源码写在 `.vue`、`.module.css` 等文件中。

## 3. 选择器与优先级

常用选择器：

| 选择器 | 示例 | 命中 |
|--------|------|------|
| 元素 | `p` | 所有 `<p>` |
| 类 | `.btn` | `class` 含 `btn` 的元素 |
| ID | `#app` | `id` 为 `app` 的元素 |
| 后代 | `.card h2` | `.card` 内的所有 `<h2>` |
| 子代 | `.card > h2` | 只命直接子元素 |
| 属性 | `input[type="text"]` | 特定属性 |
| 伪类 | `a:hover` / `li:nth-child(2)` | 状态 / 位置 |
| 伪元素 | `p::first-line` | 元素的某部分 |

**层叠与优先级**：当多条规则命中同一元素，浏览器按「优先级 + 书写顺序」决定谁生效。优先级权重：

```
行内样式 (1000) > ID (100) > 类/属性/伪类 (10) > 元素/伪元素 (1) > 通配 (0)
```

`!important` 会强行拔高优先级——**能不用就不用**，它会让后续维护变成猜谜。

::: tip 后端类比
优先级像「配置覆盖」：默认配置 < 环境配置 < 命令行参数。层叠就是多层配置按权重合并。
:::

## 4. 盒模型

页面上每个元素都是一个**矩形盒子**，由内到外分四层：

```
┌──────── margin（外边距，透明）────────────┐
│  ┌──── border（边框）──────────────────┐  │
│  │  ┌── padding（内边距）───────────┐  │  │
│  │  │      content（内容区）        │  │  │
│  │  └──────────────────────────────┘  │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

- `content`：内容占据的区域（`width` / `height` 默认指它）。
- `padding`：内容与边框之间的空间，带背景色。
- `border`：边框，可设粗细 / 样式 / 颜色。
- `margin`：盒子与盒子之间的间距，透明。

**关键坑 —— `box-sizing`**：

```css
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid;
}
/* 默认 content-box：实际总宽 = 200 + 20*2 + 2*2 = 244px */
```

`content-box`（默认）下，`padding` 和 `border` 会**加宽**元素，导致「设了 200px 实际却占 244px」。解决办法是全局改成 `border-box`：

```css
*, *::before, *::after { box-sizing: border-box; }
/* 现在 width:200px 已含 padding 与 border，总宽就是 200px */
```

这是几乎所有现代项目的默认设置，务必理解。

## 5. 布局体系（一）：文档流与定位

默认情况下，块级元素（`div`、`p`）独占一行、自上而下排列；行内元素（`span`、`a`）在行内水平排列——这叫**普通文档流**。

`position` 让元素脱离常规流：

| 值 | 行为 |
|----|------|
| `static` | 默认，跟随文档流 |
| `relative` | 相对自身原位偏移，**原位置仍被占据** |
| `absolute` | 相对最近的定位祖先偏移，**脱离文档流** |
| `fixed` | 相对视口固定（吸顶、悬浮按钮） |
| `sticky` | 滚动到阈值前正常，之后粘住（吸顶表头） |

```css
.toast {
  position: fixed;
  right: 24px;
  bottom: 24px;   /* 右下角悬浮提示 */
}
```

## 6. 布局体系（二）：Flex 弹性布局

Flex（Flexible Box）是**一维**布局，专治「一行或一列里如何分配空间与对齐」。开关：给父容器设 `display: flex`，子项自动成为 flex item。

```css
.navbar {
  display: flex;
  justify-content: space-between;  /* 主轴方向分布：两端对齐 */
  align-items: center;             /* 交叉轴居中对齐 */
  gap: 12px;
}
```

核心概念：

- **主轴（main axis）**：由 `flex-direction` 决定（`row` 默认横向，`column` 纵向）。
- `justify-content`：主轴方向的对齐分配（`flex-start` / `center` / `space-between` / `space-around`）。
- `align-items`：交叉轴对齐（`stretch` / `center` / `flex-start`）。
- `flex: 1`：子项按比例伸缩，常用来做「中间自适应、两侧固定」。

经典三栏布局：

```css
.layout  { display: flex; height: 100vh; }
.sidebar { width: 240px; flex-shrink: 0; }  /* 固定宽，不收缩 */
.content { flex: 1; overflow: auto; }        /* 占满剩余空间 */
```

| 属性 | 作用 |
|------|------|
| `flex-direction` | 主轴方向 |
| `flex-wrap` | 是否换行 |
| `justify-content` | 主轴向对齐 |
| `align-items` | 交叉轴对齐 |
| `flex`（子项） | `flex-grow flex-shrink flex-basis` 的简写 |
| `gap` | 项间距 |

## 7. 布局体系（三）：Grid 网格布局

Grid 是**二维**布局，能同时控制行与列，适合整页骨架、卡片墙。开关：`display: grid`。

```css
.card-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
```

- `grid-template-columns`：定义列。`repeat(auto-fill, minmax(240px, 1fr))` 表示「每列最少 240px、最多均分剩余空间，能塞几列塞几列」——一行即实现自适应卡片墙。
- `grid-template-rows`：定义行。
- `gap`：行列间距。
- 子项可用 `grid-column: span 2` 跨列。

整页骨架：

```css
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
.page > header { grid-area: header; }
.page > aside  { grid-area: sidebar; }
.page > main   { grid-area: main; }
.page > footer { grid-area: footer; }
```

**Flex 还是 Grid**：

| 场景 | 选择 |
|------|------|
| 导航条、工具条、一行内元素对齐 | Flex |
| 一列内元素纵向排列 | Flex（`column`） |
| 卡片墙、整页骨架、行列都要控 | Grid |
| 需要按「区域命名」布局 | Grid（`grid-template-areas`） |

经验法则：**一维用 Flex，二维用 Grid**；两者常混用（Grid 搭骨架，内部元素用 Flex 对齐）。

## 8. BFC（块级格式化上下文）

BFC（Block Formatting Context）是一个**独立的渲染区域**：区域内的布局规则与外部互不干扰，内部的浮动、外边距不会「漏」到外面。

触发 BFC 的常见方式（现代 CSS 里推荐 `display: flow-root`）：

| 触发方式 | 说明 |
|----------|------|
| `display: flow-root` | **推荐**，纯为创建 BFC，无副作用 |
| `overflow: hidden` / `auto` | 老牌做法，但会裁剪溢出内容 |
| `display: flex` / `grid` | flex / grid 容器本身形成 BFC |
| `position: absolute` / `fixed` | 定位元素形成 BFC |
| `float: left` / `right` | 浮动元素形成 BFC |

BFC 的经典用途：

1. **清除浮动**。子元素 `float` 后脱离文档流，父元素高度塌陷为 0；父元素触发 BFC 后重新包住浮动子元素。

```css
.parent { display: flow-root; } /* 高度不再塌陷 */
.child  { float: left; }
```

2. **阻止 margin 塌陷**。相邻块级元素的上下 `margin` 会合并（取较大值），把其中一个放进独立 BFC 可避免。

3. **避免浮动元素环绕文字**。给文字块建 BFC，它就与浮动元素各占一块。

::: tip 与后端类比
BFC 像「隔离的作用域」：区域内的布局计算不泄漏到外部，类似事务隔离或命名空间隔离——内部怎么折腾，外部不受影响。
:::

## 9. 响应式与相对单位

移动优先：默认写移动端样式，再用媒体查询向上适配大屏。

```css
/* 默认移动端样式 */
.grid { display: grid; grid-template-columns: 1fr; }

@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1200px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}
```

常用单位：

| 单位 | 含义 | 适用 |
|------|------|------|
| `px` | 像素 | 边框、固定尺寸 |
| `%` | 相对父元素 | 宽度 |
| `rem` | 相对根字号 | 字号、间距（随根调整整体缩放） |
| `em` | 相对自身字号 | 组件内间距 |
| `vw` / `vh` | 相对视口宽 / 高 | 全屏区块 |

## 10. 命名与可维护性

CSS 是全局作用域的，类名冲突是常见事故。主流方案：

- **BEM 命名**：`block__element--modifier`，如 `.order-card__title--active`，靠命名约定避免冲突。
- **CSS Modules**：类名在构建时被哈希化，天然隔离，源码里的 `.title` 编译后变成 `.title_a1b2c3`。
- **原子化 CSS**（如 Tailwind）：用一组小类组合出样式，减少自造类名。

```css
/* BEM 示例 */
.order-card { }
.order-card__title { }
.order-card__title--highlighted { }
```

## 11. 常见坑

- **忘记 `box-sizing: border-box`**：宽度算不对。
- **乱用 `!important`**：优先级失控，改动互相打架。
- **margin 塌陷**：父子或相邻元素间距「消失」，用 BFC 或 padding 解决。
- **高度写死**：内容超长溢出，尽量用 `min-height`。
- **浮动不清除**：父容器高度塌陷，用 `flow-root` 或直接改用 Flex / Grid。

## 12. 小结

- CSS 是**声明式**的样式层，选择器 + 声明块构成规则，层叠按优先级合并。
- **盒模型**是布局的地基，全局 `border-box` 是标配。
- **一维用 Flex、二维用 Grid**，两者常配合使用。
- **BFC** 是独立渲染区域，用来清浮动、防 margin 塌陷、避免文字环绕。
- 响应式走「移动优先 + 媒体查询」，命名用 BEM / CSS Modules 防冲突。

CSS 之后，用 [JavaScript 基础](../js/overview.md) 让页面「动」起来。
