---
date: 2026-10-11
title: 享元（Flyweight）
category: [设计模式]
tag: [设计模式]
---

# 享元（Flyweight）

> 一句话意图：通过**共享**细粒度对象来支持大量细粒度对象的复用，从而降低内存占用。

## 适用场景

- 系统中有**大量相似对象**，内存吃紧（文本编辑器字符、地图上百万图元、棋盘落子）。
- 对象状态可拆为**内在状态**（可共享、不随环境变）与**外在状态**（随场景变、由外部传入）。

## 结构与角色

| 角色 | 职责 |
|------|------|
| `Flyweight` | 享元接口，接收外在状态 |
| `ConcreteFlyweight` | 存储内在状态，共享复用 |
| `FlyweightFactory` | 用池/Map 缓存并复用享元，保证相同内在状态返回同一实例 |
| `Client` | 持有/传入外在状态 |

**关键区分**：内在状态（如棋子颜色、字体）放在享元内部；外在状态（如棋子坐标、文字位置）由客户端在调用时传入，不进享元。

```mermaid
flowchart LR
    Client -->|getFlyweight(内在状态)| Factory
    Factory -->|命中则复用| Pool[(享元池 Map)]
    Client -->|调用时传外在状态| Flyweight
```

## Java 示例（围棋棋子）

```java
import java.util.HashMap;
import java.util.Map;

// 享元：只保存内在状态（颜色），坐标等外在状态由外部传入
class ChessPiece {
    private final String color;   // 内在状态，可共享

    ChessPiece(String color) { this.color = color; }

    // 外在状态（x, y）作为参数传入，不进对象
    public void place(int x, int y) {
        System.out.println(color + "棋落在 (" + x + "," + y + ")");
    }
}

// 享元工厂：缓存，黑白两色各只有一个实例
class ChessFactory {
    private static final Map<String, ChessPiece> POOL = new HashMap<>();

    public static ChessPiece get(String color) {
        // 相同颜色返回同一对象
        return POOL.computeIfAbsent(color, ChessPiece::new);
    }
}

public class Demo {
    public static void main(String[] args) {
        // 一万颗棋子，内存里其实只有两个 ChessPiece 实例
        ChessPiece black = ChessFactory.get("黑");
        ChessPiece black2 = ChessFactory.get("黑");
        System.out.println(black == black2);  // true，共享同一对象

        black.place(3, 4);
        black2.place(5, 6);                   // 同一享元，落点不同
    }
}
```

实际项目中，`Integer.valueOf()` 的缓存（-128~127）、字符串常量池、连接池都带享元思想。

## 优缺点

| 优点 | 缺点 |
|------|------|
| 大幅减少对象数量与内存占用 | 引入共享池，逻辑变复杂、可读性下降 |
| 内在状态集中管理 | 外在状态需显式传递，增加调用负担 |
| 适合海量对象场景 | 对象必须不可变，否则共享会串数据 |

## 与相似模式的区别

- **vs 单例**：单例保证**一个**实例；享元是**一组**可共享实例，按内在状态区分。
- **vs 原型**：原型用克隆产生**独立**副本；享元用共享**减少**副本。
- **vs 对象池**：对象池为**复用可变对象**（如连接）；享元共享**不可变**对象、区分内外状态。

## JDK 与框架中的实例

- `Integer.valueOf(int)`：-128~127 使用缓存数组，命中即返回共享实例。
- 字符串常量池：字面量相同即共享同一个 `String`。
- `Boolean.TRUE` / `Boolean.FALSE`：两个共享的不可变实例。

## 实践要点与坑

- 享元对象**必须不可变**，否则共享会互相污染。
- 内在状态越多、可共享程度越高，收益越大；若对象几乎全是外在状态，享元无意义。
- 享元池要做好生命周期与回收（弱引用缓存可避免长期占用内存）。
- 别把它和「对象池」混淆：对象池复用**可变**对象（如连接），享元共享**不可变**对象。
- 先用内存分析确认「对象数量」确实是瓶颈，再决定是否上享元——过早优化得不偿失。
- 若可共享对象本身很小，池的维护成本可能不抵收益，需权衡。
- 享元工厂的 key 取内在状态的稳定组合（如颜色 + 字体），避免同一状态被重复创建。

## 一句话记忆

**内在状态共享、外在状态外传：把「变化的部分」抽出去，池里只留「不变的部分」。**

---

详解见 [结构型享元模式](../design/flyweight.md)。
