import { MutationTree } from 'vuex'
import { EndpointsInterface, EndpointInterface } from './state'

const mutation: MutationTree<EndpointsInterface> = {
  addEndpoint (state, payload): void {
    state.endpoints.push(payload)
  },
  updateEndpoint (state, payload): void {
    const updatedEndpoint = (<EndpointInterface> payload)
    const endpoint = state.endpoints.filter((s) => s.id === updatedEndpoint.id)[0]
    endpoint.internalIp = updatedEndpoint.internalIp
    endpoint.credentialId = updatedEndpoint.credentialId
    endpoint.gatewayId = updatedEndpoint.gatewayId
    endpoint.note = updatedEndpoint.note
    endpoint.type = updatedEndpoint.type
  },
  deleteEndpoint (state, payload): void {
    state.endpoints.splice(state.endpoints.indexOf(payload), 1)
  },
  lockEndpoint (state, payload): void {
    state.endpoints[state.endpoints.indexOf(payload)].blocked = true
  },
  unlockEndpoint (state, payload): void {
    state.endpoints[state.endpoints.indexOf(payload)].blocked = false
  },
  setCurrentEndpoint (state, payload: string): void {
    state.currentSettings.currentEndpoint = payload
  },
  addBooking (state, payload): void {
    state.bookings.push(payload)
  },
  deleteBooking (state, payload): void {
    state.bookings.splice(state.bookings.indexOf(payload), 1)
  }
}

export default mutation
