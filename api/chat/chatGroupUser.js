import request from '@/utils/request'

// 查询群成员列表
export function listChatGroupUser(query) {
  return request({
    url: '/chat/chatGroupUser/list',
    method: 'get',
    params: query
  })
}

// 查询群成员详细
export function getChatGroupUser(id) {
  return request({
    url: '/chat/chatGroupUser/' + id,
    method: 'get'
  })
}

// 新增群成员
export function addChatGroupUser(data) {
  return request({
    url: '/chat/chatGroupUser',
    method: 'post',
    data: data
  })
}

// 修改群成员
export function updateChatGroupUser(data) {
  return request({
    url: '/chat/chatGroupUser',
    method: 'put',
    data: data
  })
}

// 删除群成员
export function delChatGroupUser(id) {
  return request({
    url: '/chat/chatGroupUser/' + id,
    method: 'delete'
  })
}