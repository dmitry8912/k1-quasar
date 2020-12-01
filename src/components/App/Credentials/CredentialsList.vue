<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <credential-card-component v-for="item in credentials" :key="item.id" :item="item" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent
} from '@vue/composition-api'
import CredentialCardComponent from 'components/App/Credentials/CredentialCard.vue'
import { mapState } from 'vuex'
export default defineComponent({
  name: 'CredentialsListComponent',
  components: { CredentialCardComponent },
  computed: {
    ...mapState('credentials', ['credentials'])
  }
})
</script>
<style lang="sass" scoped>
.entity-card
  width: 100%
  max-width: 250px
</style>
