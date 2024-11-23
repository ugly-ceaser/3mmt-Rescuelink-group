const express = require('express');
const router = express.Router();
const { createResponse, getAllResponses, updateVote } = require('../controllers/response.controller');

// Add logging middleware
router.use((req, res, next) => {
    console.log(`${req.method} request to ${req.originalUrl}`);
    console.log('Request body:', req.body);
    next();
});

// Define routes
router.post('/', createResponse);
router.get('/', getAllResponses);
router.put('/:id/vote', updateVote);
module.exports = router;
