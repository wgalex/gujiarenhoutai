import Cookies from 'js-cookie'

const user = 'user'

export function getToken() {
  return Cookies.get(user)
}

export function setToken(token) {
  return Cookies.set(user, token)
}

export function removeToken() {
  return Cookies.remove(user)
}