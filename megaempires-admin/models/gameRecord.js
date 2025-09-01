const { dbAsync } = require('./database');

class GameRecord {
    static async getAll() {
        const sql = `
            SELECT gpn.*, g.name as game_name, g.date as game_date,
                   p.name as player_name, p.display as player_display,
                   n.name as nation_name
            FROM game_player_nation gpn
            JOIN game g ON gpn.game_id = g.id
            JOIN player p ON gpn.player_id = p.id
            JOIN nation n ON gpn.nation_id = n.id
            ORDER BY g.date DESC, gpn.score DESC
        `;
        return await dbAsync.all(sql);
    }

    static async getById(gameId, playerId, nationId) {
        const sql = `
            SELECT gpn.*, g.name as game_name, g.date as game_date,
                   p.name as player_name, p.display as player_display,
                   n.name as nation_name
            FROM game_player_nation gpn
            JOIN game g ON gpn.game_id = g.id
            JOIN player p ON gpn.player_id = p.id
            JOIN nation n ON gpn.nation_id = n.id
            WHERE gpn.game_id = ? AND gpn.player_id = ? AND gpn.nation_id = ?
        `;
        return await dbAsync.get(sql, [gameId, playerId, nationId]);
    }

    static async create(recordData) {
        const {
            game_id, player_id, nation_id, score, cities, ast_pos,
            num_civ_adv_1VP, num_civ_adv_3VP, num_civ_adv_6VP,
            special_building, special_building_own, bonus_vp
        } = recordData;

        // Check for duplicate player-nation combination in the same game
        const checkSql = 'SELECT COUNT(*) as count FROM game_player_nation WHERE game_id = ? AND player_id = ? AND nation_id = ?';
        const existing = await dbAsync.get(checkSql, [game_id, player_id, nation_id]);
        
        if (existing.count > 0) {
            throw new Error('This player-nation combination already exists for this game');
        }

        const sql = `
            INSERT INTO game_player_nation (
                game_id, player_id, nation_id, score, cities, ast_pos,
                num_civ_adv_1VP, num_civ_adv_3VP, num_civ_adv_6VP,
                special_building, special_building_own, bonus_vp
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        return await dbAsync.run(sql, [
            game_id, player_id, nation_id, score, cities, ast_pos,
            num_civ_adv_1VP, num_civ_adv_3VP, num_civ_adv_6VP,
            special_building, special_building_own, bonus_vp
        ]);
    }

    static async update(gameId, playerId, nationId, recordData) {
        const {
            score, cities, ast_pos,
            num_civ_adv_1VP, num_civ_adv_3VP, num_civ_adv_6VP,
            special_building, special_building_own, bonus_vp
        } = recordData;

        const sql = `
            UPDATE game_player_nation SET
                score = ?, cities = ?, ast_pos = ?,
                num_civ_adv_1VP = ?, num_civ_adv_3VP = ?, num_civ_adv_6VP = ?,
                special_building = ?, special_building_own = ?, bonus_vp = ?
            WHERE game_id = ? AND player_id = ? AND nation_id = ?
        `;
        
        return await dbAsync.run(sql, [
            score, cities, ast_pos,
            num_civ_adv_1VP, num_civ_adv_3VP, num_civ_adv_6VP,
            special_building, special_building_own, bonus_vp,
            gameId, playerId, nationId
        ]);
    }

    static async delete(gameId, playerId, nationId) {
        const sql = 'DELETE FROM game_player_nation WHERE game_id = ? AND player_id = ? AND nation_id = ?';
        return await dbAsync.run(sql, [gameId, playerId, nationId]);
    }

    static async getByGameId(gameId) {
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

    static async getStatistics() {
        const totalGames = await dbAsync.get('SELECT COUNT(DISTINCT game_id) as count FROM game_player_nation');
        const totalRecords = await dbAsync.get('SELECT COUNT(*) as count FROM game_player_nation');
        const avgScore = await dbAsync.get('SELECT AVG(score) as avg FROM game_player_nation WHERE score IS NOT NULL');
        const highestScore = await dbAsync.get('SELECT MAX(score) as max FROM game_player_nation WHERE score IS NOT NULL');
        
        return {
            totalGames: totalGames.count,
            totalRecords: totalRecords.count,
            avgScore: Math.round(avgScore.avg || 0),
            highestScore: highestScore.max || 0
        };
    }
}

module.exports = GameRecord;
