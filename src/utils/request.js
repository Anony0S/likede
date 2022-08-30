import axios from 'axios'
import store from '@/store'
// 创建实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers['Authorization'] = `${store.getters.token}`
  }
  return config
})
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data } = response
    return data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
