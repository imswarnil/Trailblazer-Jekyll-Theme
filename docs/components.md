---
layout: docs
title: Components
permalink: /docs/components/
description: The Markdown shortcodes, with copyable examples.
---

Reusable pieces you can call from inside Markdown. Every one is an include in
`_includes/components/`, and every one renders classes that are already in the
stylesheet — so they inherit the theme's colours, spacing and dark mode without
a line of extra CSS.

See them all rendered at [`/style-guide/`](https://trailblazer.imswarnil.com/style-guide/),
which is a real page in the site — if a component breaks, it breaks visibly
there on the next build.

> **A note on the comma-separated arguments.** Several components take a list
> as `"a|b,c|d"` rather than as YAML. That is not a stylistic choice: Liquid
> includes cannot accept a nested data structure, and this is the shape that
> works inside a Markdown file. If an item needs a literal comma, escape it as
> `%2C`.

---

## Callout

```liquid
{% raw %}{% include components/callout.html type="warning"
   title="Governor limits apply"
   text="This runs inside a trigger, so the SOQL is inside a loop you cannot see." %}{% endraw %}
```

`type`: `note` (default) · `info` · `success` · `warning` · `danger`

Each type is a promise about what is inside it. A warning that turns out to be
a tip teaches readers to skip the next one, so pick by the consequence of
ignoring it, not by which colour looks best.

For anything longer than a sentence or two, wrap Markdown directly — the
`markdown="1"` attribute is what lets kramdown keep processing inside the div:

```html
<div class="tb-callout tb-callout--info" markdown="1">
Multiple paragraphs, lists and fenced code all work in here.
</div>
```

---

## Button

```liquid
{% raw %}{% include components/button.html label="Read the docs" url="/docs/" %}
{% include components/button.html label="Download" url="/x.pdf" style="primary" icon="download" %}
{% include components/button.html label="Source" url="https://github.com/…" style="ghost" external=true %}{% endraw %}
```

| Parameter | Values |
| --- | --- |
| `style` | `primary`, `secondary`, `ghost` (default), `soft`, `quiet`, `danger` |
| `size` | `sm`, `lg` |
| `icon` | Any name from the icon sprite |
| `external` | `true` — adds `rel="noopener"`, a new tab, and says so |
| `block` | `true` — full width |

`external=true` announces "opens in a new tab" to a screen reader. A link that
changes context without warning is the most common avoidable accessibility bug
on a personal site.

---

## Stats

```liquid
{% raw %}{% include components/stats.html items="99.98%|Uptime,1.3s|Page load,40+|Orgs" %}{% endraw %}
```

`value|label`, comma-separated. Four is the maximum that still reads as a
headline; a fifth turns it into data, and data belongs in a table.

---

## Steps

```liquid
{% raw %}{% include components/steps.html items="Create a scratch org|Takes about ninety seconds.,Push the source|`sfdx force:source:push`,Assign the permission set|Otherwise nothing is visible." %}{% endraw %}
```

`title|body`, comma-separated. Numbers are drawn by CSS from a counter, so
inserting a step in the middle does not mean renumbering the rest. The body
accepts inline Markdown.

For a procedure with real code in it, write an ordered list with fenced blocks
instead — this is for short, scannable sequences.

---

## Tabs

```liquid
{% raw %}{% include components/tabs.html id="install"
   items="Bundler|Add the gem to your Gemfile.,Remote theme|Set `remote_theme:` in _config.yml." %}{% endraw %}
```

`label|body`, comma-separated. **`id` must be unique on the page** — it
namespaces the radio group, and two tab sets sharing an id will fight.

Built from real radio inputs, so arrow keys, tab order and the focus ring come
from the platform, and the first panel is visible before any script runs.

Use tabs only for genuine alternatives — three ways to install the same thing.
Sequential content in tabs is content most readers will see a third of.

---

## Accordion

```liquid
{% raw %}{% include components/accordion.html open_first=true
   items="Does it work on GitHub Pages?|Yes — every plugin is allowlisted.,Do I need Node?|No." %}{% endraw %}
```

`question|answer`, comma-separated. `open_first=true` opens the first one.

Built on `<details>`, so it works without JavaScript and needs no ARIA of its
own. Do not put anything a reader *needs* behind one — a collapsed answer is an
answer most people will not read.

---

## Video

```liquid
{% raw %}{% include components/video.html id="dQw4w9WgXcQ" title="Deploying with scratch orgs"
   caption="Optional line underneath." %}{% endraw %}
```

Loads from YouTube's no-cookie domain, lazily, in a box that reserves its own
16:9 space so the article does not jump when the iframe arrives.

`title` is required by the include on purpose: an untitled iframe is announced
as "frame" and nothing else.

---

## Icons

```liquid
{% raw %}{% include icon.html name="cloud" %}
{% include icon.html name="mail" class="tb-icon--md" label="Email" %}{% endraw %}
```

Decorative by default. Pass `label` **only** when the icon is the only thing
naming a control — an icon beside the word "Email" that also has a label is
read out twice.

Sizes: `tb-icon--md`, `tb-icon--lg`, `tb-icon--xl`.

Available: `cloud`, `cloud-user`, `badge`, `shield`, `pen`, `code`, `layers`,
`mic`, `book`, `quote`, `list`, `user`, `briefcase`, `graduation`, `map-pin`,
`search`, `sun`, `moon`, `x`, `check`, `arrow-right`, `arrow-left`,
`arrow-up-right`, `external`, `copy`, `download`, `printer`, `share`, `link`,
`tag`, `calendar`, `clock`, `mail`, `database`, `zap`, `sparkle`, `star`,
`play`, `lightbulb`, `info`, `alert`, `check-circle`, `x-circle`, `inbox`,
`github`, `linkedin`, `mastodon`, `rss`, `youtube`, `bluesky`.

Add your own by adding a `<symbol id="tb-yourname">` to
`_includes/icons.svg`. Match the house style: a 24×24 stroke drawing, 1.75
width, round caps and joins, no fills — that consistency is what makes a row of
them look like one set.

---

## Certifications

```liquid
{% raw %}{% include cert-wall.html %}
{% include cert-wall.html limit=4 %}
{% include cert.html cert=item quiet=true %}{% endraw %}
```

Reads `_data/certifications.yml`. Featured entries come first with the accent
seal; the rest go quiet — eight accent seals in a grid is eight things
shouting, which is the same as none of them shouting.

The seal is a CSS `clip-path`, not an image, so it re-colours with your accent
and there is nothing to re-export when the brand changes.

---

## Collection lists

For a page that needs a grid somewhere other than at the end:

```liquid
{% raw %}{% include collection-list.html items=site.projects style="deck" limit=3 %}{% endraw %}
```

Styles: `deck`, `numbered`, `bento`, `compact`, `rows`. Renders an honest empty
state when there is nothing in the collection.

---

## Raw classes

Everything the theme draws is available as a class if a component does not fit.
The full list is in `_sass/trailblazer/`, and the naming is consistent:
`tb-card`, `tb-card__body`, `tb-card--compact`; utilities are `tb-u-`.

```html
<div class="tb-grid-3">
  <article class="tb-card">
    <div class="tb-card__body">
      <p class="tb-card__meta">Meta</p>
      <h3 class="tb-card__title">Title</h3>
      <p class="tb-card__excerpt">Excerpt.</p>
    </div>
  </article>
</div>
```

Reach for a token before you reach for a rule —
[customising.md](/docs/customising/).
