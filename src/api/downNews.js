import fetch from './fetch.js'

export function getMagazinePage () {
  return fetch({
    url: '/kukacms/visitor/getMagazinePage.htm',
    method: 'get'
  })
}

export function getDownDocumentList () {
  return fetch({
    url: `/kukacms/getDocumentList.htm?position=3`,
    method: 'get'
  })
}

export function searchDownDocumentList (magazine) {
  return fetch({
    url: `/kukacms/getDocumentList.htm?magazine=${magazine}&position=3`,
    method: 'get'
  })
}

export function searchDownDocument (magazine, typeId) {
  return fetch({
    url: `/kukacms/getDocumentList.htm?magazine=${magazine}&position=3&typeId=${typeId}`,
    method: 'get'
  })
}

export function getTypeList (magazine) {
  return fetch({
    url: `/kukacms/getTypeList.htm?magazine=${magazine}`,
    method: 'get'
  })
}

export function submitDocument (id) {
  return fetch({
    url: `/kukacms/submitDocument.htm?id=${id}`,
    methid: 'get'
  })
}

export function deleteDocument (id) {
  return fetch({
    url: `/kukacms//updateDocumentPosition.htm?id=${id}&position=4`,
    methid: 'get'
  })
}