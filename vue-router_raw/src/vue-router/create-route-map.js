export default function createRouteMap (routes, oldPathMap) {
  // 1个参数时初始化 2个参数就是动态添加路由
  let pathMap = oldPathMap || {};
  routes.forEach(route => {
    addRouteRecord(route, pathMap)
  })
  return {
    pathMap
  }

}

function addRouteRecord (route, pathMap) { // pathMap = {路径,记录}
  let path = route.path;
  let record = {
    path,
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
      addRouteRecord(childRoute, pathMap)
    })
  }

}