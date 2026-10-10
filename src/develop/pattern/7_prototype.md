---
date: 2026-10-11
title: 原型（Prototype）
category: [设计模式]
tag: [设计模式]
---

# 原型（Prototype）

> 一句话意图：用**复制已有实例**的方式来创建新对象，而不是从零构造，从而避开昂贵的初始化。

## 适用场景

- 对象创建代价高（读配置、查库、算解析），且新对象与某已有对象高度相似。
- 需要动态加载并「克隆」出运行时才确定类型的产品。
- 造一批仅少量字段不同的对象（如一批带默认值的报表模板）。

## 结构与角色

| 角色 | 职责 |
|------|------|
| `Prototype` | 声明 `clone()` 的抽象 |
| `ConcretePrototype` | 实现克隆逻辑，返回自身副本 |
| `Client` | 调用 `clone()` 得到新对象 |

## Java 示例

```java
import java.util.ArrayList;
import java.util.List;

// 浅拷贝：只复制值类型与引用本身，引用指向同一个对象
class Resume implements Cloneable {
    String name;
    List<String> skills = new ArrayList<>();   // 引用类型

    public Resume(String name) { this.name = name; }

    @Override
    public Resume clone() {
        try {
            return (Resume) super.clone();      // 浅拷贝
        } catch (CloneNotSupportedException e) {
            throw new AssertionError("已实现 Cloneable", e);
        }
    }

    // 深拷贝：对引用类型也新建一份，避免两个对象共享同一 List
    public Resume deepClone() {
        Resume copy = new Resume(this.name);
        copy.skills = new ArrayList<>(this.skills); // 复制元素
        return copy;
    }
}

public class Demo {
    public static void main(String[] args) {
        Resume a = new Resume("张三");
        a.skills.add("Java");

        Resume b = a.clone();        // 浅拷贝：b.skills 与 a.skills 是同一个 List
        b.skills.add("Go");          // 会同时影响 a
        System.out.println(a.skills); // [Java, Go]

        Resume c = a.deepClone();    // 深拷贝：互不影响
        c.skills.add("Rust");
        System.out.println(a.skills); // 仍为 [Java, Go]
    }
}
```

`Cloneable` 是标记接口，`Object.clone()` 是**浅拷贝**；未实现 `Cloneable` 时调用会抛 `CloneNotSupportedException`。生产代码更推荐**拷贝构造器**或**序列化反序列化**做深拷贝。

## 优缺点

| 优点 | 缺点 |
|------|------|
| 跳过高成本初始化，克隆快 | 深拷贝实现复杂（循环引用、嵌套集合） |
| 运行时新增产品无需改客户端 | `Cloneable`/`clone()` 语义反直觉，易踩浅拷贝坑 |
| 可保存对象状态并复制 | 拷贝构造仍要逐个字段赋值，字段多时易漏 |

## 与相似模式的区别

- **vs 工厂**：工厂 `new` 出新对象；原型从**现有对象复制**，类型由被克隆者决定。
- **vs 拷贝构造器**：拷贝构造器是显式 API、可控；`clone()` 是语言特性但更易误用。

## JDK 与框架中的实例

- `ArrayList`、`HashMap` 等都实现了 `clone()`，默认浅拷贝。
- 数组的 `array.clone()`：对基本类型是值拷贝，对引用类型是引用拷贝。
- Spring 的 `prototype` 作用域：**注意同名不同义**——它指「每次获取都新建实例」，与 GoF 原型的「克隆」不是一回事。

## 深拷贝的常见实现

1. 手写**拷贝构造器**：逐字段复制，引用字段再 `new`，可控但字段多时易漏。
2. `clone()` + 手动深拷贝引用字段：`super.clone()` 后修正集合/对象字段。
3. **序列化/反序列化**（Java 原生或 JSON）：省心，但要求对象可序列化、性能较低。
4. 第三方属性拷贝工具（默认多为浅拷贝，注意甄别）。

## 实践要点与坑

- **优先拷贝构造器 / 静态工厂**（如 `new Resume(other)`），显式可控、不必实现 `Cloneable`。
- 深拷贝需逐层复制引用对象；对象图存在循环引用时，序列化方式也需谨慎。
- 原型对象应尽量**不可变**或在使用前确定，避免克隆后被外部改动串味。
- 需要「一批仅少量字段不同」的对象时，先造一个模板再 `clone` 微调，比逐个 `new` 省事。

## 一句话记忆

**对象太贵就「复制一份」：浅拷贝共享引用、深拷贝各管各的，优先用拷贝构造器而非 `clone()`。**

---

详解见 [创建型原型模式](../design/prototype.md)。
