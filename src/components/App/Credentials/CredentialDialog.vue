<template>
  <div>
    <q-card class="add-dialog">
      <q-card-section class="row">
        <div class="text-h6"><slot>{{ title }}</slot></div>
        <q-space />
        <q-btn flat round dense icon="close" v-close-popup />
      </q-card-section>
      <q-form @submit="addMode ? addCredential(credential) : updateCredential(credential)">
        <q-card-section class="q-pt-none">
          <q-input filled v-model="credential.name" label="Username" class="q-mb-sm" />

          <q-input v-model="credential.plainPassword" filled :type="isPwd ? 'password' : 'text'" label="Password" class="q-mb-sm">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-input
            v-model="credential.note"
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
import { mapActions, mapState } from 'vuex'
import { CredentialInterface } from 'src/store/credentials/state'
import { UserDataInterface } from 'src/store/settings/state'
export default defineComponent({
  name: 'CredentialDialogComponent',
  props: ['title', 'item'],
  setup () {
    const credential = ref<CredentialInterface>({
      id: '',
      name: '',
      plainPassword: '',
      password: false,
      note: ''
    })
    const isPwd = true
    const addMode = false
    return { credential, isPwd, addMode }
  },
  methods: {
    ...mapActions('credentials', ['addCredential', 'updateCredential'])
  },
  computed: {
    ...mapState('settings', ['userData'])
  },
  mounted () {
    const credentialProp = (<CredentialInterface> this.$props.item)
    if (this.$props.item == null) {
      const userName = (<UserDataInterface> this.userData).userName
      this.credential.note = 'Created at ' + date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss') + ` by ${userName}`
      this.credential.id = uid()
      this.addMode = true
    } else {
      this.credential.plainPassword = ''
      this.credential.id = credentialProp.id
      this.credential.name = credentialProp.name
      this.credential.note = credentialProp.note
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
