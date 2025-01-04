<template>
  <div
    :class="[
      'absolute bg-[#81B64C] rounded-lg p-5 grid gap-2 shadow-2xl',
      position === 'left' ? 'top-40 left-8 grid-cols-3' : 'top-40 right-8 grid-cols-3',
    ]"
  >
    <img
      v-for="piece in pieces"
      :key="piece.id"
      :src="piece.src"
      :alt="piece.name"
      class="w-20 h-20"
    />
  </div>
</template>

<script lang="ts">
interface Piece {
  id: string;
  src: string;
  name: string;
}

export default {
  name: 'Pieces',
  props: {
    pieces: {
      type: Array as () => Piece[], 
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
};
</script>