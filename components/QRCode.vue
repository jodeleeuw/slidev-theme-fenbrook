<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'

// qrcode is a CommonJS package whose export shape (default vs named) varies
// by bundler interop, so static imports of `default`/`toString` can fail
// Vite's export checks. Load it dynamically and resolve `toString` from
// whichever shape we get (namespace, default-wrapped, or function-default).
async function qrToString(text: string, opts: Record<string, unknown>): Promise<string> {
  const mod: any = await import('qrcode')
  const fn = mod.toString ?? mod.default?.toString ?? mod.default
  if (typeof fn !== 'function') {
    throw new Error('qrcode: toString() not found on module')
  }
  return fn(text, opts)
}

// Renders a scannable QR code for a URL (or any text) as an inline SVG.
//
//   <QRCode href="https://example.com" />
//   <QRCode href="https://example.com" :size="160" caption="Slides" />
//
// Defaults to dark modules on a light rounded card, which scans reliably
// on a dark slide. Override `dark`/`light` for a different look (note that
// low contrast or a light-on-dark inversion can hurt scannability).
const props = withDefaults(defineProps<{
  // Required. The URL or text to encode.
  href: string
  // Rendered size of the code in px (the SVG scales to fit this box).
  size?: number | string
  // Module (foreground) color.
  dark?: string
  // Background color. Use 'transparent' to drop the card and let modules
  // sit directly on the slide (pair with a light `dark` color on dark bg).
  light?: string
  // Quiet-zone width in modules. QR codes need >=2 to scan; 4 is standard.
  margin?: number
  // Error-correction level. Higher tolerates more occlusion but is denser.
  level?: 'L' | 'M' | 'Q' | 'H'
  // Optional caption shown beneath the code (monospace, muted).
  caption?: string
}>(), {
  size: 200,
  dark: '#1a1a1a',
  light: '#ffffff',
  margin: 2,
  level: 'M',
})

const svg = ref('')
const error = ref('')

watchEffect(async () => {
  error.value = ''
  if (!props.href) {
    svg.value = ''
    return
  }
  try {
    svg.value = await qrToString(props.href, {
      type: 'svg',
      errorCorrectionLevel: props.level,
      margin: props.margin,
      color: { dark: props.dark, light: props.light },
    })
  } catch (e) {
    svg.value = ''
    error.value = `[QRCode: ${(e as Error).message}]`
  }
})

const sizeStyle = computed(() => {
  const s = typeof props.size === 'number' ? `${props.size}px` : props.size
  return { width: s }
})

const hasCard = computed(() => props.light !== 'transparent' && props.light !== 'none')
</script>

<template>
  <div class="fenbrook-qrcode">
    <a :href="href" class="qr-frame" :class="{ 'qr-frame--card': hasCard }" :style="sizeStyle">
      <div v-if="error" class="qr-error">{{ error }}</div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-else class="qr-svg" v-html="svg" />
    </a>
    <div v-if="caption" class="qr-caption">{{ caption }}</div>
  </div>
</template>

<style scoped>
.fenbrook-qrcode {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
}

.qr-frame {
  display: block;
  border-bottom: none;
  line-height: 0;
}

.qr-frame--card {
  background: #ffffff;
  padding: 0.7rem;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.22);
}

.qr-svg {
  width: 100%;
}

.qr-svg :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}

.qr-error {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.8rem;
  color: var(--fenbrook-accent);
  line-height: 1.4;
}

.qr-caption {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.8rem;
  letter-spacing: 0.02em;
  color: var(--fenbrook-muted);
  text-align: center;
}
</style>
