import fetch from '@/api/fetch.js'
import qs from 'qs'

// 获取 banner 图片
export function getBannerPic (data) {
  return fetch({
    url: `/kukacms/api/getBannerById.htm?id=1`,
    method: 'get',
  })
}

// 新增 banner 图片
export function addBannerPic (url) {
  return fetch({
    url: `/kukacms/api/addBanner.htm?url=${url}`,
    method: 'get',
  })
}

// 更新 banner 图片
export function updataBannerPic (url) {
  return fetch({
    url: `/kukacms/api/updateBannerById.htm?url=${url}&id=1`,
    method: 'get',
  })
}

// 新增服务内容
export function addContent (data,type) {
  return fetch({
    url: `/kukacms/api/addContent.htm?content=${data}&type=${type}`,
    method: 'get',
  })
}

// 修改服务内容
export function updataContent (data, id, type) {
  return fetch({
    url: `/kukacms/api/updateContent.htm?content=${data}&id=${id}&type=${type}`,
    method: 'get',
  })
}

// 删除服务内容
export function deleteContent (id) {
  return fetch({
    url: `/kukacms/api/deleteContent.htm?id=${id}`,
    method: 'get',
  })
}

// 查找服务内容
export function getContentList (id) {
  return fetch({
    url: `/kukacms/api/getContentList.htm`,
    method: 'get',
  })
}

// 获取服务评价列表
export function getEvaluateList (curPage) {
  return fetch({
    // url: `/kukacms/api/getEvaluateLogByPage.htm?mobile=${mobile}&member=${member}&curPage=${curPage}`,
    url: `/kukacms/api/getEvaluateLogByPage.htm?curPage=${curPage}`,
    method: 'get',
  })
}

// 按手机获取服务列表
export function getEvaluateListByMobile (mobile, curPage) {
  return fetch({
    url: `/kukacms/api/getEvaluateLogByPage.htm?mobile=${mobile}&curPage=${curPage}`,
    method: 'get',
  })
}

// 按工号获取服务列表
export function getEvaluateListByMember (member, curPage) {
  return fetch({
    url: `/kukacms/api/getEvaluateLogByPage.htm?member=${member}&curPage=${curPage}`,
    method: 'get',
  })
}

// 删除服务评价
export function deleteEvaluate (id) {
  return fetch({
    url: `/kukacms/api/deleteEvaluateLog.htm?id=${id}`,
    method: 'get',
  })
}

// 查询二维码列表
export function getQrCodeList (curPage) {
  return fetch({
    url: `/kukacms/api/getQrCodeByPage.htm?curPage=${curPage}`,
    method: 'get',
  })
}

// 新增二维码
export function addQrCode (id, name, avatar) {
  return fetch({
    url: `/kukacms/api/addQrCode.htm?member=${id}&name=${name}&avatar=${avatar}`,
    method: 'get',
  })
}

// 删除二维码
export function deleteQrCode (id) {
  return fetch({
    url: `/kukacms/api/deleteQrCode.htm?id=${id}`,
    method: 'get',
  })
}

// 搜索二维码
export function searchCode (id) {
  return fetch({
    url: `/kukacms/api/getQrCodeByPage.htm?member=${id}`,
    method: 'get',
  })
}