# frozen_string_literal: true
#
# Release tooling for the theme gem. Day-to-day development does not need
# rake — `bin/serve` and `bin/build` are the loop. This file exists for the
# moment the theme ships:
#
#   rake gem:build      → trailblazer-jekyll-theme-<version>.gem
#   rake gem:release    → build, then push to RubyGems (needs `gem signin`)
#   rake check          → production Jekyll build of the demo site

GEMSPEC = "trailblazer-jekyll-theme.gemspec"

def version
  Gem::Specification.load(GEMSPEC).version.to_s
end

namespace :gem do
  desc "Build the gem package"
  task :build do
    sh "gem build #{GEMSPEC}"
    puts "\nBuilt trailblazer-jekyll-theme-#{version}.gem"
  end

  desc "Build and push the gem to RubyGems"
  task release: :build do
    sh "gem push trailblazer-jekyll-theme-#{version}.gem"
  end
end

desc "Production build of the demo site"
task :check do
  sh "JEKYLL_ENV=production bundle exec jekyll build"
end

task default: :check
