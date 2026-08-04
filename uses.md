---
title: What I use
permalink: /uses/
description: The desk, the software and the daily Salesforce kit — with honest one-line reasons.
hero_style: minimal
hero_eyebrow: Uses
hero_lead: >-
  The gear and software behind the work, grouped by how often it earns its
  place. Data-driven from one YAML file, like everything else here.
width: prose
---
{%- comment -%}
  Rendered entirely from _data/uses.yml — categories, items, icons and
  affiliate flags. A theme user edits one file and this page is theirs.
{%- endcomment -%}

{% include components/callout.html type="note" title="The honest line"
   text="Links marked ✱ are affiliate links — if you buy through one, I get a small cut at no cost to you. Nothing here is sponsored, and nothing is listed that I do not actually use." %}

{% for group in site.data.uses %}
<section class="tb-u-mt-8" aria-label="{{ group.category }}">
  <h2 class="tb-skills__group-name" style="font-size:var(--tb-text-lg)">
    {%- if group.icon %}{% include icon.html name=group.icon class="tb-icon--md" %}{% endif -%}
    {{ group.category }}
  </h2>
  <ul class="tb-rule-list">
    {%- for item in group.items %}
    <li>
      <span class="tb-rule-list__main">
        <a class="tb-rule-list__title" href="{{ item.url }}" rel="noopener{% if item.affiliate %} sponsored{% endif %}" target="_blank">
          {{ item.name }}{% if item.affiliate %} <span title="Affiliate link">✱</span>{% endif %}
          <span class="tb-sr-only">(opens in a new tab)</span>
        </a>
        <span class="tb-rule-list__meta" style="text-transform:none;letter-spacing:0">{{ item.blurb }}</span>
      </span>
      {%- include icon.html name="external" class="tb-u-fg-faint" %}
    </li>
    {%- endfor %}
  </ul>
</section>
{% endfor %}
