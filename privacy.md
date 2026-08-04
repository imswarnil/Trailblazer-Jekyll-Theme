---
title: Privacy
permalink: /privacy/
description: What this site collects, what it does not, and who else is involved.
hero_style: minimal
hero_eyebrow: Legal
hero_lead: Short, because there is not much to say.
width: prose
---

{% include components/callout.html type="warning" title="This is a template"
   text="It describes what the theme does by default. It is not legal advice, and it will be wrong the moment you switch on an integration it does not mention. Read it, edit it, and delete this box." %}

## What this site collects directly

Nothing. There is no account, no login, no form that stores anything on this
server, and no first-party cookie.

The one thing kept on your device is your light/dark preference, stored in
`localStorage` under `tb-scheme` so the site does not flash white at you on
every visit. It never leaves your browser and it is not read by anyone.

## Third parties

Only what is switched on in `_config.yml`. As configured today:

{% capture tb_analytics %}{{ site.integrations.google_analytics }}{{ site.integrations.google_tag_manager }}{% endcapture %}
{% if tb_analytics != "" %}
- **Google Analytics** records page views and rough location. It sets cookies.
{% endif %}
{% if site.integrations.plausible_domain and site.integrations.plausible_domain != "" %}
- **Plausible** records page views without cookies and without collecting
  personal data.
{% endif %}
{% if site.integrations.disqus_shortname and site.integrations.disqus_shortname != "" %}
- **Disqus** loads when you scroll to the comments, and sets its own cookies.
{% endif %}
{% if site.integrations.giscus.repo and site.integrations.giscus.repo != "" %}
- **giscus** loads when you scroll to the comments. Posting one requires a
  GitHub account and is governed by GitHub's privacy policy.
{% endif %}
{% capture tb_newsletter %}{{ site.integrations.mailchimp_action }}{{ site.integrations.buttondown_user }}{{ site.integrations.convertkit_form }}{% endcapture %}
{% if tb_newsletter != "" %}
- The **newsletter form** posts your email address to the mailing-list provider
  when you submit it, and not before.
{% endif %}
{% if site.theme_style.fonts.google %}
- **Google Fonts** serves the typefaces, which means Google sees the request.
  Set `theme_style.fonts.google: false` to use system fonts instead.
{% endif %}

Nothing else loads. In particular there are no advertising scripts, no tracking
pixels, and no third-party embeds unless a specific page includes one — a
video, for instance, which is loaded from YouTube's no-cookie domain and only
when you scroll to it.

## Your data

Since none is collected, there is none to request, correct or delete. If you
have emailed me, that email is in my inbox; ask and I will delete it.

## Changes

The date at the bottom of this file in
[the repository]({{ site.theme_repo | default: 'https://github.com/example' }})
is the honest changelog.
