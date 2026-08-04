---
title: Contact
permalink: /contact/
description: How to get in touch about contract work, speaking, or a question.
hero_style: minimal
hero_eyebrow: Say hello
hero_lead: Contract work, a talk, or a question about something I wrote — all welcome.
width: prose
---

The fastest route is email: **[{{ site.author.email }}](mailto:{{ site.author.email }})**.
I read everything and reply to most things within a couple of days.

{% if site.integrations.contact_form_action and site.integrations.contact_form_action != "" %}

## Or use the form

<form class="tb-stack" action="{{ site.integrations.contact_form_action }}" method="post">
  <div class="tb-form-row">
    <div class="tb-field">
      <label class="tb-label" for="c-name">Your name</label>
      <input class="tb-input" type="text" id="c-name" name="name" required autocomplete="name">
    </div>
    <div class="tb-field">
      <label class="tb-label" for="c-email">Email</label>
      <input class="tb-input" type="email" id="c-email" name="email" required autocomplete="email">
    </div>
  </div>
  <div class="tb-field">
    <label class="tb-label" for="c-subject">Subject</label>
    <select class="tb-select" id="c-subject" name="subject">
      <option>Contract work</option>
      <option>Speaking</option>
      <option>A question about a post</option>
      <option>Something else</option>
    </select>
  </div>
  <div class="tb-field">
    <label class="tb-label" for="c-message">Message</label>
    <textarea class="tb-textarea" id="c-message" name="message" required></textarea>
    <span class="tb-hint">Enough detail that I can give you a useful answer in one reply.</span>
  </div>
  <div>
    <button class="tb-btn tb-btn--primary" type="submit">Send</button>
  </div>
</form>

{% else %}

{% include components/callout.html type="note" title="The form is not switched on"
   text="Set `integrations.contact_form_action` in `_config.yml` to a Formspree, Basin or Netlify Forms endpoint and a styled contact form appears here. Until then this page points at email, which always works." %}

{% endif %}

## What to expect

{% include components/steps.html items="You send a message|Email or the form — both land in the same inbox.,I read it|Usually the same day., You get a real reply|Within two working days, even if the answer is no." %}
