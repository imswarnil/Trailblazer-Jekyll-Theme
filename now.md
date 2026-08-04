---
title: Now
permalink: /now/
description: What I am doing at the moment — the honest, dated version.
hero_style: minimal
hero_eyebrow: Currently
hero_lead: What has my attention right now. Updated when it changes, dated so you can tell.
width: prose
---

*Updated August 2026. The idea comes from [nownownow.com](https://nownownow.com)
— a page that answers "what are you up to?" so a bio does not have to.*

<div class="tb-grid-2 tb-u-mt-8">

  <article class="tb-card tb-card--compact" data-tb-reveal>
    <div class="tb-card__body">
      <p class="tb-card__meta">{% include icon.html name="briefcase" %}<span>Working on</span></p>
      <h2 class="tb-card__title">The reconciliation layer</h2>
      <p class="tb-card__excerpt" style="-webkit-line-clamp:4">The console rebuild is live and boring, which was the goal. Current work is the nightly comparator around the billing integration — the unglamorous job that turns "probably consistent" into "we would know."</p>
    </div>
  </article>

  <article class="tb-card tb-card--compact" data-tb-reveal style="--tb-i:1">
    <div class="tb-card__body">
      <p class="tb-card__meta">{% include icon.html name="pen" %}<span>Writing</span></p>
      <h2 class="tb-card__title">Org hygiene, part three</h2>
      <p class="tb-card__excerpt" style="-webkit-line-clamp:4">The <a class="tb-link" href="{{ '/blog/field-audit-part-one/' | relative_url }}">field-audit series</a> gets one more part: what to do with the two hundred reports nobody has run since 2021.</p>
    </div>
  </article>

  <article class="tb-card tb-card--compact" data-tb-reveal style="--tb-i:2">
    <div class="tb-card__body">
      <p class="tb-card__meta">{% include icon.html name="graduation" %}<span>Learning</span></p>
      <h2 class="tb-card__title">Data Cloud, properly</h2>
      <p class="tb-card__excerpt" style="-webkit-line-clamp:4">Working through it instead of nodding along in meetings about it. Early verdict: the segmentation model is genuinely good; the naming of everything around it is genuinely not.</p>
    </div>
  </article>

  <article class="tb-card tb-card--compact" data-tb-reveal style="--tb-i:3">
    <div class="tb-card__body">
      <p class="tb-card__meta">{% include icon.html name="rocket" %}<span>Available for</span></p>
      <h2 class="tb-card__title">One more contract this year</h2>
      <p class="tb-card__excerpt" style="-webkit-line-clamp:4">Integration architecture, or a migration with a deadline someone regrets. The <a class="tb-link" href="{{ '/resume/' | relative_url }}">resume</a> has the history; <a class="tb-link" href="mailto:{{ site.author.email }}">email</a> is the door.</p>
    </div>
  </article>

</div>

{% include components/callout.html type="note" title="Not doing"
   text="Reviews of AI tools, guest posts about AI tools, or podcasts about AI tools. Nothing against the tools; everything against having nothing new to say about them." %}
