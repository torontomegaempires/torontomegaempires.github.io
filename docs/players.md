---
layout: base
title: Players
---
## All Players

<table>
	<tr>
		<th>Name</th>
		<th>Display</th>
		<th>Email</th>
		<th>Discord</th>
	</tr>
	{% for k in site.data.players %}
	<tr>
		<td>{{k.name}}</td>
		<td>{{k.display}}</td>
		<td>{{k.discord}}</td>
	</tr>
	{% endfor %}
</table>