<template>
  <div class="container pt-1">
    <TodoHeader :active="active" @change="changeHandler"/>
    <keep-alive>
      <TodoForm v-if="active === 'notes'" @create="addNote" />
    </keep-alive>
    <TodoNotes
        v-if="notes.length && active === 'notes'"
        :notes="notes"
        @remove="removeNote"
        @save="saveNote"
    />
    <TodoSavedNotes v-else-if="active === 'saved'" :loading="loading" />
    <TodoTrash v-else-if="active === 'trash'" />
  </div>
</template>

<script>
import TodoHeader from '@/components/TodoHeader'
import TodoForm from '@/components/TodoForm'
import TodoNotes from '@/components/TodoNotes'
import TodoSavedNotes from '@/components/TodoSavedNotes'
import TodoTrash from '@/components/TodoTrash'

export default {
  data() {
    return {
      notes: [],
      savedNotes: [],
      active: 'notes',
      loading: false
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
      } catch (e) {
        this.loading = false
        console.error(e.message)
      }
    },
    changeHandler(btn) {
      this.active = btn
    }
  },
  components: {TodoHeader, TodoForm, TodoNotes, TodoSavedNotes, TodoTrash}
}
</script>

<style>
.card {
  margin-bottom: 1rem;
}
</style>