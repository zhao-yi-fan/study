- 2. AJAX操作

> 1. 创建AJAX实例: IE6中是不兼容的, 使用的是new ActiveXObject来实现额
> `let xhr = new XMLHttpRequest();`


> 2. 打开请求: 发送请求之前的一些配置项
> a. HTTP METHOD 请求方式
> GET/DELETE/HEAD/OPTIONS/TRACE/CONNECT
> POST/PUT
> b. URL项服务器端发送请求的API(Application Programming Interface) 接口地址
> c. ASYNC: 设置AJAX请求的同步异步, 默认是异步(写true也是异步), false是同步, 项目中都是用异步编程, 防止阻塞后续代码执行
> d. USER-NAME/USER-PASS: 用户名和密码, 一般不用
> `xhr.open([HTTP METHOD], [URL], [ASYNC], [USER-NAME], [USER-PASS]);`

> 3. 事件监听: 一般监听的都是 READY-STATE-CHANGE
> 事件(AJAX状态改变事件), 基于这个事件可以获取服务器返回的响应头相应主体内容
> 
```
xhr.onreadystatechange = ()=> {
    if (xhr.readyState === 4 && xhr.status === 200) {
        xhr.responseText;
    }
}
```
> 4. 发送AJAX请求: 从这步开始, 当前AJAX任务开始, 如果AJAX是同步的, 后续代码不会执行, 要等到AJAX状态成功后再执行, 反之异步不会
> `xhr.send([请求主体内容]);`


- 3. 关于HTTP请求方式的一点学习

> 所有的请求都可以给服务器端传递内容, 也都可以从服务器端获取内容
> GET: 从服务器端获取数据(给的少拿得多)
> POST: 向服务器端推送数据(给的多拿得少)
> DELETE: 删除服务器端的某些内容(一般是删除一些文件)
> PUT: 向服务器上存放一些内容(一般也是存放文件)
> HEAD: 只想获取服务器返回的响应头信息, 不要响应主体中的内容
> OPTIONS: 一般使用它向服务器发送一个探测性请求, 如果服务器端返回信息了, 说明当前客户端和服务器端建立了连接, 我们可以继续执行其他请求了(TRACE是干这件事的, 但是axios这个AJAX类库在基于cross domain进行跨域请求的时候, 就是先发送OPTIONS请求进行探测尝试, 如果能连通服务器, 才会继续发送其它的请求)


- 4. GET vs POST

> [传递给服务器信息的方式不一样]
> GET是基于URL地址"问号传参"的方式把信息传递给服务器, POST是基于"请求主体"把信息传递给服务器

```javascript
// GET
xhr.open('GET', '/temp/list?xxx=xxx&xxx=xxx')
// POST
xhr.send('xxx=xxx&xxx=xxx')
```
> GET一般应用于拿(给服务器的会少一些), 而POST给服务器的很多, 如果POST是基于问号传参方式来处理会出现一些问题: URL会拼接很长, 浏览器对于URL的长度有最大限度(谷歌8KB 火狐7KB IE2KB...), 超过的部分浏览器就会把它截掉了.
> 所以GET请求可以基于URL传参, 而POST都是使用请求主体传递(请求主体理论上是没有限制的, 真实项目中我们会自己做大小限制, 防止上传过大信息导致请求迟迟完不成)


> [GET不安全, POST相对安全]
> 因为GET是基于"问号传参"把信息传递给服务器的, 容易被骇客进行URL劫持, POST是基于请求主体传递的, 相对来说不好被劫持; 所以登录, 注册等设计安全性的交互操作, 我们都应该用POST请求.

> [GET会产生不可控制的缓存, POST不会]
> 不可控: 不是想要就要, 想不要就不要的, 这是浏览器自主记忆的缓存, 我们无法基于JS控制, 真实项目中我们都会把这个缓存干掉.
> GET请求产生缓存是因为: 连续多次向相同的地址(并且传递的参数信息也是相同的)发送请求, 浏览器会把之前获取的数据从缓存中拿到返回, 导致无法获取服务器最新的数据(POST不会)

> 解决方案:
> 保证每次请求的地址不完全一致: 在每一个请求的末尾追加一个随机数即可(使用_作为属性名就是不想和其它的属性名冲突)

```javascript
xhr.open('GET', `temp/list?lx=1000&_=${Math.random()}`);
```