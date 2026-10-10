---
date: 2019-05-01
category:
  - 开发
tag:
  - 随手记
---
# Input Password防止自动填充

> 想用 `autocomplete="off"` 关掉浏览器对密码框的自动填充，往往会发现**根本不起作用**——现代浏览器为了「帮用户记住密码」，刻意忽略了密码字段上的 `off`。本文梳理原因与几种可行的绕行方案，并附带服务端控制台读取密码不回显的要点。

## 1. 为什么 `autocomplete="off"` 无效

按 MDN 对 `autocomplete` 的说明，值为 `off` 时浏览器**不应**为当前字段自动填入或选中值。但文档同时给出了一条 Note：**在大多数现代浏览器中，`off` 无法阻止浏览器的密码管理工具自动填充密码字段**。

原因在于浏览器把「自动填充密码」视为账号安全与用户体验的一部分，密码管理器（Chrome、Firefox、Safari、各类浏览器扩展）会**优先于页面作者的意愿**，主动识别登录/注册表单并回填。也就是说，`autocomplete="off"` 对普通文本框有效，对密码框基本被无视。

## 2. 浏览器如何判断「这是密码表单」

要绕开它，先得知道它怎么认。浏览器识别「需要回填密码」的经验规则大致是：

- 表单中存在 `type="password"` 的输入框；
- 该 password 字段通常位于表单/页面中**靠前的第二个输入框**（前一个多半是用户名），或与「用户名/邮箱」字段成对出现；
- 页面上存在登录/注册语义（按钮文案、字段名含 password/pwd/passwd/login/email 等）。

因此，只要让浏览器在**页面加载完成的判定时刻**看不到一个「看起来像登录表单的 password 框」，回填就不会发生。所有方案的思路都是围绕这一点做文章。

值得先厘清的是：`autocomplete` 只是页面给出的**提示**，浏览器可以采纳，也可以忽略；真正约束填充行为的是浏览器自己的启发式规则。所以对抗回填的正确姿势不是「命令浏览器」，而是「让它在判定时刻看不到它想填的东西」。

## 3. 方案一：初始 `type=text`，聚焦时再改成 password

```html
<input type="text" onfocus="this.type='password'">
```

思路是：页面 `onload` 时该框还是普通文本框，浏览器不会把它认成密码框，于是跳过回填；等用户点击（聚焦）时再把它切成密码框。

**局限**：如果业务需要在用户聚焦**之前**就用 URL 参数把密码填进去（例如「一键登录/自动登录」），那么密码会先以**明文**显示在文本框里，聚焦后才隐藏，体验和安全性都不好。

## 4. 方案二：`onload` 后用 JS 改 `type`

思路同上，只是在页面加载完成后由脚本把 `type` 从 `text` 改成 `password`，随后再按 URL 参数填充：

```html
<input id="pwd" type="text">
<script>
  window.addEventListener('load', function () {
    var pwd = document.getElementById('pwd');
    pwd.type = 'password';
    var param = new URLSearchParams(location.search).get('pwd');
    if (param) { pwd.value = param; }
  });
</script>
```

**问题**：浏览器的自动填充时机**不受页面控制**。常常是页面脚本先填了业务值，浏览器随后又把记忆的账号密码覆盖上去，导致业务填充被冲掉。时机无法保证，这个方案不可靠。

## 5. 方案三：`autocomplete="new-password"`（推荐）

`autocomplete` 除 `on`/`off` 外，还有一整套语义化取值：`username`、`email`、`name`、`current-password`、`new-password`、`street-address`、`one-time-code` 等。其中：

- `current-password`：告诉浏览器「这是登录时输入现有密码」，会触发回填；
- `new-password`：告诉浏览器「这是设置/修改时输入**新密码**」，**浏览器不会为其自动填充**。

```html
<input type="password" autocomplete="new-password">
```

对「修改密码」「设置支付密码」等**本就不该被回填**的场景，这一条最干净、也最标准。有资料提到把 `autocomplete` 设成任意非标准字符串也能达到类似效果（浏览器无法匹配到语义就不回填），但这属于对实现的依赖，稳妥起见优先用标准的 `new-password`。

这种「用标准取值声明用途」的思路值得借鉴：与其和浏览器正面对抗，不如明确告诉它这个字段是什么，让双方在共同约定下协作，也更容易在浏览器升级时保持稳定。

## 6. 方案对比

| 方案 | 做法 | 适用场景 | 主要风险 |
|------|------|----------|----------|
| 方案一 | 初始 `text`，聚焦切 `password` | 不想被回填的登录框 | 聚焦前明文可见 |
| 方案二 | `load` 后脚本改 `type` + 填充 | 需按参数预填 | 与浏览器回填时机竞争 |
| 方案三 | `autocomplete="new-password"` | 改密、设支付密码等 | 几乎无，标准做法 |

## 7. 综合建议

- **本就不该回填的密码输入框**（改密、支付密码、二次确认）：直接用 `autocomplete="new-password"`。
- **确实是登录框但不想被填**：在 `new-password` 之外，可配合「初始 `text` + 聚焦切 `password`」的时差技巧。
- 若一定要页面脚本预填，务必处理与浏览器回填的**时机竞争**，不要假设自己的填充一定在浏览器之后执行。
- 顺便说明：`readonly` 直到聚焦再移除，也能骗过部分启发式规则，但同样依赖浏览器行为，且影响可访问性，需谨慎。
- 不要试图用「隐藏的假用户名框」等技巧去彻底骗过密码管理器：各家浏览器算法不同，且可能损害自动填充的正当体验。

另外，前端能绕开浏览器的自动填充，却挡不住脚本注入与弱口令，密码强度与账号安全最终仍要靠**服务端校验**把关；前端方案只解决「回填干扰」，不能当作安全措施。

## 8. 延伸：控制台读取密码不要回显

浏览器之外，「输入密码不该明文显示」在服务端/命令行也有对应的坑。Java 的随手记要点如下：

- **别用 `Scanner` 或 `BufferedReader` 读密码**。它们从标准输入读取时，用户敲的字符会**原样回显**在终端里，等于把密码打在屏幕上，还可能进入 shell 历史和日志。
- **首选 `System.console().readPassword()`**。`Console.readPassword()` 读取时**关闭回显**，且返回 `char[]` 而非 `String`，方便用完立即清零：

```java
import java.io.Console;
import java.util.Arrays;

public class PasswordDemo {
    public static void main(String[] args) {
        Console console = System.console();
        if (console == null) {
            System.err.println("当前环境没有可用的交互式控制台");
            return;
        }
        char[] pwd = console.readPassword("请输入密码: "); // 支持格式化提示
        try {
            // 使用密码……
        } finally {
            // 用完立刻擦除，避免长期驻留内存
            Arrays.fill(pwd, '\0');
        }
    }
}
```

- **为什么返回 `char[]` 而不是 `String`**：`String` 一旦创建就无法擦除内容，可能长期驻留内存并在 dump 中出现；`char[]` 用完可以主动清零，减少残留窗口。
- **最大的坑是 `System.console()` 可能返回 `null`**：当程序不是在**真正的交互式终端**里运行（例如在 IDE 里点运行、`stdin` 被重定向、`echo pwd | java App`、部分 CI 环境）时，JVM 拿不到控制台，`System.console()` 就是 `null`，直接调用会 NPE。稳妥做法是先判空，再决定是否降级。
- **降级要谨慎**：常见的降级是退回 `BufferedReader` 读一行，但那样**无法隐藏回显**，只适合非敏感或测试场景；生产上应明确提示「当前环境无法安全输入密码」。
- **另一个坑是混用 `Scanner`**：`scanner.nextInt()` / `next()` 不会消费行尾的换行符，紧接的 `nextLine()` 会读到空串——这是 `Scanner` 的经典行为，和密码场景叠加时更容易困惑。读取密码应统一走 `Console.readPassword`，不要和 `Scanner` 混用。
- **注意阻塞**：`readPassword()` 会一直阻塞等待输入；在无人值守的脚本里调用可能永久挂起，交互式工具应先确认 `System.console() != null` 再读取。
- **别把密码写进日志**：无论是终端回显还是调试打印，都要确保密码不会落进应用日志；读取后尽快使用并清零。

## 9. 补充：跨端与辅助技巧

- **移动端**：iOS/Android 的键盘会把 `autocomplete`/`type` 作为唤起密码键盘与「自动填充」的依据，`autocomplete="new-password"` 同样有效。
- **第三方密码管理器**：浏览器内置之外的扩展识别规则各异，页面层面的绕行对其未必生效，需在目标浏览器上实测。
- **可访问性**：把密码框初始设为 `text`，在部分读屏软件下会被当作普通文本框朗读；改密场景应优先用 `new-password`，避免对辅助技术造成干扰。
- **HTTPS 前提**：无论哪种方案，密码都必须在 HTTPS 下提交，`autocomplete` 只是体验层面的开关，与传输安全无关。

## 10. 小结

- `autocomplete="off"` 拦不住浏览器的密码回填，这是设计使然。
- 浏览器靠「password 字段 + 表单语义」识别登录表单，绕行的关键就是**别在加载时暴露这样一个字段**。
- 标准解法是 `autocomplete="new-password"`；时差技巧（初始 `text`、聚焦切 `password`）作为补充，注意明文风险与时机竞争。
- 服务端场景中，用 `System.console().readPassword()` 关闭回显并清零 `char[]`，并注意 `System.console()` 可能为 `null`。
