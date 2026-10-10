---
title: 策略（Strategy）
category: [设计模式]
tag: [设计模式]
---

# 策略（Strategy）

> 一句话意图：把一系列可互换的算法分别封装起来，让它们可以在运行时被自由替换，客户端与具体算法解耦。

## 适用场景

- 同一件事有多种做法，需要按条件选择：支付渠道、折扣/计费规则、排序算法、压缩方式。
- 代码里出现大量的 `if-else`/`switch` 分支来决定走哪段算法。
- 想让算法独立演化、单独测试，而不改调用方。

## 结构与角色

| 角色 | 职责 |
|------|------|
| `Strategy` | 算法接口，定义统一方法 |
| `ConcreteStrategy` | 具体算法实现 |
| `Context` | 持有策略引用，把请求委托给策略 |

## Java 示例（支付渠道）

```java
// 策略接口
interface PayStrategy {
    void pay(int amount);
}

class AlipayStrategy implements PayStrategy {
    @Override public void pay(int amount) { System.out.println("支付宝支付 " + amount); }
}
class WechatStrategy implements PayStrategy {
    @Override public void pay(int amount) { System.out.println("微信支付 " + amount); }
}
class CardStrategy implements PayStrategy {
    @Override public void pay(int amount) { System.out.println("银行卡支付 " + amount); }
}

// 上下文：持有策略，运行时可切换
class OrderPayContext {
    private PayStrategy strategy;
    public OrderPayContext(PayStrategy strategy) { this.strategy = strategy; }
    public void setStrategy(PayStrategy strategy) { this.strategy = strategy; }

    public void checkout(int amount) {
        strategy.pay(amount);         // 委托给当前策略
    }
}

public class Demo {
    public static void main(String[] args) {
        OrderPayContext ctx = new OrderPayContext(new AlipayStrategy());
        ctx.checkout(99);
        ctx.setStrategy(new WechatStrategy());   // 运行时切换，无需改调用方
        ctx.checkout(199);
    }
}
```

Spring 中常见做法：把各策略注册成 `Map<String, PayStrategy>`（键为 Bean 名或枚举名），按类型直接取用，进一步省去工厂分支。

## 优缺点

| 优点 | 缺点 |
|------|------|
| 消灭大量分支，符合开闭原则 | 策略类数量增多 |
| 算法可独立测试、复用、替换 | 客户端需知道有哪些策略并选择 |
| 运行时可切换，灵活 | 策略间若要共享数据需额外设计 |

## 与相似模式的区别

- **vs 状态**：结构几乎一样，**意图不同**——策略由**客户端主动选择**且各策略相互独立、平等；状态由**对象内部状态**驱动切换，状态之间常有明确转移关系。
- **vs 工厂**：工厂关注**创建对象**；策略关注**选择并执行算法**，二者常配合（工厂造策略，上下文用策略）。
- **vs 模板方法**：模板方法用**继承**固定骨架、子类填步骤；策略用**组合**整体替换算法。

## JDK 与框架中的实例

- `Comparator<T>`：同一排序任务，传入不同比较器即不同策略。
- `ThreadPoolExecutor` 的四种拒绝策略（`RejectedExecutionHandler`）：按需替换。
- Spring 的 `Resource` 与 `ResourceLoader`：按前缀选择不同加载策略（`classpath:`、`file:`、`http:`）。

## 实践要点与坑

- 用 `Map<String, Strategy>` 注册策略、按 key 取用，彻底消除分支选择。
- 策略应尽量**无状态**；若必须带状态，注意线程安全与实例复用。
- 选择逻辑（元策略）本身也可能膨胀，可再抽一层工厂/注册表。
- 别把「参数不同」当成不同策略——真正的策略是**行为/算法**不同。
- 简单策略也可用**枚举 + 枚举方法**承载，比堆一堆策略类更轻，按复杂度取舍。
- 与「状态」最易混：牢记策略由**外部选择**、状态由**内部转移**。

## 一句话记忆

**一堆 if-else 换算法，就抽成策略：接口统一、组合注入、运行时切换。**

---

详解见 [行为型策略模式](../design/strategy.md)。
