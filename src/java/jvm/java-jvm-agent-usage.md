---
date: 2022-05-15
category:
  - Java JVM
tag:
  - Java JVM
---
# Java Agent 使用详解

> Java Agent 是一种运行在目标 JVM 内、用于对字节码做增强的程序。它基于 JVMTI（JVM Tool Interface）与 `java.lang.instrument` 包，既能在 JVM 启动时挂载（premain），也能在 JVM 运行期动态挂载（agentmain），是 APM 监控、链路追踪、热修复、线上诊断工具的通用底座。

## 1. 背景：JVMTI 与 Instrumentation

JVMTI 是 JVM 对外暴露的一套 Native 接口，外部程序通过它获取线程、GC、类加载等信息，并注册事件回调。Java SE 5 之前编写 Agent 只能靠 Native 代码；从 Java SE 5 起，可以使用纯 Java 的 `java.lang.instrument` 包来编写，其底层仍由 JVMTI 完成。Agent 的价值在于：**不修改业务源码的前提下，改写或增强目标类的字节码**。

## 2. 两种入口方法

Agent 的入口是一组约定签名的静态方法，JVM 会自动调用：

```java
// 启动时加载：JVM 优先查找带 Instrumentation 参数的重载
public static void premain(String agentArgs, Instrumentation inst);
public static void premain(String agentArgs);

// 运行时加载（attach 方式）
public static void agentmain(String agentArgs, Instrumentation inst);
public static void agentmain(String agentArgs);
```

- `agentArgs`：随 `-javaagent` 或 `loadAgent` 传入的字符串参数，多个参数需自行解析。
- `inst`：由 JVM 注入的 `Instrumentation` 实例，是执行类增强的核心入口。

## 3. Manifest 声明

Agent 需打成 jar，并在 `MANIFEST.MF` 中声明入口类：

```text
Premain-Class: com.example.MyAgent
Agent-Class: com.example.MyAgent
Can-Redefine-Classes: true
Can-Retransform-Classes: true
```

- `Premain-Class`：启动时加载的入口类。
- `Agent-Class`：运行时 attach 加载的入口类。
- `Can-Redefine-Classes` / `Can-Retransform-Classes`：是否允许重定义/重转换类，二者默认是 `false`，需要重定义字节码时必须显式置为 `true`。

## 4. Instrumentation 核心 API

`Instrumentation` 接口是增强能力的中枢，常用方法：

| 方法 | 作用 |
| --- | --- |
| `addTransformer(ClassFileTransformer, boolean)` | 注册类文件转换器，类加载时回调 |
| `removeTransformer(ClassFileTransformer)` | 移除转换器 |
| `retransformClasses(Class<?>...)` | 对已加载的类重新执行转换（需 `Can-Retransform-Classes`） |
| `redefineClasses(ClassDefinition...)` | 用新字节码直接替换类定义（需 `Can-Redefine-Classes`） |
| `getAllLoadedClasses()` | 获取当前已加载的所有类 |
| `isModifiableClass(Class<?>)` | 判断某个类是否可被修改 |

## 5. ClassFileTransformer 与字节码增强

类转换由 `ClassFileTransformer` 完成，其 `transform` 方法在类被加载（或重转换）时触发：

```java
public class TimingTransformer implements ClassFileTransformer {
    @Override
    public byte[] transform(ClassLoader loader, String className, Class<?> classBeingRedefined,
                            ProtectionDomain pd, byte[] classfileBuffer) {
        if (!"com/example/Service".equals(className)) {
            return null; // 返回 null 表示不修改，保留原始字节码
        }
        // 使用 ASM / ByteBuddy / Javassist 读取 classfileBuffer，插入计时逻辑，返回新字节码
        return enhanced;
    }
}
```

实际改写字节码一般借助字节码工具（ASM、Javassist、Byte Buddy）。常见的插桩位置包括：方法进入点（取入参）、方法退出点（取返回值与耗时）、异常抛出点、字段读写点等。

## 6. 运行时动态挂载（attach）

运行时加载 Agent 依赖 `com.sun.tools.attach.VirtualMachine`：

```java
VirtualMachine vm = VirtualMachine.attach(pid);   // pid 为目标 JVM 进程号
vm.loadAgent("/path/to/agent.jar", "args");       // 触发目标 JVM 的 agentmain
vm.detach();
```

其底层机制是：目标 JVM 内有一个 `Attach Listener` 线程监听本地 socket（`/tmp/.java_pid<pid>`）；当外部发起 attach 时，JVM 惰性启动该线程、接收命令，`loadAgent` 对应命令表中的 `load` 操作，最终加载 Agent 的 `libinstrument` 动态库并执行 `agentmain`。JDK 9 之后 attach 相关类封装在 `jdk.attach` 模块内。

## 7. 重定义字节码的限制

无论用 `redefineClasses` 还是 `retransformClasses`，都被严格约束（《JVM 规范》规定）：

- **可以**改变方法体的实现、常量池和属性。
- **不可以**增加、删除、重命名字段或方法。
- **不可以**改变方法签名。
- **不可以**改变类的继承关系。

若增强后的字节码违反上述规则，重定义会失败并抛异常。此外，重定义只在下次类加载/重转换时对旧版本生效，是一个相对“昂贵”的操作，应避免频繁触发。

## 8. 实践要点与常见坑

- **优先用 retransform**：`retransformClasses` 会重新走一遍已注册的 transformer 链，比 `redefineClasses` 更通用，也更适合需要叠加多个转换器的场景。
- **加开关与降级**：字节码增强不可避免带来性能与稳定性风险，建议提供动态开关，且 Agent 内部异常不应影响业务线程。
- **避免增强 JDK 核心类**：增强 `java.*` 下的类风险极高，且部分类不可修改（可用 `isModifiableClass` 预判）。
- **谨慎处理类加载器**：多类加载器环境下要按场景选择 transformer 的 `loader` 匹配策略。
- **注意版本与模块系统**：JDK 9+ 的模块化与 `ClassFileTransformer` 的行为变化会影响兼容性。

## 9. 典型应用场景

Java Agent 的实际用途集中在“不改源码、运行期介入”的方向：

- **应用性能监控（APM）与链路追踪**：在方法出入口插桩，采集调用链、耗时与异常，是很多监控探针的底层实现。
- **线上诊断与动态调试**：在不停机的前提下查看方法入参、返回值、局部变量，类似“线上断点”。
- **热修复 / 类替换**：用 `redefineClasses` 替换问题类，争取修复窗口（不改变类结构的前提下）。
- **故障注入与压测**：动态增强方法以模拟延迟或异常，验证系统的容错与降级能力。
- **安全与审计**：拦截敏感调用、记录越权访问。

这些场景的共同前提是：业务不能停机、又不能改源码或重新部署。

## 10. 与 JVMTI、字节码库的关系

把技术栈自下而上排列会更清楚：

1. **JVMTI**：JVM 暴露的 Native 接口，提供事件回调与类重定义等底层能力。
2. **`java.lang.instrument`**：对 JVMTI 的 Java 封装，向开发者暴露 `Instrumentation`、`ClassFileTransformer`。
3. **字节码库（ASM / Javassist / Byte Buddy）**：负责真正读懂并改写字节码，Agent 只是“把改写后的字节码交给 JVM”。

理解这条链路，能帮你在遇到问题时快速判断是“挂载失败”“转换没触发”还是“改写后的字节码不合法”。相比直接写 ASM，Byte Buddy 这类高层库能让实现更易读、更易维护，是很多成熟工具的选择。

## 11. 常见问题排查

- **`premain` 没被调用**：确认 `MANIFEST.MF` 中的 `Premain-Class` 拼写正确且含包路径，`-javaagent` 指向的是 jar 文件本身。
- **`agentmain` 没被调用**：确认 `Agent-Class` 正确，且目标 JVM 未禁用 attach 机制；attach 依赖 JDK，纯 JRE 环境可能缺少相关模块。
- **`transform` 没触发**：`addTransformer` 应在目标类加载**之前**注册；对已加载的类需先调用 `retransformClasses`。
- **抛 `UnsupportedOperationException`**：调用 `redefineClasses`/`retransformClasses` 时，Manifest 中对应的 `Can-Redefine-Classes`/`Can-Retransform-Classes` 未设为 `true`。
- **`Unsupported major.minor version`**：编译出的字节码版本与目标 JVM 不匹配，注意编译目标版本。

## 12. 与同类工具的对照

同为运行期诊断，命令行诊断器与自研 Agent 的差别在于：前者通常内置了字节码增强与命令分发能力，开箱即用；后者把增强逻辑与采集逻辑掌握在自己手里，便于定制埋点与上报。很多成熟的线上诊断工具，本质就是“可复用的 Java Agent + 交互式终端”。理解 Agent 机制后，这类工具就不再是黑盒。

## 13. 小结

- Java Agent 基于 JVMTI 与 `java.lang.instrument`，通过 `premain` / `agentmain` 两个入口介入 JVM。
- 启动加载用 `-javaagent`，运行时加载用 `VirtualMachine.attach` + `loadAgent`。
- 增强能力由 `Instrumentation` 与 `ClassFileTransformer` 提供，字节码改写靠 ASM 等工具完成。
- 重定义受“不改结构、不改签名、不改继承”的硬约束，需谨慎使用并做好降级。

延伸阅读：[字节码增强技术](./java-jvm-class-enhancer.md)、[Arthas 在线诊断](./java-jvm-agent-arthas.md)、[类加载机制](./java-jvm-classload.md)。
