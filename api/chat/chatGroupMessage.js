import request from '@/utils/request'

// 查询群消息列表
export function listChatGroupMessage(query) {
  return request({
    url: '/chat/chatGroupMessage/list',
    method: 'get',
    params: query
  })
}

// 查询群消息详细
export function getChatGroupMessage(id) {
  return request({
    url: '/chat/chatGroupMessage/' + id,
    method: 'get'
  })
}

// 新增群消息
export function addChatGroupMessage(data) {
  return request({
    url: '/chat/chatGroupMessage',
    method: 'post',
    data: data
  })
}

// 修改群消息
export function updateChatGroupMessage(data) {
  return request({
    url: '/chat/chatGroupMessage',
    method: 'put',
    data: data
  })
}

// 删除群消息
export function delChatGroupMessage(id) {
  return request({
    url: '/chat/chatGroupMessage/' + id,
    method: 'delete'
  })
}

// 查询群消息视图列表
export function listChatGroupMessageVo(query) {
  return request({
    url: '/chat/chatGroupMessage/listVo',
    method: 'get',
    params: query
  })
}

// 发送群消息
export function sendChatGroupMessage(data) {
  return request({
    url: '/chat/chatGroupMessage/sendChatGroupMessage',
    method: 'post',
    data: data
  })
}