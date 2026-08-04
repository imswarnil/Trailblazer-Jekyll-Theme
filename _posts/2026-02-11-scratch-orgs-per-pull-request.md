---
title: A scratch org per pull request
description: >-
  Every PR gets a fresh org, deploys into it, runs the tests and destroys it.
  The setup took two days and removed an entire category of release-day panic.
date: 2026-02-11
tags: [DevOps, SFDX]
image: /assets/img/covers/blog.svg
---

Before: someone deployed to the shared integration org, discovered a conflict,
and the next four people were blocked while it was untangled. Release day was a
war room.

After: every pull request spins up its own scratch org, deploys into it, runs
the full test suite, and destroys the org when the PR closes. Nobody blocks
anybody.

## The workflow

```yaml
name: Validate PR
on: [pull_request]

jobs:
  scratch:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install the CLI
        run: npm install --global @salesforce/cli

      # The Dev Hub auth URL lives in a repository secret. It is the only
      # credential in the whole pipeline, and it never touches the log.
      - name: Authenticate to the Dev Hub
        run: |
          echo "${{ secrets.DEVHUB_AUTH_URL }}" > auth.txt
          sf org login sfdx-url --sfdx-url-file auth.txt --set-default-dev-hub
          rm auth.txt

      - name: Create the scratch org
        run: sf org create scratch -f config/project-scratch-def.json -a ci -d 1 -y 1

      - name: Push and test
        run: |
          sf project deploy start -o ci
          sf apex run test -o ci --code-coverage --result-format human --wait 20

      # `always()` matters: without it a failed test leaves the org alive and
      # the daily scratch-org limit is gone by Thursday.
      - name: Delete the scratch org
        if: always()
        run: sf org delete scratch -o ci --no-prompt
```

## The parts that are not obvious

**Scratch org limits are the real constraint.** A Dev Hub has a daily and an
active allocation, and a busy repository will hit both. Setting the duration to
one day rather than the default seven is most of the fix; the `always()` cleanup
step is the rest.

{% include components/callout.html type="warning" title="Do not skip the cleanup"
   text="A workflow that deletes the org only on success will, within a week, be a workflow that cannot create orgs at all — because every failed run has left one behind." %}

**Test data has to come from somewhere.** A scratch org is genuinely empty.
Either every test builds its own data with a factory, or you maintain a seed
plan under `data/`. We started with the seed plan, then moved to factories
because the plan drifted from the schema and nobody noticed until it broke.

**It is slower than you want.** Ours takes eleven minutes end to end, most of
it org creation. That is fine for a PR gate and useless as an inner-loop tool —
developers still work in a long-lived personal scratch org and only feel this
when they push.

## Was it worth it

Two days to build, and release-day deployment failures went from routine to
rare. The number I did not expect: the review queue moved faster, because a
reviewer who can see a green run on a real org spends less time reading the
diff for deployment problems and more time reading it for actual problems.
