import request from '@/utils/request'

// 查询好友消息列表
export function listChatUserMessage(query) {
  return request({
    url: '/chat/chatUserMessage/list',
    method: 'get',
    params: query
  })
}

// 查询好友消息视图列表
export function listChatUserMessageVo(query) {
  return request({
    url: '/chat/chatUserMessage/listVo',
    method: 'get',
    params: query
  })
}

// 查询好友消息详细
export function getChatUserMessage(id) {
  return request({
    url: '/chat/chatUserMessage/' + id,
    method: 'get'
  })
}

// 新增好友消息
export function addChatUserMessage(data) {
  return request({
    url: '/chat/chatUserMessage',
    method: 'post',
    data: data
  })
}

// 修改好友消息
export function updateChatUserMessage(data) {
  return request({
    url: '/chat/chatUserMessage',
    method: 'put',
    data: data
  })
}

// 删除好友消息
export function delChatUserMessage(id) {
  return request({
    url: '/chat/chatUserMessage/' + id,
    method: 'delete'
  })
}

// 向好友发送消息
export function sendChatUserMessage(data) {
  return request({
    url: '/chat/chatUserMessage/sendChatUserMessage',
    method: 'post',
    data: data
  })
}