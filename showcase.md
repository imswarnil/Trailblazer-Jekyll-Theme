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
