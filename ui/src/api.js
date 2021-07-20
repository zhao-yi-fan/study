import request from './utils/request'
const apiUrl = {
  Login: 'http://localhost:8888/login', // 登录  post

}

/** 接口调用 **/
export default {

  /* Login (option, success, error) {
    request.get(apiUrl.Login, option).then(res => {
      return success && success(res)
    }).catch(err => {
      return error && error(err)
    })
  }, */

  Login (option, success, error) {
    request.post(apiUrl.Login, option).then(res => {
      return success && success(res)
    }).catch(err => {
      return error && error(err)
    })
  },
  fileDel (option, success, error) {
    request.delete(apiUrl.filePublic + option).then(res => {
      return success && success(res)
    }).catch(err => {
      return error && error(err)
    })
  },
}