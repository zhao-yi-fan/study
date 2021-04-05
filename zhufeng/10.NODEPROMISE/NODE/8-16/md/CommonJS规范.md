- NODE入门

> NODE本身是基于CommonJS模块规范设计的, 所以模块是NODE的组成
>   内置模块: NODE天生提供给JS调取使用的
>   第三方模块: 别人写好的, 我们可以基于NPM安装使用
>   自定义模块: 自己创建一些模块

- CommonJS模块化设计的思想(AMD/CMD/ES6 MODULE都是模块设计思想)

> 1. CommonJS规定, 每一个JS都是一个单独的模块(模块是私有的: 里面设计的值和变量以及函数等都是私有的, 和其它的JS文件中的内容是不冲突的)
> 2. CommonJS中可以允许模块中的方法互相的调用
>   B模块中想要调取A模块中的方法
>       A导出
>       B导入
> [导出]
>   CommonJS给每一个模块(每个JS)中都设置了内置的变量/属性/方法
>       module: 代表当前这个模块[object]
>       module.exports: 模块的这个"属性"是用来导出当前模块的属性和方法的 [object]
>       exports: 是内置的一个"变量", 也是用来导出当前模块属性方法的, 虽然和module.exports不是一个东西, 但是对应的值是同一个(module.exports=exports 值都是对象)
> [导入]
>   require: CommonJS提供的内置变量, 用来导入模块的(其实导入的就是module.exports暴露出来的东西) 导入的值也是[object]类型的

- CommonJS特点

> 1. 所有代码都运行在模块作用域, 不会污染全局作用域(每一个模块都是私有的, 包括里面所有的东西也都是私有的, 不会和其他模块产生干扰)
> 2. 模块可以多次加载, 但是只会在第一次加载时运行一次, 然后运行结果就被缓存了, 以后再加载, 就直接读取缓存结果. 想要让模块再次运行, 必须清除缓存.
> 3. 模块加载的顺序, 按照其在代码汇总出现的顺序. CommonJS规范加载模块是同步的, 也就是说, 只有加载完成, 才能执行后面的操作.

> CommonJS规范和单例模式差不多
```javascript
var A = (function () {
    var a = 2;
    function fn() {
        return a * b;
    };
    return {
        fn: fn;
    }
})();
var B = (function () {
    function init() {
        var a = 3;
        A.fn(10);
    }
    return {
        init
    }
})();
B.init();
```