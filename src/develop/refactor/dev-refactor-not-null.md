---
date: 2019-04-26
category:
  - 重构技巧
tag:
  - 常见重构技巧
---
# 常见重构技巧 - 去除不必要的!= 

> 项目中会存在大量判空代码，多么丑陋繁冗！如何避免这种情况？我们是否滥用了判空呢？

## 场景一：null无意义之常规判断空

- 通常是这样的

```java
private void xxxMethod(String key){
    if(key!=null&&!"".equals(key)){
        // do something
    }
}
```

- 初步的，使用Apache Commons，Guvava, Hutool等StringUtils

```java
private void xxxMethod(String key){
    if(StringUtils.isNotEmpty(key)){
        // do something
    }
}
```

## 场景二：null无意义之使用断言Assert

- 考虑用Assert断言

```java
private void xxxMethod(String key){
    Assert.notNull(key);

    // do something
}
```

## 场景三：写util类是否都需要逐级判断空

> 逐级判断空，还是抛出自定义异常，还是不处理？It Depends...

随手翻了下，[hutool IdcardUtil在新窗口打开](https://gitee.com/loolly/hutool/blob/v5-dev/hutool-core/src/main/java/cn/hutool/core/util/IdcardUtil.java) 显然是交给调用者判断的。

```java
/**
    * 是否有效身份证号
    *
    * @param idCard 身份证号，支持18位、15位和港澳台的10位
    * @return 是否有效
    */
public static boolean isValidCard(String idCard) {
    idCard = idCard.trim();// 这里idCard没判断空
    int length = idCard.length();
    switch (length) {
        case 18:// 18位身份证
            return isValidCard18(idCard);
        case 15:// 15位身份证
            return isValidCard15(idCard);
        case 10: {// 10位身份证，港澳台地区
            String[] cardVal = isValidCard10(idCard);
            return null != cardVal && "true".equals(cardVal[2]);
        }
        default:
            return false;
    }
}
```

- 再比如 Apache Common IO中, 并没判断空

```java
/**
    * Copy bytes from a <code>byte[]</code> to an <code>OutputStream</code>.
    * @param input the byte array to read from
    * @param output the <code>OutputStream</code> to write to
    * @throws IOException In case of an I/O problem
    */
public static void copy(final byte[] input, final OutputStream output)
        throws IOException {
    output.write(input);
}
```

## 场景四：让null变的有意义

> 返回一个空对象（而非null对象），比如NO_ACTION是特殊的Action，那么我们就定义一个ACTION。下面举个“栗子”，假设有如下代码

```java
public interface Action {
  void doSomething();}

public interface Parser {
  Action findAction(String userInput);
}
```

其中，Parse有一个接口FindAction，这个接口会依据用户的输入，找到并执行对应的动作。假如用户输入不对，可能就找不到对应的动作（Action），因此findAction就会返回null，接下来action调用doSomething方法时，就会出现空指针。

解决这个问题的一个方式，就是使用Null Object pattern（空对象模式）

> NullObject模式首次发表在“ 程序设计模式语言 ”系列丛书中。一般的，在面向对象语言中，对对象的调用前需要使用判空检查，来判断这些对象是否为空，因为在空引用上无法调用所需方法。

![img](https://www.pdai.tech/images/develop/refactor/dev-refactor-notnull-1.png)

我们来改造一下

类定义如下，这样定义findAction方法后，确保无论用户输入什么，都不会返回null对象：

```java
public class MyParser implements Parser {
  private static Action NO_ACTION = new Action() {
    public void doSomething() { /* do nothing */ }
  };

  public Action findAction(String userInput) {
    // ...
    if ( /* we can't find any actions */ ) {
      return NO_ACTION;
    }
  }
}
```

对比下面两份调用实例

1.冗余: 每获取一个对象，就判一次空

```java
Parser parser = ParserFactory.getParser();
if (parser == null) {
  // now what?
  // this would be an example of where null isn't (or shouldn't be) a valid response
}
Action action = parser.findAction(someInput);
if (action == null) {
  // do nothing} 
else {
  action.doSomething();
}
```

2.精简

```java
ParserFactory.getParser().findAction(someInput).doSomething();
```

因为无论什么情况，都不会返回空对象，因此通过findAction拿到action后，可以放心地调用action的方法。

顺便再提下一个插件：

> .NR Null Object插件 NR Null Object是一款适用于Android Studio、IntelliJ IDEA、PhpStorm、WebStorm、PyCharm、RubyMine、AppCode、CLion、GoLand、DataGrip等IDEA的Intellij插件。其可以根据现有对象，便捷快速生成其空对象模式需要的组成成分，其包含功能如下：

- 分析所选类可声明为接口的方法；
- 抽象出公有接口；
- 创建空对象，自动实现公有接口；
- 对部分函数进行可为空声明；
- 可追加函数进行再次生成；
- 自动的函数命名规范

## 场景五：Java8中使用Optional

假设我们有一个像这样的类层次结构:

```java
class Outer {
    Nested nested;
    Nested getNested() {
        return nested;
    }
}
class Nested {
    Inner inner;
    Inner getInner() {
        return inner;
    }
}
class Inner {
    String foo;
    String getFoo() {
        return foo;
    }
}
```

解决这种结构的深层嵌套路径是有点麻烦的。我们必须编写一堆 null 检查来确保不会导致一个 NullPointerException:

```java
Outer outer = new Outer();
if (outer != null && outer.nested != null && outer.nested.inner != null) {
    System.out.println(outer.nested.inner.foo);
}
```

我们可以通过利用 Java 8 的 Optional 类型来摆脱所有这些 null 检查。map 方法接收一个 Function 类型的 lambda 表达式，并自动将每个 function 的结果包装成一个 Optional 对象。这使我们能够在一行中进行多个 map 操作。Null 检查是在底层自动处理的。

```java
Optional.of(new Outer())
    .map(Outer::getNested)
    .map(Nested::getInner)
    .map(Inner::getFoo)
    .ifPresent(System.out::println);
```

还有一种实现相同作用的方式就是通过利用一个 supplier 函数来解决嵌套路径的问题:

```java
Outer obj = new Outer();
resolve(() -> obj.getNested().getInner().getFoo())
    .ifPresent(System.out::println);
```

调用 obj.getNested().getInner().getFoo()) 可能会抛出一个 NullPointerException 异常。在这种情况下，该异常将会被捕获，而该方法会返回 Optional.empty()。

```java
public static <T> Optional<T> resolve(Supplier<T> resolver) {
    try {
        T result = resolver.get();
        return Optional.ofNullable(result);
    }
    catch (NullPointerException e) {
        return Optional.empty();
    }
}
```

请记住，这两个解决方案可能没有传统 null 检查那么高的性能。不过在大多数情况下不会有太大问题。

- 更多Optional，可以看这篇： 

  Java 8 - Optional类

  - Optional类的意义
  - Optional类有哪些常用的方法
  - Optional举例贯穿所有知识点
  - 多重类嵌套Null值判断