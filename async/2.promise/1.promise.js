// Promise 解决的问题
// 1）回调嵌套 回地狱
// 2）错误捕获 不好处理错误
// 3）多个异步同步的问题 Promise.all解决异步并发的问题
// 还是基于回调的方式
// 先读取用户姓名 根据姓名获取年龄 根据年龄 推荐产品

// Promise是一个类 默认浏览器 高版本 node 都自带了
// es6-promise解决兼容性问题

// Promise的概念 规范文档 promise A+ 规范
// Promise 三个状态 等待 成功态 失败态
// 只有等待态才能变成成功 / 失败
// 如果状态变化后不能再修改状态
let p = new Promise((resolve, reject) => { // exector 执行器
  // pendding
  console.log('excutor')
  //resolve(); // 编程成功
  reject(); // 不能变成失败
})
// 每个promise的实例上都有一个then方法
p.then(() => { // fulfilled
  console.log('成功')
}, () => { // rejected
  console.log('失败')
})