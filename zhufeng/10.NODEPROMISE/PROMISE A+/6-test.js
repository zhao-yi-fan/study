// let Promise = require('./6-promise')
// let p1 = new Promise((resolve, reject) => {
// resolve和reject只能执行一个，执行其中一个另一个就不会执行
// setTimeout(() => {
// 定时器中不能手动抛异常
// Math.random() < 0.5 ? resolve(100) : reject(-100)
// }, 1000);
// resolve(100)
// throw new Error('ERROR');
// })
// let p2 = p1.then(result => {

//   return result + 100;
// });
// let p3 = p2.then(result => {
//   console.log(result)
//   throw new Error('222')
// }).catch(reason => {
//   console.log(reason)
// })
// console.log(3)

/* let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(100)
  }, 50);
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(200)
  }, 10);
})
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(300)
  }, 80);
})
Promise.all([p1, p2, p3]).then(result => {
  // 所有的promise都成功执行，result中分别存储每一个实例返回的结果，**而且和数组中的顺序是一样的，和哪个先执行完没有关系**
  console.log(result)
}).catch(reason => {
  // 只要有一个失败，就执行这个方法，失败后不再执行后面的操作
  console.log(reason)
}) */








// var promise = new Promise(function(resolve, reject){
//   setTimeout(function() {
//     resolve(1);
//   }, 3000)
// })

// promise.then(2).then((n) => {
//   console.log(n)
// });

// Promise.resolve()
//   .then(() => {
//     return new Error('error!!!')
//   })
//   .then((res) => {
//     console.log('then: ', res)
//   })
//   .catch((err) => {
//     console.log('catch: ', err)
//   })


