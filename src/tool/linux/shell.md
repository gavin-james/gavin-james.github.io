---
title: Shell 与常用命令
category: [工具]
tag: [Linux, Shell]
---

# Shell 与常用命令

> Shell 的价值不只在于「敲命令」，而在于用**管道和重定向**把一堆小工具组合成幂等、可复用、可进版本控制的脚本。排障时一条正确的一行命令，抵得上手忙脚乱点半小时；发布时一段写好的脚本，抵得上熬一晚上。

## 1. Shell 是什么

Shell 是用户与内核之间的**命令解释器**，常见实现有 `bash`、`zsh`、`sh`（POSIX）。它同时是一门**编程语言**：有变量、条件、循环、函数。日常交互用 `bash`/`zsh`，脚本建议用 `bash` 并明确写 shebang：

```bash
#!/usr/bin/env bash
```

用 `env bash` 而非写死 `/bin/bash`，能兼容不同发行版里 bash 的安装路径。

## 2. 管道与重定向

这是 Shell 组合能力的核心。**管道 `|`** 把前一个命令的标准输出接到后一个命令的标准输入：

```bash
ps aux | grep java | grep -v grep
```

顺序很关键：`grep -v grep` 是为了排除掉 grep 自身那条进程，这是查进程时的经典小技巧。

**重定向**控制标准输出（fd 1）、标准错误（fd 2）和输入（fd 0）的去向：

| 写法 | 含义 |
|------|------|
| `cmd > out.txt` | 标准输出写入文件（**覆盖**） |
| `cmd >> out.txt` | 标准输出**追加**到文件 |
| `cmd 2> err.txt` | 标准错误写入文件 |
| `cmd > out.txt 2>&1` | 输出与错误都写进同一文件（顺序不能反） |
| `cmd &> all.txt` | bash 简写：输出与错误都写文件 |
| `cmd < in.txt` | 从文件读入标准输入 |
| `cmd > /dev/null 2>&1` | 丢弃一切输出 |

`> out.txt 2>&1` 与 `2>&1 > out.txt` 结果完全不同——前者先把 stderr 指向 stdout 当前目标（即 out.txt），后者先切 stdout 再让 stderr 指向原始终端。记不住就统一用 `&>`。

`tee` 把输出**同时**写到屏幕和文件，适合边看边存：

```bash
./build.sh 2>&1 | tee build.log
```

## 3. 文本处理三剑客

### grep：按内容筛选

```bash
grep -rn "IOException" src/   # 递归 + 显示行号
grep -i "error" app.log       # 忽略大小写
grep -v "DEBUG" app.log       # 反选：排除含 DEBUG 的行
grep -E "40[34]" access.log   # 扩展正则
grep -c "Exception" app.log   # 只统计匹配行数
```

### sed：流式替换与编辑

```bash
sed 's/foo/bar/' file         # 每行替换第一个 foo
sed 's/foo/bar/g' file        # 全局替换
sed -n '10,20p' file          # 只打印第 10-20 行
sed -i.bak 's/old/new/g' file # 原地替换并备份（谨慎）
```

`sed -i` 直接改文件，**务必先不带 `-i` 跑一遍**看输出是否符合预期，尤其是涉及正则元字符时。

### awk：按列处理

```bash
awk '{print $1, $3}' file          # 打印第 1、3 列
awk -F: '{print $1}' /etc/passwd   # 以冒号分隔，取第一列
awk '$3 > 100 {print $0}' file     # 条件过滤
awk '{sum += $1} END {print sum}'  # 求和
```

`awk` 天然按「行 + 字段」工作，特别适合处理列式日志。三者常串成一条命令：

```bash
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head
# 统计出现最多的第一列（如访问 IP）Top 10
```

## 4. find 与 xargs

`find` 按条件**查找**文件，`xargs` 把结果**交给**下一条命令处理，二者是批量操作的黄金搭档：

```bash
find /var/log -name "*.log" -mtime +7     # 7 天前修改的日志
find . -type f -size +100M                # 大于 100M 的文件
find . -name "*.tmp" -delete              # 找到即删（先不带 -delete 验证）
find src -type f -name "*.java" -exec wc -l {} +
find . -name "*.log" -print0 | xargs -0 rm -f
```

要点：`find ... -exec cmd {} +` 会把多个文件一次性传给命令（比 `\;` 逐个执行更快）；文件名可能含空格，所以用 `-print0` 配合 `xargs -0`，避免被空格拆断——这是「删错文件」的常见根源。

## 5. 环境变量与 PATH

环境变量是进程启动时继承的配置。`PATH` 尤其重要，它决定「敲一个命令时系统去哪些目录找可执行文件」。

```bash
echo $PATH                 # 查看当前 PATH
export APP_ENV=prod        # 定义并导出给子进程
PATH="$HOME/bin:$PATH"     # 把自己的目录加到最前（优先）
env | sort                 # 列出所有环境变量
```

区分持久化位置：登录级的环境变量写 `~/.bashrc`/`~/.zshrc`（交互 shell）或 `~/.bash_profile`（登录 shell）；服务级的环境变量应写在 systemd unit 的 `Environment=` 里，而不是依赖某个用户的 shell 配置——服务运行时不一定加载 `.bashrc`，这是「手动能跑、开机跑不了」的典型原因。

## 6. 脚本基础

一段可用的脚本模板：

```bash
#!/usr/bin/env bash
set -euo pipefail          # 见下文说明

log() { echo "[$(date +'%F %T')] $*"; }
cleanup() { rm -f "$tmpfile"; }
trap cleanup EXIT          # 无论怎么退出都执行清理

main() {
    local name="${1:?用法: $0 <name>}"   # 参数缺失即报错退出
    tmpfile=$(mktemp)
    log "开始处理 $name"
    # ...业务...
}

main "$@"
```

关键点：

- **`set -euo pipefail`**：`-e` 命令失败即退出；`-u` 引用未定义变量即报错；`-o pipefail` 让管道中任一命令失败都算失败（默认只看最后一个）。这是脚本「出错不静默」的底线。
- **`"$@"`**：以正确的引号展开所有参数，保留每个参数内的空格。`$*` 会把参数连成一串再被拆词，几乎总是错的。函数与脚本对外传参一律用 `"$@"`。
- **`trap`**：注册退出/信号处理器，用来删临时文件、杀子进程、上报状态，保证「异常退出也清理现场」。
- **函数化**：把主逻辑放进 `main`，定义完再调用，避免「函数被部分执行前脚本已跑了一半」。
- **`local`**：函数内变量声明为局部，避免污染全局。
- **退出码**：`$?` 是上一条命令的退出码，`0` 为成功。脚本最终应返回有意义的退出码，别让 CI 把失败当成功。

## 7. 常见坑

1. **变量不加引号**：`rm $dir` 当 `dir` 为空或含空格时后果严重；应写 `rm "$dir"`，并在删除前用 `set -u` 或 `[[ -n "$dir" ]]` 校验。
2. **`for f in $(ls)`**：`ls` 的输出会被空格拆词，遇到含空格的文件名即出错。应写 `for f in ./*.log; do ...; done` 或配合 `find -print0`。
3. **`cd` 失败没人管**：`cd /some/dir && rm -rf *` 里若 `cd` 失败而没加 `&&`，`rm` 可能作用在错误的目录。`set -e` 或显式检查能拦住。
4. **`$*` 与 `$@` 混用**：对外传参只用 `"$@"`。
5. **解析 `ls`/`ps` 的输出**：这些命令的输出是给人看的、可能对齐或换行，脚本里应改用 `find`、`stat`、`pgrep` 等结构化工具。
6. **正则与转义**：`sed`/`grep` 里的 `.`、`*`、`[]` 都是元字符，匹配字面量要转义；`grep -F` 可关闭正则、按固定字符串匹配。
7. **`set -e` 并非万能**：在 `if` 条件、`&&/||` 左侧、以及某些管道位置，`-e` 不会按直觉触发。关键步骤仍应显式判断退出码。
8. **编码与换行符**：Windows 编辑过的脚本可能带 `\r`，在 Linux 上执行报 `bad interpreter: ^M`，用 `dos2unix` 或 `sed -i 's/\r$//'` 修复。

## 8. 小结

- 管道把多个小工具连成流水线，重定向控制输入输出去向；`tee` 兼顾屏幕与文件。
- `grep`/`sed`/`awk` 分别擅长「筛选行、编辑流、处理列」，常串成一条命令完成统计。
- `find` 找文件、`xargs` 批量处理，用 `-print0`/`-0` 处理含空格的文件名。
- 环境变量分清作用域：交互配置写 `.bashrc`，服务配置写 systemd unit。
- 脚本从 `set -euo pipefail`、`"$@"`、`trap` 起步，函数化、参数校验、清理现场一个都不能少。
- 引号、`$@`、解析 `ls` 输出是最常见的事故来源，写脚本时优先规避。

排查思路与服务器基础，见 [Linux 基础](./overview.md)。
