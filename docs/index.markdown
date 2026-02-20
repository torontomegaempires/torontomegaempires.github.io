---
layout: home
title: Home
---

<div class="hero-section">
<h1>Build an Empire. Make History. Have Fun.</h1>
<div class="hero-subtitle">Toronto's Mega Empires gaming community for epic civilization-building adventures
</div>

<div class="hero-stats">
<div class="stat-item">
<span class="stat-number">18</span>
<span class="stat-label">Max Players</span>
</div>
<div class="stat-item">
<span class="stat-number">12</span>
<span class="stat-label">Hour Sessions</span>
</div>
<div class="stat-item">
<span class="stat-number">14+</span>
<span class="stat-label">Games Played</span>
</div>
</div>
</div>

<div class="social-media-section">
<h2 class="social-title">Join Our Empire Building Community</h2>
<p class="social-subtitle">Connect with fellow strategists, get game updates, and secure your spot at the table</p>

<div class="social-buttons">
<a href="https://google.torontomegaempires.com" class="social-button discord" target="_blank" rel="noopener noreferrer">
<span class="social-icon">💬</span>
<span class="social-text">Join Mailing List</span>
</a>
<a href="https://discord.torontomegaempires.com" class="social-button discord" target="_blank" rel="noopener noreferrer">
<span class="social-icon">💬</span>
<span class="social-text">Join Discord Server</span>
</a>
</div>
</div>

<div class="info-callout">
<div class="callout-title">New to Mega Empires?
</div>
<div class="callout-content">
<strong>No experience required!</strong> We host the ultimate board gaming experience: <strong>Mega Empires</strong> - a massive strategy game supporting up to 18 players in sessions that span 10-12 hours of pure strategic gameplay. Think you have what it takes to guide a civilization from the ancient world to greatness?
<br><br>
Learn more about this legendary game at <a href="https://mega-empires.com" target="_blank" rel="noopener noreferrer">mega-empires.com</a>
</div>
</div>

{% comment %} Next Game Highlight with Safety Check {% endcomment %}
{% if site.data.games-list and site.data.games-list.games %}
{% assign today = site.time | date: "%Y-%m-%d" %}
{% assign upcoming_games = site.data.games-list.games | where_exp: "game", "game.date >= today" | sort: "date" %}
{% if upcoming_games.size > 0 %}
{% assign next_game = upcoming_games.first %}
<div class="next-game-highlight">
<a href="https://signup.torontomegaempires.com" target="_blank" rel="noopener noreferrer" class="next-game-stretched-link" aria-label="Sign up for next game"></a>
<h2>🎲 Next Game</h2>
<h3>{{ next_game.title }}</h3>
<p><strong>Date:</strong> {{ next_game.date | date: "%B %d, %Y" }}</p>
<p><strong>Location:</strong> {{ next_game.location | default: "TBD" }}</p>
<p><strong>Players:</strong> Up to {{ next_game.max_players }}</p>
{% if next_game.cost %}<p><strong>Cost:</strong> {{ next_game.cost }}</p>{% endif %}
</div>
{% endif %}
{% else %}
<div class="next-game-highlight">
<a href="https://signup.torontomegaempires.com" target="_blank" rel="noopener noreferrer" class="next-game-stretched-link" aria-label="Sign up for next game"></a>
<h2>🎲 Next Game</h2>
<h3>Rob's Home - West</h3>
<p><strong>Date:</strong> May 24, 2025</p>
<p><strong>Players:</strong> Up to 9</p>
</div>
{% endif %}

# Ready to Make Your Empire Stand the Test of Time?

<div class="action-callout">
<div class="callout-title">New Players Welcome!
</div>
<div class="callout-content">
Don't worry about experience - Mega Empires is designed to be learned as you play. Our friendly community will help you navigate your first civilization from humble beginnings to potential world dominance.
</div>
</div>

<div class="signup-section">
<h3>Join Our Gaming Community</h3>
<p>Get notified about upcoming games, meet fellow strategy enthusiasts, and secure your spot at the table.</p>

<div class="signup-section-links">
<div class="social-links-compact">
<a href="https://google.torontomegaempires.com" class="social-link-compact discord-compact" target="_blank" rel="noopener noreferrer">
<span class="social-icon">💬</span>
<span>Join Mailing List</span>
</a>
<a href="https://discord.torontomegaempires.com" class="social-link-compact discord-compact" target="_blank" rel="noopener noreferrer">
<span class="social-icon">💬</span>
<span>Join Discord</span>
</a>
<a href="https://fb.torontomegaempires.com" class="social-link-compact facebook-compact" target="_blank" rel="noopener noreferrer">
<span class="social-icon">👥</span>
<span>Follow Facebook</span>
</a>
</div>
</div>
</div>

<div class="game-types-grid">
<div class="game-type-card">
<span class="card-icon">🏠</span>
<h3>Cozy Home Games</h3>
<div class="card-subtitle">Perfect for newcomers and veterans alike
</div>

<p>Four times a year in Toronto's Beaches neighborhood, we host intimate games that alternate between the Western and Eastern civilizations. These all-day sessions include lunch and dinner, creating the perfect environment for both epic gameplay and great conversation.</p>

<ul class="card-details">
<li><strong>Players:</strong> Up to 9</li>
<li><strong>Duration:</strong> 10am - 10pm</li>
<li><strong>Schedule:</strong> Feb, May, Sep, Nov</li>
<li><strong>Includes:</strong> Lunch & Dinner</li>
<li><strong>Cost:</strong> <span class="stats-highlight">$20</span></li>
</ul>
</div>

<div class="game-type-card">
<span class="card-icon">🏛️</span>
<h3>Mega MiniCon</h3>
<div class="card-subtitle">The full experience with maximum players
</div>

<p>Twice yearly at The Guild House, we unleash the complete 18-player Mega Empires experience. This is strategy gaming at its most ambitious - a full day of civilization building with every nation in play simultaneously.</p>

<ul class="card-details">
<li><strong>Players:</strong> Up to 18</li>
<li><strong>Duration:</strong> Full Day</li>
<li><strong>Schedule:</strong> January & June</li>
<li><strong>Venue:</strong> The Guild House</li>
<li><strong>Cost:</strong> <span class="stats-highlight">$10</span></li>
</ul>
</div>

<div class="game-type-card">
<span class="card-icon">🎪</span>
<h3>Convention Gaming</h3>
<div class="card-subtitle">Join us at gaming events
</div>

<p>We're regulars at the <a href="https://www.niagaraboardgaming.com">Niagara Boardgame Weekend</a>, where Mega Empires has become a Thursday tradition. It's a great way to experience the game in a convention atmosphere surrounded by fellow board game enthusiasts.</p>

<ul class="card-details">
<li><strong>Event:</strong> Niagara Boardgame Weekend</li>
<li><strong>Day:</strong> Thursday </li>
<li><strong>Atmosphere:</strong> Convention Gaming</li>
<li><strong>Community:</strong> Fellow Enthusiasts</li>
</ul>
</div>
</div>

# What Makes Mega Empires Special?

<div class="info-callout">
<div class="callout-title">This isn't just any board game - it's a gaming event!
</div>
<div class="callout-content">
Mega Empires evolved from the classic Civilization by Francis Tresham, expanded through years of passionate fan development. The result? An unparalleled strategy experience that balances multiple gameplay elements.
</div>
</div>

<div class="game-types-grid">
<div class="game-type-card">
<span class="card-icon">🤝</span>
<h3>Trade & Diplomacy</h3>
<p>Negotiate, form alliances, and broker deals that can change the course of history. Your words are as powerful as your armies.</p>
</div>

<div class="game-type-card">
<span class="card-icon">🏛️</span>
<h3>Civilization Building</h3>
<p>Develop technologies and advance your society from Prehistory to the heights of the Iron Age.</p>
</div>

<div class="game-type-card">
<span class="card-icon">⚔️</span>
<h3>Clash of Civilizations</h3>
<p>When diplomacy fails, armies march. Send your people to war by land or sea.</p>
</div>

<div class="game-type-card">
<span class="card-icon">🌍</span>
<h3>Epic Scale</h3>
<p>Games span millennia of human development, from humble settlements to mighty empires that stand the test of time.</p>
</div>
</div>

<div class="action-callout">
<div class="callout-title">Learn More About the Game
</div>
<div class="callout-content">
Read the full development story at <a href="https://mega-empires.com/history" target="_blank" rel="noopener noreferrer">mega-empires.com/history</a>
</div>
</div>

# Upcoming Games

{% if site.data.games-list and site.data.games-list.games %}
{% assign today = site.time | date: "%Y-%m-%d" %}
{% assign upcoming_games = site.data.games-list.games | where_exp: "game", "game.date >= today" | sort: "date" %}
{% if upcoming_games.size > 0 %}
<div class="games-list">
{% for game in upcoming_games limit: 6 %}
<div class="game-card">
<h4>{{ game.title }}</h4>
<p><strong>{{ game.date | date: "%B %d, %Y" }}</strong></p>
<p>{{ game.max_players }} players • {{ game.location }}</p>
{% if game.cost %}<p><em>{{ game.cost }}</em></p>{% endif %}
</div>
{% endfor %}
</div>
{% endif %}
{% else %}
<div class="games-list">
<div class="game-card">
<h4>Rob's Home - West</h4>
<p><strong>May 24, 2025</strong></p>
<p>9 players • West</p>
</div>
<div class="game-card">
<h4>The Guild House MiniCon</h4>
<p><strong>June 14, 2025</strong></p>
<p>18 players • Full Experience</p>
<p><em>$10 per player</em></p>
</div>
</div>
{% endif %}

# Host Your Own Mega Empires

<div class="action-callout">
<div class="callout-title">Have a great venue?
</div>
<div class="callout-content">
We're always seeking new locations throughout the Greater Toronto Area. Whether you have a community center, game store, or spacious home, we'd love to help you organize an epic Mega Empires event.
</div>
</div>

<div class="info-callout">
<div class="callout-title">We Handle Everything
</div>
<div class="callout-content">
Contact <a href="mailto:{{ site.author.email }}">{{ site.author.email }}</a> and we'll handle all the logistics:
<br><br>
<div class="icon-text">
<span class="icon">👥</span>
<span class="text"><strong>Player recruitment and coordination</strong></span>
</div>
<div class="icon-text">
<span class="icon">🎲</span>
<span class="text"><strong>Game setup and instruction</strong></span>
</div>
<div class="icon-text">
<span class="icon">📚</span>
<span class="text"><strong>Rules teaching for new players</strong></span>
</div>
<div class="icon-text">
<span class="icon">📦</span>
<span class="text"><strong>All necessary materials and components</strong></span>
</div>
</div>
</div>

<div class="warning-callout">
<div class="callout-title">Priority Locations
</div>
<div class="callout-content">
We're especially seeking venues accessible to out-of-town players to help grow our gaming community across the Greater Toronto Area.
</div>
</div>
