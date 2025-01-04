<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Card',
};
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}
</style>