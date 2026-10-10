# Task: 博客全站内容完善（2026-10-11）

## Goal
总体分析并完善整站文档：补齐残缺、重写新建四区浅薄提纲、修复退化、统一元数据、构建验证。

## Status（本轮完成）
- [x] 体检：498 篇 md，定位退化 / 提纲 / 占位 / 孤儿
- [x] 修复内容退化：`tool/gradle/01.md` 1819 行教程被上一轮删成 21 行 → 已从 git 恢复（1824 行）
- [x] 重写新建四区（原为 20-40 行提纲）→ 完整正文
  - `framework/` 24 篇（Spring 14 / ORM 3 / MQ 4+overview / Web 2）
  - `architecture/` 15 篇（分布式 / 微服务 / 高并发）
  - `front/` 9 篇
  - `tool/` 11 篇（另 gradle 已恢复）
- [x] `develop/pattern/` 25 篇补全为「设计模式速查」，并入侧边栏「设计模式 → 详解(design) + 速查(pattern)」
- [x] 补全 31 篇残缺（17 篇真 TODO/占位 + 14 篇 <700 字严重偏薄）
- [x] 修复构建阻塞：`java-jvm-cms-gc.md` 正文裸 `<pid>`、`code-style-alibaba.md` 裸 `<resultMap>` → 改反引号
- [x] 元数据收尾：about 页重写、tool 两个孤儿补 frontmatter、usage/前端 overview 标题与 tag 统一
- [x] **`pnpm run build` 通过：Rendering 727 pages，35.83s，exit 0**

## 关键坑（本项目通用）
- **正文里"干净"的裸标签（如 `<pid>` / `<resultMap>`）会让 Vue 编译报 `Element is missing end tag`，整站构建失败。**
  原因：markdown-it 会把 `<name>` 形式原样透传给 Vue 模板。修法：用反引号包成行内代码。
- 700+ 页规模，构建需 `NODE_OPTIONS=--max-old-space-size=16384`，否则渲染后元数据阶段 OOM。

## 剩余（未做，可选第 4 波）
- 44 篇 <1500 字中约 16 篇处于 900–1500 字（算法/工具类正文，如 sql-mysql-engine、sql-db、java8-anno-repeat、java-collection-all 等），非残缺但可加深。
- `guide/disable.md`、`guide/encrypt.md` 为主题演示页（各 ~200 字），可考虑删除。
- `notes/`（24 篇私人笔记）按用户要求：留在站内、不接入导航、不主动公开。

## 写作规范
见同目录 `style-guide.md`；质量样板 `src/framework/spring/ioc.md`。
