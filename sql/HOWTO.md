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

## Adding a new MegaCon game

Follow the same procedure above but the file name is megaconXXX-record.csv
