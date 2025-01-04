// PlayVsComputer.vue
<template>
  <div class="min-h-screen">
    
    <!-- Title -->
    <h1 class="text-6xl font-bold text-center mt-16">Chess War</h1>
    
    <!-- Player Score -->
    <ScoreCard
      :name="playerData.name"
      :avatarSrc="playerData.avatar.src"
      :score="playerScore"
      class="absolute top-8 left-12"
    />
    
    <!-- Computer Score -->
    <ScoreCard
      :name="computerData.name"
      :avatarSrc="computerData.avatar.src"
      :score="computerScore"
      class="absolute top-8 right-12"
    />

    <!-- Player Pieces -->
    <Pieces :pieces="playerPieces" position="left" />

    <!-- Computer Pieces -->
    <Pieces :pieces="computerPieces" position="right" />

    <!-- Battlefield -->
    <div class="relative mx-auto flex items-center justify-center w-[400px] h-[450px] bg-[#D9C2A3] rounded-lg shadow-2xl mt-5">
      <p v-if="!activePieces.length" class="text-black text-3xl">Battlefield is ready</p>

      <!-- Active Pieces -->
      <div v-if="activePieces.length === 2" class="absolute flex justify-center items-center space-x-8">
        <!-- Player Piece -->
        <div class="flex flex-col items-center space-y-2">
          <img
            :src="activePieces[0].src"
            :alt="activePieces[0].name"
            :data-piece-id="activePieces[0].id"
            class="w-[120px] h-[120px] transition-all"
            :class="battleResult === 'player' ? 'scale-125' : ''"
          />
          <div class="flex flex-col items-center space-y-1">
            <p class="text-sm text-black">
              {{ isActivelyBattling ? "Battle" : "Potential" }}
            </p>
            <p class="text-sm text-black">Power</p>
            <p v-if="!showBattleValues" class="text-2xl font-bold text-black">{{ activePieces[0].classicalValue }}</p>
            <p
              v-if="showBattleValues"
              class="text-2xl font-bold text-black transition-all"
              :class="battleResult === 'player' ? 'text-green-500 scale-150' : ''"
            >
              {{ playerPieceValue }}
            </p>
          </div>
        </div>
        <div class="text-2xl text-black font-bold">VS</div>
        <!-- Computer Piece -->
        <div class="flex flex-col items-center space-y-2">
          <img
            :src="activePieces[1].src"
            :alt="activePieces[1].name"
            :data-piece-id="activePieces[1].id"
            class="w-[120px] h-[120px] transition-all"
            :class="battleResult === 'computer' ? 'scale-125' : ''"
          />
          <div class="flex flex-col items-center space-y-1">
            <p class="text-sm text-black">
              {{ isActivelyBattling ? "Battle" : "Potential" }}
            </p>
            <p class="text-sm text-black">Power</p>
            <p v-if="!showBattleValues" class="text-2xl font-bold text-black">{{ activePieces[1].classicalValue }}</p>
            <p
              v-if="showBattleValues"
              class="text-2xl font-bold text-black transition-all"
              :class="battleResult === 'computer' ? 'text-green-500 scale-150' : ''"
            >
              {{ computerPieceValue }}
            </p>
          </div>
        </div>
      </div>

      <!-- Battle Bench -->
      <div class="absolute bottom-2 left-2 flex items-center space-x-2">
        <p v-if="battleBench.length > 0" class="text-black text-sm">Battle Bench:</p>
        <img
          v-for="piece in battleBench"
          :key="piece.id"
          :src="piece.src"
          :alt="piece.name"
          class="w-8 h-8"
        />
      </div>
    </div>

    <!-- Battle Button -->
    <div class="flex justify-center">
      <button
        class="btn"
        @click="isBattleMode ? battle() : beginBattle()"
        :disabled="!canBattle"
      >
        {{ isBattleMode ? "Battle" : "Prepare for battle" }}
      </button>
    </div>

    <!-- Back to Home -->
    <div class="flex justify-center">
      <router-link to="/" class="btn">
        Retreat  🐓
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import ScoreCard from "../components/features/ScoreCard.vue";
import Pieces from "../components/features/Pieces.vue";

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
  components: { ScoreCard, Pieces },
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
      isActivelyBattling: false,
      battleBench: [] as ChessPiece[],
      showBattleValues: false,
      battleResult: "",
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
        this.isActivelyBattling = false;
      }
    },
    battle() {
      if (this.activePieces.length !== 2) return;

      const [playerPiece, computerPiece] = this.activePieces;
      this.isActivelyBattling = true;

      // Determine battle values
      this.playerPieceValue = this.getRandomValue(playerPiece.classicalValue);
      this.computerPieceValue = this.getRandomValue(computerPiece.classicalValue);

      // Reveal battle values
      this.showBattleValues = true;

      // Determine winner
      if (this.playerPieceValue > this.computerPieceValue) {
        this.battleResult = 'player';
        this.playerScore += playerPiece.classicalValue + computerPiece.classicalValue;
        this.battleBench.forEach(piece => {
          this.playerScore += piece.classicalValue;
        });
        this.battleBench = [];
      } else if (this.computerPieceValue > this.playerPieceValue) {
        this.battleResult = 'computer';
        this.computerScore += playerPiece.classicalValue + computerPiece.classicalValue;
        this.battleBench.forEach(piece => {
          this.computerScore += piece.classicalValue;
        });
        this.battleBench = [];
      } else {
        this.battleResult = 'tie';
        this.battleBench.push(playerPiece, computerPiece);
      }

      // Trigger animations
      setTimeout(() => {
        if (this.battleResult === 'player') {
          this.animateToPlayerCorner(playerPiece, computerPiece);
        } else if (this.battleResult === 'computer') {
          this.animateToComputerCorner(playerPiece, computerPiece);
        } else {
          this.resetActivePieces();
        }
      }, 1000);
    },
    getRandomValue(max: number): number {
      return Math.floor(Math.random() * (max + 1));
    },
    animateToPlayerCorner(playerPiece: ChessPiece, computerPiece: ChessPiece) {
      this.animatePiece(playerPiece, 'float-to-player');
      this.animatePiece(computerPiece, 'dissolve');
      setTimeout(() => {
        this.resetActivePieces();
      }, 1000);
    },
    animateToComputerCorner(playerPiece: ChessPiece, computerPiece: ChessPiece) {
      this.animatePiece(playerPiece, 'dissolve');
      this.animatePiece(computerPiece, 'float-to-computer');
      setTimeout(() => {
        this.resetActivePieces();
      }, 1000);
    },
    animatePiece(piece: ChessPiece, animationClass: string) {
      const pieceElement = document.querySelector(`[data-piece-id="${piece.id}"]`);
      if (pieceElement) {
        pieceElement.classList.add(animationClass);
        setTimeout(() => {
          pieceElement.classList.remove(animationClass);
        }, 1000);
      }
    },
    resetActivePieces() {
      this.activePieces = [];
      this.showBattleValues = false;
      this.battleResult = '';
      this.isBattleMode = false;
      this.isActivelyBattling = false;
    },
  },
};
</script>

<style scoped>
@keyframes dissolve {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
}

@keyframes float-to-player {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 1;
    transform: translate(-300px, -200px) scale(0.5);
  }
}

@keyframes float-to-computer {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 1;
    transform: translate(300px, -200px) scale(0.5);
  }
}

.dissolve {
  animation: dissolve 1s forwards;
}

.float-to-player {
  animation: float-to-player 1s forwards;
}

.float-to-computer {
  animation: float-to-computer 1s forwards;
}
</style>