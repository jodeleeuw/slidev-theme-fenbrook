<template>
  <div class="slidev-layout fenbrook-default">
    <slot />
  </div>
</template>

<style scoped>
/* UnoCSS / Tailwind preflight resets `ol` to `list-style: none; padding: 0`,
   which hides the "1." / "2." numerals on plain markdown ordered lists.
   Re-assert decimal markers for the default layout only — layouts like
   `aside` and `outro` deliberately use `list-style: none` with their own
   ::before markers, and they win via their own scoped :deep rules. */
.fenbrook-default :deep(ol) {
  list-style: decimal;
  padding-left: 1.5rem;
}

.fenbrook-default :deep(ul) {
  list-style: disc;
  padding-left: 1.5rem;
}

.fenbrook-default :deep(ol li),
.fenbrook-default :deep(ul li) {
  margin: 0.6rem 0;
  line-height: 1.5;
  font-size: 1.35rem;
  color: var(--fenbrook-fg);
}

.fenbrook-default :deep(ol li::marker),
.fenbrook-default :deep(ul li::marker) {
  color: var(--fenbrook-fg-soft);
}
</style>
