/**
 * js中的内存分为堆内存和栈内存
 *      堆内存: 存储引用数据类型值(对象: 键值对  函数: 代码字符串)
 *      栈内存: 提供js代码执行的环境和存储基本类型值
 * 
 * [堆内存释放]
 *      让所有引用堆内存空间地址地址的变量赋值为null即可(没有变量占用这个堆内存了, 浏览器会在空闲的时候把它释放掉)
 * 
 * [栈内存释放]
 *      一般情况下, 当函数执行完成, 所形成的**私有作用域(栈内存)**都会自动释放掉(在栈内存中存储的值也都会释放掉), 
 *      但是也有特殊不销毁的情况:
 *      1. 函数执行完成, 当前形成的栈内存中, 某些内容被栈内存以外的变量占用了, 此时栈内存不能释放(一旦释放外面找不到原有的内容了)
 *      2. 全局栈内存只有在页面关闭的时候才会被释放掉
 *      ...
 *      如果当前栈内存没有被释放, 那么之前在栈内存中存储的基本值也不会被释放, 能够一直保存下来
 *      
 */
// 闭包有两个作用
// 1. 保护私有变量不受外界干扰
// 2. 形成一个不销毁的栈内存, 把里面的私有变量保存起来, 供以后使用

var i = 1;
function fn(i) {
    return function (n) {
        console.log(n + (++i));
        
    }
}
var f = fn(2);
f(3);
fn(5)(6);
fn(7)(8);
f(4);
//=> 6 12 16 8


// var f = fn(2); //=> 先把fn执行(传递实参2), 把fn执行的返回结果(return 后面的值)赋值给f.
// f(); //=> 把返回的结果执行.
// fn(2)(); //=> 和上面的两个步骤类似, 都是先把fn执行, 把fn执行的返回结果再次执行.