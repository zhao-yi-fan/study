var ary = [12, 23];

function fn (ary) {
    console.log(ary);
    ary[0] = 100;
    ary = [100];
    ary[0] = 0;
    console.log(ary);
}
fn(ary);
console.log(ary);

// 结合 私有变量和全局变量的区别 变量提升 形参赋值 作用域链 基本类型和引用类型的区别