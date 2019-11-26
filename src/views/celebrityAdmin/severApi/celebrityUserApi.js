import fetch from '@/api/fetch.js'
import qs from 'qs'

//查询用户列表
export function selectList (query) {
  return fetch({
    url: `/kukacms/selectList.htm`,
    method: 'post',
    data: qs.stringify(query)
  })
}
export function addUser (data) {
  return fetch({
    url: `/kukacms/addUser.htm`,
    method: 'post',
    data: qs.stringify(data)
  })
}
export function updateUser (data) {
  return fetch({
    url: `/kukacms/visitor/update/user.htm`,
    method: 'post',
    data: qs.stringify(data)
  })
}

export function deleteUser (id) {
  return fetch({
    url: `/kukacms/deleteUser.htm?id=${id}`,
    method: 'get',
  })
}


