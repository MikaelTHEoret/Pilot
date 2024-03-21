// codeGenerationRoutes.js
const express = require('express');
const router = express.Router();
const codeWritingAgent = require('../services/codeWritingAgent');

// Middleware for input validation
const validateUserCodeInput = (req, res, next) => {
    if (!req.body.userInput) {
        return res.status(400).json({ error: 'User input is required' });
    }
    next();
};

router.post('/generateCodeSnippet', validateUserCodeInput, async (req, res) => {
    const { userInput } = req.body;

    try {
        const codeSnippet = await codeWritingAgent.generateCodeSnippet(userInput);
        res.json({ success: true, codeSnippet });
    } catch (error) {
        console.error('Error generating code snippet:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
