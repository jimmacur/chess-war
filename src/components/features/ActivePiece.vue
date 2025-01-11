<template>
  <div class="flex flex-col items-center space-y-2">
    <img
      :src="piece.src"
      :alt="piece.name"
      :data-piece-id="piece.id"
      class="w-[120px] h-[120px] transition-all"
      :class="battleResult ? 'scale-125' : ''"
    />
    <div class="flex flex-col items-center space-y-1">
      <p class="text-sm text-black">
        {{ isActivelyBattling ? "Battle" : "Potential" }}
      </p>
      <p class="text-sm text-black">Power</p>
      <p v-if="!showBattleValues" class="text-2xl font-bold text-black">{{ piece.classicalValue }}</p>
      <p
        v-if="showBattleValues"
        class="text-2xl font-bold text-black transition-all"
        :class="battleResult ? 'text-green-500 scale-150' : ''"
      >
        {{ battleValue }}
      </p>
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

export default {
  name: 'ActivePiece',
  props: {
    piece: {
      type: Object as () => ChessPiece,
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
      type: Boolean,
      required: true,
    },
    battleValue: {
      type: Number,
      required: true,
    },
    classicalValue: {
      type: Number,
      required: true,
    },
  },
};
</script>