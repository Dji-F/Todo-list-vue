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
    <div class="text-danger" v-if="isTooManyTries">
      You press the button too often.
    </div>
  </form>
</template>

<script>
import {useLoginForm} from '@/use/login-form'

export default {
  setup() {
    return {...useLoginForm()}
  }
}
</script>

<style scoped>

</style>