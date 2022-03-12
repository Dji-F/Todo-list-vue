<template>
  <TodoLoader v-if="false" />
  <div class="card">
    <div class="card-note">
      <div>
        <h3>Title</h3>
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, tenetur?</div>
      </div>
      <div>
        <button class="btn">Edit</button>
        <button class="btn danger">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import TodoLoader from '@/UI/TodoLoader'
export default {
  components: {TodoLoader}
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