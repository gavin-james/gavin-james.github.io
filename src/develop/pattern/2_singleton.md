---
date: 2026-10-11
title: 单例模式（Singleton）
category: [设计模式]
tag: [设计模式]
---

# 单例模式（Singleton）

> 一句话意图：保证一个类在**进程内**只有一个实例，并提供一个全局访问点。

## 适用场景

- 全局唯一的配置对象、`IdGenerator` 这类 ID 生成器、日志对象。
- 创建开销大或反复使用的重量级对象：线程池、连接池、缓存。
- 需要严格控制实例数量的硬件/资源控制器。

## 结构与角色

| 角色 | 职责 |
|------|------|
| Singleton | 私有构造器 + 静态自持实例 + 静态 `getInstance()` |

要点三条：**构造器私有**、**内部持有静态实例**、**对外暴露静态获取方法**。

## Java 实现（四种经典写法）

```java
// 1) 饿汉式：类加载即创建，线程安全但无懒加载
public class EagerSingleton {
    private static final EagerSingleton INSTANCE = new EagerSingleton();
    private EagerSingleton() {}
    public static EagerSingleton getInstance() { return INSTANCE; }
}

// 2) 双重检查锁（DCL）：懒加载 + 线程安全，volatile 不可省
public class DclSingleton {
    private static volatile DclSingleton instance; // volatile 防止指令重排导致读到半成品
    private DclSingleton() {}
    public static DclSingleton getInstance() {
        if (instance == null) {                 // 第一次检查：避免每次都加锁
            synchronized (DclSingleton.class) {
                if (instance == null) {         // 第二次检查：防止重复创建
                    instance = new DclSingleton();
                }
            }
        }
        return instance;
    }
}

// 3) 静态内部类：靠类加载机制保证线程安全，天然懒加载
public class HolderSingleton {
    private HolderSingleton() {}
    private static class Holder {
        private static final HolderSingleton INSTANCE = new HolderSingleton();
    }
    public static HolderSingleton getInstance() { return Holder.INSTANCE; }
}

// 4) 枚举：最简洁，天然防反射与反序列化破坏
public enum EnumSingleton {
    INSTANCE;
    public void doSomething() { /* ... */ }
}
```

**为什么枚举最稳**：JVM 保证枚举常量只被构造一次，且反序列化返回同一实例、反射无法调用私有构造器，从语言层面堵住了「多实例」的后门。

## 优缺点

| 优点 | 缺点 |
|------|------|
| 内存只留一份，省开销 | 隐藏类间依赖，阅读时看不出谁用了它 |
| 全局访问点，共享资源方便 | 难以 mock，单元测试不友好 |
| 可延迟到首次使用 | 本质是全局可变状态，并发下易互相干扰 |

## 与相似概念的区别

- **vs 全静态方法工具类**：静态类靠约定保证「无实例」，但不支持懒加载、无法实现接口；单例可作为对象传递、可被注入。
- **vs Spring 单例 Bean**：Spring 的 `singleton` 是**容器级**单例（每个容器一份），由容器管理生命周期；手写 `Singleton` 是**类加载器级**的，二者不等价。
- **vs 多例**：单例限制为 1 个，多例限制为有限个（如 3 个后端节点），实现上都是缓存一组实例。

替代思路：把单例对象通过构造器**注入**给使用者，能暴露依赖、便于测试，也是 Spring 推荐的方式。

## 实践要点与坑

- **反射/反序列化可能破坏单例**：序列化单例需实现 `readResolve()` 返回同一实例；反射可通过 `setAccessible(true)` 调私有构造器，而枚举单例从语言层面免疫二者。
- **类加载器隔离**：不同 `ClassLoader` 各加载一份，跨加载器会出现「伪多实例」，Web 容器/热部署场景要留意。
- **内存可见性**：DCL 中 `instance` 必须 `volatile`，否则可能读到「已赋值但未初始化完成」的半成品对象。
- **别做成全局可变状态**：单例持有可变字段时等价于全局变量，多线程下极易互相干扰，测试也会相互污染。
- **Spring 中不要硬编码 `getInstance()`**：需要全局共享的对象交给容器管理（默认单例 Bean），用到时注入，避免隐藏依赖。

## 一句话记忆

**一个类、一个实例、一个全局入口；优先用枚举或静态内部类，警惕它变成全局可变状态。**

---

详解见 [创建型单例模式](../design/single.md)。
