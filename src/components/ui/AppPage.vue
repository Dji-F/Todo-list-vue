<template>
  <div class="card">
    <router-link v-if="back" to="/" v-text="'<-- Back'"></router-link>
    <h1 class="card-title">
      {{ title }}
      <slot name="header" />
    </h1>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    document.title = `${props.title} | TodoList`
  }
}
</script>

<style scoped>

</style>