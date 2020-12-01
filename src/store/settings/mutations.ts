import { MutationTree } from 'vuex'
import { SettingsInterface, UserDataInterface } from './state'

const mutation: MutationTree<SettingsInterface> = {
  setUserInformation (state, payload: UserDataInterface) {
    state.userData = payload
  }

}

export default mutation
