---
title: A trigger handler that cannot be un-bulkified
description: The base class that makes the wrong thing hard to write.
date: 2026-03-14
language: Apex
tags: [Apex, Triggers]
---

Most trigger frameworks are about routing. This one is about making the
bulkification mistake awkward: the handler never sees a single record, only the
list, so "query inside the loop" has nowhere to hide.

```apex
public abstract class TriggerHandler {
    // Recursion guard, keyed by class name. Without it, an update inside a
    // handler re-enters the same handler — and the second pass is almost never
    // what anyone intended.
    private static Set<String> bypassed = new Set<String>();

    public void run() {
        String name = String.valueOf(this).split(':')[0];
        if (bypassed.contains(name)) return;

        bypassed.add(name);
        try {
            if (Trigger.isBefore && Trigger.isInsert) beforeInsert(Trigger.new);
            if (Trigger.isBefore && Trigger.isUpdate) beforeUpdate(Trigger.new, Trigger.oldMap);
            if (Trigger.isAfter  && Trigger.isInsert) afterInsert(Trigger.new);
            if (Trigger.isAfter  && Trigger.isUpdate) afterUpdate(Trigger.new, Trigger.oldMap);
        } finally {
            // finally, not the happy path: an exception must not leave the
            // handler bypassed for the rest of the transaction.
            bypassed.remove(name);
        }
    }

    // Every hook takes the whole batch. There is deliberately no
    // beforeInsert(SObject record) overload to reach for.
    protected virtual void beforeInsert(List<SObject> records) {}
    protected virtual void beforeUpdate(List<SObject> records, Map<Id, SObject> old) {}
    protected virtual void afterInsert(List<SObject> records) {}
    protected virtual void afterUpdate(List<SObject> records, Map<Id, SObject> old) {}
}
```

Using it:

```apex
trigger AccountTrigger on Account (before insert, before update, after insert, after update) {
    new AccountHandler().run();
}
```

{% include components/callout.html type="warning" title="The guard is per-transaction"
   text="`bypassed` is a static, so it resets between transactions but not between the before and after phases of one. That is intended — but it means a handler that legitimately needs to re-enter itself has to bypass the guard explicitly rather than by accident." %}
