<template>
  <q-card class="entity-card">
    <q-card-section class="data-section">
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">
          {{ item.internalIp }} <q-badge outline :color="item.type ==='rx' ? 'info' : 'warning' " :label="item.type.toUpperCase()" class="float-right" />
        </div>
      </div>
      <div class="text-caption text-grey">
        Credential: <q-badge v-if="item.credential !== ''" outline color="positive" label="Set" /> <q-badge v-else outline color="negative" label="Not set" />
      </div>
      <div class="text-caption text-grey">
        Gateway: <q-badge v-if="item.gateway !== ''" outline color="positive" label="Set" /> <q-badge v-else outline color="negative" label="Not set" />
      </div>
      <div class="text-caption text-grey">
        Note: {{ item.note.length > 25 ? item.note.substring(0,25) + '...' : item.note }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions class="float-right">
      <q-btn flat icon="bookmark" color="primary" @click="setCurrentEndpoint(item.id); showBookingDialog = true">
        <q-tooltip>
          Opens a booking menu for this endpoint
        </q-tooltip>
      </q-btn>
      <div v-if="!item.blocked">
        <q-btn flat icon="airplay" color="positive" @click="connectToEndpoint(item, lockEndpoint)">
          <q-tooltip>
            Connect to endpoint
          </q-tooltip>
        </q-btn>
        <q-btn flat icon="settings_applications" color="primary" @click="showEditDialog = true">
          <q-tooltip>
            Show settings
          </q-tooltip>
        </q-btn>
        <q-btn flat icon="delete" color="negative" @click="beforeDeleteEndpoint(item, deleteEndpoint)">
          <q-tooltip>
            Delete endpoint
          </q-tooltip>
        </q-btn>
      </div>
      <div v-else>
        <q-btn color="negative" size="sm" label="Blocked" :disable="true" class="q-mr-sm">
          <q-badge color="negative" floating transparent>
            ∞
          </q-badge>
          <q-tooltip>
            Endpoint have been locked by other user
          </q-tooltip>
        </q-btn>
        <q-btn color="negative" size="sm" label="Unlock" @click="beforeUnlockEndpoint(item, unlockEndpoint)">
          <q-tooltip>
            Forced unlock
          </q-tooltip>
        </q-btn>
        <q-btn flat icon="cached" color="info" @click="refreshEndpoint(item)">
          <q-tooltip>
            Refresh lock information
          </q-tooltip>
        </q-btn>
      </div>
    </q-card-actions>

    <q-dialog v-model="showEditDialog">
      <endpoint-dialog-component title="Edit endpoint" @close="showEditDialog = false" :item="item"  />
    </q-dialog>
    <q-dialog v-model="showBookingDialog">
      <booking-dialog-component @close="showBookingDialog = false" :item="item"  />
    </q-dialog>
  </q-card>
</template>

<script lang="ts">
import {
  defineComponent
} from '@vue/composition-api'
import EndpointDialogComponent from 'components/App/Endpoints/EndpointDialog.vue'
import BookingDialogComponent from 'components/App/Endpoints/BookingDialog.vue'
import { mapActions } from 'vuex'
import { EndpointInterface } from 'src/store/endpoints/state'
export default defineComponent({
  name: 'EndpointCardComponent',
  components: { EndpointDialogComponent, BookingDialogComponent },
  props: ['item'],
  data () {
    return {
      showEditDialog: false,
      showBookingDialog: false
    }
  },
  methods: {
    ...mapActions('endpoints', ['deleteEndpoint', 'lockEndpoint', 'unlockEndpoint', 'refreshEndpoint', 'setCurrentEndpoint']),
    beforeDeleteEndpoint (item: EndpointInterface, fn: (item: EndpointInterface) => void) {
      this.$q.dialog({
        title: 'Confirm deleting endpoint',
        message: `Are you really want to delete endpoint ${item.internalIp}?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        fn(item)
      })
    },
    beforeUnlockEndpoint (item: EndpointInterface, fn: (item: EndpointInterface) => void) {
      this.$q.dialog({
        title: 'Confirm unlock endpoint',
        message: `Are you really want to unlock endpoint ${item.internalIp}? This will disable the active user.`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        fn(item)
      })
    },
    connectToEndpoint (item: EndpointInterface, fn: (item: EndpointInterface) => void) {
      this.$q.dialog({
        title: 'Connecting to endpoint',
        message: `Are you really want to connect to endpoint ${item.internalIp}? This will lock endpoint for other users.`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        fn(item)
      })
    }
  }
})
</script>
<style lang="scss" scoped>
.entity-card {
  width: 100%;
  max-width: 250px;
  min-height: 165px;
  max-height: 165px;
}
.data-section {
  min-height: 112px;
  max-height: 112px;
}
</style>
