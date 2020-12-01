<template>
  <q-card class="entity-card">
    <q-card-section class="data-section">
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">
          {{ item.url }}
        </div>
      </div>
      <div class="text-caption text-grey">
        Credential: <q-badge v-if="item.credential !== ''" outline color="positive" label="Set" /> <q-badge v-else outline color="negative" label="Not set" />
      </div>
      <div class="text-caption text-grey">
        Note: {{ item.note.length > 50 ? item.note.substring(0,50) + '...' : item.note }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions class="float-right">
      <q-btn flat icon="settings_applications" color="primary" @click="showEditDialog = true" />
      <q-btn flat icon="delete" color="negative" @click="beforeDeleteGateway(item, deleteGateway)" />
    </q-card-actions>

    <q-dialog v-model="showEditDialog">
      <gateway-dialog-component title="Edit gateway" @close="showEditDialog = false" :item="item"  />
    </q-dialog>
  </q-card>
</template>

<script lang="ts">
import {
  defineComponent
} from '@vue/composition-api'
import GatewayDialogComponent from 'components/App/Gateways/GatewayDialog.vue'
import { mapActions } from 'vuex'
import { GatewayInterface } from 'src/store/gateways/state'
export default defineComponent({
  name: 'GatewayCardComponent',
  components: { GatewayDialogComponent },
  props: ['item'],
  data () {
    return {
      showEditDialog: false
    }
  },
  methods: {
    ...mapActions('gateways', ['deleteGateway']),
    beforeDeleteGateway (item: GatewayInterface, fn: (item: GatewayInterface) => void) {
      this.$q.dialog({
        title: 'Confirm deleting gateway',
        message: `Are you really want to delete gateway ${item.url}?`,
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
