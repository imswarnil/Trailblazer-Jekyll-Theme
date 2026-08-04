---
layout: null
# The full-page search at /search/. Shares the index with the ⌘K palette but
# not its code — the palette is a modal with a keyboard model, this is a form
# with a URL. Keeping them apart is cheaper than one component with a mode
# flag, and it means /search/?q=apex works as a linkable, shareable result.
---
(function () {
  'use strict';

  var form = document.querySelector('[data-tb-page-search]');
  if (!form) return;

  var input = form.querySelector('input[type="search"]');
  var results = document.querySelector('[data-tb-page-results]');
  var empty = document.querySelector('[data-tb-page-empty]');
  var index = null;

  function score(item, q) {
    var title = (item.title || '').toLowerCase();
    var tags = (item.tags || '').toLowerCase();
    var body = (item.body || '').toLowerCase();
    if (title.indexOf(q) === 0) return 100;
    if (title.indexOf(q) > -1) return 60;
    if (tags.indexOf(q) > -1) return 40;
    if (body.indexOf(q) > -1) return 20;
    return 0;
  }

  function render(q) {
    if (!index) return;

    if (q.length < 2) {
      results.innerHTML = '';
      empty.hidden = true;
      return;
    }

    var hits = index
      .map(function (item) { return { item: item, s: score(item, q) }; })
      .filter(function (h) { return h.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, 40);

    empty.hidden = hits.length > 0;

    results.innerHTML = hits.map(function (h) {
      var item = h.item;
      return '<li><a class="tb-search__hit" href="' + item.url + '">' +
        '<span class="tb-search__hit-meta">' + (item.type || '') +
          (item.date && item.date !== 'null' ? ' · ' + item.date : '') + '</span>' +
        '<span class="tb-search__hit-title">' + item.title + '</span>' +
        (item.excerpt ? '<span class="tb-search__hit-excerpt">' + item.excerpt + '</span>' : '') +
      '</a></li>';
    }).join('');

    // Announce the count once per search rather than on every keystroke.
    results.setAttribute('aria-label', hits.length + ' results for ' + q);
  }

  // The query is kept in the URL so a result set can be linked to and so the
  // back button behaves. replaceState, not pushState: typing should not fill
  // someone's history with one entry per character.
  function syncUrl(q) {
    var url = new URL(window.location.href);
    if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
    window.history.replaceState({}, '', url);
  }

  fetch({{ '/search.json' | relative_url | jsonify }})
    .then(function (r) { return r.json(); })
    .then(function (data) {
      index = data;
      var initial = new URLSearchParams(window.location.search).get('q');
      if (initial) {
        input.value = initial;
        render(initial.toLowerCase());
      }
    })
    .catch(function () {
      empty.textContent = 'Search is unavailable right now. The archive lists everything.';
      empty.hidden = false;
    });

  form.addEventListener('submit', function (e) { e.preventDefault(); });

  input.addEventListener('input', function () {
    var q = input.value.trim();
    syncUrl(q);
    render(q.toLowerCase());
  });
})();
