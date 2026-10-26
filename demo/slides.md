---
theme: ../
title: Fenbrook Theme Demo
transition: fade
themeConfig:
  course: DEMO 101
  event: Theme showcase
  accentIcons: carbon:idea, carbon:network-4
layout: cover
---

# Fenbrook

A warm-dark Slidev theme

::speaker::
Josh de Leeuw

::event::
Theme showcase · every layout and component

---
layout: cover-day
day: "03"
---

# What makes a slide readable?

::discussion::
Turn to a neighbor and name one slide you remember — and why.

---
layout: section
number: 1
---

# Layouts

---

# Default layout

Plain markdown, vertically centered.

- Bulleted lists use an accent arrow
- Inline `code`, **bold**, and [links](https://sli.dev)

1. Ordered lists keep their numerals
2. Even after UnoCSS preflight

---
layout: center
width: 36rem
---

# Center

Centered content with an optional `width` cap.

---
layout: fact
source: "Source: a made-up survey, 2026"
---

# 73%

of audiences remember the one big number

---
layout: fact
align: left
---

# 1 in 4

`align: left` puts the caption beside the number for an editorial feel.

---
layout: quote
---

The best slides are the ones you barely notice.

::attribution::
Someone, probably

---
layout: two-cols-header
cols: left-wide
---

# Two columns with a header

::left::
The left column carries the argument (`cols: left-wide`).

- First point
- Second point

::right::
A supporting list.

1. One
2. Two

---
layout: aside
asideStyle: card
---

# Aside

Main content with a sidebar. `asideStyle: card` gives a rounded callout.

- Main point one
- Main point two

::sidebar::
### Definition
A **sidebar** holds context that supports the main point.

- Helper item
- Another one

---
layout: aside
side: left
sidebarScale: 0.85
---

# Aside, rail on the left

The default `rail` style, with `sidebarScale: 0.85`.

::sidebar::
### Note
Sidebar text scales independently of the main column.

---
layout: media
caption: An illustrative figure
---

# Media

Text beside a dominant media frame. The `::media::` slot takes an image, video, iframe, or `<Youtube>`.

::media::
<img src="/sample.svg" />

---
layout: media
side: left
captionSide: right
caption: Caption beside the frame
---

# Media, flipped

`side: left` with `captionSide: right`.

::media::
<img src="/sample.svg" />

---
layout: image
image: /sample.svg
caption: The image layout shows a figure with an optional caption
---

---
layout: image-bg
image: /sample.svg
darken: 0.5
---

# Image background

Text over a full-bleed image with a darkening scrim.

---
layout: gallery
---

::a::
<img src="/sample.svg" />

::b::
<img src="/sample.svg" />

::c::
<img src="/sample.svg" />

::d::
<img src="/sample.svg" />

::overlay::
### Gallery
Four images, auto 2×2, with an overlay card.

---
layout: panel
---

# Panel

A top-anchored title with a flex body, for tall content.

<DataTable
  :headers="['A', 'B', 'A ∧ B', 'A ∨ B']"
  :rows="[[0, 0, 0, 0], [0, 1, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1]]"
  :highlight-row="3"
  :highlight-col="2"
/>

---
layout: section
number: 2
---

# Components

---

# Hi and Quiet

<Quiet>Environmental</Quiet> <Hi>science</Hi> is the default marker highlight.

A <Hi variant="solid">solid</Hi> variant and a <Hi variant="box">box</Hi> variant.

<Quiet variant="strike">Struck-through</Quiet> text for negation.

---
layout: panel
---

# Diagram

Click to reveal the output.

<Diagram :spec="{
  w: 960, h: 300,
  boxes: [
    { id: 'in',  x:  80, y: 100, w: 180, h: 100, text: 'Input',   style: 'main', rx: 10 },
    { id: 'mid', x: 390, y: 100, w: 180, h: 100, text: 'Process', style: 'main', rx: 10 },
    { id: 'out', x: 700, y: 100, w: 180, h: 100, text: 'Output',  style: 'main', rx: 10, revealAt: 1 },
  ],
  connectors: [
    { from: 'in.right',  to: 'mid.left' },
    { from: 'mid.right', to: 'out.left', revealAt: 1 },
  ],
}" />

---
layout: panel
---

# Annotated image

Click to lift the mask and reveal the label.

<AnnotatedImage src="/sample.svg" :viewbox="[960, 540]" max-height="22rem">
  <Box :at="[160, 120, 280, 280]" />
  <Mask :at="[520, 140, 280, 240]" :hide-at="1" />
  <Label :at="[540, 400]" :reveal-at="1">Revealed region</Label>
</AnnotatedImage>

---
layout: two-cols-header
---

# Cropped and QRCode

::left::
<Cropped src="/sample.svg" :crop="{ l: 25, t: 10, r: 40, b: 20 }" :aspect="[4, 3]" />

::right::
<QRCode href="https://github.com/jodeleeuw/slidev-theme-fenbrook" :size="180" caption="Theme repo" />

---
dragPos:
  sticker-a: 620,140,220,124,-4
---

# Sticker

Double-click the sticker in dev mode to drag it.

<Sticker id="sticker-a" src="/sample.svg" frame="polaroid" />

---

# RawText

<RawText src="snippets/example.md" />

---
footer: Custom footer text for this slide
---

# Footer override

Set `footer: false` to hide the footer, or a string to replace its left side.

---
layout: outro
---

# Questions?

::next::
- Try every layout in your own deck
- Read `docs/DIAGRAM.md` for the full Diagram spec
