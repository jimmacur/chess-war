<template>
  <div class="relative mx-auto flex items-center justify-center w-[400px] h-[450px] bg-[#D9C2A3] rounded-lg shadow-2xl mt-5">
    <p v-if="!activePieces.length" class="text-black text-3xl">Battlefield is ready</p>

    <!-- Active Pieces -->
    <div v-if="activePieces.length === 2" class="absolute flex justify-center items-center space-x-8">
      <ActivePiece
        :piece="activePieces[0]"
        :isActivelyBattling="isActivelyBattling"
        :showBattleValues="showBattleValues"
        :battleResult="battleResult === 'player'"
        :battleValue="playerPieceValue"
        position="player"
      />
      <div class="text-2xl text-black font-bold">VS</div>
      <ActivePiece
        :piece="activePieces[1]"
        :isActivelyBattling="isActivelyBattling"
        :showBattleValues="showBattleValues"
        :battleResult="battleResult === 'computer'"
        :battleValue="computerPieceValue"
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
  },
};
</script>