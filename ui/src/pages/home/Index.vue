<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <Aside />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main class="centerMain">
          <transition name="slide-fade">
            <router-view></router-view>
          </transition>
          <router-view name="footer"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Header from './components/header'
import Aside from './components/aside'
export default {
  // 路由进入之前
  beforeRouteEnter (to, from, next) { // 通常用来做页面的权限
    console.log(this); // 外面是拿不到this的
    next(vm => { // 这个next方法会在组件渲染完毕之后调用
      console.log(vm); // 可以拿到this
    })
  },
  // 路由离开之前
  beforeRouteLeave (to, from, next) {
    next()
  },
  name: 'App',
  components: {
    Header,
    Aside
  },
  mounted () {
  }
}
</script>
<style scoped>
.index /deep/ .el-header,
.el-footer {
  padding: 0;
}
.centerMain {
  min-height: calc(100vh - 60px);
}
</style>