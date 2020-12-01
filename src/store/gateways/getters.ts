import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import state, { GatewaysInterface, SelectableGatewayInterface } from './state'

const getters: GetterTree<GatewaysInterface, StateInterface> = {
  gatewaysForSelect (): SelectableGatewayInterface[] {
    const gatewaysForSelect: SelectableGatewayInterface[] = []
    state.gateways.forEach((c) => {
      gatewaysForSelect.push({
        label: c.url,
        value: c.id
      })
    })
    return gatewaysForSelect
  }
}

export default getters
