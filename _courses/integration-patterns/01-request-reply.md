---
title: Request-reply, done properly
type: lesson
order: 1
duration: 35 min
video: dQw4w9WgXcQ
description: Named Credentials, timeouts you chose, and the retry that does not double-charge anyone.
---

The pattern everyone starts with, because it maps onto how people think:
ask the billing system a question, wait for the answer. This lesson builds
the callout correctly the first time — Named Credential, explicit timeout,
and an error type the caller can actually act on — and then breaks it on
purpose to show what each safeguard was for.

The part most tutorials skip: **the retry**. A timeout does not mean the
request failed; it means you stopped waiting. Retrying a charge that
actually went through is how a customer gets billed twice, which is why the
retry sends an idempotency key and the lesson spends ten minutes on that one
header.
