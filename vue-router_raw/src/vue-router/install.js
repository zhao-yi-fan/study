export let _Vue;

// 需要将install方法单独的进行拆分
export function install (Vue, options) {
  console.log(Vue, options);
  _Vue = Vue;
  // 我需要将当前的根实例提供的router属性共享给所有子组件
  // 所有子组件初始化的时候 都会去调用Vue.extend Vue.options

  Vue.mixin({
    beforeCreate () {
      // 获取每个实例，给实例添加属性
      console.log(this.$options.router,'this.$options.router====');
      if (this.$options.router) { // this为根
        this._routerRoot = this; // 根实例挂载到_routerRoot属性上
        this._router = this.$options.router;
        this._router.init(this);
      } else { // this为子孙辈
        this._routerRoot = this.$parent && this.$parent._routerRoot;
        // this._routerRoot._router;

      }
      // 根._routerRoot => 父亲._routerRoot => 儿子._routerRoot => 孙子._routerRoot
    }
  })
}