# Trailblazer for Ghost

The [Trailblazer](https://trailblazer.imswarnil.com) design system — built for Salesforce developers who write — ported to a native Ghost theme. Same tokens, same navbar island with the reading-progress ring, same numbered index, same Salesforce-navy code slabs. No build step, no dependencies: plain CSS and a small vanilla JS file.

> Looking for the Jekyll version? It lives one folder up, in the root of this repository.

## Install

1. Download this folder as a zip (or `cd ghost-theme && zip -r trailblazer-ghost.zip . -x "*.example"`).
2. Ghost Admin → **Settings → Design & branding → Change theme → Upload theme**.
3. Activate. Done.

Requires Ghost **5.0+**.

## Everything is configured from Ghost Admin

The theme deliberately has no config files to edit. It reads:

| Where in Admin | What it drives |
| --- | --- |
| **Design → Brand → Accent color** | Every accent in the theme — buttons, badges, focus rings, the progress ring, link color, both light and dark schemes — derives from this one color. |
| **Design → Site-wide** (theme settings) | Navigation layout (island / full), color scheme (system / light / dark), reading-progress ring on/off, CTA button text + URL, footer tagline, author card on/off. |
| **Settings → Navigation** | Primary nav (the navbar) and secondary nav (the footer columns). |
| **Settings → General → Social accounts** | Footer social icons. |
| **Membership** | The CTA defaults to `#/portal/signup`; the footer shows a signup block when members are enabled. Ghost Portal handles the rest. |

### Theme settings (Design → Site-wide)

- **Navigation layout** — `island` (floating pill navbar, progress as a ring around it) or `full` (edge-to-edge bar, progress as a hairline under it).
- **Color scheme** — the default before a visitor touches the toggle: `system`, `light`, or `dark`. The visitor's toggle choice persists in `localStorage`.
- **Show reading progress** — the ring / hairline that fills as you scroll.
- **CTA text / URL** — the primary button in the navbar. Point it at Portal (`#/portal/signup`), a newsletter, or anything else. Empty text hides it.
- **Footer tagline** — one line under the site name in the footer.
- **Show author card** — the byline card at the end of posts.

## What's supported

- **All Koenig editor cards** — image (wide/full widths), gallery, callout, bookmark, button, toggle, header, file, product, alt blockquote.
- **Native search** — the navbar search button opens Ghost's built-in search (sodo-search).
- **Native comments** — renders on posts when enabled in Membership settings.
- **Members** — access badges on the index, Portal links, footer signup.
- **Dark mode** — true dark scheme (not an inversion), with a no-flash inline script and a toggle that persists.
- **Code copy buttons** on every code block. Ghost doesn't ship a syntax highlighter; the slabs are styled (Salesforce navy) and play well with Prism if you inject it via Code Injection.
- **Accessibility** — skip link, visible focus everywhere, `aria-current` navigation, reduced-motion kills all animation.

## Customizing

- **Colors**: change the accent in Admin — that's the intended path. For deeper changes, every value is a CSS custom property in the token block at the top of `assets/css/screen.css`.
- **Fonts**: the stacks fall back to system fonts. To load webfonts (Space Grotesk / Inter / IBM Plex Mono), add the `<link>` tags via **Code Injection → Site header**.
- **CSS/JS tweaks**: Code Injection works for small things; for real changes fork the folder — it's small enough to read in one sitting, and every file has a header comment explaining its job.
- **Routes**: `routes.yaml.example` shows the default structure; upload a modified copy via Labs if you need collections.

## Files

```
ghost-theme/
├── package.json          theme metadata + custom settings
├── default.hbs           the shell: head, navbar, footer
├── index.hbs             home — statement hero + numbered index
├── post.hbs              article
├── page.hbs              static page
├── tag.hbs               tag archive
├── author.hbs            author archive
├── error-404.hbs         404
├── partials/
│   ├── navigation.hbs    navbar links (aria-current)
│   ├── footer.hbs        footer columns, socials, signup
│   ├── post-row.hbs      one row of the numbered index
│   ├── pagination.hbs    older/newer
│   ├── byline.hbs        author card
│   └── icons.hbs         inline SVG sprite
└── assets/
    ├── css/screen.css    the whole design system, hand-compiled
    └── js/theme.js       toggle, drawer, progress, copy
```

## License

MIT — same as the Jekyll theme. Not affiliated with or endorsed by Salesforce; "Trailblazer" is used in its plain-English sense.
