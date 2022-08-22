let http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');
let { readFile } = require('./utils/fsPromise'),
    mime = require('mime');
//=> 创建WEB服务
let port = 8686;
let handle = function handle(req, res) {
    //=> 客户端请求资源文件(PATH-NAME), 服务器端都是到STATIC文件夹中进行读取, 也是根据客户端请求的路径名称读取的, 服务器端基于FS读取文件中内容的时候, 直接加上"./static"即可

    let { method, headers: requestHeaders } = req,
        { pathname, query } = url.parse(req.url, true);

    console.log(url.parse(req.url, true))

    pathREG = /\.([a-z0-9]+)$/i;

    //=> 静态资源文件处理
    if (pathREG.test(pathname)) {
        readFile(`./static${pathname}`).then(result => {
            //=>读取成功: 根据请求资源文件的类型, 设置响应内容的MIME
            let suffix = pathREG.exec(pathname)[1];
            res.writeHead(200, {
                'content-type': `${mime.getType(suffix)};charset=utf-8;`
            });
            res.end(result);
        }).catch(error => {
            //=>读取失败:最可能由于文件不存在而读取失败(也就是客户端请求的地址是错误的, 我们应该响应的内容是404)
            res.writeHead(404, { 'content-type': 'text/plain;charset=utf-8;' });
            res.end('NOT FOUND!');
        });
        return;
    }

    //=> API接口请求处理
    if (pathname === '/getUser' && method === 'GET') {
        // 定义无对应信息的返回值. 问号传递的信息都在query存储着
        let { userId = 0 } = query;
        let returnValue = { code: 1, message: 'no!', data: null };

        // 读取所有的user信息, 并判断是否有对应的userid, 有就返回, 没有返回一个不存在的信息
        readFile(`./json/USER.JSON`).then(result => {

        }).catch(error => {
            res.writeHead(200, {
                'content-type': 'application/json;charset=utf-8;'
            });
            res.end(JSON.stringify(returnValue));
        });
        return;
    }
};
http.createServer(handle).listen(port, () => {
    console.log(`server is success, listen on ${port}!`)
});


