const express = require('express');
const router = express.Router();
const codeWritingAgent = require('../services/codeWritingAgent');

// Route to generate code snippet based on user input
router.post('/generateCodeSnippet', async (req, res) => {
    const { userInput } = req.body;

    if (!userInput) {
        return res.status(400).json({ message: 'User input is required' });
    }

    try {
        // Call the code-writing agent service to generate code snippet
        const codeSnippet = codeWritingAgent.generateCodeSnippet(userInput);

        if (codeSnippet) {
            // Log successful code snippet generation
            console.log('Generated code snippet:', codeSnippet);
            res.json({ codeSnippet });
        } else {
            // Log and handle case where code snippet generation failed
            console.error('Failed to generate code snippet');
            res.status(500).json({ message: 'Failed to generate code snippet' });
        }
    } catch (error) {
        // Log and handle errors during code snippet generation
        console.error('Error generating code snippet:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;