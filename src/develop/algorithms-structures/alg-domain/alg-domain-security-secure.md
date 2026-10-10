---
date: 2019-07-19
category:
  - 算法和数据结构
tag:
  - 领域算法
---
# 安全算法 - 加密算法

> 加密（Encryption）是把明文（Plaintext）按某种算法处理成不可读的密文（Ciphertext）的过程，只有掌握正确密钥的人才能还原出明文。它保护的是数据的**机密性**：即使密文被窃取，攻击者也无法读懂内容。

## 1. 加密的两大要素

任何加密体系都由两个元素构成：

- **加密算法**：把明文与密钥结合、产出密文的变换规则；
- **密钥（Key）**：编码与解码时使用的参数，是整个体系安全的真正关键。

算法可以公开（现代密码学遵循柯克霍夫原则：安全性只应依赖密钥的保密，而非算法的保密），但密钥必须妥善保管与分发。

## 2. 加密算法分类

按密钥使用方式，密码体制分为两类：

| 类型 | 别称 | 密钥特点 | 典型算法 | 速度 |
| --- | --- | --- | --- | --- |
| 对称加密 | 私钥加密 | 加解密用同一把密钥 | AES、DES、3DES、SM4 | 快 |
| 非对称加密 | 公钥加密 | 加密用公钥、解密用私钥 | RSA、ECC、SM2 | 慢（约慢千倍） |

对称加密速度快，但密钥分发困难（收发双方必须先安全地共享密钥）；非对称加密解决了密钥分发问题，但性能差。实际系统通常**两者结合**使用（见第 6 节）。

## 3. 对称加密：AES 与 DES

### 3.1 DES 与 3DES（已过时）

DES（Data Encryption Standard）是早期的分组加密标准，密钥仅 56 位（含奇偶校验共 64 位），以现代算力可在短时间内被暴力破解。其改进版 3DES 通过三次 DES 运算提升强度，但速度慢，如今也已被 AES 取代。

### 3.2 AES（当前主流）

AES（Advanced Encryption Standard，高级加密标准）由 NIST 于 2001 年确立，分组固定 128 bit，密钥长度可选 **128 / 192 / 256 bit**。它运算快、强度高，是目前对称加密的事实标准。按密钥长度分：

| 名称 | 分组 | 密钥 | 轮数 |
| --- | --- | --- | --- |
| AES-128 | 128 bit | 128 bit | 10 |
| AES-192 | 128 bit | 192 bit | 12 |
| AES-256 | 128 bit | 256 bit | 14 |

### 3.3 分组工作模式

AES 是分组密码，只能加密固定长度的块，处理长数据需要"工作模式"：

- **ECB**（Electronic Codebook）：每块独立加密，相同明文块产生相同密文块，会泄露数据规律，**不应使用**；
- **CBC**（Cipher Block Chaining）：每块先与前一块密文异或，需要随机初始向量 IV，可隐藏规律；
- **GCM**（Galois/Counter Mode）：计数器模式 + 认证，既加密又提供完整性校验（AEAD），是现代推荐的模式。

::: warning 不要用 ECB
ECB 模式下用同一密钥加密相同的明文块会得到相同的密文块，著名的"ECB 企鹅图"就是直接加密位图后仍能看清轮廓的例子，属于典型的信息泄露。
:::

### 3.4 AES 代码示例（CBC）

```java
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.util.Base64;

public class AesDemo {
    private static final String TRANSFORM = "AES/CBC/PKCS5Padding";

    public static String encrypt(String key, String plain) throws Exception {
        byte[] keyBytes = key.getBytes("UTF-8");          // 16/24/32 字节
        byte[] iv = new byte[16];
        new SecureRandom().nextBytes(iv);                 // 随机 IV
        Cipher cipher = Cipher.getInstance(TRANSFORM);
        cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(keyBytes, "AES"),
                new IvParameterSpec(iv));
        byte[] cipherText = cipher.doFinal(plain.getBytes("UTF-8"));
        // 实际传输时需把 IV 与密文一起保存（IV 无需保密）
        byte[] combined = new byte[iv.length + cipherText.length];
        System.arraycopy(iv, 0, combined, 0, iv.length);
        System.arraycopy(cipherText, 0, combined, iv.length, cipherText.length);
        return Base64.getEncoder().encodeToString(combined);
    }

    public static String decrypt(String key, String base64) throws Exception {
        byte[] combined = Base64.getDecoder().decode(base64);
        byte[] iv = new byte[16];
        System.arraycopy(combined, 0, iv, 0, 16);
        Cipher cipher = Cipher.getInstance(TRANSFORM);
        cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(key.getBytes("UTF-8"), "AES"),
                new IvParameterSpec(iv));
        byte[] plain = cipher.doFinal(combined, 16, combined.length - 16);
        return new String(plain, "UTF-8");
    }
}
```

> 新项目更推荐 `AES/GCM/NoPadding`，它在解密时会自动校验完整性，并在 `doFinal` 时抛出 `AEADBadTagException` 提示密文被篡改。注意 GCM 的 IV 绝不能重复。

::: important 术语辨析：口令派生的密钥
上面示例里的"密钥"通常是人对口令做 **PBKDF2 / bcrypt / Argon2** 慢哈希派生出的定长字节，绝不能直接把口令当 AES 密钥使用。
:::

## 4. 非对称加密：RSA

非对称加密使用成对的密钥：**公钥（public key）**可以公开，**私钥（private key）**必须保密。

- 用公钥加密的数据，只有对应私钥能解密（保证机密性）；
- 用私钥加密（签名）的数据，任何人都能用公钥验证（保证真实性）。

### 4.1 RSA 原理简述

RSA（Rivest–Shamir–Adleman）的安全性基于**大整数分解难题**：选取两个大素数 $p$、$q$，令 $n=pq$，公开 $n$ 与公钥指数 $e$，保留私钥指数 $d$。对消息 $m$（其中 $m \lt n$）有：

$$c = m^e \bmod n, \qquad m = c^d \bmod n$$

攻击者若要从 $n$ 反推出 $p$、$q$ 需分解大整数，在密钥足够长时不可行。常用密钥长度 2048 bit 及以上。

### 4.2 RSA 代码示例（JDK 原生）

```java
import javax.crypto.Cipher;
import java.security.*;
import java.util.Base64;

public class RsaDemo {
    public static KeyPair genKeyPair() throws Exception {
        KeyPairGenerator gen = KeyPairGenerator.getInstance("RSA");
        gen.initialize(2048);
        return gen.generateKeyPair();
    }

    public static String encrypt(PublicKey pub, String plain) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
        cipher.init(Cipher.ENCRYPT_MODE, pub);
        return Base64.getEncoder().encodeToString(cipher.doFinal(plain.getBytes("UTF-8")));
    }

    public static String decrypt(PrivateKey pri, String base64) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
        cipher.init(Cipher.DECRYPT_MODE, pri);
        return new String(cipher.doFinal(Base64.getDecoder().decode(base64)), "UTF-8");
    }

    public static void main(String[] args) throws Exception {
        KeyPair kp = genKeyPair();
        String c = encrypt(kp.getPublic(), "hello rsa");
        System.out.println(decrypt(kp.getPrivate(), c));
    }
}
```

::: warning RSA 不能直接加密任意长数据
RSA 单次可加密的明文长度受模数限制（如 2048 bit 密钥、PKCS#1 填充下约 245 字节）。要加密长数据，标准做法是**混合加密**（见下节），而不是把数据切成很多块逐一 RSA 加密。
:::

## 5. 加密算法的应用

- **网络传输安全**：HTTPS（TLS）用非对称加密协商会话密钥，再用对称加密传输数据；
- **数据落库加密**：敏感字段（手机号、身份证）用 AES 加密存储，密钥交由 KMS 管理；
- **数字签名与证书**：用私钥签名、公钥验签，保障软件包、证书、电子合同的可信；
- **身份认证**：挑战—应答、令牌签名等场景。

国密的对称/非对称算法为 **SM4 / SM2**，定位分别对应 AES / RSA（ECC），详见 [安全算法 - 国密算法](./alg-domain-security-sm.md)。

## 6. 对称 + 非对称：混合加密

单独使用任一种都有短板，于是有了混合加密体系：

1. 接收方生成一对非对称密钥，公钥公开；
2. 发送方随机生成一把对称密钥（会话密钥），用它加密数据（快）；
3. 发送方用接收方**公钥**加密这把对称密钥（短，安全）；
4. 两部分一起发送；接收方用**私钥**解出会话密钥，再用它解出数据。

HTTPS、PGP、数字信封等都在此框架之上。它兼顾了非对称的安全性（解决密钥分发）与对称的高效性（解决性能）。

## 7. 实践要点与常见坑

- **不要用 ECB**；需要保密+完整性时优先 `AES/GCM`。
- **IV/Nonce 必须随机且不可重用**，尤其 GCM 重复 IV 会直接导致密钥泄露。
- **密钥不能硬编码在代码或配置文件里**，应使用 KMS、环境变量或密钥管理系统。
- **不要自己实现加密算法**，一律使用标准库（JDK `javax.crypto`）或成熟框架。
- **区分"加密"与"摘要"**：加密可逆（要解密），摘要不可逆；两者常配合使用而非互相替代。
- **RSA 填充选择**：新代码用 OAEP，PKCS#1 v1.5 存在历史攻击面。

## 8. 小结

- 加密算法的两大要素是算法与密钥，安全系于密钥的保管与分发。
- 对称加密（AES）快、用于加密数据；非对称加密（RSA）慢、用于密钥分发与签名。
- AES 分组固定 128 bit，密钥 128/192/256 bit，务必使用 CBC/GCM 而非 ECB。
- RSA 基于大整数分解，适合小数据加密与签名，长数据走混合加密。
- 生产系统普遍采用"非对称协商 + 对称传输"的混合加密。
- 牢记：不硬编码密钥、不复用 IV、不自己造加密算法。
