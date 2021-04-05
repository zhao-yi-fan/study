## HTTP报文

> 起始行: 请求起始行, 响应起始行
> 首部(头): 请求头, 响应头, 通用头
> 主体: 请求主体, 响应主体

- General 通用头

```
Request URL: http://www.zhufengpeixun.cn/  `请求地址`
Request Method: GET  `请求方式:GET/POST/DELETE/PUT/HEAD/OPTION...`
Status Code: 304 Not Modified   `响应的HTTP状态码`
Remote Address: 125.39.174.137:80  `主机地址(服务器外网IP地址)`
Referrer Policy: no-referrer-when-downgrade
```

- Request Headers 请求头 [客户端设置，服务器接收]
```
GET / HTTP/1.1  `起始行(描述当前请求的一些基本信息：用的是1.1版本传输协议进行内容传输的)`
Host: www.zhufengpeixun.cn
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: ... `cookie信息一般都是放到头文件中实现和服务器端的数据通信的`
If-Modified-Since: Sun, 06 May 2018 10:02:42 GMT
```

- Response Headers 响应头 [服务器端设置，客户端获取]
```
HTTP/1.1 304 Not Modified  `响应起始行（HTTP状态码）`
Date: Tue, 22 May 2018 09:18:56 GMT  `服务器响应内容时候的“服务器端时间”（客户端获取这个时间的时候已经和真实的时间产生误差了，因为服务器返回内容到客户端接收到，也是需要时间的），并且这个时间是格林尼治时间（比北京时间慢8小时，北京时间是GMT+0800）`
Connection: keep-alive
ETag: "700a6f-17f43-56b86a77513d3"
Vary: Accept-Encoding,User-Agent
Server: yunjiasu-nginx  `管理WEB服务的工具`
CF-RAY: 41ee32c192db66b8-TSN
```

- 响应主体

> 服务器返回的是什么就是什么

- Request Payload / Form Data [请求主体]

> 客户端传递给服务器的内容


- HTTP查看的重要性

> 了解HTTP报文以及如何查看对未来工作开发和BUG调试至关重要
> 以后涉及到交互功能(前端<=>后台)出现问题, 都按照如下方式查找问题原因
>   A: 打开控制台, 在network中找到当前交互的请求地址, 点击进去看详情
>   B: 如果是传递给服务器的参数或者方式错误[前端问题]
>   C: 如果服务器返回的信息有错误或者和API接口文档规定的内容不一样[后台问题]
>   D: 如果返回数据是对的, 但是展示有问题[前端问题]
> 确定是自己前端的问题后, 基于断点(或者代码中的debugger)或者控制台输出等方式, 开始逐步调试即可

### 客户端和服务器端信息交互的方式
- 客户端传递给服务器

> 1. 问号传参
>   请求的URL地址末尾通过问号传参方式, 把一些信息传递给服务器
>   /stu/info?id=12&lx=man
> 2. 设置请求头
>   客户端把需要传递给服务器的内容设置到请求头信息中(自定义请求头), 服务器可以通过接收请求头信息把内容得到
> 3. 设置请求主体
>   xhr.send([AJAX SEND中传递的内容, 就是客户端设置的请求主体内容, 服务器端可以接收到这些信息的])

- 服务器返回给客户端

> 1. 设置响应头信息
>   例如把服务时间通过响应头返回给客户端, 客户端通过获取响应头信息得到这个时间(响应头返回的速度是优先于响应主体的)
> 2. 设置响应主体
>   主要的返回信息都在响应主体中