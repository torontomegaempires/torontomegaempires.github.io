# System Patterns - Toronto Mega Empires Website

## Architecture Overview

### Jekyll Static Site Architecture

**Core Pattern:** Jekyll-based static site generation with GitHub Pages hosting
- **Build Process:** Jekyll transforms Markdown + Liquid templates → Static HTML/CSS/JS
- **Hosting:** GitHub Pages with custom domain (torontomegaempires.com)
- **Content Management:** Git-based workflow with Markdown files
- **Data Integration:** YAML data files + SQLite database queries

### Directory Structure Pattern

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
│   ├── custom-head.html    # Custom head elements
│   └── next-game-banner.html # Dynamic game banner
├── _layouts/                # Page templates
│   ├── games.html          # Games page layout
│   └── home.html           # Homepage layout
├── _posts/                  # Blog posts (Jekyll convention)
├── _sass/                   # SCSS stylesheets
│   └── custom.scss         # All custom styling
├── assets/                  # Static assets
│   ├── css/                # Compiled CSS
│   ├── images/             # Image assets
│   └── favicon/            # Favicon files
└── *.md                    # Page content files
```

## Design Patterns

### 1. Component-Based CSS Architecture

**Pattern:** Modular CSS components with consistent naming conventions

```scss
// Component Structure Pattern
.component-name {
  // Base styles
  
  &-modifier {
    // Modifier styles
  }
  
  &-element {
    // Child element styles
  }
}
```

**Key Components:**
- `.hero-section` - Homepage banner with stats
- `.game-type-card` - Reusable card components
- `.callout-*` - Information callout boxes (info, action, warning)
- `.section-divider` - Visual section separators
- `.social-button` - Consistent social media buttons

### 2. Responsive Grid System

**Pattern:** CSS Grid and Flexbox for responsive layouts

```scss
.game-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
```

**Breakpoint Strategy:**
- Mobile-first approach
- Primary breakpoint: 768px (tablet/desktop)
- Flexible grid systems with `auto-fit` and `minmax()`

### 3. Data-Driven Content Pattern

**Pattern:** Jekyll data files + Liquid templating for dynamic content

```liquid
{% if site.data.games-list and site.data.games-list.games %}
  {% assign today = site.time | date: "%Y-%m-%d" %}
  {% assign upcoming_games = site.data.games-list.games | 
      where_exp: "game", "game.date >= today" | sort: "date" %}
  {% if upcoming_games.size > 0 %}
    {% assign next_game = upcoming_games.first %}
    <!-- Display next game -->
  {% endif %}
{% endif %}
```

**Data Sources:**
- `_data/games-list.yml` - Upcoming events
- `_data/members.yml` - Community member information
- SQLite queries for historical game data

### 4. Progressive Enhancement Pattern

**Pattern:** Base functionality works without JavaScript, enhanced with JS

```html
<!-- Base: Works without JavaScript -->
<div class="next-game-highlight">
  <a href="https://signup.torontomegaempires.com">Next Game Info</a>
</div>

<!-- Enhanced: JavaScript adds click functionality -->
<div class="next-game-highlight" 
     onclick="window.open('https://signup.torontomegaempires.com', '_blank')" 
     style="cursor: pointer;">
  <!-- Content -->
</div>
```

## Technical Patterns

### 1. CSS Custom Properties (Variables)

**Pattern:** Consistent theming with CSS custom properties

```scss
:root {
  --brand-color: #f2cb05;
  --text-dark: #2c3e50;
  --background-light: #f8f9fa;
  --border-radius: 8px;
  --shadow-subtle: 0 2px 4px rgba(0,0,0,0.1);
}

.component {
  background: var(--background-light);
  color: var(--text-dark);
  border-radius: var(--border-radius);
}
```

### 2. Animation and Interaction Patterns

**Pattern:** Subtle, purposeful animations using CSS transforms

```scss
@keyframes glow-pulse {
  0%, 100% { text-shadow: 0 0 20px rgba(242, 203, 5, 0.3); }
  50% { text-shadow: 0 0 30px rgba(242, 203, 5, 0.6); }
}

.interactive-element {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-elevated);
  }
}
```

**Animation Principles:**
- Subtle, non-distracting motion
- Performance-optimized (transform/opacity only)
- Consistent timing (0.2s ease transitions)
- Purposeful enhancement, not decoration

### 3. Content Safety Pattern

**Pattern:** Defensive programming for data availability

```liquid
{% comment %} Always check data existence before use {% endcomment %}
{% if site.data.games-list and site.data.games-list.games %}
  <!-- Use data -->
{% else %}
  <!-- Fallback content -->
  <div class="next-game-highlight">
    <h3>Rob's Home - West</h3>
    <p><strong>Date:</strong> May 24, 2025</p>
  </div>
{% endif %}
```

### 4. Mobile-First Responsive Pattern

**Pattern:** Design for mobile, enhance for desktop

```scss
.component {
  // Mobile styles (base)
  padding: 1rem;
  font-size: 1rem;
  
  @media (min-width: 768px) {
    // Desktop enhancements
    padding: 2rem;
    font-size: 1.125rem;
  }
}
```

## Content Patterns

### 1. Semantic HTML Structure

**Pattern:** Meaningful HTML elements for accessibility and SEO

```html
<article class="game-card">
  <header>
    <h3>Game Title</h3>
    <time datetime="2025-05-24">May 24, 2025</time>
  </header>
  <main>
    <p>Game description...</p>
  </main>
  <footer>
    <a href="#signup">Sign Up</a>
  </footer>
</article>
```

### 2. Icon + Text Pattern

**Pattern:** Consistent icon usage for visual hierarchy

```html
<div class="icon-text">
  <span class="icon">🎲</span>
  <span class="text">Game Information</span>
</div>
```

**Icon Strategy:**
- Emoji for ancient civilization theme (🏛️, ⚔️, 🎲)
- Consistent placement and sizing
- Semantic meaning aligned with content

### 3. Call-to-Action Pattern

**Pattern:** Consistent CTA styling and placement

```scss
.cta-button {
  background: var(--brand-color);
  color: var(--text-dark);
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
}
```

## Integration Patterns

### 1. External Service Integration

**Pattern:** Clean integration with external platforms

```html
<!-- Email Signup Integration -->
<form method="post" action="https://gaggle.email/join/torontomegaempires@gaggle.email">
  <!-- Form fields -->
</form>

<!-- Social Media Integration -->
<a href="https://discord.torontomegaempires.com" target="_blank">
  <span class="social-icon">💬</span>
  <span>Join Discord</span>
</a>
```

### 2. Database Query Pattern

**Pattern:** SQLite integration for dynamic data (via Jekyll plugins/scripts)

```sql
-- Example query pattern for game results
SELECT 
  g.game_date,
  g.game_title,
  p.player_name,
  gp.final_ast_position
FROM games g
JOIN game_players gp ON g.game_id = gp.game_id
JOIN players p ON gp.player_id = p.player_id
ORDER BY g.game_date DESC, gp.final_ast_position ASC;
```

## Performance Patterns

### 1. Asset Optimization

**Pattern:** Optimized asset loading and caching

```scss
// Critical CSS inlined in head
// Non-critical CSS loaded asynchronously
// Images optimized and properly sized
// Minimal JavaScript footprint
```

### 2. Caching Strategy

**Pattern:** Leverage GitHub Pages caching + CDN

- Static assets cached by GitHub Pages CDN
- Proper cache headers for images and CSS
- Minimal dynamic content for maximum cacheability

## Security Patterns

### 1. External Link Safety

**Pattern:** Safe external link handling

```html
<a href="https://external-site.com" target="_blank" rel="noopener noreferrer">
  External Link
</a>
```

### 2. Form Security

**Pattern:** Use trusted external form processors

```html
<!-- Use Gaggle.email for form processing instead of custom backend -->
<form method="post" action="https://gaggle.email/join/...">
```

## Maintenance Patterns

### 1. Content Update Workflow

**Pattern:** Git-based content management

1. Update Markdown files or YAML data
2. Commit changes to repository
3. GitHub Pages automatically rebuilds site
4. Changes go live within minutes

### 2. Monitoring and Analytics

**Pattern:** Simple, privacy-focused tracking

- Focus on community growth metrics
- Respect user privacy
- Use built-in GitHub Pages analytics where available

These patterns ensure consistency, maintainability, and scalability while keeping the technical complexity manageable for a single-maintainer project.
