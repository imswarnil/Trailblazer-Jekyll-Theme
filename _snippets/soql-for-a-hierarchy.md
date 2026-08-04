---
title: Walking an account hierarchy in a fixed number of queries
description: Five levels, five queries, and a guard against the cycle somebody will eventually create.
date: 2025-11-02
language: Apex
tags: [SOQL, Apex]
---

Recursion up a parent chain is one query per level per record, which is a
governor limit waiting to happen. Walk it level by level instead: one query per
*level*, regardless of how many records are at it.

```apex
public static Set<Id> ancestorsOf(Set<Id> startIds) {
    Set<Id> found = new Set<Id>();
    Set<Id> frontier = new Set<Id>(startIds);

    // A hard ceiling rather than `while (!frontier.isEmpty())`. Salesforce
    // will not let you create a cycle in a standard hierarchy, but custom
    // lookup "hierarchies" have no such protection, and an infinite loop
    // inside a trigger takes the whole transaction with it.
    for (Integer depth = 0; depth < 10 && !frontier.isEmpty(); depth++) {
        Set<Id> parents = new Set<Id>();

        for (Account a : [SELECT ParentId FROM Account WHERE Id IN :frontier AND ParentId != null]) {
            if (!found.contains(a.ParentId)) {
                parents.add(a.ParentId);
            }
        }

        found.addAll(parents);
        frontier = parents;
    }

    return found;
}
```

Ten queries worst case, whether you started with one account or two hundred.

{% include components/callout.html type="info" title="There is a shortcut, sometimes"
   text="If you only need the top of the chain and the object is Account, `Parent.Parent.Parent.Id` in a single SOQL query gets you five levels for free. It stops being viable the moment the depth is unknown — which is why the loop above exists." %}
