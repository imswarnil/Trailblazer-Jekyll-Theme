---
layout: docs
title: Deploying
permalink: /docs/deploying/
description: GitHub Pages end to end, custom domain included.
---

End to end, from an empty repository to a site on your own domain.

Two routes. **Actions** is the one to pick unless you have a reason not to.

| | GitHub Actions | Classic Pages |
| --- | --- | --- |
| Jekyll version | whatever you specify | 3.9, fixed by GitHub |
| Plugins | any gem | GitHub's allowlist only |
| Setup | commit one workflow file | tick a box |
| Build log | full | almost none |

This theme is written to work under **both** — its plugin list is deliberately
limited to `jekyll-feed`, `jekyll-sitemap` and `jekyll-paginate`, all of which
are allowlisted. That is why pagination uses `jekyll-paginate` rather than the
more capable `jekyll-paginate-v2`.

---

## Route A · GitHub Actions

### 1. Push the repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### 2. Switch Pages to Actions

**Settings → Pages → Build and deployment → Source → GitHub Actions.**

This is the step people miss. If Source is left on "Deploy from a branch", the
workflow will run, go green, and deploy nothing.

### 3. The workflow

Already in the repository at `.github/workflows/pages.yml`. It builds with
`JEKYLL_ENV=production` — which is what switches analytics on — and deploys
`_site/`.

Push to `main` and watch it under the **Actions** tab. First run takes about a
minute; later runs are faster because the gems are cached.

### 4. Check the build

If it fails, the log tells you where. The three common causes:

- **`Liquid Exception ... in _layouts/…`** — a typo in front matter. YAML is
  whitespace-sensitive and unforgiving about tabs.
- **`Could not find gem`** — something in your `Gemfile` is not in the lockfile.
  Run `bundle install` locally and commit `Gemfile.lock`, or delete the lockfile
  so CI resolves fresh (this repository does the latter).
- **`Conflict: The following destination is shared by multiple files`** — two
  pages claim the same `permalink`.

---

## Route B · Classic Pages, no workflow

**Settings → Pages → Source → Deploy from a branch → `main` / `(root)`.**

That is the whole setup. GitHub runs Jekyll 3.9 with the `github-pages` gem.

Your `Gemfile` must match what GitHub runs, or local and live will disagree:

```ruby
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
gem "webrick", "~> 1.8"
```

Constraints to know about:

- Only allowlisted plugins run. Adding one to `plugins:` that is not on the
  list is silently ignored — the site builds, the feature is simply missing.
- `JEKYLL_ENV` is always `production`, so analytics are live from the first
  deploy.
- Sass is compiled by an older converter. This theme's stylesheet is written
  to compile under it, which is why it uses `@import` rather than `@use`.

---

## A custom domain

### 1. `CNAME`

A file called `CNAME` in the repository root, one line, no protocol, no slash:

```
trailblazer.imswarnil.com
```

It is already in this repository — change it to yours.

### 2. DNS

**Subdomain** (`www.example.com`, `blog.example.com`) — one CNAME record:

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `www` | `YOUR-USERNAME.github.io` |

**Apex domain** (`example.com`) — four A records:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

### 3. Match `_config.yml` to it

```yaml
url: "https://trailblazer.imswarnil.com"
baseurl: ""
```

No trailing slash on `url`. Every absolute URL the theme emits — the canonical
tag, Open Graph images, the sitemap, JSON-LD — is built from this value, so
getting it wrong means every one of them points somewhere that does not exist.

### 4. HTTPS

**Settings → Pages → Enforce HTTPS.** The certificate takes a few minutes after
DNS propagates. If the checkbox is greyed out, DNS has not resolved yet — wait
and reload the settings page.

---

## Keeping one domain in the index

A GitHub Pages site with a custom domain is reachable at two hostnames:
`yourname.github.io/repo` and your domain. Left alone, a search engine can
index both and split the ranking between them.

Three things in this theme already handle it:

1. **`CNAME`** makes GitHub issue a 301 from the `github.io` URL to your
   domain. This is the main mechanism, and on its own it is usually enough.
2. **A canonical tag on every page**, built from `url:` in `_config.yml`. Even
   if a crawler reaches a page by another route, the page names its own real
   address.
3. **`robots.txt`** points at one sitemap, at that same domain.

So the requirement is just: set `url:` to the domain you want indexed, and
leave `CNAME` in place. Do not publish the same build under a second domain
without changing `url:` — that is the one configuration that defeats all three.

To confirm after deploying:

```bash
curl -sI https://YOUR-USERNAME.github.io/YOUR-REPO/ | grep -i location
curl -s https://your-domain.com/ | grep -i 'rel="canonical"'
curl -s https://your-domain.com/robots.txt
```

---

## Project sites and `baseurl`

If the site lives at `username.github.io/my-repo/` rather than at its own
domain, set both:

```yaml
url: "https://username.github.io"
baseurl: "/my-repo"
```

and serve locally the same way, or every internal link will 404 in one place
and work in the other:

```bash
bundle exec jekyll serve --baseurl "/my-repo"
```

Every link in this theme goes through `relative_url` or `absolute_url`, so it
handles `baseurl` correctly — but content you write yourself has to as well:

```liquid
{% raw %}<!-- wrong: breaks under baseurl -->
<a href="/about/">About</a>

<!-- right -->
<a href="{{ '/about/' | relative_url }}">About</a>{% endraw %}
```

---

## After the first deploy

- **Submit the sitemap.** Google Search Console → Sitemaps →
  `https://your-domain.com/sitemap.xml`.
- **Verify the domain.** Paste the token into `seo.google_site_verification` in
  `_config.yml` rather than uploading Google's HTML file — the theme renders
  the meta tag and skips it entirely when the value is empty.
- **Check the share card.** Paste a post URL into any link-preview debugger and
  confirm the image and title are what you expect.
- **Turn on analytics** — [integrations.md](/docs/integrations/).

---

Next: **[Configuring](/docs/configuring/)**.
