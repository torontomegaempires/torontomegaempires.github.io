---
layout: base
title: Players
---
## All Players

{{ site.data.players }}
<ul>
{% for member in site.data.members %}
  <li>
    <a href="https://github.com/{{ member.github }}">
      {{ member.name }}
    </a>
  </li>
{% endfor %}
</ul>

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
		<td>{{k.email}}</td>
		<td>{{k.discord}}</td>
	</tr>
	{% endfor %}
</table>