# Changelog

Notable changes to the Trailblazer theme. Versions follow
[semantic versioning](https://semver.org): a major bump means a site upgrading
has to change something.

## [Unreleased]

## [1.1.0] — 2026-08-15

### Documentation

- Prev / next pagination under every guide, driven by `_data/docs_nav.yml` —
  the new single source of truth that also renders the docs rail and orders
  the offline build. Adding a guide is one line in one file.
- Offline documentation, generated from the rendered site by
  `scripts/build-docs.rb` + `build-docs.sh` (`npm run docs:build`): a
  self-contained `documentation/` folder with `index.html` (all guides, one
  page, sidebar nav), `Trailblazer-Documentation.pdf` (printed by headless
  Chrome), `nav.json` and the Markdown sources. Ships inside the sale zip.
- The manual "Next: …" links at the foot of guides are gone; the pagination
  tiles replaced them.

### Fixed

- **Printing produced blank pages after page one.** Two causes, both in the
  framework: the page-entrance animation's `both` fill held `<main>` at the
  `from` keyframe (opacity 0) wherever animations never run, and the body's
  sideways-overflow clip made Chromium's print engine stop after one page.
  Print now disables all animation and restores visible overflow — this also
  fixes multi-page prints of `/resume/`.
- The full-width navbar no longer gains a drop shadow on scroll. Elevation is
  the island's idiom; the welded bar now only firms up its bottom hairline.

### Release engineering

- Package workflow (`.github/workflows/package.yml`): every push to main
  rebuilds the sale zip — demo site, theme, starter and the offline HTML/PDF
  documentation — and uploads it as a workflow artifact, so the latest
  sellable state is always one download away.
- `scripts/package.sh` now stages the tracked tree and builds the
  documentation into it, instead of zipping the bare tree.

## [1.0.0] — 2026-08-15

First release.

### Packaging and developer experience

- `starter/` — a complete minimal site that installs the theme as a gem: every
  config key present with placeholders, stub `_data` files, one disposable
  post, an index page per collection, the search palette, a 404 and the
  GitHub Pages deploy workflow. Verified to build against the packaged gem.
- The gem no longer packages `_data` (Jekyll does not read data files from a
  theme gem, and shipping it only bundled the demo persona's resume), nor the
  demo-only media (cover-art placeholders, README screenshots, sample audio)
  — which cuts the package from 9 MB to under 1 MB. CI enforces both.
- `Rakefile` with `rake gem:build`, `rake gem:release` and `rake check`.
- `package.json` with npm wrappers over the Ruby toolchain — `npm run dev`,
  `build`, `check:css`, `gem:build` — for people who live in npm. Node
  remains optional; nothing in the theme depends on it.
- `scripts/css-smoke.scss` — the SCSS framework smoke test, runnable outside
  Jekyll.
- A drawn SVG banner in `.github/media/` fronting the README, plus README
  sections for the starter, the gem install and the npm scripts.
- Dropped the open-ended bundler development dependency, which conflicted
  with Bundler 4.

### Release engineering

- CI workflow (`.github/workflows/ci.yml`): every push and pull request
  builds the demo in production mode, compiles the SCSS framework standalone,
  packages the gem, checks no demo content leaked into it, and builds the
  starter against the packaged theme.
- Release workflow (`.github/workflows/release.yml`): pushing a `v*` tag
  verifies the tag matches the gemspec, publishes the gem to RubyGems (when
  the `RUBYGEMS_API_KEY` secret is set), extracts that version's CHANGELOG
  section, and creates a GitHub release with the gem and the marketplace zip
  attached.
- `bin/release <version>` mechanises the cycle: bumps gemspec and
  package.json, rolls the Unreleased changelog section, commits and tags.
- `scripts/package.sh` builds `dist/trailblazer-jekyll-theme-<v>.zip` — the
  clean tracked tree, which is the Envato "Main File(s)" upload and the
  Gumroad / Lemon Squeezy download.

### Design system

- A two-tier token system in `_sass/trailblazer/`: primitive colour ramps
  feeding semantic aliases, so one hex in `_config.yml` regenerates the whole
  palette in both light and dark.
- Eleven-step ramps generated at build time from `theme_style.accent`,
  `craft`, `success`, `warning` and `danger`.
- Fluid type scale, closed spacing/radius/z-index ladders, four durations and
  four easings.
- Light, dark and system colour schemes, with an inline no-flash script and a
  toggle that remembers the reader's choice.
- `radius_scale` as a single knob for how round the theme feels.

### Layouts and content

- Six layouts: `default`, `home`, `page`, `post`, `resume`, `archive`.
- Seven typed collections — posts, projects, snippets, talks, videos, courses
  and books — each declaring its own `schema`, `hero_style`, `card_style` and
  `icon` in `_config.yml`, so a new collection needs no new layout.
- Four hero shapes (`statement`, `split`, `band`, `minimal`) selectable per
  page or per collection from front matter.
- Eight card styles (`deck`, `numbered`, `bento`, `compact`, `rows`, `repo`,
  `video`, `book`): projects render as GitHub-style repository cards with
  language dot, Live-preview and Source buttons; videos carry a play overlay
  and runtime; books a poster cover, byline and star rating.
- Courses are folders: `_courses/<slug>/index.md` plus numbered lesson files
  carrying `type: lesson` and `order:`. The course page renders its meta
  header and curriculum from the files; each lesson renders in a player with
  the whole course in a rail, the current lesson marked, and prev/next
  pagination. Lessons stay out of listings and the archive.
- Post types instead of a videos collection: `type: video` opens a post as a
  player with VideoObject JSON-LD; `series:` + `series_part:` joins posts
  into a series with a parts box on every member.
- Article shells from front matter: `sidebar: right · left · false`, split
  two-column headers with `hero_split: true`, and a live /showcase/ page
  demonstrating every shape.
- Breadcrumbs with icons on every page — Home → collection → entry, with the
  course trail one level deeper.
- Certification badges drawn as per-track coloured shields (a `color:` key per
  entry in `_data/certifications.yml`), CSS-only.
- Reading progress as a fine accent ring around the navbar island, starting
  at the brand and travelling the pill's outline; a bottom hairline on the
  full-bar layout. The active nav item wears a small cloud — the theme's own
  mark — instead of a dot.
- Header per-page overrides (`header_layout`, `header_sticky`, `header_blur`,
  `header_progress`, `header_search`) and configurable icon links beside the
  theme toggle.
- `/resume/` generated entirely from `_data/resume.yml` and
  `_data/certifications.yml`, and built to print onto A4 without a PDF export.
- `/archive/` with a tag index across every collection.
- `/style-guide/` as a living reference, so a broken component shows up on the
  next build.

### Community and polish

- MIT licensed, with a contribution guide, on-site documentation at `/docs/`
  rendered from the same files contributors edit, and per-tag pages
  (`/tag/apex/`) as four-line static stubs the tag layout drives.
- The archive gains a sticky browse rail; the resume a cloud-tile hero band,
  two-column body and icon-noded timelines for experience and education.
- Courses carry outcomes, prerequisites, testimonials and FAQs from front
  matter, each drawn as its own component; series posts navigate through a
  numbered stepper.
- Talks get a styled native audio player; books get Buy/PDF buttons; every
  thumbnail wears a soft-light accent veil so images from anywhere sit on
  one palette; video cards use their YouTube thumbnails.
- An always-labelled responsive AdSense module, off until configured, with
  dev placeholders. Sidebar grows share, at-a-glance facts and ad widgets.
- /now and /my-journey pages; Home in the navigation; the CTA band's
  invisible-text bug fixed.

### The template era

- The repository is a GitHub template: the homepage is a theme landing page
  — features linking to their live proof, install tabs, template/star CTAs —
  and "Making the homepage yours" in the docs is the paste-ready personal
  layout.
- Documentation grouped into a numbered path (Start → Build → Make it yours
  → Ship) and rendered in a full-width three-column workspace: grouped nav
  with search on the left, prose centre, page TOC right, under the full-bar
  header layout.
- Project galleries: a keyboard-navigable, snap-scrolling screenshot
  carousel with prev/next and a counter; demo shots shipped in
  assets/img/projects/.
- Video posts gain a chapters rail that seeks the YouTube player, with a
  Subscribe CTA; `vimeo:` and `video_file:` front matter render the Vimeo
  and native players.
- Share targets are config: the `sharing:` list controls the row and the
  sidebar icons (Bluesky, X, LinkedIn, WhatsApp, email, copy). The author
  card carries the author's social icons.
- Reading progress is a 1.5px light ring travelling left → bottom → right →
  top; heroes are shorter; breadcrumbs align with the article column and
  truncate to one line; page and element micro-animations throughout,
  all off under prefers-reduced-motion.
- Certifications compress into bordered credential cards; skills carry small
  level meters; the experience and education timelines use circular icon
  nodes, education with GPA; the resume summary lives in its hero band.

### The workspace era

- Documentation renders in a full-width three-column workspace under a
  viewport-wide full bar; reading progress measures the page's own scroll on
  every page.
- Every collection owns its sidebar: series posts get a vertical route rail,
  videos their chapters, books their buying card, projects their build log,
  everything a "more from" list — and nothing shows that is merely about the
  author.
- Snippet cards render as editor windows; code blocks wear Salesforce navy
  with an SLDS-family token palette; skills are full-width level bars with
  words; certifications compress to credential cards; experience and
  education timelines carry calendar/pin/GPA glyphs and circular icon nodes.
- Page hierarchy animation — a fast settle, then children rise top-to-bottom
  a beat apart — plus a PWA install card that asks once and then not again
  for three days.
- /uses (data-driven, affiliate-marked), /home (the personal-homepage live
  preview, linked from the landing hero), an animated trail illustration,
  llms.txt, Course/FAQPage structured data, six new icons, real screenshots
  in the README and showcase, and a "Built with Trailblazer" wall fed by
  _data/showcase.yml.
- Grid-line hero pattern fading at the corners; `breadcrumb: false` honoured
  per page and per collection.

### SEO

- Hand-written per-collection JSON-LD: `BlogPosting`, `CreativeWork`,
  `SoftwareSourceCode`, plus `WebSite` with a `SearchAction`, `Person` with
  `sameAs` and `hasCredential`, and `BreadcrumbList`.
- Canonical tags, Open Graph and Twitter cards from one `url:` value.
- `robots.txt` and a sitemap; paginated pages past the first are
  `noindex, follow`.

### Behaviour

- One deferred script. Everything in it is an enhancement — the site is fully
  readable without it.
- Command-palette search on `⌘K` / `/`, plus a linkable `/search/?q=` page.
- Table of contents built from the rendered article, with scroll-spy.
- Copy buttons and language labels on every code block.
- Reading-progress hairline, scroll reveal, and a mobile drawer built from the
  same navigation list as the desktop nav.

### Integrations

- GA4, Google Tag Manager, Plausible; giscus and Disqus; Mailchimp, Buttondown
  and ConvertKit; Formspree-style contact forms; OneSignal push.
- All off until configured, and all gated on `JEKYLL_ENV=production`.
- An optional service worker and web app manifest, off by default.

### Tooling

- A GitHub Actions workflow with a post-build smoke test that fails on missing
  pages or unrendered Liquid.
- All artwork committed ready-made: SVG covers and icons, PNG app icons, and
  a folder of placeholder PNGs in `assets/img/placeholders/` to reach for
  before real images exist.
- Full documentation in `docs/`.
