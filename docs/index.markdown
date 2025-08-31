---
layout: home
title: Home
---

# Build an Empire. Make History. Have Fun.

Toronto Mega Empires brings together strategy game enthusiasts for epic civilization-building adventures. We host the ultimate board gaming experience: **Mega Empires** - a massive game supporting up to 18 players in sessions that span 10-12 hours of pure strategic gameplay.

Think you have what it takes to guide a civilization from the ancient world to greatness?

Learn more about this legendary game at [mega-empires.com](https://mega-empires.com)

{% comment %} Next Game Highlight with Safety Check {% endcomment %}
{% if site.data.games-list and site.data.games-list.games %}
  {% assign today = site.time | date: "%Y-%m-%d" %}
  {% assign upcoming_games = site.data.games-list.games | where_exp: "game", "game.date >= today" | sort: "date" %}
  {% if upcoming_games.size > 0 %}
    {% assign next_game = upcoming_games.first %}
<div class="next-game-highlight">
  <h2 style="margin-top: 0;">🎲 Next Game</h2>
  <h3>{{ next_game.title }}</h3>
  <p><strong>Date:</strong> {{ next_game.date | date: "%B %d, %Y" }}</p>
  <p><strong>Players:</strong> Up to {{ next_game.max_players }}</p>
  {% if next_game.cost %}<p><strong>Cost:</strong> {{ next_game.cost }}</p>{% endif %}
</div>
  {% endif %}
{% else %}
  <div class="next-game-highlight">
    <h2 style="margin-top: 0;">🎲 Next Game</h2>
    <h3>Rob's Home - West</h3>
    <p><strong>Date:</strong> May 24, 2025</p>
    <p><strong>Players:</strong> Up to 9</p>
  </div>
{% endif %}

# Ready to Join the Empire?

**New players welcome!** Don't worry about experience - Mega Empires is designed to be learned as you play. Our friendly community will help you navigate your first civilization from humble beginnings to potential world dominance.

<div class="signup-section" style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h3>🏛️ Join Our Gaming Community</h3>
  <p>Get notified about upcoming games, meet fellow strategy enthusiasts, and secure your spot at the table.</p>
  
<form method="post" action="https://gaggle.email/join/torontomegaempires@gaggle.email" style="max-width: 400px;">
<div style="margin-bottom: 10px;">
  <label for="name">Name:</label><br>
  <input name="name" type="text" placeholder="Your Name" style="width: 100%; padding: 8px; margin-top: 5px;">
</div>
<div style="margin-bottom: 15px;">
  <label for="email">Email:</label><br>
  <input name="email" type="email" placeholder="Your Email Address" style="width: 100%; padding: 8px; margin-top: 5px;">
</div>
<div>
  <button type="submit" style="background: var(--brand-color, #f2cb05); padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Join the Empire</button>
</div>
</form>

<div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd;">
  <p style="margin: 5px 0; font-size: 0.9em;"><strong>Having trouble with the form?</strong></p>
  <p style="margin: 5px 0; font-size: 0.9em;">📧 Direct signup: <a href="https://gaggle.torontomegaempires.com">gaggle.torontomegaempires.com</a></p>
  <p style="margin: 5px 0; font-size: 0.9em;">💬 Join our Discord: <a href="https://discord.torontomegaempires.com">discord.torontomegaempires.com</a></p>
</div>
</div>

# Three Ways to Play

## 🏠 Cozy Home Games
**Perfect for newcomers and veterans alike**

Four times a year in Toronto's Beaches neighborhood, we host intimate 9-player games that alternate between the Western and Eastern civilizations. These all-day sessions (10am-10pm) include lunch and dinner, creating the perfect environment for both epic gameplay and great conversation.

*Scheduled: End of February, May, September, and November*

## 🏛️ Mega MiniCon
**The full experience with maximum players**

Twice yearly at The Guild House, we unleash the complete 18-player Mega Empires experience. This is strategy gaming at its most ambitious - a full day of civilization building with every nation in play simultaneously.

*January & June • $10 table fee per player*

## 🎪 Convention Gaming
**Join us at gaming events**

We're regulars at the Niagara Boardgame Weekend, where Mega Empires has become a Thursday tradition. It's a great way to experience the game in a festival atmosphere surrounded by fellow board game enthusiasts.

# What Makes Mega Empires Special?

This isn't just any board game - it's a **gaming event**. Mega Empires evolved from the classic Civilization by Francis Tresham, expanded through years of passionate fan development. The result? An unparalleled strategy experience that balances:

- **Trade & Diplomacy**: Negotiate, form alliances, and broker deals
- **Civilization Building**: Develop technologies and advance your society  
- **Strategic Warfare**: When diplomacy fails, armies march
- **Epic Scale**: Games span millennia of human development

Read the full development story at [mega-empires.com/history](https://mega-empires.com/history/)

# Upcoming Games

{% if site.data.games-list and site.data.games-list.games %}
  {% assign today = site.time | date: "%Y-%m-%d" %}
  {% assign upcoming_games = site.data.games-list.games | where_exp: "game", "game.date >= today" | sort: "date" %}
  {% if upcoming_games.size > 0 %}
<div class="games-list">
{% for game in upcoming_games limit: 6 %}
<div class="game-card">
  <h4 style="margin-top: 0;">{{ game.title }}</h4>
  <p><strong>{{ game.date | date: "%B %d, %Y" }}</strong></p>
  <p>{{ game.max_players }} players • {{ game.variant | capitalize }}</p>
  {% if game.cost %}<p><em>{{ game.cost }}</em></p>{% endif %}
</div>
{% endfor %}
</div>
  {% endif %}
{% else %}
  <div class="games-list">
    <div class="game-card">
      <h4 style="margin-top: 0;">Rob's Home - West</h4>
      <p><strong>May 24, 2025</strong></p>
      <p>9 players • West</p>
    </div>
    <div class="game-card">
      <h4 style="margin-top: 0;">The Guild House MiniCon</h4>
      <p><strong>June 14, 2025</strong></p>
      <p>18 players • Full Experience</p>
      <p><em>$10 per player</em></p>
    </div>
  </div>
{% endif %}

# Host Your Own Empire

**Have a great venue?** We're always seeking new locations throughout the Greater Toronto Area. Whether you have a community center, game store, or spacious home, we'd love to help you organize an epic Mega Empires event.

Contact [{{ site.author.email }}](mailto:{{ site.author.email }}) and we'll handle the logistics:
- Player recruitment and coordination
- Game setup and instruction  
- Rules teaching for new players
- All necessary materials and components

*Especially seeking venues accessible to out-of-town players*