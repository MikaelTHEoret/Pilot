const express = require('express');
const router = express.Router();
const ChatHistory = require('../models/ChatHistory');
const isAuthenticated = require('../middleware/isAuthenticated'); // Hypothetical authentication middleware

// Define the ChatHistory model with automatic timestamp handling
// Assuming this is done in '../models/ChatHistory.js'

// Authentication middleware to ensure only authenticated users can access routes
router.use(isAuthenticated);

// POST request to store chat history
router.post('/', async (req, res) => {
    try {
        const { userId, message } = req.body;
        // Validate input
        if (!message || !userId) {
            return res.status(400).json({ success: false, error: 'UserId and message are required' });
        }
        const newChat = new ChatHistory({ userId, message }); // Timestamps are handled by the model
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
router.put('/:id', async (req, res) => {
    try {
        const { userId, message } = req.body;
        // Validate input
        if (!message || !userId) {
            return res.status(400).json({ success: false, error: 'UserId and message are required for update' });
        }
        const updatedChat = await ChatHistory.findByIdAndUpdate(req.params.id, { userId, message }, { new: true });
        if (!updatedChat) {
            return res.status(404).json({ success: false, error: 'Chat not found' });
        }
        res.status(200).json({ success: true, data: updatedChat });
    } catch (error) {
        console.error('Error updating chat message:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// (Optional) DELETE request to remove a chat message
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
