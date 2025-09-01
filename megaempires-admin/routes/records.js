const express = require('express');
const { body, validationResult } = require('express-validator');
const GameRecord = require('../models/gameRecord');
const Game = require('../models/game');
const Player = require('../models/player');
const Nation = require('../models/nation');

const router = express.Router();

// Validation rules
const recordValidation = [
    body('game_id').isInt({ min: 1 }).withMessage('Game is required'),
    body('player_id').isInt({ min: 1 }).withMessage('Player is required'),
    body('nation_id').isInt({ min: 1 }).withMessage('Nation is required'),
    body('score').isInt({ min: 0 }).withMessage('Score must be a non-negative integer'),
    body('cities').optional({ checkFalsy: true }).isInt({ min: 0 }).withMessage('Cities must be a non-negative integer'),
    body('ast_pos').optional({ checkFalsy: true }).isInt({ min: 0 }).withMessage('AST position must be a non-negative integer'),
    body('num_civ_adv_1VP').optional({ checkFalsy: true }).isInt({ min: 0 }).withMessage('1VP advances must be a non-negative integer'),
    body('num_civ_adv_3VP').optional({ checkFalsy: true }).isInt({ min: 0 }).withMessage('3VP advances must be a non-negative integer'),
    body('num_civ_adv_6VP').optional({ checkFalsy: true }).isInt({ min: 0 }).withMessage('6VP advances must be a non-negative integer'),
    body('special_building').optional().isIn(['0', '1']).withMessage('Special building must be 0 or 1'),
    body('special_building_own').optional().isIn(['0', '1']).withMessage('Special building own must be 0 or 1'),
    body('bonus_vp').optional().isIn(['0', '1']).withMessage('Bonus VP must be 0 or 1')
];

// GET /records - List all records
router.get('/', async (req, res) => {
    try {
        const records = await GameRecord.getAll();
        res.render('records/index', {
            title: 'Game Records',
            records,
            messages: req.query.messages ? JSON.parse(req.query.messages) : null
        });
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to load records',
            error: error.message
        });
    }
});

// GET /records/new - Show create form
router.get('/new', async (req, res) => {
    try {
        const [games, players, nations] = await Promise.all([
            Game.getAll(),
            Player.getAll(),
            Nation.getAll()
        ]);

        res.render('records/form', {
            title: 'Add New Game Record',
            record: {},
            games,
            players,
            nations,
            errors: []
        });
    } catch (error) {
        console.error('Error loading form data:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to load form',
            error: error.message
        });
    }
});

// POST /records - Create new record
router.post('/', recordValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const [games, players, nations] = await Promise.all([
                Game.getAll(),
                Player.getAll(),
                Nation.getAll()
            ]);

            return res.render('records/form', {
                title: 'Add New Game Record',
                record: req.body,
                games,
                players,
                nations,
                errors: errors.array()
            });
        }

        // Convert checkbox values to integers
        const recordData = {
            ...req.body,
            special_building: req.body.special_building ? 1 : 0,
            special_building_own: req.body.special_building_own ? 1 : 0,
            bonus_vp: req.body.bonus_vp ? 1 : 0
        };

        await GameRecord.create(recordData);
        const messages = { success: ['Game record created successfully'] };
        res.redirect(`/records?messages=${encodeURIComponent(JSON.stringify(messages))}`);
    } catch (error) {
        console.error('Error creating record:', error);
        
        const [games, players, nations] = await Promise.all([
            Game.getAll(),
            Player.getAll(),
            Nation.getAll()
        ]);

        res.render('records/form', {
            title: 'Add New Game Record',
            record: req.body,
            games,
            players,
            nations,
            errors: [{ msg: error.message }]
        });
    }
});

// GET /records/:gameId/:playerId/:nationId - Show record details
router.get('/:gameId/:playerId/:nationId', async (req, res) => {
    try {
        const record = await GameRecord.getById(req.params.gameId, req.params.playerId, req.params.nationId);

        if (!record) {
            return res.status(404).render('error', {
                title: '404 - Record Not Found',
                message: 'Game record not found',
                error: ''
            });
        }

        res.render('records/detail', {
            title: `Record: ${record.game_name} - ${record.player_display} - ${record.nation_name}`,
            record
        });
    } catch (error) {
        console.error('Error fetching record:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to load record',
            error: error.message
        });
    }
});

// GET /records/:gameId/:playerId/:nationId/edit - Show edit form
router.get('/:gameId/:playerId/:nationId/edit', async (req, res) => {
    try {
        const [record, games, players, nations] = await Promise.all([
            GameRecord.getById(req.params.gameId, req.params.playerId, req.params.nationId),
            Game.getAll(),
            Player.getAll(),
            Nation.getAll()
        ]);

        if (!record) {
            return res.status(404).render('error', {
                title: '404 - Record Not Found',
                message: 'Game record not found',
                error: ''
            });
        }

        res.render('records/form', {
            title: 'Edit Game Record',
            record,
            games,
            players,
            nations,
            errors: []
        });
    } catch (error) {
        console.error('Error fetching record for edit:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to load record for editing',
            error: error.message
        });
    }
});

// POST /records/:gameId/:playerId/:nationId - Update record
router.post('/:gameId/:playerId/:nationId', recordValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const [games, players, nations] = await Promise.all([
                Game.getAll(),
                Player.getAll(),
                Nation.getAll()
            ]);

            return res.render('records/form', {
                title: 'Edit Game Record',
                record: { ...req.body, game_id: req.params.gameId, player_id: req.params.playerId, nation_id: req.params.nationId },
                games,
                players,
                nations,
                errors: errors.array()
            });
        }

        // Convert checkbox values to integers
        const recordData = {
            ...req.body,
            special_building: req.body.special_building ? 1 : 0,
            special_building_own: req.body.special_building_own ? 1 : 0,
            bonus_vp: req.body.bonus_vp ? 1 : 0
        };

        await GameRecord.update(req.params.gameId, req.params.playerId, req.params.nationId, recordData);
        const messages = { success: ['Game record updated successfully'] };
        res.redirect(`/records?messages=${encodeURIComponent(JSON.stringify(messages))}`);
    } catch (error) {
        console.error('Error updating record:', error);
        
        const [games, players, nations] = await Promise.all([
            Game.getAll(),
            Player.getAll(),
            Nation.getAll()
        ]);

        res.render('records/form', {
            title: 'Edit Game Record',
            record: { ...req.body, game_id: req.params.gameId, player_id: req.params.playerId, nation_id: req.params.nationId },
            games,
            players,
            nations,
            errors: [{ msg: error.message }]
        });
    }
});

// POST /records/:gameId/:playerId/:nationId/delete - Delete record
router.post('/:gameId/:playerId/:nationId/delete', async (req, res) => {
    try {
        await GameRecord.delete(req.params.gameId, req.params.playerId, req.params.nationId);
        const messages = { success: ['Game record deleted successfully'] };
        res.redirect(`/records?messages=${encodeURIComponent(JSON.stringify(messages))}`);
    } catch (error) {
        console.error('Error deleting record:', error);
        const messages = { error: [error.message] };
        res.redirect(`/records?messages=${encodeURIComponent(JSON.stringify(messages))}`);
    }
});

module.exports = router;
