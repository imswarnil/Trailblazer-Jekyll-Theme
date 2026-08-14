# frozen_string_literal: true
#
# Build the offline documentation from the rendered site.
#
#   bundle exec ruby scripts/build-docs.rb [output_dir]
#
# Reads _data/docs_nav.yml for the chapter order, lifts each guide's rendered
# article out of _site/docs/ (between the tb-docs-extract markers the docs
# layout emits), and writes a self-contained documentation folder:
#
#   documentation/
#     index.html      every guide, one file, sidebar nav, print stylesheet —
#                     open it in a browser, or print it and you have the PDF
#     nav.json        the navigation data, for anything else that wants it
#     markdown/       the editable Markdown sources
#
# Rendering from _site rather than from the Markdown is deliberate: the
# guides contain Liquid, component includes and Rouge highlighting, and
# Jekyll has already resolved all of it. This script never re-implements the
# renderer — it packages the renderer's output.
#
# The PDF is produced from the same index.html by scripts/build-docs.sh via
# headless Chrome; the @media print rules below are the PDF's layout.

require "yaml"
require "json"
require "fileutils"

ROOT     = File.expand_path("..", __dir__)
SITE     = File.join(ROOT, "_site")
OUT      = ARGV[0] ? File.expand_path(ARGV[0]) : File.join(ROOT, "dist", "documentation")
CANON    = "https://trailblazer.imswarnil.com"

abort "run `bundle exec jekyll build` first — no _site/ found" unless Dir.exist?(File.join(SITE, "docs"))

nav = YAML.load_file(File.join(ROOT, "_data", "docs_nav.yml"))
version = Gem::Specification.load(File.join(ROOT, "trailblazer-jekyll-theme.gemspec")).version.to_s
css = File.read(File.join(SITE, "assets", "css", "main.css"))

chapters = nav.reject { |g| g["aside"] }.flat_map do |group|
  group["items"].map { |i| i.merge("group" => group["group"]) }
end

# One stable anchor per guide, from its URL: /docs/installing/ → "installing",
# /docs/ → "overview".
slug = ->(url) { url == "/docs/" ? "overview" : url.split("/").last }

sections = chapters.map do |ch|
  page = File.join(SITE, ch["url"].sub(%r{^/}, ""), "index.html")
  html = File.read(page)
  body = html[%r{<!-- tb-docs-extract:start -->(.*)<!-- tb-docs-extract:end -->}m, 1] or
    abort "no extract markers in #{page} — is _layouts/docs.html intact?"

  # Cross-guide links become in-document anchors; every other root-relative
  # link points at the live site, so nothing in the offline copy 404s.
  body = body.gsub(%r{(href|src)="(/[^"#]*)(#[^"]*)?"}) do
    attr, path, _frag = Regexp.last_match(1), Regexp.last_match(2), Regexp.last_match(3)
    target = chapters.find { |c| c["url"] == path }
    target ? %(#{attr}="##{slug.(target["url"])}") : %(#{attr}="#{CANON}#{path}")
  end

  { "slug" => slug.(ch["url"]), "title" => ch["title"], "group" => ch["group"], "body" => body }
end

nav_html = nav.reject { |g| g["aside"] }.map do |group|
  links = group["items"].map do |i|
    %(<a href="##{slug.(i["url"])}">#{i["title"]}</a>)
  end.join("\n      ")
  <<~HTML
    <div class="nav-group">
      <p>#{group["group"]}</p>
      #{links}
    </div>
  HTML
end.join

sections_html = sections.map do |s|
  <<~HTML
    <section id="#{s["slug"]}" class="chapter">
      <header class="chapter-head">
        <p class="chapter-eyebrow">#{s["group"]}</p>
        <h1 class="chapter-title">#{s["title"]}</h1>
      </header>
      #{s["body"]}
    </section>
  HTML
end.join

page = <<~HTML
  <!DOCTYPE html>
  <html lang="en" data-theme="light">
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Trailblazer #{version} — Documentation</title>
  <style>#{css}</style>
  <style>
    /* Offline shell, on top of the theme's own stylesheet. */
    body { margin: 0; }
    .doc-shell { display: grid; grid-template-columns: 15rem minmax(0, 1fr); gap: 2rem;
                 max-width: 70rem; margin: 0 auto; padding: 1.5rem; }
    .doc-nav { position: sticky; top: 1.5rem; align-self: start;
               max-height: calc(100vh - 3rem); overflow-y: auto; }
    .doc-nav .nav-group p { font-size: .72rem; font-weight: 700; letter-spacing: .08em;
               text-transform: uppercase; color: var(--tb-fg-subtle, #666); margin: 1.2rem 0 .3rem; }
    .doc-nav a { display: block; padding: .22rem 0; color: inherit; text-decoration: none;
               font-size: .9rem; }
    .doc-nav a:hover { color: var(--tb-accent, #0176d3); }
    .chapter { margin-bottom: 4rem; }
    .chapter-head { border-bottom: 1px solid var(--tb-line-default, #ddd);
               margin-bottom: 1.5rem; padding-bottom: .75rem; }
    .chapter-eyebrow { font-size: .72rem; font-weight: 700; letter-spacing: .08em;
               text-transform: uppercase; color: var(--tb-accent, #0176d3); margin: 0; }
    .chapter-title { margin: .2rem 0 0; }
    .doc-cover { text-align: center; padding: 5rem 1rem 3rem; }
    .doc-cover h1 { font-size: 2.6rem; margin: 0; }
    .doc-cover p { color: var(--tb-fg-muted, #555); }
    @media (max-width: 48rem) { .doc-shell { grid-template-columns: 1fr; }
               .doc-nav { position: static; max-height: none; } }
    @media print {
      /* The theme clips body overflow-x for screen; Chromium's print engine
         reads any body clip as one page and blanks the rest. */
      html, body { overflow: visible; }
      .doc-nav { display: none; }
      .doc-shell { display: block; max-width: none; padding: 0; }
      .chapter { break-before: page; }
      .doc-cover { break-after: page; padding-top: 40vh; }
      a { color: inherit; text-decoration: none; }
    }
  </style>
  </head>
  <body>
  <div class="doc-cover">
    <h1>Trailblazer</h1>
    <p>A Jekyll theme for Salesforce developers · Documentation · v#{version}</p>
    <p><a href="#{CANON}">#{CANON.sub("https://", "")}</a></p>
  </div>
  <div class="doc-shell">
    <nav class="doc-nav" aria-label="Documentation">
      #{nav_html}
    </nav>
    <main>
      #{sections_html}
    </main>
  </div>
  </body>
  </html>
HTML

FileUtils.rm_rf(OUT)
FileUtils.mkdir_p(File.join(OUT, "markdown"))
File.write(File.join(OUT, "index.html"), page)
File.write(File.join(OUT, "nav.json"), JSON.pretty_generate(nav))
chapters.each do |ch|
  FileUtils.cp(File.join(ROOT, "docs", ch["file"]), File.join(OUT, "markdown", ch["file"]))
end

puts "#{OUT}/index.html  (#{sections.size} guides, #{page.bytesize / 1024} KB)"
