<template>
  <div>

    <q-tabs
      v-model="currentItem"
      vertical
      class="text-primary"
    >
      <q-route-tab v-for="item in items" :key="item.name" :icon="item.icon" :label="item.name" :to="item.link" exact/>
    </q-tabs>

  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Menu',
  data () {
    return {
      currentItem: '',
      items: [
        {
          name: 'Gateways',
          link: '/gateways',
          icon: 'router',
          color: 'primary'
        },
        {
          name: 'Endpoints',
          link: '/endpoints',
          icon: 'computer',
          color: 'primary'
        },
        {
          name: 'Credentials',
          link: '/credentials',
          icon: 'account_balance_wallet',
          color: 'primary'
        }
      ]
    }
  }
})
</script>
