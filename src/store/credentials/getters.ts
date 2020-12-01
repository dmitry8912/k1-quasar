import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import state, { CredentialsInterface, SelectableCredentialInterface } from './state'

const getters: GetterTree<CredentialsInterface, StateInterface> = {
  credentialsForSelect (): SelectableCredentialInterface[] {
    const credentialsForSelect: SelectableCredentialInterface[] = []
    state.credentials.forEach((c) => {
      credentialsForSelect.push({
        label: c.name,
        value: c.id
      })
    })
    return credentialsForSelect
  }
}

export default getters
