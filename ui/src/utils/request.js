import axios from 'axios';
import qs from 'qs'


/** 全局配置 **/
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// axios.default.baseURL = 'http://localhost:8888';

/** 请求拦截器 **/
/* axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.token ? window.localStorage.token : '' // 设置请求头Authorization
  // config.headers.Accept = 'application/json'    //设置请求头Accept
  return config
}, (error) => {
  return Promise.reject(error)
}) */

/** 响应拦截器 **/
axios.interceptors.response.use((res) => {
  if (res.data.respCode === '1029') {
    window.localStorage.removeItem('token')
    router.replace({ name: 'login' })
  }
  return res
}, (error) => {
  switch (error.response.status) {
    case 404:
      // 404处理
      console.log(this)
      this.$message.error(error.message)
      break
    case 500:
      // 500处理
      break
    default:
      break
  }
  this.$message.error(`接口调用失败:${error.response.statusText}\n状态码:${error.response.status}`)
  return Promise.reject(error.response.response)
})

/** 请求封装 **/
export default {
  get (url, options) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        params: options,
        paramsSerializer: params => {
          return qs.stringify(params, { indices: false })
        }
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  post (url, options) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        data: options
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  delete (url, options) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: url,
        data: options
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  put (url, options) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: url,
        data: options
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
