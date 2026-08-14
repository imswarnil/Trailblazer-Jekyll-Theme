#!/usr/bin/env bash
# Build the sale package:  scripts/package.sh 1.2.3
#
# Produces dist/trailblazer-jekyll-theme-<version>.zip — the folder that is
# actually sold. Inside it:
#
#   trailblazer-jekyll-theme-<version>/
#     ...                the clean tracked tree (git archive: full demo site,
#                        theme, starter/, docs/ — no _site, no .git, no cruft)
#     documentation/     the offline manual, built by scripts/build-docs.sh:
#       index.html         every guide in one self-contained page with nav
#       Trailblazer-Documentation.pdf   the same, printed (needs Chrome)
#       nav.json · markdown/            the data and the editable sources
#
# This zip is the Envato "Main File(s)" upload and the Gumroad /
# Lemon Squeezy download; the release workflow attaches it to every release.
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT=$(pwd)

VERSION="${1:?usage: scripts/package.sh <version>}"
NAME="trailblazer-jekyll-theme-$VERSION"

mkdir -p dist
rm -f "dist/$NAME.zip"

STAGE=$(mktemp -d)
trap 'rm -rf "$STAGE"' EXIT

git archive --format=tar --prefix="$NAME/" HEAD | tar -x -C "$STAGE"
./scripts/build-docs.sh "$STAGE/$NAME/documentation"

(cd "$STAGE" && zip -qr "$ROOT/dist/$NAME.zip" "$NAME")
echo "dist/$NAME.zip"
unzip -l "dist/$NAME.zip" | tail -1
