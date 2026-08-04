---
title: Platform Events and the at-least-once contract
type: lesson
order: 2
duration: 40 min
video: dQw4w9WgXcQ
description: The publish gotchas, replay ids, and why every subscriber ends up idempotent.
---

Request-reply fell over the moment billing went down for maintenance and
took our transaction with it. This lesson decouples the two systems with a
Platform Event — and then spends most of its time on the contract nobody
reads: delivery is *at least* once, ordering is per-partition, and the
72-hour replay window is shorter than a long weekend plus a broken pager.

By the end the subscriber is idempotent, stores its replay id after every
batch, and the demo deliberately delivers one event twice so you can watch
the external-id upsert shrug it off.
