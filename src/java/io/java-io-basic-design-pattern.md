---
date: 2022-03-21
category:
  - Java IO/NIO/AIO
tag:
  - Java IO/NIO/AIO
---
# Java IO - 设计模式(装饰者模式)

> Java 的 I/O 库是「设计模式教科书级」的实现：它以**装饰器（Decorator）**为主线把「读什么、怎么缓冲、如何解析」拆成可自由拼装的小对象，另外还大量使用了**适配器（Adapter）**和**工厂方法（Factory Method）**。看懂了模式，`new` 一串流对象就不再是死记硬背。

## 1. 装饰器模式回顾

装饰器要解决的矛盾是：**要在不修改原类、不用继承爆炸的前提下，动态地给对象叠加功能**。如果每种「字节流 + 缓冲 + 数据类型解析 + 压缩 + 加密」的组合都靠继承，子类数量会以 2 的幂级增长。

它的结构是：

- **组件（Component）**：抽象接口，定义对外能力。
- **具体组件（ConcreteComponent）**：被装饰的原始对象，功能完整但朴素。
- **装饰者（Decorator）**：**持有一个组件**（组合，而非继承），自身也实现组件接口。它把方法转发给被装饰对象，并在转发前后附加自己的功能。

关键的取舍是：装饰者与被装饰者**共享同一个接口**，所以装饰者也能被继续装饰，形成任意长度的链条。详见 [装饰者模式](../../develop/design/decorator.md)。

### 1.1 为什么不用继承

对比一下两种做法。若用继承给「字节输入」叠加缓冲与压缩：

```java
// 继承方案：每种组合都要一个新类，组合一旦增加就爆炸
class FileInputStream { }
class BufferedFileInputStream extends FileInputStream { }
class GzipFileInputStream extends FileInputStream { }
class BufferedGzipFileInputStream extends FileInputStream { }   // 组合继续增长…
```

装饰器方案则是一次包装、自由组合：

```java
new GZIPInputStream(new BufferedInputStream(new FileInputStream(path)));
```

同一套装饰者可以被复用到任意具体组件上，也不需要为每种组合新建类型。

## 2. IO 中的装饰器结构

以字节输入为例，`java.io` 把上面几个角色一一对应上去：

| 角色 | 类型 |
|------|------|
| 抽象组件 | `InputStream`（抽象类） |
| 抽象装饰者 | `FilterInputStream` |
| 具体组件 | `FileInputStream`、`ByteArrayInputStream`、`PipedInputStream`、`SocketInputStream` 等 |
| 具体装饰者 | `BufferedInputStream`、`DataInputStream`、`PushbackInputStream`、`GZIPInputStream` 等 |

- `InputStream` 是抽象组件，提供 `read()`、`read(byte[])`、`skip()`、`close()` 等基本能力。
- `FileInputStream` 是具体组件，把文件字节读成流，是装饰层次的最底层。
- `FilterInputStream` 是抽象装饰者，**内部持有一个 `InputStream` 字段 `in`**，所有方法的默认实现都是**原样转发**给 `in`。子类只需重写要增强的那几个方法。
- `BufferedInputStream` 为被装饰的流加上缓冲；`DataInputStream` 为被装饰的流加上「读取 `int`、`double`、`UTF` 字符串」的能力。

输出侧是同构的：`OutputStream`（组件）、`FilterOutputStream`（抽象装饰者）、`BufferedOutputStream`、`DataOutputStream`、`PrintStream`。字符流同样如此：`Reader` / `FilterReader` / `BufferedReader`、`Writer` / `FilterWriter` / `BufferedWriter`。此外 `java.util.zip`、`java.security`、`javax.crypto` 里的 `GZIPInputStream`、`DigestInputStream`、`CipherInputStream` 也都是 `FilterInputStream` 的子类，被无缝接入同一条装饰链。

角色映射一览：

| 设计模式角色 | 字节流 | 字符流 |
|--------------|--------|--------|
| 组件 | `InputStream` / `OutputStream` | `Reader` / `Writer` |
| 具体组件 | `FileInputStream` 等 | `FileReader` 等 |
| 抽象装饰者 | `FilterInputStream` / `FilterOutputStream` | `FilterReader` / `FilterWriter` |
| 具体装饰者 | `BufferedInputStream` / `DataInputStream` | `BufferedReader` / `LineNumberReader` |

## 3. 包装顺序很重要

因为每一层只是「在转发之外多做一点事」，**层的顺序决定行为**。例如要高效地读基本类型：

```java
try (DataInputStream in = new DataInputStream(
        new BufferedInputStream(
                new FileInputStream("data.bin")))) {
    int id = in.readInt();
    double value = in.readDouble();
    // ...
}
```

- `FileInputStream` 在最内层，负责真正接触文件。
- `BufferedInputStream` 包在外面，避免每次 `readInt` 都触发系统调用。
- `DataInputStream` 在最外层，把字节组装成基本类型——它自己不缓冲，若放在 `BufferedInputStream` 里面（即 `new BufferedInputStream(new DataInputStream(...))`），每次读 `int` 仍会零散地读底层，缓冲几乎白加。

一句话规律：**越贴近原始数据源的越靠内，做转换/解析的越靠外。**

## 4. 字符流的装饰

`BufferedReader` 是字符流里最常用的装饰者，它在被装饰的 `Reader` 之上增加缓冲，并额外提供 `readLine()`：

```java
try (BufferedReader reader = new BufferedReader(new FileReader("log.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        // 每次读一整行，而非逐字符
    }
}
```

`LineNumberReader` 进一步在其上增加行号跟踪能力，是「装饰者叠加」的又一个例子。注意 `BufferedReader` 装饰的是 `Reader`（字符流），因此它不能直接包在 `InputStream`（字节流）上——中间必须先经过适配器，见下一节。

## 5. 自己写一个装饰器

装饰器的好处是「加功能」成本极低。下面用一个把输入字节转成大写的装饰器演示（仅对 ASCII 演示，未处理多字节编码）：

```java
public class UpperCaseInputStream extends FilterInputStream {

    public UpperCaseInputStream(InputStream in) {
        super(in);
    }

    @Override
    public int read() throws IOException {
        int c = super.read();
        return (c == -1) ? c : Character.toUpperCase(c);
    }

    @Override
    public int read(byte[] b, int off, int len) throws IOException {
        int n = super.read(b, off, len);
        for (int i = off; i < off + n; i++) {
            b[i] = (byte) Character.toUpperCase(b[i]);
        }
        return n;
    }
}
```

它可以直接套在任意 `InputStream` 上使用：`new UpperCaseInputStream(new FileInputStream(f))`。若日后还想叠加「统计字节数」「校验和」等功能，只需再写一个装饰者继续套上，无需改动已有类——这正是装饰器相对继承的弹性所在。

需要注意：`FilterInputStream` 的每个重载 `read` 方法默认都只是转发，因此一个只重写了 `read()` 的装饰者，在调用方走 `read(byte[], int, int)` 时可能完全不生效。自写装饰者时，要把**调用方可能用到的每个重载**都按需重写，否则增强会「漏」掉。

## 6. 适配器模式：从字节流到字符流

装饰器负责「增强同一接口」，而**适配器（Adapter）负责「把一种接口转成另一种接口」**。I/O 里最典型的适配器就是 `InputStreamReader` 与 `OutputStreamWriter`：

```java
try (BufferedReader reader = new BufferedReader(
        new InputStreamReader(
                new FileInputStream("utf8.txt"), StandardCharsets.UTF_8))) {
    String line;
    while ((line = reader.readLine()) != null) {
        // ...
    }
}
```

- `InputStream` 面向「字节」，`Reader` 面向「字符」，二者接口不同。
- `InputStreamReader` 内部持有一个 `InputStream` 和一个字符集解码器（`CharsetDecoder`），把字节按编码规则「翻译」成 `char`，从而把字节流的接口适配成字符流接口。
- 反过来 `OutputStreamWriter` 把 `Writer` 适配成 `OutputStream`。

与装饰器的区别要分清：`BufferedInputStream` **是** `InputStream`（同类接口，属装饰）；`InputStreamReader` **不是** `InputStream`（换成 `Reader` 接口，属适配）。更多变体见 [适配器模式](../../develop/design/adapter.md)。

顺带一提，`new String(bytes, charset)`、`Scanner(InputStream)` 也都在做「字节 → 字符/词法单元」的适配。字符集不显式指定时，`InputStreamReader` 会用平台的默认字符集，跨平台时极易乱码，**始终显式传入 `StandardCharsets.UTF_8` 是更稳妥的写法**。

## 7. 工厂方法：把「创建哪种流」藏起来

`java.io` 里大量 `new` 是显式构造，但上层 API 更偏爱**静态工厂方法**——调用方只关心「我要一个能读文件的字符流」，不关心底层是 `FileInputStream` 还是带缓冲的通道：

```java
// NIO.2 提供的工厂方法，返回已封装好的流/通道
BufferedReader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8);
BufferedWriter writer = Files.newBufferedWriter(path, StandardCharsets.UTF_8);
InputStream in = Files.newInputStream(path);
```

好处是**解耦与集中优化**：实现细节被封在工厂里，日后换成基于 `FileChannel` 的实现，调用方代码不用动。同类还有 `Channels.newReader(...)`、`Channels.newChannel(...)`、`Files.lines(...)` 等。工厂方法的思想见 [工厂方法模式](../../develop/design/factory.md)。

这些工厂方法返回的流内部往往已经做过必要的缓冲或适配，调用方无需、也不应再手动叠加多余包装——过度包装只会徒增开销和出错概率。统一的创建入口也更利于排查问题：出问题时只需检查工厂内部实现，而不必在调用方四处搜寻各不相同的 `new` 组合。

## 8. 关闭与资源释放

装饰链的关闭是**向外传播**的：关闭最外层装饰者，会一路 `close` 到底层文件句柄。因此只需关闭最外层：

```java
try (BufferedReader reader =
         new BufferedReader(new InputStreamReader(
             new FileInputStream(path), StandardCharsets.UTF_8))) {
    // 只在 try 头声明最外层，会自动关闭整条链
}
```

用 try-with-resources 保证异常路径也会关闭；不要只关内层而漏掉外层缓冲（缓冲里可能还有未刷出的数据）。对输出流尤其要注意 `flush()` 时机——`BufferedOutputStream` 不主动刷出就 `close` 会正常写出，但若中途要读文件内容，必须先 `flush()`。

NIO 同样延续了这套思路：`Channels` 提供了一组把通道与流互相适配的静态方法，例如 `Channels.newInputStream(ReadableByteChannel)` 把「基于缓冲区的通道」适配成「基于流的 `InputStream`」，`Channels.newReader(ReadableByteChannel, charset)` 再进一步适配成字符流。这样，旧代码里面向 `InputStream` 写好的装饰链，几乎可以原样套用到 NIO 通道之上——模式的价值在跨 API 复用时再次体现。

## 9. 常见误区与辨析

- **把 `FilterInputStream` 当成具体流用**：它是抽象装饰者，本身只做转发，单独使用没有意义。
- **忽略「同接口」这一前提**：装饰者必须和被装饰者实现同一接口，才能层层叠加。`InputStream` 与 `Reader` 接口不同，所以 `BufferedReader` 不能直接装饰 `FileInputStream`，中间必须经过适配器。
- **误以为包装越多越好**：每层都有方法调用开销，且 `BufferedInputStream` 的默认缓冲区并非越大越好，应结合吞吐量调优。
- **忘记关闭顺序**：只关内层不关外层会丢缓冲数据；关外层则整条链都会被关闭，因此只需关心最外层。
- **把序列化流误当装饰者**：`ObjectInputStream` 直接继承 `InputStream` 并实现 `ObjectInput`，并不是 `FilterInputStream` 的子类，不要因为它「读对象」就把它归入装饰链。

## 10. 小结

- I/O 的复杂度被**装饰器**拆成了可组合的小对象：字节源、缓冲、类型解析各司其职，靠 `new` 层层包装拼装。
- **包装顺序决定语义**：贴近数据源的在内，做缓冲/解析的在外。
- `InputStreamReader` / `OutputStreamWriter` 是**适配器**，负责字节流 ↔ 字符流的接口转换；`BufferedReader` 则是字符流上的装饰者。
- `Files`、`Channels` 等提供的静态工厂方法，把具体实现隐藏起来，降低耦合。
- 资源释放只需关闭最外层装饰者，`try-with-resources` 是首选写法。
