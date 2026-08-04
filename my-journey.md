---
title: My journey into Salesforce
permalink: /my-journey/
description: >-
  From accidental admin to integration architect, told honestly — including
  the two years of pretending to understand Maps.
hero_style: statement
hero_eyebrow: The long version
hero_title: Nobody plans to become <em>a Salesforce developer</em>.
hero_lead: >-
  I certainly didn't. This is how it happened anyway — the accidents, the
  exams, and the org that taught me more than any of them.
sidebar: false
---

<ol class="tb-timeline tb-timeline--lg tb-u-mt-8">

  <li class="tb-timeline__item" data-done data-tb-reveal>
    <span class="tb-timeline__node" aria-hidden="true">{% include icon.html name="user" %}</span>
    <div class="tb-timeline__body">
      <span class="tb-timeline__time">2016</span>
      <span class="tb-timeline__title">The person nearest the org</span>
      <p class="tb-timeline__note">Halden Retail had bought Salesforce eight months before I joined, and the consultant who set it up was long gone. I was hired to do operations reports; the org and I were assigned to each other the way people get assigned to the office plant — I sat closest to it. The first thing I ever changed was a picklist value. I checked it eleven times and changed it on a Friday evening when nobody was in. The value was <code>Won - Closed</code> and needed to be <code>Closed - Won</code>. Eleven times.</p>
    </div>
  </li>

  <li class="tb-timeline__item" data-done data-tb-reveal style="--tb-i:1">
    <span class="tb-timeline__node" aria-hidden="true">{% include icon.html name="zap" %}</span>
    <div class="tb-timeline__body">
      <span class="tb-timeline__time">2017</span>
      <span class="tb-timeline__title">Flow, and the first wall</span>
      <p class="tb-timeline__note">By the second year I could make the platform dance — validation rules, Process Builder (a moment of silence), then Flow, which felt like being handed real power. I automated the quote-approval chain, saved sales thirty hours a month, and for six months believed clicks would be enough forever. Then I built the forty-element Flow, and met the exact moment every clicker meets: panning around your own logic like a tourist with a bad map. I did not know the word for what I needed. The word was Apex.</p>
    </div>
  </li>

  <li class="tb-timeline__item" data-done data-tb-reveal style="--tb-i:2">
    <span class="tb-timeline__node" aria-hidden="true">{% include icon.html name="code" %}</span>
    <div class="tb-timeline__body">
      <span class="tb-timeline__time">2018</span>
      <span class="tb-timeline__title">The trigger, and the exam</span>
      <p class="tb-timeline__note">My first trigger took three weekends and one very patient forum developer who kept replying "bulkify it" until I asked what that meant. Platform Developer I took two attempts, and the failure was more useful than the pass: it drew a precise map of what I had been faking. Collections, mostly. I spent two months on <code>Map&lt;Id, SObject&gt;</code> alone and have charged money for that knowledge ever since.</p>
    </div>
  </li>

  <li class="tb-timeline__item" data-done data-tb-reveal style="--tb-i:3">
    <span class="tb-timeline__node" aria-hidden="true">{% include icon.html name="briefcase" %}</span>
    <div class="tb-timeline__body">
      <span class="tb-timeline__time">2019–2021</span>
      <span class="tb-timeline__title">Consulting: nine orgs in three years</span>
      <p class="tb-timeline__note">An education no course sells — nine client orgs, nine different ways an org can go wrong, and nine chances to watch my own past mistakes arrive in other people's systems. The <a class="tb-link" href="{{ '/projects/' | relative_url }}">data-migration framework</a> I built there is still in use four years after I left, which remains the compliment I am proudest of. The certifications stacked up in these years — each project found the edge of what I knew, and each exam was the cheapest way to push the edge out.</p>
    </div>
  </li>

  <li class="tb-timeline__item" aria-current="true" data-tb-reveal style="--tb-i:4">
    <span class="tb-timeline__node" aria-hidden="true">{% include icon.html name="cloud" %}</span>
    <div class="tb-timeline__body">
      <span class="tb-timeline__time">2021 — now</span>
      <span class="tb-timeline__title">The org I stopped leaving</span>
      <p class="tb-timeline__note">Northwind Digital was meant to be another engagement, but there is a difference between visiting orgs and living in one: a resident owns the consequences of last year's decisions, and that is where the real learning was hiding. The <a class="tb-link" href="{{ '/projects/service-cloud-console/' | relative_url }}">console rebuild</a>, the <a class="tb-link" href="{{ '/projects/billing-integration/' | relative_url }}">billing integration</a>, the pipeline — all of it is the work of someone who has to be there when it breaks.</p>
    </div>
  </li>

</ol>

## What I would tell 2016 me

{% include components/callout.html type="note" title="The short version"
   text="You are not behind. Everyone in this ecosystem arrived sideways — the admin who learned to code, the developer who learned the platform, the analyst who learned both. Sideways is the normal route." %}

- **The org is the teacher.** Every weird field has a reasonable Tuesday
  behind it. Read the org like an archaeology site, not a crime scene.
- **Bulkify your habits, not just your loops.** The 200-record rule is a way
  of thinking; the trigger is just where it shows first.
- **Write things down in public.** Half this site is the post I needed and
  could not find. The other half is thank-you notes to people who wrote theirs.

If your journey looks like the top of this page — nearest the org, checking a
picklist eleven times — the [courses]({{ '/courses/' | relative_url }}) here
were built for exactly you.
