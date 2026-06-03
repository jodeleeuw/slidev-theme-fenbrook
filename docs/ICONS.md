# Accent icons

By default the theme draws a small square in the accent color at the top of the
cover slide and in the footer of every body slide. You can replace that square
with one or more simple vector icons that capture the theme of your talk.

Icons are pulled from [Iconify](https://icon-sets.iconify.design/), which bundles
200k+ icons across many open icon sets (Carbon, Lucide, Material Design, Tabler,
Phosphor, and more). You reference an icon by its Iconify name,
`<collection>:<icon>` — for example `carbon:rocket` or `lucide:brain`.

## Set icons for the whole talk

Add `accentIcons` to your deck's headmatter (the first frontmatter block in
`slides.md`):

```yaml
---
theme: fenbrook
themeConfig:
  accentIcons: carbon:rocket
---
```

Use more than one icon by passing a list (or a comma-separated string). They are
laid out in a row in the accent color:

```yaml
themeConfig:
  accentIcons:
    - carbon:idea
    - carbon:network-4
    - carbon:growth
```

```yaml
# comma-separated shorthand also works
themeConfig:
  accentIcons: lucide:brain, lucide:zap
```

When `accentIcons` is empty (the default), the original square is shown — so
existing decks are unaffected.

## Override for a single slide

Any slide can set its own `icons` in that slide's frontmatter, which overrides
the talk-wide `accentIcons` for that slide's footer (and, on the cover layout,
the cover mark):

```md
---
layout: cover
icons: carbon:data-vis-1
---

# A chapter on data
```

## Picking icons

Browse and search the full set at <https://icon-sets.iconify.design/>. Click any
icon to see its name (e.g. `tabler:flask`), then use that as the value.

Prefer **monochrome** icon sets — Carbon (`carbon:`), Lucide (`lucide:`),
Tabler (`tabler:`), Phosphor (`ph:`), and Material Symbols
(`material-symbols:`) are all monochrome and will be tinted with the theme's
accent color automatically. Multicolor sets won't pick up the accent color.

## Notes

- Icon data is fetched from the Iconify API the first time an icon is used and
  then cached in the browser, so live presenting and editing need network access
  on first load. If you export to PDF on a machine without internet, render the
  deck once online first (to populate the cache) or switch to a bundled icon
  set.
- Sizing is handled by the theme: cover icons render larger than footer icons,
  matching the prominence of the original square marks.
