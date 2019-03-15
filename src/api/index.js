import request from '@/util/request'

export function login (query) {
  return request({
    url: '/user/login',
    method: 'post',
    data: query
  })
}

export function register (query) {
  return request({
    url: '/user/register',
    method: 'post',
    data: query
  })
}

export function getAllMessage () {
  return request({
    url: '/message/getAllMessage',
    method: 'post'
  })
}

export function addMessage (query) {
  return request({
    url: '/message/addMessage',
    method: 'post',
    data: query
  })
}

// export function addImage (query) {
//   return request({
//     url: '/message/addImage',
//     method: 'post',
//     data: query
//   })
// }

// export function addText (query) {
//   return request({
//     url: '/message/addText',
//     method: 'post',
//     data: query
//   })
// }
