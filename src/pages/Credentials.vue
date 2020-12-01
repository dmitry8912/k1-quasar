<template>
  <q-page class="q-pa-md">
    <credentials-list-component />
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
        <credential-dialog-component title="New credentials" @close="showAddDialog = false"/>
      </q-dialog>
    </div>
  </q-page>
</template>

<script lang="ts">
import CredentialsListComponent from 'components/App/Credentials/CredentialsList.vue'
import CredentialDialogComponent from 'components/App/Credentials/CredentialDialog.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'CredentialsPage',
  components: { CredentialsListComponent, CredentialDialogComponent },
  data () {
    return {
      showAddDialog: false
    }
  }
})
</script>
