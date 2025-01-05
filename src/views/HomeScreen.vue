<template>
  <div class="min-h-screen flex flex-col justify-center items-center space-y-4 sm:space-y-6 md:space-y-8">
    <!-- Title -->
    <h1 class="text-6xl sm:text-7xl md:text-8xl font-bold text-center">Chess War</h1>

    <!-- Logo -->
    <div>
      <img
        src="../../public/assets/logo.jpg"
        alt="Chess War Logo"
        class="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-lg rounded-lg shadow-2xl mx-auto "
      />
    </div>

    <!-- Buttons -->
    <div class="w-full max-w-xs sm:max-w-md md:max-w-lg flex flex-col sm:flex-row items-center md: justify-between">
      <button @click="openModal('playVsComputer')" class="btn">Play vs. Bot</button>
      <router-link to="/game/friend" class="btn inline-block">Play vs. Friend</router-link>
      <button @click="openModal('about')" class="btn">About</button>
    </div>

    <!-- Modals -->
    <AboutModal
      v-if="currentModal === 'about'"
      @close="closeModal"
    ></AboutModal>
    <PlayVsComputerModal
      v-if="currentModal === 'playVsComputer'"
      @close="closeModal"
    ></PlayVsComputerModal>
  </div>
</template>

<script lang="ts">
import AboutModal from "../components/features/AboutChessWar.vue";
import PlayVsComputerModal from "../components/features/PlayVsComputerModal.vue";

export default {
  name: "HomeScreen",
  components: {
    AboutModal,
    PlayVsComputerModal,
  },
  data() {
    return {
      currentModal: null as string | null,
    };
  },
  methods: {
    openModal(modalName: string) {
      this.currentModal = modalName;
    },
    closeModal() {
      this.currentModal = null;
    },
  },
};
</script>