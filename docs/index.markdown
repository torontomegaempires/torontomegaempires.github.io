---
layout: home
title: Home
---

# Welcome

Welcome to the home site of the Toronto Mega Empires group. We organize games of the biggest civilization building game ever made - supporting up to 18 players and taking 10 to 12 hours to play.

You can learn more about this epic event game by Colossus Games at [https://mega-empires.com](https://mega-empires.com)

{% comment %} Next Game Highlight with Safety Check {% endcomment %}
{% if site.data.games and site.data.games.games %}
  {% assign today = site.time | date: "%Y-%m-%d" %}
  {% assign upcoming_games = site.data.games.games | where_exp: "game", "game.date >= today" | sort: "date" %}
  {% if upcoming_games.size > 0 %}
    {% assign next_game = upcoming_games.first %}
    <div class="next-game-highlight" style="background: var(--brand-color, #f2cb05); padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h2 style="margin-top: 0;">🎲 Next Game</h2>
      <h3>{{ next_game.title }}</h3>
      <p><strong>Date:</strong> {{ next_game.date | date: "%B %d, %Y" }}</p>
      <p><strong>Players:</strong> Up to {{ next_game.max_players }}</p>
      {% if next_game.cost %}<p><strong>Cost:</strong> {{ next_game.cost }}</p>{% endif %}
    </div>
  {% endif %}
{% else %}
  <div class="next-game-highlight" style="background: var(--brand-color, #f2cb05); padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h2 style="margin-top: 0;">🎲 Next Game</h2>
    <h3>Rob's Home - West</h3>
    <p><strong>Date:</strong> May 24, 2025</p>
    <p><strong>Players:</strong> Up to 9</p>
  </div>
{% endif %}

# How to get into a game

<div class="signup-section" style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h3>Join our mailing list to be notified of games</h3>
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
      <button type="submit" style="background: var(--brand-color, #f2cb05); padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Join Mega Empires</button>
    </div>
  </form>
  
  <p style="margin-top: 15px; font-size: 0.9em;">
    Having trouble? Use this link: <a href="https://gaggle.torontomegaempires.com">gaggle.torontomegaempires.com</a><br>
    Join our Discord: <a href="https://discord.torontomegaempires.com">discord.torontomegaempires.com</a>
  </p>
</div>

# Game Types

## Home Game
We play a 9 player game 4 times a year in the Beaches neighbourhood of Toronto at the end of February, May, September, and November, alternating between [Mega Empires: The West](https://boardgamegeek.com/boardgame/267304/mega-empires-the-west) and [Mega Empires: The East](https://boardgamegeek.com/boardgame/338980/mega-empires-the-east). It's an all-day event from 10am to 10pm with a fee requested to cover lunch and dinner food.

## Mega MiniCon
The Mega MiniCon takes place in January and June at [The Guild House](https://theguildhouse.ca) and is a full 18 player game from 10am to 10pm. The Guild House charges an $10 table fee per player.

## Niagara Boardgame Weekend
A game of [Mega Empires: The West](https://boardgamegeek.com/boardgame/267304/mega-empires-the-west) at the [Niagara Boardgame Weekend](https://www.niagaraboardgaming.com) has been a regular feature of the Thursday opening day for the past two years.

# Upcoming Games

{% if site.data.games and site.data.games.games %}
  {% assign today = site.time | date: "%Y-%m-%d" %}
  {% assign upcoming_games = site.data.games.games | where_exp: "game", "game.date >= today" | sort: "date" %}
  {% if upcoming_games.size > 0 %}
    <div class="games-list">
    {% for game in upcoming_games limit: 6 %}
      <div class="game-card" style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 6px;">
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
    <div class="game-card" style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 6px;">
      <h4 style="margin-top: 0;">Rob's Home - West</h4>
      <p><strong>May 24, 2025</strong></p>
      <p>9 players • West</p>
    </div>
    
    <div class="game-card" style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 6px;">
      <h4 style="margin-top: 0;">The Guild House</h4>
      <p><strong>June 14, 2025</strong></p>
      <p>18 players • Full Game</p>
      <p><em>$8.50 per player</em></p>
    </div>
  </div>
{% endif %}

# History of the game

Mega Empires was first released as Mega Civilization and was the culmination of years of fan work on the online CivProject to create an expanded version of the classic boardgame Civilization by Francis Tresham. You can read all about the history of its development at [https://mega-empires.com/history/](https://mega-empires.com/history/)

# Hosting your own game

We're always looking for more venues and locations to host a game of Mega Empires. If you know of one feel free to contact [{{ site.author.email }}](mailto:{{ site.author.email }}) who'll help you organize the game and find players. We're especially interested in venues in the GTA to better accommodate our out of town players.