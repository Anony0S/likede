const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token, // 导出 token，方便使用
  name: (state) => state.user.userInfo.userName, // 建立用户名称的映射
  userId: (state) => state.user.userInfo.userId, // 判断是否有用户信息
  avatar: (state) => state.user.userInfo.image // 用户头像
}
export default getters
