// 权限管理 路由前置守卫
// 引入 router 和 store
import router from './router'
import store from './store'

// 设置白名单
const writeList = ['/login', '/404']
// 路由前置守卫
router.beforeEach(async(to, from, next) => {
  if (store.getters.token) {
    if (!store.getters.userId) {
      await store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') next('/')
    next()
  } else {
    if (writeList.includes(to.path)) next()
    else next('/login')
  }
})
