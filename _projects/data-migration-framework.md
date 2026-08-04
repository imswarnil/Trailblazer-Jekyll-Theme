---
title: A data migration framework used on six projects
description: >-
  A three-day migration became an afternoon. Mostly by admitting that every
  migration is the same five steps in a different order.
date: 2025-05-20
tags: [Data, Apex, Tooling]
image: /assets/img/covers/projects.svg
repo: org-loader
language: Apex
github: https://github.com/example/org-loader
demo: https://example.com/demo/org-loader
facts:
  - { label: Context, value: Marchetti Consulting }
  - { label: Year, value: "2019–2021" }
  - { label: Reused on, value: 6 client projects }
  - { label: Stack, value: "Batch Apex, Custom Metadata, Bulk API" }
  - { label: Outcome, value: "3 days → 4 hours per load" }
---

Nine client orgs in three years, and the same week of work at the start of each
one: map the legacy fields, load the parents, load the children, fix the
relationships, explain the failures.

The fourth time, I wrote it down properly.

## What it is

Field mappings live in Custom Metadata rather than in code, so a consultant can
change one without a deployment. A Batch Apex runner reads the mapping,
transforms rows, and writes with `Database.insert(records, false)` so that one
bad row does not fail a batch of two hundred.

Failures go to a custom object with the source row, the error, and the mapping
that produced it — which turned out to be the feature everyone actually valued.

## Why the failure log mattered most

The load was never the hard part. The hard part was the conversation afterwards:
"nine thousand of your two hundred thousand contacts did not load, here is
exactly which ones and exactly why".

Before, that conversation involved a CSV and a lot of guessing. After, it was a
report the client could read themselves — and in three of the six projects they
fixed the source data and re-ran it without involving us.

{% include components/callout.html type="note" title="The part that did not generalise"
   text="Deduplication. Every client's definition of 'the same person' was different, and the two attempts to make it configurable produced something harder to use than writing twenty lines of Apex per project. Some things should stay bespoke." %}

## Where it went

It is still in use at that consultancy, four years after I left, which is the
only real measure of whether internal tooling worked.
