---
layout: docs
title: Documentation
permalink: /docs/
description: Every guide, and the fifteen-minute setup.
---

| Guide | Read it when |
| --- | --- |
| [Installing](/docs/installing/) | Starting out — gem, remote theme, or fork |
| [Deploying](/docs/deploying/) | Putting it on GitHub Pages and a custom domain |
| [Configuring](/docs/configuring/) | Looking for what a `_config.yml` key does |
| [Content](/docs/content/) | Writing posts, adding a collection, choosing a hero |
| [Components](/docs/components/) | Wanting a callout, tabs, steps or stats in Markdown |
| [Customising](/docs/customising/) | Changing colours, fonts, spacing or a component |
| [Integrations](/docs/integrations/) | Adding analytics, comments, a newsletter |
| [SEO](/docs/seo/) | Checking structured data, sitemap and canonical URLs |
| [PWA](/docs/pwa/) | Considering offline support |
| [FAQ](/docs/faq/) | Something is not working |

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
