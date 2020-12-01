<template>
  <div>
    <q-card class="add-dialog">
      <q-card-section class="row">
        <div class="text-h6"><slot>Bookings of {{ endpoint.internalIp }}</slot></div>
        <q-space />
        <q-btn flat round dense icon="close" v-close-popup />
      </q-card-section>
      <q-form @submit="beforeAddBooking(booking, addBooking)">
        <q-card-section class="q-pt-none">
          <q-input filled v-model="booking.from" label="From (date)" class="q-mb-sm" >
            <q-popup-proxy>
              <q-date v-model="booking.from" />
            </q-popup-proxy>
          </q-input>
          <q-input filled v-model="booking.to" label="To (date)" class="q-mb-sm">
            <q-popup-proxy>
              <q-date v-model="booking.to" />
            </q-popup-proxy>
          </q-input>

          <q-input
            v-model="booking.note"
            filled
            type="textarea"
            label="Note"
          />

        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Save" color="primary" type="submit" />
        </q-card-actions>

      </q-form>
      <q-card-section>
        <q-list bordered separator>
          <q-item v-for="item in endpointBooking" :key="item.id">
            <q-item-section>
              <q-item-label>From - to:</q-item-label>
              <q-item-label caption>{{ item.from }} - {{ item.to }}</q-item-label>
              <q-item-label caption>{{ item.note }}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-item-label caption>{{ item.userName }}</q-item-label>
              <q-btn flat icon="delete" color="negative" @click="beforeDeleteBooking(item, deleteBooking)"/>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref
} from '@vue/composition-api'
import { date, uid } from 'quasar'
import { mapState, mapGetters, mapActions } from 'vuex'
import { BookingInterface, EndpointInterface } from 'src/store/endpoints/state'
import { UserDataInterface } from 'src/store/settings/state'
export default defineComponent({
  name: 'BookingDialogComponent',
  props: ['title', 'item'],
  setup () {
    const endpoint = ref<EndpointInterface>({
      id: '',
      type: '',
      internalIp: '',
      credentialId: '',
      gatewayId: '',
      note: '',
      blocked: false,
      locks: []
    })

    const booking = ref<BookingInterface>({
      id: '',
      endpointId: '',
      from: '',
      to: '',
      note: '',
      userId: '',
      userName: ''
    })
    return { booking, endpoint }
  },
  computed: {
    ...mapState('endpoints', ['bookings']),
    ...mapGetters('endpoints', ['endpointBooking']),
    ...mapState('settings', ['userData'])
  },
  methods: {
    ...mapActions('endpoints', ['setCurrentEndpoint', 'addBooking', 'deleteBooking']),
    beforeDeleteBooking (item: BookingInterface, fn: (item: BookingInterface) => void) {
      this.$q.dialog({
        title: 'Confirm delete booking',
        message: `Are you really want to delete booking ${item.from} - ${item.to}?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        fn(item)
      })
    },
    beforeAddBooking (item: BookingInterface, fn: (item: BookingInterface) => void) {
      const from = new Date(this.booking.from)
      const to = new Date(this.booking.to)
      if (from > to) {
        this.$q.dialog({
          title: 'Error',
          message: 'Date in "from" field cannot be greater than "to" date',
          cancel: false,
          persistent: true
        })
      } else {
        fn(Object.assign({}, item))
        this.booking.id = uid()
        this.booking.from = ''
        this.booking.to = ''
        const userName = (<UserDataInterface> this.userData).userName
        this.booking.note = 'Created at ' + date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss') + ` by ${userName}`
      }
    }
  },
  mounted () {
    const userName = (<UserDataInterface> this.userData).userName
    this.endpoint = (<EndpointInterface> this.$props.item)
    this.booking.note = 'Created at ' + date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss') + ` by ${userName}`
    this.booking.id = uid()
    this.booking.endpointId = this.endpoint.id
  }
})
</script>
<style>
.add-dialog {
  width: 350px;
  max-width: 400px;
}
</style>
