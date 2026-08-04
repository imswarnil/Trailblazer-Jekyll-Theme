# frozen_string_literal: true
#
# This Gemfile builds the DEMO SITE — the thing you are looking at when you run
# `bundle exec jekyll serve` in this repository.
#
# A site that installs Trailblazer as a gem does not need any of this; see
# docs/installing.md for the three-line version.
#
# Note that `Gemfile.lock` is gitignored on purpose. GitHub Actions resolves
# versions fresh on every run, which is what keeps the theme honest about its
# stated version ranges instead of quietly depending on whatever was locked in
# 2024.

source "https://rubygems.org"

# The theme itself, from this directory.
gemspec

group :jekyll_plugins do
  gem "jekyll-feed",     "~> 0.17"
  gem "jekyll-sitemap",  "~> 1.4"
  gem "jekyll-paginate", "~> 1.1"
end

# Dart Sass. The theme's stylesheet uses no syntax newer than the 1.x line, so
# it also compiles under the older converter GitHub Pages' classic build ships.
gem "jekyll-sass-converter", "~> 3.0"

# Required on Ruby 3.0+, where WEBrick left the standard library.
gem "webrick", "~> 1.8"

# Timezone data, bundled where the OS has no tz database.
gem "tzinfo-data", platforms: [:windows, :jruby]

# Directory watcher for `jekyll serve --watch` on Windows.
gem "wdm", "~> 0.1", platforms: [:windows]
