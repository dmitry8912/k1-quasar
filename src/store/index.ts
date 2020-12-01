import { store } from 'quasar/wrappers'
import Vuex from 'vuex'
import credentials from './credentials'
import gateways from './gateways'
import endpoints from './endpoints'
import settings from './settings'
import { CredentialsInterface } from 'src/store/credentials/state'
import { GatewaysInterface } from 'src/store/gateways/state'
import { EndpointsInterface } from 'src/store/endpoints/state'
import { SettingsInterface } from 'src/store/settings/state'

export interface StateInterface {
  credentials: CredentialsInterface,
  gateways: GatewaysInterface,
  endpoints: EndpointsInterface,
  settings: SettingsInterface
}

export default store(function ({ Vue }) {
  Vue.use(Vuex)

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      credentials,
      gateways,
      endpoints,
      settings
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING
  })

  return Store
})
