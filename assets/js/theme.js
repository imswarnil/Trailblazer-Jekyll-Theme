---
layout: null
# Has front matter so Liquid can write the search-index URL into it, which is
# the one thing this file cannot know on its own when a site sets a baseurl.
---
/* =============================================================================
   TRAILBLAZER — theme behaviour
   One file, deferred, no dependencies.

   Everything here is an enhancement. The nav, the article, the code blocks and
   the resume all work with this file missing; what it adds is the drawer, the
   remembered theme, the table of contents, the search palette and the copy
   buttons. Nothing below is load-bearing for reading the site.

   The shared convention: this script only ever sets attributes and classes the
   stylesheet already understands, so CSS stays the single description of how
   anything looks.
   ========================================================================== */
(function () {
  'use strict';

  var SEARCH_INDEX = {{ '/search.json' | relative_url | jsonify }};
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Colour theme ─────────────────────────────────────────────────────────
     The no-flash script in <head> has already applied the saved choice. This
     only handles the toggle, and cycles light → dark → light. "System" is the
     unset state: it is what a reader has before they ever press the button,
     and clearing storage is how they get back to it.
     ------------------------------------------------------------------------ */
  function currentScheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit) return explicit;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-tb-theme-toggle]')) return;
    var next = currentScheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('tb-scheme', next); } catch (err) { /* storage blocked */ }
  });

  /* ── Navbar ───────────────────────────────────────────────────────────── */
  var navbar = document.querySelector('[data-tb-navbar]');
  var navToggle = document.querySelector('[data-tb-nav-toggle]');

  if (navToggle && navbar) {
    navToggle.addEventListener('click', function () {
      var open = navbar.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    // Escape closes the drawer and returns focus to the control that opened
    // it — otherwise focus is stranded inside a panel that is no longer there.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navbar.classList.contains('is-open')) {
        navbar.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // Dropdowns are <details>. The platform gives us open/close and keyboard
  // support; all that is missing is closing one when you click elsewhere.
  document.addEventListener('click', function (e) {
    document.querySelectorAll('[data-tb-dropdown][open]').forEach(function (d) {
      if (!d.contains(e.target)) d.removeAttribute('open');
    });
  });

  /* ── Scroll state ─────────────────────────────────────────────────────────
     Two things ride on scroll position: the navbar's shadow and the reading
     progress bar. Both are written in one rAF-throttled handler, because two
     separate scroll listeners doing layout reads is how a page starts to feel
     heavy on a mid-range phone.
     ------------------------------------------------------------------------ */
  var progressEl = document.querySelector('[data-tb-progress]');
  var article = document.querySelector('[data-tb-article]');
  var ticking = false;

  function onScroll() {
    if (navbar) navbar.classList.toggle('is-scrolled', window.scrollY > 8);

    if (progressEl && article) {
      var rect = article.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var seen = -rect.top;
      var ratio = total > 0 ? Math.min(1, Math.max(0, seen / total)) : 0;
      progressEl.style.setProperty('--tb-progress', ratio.toFixed(3));
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(onScroll);
  }, { passive: true });
  onScroll();

  /* ── Table of contents ────────────────────────────────────────────────────
     Built from the article's own headings rather than from a Liquid pass over
     the Markdown, so it always matches what is actually rendered — including
     headings that came out of an include.

     If the article has fewer than two headings the widget stays hidden: a
     table of contents with one entry is furniture.
     ------------------------------------------------------------------------ */
  function buildToc() {
    if (!article) return;
    var headings = article.querySelectorAll('h2[id], h3[id]');
    if (headings.length < 2) return;

    var lists = document.querySelectorAll('.tb-toc');
    if (!lists.length) return;

    var html = '';
    headings.forEach(function (h) {
      var cls = h.tagName === 'H3' ? ' class="tb-toc__h3"' : '';
      html += '<li' + cls + '><a href="#' + h.id + '">' + h.textContent.trim() + '</a></li>';
    });

    lists.forEach(function (list) { list.innerHTML = html; });
    document.querySelectorAll('[data-tb-toc-widget], [data-tb-toc-mobile]').forEach(function (el) {
      el.hidden = false;
    });

    // Add the heading anchors while we are here — one pass over the same list.
    headings.forEach(function (h) {
      var a = document.createElement('a');
      a.className = 'tb-anchor';
      a.href = '#' + h.id;
      a.setAttribute('aria-label', 'Link to this section');
      a.textContent = '#';
      h.appendChild(a);
    });

    highlightToc(headings);
  }

  function highlightToc(headings) {
    if (!('IntersectionObserver' in window)) return;
    var links = {};
    document.querySelectorAll('.tb-toc a').forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      (links[id] = links[id] || []).push(a);
    });

    var visible = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });

      // Mark the topmost heading currently on screen. Falling back to "the
      // last one we passed" would light up an entry the reader cannot see.
      var current = null;
      headings.forEach(function (h) {
        if (current === null && visible.has(h.id)) current = h.id;
      });

      Object.keys(links).forEach(function (id) {
        links[id].forEach(function (a) {
          if (id === current) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-80px 0px -70% 0px' });

    headings.forEach(function (h) { io.observe(h); });
  }

  buildToc();

  /* ── Code blocks ──────────────────────────────────────────────────────────
     Rouge emits a bare <div class="highlighter-rouge"><pre>. This wraps each
     one in a header carrying the language and a copy button — done in script
     rather than in Liquid so it also covers code inside includes and inside
     Markdown that came from somewhere else.
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.tb-prose div.highlighter-rouge').forEach(function (block) {
    if (block.querySelector('.tb-code__head')) return;

    var lang = '';
    var match = block.className.match(/language-([\w-]+)/);
    if (match && match[1] !== 'plaintext') lang = match[1];

    var head = document.createElement('div');
    head.className = 'tb-code__head';
    head.innerHTML =
      '<span class="tb-code__lang">' + (lang || 'code') + '</span>' +
      '<button type="button" class="tb-code__copy" data-tb-copy-code>Copy</button>';
    block.insertBefore(head, block.firstChild);
  });

  /* ── Copy to clipboard ────────────────────────────────────────────────────
     Two flavours: `data-tb-copy="<text>"` for a known string (the share row's
     permalink) and `data-tb-copy-code` for the code block it sits in.

     The confirmation is the button's own label changing for two seconds, and
     `aria-live` on the button means a screen reader hears it too — a silent
     visual tick tells a blind user nothing happened.
     ------------------------------------------------------------------------ */
  function copy(text, button, doneLabel) {
    var reset = button.getAttribute('data-tb-copy-original') || button.textContent;
    button.setAttribute('data-tb-copy-original', reset);

    var finish = function (ok) {
      button.textContent = ok ? (doneLabel || 'Copied') : 'Press ⌘C';
      button.setAttribute('data-copied', '');
      button.setAttribute('aria-live', 'polite');
      setTimeout(function () {
        button.textContent = reset;
        button.removeAttribute('data-copied');
      }, 2000);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { finish(true); },
                                               function () { finish(false); });
    } else {
      // Older Safari and any non-secure origin: select the text and let the
      // reader press the shortcut. Better than a button that does nothing.
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      finish(ok);
    }
  }

  document.addEventListener('click', function (e) {
    var codeBtn = e.target.closest('[data-tb-copy-code]');
    if (codeBtn) {
      var pre = codeBtn.closest('div.highlighter-rouge, .tb-code').querySelector('pre');
      if (pre) copy(pre.innerText, codeBtn);
      return;
    }

    var linkBtn = e.target.closest('[data-tb-copy]');
    if (linkBtn) {
      var label = linkBtn.querySelector('[data-tb-copy-label]') || linkBtn;
      copy(linkBtn.getAttribute('data-tb-copy'), label, 'Link copied');
    }
  });

  /* ── Print ────────────────────────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-tb-print]')) window.print();
  });

  /* ── Scroll reveal ────────────────────────────────────────────────────────
     The hidden state is applied by CSS only when `html.tb-js` is present — set
     by the head script — and removed here. So with JS disabled nothing is ever
     hidden, and with reduced motion the class is added immediately.
     ------------------------------------------------------------------------ */
  var revealables = document.querySelectorAll('[data-tb-reveal]');
  if (revealables.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealables.forEach(function (el) { el.classList.add('is-revealed'); });
    } else {
      var revealer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          revealer.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px' });
      revealables.forEach(function (el) { revealer.observe(el); });
    }
  }

  /* ── Lazy embeds ──────────────────────────────────────────────────────────
     Anything inside [data-tb-lazy-embed] has its <script> tags held back until
     the block is near the viewport. Used by the comment thread, which is the
     heaviest third-party thing on an article page and the one nobody has asked
     for at the moment the article loads.
     ------------------------------------------------------------------------ */
  document.querySelectorAll('[data-tb-lazy-embed]').forEach(function (holder) {
    var scripts = Array.prototype.slice.call(holder.querySelectorAll('script'));
    if (!scripts.length || !('IntersectionObserver' in window)) return;

    scripts.forEach(function (s) { s.remove(); });

    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      scripts.forEach(function (old) {
        var s = document.createElement('script');
        for (var i = 0; i < old.attributes.length; i++) {
          s.setAttribute(old.attributes[i].name, old.attributes[i].value);
        }
        s.textContent = old.textContent;
        holder.appendChild(s);
      });
    }, { rootMargin: '400px' });

    io.observe(holder);
  });

  /* ── Search ───────────────────────────────────────────────────────────────
     A <dialog> palette over a JSON index fetched on first open. Scoring is
     deliberately simple — title matches beat tag matches beat body matches —
     because a personal site has hundreds of entries, not millions, and a real
     search library would be larger than the content it indexes.
     ------------------------------------------------------------------------ */
  var dialog = document.getElementById('tb-search-palette');

  if (dialog && typeof dialog.showModal === 'function') {
    var input = dialog.querySelector('[data-tb-search-input]');
    var results = dialog.querySelector('[data-tb-search-results]');
    var empty = dialog.querySelector('[data-tb-search-empty]');
    var index = null;
    var loading = false;
    var cursor = -1;

    function loadIndex() {
      if (index || loading) return Promise.resolve();
      loading = true;
      return fetch(SEARCH_INDEX)
        .then(function (r) { return r.json(); })
        .then(function (data) { index = data; loading = false; })
        .catch(function () {
          loading = false;
          index = [];
          empty.textContent = 'Search is unavailable right now.';
          empty.hidden = false;
        });
    }

    function openSearch() {
      loadIndex().then(function () {
        if (!dialog.open) dialog.showModal();
        input.focus();
        input.select();
      });
    }

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
      cursor = -1;
      if (!index || q.length < 2) {
        results.innerHTML = '';
        empty.hidden = true;
        return;
      }

      var hits = index
        .map(function (item) { return { item: item, s: score(item, q) }; })
        .filter(function (h) { return h.s > 0; })
        .sort(function (a, b) { return b.s - a.s; })
        .slice(0, 12);

      empty.hidden = hits.length > 0;

      results.innerHTML = hits.map(function (h, i) {
        var item = h.item;
        return '<li role="option" id="tb-hit-' + i + '">' +
          '<a class="tb-search__hit" href="' + item.url + '">' +
            '<span class="tb-search__hit-meta">' + (item.type || '') + '</span>' +
            '<span class="tb-search__hit-title">' + item.title + '</span>' +
            (item.excerpt ? '<span class="tb-search__hit-excerpt">' + item.excerpt + '</span>' : '') +
          '</a></li>';
      }).join('');
    }

    function move(delta) {
      var options = results.querySelectorAll('.tb-search__hit');
      if (!options.length) return;
      cursor = (cursor + delta + options.length) % options.length;
      options.forEach(function (o, i) {
        o.setAttribute('aria-selected', String(i === cursor));
      });
      options[cursor].scrollIntoView({ block: 'nearest' });
    }

    input.addEventListener('input', function () {
      render(input.value.trim().toLowerCase());
    });

    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter' && cursor > -1) {
        e.preventDefault();
        results.querySelectorAll('.tb-search__hit')[cursor].click();
      }
    });

    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-tb-search-open]')) { e.preventDefault(); openSearch(); }
    });

    // "/" and ⌘K both open it — "/" because that is what every developer tool
    // has trained people to press, ⌘K because that is what every app has.
    // Neither fires while the reader is already typing somewhere.
    document.addEventListener('keydown', function (e) {
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) ||
                   document.activeElement.isContentEditable;
      if (typing) return;

      if (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        openSearch();
      }
    });
  }
})();
