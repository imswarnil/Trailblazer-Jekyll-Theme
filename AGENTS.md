# Working in this repository

Instructions for anyone — human or AI — making changes here. This is the
condensed version of `docs/customising.md` plus the file headers in `_sass/`.

Trailblazer is a commercial Jekyll theme for Salesforce developers. Token-first
CSS, no JavaScript build step, and every plugin it uses runs on GitHub Pages.

## Commands

```bash
bundle exec jekyll serve                        # http://localhost:4000
bundle exec jekyll build                        # one-off build
JEKYLL_ENV=production bundle exec jekyll build  # what CI runs

# SCSS-only check, no Jekyll
npx --yes sass@1.77.8 --no-source-map --load-path=_sass \
  <(printf '$tb-accent:#0176d3;@import "trailblazer/index";') /dev/null
```

## Rules that will bite you

1. **`_config.yml` is read once, at boot.** Live reload will not pick up a
   change to it. Restart the server, and do not spend twenty minutes wondering
   why a colour did not change.

2. **`blank` is not a Liquid literal in this build.** `x != blank` is always
   true, which silently defeats every "only render if configured" guard. Use
   `{% if x and x != "" %}`. Liquid also has no parentheses and evaluates
   `and`/`or` right-to-left — for more than two terms, `capture` the values and
   test once.

3. **A file with front matter is a page.** Which means `defaults:` applies to
   it, and an asset without `layout: null` gets wrapped in the site's HTML
   shell and served as a document. There is a `defaults` scope for `assets/`
   guarding this; do not remove it.

4. **Kramdown puts `highlighter-rouge` on inline `<code>` too**, not just on
   block wrappers. Anything styling code blocks must be scoped to
   `div.highlighter-rouge` or every inline snippet in a sentence turns into a
   dark slab.

5. **Import order in `_sass/trailblazer/_index.scss` is load-bearing.** It is
   `@import`, so one shared global scope: abstracts → tokens → base → layout →
   components → utilities LAST. Move a line and something below it loses its
   variables.

6. **`@import`, not `@use`.** Deliberate: classic GitHub Pages ships an older
   Sass converter with no `@use`. The resulting deprecation warnings are
   silenced in `_config.yml` so they cannot bury real errors.

7. **Only three plugins.** `jekyll-feed`, `jekyll-sitemap`, `jekyll-paginate`.
   All three are on GitHub's allowlist, which is what lets a buyer deploy
   without a workflow. Adding a fourth breaks that promise — `paginate-v2` in
   particular is tempting and is not allowlisted.

8. **`jekyll-paginate` only paginates `index.html`.** That is why the blog
   index is `blog/index.html` rather than `blog.md`. Renaming it silently
   removes pagination.

9. **No AI attribution in commits.** No `Co-Authored-By`, no "Generated with"
   line, no AI listed as a contributor. This is published as the owner's work.

## Layout

| Path | What it is |
| --- | --- |
| `_sass/trailblazer/` | the framework; `abstracts` → `tokens` → `base` → `layout` → `components` → `utilities` |
| `_sass/trailblazer-overrides.scss` | ships empty, imported last, the buyer's file |
| `assets/css/main.scss` | has front matter, so Liquid writes `_config.yml` values into Sass variables before compiling |
| `assets/js/theme.js` | one deferred file, pure enhancement |
| `_includes/components/` | the Markdown shortcodes |
| `_includes/integrations/` | one file per third party, each behind its own guard |
| `_includes/icons.svg` | the sprite, inlined once per page |
| `docs/` | the documentation; excluded from the build. Order lives in `_data/docs_nav.yml`, which drives the rail, the prev/next pagination AND `scripts/build-docs.rb` (offline HTML + PDF) — add a guide there or it is invisible everywhere |
| `starter/` | the buyer's skeleton site (gem install); excluded from the build, verified against the packaged gem |
| `package.json`, `scripts/` | optional npm wrappers over the Ruby toolchain — never a real dependency |

## House rules of the CSS

- **Two tiers.** Components read semantic aliases (`--tb-accent`,
  `--tb-fg-muted`), never a ramp step and never a raw hex. One override should
  be able to rebrand everything.
- **State lives in ARIA.** Style `[aria-current]`, `[aria-expanded]`,
  `[data-*]`. Never invent an `.active` class that can disagree with the
  accessibility tree.
- **The platform first.** `<details>` for disclosure, `<dialog>` for the search
  palette, real radio inputs for tabs. Keyboard support and Escape should come
  free rather than be rebuilt.
- **Motion is honest.** Under 200ms for feedback, one property at a time,
  everything off under `prefers-reduced-motion`. The finished state is the
  resting state — nothing may be unreachable if an animation never runs.
- **One accent, rationed.** The theme is nearly monochrome so that a single
  colour can carry meaning. Adding a second hue is a change to the argument of
  the design, not a tweak.
- **Gap, not margin.** Layouts space children with `gap`. A margin between
  siblings is a bug waiting for someone to reorder them.

## JavaScript

`assets/js/theme.js` is optional. Everything in it — the theme toggle, the
drawer, the table of contents, search, copy buttons, scroll reveal — enhances
markup that already works. It only ever sets attributes and classes the
stylesheet already understands, so CSS stays the single description of how
anything looks. Keep it that way.

The scroll-reveal trick is worth understanding before touching it: the hidden
state is applied by CSS **only** when `html.tb-js` is present, and that class is
set by the head script. So with JavaScript off, nothing is ever hidden.

## When editing

- Comment *why*, not *what*. The file headers carry the argument of each layer;
  keep that voice.
- Match the surrounding density. A rule with one declaration stays on one line.
- Check both themes and both a wide and a narrow viewport before calling
  something done. Most of the bugs found in this theme so far were visible in
  one of the four and invisible in the other three.
