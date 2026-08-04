---
layout: docs
title: Configuring
permalink: /docs/configuring/
description: Every key in _config.yml, explained.
---

Everything visible on the site is driven from `_config.yml`. This is the
reference; the file itself is commented, and reading it top to bottom once is
the fastest way to learn the theme.

> **Restart after editing.** Jekyll reads `_config.yml` once, at boot. Live
> reload will not pick up a change to it.

---

## Identity

```yaml
title: Trailblazer
tagline: Jekyll theme for Salesforce developers
description: >-
  Shown in search results and on share cards when a page has no description
  of its own. Two sentences, maximum.

url: https://trailblazer.imswarnil.com   # no trailing slash
baseurl: ""                              # "/repo-name" for a project site

lang: en
locale: en_US
timezone: Asia/Kolkata
```

`url` is the most important line in the file. Every absolute URL the theme
emits is built from it — canonical tags, Open Graph images, the sitemap,
JSON-LD. See [deploying.md](/docs/deploying/#keeping-one-domain-in-the-index).

---

## Author

Read by the header, footer, author card, resume and Person structured data.

```yaml
author:
  name: Ava Rodriguez
  first_name: Ava            # used in "More about Ava"
  role: Senior Salesforce Developer
  headline: One line, shown in the article sidebar
  avatar: /assets/img/avatar.svg
  bio: >-
    Two or three sentences. Appears under every post.
  email: hello@example.com
  location: Bengaluru, India
  resume_pdf: /assets/files/resume.pdf   # remove the key to hide the button
```

---

## Style

```yaml
theme_style:
  accent: "#0176d3"       # generates the whole colour ramp
  craft: "#e8a33d"        # the rationed second hue
  success: "#2e844a"
  warning: "#dd7a01"
  danger: "#ba0517"

  radius_scale: 1         # 0 = sharp, 1 = default, 1.5 = generous
  default_scheme: system  # light · dark · system

  fonts:
    google: true          # false = system stack, no third-party request
    display: '"Space Grotesk", "Inter", system-ui, sans-serif'
    body: '"Inter", system-ui, -apple-system, sans-serif'
    mono: '"IBM Plex Mono", ui-monospace, monospace'
```

These are compiled into the stylesheet at build time. Details and the full
token list: [customising.md](/docs/customising/).

---

## Header

```yaml
header:
  layout: island        # island = floating pill · full = edge-to-edge bar
  sticky: true
  blur: true            # frosted glass; falls back to solid where unsupported
  brand: both           # both · logo · title
  search: true          # the ⌘K / "/" palette
  dark_toggle: true
  progress: true        # reading-progress hairline, on articles only
  cta:
    label: Hire me
    url: /contact/
  icon_links:                # icon-only links beside the theme toggle
    - icon: github
      url: https://github.com/example
      label: GitHub          # required — the accessible name
```

Remove the `cta:` block entirely to drop the button.

**Per page**, any header setting can be overridden from front matter — a
landing page that wants a welded bar on a site of islands sets one key:

```yaml
header_layout: full        # island · full
header_sticky: false
header_blur: false
header_progress: false
header_search: false
```

**Reading progress** renders as a fine accent ring around the island — it
starts at the brand and travels the pill's outline as the reader travels the
article. On the `full` layout it is a hairline along the bar's bottom edge.
At zero, both are invisible.

---

## Footer

```yaml
footer:
  layout: columns       # columns · minimal
  boxed: false          # wrap it in a rounded island card
  tagline: One line under the logo.
  show_social: true
  show_collections: true   # generated from site.collections
  newsletter: true
  links:                   # an extra hand-picked column
    - { title: About, url: /about/ }
  legal:                   # the sign-off row
    - { title: Privacy, url: /privacy/ }
```

The collection column is generated, so adding a collection puts it in the
footer without anyone having to remember.

---

## Navigation

```yaml
navigation:
  - title: Blog
    url: /blog/
    icon: pen

  - title: Work           # no url + children = a dropdown
    icon: layers
    children:
      - title: Projects
        url: /projects/
        icon: layers
        blurb: Shown as a second line in the dropdown.
```

`icon` is the name of a symbol in `_includes/icons.svg`, without the `tb-`
prefix. The current page is marked with `aria-current`, which is what the
stylesheet reads — there is deliberately no `.active` class.

---

## Social

```yaml
social:
  - name: GitHub
    url: https://github.com/example
    icon: github
  - name: Mastodon
    url: https://mastodon.social/@example
    icon: mastodon
    rel_me: true        # adds rel="me" — see below
```

Rendered in the footer, in the article sidebar, on the resume, and emitted as
`sameAs` in the Person structured data — which is how a search engine learns
these profiles are the same person.

`rel_me: true` is a claim, not decoration: it says "that profile is me, and it
links back here". Mastodon uses it to verify a link. Setting it on a profile
that does not link back just makes the claim fail quietly.

Available icons: `github`, `linkedin`, `mastodon`, `bluesky`, `youtube`,
`rss`, `mail`, `cloud`, `link`.

---

## Collections

```yaml
collections:
  posts:
    output: true
    permalink: /blog/:title/
    index_url: /blog/          # where the index page lives
    sidebar: right             # right · left · false — the article rail;
                               # front matter `sidebar:` overrides per page
    singular: Post             # the label for one entry
    icon: pen
    schema: BlogPosting        # schema.org @type for JSON-LD
    hero_style: statement      # statement · split · band · minimal
    card_style: numbered       # deck · numbered · bento · compact
    image: /assets/img/covers/blog.svg   # fallback cover
```

`singular`, `icon`, `schema`, `hero_style`, `card_style`, `index_url` and
`image` are this theme's keys, not Jekyll's. Together they mean a new
collection needs no new layout — see [content.md](/docs/content/).

`posts` is declared here for those keys only. Jekyll populates it from
`_posts/` regardless.

---

## Pagination

```yaml
paginate: 6
paginate_path: /blog/page/:num/
```

`jekyll-paginate` only paginates a file named `index.html`, which is why the
blog index is `blog/index.html` rather than `blog.md`. Pages past the first
are marked `noindex, follow`.

---

## SEO

```yaml
seo:
  default_image: /assets/img/og-default.svg   # 1200×630
  twitter: "@example"
  json_ld: true
  google_site_verification: ""    # empty = the meta tag is not rendered
  bing_site_verification: ""
```

See [seo.md](/docs/seo/).

---

## Integrations

Every value is empty by default, and nothing loads until one is filled in.
Analytics, comments and push are additionally gated on
`jekyll.environment == "production"`, so they never fire during local
development.

See [integrations.md](/docs/integrations/) for the full list.

---

## Reading

```yaml
reading:
  words_per_minute: 220
  show_reading_time: true
  show_toc: true          # auto table of contents from h2/h3
  excerpt_words: 34
```

---

## Build

```yaml
markdown: kramdown
highlighter: rouge

sass:
  style: compressed
  sourcemap: never
  quiet_deps: true
  silence_deprecations: [import, global-builtin]

plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-paginate
```

The `silence_deprecations` list is deliberate: the framework uses `@import`
rather than `@use` so that it also compiles under the older Sass converter
classic GitHub Pages ships. Dart Sass warns about that on every build, and the
warning would otherwise bury real errors.

Do not add plugins beyond these three if you want the site to keep working on
classic GitHub Pages — see [deploying.md](/docs/deploying/).

---

## Per-page front matter

Anything in `_config.yml` under `defaults:` can be overridden per page:

| Key | Effect |
| --- | --- |
| `layout` | `default`, `home`, `page`, `post`, `resume`, `archive` |
| `hero_style` | Overrides the collection's hero shape |
| `sidebar: false` | Drops the article's right rail |
| `share: false` | Drops the share row |
| `comments: false` | Drops the comment thread |
| `toc: false` | Drops the table of contents on this page |
| `noindex: true` | `noindex, follow` |
| `search: false` | Keeps the page out of `/search.json` |
| `sitemap: false` | Keeps the page out of `sitemap.xml` |
| `width` | `prose` or `wide` — the container crop |

Full list with examples: [content.md](/docs/content/).
