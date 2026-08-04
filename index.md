---
layout: default
title: Home
seo_title: Trailblazer · An open-source Jekyll theme for Salesforce developers
description: >-
  A fast, accessible, MIT-licensed Jekyll theme for Salesforce developers —
  courses with a lesson player, a printable YAML resume, a certification
  wall, and a token-first design system. Runs on GitHub Pages.
---
{%- comment -%}
  THE THEME LANDING PAGE
  This repository is a template, and its homepage sells the template: what
  the theme does, what it looks like, and the three buttons that start a
  site. Every claim links to a live page in this very site — the demo IS the
  proof of what you get.

  Building your own site from this? This page is the one file you replace —
  docs/content.md → "Making the homepage yours" has the personal-homepage
  front matter ready to paste.
{%- endcomment -%}

{%- assign repo = 'https://github.com/imswarnil/trailblazer-jekyll-theme' -%}

<div class="tb-container">
  <section class="tb-hero tb-hero--statement tb-pattern tb-pattern-grid-fade">
    <p class="tb-hero__eyebrow">Open source · MIT · Jekyll</p>
    <h1 class="tb-hero__title">A Jekyll theme for <em>Salesforce developers</em>.</h1>
    <p class="tb-hero__lead">
      Courses with a lesson player. A resume that prints from YAML. A
      certification wall, repo-style project cards, and a design system that
      re-brands from one hex. No build step beyond Jekyll.
    </p>
    <div class="tb-hero__actions">
      <a class="tb-btn tb-btn--primary tb-btn--lg" href="{{ repo }}/generate" rel="noopener">
        {%- include icon.html name="sparkle" %}Use this template
      </a>
      <a class="tb-btn tb-btn--soft tb-btn--lg" href="{{ '/home/' | relative_url }}">
        {%- include icon.html name="play" %}Preview as a personal site
      </a>
      <a class="tb-btn tb-btn--ghost tb-btn--lg" href="{{ repo }}" rel="noopener">
        {%- include icon.html name="github" %}Star on GitHub
      </a>
    </div>
    <p class="tb-hero__meta">
      <span>{% include icon.html name="check" %} GitHub Pages ready</span>
      <span>{% include icon.html name="check" %} No Node, no toolchain</span>
      <span>{% include icon.html name="check" %} Light + dark</span>
    </p>

    {%- comment -%}
      The trail: a dashed path that draws itself once on load, two clouds
      drifting above it. The theme's one animated illustration — decoration
      with a pulse, stilled entirely under reduced motion.
    {%- endcomment -%}
    <svg class="tb-illus" viewBox="0 0 480 120" width="480" height="120" aria-hidden="true">
      <path class="tb-illus__trail" d="M10 100 C 90 100, 110 40, 180 52 S 300 96, 360 60 S 450 22, 470 30"
            fill="none" stroke="var(--tb-accent-300)" stroke-width="2.5"
            stroke-linecap="round" stroke-dasharray="7 9" style="--tb-dash: 620"/>
      <g class="tb-illus__cloud" fill="var(--tb-accent-soft)" stroke="var(--tb-accent-300)" stroke-width="1.5">
        <path d="M140 34h-32a10 10 0 0 1-1.2-19.9A13 13 0 0 1 131.5 6a13 13 0 0 1 8.7 16A9.7 9.7 0 0 1 140 34Z"/>
      </g>
      <g class="tb-illus__cloud tb-illus__cloud--slow" fill="var(--tb-craft-soft)" stroke="var(--tb-craft)" stroke-width="1.5" opacity="0.9">
        <path d="M395 96h-26a8 8 0 0 1-1-15.9 10.5 10.5 0 0 1 20-2.4A7.9 7.9 0 0 1 395 96Z"/>
      </g>
      <circle cx="10" cy="100" r="4" fill="var(--tb-accent)"/>
      <circle cx="470" cy="30" r="4" fill="var(--tb-craft)"/>
    </svg>
  </section>
</div>

{%- comment -%} ── Quick start: the three honest routes in ─────────────────── {%- endcomment -%}
<section class="tb-container tb-section-sm">
  {% include components/tabs.html id="start"
     items="Use the template|Click **Use this template** above%2C name your repository%2C then set Settings → Pages → Source to *GitHub Actions*. Live in about a minute — [full walkthrough](/docs/deploying/).,Clone it|`git clone` the repository%2C then `bundle install && bundle exec jekyll serve`. Everything else is [three files of config](/docs/installing/).,Download the zip|Grab the archive from GitHub%2C unzip%2C `bundle install`%2C serve. Same theme%2C no git history." %}
</section>

{%- comment -%} ── Features, each linking to its live proof ────────────────── {%- endcomment -%}
<section class="tb-container tb-section" data-tb-reveal>
  <div class="tb-section__head">
    <div>
      <p class="tb-eyebrow">Why this one</p>
      <h2 class="tb-section__title">Built for the job, not adapted to it</h2>
      <p class="tb-section__lead">Every feature below links to the live page proving it — this demo site is the spec.</p>
    </div>
  </div>

  <div class="tb-grid-3">
    <article class="tb-card">
      <div class="tb-card__body">
        <p class="tb-card__meta">{% include icon.html name="graduation" %}<span>Courses</span></p>
        <h3 class="tb-card__title"><a class="tb-card__link" href="{{ '/courses/apex-for-admins/' | relative_url }}">A real lesson player</a></h3>
        <p class="tb-card__excerpt">A course is a folder of lesson files. The theme renders the curriculum, the per-lesson player with its rail, and prev/next navigation.</p>
      </div>
    </article>
    <article class="tb-card">
      <div class="tb-card__body">
        <p class="tb-card__meta">{% include icon.html name="badge" %}<span>Resume</span></p>
        <h3 class="tb-card__title"><a class="tb-card__link" href="{{ '/resume/' | relative_url }}">A resume that prints</a></h3>
        <p class="tb-card__excerpt">Generated from two YAML files — experience, education with GPA, skills with meters, and a certification wall coloured by track. Ctrl-P is the export.</p>
      </div>
    </article>
    <article class="tb-card">
      <div class="tb-card__body">
        <p class="tb-card__meta">{% include icon.html name="layers" %}<span>Projects</span></p>
        <h3 class="tb-card__title"><a class="tb-card__link" href="{{ '/projects/service-cloud-console/' | relative_url }}">Repo cards & galleries</a></h3>
        <p class="tb-card__excerpt">GitHub-style cards with live-preview and source buttons, and a keyboard-navigable screenshot carousel on the case study.</p>
      </div>
    </article>
    <article class="tb-card">
      <div class="tb-card__body">
        <p class="tb-card__meta">{% include icon.html name="play" %}<span>Video</span></p>
        <h3 class="tb-card__title"><a class="tb-card__link" href="{{ '/blog/scratch-org-ci-in-ten-minutes/' | relative_url }}">Chapters that seek</a></h3>
        <p class="tb-card__excerpt">YouTube, Vimeo or a hosted file. Video posts get a timestamp rail — click a chapter and the player jumps there.</p>
      </div>
    </article>
    <article class="tb-card">
      <div class="tb-card__body">
        <p class="tb-card__meta">{% include icon.html name="pen" %}<span>Writing</span></p>
        <h3 class="tb-card__title"><a class="tb-card__link" href="{{ '/showcase/' | relative_url }}">Every article shape</a></h3>
        <p class="tb-card__excerpt">Sidebar left, right or none; split headers; series with stepper navigation; a numbered blog index with thumbnails. All front matter.</p>
      </div>
    </article>
    <article class="tb-card">
      <div class="tb-card__body">
        <p class="tb-card__meta">{% include icon.html name="zap" %}<span>Design system</span></p>
        <h3 class="tb-card__title"><a class="tb-card__link" href="{{ '/style-guide/' | relative_url }}">One hex re-brands it</a></h3>
        <p class="tb-card__excerpt">Two-tier tokens: change <code>theme_style.accent</code> and buttons, badges, shields, code accents and both colour schemes move together.</p>
      </div>
    </article>
  </div>
</section>

{%- comment -%} ── The collections, briefly ────────────────────────────────── {%- endcomment -%}
<section class="tb-container tb-section" data-tb-reveal>
  <div class="tb-section__head">
    <div>
      <p class="tb-eyebrow">Content model</p>
      <h2 class="tb-section__title">Eight collections, zero extra layouts</h2>
      <p class="tb-section__lead">Each declares its schema.org type, hero, card style and sidebar in config — adding a ninth is three files, none of them a layout.</p>
    </div>
    <a class="tb-btn tb-btn--ghost tb-btn--sm" href="{{ '/docs/content/' | relative_url }}">
      Content docs{% include icon.html name="arrow-right" %}
    </a>
  </div>
  <div class="tb-cluster">
    {%- for c in site.collections %}{% if c.output and c.index_url %}
    <a class="tb-chip" href="{{ c.index_url | relative_url }}">
      {%- if c.icon %}{% include icon.html name=c.icon %}{% endif %}
      {{ c.label | capitalize }}
      {%- assign entries = site[c.label] | where_exp: 'i', 'i.type != "lesson"' %}
      <span class="tb-chip__count">{{ entries.size }}</span>
    </a>
    {%- endif %}{% endfor %}
  </div>
</section>

{%- comment -%} ── Live demo content strip ─────────────────────────────────── {%- endcomment -%}
<section class="tb-container tb-section" data-tb-reveal>
  <div class="tb-section__head">
    <div>
      <p class="tb-eyebrow">See it working</p>
      <h2 class="tb-section__title">The demo site, in three samples</h2>
      <p class="tb-section__lead">Fictional persona, real pages — everything you see is what a fresh install ships.</p>
    </div>
  </div>
  {%- assign samples = site.posts | where_exp: 'i', 'i.type != "video"' | slice: 0, 3 -%}
  {%- include collection-list.html items=samples style="deck" -%}
</section>

{%- comment -%} ── The ask ─────────────────────────────────────────────────── {%- endcomment -%}
<div class="tb-container tb-section">
  <section class="tb-cta">
    <p class="tb-cta__kicker">MIT licensed</p>
    <h2 class="tb-cta__title">Start your site <em>tonight</em>.</h2>
    <p class="tb-cta__body">
      Template it, follow the fifteen-minute setup, push. The docs cover
      everything from the first serve to the custom domain — and the
      contribution guide is open if you make it better.
    </p>
    <div class="tb-cta__actions">
      <a class="tb-btn tb-btn--primary tb-btn--lg" href="{{ repo }}/generate" rel="noopener">Use this template</a>
      <a class="tb-btn tb-btn--ghost tb-btn--lg" href="{{ '/docs/' | relative_url }}">Read the docs</a>
    </div>
    <p class="tb-cta__fine">Free forever · credit appreciated, not required</p>
  </section>
</div>
