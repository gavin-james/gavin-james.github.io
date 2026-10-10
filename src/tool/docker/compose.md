---
date: 2026-10-11
title: Docker Compose
category: [工具]
tag: [Docker, Compose]
---

# Docker Compose

> Compose 用一个声明式的 YAML 文件描述「一组容器」及其关系（网络、依赖、数据卷），一条 `docker compose up` 就能把本地开发所需的全栈依赖（数据库、缓存、消息队列、应用）拉起来。它把「记住一长串 `docker run` 参数」变成了「读一份进版本控制的配置」。

## 1. Compose 解决什么

单容器用 `docker run` 没问题，但一个真实服务往往要同时起应用、MySQL、Redis、Kafka，还要它们能互相访问、按顺序启动。用手敲 `docker run` 的问题：

- 参数又长又多，容易记错、漏传，谁本地跑出来的环境都不一样。
- 容器间的网络、依赖顺序、数据挂载全靠人肉维护，换台机器就得重来一遍。
- 配置没有版本控制，无法 review，无法复制。

Compose 的做法是把这一切写进 `compose.yaml`：声明每个**服务（service）**用哪个镜像、映射什么端口、挂什么卷、依赖谁，以及这些服务共享的网络和卷。**声明式**意味着你描述「要什么」，而不是「怎么一步步做」。

## 2. 文件结构

Compose 文件（默认 `compose.yaml`，旧名 `docker-compose.yml`）的顶层键主要是三类：

```yaml
services:            # 一组容器（核心）
  app:
    build: .                      # 由当前目录 Dockerfile 构建镜像
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=mysql             # 用服务名当主机名（同网络 DNS）
    depends_on:
      mysql:
        condition: service_healthy
    networks: [backend]

  mysql:
    image: mysql:8.4              # 固定版本，别用 latest
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}   # 从宿主/ .env 取值
      MYSQL_DATABASE: orders
    volumes:
      - mysql-data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    networks: [backend]

volumes:             # 命名卷，需在此声明
  mysql-data:

networks:            # 自定义网络（可选，默认会建一个）
  backend:
```

要点：

- **服务名即主机名**：同一网络内，`app` 用 `DB_HOST=mysql` 就能连到 `mysql` 服务，无需知道 IP。这是 Compose 相比手搓 `docker run` 的最大便利。
- **顶层 `volumes`/`networks` 只是「声明」**：服务里引用的命名卷和自定义网络在这里登记，实际由 Compose 创建管理。
- **`version` 顶层键已废弃**：Compose Spec 统一后不再需要它，写了会告警，新文件直接省略。

## 3. 常用指令

```bash
docker compose up -d              # 构建并后台启动全部服务
docker compose up -d app          # 只启动某个服务（含其依赖）
docker compose ps                 # 查看服务状态
docker compose logs -f app        # 跟某个服务的日志
docker compose exec app sh        # 进入运行中的服务
docker compose build              # 重新构建镜像
docker compose restart app        # 重启某个服务
docker compose down               # 停止并删除容器与默认网络
docker compose down -v            # 连同命名卷一起删除（会清数据，谨慎）
docker compose config             # 校验并渲染最终配置（排查变量替换很有用）
```

`up` 会按需构建镜像、创建网络与卷、启动容器；`down` 是它的逆向。注意 `down -v` 会删除卷，本地想「重置数据库」很有用，但别在存有重要数据的机器上乱用。

## 4. depends_on 与健康检查

`depends_on` 只保证**启动顺序**，不保证被依赖的服务**已经就绪**——mysql 容器起来了，但数据库可能还没初始化完，此时 `app` 连过去照样失败。所以生产级的写法要配合 `healthcheck`：

```yaml
depends_on:
  mysql:
    condition: service_healthy   # 等 mysql 健康检查通过再启动 app
  redis:
    condition: service_started   # 仅需已启动
```

`healthcheck` 告诉 Docker「怎么判断这个容器健康」：`test` 是探测命令（返回 0 视为健康），`interval` 是探测间隔，`retries` 是连续失败几次算不健康，`start_period` 给启动慢的服务一段宽限期（这期间失败不计入 retries）。`docker compose ps` 会显示 `healthy`/`unhealthy` 状态。

没有健康检查时，更稳健的做法是在应用侧做**连接重试**，而不是假设依赖一定先就绪——生产环境本就该容忍依赖的短暂不可用。

## 5. 环境变量与多环境

Compose 支持多种变量来源，用途不同：

- **`.env` 文件**：放在 Compose 文件同目录，其中的变量可在 YAML 里用 `${VAR}` 引用（做**替换**）。
- **`environment`**：直接给容器设环境变量，可与 `${VAR}` 配合。
- **`env_file`**：把文件里的键值作为环境变量注入容器（不参与 YAML 替换，只是给容器）。

```yaml
services:
  app:
    env_file:
      - .env.common
      - .env.app
    environment:
      - LOG_LEVEL=info
```

区分清楚：`${VAR}` 是在**解析 YAML 时**由 Compose 替换文本，来源是宿主环境或 `.env`；`env_file` 是**容器运行时**的环境变量文件。二者常被混淆，导致「变量没生效」。

## 6. 多环境：override 文件

不同环境（开发/测试）配置不同，Compose 用**叠加合并**解决：

- `docker compose up` 默认在读取 `compose.yaml` 后，**自动叠加** `compose.override.yml`（如果存在）。
- 也可用 `-f` 显式指定多个文件，后读的覆盖前面的：

```bash
docker compose -f compose.yaml -f compose.prod.yml up -d
```

因此常见约定是：`compose.yaml` 放公共定义，`compose.override.yml` 放本地开发专用（挂载源码、暴露调试端口），生产用 `compose.prod.yml` 覆盖镜像版本、资源限制、去掉源码挂载。用 `docker compose config` 可以确认叠加后的最终结果。

**`profiles`** 用于「可选服务」：给服务标注 profile，只有激活对应 profile 时才启动，适合把监控、调试工具设为按需开启：

```yaml
services:
  adminer:
    image: adminer
    profiles: ["debug"]     # 只有 --profile debug 时启动
```

## 7. 与 Kubernetes 的关系

Compose 和 K8s 都能描述多容器应用，但定位不同：

| 维度 | Docker Compose | Kubernetes |
|------|----------------|------------|
| 部署范围 | 单机 | 集群 |
| 调度/扩缩容 | 无 | 有（自动调度、HPA 扩缩） |
| 自愈 | 容器退出按 restart 策略重启 | 重新调度到健康节点 |
| 滚动更新/回滚 | 无 | 内建 |
| 适用场景 | 本地开发、小型单机部署 | 生产、大规模、高可用 |

经验判断：**本地开发与 CI 里的依赖环境用 Compose，生产集群用 K8s**。二者并非替代关系，很多团队的流程是「Compose 起本地全栈 → 同样的镜像推上去由 K8s 编排」。用 Compose 硬扛生产，会在高可用、滚动升级、机器故障迁移上处处受限。

## 8. 实践要点与常见坑

1. **镜像固定版本**：服务里的 `image` 用明确 tag，别用 `latest`，否则今天和明天的环境可能不同。
2. **命名卷存数据、绑定挂载存配置**：数据库数据用命名卷；配置文件、开发时代码用绑定挂载（并可 `:ro`）。
3. **服务名当主机名**：容器间通信用服务名，不要写 IP 或 `localhost`（`localhost` 在容器里指向容器自身，连不到别的服务）。
4. **区分 `${VAR}` 与 `env_file`**：前者在解析期替换 YAML，后者注入容器运行环境，用错就是「变量没生效」。
5. **`depends_on` 不等于就绪**：要就绪保证就用 `healthcheck` + `condition: service_healthy`，否则在应用侧做重试。
6. **`.env` 不要提交密钥**：`.env` 进 `.gitignore`，只提交 `.env.example` 模板。
7. **`down -v` 会清数据**：本地重置可以，生产机慎用。
8. **构建上下文与 `.dockerignore`**：`build:` 指向的目录也要有 `.dockerignore`，否则构建缓慢。

## 9. 小结

- Compose 用声明式 YAML 描述一组服务、网络与卷，`up`/`down` 一条命令管理整个环境。
- 同网络内**服务名即主机名**，是容器互访最方便的部分。
- `depends_on` 只管启动顺序，就绪要配合 `healthcheck` 的 `condition: service_healthy`。
- 环境变量分清 `${VAR}`（解析期替换）与 `env_file`（注入容器）；多环境用 override 文件叠加。
- Compose 面向单机与开发，生产集群交给 K8s，二者是衔接而非替代。

容器本身的机制，见 [Docker 详解](./overview.md)；把容器应用的构建与部署自动化，见 [Jenkins 持续集成](../jenkins/overview.md)。
