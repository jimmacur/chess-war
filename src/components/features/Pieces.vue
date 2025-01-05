<template>
  <div
    :class="[
      'absolute bg-[#81B64C] rounded-lg p-5 grid gap-2 shadow-2xl',
      position === 'left' ? 'top-40 left-8' : 'top-40 right-8',
      'hidden sm:grid', 
      'sm:grid-cols-2', 
      'lg:grid-cols-3',
    ]"
  >
    <img
      v-for="piece in pieces"
      :key="piece.id"
      :src="piece.src"
      :alt="piece.name"
      class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
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