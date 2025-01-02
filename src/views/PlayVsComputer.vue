<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
    <!-- Title -->
    <h1 class="text-4xl font-bold mb-6">Play vs Computer</h1>

    <!-- Player Info -->
    <div class="flex flex-col items-center mb-8">
      <img
        :src="playerData.avatar?.src"
        :alt="playerData.avatar?.name"
        class="w-24 h-24 rounded-full mb-4"
      />
      <p class="text-lg font-semibold">{{ playerData.name }}</p>
      <p class="text-sm italic">{{ playerData.side === 'white' ? 'Playing as White' : 'Playing as Black' }}</p>
    </div>

    <!-- Chess Board Placeholder -->
    <div class="flex items-center justify-center w-full max-w-2xl h-80 bg-gray-700 rounded-lg shadow-lg">
      <p class="text-gray-400">Chess Board Goes Here</p>
    </div>

    <!-- Back to Home -->
    <div class="mt-6">
      <router-link to="/" class="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Back to Home
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PlayVsComputer",
  data() {
    return {
      playerData: {
        name: "",
        side: "white",
        avatar: { src: "", name: "" },
      },
    };
  },
  mounted() {
    // Retrieve player data from sessionStorage
    const storedData = sessionStorage.getItem("playerData");
    if (storedData) {
      this.playerData = JSON.parse(storedData);
    }
  },
};
</script>
