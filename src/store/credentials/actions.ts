import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { CredentialInterface, CredentialsInterface } from './state'
import axios from 'axios'
import api from 'src/app.env'
import { Loading, Notify } from 'quasar'

const actions: ActionTree<CredentialsInterface, StateInterface> = {

  loadCredentials ({ commit, rootState }): void {
    Loading.show()
    axios.get(`${api}/credentials`, {
      headers: {
        Authorization: `Bearer ${rootState.settings.userData.apiToken}`
      }
    }).then((response) => {
      const data = <CredentialInterface[]>response.data
      data.forEach((credential) => {
        commit('addCredential', credential)
        Loading.hide()
      })
    }).catch((e) => {
      Loading.hide()
      console.error(e)
    })
  },
  addCredential ({ commit, rootState }, payload: CredentialInterface): void {
    Loading.show()
    axios.post(`${api}/credentials`, payload, {
      headers: {
        Authorization: `Bearer ${rootState.settings.userData.apiToken}`
      }
    }).then((response) => {
      const data = <CredentialInterface>response.data
      commit('addCredential', data)
      Loading.hide()
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 3000,
        position: 'top-right',
        message: `Credential ${payload.name} added`
      })
    }).catch((e) => {
      Loading.hide()
      console.error(e)
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 3000,
        position: 'top-right',
        message: `Error adding credential ${payload.name}`
      })
    })
  },
  updateCredential ({ commit, rootState }, payload: CredentialInterface): void {
    Loading.show()
    axios.put(`${api}/credentials/${payload.id}`, payload, {
      headers: {
        Authorization: `Bearer ${rootState.settings.userData.apiToken}`
      }
    }).then((response) => {
      const data = <CredentialInterface>response.data
      commit('updateCredential', data)
      Loading.hide()
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 3000,
        position: 'top-right',
        message: `Credential ${payload.name} updated`
      })
    }).catch((e) => {
      Loading.hide()
      console.error(e)
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 3000,
        position: 'top-right',
        message: `Error updating credential ${payload.name}`
      })
    })
  },
  deleteCredential ({ commit, rootState }, payload: CredentialInterface): void {
    Loading.show()
    axios.delete(`${api}/credentials/${payload.id}`, {
      headers: {
        Authorization: `Bearer ${rootState.settings.userData.apiToken}`
      }
    }).then(() => {
      commit('deleteCredential', payload)
      Loading.hide()
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 3000,
        position: 'top-right',
        message: `Credential ${payload.name} deleted`
      })
    }).catch((e) => {
      console.error(e)
      Loading.hide()
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 3000,
        position: 'top-right',
        message: `Error deleting credential ${payload.name}, maybe it used by gateway or endpoint`
      })
    })
  }
}

export default actions
