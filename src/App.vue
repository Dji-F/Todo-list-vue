<template>
  <div class="container pt-1">
    <todo-header />
    <todo-form @create="addNote" />
    <todo-notes v-if="notes.length" :notes="notes" @remove="removeNote"/>
  </div>
</template>

<script>
import TodoHeader from '@/components/TodoHeader'
import TodoForm from '@/components/TodoForm'
import TodoNotes from '@/components/TodoNotes'

export default {
  data() {
    return {
      notes: [
        {id: 1, title: 'Title', body: 'This is body text'}
      ]
    }
  },
  methods: {
    addNote(note) {
      this.notes.push(note)
    },
    removeNote(idx) {
      this.notes.splice(idx, 1)
    }
  },
  components: {TodoHeader, TodoForm, TodoNotes}
}
</script>

<style>
.card {
  margin-bottom: 1rem;
}
</style>