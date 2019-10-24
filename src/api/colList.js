import fetch from './fetch.js'
import qs from 'qs'

export function getTypeAuditList (data) {
  return fetch({
    url: `/kukacms/getTypeAuditList.htm?magazine=${data}`,
    method: 'get'
  })
}

export function updateType (data) {
  return fetch({
    url: '/kukacms/updateType.htm',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 删除
export function deleteType (id) {
  return fetch({
    url: `/kukacms/deleteType.htm?id=${id}`,
    method: 'get'
  })
}