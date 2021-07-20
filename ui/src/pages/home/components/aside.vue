<template>
  <div class="aside">
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
      <el-menu-item index="/index/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/index/profile">
        <i class="el-icon-document"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-menu-item index="/index/user">
        <i class="el-icon-setting"></i>
        <span slot="title">用户页面</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      isCollapse: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="css" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: calc(100vh);
  border: 0;
  overflow-x: hidden;
}
</style>
