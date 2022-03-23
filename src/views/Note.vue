<template>
  <app-loader v-if="loading"></app-loader>
  <app-page back v-else-if="note" title="Note">
    <p><strong>Title: </strong>{{ note.title }}</p>
    <p><strong>Description: </strong>{{ note.text }}</p>
    <p><strong>Status: </strong><app-status :type="note.status" /></p>

    <div class="form-control">
      <label for="status-change">Change status</label>
      <select id="status-change" v-model="status">
        <option value="active">Active</option>
        <option value="canceled">Canceled</option>
        <option value="pending">Pending</option>
        <option value="done">Completed</option>
      </select>
    </div>

    <button class="btn danger" @click="remove">Remove</button>
    <button v-if="hasChanges" class="btn" @click="update">Update</button>
  </app-page>
  <h3 v-else class="text-center text-white">There is no note with this id: {{$route.params.id}}</h3>
</template>

<script>
import {ref, onMounted, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import AppStatus from '@/components/ui/AppStatus'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const loading = ref(true)
    const status = ref()
    const note = ref({})

    onMounted(async () => {
      loading.value = true
      note.value = await store.dispatch('note/loadOne', route.params.id)
      status.value = note.value?.status
      loading.value = false
    })

    const hasChanges = computed(() => note.value.status !== status.value)

    const remove = async () => {
      await store.dispatch('note/remove', route.params.id)
      router.push('/')
    }

    const update = async () => {
      const data = {...note.value, status: status.value, id: route.params.id}
      await store.dispatch('note/update', data)
      note.value.status = status.value
    }

    return {note, loading, status, remove, update, hasChanges}
  },
  components: {AppPage, AppLoader, AppStatus}
}
</script>

<style scoped>

</style>