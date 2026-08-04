---
title: Batch — the pattern everyone pretends they have outgrown
type: lesson
order: 3
duration: 30 min
description: Bulk API 2.0, and the honest cases where a nightly job beats an event bus.
---

Events are fashionable; batches are effective. Payments arrive from billing
in a nightly file of a few hundred thousand rows, and no event bus improves
on that — the data is not urgent, the volume is high, and a batch is one API
call where events would be a hundred thousand.

This lesson loads the file through Bulk API 2.0, handles partial failure
row by row rather than batch by batch, and ends with the honest decision
table: latency need, volume, and who owns the failure queue. Reading
lesson two and this one back to back is the whole argument of the course —
patterns are trade-offs, not fashions.
