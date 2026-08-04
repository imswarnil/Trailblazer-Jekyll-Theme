---
title: A billing integration with no polling
description: >-
  Platform Events out, a bulk REST bridge in, and a nightly reconciliation job
  that catches what both of them miss.
date: 2025-11-12
tags: [Integration, Platform Events, Apex]
image: /assets/img/covers/projects.svg
repo: billing-event-bridge
language: Apex
github: https://github.com/example/billing-event-bridge
facts:
  - { label: Client, value: Northwind Digital }
  - { label: Year, value: "2025" }
  - { label: Role, value: Designer and implementer }
  - { label: Stack, value: "Platform Events, Named Credentials, Batch Apex" }
  - { label: Outcome, value: "8 min → 1.4s latency" }
---

Salesforce needed to tell a twenty-year-old billing system when a deal closed,
and the billing system needed to tell Salesforce when an invoice was paid. The
existing bridge was a polling job in each direction.

## The shape

**Outbound** is a Platform Event published from the opportunity trigger, with a
subscriber on the billing side over CometD. Detail in
[the write-up]({{ '/blog/platform-events-instead-of-polling/' | relative_url }}).

**Inbound** is a bulk REST endpoint. Billing posts a batch of payment records
every fifteen minutes; an Apex REST class upserts them against an external id.
Inbound stayed batched deliberately — payments are not urgent, and a batch of
four hundred is one API call rather than four hundred.

**Reconciliation** is a nightly Batch Apex job comparing the two systems'
totals for the previous day and raising a case on a mismatch.

{% include components/callout.html type="info" title="Why the third piece exists"
   text="Platform Events retain for 72 hours and deliver at least once. Both of those are fine properties, and neither is a guarantee that two systems agree. The reconciliation job is what turns 'probably consistent' into 'we would know'." %}

## What it caught

In the first month, the reconciliation job raised four cases. Three were real —
events the subscriber had acknowledged and then dropped during a deployment
restart. The fourth was a timezone bug in the job itself.

Without it, those three would have been discovered by a customer.

## The honest part

The reconciliation job took nearly as long to build as the integration it
checks, and I had to argue for it twice. It is the part of the project I would
defend hardest if the budget were cut.
