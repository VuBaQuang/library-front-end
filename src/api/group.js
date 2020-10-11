import request from '@/utils/request'

export function getAll(data) {
  return request({
    url: '/groups/get-all',
    method: 'post',
    data
  })
}
// export function logout() {
//   return request({
//     url: '/vue-element-admin/user/logout',
//     method: 'post'
//   })
// }
