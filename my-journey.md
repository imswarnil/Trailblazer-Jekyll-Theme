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

## 2016 · The person nearest the org

Halden Retail had bought Salesforce eight months before I joined, and the
consultant who set it up was long gone. I was hired to do operations reports.
The org and I were assigned to each other the way people get assigned to the
office plant: I sat closest to it.

The first thing I ever changed was a picklist value. I checked it eleven
times, changed it on a Friday evening when nobody was in, and did not sleep
well. The value was `Won - Closed` and needed to be `Closed - Won`. Eleven
times.

## 2017 · Flow, and the first wall

By the second year I could make the platform dance — validation rules,
Process Builder (a moment of silence), and then Flow, which felt like being
handed real power. I automated the quote-approval chain and saved the sales
team thirty hours a month, and for about six months I believed clicks would
be enough forever.

Then I built the forty-element Flow. Anyone who has built one knows the exact
moment: panning around your own logic like a tourist with a bad map,
realising you have written a program in a medium designed to prevent exactly
that. I did not know the word for what I needed. The word was Apex.

## 2018 · The trigger, and the exam

My first trigger took three weekends and one very patient developer on a
forum who kept replying "bulkify it" until I asked what that meant. When it
finally deployed, the feeling was disproportionate to the twelve lines —
somewhere between passing a driving test and getting away with something.

Platform Developer I took me two attempts. The first failure was useful in a
way the eventual pass was not: it drew a precise map of what I had been
faking. Collections, mostly. I spent two months on `Map<Id, SObject>` alone
and have charged money for that knowledge ever since.

## 2019–2021 · Consulting, or nine orgs in three years

Marchetti Consulting hired me as a developer and gave me an education no
course sells: nine client orgs, nine different ways an org can go wrong, and
nine chances to watch my own past mistakes arrive in other people's systems.
The data-migration framework I built there — because doing anything three
times makes me build a tool — is [still in use]({{ '/projects/' | relative_url }}),
which remains the compliment I am proudest of.

The certifications stacked up in these years, not from ambition exactly, but
because each project kept finding the edge of what I knew and each exam was
the cheapest way to push the edge out.

## 2021 · The org I stopped leaving

Northwind Digital was meant to be another engagement. But there is a
difference between visiting orgs and living in one: a resident owns the
consequences of last year's decisions, and it turns out that is where the
real learning was hiding. The
[console rebuild]({{ '/projects/service-cloud-console/' | relative_url }}),
the [billing integration]({{ '/projects/billing-integration/' | relative_url }}),
the pipeline — all of it is the work of someone who has to be there when it
breaks.

## What I would tell 2016 me

{% include components/callout.html type="note" title="The short version"
   text="You are not behind. Everyone in this ecosystem arrived sideways — the admin who learned to code, the developer who learned the platform, the analyst who learned both. Sideways is the normal route." %}

- **The org is the teacher.** Every weird field has a reasonable Tuesday
  behind it. Read the org like an archaeology site, not a crime scene.
- **Bulkify your habits, not just your loops.** The 200-record rule is a way
  of thinking; the trigger is just where it shows first.
- **Write things down in public.** Half this site is the post I needed and
  could not find. The other half is thank-you notes to people who wrote
  theirs.

If your journey looks like the top of this page — nearest the org, checking a
picklist eleven times — the [courses]({{ '/courses/' | relative_url }}) here
were built for exactly you.
