<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'

// Shows text verbatim — no markdown rendering. Useful for displaying the
// literal source of markdown (or any plain text) on a slide.
//
// Three ways to supply content, in priority order:
//
// 1. `src` — path to a file whose raw contents are shown. Easiest for
//    anything non-trivial. The path is relative to your slides project
//    root; `@/`, `./`, and a bare path all work:
//      <RawText src="snippets/example.md" />
//      <RawText src="@/snippets/example.md" />
//
// 2. `text` — a string, typically a JS template literal. Evaluated as
//    JavaScript, so its contents bypass Slidev's markdown parser:
//      <RawText :text="`# Heading
//      **stays literal**`" />
//
// 3. default slot — convenience for plain text with no markdown special
//    characters. NOTE: Slidev parses markdown in slots before the
//    component sees it, so use `src` or `text` for real markdown source.
const props = defineProps<{
  text?: string
  src?: string
}>()

// Project-root-relative raw imports. Keys look like '/snippets/example.md'.
// Lazy (functions, not eager strings) so nothing is bundled until used.
const files = import.meta.glob('/**/*.{md,markdown,mdx,txt,text,json,yaml,yml,csv,tsv,html,htm,css,scss,sass,less,js,jsx,ts,tsx,vue,py,rb,go,rs,java,c,h,cpp,sh,bash,zsh,sql,toml,ini,xml,svg,env}', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

// Normalize 'foo.md', './foo.md', '@/foo.md', '/foo.md' all to '/foo.md'.
function normalize(src: string): string {
  let s = src.trim().replace(/^@/, '').replace(/^\.\//, '/').replace(/^\.\.\//, '/')
  if (!s.startsWith('/')) s = `/${s}`
  return s
}

const loaded = ref<string | null>(null)

watchEffect(async () => {
  if (props.src == null) {
    loaded.value = null
    return
  }
  const key = normalize(props.src)
  const loader = files[key]
  if (!loader) {
    loaded.value = `[RawText: file not found — ${props.src}]`
    return
  }
  loaded.value = await loader()
})

const content = computed(() => props.text ?? loaded.value)
</script>

<template>
  <pre class="fenbrook-rawtext"><template v-if="content != null">{{ content }}</template><slot v-else /></pre>
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
