import fetch from '@/api/fetch.js'
import qs from 'qs'

//根据部门获取列表
export function queryCategory (department) {
  return fetch({
    url: `/kukacms/visitor/category/selectid.htm`,
    method: 'post',
    data: qs.stringify(department)
  })
}
//新增层级
export function addCategory (add) {
  return fetch({
    url: `/kukacms/visitor/category/add.htm`,
    method: 'post',
    data: qs.stringify(add)
  })
}
//根据id修改
export function editCategory (edit) {
  return fetch({
    url: `/kukacms/visitor/category/update.htm`,
    method: 'post',
    data: qs.stringify(edit)
  })
}
//树装类别格式
export function selectmerge (id) {
  return fetch({
    url: `/kukacms/visitor/category/selectmerge.htm`,
    method: 'post',
    data: qs.stringify(id)
  })
}
