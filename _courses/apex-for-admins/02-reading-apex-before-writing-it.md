---
title: Reading Apex before writing it
type: lesson
order: 2
duration: 18 min
video: dQw4w9WgXcQ
description: A trigger someone else wrote, read line by line. You know more of this than you think.
---

You already read formulas, Flow expressions and report filters. Apex is the
same skill with more punctuation. In this lesson we read a real production
trigger — thirty lines — and translate every line into the Flow concept you
already know.

## The mapping that carries you

| You know | Apex calls it |
| --- | --- |
| Record collections | `List<Account>` |
| A Get Records element | a SOQL query |
| A Decision element | `if` / `else` |
| A Loop element | `for` |
| Assignment | `=` |
| The `$Record` variable | `Trigger.new` |

That table is roughly sixty percent of every trigger you will ever read. The
rest is the ceremony around it — class declarations, braces, semicolons —
which looks like the hard part and is actually the boring part.

## Homework

Open any trigger in your org (Setup → Apex Triggers) and annotate five lines
using the table. Do not worry about the lines you cannot map yet; two of them
are next lesson's subject.
