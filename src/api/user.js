import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'POST',
    data
  })
}
export function register(data) {
  return request({
    url: '/auth/register',
    method: 'POST',
    data
  })
}
export function changePassword(data) {
  return request({
    url: '/auth/change-password',
    method: 'POST',
    data
  })
}
export function getInfo() {
  return request({
    url: '/auth/info',
    method: 'POST'
  })
}
export function logout(data) {
  return request({
    url: '/auth/logout',
    method: 'POST',
    data
  })
}
// export function logout() {
//   return request({
//     url: '/vue-element-admin/user/logout',
//     method: 'post'
//   })
// }
