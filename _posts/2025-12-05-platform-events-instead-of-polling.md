---
title: Platform Events instead of polling
description: >-
  We replaced a fifteen-minute polling job with Platform Events. Latency went
  from eight minutes average to under two seconds, and the API usage graph
  went flat.
date: 2025-12-05
tags: [Integration, Platform Events]
image: /assets/img/covers/blog.svg
---

The billing system needed to know when an opportunity closed. The existing
answer was a scheduled job every fifteen minutes that queried everything
modified since the last run and posted it onwards.

It worked. It also meant an average of eight minutes between "the deal closed"
and "billing knows", a query that got slower every quarter, and 96 API calls a
day spent mostly discovering that nothing had happened.

## What we changed

A Platform Event published from the trigger, and a subscriber on the other side.

```apex
// The event is a fact about the past, not a command. Named accordingly —
// OpportunityClosed, not CloseOpportunity — because a subscriber that reads
// it as an instruction will eventually do something we did not ask for.
List<Opportunity_Closed__e> events = new List<Opportunity_Closed__e>();

for (Opportunity o : Trigger.new) {
    Opportunity old = Trigger.oldMap.get(o.Id);
    if (o.IsWon && !old.IsWon) {
        events.add(new Opportunity_Closed__e(
            Opportunity_Id__c = o.Id,
            Amount__c         = o.Amount,
            Closed_At__c      = System.now()
        ));
    }
}

// publish() returns a result per event and does NOT throw. Ignoring the
// return value is the single most common way to lose an event silently.
for (Database.SaveResult sr : EventBus.publish(events)) {
    if (!sr.isSuccess()) {
        Logger.error('Failed to publish OpportunityClosed', sr.getErrors());
    }
}
```

## The four things worth knowing

**Publishing is not transactional in the way you expect.** With the default
`PublishAfterCommit` behaviour, the event goes out only if the transaction
commits — which is what you want. With `PublishImmediately`, it goes out even if
the transaction rolls back, and you have told a downstream system about
something that did not happen.

**Delivery is at-least-once.** A subscriber will occasionally see the same event
twice. Every handler needs to be idempotent, and the cheapest way to get there
is a unique external id on whatever the subscriber writes.

**The event bus retains for 72 hours.** That is your entire replay window. A
subscriber that is down over a long weekend does not catch up.

{% include components/callout.html type="warning" title="Store the replay id"
   text="A CometD subscriber that reconnects without a stored replay id resumes from 'now' and silently drops everything it missed while disconnected. Persist it after every batch." %}

**High-volume events have their own allocation**, and it is consumed by
delivery, not by publication. One event delivered to four subscribers is four
against the limit.

## The numbers

| | Polling | Platform Events |
| --- | --- | --- |
| Average latency | 8 min | 1.4 s |
| API calls/day | 96 | ~40 (actual closures) |
| Code | 1 scheduled class, 1 batch | 1 trigger, 1 subscriber |

The API graph flattening was the part that got the change approved. The latency
was the part that mattered.
