import request from '@/util/request'

// 登录
export function login (query) {
  return request({
    url: '/user/login',
    method: 'post',
    data: query
  })
}

// 获取该用户的信息
export function getUser (query) {
  return request({
    url: '/user/getUser',
    method: 'post',
    data: query
  })
}

// 注册
export function register (query) {
  return request({
    url: '/user/register',
    method: 'post',
    data: query
  })
}

// 获取所有留言内容
export function getAllMessage (query) {
  return request({
    url: '/message/getAllMessage',
    method: 'post',
    data: query
  })
}

// 获取分类所有留言内容
export function getTabAllMessage (query) {
  return request({
    url: '/message/getTabAllMessage',
    method: 'post',
    data: query
  })
}

// 获该取用户的留言
export function getUserMessage (query) {
  return request({
    url: '/message/getUserMessage',
    method: 'post',
    data: query
  })
}

// 获该取用户收藏
export function getUserCollection (query) {
  return request({
    url: '/message/getUserCollection',
    method: 'post',
    data: query
  })
}

// 删除用户该条留言
export function deleteMessage (query) {
  return request({
    url: '/message/deleteMessage',
    method: 'post',
    data: query
  })
}

// 保存留言
export function addMessage (query) {
  return request({
    url: '/message/addMessage',
    method: 'post',
    data: query
  })
}

// 修改留言
export function editMessage (query) {
  return request({
    url: '/message/editMessage',
    method: 'post',
    data: query
  })
}

// 修改留言文字内容
export function editMessageText (query) {
  return request({
    url: '/message/editMessageText',
    method: 'post',
    data: query
  })
}

// 修改用户数据
export function editUser (query) {
  return request({
    url: '/user/editUser',
    method: 'post',
    data: query
  })
}

// 修改密码
export function editPassword (query) {
  return request({
    url: '/user/editPassword',
    method: 'post',
    data: query
  })
}

// 点赞
export function addPraise (query) {
  return request({
    url: '/message/addPraise',
    method: 'post',
    data: query
  })
}

// 收藏
export function addCollection (query) {
  return request({
    url: '/message/addCollection',
    method: 'post',
    data: query
  })
}

// 增加浏览量
export function addView (query) {
  return request({
    url: '/message/addView',
    method: 'post',
    data: query
  })
}

// 获取该留言评论
export function getReview (query) {
  return request({
    url: '/review/getReview',
    method: 'post',
    data: query
  })
}

// 用户评论
export function addReview (query) {
  return request({
    url: '/review/addReview',
    method: 'post',
    data: query
  })
}

// 用户对评论的评论
export function addPlusReview (query) {
  return request({
    url: '/review/addPlusReview',
    method: 'post',
    data: query
  })
}

// 获取用户关注的人
export function getCare (query) {
  return request({
    url: '/user/getCare',
    method: 'post',
    data: query
  })
}

// 关注
export function addCare (query) {
  return request({
    url: '/user/addCare',
    method: 'post',
    data: query
  })
}

// 取消关注
export function unfollow (query) {
  return request({
    url: '/user/unfollow',
    method: 'post',
    data: query
  })
}

// 搜索
export function search (query) {
  return request({
    url: '/message/search',
    method: 'post',
    data: query
  })
}

// 取消关注
export function unCollection (query) {
  return request({
    url: '/user/unCollection',
    method: 'post',
    data: query
  })
}

// 取消关注增长数
export function cancelShowC (query) {
  return request({
    url: '/user/cancelShowCared',
    method: 'post',
    data: query
  })
}

// 取消点赞增长数
export function cancelShowP (query) {
  return request({
    url: '/user/cancelShowPraise',
    method: 'post',
    data: query
  })
}
