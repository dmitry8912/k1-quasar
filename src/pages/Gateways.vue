<template>
  <q-page class="q-pa-md">
    <gateways-list-component />
    <div class="absolute-bottom text-right q-mb-lg q-mr-lg no-pointer-events">
      <q-btn
        round
        color="primary"
        size="24px"
        icon="add"
        class="all-pointer-events"
        @click="showAddDialog = true"
      />
      <q-dialog v-model="showAddDialog">
      <gateway-dialog-component title="New gateway" @close="showAddDialog = false"/>
      </q-dialog>
    </div>
  </q-page>
</template>

<script lang="ts">
import GatewaysListComponent from 'components/App/Gateways/GatewaysList.vue'
import GatewayDialogComponent from 'components/App/Gateways/GatewayDialog.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'GatewaysPage',
  components: { GatewaysListComponent, GatewayDialogComponent },
  data () {
    return {
      showAddDialog: false
    }
  }
})
</script>
