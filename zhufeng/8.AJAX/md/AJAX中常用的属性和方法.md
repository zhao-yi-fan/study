- 7.关于XHR的属性和方法

> `xhr.response` 响应主体内容
> `xhr.responseText` 响应主体的内容是字符串(JSON或者XML格式字符串都可以)
> `xhr.responseXML` 响应主体的内容是XML文档
> `xhr.readyState` 	存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。0: 请求未初始化 1: 服务器连接已建立 2: 请求已接收 3: 请求处理中 4: 请求已完成，且响应已就绪
> 
> `xhr.status` 返回的HTTP状态码
> `xhr.statusText` 状态码的描述
> 
> `xhr.timeout` 设置请求超时的时间
> `xhr.withCredentials` 是否允许跨域(FALSE)
> 
> `xhr.abort()` 强制中断AJAX请求
> `xhr.getAllResponseHeaders()` 获取所有响应头信息
> `xhr.getResponseHeader([key])` 获取KEY对应的响应头信息, 例如: xhr.getResponseHeader('date')就是在获取响应头中的服务器时间
> 
> `xhr.open()` 打开URL请求
> `xhr.overrideMimeType()` 重写MIME类型
> `xhr.send()` 发送AJAX请求
> `xhr.setRequestHeader()` 设置请求头