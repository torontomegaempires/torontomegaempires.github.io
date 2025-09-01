-- Add game_summary column to game table
-- Date: September 1, 2025
-- Description: Adds a CLOB column to store game summaries

-- NOTE: Create backup manually before running this script:
-- cp docs/_db/megaempires.db docs/_db/megaempires.db.backup-YYYYMMDD

-- Add the game_summary column as TEXT (SQLite's equivalent to CLOB)
ALTER TABLE game ADD COLUMN game_summary TEXT;

-- Verify the change
.schema game

-- Show sample data to confirm structure
SELECT id, name, date, final_ast_pos, 
       CASE 
           WHEN game_summary IS NULL THEN 'NULL'
           ELSE substr(game_summary, 1, 50) || '...'
       END as summary_preview
FROM game LIMIT 5;
