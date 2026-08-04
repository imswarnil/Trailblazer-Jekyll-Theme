---
layout: null
permalink: /sw.js
sitemap: false
---
/* =============================================================================
   SERVICE WORKER
   Registered only when `pwa.enabled` is true in _config.yml (see
   _layouts/default.html), so this file is inert on a site that has not opted
   in.

   The strategy is chosen to fail safe, because the failure mode of a service
   worker is serving someone a page from three deploys ago:

     HTML          network first, cache as fallback.  A reader online always
                   gets the current page; a reader offline gets the last one
                   they saw, or the offline shell.
     CSS/JS/fonts  stale-while-revalidate. Instant, and refreshed in the
                   background for next time.
     images        cache first. They do not change under the same URL.

   The cache name carries a build stamp, so every deploy creates a new cache
   and the activate step deletes the old ones. That is the whole
   invalidation strategy, and it is deliberately blunt.
   ========================================================================== */

var VERSION = '{{ site.time | date: "%Y%m%d%H%M%S" }}';
var CACHE = 'tb-' + VERSION;
var OFFLINE_URL = {{ '/offline/' | relative_url | jsonify }};

var PRECACHE = [
  {%- for path in site.pwa.precache %}
  {{ path | relative_url | jsonify }},
  {%- endfor %}
  {{ '/assets/css/main.css' | relative_url | jsonify }},
  {{ '/assets/js/theme.js' | relative_url | jsonify }}
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE)
      // addAll rejects the whole batch if one URL 404s, which would leave the
      // worker uninstalled and the failure invisible. Each entry is added on
      // its own so one bad path in the config cannot break offline entirely.
      .then(function (cache) {
        return Promise.all(PRECACHE.map(function (url) {
          return cache.add(url).catch(function () { /* skip what is missing */ });
        }));
      })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (key) {
          if (key !== CACHE) return caches.delete(key);
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request;

  // Only GET, only this origin. A cached POST is meaningless, and caching
  // another origin's responses is not this worker's business.
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  var accept = request.headers.get('accept') || '';

  if (request.mode === 'navigate' || accept.indexOf('text/html') > -1) {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          var copy = response.clone();
          caches.open(CACHE).then(function (c) { c.put(request, copy); });
          return response;
        })
        .catch(function () {
          return caches.match(request).then(function (hit) {
            return hit || caches.match(OFFLINE_URL);
          });
        })
    );
    return;
  }

  if (request.destination === 'image' || request.destination === 'font') {
    event.respondWith(
      caches.match(request).then(function (hit) {
        return hit || fetch(request).then(function (response) {
          var copy = response.clone();
          caches.open(CACHE).then(function (c) { c.put(request, copy); });
          return response;
        });
      })
    );
    return;
  }

  // Everything else: serve what we have, refresh it behind the reader's back.
  event.respondWith(
    caches.match(request).then(function (hit) {
      var network = fetch(request).then(function (response) {
        var copy = response.clone();
        caches.open(CACHE).then(function (c) { c.put(request, copy); });
        return response;
      }).catch(function () { return hit; });
      return hit || network;
    })
  );
});
