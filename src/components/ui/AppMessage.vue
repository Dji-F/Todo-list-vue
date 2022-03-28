<template>
  <div v-if="message" :class="['alert', message.type]">
    <p class="alert-title" v-if="title">{{ title }}</p>
    <p>{{ message.value }}</p>
    <span class="alert-close" @click="close">&times;</span>
  </div>
</template>

<script>
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {computed, watch} from 'vue'

export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    const TITLE_MAP = {
      primary: 'Success!',
      danger: 'Error!',
      warning: 'Warning!'
    }

    const thisRoute = computed(() => route.path)

    const message = computed(() => store.state.message)

    const title = computed(() => message.value ? TITLE_MAP[message.value.type] : null)

    watch(thisRoute, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        store.commit('clearMessage')
      }
    })

    return {
      message,
      title,
      close: () => store.commit('clearMessage')
    }
  }
}
</script>

<style scoped>

</style>
