import { MutationTree } from 'vuex'
import { GatewaysInterface, GatewayInterface } from './state'

const mutation: MutationTree<GatewaysInterface> = {
  addGateway (state, payload): void {
    state.gateways.push(payload)
  },
  updateGateway (state, payload): void {
    const updatedGateway = (<GatewayInterface> payload)
    const gateway = state.gateways.filter((s) => s.id === updatedGateway.id)[0]
    gateway.url = updatedGateway.url
    gateway.credentialId = updatedGateway.credentialId
    gateway.note = updatedGateway.note
  },
  deleteGateway (state, payload): void {
    state.gateways.splice(state.gateways.indexOf(payload), 1)
  }
}

export default mutation
