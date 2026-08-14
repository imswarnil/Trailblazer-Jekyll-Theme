# Releasing Trailblazer

The owner's checklist, from "the code is ready" to "people can buy it".
Nothing here is needed to *use* the theme — this is the selling side.

## The development cycle

Day to day, work lands on `main` through commits or PRs, and CI
(`.github/workflows/ci.yml`) guards the three promises on every push:

1. the demo site builds in production mode and its key pages exist;
2. the SCSS framework compiles standalone;
3. the gem packages cleanly — no demo content inside — and the **starter
   builds against the packaged theme**, which is a buyer's first
   `bundle install` rehearsed in advance.

Every user-visible change gets a line under `## [Unreleased]` in
`CHANGELOG.md` in the same commit. That section *is* the next release's
notes — the release workflow lifts it verbatim, so if it is empty at release
time, the release page will be too.

## Cutting a release

```bash
bin/release 1.1.0        # bumps gemspec + package.json, rolls the
                         # changelog, commits, tags v1.1.0
git push && git push --tags
```

The tag push triggers `.github/workflows/release.yml`, which:

1. refuses to run if the tag and gemspec version disagree;
2. rebuilds and re-verifies the site;
3. builds the gem and `dist/trailblazer-jekyll-theme-<v>.zip`;
4. creates the GitHub release with that version's CHANGELOG section as the
   body and both artifacts attached;
5. pushes the gem to RubyGems — **if** the `RUBYGEMS_API_KEY` secret is set.

### One-time setup for the gem publish

1. Create a RubyGems account (MFA required for new publishers) and sign in
   once locally: `gem signin`.
2. Make an API key at <https://rubygems.org/profile/api_keys> with the
   *Push rubygem* scope.
3. Add it as `RUBYGEMS_API_KEY` under repo **Settings → Secrets and
   variables → Actions**.

Without the secret the workflow still releases on GitHub and just warns; you
can push manually with `gem push trailblazer-jekyll-theme-<v>.gem`.

Tags matter beyond ceremony: `remote_theme: imswarnil/trailblazer-jekyll-theme@v1.1.0`
is how remote-theme users pin, and a moved tag changes their live site.

## Selling on Envato (ThemeForest)

ThemeForest lists Jekyll under **Site Templates → Static Site Generators →
Jekyll**. What the submission needs:

- **Author account** at <https://themeforest.net> → Start Selling. Because
  the theme is public under MIT, sell as a **non-exclusive** author —
  exclusivity contractually forbids distributing the same item elsewhere,
  including your own GitHub. Non-exclusive pays ~45% of list price;
  price accordingly (Jekyll templates typically list $14–29).
- **Main File(s)** — the zip from `scripts/package.sh <version>` (also
  attached to every GitHub release). It contains the full demo site, the
  theme, `starter/` and `docs/` — reviewers explicitly check that
  documentation ships inside the item.
- **Thumbnail** — 80×80 PNG. Export from `assets/img/logo.svg`.
- **Theme preview image** — 590×300 JPG/PNG, shown inline in search. Export
  from `.github/media/banner.svg`.
- **Preview image set** — the screenshots in `assets/img/screenshots/`
  (JPG, 590px+ wide; the first is the item page hero).
- **Item description** — HTML allowed. Reuse the README's "Why this one"
  section plus the live demo link; Envato reviewers click the demo first.
- **Review** takes roughly 2–10 days for site templates. Common rejection
  reasons to pre-empt: missing documentation (ours ships in the zip),
  console errors on the demo, and placeholder text left visible.

There is no SVG→PNG tool on this machine — export the thumbnail and preview
by opening the SVGs in a browser and screenshotting, or `brew install
librsvg` and `rsvg-convert`.

## The other places

1. **The demo is the ad**, everywhere. The live demo must be the theme at
   its best — fast, populated, every layout reachable.
2. **Free listings first:** jamstackthemes.dev, jekyllthemes.io,
   jekyll-themes.com, jekyllthemes.org — each wants the repo URL, demo URL
   and a screenshot. jekyllthemes.io also lists *paid* themes and takes a
   commission-free listing for external checkout links.
3. **Gumroad / Lemon Squeezy** for direct sales: upload the same
   `dist/*.zip`, price it, and link it from the README and demo footer.
   ~10% fees, no exclusivity, instant updates — for an MIT theme this
   usually out-earns marketplaces because the repo itself funnels buyers.
4. **Announce where the niche lives:** r/salesforce, Trailblazer community
   groups, dev.to #salesforce — as "I built a theme for us", not an ad.

## The free-core model

MIT on GitHub builds the audience and the backlinks; the paid product is
convenience — the packaged zip, the starter, setup support, or a future PRO
variant. Trailblazer is structured for exactly this split: gem and repo
free, `starter/` + docs as the polished on-ramp, marketplace zips as the
paid artifact.

## After the release

- Check <https://rubygems.org/gems/trailblazer-jekyll-theme> renders the
  README and links correctly.
- The demo site deploys itself from `main` via the Pages workflow; click
  through it once.
- Watch the repo issues; a support question asked twice is a docs bug —
  fix it in `docs/`.
- Breaking change? Major version bump, migration note at the top of the
  CHANGELOG, and say so in bold in the GitHub release.
