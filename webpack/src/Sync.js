const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook
} = require('tapable')

// const { SyncHook, SyncBailHook, SyncWaterfallHook } = require('./tabable')


/* const Person = new SyncHook(['name', 'age'])
Person.tap('say', (...args) => {
  console.log('say', ...args);
})
Person.tap('eat', (...args) => {
  console.log('eat', ...args);
})
Person.call('tom', 18) */


/* const Person1 = new SyncBailHook(['name', 'age'])
Person1.tap('say', (...args) => {
  console.log('say', ...args);
  return '停止后续代码执行' // 返回值不为undefined时停止后续代码执行
})
Person1.tap('eat', (...args) => {
  console.log('eat', ...args);
})
Person1.call('tom', 18) */


/* const PersonWaterfall = new SyncWaterfallHook(['name', 'age'])
PersonWaterfall.tap('say', (...args) => {
  console.log('say', ...args);
  return 'sayok' // 上一个执行结果传递给下一个
})
PersonWaterfall.tap('eat', (...args) => {
  console.log('eat', ...args);
  return 'eatok'
})
PersonWaterfall.tap('play', (...args) => {
  console.log('play', ...args);
})
PersonWaterfall.call('tom', 18) */


// 返回值不为undefined时循环执行
const PersonWaterfall = new SyncLoopHook(['name', 'age'])
let total = 0;
PersonWaterfall.tap('say', (...args) => {
  console.log('say', ...args);
  total += 1;
  return total === 3 ? undefined : 'say' // 上一个执行结果传递给下一个
})
PersonWaterfall.tap('eat', (...args) => {
  console.log('eat', ...args);
})
PersonWaterfall.tap('play', (...args) => {
  console.log('play', ...args);
})
PersonWaterfall.call('tom', 18)