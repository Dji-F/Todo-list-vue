<template>
  <div class="filter">
    <div class="form-control">
      <input type="text" placeholder="Enter the title" v-model="name">
    </div>

    <div class="form-control">
      <select v-model="status">
        <option disabled selected>Enter the status</option>
        <option value="active">Active</option>
        <option value="canceled">Canceled</option>
        <option value="pending">Pending</option>
        <option value="done">Completed</option>
      </select>
    </div>

    <button v-if="isActive" class="btn warning" @click="reset">Clear</button>
  </div>
</template>

<script>
import {computed, ref, watch} from 'vue'

export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(_, {emit}) {
    const status = ref()
    const name = ref()

    watch([name, status], values => {
      emit('update:modelValue', {
        name: values[0],
        status: values[1]
      })
    })

    const isActive = computed(() => name.value || status.value)
    return {
      status,
      name,
      isActive,
      reset: () => {
        status.value = null
        name.value = ''
      }
    }
  }
}
</script>

<style scoped>

</style>