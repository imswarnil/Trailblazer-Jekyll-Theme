---
title: A debounced search input in LWC
description: Three hundred milliseconds of patience, and one fewer race condition.
date: 2026-01-08
language: JavaScript
tags: [LWC, JavaScript]
---

A search box that calls Apex on every keystroke sends eight requests for
"account" and renders whichever one comes back last — which is not necessarily
the one for the full word.

```javascript
import { LightningElement, track } from 'lwc';
import search from '@salesforce/apex/SearchService.find';

const DEBOUNCE_MS = 300;

export default class QuickSearch extends LightningElement {
  @track results = [];
  timer;
  // Monotonically increasing, so a slow response for an old query can be
  // recognised and dropped. Debouncing alone does not fix this: two requests
  // can still be in flight, and they can still land out of order.
  sequence = 0;

  handleInput(event) {
    const term = event.target.value;
    window.clearTimeout(this.timer);

    if (term.length < 2) {
      this.results = [];
      return;
    }

    this.timer = window.setTimeout(() => this.run(term), DEBOUNCE_MS);
  }

  async run(term) {
    const mine = ++this.sequence;
    try {
      const rows = await search({ term });
      if (mine !== this.sequence) return;   // a newer query has since started
      this.results = rows;
    } catch (error) {
      if (mine !== this.sequence) return;
      this.results = [];
      this.dispatchEvent(new CustomEvent('searcherror', { detail: error }));
    }
  }

  // Clean up, or a component destroyed mid-wait fires setTimeout into nothing.
  disconnectedCallback() {
    window.clearTimeout(this.timer);
  }
}
```

The `sequence` check is the part people leave out. Debouncing reduces the number
of requests; it does not guarantee the last response is the last query.
