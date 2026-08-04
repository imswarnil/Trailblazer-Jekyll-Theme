---
title: Reading an Apex debug log without losing the afternoon
description: >-
  A real 4 MB log from a real failed deployment, and the four search strings
  that find the problem in minutes.
date: 2026-03-08
tags: [Apex, Debugging]
video: dQw4w9WgXcQ
duration: "18:05"
---

A debug log is not meant to be read top to bottom — it is meant to be
searched. This walkthrough takes an actual four-megabyte log from a failed
deployment and finds the failing assertion in about three minutes, using
nothing but the log levels panel and four search strings worth memorising:

- `FATAL_ERROR` — the end of the story, so start there
- `EXCEPTION_THROWN` — the beginning of it
- `SOQL_EXECUTE_BEGIN` — count them; if the count moves with batch size, there is your loop
- `CUMULATIVE_LIMIT_USAGE` — the receipt

The one setting that matters before any of this: `APEX_CODE, FINEST` on the
class you suspect and `ERROR` on everything else. A log at FINEST across the
whole org truncates at 20 MB, usually just before the interesting part.
