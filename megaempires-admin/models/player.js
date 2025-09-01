const { dbAsync } = require('./database');

class Player {
    static async getAll() {
        const sql = 'SELECT * FROM player ORDER BY name';
        return await dbAsync.all(sql);
    }

    static async getById(id) {
        const sql = 'SELECT * FROM player WHERE id = ?';
        return await dbAsync.get(sql, [id]);
    }

    static async create(playerData) {
        const { name, display, discord } = playerData;
        const sql = 'INSERT INTO player (name, display, discord) VALUES (?, ?, ?)';
        return await dbAsync.run(sql, [name, display, discord]);
    }

    static async update(id, playerData) {
        const { name, display, discord } = playerData;
        const sql = 'UPDATE player SET name = ?, display = ?, discord = ? WHERE id = ?';
        return await dbAsync.run(sql, [name, display, discord, id]);
    }

    static async delete(id) {
        // Check if player has any game records
        const checkSql = 'SELECT COUNT(*) as count FROM game_player_nation WHERE player_id = ?';
        const result = await dbAsync.get(checkSql, [id]);
        
        if (result.count > 0) {
            throw new Error('Cannot delete player with existing game records');
        }

        const sql = 'DELETE FROM player WHERE id = ?';
        return await dbAsync.run(sql, [id]);
    }

    static async getGameHistory(playerId) {
        const sql = `
            SELECT g.name as game_name, g.date, n.name as nation_name, 
                   gpn.score, gpn.cities, gpn.ast_pos
            FROM game_player_nation gpn
            JOIN game g ON gpn.game_id = g.id
            JOIN nation n ON gpn.nation_id = n.id
            WHERE gpn.player_id = ?
            ORDER BY g.date DESC
        `;
        return await dbAsync.all(sql, [playerId]);
    }
}

module.exports = Player;
