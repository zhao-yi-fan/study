let http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

//=> 创建WEB服务
let port = 8686;
/* let server = http.createServer();
server.listen(); */
http.createServer(() => {
    //=> 当服务创建成功, 并且客户端向当前服务器发送了请求, 才会执行回调函数, 并且发送一次请求, 回调函数就会被触发执行一次
    console.log(`hello world!`);
    
}).listen(port, () => {
    //=> 当服务创建成功, 并且端口号已经监听成功后, 触发的回调函数
    console.log(`server is success, listen on ${port}!`)
});


/*
    错误分析
        listen EACCES 0.0.0.0:80
        这种错误都是因为端口号被占用了, 我们需要重新修改端口号

        当服务创建成功, 命令行中会一直存在光标闪烁, 证明服务器正在运行运行(一定要保证服务是运行的), 按CTRL+C可以结束正在运行的服务
        
    客户端如何向创建的服务器发送请求
        对应好协议, 域名, 端口等信息, 在浏览器中或者AJAX中发送请求即可
        http://loaclhost:8686/... 服务在当前电脑上, localhost本机域名, 也就是本机的客户端浏览器, 访问本机的服务器端程序
        http://IP:8686/...(http://192.168.3.11:8686/...) IP做域名访问, 如果是内网IP, 相同局域网下的用户可以访问这个服务, 如果是外网IP, 所有能联网的基本上都可以访问这个服务(局域网下访问, 需要互相关掉防火墙)
*/