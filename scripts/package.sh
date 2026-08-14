#!/usr/bin/env bash
# Build the marketplace distribution zip:  scripts/package.sh 1.2.3
#
# Produces dist/trailblazer-jekyll-theme-<version>.zip — a clean archive of
# the tracked tree (git archive, so no _site/, no .git, no local cruft).
# This is the "Main File(s)" upload for Envato and the download for
# Gumroad / Lemon Squeezy: the full demo site to learn from, the theme
# inside it, starter/ to begin from, and docs/ as the documentation.
set -euo pipefail
cd "$(dirname "$0")/.."

VERSION="${1:?usage: scripts/package.sh <version>}"
NAME="trailblazer-jekyll-theme-$VERSION"

mkdir -p dist
git archive --format=zip --prefix="$NAME/" -o "dist/$NAME.zip" HEAD
echo "dist/$NAME.zip"
unzip -l "dist/$NAME.zip" | tail -1
