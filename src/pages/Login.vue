<template>
  <q-page class="row items-center justify-evenly">
    <q-card flat class="login-card">
      <q-card-section>
        <q-form
          class="q-gutter-md"
          @submit="onLogin(login)"
        >
          <q-input
            outlined
            v-model="raw_login"
            label="Username"
          />

          <q-input
            outlined
            type="password"
            v-model="raw_password"
            label="Password"
          />

          <div class="row justify-end">
            <q-btn label="Login"
                   type="submit"
                   color="primary"
                   :loading="submitted"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { mapActions } from 'vuex'
import { AuthInterface } from 'src/store/settings/state'
export default defineComponent({
  name: 'LoginPage',
  data () {
    return {
      raw_login: '',
      raw_password: '',
      submitted: false
    }
  },
  methods: {
    ...mapActions('settings', ['login']),
    onLogin (fn: (item: AuthInterface) => void) {
      this.submitted = true
      const userData: AuthInterface = {
        login: this.raw_login,
        password: this.raw_password
      }
      fn(userData)
      this.$router.push('/endpoints').then(() => {
        console.log('rptok')
      }).catch((e) => {
        this.submitted = false
        console.log(e)
      })
    }
  }
})
</script>

<style>
.login-card {
  width:90%;
  max-width: 500px
}
</style>
