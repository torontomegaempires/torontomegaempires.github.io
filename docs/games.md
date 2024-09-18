---
layout: base
title: Games
---
## All Games

<table>
	<tr>
		<th>Game</th>
		<th>Date</th>
		<th>Nation</th>
        <th>Player</th>
        <th>Score</th>
	</tr>
	{% for k in site.data.games %}
	<tr>
		<td>{{k.game}}</td>
		<td>{{k.date}}</td>
		<td>{{k.nation}}</td>
        <td>{{k.player}}</td>
        <td>{{k.score}}</td>
	</tr>
	{% endfor %}
</table>