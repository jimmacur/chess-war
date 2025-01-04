<template>
  <button
    :class="['btn', buttonType, { disabled: isDisabled }]"
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
      default: 'primary', // Options: 'primary', 'secondary', 'danger', etc.
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: () => {}, // A no-op function by default
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

<style scoped>
.btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.btn.primary {
  background-color: #007bff;
  color: #fff;
}
.btn.secondary {
  background-color: #6c757d;
  color: #fff;
}
.btn.danger {
  background-color: #dc3545;
  color: #fff;
}
.btn.disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
}
</style>