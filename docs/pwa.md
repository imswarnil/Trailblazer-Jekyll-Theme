---
layout: docs
header_layout: full
title: PWA
permalink: /docs/pwa/
description: The service worker, and when not to turn it on.
---

The theme ships a service worker and a web app manifest. Both are **off by
default**, and that is a recommendation as much as a setting.

---

## Read this before turning it on

A service worker is a piece of code that sits between your readers and your
server, permanently, for as long as their browser keeps it. When it works,
pages load instantly and survive a lost connection. When it is misconfigured,
it serves someone a version of your site from three deploys ago and there is
nothing they can do about it except clear site data — which they will not know
to do.

Turn it on when:

- your domain is settled (a service worker is scoped to an origin)
- the site is deployed and stable
- you actually want offline reading

Do not turn it on to tick a Lighthouse box.

---

## Turning it on

```yaml
pwa:
  enabled: true
  name: Your Site
  short_name: Site
  theme_color: "#0176d3"
  background_color: "#ffffff"
  display: standalone
  precache:
    - /
    - /blog/
    - /offline/
```

Keep `/offline/` in `precache` — it is the fallback shown when a reader is
offline and asks for a page they have never visited.

Registration is additionally gated on production, so the worker never installs
during local development. To test it: `JEKYLL_ENV=production bundle exec jekyll
build && bundle exec jekyll serve --skip-initial-build`.

---

## What the worker does

Three strategies, chosen so the failure mode is "slightly stale" rather than
"badly wrong":

| Resource | Strategy | Why |
| --- | --- | --- |
| HTML | Network first, cache as fallback | Online readers always get the current page; offline readers get the last one they saw |
| CSS, JS | Stale-while-revalidate | Instant, refreshed in the background |
| Images, fonts | Cache first | They do not change under the same URL |

Only same-origin `GET` requests are touched. A cached POST is meaningless, and
caching another origin's responses is not this worker's business.

### Invalidation

The cache name carries a build timestamp, so **every deploy creates a new cache
and the activate step deletes the old ones.** That is the whole strategy, and
it is deliberately blunt: subtle cache invalidation is how service workers go
wrong.

A returning reader gets the new version on their second navigation after a
deploy — the first one is served from cache while the update installs.

---

## Icons

The manifest points at three PNGs in `assets/img/`:

| File | Size | Purpose |
| --- | --- | --- |
| `icon-192.png` | 192×192 | Standard |
| `icon-512.png` | 512×512 | Standard, splash screen |
| `icon-maskable.png` | 512×512 | Maskable — Android crops this to a circle |

The maskable one has its artwork inset into the safe zone, because Android will
crop the outer 20% away. Using the same image for both is why so many installed
web apps have their logo clipped.

To rebrand them, replace the four PNGs with your own — any image tool works.
Keep the maskable one's artwork inside the middle 60% of the canvas; the
launcher crops the rest.

---

## Turning it off again

This is the part people get stuck on. Setting `enabled: false` stops the theme
registering the worker — but it does **not** remove the one already installed in
your readers' browsers. That worker keeps serving its cache.

To actually retire it, deploy a `sw.js` that unregisters itself before you
remove the file:

```javascript
self.addEventListener('install', function () { self.skipWaiting(); });

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll(); })
      .then(function (clients) { clients.forEach(function (c) { c.navigate(c.url); }); })
  );
});
```

Leave that in place for a few weeks — long enough for returning readers to pick
it up — then delete `sw.js`.

---

## The offline page

`/offline/` is a normal page in the repository. Edit it like any other. It is
`noindex`, kept out of the sitemap and out of the search index, because it is a
shell rather than content.
