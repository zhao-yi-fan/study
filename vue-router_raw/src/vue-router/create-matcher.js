import createRouteMap from "./create-route-map";

export default function createMatcher (routes) {

  // {/:记录, /about: 记录,/about/a:'记录a'}
  let { pathMap } = createRouteMap(routes); // 根据用户的配置创建一个映射表

  console.log(pathMap, 'pathMap===');

  function addRoutes (routes) { // 动态添加路由权限
    createRouteMap(routes, pathMap)
  }

  function match (path) { // 根据路由匹配路由

  }
  return {
    addRoutes,
    match,
  }
}