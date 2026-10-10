---
date: 2019-07-18
category:
  - 算法和数据结构
tag:
  - 领域算法
---
# 安全算法 - 摘要算法

> 消息摘要（Message Digest）算法把任意长度的输入数据压缩成固定长度的输出串，是一个**单向函数**：计算过程不需要密钥，也无法从摘要反推出原文；只有输入完全相同，输出才完全相同。它是数字签名、口令存储和数据完整性校验的基石。

## 1. 为什么需要摘要算法

数据在存储与传输过程中随时可能被损坏或篡改。如果每次校验都拿原文逐字节比对，既笨重又会把原文暴露出去。摘要算法提供了一种轻量的"数字指纹"：把任意大小的数据映射成一段定长的短串，比较指纹即可判断数据有没有被改动，而指纹本身无法反推出内容。

- 输出短且定长，便于比较、存储和传输；
- 单向不可逆，无法从摘要恢复原文；
- 输入发生任何细微变化，输出都会大幅改变（雪崩效应）。

因此摘要算法天然适合三类场景：**完整性校验**（文件、数据块是否被改）、**口令存储**（不存明文密码）、**数字签名**（对摘要而非全文签名）。

## 2. 核心特性

| 特性 | 含义 | 工程意义 |
| --- | --- | --- |
| 定长输出 | 无论输入多长，摘要长度固定 | 便于统一存储与比较 |
| 确定性 | 相同输入必得相同摘要 | 可用于重复校验 |
| 单向性 | 由摘要无法推出原文 | 保护原文信息 |
| 雪崩效应 | 改动 1 个比特，输出约一半比特翻转 | 篡改必被发现 |
| 抗碰撞 | 难以找到两个不同输入得到同一摘要 | 防止伪造 |

::: warning 已被淘汰的算法
MD5 与 SHA-1 已被证实可在可接受成本内构造**碰撞**——即找到两个不同的输入得到完全相同的摘要。因此它们**不能再用于数字签名、证书等安全场景**。SM3、SHA-256 及更长的 SHA-2 系列才是当前安全的选择。
:::

## 3. 常见摘要算法对比

| 算法 | 摘要长度 | 分组长度 | 现状 |
| --- | --- | --- | --- |
| MD5 | 128 bit（32 位十六进制） | 512 bit | 已被碰撞攻击破解，仅可做非安全校验 |
| SHA-1 | 160 bit（40 位十六进制） | 512 bit | 已被破解，淘汰 |
| SHA-256 | 256 bit | 512 bit | 安全，主流选择 |
| SHA-512 | 512 bit | 1024 bit | 安全，输出更长 |
| SM3 | 256 bit | 512 bit | 国密标准，安全 |
| CRC32 | 32 bit | — | 仅用于检错，非安全摘要 |

国密算法（SM2/SM3/SM4）的定位与用法见 [安全算法 - 国密算法](./alg-domain-security-sm.md)。

## 4. MD5 详解与实现

MD5（Message-Digest Algorithm 5）把报文按 512 bit 分组，对每组做 4 轮共 64 步的非线性变换，最后输出 128 bit 摘要。它的特点是**压缩性、易计算、抗修改、强抗碰撞**（在未被破解前）。虽然已不适合安全用途，但作为理解摘要算法结构的经典样本仍值得一看。

JDK 通过 `java.security.MessageDigest` 提供了所有标准摘要算法：

```java
import java.security.MessageDigest;
import java.util.HexFormat;

public class DigestDemo {
    // 计算十六进制摘要，algorithm 可取 "MD5" / "SHA-1" / "SHA-256"
    public static String digest(String algorithm, String message) throws Exception {
        MessageDigest md = MessageDigest.getInstance(algorithm);
        byte[] bytes = md.digest(message.getBytes("UTF-8"));
        // Java 17+ 可直接用 HexFormat 转十六进制；低版本可用循环自行拼接
        return HexFormat.of().formatHex(bytes);
    }

    public static void main(String[] args) throws Exception {
        System.out.println(digest("MD5", "你若安好，便是晴天"));
        System.out.println(digest("SHA-256", "你若安好，便是晴天"));
    }
}
```

`MessageDigest` 的两个核心方法：

- `getInstance(String algorithm)`：返回实现指定摘要算法的对象；
- `digest(byte[] input)`：使用指定字节数组完成摘要计算，返回摘要字节数组。多段数据可先多次 `update(...)` 再调用无参 `digest()` 收尾。

::: tip 关于十六进制转换
早期示例常手写 `bytes2Hex`（逐字节取高 4 位与低 4 位映射到字符）。Java 9 起可用 `java.util.HexFormat`，或引入 Apache Commons Codec 的 `Hex.encodeHexString`，避免重复造轮子。
:::

## 5. SHA 家族

安全散列算法（Secure Hash Algorithm, SHA）由 NSA 设计、NIST 发布，主要有三代：

- **SHA-1**：输出 160 bit。理论碰撞概率极低，但 2017 年 Google 与 CWI 已构造出实际的碰撞样本（SHAttered），故已淘汰。
- **SHA-2**：包括 SHA-224/256/384/512，输出越长越安全。SHA-256 是 TLS 证书、代码签名、Git 对象等的实际标准。
- **SHA-3**：基于 Keccak 海绵结构，与 SHA-2 结构完全不同，作为"备份标准"存在，即使 SHA-2 未来被攻破也有可用替代。

SHA-1 的用法与 MD5 完全一致，只是算法名换成 `"SHA-1"`；生产环境应直接使用 `"SHA-256"`：

```java
MessageDigest md = MessageDigest.getInstance("SHA-256");
byte[] digest = md.digest(data.getBytes("UTF-8")); // 32 字节
```

## 6. HMAC：带密钥的摘要

普通摘要任何人都能计算，因此无法证明"消息来自持有密钥的一方"。**HMAC**（Hash-based Message Authentication Code，基于哈希的消息认证码）在摘要基础上引入一个共享密钥，同时提供**完整性**与**真实性**：

$$\mathrm{HMAC}(K, m) = H\big((K \oplus opad)\ \|\ H((K \oplus ipad)\ \|\ m)\big)$$

它不要求底层哈希本身抗碰撞（即使 MD5/SHA-1 被弱化，HMAC-MD5/HMAC-SHA1 仍相对安全），因此广泛用于 API 签名、Webhook 校验等场景。

```java
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.HexFormat;

public class HmacDemo {
    public static String hmacSha256(String secret, String message) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(secret.getBytes("UTF-8"), "HmacSHA256"));
        return HexFormat.of().formatHex(mac.doFinal(message.getBytes("UTF-8")));
    }
}
```

::: important 为什么不是 hash(key + message)
直接把密钥拼在消息前面再哈希（如 `SHA256(key + msg)`）会遭受**长度扩展攻击**：攻击者无需知道密钥，就能在已知 `hash(key+msg)` 的情况下推算出 `hash(key+msg+填充+追加数据)`。HMAC 的双重哈希结构正是为抵御该攻击而设计。
:::

## 7. 数字签名

数字签名把**摘要**与**非对称加密**结合起来，同时解决完整性、真实性和不可否认性：

1. 发送方对原文计算摘要，再用**自己的私钥**加密这段摘要，得到签名；
2. 原文与签名一起发送；
3. 接收方用发送方的**公钥**解密签名，得到摘要 A；同时对收到的原文独立计算摘要 B；
4. A 与 B 相同则说明原文完整且确实由私钥持有者发出，否则说明被篡改。

签名过程是"私钥加密摘要"，验签过程是"公钥解密摘要并比对"。其中摘要算法保证了长报文也能被高效签名，加密算法则提供了身份绑定。

## 8. 应用与常见坑

**典型应用**

- 文件完整性 / 秒传：先比对摘要再决定是否传输，见 [大数据处理 - 布隆过滤器](./alg-domain-bigdata-bloom-filter.md) 等去重方案；
- 口令存储：数据库中只存口令摘要（切勿明文）；
- 缓存 Key：用业务键的摘要做缓存键，长度可控；
- 接口签名：HMAC + 时间戳防重放。

**常见坑**

- **用 MD5 直接存密码**：彩虹表可秒破。正确做法是加随机盐 + 慢哈希（bcrypt / scrypt / Argon2 / PBKDF2）。
- **口令存储叫"加密"**：术语上应叫摘要/哈希，摘要不可逆，与"可解密的加密"是两回事。
- **单次快哈希迭代次数不足**：明文口令熵低，必须用刻意设计得慢的算法拉高爆破成本。
- **误解"抗碰撞"**：摘要相同不代表原文相同（理论存在碰撞），安全场景要用抗碰撞强的算法。

## 9. 小结

- 摘要算法是**无密钥的单向压缩**，产出定长"指纹"，用于完整性校验、口令存储和数字签名。
- 特性可归纳为定长、确定、单向、雪崩、抗碰撞五点。
- MD5/SHA-1 已被碰撞攻击攻破，新系统一律使用 SHA-256 及以上或国密 SM3。
- 需要认证来源时用 **HMAC**，不要用 `hash(key + msg)`。
- 数字签名 = 摘要 + 非对称加密，同时保证完整性、真实性与不可否认性。
- 口令存储必须加盐并用慢哈希，摘要不是加密。
