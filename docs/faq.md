---
layout: docs
title: FAQ
permalink: /docs/faq/
description: The questions that come up, answered plainly.
---

---

## Setup

### `bundle install` fails

Almost always Ruby. Check `which ruby` — if it says `/usr/bin/ruby` on macOS,
that is the system Ruby and it is too old. Install a current one with `rbenv`,
`chruby` or Homebrew.

If it fails on `ffi` or `sass-embedded` specifically, it is usually a stale
build from a previous Ruby version:

```bash
rm -rf vendor/bundle Gemfile.lock
bundle install
```

Never use `sudo`. If you are hitting permissions errors, install into the
project instead:

```bash
bundle config set --local path vendor/bundle
```

### My `_config.yml` change did nothing

Jekyll reads `_config.yml` once, at boot. Restart the server.

### The site builds but every link is broken

You are probably on a project site and `baseurl` is not set — or is set and you
are serving without it. Both have to agree:

```yaml
baseurl: "/my-repo"
```

```bash
bundle exec jekyll serve --baseurl "/my-repo"
```

Links you write yourself need `| relative_url`; every link the theme generates
already has it.

---

## Deployment

### The Actions workflow is green but the site has not changed

**Settings → Pages → Source** is still on "Deploy from a branch". Switch it to
"GitHub Actions". This catches almost everyone once.

### Analytics work locally but not live (or vice versa)

Analytics are gated on `JEKYLL_ENV=production`. The included workflow sets it.
If you build another way, set it yourself.

### The custom domain shows a 404

Three things to check, in order: `CNAME` exists in the repository root and
contains exactly the hostname; DNS has propagated (`dig your-domain.com`);
`url:` in `_config.yml` matches.

### Both `github.io` and my domain are in Google

Confirm `CNAME` is present — it makes GitHub 301 the `github.io` URL — and that
`url:` is set to the domain you want. See
[deploying.md](/docs/deploying/#keeping-one-domain-in-the-index).

---

## Content

### Pagination is not happening

`jekyll-paginate` only paginates a file named `index.html`. The blog index is
`blog/index.html` for that reason. Renaming it to `blog.md` silently breaks
pagination — the page still builds, it just shows every post.

### My collection does not appear

Three things are needed: an entry in `collections:` with `output: true`, a
folder named `_thecollection/`, and an index page with
`list_collection: thecollection`. See [content.md](/docs/content/#adding-a-collection).

### The table of contents is missing

It needs at least two `h2`/`h3` headings — a TOC with one entry is furniture.
It is also built by JavaScript from the rendered article, so it will not appear
with scripting disabled. The headings themselves are unaffected.

### Code blocks are not highlighted

Name the language on the fence:

````markdown
```apex
public class Foo {}
```
````

Rouge does not know `apex` natively; it falls back to a reasonable generic
lexer, which is why Apex still colours correctly. `java` gives slightly better
results if you would rather be exact.

### An emoji or symbol renders as a box

The theme does not ship an emoji font — that comes from the reader's OS.
Nothing to fix on your side.

---

## Design

### How do I change the colour?

One line in `_config.yml`:

```yaml
theme_style:
  accent: "#7c3aed"
```

That regenerates the whole ramp. See [customising.md](/docs/customising/).

### My accent looks wrong on white

Some hues do not survive being lightened. Accent text uses the ramp's 700 step,
which needs 4.5:1 against white — a bright yellow or cyan will not get there.
Pick a mid-tone.

### Can I turn off dark mode?

```yaml
theme_style:
  default_scheme: light
header:
  dark_toggle: false
```

That sets light as the default and removes the toggle. Readers who have already
chosen dark keep it — their choice is in `localStorage`, and overriding it
would be rude. To force light for everyone, add to
`_sass/trailblazer-overrides.scss`:

```scss
:root[data-theme="dark"] { color-scheme: light; }
```

…and copy the light token block over it. Consider not doing this.

### The dropdown menu will not close

It is a `<details>` element; closing on outside-click is added by `theme.js`.
If the script has not loaded, the menu still opens and closes on click — check
the console.

---

## Accessibility

### What has been done

Semantic landmarks, a skip link, `aria-current` on the active nav item,
`aria-expanded` on the drawer, focus-visible rings on everything interactive,
44px minimum touch targets, prefers-reduced-motion honoured throughout, and a
palette checked at AA for every text pairing.

The `--tb-fg-faint` token is deliberately *below* 4.5:1 — it is for decorative
text only and must never carry information.

### What is on you

Alt text on your images, honest link text ("the migration write-up", not "click
here"), and heading levels that do not skip. The theme cannot fix any of those
from a template.

---

## Licence

### Can I use this for a client site?

Yes. MIT — any number of sites, commercial included.

### Can I remove the footer credit?

Yes. It is appreciated, not required; the line lives in
`_includes/footer.html` behind a comment.

### Can I redistribute a modified version?

Yes, under the MIT terms: keep the licence and copyright notice, and give
your fork its own name so users can tell whose work they are running.

### Is this a Salesforce product?

No. Trailblazer is an independent open-source theme. Salesforce, Trailblazer,
Trailhead, Apex and Lightning are trademarks of Salesforce, Inc., and this
theme is not endorsed by or affiliated with them. It ships no Salesforce
artwork — every mark in it was drawn for the theme.
