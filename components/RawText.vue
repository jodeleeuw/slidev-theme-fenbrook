<script setup lang="ts">
// Shows text verbatim — no markdown rendering. Useful for displaying the
// literal source of markdown (or any plain text) on a slide.
//
// IMPORTANT: Slidev parses markdown inside a component's slot *before* it
// reaches the component, so `**bold**` in the slot would already be a
// <strong> by the time we see it. To show genuinely raw markdown, pass it
// via the `text` prop as a JS template literal — that is evaluated as
// JavaScript, so its contents are never touched by the markdown parser:
//
//   <RawText :text="`# Heading
//   **not bold** and \`code\` stay literal
//   - list item`" />
//
// The default slot is a convenience for plain text with no markdown
// special characters (or content authored with no surrounding blank lines,
// which Slidev leaves unparsed). When in doubt, use the `text` prop.
defineProps<{
  text?: string
}>()
</script>

<template>
  <pre class="fenbrook-rawtext"><template v-if="text != null">{{ text }}</template><slot v-else /></pre>
</template>

<style scoped>
.fenbrook-rawtext {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.95rem;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
  tab-size: 2;
  margin: 0;
  padding: 1.1em 1.3em;
  background: var(--fenbrook-bg-elev);
  color: var(--fenbrook-fg);
  border: 1px solid var(--fenbrook-rule);
  border-radius: 6px;
  overflow-x: auto;
}
</style>
