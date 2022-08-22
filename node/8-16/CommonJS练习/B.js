/* let A = require('./A');
let avg = function () {
    let ary = Array.from(arguments);// 把类数组转为数组
    let avg = 0;
    avg = A.sum(ary) / ary.length;
    return avg;
}
module.exports = {
    avg: avg
}
 */

//===================
let A = require('./A');
module.exports = {
    avg(...arg) {// 剩余运算符, 会把传的值变成一个数组
        // console.log(arg)//=> [ 12, 23, 34, 45, 56, 67, 78, 89 ] 
        // console.log(...arg)//=> 12 23 34 45 56 67 78 89 展开运算符
        return A.sum(...arg) / arg.length;
    }
}