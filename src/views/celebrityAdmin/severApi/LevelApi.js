import fetch from '@/api/fetch.js'
import qs from 'qs'

//根据id获取
export function select () {
  return fetch({
    url: `/kukacms/visitor/level/select.htm`,
    method: 'get',
  })
}
//新增层级
export function addLevel (add) {
  return fetch({
    url: `/kukacms/visitor/level/add.htm`,
    method: 'post',
    data: qs.stringify(add)
  })
}
// 新增 banner 图片
// export function addIndexComppic (url,remark) {
//   return fetch({
//     url: `/kukacms/api/complanit/addIndexPic.htm?url=${url}&remark=${remark}`,
//     method: 'get',
//   })
// }

// // 分页获取列表投诉
// export function getcasebytitle (curPage,sizePage,status) {
//   return fetch({
//     url: `/kukacms/api/complaint/news/page.htm?curPage=${curPage}&sizePage=${sizePage}&status=${status}`,
//     method: 'get',
//   })
// }
// // 删除根据id
// export function delcase (id) {
//   return fetch({
//     url: `/kukacms/api/complaint/news/delete.htm?id=${id}`,
//     method: 'get',
//   })
// }
// // 编辑
// export function editcase (editSubmit) {
//   return fetch({
//     url: `/kukacms/api/complaint/news/update.htm`,
//     method: 'post',
//     data: qs.stringify(editSubmit)
//   })
// }
// //新增
// export function addcase (addSubmit) {
//   return fetch({
//     url: `/kukacms/api/complaint/news/add.htm`,
//     method: 'post',
//     data: qs.stringify(addSubmit)
//   })
// }