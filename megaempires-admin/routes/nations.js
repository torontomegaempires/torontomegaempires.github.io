const express = require('express');
const { body, validationResult } = require('express-validator');
const Nation = require('../models/nation');

const router = express.Router();

// Validation rules
const nationValidation = [
    body('name').trim().notEmpty().withMessage('Nation name is required')
];

// GET /nations - List all nations
router.get('/', async (req, res) => {
    try {
        const nations = await Nation.getAll();
        res.render('nations/index', {
            title: 'Nations',
            nations,
            messages: req.query.messages ? JSON.parse(req.query.messages) : null
        });
    } catch (error) {
        console.error('Error fetching nations:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to load nations',
            error: error.message
        });
    }
});

// GET /nations/new - Show create form
router.get('/new', (req, res) => {
    res.render('nations/form', {
        title: 'Add New Nation',
        nation: {},
        errors: []
    });
});

// POST /nations - Create new nation
router.post('/', nationValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('nations/form', {
                title: 'Add New Nation',
                nation: req.body,
                errors: errors.array()
            });
        }

        await Nation.create(req.body);
        const messages = { success: ['Nation created successfully'] };
        res.redirect(`/nations?messages=${encodeURIComponent(JSON.stringify(messages))}`);
    } catch (error) {
        console.error('Error creating nation:', error);
        res.render('nations/form', {
            title: 'Add New Nation',
            nation: req.body,
            errors: [{ msg: error.message }]
        });
    }
});

// GET /nations/:id - Show nation details
router.get('/:id', async (req, res) => {
    try {
        const [nation, gameHistory] = await Promise.all([
            Nation.getById(req.params.id),
            Nation.getGameHistory(req.params.id)
        ]);

        if (!nation) {
            return res.status(404).render('error', {
                title: '404 - Nation Not Found',
                message: 'Nation not found',
                error: ''
            });
        }

        res.render('nations/detail', {
            title: `Nation: ${nation.name}`,
            nation,
            gameHistory
        });
    } catch (error) {
        console.error('Error fetching nation:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to load nation',
            error: error.message
        });
    }
});

// GET /nations/:id/edit - Show edit form
router.get('/:id/edit', async (req, res) => {
    try {
        const nation = await Nation.getById(req.params.id);
        if (!nation) {
            return res.status(404).render('error', {
                title: '404 - Nation Not Found',
                message: 'Nation not found',
                error: ''
            });
        }

        res.render('nations/form', {
            title: 'Edit Nation',
            nation,
            errors: []
        });
    } catch (error) {
        console.error('Error fetching nation for edit:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to load nation for editing',
            error: error.message
        });
    }
});

// POST /nations/:id - Update nation
router.post('/:id', nationValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('nations/form', {
                title: 'Edit Nation',
                nation: { ...req.body, id: req.params.id },
                errors: errors.array()
            });
        }

        await Nation.update(req.params.id, req.body);
        const messages = { success: ['Nation updated successfully'] };
        res.redirect(`/nations?messages=${encodeURIComponent(JSON.stringify(messages))}`);
    } catch (error) {
        console.error('Error updating nation:', error);
        res.render('nations/form', {
            title: 'Edit Nation',
            nation: { ...req.body, id: req.params.id },
            errors: [{ msg: error.message }]
        });
    }
});

// POST /nations/:id/delete - Delete nation
router.post('/:id/delete', async (req, res) => {
    try {
        await Nation.delete(req.params.id);
        const messages = { success: ['Nation deleted successfully'] };
        res.redirect(`/nations?messages=${encodeURIComponent(JSON.stringify(messages))}`);
    } catch (error) {
        console.error('Error deleting nation:', error);
        const messages = { error: [error.message] };
        res.redirect(`/nations?messages=${encodeURIComponent(JSON.stringify(messages))}`);
    }
});

module.exports = router;
