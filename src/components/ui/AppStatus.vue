<template>
  <span :class="['badge', className]">{{ text }}</span>
</template>

<script>
import {ref} from 'vue'

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['active', 'canceled', 'pending', 'done'].includes(value)
      }
    }
  },
  setup(props) {
    const classesMap = {
      active: 'primary',
      canceled: 'danger',
      pending: 'warning',
      done: 'primary'
    }

    const textMap = {
      active: 'Active',
      canceled: 'Canceled',
      pending: 'Pending',
      done: 'Completed'
    }

    const className = ref(classesMap[props.type])
    const text = ref(textMap[props.type])

    return {
      className, text
    }
  }
}
</script>

<style scoped>

</style>