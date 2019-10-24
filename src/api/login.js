import fetch from './fetch.js'

export function login (data) {
  return fetch({
    url: `/kukacms/doLogin.htm?account=${data.account}&password=${data.password}`,
    method: 'get'
  })
}

export function logout () {
  return fetch({
    url: '/kukacms/doLogout.htm',
    method: 'get'
  })
}