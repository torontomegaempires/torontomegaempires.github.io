# Database Schema Changes

## game_player_nation Table Modifications

**Date:** August 31, 2025

### Added Columns

The following columns were added to the `game_player_nation` table:

| Column Name | Data Type | Default | Nullable | Description |
|-------------|-----------|---------|----------|-------------|
| `num_civ_adv_1VP` | INTEGER | NULL | Yes | Number of 1-point civilization advances |
| `num_civ_adv_3VP` | INTEGER | NULL | Yes | Number of 3-point civilization advances |
| `num_civ_adv_6VP` | INTEGER | NULL | Yes | Number of 6-point civilization advances |
| `special_building` | INTEGER | 0 | Yes | Boolean flag for special building (0=false, 1=true) |
| `special_building_own` | INTEGER | 0 | Yes | Boolean flag for owning special building (0=false, 1=true) |
| `bonus_vp` | INTEGER | 0 | Yes | Boolean flag for bonus victory points (0=false, 1=true) |

### Implementation Details

- All new columns are nullable to preserve existing data integrity
- Boolean columns use SQLite's INTEGER type with 0/1 values
- Default values are set for boolean columns (0 = false)
- A backup of the original database was created before modifications

### Files Modified

- `sql/alter-game-player-nation-table.sql` - Contains the ALTER TABLE statements
- Database backup created: `docs/_db/megaempires.db.backup`

### Data Integrity

- Total records before: 129
- Total records after: 129 (confirmed no data loss)
- All existing columns and data remain unchanged
- New columns properly initialized with NULL or default values
