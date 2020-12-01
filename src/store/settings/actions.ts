import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { AuthInterface, SettingsInterface, UserDataInterface } from './state'
import { LocalStorage } from 'quasar'
import api from '../../app.env'
import axios from 'axios'

const actions: ActionTree<SettingsInterface, StateInterface> = {
  login ({ commit, dispatch }, payload: AuthInterface): void {
    axios.post(`${api}/login`, {
      email: payload.login,
      password: payload.password
    }).then((response) => {
      const data = (<UserDataInterface> response.data)
      commit('setUserInformation', data)
      dispatch('saveData').catch((e) => { console.log(e) })
    }).catch((e) => {
      console.log(e)
    })
  },
  saveData ({ state }) {
    LocalStorage.set('userData', state.userData)
  },
  loadData ({ commit }) {
    const userData = LocalStorage.getItem('userData')
    if (userData !== null) {
      commit('setUserInformation', userData)
    }
  }
}

export default actions
