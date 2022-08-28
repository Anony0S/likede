// 登录接口
import request from '@/utils/request'

// 图片验证码
export const getImgCode = (clientToken) =>
  request({
    url: `/api/user-service/user/imageCode/${clientToken}`,
    responseType: 'arraybuffer'
  })
