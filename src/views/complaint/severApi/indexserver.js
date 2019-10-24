import fetch from '@/api/fetch.js'
import qs from 'qs'

//修改 banner 图片
export function editIndexComppic (url,remark,id) {
  return fetch({
    url: `/kukacms/api/complanit/updateIndexPic.htm?url=${url}&remark=${remark}&id=${id}`,
    method: 'get',
  })
}

//新增 banner 图片
export function addIndexComppic (url,remark) {
  return fetch({
    url: `/kukacms/api/complanit/addIndexPic.htm?url=${url}&remark=${remark}`,
    method: 'get',
  })
}

// 获取 banner 图片
export function getIndexComppic (id) {
  return fetch({
    url: `/kukacms/api/complanit/getBannerById.htm?id=${id}`,
    method: 'get',
  })
}
// 删除上一层首页
export function delIndexComppic (id) {
  return fetch({
    url: `/kukacms/api/complanit/deleteBannerById.htm?id=${id}`,
    method: 'get',
  })
}
// 修改密码
export function modifyPassword (id,password) {
  return fetch({
    url: `/kukacms/update/password.htm?id=${id}&password=${password}`,
    method: 'get',
  })
}