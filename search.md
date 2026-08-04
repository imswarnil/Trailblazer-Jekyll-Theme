---
title: Search
permalink: /search/
description: Search every post, project, snippet and talk on this site.
hero_style: minimal
hero_eyebrow: Find
hero_lead: Searches titles, tags and the opening of every entry.
noindex: true
search: false
width: prose
---

<form class="tb-input-group" role="search" data-tb-page-search>
  <label class="tb-sr-only" for="q">Search terms</label>
  <input class="tb-input" type="search" id="q" name="q" placeholder="apex, governor limits, lwc…"
         autocomplete="off" autofocus>
  <button class="tb-btn tb-btn--primary" type="submit">Search</button>
</form>

<p class="tb-hint tb-u-mt-3">
  Or press <kbd class="tb-kbd">/</kbd> anywhere on the site to open the quick palette.
</p>

<ul class="tb-search__results tb-u-mt-6" data-tb-page-results></ul>

<p class="tb-search__empty" data-tb-page-empty hidden>Nothing matched that. Try a shorter word.</p>

<noscript>
  <div class="tb-callout tb-callout--info tb-u-mt-6">
    <div class="tb-callout__body">
      <strong class="tb-callout__title">Search needs JavaScript</strong>
      <p>The <a class="tb-link" href="/archive/">archive</a> lists everything on
      one page, grouped by year and tag — no scripting required.</p>
    </div>
  </div>
</noscript>

<script src="{{ '/assets/js/search-page.js' | relative_url }}" defer></script>
