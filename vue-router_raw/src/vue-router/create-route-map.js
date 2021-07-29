export default function createRouteMap (routes, oldPathMap) {
  // 1个参数时初始化 2个参数就是动态添加路由
  let pathMap = oldPathMap || {};
  routes.forEach(route => {
    addRouteRecord(route, pathMap, null)
  })
  return {
    pathMap
  }

}

function addRouteRecord (route, pathMap, parent) { // pathMap = {路径,记录}
  // 要判断 儿子的路径不是以 / 开头的，否则不拼接 父路径
  let path = parent ? parent.path + '/' + route.path : route.path;
  let record = {
    path,
    parent, // parent 指代的父记录
    component: route.component,
    name: route.name,
    props: route.props,
    params: route.params,
    meta: route.meta,
  }
  if (!pathMap[path]) {
    pathMap[path] = record
  }

  if (route.children) {
    route.children.forEach((childRoute) => {
      addRouteRecord(childRoute, pathMap, record)
    })
  }

}