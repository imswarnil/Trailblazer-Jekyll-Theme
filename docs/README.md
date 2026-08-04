---
layout: docs
header_layout: full
title: Documentation
permalink: /docs/
description: Every guide, and the fifteen-minute setup.
---

The guides are grouped the way the work actually runs — read them in order
the first time, then use the left rail to jump.

### 1 · Start here

| Step | Guide | You will have |
| --- | --- | --- |
| 1.1 | [Installing](/docs/installing/) | The site running at `localhost:4000` |
| 1.2 | [Deploying](/docs/deploying/) | The site live on GitHub Pages, custom domain optional |

### 2 · Build your site

| Step | Guide | You will have |
| --- | --- | --- |
| 2.1 | [Configuring](/docs/configuring/) | Your name, colours, navigation and socials in place |
| 2.2 | [Content](/docs/content/) | Posts, projects, courses — and the homepage made yours |
| 2.3 | [Components](/docs/components/) | Callouts, tabs, steps and stats inside your Markdown |

### 3 · Make it yours

| Step | Guide | You will have |
| --- | --- | --- |
| 3.1 | [Customising](/docs/customising/) | Your brand on every component, via tokens |

### 4 · Ship it

| Step | Guide | You will have |
| --- | --- | --- |
| 4.1 | [Integrations](/docs/integrations/) | Analytics, comments, newsletter, ads — only what you switch on |
| 4.2 | [SEO](/docs/seo/) | Structured data and one canonical domain |
| 4.3 | [PWA](/docs/pwa/) | Offline support, if and when you want it |

### Help

[FAQ](/docs/faq/) — the questions that come up, answered plainly.

## The fifteen-minute version

1. `bundle install && bundle exec jekyll serve`
2. Edit `_config.yml` — title, url, author, navigation, social
3. Edit `_data/resume.yml` and `_data/certifications.yml`
4. Delete the demo content: `rm _posts/*.md _projects/*.md _snippets/*.md _talks/*.md`
5. Replace `assets/img/avatar.svg` with a real photograph
6. Set `CNAME` to your domain
7. Push, and set **Settings → Pages → Source → GitHub Actions**

## How it fits together

```
_config.yml            the control centre — colours, nav, collections, integrations
  ├── theme_style      compiled into the stylesheet at build time
  ├── collections      each declares its own hero, card style and schema.org type
  └── integrations     everything off until configured

_data/
  ├── resume.yml       the whole /resume/ page
  └── certifications.yml   the seal wall, the sidebar widget, and hasCredential

_layouts/              default → home · page · post · resume · archive
_includes/
  ├── components/      the Markdown shortcodes
  ├── integrations/    analytics, comments, push — each behind its own guard
  └── icons.svg        the sprite, inlined once per page

_sass/trailblazer/     abstracts → tokens → base → layout → components → utilities
_sass/trailblazer-overrides.scss    ships empty; imported last; yours

assets/
  ├── css/main.scss    reads _config.yml through Liquid, then imports the framework
  └── js/theme.js      one deferred file; everything in it is an enhancement
```

The single idea worth internalising: **components read semantic tokens, never
raw values.** That is what makes one line in `_config.yml` re-theme the site,
and it is the convention to keep if you extend it.
