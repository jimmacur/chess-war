// PlayVsComputer.vue
<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Player Score and Avatar -->
    <div class="absolute top-8 left-12 flex items-center space-x-4">
      <img
        :src="playerData.avatar.src || '/src/assets/default-avatar.png'"
        :alt="playerData.avatar.name || 'Player Avatar'"
        class="w-16 h-16 rounded-full"
      />
      <div class="w-32 h-24 bg-gray-800 text-white p-2 rounded shadow-lg flex flex-col items-center justify-center">
        <h2 class="text-sm font-semibold text-center">{{ playerData.name }}</h2>
        <p class="text-2xl font-bold">{{ playerScore }}</p>
      </div>
    </div>

    <!-- Player Pieces -->
    <div class="absolute top-40 left-8 grid grid-cols-3 gap-2">
      <img
        v-for="piece in playerPieces"
        :key="piece.id"
        :src="piece.src"
        :alt="piece.name"
        class="w-20 h-20"
      />
    </div>

    <!-- Title -->
    <h1 class="text-4xl font-bold text-center mt-16 mb-10">Chess War</h1>

    <!-- Computer Score and Avatar -->
    <div class="absolute top-8 right-12 flex items-center space-x-4">
      <div class="w-32 h-24 bg-gray-800 text-white p-2 rounded shadow-lg flex flex-col items-center justify-center">
        <h2 class="text-sm font-semibold text-center">Computer</h2>
        <p class="text-2xl font-bold">{{ computerScore }}</p>
      </div>
      <img
        :src="computerData.avatar.src || '/src/assets/default-avatar.png'"
        :alt="computerData.avatar.name || 'Computer Avatar'"
        class="w-16 h-16 rounded-full"
      />
    </div>

    <!-- Computer Pieces -->
    <div class="absolute top-40 right-8 grid grid-cols-3 gap-2">
      <img
        v-for="piece in computerPieces"
        :key="piece.id"
        :src="piece.src"
        :alt="piece.name"
        class="w-20 h-20"
      />
    </div>

    <!-- Chess Board -->
    <div class="flex items-center justify-center w-full max-w-2xl h-80 bg-gray-800 rounded-lg shadow-lg mx-auto relative">
      <p v-if="!activePieces.length" class="text-gray-400">Battle field is ready</p>

      <!-- Active Pieces -->
      <div v-if="activePieces.length === 2" class="flex justify-center items-center">
        <div class="flex flex-col items-center space-y-2">
          <img :src="activePieces[0].src" :alt="activePieces[0].name" class="w-12 h-12" />
          <p class="text-sm">Classical Value: {{ activePieces[0].classicalValue }}</p>
          <p class="text-lg font-bold">Battle Value: {{ playerPieceValue }}</p>
        </div>
        <div class="text-2xl font-bold mx-4">VS</div>
        <div class="flex flex-col items-center space-y-2">
          <img :src="activePieces[1].src" :alt="activePieces[1].name" class="w-12 h-12" />
          <p class="text-sm">Classical Value: {{ activePieces[1].classicalValue }}</p>
          <p class="text-lg font-bold">Battle Value: {{ computerPieceValue }}</p>
        </div>
      </div>
    </div>

    <!-- Battle Holding Zone -->
    <div class="mt-10 flex justify-center">
      <div v-if="holdingZone.length" class="text-center">
        <h3 class="text-lg font-bold mb-4">War Chest</h3>
        <div class="flex flex-wrap justify-center gap-4 max-w-lg mx-auto">
          <img
            v-for="(piece, index) in holdingZone"
            :key="index"
            :src="piece.src"
            :alt="piece.name"
            class="w-12 h-12"
          />
        </div>
      </div>
    </div>

    <!-- Begin Button -->
    <div class="mt-10 flex justify-center">
      <button
        class="btn"
        @click="isBattleMode ? battle() : beginBattle()"
        :disabled="!canBattle"
      >
        {{ isBattleMode ? "Battle" : "Begin" }}
      </button>
    </div>

    <!-- Back to Home -->
    <div class="mt-10 flex justify-center">
      <router-link to="/" class="btn">
        Back to Home
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
interface ChessPiece {
  id: string;
  src: string;
  name: string;
  classicalValue: number;
}

interface PlayerData {
  name: string;
  side: 'white' | 'black';
  avatar: {
    src: string;
    name: string;
  };
}

export default {
  name: "PlayVsComputer",
  data() {
    return {
      playerData: {
        name: "Player",
        side: "white",
        avatar: { src: "/src/assets/default-avatar.png", name: "Player Avatar" },
      } as PlayerData,
      computerData: {
        name: "Computer",
        side: "black",
        avatar: { src: "/src/assets/default-avatar.png", name: "Computer Avatar" },
      } as PlayerData,
      playerPieces: [] as ChessPiece[],
      computerPieces: [] as ChessPiece[],
      activePieces: [] as ChessPiece[],
      playerScore: 0,
      computerScore: 0,
      playerPieceValue: 0,
      computerPieceValue: 0,
      isBattleMode: false,
      holdingZone: [] as ChessPiece[],
    };
  },
  computed: {
    canBattle(): boolean {
      return (
        (!this.isBattleMode && this.playerPieces.length > 0 && this.computerPieces.length > 0) ||
        (this.isBattleMode && this.activePieces.length === 2)
      );
    },
  },
  mounted() {
    this.loadPlayerData();
    this.initializePieces();
  },
  methods: {
    loadPlayerData() {
      const storedPlayerData = sessionStorage.getItem("playerData");
      const storedComputerData = sessionStorage.getItem("computerData");

      if (storedPlayerData) {
        const parsed = JSON.parse(storedPlayerData);
        this.playerData = {
          name: parsed.name || "Player",
          side: parsed.side || "white",
          avatar: {
            src: parsed.avatar?.src || "/src/assets/default-avatar.png",
            name: parsed.avatar?.name || "Player Avatar",
          },
        };
      }

      if (storedComputerData) {
        const parsed = JSON.parse(storedComputerData);
        this.computerData = {
          name: parsed.name || "Computer",
          side: parsed.side || "black",
          avatar: {
            src: parsed.avatar?.src || "/src/assets/default-avatar.png",
            name: parsed.avatar?.name || "Computer Avatar",
          },
        };
      }
    },
    initializePieces() {
      const generatePieces = (side: 'white' | 'black'): ChessPiece[] => {
        const pieces: ChessPiece[] = [];
        const piecesConfig = [
          { name: 'pawn', value: 1, count: 8 },
          { name: 'bishop', value: 3, count: 2 },
          { name: 'knight', value: 3, count: 2 },
          { name: 'rook', value: 5, count: 2 },
          { name: 'queen', value: 9, count: 1 },
        ];

        piecesConfig.forEach(({ name, value, count }) => {
          for (let i = 0; i < count; i++) {
            pieces.push({
              id: `${side}-${name}-${i}`,
              src: `/src/assets/pieces/${side}-${name}.svg`,
              name: `${side} ${name}`,
              classicalValue: value,
            });
          }
        });

        return pieces;
      };

      this.playerPieces = generatePieces(this.playerData.side);
      this.computerPieces = generatePieces(this.computerData.side);
    },
    getRandomPiece(pieces: ChessPiece[]): ChessPiece | null {
      if (pieces.length === 0) return null;
      
      const randomIndex = Math.floor(Math.random() * pieces.length);
      return pieces.splice(randomIndex, 1)[0];
    },
    beginBattle() {
      const playerPiece = this.getRandomPiece(this.playerPieces);
      const computerPiece = this.getRandomPiece(this.computerPieces);

      if (playerPiece && computerPiece) {
        this.activePieces = [playerPiece, computerPiece];
        this.playerPieceValue = this.getRandomValue(playerPiece.classicalValue);
        this.computerPieceValue = this.getRandomValue(computerPiece.classicalValue);
        this.isBattleMode = true;
      }
    },
    battle() {
      if (this.activePieces.length !== 2) return;

      const [playerPiece, computerPiece] = this.activePieces;
      
      // Show the result of the battle
      if (this.playerPieceValue > this.computerPieceValue) {
        this.playerScore += playerPiece.classicalValue + computerPiece.classicalValue;
        this.holdingZone.forEach(piece => {
          this.playerScore += piece.classicalValue;
        });
        this.holdingZone = [];
      } else if (this.computerPieceValue > this.playerPieceValue) {
        this.computerScore += playerPiece.classicalValue + computerPiece.classicalValue;
        this.holdingZone.forEach(piece => {
          this.computerScore += piece.classicalValue;
        });
        this.holdingZone = [];
      } else {
        // It's a tie, move pieces to the holding zone
        this.holdingZone.push(playerPiece, computerPiece);
      }

      this.activePieces = [];
      this.isBattleMode = false;
    },
    getRandomValue(max: number): number {
      return Math.floor(Math.random() * (max + 1));
    },
  },
};
</script>