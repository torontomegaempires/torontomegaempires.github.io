INSERT INTO game_player_nation ( game_id, player_id, nation_id, score )
SELECT game.id, player.id, nation.id, ?
FROM game, player, nation
where game.name = ? AND
player.name = ? AND
nation.name = ?
