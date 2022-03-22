<template>
  <app-loader v-if="loading" />
  <app-page v-else title="Notes">
    <template #header>
      <button class="btn primary" @click="modal = true">Create note</button>
    </template>

    <note-filter v-model="filter"></note-filter>

    <note-block :notes="notes"></note-block>
  </app-page>

  <teleport to="body">
    <app-modal v-if="modal" title="Create note" @close="modal = false">
      <note-modal @created="modal = false" />
    </app-modal>
  </teleport>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import AppPage from '@/components/ui/AppPage'
import NoteBlock from '@/components/notes/NoteBlock'
import AppModal from '@/components/ui/AppModal'
import NoteModal from '@/components/notes/NoteModal'
import AppLoader from '@/components/ui/AppLoader'
import NoteFilter from '@/components/notes/NoteFilter'

export default {
  name: 'Home',
  setup() {
    const store = useStore()
    const modal = ref(false)
    const loading = ref(false)
    const filter = ref({})

    onMounted(async () => {
      loading.value = true
      await store.dispatch('note/load')
      loading.value = false
    })

    const notes = computed(() => store.getters['note/notes']
      .filter(note => {
        console.log(note.title.includes(filter.value.name))
        if (filter.value.name) {
          return note.title.includes(filter.value.name)
        }
        return note
      })
      .filter(note => {
        if (filter.value.status) {
          return filter.value.status === note.status
        }
        return note
      })
    )

    return {
      modal, notes, loading, filter
    }
  },
  components: {AppPage, NoteBlock, AppModal, NoteModal, AppLoader, NoteFilter}
}
</script>
