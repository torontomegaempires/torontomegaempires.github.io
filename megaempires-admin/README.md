# Mega Empires Database Admin Interface

A Node.js web application for managing Mega Empires board game data with full CRUD operations for games, players, nations, and game records.

## Features

- **Dashboard**: Overview with statistics and recent games
- **Games Management**: Create, read, update, and delete game sessions
- **Players Management**: Manage player information and view game history
- **Nations Management**: Manage civilizations/nations in the game
- **Game Records Management**: Detailed game records with scores, cities, AST positions, and civilization advances
- **Responsive Design**: Works on desktop and mobile devices
- **Data Validation**: Form validation with error handling
- **Confirmation Dialogs**: Safe delete operations with confirmation prompts

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Frontend**: Bootstrap 5, jQuery, EJS templating
- **UI Components**: DataTables, SweetAlert2, Bootstrap Icons

## Database Schema

### Tables
- `game` - Game sessions with name, date, final AST position, and summary
- `player` - Player information with name, display name, and Discord username
- `nation` - Civilizations/nations available in the game
- `game_player_nation` - Junction table linking games, players, and nations with detailed scoring

### Key Fields
- **Score**: Player's final score (required)
- **Cities**: Number of cities controlled
- **AST Position**: Archeological Succession Table position
- **Civilization Advances**: Three types (1VP, 3VP, 6VP)
- **Special Buildings**: Boolean flags for special building ownership
- **Bonus VP**: Boolean flag for bonus victory points

## Installation

1. **Clone or copy the project files**
2. **Install dependencies**:
   ```bash
   cd megaempires-admin
   npm install
   ```
3. **Ensure database is in place**:
   - The database file should be at `database/megaempires.db`
   - Copy your existing database or create a new one

## Usage

1. **Start the server**:
   ```bash
   npm start
   ```
2. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## Development

- **Start with auto-reload**:
  ```bash
  npm run dev
  ```
- **Database location**: `database/megaempires.db`
- **Views**: EJS templates in `views/` directory
- **Static files**: CSS, JS, and uploads in `public/` directory

## API Endpoints

### Games
- `GET /games` - List all games
- `GET /games/new` - New game form
- `POST /games` - Create game
- `GET /games/:id` - View game details
- `GET /games/:id/edit` - Edit game form
- `POST /games/:id` - Update game
- `POST /games/:id/delete` - Delete game

### Players
- `GET /players` - List all players
- `GET /players/new` - New player form
- `POST /players` - Create player
- `GET /players/:id` - View player details
- `GET /players/:id/edit` - Edit player form
- `POST /players/:id` - Update player
- `POST /players/:id/delete` - Delete player

### Nations
- `GET /nations` - List all nations
- `GET /nations/new` - New nation form
- `POST /nations` - Create nation
- `GET /nations/:id` - View nation details
- `GET /nations/:id/edit` - Edit nation form
- `POST /nations/:id` - Update nation
- `POST /nations/:id/delete` - Delete nation

### Game Records
- `GET /records` - List all game records
- `GET /records/new` - New record form
- `POST /records` - Create record
- `GET /records/:gameId/:playerId/:nationId` - View record details
- `GET /records/:gameId/:playerId/:nationId/edit` - Edit record form
- `POST /records/:gameId/:playerId/:nationId` - Update record
- `POST /records/:gameId/:playerId/:nationId/delete` - Delete record

## Data Validation

- **Required fields**: Game name, player name, nation name, score
- **Date format**: YYYY-MM-DD
- **Non-negative integers**: Scores, cities, AST positions, civilization advances
- **Boolean fields**: Rendered as checkboxes
- **Unique constraints**: Prevents duplicate player-nation combinations per game
- **Foreign key validation**: Ensures referenced entities exist

## Security Features

- **Delete confirmation**: All delete operations require confirmation
- **Input validation**: Server-side validation using express-validator
- **Error handling**: Graceful error messages and logging
- **SQL injection protection**: Parameterized queries

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
│   ├── dashboard.ejs
│   ├── error.ejs
│   └── [entity folders]/
├── public/
│   ├── css/style.css
│   ├── js/app.js
│   └── uploads/
└── database/
    └── megaempires.db
```

## Future Enhancements

- CSV import/export functionality
- Advanced reporting and analytics
- User authentication and authorization
- Backup and restore features
- API endpoints for external integrations
- Advanced search and filtering
- Data visualization charts

## License

MIT License

## Support

For issues or questions, please refer to the project documentation or create an issue in the project repository.
