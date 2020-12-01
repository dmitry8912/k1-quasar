<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <endpoint-card-component v-for="item in endpoints" :key="item.id" :item="item" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent
} from '@vue/composition-api'
import EndpointCardComponent from 'components/App/Endpoints/EndpointCard.vue'
import { mapState } from 'vuex'
export default defineComponent({
  name: 'EndpointsListComponent',
  components: { EndpointCardComponent },
  computed: {
    ...mapState('endpoints', ['endpoints'])
  }
})
</script>
<style lang="sass" scoped>
.entity-card
  width: 100%
  max-width: 250px
</style>
