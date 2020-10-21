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
export function checkExist(data) {
  return request({
    url: '/auth/check-exist',
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
export function confirmTokenViaEmail(data) {
  return request({
    url: '/auth/confirm-token-via-email',
    method: 'POST',
    data
  })
}
export function createNewPassword(data) {
  return request({
    url: '/auth/create-new-password',
    method: 'POST',
    data
  })
}
export function confirmUserEmail(data) {
  return request({
    url: '/auth/confirm-user-email',
    method: 'POST',
    data
  })
}
export function sendEmailAgain(data) {
  return request({
    url: '/auth/send-email-again',
    method: 'POST',
    data
  })
}
export function getAll(data) {
  return request({
    url: '/users/get-all',
    method: 'post',
    data
  })
}
export function borrowBook(data) {
  return request({
    url: '/users/borrow-book',
    method: 'post',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}
export function deletes(data) {
  return request({
    url: '/users/deletes',
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
