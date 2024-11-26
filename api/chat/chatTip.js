import request from '@/utils/request'

// 查询好友消息列表
export function listChatTip(query) {
  return request({
    url: '/chat/chatTip/list',
    method: 'get',
    params: query
  })
}

// 查询好友消息视图列表
export function listChatTipVo(query) {
  return request({
    url: '/chat/chatTip/listVo',
    method: 'get',
    params: query
  })
}

// 查询好友消息详细
export function getChatTip(id) {
  return request({
    url: '/chat/chatTip/' + id,
    method: 'get'
  })
}

// 新增好友消息
export function addChatTip(data) {
  return request({
    url: '/chat/chatTip',
    method: 'post',
    data: data
  })
}

// 修改好友消息
export function updateChatTip(data) {
  return request({
    url: '/chat/chatTip',
    method: 'put',
    data: data
  })
}

// 删除好友消息
export function delChatTip(id) {
  return request({
    url: '/chat/chatTip/' + id,
    method: 'delete'
  })
}

// 重置待读消息列表
export function resetChatTipCount(id) {
  return request({
    url: '/chat/chatTip/resetChatTipCount/' + id,
    method: 'get'
  })
}