<template>
  <div class="card">
    <div class="card-note" v-for="note in notes">
      <h3>{{ note.title }}</h3>
      <div>{{ note.body }}</div>
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

<style scoped>

</style>