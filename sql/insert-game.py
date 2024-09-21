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
# 'game,name,nation,score'
#
# Example:
#
# game1-records.csv
#
# "Game 1","Allister","Hatti",107
# "Game 1","Chris","Rome",71
# "Game 1","Don","Assyria",94
# "Game 1","Lucas","Hellas",88
# "Game 1","Morry","Carthage",87
# "Game 1","Rob McArthur","Minoa",81
# "Game 1","Sandy","Egypt",100

import sqlite3, csv, sys

try:
    sqliteConnection = sqlite3.connect("../docs/_db/megaempires.db")

    cursor = sqliteConnection.cursor()
    sql = """INSERT INTO game_player_nation ( game_id, player_id, nation_id, score )
            SELECT game.id, player.id, nation.id, :score
            FROM game, player, nation
            WHERE game.name = :game AND
            player.name = :name AND
            nation.name = :nation"""

    with open(sys.argv[1], newline='') as csvfile:
        gamereader = csv.reader(csvfile, delimiter=',', quotechar='"')
        # format is 'game,name,nation,score'
        for row in gamereader:
            params = {"game":row[0], "name": row[1], "nation":row[2], "score":row[3]}
            cursor.execute(sql, params)
            sqliteConnection.commit()
            print("Query inserted Successfully")
            print(', '.join(row))

    cursor.close()

except sqlite3.Error as error:
    print("Error while inserting values")
    print(error)

finally:
    if(sqliteConnection):
        sqliteConnection.close()
        print("SQLite connection closed")