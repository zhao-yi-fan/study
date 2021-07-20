import co from 'co'
import OSS from 'ali-oss'

const OSSConfig = {
  uploadHost: '', // OSS上传地址
  type: 'scs',
  ossParams: {
    key: '', // key后面有用，先默认设空字符串
    region: 'oss-cn-beijing',
    success_action_status: '200', // 默认200
    accessKeyId: 'LTAIbsGio1aJI2Rp',
    accessKeySecret: '2prV8Ul9xtwzSu4yaJrGkO8zDBzoTg',
    bucket: 'iiicici',
    dir: 'user-dir',
    host: 'http://jinanluke.oss-cn-beijing.aliyuncs.com'
  }
}

function randomString (len) {
  len = len || 32
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = chars.length
  var pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

function uploadOSS (event, type) {
  return new Promise((resolve, reject) => {
    var client = new OSS({
      region: OSSConfig.ossParams.region,
      accessKeyId: OSSConfig.ossParams.accessKeyId,
      accessKeySecret: OSSConfig.ossParams.accessKeySecret,
      bucket: OSSConfig.ossParams.bucket
    })
    var file
    if (type === 0) {
      file = event
    } else {
      file = event.target.files[0]
    }
    let randomName = `${randomString(6)}_${file.name}`
    co(function* () {
      var result = yield client.multipartUpload(randomName, file)
      console.log(`${OSSConfig.uploadHost}/${result.name}`)
      resolve(`${OSSConfig.uploadHost}/${result.name}`)
    }).catch(function (err) {
      console.log(err)
      reject(err)
    })
  })
}

export { uploadOSS }
