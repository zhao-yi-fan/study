- 之所以把NODE作为后台编程语言, 是因为:

> 1. 我们可以把NODE安装在服务器上
> 2. 我们可以把编写的JS代码放到服务器上, 通过NODE来执行它(我们可以使用JS来操作服务器, 换句话说, 使用JS来实现服务器端的一些功能操作 => 其实说NODE是后台语言, 想要表达的是JS是后台语言"JS是一门全栈编程语言")

- NODE做后台的优势和特点

> 传统的后台语言: JAVA/Python/PHP/C#(.NET)...
> 1. 单线程的
> 2. 基于V8引擎渲染: 快
> 3. 异步无阻塞的I/O操作: I/O(INPUT/OUTPUT) 对文件的读写
> 4. event-driven事件驱动, 类似于发布订阅或者回调函数

- 在WebStorm中开启NODE内置方法的代码提示

> File-> settings -> languages & frameworks -> node.js and npm -> 开启代码提示只要点击"Enable"按钮即可(Disable是取消代码提示)

```javascript
JS运行在客户端浏览器中=>"前端"
    浏览器给JS提供了很多全局的属性和方法, 例如: window.xxx(setInterval, setTimeout, eval, alert, JSON...)
JS运行在服务器端的NODE中=>"后台"
    NODE也给JS提供很多的内置属性和方法, 例如: http, fs, url, path...等对象中都提供很多API供JS操作
```
- 限制I/O操作的情况

> 前端(浏览器运行JS)是限制I/O操作的
>   input type='file' 这种算是I/O操作, 但是需要用户手动选择(而且还仅仅是一个读取不是写入)
> NODE中运行JS时不需要限制I/O操作的
