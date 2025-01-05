<template>
  <div :class="[
    'flex items-center transition-all',
    reverse ? 'flex-row-reverse space-x-reverse' : 'space-x-4',
  ]">
    <!-- Avatar -->
    <div
      class="hidden sm:flex items-center justify-center w-12 sm:w-16 md:w-18 lg-sm:w-20  lg:w-28 h-12 sm:h-16 md:h-18 lg-sm:h-20 lg:h-28 rounded-full bg-gray-700"
    >
      <img
        :src="avatarSrc || '/src/assets/default-avatar.png'"
        :alt="name || 'Avatar'"
        class="w-full h-full object-cover rounded-full"
      />
    </div>
    <!-- Score Box -->
    <div
      class="bg-gray-800 text-white p-2 rounded shadow-lg flex flex-col items-center justify-center w-20 sm:w-24 lg-sm:w-28  h-14 sm:h-18 lg-sm:h-20"
    >
      <h2
        class="text-sm sm:text-base lg-sm:text-lg md:text-lg font-semibold text-center"
      >
        {{ name }}
      </h2>
      <p
        class="text-lg sm:text-xl lg-sm:text-2xl md:text-3xl font-bold"
      >
        {{ score }}
      </p>
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