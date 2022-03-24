<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Enter email and password to login</h1>

    <div :class="['form-control', {invalid: emailError}]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="emailBlur">
      <small v-if="emailError">{{ emailError }}</small>
    </div>

    <div :class="['form-control', {invalid: passError}]">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" @blur="passBlur">
      <small v-if="passError">{{ passError }}</small>
    </div>

    <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyTries">Sign in</button>
    <button type="button" class="btn" @click="modal = true">New user</button>
    <div class="text-danger" v-if="isTooManyTries">
      You press the button too often.
    </div>
  </form>
  <teleport to="body">
    <app-modal v-if="modal" title="Registration" @close="modal = false">
      <RegModal @created="modal = false"/>
    </app-modal>
  </teleport>
</template>

<script>
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {ref} from 'vue'
import {error} from '@/utils/error'
import {useLoginForm} from '@/use/login-form'
import AppModal from '@/components/ui/AppModal'
import RegModal from '@/components/registration/RegModal'

export default {
  setup() {
    const route = useRoute()
    const store = useStore()
    const modal = ref(false)

    if (route.query.message) {
      store.dispatch('setMessage', {
        value: error(route.query.message),
        type: 'warning'
      })
    }

    return {...useLoginForm(), modal}
  },
  components: {AppModal, RegModal}
}
</script>

<style scoped>

</style>