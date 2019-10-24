import fetch from './fetch.js'

export function getMagazinePage () {
  return fetch({
    url: '/kukacms/visitor/getMagazinePage.htm',
    method: 'get'
  })
}

export function getDocumentList (magazine) {
  return fetch({
    url: `/kukacms/getDocumentList.htm?magazine=${magazine}`,
    method: 'get'
  })
}

export function getDocumentAllList () {
  return fetch({
    url: `/kukacms/getDocumentList.htm`,
    method: 'get'
  })
}

export function searchDocument (magazine, typeId) {
  return fetch({
    url: `/kukacms/getDocumentList.htm?magazine=${magazine}&typeId=${typeId}`,
    method: 'get'
  })
}

export function getTypeList (magazine) {
  return fetch({
    url: `/kukacms/getTypeList.htm?magazine=${magazine}`,
    method: 'get'
  })
}

export function getTypeAuditList (data) {
  return fetch({
    url: `/kukacms/getTypeAuditList.htm?magazine=${data}`,
    method: 'get'
  })
}

// 删除
export function deleteDocument (data) {
  return fetch({
    url: `/kukacms/deleteDocument.htm?id=${data}`,
    method: 'get'
  })
}

// 设置轮播图
export function updateCarouse (data, flag) {
  return fetch({
    url: `/kukacms/updateCarouselById.htm?id=${data}&flag=${flag}`,
    method: 'get'
  })
}

// 查找状态
export function getState (magazine, typeId, position) {
  return fetch({
    url: `/kukacms/getDocumentList.htm?magazine=${magazine}&typeId=${typeId}&position=${position}`,
    method: 'get'
  })
}

// 推送 1 单篇 2 整期
export function workNotice (text, type) {
  return fetch({
    url: `/kukacms/workNotice.htm?title=${text}&type=${type}`,
    method: 'get'
  })
}

// 关键字搜索文章
export function searchDoc (text) {
  return fetch({
    url: `/kukacms/getDocumentList.htm?keywords=${text}`,
    method: 'get'
  })

}

//投诉消息推送
export function pushMessage (text) {
  return fetch({
    url: `/kukacms/api/workNotice.htm?title=${text}`,
    method: 'get'
  })
  
}