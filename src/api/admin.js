import fetch from './fetch.js'
import qs from 'qs'

export function getUserList () {
  return fetch({
    url: `/kukacms/getUserList.htm`,
    method: 'get'
  })
}

export function addUser (data) {
  return fetch({
    url: `/kukacms/addUser.htm`,
    method: 'post',
    data: qs.stringify(data)
  })
}

export function deleteUser (id) {
  return fetch({
    url: `/kukacms/deleteUser.htm?id=${id}`,
    method: 'get',
  })
}

export function getNav () {
  return fetch({
    url: `/kukacms/visitor/navigationList.htm`,
    method: 'get'
  })
}

export function updataNav (data) {
  return fetch({
    url: `/kukacms/updateNavigation.htm`,
    method: 'post',
    data: qs.stringify(data)
  })
}