<template>
  <div class="container pt-1">
    <todo-header />
    <todo-form @create="addNote" />
    <todo-notes :notes="notes" />
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
    }
  },
  components: {TodoHeader, TodoForm, TodoNotes}
}
</script>

<style>

</style>