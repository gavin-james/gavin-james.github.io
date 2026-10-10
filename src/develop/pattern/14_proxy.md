---
date: 2026-10-11
title: 代理（Proxy）
category: [设计模式]
tag: [设计模式]
---

# 代理（Proxy）

> 一句话意图：为目标对象提供一个**代理（替身）**，由代理控制对目标对象的访问，并可在访问前后附加逻辑。

## 适用场景

- **远程代理**：本地代表远程对象（RPC / 微服务客户端）。
- **虚拟代理**：延迟加载大对象（图片、大文件）。
- **保护代理**：做权限校验后再放行。
- **增强代理**：事务、日志、缓存、限流——即 AOP 的底座。

## 结构与角色

| 角色 | 职责 |
|------|------|
| `Subject` | 目标与代理共同的接口 |
| `RealSubject` | 真正的业务对象 |
| `Proxy` | 持有目标引用，控制/增强对目标的访问 |

## Java 示例

**静态代理**：手写代理类，编译期即确定。

```java
interface UserService {
    void save(String name);
}

class UserServiceImpl implements UserService {
    @Override public void save(String name) { System.out.println("保存用户: " + name); }
}

// 静态代理：手写一个类实现同接口，转发并增强
class UserServiceProxy implements UserService {
    private final UserService target;
    UserServiceProxy(UserService target) { this.target = target; }

    @Override public void save(String name) {
        System.out.println("[日志] 开始事务");
        target.save(name);
        System.out.println("[日志] 提交事务");
    }
}
```

**JDK 动态代理**：基于接口，运行时生成代理类，`InvocationHandler` 集中处理增强逻辑。

```java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

class LogHandler implements InvocationHandler {
    private final Object target;
    LogHandler(Object target) { this.target = target; }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("[前置] 调用 " + method.getName());
        Object result = method.invoke(target, args);   // 反射调用真实方法
        System.out.println("[后置] 完成 " + method.getName());
        return result;
    }
}

public class Demo {
    public static void main(String[] args) {
        UserService target = new UserServiceImpl();
        UserService proxy = (UserService) Proxy.newProxyInstance(
                target.getClass().getClassLoader(),
                target.getClass().getInterfaces(),   // JDK 代理必须基于接口
                new LogHandler(target));
        proxy.save("张三");
    }
}
```

## 三种代理对比

| 类型 | 原理 | 前提 | 说明 |
|------|------|------|------|
| 静态代理 | 手写代理类 | 无 | 每加一个接口就多写一个类，冗长 |
| JDK 动态代理 | `java.lang.reflect.Proxy` + `InvocationHandler` | 目标**实现接口** | JDK 自带，Spring AOP 默认策略之一 |
| CGLIB 代理 | 运行时生成**子类**字节码 | 目标**非 final**、可被继承 | 无需接口，第三方库，Spring AOP 的另一策略 |

## 优缺点

| 优点 | 缺点 |
|------|------|
| 在不动目标代码的前提下增强/控制访问 | 动态代理有性能与调试开销 |
| 横切逻辑集中，业务更纯粹 | 代理层增多，调用链与堆栈变复杂 |
| 可远程、可延迟、可保护 | 静态代理类数量膨胀 |

## 与相似模式的区别

- **vs 装饰器**：结构相似，意图不同——代理**控制访问**、常自建目标；装饰器**叠加职责**、目标由外部传入。
- **vs 适配器**：适配器改**接口**；代理**保持接口**。
- **vs 外观**：外观面向**多个子系统**、简化调用；代理面向**单个目标**、控制访问。

## 一句话记忆

**代理 = 替身：控制访问 + 前后增强；有接口用 JDK 动态代理，无接口用 CGLIB。**

---

详解见 [结构型代理模式](../design/proxy.md)。
