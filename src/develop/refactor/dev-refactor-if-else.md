---
date: 2019-04-25
category:
  - 重构技巧
tag:
  - 常见重构技巧
---
# 常见重构技巧 - 去除多余的if else 

> 最为常见的是代码中使用很多的if/else，或者switch/case；如何重构呢？方法特别多，本文带你学习其中的技巧。

## 出现if/else和switch/case的场景

通常业务代码会包含这样的逻辑：每种条件下会有不同的处理逻辑。比如两个数a和b之间可以通过不同的操作符（+，-，*，/）进行计算，初学者通常会这么写：

```java
public int calculate(int a, int b, String operator) {
    int result = Integer.MIN_VALUE;
 
    if ("add".equals(operator)) {
        result = a + b;
    } else if ("multiply".equals(operator)) {
        result = a * b;
    } else if ("divide".equals(operator)) {
        result = a / b;
    } else if ("subtract".equals(operator)) {
        result = a - b;
    }
    return result;
}
```

或者用switch/case：

```java
public int calculateUsingSwitch(int a, int b, String operator) {
    switch (operator) {
    case "add":
        result = a + b;
        break;
    // other cases    
    }
    return result;
}
```

这种最基础的代码如何重构呢？

## 重构思路

> 有非常多的重构方法来解决这个问题, 这里会列举很多方法，在实际应用中可能会根据场景进行一些调整；另外不要纠结这些例子中显而易见的缺陷（比如没用常量，没考虑多线程等等），而是把重心放在学习其中的思路上。

### 方式一 - 工厂类

- 定义一个操作接口

```java
public interface Operation {
    int apply(int a, int b);
}
```

- 实现操作， 这里只以add为例

```java
public class Addition implements Operation {
    @Override
    public int apply(int a, int b) {
        return a + b;
    }
}
```

- 实现操作工厂

```java
public class OperatorFactory {
    static Map<String, Operation> operationMap = new HashMap<>();
    static {
        operationMap.put("add", new Addition());
        operationMap.put("divide", new Division());
        // more operators
    }
 
    public static Optional<Operation> getOperation(String operator) {
        return Optional.ofNullable(operationMap.get(operator));
    }
}
```

- 在Calculator中调用

```java
public int calculateUsingFactory(int a, int b, String operator) {
    Operation targetOperation = OperatorFactory
      .getOperation(operator)
      .orElseThrow(() -> new IllegalArgumentException("Invalid Operator"));
    return targetOperation.apply(a, b);
}
```

对于上面为什么方法名是`apply`,`Optional`怎么用? 请参考这篇：

- Java 8 - 函数编程(lambda表达式)
  - Lambda 表达式的特点?
  - Lambda 表达式使用和Stream下的接口?
  - 函数接口定义和使用，四大内置函数接口Consumer，Function，Supplier, Predicate.
  - Comparator排序为例贯穿所有知识点。
- Java 8 - Optional类深度解析
  - Optional类的意义?
  - Optional类有哪些常用的方法?
  - Optional举例贯穿所有知识点
  - 如何解决多重类嵌套Null值判断?

### 方式二 - 枚举

> 枚举适合类型固定，可枚举的情况，比如这的操作符; 同时枚举中是可以提供方法实现的，这就是我们可以通过枚举进行重构的原因。

- 定义操作符枚举

```java
public enum Operator {
    ADD {
        @Override
        public int apply(int a, int b) {
            return a + b;
        }
    },
    // other operators
    
    public abstract int apply(int a, int b);

}
```

- 在Calculator中调用

```java
public int calculate(int a, int b, Operator operator) {
    return operator.apply(a, b);
}
```

- 写个测试用例测试下：

```java
@Test
public void whenCalculateUsingEnumOperator_thenReturnCorrectResult() {
    Calculator calculator = new Calculator();
    int result = calculator.calculate(3, 4, Operator.valueOf("ADD"));
    assertEquals(7, result);
}
```

看是否很简单?

### 方法三 - 命令模式

> 命令模式也是非常常用的重构方式， 把每个操作符当作一个Command。

- 首先让我们回顾下什么是命令模式

  - 看这篇文章：[行为型 - 命令模式(Command)]()

    - 命令模式(Command pattern): 将"请求"封闭成对象, 以便使用不同的请求,队列或者日志来参数化其他对象. 命令模式也支持可撤销的操作。 
      - Command: 命令
      - Receiver: 命令接收者，也就是命令真正的执行者
      - Invoker: 通过它来调用命令
      - Client: 可以设置命令与命令的接收者

    ![img](https://www.pdai.tech/images/pics/ae1b27b8-bc13-42e7-ac12-a2242e125499.png)

- Command接口

```java
public interface Command {
    Integer execute();
}
```

- 实现Command

```java
public class AddCommand implements Command {
    // Instance variables
 
    public AddCommand(int a, int b) {
        this.a = a;
        this.b = b;
    }
 
    @Override
    public Integer execute() {
        return a + b;
    }
}
```

- 在Calculator中调用

```java
public int calculate(Command command) {
    return command.execute();
}
```

- 测试用例

```java
@Test
public void whenCalculateUsingCommand_thenReturnCorrectResult() {
    Calculator calculator = new Calculator();
    int result = calculator.calculate(new AddCommand(3, 7));
    assertEquals(10, result);
}
```

注意，这里`new AddCommand(3, 7)`仍然没有解决动态获取操作符问题，所以通常来说可以结合简单工厂模式来调用：

- 创建型 - 简单工厂(Simple Factory)
  - 简单工厂(Simple Factory)，它把实例化的操作单独放到一个类中，这个类就成为简单工厂类，让简单工厂类来决定应该用哪个具体子类来实例化，这样做能把客户类和具体子类的实现解耦，客户类不再需要知道有哪些子类以及应当实例化哪个子类

### 方法四 - 规则引擎

> 规则引擎适合规则很多且可能动态变化的情况，在先要搞清楚一点Java OOP，即类的抽象：

- 这里可以抽象出哪些类？// 头脑中需要有这种自动转化
  - 规则Rule 
    - 规则接口
    - 具体规则的泛化实现
  - 表达式Expression 
    - 操作符
    - 操作数
  - 规则引擎
- 定义规则

```java
public interface Rule {
    boolean evaluate(Expression expression);
    Result getResult();
}
```

- Add 规则

```java
public class AddRule implements Rule {
    @Override
    public boolean evaluate(Expression expression) {
        boolean evalResult = false;
        if (expression.getOperator() == Operator.ADD) {
            this.result = expression.getX() + expression.getY();
            evalResult = true;
        }
        return evalResult;
    }    
}
```

- 表达式

```java
public class Expression {
    private Integer x;
    private Integer y;
    private Operator operator;        
}
```

- 规则引擎

```java
public class RuleEngine {
    private static List<Rule> rules = new ArrayList<>();
 
    static {
        rules.add(new AddRule());
    }
 
    public Result process(Expression expression) {
        Rule rule = rules
          .stream()
          .filter(r -> r.evaluate(expression))
          .findFirst()
          .orElseThrow(() -> new IllegalArgumentException("Expression does not matches any Rule"));
        return rule.getResult();
    }
}
```

- 测试用例

```java
@Test
public void whenNumbersGivenToRuleEngine_thenReturnCorrectResult() {
    Expression expression = new Expression(5, 5, Operator.ADD);
    RuleEngine engine = new RuleEngine();
    Result result = engine.process(expression);
 
    assertNotNull(result);
    assertEquals(10, result.getValue());
}
```

### 方法五 - 策略模式

> 策略模式比命令模式更为常用，而且在实际业务逻辑开发中需要注入一定的（比如通过Spring的`@Autowired`来注入bean），这时通过策略模式可以巧妙的重构

- 什么是策略模式？

  - 我们再复习下：[行为型 - 策略(Strategy)]()
  - 策略模式(strategy pattern): 定义了算法族, 分别封闭起来, 让它们之间可以互相替换, 此模式让算法的变化独立于使用算法的客户 
    - Strategy 接口定义了一个算法族，它们都具有 behavior() 方法。
    - Context 是使用到该算法族的类，其中的 doSomething() 方法会调用 behavior()，setStrategy(in Strategy) 方法可以动态地改变 strategy 对象，也就是说能动态地改变 Context 所使用的算法。

  ![img](https://www.pdai.tech/images/pics/1fc969e4-0e7c-441b-b53c-01950d2f2be5.png)

- **Spring中需要注入资源重构？**

> 如果是在实现业务逻辑需要注入框架中资源呢？比如通过Spring的`@Autowired`来注入bean。可以这样实现：

- 操作 // 很巧妙

```java
public interface Opt {
    int apply(int a, int b);
}

@Component(value = "addOpt")
public class AddOpt implements Opt {
    @Autowired
    xxxAddResource resource; // 这里通过Spring框架注入了资源

    @Override
    public int apply(int a, int b) {
       return resource.process(a, b);
    }
}

@Component(value = "devideOpt")
public class devideOpt implements Opt {
    @Autowired
    xxxDivResource resource; // 这里通过Spring框架注入了资源

    @Override
    public int apply(int a, int b) {
       return resource.process(a, b);
    }
}
```

- 策略

```java
@Component
public class OptStrategyContext{
 

    private Map<String, Opt> strategyMap = new ConcurrentHashMap<>();
 
    @Autowired
    public OptStrategyContext(Map<String, TalkService> strategyMap) {
        this.strategyMap.clear();
        this.strategyMap.putAll(strategyMap);
    }
 
    public int apply(Sting opt, int a, int b) {
        return strategyMap.get(opt).apply(a, b);
    }
}
```

上述代码在实现中非常常见。

## 一些反思

> 最怕的是刚学会成语，就什么地方都想用成语。

- 真的要这么重构吗？
  - 在实际开发中，切记`最怕的是刚学会成语，就什么地方都想用成语`; 很多时候不是考虑是否是最佳实现，而是折中（通常是业务和代价的折中，开发和维护的折中...），在适当的时候做适当的重构。
  - 很多时候，让团队可持续性的维护代码便是最佳；
  - 重构后会生成很多类，一个简单业务搞这么复杂？所以你需要权衡

## 参考文章

- https://www.baeldung.com/java-replace-if-statements
