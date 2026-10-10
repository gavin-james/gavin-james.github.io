---
date: 2019-04-25
category:
  - 开发理论
tag:
  - CRON表达式
---
# CRON 生成和校验工具

> 定时任务离不开 CRON 表达式，但它字段多、易写错。借助在线生成/校验工具能快速写出并验证表达式，再配合代码里的校验 API 做兜底，避免"任务看似配置了却从不触发"。

## 1. CRON 表达式语法

CRON 表达式的字段数量因实现而异，常见三种：

- **Spring（5 或 6 段）**：`秒 分 时 日 月 [周]`，`@Scheduled` 中用 6 段；
- **Quartz**：6 或 7 段（含秒，末段可选年）；
- **Linux crontab**：5 段（无秒），格式为 `分 时 日 月 周`。

以最常见的 6 段（含秒）为例，各字段含义：

| 位置 | 字段 | 取值范围 |
| --- | --- | --- |
| 1 | 秒 | 0-59 |
| 2 | 分 | 0-59 |
| 3 | 时 | 0-23 |
| 4 | 日（Day of Month） | 1-31 |
| 5 | 月 | 1-12 或 JAN-DEC |
| 6 | 周（Day of Week） | 1-7 或 SUN-SAT（不同实现周日取值可能不同） |

**特殊字符**

| 字符 | 含义 | 示例 |
| --- | --- | --- |
| `*` | 任意值 | `* * * * * ?` |
| `?` | 不指定（仅日/周可用，二者需其一为 `?`） | `0 0 12 ? * MON` |
| `-` | 区间 | `0 0 9-18 * * ?` |
| `,` | 枚举 | `0 0 8,12,18 * * ?` |
| `/` | 步长 | `0 0/5 * * * ?`（每 5 分钟） |
| `L` | 最后一天/最后一周 | `0 0 0 L * ?` |
| `W` | 最近工作日 | `0 0 0 15W * ?` |
| `#` | 第几个星期几 | `0 0 0 ? * 5#3`（第三个周五） |

需要说明的是，`L`、`W`、`#` 是 Quartz 的扩展，Spring 的 `CronExpression` 对其支持有限，Linux crontab 则完全不支持，跨平台时要注意。

## 2. 常用表达式示例

| 表达式 | 含义 |
| --- | --- |
| `0 0 2 * * ?` | 每天凌晨 2 点 |
| `0 0/30 * * * ?` | 每 30 分钟 |
| `0 0 9-18 ? * MON-FRI` | 工作日 9 点到 18 点整点 |
| `0 0 0 1 * ?` | 每月 1 号零点 |
| `0 15 10 ? * 6L` | 每月最后一个周六 10:15 |
| `0 0 12 ? * MON` | 每周一中午 12 点 |
| `0 0 0/1 * * ?` | 每小时整点 |
| `30 0 0 * * ?` | 每天 0 点 0 分 30 秒 |

更多写法见 [CRON 表达式介绍和使用](./dev-cron-x-usage.md)。

## 3. 在线生成与校验工具

| 工具 | 地址 | 用途 |
| --- | --- | --- |
| bejson CRON | https://www.bejson.com/othertools/cron/ | 可视化生成表达式并给出中文释义 |
| ciding CRON | http://cron.ciding.cc/ | 输入表达式实时预览最近执行时间 |
| crontab.guru | https://crontab.guru/ | Linux 5 段表达式的自然语言解释 |

使用建议：**先生成、后校验**——用工具拼出表达式，再让它列出"接下来几次执行时间"，肉眼确认是否符合预期（例如"每周一"是否真的落在周一）。crontab.guru 只支持 5 段，验证 6 段（含秒）表达式要用前两个工具。

## 4. 前端开发组件

在管理后台让用户配置定时任务时，直接手写表达式体验差，可集成可视化组件：

- **vue-cron**：Vue 版 CRON 表达式生成器，https://gitee.com/lindeyi/vue-cron ；
- **easy-cron**：支持生成与预览，https://gitee.com/toktok/easy-cron 。

接入前确认组件支持的字段位数与后端框架一致（含秒还是不含秒），否则会出现"前端显示周、后端按分"的错位。

## 5. 代码中的使用与校验

生产代码里应显式校验表达式，避免非法表达式在启动或运行期才报错。

### 5.1 Spring @Scheduled

```java
@Component
public class JobConfig {
    // 每 5 秒执行一次
    @Scheduled(cron = "0/5 * * * * ?")
    public void tick() {
        // 业务逻辑
    }
}
```

需要在配置类上加 `@EnableScheduling` 才会生效。

### 5.2 表达式解析与校验

```java
// Spring（5.3+）：CronExpression
import org.springframework.scheduling.support.CronExpression;
CronExpression expr = CronExpression.parse("0 0 2 * * ?");
LocalDateTime next = expr.next(LocalDateTime.now());
System.out.println(next);   // 下次执行时间

// Quartz：CronExpression.isValidExpression
import org.quartz.CronExpression;
boolean valid = CronExpression.isValidExpression("0 0 2 * * ?");
```

::: tip 校验策略
把"解析 + 计算下次执行时间"作为校验手段：既能确认语法合法，又能验证语义是否与预期一致。配置项建议集中管理并配单元测试。
:::

## 6. Linux crontab

系统级定时任务用 `crontab -e` 编辑，语法为 5 段（无秒），字段依次是分、时、日、月、周：

```bash
# 每天 3 点 30 分执行备份脚本
30 3 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1
```

注意：crontab 的环境变量与登录 shell 不同，脚本里应使用绝对路径，并显式设置 `PATH`；输出重定向到日志便于排查。

## 7. 常见坑

- **字段位数混淆**：Spring、Quartz、crontab 的段数不同，含不含"秒"要数清楚；
- **周日取值**：有的实现周日是 1 或 7、SUN 与 0 混用，跨库时容易差一天；
- **日与周互斥**：Quartz 要求"日"和"周"字段其中一个为 `?`，不能同时指定；
- **时区**：服务器与业务期望的时区不一致时，定时任务会整体偏移；
- **夏令时**：在实行夏令时的时区，个别时间点可能被跳过或重复执行；
- **集群重复执行**：多实例部署时，每个实例都会触发同一任务，需用分布式锁或调度框架保证只执行一次。

## 8. 小结

- CRON 段数与含义随实现不同，先确认框架是 5/6/7 段、是否含秒。
- 掌握 `* ? - , / L W #` 的含义，Quartz 扩展字符在其他实现中可能不支持。
- 用在线工具生成并预览执行时间，是最快的自查方式；注意工具支持的段数。
- 前端可视化用 vue-cron / easy-cron，接入前对齐字段位数。
- 代码里用 `CronExpression.parse` / `isValidExpression` 校验，并留意周日取值、日/周互斥与集群重复执行。
