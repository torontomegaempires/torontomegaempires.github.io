---
layout: games
title: Games
---

<div class="hero-section">
<h1 class="hero-title">Epic Game Chronicles</h1>
<p class="hero-subtitle">Witness the rise and fall of civilizations across our gaming history</p>
</div>

<div class="section-divider">
<span class="divider-icon">🏛️</span>
</div>

## Our Gaming Legacy

<div class="info-callout">
<h4>📊 Game Statistics</h4>
<p>Each game represents 12 hours of epic strategic gameplay, with civilizations battling across millennia. From intimate 9-player home games to massive 18-player convention spectacles, every session tells a unique story of conquest, trade, and civilization building.</p>
</div>

{% for game in site.data.games %}
<div class="game-card-with-photos">
<div class="game-header">
<h3>{{ game.name }}</h3>
<div class="game-date">
<strong>{{ game.date | date: "%B %d, %Y" }}</strong>
</div>
</div>

{% comment %} Dynamic Photo Gallery Section {% endcomment %}
{% assign game_date = game.date %}
{% assign game_photos = site.data.game_photos[game_date] %}

{% if game_photos and game_photos.size > 0 %}
<div class="photo-gallery-section">
<div class="photo-gallery-grid">
{% for photo in game_photos %}
{% assign photo_alt = game.name | append: " - Epic gaming moments" %}
{% if forloop.first %}
<img src="{{ photo.path }}" alt="{{ photo_alt }}" class="gallery-photo featured-photo" loading="lazy">
{% elsif photo.filename contains "ast" or photo.filename contains "position" %}
<img src="{{ photo.path }}" alt="{{ photo_alt }}" class="gallery-photo winner-photo" loading="lazy">
{% elsif photo.filename contains "suppress-" %}
{% comment %} Do not show suppressed photos {% endcomment %}
{% else %}
<img src="{{ photo.path }}" alt="{{ photo_alt }}" class="gallery-photo" loading="lazy">
{% endif %}
{% endfor %}
</div>
</div>
{% endif %}
<div class="photo-gallery-caption">
{% if game.game_summary %}
<p>{{ game.game_summary }}</p>
{% elsif game.date == "2025-01-23" %}
<p>🌟 <strong>Niagara Boardgame Weekend</strong> - Toronto Mega Empires expands beyond the city, bringing our epic gaming experience to Ontario's broader gaming community.</p>
{% else %}
<p>📸 Captured moments from this epic {{ game_photos.size }}-photo gaming session, showcasing the strategic intensity and community spirit of Mega Empires.</p>
{% endif %}
</div>
{% comment %} Winner Spotlight {% endcomment %}
{% if site.data.game_players %}
{% assign winner = site.data.game_players | where: "game_id", game.id | sort: "score" | reverse | first %}
{% if winner %}
<div class="winner-spotlight">
<div class="winner-crown">👑
</div>
<h4>Victory Achieved!</h4>
<p><strong>{{ winner.player }}</strong> led <strong>{{ winner.nation }}</strong> to glory with <strong>{{ winner.score }} points</strong>{% if winner.cities %} and <strong>{{ winner.cities }} cities</strong>{% endif %}!</p>
</div>
{% endif %}
{% endif %}

{% comment %} Game Results Table {% endcomment %}
{% assign game_players = site.data.game_players | where: "game_id", game.id | sort: "score" | reverse %}
{% if game_players and game_players.size > 0 %}
<div class="game-results-section">
<h4>📊 Final Standings</h4>
<div class="results-table-wrapper">
<table class="results-table">
<thead>
<tr>
<th>Player</th>
<th>Nation</th>
<th>Cities</th>
<th>AST Position</th>
<th>Score</th>
</tr>
</thead>
<tbody>
{% for player in game_players %}
<tr class="{% if player.ast_pos == 1 %}winner-row{% elsif player.ast_pos <= 3 %}podium-row{% endif %}">
<td class="player-cell">
<strong>{{ player.player }}</strong>
</td>
<td class="nation-cell">
<span class="nation-{{ player.nation | downcase }}">{{ player.nation }}</span>
</td>
<td class="cities-cell">
<span class="stat-number">{% if player.cities %}{{ player.cities }}{% endif %}</span>
</td>
<td class="ast-cell">
<span class="ast-position">{{ player.ast_pos }}</span>
</td>
<td class="score-cell">
<span class="final-score">{{ player.score }}</span>
</td>
</tr>
{% endfor %}
</tbody>
</table>
</div>
</div>

{% comment %} Game Statistics {% endcomment %}
<div class="game-stats-section">
<div class="stats-grid">
<div class="stat-item">
<div class="stat-icon">👥
</div>
<div class="stat-value">{{ game_players | size }}
</div>
<div class="stat-label">Players
</div>
</div>
<div class="stat-item">
<div class="stat-icon">🏛️
</div>
<div class="stat-value">{% assign total_cities = 0 %}{% for player in game_players %}{% if player.cities %}{% assign total_cities = total_cities | plus: player.cities %}{% endif %}{% endfor %}{% if total_cities > 0 %}{{ total_cities }}{% else %}N/A{% endif %}
</div>
<div class="stat-label">Total Cities
</div>
</div>
<div class="stat-item">
<div class="stat-icon">👑
</div>
<div class="stat-value">{% assign winner = game_players | first %}{% if winner %}<span class="nation-{{ winner.nation | downcase }}">{{ winner.nation }}</span>{% else %}TBD{% endif %}
</div>
<div class="stat-label">Winning Nation
</div>
</div>
<div class="stat-item">
<div class="stat-icon">🎯
</div>
<div class="stat-value">{% assign winner = game_players | first %}{% if winner %}{{ winner.score }}{% else %}Epic{% endif %}
</div>
<div class="stat-label">Winning Score
</div>
</div>
</div>
</div>
{% else %}
<div class="game-results-section">
<h4>📊 Game Information</h4>
<p>This epic 12-hour session brought together players for strategic civilization building. Results will be updated soon!</p>
</div>
{% endif %}
</div>

<div class="section-divider">
<span class="divider-icon">⚔️</span>
</div>

{% endfor %}

<div class="section-divider">
<span class="divider-icon">🌟</span>
</div>

## Community Achievements

<div class="achievements-section">
<div class="achievement-stats-grid">
<div class="achievement-card">
<div class="achievement-icon">🎲
</div>
<div class="achievement-number">{{ site.data.games | size }}+
</div>
<div class="achievement-label">Epic Games Completed
</div>
<div class="achievement-description">Each representing 12 hours of strategic civilization building
</div>
</div>

<div class="achievement-card">
<div class="achievement-icon">👥
</div>
<div class="achievement-number">{{ site.data.players | size }}+
</div>
<div class="achievement-label">Community Members
</div>
<div class="achievement-description">Players who have experienced the thrill of Mega Empires
</div>
</div>

<div class="achievement-card">
<div class="achievement-icon">🏛️
</div>
<div class="achievement-number">1000+
</div>
<div class="achievement-label">Cities Built
</div>
<div class="achievement-description">Civilizations expanded across ancient worlds
</div>
</div>

<div class="achievement-card">
<div class="achievement-icon">🎪
</div>
<div class="achievement-number">3+
</div>
<div class="achievement-label">Convention Games
</div>
<div class="achievement-description">Bringing Mega Empires to the broader gaming community
</div>
</div>
</div>
</div>

<div class="section-divider">
<span class="divider-icon">🚀</span>
</div>

## Ready to Join the Next Epic Session?

<div class="action-callout">
<h3>Experience the Ultimate Civilization Game</h3>
<p>Every game tells a unique story of rise and fall, conquest and diplomacy, trade and warfare. Whether you're a seasoned strategist or curious newcomer, there's a place for you in our next epic 12-hour session.</p>

<div class="cta-buttons">
<a href="/" class="cta-button primary">View Upcoming Games</a>
<a href="https://discord.torontomegaempires.com" class="cta-button secondary" target="_blank">Join Our Community</a>
</div>
</div>

---

<div class="info-callout">
<h4>📸 Photo Credits</h4>
<p>All photos captured during our epic gaming sessions, showcasing the authentic atmosphere and strategic intensity of Mega Empires gameplay. Each image tells part of the story of civilizations rising and falling across our gaming table.</p>
</div>
