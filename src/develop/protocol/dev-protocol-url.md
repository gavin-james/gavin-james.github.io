---
date: 2019-04-08
category:
  - 开发理论
tag:
  - 网络协议
---
# URL 与 URI 详解

> URL（Uniform Resource Locator，统一资源定位符）是 URI 的一种，它不仅能标识一个资源，还给出了**如何定位**该资源的信息。理解 URL 的结构、编码规则与相对/绝对解析方式，是排查网络请求、拼接接口地址、处理前端路由的基础。

## 1. URI、URL、URN 的关系

三个概念常被混用，厘清关系有助于准确表达：

- **URI**（Uniform Resource Identifier）：统一资源标识符，抽象的父概念，任何能唯一标识资源的字符串都是 URI；
- **URL**（Uniform Resource Locator）：统一资源定位符，通过**位置**标识资源，例如 `https://example.com/a.html`；
- **URN**（Uniform Resource Name）：统一资源名称，通过**名字**标识资源，与位置无关，例如 `urn:isbn:0451450523`。

即：**URL 和 URN 都是 URI 的子集**，日常口语里说的"网址"其实绝大多数是 URL。RFC 3986 统一规定了它们的语法。

## 2. URL 的通用结构

RFC 3986 给出的一般形式如下：

```text
  foo://user:pass@example.com:8042/over/there?name=ferret#nose
  \_/   \______________________/\_________/ \_________/ \__/
scheme        authority            path        query   fragment
```

拆成六个组成部分：

| 组成 | 示例 | 说明 |
| --- | --- | --- |
| scheme（协议） | `https` | 告诉浏览器/客户端用哪种协议访问，如 http、https、ftp、file、mailto、git |
| authority（授权） | `user:pass@example.com:8042` | 可含用户信息、主机（域名或 IP）、端口号 |
| path（路径） | `/over/there` | 从服务器上取哪一项资源 |
| query（查询） | `name=ferret` | 传给服务器的参数，形如 `k1=v1&k2=v2` |
| fragment（片段） | `nose` | 指向资源内部的锚点，不发送给服务器 |

以 `http://www.quora.com:8080/question/123456/?from=home#answer` 为例：

- 协议：`http`
- 主机：`www.quora.com`
- 端口：`8080`
- 路径：`/question/123456/`
- 查询串：`from=home`
- 片段：`answer`

::: tip 片段不参与网络请求
`#fragment` 只在客户端使用，浏览器在发起请求时会把它剔除掉。因此在服务端永远拿不到 fragment，前端路由（如 History API）正是借助这点实现的。
:::

## 3. URL 编码（百分号编码）

URL 中只允许出现一部分 ASCII 字符，其余字符必须经过**百分号编码（Percent-encoding）**：把该字符按 UTF-8 编码得到字节，再将每个字节写成 `%XX`。

需要编码的字符主要有三类：

- **保留字符**：在 URL 中具有特殊含义，如 `/ ? # [ ] @ ! $ & ' ( ) * + , ; =`，放进普通数据时必须编码；
- **不安全字符**：如空格、引号、`<` `>` `{` `}` 等；
- **非 ASCII 字符**：如中文。例如"张三"的 UTF-8 字节编码后用百分号表示，查询串里就会出现一长串 `%E5%BC%A0%E4%B8%89`。

几种常见编码的具体规则略有差异，处理起来容易踩坑：

| 规则 | 空格编码为 | `+` 的处理 |
| --- | --- | --- |
| RFC 3986（通用） | `%20` | 保留 |
| `application/x-www-form-urlencoded` | `+` | `+` 表示空格 |

::: warning 双重编码
如果对已经编码过的字符串再次编码，`%` 会被编码成 `%25`，得到 `%2520` 之类的错误结果。拼接 URL 时应先判断是否已编码，或统一使用可靠的 URL 构造器。
:::

## 4. 相对 URL 与绝对 URL

- **绝对 URL**：含协议，可独立定位资源，如 `https://example.com/a/b.html`；
- **相对 URL**：不含协议，需结合当前文档的基地址（base）解析，如 `../img/logo.png`、`/api/user`、`?page=2`。

相对 URL 的解析遵循 RFC 3986 的算法，以基准 `https://example.com/a/b/c.html` 为例：

| 相对引用 | 解析结果 | 规则 |
| --- | --- | --- |
| `d.html` | `https://example.com/a/b/d.html` | 同目录替换文件名 |
| `./d.html` | `https://example.com/a/b/d.html` | 同目录 |
| `../d.html` | `https://example.com/a/d.html` | 上一级目录 |
| `/d.html` | `https://example.com/d.html` | 根路径 |
| `?q=1` | `https://example.com/a/b/c.html?q=1` | 只换查询串 |
| `#top` | `https://example.com/a/b/c.html#top` | 只换片段 |
| `//cdn.com/x` | `https://cdn.com/x` | 协议相对，沿用当前协议 |

::: important base 标签与前端路由
HTML 的 `<base href="...">` 会改变页面内所有相对 URL 的解析基准；单页应用使用 History 路由时，服务端需要把深链接回退到入口 HTML，否则刷新会 404。二者都与相对/绝对解析规则直接相关。
:::

## 5. 从输入 URL 到页面显示

一个完整过程把 DNS、TCP、HTTP 与浏览器渲染串了起来：

1. **地址栏解析**：判断输入是搜索词还是 URL，提取协议、主机、路径；
2. **DNS 解析**：把域名换成 IP（浏览器缓存 → 系统缓存 → hosts → 本地 DNS 服务器，涉及递归与迭代查询），见 [网络协议 - DNS 解析](./dev-protocol-dns.md)；
3. **建立连接**：与目标 IP 完成 TCP 三次握手（HTTPS 还要 TLS 握手），见 [网络协议 - TCP/IP](./dev-protocol-tcpip.md)；
4. **发送请求 / 接收响应**：浏览器发出 HTTP 请求，服务器处理并返回响应与状态码，见 [网络协议 - HTTP](./dev-protocol-http.md)；
5. **解析与渲染**：解析 HTML 生成 DOM 树、解析 CSS 生成 CSSOM 树，合并为渲染树，再布局（layout）与绘制（paint）；
6. **关闭连接**：无数据传输后按四次挥手关闭 TCP，或复用连接（keep-alive）。

其中浏览器加载资源时，**JS 会阻塞后续解析**（除非用 `defer`/`async`），**CSS 会阻塞渲染与后续 JS 执行**，这是前端性能优化的重要依据。

## 6. 实践要点与常见坑

- **只用标准库/成熟库构造 URL**：手写字符串拼接极易漏编码或重复编码；Java 可用 `java.net.URI`、`UriComponentsBuilder`，JS 可用 `URL` 与 `URLSearchParams`。
- **查询串里传中文/特殊字符必须先编码**，服务端再按约定解码，两端编码方式要一致。
- **`#` 之后的内容不发往服务端**，需要服务端感知的状态不要放在 fragment 里。
- **注意 URL 长度限制**：不同浏览器与服务器对 URL 长度有上限，超长参数应改用请求体。
- **安全**：对 URL 参数做校验与转义，防止开放重定向（open redirect）与 SSRF。

## 7. 小结

- URI 是父概念，URL 按位置定位、URN 按名字标识，URL/URN 都是 URI。
- URL 由 scheme、authority、path、query、fragment 组成，fragment 不发给服务器。
- 非 ASCII 与保留字符需百分号编码，注意空格在不同规则下写作 `%20` 或 `+`，并避免双重编码。
- 相对 URL 依据 base 按 RFC 3986 解析，`<base>` 与 SPA 路由都依赖该机制。
- 输入 URL 到页面显示涉及 DNS、TCP、HTTP 与浏览器渲染，是网络知识的枢纽。
