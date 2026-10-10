---
date: 2026-10-11
title: Linux 基础
category: [工具]
tag: [Linux]
---

# Linux 基础

> 后端的代码最终都跑在 Linux 上。掌握它不是为了背几百条命令，而是建立一套「出问题知道先看哪里」的直觉：文件在哪、权限够不够、进程活没活、端口通不通、日志说了什么。这套直觉能让你在没人帮忙的深夜独立把服务救回来。

## 1. 为什么后端要懂 Linux

应用在本机跑得好好的，一上服务器就各种意外：文件路径大小写敏感、找不到 Java、目录没写权限、内存被 OOM Killer 干掉、端口被占用、时区差 8 小时。这些问题都不难，难在**不知道从哪查**。懂 Linux 的是那些能顺着「进程 → 端口 → 日志 → 资源」的链路自己走到底的人。

## 2. 目录结构（FHS）

Linux 用一套约定（Filesystem Hierarchy Standard）规定各目录的用途，记住几个关键位置就够了：

| 目录 | 用途 |
|------|------|
| `/etc` | 全局配置文件（如 `/etc/nginx/`、`/etc/systemd/`） |
| `/var` | 会变化的数据，**日志在 `/var/log/`** |
| `/usr` | 系统级程序和库（`/usr/bin`、`/usr/lib`） |
| `/home` | 普通用户主目录 |
| `/root` | root 用户主目录 |
| `/opt` | 手动安装的第三方软件 |
| `/tmp` | 临时文件，重启可能被清 |
| `/proc`、`/sys` | 内核暴露的虚拟文件系统（查进程、内存、内核参数） |
| `/dev` | 设备文件（如 `/dev/sda`、`/dev/null`） |

部署时把应用放在 `/opt/` 或 `/usr/local/` 下、日志放 `/var/log/`、不要往 `/tmp` 放重要数据，是省心的默认选择。

## 3. 权限与所有者

每个文件都有「所有者 / 所属组 / 其他人」三类身份，每类有 `r`（读=4）、`w`（写=2）、`x`（执行=1）三种权限，合起来是熟悉的 `rwxr-xr-x`（即 `755`）：

| 命令 | 作用 |
|------|------|
| `chmod 755 app` | 用八进制设置权限 |
| `chmod +x script.sh` | 增加执行权限 |
| `chown user:group file` | 改所有者与所属组 |
| `umask` | 新建文件的默认权限掩码 |

```bash
ls -l app.jar
# -rw-r--r-- 1 deploy deploy 52428800 Mar  1 10:00 app.jar
```

三个特殊位值得留意：**setuid**（执行时以文件所有者身份运行，`chmod u+s`）、**setgid**、**粘滞位**（`/tmp` 用 `chmod +t`，只允许所有者删除自己的文件）。

后端最常见的权限事故是「用 root 启动、日志目录归 root，之后用普通用户重启时写不进日志」。正确做法是应用日志目录归属运行用户，服务用专用账号运行而非 root。

## 4. 进程与资源

| 命令 | 用途 |
|------|------|
| `ps aux` / `ps -ef` | 列出所有进程 |
| `ps aux \| grep java` | 找特定进程（更推荐 `pgrep -af java`） |
| `top` / `htop` | 实时看 CPU、内存、负载 |
| `kill <pid>` | 发送 TERM 信号（优雅退出） |
| `kill -9 <pid>` | 发送 KILL 信号（强制，不可捕获） |
| `lsof -p <pid>` | 查看进程打开的文件与端口 |
| `nice` / `renice` | 调整进程优先级 |

```bash
free -h          # 看内存（-h 人类可读）
df -h            # 看磁盘使用率（按挂载点）
du -sh /var/log  # 看某目录占用大小
vmstat 1         # 每秒采样 CPU/内存/IO
iostat -x 1      # 看磁盘 IO 利用率
```

要点：**先 `kill` 再 `kill -9`**，给进程机会优雅关闭（释放锁、写完日志）。`kill -9` 会跳过清理逻辑，只在进程卡死时使用。系统负载高时，用 `top` 的 `%si`/`%wa` 判断是 CPU 忙、内存换页还是磁盘 IO 卡住。

## 5. 网络排查

网络问题按「分层」查，从下往上：

```bash
ping 10.0.0.1              # 通不通（ICMP）
ip addr                    # 本机网卡与 IP（老命令 ifconfig）
ip route                   # 路由表
ss -lntp                   # 列出监听中的 TCP 端口及进程（老命令 netstat -lntp）
curl -v https://api.example.com   # 请求的完整过程：DNS、握手、状态码
dig api.example.com        # DNS 解析（老命令 nslookup）
traceroute api.example.com # 逐跳路径
tcpdump -i eth0 port 80 -nn # 抓包
```

`ss -lntp` 是「端口是否在听、是谁在听」的首选：`-l` 只看 LISTEN，`-n` 不做域名解析，`-t` TCP，`-p` 显示进程。服务连不上时，先在**服务端**用 `ss` 确认端口在听，再从**客户端** `curl -v` 确认能到达——比一上来就翻应用日志高效得多。

## 6. 日志

日志分两个层次：**内核/系统**与**应用**。

- `journalctl`：查 systemd 收集的日志。`journalctl -u app.service -f` 实时跟踪某服务，`journalctl --since "10 min ago"` 查最近十分钟，`journalctl -p err -b` 看本次启动以来的错误。
- `dmesg`：内核环形缓冲，OOM Killer、磁盘错误、网卡异常都在这里。应用「莫名其妙被杀」，先 `dmesg | grep -i oom`。
- `/var/log/`：传统日志目录，`/var/log/messages`（部分发行版）、`/var/log/syslog`、`/var/log/auth.log`（登录/提权）。

查日志的思路是**先定时间点、再缩小范围**：知道故障发生的大致时间，用 `--since/--until` 或 `grep` 时间戳过滤，别在海量日志里从第一行读起。

## 7. systemd

现代 Linux 用 systemd 管理系统与服务。一个应用通常写成 **unit 文件** `/etc/systemd/system/app.service`：

```ini
[Unit]
Description=Order Service
After=network.target

[Service]
User=deploy
WorkingDirectory=/opt/order-service
ExecStart=/usr/bin/java -jar app.jar
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

常用管理命令：

```bash
systemctl status app.service     # 查状态与最近日志
systemctl start|stop|restart app.service
systemctl enable app.service     # 开机自启（enable --now 同时启动）
systemctl daemon-reload          # 改过 unit 文件后必须执行
```

关键收益：`Restart=on-failure` 让进程崩溃后自动拉起，`enable` 让服务跟随开机，日志自动进 journal——比 `nohup java -jar &` 手搓后台进程可靠得多。

## 8. 包管理

不同发行版的包管理器不同：

- **Debian/Ubuntu**：`apt`（`apt update`、`apt install`、`apt remove`），包格式 `.deb`。
- **RHEL/CentOS/Fedora**：`yum`（旧）、`dnf`（新），包格式 `.rpm`。

```bash
# Debian/Ubuntu
sudo apt update && sudo apt install -y nginx

# RHEL 系
sudo dnf install -y nginx
```

原则：能用包管理器装就用包管理器装（有依赖解析、有升级路径）；只有包管理器里没有的版本才考虑手动下载。生产环境慎用 `yum update` 全量升级，可能连带升级内核或关键库引发不兼容。

## 9. 排障流程

把前面串成一条可复用的链路，遇到「服务挂了/变慢」按顺序走：

1. **服务在不在**：`systemctl status app` 或 `pgrep -af java`。
2. **端口在不在听**：`ss -lntp | grep 8080`。
3. **资源够不够**：`free -h`（内存）、`df -h`（磁盘）、`top`（CPU/负载）。
4. **是不是被系统杀了**：`dmesg | grep -i oom`、`journalctl -k`。
5. **日志说了什么**：`journalctl -u app -n 200 --no-pager` 与应用自身日志。
6. **网络通不通**：`curl -v`、`ping`、`dig`。

按这个顺序，绝大多数问题在前三步就能定位到方向。

## 10. 小结

- 记住几个关键目录：配置在 `/etc`、日志在 `/var/log`、数据不要放 `/tmp`。
- 权限问题先看所有者与八进制位；服务用专用用户而非 root。
- 进程管理先 `kill` 后 `kill -9`；资源看 `free`/`df`/`top`/`iostat`。
- 网络按分层排查，`ss -lntp` 查监听、`curl -v` 查可达性、`dig` 查解析。
- 日志分内核（`dmesg`）与系统（`journalctl`），查日志先定时间再缩小范围。
- 服务一律用 systemd 管理，靠 `Restart=on-failure` 与 `enable` 获得自愈与自启。

更多命令与脚本书写，见 [Shell 与常用命令](./shell.md)。
