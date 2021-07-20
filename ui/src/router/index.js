import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter) // Vue.component(); 注册了两种组件 router-link  router-view

import routes from './routes.js'

const router = new VueRouter({
  routes,
  /* 
  * 未添加 mode: http://localhost:8080/#/login    默认hash   使用a标签跳转<a href="#/Product">产品</a>  
  * 添加 mode为history: http://localhost:8080/login   使用a标签跳转<a href="/Product">产品</a>  
  * */
  mode: 'history', // 一共两种historyhash  默认是hash 
  /* 
  * 不是所有流浪器都支持 history 模式，如果遇到不支持的时候，需要设置 fallback 为 true，它会自动帮我们转成哈希去处理
  * 如果你设置成 false，在不支持的情况下，那么单应用就会变成多应用，你每次路由跳转都会去后端然后返回新的内容，所以一般都是设置成 ture 要它去自动处理就好了 
  * */
  fallback: true,
  /* 
  * 未添加 base: 链接与（未添加 mode || 添加 mode）时无变化
  * 添加 base: http://localhost:8080/base/login 
  * */
  // base: '/base/',

  /* 
  * linkActiveClass & linkExactActiveClass 这两个都是用来配置可点击链接的类名的
  * 例如： <router-link to="/login">跳转Login</router-link>
  * 在源码中默认是这么显示的： <a href="/login" class="router-link-exact-active router-link-active">跳转Login</a>
  * 可以看到里面的 class 默认是 router-link-exact-active 以及 router-link-active
  * 但是如果使用下面的两个属性配置之后则会显示成：<a href="/login" class="exact-active-link active-link">跳转Login</a>
  * 可以看到里面的 class 现在是 exact-active-link 以及 active-link
  * 这样就方便我们自己自定义类名了 
  * */
  // linkActiveClass: 'active-link',
  // linkExactActiveClass: 'exact-active-link',

  // * 控制滚动位置
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      // 有缓存位置则下次回到原来的位置
      return savedPosition
    } else {
      // 没有缓存位置则从0开始
      return { x: 0, y: 0 }
    }
  },

  /* 
  * 什么叫Query？ 就是 http://localhost:8080/login?a=xxx&p=xxx 链接 ？后面的搜索参数
  * 如果有什么特殊需求可以通过这两个函数进行自定义 
  */
  // parseQuery (query) {
  //   // 接收到的参数 query 是一个字符串
  // },
  // stringifyQuery (obj) {
  //   // 接收到的参数 obj 是一个对象
  // }
})

export default router;
