import fetch from './fetch.js'

export function getMagazinePage () {
  return fetch({
    url: '/kukacms/visitor/getMagazinePage.htm',
    method: 'get'
  })
}

export function getDustbinList () {
  return fetch({
    url: `/kukacms/getDocumentList.htm?position=4`,
    method: 'get'
  })
}

export function searchDustbinList (magazine) {
  return fetch({
    url: `/kukacms/getDocumentList.htm?magazine=${magazine}&position=4`,
    method: 'get'
  })
}

export function searchDustbinDocument (magazine, typeId) {
  return fetch({
    url: `/kukacms/getDocumentList.htm?magazine=${magazine}&position=4&typeId=${typeId}`,
    method: 'get'
  })
}

export function getTypeList (magazine) {
  return fetch({
    url: `/kukacms/getTypeList.htm?magazine=${magazine}`,
    method: 'get'
  })
}

export function restore (id) {
  return fetch({
    url: `/kukacms//updateDocumentPosition.htm?id=${id}&position=0`,
    method: 'get'
  })
}

export function deleteDoc (id) {
  return fetch({
    url: `/kukacms/deleteDocument.htm?id=${id}`,
    method: 'get'
  })
}