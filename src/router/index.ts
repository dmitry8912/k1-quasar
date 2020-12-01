import { route } from 'quasar/wrappers'
import VueRouter from 'vue-router'
import { Store } from 'vuex'
import { StateInterface } from '../store'
import routes from './routes'
import { LocalStorage } from 'quasar'
import { UserDataInterface } from 'src/store/settings/state'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<Store<StateInterface>>(function ({ Vue }) {
  Vue.use(VueRouter)

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    const rawUserData = LocalStorage.getItem('userData')
    const userData = (<UserDataInterface> rawUserData)
    if ((userData == null || userData.apiToken === '') && to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  })

  return Router
})
