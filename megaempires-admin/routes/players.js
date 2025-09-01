const express = require('express');
const { body, validationResult } = require('express-validator');
const Player = require('../models/player');

const router = express.Router();

// Validation rules
const playerValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('display').trim().notEmpty().withMessage('Display name is required'),
    body('discord').trim().optional({ checkFalsy: true })
];

// GET /players - List all players
router.get('/', async (req, res) => {
    try {
        const players = await Player.getAll();
        res.render('players/index', {
            title: 'Players',
            players,
            messages: req.query.messages ? JSON.parse(req.query.messages) : null
        });
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to load players',
            error: error.message
        });
    }
});

// GET /players/new - Show create form
router.get('/new', (req, res) => {
    res.render('players/form', {
        title: 'Add New Player',
        player: {},
        errors: []
    });
});

// POST /players - Create new player
router.post('/', playerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('players/form', {
                title: 'Add New Player',
                player: req.body,
                errors: errors.array()
            });
        }

        await Player.create(req.body);
        const messages = { success: ['Player created successfully'] };
        res.redirect(`/players?messages=${encodeURIComponent(JSON.stringify(messages))}`);
    } catch (error) {
        console.error('Error creating player:', error);
        res.render('players/form', {
            title: 'Add New Player',
            player: req.body,
            errors: [{ msg: error.message }]
        });
    }
});

// GET /players/:id - Show player details
router.get('/:id', async (req, res) => {
    try {
        const [player, gameHistory] = await Promise.all([
            Player.getById(req.params.id),
            Player.getGameHistory(req.params.id)
        ]);

        if (!player) {
            return res.status(404).render('error', {
                title: '404 - Player Not Found',
                message: 'Player not found',
                error: ''
            });
        }

        res.render('players/detail', {
            title: `Player: ${player.display}`,
            player,
            gameHistory
        });
    } catch (error) {
        console.error('Error fetching player:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to load player',
            error: error.message
        });
    }
});

// GET /players/:id/edit - Show edit form
router.get('/:id/edit', async (req, res) => {
    try {
        const player = await Player.getById(req.params.id);
        if (!player) {
            return res.status(404).render('error', {
                title: '404 - Player Not Found',
                message: 'Player not found',
                error: ''
            });
        }

        res.render('players/form', {
            title: 'Edit Player',
            player,
            errors: []
        });
    } catch (error) {
        console.error('Error fetching player for edit:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to load player for editing',
            error: error.message
        });
    }
});

// POST /players/:id - Update player
router.post('/:id', playerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('players/form', {
                title: 'Edit Player',
                player: { ...req.body, id: req.params.id },
                errors: errors.array()
            });
        }

        await Player.update(req.params.id, req.body);
        const messages = { success: ['Player updated successfully'] };
        res.redirect(`/players?messages=${encodeURIComponent(JSON.stringify(messages))}`);
    } catch (error) {
        console.error('Error updating player:', error);
        res.render('players/form', {
            title: 'Edit Player',
            player: { ...req.body, id: req.params.id },
            errors: [{ msg: error.message }]
        });
    }
});

// POST /players/:id/delete - Delete player
router.post('/:id/delete', async (req, res) => {
    try {
        await Player.delete(req.params.id);
        const messages = { success: ['Player deleted successfully'] };
        res.redirect(`/players?messages=${encodeURIComponent(JSON.stringify(messages))}`);
    } catch (error) {
        console.error('Error deleting player:', error);
        const messages = { error: [error.message] };
        res.redirect(`/players?messages=${encodeURIComponent(JSON.stringify(messages))}`);
    }
});

module.exports = router;
