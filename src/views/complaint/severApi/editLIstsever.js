import fetch from '@/api/fetch.js'
import qs from 'qs'

//根据id获取
export function getlistbyId (id) {
  return fetch({
    url: `/kukacms/api/complaint/detail/getById.htm?id=${id}`,
    method: 'get',
  })
}

// 新增 banner 图片
// export function addIndexComppic (url,remark) {
//   return fetch({
//     url: `/kukacms/api/complanit/addIndexPic.htm?url=${url}&remark=${remark}`,
//     method: 'get',
//   })
// }

// 分页获取列表投诉
export function getlistbytitle (curPage,sizePage,title) {
  return fetch({
    url: `/kukacms/api/complaint/detail/page.htm?curPage=${curPage}&sizePage=${sizePage}&title=${title}`,
    method: 'get',
  })
}
// 删除根据id
export function dellist (id) {
  return fetch({
    url: `/kukacms/api/complaint/detail/delete.htm?id=${id}`,
    method: 'get',
  })
}