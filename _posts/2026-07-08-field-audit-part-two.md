---
title: "The field audit: deleting 178 fields without an incident"
description: >-
  Part two — the staged deletion: describe, hide, freeze, delete, and the
  one rollback we needed at step three.
date: 2026-07-08
series: Org hygiene
series_part: 2
tags: [Data, Process]
---

[Part one]({{ '/blog/field-audit-part-one/' | relative_url }}) ended with 178
fields that passed every test. This part deletes them — slowly, in stages,
because "passed every test" and "safe to delete" are different claims, and
the gap between them is where incidents live.

## The staging

{% include components/steps.html items="Describe|Export every candidate field's metadata to the repo. This is the rollback.,Hide|Remove from layouts and field-level security. Two weeks' wait — anything that breaks now breaks loudly and reversibly.,Freeze|Rename with a ZZZ_DEPRECATED_ prefix. Two more weeks. Formulas and integrations that reference it by API name keep working; humans notice the label.,Delete|In batches of twenty%2C one object at a time%2C with the recycle bin's fifteen-day window as the final net." %}

## The one that came back

Day nine of the hide stage: a regional team's quarterly forecast broke. The
field had zero values in twelve months — because they populated it during
one week per quarter, and the audit window had landed between weeks. Test
one had lied, politely.

The fix took ten minutes because hiding is reversible. Had we deleted on day
one, it would have been a restore-from-describe, a data reload, and a
meeting with names in it. The staged process is slower by design: **every
stage before the last one is a question, and only the last one is an
answer.**

## The result

177 fields gone, one reinstated, zero incidents that survived a fortnight.
The org's setup pages load noticeably faster, which nobody predicted and
everybody mentions.
