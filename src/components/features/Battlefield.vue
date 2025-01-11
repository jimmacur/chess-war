<template>
  <div
    class="relative mx-auto flex flex-col items-center justify-center mt-10 md:mt-6 lg:mt-3 bg-[#D9C2A3] rounded-lg shadow-2xl"
    :class="[
      'w-[300px] h-[400px]',
      'md:w-[400px] md:h-[450px]', 
      'lg:w-[400px] lg:h-[450px]', 
    ]"
  >
    <!-- Winner Message -->
    <div v-if="winnerMessage" class="absolute text-center top-4 font-bold mb-2">
      <p class="text-2xl text-red-600">Spoils of War!</p>
      <p class="text-xl text-black" >{{ winnerMessage }}</p>
    </div>

    <!-- Battlefield Content -->
    <p v-if="!activePieces.length" class="text-black text-3xl">Battlefield is ready</p>

    <!-- Active Pieces -->
    <div v-if="activePieces.length === 2" class="absolute flex justify-center items-center space-x-8">
      <ActivePiece
        :piece="activePieces[0]"
        :isActivelyBattling="isActivelyBattling"
        :showBattleValues="showBattleValues"
        :battleResult="battleResult === 'player'"
        :battleValue="playerPieceValue"
        :classicalValue="activePieces[0].classicalValue"
        position="player"
      />
      <div class="text-2xl text-black font-bold">VS</div>
      <ActivePiece
        :piece="activePieces[1]"
        :isActivelyBattling="isActivelyBattling"
        :showBattleValues="showBattleValues"
        :battleResult="battleResult === 'computer'"
        :battleValue="computerPieceValue"
        :classicalValue="activePieces[1].classicalValue"
        position="computer"
      />
    </div>

    <!-- Battle Bench -->
    <BattleBench :pieces="battleBench" />
  </div>
</template>

<script lang="ts">
import ActivePiece from './ActivePiece.vue';
import BattleBench from './BattleBench.vue';

interface ChessPiece {
  id: string;
  src: string;
  name: string;
  classicalValue: number;
}

export default {
  name: 'Battlefield',
  components: {
    ActivePiece,
    BattleBench,
  },
  props: {
    activePieces: {
      type: Array as () => ChessPiece[],
      required: true,
    },
    isActivelyBattling: {
      type: Boolean,
      required: true,
    },
    showBattleValues: {
      type: Boolean,
      required: true,
    },
    battleResult: {
      type: String,
      required: true,
    },
    playerPieceValue: {
      type: Number,
      required: true,
    },
    computerPieceValue: {
      type: Number,
      required: true,
    },
    battleBench: {
      type: Array as () => ChessPiece[],
      required: true,
    },
    playerData: {
      type: Object as () => { name: string },
      required: true,
    },
    computerData: {
      type: Object as () => { name: string },
      required: true,
    },
  },
  computed: {
    winnerMessage(): string | null {

      if (!this.showBattleValues || this.activePieces.length !== 2) return null;

      const totalBattleBenchValue = this.battleBench.reduce(
        (acc, piece) => acc + piece.classicalValue,
        0
      );
      
      let pointsWon = 0;
      
      if (this.battleResult === 'player' || this.battleResult === 'computer') {
        pointsWon = this.activePieces[0].classicalValue + 
                    this.activePieces[1].classicalValue + 
                    totalBattleBenchValue;
      
      } else if (this.battleResult === 'tie') {
        return "Tie! Pieces go to the battle bench.";
      }

      if (this.battleResult === 'player') {
        return `${this.playerData.name} has won ${pointsWon} points!`;
      } else if (this.battleResult === 'computer') {
        return `${this.computerData.name} has won ${pointsWon} points!`;
      }
      
      return null;
    }
  }
};
</script>