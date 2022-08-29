import { login } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      // 本地缓存数据
      setToken(token)
    },
    // 删除 Token
    removeToken(state) {
      // 清除 vuex 和本地的 token
      state.token = null
      removeToken()
    }
  },
  actions: {
    // 发送登录请求，获取token 在后续中还会用到，所以直接抽取出来
    async loginForm(context, data) {
      // 发送请求获取用户 token
      try {
        const { success, token } = await login(data)
        if (success) {
          context.commit('setToken', token)
          Message.success('登录成功！')
          router.push('/')
        } else return this.$message.error('登录失败！')
      } catch (error) {
        this.$message.error('登录失败！')
        console.log(error)
      }
    }
  }
}
