import request from '@/utils/request'

export function findAll(data) {
  return request({
    url: '/permissions/get-all',
    method: 'post',
    data
  })
}

export function find(data) {
  return request({
    url: '/permissions/find',
    method: 'post',
    data
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/permissions',
    method: 'post',
    data
  })
}

export function deletes(data) {
  return request({
    url: '/permissions/deletes',
    method: 'post',
    data
  })
}
