---
date: 2026-10-11
title: 建造者（Builder）
category: [设计模式]
tag: [设计模式]
---

# 建造者（Builder）

> 一句话意图：把复杂对象的**构建过程**与它的**表示**分离，使同样的构建步骤可以造出不同表示。

## 适用场景

- 构造参数多、必填/可选组合杂，普通构造器签名难以维护。
- 需要分步骤、按顺序组装复杂对象（如组装一台电脑：主机 + 屏幕 + 外设）。
- 希望对象构建完成后不可变，避免「半成品」对象被使用。

## 结构与角色

| 角色 | 职责 |
|------|------|
| `Builder` | 定义构建各部件的方法 + `build()` |
| `ConcreteBuilder` | 实现各部件的组装，最终产出产品 |
| `Director` | 编排构建步骤（可有可无，客户端也可直接编排） |
| `Product` | 被构建出的复杂对象 |

## Java 示例（链式 Builder）

```java
public final class Computer {
    // 不可变字段
    private final String cpu;
    private final String ram;
    private final String disk;
    private final boolean hasGpu;   // 可选

    private Computer(Builder b) {
        this.cpu = b.cpu; this.ram = b.ram;
        this.disk = b.disk; this.hasGpu = b.hasGpu;
    }

    // 静态内部 Builder：链式调用，可读性高
    public static class Builder {
        private String cpu;
        private String ram;
        private String disk;
        private boolean hasGpu;

        public Builder cpu(String cpu)   { this.cpu = cpu;   return this; }
        public Builder ram(String ram)   { this.ram = ram;   return this; }
        public Builder disk(String d)    { this.disk = d;    return this; }
        public Builder gpu(boolean g)    { this.hasGpu = g;  return this; }

        public Computer build() {
            if (cpu == null || ram == null) {
                throw new IllegalStateException("cpu 与 ram 为必填");
            }
            return new Computer(this);
        }
    }

    @Override public String toString() {
        return "Computer{cpu=" + cpu + ", ram=" + ram + ", disk=" + disk + ", gpu=" + hasGpu + "}";
    }
}

// 使用
class Demo {
    public static void main(String[] args) {
        Computer pc = new Computer.Builder()
                .cpu("Ryzen 7").ram("32G").disk("1T").gpu(true)
                .build();
        System.out.println(pc);
    }
}
```

经典对手 `StringBuilder` 名字像 Builder，但它更偏「可变缓冲 + 流畅接口」，产出的是 `String`，可对照理解。

## 优缺点

| 优点 | 缺点 |
|------|------|
| 客户端可读、参数顺序不易错 | 类数量增加，每个产品多一个 Builder |
| 可对构建做校验，产出不可变对象 | 产品结构差异大时，抽象 Builder 复用低 |
| 分离构建与表示，步骤可复用 | 简单对象用它反而啰嗦 |

## 与相似模式的区别

- **vs 工厂**：工厂是「一步到位造出对象」；建造者强调「多步拼装同一产品」，过程可定制。
- **vs 抽象工厂**：抽象工厂造的是**一族产品**，建造者造的是**一个复杂产品**。

## JDK 与框架中的实例

- `StringBuilder`：链式 `append` 累积结果，`toString()` 产出最终对象，偏「流畅接口」。
- Lombok `@Builder`：编译期自动生成链式 Builder，落地最多的写法。
- Spring `BeanDefinitionBuilder`：分步设置 Bean 的类名、作用域、依赖，最后 `getBeanDefinition()`。
- Protobuf / gRPC 为每个消息类型生成的 `newBuilder()` 链式 API：典型的不可变对象 Builder。

## 实践要点与坑

- `build()` 里做**必填校验**，让非法组合尽早失败，而不是产出半成品。
- 产品设为**不可变**（字段 `final`、无 setter），Builder 只负责装配，避免构建后被改动。
- 参数很多时 Builder 可读性远胜构造器；参数寥寥时别为它多写一个类。

## 一句话记忆

**参数一多就用 Builder：`new Computer.Builder().cpu(..).build()`，过程可控、结果不可变。**

---

详解见 [创建型建造者模式](../design/builder.md)。
