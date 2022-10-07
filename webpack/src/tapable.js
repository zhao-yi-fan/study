// 同步 参数相同依次执行
class SyncHook {
  constructor() {
    this.hooks = []
  }
  tap (name, fn) {
    console.log(name, 'name');
    this.hooks.push(fn)
  }
  call (...args) {
    this.hooks.forEach(hook => hook(...args))
  }
}

// 同步 返回值不为undefined时停止后续代码执行
class SyncBailHook {
  constructor() {
    this.hooks = []
  }
  tap (name, fn) {
    this.hooks.push(fn)
  }
  call (...args) {
    let ret = null;
    let index = 0;
    do {
      ret = this.hooks[index](...args)
    } while (ret === undefined && ++index < this.hooks.length)

  }
}
// 同步 上一个执行结果传递给下一个
class SyncWaterfallHook {
  constructor() {
    this.hooks = []
  }
  tap (name, fn) {
    this.hooks.push(fn)
  }
  call (...args) {
    const [first, ...others] = this.hooks;
    const ret = first(...args)
    others.reduce((a, b) => {
      return b(a)
    }, ret)
  }
}

// 同步 返回值不为undefined时循环执行
class SyncLoopHook {
  constructor() {
    this.hooks = []
  }
  tap (name, fn) {
    this.hooks.push(fn)
  }
  call (...args) {
    this.hooks.forEach(hook => {
      let ret;
      do {
        ret = hook(...args)
      } while (ret !== undefined)
    })
  }
}

// 异步并行
class AsyncParallelHook {
  constructor() {
    this.hooks = []
  }
  tapAsync (name, fn) {
    this.hooks.push(fn)
  }
  tapPromise (name, fn) {
    this.hooks.push(fn)
  }
  // promise.all
  promise (...args) {
    const tasks = this.hooks.map(hook => hook(...args))
    return Promise.all(tasks);
  }
  // callback 所有的都执行完，最后执行回调
  callAsync (...args) {
    const finallCallback = args.pop();
    let index = 0
    const done = () => {
      index++;
      if (index === this.hooks.length) {
        finallCallback()
      }
    }
    this.hooks.forEach((hook) => {
      hook(...args, done)
    })
  }
}

// 异步串行
class AsyncSeriesHook {
  constructor() {
    this.hooks = []
  }
  tapAsync (name, fn) {
    this.hooks.push(fn)
  }
  callAsync (...args) {
    const finallyCallback = args.pop();
    let index = 0;
    const next = () => {
      if (index === this.hooks.length) {
        return finallyCallback()
      }
      const hook = this.hooks[index];
      index++;
      hook(...args, next)
    }
    next()
  }

  tapPromise (name, fn) {
    this.hooks.push(fn)
  }

  promise (...args) { // redux源码
    const [first, ...other] = this.hooks;
    return other.reduce((promiseChain, hook) => {
      return promiseChain.then(() => hook(...args))
    }, first(...args))
  }
}


module.exports = {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncSeriesHook
}