---
title: Collections — the part that is genuinely new
type: lesson
order: 4
duration: 19 min
description: Lists, sets and maps, and why every real trigger is built out of them.
---

No video for this one — collections are better learned in a worksheet than
watched, so this lesson is the reading version, and it is the longest page in
the course.

## The three shapes

**A `List`** is a Flow record collection: ordered, allows duplicates, and you
loop over it.

**A `Set`** is the collection you always wanted in Flow: it refuses
duplicates, and asking "is this Id in there?" is instant. Half of
bulkification is "put the Ids in a Set".

**A `Map`** is the one with no Flow equivalent, and the one that matters
most: a lookup table from key to value. "Give me the Account for this Id,
without querying again" is a Map. So is "group these Contacts by their
AccountId".

## The idiom to memorise

```apex
Map<Id, Account> accountsById = new Map<Id, Account>(
    [SELECT Id, Name, Type FROM Account WHERE Id IN :accountIds]
);
```

One query, then free lookups forever after. When you can read that line
without slowing down, you read most production Apex without slowing down —
it is the single most common three-line pattern on the platform.
