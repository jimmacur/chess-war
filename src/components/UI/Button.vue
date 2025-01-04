<template>
  <button
    :class="[
      'px-4 py-2 rounded transition-all font-semibold text-center',
      buttonClasses,
      { 'opacity-50 cursor-not-allowed': isDisabled }
    ]"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  name: 'Button',
  props: {
    buttonType: {
      type: String,
      default: 'primary', 
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    buttonClasses(): string {
      switch (this.buttonType) {
        case 'primary':
          return 'bg-blue-500 text-white hover:bg-blue-600';
        case 'secondary':
          return 'bg-gray-500 text-white hover:bg-gray-600';
        case 'danger':
          return 'bg-red-500 text-white hover:bg-red-600';
        default:
          return 'bg-gray-300 text-black hover:bg-gray-400';
      }
    },
  },
  methods: {
    handleClick(event: Event) {
      if (!this.isDisabled) {
        this.onClick(event);
      }
    },
  },
};
</script>