<template>
  <TodoLoader v-if="loading" />
  <div class="card" v-else>
    <div class="card-note" v-if="savedNotes.length" v-for="note in savedNotes" :key="note.dataID">
      <div>
        <h3>{{ note.title }}</h3>
        <div>{{ note.body }}</div>
      </div>
      <div>
        <button class="btn">Edit</button>
        <button class="btn danger" @click="$emit('remove', note.dataID)">Delete</button>
      </div>
    </div>
    <div v-else>
      <h2 v-if="listEmpty">You didn't save anything.</h2>
      <button class="btn primary" @click="$emit('load')" :disabled="listEmpty">Download List</button>
    </div>
  </div>
</template>

<script>
import TodoLoader from '@/UI/TodoLoader'
export default {
  components: {TodoLoader},
  emits: ['load', 'remove'],
  props: {
    loading: Boolean,
    savedNotes: Array,
    listEmpty: Boolean
  }
}
</script>

<style lang="scss" scoped>
.card-note {
  background-color: rgba(66, 185, 131, .3);
  padding: 0.5rem;
  border-radius: 16px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
   margin-bottom: 0;
 }
}
</style>