<script setup lang="ts">
import { useSlots } from 'vue'
import FitContent from '../components/FitContent.vue'

const slots = useSlots()
</script>

<template>
  <div class="slidev-layout fenbrook-cover">
    <div class="cover-mark" aria-hidden="true">
      <span class="sq" />
    </div>

    <div class="cover-body">
      <FitContent align="center" origin="center">
        <div class="cover-inner">
          <slot />
        </div>
      </FitContent>
    </div>

    <div class="cover-meta">
      <div v-if="slots.speaker" class="meta-line meta-speaker">
        <slot name="speaker" />
      </div>
      <div v-if="slots.event" class="meta-line meta-event">
        <slot name="event" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.fenbrook-cover {
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: var(--fenbrook-bg);
  padding: 3rem 5rem;
}

.cover-mark {
  display: flex;
  align-items: center;
}

.sq {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  background: var(--fenbrook-accent);
}

.cover-body {
  min-height: 0;
  overflow: hidden;
}

.cover-body :deep(h1) {
  font-size: 4.5rem !important;
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.025em;
  margin: 0 0 1rem;
  max-width: 18ch;
}

.cover-body :deep(h2),
.cover-body :deep(p) {
  font-size: 1.6rem !important;
  color: var(--fenbrook-fg-soft);
  font-weight: 400;
  margin: 0;
  max-width: 32ch;
}

.cover-meta {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.cover-meta :deep(p) {
  margin: 0;
}

.meta-speaker {
  font-size: 1.15rem;
  color: var(--fenbrook-fg);
  letter-spacing: 0.01em;
}

.meta-event {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.95rem;
  color: var(--fenbrook-muted);
  letter-spacing: 0.02em;
}
</style>
