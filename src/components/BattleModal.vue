<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <div class="bg-white text-black p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 class="text-2xl font-bold mb-4 text-center">Battle Results</h2>
      <p class="text-center text-lg mb-4">
        {{ message }}
      </p>
      <button
        class="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block"
        @click="closeModal"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "BattleModal",
  props: {
    visible: Boolean,
    message: String,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>