<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { configs } from '@slidev/client'

const props = defineProps<{
  /** Square size in rem (used when no icons are configured) */
  squareSize?: number
  /** Icon size in rem (used when icons are configured) */
  iconSize?: number
  /** Gap between multiple icons, in rem */
  gap?: number
  /**
   * Per-instance icon override. Accepts an Iconify name ("carbon:rocket"),
   * a comma-separated string, or an array of names. Falls back to the
   * `accentIcons` theme config when omitted.
   */
  icons?: string | string[]
}>()

const tc = (configs.themeConfig ?? {}) as Record<string, any>

const iconList = computed<string[]>(() => {
  const raw = props.icons ?? tc.accentIcons ?? tc.accentIcon
  if (!raw) return []
  const arr = Array.isArray(raw) ? raw : String(raw).split(',')
  return arr.map(s => String(s).trim()).filter(Boolean)
})

const squareSize = computed(() => props.squareSize ?? 0.8)
const iconSize = computed(() => props.iconSize ?? squareSize.value * 2.2)
const gap = computed(() => props.gap ?? 0.45)
</script>

<template>
  <span class="accent-mark" :style="{ gap: gap + 'rem' }" aria-hidden="true">
    <template v-if="iconList.length">
      <Icon
        v-for="(name, i) in iconList"
        :key="i"
        :icon="name"
        class="accent-icon"
        :style="{ fontSize: iconSize + 'rem' }"
      />
    </template>
    <span
      v-else
      class="sq"
      :style="{ width: squareSize + 'rem', height: squareSize + 'rem' }"
    />
  </span>
</template>

<style scoped>
.accent-mark {
  display: inline-flex;
  align-items: center;
  line-height: 0;
}

.accent-icon {
  display: inline-block;
  color: var(--fenbrook-accent);
}

.sq {
  display: inline-block;
  background: var(--fenbrook-accent);
}
</style>
