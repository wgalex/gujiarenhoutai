import fetch from './fetch.js'
import qs from 'qs'

export function addNews (news) {
  return fetch({
    url: '/kukacms/addDocument.htm',
    method: 'post',
    data: qs.stringify(news)
  })
}

// 获取期刊文章信息
export function getDocument (id) {
  return fetch({
    url: `/kukacms/getDocumentById.htm?id=${id}`,
    method: 'get'
  })
}
