---
title: A callout with a timeout you chose
description: Named Credentials, an explicit timeout, and an error you can act on.
date: 2025-07-19
language: Apex
tags: [Integration, Apex]
---

The default callout timeout is ten seconds, which is far too long to hold a
user's transaction and far too short for some batch endpoints. Set it
deliberately either way.

```apex
public class BillingClient {
    private static final Integer TIMEOUT_MS = 8000;

    public class BillingException extends Exception {}

    public static InvoiceResponse fetch(String invoiceNumber) {
        HttpRequest req = new HttpRequest();
        // The credential name, not a URL and not a token. Nothing secret ever
        // appears in this class, which is what makes it safe to read in a PR.
        req.setEndpoint('callout:Billing_API/invoices/' + EncodingUtil.urlEncode(invoiceNumber, 'UTF-8'));
        req.setMethod('GET');
        req.setHeader('Accept', 'application/json');
        req.setTimeout(TIMEOUT_MS);

        HttpResponse res;
        try {
            res = new Http().send(req);
        } catch (System.CalloutException e) {
            // A timeout arrives here, not as a status code. Saying so in the
            // message saves the next person twenty minutes in the debug log.
            throw new BillingException('Billing API did not respond within ' +
                TIMEOUT_MS + 'ms: ' + e.getMessage(), e);
        }

        if (res.getStatusCode() == 404) return null;

        if (res.getStatusCode() >= 300) {
            throw new BillingException('Billing API returned ' + res.getStatusCode() +
                ': ' + res.getBody().abbreviate(500));
        }

        return (InvoiceResponse) JSON.deserialize(res.getBody(), InvoiceResponse.class);
    }

    public class InvoiceResponse {
        public String invoiceNumber;
        public Decimal amount;
        public String status;
    }
}
```

Three things worth copying: the URL-encoded path parameter, the separate `catch`
for `CalloutException` so a timeout does not look like a bad response, and
`abbreviate(500)` so a 5 MB HTML error page from a proxy does not blow the heap
on its way into a log.
