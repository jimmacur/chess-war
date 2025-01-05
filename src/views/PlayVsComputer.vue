// PlayVsComputer.vue
<template>
  <div class="min-h-screen">
    <!-- Title -->
    <div class="w-full max-w-screen-xl mx-auto text-center mt-5 pt-0 sm:pt-4">
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
        Chess War
      </h1>
    </div>

    <!-- Player Score (Absolute Left) -->
    <ScoreCard
      :name="playerData.name"
      :avatarSrc="playerData.avatar.src"
      :score="playerScore"
      class="absolute top-4 left-0 sm:left-8 sm:top-8 md:left-8"
    />

    <!-- Computer Score (Absolute Right) -->
    <ScoreCard
      :name="computerData.name"
      :avatarSrc="computerData.avatar.src"
      :score="computerScore"
      class="absolute top-4 right-4 sm:right-8 sm:top-8 md:right-8"
    />

    <div class="flex flex-row align-middle justify-center mt-10">
      <!-- Player Pieces -->
      <Pieces
        v-if="playerPieces.length > 0" 
        :pieces="playerPieces" 
        position="left" 
      />

      <!-- Computer Pieces -->
      <Pieces 
        v-if="computerPieces.length > 0"
        :pieces="computerPieces" 
        position="right" 
      />

      <!-- Battlefield -->
      <Battlefield
        :activePieces="activePieces"
        :isActivelyBattling="isActivelyBattling"
        :showBattleValues="showBattleValues"
        :battleResult="battleResult"
        :playerPieceValue="playerPieceValue"
        :computerPieceValue="computerPieceValue"
        :battleBench="battleBench"
      />
    </div>

    <!-- Buttons -->
    <div class="flex flex-col items-center justify-center mt-8 space-y-4 sm:space-y-0 sm:flex-row sm:justify-center">
      <!-- Battle Button -->
      <div class="flex justify-center">
        <button
          class="btn w-48 text-center"
          :disabled="!canBattle || isButtonDisabled || !activePiecesValid"
          @click="isBattleMode ? battle() : beginBattle()"
        >
          {{ isBattleMode ? "Battle" : "Prepare for battle" }}
        </button>
      </div>

      <!-- Back to Home -->
      <button class="btn sm:absolute sm:bottom-8 sm:right-8 sm:w-auto">
        <router-link to="/">Retreat 🐓</router-link>
      </button>
    </div>

    <!-- Winner Modal -->
    <WinnerModal :show="showWinnerModal" :winner="winner" @reset="resetGame" />
  </div>
</template>

<script lang="ts">
import ScoreCard from "../components/features/ScoreCard.vue";
import Pieces from "../components/features/Pieces.vue";
import Battlefield from "../components/features/Battlefield.vue";
import WinnerModal from "../components/features/WinnerModal.vue";

interface ChessPiece {
  id: string;
  src: string;
  name: string;
  classicalValue: number;
}

interface PlayerData {
  name: string;
  side: "white" | "black";
  avatar: {
    src: string;
    name: string;
  };
}

export default {
  name: "PlayVsComputer",
  components: { ScoreCard, Pieces, Battlefield, WinnerModal },
  data() {
    return {
      playerData: {
        name: "Player",
        side: "white",
        avatar: {
          src: "/assets/default-avatar.png",
          name: "Player Avatar",
        },
      } as PlayerData,
      computerData: {
        name: "Computer",
        side: "black",
        avatar: {
          src: "/assets/default-avatar.png",
          name: "Computer Avatar",
        },
      } as PlayerData,
      showWinnerModal: false,
      winner: null as {
        name: string;
        avatar: { src: string; name: string };
        score: number;
      } | null,
      playerPieces: [] as ChessPiece[],
      computerPieces: [] as ChessPiece[],
      activePieces: [] as ChessPiece[],
      playerScore: 0,
      computerScore: 0,
      playerPieceValue: 0,
      computerPieceValue: 0,
      isBattleMode: false,
      isActivelyBattling: false,
      showBattleValues: false,
      battleResult: "",
      battleBench: [] as ChessPiece[],
      isButtonDisabled: false,
    };
  },
  computed: {
    canBattle(): boolean {
      return (
        (!this.isBattleMode &&
          this.playerPieces.length > 0 &&
          this.computerPieces.length > 0) ||
        (this.isBattleMode && this.activePieces.length === 2)
      );
    },
    activePiecesValid(): boolean {
      return (
        (this.isBattleMode && this.activePieces.length === 2) ||
        (!this.isBattleMode &&
          this.playerPieces.length > 0 &&
          this.computerPieces.length > 0)
      );
    },
  },
  mounted() {
    this.loadPlayerData();
    this.playerPieces = this.initializePieces(this.playerData.side);
    this.computerPieces = this.initializePieces(this.computerData.side);
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
            src: parsed.avatar?.src || "/assets/default-avatar.png",
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
            src: parsed.avatar?.src || "/assets/default-avatar.png",
            name: parsed.avatar?.name || "Computer Avatar",
          },
        };
      }
    },
    initializePieces(side: "white" | "black"): ChessPiece[] {
      const pieces: ChessPiece[] = [];
      const piecesConfig = [
        { name: "pawn", value: 1, count: 8 },
        { name: "bishop", value: 3, count: 2 },
        { name: "knight", value: 3, count: 2 },
        { name: "rook", value: 5, count: 2 },
        { name: "queen", value: 9, count: 1 },
      ];

      piecesConfig.forEach(({ name, value, count }) => {
        for (let i = 0; i < count; i++) {
          pieces.push({
            id: `${side}-${name}-${i}`,
            src: `/assets/pieces/${side}-${name}.svg`,
            name: `${side} ${name}`,
            classicalValue: value,
          });
        }
      });

      return pieces;
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
        this.computerPieceValue = this.getRandomValue(
          computerPiece.classicalValue
        );
        this.isBattleMode = true;
        this.isActivelyBattling = false;
      }
    },
    battle() {
      if (this.activePieces.length !== 2) return;
      this.isButtonDisabled = true;

      const [playerPiece, computerPiece] = this.activePieces;
      this.isActivelyBattling = true;

      this.playerPieceValue = this.getRandomValue(playerPiece.classicalValue);
      this.computerPieceValue = this.getRandomValue(
        computerPiece.classicalValue
      );
      this.showBattleValues = true;

      if (this.playerPieceValue > this.computerPieceValue) {
        this.battleResult = "player";
        this.playerScore +=
          playerPiece.classicalValue + computerPiece.classicalValue;
        this.battleBench.forEach((piece) => {
          this.playerScore += piece.classicalValue;
        });

        this.battleBench = [];
      } else if (this.computerPieceValue > this.playerPieceValue) {
        this.battleResult = "computer";
        this.computerScore +=
          playerPiece.classicalValue + computerPiece.classicalValue;

        this.battleBench.forEach((piece) => {
          this.computerScore += piece.classicalValue;
        });

        this.battleBench = [];
      } else {
        this.battleResult = "tie";
        this.battleBench.push(playerPiece, computerPiece);
      }

      setTimeout(() => {
        if (
          this.playerPieces.length === 0 &&
          this.computerPieces.length === 0
        ) {
          this.declareWinner();
        } else {
          this.resetActivePieces();
          this.isButtonDisabled = false;
        }
      }, 1000);
    },
    declareWinner() {
      this.winner =
        this.playerScore > this.computerScore
          ? {
              name: this.playerData.name,
              avatar: this.playerData.avatar,
              score: this.playerScore,
            }
          : {
              name: this.computerData.name,
              avatar: this.computerData.avatar,
              score: this.computerScore,
            };
      this.showWinnerModal = true;
    },
    resetActivePieces() {
      this.activePieces = [];
      this.showBattleValues = false;
      this.battleResult = "";
      this.isBattleMode = false;
      this.isActivelyBattling = false;
    },
    getRandomValue(max: number): number {
      return Math.floor(Math.random() * (max + 1));
    },
    resetGame() {
      this.showWinnerModal = false;
      this.playerScore = 0;
      this.computerScore = 0;
      this.playerPieces = this.initializePieces(this.playerData.side);
      this.computerPieces = this.initializePieces(this.computerData.side);
      this.activePieces = [];
      this.battleBench = [];
      this.battleResult = "";
      this.playerPieceValue = 0;
      this.computerPieceValue = 0;
      this.isBattleMode = false;
      this.isButtonDisabled = false;
      this.isActivelyBattling = false;
      this.showBattleValues = false;
    },
  },
};
</script>
