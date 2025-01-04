<template>
  <span class="inline-block align-middle">
    <svg 
      :width="size" 
      :height="size" 
      :fill="color" 
      v-html="iconSvg"
      class="block">
    </svg>
  </span>
</template>

<script lang="ts">
export default {
  name: 'Icon',
  props: {
    iconName: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 24,
    },
    color: {
      type: String,
      default: '#000',
    },
  },
  computed: {
    iconSvg(): string {
      const icons: Record<'home' | 'settings' | 'battle', string> = {
        home: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>',
        settings: '<path d="M19.14 12.94a7.997 7.997 0 0 0 0-1.88l2.11-1.65c.18-.14.23-.38.12-.58l-2-3.46a.49.49 0 0 0-.57-.21l-2.49 1a7.97 7.97 0 0 0-1.61-.93l-.38-2.65a.5.5 0 0 0-.49-.42h-4a.5.5 0 0 0-.49.42l-.38 2.65a7.97 7.97 0 0 0-1.61.93l-2.49-1a.5.5 0 0 0-.57.21l-2 3.46c-.1.2-.05.44.12.58L4.86 11.06a7.997 7.997 0 0 0 0 1.88l-2.11 1.65a.5.5 0 0 0-.12.58l2 3.46c.1.2.34.26.57.21l2.49-1c.5.36 1.05.67 1.61.93l.38 2.65c.03.22.23.42.49.42h4c.26 0 .46-.2.49-.42l.38-2.65a7.97 7.97 0 0 0 1.61-.93l2.49 1c.22.06.47-.01.57-.21l2-3.46a.49.49 0 0 0-.12-.58l-2.11-1.65z"/>',
        battle: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-5l5 2.5-5 2.5z"/>',
      };

      return icons[this.iconName as keyof typeof icons] || '';
    },
  },
};
</script>