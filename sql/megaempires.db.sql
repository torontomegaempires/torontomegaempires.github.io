BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "game" (
	"id"	INTEGER UNIQUE,
	"name"	TEXT,
	"date"	TEXT,
	"final_ast_pos"	INTEGER,
	"game_summary"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "game_player_nation" (
	"game_id"	INTEGER,
	"player_id"	INTEGER,
	"nation_id"	INTEGER,
	"cities"	INTEGER,
	"score"	INTEGER,
	"ast_pos"	INTEGER,
	"num_civ_adv_1VP"	INTEGER,
	"num_civ_adv_3VP"	INTEGER,
	"num_civ_adv_6VP"	INTEGER,
	"special_building"	INTEGER DEFAULT 0,
	"special_building_own"	INTEGER DEFAULT 0,
	"bonus_vp"	INTEGER DEFAULT 0,
	"special_building_control"	INTEGER DEFAULT 0,
	CONSTRAINT "game_id_fk" FOREIGN KEY("game_id") REFERENCES "game"("id"),
	CONSTRAINT "nation_id_fk" FOREIGN KEY("nation_id") REFERENCES "nation"("id"),
	CONSTRAINT "player_id_fk" FOREIGN KEY("player_id") REFERENCES "player"("id")
);
CREATE TABLE IF NOT EXISTS "nation" (
	"id"	INTEGER UNIQUE,
	"name"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "player" (
	"id"	INTEGER UNIQUE,
	"name"	TEXT,
	"display"	TEXT,
	"discord"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
COMMIT;
