import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { EndpointsInterface, EndpointInterface, LockInterface } from './state'
import { Loading, Notify, copyToClipboard } from 'quasar'
import axios from 'axios'
import api from 'src/app.env'

const actions: ActionTree<EndpointsInterface, StateInterface> = {

  loadEndpoints ({ commit, rootState }): void {
    Loading.show()
    axios.get(`${api}/endpoints`, {
      headers: {
        Authorization: `Bearer ${rootState.settings.userData.apiToken}`
      }
    }).then((response) => {
      const data = <EndpointInterface[]>response.data
      data.forEach((endpoint) => {
        endpoint.blocked = endpoint.locks.length > 0
        commit('addEndpoint', endpoint)
        Loading.hide()
      })
    }).catch((e) => {
      console.error(e)
      Loading.hide()
    })
  },
  addEndpoint ({ commit, rootState }, payload: EndpointInterface): void {
    Loading.show()
    axios.post(`${api}/endpoints`, payload, {
      headers: {
        Authorization: `Bearer ${rootState.settings.userData.apiToken}`
      }
    }).then((response) => {
      const data = <EndpointInterface>response.data
      commit('addEndpoint', data)
      Loading.hide()
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 3000,
        position: 'top-right',
        message: `Endpoint ${payload.internalIp} added`
      })
    }).catch((e) => {
      Loading.hide()
      console.error(e)
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 3000,
        position: 'top-right',
        message: `Error adding endpoint ${payload.internalIp}`
      })
    })
  },
  updateEndpoint ({ commit, rootState }, payload: EndpointInterface): void {
    Loading.show()
    axios.put(`${api}/endpoints/${payload.id}`, payload, {
      headers: {
        Authorization: `Bearer ${rootState.settings.userData.apiToken}`
      }
    }).then((response) => {
      const data = <EndpointInterface>response.data
      commit('updateEndpoint', data)
      Loading.hide()
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 3000,
        position: 'top-right',
        message: `Endpoint ${payload.internalIp} updated`
      })
    }).catch((e) => {
      Loading.hide()
      console.error(e)
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 3000,
        position: 'top-right',
        message: `Error updating endpoint ${payload.internalIp}`
      })
    })
  },
  deleteEndpoint ({ commit, rootState }, payload: EndpointInterface): void {
    Loading.show()
    axios.delete(`${api}/endpoints/${payload.id}`, {
      headers: {
        Authorization: `Bearer ${rootState.settings.userData.apiToken}`
      }
    }).then(() => {
      commit('deleteEndpoint', payload)
      Loading.hide()
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 3000,
        position: 'top-right',
        message: `Endpoint ${payload.internalIp} deleted`
      })
    }).catch((e) => {
      console.error(e)
      Loading.hide()
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 3000,
        position: 'top-right',
        message: `Error deleting endpoint ${payload.internalIp}`
      })
    })
  },
  setCurrentEndpoint ({ commit }, payload): void {
    commit('setCurrentEndpoint', payload)
  },
  addBooking ({ commit }, payload): void {
    commit('addBooking', payload)
  },
  deleteBooking ({ commit }, payload): void {
    commit('deleteBooking', payload)
  },
  lockEndpoint ({ commit, rootState }, payload: EndpointInterface): void {
    Loading.show()
    axios.get(`${api}/endpoints/direct/lock/${payload.id}`, {
      headers: {
        Authorization: `Bearer ${rootState.settings.userData.apiToken}`
      }
    }).then((response) => {
      const data = <LockInterface>response.data
      commit('lockEndpoint', payload)
      Loading.hide()
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 3000,
        position: 'top-right',
        message: `Endpoint ${payload.internalIp} locked`
      })
      copyToClipboard(`k1://lock:${data.lockId}/`)
        .then(() => {
          Notify.create({
            type: 'positive',
            color: 'positive',
            timeout: 3000,
            position: 'top-right',
            message: 'Endpoint connect code is copied to clipboard! It is available for 15 minutes'
          })
        })
        .catch((e) => {
          console.error(e)
        })
    }).catch((e) => {
      Loading.hide()
      console.error(e)
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 3000,
        position: 'top-right',
        message: `Error adding endpoint ${payload.internalIp}`
      })
    })
  },
  unlockEndpoint ({ commit, rootState }, payload: EndpointInterface): void {
    Loading.show()
    axios.get(`${api}/endpoints/direct/unlock/${payload.id}`, {
      headers: {
        Authorization: `Bearer ${rootState.settings.userData.apiToken}`
      }
    }).then(() => {
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 3000,
        position: 'top-right',
        message: `Endpoint ${payload.internalIp} unlocked`
      })
      commit('unlockEndpoint', payload)
      Loading.hide()
    }).catch((e) => {
      Loading.hide()
      console.error(e)
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 3000,
        position: 'top-right',
        message: `Error unlocking endpoit ${payload.internalIp}`
      })
      Loading.hide()
    })
  },
  refreshEndpoint ({ commit, rootState }, payload: EndpointInterface): void {
    Loading.show()
    axios.get(`${api}/endpoints/locks/${payload.id}`, {
      headers: {
        Authorization: `Bearer ${rootState.settings.userData.apiToken}`
      }
    }).then((response) => {
      Notify.create({
        type: 'positive',
        color: 'info',
        timeout: 3000,
        position: 'top-right',
        message: `Endpoint ${payload.internalIp} locks state refreshed`
      })
      const data = (<EndpointInterface> response.data)
      if (data.locks.length === 0) {
        commit('unlockEndpoint', payload)
      }
      Loading.hide()
    }).catch((e) => {
      Loading.hide()
      console.error(e)
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 3000,
        position: 'top-right',
        message: `Error refresh lock state of endpoint ${payload.internalIp}`
      })
      Loading.hide()
    })
  }
}

export default actions
