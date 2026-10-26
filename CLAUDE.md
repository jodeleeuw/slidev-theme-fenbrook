# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A Slidev theme (Vue 3 SFCs + CSS, no build step of its own). Talks consume it as a git dependency (`github:jodeleeuw/slidev-theme-fenbrook#main`) with `theme: fenbrook`; Slidev auto-registers `components/` and `layouts/`.

## Previewing changes

There are no tests. Verify changes with the demo deck, `demo/slides.md`, which loads this theme via `theme: ../`:

- `pnpm dev`: live preview
- `pnpm build`: catches compile and import errors
- `pnpm lint`: ESLint (`eslint-plugin-vue` essential rules)

When you add or change a layout, component, or prop, add or update a slide in `demo/slides.md` that exercises it.

## Conventions

- Colors come from the `--fenbrook-*` tokens in `styles/layout.css`; don't hardcode hex values in components.
- Layout props are set from slide frontmatter through `defineProps`. Talk-wide settings are `themeConfig` keys (`course`, `event`, `accentIcons`), read through `configs.themeConfig` from `@slidev/client`. New keys need a default in `package.json` under `slidev.defaults.themeConfig`.
- When you change a component's or layout's API (props, frontmatter, themeConfig), update the matching `docs/*.md` too. `docs/DIAGRAM.md` is the authoritative `<Diagram>` spec reference.
- Runtime dependencies must be pure ESM. CJS packages broke under Slidev/Vite (see the history behind `QRCode.vue` switching from `qrcode` to `uqr`).
- Every new top-level file or directory a consumer needs must be added to `files` in `package.json`.
- Commits use short imperative subjects (`Add QRCode component`, `Fix sidebar scrollbar width in Chrome`).

## Gotchas

- The footer lives in `global-top.vue`, not `global-bottom.vue`, because `GlobalBottom` stacks behind opaque slides. To hide the footer on a new layout, add the layout to the `HIDE_ON` set there.
- Read the current layout from `nav.currentSlideRoute.value?.meta?.layout`, not `nav.currentLayout`, which races during navigation and makes the footer flicker.
- UnoCSS preflight strips `ol`/`ul` markers. Content layouts re-assert them with scoped `:deep(ol)` / `:deep(ul)` rules; copy that block from `layouts/default.vue` into any new content layout.
- `pnpm-workspace.yaml` pins `markdown-it@14` for `@slidev/cli` (slidevjs/slidev#2761). Keep it until the issue is fixed upstream.
