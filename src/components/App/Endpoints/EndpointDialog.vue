<template>
  <div>
    <q-card class="add-dialog">
      <q-card-section class="row">
        <div class="text-h6"><slot>{{ title }}</slot></div>
        <q-space />
        <q-btn flat round dense icon="close" v-close-popup />
      </q-card-section>
      <q-form @submit="addMode ? addEndpoint(endpoint) : updateEndpoint(endpoint)">
        <q-card-section class="q-pt-none">
          <q-input filled v-model="endpoint.internalIp" label="Gateway URL or IP" class="q-mb-sm" />
          <q-select filled clearable v-model="endpoint.type" :options="endpointTypes" label="Endpoint type"
                    @input="gatewaySelected"
                    class="q-mb-sm"
          />
          <q-select filled clearable v-model="selectedCredential" :options="credentialsForSelect" label="Credential for connect"
                    @input="credentialSelected"
                    class="q-mb-sm"
          />
          <q-select filled clearable v-model="selectedGateway" :options="gatewaysForSelect" label="Gateway"
                    @input="gatewaySelected"
                    class="q-mb-sm"
          />
          <q-input
            v-model="endpoint.note"
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
import { EndpointInterface } from 'src/store/endpoints/state'
import { SelectableCredentialInterface } from 'src/store/credentials/state'
import { SelectableGatewayInterface } from 'src/store/gateways/state'
import { UserDataInterface } from 'src/store/settings/state'
export default defineComponent({
  name: 'EndpointDialogComponent',
  props: ['title', 'item'],
  setup () {
    const selectedCredential: SelectableCredentialInterface = {
      label: '',
      value: ''
    }
    const selectedGateway: SelectableGatewayInterface = {
      label: '',
      value: ''
    }
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
    const endpointTypes = ['rx', 'd5']
    const addMode = false
    return { endpoint, addMode, selectedCredential, selectedGateway, endpointTypes }
  },
  computed: {
    ...mapState('credentials', ['credentials']),
    ...mapGetters('credentials', ['credentialsForSelect']),
    ...mapState('gateways', ['gateways']),
    ...mapGetters('gateways', ['gatewaysForSelect']),
    ...mapState('settings', ['userData'])
  },
  methods: {
    ...mapActions('endpoints', ['addEndpoint', 'updateEndpoint']),
    credentialSelected () {
      this.endpoint.credentialId = this.selectedCredential.value
    },
    gatewaySelected () {
      this.endpoint.gatewayId = this.selectedGateway.value
    }
  },
  mounted () {
    const endpointProp = (<EndpointInterface> this.$props.item)
    if (this.$props.item == null) {
      const userName = (<UserDataInterface> this.userData).userName
      this.endpoint.note = 'Created at ' + date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss') + ` by ${userName}`
      this.endpoint.id = uid()
      this.addMode = true
    } else {
      this.endpoint.id = endpointProp.id
      this.endpoint.internalIp = endpointProp.internalIp
      this.endpoint.credentialId = endpointProp.credentialId
      this.endpoint.gatewayId = endpointProp.gatewayId
      this.endpoint.note = endpointProp.note
      this.endpoint.type = endpointProp.type
      const cred: SelectableCredentialInterface = (<SelectableCredentialInterface[]> this.credentialsForSelect).filter((c) => c.value === endpointProp.credentialId)[0]
      this.selectedCredential = Object.assign({}, cred)
      const gw: SelectableGatewayInterface = (<SelectableGatewayInterface[]> this.gatewaysForSelect).filter((c) => c.value === endpointProp.gatewayId)[0]
      this.selectedGateway = Object.assign({}, gw)
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
