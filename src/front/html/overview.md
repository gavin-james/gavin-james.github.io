---
date: 2026-10-11
title: HTML 基础
category: [前端]
tag: [HTML, 语义化]
---

# HTML 基础

> HTML（HyperText Markup Language，超文本标记语言）描述页面的**结构**：页面由哪些元素组成、谁包含谁、各自承担什么语义。

## 1. 从后端视角理解 HTML

后端返回 JSON，前端 `JSON.parse` 得到对象树；浏览器把 HTML 文本解析成一棵 **DOM 树**（Document Object Model，文档对象模型），之后的 CSS 渲染、JS 操作都围绕这棵树进行。可以把 HTML 看成「对象树的文本序列化形式」：

```html
<article class="order">        <!-- 相当于一个 order 对象 -->
  <h2>订单 1001</h2>           <!-- 一个字段 -->
  <span>已支付</span>          <!-- 另一个字段 -->
</article>
```

区别在于：JSON 描述**数据**，HTML 描述**界面结构**。后端拿到的通常是前者，前端两者都要。

## 2. 文档骨架

一个标准 HTML5 文档：

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>订单中心</title>
  </head>
  <body>
    <!-- 页面可见内容都写在这里 -->
    <h1>订单列表</h1>
  </body>
</html>
```

各部分职责：

| 部分 | 作用 | 后端类比 |
|------|------|----------|
| `<!DOCTYPE html>` | 声明 HTML5 文档类型 | 类似协议版本头 |
| `<html lang>` | 根元素，`lang` 影响无障碍与搜索引擎 | 类似报文头 |
| `<head>` | 元信息：字符集、视口、标题、样式、脚本 | 类似配置区 |
| `<body>` | 用户可见内容 | 类似响应正文 |

两个必设项：

- `<meta charset="UTF-8">`：不写中文可能乱码，等同后端响应必须带正确字符集。
- `<meta name="viewport" ...>`：移动端适配的前提，缺了页面会按桌面宽度整体缩放。

## 3. 语义化标签

早期页面用一堆 `<div>` 堆出结构，谁也看不出哪块是导航、哪块是正文。HTML5 引入语义化标签，让标签名本身就表达含义：

| 标签 | 语义 |
|------|------|
| `<header>` | 页头或区块头部 |
| `<nav>` | 导航链接 |
| `<main>` | 页面唯一主内容 |
| `<article>` | 独立可复用的内容（如一篇帖子） |
| `<section>` | 主题性分块 |
| `<aside>` | 侧边栏 / 补充内容 |
| `<footer>` | 页脚 |

好处：无障碍工具、搜索引擎，以及读代码的人都能理解结构，也让 CSS、JS 的选择器更有意义。

```html
<body>
  <header><h1>运维平台</h1></header>
  <nav>
    <a href="/orders">订单</a>
    <a href="/users">用户</a>
  </nav>
  <main>
    <article>
      <h2>今日告警</h2>
      <p>共 3 条未处理。</p>
    </article>
  </main>
  <footer>© 2026 运维平台</footer>
</body>
```

::: tip 原则
能表达语义就用语义标签，表达不了再用 `<div>` / `<span>` 兜底，不要用 `<div>` 搭建一切。
:::

## 4. 常用内联标签

| 标签 | 用途 |
|------|------|
| `<a href>` | 超链接 |
| `<img src alt>` | 图片，`alt` 是替代文本 |
| `<button>` | 按钮 |
| `<strong>` / `<em>` | 强调（有语义，而非纯加粗） |
| `<code>` / `<pre>` | 行内代码 / 代码块 |
| `<span>` | 无语义的行内容器 |

## 5. 表单

表单是后端同学与前端交集最多的部分：它把用户输入以 `键=值` 的形式提交给后端。

```html
<form action="/api/login" method="post">
  <label for="username">用户名</label>
  <input id="username" name="username" type="text" required />

  <label for="password">密码</label>
  <input id="password" name="password" type="password" required />

  <button type="submit">登录</button>
</form>
```

关键点：

- `name` 才是提交时的字段名；没有 `name` 的控件不会被提交。**后端收不到参数，先查 `name` 是否写对。**
- `label` 的 `for` 要对应控件的 `id`，点击文字即可聚焦输入框（无障碍工具也会读出来）。
- `method` 常用 `get`（拼在 URL 上）与 `post`（放在请求体里）。
- HTML5 内置校验：`required`、`type="email"`、`min` / `max`、`pattern` 等。

常见控件类型：

| `type` | 用途 |
|--------|------|
| `text` / `password` | 文本 / 密码 |
| `email` / `url` / `tel` | 带格式校验的输入 |
| `number` | 数字 |
| `checkbox` / `radio` | 多选 / 单选 |
| `date` / `datetime-local` | 日期时间 |
| `file` | 文件上传（需 `enctype="multipart/form-data"`） |
| `hidden` | 隐藏字段 |

::: warning 前端校验 ≠ 后端校验
浏览器的 `required`、`pattern` 只是提升体验，**绕过它轻而易举**（改请求、关 JS 都行）。后端必须做独立校验，这与后端「不信任任何客户端输入」的原则一致。
:::

## 6. 常用全局属性

| 属性 | 作用 |
|------|------|
| `id` | 全局唯一标识，供 CSS / JS 定位 |
| `class` | 可复用样式钩子，一个元素可有多个 |
| `data-*` | 自定义数据，JS 里用 `element.dataset.xxx` 读取 |
| `hidden` | 隐藏元素（等价于 CSS `display:none`） |
| `tabindex` | 控制键盘聚焦顺序 |

```html
<button id="submit-btn" class="btn btn-primary" data-order-id="1001">
  提交
</button>
<!-- JS: document.querySelector('#submit-btn').dataset.orderId  // "1001" -->
```

## 7. 无障碍（a11y）基础

可访问性（Accessibility，a11y）让屏幕阅读器、键盘用户也能使用页面。后端写 API 文档要讲清楚对调用方友好，前端写页面同理。低成本要点：

1. 图片写 `alt`，纯装饰图用 `alt=""`。
2. 交互元素用 `<button>`（可聚焦、可回车触发），不要用 `<div onclick>`。
3. 表单控件配 `<label>`。
4. 保持标题层级合理：`<h1>` 到 `<h6>` 不跳级。
5. 保持足够的颜色对比度。

## 8. 常见坑

- **`<div onclick>` 当按钮用**：键盘不可聚焦，无障碍失效。用 `<button>`。
- **表单字段没 `name`**：后端参数全部收不到。
- **文件上传漏 `enctype`**：后端收到空文件。
- **忘记 `viewport`**：移动端整页缩放，体验崩坏。
- **`id` 重复**：`getElementById` 只会拿到第一个，行为诡异。

## 9. 小结

- HTML 是页面的**结构层**，浏览器把它解析成 DOM 树，供 CSS 与 JS 使用。
- 语义化标签让结构自解释，利人利己（无障碍、SEO、可维护性）。
- 表单的 `name` 决定提交字段名，`label` + `id` 是标配。
- 前端校验只提升体验，**后端校验不可省**。

下一步：用 [CSS 基础与布局](../css/overview.md) 给这棵树加上样式。
