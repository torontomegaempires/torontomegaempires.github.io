#! /usr/bin/python3

# Writes game records into the database. The players, nations and top-level game record
# must already exist.
#
# usage:
# 
# ./insert-game.py game1-record.csv
# 
# Format for the cvs file
#
# Basic format (backward compatible):
# 'game,name,nation,score,cities,ast-position'
#
# Extended format (with new columns):
# 'game,name,nation,score,cities,ast-position,num_civ_adv_1VP,num_civ_adv_3VP,num_civ_adv_6VP,special_building,special_building_own,bonus_vp,game_summary'
#
# Example (basic format):
#
# game1-records.csv
#
# "Game 11","Allister","Egypt",128,6,15
# "Game 11","Jonathan V.","Parthia",123,5,15
# "Game 11","Rob McArthur","Assyria",120,6,15
# "Game 11","Don","Rome",108,4,15
# "Game 11","Eric C.","Babylon",107,5,15
# "Game 11","Andy","Persia",104,7,14
# "Game 11","Kasia","Hellas",107,5,15
# "Game 11","Laurie","Saba",104,1,14
# "Game 11","Rob E.","Hatti",101,7,13
# "Game 11","John C.","Carthage",93,5,14
# "Game 11","Wai-kwong","Minoa",93,6,14
#
# Example (extended format):
#
# "Game 15","Player","Nation",150,7,15,2,1,0,1,0,1,"Great game with lots of action"

import sqlite3, csv, sys

try:
    sqliteConnection = sqlite3.connect("../docs/_db/megaempires.db")

    cursor = sqliteConnection.cursor()
    sql = """INSERT INTO game_player_nation ( game_id, player_id, nation_id, score, cities, ast_pos, 
                                             num_civ_adv_1VP, num_civ_adv_3VP, num_civ_adv_6VP, 
                                             special_building, special_building_own, bonus_vp, game_summary )
            SELECT game.id, player.id, nation.id, :score, :cities, :ast_pos, 
                   :num_civ_adv_1VP, :num_civ_adv_3VP, :num_civ_adv_6VP,
                   :special_building, :special_building_own, :bonus_vp, :game_summary
            FROM game, player, nation
            WHERE game.name = :game AND
            player.name = :name AND
            nation.name = :nation"""

    with open(sys.argv[1], newline='') as csvfile:
        gamereader = csv.reader(csvfile, delimiter=',', quotechar='"')
        # format is 'game,name,nation,score,cities,ast_position' (basic)
        # or 'game,name,nation,score,cities,ast_position,num_civ_adv_1VP,num_civ_adv_3VP,num_civ_adv_6VP,special_building,special_building_own,bonus_vp,game_summary' (extended)

        for row in gamereader:
            print(', '.join(row))
            
            # Initialize all optional columns with None/default values
            cities = None
            ast_pos = None
            num_civ_adv_1VP = None
            num_civ_adv_3VP = None
            num_civ_adv_6VP = None
            special_building = None
            special_building_own = None
            bonus_vp = None
            game_summary = None
            
            # Parse optional columns based on row length (backward compatible)
            if len(row) > 4:
                cities = row[4] if row[4] else None
            if len(row) > 5:
                ast_pos = row[5] if row[5] else None
            if len(row) > 6:
                num_civ_adv_1VP = row[6] if row[6] else None
            if len(row) > 7:
                num_civ_adv_3VP = row[7] if row[7] else None
            if len(row) > 8:
                num_civ_adv_6VP = row[8] if row[8] else None
            if len(row) > 9:
                special_building = row[9] if row[9] else None
            if len(row) > 10:
                special_building_own = row[10] if row[10] else None
            if len(row) > 11:
                bonus_vp = row[11] if row[11] else None
            if len(row) > 12:
                game_summary = row[12] if row[12] else None
                
            params = {"game": row[0], 
                      "name": row[1], 
                      "nation": row[2], 
                      "score": row[3], 
                      "cities": cities, 
                      "ast_pos": ast_pos,
                      "num_civ_adv_1VP": num_civ_adv_1VP,
                      "num_civ_adv_3VP": num_civ_adv_3VP,
                      "num_civ_adv_6VP": num_civ_adv_6VP,
                      "special_building": special_building,
                      "special_building_own": special_building_own,
                      "bonus_vp": bonus_vp,
                      "game_summary": game_summary}
            cursor.execute(sql, params)
            if (cursor.rowcount != 1):
                sqliteConnection.rollback()
                raise Exception("No row inserted!")

    sqliteConnection.commit()
    cursor.close()

except sqlite3.Error as error:
    print("Error while inserting values")
    print(error)

except Exception as error:
    print("Error raised")
    print(error)

finally:
    if(sqliteConnection):
        sqliteConnection.close()
        print("SQLite connection closed")
