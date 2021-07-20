<template>
  <div class="cropper-component">
    <div class="info-item">
      <div class="btn-box">
        <label class="btn"
               for="uploads">选择图片</label>
        <input type="file"
               id="uploads"
               style="position:absolute; clip:rect(0 0 0 0);width: 1px;"
               accept="image/png, image/jpeg, image/gif, image/jpg"
               @change="uploadImg($event, 1)">

        <input type="button"
               class="operation-btn"
               value="+"
               title="放大"
               @click="changeScale(1)">
        <input type="button"
               class="operation-btn"
               value="-"
               title="缩小"
               @click="changeScale(-1)">
        <input type="button"
               class="operation-btn"
               value="↺"
               title="左旋转"
               @click="rotateLeft">
        <input type="button"
               class="operation-btn"
               value="↻"
               title="右旋转"
               @click="rotateRight">
        <input type="button"
               class="operation-btn"
               value="↓"
               title="下载"
               @click="down('blob')">
        <div class="btn"
             @click="finish('blob')">上传图片</div>
      </div>
      <div class="operation-box">
        <div class="cropper">
          <vueCropper ref="cropper"
                      :img="option.img"
                      :outputSize="option.size"
                      :outputType="option.outputType"
                      :info="option.info"
                      :full="option.full"
                      :canMove="option.canMove"
                      :canMoveBox="option.canMoveBox"
                      :original="option.original"
                      :autoCrop="option.autoCrop"
                      :autoCropWidth="option.autoCropWidth"
                      :autoCropHeight="option.autoCropHeight"
                      :fixedBox="option.fixedBox"
                      @realTime="realTime"
                      @imgLoad="imgLoad"></vueCropper>
        </div>
      </div>
      <div class="preview-box">
        <div>预览：</div>
        <div :style="previews.div"
             class="preview">
          <img :src="previews.url"
               :style="previews.img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OSS from 'ali-oss'
export default {
  name: 'cropper',
  data () {
    return {
      // 剪切图片上传
      crap: false,
      previews: {},
      option: {
        img: '', // 裁剪图片的url或者base64地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 剪切后的图片质量（0.1-1）
        full: true, // 输出原图比例截图 props名full
        outputType: 'png', // 裁剪生成图片的格式
        canMove: true, // 能否拖动图片
        original: false, // 上传图片是否显示原始宽高
        canMoveBox: true, // 能否拖动截图框
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 150,
        // autoCropHeight: 150,
        fixedBox: false // 截图框固定大小
      },
      fileName: '', // 本机文件名称
      uploadImgRelaPath: '' // 上传后的图片的地址（不带服务器域名）
    }
  },
  props: ['uploadType'],
  methods: {
    // 放大/缩小
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // 左旋转
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    // 右旋转
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },

    // 实时预览
    realTime (data) {
      this.previews = data
    },
    // 选择本地图片
    uploadImg (e, num) {
      var _this = this
      console.log(e, 'aaaaaa')
      var file = e.target.files[0]
      // console.log(file)
      _this.fileName = file.name
      // console.log(e.target.value) //=> C:\fakepath\Snipaste_2019-05-30_13-58-47.png
      let reg = /\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/
      if (!reg.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      var reader = new FileReader()

      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          let blob = new Blob([e.target.result])
          // 对二进制代码生成一个URL
          data = window.URL.createObjectURL(blob)
          // console.log(data) // blob:http://localhost:8080/09fd5381-ccde-40dc-8b43-1a3ed7e9704b
        } else {
          data = e.target.result
        }
        if (num === 1) {
          _this.option.img = data // 生成url格式后传给option.img，就可以展示之后再裁剪上传。
        } else if (num === 2) {
          _this.example2.img = data
        }
      }
      // file文件转化为base64
      // reader.readAsDataURL(file)
      // file文件转化为blob
      reader.readAsArrayBuffer(file)
    },
    // 下载图片
    down (type) {
      var aLink = document.createElement('a')
      console.dir(aLink)
      aLink.download = 'author-img' // 下载的文件名
      if (type === 'blob') {
        // 获取截图的blob数据
        this.$refs.cropper.getCropBlob((data) => {
          aLink.href = window.URL.createObjectURL(data) // 把图片链接放到a标签中
          aLink.click() // 点击链接是图片的a标签，会下载图片
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          aLink.href = data
          aLink.click()
        })
      }
    },
    // 图片加载的回调
    imgLoad (msg) {
      console.log(msg)
    },
    // 上传图片（点击上传按钮）
    finish (type) {
      let _this = this
      // let formData = new FormData()
      // 输出
      if (type === 'blob') {
        // 获取截图的blob数据
        this.$refs.cropper.getCropBlob((data) => {
          // let img = window.URL.createObjectURL(data)
          // formData.append('multfile', data, _this.fileName)
          // formData.append('operaType', this.uploadType)

          // this.$store.dispatch('UPLOAD_HEAD', formData)
          //   .then(res => {
          //     let data = res.data.data
          //     this.$emit('upload', data)
          //     this.$message.success('上传成功！')
          //   }).catch(err => {
          //     if (err.data) {
          //       this.$message.error(err.data.msg)
          //     } else {
          //       this.$message.error('上传失败！')
          //     }
          //   })

          const client = new OSS({
            region: 'oss-cn-beijing',
            accessKeyId: 'LTAIA5SVWAVmBMVs',
            accessKeySecret: 'lx5zFTli3u7RbWsA6LhA3YDuPlw8GE',
            bucket: 'iiicici'
          })
          // 文件名字加后缀
          const objectKey = `${new Date().getTime()}.${_this.option.outputType}`
          _this.put(client, objectKey, data)
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          // this.model = true;
          // this.modelSrc = data;
        })
      }
    },
    async put (client, fileName, file) {
      try {
        let result = await client.put(fileName, file)
        console.log(result, '上传成功结果')
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted () {
    /* this.option.img = 'https://iiicici.oss-cn-beijing.aliyuncs.com/1561348433439.png' */
  }
}

</script>

<style lang="css">
.cropper-component {
  width: 500px;
  margin: 0 auto;
  position: relative;
}
.cropper-component .btn-box {
  margin: 20px 0;
}
.cropper-component .btn-box .btn {
  padding: 4px 12px;
  text-align: center;
  border-radius: 4px;
  background-color: #387ef6;
  color: #fff;
  cursor: pointer;
  display: inline-block;
}
.cropper-component .btn-box .operation-btn {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #eaeaea;
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  color: #333;
  padding: 0;
  margin: 0 10px;
}
.info-item .preview-box {
  top: 60px;
  right: 10px;
}
.info-item .preview-box .preview {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: #ccc;
  margin: 5px;
  overflow: hidden;
}
.info-item .operation-box {
  display: inline-block;
}
.info-item .operation-box .cropper {
  width: 260px;
  height: 260px;
}
</style>
