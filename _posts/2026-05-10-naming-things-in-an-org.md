---
title: Naming things in a Salesforce org
description: >-
  A demonstration of the left-sidebar layout — and a real argument about why
  Amount2__c is a confession, not a name.
date: 2026-05-10
sidebar: left
tags: [Process, Architecture]
---

This post doubles as a layout demo: `sidebar: left` in front matter mirrors
the article shell, rail on the left. Everything else about the page is
unchanged, which is the point — the shell is a knob, not a fork.

## The argument

Every org contains a field called something like `Amount2__c`, and every
`Amount2__c` tells the same story: someone needed a second amount, the first
one was taken, and the deadline won. The name is a confession that the data
model stopped being designed at some point and started being appended to.

Names are the cheapest architecture there is. Three rules cover most of it:

- **Name the meaning, not the mechanics.** `Renewal_Amount__c`, not
  `Amount2__c`; `Is_Billing_Synced__c`, not `Flag3__c`.
- **Put the unit in the name** when the type does not carry it —
  `Term_Months__c` has prevented more bugs than most validation rules.
- **A prefix is a namespace.** `INT_` for integration-owned fields tells an
  admin "changing this breaks something you cannot see" at a glance, which
  is the entire job of a naming convention: making danger legible.

## The uncomfortable corollary

You cannot rename your way out of a bad model — a field named beautifully
for the wrong concept is worse than an ugly one, because it looks
deliberate. Naming is the finish, not the structure; the structure is the
[field audit]({{ '/blog/field-audit-part-one/' | relative_url }}).
