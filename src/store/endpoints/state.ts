export interface EndpointInterface {
  id: string,
  type: string,
  internalIp: string,
  credentialId: string,
  gatewayId: string,
  note: string,
  blocked: boolean,
  locks: EndpointLockInterface[]
}

export interface EndpointLockInterface {
  id: string,
  endpointId: string
}

export interface LockInterface {
  lockId: string
}

export interface BookingInterface {
  id: string,
  endpointId: string,
  from: string,
  to: string,
  note: string,
  userId: string,
  userName: string
}

export interface EndpointSettingsInterface {
  currentEndpoint: string
}

export interface EndpointsInterface {
  endpoints: EndpointInterface[]
  bookings: BookingInterface[]
  currentSettings: EndpointSettingsInterface
}

const state: EndpointsInterface = {
  endpoints: [
  ],
  bookings: [
  ],
  currentSettings: {
    currentEndpoint: ''
  }
}

export default state
