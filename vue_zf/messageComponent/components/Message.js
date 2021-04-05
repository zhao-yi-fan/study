import Vue from 'vue';
import MessageComponent from './Message.vue'
// 获取当前组件的实例
let getInstance = () => {
  let vm = new Vue({
    // MessageComponent这个vue文件会被加载成一个对象
    render: h => h(MessageComponent)
  }).$mount(); // 会在内存中进行挂载
  // .$mount('#app') 写了就会挂载到页面，没写就会放到$el中
  // console.log(vm,'vm')
  document.body.appendChild(vm.$el)

  // 获取他的儿子，就一个儿子
  let component = vm.$children[0]
  return {
    add (options) {
      component.add(options)
    }
  }
}
// 单例模式
let instance;
const getInst = () => { // 返回唯一的实例
  instance = instance || getInstance();
  return instance;
}
const Message = {
  info (options) {
    getInst().add(options);
  },
  warn () { },
  success () { },
  error () { },
}

export {
  Message
}
let _Vue;
export default { // 写插件的原理
  install (Vue) { // options 选项代表的是 use的第二个参数
    // console.log(Vue, options)
    if (!_Vue) { // 防止用户多次use
      _Vue = Vue;
      let $message = {}
      Object.keys(Message).forEach(type => {
        $message[type] = Message[type];
      })
      Vue.prototype.$message = $message;
    }
    Vue.mixin({
      beforeCreated () { // 在所有的组件中都增加了这个方法
        if (this.$options.info) {
          console.log('根')
        } else {
          console.log('不是根')
        }
      }
    })
  }
}