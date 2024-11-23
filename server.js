const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const connectDB = require('./config/db_connect');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes')

const app = express();

// Middleware
app.use(cors({
    origin: '*',  // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
    credentials: true,  // Allow credentials
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database connection


// API Routes
app.use('/api/responses', routes);

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/reports', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reports.html'));
});

// Handle 404s
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

const PORT = process.env.PORT || 3000;

connectDB().then(()=>{

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

});


module.exports = app;