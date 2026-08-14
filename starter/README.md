# Your site, on Trailblazer

This folder is a complete, minimal site that runs the
[Trailblazer](https://github.com/imswarnil/trailblazer-jekyll-theme) theme as
a gem. Copy it out, make it a repository, and it is yours:

```bash
cp -r starter ~/my-site
cd ~/my-site
git init
bundle install
bundle exec jekyll serve
```

Open <http://localhost:4000>.

## The fifteen-minute setup

1. **`_config.yml`** — search for `example` and `Your Name`, replace as you
   go. Title, url, author, navigation, socials. Restart the server after
   editing it; live reload does not pick up config changes.
2. **`_data/resume.yml`** — the entire `/resume/` page.
3. **`_data/certifications.yml`** — the seal wall.
4. **`_posts/2026-01-01-hello-world.md`** — replace with your first post.
5. Push to GitHub and set **Settings → Pages → Source → GitHub Actions**.
   The workflow in `.github/workflows/pages.yml` does the rest.

## What is in here

```
_config.yml        every key the theme reads, with placeholders
_data/             resume.yml, certifications.yml
_posts/            one disposable first post
blog/index.html    the paginated blog index (must stay index.html)
index.md           the homepage
about.md           resume.md · archive.md · 404.html · search.md
projects.md …      an index page per collection — empty ones show an
                   honest empty state until you add content
.github/workflows/ deploy to GitHub Pages
```

Layouts, includes, styles and artwork all come from the gem. To override any
file, copy it out of the gem into the same path here — your copy wins:

```bash
bundle show trailblazer-jekyll-theme
```

For styling changes, create `_sass/trailblazer-overrides.scss` — it is
imported last and survives theme updates.

## Documentation

Everything, end to end: <https://trailblazer.imswarnil.com/docs/>
