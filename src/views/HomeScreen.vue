<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white"
  >
    <!-- Title -->
    <h1 class="text-8xl font-bold mb-8">Chess War</h1>

    <!-- Logo -->
    <div>
      <img
        src="../../public/assets/logo.jpg"
        alt="Chess War Logo"
        class="max-w-lg rounded-lg shadow-lg mb-8"
      />
    </div>

    <!-- Buttons -->
    <div>
      <router-link to="/game/computer" class="btn">Play vs. Computer</router-link>
      <router-link to="/game/friend" class="btn">Play vs. Friend</router-link>
      <router-link to="/about" class="btn">About</router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "HomeScreen",
};
</script>
