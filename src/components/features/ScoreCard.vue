<template>
  <div :class="['flex items-center', reverse ? 'flex-row-reverse space-x-reverse' : 'space-x-4']">
    <img
      :src="avatarSrc || '/src/assets/default-avatar.png'"
      :alt="name || 'Avatar'"
      class="w-24 h-24 rounded-full"
    />
    <div class="bg-gray-800 text-white p-2 rounded shadow-lg flex flex-col items-center justify-center w-32 h-24">
      <h2 class="text-lg font-semibold text-center">{{ name }}</h2>
      <p class="text-3xl font-bold">{{ score }}</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ScoreCard',
  props: {
    name: { type: String, required: true },
    avatarSrc: { type: String, required: true },
    score: { type: Number, required: true },
    reverse: { type: Boolean, default: false },
  },
};
</script>