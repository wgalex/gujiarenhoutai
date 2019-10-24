import fetch from '@/api/fetch.js'
import qs from 'qs'

//修改 email 
export function editemailComppic (email,mobile,id) {
  return fetch({
    url: `/kukacms/api/email/update.htm?email=${email}&mobile=${mobile}&id=${id}`,
    method: 'get',
  })
}

//新增 email 
export function addemailComppic (email,mobile) {
  return fetch({
    url: `/kukacms/api/email/add.htm?email=${email}&mobile=${mobile}`,
    method: 'get',
  })
}

// 获取 email 
export function getemailComppic (id) {
  return fetch({
    url: `/kukacms/api/email/getEmailById.htm?id=${id}`,
    method: 'get',
  })
}
// 删除上一层首页
// export function delIndexComppic (id) {
//   return fetch({
//     url: `/kukacms/api/complanit/deleteBannerById.htm?id=${id}`,
//     method: 'get',
//   })
// }