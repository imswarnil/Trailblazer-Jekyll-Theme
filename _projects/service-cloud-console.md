---
title: Rebuilding a 400-seat Service Cloud console
description: >-
  Eleven Aura components to LWC, six synchronous calls removed, and a console
  that agents stopped complaining about.
date: 2026-03-01
tags: [LWC, Service Cloud, Performance]
image: /assets/img/covers/projects.svg
featured: true
repo: service-console-lwc
language: JavaScript
github: https://github.com/example/service-console-lwc
demo: https://example.com/demo/console
# The gallery renders as a keyboard-navigable carousel above the case study.
# Alt text per shot — screenshots ARE content on a project page.
gallery:
  - src: /assets/img/projects/service-console-lwc/01.png
    alt: The rebuilt case list with queue filters in the left rail
  - src: /assets/img/projects/service-console-lwc/02.png
    alt: A case detail page with the interaction timeline and metrics card
  - src: /assets/img/projects/service-console-lwc/03.png
    alt: The handle-time dashboard after the migration
facts:
  - { label: Client, value: Northwind Digital }
  - { label: Year, value: "2025–2026" }
  - { label: Role, value: Technical lead }
  - { label: Stack, value: "LWC, Apex, Platform Cache" }
  - { label: Outcome, value: "4.1s → 1.3s console load" }
---

Four hundred agents used this console for six hours a day. It took four seconds
to open a case, and the internal satisfaction survey had a free-text field that
mentioned it eleven times.

## What was wrong

Not one thing. The console was six years old and every year had added a
component that queried on load.

- Eleven Aura components, each with its own `init` handler firing a server call
- Six of those calls synchronous, so they queued behind each other
- A related-list component that loaded every field on the object and rendered
  four
- No caching anywhere, so opening the same case twice cost exactly the same as
  opening it once

## What we did

{% include components/steps.html items="Measured first|Chrome's performance panel and the Lightning Usage app%2C for a week%2C before touching anything.,Killed the waterfall|Six synchronous calls became two parallel ones. This alone took a second off.,Migrated to LWC|Eleven components%2C leaf-first%2C over five weeks. See the write-up in the blog.,Cached the reference data|Picklists and routing rules moved into Platform Cache. They change monthly and were being fetched per case." %}

## The result

{% include components/stats.html items="4.1s → 1.3s|Console load,890 KB → 310 KB|Bundle,11 → 0|Aura components,0|Reported regressions" %}

The number I care about most is the last one. A performance project that ships
three bugs has not made anyone's day better.

## What I would do differently

We measured for a week before starting and did not measure again until the end.
Two of the four changes turned out to contribute almost nothing, and we only
found that out afterwards. Measuring after each change would have let us stop
two weeks earlier.
