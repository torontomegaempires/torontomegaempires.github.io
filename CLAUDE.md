# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Jekyll site (primary)

All Jekyll commands must be run from the `docs/` directory:

```bash
# Development server with live reload and drafts
cd docs && bundler exec jekyll serve --livereload --drafts
# or use the helper script:
./docs/serve.sh

# Production build
cd docs && bundle exec jekyll build
```

**Note:** Changes to `docs/_config.yml` require restarting the server — it is not hot-reloaded.

### Admin dashboard (megaempires-admin/)

```bash
cd megaempires-admin
npm start        # production
npm run dev      # development with nodemon (auto-restart)
```

The admin app runs on port 3000.

### Database operations

Game results are stored in `docs/_db/megaempires.db` (SQLite). To add a new game:

1. Insert game record via `sql/insert-game.sql`
2. Create a CSV file (copy from existing `sql/gameXX-record.csv`)
3. Run `./sql/insert-game.py gameXX-record.csv`
4. Commit the updated `.db` file

See `sql/HOWTO.md` for CSV format details and full workflow.

## Architecture

### Repository layout

```
docs/                     # Jekyll site root (GitHub Pages source)
megaempires-admin/        # Express.js admin app (local use only)
sql/                      # Database schema, migration scripts, CSV imports
docs/emails/              # Email campaign archives and templates
```

### Jekyll site structure

- **`docs/_config.yml`** — Central config. Defines the theme (`jekyll-theme-yat`), SQLite queries that populate `site.data.*`, and the `game_reports` collection.
- **`docs/_data/`** — YAML files: `games-list.yml` (upcoming schedule), `members.yml` (community directory)
- **`docs/_db/megaempires.db`** — SQLite database queried at build time by `jekyll-sqlite`. Results are exposed as `site.data.recent_results`, `site.data.players`, `site.data.games`, `site.data.game_players`.
- **`docs/_sass/custom.scss`** — All custom styling (~2,300 lines). Uses CSS custom properties for theming (`--brand-color`, `--text-dark`, etc.).
- **`docs/_plugins/photo_gallery.rb`** — Custom generator that scans `assets/images/games/YYYY-MM-DD/` directories and exposes photo data as `site.data.game_photos`.
- **`docs/_includes/`** — Reusable Liquid components injected into layouts
- **`docs/_layouts/`** — Page templates (`home.html`, `games.html`); posts default to `post` layout, game reports to `game_report` layout

### Data flow

Static content is driven by two sources:
1. **YAML files** in `docs/_data/` for editable community data (schedule, members)
2. **SQLite** queries defined in `_config.yml` under the `sqlite:` key, executed at build time

The `jekyll-sqlite` plugin makes query results available in templates as `site.data.<name>`.

### Deployment

Push to `main` branch → GitHub Pages automatically builds and deploys. The `docs/` subdirectory is the Pages source. Live at `torontomegaempires.com`.

`netlify.toml` at the root handles subdomain redirects (e.g., `discord.torontomegaempires.com` → Discord server). This is separate from the Jekyll build.

### Admin app

`megaempires-admin/` is a standalone Express 5 / EJS / SQLite3 app for managing the database. It reads/writes the same `docs/_db/megaempires.db` file. It is not deployed — local use only. Routes are modular under `megaempires-admin/routes/`.
