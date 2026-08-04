---
title: Your first trigger, in a scratch org
type: lesson
order: 3
duration: 21 min
video: dQw4w9WgXcQ
description: Environment setup the honest way, then twelve lines that validate a record.
---

The setup is half this lesson on purpose. Most "first Apex" tutorials skip it
and leave you writing code in production, which is the habit we are here to
not form.

## The twelve lines

```apex
trigger AccountGuard on Account (before insert, before update) {
    for (Account a : Trigger.new) {
        // The same rule you would write as a validation formula —
        // ISBLANK(Phone) && ISPICKVAL(Type, "Customer")
        if (a.Phone == null && a.Type == 'Customer') {
            a.addError('A customer account needs a phone number.');
        }
    }
}
```

Yes, a validation rule does this in one line, and in real life a validation
rule is the right tool for it. We are using a familiar rule precisely so the
only new thing on screen is the syntax.

## What to notice

`addError` on the record, not an exception — the platform turns it into the
same red banner your validation rules produce. And the loop: even your first
trigger handles *all* the records, because lesson six is going to make a very
big deal of that.
