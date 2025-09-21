-- Add special_building_control column to game_player_nation table
-- This column indicates whether the player controls their special building
-- Defaults to 0 (false) for all existing records

ALTER TABLE game_player_nation ADD COLUMN special_building_control INTEGER DEFAULT 0;
