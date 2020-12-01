import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { BookingInterface, EndpointsInterface } from './state'

const getters: GetterTree<EndpointsInterface, StateInterface> = {
  endpointBooking (state): BookingInterface[] {
    return state.bookings.filter((b) => b.endpointId === state.currentSettings.currentEndpoint)
  }
}

export default getters
