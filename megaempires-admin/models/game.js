const { dbAsync } = require('./database');

class Game {
    static async getAll() {
        const sql = 'SELECT * FROM game ORDER BY date DESC, name';
        return await dbAsync.all(sql);
    }

    static async getById(id) {
        const sql = 'SELECT * FROM game WHERE id = ?';
        return await dbAsync.get(sql, [id]);
    }

    static async create(gameData) {
        const { name, date, final_ast_pos, game_summary } = gameData;
        const sql = 'INSERT INTO game (name, date, final_ast_pos, game_summary) VALUES (?, ?, ?, ?)';
        return await dbAsync.run(sql, [name, date, final_ast_pos, game_summary]);
    }

    static async update(id, gameData) {
        const { name, date, final_ast_pos, game_summary } = gameData;
        const sql = 'UPDATE game SET name = ?, date = ?, final_ast_pos = ?, game_summary = ? WHERE id = ?';
        return await dbAsync.run(sql, [name, date, final_ast_pos, game_summary, id]);
    }

    static async delete(id) {
        // Check if game has any records
        const checkSql = 'SELECT COUNT(*) as count FROM game_player_nation WHERE game_id = ?';
        const result = await dbAsync.get(checkSql, [id]);
        
        if (result.count > 0) {
            throw new Error('Cannot delete game with existing player records');
        }

        const sql = 'DELETE FROM game WHERE id = ?';
        return await dbAsync.run(sql, [id]);
    }

    static async getGameRecords(gameId) {
        const sql = `
            SELECT gpn.*, p.name as player_name, p.display as player_display, 
                   n.name as nation_name
            FROM game_player_nation gpn
            JOIN player p ON gpn.player_id = p.id
            JOIN nation n ON gpn.nation_id = n.id
            WHERE gpn.game_id = ?
            ORDER BY gpn.score DESC
        `;
        return await dbAsync.all(sql, [gameId]);
    }

    static async getGameWithRecords(gameId) {
        const game = await this.getById(gameId);
        if (game) {
            game.records = await this.getGameRecords(gameId);
        }
        return game;
    }

    static async getRecentGames(limit = 5) {
        const sql = 'SELECT * FROM game ORDER BY date DESC, id DESC LIMIT ?';
        return await dbAsync.all(sql, [limit]);
    }
}

module.exports = Game;
