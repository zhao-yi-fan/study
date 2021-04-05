<template>
  <div>
    <button @click="showMessage">点我弹层</button>
  </div>
</template>

<script>
import Vue from 'vue'
import Message from './components/Message'
Vue.use(Message, { duration: 1000 })
/* 
防止多次调用 否则会生成多个实例
Vue.use(Message, { duration: 1000 })
Vue.use(Message, { duration: 1000 })
Vue.use(Message, { duration: 1000 }) */
export default {
  data () {
    return {
    }
  },
  methods: {
    showMessage () {
      this.$message.info({
        message: "我很帅",
        duration: 3000
      })
    }
  },
}
</script>
<style lang="css" scoped>
</style>
