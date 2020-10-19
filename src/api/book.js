import request from '@/utils/request'

export function getAll(data) {
  return request({
    url: '/books/get-all',
    method: 'post',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: '/books',
    method: 'post',
    data
  })
}
export function deletes(data) {
  return request({
    url: 'books/deletes',
    method: 'post',
    data

  })
}
