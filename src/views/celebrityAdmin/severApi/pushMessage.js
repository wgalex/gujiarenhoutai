import fetch from '@/api/fetch.js'
import qs from 'qs'

export function push (title) {
    return fetch({
      url: `/kukacms/visitor/workNotice.htm?title=${title}&type=1`,
      method: 'get',
    })
  }

  export function getdepart () {
    return fetch({
      url: `/kukacms/visitor/departmentIds.htm`,
      method: 'get',
    })
  }
  export function pushdepart (title,departmentId) {
    return fetch({
      url: `/kukacms/visitor/workNoticeDepartmentId.htm?title=${title}&departmentId=${departmentId}&type=1`,
      method: 'get',
    })
  }
