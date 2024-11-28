import request from '@/utils/request'

// 查询好友关系列表
export function listChatUserRelation(query) {
  return request({
    url: '/chat/chatUserRelation/list',
    method: 'get',
    params: query
  })
}

// 查询好友关系详细
export function getChatUserRelation(id) {
  return request({
    url: '/chat/chatUserRelation/' + id,
    method: 'get'
  })
}

// 新增好友关系
export function addChatUserRelation(data) {
  return request({
    url: '/chat/chatUserRelation',
    method: 'post',
    data: data
  })
}

// 修改好友关系
export function updateChatUserRelation(data) {
  return request({
    url: '/chat/chatUserRelation',
    method: 'put',
    data: data
  })
}

// 删除好友关系
export function delChatUserRelation(id) {
  return request({
    url: '/chat/chatUserRelation/' + id,
    method: 'delete'
  })
}

// 查询好友关系视图列表
export function listChatUserRelationVo(query) {
  return request({
    url: '/chat/chatUserRelation/listVo',
    method: 'get',
    params: query
  })
}

// 添加好友
export function addFriend(data) {
  return request({
    url: '/chat/chatUserRelation/addFriend',
    method: 'post',
    data: data
  })
}