import { MutationTree } from 'vuex'
import { CredentialsInterface, CredentialInterface } from './state'

const mutation: MutationTree<CredentialsInterface> = {
  addCredential (state, payload): void {
    const credential = (<CredentialInterface> payload)
    credential.password = (credential.plainPassword !== '')
    state.credentials.push(payload)
  },
  updateCredential (state, payload): void {
    const updatedCredential = (<CredentialInterface> payload)
    const credential = state.credentials.filter((s) => s.id === updatedCredential.id)[0]
    credential.name = updatedCredential.name
    credential.note = updatedCredential.note
    if (updatedCredential.plainPassword !== '') {
      credential.plainPassword = updatedCredential.plainPassword
      credential.password = true
    }
  },
  deleteCredential (state, payload): void {
    state.credentials.splice(state.credentials.indexOf(payload), 1)
  }
}

export default mutation
