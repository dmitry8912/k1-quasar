export interface GatewayInterface {
  id: string,
  url: string,
  credentialId: string,
  note: string
}

export interface GatewaysInterface {
  gateways: GatewayInterface[]
}

export interface SelectableGatewayInterface {
  value: string,
  label: string
}

const state: GatewaysInterface = {
  gateways: [
  ]
}

export default state
