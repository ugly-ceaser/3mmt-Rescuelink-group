const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const connectDB = require('./config/db_connect');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes');

const app = express();

// 1. Middleware
app.use(cors({
    origin: '*',  // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
    credentials: true,  // Allow credentials
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 2. API Routes (before static routes)
app.use('/api', routes);

// 3. Static file routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/reports', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reports.html'));
});

// 4. 404 Handler (after all other routes)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 5. Error Handler (always last)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

// 6. Server initialization
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
});

module.exports = app;