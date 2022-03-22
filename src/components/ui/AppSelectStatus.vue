<template>
  <div class="form-control">
    <label v-if="label" :for="label.id">{{ label.value }}</label>
    <select :id="label.id" v-model="model">
      <option v-if="value" disabled selected>{{ value }}</option>
      <option value="active">Active</option>
      <option value="canceled">Canceled</option>
      <option value="pending">Pending</option>
      <option value="done">Completed</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: Object,
      default: '',
      validator(value) {
        console.log(value)
        return value.value && value.id
      }
    },
    model: null,
    value: String
  }
}
</script>

<style scoped>

</style>