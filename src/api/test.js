// 测试提交

import fetch from './fetch.js'

export function test () {
  return fetch({
    url: `/kukacms/generalPass.htm`,
    method: 'get'
  })
}
