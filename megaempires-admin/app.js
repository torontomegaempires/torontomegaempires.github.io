const express = require('express');
const path = require('path');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const gamesRouter = require('./routes/games');
const playersRouter = require('./routes/players');
const nationsRouter = require('./routes/nations');
const recordsRouter = require('./routes/records');

// Import models for dashboard
const Game = require('./models/game');
const Player = require('./models/player');
const Nation = require('./models/nation');
const GameRecord = require('./models/gameRecord');

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/games', gamesRouter);
app.use('/players', playersRouter);
app.use('/nations', nationsRouter);
app.use('/records', recordsRouter);

// Dashboard route
app.get('/', async (req, res) => {
    try {
        const [recentGames, stats] = await Promise.all([
            Game.getRecentGames(5),
            GameRecord.getStatistics()
        ]);

        res.render('dashboard', {
            title: 'Mega Empires Admin Dashboard',
            recentGames,
            stats
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).render('error', { 
            title: 'Error',
            message: 'Failed to load dashboard',
            error: error.message 
        });
    }
});

// Error handling middleware
app.use((req, res) => {
    res.status(404).render('error', {
        title: '404 - Page Not Found',
        message: 'The page you are looking for does not exist.',
        error: ''
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        title: '500 - Server Error',
        message: 'Something went wrong!',
        error: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Mega Empires Admin server running on http://localhost:${PORT}`);
});

module.exports = app;
