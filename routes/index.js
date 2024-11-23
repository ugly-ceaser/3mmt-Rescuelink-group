const express = require('express');
const routes = express.Router();
const responseRoute = require('./response.route');

// Combine all routes
routes.use('/responses', responseRoute);

module.exports = routes;
