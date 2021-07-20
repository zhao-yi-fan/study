export let _Vue;

// 需要将install方法单独的进行拆分
export function install (Vue, options) {
  console.log(Vue, options);
  _Vue = Vue;
  // 我需要将当前的根实例提供的router属性共享给所有子组件
}