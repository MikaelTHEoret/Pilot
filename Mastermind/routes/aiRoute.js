const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
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
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        const aiResponse = response.data;
        res.status(200).json(aiResponse);
    })
    .catch(error => {
        console.error('Error making AI request:', error); 
        res.status(500).send('Error in AI-assisted coding functionality');
    });
});

module.exports = router;