# How to add a new game

Use DB Browser for SQLite and open /docs/_db/megaempires.db

## Adding a new game

Use `insert-game.sql` to add the game record.

## Adding a new game record

1. Copy an existing gameXX-record.csv file and name it based on the game number
2. Edit the file to change the players and scores
3. If a new player is needed, use `insert-player.sql`
4. Run `./insert-game.py gameXX-record.csv`
5. If there are errors, correct them in the csv file and try again.
6. Commit all changes and push

### CSV Format Options

**Basic format (backward compatible):**
```
"Game Name","Player Name","Nation",score,cities,ast_position
```

**Extended format (with new columns):**
```
"Game Name","Player Name","Nation",score,cities,ast_position,num_civ_adv_1VP,num_civ_adv_3VP,num_civ_adv_6VP,special_building,special_building_own,bonus_vp,"game_summary"
```

**New Column Descriptions:**
- `num_civ_adv_1VP`: Number of 1-point civilization advances (integer)
- `num_civ_adv_3VP`: Number of 3-point civilization advances (integer)
- `num_civ_adv_6VP`: Number of 6-point civilization advances (integer)
- `special_building`: Has special building (0=false, 1=true)
- `special_building_own`: The special building is their own (0=false, 1=true)
- `bonus_vp`: Has bonus victory points (0=false, 1=true)
- `game_summary`: Text summary/notes about the game (quoted string)

**Note:** All columns after `score` are optional. Empty values will be stored as NULL in the database.

## Adding a new MegaCon game

Follow the same procedure above but the file name is megaconXXX-record.csv
