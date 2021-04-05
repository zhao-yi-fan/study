<template>
  <div class="messages" v-if="messages.length">
    <div v-for="m in messages" :key="m.id">
      {{m.message}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      messages: []
    }
  },
  mounted () {
    this.id = 0; // 表示当前弹层的唯一标识
  },
  methods: {
    add (options) {
      let id = this.id++;
      let layer = { ...options, id };
      this.messages.push(layer);
      layer.timer = setTimeout(() => {
        this.remove(layer)
      }, options.duration);
    },
    remove (layer) {
      clearTimeout(layer.timer);
      this.messages = this.messages.filter(message => message.id !== layer.id)
    }
  },
}
</script>
<style lang="css" scoped>
</style>
