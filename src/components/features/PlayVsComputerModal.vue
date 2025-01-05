<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-gray-700 text-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto relative" >
      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
      ⚔️
      </button>

      <!-- Title -->
      <h1 class="text-2xl font-bold mb-4 text-center">Play vs. Computer</h1>

      <!-- Player Name Input -->
      <div class="mb-4">
        <label for="playerName" class="block font-semibold mb-2">
          Player Name: <span class="text-red-500">*</span>
        </label>
        <input
          id="playerName"
          ref="playerNameInput"
          type="text"
          v-model="playerName"
          :class="[
            'w-full p-2 rounded bg-gray-200 text-black focus:outline-none focus:ring-2',
            playerNameError ? 'border-red-500 focus:ring-red-500' : 'border-gray-500 focus:ring-blue-500',
          ]"
        />
        <p v-if="playerNameError" class="text-red-500 text-sm mt-2">Player Name is required.</p>
      </div>

      <!-- Choose Side -->
      <div class="mb-4">
        <p class="font-semibold mb-2">Choose Your Side:</p>
        <div class="flex space-x-4">
          <button
            :class="side === 'black' ? 'bg-blue-500' : 'bg-gray-700'"
            class="p-2 rounded text-white focus:outline-none"
            @click="side = 'black'"
          >
            Black Pieces
          </button>
          <button
            :class="side === 'white' ? 'bg-blue-500' : 'bg-gray-700'"
            class="p-2 rounded text-white focus:outline-none"
            @click="side = 'white'"
          >
            White Pieces
          </button>
        </div>
      </div>

      <!-- Choose Avatar -->
      <div class="mb-4">
        <p class="font-semibold mb-2">Choose Your Avatar:</p>
        <div class="grid grid-cols-3 gap-4">
          <div
            v-for="(avatar, index) in avatars"
            :key="index"
            class="cursor-pointer p-2 rounded-lg hover:bg-gray-700 transition"
            :class="selectedAvatar === avatar ? 'ring-4 ring-blue-500' : ''"
            @click="selectedAvatar = avatar"
          >
            <img :src="avatar.src" alt="Avatar" class="w-24 h-24 mx-auto rounded-full" />
            <p class="text-center text-sm mt-2">{{ avatar.name }}</p>
          </div>
        </div>
      </div>

      <!-- Begin Button -->
      <div class="text-center mt-6">
        <button
          class="btn"
          @click="validateAndStart"
        >
          Begin
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface Avatar {
  src: string;
  name: string;
}

export default {
  name: "PlayVsComputerModal",
  data() {
    return {
      playerName: "",
      playerNameError: false,  
      side: "black",
      selectedAvatar: null as Avatar | null,
      avatars: [
        { src: "/assets/avatars/bishopofbling.png", name: "Bishop of Bling" },
        { src: "/assets/avatars/pawnderer.png", name: "Pawnderer" },
        { src: "/assets/avatars/queenbee.png", name: "Queen Bee" },
        { src: "/assets/avatars/knightrider.png", name: "Knight Rider" },
        { src: "/assets/avatars/techknight.png", name: "Tech Knight" },
        { src: "/assets/avatars/knightmare.png", name: "Knightmare" },
        { src: "/assets/avatars/steampunkbishop.png", name: "Steampunk Bishop" },
        { src: "/assets/avatars/checkmatey.png", name: "Check Matey" },
        { src: "/assets/avatars/rookzilla.png", name: "Rookzilla" },
    ],  
    };
  },
  created() {
    if (this.avatars.length > 0) {
      this.selectedAvatar = this.avatars[0];
    }
  },
  methods: {
    validateAndStart() {
      this.playerNameError = this.playerName.trim() === "";

      if (this.playerNameError) {
        // Focus the input field if validation fails
        (this.$refs.playerNameInput as HTMLInputElement)?.focus();
        return;
      }

      if (!this.selectedAvatar) {
        alert("Please select an avatar before starting the game.");
        return;
      }

      this.startGame();
    },
    startGame() {
      const computerAvatar = this.avatars[Math.floor(Math.random() * this.avatars.length)];

      const playerData = {
        name: this.playerName || "Player",
        side: this.side,
        avatar: this.selectedAvatar,
      };

      const computerData = {
        name: "Computer",
        side: this.side === "black" ? "white" : "black",
        avatar: computerAvatar,
      };

      sessionStorage.setItem("playerData", JSON.stringify(playerData));
      sessionStorage.setItem("computerData", JSON.stringify(computerData));

      this.$router.push("/game/computer");
    },
  },
};
</script>

<style scoped>

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: #4a5568;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2d3748;
}
</style>