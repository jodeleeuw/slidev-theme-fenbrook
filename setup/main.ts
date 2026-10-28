import { configs } from '@slidev/client'
import { buildIcon, loadIcon } from '@iconify/vue'
import { parseIconList } from '../utils/accentIcons'

// Slidev's built-in favicon. Any other value means the deck set `favicon`
// in its headmatter, and we leave it alone.
const SLIDEV_DEFAULT_FAVICON = 'https://cdn.jsdelivr.net/gh/slidevjs/slidev/assets/favicon.png'
const FALLBACK_ACCENT = '#e0a87a'

// Swap the favicon for the first `accentIcons` entry, drawn in the accent
// color, so the browser tab matches the cover and footer marks.
async function applyAccentFavicon() {
  if (configs.favicon && configs.favicon !== SLIDEV_DEFAULT_FAVICON) return

  const tc = (configs.themeConfig ?? {}) as Record<string, any>
  const [first] = parseIconList(tc.accentIcons ?? tc.accentIcon)
  if (!first) return

  let icon
  try {
    icon = await loadIcon(first)
  } catch {
    return // unknown icon or offline: keep the default favicon
  }

  const color = getComputedStyle(document.documentElement)
    .getPropertyValue('--fenbrook-accent').trim() || FALLBACK_ACCENT
  const { attributes, body } = buildIcon(icon, { height: '64' })
  const attrs = Object.entries({ xmlns: 'http://www.w3.org/2000/svg', ...attributes })
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ')
  const svg = `<svg ${attrs}>${body.replaceAll('currentColor', color)}</svg>`

  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.type = 'image/svg+xml'
  link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`
}

// Plain function rather than defineAppSetup(): @slidev/types isn't a theme
// dependency, and Slidev only needs the default export to be callable.
export default function setup() {
  if (typeof document === 'undefined') return
  applyAccentFavicon()
}
