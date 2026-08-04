---
layout: home
title: Home
seo_title: Trailblazer · A Jekyll theme for Salesforce developers
description: >-
  A fast, accessible Jekyll theme for Salesforce developers — with a resume
  page, a certification wall, project case studies and a code-first blog.

# The hero. `hero_title` is the one field that accepts markup, and only <em>,
# which paints the one rationed accent phrase.
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

# Each section renders in its collection's own signature style, which is what
# keeps this page from reading as four identical grids. Reorder or delete them
# freely — nothing else in the theme depends on this list.
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

  - collection: videos
    eyebrow: Watch
    title: Latest videos
    lead: The things that are easier to show than to write.
    limit: 3

  - collection: snippets
    eyebrow: Reference
    title: Snippets
    lead: Apex and LWC worth keeping within reach.
    limit: 4

  - collection: talks
    eyebrow: Speaking
    title: Talks
    lead: User groups and community conferences, slides and recordings.
    limit: 3

  - collection: books
    eyebrow: Reading
    title: From the bookshelf
    lead: What I finished, with ratings I would defend in person.
    limit: 4

cta:
  kicker: Newsletter
  title: One email a month, when there is something worth sending.
  body: >-
    New posts, and the occasional thing I learned the expensive way. No
    course, no funnel, no "quick question".
---

Trailblazer is a Jekyll theme for people who build on Salesforce and write
about it. It ships with the parts a developer's site actually needs — a
printable resume, a certification wall driven from YAML, typed collections for
posts, projects, snippets and talks, and a code-first reading layout — and none
of the parts it does not.

Everything on this page is demo content. Replace `_data/resume.yml`,
`_data/certifications.yml` and the `_posts/` folder and it is your site.
