---
layout: docs
header_layout: full
title: Customising
permalink: /docs/customising/
description: Colours, tokens, overrides — and where the design system comes from.
---

The theme is built on two tiers of design token. **Primitives** are colour
ramps; **semantic aliases** are the names components actually read
(`--tb-accent`, `--tb-fg-muted`, `--tb-line-default`). No component ever reads
a ramp step or a raw hex.

That is why one hex re-brands the whole site, and why almost every change you
want to make is a token override rather than a rule.

---

## Level 1 · `_config.yml`

Covers most of what people want.

```yaml
theme_style:
  accent: "#0176d3"
  craft: "#e8a33d"
  radius_scale: 1
  default_scheme: system
  fonts:
    google: true
    display: '"Space Grotesk", "Inter", system-ui, sans-serif'
    body: '"Inter", system-ui, sans-serif'
    mono: '"IBM Plex Mono", ui-monospace, monospace'
```

### The accent

`accent` generates an eleven-step ramp at build time by mixing toward white and
black on a tuned lightness curve. Everything downstream moves with it: buttons,
links, focus rings, badges, the certification seals, the eyebrow dot, list
markers, code-block accents, and both light and dark palettes.

Pick a colour that reaches **4.5:1 against white at its 700 step**, which is
what carries body-sized accent text. A mid-tone blue, green, red or purple is
safe; a bright yellow or cyan is not — those go pale as they lighten and the
generated 700 will not be dark enough.

To check, build the site and inspect `--tb-fg-accent` against `--tb-bg-canvas`
in any contrast checker.

### Radius

`radius_scale` multiplies the whole radius ladder. `0` gives square corners
throughout, `1.5` gives generous ones. It is one number because a theme where
cards are round and buttons are square looks like two themes.

### Fonts

Set `google: false` to drop the webfont link entirely and fall back to the
system stack — one fewer third-party request, a faster first paint, and one
fewer thing in your privacy policy.

To self-host instead, put the files in `assets/fonts/`, set `google: false`,
and add the `@font-face` rules to `_sass/trailblazer-overrides.scss`. Always
include `font-display: swap`, or text is invisible while the font loads.

---

## Level 2 · token overrides

Create `_sass/trailblazer-overrides.scss` in your site. It is imported **last**,
so anything in it wins, and it ships empty precisely so you have somewhere to
put changes that survives a theme update.

```scss
:root {
  --tb-radius-card: 4px;              // squarer cards, everywhere
  --tb-w-prose: 40rem;                // a narrower reading column
  --tb-font-heading: "Georgia", serif; // headings only
  --tb-section-md: 4rem;              // tighter section rhythm
}

:root[data-theme="dark"] {
  --tb-bg-canvas: #000;               // a true-black dark mode
  --tb-bg-surface: #0a0a0a;
}
```

### The tokens worth knowing

**Colour** — set these and everything follows.

| Token | Is |
| --- | --- |
| `--tb-bg-canvas` | The page |
| `--tb-bg-surface` | A card |
| `--tb-bg-sunken` | A well: inputs, code, table headers |
| `--tb-bg-inverse` | The dark band: CTA, footer, secondary buttons |
| `--tb-fg-default` | Body text |
| `--tb-fg-muted` | Secondary text |
| `--tb-fg-subtle` | Metadata |
| `--tb-fg-faint` | Decorative only — below 4.5:1 by design |
| `--tb-line-subtle` / `-default` / `-strong` | Hairlines, card edges, screenshot-proof |
| `--tb-accent` | The one chromatic voice with authority |
| `--tb-craft` | The rationed second hue. One per page. |

**Space** — `--tb-space-1` … `--tb-space-32` on a 4px base, plus
`--tb-section-sm/md/lg` for the vertical rhythm between sections and
`--tb-gutter` for the page's side margins.

**Width** — `--tb-w-prose` (44rem), `--tb-w-narrow`, `--tb-w-site` (71rem),
`--tb-w-wide`.

**Radius** — `--tb-radius-control`, `-card`, `-media`, `-sheet` are the
component-level intents. Retune those rather than the raw ladder.

**Motion** — `--tb-dur-1` (120ms) through `--tb-dur-4` (560ms), and
`--tb-ease-out` / `-in` / `-inout` / `-spring`.

The complete list is in `_sass/trailblazer/tokens/`, which is worth reading —
it is about 300 lines and it is the whole design system.

---

## Level 3 · rules

Write an actual rule only when a change cannot be expressed as a token. At that
point it is usually a new component rather than a patch.

```scss
// _sass/trailblazer-overrides.scss

.tb-card {
  border-left-width: var(--tb-border-3);
  border-left-color: var(--tb-accent);
}

// The breakpoint mixins are available here too.
@include tb-up("lg") {
  .tb-hero__title { font-size: var(--tb-text-6xl); }
}
```

Available mixins: `tb-up($key)`, `tb-down($key)`, `tb-hover`,
`tb-reduced-motion`. Breakpoints: `xs` 34rem, `sm` 40rem, `md` 48rem,
`lg` 64rem, `xl` 75rem.

---

## Replacing a layout or include

Copy the file out of the theme, keep the same path, edit yours:

```bash
cp $(bundle show trailblazer-jekyll-theme)/_includes/footer.html _includes/
```

On a fork, just edit the file — it is already yours.

Two escape hatches that avoid a copy:

```yaml
# front matter — inject an include into <head> for one page
head_custom: my-widget.html

# front matter — extra scripts at the end of <body>
scripts:
  - /assets/js/chart.js
```

---

## Where the design system comes from

The framework in `_sass/trailblazer/` is a port of the
[Creator Design System](https://design.imswarnil.com) — same two-tier token
architecture, same house rules, same component grammar — re-keyed to Sass
variables so `_config.yml` can drive it, and skinned for this theme: the
cloud-blue accent, the `tb-` prefix, and the Salesforce-developer surfaces
(the certification shields, the repo cards, the course player).

The layering, from bottom to top:

1. **the ported system** — `_sass/trailblazer/` (tokens → base → layout →
   components → utilities)
2. **the Salesforce skin** — the values `_config.yml` feeds it at build time
3. **your site** — `_sass/trailblazer-overrides.scss`, imported last

Which is why the customisation story is the same at every layer: override a
token, and everything below it follows.

## The house rules

If you are extending the theme rather than just re-skinning it, these are the
conventions that keep it coherent:

1. **Two tiers.** Components read semantic aliases, never ramp steps and never
   raw hex. One override should be able to rebrand everything.
2. **State lives in ARIA.** Style `[aria-current]`, `[aria-expanded]`,
   `[data-*]`. Never invent an `.active` class that can disagree with the
   accessibility tree.
3. **The platform first.** `<details>`, `<dialog>`, real radio inputs, native
   form controls. Keyboard support and Escape should come free rather than be
   rebuilt.
4. **Motion is honest.** Under 200ms for feedback, one property at a time,
   everything off under `prefers-reduced-motion`. The finished state is the
   resting state — nothing may be unreachable if an animation never runs.
5. **One accent, rationed.** The theme is nearly monochrome so a single colour
   can carry meaning. Adding a second hue is a change to the argument of the
   design, not a tweak.
6. **Gap, not margin.** Layouts space their children with `gap`. A margin
   between siblings is a bug waiting for someone to reorder them.
