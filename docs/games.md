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

{% comment %} Photo Gallery Section {% endcomment %}
{% assign photo_folder = game.date %}
{% assign photo_path = "/assets/images/games/" | append: photo_folder | append: "/" %}

{% comment %} Check for photos based on known game dates {% endcomment %}
{% if game.date == "2024-05-25" %}
<div class="photo-gallery-section">
<div class="photo-gallery-grid">
<img src="{{ photo_path }}0e7a95a5-7105-45e7-ab6e-e52234bdf2ed.jpg" alt="Game 10 - Epic moments" class="gallery-photo featured-photo" loading="lazy">
<img src="{{ photo_path }}37d7869e-c004-4510-988d-f360042911b0.jpg" alt="Game 10 - Strategic planning" class="gallery-photo" loading="lazy">
<img src="{{ photo_path }}569cab4f-9f49-4fc8-8840-5b72fe9443c7.jpg" alt="Game 10 - Civilization building" class="gallery-photo" loading="lazy">
<img src="{{ photo_path }}645914be-e476-4448-b00d-a81127e66210.jpg" alt="Game 10 - Player interactions" class="gallery-photo" loading="lazy">
<img src="{{ photo_path }}c65a3bb1-371a-4857-91e5-d32caf149599.jpg" alt="Game 10 - Board overview" class="gallery-photo" loading="lazy">
<img src="{{ photo_path }}e0c37107-7d2f-4741-a49e-944dee0c2e31.jpg" alt="Game 10 - Final positions" class="gallery-photo" loading="lazy">
</div>
<div class="photo-gallery-caption">
<p>🏠 <strong>Home Game</strong> - An intimate 9-player session showcasing the strategic depth and social atmosphere of our Toronto gaming community.</p>
</div>
</div>
{% elsif game.date == "2024-09-21" %}
<div class="photo-gallery-section">
<div class="photo-gallery-grid">
<img src="{{ photo_path }}IMG_1603.jpg" alt="Game 11 - Strategic gameplay" class="gallery-photo featured-photo" loading="lazy">
<img src="{{ photo_path }}IMG_1604.jpg" alt="Game 11 - Player focus" class="gallery-photo" loading="lazy">
<img src="{{ photo_path }}IMG_1605.jpg" alt="Game 11 - Civilization progress" class="gallery-photo" loading="lazy">
</div>
<div class="photo-gallery-caption">
<p>🏠 <strong>Home Game</strong> - Intense strategic moments as civilizations clash and alliances form across the ancient world.</p>
</div>
</div>
{% elsif game.date == "2025-01-18" %}
<div class="photo-gallery-section">
<div class="photo-gallery-grid">
<img src="{{ photo_path }}IMG_1884_Large.jpeg" alt="MegaCon Winter 25 - Convention atmosphere" class="gallery-photo featured-photo" loading="lazy">
<img src="{{ photo_path }}IMG_1885_Large.jpeg" alt="MegaCon Winter 25 - Epic scale gaming" class="gallery-photo" loading="lazy">
</div>
<div class="photo-gallery-caption">
<p>🎪 <strong>MegaCon Winter 25</strong> - Our community takes center stage at Toronto's premier gaming convention, showcasing Mega Empires to a broader audience.</p>
</div>
</div>
{% elsif game.date == "2025-01-23" %}
<div class="photo-gallery-section">
<div class="photo-gallery-grid">
<img src="/assets/images/games/2025-01-23/IMG_1886.jpeg" alt="Niagara Boardgame Weekend - Convention gaming" class="gallery-photo featured-photo" loading="lazy">
<img src="/assets/images/games/2025-01-23/IMG_1887.jpeg" alt="Niagara Boardgame Weekend - Strategic discussions" class="gallery-photo" loading="lazy">
<img src="/assets/images/games/2025-01-23/IMG_1888.jpeg" alt="Niagara Boardgame Weekend - Player engagement" class="gallery-photo" loading="lazy">
<img src="/assets/images/games/2025-01-23/IMG_1889.jpeg" alt="Niagara Boardgame Weekend - Epic moments" class="gallery-photo" loading="lazy">
<img src="/assets/images/games/2025-01-23/IMG_1890.jpeg" alt="Niagara Boardgame Weekend - Community spirit" class="gallery-photo" loading="lazy">
<img src="/assets/images/games/2025-01-23/IMG_1891.jpeg" alt="Niagara Boardgame Weekend - Final celebration" class="gallery-photo" loading="lazy">
</div>
<div class="photo-gallery-caption">
<p>🌟 <strong>Niagara Boardgame Weekend</strong> - Toronto Mega Empires expands beyond the city, bringing our epic gaming experience to Ontario's broader gaming community.</p>
</div>
</div>
{% elsif game.date == "2025-03-01" %}
<div class="photo-gallery-section">
<div class="photo-gallery-grid">
<img src="/assets/images/games/2025-03-04/photo1.jpeg" alt="Game 13 - The East - Strategic positioning" class="gallery-photo featured-photo" loading="lazy">
<img src="/assets/images/games/2025-03-04/photo2.jpeg" alt="Game 13 - The East - Civilization development" class="gallery-photo" loading="lazy">
<img src="/assets/images/games/2025-03-04/photo3.jpeg" alt="Game 13 - The East - Epic conclusion" class="gallery-photo" loading="lazy">
</div>
<div class="photo-gallery-caption">
<p>🏠 <strong>The East Variant</strong> - Exploring the eastern civilizations with their unique challenges and opportunities for expansion and trade.</p>
</div>
</div>
{% elsif game.date == "2025-05-24" %}
<div class="photo-gallery-section">
<div class="photo-gallery-grid">
<img src="{{ photo_path }}photo1.jpeg" alt="Game 14 - The West - Opening moves" class="gallery-photo featured-photo" loading="lazy">
<img src="{{ photo_path }}photo2.jpeg" alt="Game 14 - The West - Mid-game strategy" class="gallery-photo" loading="lazy">
<img src="{{ photo_path }}ast-positions.jpeg" alt="Game 14 - The West - Final AST positions" class="gallery-photo winner-photo" loading="lazy">
</div>
<div class="photo-gallery-caption">
<p>🏠 <strong>The West Variant</strong> - Our most recent epic session featuring the western civilizations. The final AST position photo shows the culmination of 12 hours of strategic gameplay.</p>
</div>
</div>
{% endif %}

{% comment %} Winner Spotlight {% endcomment %}
{% if site.data.game_players %}
{% assign winner = site.data.game_players | where: "game_id", game.id | where: "ast_pos", 1 | first %}
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
