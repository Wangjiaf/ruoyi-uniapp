import request from '@/utils/request'

// 查询群组主数据列表
export function listChatGroup(query) {
  return request({
    url: '/chat/chatGroup/list',
    method: 'get',
    params: query
  })
}

// 查询群组主数据详细
export function getChatGroup(id) {
  return request({
    url: '/chat/chatGroup/' + id,
    method: 'get'
  })
}

// 新增群组主数据
export function addChatGroup(data) {
  return request({
    url: '/chat/chatGroup',
    method: 'post',
    data: data
  })
}

// 修改群组主数据
export function updateChatGroup(data) {
  return request({
    url: '/chat/chatGroup',
    method: 'put',
    data: data
  })
}

// 删除群组主数据
export function delChatGroup(id) {
  return request({
    url: '/chat/chatGroup/' + id,
    method: 'delete'
  })
}

// 创建新群组
export function addGroup(data) {
  return request({
    url: '/chat/chatGroup/addGroup',
    method: 'post',
    data: data
  })
}