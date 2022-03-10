<template>
  <div class="card">
    <div class="card-note" v-for="(note, idx) in notes">
      <div>
        <h3>{{ note.title }}</h3>
        <div>{{ note.body }}</div>
      </div>
      <div>
        <button class="btn">Save</button>
        <button class="btn danger" @click="$emit('remove', idx)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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