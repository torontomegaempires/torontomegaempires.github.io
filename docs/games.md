---
layout: base
title: Games
---
## Games

{% for game in site.data.games %}

### {{game.name}} - {{game.date}}
<table>
	<tr>
        <th>Player</th>
		<th>Nation</th>
        <th>Score</th>
	</tr>
	{% for k in game.player %}
	<tr>
        <td>{{k.player}}</td>
		<td>{{k.nation}}</td>
        <td>{{k.score}}</td>
	</tr>
	{% endfor %}
</table>
{% endfor %}