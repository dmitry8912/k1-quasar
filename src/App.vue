<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { mapActions } from 'vuex'
export default defineComponent({
  name: 'App',
  methods: {
    ...mapActions('settings', ['loadData']),
    ...mapActions('credentials', ['loadCredentials']),
    ...mapActions('gateways', ['loadGateways']),
    ...mapActions('endpoints', ['loadEndpoints'])

  },
  mounted () {
    this.loadData().catch((e) => { console.log(e) })
    this.loadCredentials().catch((e) => { console.error(e) })
    this.loadEndpoints().catch((e) => { console.error(e) })
    this.loadGateways().catch((e) => { console.error(e) })
  }
})
</script>
