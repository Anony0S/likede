import { login } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router'
import { Message } from 'element-ui'
import { getUserInfo } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {},
    userId: ''
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
    },
    //  设置用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    // 删除用户信息
    removeUserInfo(state) {
      state.userInfo = {}
    },
    // 设置 userId
    setUserId(state) {
      state.userId = state.userInfo.userId
    }
  },
  actions: {
    // 发送登录请求，获取token 在后续中还会用到，所以直接抽取出来
    async loginForm(context, data) {
      // 发送请求获取用户 token
      try {
        const { success, token, userId } = await login(data)
        if (success) {
          console.log(userId)
          context.commit('setToken', token)
          context.commit('setUserId', userId)
          Message.success('登录成功！')
          router.push('/')
        } else return this.$message.error('登录失败！')
      } catch (error) {
        this.$message.error('登录失败！')
        console.log(error)
      }
    },
    // TODO: 登出
    logout() {
      console.log(111)
    },
    // 获取用户信息
    async getUserInfo({ context, rootState }) {
      const res = await getUserInfo(rootState.userId)
      context.commit('setUserInfo', res)
      return res // 这里返回为后面埋下伏笔
    }
  }
}
