---
title: Style guide
permalink: /style-guide/
description: Every component in the Trailblazer theme, with the markup that produces it.
hero_style: minimal
hero_eyebrow: Reference
hero_lead: Everything the theme can render, on one page, with the source beside it.
sidebar: true
---
{%- comment -%}
  The living reference. Keep this page in the theme rather than only in the
  docs: a component that breaks shows up here on the next build, which is a
  cheaper regression test than remembering to check.
{%- endcomment -%}

## Typography

# Heading level one
## Heading level two
### Heading level three
#### Heading level four

Body copy sits at a comfortable measure — around 68 characters — because a line
longer than that makes the eye lose its place on the return sweep. This
paragraph contains **bold text**, *italic text*, `inline code`, a
[link](/blog/), and a footnote-style aside.

> A blockquote is set in the display face. It is for something somebody said,
> not for something you want to emphasise — emphasis has its own markup.
> <cite>The design system, on itself</cite>

---

## Buttons

{% include components/button.html label="Primary" url="#" style="primary" %}
{% include components/button.html label="Secondary" url="#" style="secondary" %}
{% include components/button.html label="Ghost" url="#" style="ghost" %}
{% include components/button.html label="Soft" url="#" style="soft" %}
{% include components/button.html label="With an icon" url="#" style="ghost" icon="download" %}

```liquid
{% raw %}{% include components/button.html label="Primary" url="/contact/" style="primary" %}{% endraw %}
```

## Badges and chips

<p class="tb-cluster-sm">
  <span class="tb-badge">Default</span>
  <span class="tb-badge tb-badge--accent">Accent</span>
  <span class="tb-badge tb-badge--success">Shipped</span>
  <span class="tb-badge tb-badge--warning">Deprecated</span>
  <span class="tb-badge tb-badge--danger">Breaking</span>
  <span class="tb-badge tb-badge--live">Live</span>
</p>

## Callouts

{% include components/callout.html type="note" title="Note" text="The default. For an aside that is genuinely optional reading." %}
{% include components/callout.html type="info" title="Info" text="For context the reader needs but did not ask for." %}
{% include components/callout.html type="success" title="Success" text="For the happy path, or a confirmation that something worked." %}
{% include components/callout.html type="warning" title="Warning" text="For a foot-gun. Ignoring this costs the reader time." %}
{% include components/callout.html type="danger" title="Danger" text="For data loss, or anything that cannot be undone." %}

```liquid
{% raw %}{% include components/callout.html type="warning" title="Governor limits apply"
   text="This runs inside a trigger." %}{% endraw %}
```

## Code

Fenced code blocks are highlighted by Rouge and get a language label and a copy
button added by the theme script:

```apex
public with sharing class AccountService {
    // Bulkified by default — a query inside a loop is the most expensive
    // mistake you can make in Apex, and the easiest one to make.
    public static void touchAll(List<Account> accounts) {
        Map<Id, Account> byId = new Map<Id, Account>(accounts);
        List<Contact> children = [
            SELECT Id, AccountId FROM Contact WHERE AccountId IN :byId.keySet()
        ];

        for (Contact c : children) {
            c.Description = 'Touched ' + System.now().format();
        }

        update children;
    }
}
```

```javascript
import { LightningElement, api, wire } from 'lwc';
import findAccounts from '@salesforce/apex/AccountService.find';

export default class AccountList extends LightningElement {
  @api recordId;
  @wire(findAccounts, { term: '$recordId' }) accounts;
}
```

## Steps

{% include components/steps.html items="Create a scratch org|Takes about ninety seconds.,Push the source|`sfdx force:source:push`,Assign the permission set|Otherwise nothing is visible." %}

## Tabs

{% include components/tabs.html id="install" items="Bundler|Add the gem to your Gemfile and run `bundle install`.,Remote theme|Set `remote_theme:` in `_config.yml` — no gem required.,Fork|Clone the repository and edit it directly. Most flexible%2C hardest to update." %}

## Accordion

{% include components/accordion.html items="Does the theme work on GitHub Pages?|Yes. Every plugin it uses is on the GitHub Pages allowlist.,Do I need Node?|No. There is no JavaScript build step — the one script file ships as-is.,Can I change the colour?|One line in _config.yml regenerates the entire ramp." %}

## Stats

{% include components/stats.html items="99.98%|Uptime,1.3s|Page load,40+|Orgs shipped,8|Certifications" %}

## Table

| Front matter | Type | What it does |
| --- | --- | --- |
| `hero_style` | string | `statement`, `split`, `band` or `minimal` |
| `sidebar` | boolean | Shows the right rail on an article |
| `comments` | boolean | Renders the comment thread, if one is configured |
| `image` | path | Cover image, and the Open Graph share image |

## Breadcrumb

{% include breadcrumb.html %}

## Series stepper

<nav class="tb-series" aria-label="Series demo">
  <p class="tb-series__head">Org hygiene · a 3-part series</p>
  <ol class="tb-series__list">
    <li data-done><a href="#">The audit</a></li>
    <li><span aria-current="page">The deletion</span></li>
    <li><a href="#">The reports</a></li>
  </ol>
</nav>

## Audio player

<div class="tb-audio">
  <span class="tb-audio__icon" aria-hidden="true">{% include icon.html name="mic" %}</span>
  <div class="tb-audio__body">
    <span class="tb-audio__label">Listen · demo</span>
    <audio controls preload="metadata" src="{{ '/assets/audio/talk-sample.wav' | relative_url }}"></audio>
  </div>
</div>

## Lesson list

<ol class="tb-lessons">
  <li><a class="tb-lessons__row" href="#"><span class="tb-lessons__body"><span class="tb-lessons__title">{% include icon.html name="play" %}Why this Flow should be code</span><span class="tb-lessons__summary">The three signs an automation has outgrown the canvas.</span></span><span class="tb-lessons__dur">14 min</span></a></li>
  <li><a class="tb-lessons__row" href="#" aria-current="page"><span class="tb-lessons__body"><span class="tb-lessons__title">Reading Apex before writing it</span></span><span class="tb-lessons__dur">18 min</span></a></li>
  <li><a class="tb-lessons__row" href="#"><span class="tb-lessons__body"><span class="tb-lessons__title">Your first trigger</span></span><span class="tb-lessons__dur">21 min</span></a></li>
</ol>

## Outcomes & prerequisites

<ul class="tb-outcomes">
  <li>Read a production trigger without slowing down</li>
  <li>Know the three collection types and when each earns its place</li>
</ul>

<ul class="tb-prereqs tb-u-mt-4">
  <li>Comfortable building record-triggered Flows</li>
  <li>A free Developer Edition org</li>
</ul>

## Testimonial

<div class="tb-testimonials">
  <figure class="tb-testimonial">
    <blockquote>The collections lesson alone was worth it.</blockquote>
    <figcaption>
      <span class="tb-testimonial__name">Priya N.</span>
      <span class="tb-testimonial__role">Salesforce Admin, 4 yrs</span>
    </figcaption>
  </figure>
</div>

## Repo card

<div class="tb-grid-auto">
  <article class="tb-repo">
    <header class="tb-repo__head">
      {% include icon.html name="github" %}
      <a class="tb-repo__name" href="#">org-loader</a>
    </header>
    <p class="tb-repo__desc">A data-migration framework used on six projects.</p>
    <div class="tb-repo__meta">
      <span class="tb-repo__lang" style="--tb-lang:#1797c0">Apex</span>
      <span>Tooling</span>
    </div>
    <footer class="tb-repo__actions">
      <a class="tb-btn tb-btn--primary tb-btn--sm" href="#">{% include icon.html name="external" %}Live preview</a>
      <a class="tb-btn tb-btn--ghost tb-btn--sm" href="#">{% include icon.html name="github" %}Source</a>
    </footer>
  </article>
</div>

## Pagination

<nav class="tb-pagination" aria-label="Pagination demo">
  <a class="tb-pagination__link" href="#">{% include icon.html name="arrow-left" %}</a>
  <a class="tb-pagination__link" href="#">1</a>
  <a class="tb-pagination__link" aria-current="page" href="#">2</a>
  <a class="tb-pagination__link" href="#">3</a>
  <span class="tb-pagination__gap">…</span>
  <a class="tb-pagination__link" href="#">9</a>
  <a class="tb-pagination__link" href="#">{% include icon.html name="arrow-right" %}</a>
</nav>

## Certifications

{% include cert-wall.html limit=4 %}

## Timeline

<ol class="tb-timeline">
  <li class="tb-timeline__item" data-done>
    <span class="tb-timeline__node" aria-hidden="true"></span>
    <div class="tb-timeline__body">
      <span class="tb-timeline__time">2018</span>
      <span class="tb-timeline__title">Passed Platform Developer I</span>
      <p class="tb-timeline__note">On the second attempt, which nobody puts on LinkedIn.</p>
    </div>
  </li>
  <li class="tb-timeline__item" aria-current="true">
    <span class="tb-timeline__node" aria-hidden="true"></span>
    <div class="tb-timeline__body">
      <span class="tb-timeline__time">Now</span>
      <span class="tb-timeline__title">Working on integration architecture</span>
    </div>
  </li>
</ol>

## Forms

<div class="tb-stack" style="max-width: 28rem">
  <div class="tb-field">
    <label class="tb-label" for="sg-email">Email</label>
    <input class="tb-input" type="email" id="sg-email" placeholder="you@example.com">
    <span class="tb-hint">We only use this to send the thing you asked for.</span>
  </div>
  <div class="tb-field">
    <label class="tb-label" for="sg-bad">A field with an error</label>
    <input class="tb-input" type="text" id="sg-bad" aria-invalid="true" value="not-an-email">
    <span class="tb-error-text">That is not an email address — it needs an @ in it.</span>
  </div>
  <label class="tb-check"><input type="checkbox" checked> Send me the newsletter</label>
</div>
