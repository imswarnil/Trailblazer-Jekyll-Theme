---
layout: home
title: Personal homepage preview
permalink: /home/
description: >-
  The personal-site homepage — the layout a real site built on this theme
  ships with. Live here so you can see it before you make it yours.
hero_style: split
hero_eyebrow: Salesforce developer
hero_title: I build on the platform, then <em>write down how it went</em>.
hero_lead: >-
  Apex, Lightning Web Components and the integrations hanging off them. Ten
  years of shipping in other people's orgs, and notes from most of it.
hero_image: /assets/img/avatar.svg
hero_tag: Open to work
hero_actions:
  - { label: Read the blog, url: /blog/, style: primary, icon: arrow-right }
  - { label: See the resume, url: /resume/, style: ghost }

show_stats: true
show_certifications: true

home_sections:
  - collection: posts
    eyebrow: Writing
    title: Latest posts
    lead: Long-form notes on things that took longer than they should have.
    limit: 4
    link_label: All posts
  - collection: projects
    eyebrow: Selected work
    title: Projects
    lead: Builds, migrations and the odd rescue job.
    limit: 3
  - collection: courses
    eyebrow: Learn
    title: Courses
    lead: The same ideas as the blog, rebuilt as a sequence.
    limit: 2

cta:
  kicker: Newsletter
  title: One email a month, when there is something worth sending.
  body: >-
    New posts, and the occasional thing I learned the expensive way. No
    course, no funnel, no "quick question".
---

**This is the preview** of the personal homepage a site built on Trailblazer
ships with — the theme's own front door stays a landing page. To make this
YOUR homepage, copy this page's front matter into `index.md`; the recipe is
in [the content docs]({{ '/docs/content/' | relative_url }}) under "Making
the homepage yours".
