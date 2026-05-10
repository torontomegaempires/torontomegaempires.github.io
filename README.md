# Toronto Mega Empires

**Live site:** [torontomegaempires.com](https://torontomegaempires.com)

Website for the Toronto Mega Empires gaming community. Covers upcoming events, game results, player stats, photo galleries, and community info.

## Stack

- **Jekyll** — static site, hosted on GitHub Pages (`docs/` is the Pages source)
- **SQLite** — game results and player stats (`docs/_db/megaempires.db`), queried at build time via `jekyll-sqlite`
- **Express.js** — local-only admin app for database management (`megaempires-admin/`)
- **Netlify** — subdomain redirects only (`netlify.toml`); not used for the main site

## Local development

```bash
cd docs && ruby -S bundle exec jekyll serve --livereload --drafts
# or: ./docs/serve.sh
```

Changes to `docs/_config.yml` require a server restart.

## Project structure

```
docs/                     # Jekyll site root
├── _config.yml           # Site config + SQLite query definitions
├── _data/                # YAML: games-list.yml (schedule), members.yml
├── _db/megaempires.db    # SQLite database (committed to repo)
├── _includes/            # Reusable Liquid components
├── _layouts/             # Page templates
├── _plugins/             # photo_gallery.rb — scans assets/images/games/
├── _posts/               # Game reports and announcements
├── _sass/custom.scss     # All custom styling
└── assets/images/games/  # Game photos, organized by date

megaempires-admin/        # Express 5 admin app (local only, port 3000)
sql/                      # Schema, migrations, CSV import scripts
```

## Adding a game result

1. Insert game record via `sql/insert-game.sql`
2. Create a CSV (copy from an existing `sql/gameXX-record.csv`)
3. Run `./sql/insert-game.py gameXX-record.csv`
4. Commit the updated `docs/_db/megaempires.db`

See `sql/HOWTO.md` for CSV format details.

## Deployment

Push to `main` → GitHub Pages builds and deploys automatically. Live within a few minutes.

## Admin app

```bash
cd megaempires-admin && npm run dev
```

Reads/writes the same `docs/_db/megaempires.db`. Not deployed.
