INSERT INTO game_player_nation ( game_id, player_id, nation_id, score )
SELECT game.id, player.id, nation.id, 100
FROM game, player, nation
where game.name = 'Game 1' AND
player.name = 'Sandy' AND
nation.name = 'Egypt'