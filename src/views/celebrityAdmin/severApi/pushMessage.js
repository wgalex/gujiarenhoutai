import fetch from '@/api/fetch.js'
import qs from 'qs'

export function push (title) {
    return fetch({
      url: `/kukacms/visitor/workNotice.htm?title=${title}&type=1`,
      method: 'get',
    })
  }