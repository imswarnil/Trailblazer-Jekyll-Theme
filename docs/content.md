---
layout: docs
title: Content
permalink: /docs/content/
description: Collections, front matter, courses and hero styles.
---

How collections, front matter and the hero system fit together.

The short version: **a collection declares its own shape in `_config.yml`, and
every entry in it renders through one shared layout.** Adding a collection does
not mean writing a layout, and changing how a collection looks everywhere is
one line of config.

---

## The seven collections

| Folder | URL | Card style | Hero | Schema |
| --- | --- | --- | --- | --- |
| `_posts/` | `/blog/:title/` | numbered | statement | `BlogPosting` |
| `_projects/` | `/projects/:name/` | repo | split | `CreativeWork` |
| `_snippets/` | `/snippets/:name/` | compact | minimal | `SoftwareSourceCode` |
| `_talks/` | `/talks/:name/` | deck | band | `CreativeWork` |
| `_courses/<slug>/` | `/courses/<slug>/` | deck | statement | `Course` |
| `_books/` | `/books/:name/` | book | minimal | `Book` |

`_posts/` files must be named `YYYY-MM-DD-slug.md`. The others are just
`slug.md` — they carry a `date:` in front matter if they have one, and sort by
filename if they do not.

---

## Writing a post

`_posts/2026-05-18-governor-limits-are-a-design-tool.md`:

```yaml
---
title: Governor limits are a design tool
description: >-
  Shown in the card, the search index, the meta description and the share
  card. One or two sentences.
date: 2026-05-18
tags: [Apex, Architecture]
image: /assets/img/covers/blog.svg
featured: true          # accent border on the card; use it once
---
```

Then Markdown. Everything is styled by the `tb-prose` wrapper — headings,
lists, tables, blockquotes, images, footnotes and fenced code — with no classes
in the content itself.

### Front matter, by what it does

**Every entry**

| Key | Effect |
| --- | --- |
| `title` | Required. The heading, the card, the `<title>`. |
| `description` | The lead paragraph, the card excerpt, the meta description. |
| `date` | Sort order and the displayed date. |
| `tags` | Chips on the card, anchors in the archive, `keywords` in JSON-LD. |
| `image` | Cover, and the Open Graph share image. |
| `image_alt` | Alt text for the cover. Empty string if it is decorative. |
| `featured` | Pulls it to the front and gives it the accent edge. |

**Article layout**

| Key | Default | Effect |
| --- | --- | --- |
| `sidebar` | the collection's `sidebar:` in config | `right` · `left` · `false`. Where the rail goes, or whether there is one — `false` centres a bare reading column |
| `hero_split` | off | With an `image:`, the header becomes two columns — title left, image right |
| `share` | `true` for posts | The share row |
| `comments` | `true` for posts | The comment thread, if one is configured |
| `toc` | `true` | The table of contents |
| `breadcrumb` | on | `false` drops the trail on this page |
| `header_layout` etc. | the `header:` block | `header_layout`, `header_sticky`, `header_blur`, `header_progress`, `header_search` override the site header per page |

Every shell has a live demonstration at [/showcase/](https://trailblazer.imswarnil.com/showcase/).

**Type-specific**

| Key | Used by | Effect |
| --- | --- | --- |
| `type: video` | posts | The post opens as a player, its card shows ▶ and the runtime, and the JSON-LD becomes `VideoObject` |
| `video` | any | A YouTube id — the embed becomes the lead media |
| `duration` | video posts, lessons | The runtime ("12:41" / "18 min") |
| `series` + `series_part` | posts | Joins the post to a named series; the parts box lists every member |
| `language` | snippets, projects | JSON-LD `programmingLanguage`, and the repo card's language dot |
| `repo` | projects | The mono repository name on the repo card (defaults to a slug of the title) |
| `github` / `demo` | projects | The Source and Live-preview buttons, on the card and at the top of the case study |
| `lessons` | courses | A list of `{ title, duration, summary, url, done }` — rendered as the syllabus, counted on the card |
| `level` / `total_duration` | courses | Shown in the card meta and the syllabus heading |
| `book_author` | books | The byline, and the `author` in the Book JSON-LD (so the site owner does not claim the book) |
| `rating` | books | 1–5, drawn as stars and spelled out for screen readers |
| `status` | books | "Read" / "Reading" — the badge on the cover |
| `facts` | any | A definition list above the prose |

`facts` is how a project or talk states the things that belong above the prose
rather than buried in it:

```yaml
facts:
  - { label: Client, value: Northwind Digital }
  - { label: Year, value: "2025–2026" }
  - { label: Stack, value: "LWC, Apex, Platform Cache" }
  - { label: Source, value: "GitHub", url: "https://github.com/..." }
```

---

## Hero styles

Every page opens with a hero. The shape comes from `hero_style` in front
matter, falling back to the collection's own `hero_style` in `_config.yml`.

| Style | Shape | Good for |
| --- | --- | --- |
| `statement` | Centred, large, patterned background | Section fronts, 404 |
| `split` | Copy beside a portrait or image | The home page, About |
| `band` | Full-bleed inverse billboard | Talks, anything cinematic |
| `minimal` | Title and a rule | Utility pages, snippets |

```yaml
---
title: Projects
hero_style: split
hero_eyebrow: Selected work
hero_title: Things I built, and <em>what they cost</em>.
hero_lead: One supporting sentence.
hero_image: /assets/img/covers/projects.svg
hero_tag: Open to work            # a badge over the image, split style only
hero_actions:
  - { label: Get in touch, url: /contact/, style: primary, icon: arrow-right }
  - { label: Read the blog, url: /blog/, style: ghost }
---
```

Two rules the component enforces:

- **`hero_title` is the only field that honours markup**, and only `<em>` —
  which paints the one rationed accent phrase. Everything else is escaped.
- **Two actions maximum.** A hero with four buttons has not decided what the
  page is for, and readers can tell.

---

## Collection index pages

A collection index is a normal page that ends in a grid. `list_collection`
turns it on:

```yaml
---
title: Projects
permalink: /projects/
hero_style: split
list_collection: projects
list_style: bento          # optional; defaults to the collection's card_style
list_limit: 12             # optional
list_empty_message: Add a file to _projects/ and it appears here.
---

Markdown here appears between the hero and the grid.
```

Card styles:

| Style | Shape |
| --- | --- |
| `deck` | Cover + body, auto-filling grid. The default. |
| `numbered` | An index with chapter numbers — the blog shape |
| `bento` | A deck with a double-size lead tile |
| `compact` | No cover, tight padding — snippets, changelogs |
| `rows` | Cover beside body, one per line |
| `repo` | GitHub-style repository card — the projects shape |
| `video` | Cover with a play overlay and runtime |
| `book` | Portrait cover, byline, star rating |

---

## Adding a collection

Three steps. No layout needed.

**1.** Declare it in `_config.yml`:

```yaml
collections:
  guides:
    output: true
    permalink: /guides/:name/
    index_url: /guides/
    singular: Guide
    icon: book
    schema: HowTo
    hero_style: minimal
    card_style: deck
    image: /assets/img/covers/blog.svg

defaults:
  - scope: { path: "", type: guides }
    values: { layout: post, sidebar: true }
```

**2.** Create `_guides/` and put Markdown in it.

**3.** Create the index page, `guides.md`:

```yaml
---
title: Guides
permalink: /guides/
list_collection: guides
---
```

It now has a hero, cards, an index, JSON-LD typed as `HowTo`, a footer link,
archive entries, and rows in the search index and sitemap.

---

## Courses and lessons

A course is a **folder**, and the folder is the data model:

```
_courses/
  apex-for-admins/
    index.md        ← the course: meta header, curriculum, "about"
    01-intro.md     ← a lesson
    02-reading.md   ← a lesson
```

**The course** (`index.md`) carries the metadata the course page renders:

```yaml
---
permalink: /courses/apex-for-admins/   # required — :path would keep "index"
title: Apex for admins who outgrew Flow
description: One paragraph for the header and the card.
level: Beginner
total_duration: 1h 12m
updated: 2026-07-15
tags: [Apex, Learning]
---
The Markdown body renders as "About this course", under the curriculum.
```

**A lesson** carries its place and its runtime:

```yaml
---
title: Reading Apex before writing it
type: lesson          # required — this is what keeps it out of listings
order: 2              # required — the syllabus IS this ordering
duration: 18 min
video: dQw4w9WgXcQ    # optional; renders the player
description: One line, shown in the curriculum.
---
```

What the structure buys, with nothing else to maintain:

- the course page renders its **curriculum** from the lesson files, numbered
  by `order:` — there is no second list to keep in sync
- each lesson renders in the **player**: video on top, the whole course in a
  rail with the current lesson marked, prev/next pagination at the bottom
- the course card **counts its real lessons**; lessons stay out of every
  listing, archive and home section, because they are chapters, not siblings
- the breadcrumb runs Home → Courses → the course → the lesson

Reordering a course is renumbering `order:` keys. Adding a lesson is adding a
file.

---

## Tags and categories

Every tag gets its own page — `/tag/apex/` — because "the Apex ones" is a
thing people link to. GitHub Pages will not run a tag-generator plugin, so
the theme uses the honest static version: **one four-line stub per tag** in
the `tag/` folder:

```yaml
---
layout: tag
tag: Apex
permalink: /tag/apex/
title: "Tagged: Apex"
---
```

The tag layout does everything else: counts, the cross-collection list, the
hero. The archive's left rail links every tag it finds, so a stub you forgot
to create shows up as a 404 you will notice on the first click.

Categories work identically — set `category:` in the stub instead of `tag:`
and the same layout filters on `categories:` front matter.

---

## The home page

`index.md` uses `layout: home`, and its sections are front matter rather than
template code — so the order of the page, and which collections appear on it,
is content:

```yaml
---
layout: home
hero_style: split
show_stats: true              # the band from _data/resume.yml
show_certifications: true

home_sections:
  - collection: posts
    eyebrow: Writing
    title: Latest posts
    lead: One line under the heading.
    limit: 4
    link_label: All posts
  - collection: projects
    limit: 3
    style: bento              # optional override

cta:
  kicker: Newsletter
  title: One email a month.
  body: Optional supporting line.
---
```

---

## Images

Put them in `assets/img/`. Reference them from the site root:

```markdown
![A diagram of the integration](/assets/img/integration.png)
```

For a caption, use a figure:

```html
<figure>
  <img src="/assets/img/integration.png" alt="A diagram of the integration">
  <figcaption>The bridge, after the third rewrite.</figcaption>
</figure>
```

Alt text is not optional. If an image is decorative — a texture, a divider —
write `alt=""`, which tells a screen reader to skip it. Leaving the attribute
off entirely makes it read the filename aloud instead.

---

## Drafts

`_drafts/` with no date in the filename:

```bash
bundle exec jekyll serve --drafts
```

Move it into `_posts/` with a date prefix to publish.

---

Next: **[Components](/docs/components/)** — the shortcodes you can use inside
Markdown.
