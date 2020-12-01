<template>
  <div>
    <q-card class="add-dialog">
      <q-card-section class="row">
        <div class="text-h6"><slot>{{ title }}</slot></div>
        <q-space />
        <q-btn flat round dense icon="close" v-close-popup />
      </q-card-section>
      <q-form @submit="addMode ? addGateway(gateway) : updateGateway(gateway)">
        <q-card-section class="q-pt-none">
          <q-input filled v-model="gateway.url" label="Gateway URL or IP" class="q-mb-sm" />

          <q-select filled clearable v-model="selectedCredential" :options="credentialsForSelect" label="Credential for tunnel"
                    @input="credentialSelected"
                    class="q-mb-sm"
          />
          <q-input
            v-model="gateway.note"
            filled
            type="textarea"
            label="Note"
          />

        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Save" color="primary" v-close-popup type="submit" />
        </q-card-actions>

      </q-form>
    </q-card>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref
} from '@vue/composition-api'
import { date, uid } from 'quasar'
import { mapActions, mapState, mapGetters } from 'vuex'
import { GatewayInterface } from 'src/store/gateways/state'
import { SelectableCredentialInterface } from 'src/store/credentials/state'
import { UserDataInterface } from 'src/store/settings/state'
export default defineComponent({
  name: 'GatewayDialogComponent',
  props: ['title', 'item'],
  setup () {
    const selectedCredential: SelectableCredentialInterface = {
      label: '',
      value: ''
    }
    const gateway = ref<GatewayInterface>({
      id: '',
      url: '',
      credentialId: '',
      note: ''
    })
    const addMode = false
    return { gateway, addMode, selectedCredential }
  },
  computed: {
    ...mapState('credentials', ['credentials']),
    ...mapGetters('credentials', ['credentialsForSelect']),
    ...mapState('settings', ['userData'])
  },
  methods: {
    ...mapActions('gateways', ['addGateway', 'updateGateway']),
    credentialSelected () {
      this.gateway.credentialId = this.selectedCredential.value
    }
  },
  mounted () {
    const gatewayProp = (<GatewayInterface> this.$props.item)
    if (this.$props.item == null) {
      const userName = (<UserDataInterface> this.userData).userName
      this.gateway.note = 'Created at ' + date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss') + ` by ${userName}`
      this.gateway.id = uid()
      this.addMode = true
    } else {
      this.gateway.id = gatewayProp.id
      this.gateway.url = gatewayProp.url
      this.gateway.credentialId = gatewayProp.credentialId
      this.gateway.note = gatewayProp.note
      const cred: SelectableCredentialInterface = (<SelectableCredentialInterface[]> this.credentialsForSelect).filter((c) => c.value === gatewayProp.credentialId)[0]
      this.selectedCredential = Object.assign({}, cred)
    }
  }
})
</script>
<style>
.add-dialog {
  width: 350px;
  max-width: 400px;
}
</style>
