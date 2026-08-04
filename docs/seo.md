---
layout: docs
header_layout: full
title: SEO
permalink: /docs/seo/
description: Structured data, sitemaps and canonical URLs.
---

What the theme emits, and the handful of things you have to get right.

---

## The one setting that matters

```yaml
url: https://trailblazer.imswarnil.com
baseurl: ""
```

No trailing slash. Every absolute URL the theme produces is built from this:
canonical tags, Open Graph images, the sitemap, JSON-LD. Wrong here means wrong
in all of them.

---

## Per page

Every page gets, automatically:

- `<title>` — `Page · Site`, or `Site · Tagline` on the home page
- `<meta name="description">` — from `description`, else the excerpt, else the
  site description
- `<link rel="canonical">` — its own absolute URL
- Open Graph and Twitter cards, with the right image
- JSON-LD typed by its collection

Override any of them in front matter:

```yaml
seo_title: A different headline for search results
description: The meta description and the card excerpt.
image: /assets/img/a-real-screenshot.png
canonical_url: https://elsewhere.com/original   # for cross-posts
noindex: true
```

`seo_title` exists because the best on-page headline and the best
search-result headline are often not the same sentence.

---

## Structured data

Written by hand rather than delegated to `jekyll-seo-tag`, for one reason: this
theme has typed collections, and the structured data for a talk should not
claim to be a blog post. The plugin emits one shape; this emits the shape the
collection declared.

**Every page** gets its collection's `schema:` type — `BlogPosting`,
`CreativeWork`, `SoftwareSourceCode`, or `WebPage` for a plain page. Override
per page with `schema:` in front matter.

**The home page** additionally gets `WebSite` with a `SearchAction`, which is
what can produce a search box under your result in Google.

**The home page and `/resume/`** get `Person`, built from `author:` in
`_config.yml`. Two parts of it are worth understanding:

- **`sameAs`** is the list of profiles that are provably the same human, taken
  straight from your `social:` block. It is the single most useful thing on the
  page for an entity search, and there is no second list to keep in sync.
- **`hasCredential`** is generated from `_data/certifications.yml`. Eight
  Salesforce certifications become eight machine-readable credentials, each
  with its issuer and verification URL.

To put `Person` on another page:

```yaml
person_schema: true
```

**Collection entries** also get a `BreadcrumbList`: Home → Collection → Entry,
using the collection's `index_url`.

Check any page with Google's Rich Results Test or
[validator.schema.org](https://validator.schema.org).

---

## Share images

Order of preference: the page's `image:` → the collection's `image:` →
`seo.default_image`.

Make real ones 1200×630. The theme's fallbacks are SVG, which most platforms
render fine but a few do not — if share cards matter to you, export a PNG and
point `seo.default_image` at it.

---

## Sitemap and robots

`jekyll-sitemap` generates `/sitemap.xml` from every published page. Exclude
one with `sitemap: false` in its front matter — already set on `/search/`,
`/offline/` and `/404.html`.

`robots.txt` is a real file in the repository, so you can read and edit it. It
allows everything except `/search/` (a client-side search page whose content
depends on a query string — every crawl of it is a different thin page) and
`/offline/` (the service worker's shell, not a page).

Submit the sitemap once, in Google Search Console → Sitemaps.

---

## Keeping one domain in the index

A GitHub Pages site with a custom domain answers on two hostnames. Three things
already handle it — `CNAME`, the canonical tag, and `robots.txt` pointing at
one sitemap. The requirement on you is simply: set `url:` to the domain you
want indexed, and leave `CNAME` in place.

The full explanation, with the commands to verify it, is in
[deploying.md](/docs/deploying/#keeping-one-domain-in-the-index).

---

## Pagination

Pages 2 and beyond of the blog archive are marked `noindex, follow` — they are
lists of links, not pages anyone should land on from a search, but the crawler
still needs to walk through them to reach the posts. The `rel="prev"` and
`rel="next"` links are on the pagination control.

---

## Feeds

`jekyll-feed` generates `/feed.xml` from `_posts/`. It is linked in `<head>`,
in the footer, and in the newsletter fallback text.

To include other collections:

```yaml
feed:
  collections:
    projects:
      path: /projects/feed.xml
```

---

## Performance

Ranking follows loading, so: the theme ships one stylesheet (~14 KB gzipped),
one deferred script (~9 KB), an inline icon sprite, and no framework. Images
below the fold are `loading="lazy"`; the hero is not, because lazy-loading the
thing at the top of the page delays the largest paint.

The two ways to make it slower are both optional and both in your control:

- **Google Fonts** — three families over a third-party connection. Set
  `theme_style.fonts.google: false` to drop them.
- **Comment embeds** — they load lazily, but they are still the heaviest thing
  on an article page.
