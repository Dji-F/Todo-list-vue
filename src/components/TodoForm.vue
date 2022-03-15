<template>
  <div class="card">

    <div class="form-control">
      <label for="titleEnter">Title</label>
      <input type="text" id="titleEnter" v-model.trim="note.title" />
    </div>
    <div class="form-control">
      <label for="bodyEnter">Text</label>
      <input type="text" id="bodyEnter" v-model.trim="note.body" />
      <button
          class="btn"
          @click="createNote"
          :disabled="note.title.length < 4 || note.body.length < 4"
      >Create</button>
    </div>

  </div>
</template>

<script>
export default {
  emits: ['create'],
  data() {
    return {
      note: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createNote() {
      if (this.note.title && this.note.body) {
        this.note.id = Date.now()
        this.$emit('create', this.note)
        this.note = {title: '', body: ''}
      }
    }
  }
}
</script>

<style scoped>
.btn {
  margin-top: 10px;
}
</style>