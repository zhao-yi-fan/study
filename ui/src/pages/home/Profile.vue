<template>
  <div>
    <Eupload />
    <img src="../../assets/img/111.jpg"
         alt=""
         class="img">
    <vue-preview :slides="list"
                 @close="handleClose"></vue-preview>

  </div>
</template>

<script>
import Eupload from '@/common/cropper/Ele-upload'
export default {
  components: {
    Eupload
  },
  props: {},
  data () {
    return {
      list: [
        {
          src: 'https://placekitten.com/600/400', w: 600, h: 400
        },
        {
          src: 'https://placekitten.com/1200/900', w: 1200, h: 900
        }
      ]

    }
  },
  watch: {},
  computed: {},
  methods: {
    handleClose () {
      console.log('handleClose')
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="css" scoped>
img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
