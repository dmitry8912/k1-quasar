<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <gateway-card-component v-for="item in gateways" :key="item.id" :item="item" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent
} from '@vue/composition-api'
import GatewayCardComponent from 'components/App/Gateways/GatewayCard.vue'
import { mapState } from 'vuex'
export default defineComponent({
  name: 'GatewaysListComponent',
  components: { GatewayCardComponent },
  computed: {
    ...mapState('gateways', ['gateways'])
  }
})
</script>
<style lang="sass" scoped>
.entity-card
  width: 100%
  max-width: 250px
</style>
