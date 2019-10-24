import fetch from './fetch.js'
import qs from 'qs'

export function addType (data) {
  return fetch({
    url: `/kukacms/addType.htm`,
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getMagazinePage () {
  return fetch({
    url: '/kukacms/visitor/getMagazinePage.htm',
    method: 'get'
  })
}

export function addMagazine (data) {
  return fetch({
    url: `/kukacms/addMagazine.htm`,
    method: 'post',
    data: qs.stringify(data)
  })
}