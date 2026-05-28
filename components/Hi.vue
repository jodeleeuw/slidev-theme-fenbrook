<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'marker' | 'solid' | 'box'
}>(), {
  variant: 'marker',
})
</script>

<template>
  <span class="fenbrook-hi" :class="`fenbrook-hi--${variant}`">
    <slot />
  </span>
</template>

<style scoped>
.fenbrook-hi {
  color: var(--fenbrook-accent);
  font-weight: 500;
}

.fenbrook-hi--marker {
  background-image: linear-gradient(
    to top,
    color-mix(in oklab, var(--fenbrook-accent) 25%, transparent) 0%,
    color-mix(in oklab, var(--fenbrook-accent) 25%, transparent) 30%,
    transparent 30%
  );
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0 0.1em;
}

.fenbrook-hi--solid {
  color: var(--fenbrook-accent);
}

.fenbrook-hi--box {
  border: 1px solid var(--fenbrook-accent);
  padding: 0.05em 0.35em;
  border-radius: 3px;
}
</style>
