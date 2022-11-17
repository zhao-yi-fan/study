<template>
  <div class="aa">
    {{ obj.a }}
    {{ obj.b }}
    <button @click="onclick">点我+1</button>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      obj: {
        a: 1,
        b: 2,
      },
    };
  },
  methods: {
    onclick() {
      this.obj.a++;
    },
  },
};
</script>
<style lang="scss">
.aa {
  background-color: red;
}
</style>
