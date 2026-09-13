# katarinagresova.github.io

Personal site. Plain [Jekyll](https://jekyllrb.com/) — no Node, no build step
beyond Jekyll itself, one stylesheet.

## Editing the things you'll actually change

| I want to…                      | Edit                        |
| ------------------------------- | --------------------------- |
| Add a paper                     | `_data/publications.yml`    |
| Add / reorder a project         | `_data/work.yml`            |
| Add a course, talk or workshop  | `_data/teaching.yml`        |
| Announce where you'll be next   | `_data/upcoming.yml`        |
| Edit the CV                     | `_data/cv.yml`              |
| Change social + contact links   | `_data/links.yml`           |
| Rewrite the intro paragraphs    | `index.md`                  |
| Rewrite the research page       | `research.md`               |
| Change name, tagline, photo     | `_config.yml`               |
| Change colours or type          | `assets/css/main.css` (§1)  |
| Change the Scholar link         | `_config.yml`, `_data/links.yml` |
| Change the nav links            | `_includes/nav.html`        |

Publications show on the landing page only when `selected: true`, so the list
can grow without the front page getting crowded. Every entry shows on
`/publications/` either way. An optional `note:` on a publication prints a
small label next to the venue — use it for "Preprint" or "Review".
Two optional keys state authorship position, which author order alone hides.
`first_author: true` prints a bright chip and is counted in the landing page's
numbers band and the publications header — set it only where you led the paper.
`author_note:` is the chip's text; it defaults to "First author", and you set it
for cases like "Co-first author". Used on its own, without `first_author`, it
prints a quieter chip and is not counted — that is how "Shared second author"
appears without inflating the first-author figure.

`_data/work.yml` and `_data/teaching.yml` hold one entry per built thing and
one per taught thing. The rule that keeps them from turning into a junk drawer:
**an entry earns its place if somebody other than you has used it, or could.**
Each entry carries a `kind:`, which decides its group on `/building/` or
`/teaching/` — the groups themselves, in order, are declared in the front
matter of `building.html` and `teaching.html`. A `links:` list of label/url
pairs is what lets one entry be simultaneously a package, a dataset and a
paper without being written down three times. `featured: true` promotes it to
the landing page; keep that to six projects and three teaching entries, or the
card grid leaves an orphan row.

`_data/upcoming.yml` is the only part of the site that goes stale, so it cleans
up after itself. Each event has an `until:` date; once the build date passes
it, the entry stops rendering, and when the last one expires the whole strip
disappears rather than sitting there empty. A scheduled job in
`.github/workflows/pages.yml` rebuilds the site daily so that happens without
anyone pushing a commit. The only maintenance is adding things.

`_data/cv.yml` drives `/cv/` section by section. A section has either
`entries:` (timeline rows of `when` / `what` / `where` / `detail`, plus an
optional `url`) or `items:` (a plain bulleted list). `when` sits in a narrow
left rail — keep it under about fourteen characters or it wraps. `detail` is
emitted as HTML, so `<em>` and links work.

A CV section can also set `from: work` or `from: teaching` with a `kinds:`
list instead of writing its own `entries:`. That is how the software, teaching
and talks sections of the CV are generated — so a project is described in
exactly one place, and adding it to `_data/work.yml` puts it on both
`/building/` and `/cv/`.

The name matching `highlight_author` in `_config.yml` is bolded automatically
in every author list — no manual `<strong>` tags.

## The numbers band

Two of the four figures under the hero are counted from the data files at
build time, not typed in — papers from `_data/publications.yml`, teaching from
`_data/teaching.yml`. Adding an entry anywhere updates the band.

The other two cannot be counted from this repo: the citation total and the star
count on the benchmark suite. They live in `_data/proof.yml` with the date they
were last checked, and the page prints that date under the band — an uncited
count of citations being exactly the sort of number this site exists to
complain about. Refresh them from Google Scholar and the GitHub repo header,
and move `as_of` when you do.

Only figures that are actually strong belong in `proof.yml`. The smaller
packages have modest numbers, and quoting those would only invite the
comparison.

## What I bring, and what's also available

The landing page has one job: tell a visitor what to do about you. Who that
visitor is changed, and the page changed with it.

The three cards under the hero come from `_data/bring.yml` and are written for
someone hiring at a bio, health or techbio company — *own the question*, *find
out whether it is real*, *sit between the science and everyone else*. The third
card is there because the role being looked for is deliberately not a
heads-down modelling job; if that ever changes, that is the card to rewrite.

`_data/offer.yml` holds the three bookable services that used to occupy that
slot — teach your group, set it up with you, take on the problem. They are
still real, so they are still on the page, but as a compact block down at
section 05: in the hero they made her read as someone with a practice to
protect rather than a job to take. That block renders `name`, `lede`, `proof`
and `proof_url`. `detail` is the long-form description and is deliberately not
rendered anywhere — it lives in the data file so the offer stays written down
in one place, and it is what to start from if the consulting ever needs a page
of its own.

The three `proof_url`s deliberately point at three different evidence pages —
`/teaching/`, `/building/`, `/publications/` — so a reader who doubts one of
the claims lands somewhere that answers that one.

In both files each card ends in a prior instance rather than a promise, so keep
`proof:` pointing at something already done. Avoid typing counts into `proof:`
— the numbers strip counts the same things from the data files, and a
hand-written total in a sentence about honest evaluation is the one that
eventually goes wrong.

## Line length

Three values in `assets/css/main.css` §1 set how prose reads, and they move as
one: `--wrap` (the page column), `--measure` (the text column) and the
`font-size` on `body`. `--measure` is not an independent number — it is
`calc(var(--wrap) - 5rem)`, which is the page column minus `.wrap`'s two
gutters. That is deliberate: a paragraph ends exactly where the rules and the
rows end, instead of stopping short and leaving half the page empty.

The cost is that lines run to roughly 80–100 characters, past the 45–75 that
typographers recommend. Three things pay for it: the page is kept narrower than
it would otherwise be (62rem, not 70), the body size is stepped up to 1.15rem,
and the leading is 1.75. If you widen `--wrap`, the measure follows
automatically and the line gets longer — re-check the size and the leading, or
the return sweep starts to get lost. Prose-only pages derive their width from
`--measure` too, so one token still governs everything.

## Colours

Both themes live in one block at the top of `assets/css/main.css`. Each colour
is written once as `light-dark(<light>, <dark>)`, so changing the accent means
editing two hex values, not two stylesheets. The toggle in the nav pins
`data-theme` on `<html>`; with no preference saved, the visitor's OS setting
decides.

## Pages

| Page            | Source              | Data                     |
| --------------- | ------------------- | ------------------------ |
| `/`             | `index.md`          | publications, work, teaching, upcoming |
| `/research/`    | `research.md`       | —                        |
| `/building/`    | `building.html`     | `_data/work.yml`         |
| `/teaching/`    | `teaching.html`     | `_data/teaching.yml`     |
| `/publications/`| `publications.html` | `_data/publications.yml` |
| `/cv/`          | `cv.html`           | `_data/cv.yml` (+ work, teaching) |

## Adding a new page

Create a Markdown file anywhere in the root:

```markdown
---
title: Talks
subtitle: One line under the title. Optional.
eyebrow: Optional monospace label above it.
permalink: /talks/
---

Your content, in Markdown.
```

It picks up the `page` layout, nav and footer automatically — a centred prose
column, which is what you want for anything that is mostly words. Add it to
`nav_items` in `_includes/nav.html`.

Pages that need the full page width instead (a list, a table) should use
`layout: default` and write their own `.wrap page` markup, the way
`publications.html` and `cv.html` do.

## Running it locally

Needs Ruby with development headers.

```bash
bundle install
bundle exec jekyll serve --livereload
# http://localhost:4000
```

## Regenerating the CV PDF

There are two CVs and they come from the same data.

`/cv/` is the **complete record** — every project, course and talk — and can
afford to run long. `/cv/print/` is the **two-page version**, and it is that
page which becomes `assets/katarina-gresova-cv.pdf`. It is a separate page
rather than a print stylesheet over `/cv/`, because a PDF opened in a hiring
thread gets about two pages of attention and everything after that is noise.

What makes it fit is selection, applied as rules in `cv-print.html` rather than
as a hand-kept second copy — research roles keep a one-line detail and industry
roles do not, software is the `featured: true` set using each entry's `short:`,
supervision and talks collapse to one counted line each. Editing `_data/cv.yml`
updates both.

`short:` on a `_data/work.yml` entry is the one-clause version written for
print. Do not go back to truncating `blurb:` — it left entries ending
mid-sentence on an ellipsis, which reads as unfinished rather than as brief.

To rebuild it, with the site running locally:

```bash
node -e "const{chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('http://127.0.0.1:4000/cv/print/',{waitUntil:'networkidle'});await p.emulateMedia({media:'print',colorScheme:'light'});await p.pdf({path:'assets/katarina-gresova-cv.pdf',format:'A4',printBackground:true,margin:{top:'12mm',bottom:'12mm',left:'13mm',right:'13mm'}});await b.close()})()"
```

Then check it is still two pages. Styling lives in `assets/css/cv-print.css`,
which is sized in points against an A4 sheet and is never downloaded by a
visitor to the site. If it spills onto a third page, cut content in
`cv-print.html` rather than shrinking type below 8pt.

## Source material

Decks and PDFs you are working from go in `_source/`. Jekyll skips any
top-level directory starting with an underscore, so nothing there is ever
published. Do not go back to excluding `*.pdf` in `_config.yml`: Jekyll globs
with `fnmatch` and no `FNM_PATHNAME`, so the `*` crosses a slash and that
pattern silently swallows `assets/katarina-gresova-cv.pdf` as well.

## Deploying

Pushing to `main` triggers `.github/workflows/pages.yml`, which builds and
publishes to GitHub Pages.

One-time setup: **Settings → Pages → Build and deployment → Source →
GitHub Actions**.

The site is served from `katarinagresova.com`, set by the `CNAME` file in the
repo root. Because this is the *user* site, GitHub also redirects every project
page under it — `katarinagresova.github.io/missing-skills/` now lands on
`katarinagresova.com/missing-skills/`, and so on. Any project repo whose own
`_config.yml` hardcodes the old host needs its `url:` updating to match.

## Structure

```
_config.yml            site settings
index.md               landing page copy
research.md            /research/
publications.html      /publications/
cv.html                /cv/
_data/                 publications, work, teaching, upcoming, cv, links
_layouts/              default (shell), home (landing), page (prose)
_includes/             head, nav, footer, links, icons
assets/css/main.css    the whole design, commented by section
assets/js/main.js      theme toggle + fade-in on scroll
```
