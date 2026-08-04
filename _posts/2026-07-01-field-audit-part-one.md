---
title: "The field audit: finding the 200 fields nobody uses"
description: >-
  Part one of cleaning up a nine-year-old org — how to prove a field is dead
  before you are allowed to delete it.
date: 2026-07-01
series: Org hygiene
series_part: 1
tags: [Data, Process]
---

Every long-lived org accumulates fields the way a garage accumulates boxes:
each one made sense to someone, once, and nobody remembers which ones. This
series is the cleanup we ran on a nine-year-old org — this part is the audit,
part two is the deletion, and the order matters, because deleting a field
someone still uses is how cleanup projects get cancelled.

## What "unused" actually means

A field is a candidate for deletion only when all four are true:

1. **No recent values.** `SELECT COUNT() WHERE Field__c != null AND
   LastModifiedDate = LAST_N_DAYS:365` is zero or near it.
2. **No metadata references.** The dependency API knows about formulas,
   Flows and layouts; it does not know about report filters, so those are a
   separate pass.
3. **No integration touches it.** The field-level "where is this mapped"
   question no tool answers — this is the week of the project, and it is
   mostly reading integration configs and asking people.
4. **Nobody claims it.** A field with zero data can still be the one field
   the CFO's one report groups by, once a year, in January.

## The spreadsheet

One row per custom field, four columns for the four tests, and a fifth for
the owner's sign-off. Ours had 214 rows and took three weeks of background
effort. 178 passed all four tests — which is the number that makes
[part two]({{ '/blog/field-audit-part-two/' | relative_url }}) worth doing.
