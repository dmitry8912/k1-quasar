<template>
  <q-page class="q-pa-md">
    <endpoints-list-component />
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
        <endpoint-dialog-component title="New endpoint" @close="showAddDialog = false"/>
      </q-dialog>
    </div>
  </q-page>
</template>

<script lang="ts">
import EndpointsListComponent from 'components/App/Endpoints/EndpointsList.vue'
import EndpointDialogComponent from 'components/App/Endpoints/EndpointDialog.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'EndpointsPage',
  components: { EndpointsListComponent, EndpointDialogComponent },
  data () {
    return {
      showAddDialog: false
    }
  }
})
</script>
