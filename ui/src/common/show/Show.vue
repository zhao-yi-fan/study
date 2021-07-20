<template>
  <div class="show">
    <div class="show-container">
      <a v-for="(item,index) in showList"
         :key="index"
         :href="item.showPath">
        <div class="show-container-item">
          <div class="img-area">
            <img :src="item.showImgUrl"
                 alt="">
          </div>
          <div class="item-title">
            <p>{{item.showTitle}}</p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Show',
  components: {},
  props: {},
  data () {
    return {
      showList: [
        {
          showImgUrl: 'https://img.alicdn.com/tfs/TB16OO6coGF3KVjSZFoXXbmpFXa-700-400.jpg',
          showTitle: '百度',
          showPath: 'http://www.baidu.com'
        },
        {
          showImgUrl: 'https://img.alicdn.com/tfs/TB16OO6coGF3KVjSZFoXXbmpFXa-700-400.jpg',
          showTitle: '百度',
          showPath: 'http://www.baidu.com'
        },
        {
          showImgUrl: 'https://img.alicdn.com/tfs/TB16OO6coGF3KVjSZFoXXbmpFXa-700-400.jpg',
          showTitle: '百度',
          showPath: 'http://www.baidu.com'
        },
        {
          showImgUrl: 'https://img.alicdn.com/tfs/TB16OO6coGF3KVjSZFoXXbmpFXa-700-400.jpg',
          showTitle: '百度',
          showPath: 'http://www.baidu.com'
        },
        {
          showImgUrl: 'https://img.alicdn.com/tfs/TB16OO6coGF3KVjSZFoXXbmpFXa-700-400.jpg',
          showTitle: '百度',
          showPath: 'http://www.baidu.com'
        },
        {
          showImgUrl: 'https://img.alicdn.com/tfs/TB16OO6coGF3KVjSZFoXXbmpFXa-700-400.jpg',
          showTitle: '百度',
          showPath: 'http://www.baidu.com'
        },
        {
          showImgUrl: 'https://img.alicdn.com/tfs/TB16OO6coGF3KVjSZFoXXbmpFXa-700-400.jpg',
          showTitle: '百度',
          showPath: 'http://www.baidu.com'
        },
        {
          showImgUrl: 'https://img.alicdn.com/tfs/TB16OO6coGF3KVjSZFoXXbmpFXa-700-400.jpg',
          showTitle: '百度',
          showPath: 'http://www.baidu.com'
        }
      ]

    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () { },
  mounted () { }
}
</script>
<style lang="css" scoped>
.show {
  width: 100%;
  padding-bottom: 20px;
}
.show-container {
  height: 100%;
  width: 90%;
  margin: 0 5%;
  /* background: #ccc; */
  display: flex;
  flex-wrap: wrap; /* 项目换行 */
  justify-content: space-around; /* 项目在主轴上的对齐方式。 */
  align-items: center; /* 项目在交叉轴上如何对齐。 */
}
.show-container-item {
  height: 230px;
  width: 320px;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 20px;
}
.show-container-item:hover {
  box-shadow: 0 0 15px rgba(186, 204, 207, 0.7);
}
.show-container-item .img-area {
  height: 170px;
  width: 100%;
  overflow: hidden;
}
.show-container-item .img-area img {
  transition: all 0.5s ease;
  height: 100%;
  width: 100%;
}
.show-container-item .img-area img:hover {
  transform: scale(1.05);
}
.show-container-item .item-title {
  padding: 18px 25px;
}
</style>
