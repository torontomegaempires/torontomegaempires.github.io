---
layout: games
title: Games
---
## Games

{% for game in site.data.games %}

### {{game.name}} - {{game.date}}
<table>
	<tr>
        <th>Player</th>
		<th>Nation</th>
		<th>Cities</th>
		<th>AST Position</th>
        <th>Score</th>
	</tr>
	{% for k in game.player %}
	<tr>
        <td>{{k.player}}</td>
		<td>{{k.nation}}</td>
        <td>{{k.cities}}</td>
        <td>{{k.ast_pos}}</td>
        <td>{{k.score}}</td>
	</tr>
	{% endfor %}
</table>
{% endfor %}