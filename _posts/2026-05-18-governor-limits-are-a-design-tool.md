---
title: Governor limits are a design tool
description: >-
  Everyone treats governor limits as something to survive. They are better
  read as a spec — the platform telling you what shape your code should be.
date: 2026-05-18
tags: [Apex, Architecture]
image: /assets/img/covers/blog.svg
featured: true
---

The first thing anyone learns about Apex is that it will stop you. 100 SOQL
queries. 150 DML statements. 10,000 rows. Six megabytes of heap. Break one and
the transaction dies with a message that reads like an accusation.

So the reflex is defensive. You learn the numbers, you keep under them, and you
think of the limits as a tax on getting work done.

That reflex is wrong, and it is expensive. The limits are not a tax. They are
the platform stating, in numbers, what shape multi-tenant code has to be.

## The limits describe a shape

Look at the three that bite most often:

| Limit | What it actually says |
| --- | --- |
| 100 SOQL queries | Do not query per record |
| 150 DML statements | Do not write per record |
| 50,000 rows returned | Do not load a data set you cannot hold |

Every one of them is the same instruction wearing a different hat: **work in
sets, not in loops**. That is not a Salesforce rule. It is the rule for any
system where the database is over a network and the CPU is shared.

{% include components/callout.html type="info" title="The tell"
   text="If you are counting queries to stay under 100, you have already lost. Correct bulkified code uses two or three, and the count does not move when the batch size does." %}

## What that looks like

The version that fails is the one everybody writes first:

```apex
// Wrong: one query per record. Works on 1 record, dies on 201.
for (Account a : Trigger.new) {
    List<Contact> kids = [SELECT Id FROM Contact WHERE AccountId = :a.Id];
    if (kids.isEmpty()) {
        a.addError('Every account needs a contact.');
    }
}
```

The version that passes is not more complicated. It is the same logic with the
query lifted out:

```apex
// Right: one query, whatever the batch size.
Map<Id, Account> byId = new Map<Id, Account>(Trigger.new);

Set<Id> withContacts = new Set<Id>();
for (Contact c : [SELECT AccountId FROM Contact WHERE AccountId IN :byId.keySet()]) {
    withContacts.add(c.AccountId);
}

for (Account a : Trigger.new) {
    if (!withContacts.contains(a.Id)) {
        a.addError('Every account needs a contact.');
    }
}
```

Two loops instead of one, and a set in between. It is longer. It is also the
version that does not care whether it is handed one record or two hundred, which
is the only property that matters in a trigger.

## Read them forwards

Once you stop reading limits as obstacles, they start answering design
questions before you have to ask them.

- **Heap is 6 MB.** So a job that has to touch a million records is Batch Apex,
  and you knew that before you wrote a line.
- **CPU time is 10 seconds.** So the formula field that recalculates a rollup
  across a hierarchy is not going in a trigger.
- **Callouts are limited to 100, and none after DML.** So the integration is
  asynchronous, and you knew *that* before the first design meeting.

Each of those is a decision the platform has already made. Arguing with it costs
a sprint; reading it costs an afternoon.

## The one exception

None of this makes the limits *comfortable*. The 10-second CPU limit in
particular punishes code that is correct but naive, and the error it throws
tells you nothing about which line was slow.

But that is a complaint about the diagnostics, not about the constraint. The
constraint is doing its job: it is stopping you from writing something that
would have fallen over in production anyway, six months later, when the data
volume caught up with you.

Better to find out in the sandbox.
