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
# 'game,name,nation,score,cities,ast-position'
#
# Example:
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

import sqlite3, csv, sys

try:
    sqliteConnection = sqlite3.connect("../docs/_db/megaempires.db")

    cursor = sqliteConnection.cursor()
    sql = """INSERT INTO game_player_nation ( game_id, player_id, nation_id, score, cities, ast_pos )
            SELECT game.id, player.id, nation.id, :score, :cities, :ast_pos
            FROM game, player, nation
            WHERE game.name = :game AND
            player.name = :name AND
            nation.name = :nation"""

    with open(sys.argv[1], newline='') as csvfile:
        gamereader = csv.reader(csvfile, delimiter=',', quotechar='"')
        # format is 'game,name,nation,score'
        for row in gamereader:
            params = {"game":row[0], "name": row[1], "nation":row[2], "score":row[3], 
                      None if len(row)<5 else "cities":row[4], 
                      None if len(row)<6 else "ast_pos":row[5]}
            cursor.execute(sql, params)
            print(', '.join(row))

    sqliteConnection.commit()
    cursor.close()

except sqlite3.Error as error:
    print("Error while inserting values")
    print(error)

finally:
    if(sqliteConnection):
        sqliteConnection.close()
        print("SQLite connection closed")