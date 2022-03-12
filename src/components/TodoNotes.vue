<template>
  <div class="card">
    <div class="card-note" v-for="note in notes" :key="note.id">
      <div>
        <h3>{{ note.title }}</h3>
        <div>{{ note.body }}</div>
      </div>
      <div>
        <button class="btn" @click="$emit('save', note)">Save</button>
        <button class="btn danger" @click="$emit('remove', note.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['remove', 'save'],
  props: {
    notes: Array
  }
}
</script>

<style lang="scss" scoped>
.card-note {
  background-color: #eee;
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