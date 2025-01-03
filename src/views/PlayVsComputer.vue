<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Player Score and Avatar -->
    <div class="absolute top-8 left-8 flex items-center space-x-4">
      <!-- Player Avatar -->
      <img
        :src="playerData.avatar?.src"
        :alt="playerData.avatar?.name"
        class="w-16 h-16 rounded-full"
      />
      <!-- Player Score Box -->
      <div class="w-32 h-24 bg-gray-800 text-white p-2 rounded shadow-lg flex flex-col items-center justify-center">
        <h2 class="text-sm font-semibold text-center truncate">{{ playerData.name }}</h2>
        <p class="text-2xl font-bold">{{ playerScore }}</p>
      </div>
    </div>

    <!-- Player Pieces -->
    <div class="absolute top-40 left-8 grid grid-cols-3 gap-2">
      <img
        v-for="(piece, index) in playerPieces"
        :key="index"
        :src="piece"
        alt="Piece"
        class="w-20 h-20"
      />
    </div>

    <!-- Title -->
    <h1 class="text-4xl font-bold text-center mt-16 mb-10">Chess War</h1>

    <!-- Computer Score and Avatar -->
    <div class="absolute top-8 right-8 flex items-center space-x-4">
      <!-- Computer Score Box -->
      <div class="w-32 h-24 bg-gray-800 text-white p-2 rounded shadow-lg flex flex-col items-center justify-center">
        <h2 class="text-sm font-semibold text-center">Computer</h2>
        <p class="text-2xl font-bold">{{ computerScore }}</p>
      </div>
      <!-- Computer Avatar -->
      <img
        :src="computerData.avatar.src"
        alt="Computer Avatar"
        class="w-16 h-16 rounded-full"
      />
    </div>

    <!-- Computer Pieces -->
    <div class="absolute top-40 right-8 grid grid-cols-3 gap-2">
      <img
        v-for="(piece, index) in computerPieces"
        :key="index"
        :src="piece"
        alt="Piece"
        class="w-20 h-20"
      />
    </div>

    <!-- Chess Board Placeholder -->
    <div class="flex items-center justify-center w-full max-w-2xl h-80 bg-gray-800 rounded-lg shadow-lg mx-auto">
      <p class="text-gray-400">Chess Board Goes Here</p>
    </div>

    <!-- Back to Home -->
    <div class="mt-10 flex justify-center">
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
        name: "Player", 
        side: "white",
        avatar: { src: "/src/assets/default-avatar.png", name: "Default Avatar" }, // 
      },
      computerData: {
        name: "Computer",
        side: "black",
        avatar: { src: "/src/assets/default-avatar.png", name: "Default Avatar" }, // Default avatar
      },
      playerScore: 0,
      computerScore: 0,
      playerPieces: [] as string[],
      computerPieces: [] as string[],
    };
  },
  mounted() {
    try {
      // Retrieve player and computer data
      const storedPlayerData = sessionStorage.getItem("playerData");
      if (storedPlayerData) {
        this.playerData = JSON.parse(storedPlayerData);
      }
      const storedComputerData = sessionStorage.getItem("computerData");
      if (storedComputerData) {
        this.computerData = JSON.parse(storedComputerData);
      }

      // Set pieces based on sides
      this.playerPieces = this.getPieces(this.playerData.side);
      this.computerPieces = this.getPieces(this.computerData.side);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  },
  methods: {
    getPieces(side: string) {
      const basePath = `/src/assets/pieces/${side}-`;
      return [
        ...Array(8).fill(`${basePath}pawn.svg`),
        `${basePath}bishop.svg`,
        `${basePath}bishop.svg`,
        `${basePath}knight.svg`,
        `${basePath}knight.svg`,
        `${basePath}rook.svg`,
        `${basePath}rook.svg`,
        `${basePath}queen.svg`,
        `${basePath}king.svg`,
      ];
    },
  },
};
</script>