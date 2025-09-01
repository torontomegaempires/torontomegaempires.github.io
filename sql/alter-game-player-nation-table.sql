-- Add new columns to game_player_nation table
-- All columns are nullable to preserve existing data

-- Add civilization advancement columns (positive integers)
ALTER TABLE game_player_nation ADD COLUMN num_civ_adv_1VP INTEGER;
ALTER TABLE game_player_nation ADD COLUMN num_civ_adv_3VP INTEGER;
ALTER TABLE game_player_nation ADD COLUMN num_civ_adv_6VP INTEGER;

-- Add boolean columns (SQLite uses INTEGER 0/1 for boolean)
ALTER TABLE game_player_nation ADD COLUMN special_building INTEGER DEFAULT 0;
ALTER TABLE game_player_nation ADD COLUMN special_building_own INTEGER DEFAULT 0;
ALTER TABLE game_player_nation ADD COLUMN bonus_vp INTEGER DEFAULT 0;
