<template>
  <div class="card">
    <h1>Todo List Vue</h1>
    <ul class="list">
      <li class="item-list">
        <button class="btn">Notes</button>
        <button class="btn">Saved</button>
        <button class="btn">Trash</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>