import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { GatewayInterface, GatewaysInterface } from './state'
import { Loading, Notify } from 'quasar'
import axios from 'axios'
import api from 'src/app.env'

const actions: ActionTree<GatewaysInterface, StateInterface> = {

  loadGateways ({ commit, rootState }): void {
    Loading.show()
    axios.get(`${api}/gateways`, {
      headers: {
        Authorization: `Bearer ${rootState.settings.userData.apiToken}`
      }
    }).then((response) => {
      const data = <GatewayInterface[]>response.data
      data.forEach((data) => {
        commit('addGateway', data)
        Loading.hide()
      })
    }).catch((e) => {
      Loading.hide()
      console.error(e)
    })
  },
  addGateway ({ commit, rootState }, payload: GatewayInterface): void {
    Loading.show()
    axios.post(`${api}/gateways`, payload, {
      headers: {
        Authorization: `Bearer ${rootState.settings.userData.apiToken}`
      }
    }).then((response) => {
      const data = <GatewayInterface>response.data
      console.log(data)
      commit('addGateway', data)
      Loading.hide()
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 3000,
        position: 'top-right',
        message: `Gateway ${payload.url} added`
      })
    }).catch((e) => {
      Loading.hide()
      console.error(e)
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 3000,
        position: 'top-right',
        message: `Error adding gateway ${payload.url}`
      })
    })
  },
  updateGateway ({ commit, rootState }, payload: GatewayInterface): void {
    Loading.show()
    axios.put(`${api}/gateways/${payload.id}`, payload, {
      headers: {
        Authorization: `Bearer ${rootState.settings.userData.apiToken}`
      }
    }).then((response) => {
      const data = <GatewayInterface>response.data
      commit('updateGateway', data)
      Loading.hide()
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 3000,
        position: 'top-right',
        message: `Gateway ${payload.url} updated`
      })
    }).catch((e) => {
      Loading.hide()
      console.error(e)
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 3000,
        position: 'top-right',
        message: `Error updating gateway ${payload.url}`
      })
    })
  },
  deleteGateway ({ commit, rootState }, payload: GatewayInterface): void {
    Loading.show()
    axios.delete(`${api}/gateways/${payload.id}`, {
      headers: {
        Authorization: `Bearer ${rootState.settings.userData.apiToken}`
      }
    }).then(() => {
      commit('deleteGateway', payload)
      Loading.hide()
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 3000,
        position: 'top-right',
        message: `Gateway ${payload.url} deleted`
      })
    }).catch((e) => {
      console.error(e)
      Loading.hide()
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 3000,
        position: 'top-right',
        message: `Error deleting gateway ${payload.url}, maybe it used by endpoint`
      })
    })
  }
}

export default actions
