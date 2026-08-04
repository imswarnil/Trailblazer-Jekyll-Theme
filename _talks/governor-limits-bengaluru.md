---
title: Governor limits are a design tool
description: >-
  A forty-minute argument that the limits are a specification rather than an
  obstacle, given to a room that mostly disagreed at the start.
date: 2026-01-24
tags: [Apex, Speaking]
image: /assets/img/covers/talks.svg
video: dQw4w9WgXcQ
audio: /assets/audio/talk-sample.wav
audio_duration: "40:12"
facts:
  - { label: Event, value: Bengaluru Developer Group }
  - { label: Date, value: January 2026 }
  - { label: Length, value: 40 minutes }
  - { label: Slides, value: "PDF", url: "/assets/img/placeholders/talks.png" }
---

The talk version of
[this post]({{ '/blog/governor-limits-are-a-design-tool/' | relative_url }}),
with two live demos: the same trigger failing at 201 records, then the bulkified
version handling 10,000 without the query count moving.

## What people asked afterwards

**"What about the CPU limit? You cannot bulkify your way out of that."** True,
and it is the weakest point in the argument. The CPU limit punishes correct code
that does a lot of work, and the only real answers are asynchronous processing
or doing less — neither of which is a design insight so much as a constraint.

**"Does this hold for Flow?"** Yes, and more sharply, because Flow will not warn
you. A Get Records inside a loop costs exactly what a SOQL query inside a for
loop costs, and the canvas makes it look free.

Happy to give this again — it travels well and needs nothing but a projector.
