import request from '@/utils/request'

export function getAll(data) {
  return request({
    url: '/groups/get-all',
    method: 'post',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: '/groups',
    method: 'post',
    data
  })
}
export function deletes(data) {
  return request({
    url: 'groups/deletes',
    method: 'post',
    data

  })
}
