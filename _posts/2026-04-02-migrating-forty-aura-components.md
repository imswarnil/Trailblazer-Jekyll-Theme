---
title: Migrating forty Aura components without a freeze
description: >-
  We moved a Service Cloud console from Aura to LWC over eleven weeks, with the
  team still shipping features. Here is the order we did it in and what it cost.
date: 2026-04-02
tags: [LWC, Migration]
image: /assets/img/covers/blog.svg
---

The console had forty-one Aura components, six years of accumulated behaviour,
and four hundred agents using it every day. The ask was to move it to Lightning
Web Components without a feature freeze, because the roadmap did not have room
for one.

It took eleven weeks. Here is what worked.

## Do not start with the hard one

The instinct is to prove the approach on the worst component — if the gnarliest
one converts, the rest are easy. That instinct produces three weeks of work with
nothing shipped and a team that has stopped believing the project will finish.

Start with the most *boring* one instead. Ours was a badge that displayed a case
status. Two hours, shipped the same day, and suddenly the migration was a thing
that happened rather than a thing that was planned.

## The order that worked

{% include components/steps.html items="Leaf components first|Anything with no children and no events. Roughly half the list%2C and each one is an afternoon.,Then shared utilities|The date formatter%2C the toast wrapper%2C the field-level-security check. Convert once%2C and every later component gets easier.,Then containers%2C bottom-up|A container can hold LWC children while it is still Aura. The reverse is not true — which is what dictates the whole order.,The application event bus last|It was the only genuinely hard piece%2C and by then it was the only piece left." %}

That third point is the whole strategy. **Aura can contain LWC. LWC cannot
contain Aura.** Every migration order that ignores that fact ends up with a
component that cannot be converted until its parent is, and a parent that cannot
be converted until its children are.

{% include components/callout.html type="warning" title="The one that caught us"
   text="An Aura parent passing an object into an LWC child gets a read-only proxy. Code that mutated the incoming object worked in Aura and silently failed in LWC — no error, just a value that did not change." %}

## What it cost

| | Before | After |
| --- | --- | --- |
| Console load | 4.1s | 1.3s |
| Components | 41 Aura | 38 LWC |
| Bundle size | 890 KB | 310 KB |
| Test coverage | 71% | 88% |

Thirty-eight, not forty-one: three components turned out to be doing something
the platform now does natively, and the migration was the first time anyone had
looked at them closely enough to notice. That is a real and under-advertised
benefit of this kind of work.

## What I would do differently

Convert the event bus **third**, not last. We spent the final fortnight with a
compatibility shim translating application events in both directions, and every
bug in that period turned out to be the shim. Doing it early would have meant a
harder week three and a much calmer week ten.
