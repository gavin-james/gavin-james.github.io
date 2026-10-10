---
title: 工具总览
category: [工具]
icon: tools
index: false
---

# 工具总览

> 从写下第一行代码，到它稳定跑在生产环境，中间隔着一整条工具链：版本控制、构建、IDE、操作系统、容器、持续集成。这一区讲的是这些工具「为什么这么设计、关键机制在哪、常见坑怎么绕」，目标是遇到问题能定位、能动手，而不是只会背命令。

## 工具链全景

一个后端工程师的日常，大致会跑过这样一条链路：

```mermaid
flowchart LR
  A[IDE 写代码] --> B[Git 版本控制]
  B --> C[Maven/Gradle 构建]
  C --> D[Docker 镜像]
  D --> E[Jenkins 持续集成]
  E --> F[Linux 部署运行]
```

每个环节都既是「效率放大器」，也是「故障高发区」：Git 用错会丢代码，Maven 依赖冲突会让程序在运行期才炸，Docker 镜像写得不合理会让部署慢一倍，CI 没配好会把带病代码放进主干。理解原理，是为了在这些时刻能快速判断「是谁的问题」。

## 研发工具

| 文档 | 讲什么 | 关键收益 |
|------|--------|----------|
| [Git 详解](./git/overview.md) | 三区模型、撤销回退、merge 与 rebase、远端协作 | 操作可回溯，历史清晰，问题能救回 |
| [Git 分支模型与协作](./git/branching.md) | Git Flow、主干开发、PR 与 Code Review、commit 规范 | 多人协作不互相踩踏，主干始终可发布 |
| [Maven 详解](./maven/overview.md) | 坐标、依赖传递与 scope、生命周期、多模块、私服 | 依赖可控，构建可复现，多模块好管理 |
| [Gradle 教程](./gradle/01.md) | Groovy/Kotlin DSL、任务与插件、增量构建 | 构建更快更灵活，适合大型工程 |
| [IDE 与开发效率](./ide/overview.md) | 导航、重构、调试、远程调试、插件、性能调优 | 把重复劳动交给工具，专注在问题本身 |

## 部署运维

| 文档 | 讲什么 | 关键收益 |
|------|--------|----------|
| [Linux 基础](./linux/overview.md) | 目录结构、权限、进程、网络、日志、systemd、包管理 | 服务能在服务器上跑起来、停下来、查得清 |
| [Shell 与常用命令](./linux/shell.md) | 管道与重定向、grep/sed/awk、find/xargs、脚本基础 | 排障和批量操作从「一条条敲」变成「一段脚本」 |
| [Docker 详解](./docker/overview.md) | 镜像与容器、分层、网络、数据卷、Dockerfile 最佳实践 | 环境一致、交付标准、资源可控 |
| [Docker Compose](./docker/compose.md) | 编排多容器、健康检查、多环境、与 K8s 的关系 | 一条命令拉起本地全栈依赖 |
| [Jenkins 持续集成](./jenkins/overview.md) | Pipeline as Code、Jenkinsfile、声明式语法、构建部署 | 提交即验证，发布可追溯、可回滚 |

## 怎么看这一区

- **按需查阅**：这些文档不是按顺序读的教程，而是查得到的参考。先用目录定位，再跳到对应小节。
- **重机制而非命令**：命令会忘、会随版本变，但「暂存区是什么」「依赖为什么冲突」「容器为什么比虚拟机轻」这些机制不会变，理解了就能自己推命令。
- **每条命令都要在本地试过**：命令类内容看一遍永远是别人的，敲一遍才是自己的。文档里的示例都设计成可以直接复制到终端执行。

::: tip 阅读顺序建议
刚接触命令行与服务器，按「[Linux 基础](./linux/overview.md) → [Shell](./linux/shell.md) → [Docker](./docker/overview.md)」起步；已经有基础、想提升协作与交付质量，从「[Git 分支模型](./git/branching.md) → [Maven](./maven/overview.md) → [Jenkins](./jenkins/overview.md)」入手。
