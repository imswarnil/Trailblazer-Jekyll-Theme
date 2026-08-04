---
layout: docs
title: Integrations
permalink: /docs/integrations/
description: Analytics, comments, newsletter, ads and push.
---

Analytics, comments, newsletter, contact forms and web push.

Two rules apply to all of them:

1. **Nothing loads until you configure it.** An empty value means the script
   tag is not rendered at all — not rendered-with-an-empty-id.
2. **Analytics and push are gated on production.** They do not load under
   `jekyll serve` — otherwise every local session pollutes real reporting.
   Comments are the exception: a configured thread renders in local preview
   too, because "did I wire Disqus correctly" should not cost a deploy.

To test one locally: `JEKYLL_ENV=production bundle exec jekyll serve`.

---

## Analytics

Pick **one**. Two means two scripts counting the same visit, and neither number
will be right.

### Google Analytics 4

```yaml
integrations:
  google_analytics: "G-XXXXXXXXXX"
```

### Google Tag Manager

```yaml
integrations:
  google_tag_manager: "GTM-XXXXXXX"
```

Use *instead of* `google_analytics` — GTM loads GA itself. The theme renders
both the head script and the `<noscript>` iframe.

### Plausible

```yaml
integrations:
  plausible_domain: "example.com"
```

No cookies, no personal data, and no consent banner needed in most
jurisdictions. If you would rather not write a cookie policy, this is the one.

### Something else

`_includes/integrations/analytics.html` is short and readable. Add your snippet
inside the existing production guard.

---

## Comments

The theme renders the first provider that is fully configured, and renders
nothing at all if none is. Both load lazily — the embed only fetches once the
reader scrolls near it, so a comment widget never competes with the article for
bandwidth.

### giscus (recommended)

Threads are stored as GitHub Discussions, which for a developer audience means
the comments live somewhere you actually own.

1. Make the repository public and enable **Discussions**.
2. Install the [giscus app](https://github.com/apps/giscus).
3. Get your ids from [giscus.app](https://giscus.app).

```yaml
integrations:
  giscus:
    repo: "you/your-repo"
    repo_id: "R_kgDO..."
    category: "Comments"
    category_id: "DIC_kwDO..."
```

The embed follows the site's light/dark theme automatically.

### Disqus

```yaml
integrations:
  disqus_shortname: "your-shortname"
```

Heavier, and it sets its own cookies — which means it belongs in your privacy
policy. The theme's `/privacy/` page already accounts for it.

### Turning comments off

Per page:

```yaml
comments: false
```

For a whole collection, in the `defaults:` block of `_config.yml`.

---

## Newsletter

All three providers are plain HTML form posts — no vendor script, no tracking
pixel, and the form still works with JavaScript disabled.

```yaml
integrations:
  mailchimp_action: "https://example.us1.list-manage.com/subscribe/post?u=…&id=…"
  # or
  buttondown_user: "yourname"
  # or
  convertkit_form: "1234567"
```

For Mailchimp, the value is the `action` URL from its embedded-form snippet.
The theme adds Mailchimp's honeypot field automatically — hidden from humans
and from assistive tech, so a bot fills it in and the submission is dropped.

With none configured, the newsletter block renders a link to the RSS feed
instead of a dead form. A subscribe box that silently discards addresses is
worse than no box.

Where it appears: the footer (`footer.newsletter: true`) and the home page CTA
band.

---

## Contact form

```yaml
integrations:
  contact_form_action: "https://formspree.io/f/xxxxxxxx"
```

Works with Formspree, Basin, Netlify Forms or anything that accepts a POST.
`/contact/` renders a styled form when this is set, and falls back to an email
link when it is not — which is the version that always works.

---

## Web push

```yaml
integrations:
  onesignal_app_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

Before you turn this on: a push prompt on first visit is the single most
disliked pattern on the web, and browsers now penalise sites that fire it
unprompted.

The theme configures OneSignal with **auto-prompt off**. The reader is asked
only after pressing a control you place yourself:

```html
<button class="tb-btn tb-btn--soft" data-tb-push-subscribe>
  Notify me about new posts
</button>
```

That is the version people actually accept.

---

## Ads (AdSense)

```yaml
adsense:
  client: "ca-pub-XXXXXXXXXXXXXXXX"
  slots:
    sidebar: "1234567890"       # the widget in the article rail
    in_article: "0987654321"    # after the article body
```

Responsive units, always labelled "Advertisement", loaded only in production.
Outside production every placement renders a dashed placeholder, so you can
judge the layout with the ad's cost visible before any of Google's script
loads. Turn ads off for one page with `ads: false` in its front matter; turn
them off everywhere by emptying `client`.

Place extra units anywhere with the include:

```liquid
{% raw %}{% include ad.html slot=site.adsense.slots.in_article %}{% endraw %}
```

---

## Privacy

`/privacy/` is generated from your integration config — it lists exactly the
third parties that are switched on, and nothing else. It is a template, not
legal advice, and it will be wrong the moment you add something it does not
know about. Read it, edit it, and delete the warning box at the top.

If you are subject to GDPR or similar and you have enabled a cookie-setting
analytics provider, you need a consent mechanism the theme does not ship. The
straightforward way to avoid the whole question is Plausible plus
`theme_style.fonts.google: false`, which leaves the site with no third-party
requests at all.
