require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/ai-assist', (req, res) => {
    const { inputText } = req.body;
    if (!inputText) {
        return res.status(400).send('Input text is required');
    }

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
    .then(response => {
        res.status(200).json(response.data);
    })
    .catch(error => {
        console.error('Error making AI request:', error); 
        res.status(500).send('Error in AI-assisted coding functionality');
    });
});

module.exports = router;
