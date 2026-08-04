---
title: The anatomy of a deployment that goes well
description: >-
  A demonstration of the split header — the title and the image share the
  fold — wrapped around a real checklist.
date: 2026-05-25
hero_split: true
image: /assets/img/covers/blog.svg
tags: [Deployment, Process]
---

This post doubles as a layout demo: `hero_split: true` in front matter puts
the cover beside the title instead of under it, which is the shape for posts
where the image is a hook rather than a figure.

## The checklist itself

A deployment that goes well is boring, and the boredom is manufactured in
the week before:

1. **The validation ran yesterday**, not this morning — a validation that
   just passed is a validation that had no time to rot.
2. **The permission-set assignment is in the runbook**, because deployed and
   visible are different states.
3. **The rollback is written down before it is needed**, when everyone is
   calm and nobody needs it.
4. **Someone who did not build it reads the steps aloud** — the step that
   cannot be read aloud is the step that was never actually written.

## The part people skip

Item four. It costs fifteen minutes and it has caught something every single
time we have done it, which says less about the checklist and more about how
deployment plans get written: by the person who no longer sees the missing
step because they have done it by hand forty times.
