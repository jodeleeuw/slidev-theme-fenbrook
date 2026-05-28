<script setup lang="ts">
withDefaults(defineProps<{
  headers: string[]
  rows: (string | number)[][]
  highlightRow?: number
  highlightCol?: number
  mono?: boolean
  // Rotate column header text. 'vertical-up' = -90° / reads bottom-to-top
  // (matches PPTX `vert=270` rotation); 'vertical-down' = 90° / reads top-to-
  // bottom. Headers stay aligned to their columns; the header row's height
  // grows to fit the rotated text.
  headerRotate?: 'vertical-up' | 'vertical-down'
}>(), {
  mono: true,
})
</script>

<template>
  <table class="fenbrook-data" :class="[{ mono }, headerRotate ? `header-${headerRotate}` : null]">
    <thead>
      <tr>
        <th
          v-for="(h, ci) in headers"
          :key="ci"
          :class="{ 'col-highlight': highlightCol === ci }"
        ><span class="th-text">{{ h }}</span></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, ri) in rows"
        :key="ri"
        :class="{ 'row-highlight': highlightRow === ri }"
      >
        <td
          v-for="(cell, ci) in row"
          :key="ci"
          :class="{ 'col-highlight': highlightCol === ci }"
        >{{ cell }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.fenbrook-data {
  margin: 1.5rem auto 0;
  font-size: 1.4rem;
  border-collapse: collapse;
}

.fenbrook-data.mono {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
}

.fenbrook-data th,
.fenbrook-data td {
  padding: 0.7rem 2rem;
  border: 1px solid var(--fenbrook-rule);
  text-align: center;
}

.fenbrook-data th {
  color: var(--fenbrook-fg-soft);
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  font-weight: 500;
}

/* Rotated header text: the <th> gets a fixed height (enough for the rotated
   string), tighter horizontal padding, and the inner <span> rotates around its
   own center. */
.fenbrook-data.header-vertical-up th,
.fenbrook-data.header-vertical-down th {
  padding: 0.4rem 0.5rem;
  vertical-align: bottom;
  height: 7rem;
}

.fenbrook-data.header-vertical-up .th-text,
.fenbrook-data.header-vertical-down .th-text {
  display: inline-block;
  white-space: nowrap;
  transform-origin: center center;
}

.fenbrook-data.header-vertical-up .th-text {
  transform: rotate(-90deg);
}

.fenbrook-data.header-vertical-down .th-text {
  transform: rotate(90deg);
}

.fenbrook-data tbody tr.row-highlight td {
  color: var(--fenbrook-accent);
  font-weight: 600;
}

.fenbrook-data th.col-highlight,
.fenbrook-data td.col-highlight {
  color: var(--fenbrook-accent);
  font-weight: 600;
}

/* When a row is fully highlighted, keep its cells consistently accented even
   if a column highlight intersects (both selectors apply the same color). */
.fenbrook-data tbody tr.row-highlight td.col-highlight {
  color: var(--fenbrook-accent);
}
</style>
