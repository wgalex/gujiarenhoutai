import fetch from './fetch.js'

export function downNews (id) {
  return fetch({
    url: `/kukacms/updateDocumentPosition.htm?id=${id}&position=3`,
    method: 'get',
  })
}
