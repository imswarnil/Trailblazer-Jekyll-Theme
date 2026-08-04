---
title: Reading a Flow someone else wrote
description: >-
  Inheriting a 60-element Flow with no documentation is a normal Tuesday. A
  method for working out what it does without running it in production.
date: 2025-06-30
tags: [Flow, Debugging]
image: /assets/img/covers/blog.svg
---

Someone has left, and you now own a record-triggered Flow with sixty elements,
four subflows and a name like `Account Update v3 FINAL`.

Do not start at the top. Start at the ends.

## Work backwards from the writes

Every Flow exists to change something. Find every Create, Update and Delete
element first and write down what each one touches. That list — usually three
or four items in a sixty-element Flow — is what the Flow is *for*. Everything
else is the decision about whether to do it.

## Then find the entry condition

The trigger's entry criteria tell you when this can run at all, and it is
usually much narrower than the element count implies. Half of that sixty-element
graph is often unreachable for most records.

## Then read only the path to each write

You now have a small number of destinations and a starting gate. Trace one path
at a time and ignore the rest of the canvas. A Flow that is incomprehensible as
a whole is usually four comprehensible stories sharing a diagram.

{% include components/callout.html type="warning" title="Check for the loop"
   text="A Get Records inside a loop is as expensive in Flow as a SOQL query inside a for loop is in Apex — and Flow will not warn you. It is the single most common reason an inherited Flow times out on a data load." %}

## Write down what you learn

The next person to open this is you, in eight months. Two things are worth
leaving behind:

- **Rename the elements.** `Decision_3` becomes `Is this a renewal?`. It costs
  ten minutes and it is the highest-leverage documentation available.
- **Put the summary in the Flow's description field**, not in a wiki. The
  description travels with the metadata; the wiki page does not.

## When to rewrite instead

If tracing the paths takes longer than a day, or if you find two elements that
contradict each other, stop reading and rewrite. A Flow nobody understands is
not an asset — it is an outage with a delay on it.

Rewrite it in Flow, though, not in Apex. Whoever inherits it next is more likely
to be an admin than a developer, and choosing the language you are comfortable
in over the one the team can maintain is how the situation happened in the first
place.
