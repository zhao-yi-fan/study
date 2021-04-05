- NPM的应用

> 目前"工程化/自动化"开发(不一定是写后台), 都是基于NODE环境, 基于NPM管理模块, 基于WEBPACK实现模块之间的依赖打包, 部署上线等
> 
- NPM常规操作
```
    npm install xxx 把模块安装到当前目录(在哪个目录下执行的命令, 这个目录就是当前目录)下
    npm install xxx -g 把模块安装在全局目录下
    npm uninstall xxx/ npm uninstall xxx -g
    npm install xxx@xxx 安装指定版本号的模块
    npm view xxx > xxx.version.txt 查看模块的历史版本信息

```
> NPM的默认安装源都是在 https://www.npmjs.com/ 网站查找的, 在国内安装, 下载速度较慢, 想要下载速度快一些, 我们可以如下处理:
>   1. 使用淘宝镜像
```
    npm install cnpm -g
    cnpm install zepto
```
>   安装nrm切源工具, 基于nrm把源切换到淘宝源上

```
    npm install nrm -g 
    nrm ls 查看当前可用的源
    nrm use xxx 使用某个源
    这样处理完成后, 后期模块的管理依然基于npm即可
```
>   2. 基于YARN安装, 它也是模块管理器, 类似于npm. 但是安装管理的速度比npm快很多

```
    npm install yarn -g
    yarn add xxx
    yarn remove xxx

    使用yarn只能把模块安装到当前目录下, 不能安装到全局环境下
```
>   3. bower也是类似于npm的包管理器, 只不过它是从github下载安装

```
    npm install bower -g
    
    bower install xxx
    ...
```
