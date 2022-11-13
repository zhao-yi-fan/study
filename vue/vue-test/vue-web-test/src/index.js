import Vue from 'vue'
import PersonClass from '@/utils/index'
import App from './App'
const p = new PersonClass({
  name: 'zyf'
})
console.log(p?.options?.name);


new Vue({
  el: '#app',
  render: (h) => h(App)
})