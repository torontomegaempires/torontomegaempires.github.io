INSERT INTO game_player_nation ( game_id, player_id, nation_id, score )
SELECT game.id, player.id, nation.id, 107
FROM game, player, nation
where game.name = 'Game 1' AND
player.name = 'Allister' AND
nation.name = 'Hatti'