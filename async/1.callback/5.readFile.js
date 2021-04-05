// node 方法 异步的i/o
// file system
let fs = require('fs')
// 异步的 回调 try catch只能读取同步的

function out () {
  // 查看对象有多少属性
  if (Object.keys(school).length == 2) {
    console.log(school)
  }
}

fs.readFile('./name.txt', 'utf8', function (err, data) {
  console.log(data)
});
fs.readFile('./age.txt', 'utf8', function (err, data) {
  console.log(data)
});