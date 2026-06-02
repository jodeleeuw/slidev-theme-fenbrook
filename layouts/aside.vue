<script setup lang="ts">
import { useSlots } from 'vue'
import FitContent from '../components/FitContent.vue'

withDefaults(defineProps<{
  side?: 'left' | 'right'
  // 'rail' (default): sidebar is a flush stripe with an accent left-border.
  // 'card': sidebar wraps in a rounded-border container with a soft tint and
  // breathing room around it — for PPTX-style rounded callout boxes.
  asideStyle?: 'rail' | 'card'
  // Multiplier for all sidebar text (headings, body, lists). 1 = default.
  sidebarScale?: number
}>(), {
  side: 'right',
  asideStyle: 'rail',
  sidebarScale: 1,
})

const slots = useSlots()
</script>

<template>
  <div class="slidev-layout fenbrook-aside" :class="[`side-${side}`, `aside-${asideStyle}`]">
    <div class="aside-main">
      <FitContent align="center" origin="left center">
        <div class="main-inner">
          <slot />
        </div>
      </FitContent>
    </div>

    <aside v-if="slots.sidebar" class="aside-sidebar" :style="{ '--sidebar-scale': sidebarScale }">
      <div class="sidebar-inner">
        <slot name="sidebar" />
      </div>
    </aside>
  </div>
</template>

<style scoped>
.fenbrook-aside {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
  padding: 3rem 4rem 3.5rem;
  height: 100%;
  overflow: hidden;
}

.fenbrook-aside.side-left {
  grid-template-columns: 1fr 1.5fr;
}
.fenbrook-aside.side-left .aside-main { order: 2; }
.fenbrook-aside.side-left .aside-sidebar { order: 1; }

.aside-main {
  min-height: 0;
  min-width: 0;
}

.main-inner :deep(h1) {
  font-size: 2.8rem;
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--fenbrook-fg);
  margin: 0 0 1.5rem;
  max-width: 22ch;
}

.main-inner :deep(h1 em) {
  font-style: italic;
  color: var(--fenbrook-fg-soft);
  font-weight: 400;
}

.main-inner :deep(p) {
  font-size: 1.45rem;
  line-height: 1.5;
  color: var(--fenbrook-fg-soft);
  margin: 0 0 1rem;
  max-width: 34ch;
}

.main-inner :deep(p:last-child) {
  margin-bottom: 0;
}

.main-inner :deep(strong) {
  color: var(--fenbrook-fg);
  font-weight: 600;
}

.main-inner :deep(em) {
  color: var(--fenbrook-fg);
  font-style: italic;
}

.aside-sidebar {
  min-height: 0;
  min-width: 0;
  align-self: center;
  max-height: 100%;
  overflow: auto;
}

/* Default 'rail' style — flush stripe with an accent border on the inner edge. */
.fenbrook-aside.aside-rail .aside-sidebar {
  background: color-mix(in oklab, var(--fenbrook-fg) 6%, transparent);
  border-left: 3px solid var(--fenbrook-accent);
  padding: 1.4rem 1.5rem;
}

/* 'card' style — rounded callout with a subtle border, matching PPTX
   roundRect sidebars. No accent stripe; the border + tint do the work. */
.fenbrook-aside.aside-card .aside-sidebar {
  background: color-mix(in oklab, var(--fenbrook-fg) 5%, transparent);
  border: 1px solid color-mix(in oklab, var(--fenbrook-accent) 35%, var(--fenbrook-rule));
  border-radius: 10px;
  padding: 1.6rem 1.7rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.22);
}

.sidebar-inner :deep(h2),
.sidebar-inner :deep(h3) {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: calc(0.78rem * var(--sidebar-scale, 1));
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--fenbrook-accent);
  margin: 0 0 0.8rem;
  font-weight: 500;
}

.sidebar-inner :deep(p) {
  font-size: calc(0.95rem * var(--sidebar-scale, 1));
  line-height: 1.5;
  color: var(--fenbrook-fg-soft);
  margin: 0 0 0.7rem;
}

.sidebar-inner :deep(p:last-child) {
  margin-bottom: 0;
}

.sidebar-inner :deep(em) {
  color: var(--fenbrook-fg);
  font-style: italic;
}

.sidebar-inner :deep(strong) {
  color: var(--fenbrook-fg);
  font-weight: 600;
}

.sidebar-inner :deep(ul),
.sidebar-inner :deep(ol) {
  margin: 0 0 0.7rem;
  padding-left: 1.2rem;
  font-size: calc(0.95rem * var(--sidebar-scale, 1));
  line-height: 1.5;
  color: var(--fenbrook-fg-soft);
}

.sidebar-inner :deep(li) {
  margin-bottom: 0.3rem;
}

/* Inline code sizes relative to its surrounding text (em), so it tracks the
   scaled paragraph/list font. Scoped here to win over base resets that would
   otherwise pin it to a fixed size and break sidebarScale. */
.sidebar-inner :deep(code) {
  font-size: 0.92em;
}
</style>
