- 什么是NODE?
> 基于V8引擎(谷歌浏览器的引擎)渲染JS的工具或者环境
>   安装NODE
>   把JS代码放到NODE环境中执行

- 安装NODE
> https://nodejs.org/en/
> node安装完成后
>   当前电脑上自动安装了npm(Node Package Manager): 一个JS模块(所有封装好可以供他人调取使用的都可以称之为模块或者包)管理的工具, 基于npm可以安装下载JS模块
>   它会生成一个node执行的命令(可以在DOS窗口或者终端命令中执行): node xxx.js
> 如果不成功, 可以找相同电脑配置的人员, 把安装成功的NODE文件夹拷贝到自己的电脑上, 通过配置环境变量, 来实现NODE安装

- 如何在NODE中渲染和解析JS

> REPL模式(Read-Evaluate-Print-Loop, 输入-求值-输出-循环)
> 直接基于NODE来执行JS文件
>   在命令窗口中执行(DOS窗口 & 终端窗口)
>   WebStorm中的Terminal中也可以执行node命令
>   直接在WebStorm中执行(右键=> Run xxx.js), 这种方式可能会产生缓存(尤其是文件的目录改动后)

