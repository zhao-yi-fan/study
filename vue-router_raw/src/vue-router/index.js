import createMatcher from "./create-matcher";
import { install, _Vue } from "./install";

export default class VueRouter {
  constructor(options) {
    // 根据用户的配置生成一个映射表，稍后跳转时，根据路径找到对应的组件来进行渲染

    // 创建匹配器后，核心的方法就是匹配
    // match addRoutes
    this.matcher = createMatcher(options.routes || [])
    console.log(this.matcher);
  }
  init (app) { // app根实例
    // 路由初始化
    console.log('init');

  }
}


VueRouter.install = install;