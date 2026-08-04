---
title: "@wire or imperative? The decision in four minutes"
description: >-
  The shortest useful answer to the most-asked LWC question, with one demo
  component built both ways.
date: 2025-12-18
tags: [LWC]
video: dQw4w9WgXcQ
duration: "4:12"
---

One component, built twice. The `@wire` version is nine lines shorter, caches
for free, and refreshes reactively when the tracked parameter changes. The
imperative version fires exactly when told, which is the only version that
works for a button click, a confirm dialog, or anything that must not run on
render.

The rule that falls out: **`@wire` for reading state the page is about,
imperative for actions the user takes.** If you are calling `refreshApex` on a
timer to make a wire behave imperatively, you wanted the other one.
