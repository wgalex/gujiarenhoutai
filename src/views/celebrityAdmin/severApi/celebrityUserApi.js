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

