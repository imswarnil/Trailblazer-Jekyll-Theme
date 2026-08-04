---
title: Layout showcase
permalink: /showcase/
description: Every article shape the theme can render, each demonstrated by a real page.
hero_style: minimal
hero_eyebrow: Reference
hero_lead: >-
  Every shape an article can take, each demonstrated by a live page with its
  front matter noted. Open one, view source on its Markdown, copy the keys.
width: prose
---

Each entry below is a real page in the demo content whose front matter turns
one knob. This page is the map; the pages are the territory.

<div class="tb-grid-2 tb-u-mt-6">
  <a class="tb-card" href="{{ '/home/' | relative_url }}" style="text-decoration:none">
    <span class="tb-card__media tb-card__media--photo"><img src="{{ '/assets/img/screenshots/home.jpg' | relative_url }}" alt="The personal homepage" loading="lazy"></span>
    <span class="tb-card__body"><span class="tb-card__title">Personal homepage</span></span>
  </a>
  <a class="tb-card" href="{{ '/courses/apex-for-admins/02-reading-apex-before-writing-it/' | relative_url }}" style="text-decoration:none">
    <span class="tb-card__media tb-card__media--photo"><img src="{{ '/assets/img/screenshots/lesson.jpg' | relative_url }}" alt="The lesson player" loading="lazy"></span>
    <span class="tb-card__body"><span class="tb-card__title">Lesson player</span></span>
  </a>
  <a class="tb-card" href="{{ '/resume/' | relative_url }}" style="text-decoration:none">
    <span class="tb-card__media tb-card__media--photo"><img src="{{ '/assets/img/screenshots/resume.jpg' | relative_url }}" alt="The resume" loading="lazy"></span>
    <span class="tb-card__body"><span class="tb-card__title">Printable resume</span></span>
  </a>
  <a class="tb-card" href="{{ '/docs/' | relative_url }}" style="text-decoration:none">
    <span class="tb-card__media tb-card__media--photo"><img src="{{ '/assets/img/screenshots/docs.jpg' | relative_url }}" alt="The documentation" loading="lazy"></span>
    <span class="tb-card__body"><span class="tb-card__title">Three-column docs</span></span>
  </a>
</div>

## Article shells

<ul class="tb-rule-list">
  <li>
    <span class="tb-rule-list__main">
      <a class="tb-rule-list__title" href="{{ '/blog/governor-limits-are-a-design-tool/' | relative_url }}">Right sidebar</a>
      <span class="tb-rule-list__meta">The default for posts — TOC, certifications and links in the rail</span>
    </span>
    <code class="tb-u-text-2xs">sidebar: right</code>
  </li>
  <li>
    <span class="tb-rule-list__main">
      <a class="tb-rule-list__title" href="{{ '/blog/naming-things-in-an-org/' | relative_url }}">Left sidebar</a>
      <span class="tb-rule-list__meta">The mirrored shell — rail first, article second</span>
    </span>
    <code class="tb-u-text-2xs">sidebar: left</code>
  </li>
  <li>
    <span class="tb-rule-list__main">
      <a class="tb-rule-list__title" href="{{ '/blog/a-letter-to-my-first-org/' | relative_url }}">Narrow, no sidebar</a>
      <span class="tb-rule-list__meta">A bare reading column, for writing that is not reference material</span>
    </span>
    <code class="tb-u-text-2xs">sidebar: false</code>
  </li>
</ul>

## Article headers

<ul class="tb-rule-list">
  <li>
    <span class="tb-rule-list__main">
      <a class="tb-rule-list__title" href="{{ '/blog/anatomy-of-a-deployment/' | relative_url }}">Split header</a>
      <span class="tb-rule-list__meta">Title and image share the fold, two columns</span>
    </span>
    <code class="tb-u-text-2xs">hero_split: true</code>
  </li>
  <li>
    <span class="tb-rule-list__main">
      <a class="tb-rule-list__title" href="{{ '/blog/migrating-forty-aura-components/' | relative_url }}">Banner cover</a>
      <span class="tb-rule-list__meta">The default when an `image:` is set — full-width figure under the title</span>
    </span>
    <code class="tb-u-text-2xs">image: /path.png</code>
  </li>
</ul>

## Post types

<ul class="tb-rule-list">
  <li>
    <span class="tb-rule-list__main">
      <a class="tb-rule-list__title" href="{{ '/blog/scratch-org-ci-in-ten-minutes/' | relative_url }}">Video post</a>
      <span class="tb-rule-list__meta">Opens as a player, gets VideoObject structured data, shows ▶ and runtime on its card</span>
    </span>
    <code class="tb-u-text-2xs">type: video</code>
  </li>
  <li>
    <span class="tb-rule-list__main">
      <a class="tb-rule-list__title" href="{{ '/blog/field-audit-part-one/' | relative_url }}">Series post</a>
      <span class="tb-rule-list__meta">The parts box lists every entry sharing the series name, current one marked</span>
    </span>
    <code class="tb-u-text-2xs">series + series_part</code>
  </li>
</ul>

## Beyond posts

<ul class="tb-rule-list">
  <li>
    <span class="tb-rule-list__main">
      <a class="tb-rule-list__title" href="{{ '/courses/apex-for-admins/' | relative_url }}">Course page</a>
      <span class="tb-rule-list__meta">Meta header, Start button, curriculum from the lesson files</span>
    </span>
    <code class="tb-u-text-2xs">_courses/slug/index.md</code>
  </li>
  <li>
    <span class="tb-rule-list__main">
      <a class="tb-rule-list__title" href="{{ '/courses/apex-for-admins/01-why-this-flow-should-be-code/' | relative_url }}">Lesson player</a>
      <span class="tb-rule-list__meta">Video, course rail with the current lesson marked, prev/next pagination</span>
    </span>
    <code class="tb-u-text-2xs">type: lesson · order: 1</code>
  </li>
  <li>
    <span class="tb-rule-list__main">
      <a class="tb-rule-list__title" href="{{ '/style-guide/' | relative_url }}">Component style guide</a>
      <span class="tb-rule-list__meta">Every component, with the markup that produces it</span>
    </span>
  </li>
</ul>


## Built with Trailblazer

Sites running this theme in the wild. Yours belongs here — add it with
[one three-line pull request](https://github.com/imswarnil/trailblazer-jekyll-theme/blob/main/CONTRIBUTING.md)
to `_data/showcase.yml`.

<ul class="tb-rule-list">
{% for site_entry in site.data.showcase %}
  <li>
    <span class="tb-rule-list__main">
      <a class="tb-rule-list__title" href="{{ site_entry.url }}" rel="noopener" target="_blank">
        {{ site_entry.name }}<span class="tb-sr-only"> (opens in a new tab)</span>
      </a>
      <span class="tb-rule-list__meta">{{ site_entry.author }}{% if site_entry.example %} · example entry{% endif %}</span>
    </span>
    {% include icon.html name="external" class="tb-u-fg-faint" %}
  </li>
{% endfor %}
</ul>
