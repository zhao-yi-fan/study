// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// Element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import VueCropper from 'vue-cropper'
// require styles 轮播图插件
// 预览
import VuePreview from 'vue-preview'

// 引入reset.css
import '@/assets/styles/reset.css'


Vue.use(ElementUI) // 调用 install方法 干了两件事 注册组件Vue.component 在原型中写入属性Vue.prototype.xxx
Vue.use(VueCropper)
Vue.use(VuePreview)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // this.$route 放的都是属性 this.$router 放的都是方法
  store,
  render: h => h(App)
})
