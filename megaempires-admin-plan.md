# Mega Empires Database Admin Interface - Project Plan

## Project Overview
A standalone Node.js web application with a clean, responsive interface for managing game records, players, nations, and detailed game statistics for the Mega Empires board game tracking system.

## Database Schema Analysis

### Tables Structure
1. **game** - Game sessions
   - `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT)
   - `name` (TEXT) - Game name (e.g., "Game 15")
   - `date` (TEXT) - Game date in YYYY-MM-DD format
   - `final_ast_pos` (INTEGER) - Final Archeological Succession Table position
   - `game_summary` (TEXT) - Optional detailed game summary

2. **player** - Game participants
   - `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT)
   - `name` (TEXT) - Player name
   - `display` (TEXT) - Display name
   - `discord` (TEXT) - Discord username

3. **nation** - Civilizations/Nations in the game
   - `id` (INTEGER, PRIMARY KEY)
   - `name` (TEXT, NOT NULL, UNIQUE) - Nation name

4. **game_player_nation** - Junction table for game records
   - `game_id` (INTEGER, FK to game.id)
   - `player_id` (INTEGER, FK to player.id)
   - `nation_id` (INTEGER, FK to nation.id)
   - `score` (INTEGER) - Player's score
   - `cities` (INTEGER) - Number of cities
   - `ast_pos` (INTEGER) - AST position
   - `num_civ_adv_1VP` (INTEGER) - Number of 1-point civilization advances
   - `num_civ_adv_3VP` (INTEGER) - Number of 3-point civilization advances
   - `num_civ_adv_6VP` (INTEGER) - Number of 6-point civilization advances
   - `special_building` (INTEGER, DEFAULT 0) - Has special building (boolean)
   - `special_building_own` (INTEGER, DEFAULT 0) - Owns special building (boolean)
   - `bonus_vp` (INTEGER, DEFAULT 0) - Has bonus victory points (boolean)

## Technical Architecture

### Backend Stack
- **Node.js** with **Express.js** framework
- **SQLite3** for database operations (using existing megaempires.db)
- **EJS** for server-side templating
- **Express-validator** for input validation
- **Multer** for CSV file uploads (to maintain secondary workflow)

### Frontend Stack
- **Bootstrap 5** for responsive UI components
- **Vanilla JavaScript** for client-side interactions
- **SweetAlert2** for confirmation dialogs (delete operations)
- **DataTables** for sortable/searchable data grids

## Core Features & CRUD Operations

### 1. Games Management
- **Create**: Form with fields for name, date, final AST position, and game summary
- **Read**: Paginated list with search/filter capabilities
- **Update**: Edit existing games with validation
- **Delete**: Confirmation dialog before deletion

### 2. Players Management
- **Create**: Form for name, display name, and Discord username
- **Read**: Player list with game participation history
- **Update**: Edit player information
- **Delete**: Confirmation with check for existing game records

### 3. Nations Management
- **Create**: Simple form for nation name
- **Read**: Nations list (likely rarely modified)
- **Update**: Edit nation names
- **Delete**: Confirmation with dependency checking

### 4. Game Records Management (Most Complex)
- **Create**: Comprehensive form with:
  - Game selection dropdown
  - Player selection dropdown
  - Nation selection dropdown
  - Score (required integer)
  - Cities (optional integer)
  - AST Position (optional integer)
  - Civilization advances (3 separate non-negative integer fields)
  - Checkboxes for: Special Building, Special Building Own, Bonus VP
- **Read**: Comprehensive view with joins showing game name, player name, nation name
- **Update**: Edit all game record fields
- **Delete**: Confirmation dialog

## Data Validation Rules
- **Dates**: YYYY-MM-DD format validation
- **Integers**: Non-negative validation for scores, cities, AST positions, civ advances
- **Required Fields**: Game name, player name, nation name, score
- **Unique Constraints**: Prevent duplicate player-nation combinations per game
- **Foreign Key Validation**: Ensure referenced IDs exist

## User Interface Design

### Navigation Structure
```
Dashboard (Home)
├── Games
│   ├── View All Games
│   ├── Add New Game
│   └── Game Details (with records)
├── Players
│   ├── View All Players
│   └── Add/Edit Player
├── Nations
│   ├── View All Nations
│   └── Add/Edit Nation
└── Game Records
    ├── View All Records
    ├── Add New Record
    └── Bulk Import (CSV)
```

### Key UI Components
- **Dashboard**: Summary statistics and recent activity
- **Data Tables**: Sortable, searchable, paginated lists
- **Forms**: Clean, validated input forms with helpful labels
- **Confirmation Modals**: For all delete operations
- **Success/Error Messages**: Clear feedback for all operations

## File Structure
```
megaempires-admin/
├── package.json
├── app.js (main server file)
├── routes/
│   ├── games.js
│   ├── players.js
│   ├── nations.js
│   └── records.js
├── models/
│   ├── database.js
│   ├── game.js
│   ├── player.js
│   ├── nation.js
│   └── gameRecord.js
├── views/
│   ├── layout.ejs
│   ├── dashboard.ejs
│   ├── games/
│   ├── players/
│   ├── nations/
│   └── records/
├── public/
│   ├── css/
│   ├── js/
│   └── uploads/
└── database/
    └── megaempires.db (symlink to existing)
```

## Additional Features
- **CSV Import**: Maintain compatibility with existing Python workflow
- **Export Functionality**: Export data to CSV for backup/analysis
- **Search & Filtering**: Across all major entities
- **Responsive Design**: Works on desktop and mobile
- **Error Handling**: Graceful error messages and logging

## Development Phases
1. **Setup & Database Connection** (Basic Express app + SQLite)
2. **Core CRUD for Players & Nations** (Simpler entities first)
3. **Games Management** (Including game summary field)
4. **Game Records Management** (Most complex relationships)
5. **CSV Import/Export Features**
6. **UI Polish & Validation Enhancement**
7. **Testing & Documentation**

## Requirements Summary
- Single-user admin interface
- Replace CSV workflow as primary method (keep as secondary)
- AST = Archeological Succession Table (civilization development tracking)
- Civilization advance fields are non-negative integers
- Boolean fields should be checkboxes
- Standalone Node.js application
- Confirmation dialogs for all delete operations
- Basic type checking and validation
