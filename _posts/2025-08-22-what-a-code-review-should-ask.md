---
title: What a code review should ask
description: >-
  Most Apex reviews check style. The four questions below catch the bugs that
  actually reach production.
date: 2025-08-22
tags: [Apex, Process]
image: /assets/img/covers/blog.svg
---

A code review that only checks naming and indentation is a linter with a salary.
Here are the four questions I ask instead, in order of how often they find
something.

## 1. What happens at 200 records?

Triggers fire in batches of 200. Data Loader, an integration, a mass update from
a report — all of them will hand your code the full batch.

Read every loop in the diff and ask what is inside it. A query, a DML statement
or a callout inside a loop is the answer to "why did this break in production
and not in the sandbox".

## 2. What happens when it is called twice?

Retries happen. Platform Events deliver at least once. A user double-clicks.
An integration replays a failed batch.

If running the code twice produces two records where it should produce one, it
is not finished. The fix is usually an external id and an upsert rather than an
insert.

## 3. What happens when the callout fails?

Not "if" — the remote system will be down at some point, and it will more often
be *slow* than down, which is worse.

Look for the timeout. Look for what happens to the record when the callout
throws. "The exception propagates and the transaction rolls back" is a fine
answer; "there is no catch and I have not thought about it" is not.

## 4. Who can see this?

`without sharing` on a class is a decision. Sometimes it is the right one —
a service that has to see across an org genuinely needs it. But it should be a
sentence in the pull request, not a keyword nobody mentioned.

The same goes for `Security.stripInaccessible` and for `WITH USER_MODE` on a
query: their absence should be deliberate.

{% include components/callout.html type="note" title="What I stopped asking"
   text="Test coverage percentage. It is a number the platform enforces anyway, and a review that spends its attention there has less left for the four questions above." %}

## The meta-point

All four questions are about the code's behaviour at the edges, and none of them
can be answered by reading the diff in isolation — they need the reviewer to
know what calls this and what it calls.

Which is the actual argument for code review. Not catching typos: catching the
thing that is only visible if you know the system.
