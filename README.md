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
## 🏗️ Architecture

### Technology Stack
- **Jekyll** - Static site generator
- **GitHub Pages** - Hosting with custom domain
- **SCSS/CSS3** - Styling with component-based architecture
- **SQLite** - Game results and player statistics
- **YAML** - Structured data for events and members

### Project Structure
```
docs/                          # Jekyll root directory
├── _config.yml               # Jekyll configuration
├── _data/                    # YAML data files
│   ├── games-list.yml       # Upcoming games data
│   ├── members.yml          # Community member data
│   └── translate_langs.yml  # Internationalization
├── _db/                     # SQLite database
│   └── megaempires.db      # Game results and player data
├── _includes/               # Reusable template components
├── _layouts/                # Page templates
├── _posts/                  # Blog posts and announcements
├── _sass/                   # SCSS stylesheets
│   └── custom.scss         # All custom styling
├── assets/                  # Static assets
│   ├── images/             # Image assets organized by date/event
│   ├── favicon/            # Favicon and app icons
│   └── css/                # Compiled CSS
└── *.md                    # Page content files
```

## 🎨 Design System

### Visual Design Principles
- **Epic but Approachable:** Showcase game's grandeur while welcoming newcomers
- **Community-First:** Prioritize features that build community connections
- **Mobile-Responsive:** Excellent experience across all device types
- **Performance-Conscious:** Fast loading times with rich visual content

### CSS Architecture
- **Component-Based:** Modular, reusable styling system
- **BEM-Inspired Naming:** Consistent naming conventions
- **CSS Custom Properties:** Centralized theming system
- **Mobile-First:** Progressive enhancement approach

### Key Components
```scss
// Brand colors and theming
:root {
  --brand-color: #f2cb05;
  --text-dark: #2c3e50;
  --background-light: #f8f9fa;
  --border-radius: 8px;
  --shadow-subtle: 0 2px 4px rgba(0,0,0,0.1);
}

// Component examples
.hero-section          // Homepage banner with stats
.game-type-card        // Reusable card components
.callout-*            // Information callout boxes
.social-button        // Consistent social media buttons
```

## 📊 Data Management

### YAML Data Files
- **`_data/games-list.yml`** - Upcoming events and game information
- **`_data/members.yml`** - Community member profiles and information
- **`_data/translate_langs.yml`** - Internationalization support

### SQLite Database
- **Location:** `docs/_db/megaempires.db`
- **Purpose:** Historical game results and player statistics
- **Schema:** Games, Players, GamePlayers tables with relational structure

### Example Database Queries
```sql
-- Get recent game results
SELECT g.game_title, g.game_date, p.player_name, gp.final_ast_position
FROM games g
JOIN game_players gp ON g.game_id = gp.game_id
JOIN players p ON gp.player_id = p.player_id
ORDER BY g.game_date DESC, gp.final_ast_position ASC;

-- Get player statistics
SELECT p.player_name, COUNT(*) as games_played, 
       AVG(gp.final_ast_position) as avg_position
FROM players p
JOIN game_players gp ON p.player_id = gp.player_id
GROUP BY p.player_id, p.player_name;
```

## 🔗 External Integrations

### Email Management
- **Service:** Gaggle.email (privacy-focused mailing list)
- **Endpoint:** `https://gaggle.email/join/torontomegaempires@gaggle.email`
- **Purpose:** Newsletter signups and community updates

### Social Media Platforms
- **Discord:** `https://discord.torontomegaempires.com`
- **Facebook:** `https://fb.torontomegaempires.com`
- **Event Signup:** `https://signup.torontomegaempires.com`

### Domain Configuration
- **Primary:** torontomegaempires.com
- **Redirects:** Various subdomains for social platforms and services
- **SSL:** Automatic HTTPS via GitHub Pages

## 🚢 Deployment

### Automatic Deployment
1. **Development:** Make changes locally and test with `bundle exec jekyll serve`
2. **Commit:** Git commit changes to repository
3. **Push:** Push to GitHub main branch
4. **Build:** GitHub Pages automatically builds Jekyll site
5. **Deploy:** Site updates live within 1-10 minutes

### Environment Configuration
- **Production:** GitHub Pages with custom domain
- **Development:** Local Jekyll server on `http://localhost:4000`
- **Build:** Automatic via GitHub Pages on push to main

## 📱 Features

### Homepage
- **Hero Section:** Dramatic background with community statistics
- **Game Types:** Interactive cards for different event formats
- **Next Game Highlight:** Dynamic upcoming event information
- **Community Callouts:** Welcoming messages and clear CTAs

### About Page
- **Organizer Profile:** Rob McArthur introduction and credentials
- **Community Story:** Mission, values, and welcoming narrative
- **FAQ Section:** Common questions for newcomers
- **Game Day Timeline:** What to expect at events

### Games Page
- **Photo Galleries:** Rich visual content from 6+ games with 20+ photos
- **Game Results:** Professional tables with winner celebrations
- **Community Achievements:** Milestone tracking and recognition
- **Event Types:** Home games, conventions, and MiniCons

### Players Page
- **Community Directory:** Member profiles and achievements
- **Statistics:** Game participation and performance tracking
- **Recognition:** Community contributions and milestones

## 🎯 Performance & Optimization

### Performance Targets
- **Loading Speed:** < 3 seconds on mobile networks
- **Mobile-First:** Optimized touch interfaces and responsive design
- **Minimal JavaScript:** Lightweight, progressive enhancement approach
- **Image Optimization:** Properly sized and compressed assets

### SEO & Accessibility
- **Semantic HTML:** Proper heading hierarchy and landmarks
- **Alt Text:** Descriptive alt text for all images
- **Color Contrast:** Sufficient contrast ratios for readability
- **Keyboard Navigation:** All interactive elements keyboard accessible

## 🔒 Security & Privacy

### Security Measures
- **Static Site Security:** No server vulnerabilities with static files
- **HTTPS Enforced:** Automatic SSL via GitHub Pages
- **External Link Safety:** `rel="noopener noreferrer"` on external links
- **Trusted Integrations:** Only verified external services

### Privacy Considerations
- **Minimal Tracking:** No invasive analytics or tracking
- **Email Privacy:** Privacy-focused email service (Gaggle)
- **Photo Permissions:** Only photos with appropriate permissions
- **Data Minimization:** Collect only necessary information

## 🛠️ Development Guidelines

### Code Standards
- **CSS:** Component-based architecture with consistent naming
- **HTML:** Semantic markup for accessibility and SEO
- **JavaScript:** Minimal, progressive enhancement only
- **Performance:** Optimize for mobile-first experience

### Content Management
- **Markdown First:** All content in Markdown for easy editing
- **Data Separation:** Structured data in YAML files
- **Version Control:** All changes tracked in git
- **Image Organization:** Assets organized by date and event

### Testing Checklist
- [ ] Mobile responsiveness across devices
- [ ] Loading speed optimization
- [ ] Accessibility compliance
- [ ] Cross-browser compatibility
- [ ] External link functionality
- [ ] Form submission testing

## 📈 Community Growth

### Success Metrics
- **New Player Acquisition:** Monthly signups and first-time attendance
- **Community Growth:** Discord members, email subscribers, social followers
- **Engagement:** Website session duration, return visits, page views
- **Event Success:** Attendance rates, player retention, event frequency

### Community Health Indicators
- **Inclusive Atmosphere:** Welcoming environment for all skill levels
- **New Player Integration:** Successful onboarding and return attendance
- **Active Participation:** Community engagement and mutual support
- **Word-of-Mouth Growth:** Referrals and organic community expansion

## 🤝 Contributing

### How to Contribute
1. **Content Updates:** Submit pull requests for content improvements
2. **Bug Reports:** Use GitHub issues for technical problems
3. **Feature Suggestions:** Discuss enhancements via GitHub discussions
4. **Community Input:** Join Discord for ongoing community feedback

### Maintainer
- **Rob McArthur** - Primary maintainer and community organizer
- **Contact:** Via Discord or GitHub issues
- **Community:** Active in Toronto board gaming community

## 📚 Additional Resources

### Game Information
- **Mega Empires Rules:** Official rulebooks and player aids
- **Community Resources:** Strategy guides and player tips
- **Historical Context:** Game development and community history

### Community Platforms
- **Discord Server:** Real-time community communication
- **Facebook Group:** Social media presence and event promotion
- **Email Newsletter:** Regular updates and announcements

### Development Resources
- **Jekyll Documentation:** [jekyllrb.com](https://jekyllrb.com)
- **GitHub Pages:** [pages.github.com](https://pages.github.com)
- **Liquid Templating:** [shopify.github.io/liquid](https://shopify.github.io/liquid)

---

**Built with ❤️ for the Toronto Mega Empires community**  
*Bringing epic civilization gaming to the Greater Toronto Area since 2024*

### Formula for google sheet for score
```
=MAX(0,(E2-1)*5) + IF(F2="Yes",5,0) + G2 + H2 + I2*3 + J2*6 + IF(K2="Yes",2,0) + IF(L2="Yes",2,0) + M2
```

### Formula for google sheet for rank
```
=SUMPRODUCT(($C$2:$C=$C2) * (($N$2:$N*1000000000 + ($L$2:$L="Yes")*10000000 + $E$2:$E*100000 + $J$2:$J*1000 + $I$2:$I) > ($N2*1000000000 + ($L2="Yes")*10000000 + $E2*100000 + $J2*1000 + $I2))) + 1
```
