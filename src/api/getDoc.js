import fetch from './fetch.js'

export function getDocument (id) {
  return fetch({
    url: `/kukacms/visitor/getDocumentById.htm?id=${id}`,
    method: 'get'
  })
}
