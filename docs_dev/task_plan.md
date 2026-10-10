# Task: 博客全站内容完善

## 轮次 1（2026-10-11 上午）— 内容补齐
- [x] 体检：498 篇 md，定位退化 / 提纲 / 占位 / 孤儿
- [x] 修复内容退化：`tool/gradle/01.md` 1819 行教程被删成 21 行 → 从 git 恢复（1824 行）
- [x] 重写新建四区（原为 20-40 行提纲）→ 完整正文：framework 24 / architecture 15 / front 9 / tool 11
- [x] `develop/pattern/` 25 篇补全为「设计模式速查」，并入侧边栏
- [x] 补全 31 篇残缺（17 篇真 TODO/占位 + 14 篇严重偏薄）
- [x] 修复构建阻塞：裸 `<pid>` / `<resultMap>` → 反引号
- [x] about 页重写；tool 孤儿补 frontmatter
- [x] 构建通过：Rendering 727 pages，exit 0

## 轮次 2（2026-10-11 下午）— 结构与身份体检（本轮）
### 门面 / 元信息
- [x] 首页 `src/README.md`：3/4 项目链接是占位符（`https://链接地址` 等）→ 换成真实公开仓库 + 站内分区
- [x] `theme.ts`：hostname `gavin-james.com`（无此域名）→ `https://gavin-james.github.io`（Pages 实测域名）
- [x] `theme.ts`：author.url `.xyz`（未验证）→ GitHub 主页
- [x] `theme.ts`：页脚「本文章大部分来自pdai:地址…」→ 规范的版权署名行
- [x] `theme.ts`：`blog.intro: '/intro.html'`（文件不存在，死链）→ 移除
- [x] `config.ts`：描述/关键词「使用了 Vdoing 主题」（错）→ 更正为 VuePress2 + hope，重写关键词
### 清理主题演示残留（原本公开可访问）
- [x] 删除 `src/home.md`、`src/slide.md`、`src/guide/`（主题 demo 页）
- [x] 删除整个 `/en/` 英文 locale（原为 Demo/Posts/Apple/Banana 演示站点 + 指向不存在路由）
- [x] 删除 `src/me/study.md`（离题、无 frontmatter、无导航）
- [x] navbar/sidebar 同步移除 en 导出
### 元数据 / 导航
- [x] 补全 94 篇缺 `date` 的文章（framework/architecture/front/tool/pattern 等，取 git 末次提交日）
- [x] 补 `java/jvm/java-jvm-classload.md`（原无 frontmatter）
- [x] `more/skill.md` 补 frontmatter + H1，并从 `more/README.md` 挂链
- [x] 侧边栏补 `SQL-Oracle` 组、`tool/mermaid`、`develop/usage/dev-usage-zuosi`（`tool/zuosi.md` 迁入）
- [x] 导航「更多」改为下拉：扩展阅读 / 文章列表 / 归档 / 分类 / 标签 / 资源导航
- [x] 修复 2 处畸形链接（code-style-twitter 嵌套括号、awesome-java 缺 scheme）
### 隐私（私人笔记）
- [x] `src/notes/` 加入 `.gitignore`（防误提交）
- [x] 新增 `src/.vuepress/utils.ts`：把 notes 全部页面排除出 sitemap（含中文/空格编码变体、前导下划线变体）
      验证：sitemap 中 notes 链接 23 → 0
### 复核（本轮结束）
- [x] 无 frontmatter 文件：3 → 0；无 date：104 → 0
- [x] 真占位词：0（3 处命中均为术语误报）
- [x] 无导航且无入链的孤儿：0
- [x] 相对链接死链：0
- [x] `pnpm run build` 通过：Rendering 706 pages，exit 0

## 关键坑（本项目通用）
- 正文里「干净」的裸标签（`<pid>` / `<resultMap>`）会让 Vue 报 `Element is missing end tag`，整站失败 → 用反引号。
- 700+ 页构建需 `NODE_OPTIONS=--max-old-space-size=16384`。
- sitemap 的 `excludePaths` 是**精确匹配 page path**：中文/空格页要同时给 `encodeURI` 变体；文件名前导 `_` 会被 VuePress 去掉。
- 构建时用户 config 被 esbuild 重定位，`import.meta.url` 不可靠 → 用 `process.cwd()` 兜底定位 docsDir。

## 遗留（已知，未做）
- 全站约 1635 张图片热链自 `www.pdai.tech`（实测带正常 UA 可访问、当前不改；第三方依赖有失效风险，若需可批量本地化）。
- ~20 篇 300-800 字的短篇（算法/工具类），非残缺，可继续加深。
- `notes/` 仍在本地构建产物中（按用户要求「留在站内、不主动公开」，已排除收录）。

## 写作规范
见同目录 `style-guide.md`；质量样板 `src/framework/spring/ioc.md`。
