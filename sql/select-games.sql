select game.name, game.date, nation.name, player.display, game_player_nation.score from game_player_nation
join player, game, nation on 
	game_player_nation.player_id=player.id and 
	game_player_nation.game_id=game.id AND
	game_player_nation.nation_id=nation.id