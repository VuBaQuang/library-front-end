import request from '@/utils/request'

export function findAll(data) {
  return request({
    url: '/features/get-all',
    method: 'post',
    data
  })
}

export function find(data) {
  return request({
    url: '/features/find',
    method: 'post',
    data
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/features',
    method: 'post',
    data
  })
}

export function deletes(data) {
  return request({
    url: '/features/deletes',
    method: 'post',
    data
  })
}
