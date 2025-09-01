# Technical Context - Toronto Mega Empires Website

## Technology Stack

### Core Technologies

**Jekyll Static Site Generator**
- **Version:** Latest stable (GitHub Pages compatible)
- **Purpose:** Transform Markdown + Liquid templates into static HTML
- **Benefits:** Fast, secure, SEO-friendly, version-controlled content
- **Limitations:** No server-side processing, limited dynamic functionality

**GitHub Pages Hosting**
- **Platform:** GitHub Pages with custom domain
- **Domain:** torontomegaempires.com
- **SSL:** Automatic HTTPS via GitHub Pages
- **CDN:** Global content delivery network included
- **Build:** Automatic builds on git push to main branch

**Ruby/Bundler (Development)**
- **Ruby Version:** Specified in `.ruby-version`
- **Bundler:** Dependency management via `Gemfile`
- **Local Development:** `bundle exec jekyll serve`
- **Environment:** macOS development environment

### Frontend Technologies

**HTML5 + Semantic Markup**
- Modern HTML5 elements for accessibility
- Semantic structure for SEO and screen readers
- Progressive enhancement approach

**CSS3/SCSS**
- **Preprocessor:** Sass/SCSS via Jekyll
- **Architecture:** Component-based modular CSS
- **Features:** CSS Grid, Flexbox, Custom Properties, Animations
- **File:** `docs/_sass/custom.scss` (single file approach)

**Minimal JavaScript**
- **Philosophy:** Progressive enhancement, not dependency
- **Usage:** Simple onclick handlers for enhanced interactions
- **No Framework:** Vanilla JavaScript only for minimal footprint

### Data Management

**YAML Data Files**
- **Location:** `docs/_data/`
- **Files:** `games-list.yml`, `members.yml`, `translate_langs.yml`
- **Purpose:** Structured data for Jekyll templating
- **Benefits:** Version controlled, human readable, easy to edit

**SQLite Database**
- **Location:** `docs/_db/megaempires.db`
- **Purpose:** Historical game results and player statistics
- **Access:** Via external scripts/queries (not direct Jekyll integration)
- **Schema:** Games, Players, GamePlayers tables with relational structure

**Liquid Templating**
- **Engine:** Jekyll's built-in Liquid template engine
- **Usage:** Dynamic content generation from YAML data
- **Features:** Filters, conditionals, loops for data presentation

## Development Environment

### Local Development Setup

**Prerequisites:**
```bash
# Ruby (version specified in .ruby-version)
# Bundler gem manager
# Git for version control
```

**Development Commands:**
```bash
# Install dependencies
bundle install

# Start local development server
bundle exec jekyll serve

# Build site for production
bundle exec jekyll build
```

**Development Workflow:**
1. Edit Markdown files or YAML data
2. Preview changes locally with `bundle exec jekyll serve`
3. Commit changes to git repository
4. Push to GitHub for automatic deployment

### File Organization

**Content Files:**
- `docs/index.markdown` - Homepage content
- `docs/about.markdown` - About page
- `docs/games.md` - Games page
- `docs/players.md` - Players page
- `docs/_posts/` - Blog posts/announcements

**Template Files:**
- `docs/_layouts/` - Page layout templates
- `docs/_includes/` - Reusable template components
- `docs/_sass/custom.scss` - All custom styling

**Asset Management:**
- `docs/assets/images/` - Image assets organized by date/event
- `docs/assets/favicon/` - Favicon and app icons
- `docs/assets/css/` - Compiled CSS output

## Technical Constraints

### GitHub Pages Limitations

**Jekyll Plugins:**
- Limited to GitHub Pages approved plugins only
- No custom Ruby plugins allowed
- Must work within Jekyll's safe mode

**Build Environment:**
- No server-side processing capabilities
- No database connections during build
- Limited to static file generation

**File Size Limits:**
- Repository size limits (soft limit ~1GB)
- Individual file size limits
- Build time constraints

### Performance Constraints

**Loading Speed Requirements:**
- Target: < 3 seconds on mobile networks
- Critical CSS inlined in head
- Minimal JavaScript footprint
- Optimized image sizes and formats

**Mobile Performance:**
- Mobile-first responsive design
- Touch-friendly interface elements
- Optimized for slower mobile connections

### Browser Compatibility

**Target Browsers:**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

**CSS Features:**
- CSS Grid with fallbacks
- CSS Custom Properties with fallbacks
- Modern CSS features with progressive enhancement

## External Service Integrations

### Email Management
**Gaggle.email**
- **Purpose:** Mailing list management and signup forms
- **Integration:** HTML form posts to Gaggle endpoints
- **Benefits:** No backend required, privacy-focused
- **Endpoint:** `https://gaggle.email/join/torontomegaempires@gaggle.email`

### Social Media Platforms
**Discord**
- **URL:** `https://discord.torontomegaempires.com`
- **Purpose:** Real-time community communication
- **Integration:** Direct links from website

**Facebook**
- **URL:** `https://fb.torontomegaempires.com`
- **Purpose:** Social media presence and event promotion
- **Integration:** Direct links and potential embed widgets

### Event Management
**External Signup System**
- **URL:** `https://signup.torontomegaempires.com`
- **Purpose:** Event registration and management
- **Integration:** Links from next game cards and CTAs

## Database Schema

### SQLite Structure

**Games Table:**
```sql
CREATE TABLE games (
  game_id INTEGER PRIMARY KEY,
  game_date DATE,
  game_title TEXT,
  location TEXT,
  max_players INTEGER,
  actual_players INTEGER
);
```

**Players Table:**
```sql
CREATE TABLE players (
  player_id INTEGER PRIMARY KEY,
  player_name TEXT,
  email TEXT,
  join_date DATE
);
```

**Game_Players Table:**
```sql
CREATE TABLE game_players (
  game_id INTEGER,
  player_id INTEGER,
  nation TEXT,
  final_ast_position INTEGER,
  FOREIGN KEY (game_id) REFERENCES games(game_id),
  FOREIGN KEY (player_id) REFERENCES players(player_id)
);
```

### Data Access Patterns

**Query Examples:**
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

## Security Considerations

### Static Site Security
- **No Server Vulnerabilities:** Static files eliminate most attack vectors
- **HTTPS Enforced:** GitHub Pages provides automatic SSL
- **No User Data Storage:** Minimal personal information handling

### External Link Security
- **Target Blank Safety:** `rel="noopener noreferrer"` on external links
- **Trusted Domains:** Only link to verified, trusted external services
- **Form Security:** Use established third-party form processors

### Privacy Considerations
- **Minimal Tracking:** No invasive analytics or tracking
- **Email Privacy:** Use privacy-focused email service (Gaggle)
- **Photo Permissions:** Only use photos with appropriate permissions

## Deployment and CI/CD

### Deployment Process
1. **Development:** Local changes and testing
2. **Commit:** Git commit to repository
3. **Push:** Push to GitHub main branch
4. **Build:** GitHub Pages automatically builds Jekyll site
5. **Deploy:** Site updates live within 1-10 minutes

### Version Control
- **Repository:** GitHub repository with full history
- **Branching:** Simple main branch workflow
- **Backup:** Git history serves as complete backup

### Monitoring
- **Uptime:** GitHub Pages reliability (99.9%+ uptime)
- **Performance:** Manual testing and user feedback
- **Analytics:** Basic GitHub Pages insights

## Development Best Practices

### Code Organization
- **Single CSS File:** All custom styles in `_sass/custom.scss`
- **Component Naming:** Consistent BEM-inspired naming conventions
- **Modular Structure:** Reusable components and patterns

### Content Management
- **Markdown First:** All content in Markdown for easy editing
- **Data Separation:** Structured data in YAML files
- **Version Control:** All content changes tracked in git

### Performance Optimization
- **Image Optimization:** Properly sized and compressed images
- **CSS Efficiency:** Minimal, well-organized stylesheets
- **Caching Strategy:** Leverage GitHub Pages CDN caching

### Accessibility
- **Semantic HTML:** Proper heading hierarchy and landmarks
- **Alt Text:** Descriptive alt text for all images
- **Color Contrast:** Sufficient contrast ratios for readability
- **Keyboard Navigation:** Ensure all interactive elements are keyboard accessible

## Future Technical Considerations

### Scalability Planning
- **Content Growth:** Plan for increasing number of games and photos
- **Performance Monitoring:** Watch for loading speed degradation
- **Database Limits:** Monitor SQLite file size and complexity

### Technology Evolution
- **Jekyll Updates:** Stay current with Jekyll and GitHub Pages updates
- **CSS Evolution:** Adopt new CSS features as browser support improves
- **Mobile Optimization:** Continue optimizing for mobile performance

### Integration Opportunities
- **API Integrations:** Potential future integrations with gaming platforms
- **Advanced Analytics:** Privacy-focused analytics solutions
- **Community Features:** Enhanced community interaction capabilities

This technical foundation provides a solid, maintainable platform for the Toronto Mega Empires community website while keeping complexity manageable for a single-maintainer project.
