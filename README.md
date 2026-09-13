# katarinagresova.github.io

Personal site. Plain [Jekyll](https://jekyllrb.com/) — no Node, no build step
beyond Jekyll itself, one stylesheet.

## Editing the things you'll actually change

| I want to…                     | Edit                        |
| ------------------------------ | --------------------------- |
| Add a paper                     | `_data/publications.yml`    |
| Add / reorder a project         | `_data/projects.yml`        |
| Change social + contact links   | `_data/links.yml`           |
| Rewrite the intro paragraphs    | `index.md`                  |
| Change name, tagline, photo     | `_config.yml`               |
| Change colours or type          | `assets/css/main.css` (§1)  |

Publications show on the landing page only when `selected: true`, so the list
can grow without the front page getting crowded.

The name matching `highlight_author` in `_config.yml` is bolded automatically
in every author list — no manual `<strong>` tags.

## Adding a new page

Create a Markdown file anywhere in the root:

```markdown
---
title: Curriculum vitae
subtitle: One line under the title. Optional.
permalink: /cv/
---

Your content, in Markdown.
```

It picks up the `page` layout, nav and footer automatically. Add it to the nav
in `_includes/nav.html`.

## Running it locally

Needs Ruby with development headers.

```bash
bundle install
bundle exec jekyll serve --livereload
# http://localhost:4000
```

## Deploying

Pushing to `main` triggers `.github/workflows/pages.yml`, which builds and
publishes to GitHub Pages.

One-time setup: **Settings → Pages → Build and deployment → Source →
GitHub Actions**.

## Structure

```
_config.yml            site settings
index.md               landing page copy
_data/                 publications, projects, links
_layouts/              default (shell), home (landing), page (prose)
_includes/             head, nav, footer, links, icons
assets/css/main.css    the whole design, commented by section
assets/js/main.js      theme toggle + fade-in on scroll
```
