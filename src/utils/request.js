import axios from 'axios'
import router, { resetRouter } from '@/router'
import { Message } from 'element-ui'
import { getToken, removeToken, getAuth } from '@/utils/auth'
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
    // debugger
    let token = getToken()
    let auth = getAuth()
    if (!token) token = ''
    if (!auth) auth = ''
    // config.headers['Auth-User-Name'] = getCookieAccountName() || ''
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
    const res = response
    if (res.data.status) {
      if (res.data.status === 'SUCCESS') {
        Message({
          message: res.data.message,
          type: 'success'
        })
        return res
      }
      if (res.data.status === 'ERROR') {
        Message({
          message: res.data.message || 'Gặp lỗi',
          type: 'error'
        })
        return Promise.reject(new Error('Error'))
      }
      return res
    } else {
      return res
    }
  },
  error => {
    if (error.response.status === 401) {
      if (getToken()) {
        Message.error('Lỗi xác thực')
        store.dispatch('user/logout', {}).then(data => {
          store.commit('user/RESET_STATE')
          removeToken()
          resetRouter()
          router.push('/login')
        }).catch(e => {
          console.log(e)
        })
      } else {
        Message.error('Có lỗi')
        store.commit('user/RESET_STATE')
        // removeToken()
        resetRouter()
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)
export default service
