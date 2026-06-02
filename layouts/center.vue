<script setup lang="ts">
import FitContent from '../components/FitContent.vue'

defineProps<{ width?: string }>()
</script>

<template>
  <div class="slidev-layout fenbrook-center">
    <FitContent align="center" origin="center">
      <div class="center-body" :style="{ maxWidth: width }">
        <slot />
      </div>
    </FitContent>
  </div>
</template>

<style scoped>
.fenbrook-center {
  padding: 4rem 5rem;
  text-align: center;
  height: 100%;
  overflow: hidden;
}

.center-body {
  max-width: 28ch;
  margin: 0 auto;
}

.center-body :deep(h1) {
  font-size: 3.5rem !important;
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.center-body :deep(h2) {
  font-size: 2rem !important;
  color: var(--fenbrook-fg-soft);
  font-weight: 400;
}

.center-body :deep(p) {
  font-size: 1.6rem;
  line-height: 1.5;
}

/* Re-assert list markers (UnoCSS preflight strips them). */
.center-body :deep(ol) {
  list-style: decimal;
  padding-left: 1.5rem;
  text-align: left;
  display: inline-block;
}

.center-body :deep(ul) {
  list-style: disc;
  padding-left: 1.5rem;
  text-align: left;
  display: inline-block;
}

.center-body :deep(li) {
  margin: 0.5rem 0;
  font-size: 1.4rem;
  line-height: 1.5;
}

.center-body :deep(ol li::marker) {
  color: var(--fenbrook-fg-soft);
}

/* Bulleted lists use an accent-colored arrow glyph instead of a disc. */
.center-body :deep(ul li::marker) {
  content: '→  ';
  color: var(--fenbrook-accent);
  font-weight: 500;
}
</style>
