import createMatcher from "./create-matcher";
import { install, _Vue } from "./install";

export default class VueRouter {
  constructor(options) {
  }
  init (app) { // app根实例
    // 路由初始化
    createMatcher(app.router)
  }
}


VueRouter.install = install;