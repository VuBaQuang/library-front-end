import axios from 'axios'
import router, { resetRouter } from '@/router'
import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'
import store from '@/store'

// create an axios instance
const service = axios.create({
  // send cookies when cross-domain requests
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false,
  // request timeout,
  timeout: 60000,
  // max size of the http response content in bytes ( 50mb )
  maxContentLength: process.env.VUE_APP_MAX_CONTENT_LENGTH,
  maxBodyLength: process.env.VUE_APP_MAX_BODY_LENGTH
})

// request interceptor
service.interceptors.request.use(
  config => {
    let token = getToken()
    if (!token) token = ''
    config.headers['Authorization'] = 'Basic ' + token
    config.headers['Access-Control-Allow-Origin'] = process.env.VUE_APP_CORS_URL
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    console.log('result - api: ', response)
    const res = response
    if (res.data.status) {
      if (res.data.status === 'SUCCESS') {
        Message({
          message: res.data.message,
          type: 'success'
        })
        return res
      } else {
        Message({
          message: res.data.message || 'Gặp lỗi',
          type: 'error'
        })
        return Promise.reject(new Error(res.data.message || 'Error'))
      }
    } else {
      return res
    }
  },
  error => {
    if (error.response.status === 401) {
      // removeAllToken()
      // store.state.user.token = ''
      // router.push('/login')
      removeToken() // must remove  token  first
      resetRouter()
      store.commit('user/RESET_STATE')
      router.push('/login')
      // Notification({
      //   message: this.$t('login.sessionHasExpired'),
      //   type: 'error',
      //   duration: 2 * 1000,
      //   position: 'bottom-right'
      // })
    }
    // console.log('response with error: ', error)
    Notification({
      message: this.$t('login.sessionHasExpired') || 'Gặp lỗi',
      type: 'error',
      duration: 2 * 1000,
      position: 'bottom-right'
    })
    return Promise.reject(error)
  }
)
export default service
