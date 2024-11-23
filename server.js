const express = require('express');
const path = require('path');
const Route = require('express').Router();
const cors = require('cors');
const connectDB = require('./config/db_connect');
const routes = require('./routes/');
const app = express();

// Enable CORS for all origins
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


// Serve HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/reports', (req, res) => res.sendFile(path.join(__dirname, 'public/reports.html')));



const port = process.env.PORT || 3000;

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Internal Server Error',
        error: err.message 
    });
});

// Connect to database and start server
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    });