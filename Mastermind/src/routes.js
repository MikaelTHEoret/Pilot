// src/routes.js

// Import necessary modules
const express = require('express');

// Create a new router instance
const router = express.Router();

// Define routes for handling frontend interactions
router.get('/', (req, res) => {
    // Placeholder for handling root route
    res.send('Welcome to ChatBot');
});

router.get('/chat', (req, res) => {
    // Placeholder for handling chat route
    res.send('Chat interface coming soon!');
});



// Export the router for use in the application
module.exports = router;