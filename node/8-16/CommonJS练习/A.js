/* let sum = function (ary) {
    let sum = 0;
    for (let i = 0; i < ary.length; i++) {
        sum += ary[i];
    }
    return sum;
}
module.exports = {
    sum: sum
} */
//=================
module.exports = {
    sum(...arg) {// 剩余运算符 会把传过来的值变成一个数组. 如果传过来的也是一个数组, 会把数组外面再套一层数组
        // console.log(arg)//=> [ [ 12, 23, 34, 45, 56, 67, 78, 89 ] ]
        return eval(arg.join('+'));
    }
}