const express = require('express');
const { check, validationResult } = require('express-validator'); // For input validation
const router = express.Router();
const ChatHistory = require('../models/ChatHistory');
const isAuthenticated = require('../middleware/isAuthenticated');

// Authentication middleware to ensure only authenticated users can access routes
router.use(isAuthenticated);

// Validation rules for posting and updating chat messages
const messageValidationRules = [
    check('userId').not().isEmpty().withMessage('UserId is required'),
    check('message').not().isEmpty().withMessage('Message is required')
];

// Error handling middleware for validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

// POST request to store chat history
router.post('/', messageValidationRules, validate, async (req, res) => {
    try {
        const { userId, message } = req.body;
        const newChat = new ChatHistory({ userId, messages: [message] }); // Assume messages is an array
        await newChat.save();
        res.status(201).json({ success: true, data: newChat });
    } catch (error) {
        console.error('Error storing chat message:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// GET request to fetch all chat history
router.get('/', async (req, res) => {
    try {
        const chatHistory = await ChatHistory.find();
        res.status(200).json({ success: true, data: chatHistory });
    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// PUT request to update a chat message
router.put('/:id', messageValidationRules, validate, async (req, res) => {
    try {
        const { userId, message } = req.body;
        const updatedChat = await ChatHistory.findByIdAndUpdate(
            req.params.id,
            { $push: { messages: message } }, // Assuming you want to add to the messages array
            { new: true }
        );
        if (!updatedChat) {
            return res.status(404).json({ success: false, error: 'Chat not found' });
        }
        res.status(200).json({ success: true, data: updatedChat });
    } catch (error) {
        console.error('Error updating chat message:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// DELETE request to remove a chat message (assuming removing the entire chat history for a user)
router.delete('/:id', async (req, res) => {
    try {
        const deletedChat = await ChatHistory.findByIdAndDelete(req.params.id);
        if (!deletedChat) {
            return res.status(404).json({ success: false, error: 'Chat not found' });
        }
        res.status(200).json({ success: true, message: 'Chat deleted successfully' });
    } catch (error) {
        console.error('Error deleting chat message:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

module.exports = router;
