# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "trailblazer-jekyll-theme"
  spec.version       = "1.0.0"
  spec.authors       = ["Swarnil Singhai"]
  spec.email         = ["swarnilsinghaicse@gmail.com"]

  spec.summary       = "A Jekyll theme for Salesforce developers."
  spec.description   = <<~DESC
    Trailblazer is a fast, accessible Jekyll theme for Salesforce developers,
    architects and consultants. It ships a printable resume page driven from
    YAML, a certification wall, typed collections for posts, projects, snippets
    and talks, per-collection JSON-LD, a command-palette search, an optional
    service worker, and a token-based design system that re-themes from a
    single colour in _config.yml. No JavaScript build step, and every plugin it
    uses runs on GitHub Pages.
  DESC

  spec.homepage      = "https://trailblazer.imswarnil.com"
  spec.license       = "MIT"

  spec.metadata = {
    "homepage_uri"      => "https://trailblazer.imswarnil.com",
    "source_code_uri"   => "https://github.com/imswarnil/trailblazer-jekyll-theme",
    "bug_tracker_uri"   => "https://github.com/imswarnil/trailblazer-jekyll-theme/issues",
    "documentation_uri" => "https://trailblazer.imswarnil.com/docs/",
    "changelog_uri"     => "https://github.com/imswarnil/trailblazer-jekyll-theme/blob/main/CHANGELOG.md"
  }

  # Only the theme's own directories. A gem that also ships the demo site would
  # drop seven posts and a resume about someone else into a buyer's build the
  # moment they install it — the demo content lives in the repository, not in
  # the package. `_data` stays out too: Jekyll does not read data files from a
  # theme gem, so shipping it would only package the demo persona's resume.
  spec.files = Dir.glob(
    "{_includes,_layouts,_sass,assets}/**/*",
    File::FNM_DOTMATCH
  ).reject do |f|
    # Demo-only media. Nothing in the framework references these — they are
    # the demo posts' cover art, the README screenshots and a sample audio
    # file, and together they were 95% of the package by weight.
    File.directory?(f) ||
      f.start_with?("assets/img/placeholders/", "assets/img/screenshots/",
                    "assets/img/projects/", "assets/audio/")
  end + %w[
    LICENSE
    README.md
    CHANGELOG.md
  ].select { |f| File.exist?(f) }

  spec.required_ruby_version = ">= 2.7.0"

  # Jekyll 3.9 is what GitHub Pages runs natively; 4.x is what most people run
  # locally. The theme is tested on both, so the constraint spans them rather
  # than forcing a buyer to choose a deployment method.
  spec.add_runtime_dependency "jekyll", ">= 3.9", "< 5.0"

  spec.add_runtime_dependency "jekyll-feed", "~> 0.17"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.4"

  spec.add_development_dependency "rake", "~> 13.0"
end
