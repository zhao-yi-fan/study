## http和浏览器出现之前，人们是如何浏览网页的？

### TCP/IP协议族
- 70年代，互联网出现，但是只能传输文本，不能传输图片、视频等
- TCP/IP 协议（Transmission Control Protocol/Internet Protocol，传输控制协议/网际协议）1971年
- TSMTP协议（Trivial Simple Mail Transfer Protocol，简单邮件传输协议）1971年
- FTP协议（File Transfer Protocol，文件传输协议）1971年
- Telnet协议（Telnet，远程登录协议）1973年`


### www 万维网
- HTTP协议（HyperText Transfer Protocol，超文本传输协议）
- HTML语言（Hyper Text Markup Language，超文本标记语言）
- URL（Uniform Resource Locator，统一资源定位符）
  - `http://user:password@host:port/path?query#fragment`
- HTTP协议是建立在TCP协议之上的

### HTTP特点
- 请求应答模式
- 灵活可扩展
- 可靠传输
- 无状态(cookie、session) 

### HTTP为什么不安全？
- 泄露
- 冒充
- 篡改


## 对称加密（共享密钥加密）
- DES Data Encryption Standard，数据加密标准
- 秘钥 8字节
- encrypt(data, key) 加密
- decrypt(data, key) 解密

## 非对称加密（公钥加密，私钥解密）
- RSA Rivest-Shamir-Adleman
- 公钥加密，私钥解密
- 存储秘钥成本低（公钥只有一个，不用一个客户端生成一个秘钥）

## 证书
- 提交：域名、公司名称、公司地址、公司电话、公司邮箱、公司营业执照等信息
- 证书包含：颁发者、有效期、公钥、签名、有效期等
- 正规的网站如果使用免费的证书，会让人觉得不靠谱，快要倒闭的感觉、形象不太好

## 中间人攻击 MITM Man In The Middle
- 银行给客户端发送公钥时被劫持，客户端收到的公钥是中间人伪造的公钥，客户端用伪造的公钥加密数据，中间人用自己的私钥解密数据，然后用银行的公钥加密数据，银行用自己的私钥解密数据，这样中间人就可以看到客户端和银行的通信内容了
- 伪造证书颁发机构（一般找权威的GlobalSign Organization）
- 如果骗子冒充你的身份，用他的域名去办证书会怎么样？证书需要提供公司的营业执照等信息，骗子提供不了银行等大公司的营业执照
- 证书可以公开导出，骗子网站把你的证书放到他的网站上，冒充你怎么办？浏览器会检查域名，域名和证书不匹配，会提示证书不安全
- 骗子把你证书里面的公钥换成他自己的怎么办？需要用指纹


## 如何保证公钥不被篡改？
- CA用`哈希算法`对`服务器公钥`生成`摘要（哈希值）`，加密后得到`指纹`
- 客户端用`哈希算法`对`服务器公钥`生成`摘要（哈希值）`，解密`指纹`，对比`摘要`


## 如何证明身份？
- 数字证书 Digital Certificate
- 证书颁发机构 CA Certificate Authority


## 七层网络协议

- HTTP HTTPS是应用层协议
- TCP UDP FTP TFTP是传输层协议
- IP ICMP是网络层协议
- ARP RARP是数据链路层协议
- 以太网协议是物理层协议
- 七层网络协议模型
  - 应用层
  - 表示层
  - 会话层
  - 传输层
  - 网络层
  - 数据链路层
  - 物理层
