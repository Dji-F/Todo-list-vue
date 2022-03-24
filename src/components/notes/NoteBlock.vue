<template>
  <h4 v-if="notes.length === 0" class="text-center">No notes</h4>
  <table v-else class="table">
    <thead class="text-center bold">
      <tr>
        <td>#</td>
        <td>Title</td>
        <td>Description</td>
        <td>Status</td>
        <td>Action</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(note, idx) in notes" :key="note.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ note.title }}</td>
        <td style="width: 1rem">
          <p class="box-text">{{ note.text }}</p>
        </td>
        <td><AppStatus :type="note.status" /></td>
        <td>
          <router-link v-slot="{navigate}" custom :to="{name: 'Note', params: {id: note.id}}">
            <button class="btn" @click="navigate">Open</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import AppStatus from '@/components/ui/AppStatus'

export default {
  props: ['notes'],
  components: {AppStatus}
}
</script>

<style scoped>
.box-text {
  width: 9rem;
}
</style>
