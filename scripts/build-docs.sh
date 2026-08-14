#!/usr/bin/env bash
# Build the offline documentation, both options:
#   dist/documentation/index.html   self-contained HTML, sidebar nav, sources
#   dist/documentation/Trailblazer-Documentation.pdf
#
#   scripts/build-docs.sh [output_dir]
#
# Needs a rendered _site/ (runs a production build if it is missing) and, for
# the PDF, a Chrome/Chromium binary — skipped with a warning when absent.
set -euo pipefail
cd "$(dirname "$0")/.."
[ -d "$HOME/.rubies/ruby-3.4.1/bin" ] && export PATH="$HOME/.rubies/ruby-3.4.1/bin:$PATH"

OUT="${1:-dist/documentation}"

if [ ! -f _site/assets/css/main.css ]; then
  JEKYLL_ENV=production bundle exec jekyll build
fi

bundle exec ruby scripts/build-docs.rb "$OUT"

# Find a Chrome to print with, across macOS, Linux and CI.
CHROME=""
for c in "google-chrome" "chromium-browser" "chromium" \
         "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; do
  if command -v "$c" >/dev/null 2>&1 || [ -x "$c" ]; then CHROME="$c"; break; fi
done

if [ -z "$CHROME" ]; then
  echo "! No Chrome/Chromium found — PDF skipped. HTML documentation is complete."
  exit 0
fi

"$CHROME" --headless --disable-gpu --no-sandbox \
  --no-pdf-header-footer \
  --print-to-pdf="$OUT/Trailblazer-Documentation.pdf" \
  "file://$(cd "$OUT" && pwd)/index.html" 2>/dev/null
ls -la "$OUT/Trailblazer-Documentation.pdf"
