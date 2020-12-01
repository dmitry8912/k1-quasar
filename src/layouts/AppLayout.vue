<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          K1-Insight
        </q-toolbar-title>
        <div>
          Logged in as <strong>{{ userData.userName }}</strong>
        </div>
        <q-btn flat round color="white" icon="exit_to_app" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <Menu />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Menu from 'components/Menu.vue'
import { mapState } from 'vuex'
import { defineComponent, ref } from '@vue/composition-api'
import { LocalStorage } from 'quasar'

export default defineComponent({
  name: 'AppLayout',
  components: { Menu },
  setup () {
    const leftDrawerOpen = ref(false)

    return { leftDrawerOpen }
  },
  computed: {
    ...mapState('settings', ['userData'])
  },
  methods: {
    logout () {
      this.$q.dialog({
        title: 'Logout confirmation',
        message: 'Are you really want to log out?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        LocalStorage.remove('userData')
        this.$router.push('/login').catch((e) => {
          console.log('logout', e)
        })
      })
    }
  }
})
</script>
