<template>
  <div>
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
      <button @click="openModal('playVsComputer')" class="btn">Play vs. Computer</button>
      <router-link to="/game/friend" class="btn">Play vs. Friend</router-link>
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