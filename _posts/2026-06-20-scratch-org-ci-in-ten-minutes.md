---
title: Scratch-org CI in ten minutes, from an empty repo
description: >-
  The whole pipeline from the write-up, built live — empty repository to a
  green pull-request check, with the two mistakes left in.
date: 2026-06-20
type: video
video: dQw4w9WgXcQ
duration: "12:41"
tags: [DevOps, SFDX]
---

The screen recording of
[the scratch-orgs-per-pull-request setup]({{ '/blog/scratch-orgs-per-pull-request/' | relative_url }}),
done in one take. Two things go wrong on camera — the Dev Hub auth URL pasted
with a trailing newline, and the missing `always()` on the cleanup step — and
both stay in, because those are the two things that will go wrong for you too.

## Chapters

- **0:00** — What we are building, and why the shared sandbox had to go
- **1:12** — The Dev Hub auth URL, and where the newline hides
- **3:45** — The workflow file, line by line
- **7:30** — First red run, and reading the Actions log
- **9:58** — Green, and what it costs per PR
