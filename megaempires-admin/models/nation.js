const { dbAsync } = require('./database');

class Nation {
    static async getAll() {
        const sql = 'SELECT * FROM nation ORDER BY name';
        return await dbAsync.all(sql);
    }

    static async getById(id) {
        const sql = 'SELECT * FROM nation WHERE id = ?';
        return await dbAsync.get(sql, [id]);
    }

    static async create(nationData) {
        const { name } = nationData;
        const sql = 'INSERT INTO nation (name) VALUES (?)';
        return await dbAsync.run(sql, [name]);
    }

    static async update(id, nationData) {
        const { name } = nationData;
        const sql = 'UPDATE nation SET name = ? WHERE id = ?';
        return await dbAsync.run(sql, [name, id]);
    }

    static async delete(id) {
        // Check if nation has any game records
        const checkSql = 'SELECT COUNT(*) as count FROM game_player_nation WHERE nation_id = ?';
        const result = await dbAsync.get(checkSql, [id]);
        
        if (result.count > 0) {
            throw new Error('Cannot delete nation with existing game records');
        }

        const sql = 'DELETE FROM nation WHERE id = ?';
        return await dbAsync.run(sql, [id]);
    }

    static async getGameHistory(nationId) {
        const sql = `
            SELECT g.name as game_name, g.date, p.display as player_name, 
                   gpn.score, gpn.cities, gpn.ast_pos
            FROM game_player_nation gpn
            JOIN game g ON gpn.game_id = g.id
            JOIN player p ON gpn.player_id = p.id
            WHERE gpn.nation_id = ?
            ORDER BY g.date DESC
        `;
        return await dbAsync.all(sql, [nationId]);
    }
}

module.exports = Nation;
