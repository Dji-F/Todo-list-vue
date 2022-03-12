<template>
  <div class="card">
    <h1>Todo List Vue</h1>
    <ul class="list">
      <li class="item-list">
        <button
            class="btn"
            :class="{primary: active === 'notes'}"
            value="notes"
            @click="change"
        >Notes</button>

        <button
            class="btn"
            :class="{primary: active === 'saved'}"
            value="saved"
            @click="change"
        >Saved</button>

        <button
            class="btn"
            :class="{primary: active === 'trash'}"
            value="trash"
            @click="change"
        >Trash</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  emits: ['change'],
  props: {
    active: String
  },
  methods: {
    change(event) {
      this.$emit('change', event.target.value)
    }
  }
}
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>