/* =============================================================================
   TRAILBLAZER FOR GHOST — theme.js
   Everything behavioural, dependency-free, in one small file. Four jobs:
   theme toggle, mobile drawer, reading progress, code-copy buttons.
   Each is progressive enhancement: the page works fully without any of it.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ── Theme toggle ─────────────────────────────────────────────────────────
     The inline script in default.hbs already applied the stored choice
     before paint; this button just flips it. "System" resolves to whatever
     the OS says right now, so the first press always visibly changes. */
  var toggle = document.querySelector('[data-tb-theme-toggle]');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      if (!current) {
        current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('tb-scheme', next); } catch (e) { /* private mode */ }
    });
  }

  /* ── Mobile drawer ──────────────────────────────────────────────────────── */
  var navbar = document.querySelector('.tb-navbar');
  var burger = document.querySelector('[data-tb-burger]');
  if (navbar && burger) {
    var closeDrawer = function () {
      navbar.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    };
    burger.addEventListener('click', function () {
      var open = navbar.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navbar.classList.contains('is-open')) {
        closeDrawer();
        burger.focus();
      }
    });
    // Tapping a link in the drawer should close it — navigation is the point.
    navbar.addEventListener('click', function (e) {
      if (e.target.closest('.tb-navbar__menu a')) closeDrawer();
    });
  }

  /* ── Reading progress + scrolled shadow ──────────────────────────────────
     One rAF-throttled scroll listener feeds both: --tb-progress (0..1) on
     the navbar for the ring/hairline, and .is-scrolled for the shadow. */
  var progressEl = document.querySelector('.tb-progress');
  if (navbar) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        if (progressEl) navbar.style.setProperty('--tb-progress', p.toFixed(4));
        navbar.classList.toggle('is-scrolled', window.scrollY > 8);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Code copy ───────────────────────────────────────────────────────────
     A small button in the corner of every code slab. Built here rather than
     in templates because Koenig owns the <pre> markup. */
  if (navigator.clipboard) {
    document.querySelectorAll('.gh-content pre').forEach(function (pre) {
      var wrap = document.createElement('div');
      wrap.className = 'tb-codewrap';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tb-copy';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      wrap.appendChild(btn);

      btn.addEventListener('click', function () {
        var code = pre.querySelector('code');
        navigator.clipboard.writeText(code ? code.innerText : pre.innerText).then(function () {
          btn.textContent = 'Copied';
          btn.classList.add('is-done');
          setTimeout(function () {
            btn.textContent = 'Copy';
            btn.classList.remove('is-done');
          }, 1600);
        });
      });
    });
  }
})();
