select game.name as game, game.date, nation.name as nation, player.display as player, game_player_nation.score from game_player_nation
join player, game, nation on 
	game_player_nation.player_id=player.id and 
	game_player_nation.game_id=game.id AND
	game_player_nation.nation_id=nation.id
order by score desc