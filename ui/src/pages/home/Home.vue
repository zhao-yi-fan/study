<template>
  <div>
    {{c}} {{a}}
    {{this.$store.getters.countGetters}}
    {{countGetters}}
    <br>
    <button @click="minus">点击两秒之后-10</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Home',
  components: {
  },
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  computed: {
    /* count: function () {
      return this.$store.state.count;
    }, */
    //和在computed中把state的变量改变成计算属性同理，方法中得使用数组，
    ...mapState(['count']),
    // 如果需要把state中的变量改名就用对象mapState({'c':'count'})
    ...mapState({ 'c': 'count' }),
    // 3.函数形式 用来获取对象中的属性
    ...mapState({ a: state => state.b.a }),
    // this.$store.getters 同样有三种方式
    ...mapGetters(['countGetters'])
  },
  methods: {
    ...mapActions(['minusActions']),
    minus () {
      this.minusActions();
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="" scoped>

</style>
