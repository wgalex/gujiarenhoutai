import fetch from './fetch.js'
import qs from 'qs'

export function getCommentList (id) {
  return fetch({
    url: `/kukacms/getCommentListById.htm?id=${id}`,
    method: 'get'
  })
}

// flag 1 待审核 2 审核通过 0 审核不通过
export function auditComment (id, flag) {
  return fetch({
    url: `/kukacms/auditComment.htm?id=${id}&flag=${flag}`,
    method: 'get'
  })
}

// 评论置顶 置顶 1 取消 0
export function setTop (id, flag) {
  return fetch({
    url: `/kukacms/setTopComment.htm?id=${id}&flag=${flag}`,
    method: 'get'
  })
}

// 回复评论
export function addCommentReply (id, content, userId, auTitle, documentId) {
  let data = {
    commmentId: id,
    content: content,
    userId: userId,
    auTitle: auTitle,
    documentId: documentId
  }
  return fetch({
    url: `/kukacms/addCommentReply.htm`,
    method: 'post',
    data: qs.stringify(data)
  })
}

// ?commmentId=${id}&content=${content}&userId=${userId}&auTitle=${auTitle}&documentId=${documentId}

// 删除回复
export function deleteCommentReply (id) {
  return fetch({
    url: `/kukacms/deleteCommentReply.htm?id=${id}`,
    method: 'get'
  })
}