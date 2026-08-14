# Releasing Trailblazer

The owner's manual: how work flows from an edit to a versioned, sellable
release, and where it goes to be sold. Nothing here is needed to *use* the
theme — buyers read `docs/`; this file is for whoever ships it.

## The map

```
edit code ──► add a line under [Unreleased] ──► commit ──► push to main
                                                              │
                       ┌──────────────────┬───────────────────┼─ on every push ─┐
                       ▼                  ▼                   ▼                 ▼
                      CI              Package            Deploy Pages       (repeat…)
               build · scss ·     sale zip rebuilt       demo site live
               gem · starter      as an artifact
                                                              │
   ready to ship?   bin/release X.Y.Z   ──►   git push && git push --tags
                                                              │
                                                       Release workflow
                                                              │
                                        GitHub release: notes from CHANGELOG,
                                        gem + sale zip attached, gem pushed
                                        to RubyGems (when the secret is set)
```

Three files carry the version and they never disagree, because only
`bin/release` writes them: `trailblazer-jekyll-theme.gemspec` (the
authority — the release workflow refuses a tag that contradicts it),
`package.json`, and the newest heading in `CHANGELOG.md`.

## Day to day

Work lands on `main` through commits or PRs. Two habits make releasing
free later:

1. **Every user-visible change gets a line under `## [Unreleased]` in
   `CHANGELOG.md`, in the same commit.** That section *is* the next
   release's notes — the release workflow lifts it verbatim, so if it is
   empty at release time the release page will be too. Internal-only
   changes (CI tweaks, typo fixes in comments) can skip it.
2. **Never edit a released section.** History is append-only; a correction
   is a new line under Unreleased.

Every push to main runs three workflows:

- **CI** — the demo builds in production mode with its key pages present;
  the SCSS framework compiles standalone; the gem packages with no demo
  content inside; and the **starter builds against the packaged theme** —
  a buyer's first `bundle install`, rehearsed in advance.
- **Package** — rebuilds the sale zip (demo + theme + starter + offline
  HTML/PDF documentation) and uploads it as a 30-day artifact under
  Actions → Package. The latest sellable state is always one download
  away, without cutting a release.
- **Deploy to GitHub Pages** — the live demo redeploys itself.

## Choosing the next version

Semantic versioning, read from a *buyer's* point of view — "what happens
to a site that updates?":

| Bump | When | Examples from this repo |
| --- | --- | --- |
| **Patch** `1.1.0 → 1.1.1` | A site updating changes nothing and fixes something | the blank-pages print bug; a Liquid guard; a docs correction |
| **Minor** `1.1.0 → 1.2.0` | New capability, existing sites unaffected | docs pagination; a new card style; a new `_config.yml` key with a safe default |
| **Major** `1.1.0 → 2.0.0` | An updating site must change something | renaming a token; changing a layout's front-matter contract; dropping a plugin |

If you are debating between two, pick the bigger one — an undersold major
breaks buyers' sites; an oversold minor costs nothing. A major bump also
gets a migration note at the **top** of its CHANGELOG section, in bold.

## Cutting a release

Preflight, one minute:

```bash
git status                    # clean tree, on main
head -40 CHANGELOG.md         # [Unreleased] says what you think it says
gh run list --limit 3         # CI green on the commit you are releasing
```

Then:

```bash
bin/release 1.2.0
git push && git push --tags
```

`bin/release` is deliberately dumb and inspectable. It refuses to run on a
dirty tree, off main, on an existing tag, or with no `[Unreleased]`
section; then it

1. writes the version into the gemspec and `package.json`;
2. rolls the changelog — `[Unreleased]` becomes `[1.2.0] — <today>` and a
   fresh empty `[Unreleased]` opens above it;
3. commits `Release 1.2.0` and tags `v1.2.0` — **without pushing**, so you
   can `git show` the commit first. `git tag -d v1.2.0 && git reset
   --hard HEAD^` un-does it entirely if you change your mind.

The tag push triggers `.github/workflows/release.yml`, which:

1. refuses to run if the tag and the gemspec version disagree;
2. rebuilds and re-verifies the demo site;
3. builds the gem and the sale zip (with the offline documentation built
   inside it — the runner has Chrome, so the PDF is always present);
4. creates the GitHub release, body lifted verbatim from that version's
   CHANGELOG section, gem and zip attached;
5. pushes the gem to RubyGems — **if** the `RUBYGEMS_API_KEY` secret is
   set; otherwise it warns and skips, and everything else still completes.

### After it goes green

- The release page reads correctly and both assets are attached.
- <https://rubygems.org/gems/trailblazer-jekyll-theme> shows the new
  version (once the secret exists).
- Click through the freshly deployed demo once.
- Upload the new zip wherever it is sold (Gumroad / Envato — below), and
  paste the same CHANGELOG section as the update notes there.

## When something goes wrong

**The Release workflow failed on "tag must match the gemspec."** The tag
was made by hand. Delete it (`git push origin :refs/tags/vX.Y.Z && git tag
-d vX.Y.Z`) and use `bin/release`, which cannot produce that state.

**The release is out but wrong, and nobody has it yet.** A GitHub-only
release (gem never reached RubyGems, minutes old) may be re-cut: delete
the release and the tag, fix, `bin/release` the *same* version again.

**The release is out, published, and wrong.** Never move or delete a
published tag — `remote_theme: …@v1.2.0` pins deploy against it, and a
moved tag silently changes buyers' live sites. Fix forward: commit the
fix, `bin/release 1.2.1`. On RubyGems, `gem yank` is for
never-should-have-existed versions (leaked secret, broken install), not
for bugs — a yanked version breaks every `Gemfile.lock` that references
it.

**A severe bug, but main has unreleased work you don't want to ship.**
Branch from the tag, cherry-pick the fix, release from there:

```bash
git checkout -b hotfix-1.2.1 v1.2.0
git cherry-pick <fix-sha>
# bin/release requires main, so hotfixes are the one manual case:
#   bump gemspec + package.json + CHANGELOG by hand, commit, tag v1.2.1,
#   push the tag — the Release workflow does the rest.
git checkout main && git merge hotfix-1.2.1
```

**Actions is down.** The manual equivalent of the whole pipeline:

```bash
JEKYLL_ENV=production bundle exec jekyll build
gem build trailblazer-jekyll-theme.gemspec
./scripts/package.sh 1.2.0
gem push trailblazer-jekyll-theme-1.2.0.gem
gh release create v1.2.0 --title "Trailblazer v1.2.0" \
  --notes-file <(awk -v ver=1.2.0 '$0 ~ "^## \\[" ver "\\]" {on=1; next} on && /^## \[/ {exit} on' CHANGELOG.md) \
  trailblazer-jekyll-theme-1.2.0.gem dist/trailblazer-jekyll-theme-1.2.0.zip
```

## How updates reach buyers

Worth keeping in mind when deciding what a change costs:

- **Gem sites** get updates when *they* run `bundle update` — safe to
  release often.
- **Remote-theme sites pinned to a tag** never change until they bump the
  pin; sites tracking `main` (discouraged in the docs) take every push.
- **Forks** take nothing automatically; the CHANGELOG is their upgrade
  map, which is why every entry names the file or key it touched.

## One-time setup for the gem publish

1. Create a RubyGems account (MFA required for new publishers) and sign in
   once locally: `gem signin`.
2. Make an API key at <https://rubygems.org/profile/api_keys> with the
   *Push rubygem* scope.
3. Add it as `RUBYGEMS_API_KEY` under repo **Settings → Secrets and
   variables → Actions**.

Without the secret the workflow still releases on GitHub and just warns; you
can push manually with `gem push trailblazer-jekyll-theme-<v>.gem`.

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
