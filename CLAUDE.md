# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ILLIDAN Lab website (University of Michigan) — a Jekyll-based static site hosted on GitHub Pages.

## Build & Development

```bash
bundle install              # install dependencies
bundle exec jekyll serve    # local dev server at http://127.0.0.1:4000
bundle exec jekyll build    # build into _site/
bundle exec jekyll doctor   # check for configuration issues
```

## Architecture

Single-page site (`index.html`) using the `default` layout. All content renders on one page with anchor-based navigation (#about, #research, #members, #publication).

### Jekyll Collections (configured in `_config.yml`)

- **`_team/`** — Team member profiles. Each `.md` file uses front matter with `layout`, `name`, `title`, `picture`, `email`, and `category` (numeric: 0=investigator, 1=lab member, 2=lab member tier 2, 3=visitor, 8=alumni, 9=friends). Members with `year` set are filtered out of active listings.
- **`_papers/`** — Publication entries. Front matter only (body unused): `title`, `authors`, `venue`, `year`, `paper_url`, `paper_label`, `code_url`, `award`, `type`. Rendered by `_includes/publications.html`, sorted by year descending.

### Key Includes (`_includes/`)

- `introduction.md` — Lab description in the About section
- `news.md` — News items in the About section
- `publications.html` — Liquid template that renders the `_papers` collection

### Layouts

- `default.html` — The main (and effectively only) layout; contains the full page structure, nav, all sections, and Liquid loops for team/publications
- `team-member.html` / `team-nonmember.html` — Rendered inline within the team member loops

### CSS Framework

Uses [Skeleton](http://getskeleton.com/) (`dist/css/skeleton.css`, `dist/css/normalize.css`) with custom overrides in `css/custom.css`. Grid uses Skeleton's column classes (e.g., `four columns`, `one-half offset-by-one-half column`).

## Common Tasks

**Add a team member:** Create `_team/firstname-lastname.md` with the front matter pattern from existing files. Place profile image in `images/profile/`.

**Add a publication:** Create `_papers/YYYY-venue-shortname.md` with front matter fields (`title`, `authors`, `venue`, `year`, `paper_url`, etc.). The file naming convention is `year-venue-keyword.md`.

**Update news:** Edit `_includes/news.md`.

## Important Notes

- `_site/` is generated output — never edit directly.
- Both collections have `output: false` in `_config.yml`, meaning they don't generate individual pages; they are only used as data sources rendered inline.
- Filenames use kebab-case. Indentation is 2 spaces.
