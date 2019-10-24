import fetch from '@/api/fetch.js'
import qs from 'qs'

// 获取期刊列表
export function getMagazinePage () {
  return fetch({
    url: '/kukacms/visitor/getMagazinePage.htm',
    method: 'get'
  })
}

// 获取期刊栏目
export function getTypeAuditList (data) {
  return fetch({
    url: `/kukacms/getTypeAuditList.htm?magazine=${data}`,
    method: 'get'
  })
}

// 保存
export function addNews (news) {
  return fetch({
    url: '/kukacms/addDocument.htm',
    method: 'post',
    data: qs.stringify(news)
  })
}

// 更新
export function updataNews (news) {
  return fetch({
    url: '/kukacms/updateDocument.htm',
    method: 'post',
    data: qs.stringify(news)
  })
}

// 提交编辑内容
export function updataMobile (news) {
  return fetch({
    url: '/kukacms/visitor/picFilter.htm',
    method: 'post',
    data: qs.stringify(news)
  })
}