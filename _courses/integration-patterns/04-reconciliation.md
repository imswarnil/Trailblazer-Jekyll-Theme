---
title: The reconciliation job — trust, but verify
type: lesson
order: 4
duration: 35 min
description: The nightly comparator that turns "probably consistent" into "we would know".
---

Every pattern so far can lose data quietly: a dropped event, a skipped row,
a retry that gave up. Each loss is rare; across a year they are a certainty.

The reconciliation job is the answer, and it is gloriously boring: every
night, count and sum both sides for the previous day, compare, and raise a
case on any mismatch. This lesson builds it as a Batch Apex job, tunes the
comparison window around timezone edges — where every reconciliation bug
lives — and finishes the course with the claim the whole thing has been
building to: **an integration is not done when it works; it is done when
you would know if it stopped.**
