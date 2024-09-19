BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "game" (
	"id"	INTEGER UNIQUE,
	"name"	TEXT,
	"date"	TEXT,
	"final_ast_pos"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "game_player_nation" (
	"game_id"	INTEGER,
	"player_id"	INTEGER,
	"nation_id"	INTEGER,
	"cities"	INTEGER,
	"score"	INTEGER,
	"ast_pos"	INTEGER,
	CONSTRAINT "game_id_fk" FOREIGN KEY("game_id") REFERENCES "game"("id"),
	CONSTRAINT "nation_id_fk" FOREIGN KEY("nation_id") REFERENCES "nation"("id"),
	CONSTRAINT "player_id_fk" FOREIGN KEY("player_id") REFERENCES "player"("id")
);
CREATE TABLE IF NOT EXISTS "nation" (
	"id"	INTEGER UNIQUE,
	"name"	TEXT NOT NULL UNIQUE,
	"rank"	INTEGER UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "player" (
	"id"	INTEGER UNIQUE,
	"name"	TEXT,
	"display"	TEXT,
	"discord"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
COMMIT;
