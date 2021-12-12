/**
 * @param {Array} record 已经存在的路由记录 
 * @param {Object} location 当前的路由记录 { path: '/' }
 * @returns {path: '/',matched:[{
 *  component: 
 *  meta: undefined
 *  name: "Home"
 *  params: {}
 *  parent: null
 *  path: "/"
 *  props: undefined
 * }]}
 */
export function createRoute (record, location) {
  let res = [];

  // /about  /about/a
  if (record) {
    while (record) {
      res.unshift(record)
      record = record.parent;
    }
  }

  return {
    ...location,
    matched: res
  }

}
export default class History {
  constructor(router) {
    this.router = router;

    // 最终核心 需要将current属性变化成响应式的 后续current变化会更新视图

    // /about/a => [/about /about/a]
    this.current = createRoute(null, {
      path: '/'
    })
  }

  /**
   * @description 根据路径进行组件渲染 数据变化 视图更新
   * @param {*} location 
   * @param {*} onComplete 
   */
  transitionTo (location, onComplete) { // 默认会先执行一次
    // 根据跳转的路径 获取匹配的记录
    let route = this.router.match(location); // route = {path: '/',matched:[{},{}]}

    this.current = route; // current变量引用地址变了
    this.cb && this.cb(route);

    onComplete && onComplete() // cb调用后hash监听启动 hash改变后再次调用transitionTo
  }
  listen (cb) {
    this.cb = cb;
  }
}