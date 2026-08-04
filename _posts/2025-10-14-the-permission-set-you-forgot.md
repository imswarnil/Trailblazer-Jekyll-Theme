---
title: The permission set you forgot
description: >-
  Deployments that pass validation and still break for users usually break in
  the same place. Here is the checklist that catches it.
date: 2025-10-14
tags: [Deployment, Security]
image: /assets/img/covers/blog.svg
---

The deployment validated. The tests passed. The feature does not work for
anybody except you.

It is almost always permissions, and it is almost always one of five things.

## The five

1. **The field is not in the permission set.** New fields are invisible by
   default. Validation does not care, because Apex running in test context is
   usually running as a user who can see everything.
2. **The Apex class is not in the permission set.** A Visualforce page or an
   LWC calling `@AuraEnabled` Apex needs explicit class access.
3. **The permission set was deployed but not assigned.** These are separate
   operations, and only one of them is in your package.
4. **The record type is not assigned to the profile.** The picklist looks empty
   and nobody can tell you why.
5. **Field-level security is right, but the layout was not updated.** The user
   has access to a field that is not on any page they can reach.

{% include components/callout.html type="info" title="Why validation misses all five"
   text="Validation deploys metadata and runs tests. It does not simulate a real user opening a real page — so the entire class of 'deployed correctly, invisible in practice' bugs is outside what it can see." %}

## The check that catches it

Before you call a deployment done, log in as a real user of the feature. Not
"Login As" from Setup with a system administrator profile in the background —
an actual test user carrying the actual profile and permission sets that a
person in that role has.

Two minutes, and it catches all five.

## Making it structural

Better than a checklist: put permission-set assignment in the post-deployment
step and treat an unassigned permission set as a failed deploy.

```bash
sf project deploy start --target-org prod
sf org assign permset --name Case_Console_Access --target-org prod
```

The second line is the one people leave out of the runbook because it worked in
the sandbox — where it was assigned six months ago and nobody remembers doing it.
