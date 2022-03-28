<template>
  <nav class="navbar">
    <h3>Todo List</h3>

    <ul class="navbar-menu">
      <span style="margin-right: 3rem">
        <a href="https://github.com/Dji-F/Todo-list-vue" target="_blank">Source code on Github</a>
      </span>
      <li>
        <router-link to="/">Main</router-link>
      </li>
      <li>
        <router-link to="/help">Help</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    return {
      logout: () => {
        store.commit('auth/logout')
        router.push('/auth')
      }
    }
  }
}
</script>

<style scoped>

</style>