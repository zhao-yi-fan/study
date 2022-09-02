import Vue from 'vue'
import VueRouter from 'vue-router'

import Bar from './components/Bar.vue'
import Foo from './components/Foo.vue'
import VueMeta from 'vue-meta'

Vue.use(VueMeta) // this.$meta
Vue.use(VueRouter)

export default () => {
  let router = new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Bar
      },
      {
        path: '/foo',
        // 动态路由导入
        component: () => import('./components/Foo.vue')
      }
    ]
  })
  return router;
}