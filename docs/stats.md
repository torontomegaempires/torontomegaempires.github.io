---
layout: page
title: Stats
---

<div class="hero-section">
<h1 class="hero-title">Statistics</h1>
<p class="hero-subtitle">Numbers from {{ site.data.games | size }} epic games of civilization building</p>
</div>

<div class="section-divider">
<span class="divider-icon">📊</span>
</div>

## Overall Records

<div class="achievement-stats-grid">

<div class="achievement-card">
<div class="achievement-icon">🎲
</div>
<div class="achievement-number">{{ site.data.games | size }}
</div>
<div class="achievement-label">Games Played
</div>
</div>

<div class="achievement-card">
<div class="achievement-icon">👥
</div>
<div class="achievement-number">{{ site.data.player_stats | size }}
</div>
<div class="achievement-label">Regular Players
</div>
<div class="achievement-description">{{ site.data.players | size }} total unique players
</div>
</div>

{% assign top_score = site.data.player_stats | sort: "max_score" | reverse | first %}
<div class="achievement-card">
<div class="achievement-icon">🏆
</div>
<div class="achievement-number">{{ top_score.max_score }}
</div>
<div class="achievement-label">Highest Score Ever
</div>
<div class="achievement-description">{{ top_score.player }}
</div>
</div>

{% assign most_wins = site.data.player_stats | sort: "wins" | reverse | first %}
<div class="achievement-card">
<div class="achievement-icon">👑
</div>
<div class="achievement-number">{{ most_wins.wins }}
</div>
<div class="achievement-label">Most Wins
</div>
<div class="achievement-description">{{ most_wins.player }}
</div>
</div>

</div>

<div class="section-divider">
<span class="divider-icon">👑</span>
</div>

## Champion Roll

{% assign sorted_winners = site.data.game_winners | sort: "game_date" | reverse %}
{% assign current_year = "" %}
<div class="results-table-wrapper">
<table class="results-table">
<thead>
<tr>
<th>Game</th>
<th>Date</th>
<th>Winner</th>
<th>Nation</th>
<th>Winner Score</th>
<th>Avg Score</th>
<th>Median Score</th>
</tr>
</thead>
<tbody>
{% for w in sorted_winners %}
{% assign this_year = w.game_date | date: "%Y" %}
{% if this_year != current_year %}
{% assign current_year = this_year %}
<tr class="year-header-row"><td colspan="7">{{ this_year }}</td></tr>
{% endif %}
<tr class="winner-row">
<td><a href="/games/#gr-{{ w.game_id }}">{{ w.game_name }}</a></td>
<td>{{ w.game_date | date: "%b %d" }}</td>
<td><strong>{{ w.winner }}</strong></td>
<td><span class="nation-{{ w.nation | downcase }}">{{ w.nation }}</span></td>
<td><span class="final-score">{{ w.score }}</span></td>
<td class="stat-number">{{ w.avg_score }}</td>
<td class="stat-number">{{ w.median_score }}</td>
</tr>
{% endfor %}
</tbody>
</table>
</div>

<div class="section-divider">
<span class="divider-icon">⚔️</span>
</div>

## Player Leaderboard

{% assign total_players = site.data.players | size %}
{% assign leaderboard_players = site.data.player_stats | size %}
{% assign excluded_count = total_players | minus: leaderboard_players %}
<p class="text-muted">Includes players with 2+ games. {{ excluded_count }} player{% if excluded_count != 1 %}s{% endif %} not shown. Ranked by wins, then top 3%, then average score.</p>

<div class="results-table-wrapper">
<table class="results-table">
<thead>
<tr>
<th>#</th>
<th>Player</th>
<th>Games</th>
<th>Wins</th>
<th>Win %</th>
<th>Top 3</th>
<th>Top 3%</th>
<th>Avg Score</th>
<th>Best Score</th>
</tr>
</thead>
<tbody>
{% assign rank = 0 %}
{% for p in site.data.player_stats %}
{% assign rank = rank | plus: 1 %}
{% assign win_pct = p.wins | times: 100.0 | divided_by: p.games_played | round %}
{% assign top3_pct = p.top3 | times: 100.0 | divided_by: p.games_played | round %}
<tr {% if rank == 1 %}class="winner-row"{% elsif rank <= 3 %}class="podium-row"{% endif %}>
<td class="ast-cell"><span class="ast-position">{{ rank }}</span></td>
<td class="player-cell"><strong>{{ p.player }}</strong></td>
<td class="stat-number">{{ p.games_played }}</td>
<td class="stat-number">{{ p.wins }}</td>
<td class="stat-number">{{ win_pct }}%</td>
<td class="stat-number">{{ p.top3 }}</td>
<td class="stat-number">{{ top3_pct }}%</td>
<td class="stat-number">{{ p.avg_score }}</td>
<td class="score-cell"><span class="final-score">{{ p.max_score }}</span></td>
</tr>
{% endfor %}
</tbody>
</table>
</div>

<div class="section-divider">
<span class="divider-icon">📈</span>
</div>

## Player Skill Rating

<p class="text-muted">Includes players with 3+ games. For each game, your score is compared to the average score of everyone who played that game, adjusted for how spread out the scores were — so a strong result in a high-scoring game counts the same as a strong result in a low-scoring game. These per-game ratings are then averaged across all your games. A rating of +1.0 means you score roughly one standard deviation above your opponents on average; 0.0 means you match the field; negative means below the field average.</p>

<div class="results-table-wrapper">
<table class="results-table">
<thead>
<tr>
<th>#</th>
<th>Player</th>
<th>Games</th>
<th>Wins</th>
<th>Skill Rating</th>
</tr>
</thead>
<tbody>
{% assign rank = 0 %}
{% for p in site.data.player_zscore %}
{% assign rank = rank | plus: 1 %}
<tr {% if rank == 1 %}class="winner-row"{% elsif rank <= 3 %}class="podium-row"{% endif %}>
<td class="ast-cell"><span class="ast-position">{{ rank }}</span></td>
<td class="player-cell"><strong>{{ p.player }}</strong></td>
<td class="stat-number">{{ p.games_played }}</td>
<td class="stat-number">{{ p.wins }}</td>
<td class="stat-number">{% if p.avg_z_score > 0 %}+{% endif %}{{ p.avg_z_score }}</td>
</tr>
{% endfor %}
</tbody>
</table>
</div>

<div class="section-divider">
<span class="divider-icon">🏛️</span>
</div>

## Nation Performance

<div class="results-table-wrapper">
<table class="results-table">
<thead>
<tr>
<th>Nation</th>
<th>Played</th>
<th>Wins</th>
<th>Win %</th>
<th>Avg Score</th>
<th>Best Score</th>
</tr>
</thead>
<tbody>
{% assign sorted_by_avg = site.data.nation_stats | sort: "avg_score" | reverse %}
{% assign sorted_nations = sorted_by_avg | sort: "wins" | reverse %}
{% for n in sorted_nations %}
{% assign win_pct = n.wins | times: 100.0 | divided_by: n.times_played | round %}
<tr>
<td class="nation-cell"><span class="nation-{{ n.nation | downcase }}">{{ n.nation }}</span></td>
<td class="stat-number">{{ n.times_played }}</td>
<td class="stat-number">{{ n.wins }}</td>
<td class="stat-number">{{ win_pct }}%</td>
<td class="stat-number">{{ n.avg_score }}</td>
<td class="score-cell"><span class="final-score">{{ n.max_score }}</span></td>
</tr>
{% endfor %}
</tbody>
</table>
</div>
