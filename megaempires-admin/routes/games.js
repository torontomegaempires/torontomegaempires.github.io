const express = require('express');
const { body, validationResult } = require('express-validator');
const Game = require('../models/game');

const router = express.Router();

// Validation rules
const gameValidation = [
    body('name').trim().notEmpty().withMessage('Game name is required'),
    body('date').isISO8601().withMessage('Date must be in YYYY-MM-DD format'),
    body('final_ast_pos').optional({ checkFalsy: true }).isInt({ min: 0 }).withMessage('Final AST position must be a non-negative integer'),
    body('game_summary').trim().optional({ checkFalsy: true })
];

// GET /games - List all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.getAll();
        res.render('games/index', {
            title: 'Games',
            games,
            messages: req.query.messages ? JSON.parse(req.query.messages) : null
        });
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to load games',
            error: error.message
        });
    }
});

// GET /games/new - Show create form
router.get('/new', (req, res) => {
    res.render('games/form', {
        title: 'Add New Game',
        game: {},
        errors: []
    });
});

// POST /games - Create new game
router.post('/', gameValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('games/form', {
                title: 'Add New Game',
                game: req.body,
                errors: errors.array()
            });
        }

        await Game.create(req.body);
        const messages = { success: ['Game created successfully'] };
        res.redirect(`/games?messages=${encodeURIComponent(JSON.stringify(messages))}`);
    } catch (error) {
        console.error('Error creating game:', error);
        res.render('games/form', {
            title: 'Add New Game',
            game: req.body,
            errors: [{ msg: error.message }]
        });
    }
});

// GET /games/:id - Show game details with records
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.getGameWithRecords(req.params.id);

        if (!game) {
            return res.status(404).render('error', {
                title: '404 - Game Not Found',
                message: 'Game not found',
                error: ''
            });
        }

        res.render('games/detail', {
            title: `Game: ${game.name}`,
            game
        });
    } catch (error) {
        console.error('Error fetching game:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to load game',
            error: error.message
        });
    }
});

// GET /games/:id/edit - Show edit form
router.get('/:id/edit', async (req, res) => {
    try {
        const game = await Game.getById(req.params.id);
        if (!game) {
            return res.status(404).render('error', {
                title: '404 - Game Not Found',
                message: 'Game not found',
                error: ''
            });
        }

        res.render('games/form', {
            title: 'Edit Game',
            game,
            errors: []
        });
    } catch (error) {
        console.error('Error fetching game for edit:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to load game for editing',
            error: error.message
        });
    }
});

// POST /games/:id - Update game
router.post('/:id', gameValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('games/form', {
                title: 'Edit Game',
                game: { ...req.body, id: req.params.id },
                errors: errors.array()
            });
        }

        await Game.update(req.params.id, req.body);
        const messages = { success: ['Game updated successfully'] };
        res.redirect(`/games?messages=${encodeURIComponent(JSON.stringify(messages))}`);
    } catch (error) {
        console.error('Error updating game:', error);
        res.render('games/form', {
            title: 'Edit Game',
            game: { ...req.body, id: req.params.id },
            errors: [{ msg: error.message }]
        });
    }
});

// POST /games/:id/delete - Delete game
router.post('/:id/delete', async (req, res) => {
    try {
        await Game.delete(req.params.id);
        const messages = { success: ['Game deleted successfully'] };
        res.redirect(`/games?messages=${encodeURIComponent(JSON.stringify(messages))}`);
    } catch (error) {
        console.error('Error deleting game:', error);
        const messages = { error: [error.message] };
        res.redirect(`/games?messages=${encodeURIComponent(JSON.stringify(messages))}`);
    }
});

module.exports = router;
