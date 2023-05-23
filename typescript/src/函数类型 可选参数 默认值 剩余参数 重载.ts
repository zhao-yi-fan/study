// function函数关键字来声明 表达式方式来声明
//函数想要表示类型
//考虑入参和函数的返回值
//声明不赋值就是any类型
// 1)
// function sum1(a:string, b:string):string{
// return a+b;
// }

// 2）如果使用的是表达式 你给他定义了类型，你可以把一个可以兼容的函数赋予给他
// type Sum = (a1: string, b1: string) => string;
// let sum: Sum = (a: string, b: string): string => {
//   return a + b;
// };
// sum("1", "2");

// 可选参数 ? 默认值 =
// b? 表示b可以不传递
// let sum = (a: string, b?: string) => {};
// sum("1");
// let sum = (a: string, b: string = "b") => {
//   console.log(b);
// };
// sum('1')

// 剩余参数
let sum = (...args: number[]) => {};
sum(1, 2, 3, 4, 5);

// 函数的重载
// 希望把一个字符串转换成字符串数组 把一个数字转换成数字数组
// 123 => [1,2,3];
// '123'=>['1','2','3']
function toArray(value: number): number[];
function toArray(value: string): string[];
function toArray(value: number | string) {
  if (typeof value == "string") {
    return value.split("");
  } else {
    return value
      .toString()
      .split("")
      .map((item) => parseInt(item));
  }
}
toArray(123);

export {};
