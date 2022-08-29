// 登录接口
import request from '@/utils/request'

// 图片验证码
export const getImgCode = (clientToken) =>
  request({
    url: `/api/user-service/user/imageCode/${clientToken}`,
    responseType: 'arraybuffer'
  })

// 登录
export const login = (data) =>
  request({
    method: 'POST',
    url: '/api/user-service/user/login',
    data
  })
