<template>
  <app-loader v-if="loading"></app-loader>
  <app-page back v-else-if="note" title="Note">
    <p>
      <strong>Title: </strong>
      <span :contenteditable="isChange" ref="titleSpan">{{ title }}</span>
    </p>
    <p>
      <strong>Description: </strong>
      <span :contenteditable="isChange" ref="textSpan">{{ text }}</span>
    </p>
    <p><strong>Status: </strong><app-status :type="note.status" /></p>

    <div class="form-control">
      <label for="status-change">Change status</label>
      <select id="status-change" v-model="status" :disabled="!isChange">
        <option value="active">Active</option>
        <option value="canceled">Canceled</option>
        <option value="pending">Pending</option>
        <option value="done">Completed</option>
      </select>
    </div>

    <button class="btn danger" @click="remove">Remove</button>
    <button v-if="!isChange" class="btn" @click="edit">Edit</button>
    <span v-else>
      <button class="btn primary" @click="update">Update</button>
      <button class="btn warning" @click="cancel">Cancel</button>
    </span>
  </app-page>
  <h3 v-else class="text-center text-white">There is no note with this id: {{$route.params.id}}</h3>
</template>

<script>
import {ref, onMounted, computed, onUpdated} from 'vue'
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
    const text = ref()
    const title = ref()
    const note = ref({})
    const isChange = ref(false)
    const titleSpan = ref(null)
    const textSpan = ref(null)

    onMounted(async () => {
      loading.value = true
      note.value = await store.dispatch('note/loadOne', route.params.id)
      status.value = note.value?.status
      text.value = note.value?.text
      title.value = note.value?.title
      loading.value = false
    })

    const edit = () => {
      isChange.value = true
    }

    const remove = async () => {
      await store.dispatch('note/remove', route.params.id)
      router.push('/')
    }

    const update = async () => {
      const data = {
        text: textSpan.value.textContent,
        title: titleSpan.value.textContent,
        status: status.value,
        id: route.params.id
      }
      console.log(data)
      await store.dispatch('note/update', data)
      note.value.status = status.value
      isChange.value = false
    }

    const cancel = () => {
      status.value = note.value?.status
      textSpan.value.textContent = note.value?.text
      titleSpan.value.textContent = note.value?.title
      isChange.value = false
    }

    return {note, loading, status, text, title, remove, update, edit, cancel, isChange, titleSpan, textSpan}
  },
  components: {AppPage, AppLoader, AppStatus}
}
</script>

<style scoped>
span[contenteditable="true"] {
  background-color: rgba(66, 185, 131, 0.3);
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  outline: none;
}

span:focus-visible {
  border: 2px solid #42b983;
}
</style>