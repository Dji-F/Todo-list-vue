<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Registration</h1>

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

    <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyTries">Create user</button>
    <div class="text-danger" v-if="isTooManyTries">
      You press the button too often.
    </div>
  </form>
</template>

<script>
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {error} from '@/utils/error'
import {useLoginForm} from '@/use/reg-form'

export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    if (route.query.message) {
      store.dispatch('setMessage', {
        value: error(route.query.message),
        type: 'warning'
      })
    }

    return {...useLoginForm()}
  }
}
</script>

<style scoped>

</style>