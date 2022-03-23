<template>
  <div class="question" @click="show = !show">
    <div class="question-title">{{ questions.title }}</div>
    <transition name="fade">
      <div class="question-body" v-if="show">{{ questions.body }}</div>
    </transition>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  props: {
    questions: {
      type: Object,
      required: true
    }
  },
  setup() {
    const show = ref(false)

    return {show}
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>