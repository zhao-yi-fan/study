- 安装在本地和全局的区别
> [安装在全局的特点]
> 1. 所有的项目都可以使用这个模块
>       容易导致版本冲突
>       安装在全局的模块, 不能基于CommonJS模块规范调取使用(也就是不能在JS中通过require调取使用)
>  
> [安装在本地的特点]
> 1. 只能当前项目使用这个模块
>       不能直接的使用命令操作(安装在全局可以使用命令)
- 为什么安装在全局下可以使用命令
> `npm root / -g` 查看本地项目或者全局环境下, NPM的安装目录
> 安装在全局目录下的模块, 但部分都会生成一个xxx.cmd的文件, 只要有这个文件, 那么xxx就是一个可执行的命令(例如: yarn.cmd => yarn 就是命令)
> nrm.cmd
```
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\nrm\cli.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\node_modules\nrm\cli.js" %*
)
```
- 能否既安装在本地, 也可以使用命令操作吗?
> 1. 把模块安装在本地, 如果是支持命令操作的模块, 会在node_modules的bin中生成xxx.cmd的命令文件, 只不过这个文件无法再全局下执行.
> 2. 在package.json的scripts中配置需要执行的命令脚本
```
"scripts": {
"zyf": "lessc -v"  属性名自己设置即可, 属性值是需要执行的命令脚本, 根据需要自己编写(可以配置很多命令的)
}
```
> 3. `npm run zyf` / `yarn zyf` 这样的操作就是把配置的脚本执行
>       首先到配置清单的scripts中查找
>       找到把后面对应的属性值(执行脚本)执行
>       执行脚本的时候, 会到本地node_modules中的bin文件夹查找, 没有的话, 再向NPM安装的全局目录下查找.