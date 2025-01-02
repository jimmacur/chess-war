<template>
  <div
    class="flex flex-col items-center justify-center"
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
      <button @click="showModal = true" class="btn">About</button>
    </div>
    
    <!-- Modal -->
    <AboutModal
      v-if="showModal"
      @close="closeModal"
    ></AboutModal>
  </div>
</template>

<script lang="ts">
import AboutModal from "../components/AboutChessWar.vue";

export default {
  name: "HomeScreen",
  components: {
    AboutModal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>
