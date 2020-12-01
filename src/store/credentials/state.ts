export interface CredentialInterface {
  id: string,
  name: string,
  password: boolean,
  plainPassword: string,
  note: string
}

export interface SelectableCredentialInterface {
  value: string,
  label: string
}

export interface CredentialsInterface {
  credentials: CredentialInterface[]
}

const state: CredentialsInterface = {
  credentials: [
  ]
}

export default state
