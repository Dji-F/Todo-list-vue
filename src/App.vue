<template>
  <div class="container pt-1">
    <AppAlert
        title="Note saved."
        text="The note is saved in the 'saved' tab."
        type="primary"
        closable
        v-if="alert"
        @close="alert = false"
    />
    <TodoHeader :active="active" @change="changeHandler" />
    <keep-alive>
      <TodoForm v-if="active === 'notes'" @create="addNote" />
    </keep-alive>
    <TodoNotes
        v-if="notes.length && active === 'notes'"
        :notes="notes"
        @remove="removeNote"
        @save="saveNote"
    />
    <TodoSavedNotes
        v-else-if="active === 'saved'"
        :loading="loading"
        :savedNotes="savedNotes"
        :listEmpty="isListEmpty"
        @load="getNotes"
        @remove="removeSavedNote"
    />
    <TodoTrash v-else-if="active === 'trash'" />
  </div>
</template>

<script>
import TodoHeader from '@/components/TodoHeader'
import TodoForm from '@/components/TodoForm'
import TodoNotes from '@/components/TodoNotes'
import TodoSavedNotes from '@/components/TodoSavedNotes'
import TodoTrash from '@/components/TodoTrash'
import AppAlert from '@/UI/AppAlert'
import alertMixin from '@/mixins/alertMixin'

export default {
  mixins: [alertMixin],
  data() {
    return {
      notes: [],
      savedNotes: [],
      active: 'notes',
      loading: false,
      isListEmpty: false
    }
  },
  methods: {
    addNote(note) {
      this.notes.push(note)
    },
    removeNote(id) {
      this.notes = this.notes.filter(note => note.id !== id)
    },
    async saveNote(note) {
      try {
        const response = await fetch('https://todo-list-vue-78664-default-rtdb.firebaseio.com/notes.json', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(note)
        })
        const firebaseData = await response.json()
        this.removeNote(note.id)
        this.alert = true
        this.updateSavedNotes()
      } catch (e) {
        console.error(e.message)
      }
    },
    async getNotes() {
        this.loading = true
        try {
          const response = await fetch('https://todo-list-vue-78664-default-rtdb.firebaseio.com/notes.json')
          const data = await response.json()

          this.savedNotes = Object.keys(data).map(key => {
            return {
              dataID: key,
              ...data[key]
            }
          })
          this.loading = false
        } catch (e) {
          this.loading = false
          this.isListEmpty = true
          console.error(e.message)
        }
    },
    async removeSavedNote(id) {
      const response = await fetch(`https://todo-list-vue-78664-default-rtdb.firebaseio.com/notes/${id}.json`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
        body: null
      })
      const data = response.json()
      this.savedNotes = this.savedNotes.filter(note => note.dataID !== id)
      if (!this.savedNotes.length) {
        this.isListEmpty = true
      }
    },
    updateSavedNotes() {
      this.getNotes()
    },
    changeHandler(btn) {
      this.active = btn
    }
  },
  components: {TodoHeader, TodoForm, TodoNotes, TodoSavedNotes, TodoTrash, AppAlert}
}
</script>

<style>
.card {
  margin-bottom: 1rem;
}
</style>