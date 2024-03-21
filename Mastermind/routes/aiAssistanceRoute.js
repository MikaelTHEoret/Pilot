// aiRoute.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config(); // Ensure environment variables are loaded

// Middleware for input validation
const validateAIInput = (req, res, next) => {
    if (!req.body.inputText) {
        return res.status(400).json({ error: 'Input text is required' });
    }
    next();
};

router.post('/ai-assist', validateAIInput, (req, res) => {
    const { inputText } = req.body;

    axios.post('https://api.openai.com/v1/ai-assist', {
        input: inputText,
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 150
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => res.status(200).json(response.data))
    .catch(error => {
        console.error('Error making AI request:', error);
        res.status(500).json({ error: 'Error in AI-assisted coding functionality' });
    });
});

module.exports = router;
