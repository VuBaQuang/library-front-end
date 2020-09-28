import axios from 'axios'
import router, { resetRouter } from '@/router'
import { Notification } from 'element-ui'
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
    const res = response.data
    if (res.message) {
      if (res.message === 'SUCCESS') {
        return res
      } else {
        Notification({
          message: res.message || 'Gặp lỗi',
          type: 'error',
          duration: 2 * 1000,
          position: 'bottom-right'
        })
        return Promise.reject(new Error(res.message || 'Error'))
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
