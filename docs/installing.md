---
layout: docs
header_layout: full
title: Installing
permalink: /docs/installing/
description: Fork, gem or remote theme — and which to pick.
---

Three ways to use Trailblazer. Pick by how much you expect to change.

| | Fork | Gem | Remote theme |
| --- | --- | --- | --- |
| Change layouts freely | ✅ | with overrides | with overrides |
| Update to a new version | manual merge | `bundle update` | change one line |
| Works on classic GitHub Pages | ✅ | ❌ | ✅ |
| Best for | most people | multiple sites | trying it out |

**If you are not sure, fork.** A personal site gets edited constantly, and the
version-tracking a gem buys you is worth less than being able to open a layout
and change it.

**Going the gem route?** Do not assemble the site by hand — the repository
ships [`starter/`](https://github.com/imswarnil/trailblazer-jekyll-theme/tree/main/starter),
a complete minimal site with every config key present, one disposable post,
an index page per collection and the deploy workflow already in place:

```bash
cp -r starter my-site && cd my-site
git init && bundle install
bundle exec jekyll serve
```

Its own README walks the fifteen-minute setup.

---

## 1. Fork (recommended)

```bash
git clone https://github.com/imswarnil/trailblazer-jekyll-theme.git my-site
cd my-site
rm -rf .git && git init
bundle install
bundle exec jekyll serve
```

Open <http://localhost:4000>. Everything is yours to edit.

### Then delete the demo content

The repository ships a full demo site so you can see the theme working. None of
it is load-bearing:

```bash
rm _posts/*.md _projects/*.md _snippets/*.md _talks/*.md
```

The collection index pages render an honest empty state, so the site still
builds and still looks deliberate with nothing in it.

Then edit, in this order:

1. **`_config.yml`** — title, url, author, navigation, social. It is heavily
   commented; read it top to bottom once and you will know the whole theme.
2. **`_data/resume.yml`** — the entire `/resume/` page.
3. **`_data/certifications.yml`** — the seal wall.
4. **`assets/img/avatar.svg`** — replace with a real photograph, and point
   `author.avatar` at it.
5. **`CNAME`** — your domain, or delete the file if you are not using one.

---

## 2. Gem

For running the theme on more than one site, where you want
`bundle update` to carry improvements across.

`Gemfile`:

```ruby
source "https://rubygems.org"

gem "trailblazer-jekyll-theme", "~> 1.0"

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-paginate"
end
```

`_config.yml`:

```yaml
theme: trailblazer-jekyll-theme
```

A theme gem ships layouts, includes, sass and assets, but **not**
configuration — the theme's own `_config.yml` is not read. The collections
block in particular has to be in your site's config or nothing has a hero
style. The easiest way to get all of it right is to start from
[`starter/_config.yml`](https://github.com/imswarnil/trailblazer-jekyll-theme/blob/main/starter/_config.yml),
which carries every key the theme reads. The same goes for `_data/resume.yml`
and `_data/certifications.yml` — data files do not come from a gem either;
the starter ships stubs of both.

```bash
bundle install
bundle exec jekyll serve
```

### Overriding a file from the gem

Jekyll looks in your site before it looks in the theme. Copy the file out of
the gem, keep the same path, and your copy wins:

```bash
# where the gem lives
bundle show trailblazer-jekyll-theme

# take a copy of the footer to edit
cp $(bundle show trailblazer-jekyll-theme)/_includes/footer.html _includes/
```

For styling, do **not** copy the whole framework. Create
`_sass/trailblazer-overrides.scss` in your site — it is imported last and it
ships empty precisely so you have somewhere to put changes that survives an
update. See [customising.md](/docs/customising/).

---

## 3. Remote theme

The lightest option, and the only one that works on classic GitHub Pages
without a workflow.

`_config.yml`:

```yaml
remote_theme: imswarnil/trailblazer-jekyll-theme

plugins:
  - jekyll-remote-theme
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-paginate
```

`Gemfile`:

```ruby
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
```

Pin to a release rather than tracking `main`, so a theme update cannot change
your live site without you asking:

```yaml
remote_theme: imswarnil/trailblazer-jekyll-theme@v1.0.0
```

---

## Local development

```bash
bundle exec jekyll serve            # http://localhost:4000
bundle exec jekyll serve --drafts   # include _drafts/
bundle exec jekyll build            # one-off build into _site/
JEKYLL_ENV=production bundle exec jekyll build   # what CI runs
```

If npm is your muscle memory, the repository's `package.json` wraps the same
toolchain — `npm run dev`, `npm run build`, `npm run check:css`. Node is
never required; the scripts just call Ruby.

Two things worth knowing:

- **`_config.yml` is read once, at boot.** Live reload will not pick up a change
  to it. Restart the server.
- **Analytics, comments and push are gated on production.** They do not load
  under `jekyll serve`, on purpose — otherwise every local session pollutes
  real reporting. To check them, build with `JEKYLL_ENV=production`.

## Ruby troubles

**macOS system Ruby.** `/usr/bin/ruby` is old enough that several gems will not
build against it. Install a current Ruby with `rbenv`, `chruby` or Homebrew and
make sure `which ruby` does not say `/usr/bin/ruby`.

**`bundle install` fails on `ffi` or `sass-embedded`.** Usually a
Ruby/architecture mismatch after switching versions. Clear and retry:

```bash
rm -rf vendor/bundle Gemfile.lock
bundle install
```

**Permissions errors.** Do not use `sudo`. Install gems into the project:

```bash
bundle config set --local path vendor/bundle
bundle install
```

