const express = require('express');
const router = express.Router();
const axios = require('axios'); // Import axios for making HTTP requests

// Corrected to use '/', as '/chat' is already prefixed in server.js
router.get('/', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/auth/login'); // Redirect to login if not authenticated
    }
    res.render('chat');
});

router.post('/ai-assist', (req, res) => {
    const { inputText } = req.body;
    if (!inputText) {
        return res.status(400).send('Input text is required');
    }

    axios.post('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', {
        prompt: inputText, // Make sure to use 'prompt' instead of 'input'
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 150
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`, // Use environment variable for the API key
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        const aiResponse = response.data;
        res.status(200).json(aiResponse);
    })
    .catch(error => {
        console.error('Error making AI request:', error); // Log error message and stack trace
        res.status(500).send('Error in AI-assisted coding functionality');
    });
});

module.exports = router;
