-- Add special_building_control column to game_player_nation table
-- This column counts how many buildings the player controls
-- Defaults to 0 for all existing records

ALTER TABLE game_player_nation ADD COLUMN special_building_control INTEGER DEFAULT 0;
