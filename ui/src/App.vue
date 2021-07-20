<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  mounted () {

  }
}
</script>
<style>
/* 滚动条的宽度 */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: #a1a3a9;
  border-radius: 3px;
}
</style>
