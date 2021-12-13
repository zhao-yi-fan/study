/**
 * @description 1个参数是初始化 2个参数就是动态添加路由
 * @param {*} routes 初始化的路由配置 
 * [
      {
        "path": "/",
        "name": "Home",
        "component": { "name": "Home", "components": {} }
      },
      {
        "path": "/about",
        "name": "About",
        "component": { "name": "About", },
        "children": [
          { "path": "a", "component": {} }, { "path": "b", "component": {} }
        ]
      }
    ]
 * @param {*} oldPathMap 
 * @returns 
 */
export default function createRouteMap (routes, oldPathMap) {
  let pathMap = oldPathMap || {};
  routes.forEach(route => {
    addRouteRecord(route, pathMap, null)
  })

  console.log({pathMap}, 'pathMap===');
  return {
    pathMap
  }

}

[{
  "/": {
    "path": "/", "parent": null, "component": { "name": "Home", "components": {} }, "name": "Home", "params": {}
  },
  "/about": {
    "path": "/about", "parent": null, "component": { "name": "About" }, "name": "About", "params": {}
  },
  "/about/a": {
    "path": "/about/a", "parent": { "path": "/about", "parent": null, "component": { "name": "About" }, "name": "About", "params": {} }, "component": {}, "params": {}
  },
  "/about/b": {
    "path": "/about/b", "parent": { "path": "/about", "parent": null, "component": { "name": "About" }, "name": "About", "params": {} }, "component": {}, "params": {}
  }
}
]


function addRouteRecord (route, pathMap, parent) { // pathMap = {路径,记录}
  // 要判断 儿子的路径不是以 / 开头的，否则不拼接 父路径
  let path = parent ? parent.path + '/' + route.path : route.path;
  let record = {
    path,
    parent, // parent 指代的父记录
    component: route.component,
    name: route.name,
    props: route.props,
    params: route.params || {},
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