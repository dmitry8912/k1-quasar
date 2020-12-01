<template>
  <q-card class="entity-card">
    <q-card-section class="credential-section">
      <div class="text-caption text-grey">
        Login: <span style="text-decoration: underline">{{ item.name.length > 25 ? item.name.substring(0,25) + '...' : item.name }}</span>
      </div>
      <div class="text-caption text-grey">
        Password: <q-badge v-if="item.password" outline color="positive" label="Set" /> <q-badge v-else outline color="negative" label="Not set" />
      </div>
      <div class="text-caption text-grey">
        Note: {{ item.note.length > 50 ? item.note.substring(0,50) + '...' : item.note }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions class="float-right">
      <q-btn flat icon="settings_applications" color="primary" @click="showEditDialog = true" />
      <q-btn flat icon="delete" color="negative" @click="beforeDeleteCredential(item, deleteCredential)" />
    </q-card-actions>

    <q-dialog v-model="showEditDialog">
      <credential-dialog-component title="Edit credentials" @close="showEditDialog = false" :item="item"  />
    </q-dialog>
  </q-card>
</template>

<script lang="ts">
import {
  defineComponent
} from '@vue/composition-api'
import CredentialDialogComponent from 'components/App/Credentials/CredentialDialog.vue'
import { mapActions } from 'vuex'
import { CredentialInterface } from 'src/store/credentials/state'
export default defineComponent({
  name: 'CredentialCardComponent',
  components: { CredentialDialogComponent },
  props: ['item'],
  data () {
    return {
      showEditDialog: false
    }
  },
  methods: {
    ...mapActions('credentials', ['deleteCredential']),
    beforeDeleteCredential (item: CredentialInterface, fn: (item: CredentialInterface) => void) {
      this.$q.dialog({
        title: 'Confirm deleting credential',
        message: `Are you really want to delete credential ${item.name}?`,
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
.credential-section {
  min-height: 112px;
  max-height: 112px;
}
</style>
