<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    v-if="show"
  >
    <div class="bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-lg p-6 w-96 shadow-xl text-center">
      <!-- Winner Announcement -->
      <div v-if="winner">
        <img
          :src="winner.avatar.src"
          :alt="winner.name"
          class="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <h2 class="text-2xl text-black font-bold mb-2">{{ winner.name }} Wins!</h2>
        <p class="text-lg text-black">Final Score: {{ winner.score }}</p>
      </div>
      <div v-else>
        <p class="text-lg">No winner data available.</p>
      </div>

      <!-- Buttons -->
      <div class="mt-6 space-y-4 flex flex-col items-center">
        <button @click="playAgain" class="btn w-full">Play Again</button>
        <router-link to="/" class="btn w-full block text-center">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WinnerModal',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    winner: {
      type: Object as () => { name: string; avatar: { src: string; name: string }; score: number } | null,
      required: true,
    },
  },
  methods: {
    playAgain() {
      this.$emit('reset');
    },
  },
};
</script>