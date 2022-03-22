<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: titleError}">
      <label for="title">Title</label>
      <input type="text" id="title" maxlength="20" v-model="title" @blur="titleBlur">
      <small v-if="titleError">{{titleError}}</small>
    </div>

    <div class="form-control" :class="{invalid: textError}">
      <label for="text">Text</label>
      <textarea id="text" maxlength="200" v-model="text" @blur="textBlur"></textarea>
      <small v-if="textError">{{textError}}</small>
    </div>

    <div class="form-control">
      <label for="status">Status</label>
      <select id="status" v-model="status">
        <option value="active">Active</option>
        <option value="canceled">Canceled</option>
        <option value="pending">Pending</option>
        <option value="done">Completed</option>
      </select>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Create</button>
  </form>
</template>

<script>
import {useNoteForm} from '@/use/note-form'
import {useStore} from 'vuex'

export default {
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()
    const submit = async values => {
      await store.dispatch('note/create', values)
      emit('created')
    }

    return {...useNoteForm(submit)}
  }
}
</script>

<style scoped>

</style>
