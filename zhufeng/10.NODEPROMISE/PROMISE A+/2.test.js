// 在浏览器上，下面的程序会一次输出哪些内容？

const p1 = () => (new Promise((resolve, reject) => {
  console.log(1);
  let p2 = new Promise((resolve, reject) => {
    console.log(2);
    const timeOut1 = setTimeout(() => {
      console.log(3);
      resolve(4);
    }, 0)
    resolve(5);
  });
  resolve(6);
  p2.then((arg) => {
    console.log(arg);
  });

}));
const timeOut2 = setTimeout(() => {
  console.log(8);
  const p3 = new Promise(reject => {
    reject(9);
  }).then(res => {
    console.log(res)
  })
}, 0)


p1().then((arg) => {
  console.log(arg);
});
console.log(10);

// 1,2,10,5,6,8,9,3
/* 事件循环：javascript的执行规则里面有个事件循环Event Loot的规则，在事件循环中，异步事件会放到异步队列里面，但是异步队列里面又分为宏任务和微任务，浏览器端的宏任务一般有：script标签,setTimeout,setInterval,setImmediate,requestAnimationFrame。微任务有：MutationObserver,Promise.then catch finally。宏任务会阻塞浏览器的渲染进程，微任务会在宏任务结束后立即执行，在渲染之前。

回到题目，结果为：'1,2,10,5,6,8,9,3'。你答对了吗？如果对了，那你基本理解了事件队列，微任务，宏任务了。

第一步：执行宏任务，结合规则一，输出：1,2,10。这时候事件循环里面有异步任务timeOut1,timeOut2,p2.then,p1.then。

第二步：宏任务执行完后Event Loop会去任务队列取异步任务，微任务会优先执行，这时候会先后执行p2.then,p1.then，打印5,6。

第三步：微任务执行完了，开始宏任务，由于2个settimeout等待时间一样，所以会执行先进入异步队列的timeOut2,先后打印：8。执行宏任务的过程中，p3.then微任务进入了队列，宏任务执行完毕会执行微任务，输出：9。之后执行timeOut1,输出：3。

第四步：结合规则6，由于p2这个Promise对象的执行结果已经确定，所以4不会被打印。 */
