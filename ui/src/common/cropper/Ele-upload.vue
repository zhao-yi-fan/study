<template>
  <div>
    <!-- element 上传图片按钮 -->
    <el-upload class="upload-demo"
               action=""
               drag
               :auto-upload="false"
               :show-file-list="false"
               :on-change='changeUpload'>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>
    </el-upload>
    <!-- vueCropper 剪裁图片实现-->
    <el-dialog title="图片剪裁"
               :visible.sync="dialogVisible"
               center
               :close-on-click-modal="false">
      <div class="cropper-content">
        <div class="cropper"
             style="text-align:center">
          <vueCropper ref="cropper"
                      :img="option.img"
                      :outputSize="option.size"
                      :outputType="option.outputType"
                      :info="true"
                      :full="option.full"
                      :canMove="option.canMove"
                      :canMoveBox="option.canMoveBox"
                      :original="option.original"
                      :autoCrop="option.autoCrop"
                      :fixed="option.fixed"
                      :fixedNumber="option.fixedNumber"
                      :centerBox="option.centerBox"
                      :infoTrue="option.infoTrue"
                      :fixedBox="option.fixedBox"
                      @realTime="realTime"></vueCropper>
          <!-- <div class="show-preview"
               :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden',    'margin': '5px'}">
            <div :style="previews.div">
              <img :src="option.img"
                   :style="previews.img">
            </div>
          </div> -->
          <!--  <p>中等大小</p>
          <div :style="previewStyle1">
            <div :style="previews.div">
              <img :src="previews.url"
                   :style="previews.img">
            </div>
          </div>

          <p>迷你大小</p>
          <div :style="previewStyle2">
            <div :style="previews.div">
              <img :src="previews.url"
                   :style="previews.img">
            </div>
          </div> -->
        </div>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="finish"
                   :loading="loading">确认</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>

      </div>
    </el-dialog>
  </div>

</template>
<script>
import OSS from 'ali-oss'
export default {
  data () {
    return {
      dialogVisible: false,
      // 裁剪组件的基础配置option
      option: {
        img: '', // 裁剪图片的地址 默认空 可选值：url 地址 || base64 || blob
        outputSize: 1, // 裁剪生成图片的质量 默认1  可选值：0.1 - 1
        outputType: 'png', // 裁剪生成图片的格式 默认jpg (jpg 需要传入jpeg) 可选值：jpeg || png || webp
        info: true, // 裁剪框的大小信息 默认true
        canScale: true, // 图片是否允许滚轮缩放 默认true
        autoCrop: true, // 是否默认生成截图框 默认false
        autoCropWidth: 100, // 默认生成截图框宽度 默认容器的80%
        autoCropHeight: 100, // 默认生成截图框高度 默认容器的80%
        fixed: false, // 是否开启截图框宽高固定比例 默认true
        // fixedNumber: [7, 5], // 截图框的宽高比例 默认[1, 1] 可选值：[宽度, 高度]
        full: true, // 是否输出原图比例的截图 默认false
        fixedBox: false, // 固定截图框大小 不允许改变 默认false
        canMoveBox: true, // 截图框能否拖动 默认true
        original: true, // 上传图片按照原始比例渲染 默认false
        centerBox: true, // 截图框是否被限制在图片里面 默认false
        high: true, // 是否按照设备的dpr 输出等比例图片 默认true
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高 默认false
        maxImgSize: 2000, // 限制图片最大宽度和高度 默认2000
        enlarge: 1, // 	图片根据截图框输出比例倍数 默认1 可选值：0-max(建议不要太大不然会卡死)
        mode: 'contain', // 图片默认渲染方式 默认contain 可选值：contain , cover, 100px, 100% auto
      },
      previews: {},
      picsList: [], // 页面显示的数组
      // 防止重复提交
      loading: false
    }
  },
  methods: {
    // 上传按钮
    changeUpload (file, fileList) {
      let _this = this;
      console.log(file, fileList)
      // 限制图片大小
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过 5MB!')
        return false
      }

      // this.fileinfo = file
      let reader = new FileReader()
      // 以ArrayBuffer读取文件
      reader.readAsArrayBuffer(file.raw)

      reader.onload = function (e) {
        let blob = new Blob([e.target.result])
        let imgUrl = window.URL.createObjectURL(blob);
        _this.option.img = imgUrl
        _this.dialogVisible = true
      }
      console.log(_this.$refs.cropper)
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish () {
      let _this = this;
      _this.$refs.cropper.getCropBlob((data) => {
        const client = new OSS({
          region: 'oss-cn-beijing',
          accessKeyId: 'LTAIA5SVWAVmBMVs',
          accessKeySecret: 'lx5zFTli3u7RbWsA6LhA3YDuPlw8GE',
          bucket: 'iiicici'
        })
        // 文件名字加后缀
        const objectKey = `${new Date().getTime()}.${_this.option.outputType}`
        _this.put(client, objectKey, data)
        alert('上传成功');
        _this.dialogVisible = false
      })
    },
    async put (client, fileName, file) {
      try {
        let result = await client.put(fileName, file)
        console.log(result)
      } catch (e) {
        console.log(e)
      }
    },
    realTime (data) {
      var previews = data;
      var h = 0.5;
      var w = 0.2;

      /* this.previewStyle1 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: h
      };

      this.previewStyle2 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: w
      };

      // 固定为100宽度
      this.previewStyle3 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: 100 / preview.w
      };

      // 固定为100高度
      this.previewStyle4 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: 100 / preview.h
      }; */
      this.previews = data;
    },
  },
  mounted () {
    console.log(this.$refs.cropper)
  }
}
</script>
<style scoped>
/* 截图 */
.cropper {
  width: auto;
  height: 300px;
}
</style>
