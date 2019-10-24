import fetch from '@/api/fetch.js'
// import qs from 'qs'

export function getDoc () {
  return fetch({
    url: '/kukacms/visitor/getDocumentById.htm?id=136',
    methods: 'get'
  })
}

// 无用测试
export function test () {
  return fetch({
    url: '/kukacms/visitor/getDocumentById.htm?id=136',
    methods: 'get'
  })
}