import request from '@/utils/request'

// 获取用户基本信息
export const getUserInfo = (id) =>
  request({
    url: '/api/user-service/user/' + id
  })
