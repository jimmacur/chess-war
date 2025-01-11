<template>
  <div class="absolute bottom-2 left-2 flex flex-wrap items-center space-x-2">
    <p v-if="pieces.length > 0" class="text-black text-sm">Battle Bench:</p>
    <img
      v-for="piece in pieces"
      :key="piece.id"
      :src="piece.src"
      :alt="piece.name"
      class="w-12 h-12"
    />
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
  name: 'BattleBench',
  props: {
    pieces: {
      type: Array as () => ChessPiece[],
      required: true,
    },
  },
};
</script>