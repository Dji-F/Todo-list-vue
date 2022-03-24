<template>
  <form class="card" @submit.prevent="onSubmit">

    <div :class="['form-control', {invalid: emailError}]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="emailBlur">
      <button class="btn" type="button" @click="hasEmail(email)">Verification</button>
      <small v-if="emailError">{{ emailError }}</small>
      <small v-else-if="message" :class="type === 'primary' ? type : ''">{{ message }}</small>
    </div>

    <div :class="['form-control', {invalid: passError}]">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" @blur="passBlur">
      <small v-if="passError">{{ passError }}</small>
    </div>

    <button
        class="btn primary"
        type="submit"
        :disabled="isSubmitting || isTooManyTries"
    >Create user</button>

    <div class="text-danger" v-if="isTooManyTries">
      You press the button too often.
    </div>
  </form>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from 'vue'
import {useRegForm} from '@/use/reg-form'

export default {
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()

    const submit = async values => {
      try {
        console.log('Form reg', values)
        await store.dispatch('reg/newUser', values)
        emit('created')
      } catch (e) {
      }
    }

    async function hasEmail(email) {
      await store.dispatch('reg/isHasEmail', {
        identifier: email,
        continueUri: 'http://localhost:8080/auth'
      })
    }

    const message = computed(() => store.state.reg.message.value)
    const type = computed(() => store.state.reg.message.type)

    return {...useRegForm(submit), message, type, hasEmail}
  }
}
</script>

<style scoped>

</style>