# Contributing to Trailblazer

Thanks for being here. Bug reports, fixes and well-argued improvements are
all welcome; this page is the map.

## Ground rules

- **Be kind, be specific.** "The breadcrumb wraps on the course page at
  360px" gets fixed; "navigation is broken" gets a question back.
- **One change per pull request.** A fix and a feature in one diff means the
  fix waits for the feature's discussion.
- **The demo content is fictional.** Keep it that way — no real employers,
  no real client names, no real people in placeholder material.
- **No AI attribution in commits.** No `Co-Authored-By` bots, no "generated
  with" lines. Contributions are published as the contributors' own work.

## Getting set up

```bash
git clone https://github.com/imswarnil/trailblazer-jekyll-theme.git
cd trailblazer-jekyll-theme
bundle install
bundle exec jekyll serve        # http://localhost:4000
```

Ruby 3.1+ recommended. There is no Node toolchain — the one script and one
stylesheet ship as-is, compiled only by Jekyll.

Before opening a PR, run a production build and click through what you
touched in both themes and at a phone width:

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

The Actions workflow runs the same build plus a smoke test (pages exist, no
unrendered Liquid), so a green local build is usually a green PR.

## Where things live

Read `AGENTS.md` first — it is the condensed field guide, including the five
or six traps that bite everyone once (Liquid's `blank`, assets with front
matter, kramdown's `highlighter-rouge` on inline code, `@import` order).

| Path | What it is |
| --- | --- |
| `_sass/trailblazer/` | the design system: tokens → base → layout → components → utilities |
| `_layouts/`, `_includes/` | the templates; `_includes/components/` are the Markdown shortcodes |
| `assets/js/theme.js` | the one script — everything in it must stay optional |
| `docs/` | the documentation, which also renders on-site at `/docs/` |
| `/style-guide/`, `/showcase/` | living references — a broken component shows up there first |

## The house rules of the code

These are the conventions that keep the theme coherent; PRs that fight them
will be asked to reconsider rather than merged:

1. **Components read semantic tokens** (`--tb-accent`, `--tb-fg-muted`) —
   never a ramp step, never a raw hex. One override should rebrand everything.
2. **State lives in ARIA** — style `[aria-current]` and `[aria-expanded]`,
   never an invented `.active` class.
3. **The platform first** — `<details>`, `<dialog>`, real inputs. If your
   feature needs 200 lines of JS to reimplement focus handling, the design
   is wrong, not the budget.
4. **Everything in `theme.js` is an enhancement.** The site must read fully
   with the file deleted.
5. **Motion is honest** — under 200ms for feedback, everything off under
   `prefers-reduced-motion`, and the finished state is the resting state.
6. **Comment the why, not the what.** The file headers carry the argument of
   each layer; keep that voice.

## Reporting a bug

Open an issue with: the page (a URL or a path in the repo), what you
expected, what happened, browser + width, and — gold standard — the smallest
front matter or Markdown that reproduces it.

## Proposing a feature

Open an issue before writing code. The theme says no to features that add a
build step, a runtime dependency, or a second accent colour — and yes,
happily, to almost anything that makes the existing system do more with what
it already has.

## Releasing (maintainers)

1. Update `CHANGELOG.md` and the version in the gemspec.
2. Tag: `git tag v1.x.0 && git push --tags`.
3. `gem build trailblazer-jekyll-theme.gemspec && gem push *.gem`.

## Licence

By contributing you agree your contribution is licensed under the project's
[MIT License](LICENSE).
