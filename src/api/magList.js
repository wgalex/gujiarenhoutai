import fetch from './fetch.js'
import qs from 'qs'

export function updateMag (data) {
  return fetch({
    url: '/kukacms/updateMagazine.htm',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 删除
export function deleteMag (id) {
  return fetch({
    url: `/kukacms/deleteMagazine.htm?id=${id}`,
    method: 'get'
  })
}

// 设置整篇上线
export function upMagazine (id, name) {
  return fetch({
    url: `/kukacms/manyPass.htm?id=${id}&name=${name}`,
    method: 'get'
  })
}

export function getMagazinePage (page) {
  return fetch({
    url: `/kukacms/getMagazinePage.htm?curPage=${page}`,
    method: 'get'
  })
}

// 

export function oneDoc (id) {
  return fetch({
    url: `/kukacms/onePass.htm?id=${id}`,
    method: 'get'
  })
}

// 搜索
export function search (text) {
  return fetch({
    url: `/kukacms/getMagazinePage.htm?keyWord=${text}`,
    method: 'get'
  })
}

// 导出
export function out (mag) {
  return fetch({
    url: `/kukacms/visitor/exportExcel.htm?magazine=${mag}`,
    method: 'get'
  })
}

// 增加浏览量
export function addView (id, num) {
  return fetch({
    url: `/kukacms/updatePageViewNum.htm?id=${id}&viewNum=${num}`,
    method: 'get'
  })
}